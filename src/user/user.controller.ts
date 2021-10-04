import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from './user.decorator';


@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('api/register')
  @UsePipes(new ValidationPipe())
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('api/login')
  @UsePipes(new ValidationPipe())
  login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }

  @Get('api/users')
  @UseGuards(new AuthGuard())
  findAll(@User() user) {
    console.log(user);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
