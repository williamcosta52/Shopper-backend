import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';

describe('Health test', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const URL = '/products/csv';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    app.useGlobalPipes(new ValidationPipe());
    await prisma.pack.deleteMany();
    await prisma.product.deleteMany();
    await prisma.product.create({
      data: {
        code: 1,
        costPrice: 15,
        name: 'Rice',
        salesPrice: 20,
      },
    });
    await app.init();
  });
  it('GET /health ', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I'm okay!");
  });
  describe('Products test POST /products/csv', () => {
    it('Should return status 400 Bad Request if no product_code is given', async () => {
      const { status } = await request(app.getHttpServer()).post(URL).send({
        boolean: true,
        new_price: '12.50',
      });
      expect(status).toBe(HttpStatus.BAD_REQUEST);
    });
    it('Should return status 400 Bad Reques if no new_price is given', async () => {
      const { status } = await request(app.getHttpServer()).post(URL).send({
        boolean: true,
        product_code: '12',
      });
      expect(status).toBe(HttpStatus.BAD_REQUEST);
    });
    it('Should return status 404 when product_code does not exist', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post(URL)
        .send({
          boolean: false,
          product_code: '25',
          new_price: '28',
        });
      expect(status).toBe(HttpStatus.NOT_FOUND);
      expect(body.message).toBe('Product not found');
    });
    it('Should not update a price if the boolean is false, and give a body with product info', async () => {
      const { body } = await request(app.getHttpServer()).post(URL).send({
        boolean: false,
        product_code: '1',
        new_price: '25',
      });
      expect(body).toStrictEqual({
        name: 'Rice',
        currentPrice: 20,
        newPrice: 25,
        code: 1,
        percentage: -25,
      });
    });
    it('Should return status 201 and update a price if boolean is true', async () => {
      const { status } = await request(app.getHttpServer()).post(URL).send({
        boolean: true,
        product_code: '1',
        new_price: '22',
      });
      expect(status).toBe(HttpStatus.CREATED);
    });
  });
});
