import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResposeDTO } from './dto/product-respose.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { SupplierService } from 'src/supplier/supplier.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly supplierService: SupplierService,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<ProductResposeDTO> {
    const category = await this.categoryService.findOneEntity(
      createProductDto.category,
    );
    const supplier = await this.supplierService.findOneEntity(
      createProductDto.supplier,
    );
    const product = this.productRepository.create({
      ...createProductDto,
      category,
      supplier,
    });

    const productSaved = await this.productRepository.save(product);

    return new ProductResposeDTO(productSaved);
  }

  async findAll(): Promise<ProductResposeDTO[]> {
    const products = await this.productRepository.find({
      relations: ['category'],
    });
    return products.map((product) => new ProductResposeDTO(product));
  }

  async findOne(id: string): Promise<ProductResposeDTO> {
    const product = await this.findOneEntity(id);
    return new ProductResposeDTO(product);
  }

  async findOneEntity(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Produto não encontrado com o id ${id}}`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productUpdating = await this.findOneEntity(id);
    Object.assign(productUpdating, updateProductDto);
    const product = await this.productRepository.save(productUpdating);
    return new ProductResposeDTO(product);
  }

  async remove(id: string) {
    return this.productRepository.delete(id);
  }
}
