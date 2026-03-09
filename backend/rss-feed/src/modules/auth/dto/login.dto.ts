import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  @ApiProperty({
    description: 'The user email',
  })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({
    description: 'The user password',
  })
  password: string;
}
