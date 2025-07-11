import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import FormData = require('form-data');
import { extname } from 'path';

@Injectable()
export class UploadService {
  private readonly uploadApiUrl;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.uploadApiUrl = this.configService.get<string>('UPLOAD_API_URL');
  }

  uploadFile(file: Express.Multer.File, product_id: string) {
    const formData = new FormData();
    const uniqueFileName = product_id + extname(file.originalname);

    formData.append('file', file.buffer, {
      filename: file.originalname,
    });
    formData.append('product_id', uniqueFileName);

    return this.httpService.post(
      String(this.uploadApiUrl + '/upload'),
      formData,
      {
        headers: formData.getHeaders(),
      },
    );
  }
}
