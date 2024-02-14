// config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) { }

    get dbFrontend(): string {
        return this.configService.get<string>('DB_FRONTEND');
    }

    get dbBackend(): string {
        return this.configService.get<string>('DB_BACKEND');
    }
}
