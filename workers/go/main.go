package main

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"time"

	"github.com/mmcdole/gofeed"
	amqp "github.com/rabbitmq/amqp091-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type NestJSMessage struct {
	Pattern string `json:"pattern"`
	Data    struct {
		URL string `json:"url"`
	} `json:"data"`
}

func processFeed(url string, client *mongo.Client, fp *gofeed.Parser) {
	log.Printf("[Goroutine] Starting process for: %s", url)
	
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	feed, err := fp.ParseURLWithContext(url, ctx)
	if err != nil {
		log.Printf("[Error] Failed to parse %s: %v", url, err)
		return
	}

	collection := client.Database("rss_aggregator").Collection("news")
	
	for _, item := range feed.Items {
		id := item.GUID
		if id == "" { id = item.Link }

		filter := bson.M{"guid": id}
		update := bson.M{"$set": bson.M{
			"guid":      id,
			"title":     item.Title,
			"link":      item.Link,
			"content":   item.Description,
			"author":    item.Author,
			"sourceUrl": url,
			"pubDate":   item.PublishedParsed,
			"updatedAt": time.Now(),
		}}

		_, err := collection.UpdateOne(ctx, filter, update, options.Update().SetUpsert(true))
		if err != nil {
			log.Printf("[Error Mongo] Upsert failed for %s: %v", id, err)
		}
	}
	log.Printf("[Success] Feed [%s] finished. %d news processed.", feed.Title, len(feed.Items))
}

func main() {
	mongoURI := os.Getenv("MONGO_URI")
	rabbitURL := os.Getenv("RABBITMQ_URL")

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal(err)
	}

	var conn *amqp.Connection
	for {
		conn, err = amqp.Dial(rabbitURL)
		if err == nil {
			break
		}
		log.Println("RabbitMQ offline, retrying in 5s...")
		time.Sleep(5 * time.Second)
	}
	defer conn.Close()

	ch, _ := conn.Channel()
	defer ch.Close()

	q, _ := ch.QueueDeclare("rss_tasks", true, false, false, false, nil)
	
	ch.Qos(10, 0, false)

	msgs, _ := ch.Consume(q.Name, "", true, false, false, false, nil)

	fp := gofeed.NewParser()
	log.Println("Worker ready!")

	for d := range msgs {
		var msg NestJSMessage
		if err := json.Unmarshal(d.Body, &msg); err != nil {
			log.Printf("Error JSON: %v", err)
			continue
		}
		go processFeed(msg.Data.URL, client, fp)
	}
}