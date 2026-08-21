import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto, RegisterDto } from "./dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signToken(user: { id: number; email: string }) {
    const payload = { sub: user.id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }

  async register(data: RegisterDto) {
    const user = await this.usersService.createUser(data);
    const token = await this.signToken({ id: user.id, email: user.email });
    return { token, data: { id: user.id, email: user.email, name: user.name } };
  }

  async login(data: LoginDto) {
    const user = await this.usersService.validateUser(data);
    const token = await this.signToken({ id: user.id, email: user.email });
    return { token, data: { id: user.id, email: user.email, name: user.name } };
  }
}
