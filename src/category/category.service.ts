import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-category.dto';
import { UpdateCategoriaDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryResponseDTO } from './dto/category-response.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriaRepository: Repository<Category>,
  ) {}
  async create(
    createCategoriaDto: CreateCategoriaDto,
  ): Promise<CategoryResponseDTO> {
    const category: Category = await this.categoriaRepository.save({
      name: createCategoriaDto.name,
    });
    return new CategoryResponseDTO(category);
  }

  async findAll(): Promise<CategoryResponseDTO[]> {
    const categories = await this.categoriaRepository.find();
    return categories.map((category) => new CategoryResponseDTO(category));
  }

  async findOne(id: string): Promise<CategoryResponseDTO> {
    const category = await this.findOneEntity(id);
    return new CategoryResponseDTO(category);
  }

  async findOneEntity(id: string): Promise<Category> {
    const category = await this.categoriaRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Categoria não encontrada com o id ${id}`);
    }
    return category;
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const categoryUpdating = await this.findOneEntity(id);
    Object.assign(categoryUpdating, updateCategoriaDto);
    const category = await this.categoriaRepository.save(categoryUpdating);
    return new CategoryResponseDTO(category);
  }

  async remove(id: string) {
    return this.categoriaRepository.delete(id);
  }
}
