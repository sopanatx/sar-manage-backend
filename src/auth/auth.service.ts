import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalAuthDto } from './dto/local-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EncryptCipherText } from 'src/utils/crypto';
import { tokenModel } from 'src/models/token.model';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    studentId: string,
    studentPassword: string,
  ): Promise<any> {}

  async validatePassword(localAuthDto: LocalAuthDto): Promise<any> {
    const { studentId, studentPassword } = localAuthDto;
    const user = await this.prisma.account
      .findUnique({
        where: { studentId },
      })
      .then();
    if (!user) throw new NotFoundException('User not found!');
    const hash = await bcrypt.hash(studentPassword, user.studentPasswordSalt);
    if (hash != user.studentPassword) throw new UnauthorizedException();
    await this.prisma.account.update({
      where: { studentId: studentId },
      data: { lastLogin: new Date(), updatedAt: new Date() },
    });
    return user;
  }

  async signInWithStudentEmail(
    localAuthDto: LocalAuthDto,
  ): Promise<tokenModel> {
    const getPayload = await this.validatePassword(localAuthDto);
    const {
      id,
      studentId,
      studentFirstName,
      studentLastName,
      userLevel,
    } = getPayload;
    const refreshToken = await EncryptCipherText(
      studentFirstName + ' ' + studentLastName,
      studentId,
    );

    const updateRefreshToken = await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
    const payload = {
      aud: id,
      username: studentId,
      studentName: studentFirstName + ' ' + studentLastName,
      userLevel: userLevel,
    };

    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
