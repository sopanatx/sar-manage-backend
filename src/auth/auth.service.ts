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

  async signIn(localAuthDto: LocalAuthDto): Promise<tokenModel> {
    const { username, password } = localAuthDto;
    const getUser = await this.prisma.account.findUnique({
      where: {
        username,
      },
    });
    return {
      accessToken: '',
      refreshToken: '',
    };
  }
}
