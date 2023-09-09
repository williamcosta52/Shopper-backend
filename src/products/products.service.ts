import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateValue } from './dto/product.dto';
import { ProductsRepository } from './products.repository';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly ProductsRepository: ProductsRepository) {}
  async uploadFile(body: UpdateValue) {
    const { boolean, product_code, new_price } = body;
    const product = await this.ProductsRepository.findProductByCode(
      Number(product_code),
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const infoProduct = this.calculateDiscount(product, Number(new_price));
    if (boolean) {
      return await this.ProductsRepository.uploadFile(
        Number(product_code),
        Number(new_price),
      );
    }
    return infoProduct;
  }
  calculateDiscount(product: Product, new_price: number) {
    const diff = Number(product.salesPrice) - Number(new_price);
    const percentage = (diff / Number(product.salesPrice)) * 100;
    const fullProductyInfo = {
      name: product.name,
      currentPrice: Number(product.salesPrice),
      newPrice: Number(new_price),
      code: Number(product.code),
      percentage: Number(percentage),
    };
    return fullProductyInfo;
  }
  async getProducts() {
    const products = await this.ProductsRepository.getProducts();
    const response = products.map((n) => {
      const result = {
        code: Number(n.code),
        name: n.name,
        currentPrice: n.salesPrice,
        costPrice: n.costPrice,
      };
      return result;
    });
    return response;
  }
}
