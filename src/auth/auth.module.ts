import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaService],
  providers: [AuthService, AuthResolver, PrismaService],
})
export class AuthModule {}
