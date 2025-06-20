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

  async findOne(name: string): Promise<CategoryResponseDTO> {
    const category = await this.findOneEntity(name);
    return new CategoryResponseDTO(category);
  }

  async findOneEntity(name: string): Promise<Category> {
    const category = await this.categoriaRepository.findOne({
      where: { name },
    });
    if (!category) {
      throw new NotFoundException(
        `Categoria não encontrada com o nome de ${name}`,
      );
    }
    return category;
  }

  async update(name: string, updateCategoriaDto: UpdateCategoriaDto) {
    const categoryUpdating = await this.findOneEntity(name);
    Object.assign(categoryUpdating, updateCategoriaDto);
    const category = await this.categoriaRepository.save(categoryUpdating);
    return new CategoryResponseDTO(category);
  }

  async remove(name: string) {
    return this.categoriaRepository.delete(name);
  }
}
