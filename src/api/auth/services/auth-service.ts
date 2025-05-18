import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user-schema';
import { SignUpDto } from 'src/dto/auth-dto/sign-up-dto';
import { SignInDto } from 'src/dto/auth-dto/sign-in-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string; name: string }> {
    const { name, password } = signUpDto;

    const checkUser = await this.userModel.findOne({ name });

    if (checkUser) {
      throw new UnauthorizedException('This username is already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token, name: user.name };
  }

  async signIn(SignInDto: SignInDto): Promise<{ token: string; name: string }> {
    const { name, password } = SignInDto;

    const user = await this.userModel.findOne({ name });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token, name: user.name };
  }
}
