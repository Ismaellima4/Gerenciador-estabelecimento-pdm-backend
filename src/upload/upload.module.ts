import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
