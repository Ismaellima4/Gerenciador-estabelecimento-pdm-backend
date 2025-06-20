import { Category } from '../entities/category.entity';

export class CategoryResponseDTO {
  name: string;

  constructor(category: Category) {
    this.name = category.name;
  }
}
