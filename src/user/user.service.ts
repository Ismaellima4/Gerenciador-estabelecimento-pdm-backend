import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptedPassword } from 'src/common/encrypted-utils';
import { UserResponseDto } from './dto/user-response.dto';
import { UserRole } from 'src/enum/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const password = await encryptedPassword(createUserDto.password);
    const userSaved = await this.userRepository.save({
      username: createUserDto.username,
      password: password,
      role: UserRole.Admin,
    });
    return new UserResponseDto(userSaved);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserResponseDto(user));
  }

  async findOneByUserName(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }
    return user;
  }

  async remove(id: string) {
    return this.userRepository.delete(id);
  }
}
