import { IsUrl, IsNotEmpty } from 'class-validator';

export class CreateRssDto {
  @IsUrl({}, { message: 'Invalid URL provided for the RSS feed' })
  @IsNotEmpty()
  url: string;
}
