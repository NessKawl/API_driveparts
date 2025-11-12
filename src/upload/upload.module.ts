import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './upload.controller';
import { PrismaModule } from 'src/prisma.module';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true })]

})
export class UploadModule { }
