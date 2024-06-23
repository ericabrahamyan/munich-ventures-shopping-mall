import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

import { validate } from './env.validation';
import { ProductModule } from './resources/product/product.module';
import { CategoryModule } from './resources/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    DatabaseModule,
    ProductModule,
    CategoryModule,
  ],
  providers: [],
})
export class AppModule {}
