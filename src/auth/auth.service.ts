import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalAuthDto } from './dto/local-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EncryptCipherText } from 'src/utils/crypto';
import { tokenModel } from 'src/models/token.model';
import { LocalAuthRegisterDto } from './dto/local-auth-register.dto';
import { ConflictException } from '@nestjs/common';
import { PasswordResetDto } from './dto/PasswordReset.dto';
import { PasswordResetResponseModel } from 'src/models/Response/PasswordResetResponse.model';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  validatePassword = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    const getUser = await this.prisma.account.findUnique({
      where: {
        username,
      },
    });
    if (!getUser) throw new NotFoundException('ไม่มีชื่อผู้ใช้งานนี้ในระบบ');
    const hash = await bcrypt.hash(password, getUser.passwordSalt);

    if (hash != getUser.password) return false;

    return true;
  };

  async signIn(localAuthDto: LocalAuthDto): Promise<tokenModel> {
    const { username, password } = localAuthDto;
    const validate = await this.validatePassword(username, password);
    console.log(`Validate Password Status : ${validate}`);
    const getUser = await this.prisma.account.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        userLevel: true,
      },
    });
    if (validate) {
      console.log(getUser);
    } else {
      throw new UnauthorizedException('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
    }

    const accessToken = await this.jwtService.sign(getUser);
    const refreshToken = await EncryptCipherText(
      getUser.fullname,
      getUser.username,
    );

    try {
      await this.prisma.account.update({
        where: {
          username,
        },
        data: {
          refreshToken,
          updatedAt: new Date(),
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'ไม่สามารถอัปเดท refreshToken ได้',
      );
    }
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(localAuthRegisterDto: LocalAuthRegisterDto): Promise<any> {
    const { email, username, password, fullname } = localAuthRegisterDto;
    const getUser = await this.prisma.account.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
        email: true,
      },
    });
    // if (getUser) {
    //   throw new ConflictException('This account already exists');
    // }
    if (getUser) {
      throw new ConflictException('This account already exists');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const saveUser = await this.prisma.account.create({
      data: {
        username: username,
        password: hash,
        passwordSalt: salt,
        email: email,
        fullname: fullname,
        userLevel: 'User',
      },
    });

    const payload = { username, password };
    return this.signIn(payload);
  }

  async PasswordReset(
    passwordResetDto: PasswordResetDto,
  ): Promise<PasswordResetResponseModel> {
    return {
      status: 'ok',
      statusMessage: 'Please check your email to reset your password.',
    };
  }
}
