import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-category.dto';
import { UpdateCategoriaDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriaRepository: Repository<Category>,
  ) {}
  create(createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaRepository.save({ name: createCategoriaDto.name });
  }

  findAll() {
    return this.categoriaRepository.find();
  }

  findOne(name: string) {
    return this.categoriaRepository.findOne({ where: { name } });
  }

  update(name: string, updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaRepository.update(name, updateCategoriaDto);
  }

  remove(name: string) {
    return this.categoriaRepository.delete(name);
  }
}
