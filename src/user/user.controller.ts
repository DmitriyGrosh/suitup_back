import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
  //
  // @UseGuards(AuthGuard('jwt'))
  // @Get(':id')
  // findById(@Param('id') id: string) {
  //   return this.userService.findById(id);
  // }
  //
  // @UseGuards(AuthGuard('jwt'))
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(id, updateUserDto);
  // }
  //
  // @UseGuards(AuthGuard('jwt'))
  // @Get('all')
  // findAll() {
  //   return this.userService.findAll();
  // }
  //
  // @UseGuards(AuthGuard('jwt'))
  // @Get('username')
  // getUserByUsername(@Param() param) {
  //   return this.userService.getUserByUsername(param.username);
  // }
  // @Post('register')
  // registerUser(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.registerUser(createUserDto);
  // }
}
