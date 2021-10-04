import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UserResponseObject } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>){}

  
  async register(createUserDto: CreateUserDto): Promise<UserResponseObject> {
    const { username } = createUserDto
    let user = await this.userRepository.findOne({ where: { username }});

    if(user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(createUserDto)
    
    await this.userRepository.save(user);
    
    return user.toResponseObject();
  }
  
  async login(createUserDto: CreateUserDto): Promise<UserResponseObject> {
    const { username, password } = createUserDto
    const user = await this.userRepository.findOne({ where: { username }});

    if(!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid username or password', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObject();
  }

  async findAll(): Promise<UserResponseObject[]> {
    const users = await this.userRepository.find();
    return users.map(user => user.toResponseObject(false));
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
