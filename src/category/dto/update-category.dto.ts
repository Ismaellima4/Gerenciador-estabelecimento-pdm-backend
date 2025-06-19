import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-category.dto';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}
