import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findProductByCode(code: number) {
    return this.prisma.product.findFirst({
      where: { code },
    });
  }
  uploadFile(new_price: number, product_code: number) {
    return this.prisma.product.updateMany({
      data: {
        salesPrice: new_price,
      },
      where: { code: Number(product_code) },
    });
  }
  getProducts() {
    return this.prisma.product.findMany();
  }
}
