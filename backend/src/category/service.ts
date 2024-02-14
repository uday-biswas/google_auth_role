import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../typeorm/entities/User';

const createRoles = ['superadmin', 'admin', 'client'];
const updateRoles = ['superadmin', 'admin'];
const deleteRoles = ['superadmin'];

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async createCategory(role: string, name: string, description: string): Promise<any> {
    if (!createRoles.includes(role)) {
      return {
        success: false,
        message: 'You are not authorized to create a category',
      }
    }
    const category = new Category();
    category.name = name;
    category.description = description;
    const newCategory = await this.categoryRepository.save(category);
    return {
      success: true,
      message: 'Category created successfully',
      data: newCategory,
    }
  }

  async updateCategory(id: number, role: string, name: string, description: string): Promise<any> {
    if (!updateRoles.includes(role)) {
      return {
        success: false,
        message: 'You are not authorized to update a category',
      }
    }
    const category = await this.categoryRepository.findOneBy({ id });
    category.name = name;
    category.description = description;
    const updatedCategory = await this.categoryRepository.save(category);
    return {
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory,
    }
  }

  async deleteCategory(id: number, role: string): Promise<any> {
    try {
      if (!deleteRoles.includes(role)) {
        return {
          success: false,
          message: 'You are not authorized to delete a category',
        };
      }

      const category = await this.categoryRepository.findOneBy({ id });
      if (!category) {
        return {
          success: false,
          message: 'Category not found',
        };
      }

      const deleted = await this.categoryRepository.delete(id);
      if (!deleted) {
        return {
          success: false,
          message: 'Failed to delete category',
        };
      }

      return {
        success: true,
        message: 'Category deleted successfully',
        data: deleted,
      };
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error deleting category:', error);
      return {
        success: false,
        message: 'An error occurred while deleting the category',
      };
    }
  }

  async getCategoryById(id: number): Promise<any> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      return {
        success: false,
        message: 'Category not found',
      }
    }
    return {
      success: true,
      data: category,
    }
  }

  async getAllCategories(): Promise<any> {
    const allCategories = await this.categoryRepository.find();
    return {
      success: true,
      data: allCategories,
    }
  }
}