import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async platform(loginDto: LoginDto) {
    // password tiene `select: false` en la entidad, hay que pedirlo explicitamente
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username: loginDto.username })
      .getOne();

    // mismo error para usuario inexistente o contraseña incorrecta (evita enumeracion)
    const passwordOk = user && (await bcrypt.compare(loginDto.password, user.password));
    if (!passwordOk) {
      throw new NotFoundException('Credenciales invalidas');
    }

    const { password, ...result } = user;
    return result;
  }
}
