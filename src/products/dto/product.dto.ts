import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateValue {
  @IsBoolean()
  boolean: boolean;

  @IsNotEmpty()
  product_code: string;

  @IsNotEmpty()
  new_price: string;
}
