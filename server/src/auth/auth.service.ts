import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async platform(loginDto: LoginDto): Promise<LoginResponseDto | null> {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.username = :username", { username: loginDto.username })
      .getOne();

    const passwordOk =
      user && (await bcrypt.compare(loginDto.password, user.password));
    if (!passwordOk) {
      throw new NotFoundException("Credenciales invalidas");
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });

    return new LoginResponseDto(user.username, token);
  }
}
