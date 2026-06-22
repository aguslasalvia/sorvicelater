import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("platform")
  platform(@Body() loginDto: LoginDto) {
    return this.authService.platform(loginDto);
  }
}
