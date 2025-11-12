import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private s3: S3Client;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.s3 = new S3Client({
      region: this.configService.getOrThrow<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(file: Express.Multer.File, proId?: number) {
    if (!file) {
      throw new Error('Nenhum arquivo enviado');
    }

    const bucketName = this.configService.getOrThrow<string>('AWS_S3_BUCKET');
    const region = this.configService.getOrThrow<string>('AWS_REGION');
    const fileKey = `uploads/${uuid()}${path.extname(file.originalname)}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;

    // Exemplo: salvar o caminho no banco (caso você tenha uma tabela de imagens ou perfil)
    if (proId) {
      await this.prisma.pro_produto.update({
        where: { pro_id: proId },
        data: { pro_caminho_img: imageUrl }, 
      });
    }

    return { imageUrl };
  }
}
