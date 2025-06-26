import { Supplier } from '../entities/supplier.entity';

export class SupplierResposeDTO {
  id: string;
  supplierName: string;
  cnpj: string;
  phoneNumber: string;
  email: string;
  additionalInformation: string;

  constructor(supplier: Supplier) {
    this.id = supplier.id;
    this.supplierName = supplier.supplierName;
    this.cnpj = supplier.cnpj;
    this.phoneNumber = supplier.phoneNumber;
    this.email = supplier.email;
    this.additionalInformation = supplier.additionalInformation;
  }
}
