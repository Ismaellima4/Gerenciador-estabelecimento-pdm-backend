import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UploadService {
  private readonly uploadApiUrl: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.uploadApiUrl = this.configService.getOrThrow<string>('UPLOAD_API_URL');
  }

  async uploadFile(
    file: Express.Multer.File,
    uniqueFileName: string,
    jwt_token: string | undefined,
  ): Promise<void> {
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
    });
    formData.append('product_id', uniqueFileName);

    await firstValueFrom(
      this.httpService.post(String(this.uploadApiUrl + '/upload'), formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: jwt_token,
        },
      }),
    );
  }
}
