import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { Category } from '../../category/category.schema';
import { User } from '../../user/user.schema';

export class UpdatePostDto {
  @IsOptional()
  @Exclude()
  _id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => Category)
  categories: Category[];

  @Type(() => User)
  @IsNotEmpty()
  author: User;
}

export default UpdatePostDto;
