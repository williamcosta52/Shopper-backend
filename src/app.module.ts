import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsRepository } from './products/products.repository';

@Module({
  imports: [
    ProductsModule,
    PrismaModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService, ProductsRepository],
})
export class AppModule {}
