import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { PostService } from './post.service';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { PaginationParams } from '../utils/paginationParams';
import ParamsWithId from '../utils/paramsWithId';
import PostDto from './dto/post.dto';
import UpdatePostDto from './dto/update.post.dto';
import RequestWithUser from '../user/requestWithUser.interface';
import { Post as PostModel } from './post.schema';
@Controller('post')
// @UseInterceptors(MongooseClassSerializerInterceptor(PostModel))
export class PostController {
  constructor(private readonly postsService: PostService) {}

  // @UseGuards(AccessTokenGuard)
  @Get()
  async getAllPosts(
    @Query() { skip, limit, startId }: PaginationParams,
    @Query('searchQuery') searchQuery: string,
  ) {
    return this.postsService.findAll(skip, limit, startId, searchQuery);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getPost(@Param() { id }: ParamsWithId) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async createPost(@Body() post: PostDto, @Req() req: RequestWithUser) {
    return this.postsService.create(post, req.user);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deletePost(@Param() { id }: ParamsWithId) {
    return this.postsService.delete(id);
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async updatePost(@Param() { id }: ParamsWithId, @Body() post: UpdatePostDto) {
    return this.postsService.update(id, post);
  }
}
