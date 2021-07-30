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
import * as crypto from 'crypto';
import { getUserTypesFromSchema } from '@graphql-tools/utils';
import { UpdateAccountDto } from './dto/UpdateAccount.dto';
import { MyAccountModel } from './model/myaccount.model';
import sendMail from 'src/shared/mail.service';
import { ValidateTokenDto } from './dto/validateToken.dto';
import { ResetPasswordDto } from './dto/ResetPassword.dto';

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
    const getUser = await this.prisma.account.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        userLevel: true,
        email: true,
      },
    });
    if (!validate)
      throw new UnauthorizedException('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');

    const accessToken = await this.jwtService.sign({
      id: getUser.id,
      username: getUser.username,
      fullname: getUser.fullname,
      role: getUser.userLevel,
    });
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
    await sendMail('login', getUser.email, getUser.fullname);
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
    console.log(passwordResetDto);
    const username = passwordResetDto.username;
    const getUser = await this.prisma.account.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
        email: true,
        fullname: true,
      },
    });
    if (!getUser) {
      throw new NotFoundException('ไม่มีผู้ใช้งานนี้ในระบบ');
    }
    // Get Current Time
    const renewRequestTime = new Date();
    // Get Expired Time
    const expiredTime = new Date();
    // set expired time after 60 days
    expiredTime.setDate(renewRequestTime.getDay() + 1);
    const token = crypto
      .randomBytes(32)
      .toString('base64')
      .replace(/\//g, '')
      .replace(/\=/g, '')
      .replace(/\+/g, '');

    try {
      const createPasswordReset = await this.prisma.passwordReset.create({
        data: {
          username,
          resetPasswordToken: token,
          requested: renewRequestTime,
          expired: expiredTime, //
        },
      });

      await sendMail('resetPassword', getUser.email, getUser.fullname, token);
      return {
        status: 'ok',
        statusMessage:
          'โปรดตรวจสอบอีเมลของท่าน เพื่อทำการกู้คืนรหัสผ่านในการเข้าสู่ระบบ',
      };
    } catch (err) {
      throw new InternalServerErrorException(
        'เซิร์ฟเวอร์ไม่สามารถประมวลผลคำขอนี้ได้ (Server Error)',
      );
    }
  }

  async UpdateAccountInfo(
    updateAccountDto: UpdateAccountDto,
    getUser,
  ): Promise<boolean> {
    const { fullname, username, password } = updateAccountDto;
    try {
      if (password) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        await this.prisma.account.update({
          where: {
            id: getUser.id,
          },
          data: {
            password: hash,
            passwordSalt: salt,
          },
        });
      }

      const updateAccount = await this.prisma.account.update({
        where: {
          id: getUser.id,
        },
        data: {
          fullname,
          username,
        },
      });
      await sendMail(
        'UpdateAccount',
        updateAccount.email,
        updateAccount.fullname,
      );

      return true;
    } catch {
      return false;
    }
  }

  async MyProfileInfo(getUser): Promise<MyAccountModel> {
    const { id } = getUser;

    const getAccountInfo = await this.prisma.account.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!getAccountInfo) throw new NotFoundException();
    return getAccountInfo;
  }
  async validateToken(validateToken: ValidateTokenDto): Promise<boolean> {
    const { token } = validateToken;
    const getToken = await this.prisma.passwordReset.findUnique({
      where: {
        resetPasswordToken: token,
      },
    });
    const currentDate = new Date();
    if (!getToken) throw new NotFoundException('Token not found');
    if (getToken.expired < currentDate)
      throw new NotFoundException('Token expired');

    return true;
  }

  async ResetPassword(resetPassword: ResetPasswordDto): Promise<boolean> {
    const { token, password } = resetPassword;
    const getToken = await this.prisma.passwordReset.findUnique({
      where: {
        resetPasswordToken: token,
      },
    });
    if (!getToken) throw new NotFoundException('Token not found');
    const currentDate = new Date();
    if (getToken.expired < currentDate)
      throw new NotFoundException('Token expired');
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    try {
      await this.prisma.account.update({
        where: {
          username: getToken.username,
        },
        data: {
          password: hash,
          passwordSalt: salt,
        },
      });
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
