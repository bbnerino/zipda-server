import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { SignUpDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { UserDocument } from "../users/schemas/user.schema";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, name } = signUpDto;

    // 이메일 중복 체크
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException("이미 존재하는 이메일입니다.");
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
    });

    return {
      message: "회원가입 완료",
      userId: user._id,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 사용자 찾기
    const user = (await this.usersService.findByEmail(email)) as UserDocument;
    if (!user) {
      throw new UnauthorizedException("이메일 또는 비밀번호가 잘못되었습니다.");
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("이메일 또는 비밀번호가 잘못되었습니다.");
    }

    // JWT 토큰 생성
    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    };
  }
}
