import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../typeorm/entities/User';
import { CategoryController } from './controllers';
import { CategoryService } from './service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule { }
