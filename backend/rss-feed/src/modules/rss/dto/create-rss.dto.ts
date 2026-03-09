import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsNotEmpty } from 'class-validator';

export class CreateRssDto {
  @IsUrl({}, { message: 'Invalid URL provided for the RSS feed' })
  @IsNotEmpty()
  @ApiProperty({
    description: 'The RSS feed URL',
  })
  url: string;
}
