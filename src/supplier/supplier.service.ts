import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierResposeDTO } from './dto/supplier-response.dto';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}
  async create(
    createSupplierDto: CreateSupplierDto,
  ): Promise<SupplierResposeDTO> {
    const supplier = this.supplierRepository.create(createSupplierDto);
    const supplierSaved = await this.supplierRepository.save(supplier);
    return new SupplierResposeDTO(supplierSaved);
  }

  async findAll(): Promise<SupplierResposeDTO[]> {
    const suppliers = await this.supplierRepository.find({
      relations: ['products'],
    });
    return suppliers.map((supplier) => new SupplierResposeDTO(supplier));
  }

  async findOneEntity(id: string): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier) {
      throw new NotFoundException(`Fornecedor não encontrado com o id: ${id}`);
    }
    return supplier;
  }

  async findOne(id: string): Promise<SupplierResposeDTO> {
    const supplier = await this.findOneEntity(id);
    return new SupplierResposeDTO(supplier);
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplierUpdating = await this.findOneEntity(id);
    Object.assign(supplierUpdating, updateSupplierDto);
    const supplier = await this.supplierRepository.save(supplierUpdating);
    return new SupplierResposeDTO(supplier);
  }

  async remove(id: string) {
    return await this.supplierRepository.delete(id);
  }
}
