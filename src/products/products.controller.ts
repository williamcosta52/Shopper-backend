import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateValue } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post('csv')
  async uploadFile(@Body() body: UpdateValue) {
    return this.productsService.uploadFile(body);
  }
  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }
}
