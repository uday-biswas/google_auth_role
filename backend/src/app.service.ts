import { Injectable } from '@nestjs/common';
import { AppConfigService } from './config/config.service';

@Injectable()
export class AppService {
  constructor(private readonly configService: AppConfigService) { }

  getDbFrontend(): string {
    return this.configService.dbFrontend;
  }

  getDbBackend(): string {
    return this.configService.dbBackend;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
