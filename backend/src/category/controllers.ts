import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CategoryService } from './service';
import { Category } from '../typeorm/entities/User';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post(':role')
    async createCategory(@Param('role') role: string, @Body() category: Category): Promise<any> {
        return await this.categoryService.createCategory(role, category.name, category.description);
    }

    @Put(':role/:id')
    async updateCategory(@Param('id') id: number, @Param('role') role: string, @Body() category: Category): Promise<any> {
        return await this.categoryService.updateCategory(id, role, category.name, category.description);
    }

    @Post(':role/:id')
    async deleteCategory(@Param('id') id: number, @Param('role') role: string): Promise<any> {
        return await this.categoryService.deleteCategory(id, role);
    }

    @Get()
    async getAllCategories(): Promise<any> {
        const categories = await this.categoryService.getAllCategories();
        return categories;
    }

    @Get(':id')
    async getCategoryById(@Param('id') id: number): Promise<any> {
        return await this.categoryService.getCategoryById(id);
    }
}