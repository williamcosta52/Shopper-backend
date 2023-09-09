import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({})
export class ProductsModule {
  controllers: [ProductsController];
  providers: [ProductsService];
}
