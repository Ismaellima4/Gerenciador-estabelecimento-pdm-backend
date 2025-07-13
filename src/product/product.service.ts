import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResposeDTO } from './dto/product-respose.dto';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { SupplierService } from 'src/supplier/supplier.service';
import { UploadService } from 'src/upload/upload.service';
import { extname } from 'path';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly supplierService: SupplierService,
    private readonly uploadService: UploadService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    jwt_token: string | undefined,
    file?: Express.Multer.File,
  ): Promise<ProductResposeDTO> {
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

    if (file) {
      const uniqueFileName = `${productSaved.id}${extname(file.originalname)}`;
      await this.uploadService.uploadFile(file, uniqueFileName, jwt_token);
    }

    return new ProductResposeDTO(productSaved);
  }

  async findAll(): Promise<ProductResposeDTO[]> {
    const products = await this.productRepository.find({
      relations: ['category', 'supplier'],
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
      relations: ['category', 'supplier'],
    });
    if (!product) {
      throw new NotFoundException(`Produto não encontrado com o id ${id}}`);
    }
    return product;
  }

  async findAllById(ids: string[]): Promise<Product[]> {
    return this.productRepository.find({
      where: { id: In(ids) },
      relations: ['category', 'supplier'],
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productUpdating = await this.findOneEntity(id);
    Object.assign(productUpdating, updateProductDto);
    if (updateProductDto.category) {
      const category = await this.categoryService.findOneEntity(
        updateProductDto.category,
      );
      productUpdating.category = category;
    }
    if (updateProductDto.supplier) {
      const supplier = await this.supplierService.findOneEntity(
        updateProductDto.supplier,
      );
      productUpdating.supplier = supplier;
    }
    const product = await this.productRepository.save(productUpdating);
    return new ProductResposeDTO(product);
  }

  async remove(id: string) {
    return this.productRepository.delete(id);
  }
}
