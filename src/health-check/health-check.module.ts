import { Module } from '@nestjs/common';
import { HealthController } from './health-check.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthCheckModule {}
