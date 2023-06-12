import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Category } from './category.schema';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { CategoryService } from './category.service';
import ParamsWithId from '../utils/paramsWithId';
import CategoryDto from './dto/category.dto';
import RequestWithUser from '../user/requestWithUser.interface';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';

@Controller('category')
@UseInterceptors(MongooseClassSerializerInterceptor(Category))
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getAllCategories() {
    return this.categoriesService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getCategory(@Param() { id }: ParamsWithId) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async createCategory(
    @Body() category: CategoryDto,
    @Req() req: RequestWithUser,
  ) {
    return this.categoriesService.create(category, req.user);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deleteCategory(@Param() { id }: ParamsWithId) {
    return this.categoriesService.delete(id);
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async updateCategory(
    @Param() { id }: ParamsWithId,
    @Body() category: CategoryDto,
  ) {
    return this.categoriesService.update(id, category);
  }
}
