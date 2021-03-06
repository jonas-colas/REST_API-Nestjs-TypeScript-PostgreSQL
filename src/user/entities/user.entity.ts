import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserResponseObject } from '../dto/create-user.dto';


@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;
  
  @Column('text')
  password: string;

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true): UserResponseObject {
    const { id, username, created, token } = this;
    const responseObject = { id, username, created, token };

    if(showToken) {
      responseObject.token = token;
    }
    return responseObject;
  }

  async comparePassword(attempt: string){
    return await bcrypt.compare(attempt, this.password);
  }

  private get  token(){
    const { id, username } = this;
    return jwt.sign({ id, username }, process.env.SECRET, {expiresIn: '7d'}, )
  }
}
