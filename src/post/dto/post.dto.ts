import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	phone: string;

	@IsNotEmpty()
	@IsDateString()
	startDate: Date;

	@IsNotEmpty()
	@IsDateString()
	endDate: Date;

  @IsString()
  @IsNotEmpty()
  content: string;

	@IsNumber()
	@IsNotEmpty()
	minPrice: number;

	@IsNumber()
	@IsNotEmpty()
	maxPrice: number;

	@IsNumber()
	@IsNotEmpty()
	ticketsNumber: number;

  categories: string[];
}

export default PostDto;
