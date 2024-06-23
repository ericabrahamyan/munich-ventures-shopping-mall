import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
  IsBooleanString,
} from 'class-validator';

enum EnvStage {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsEnum(EnvStage)
  STAGE: EnvStage;

  @IsString()
  DB_URL: string;

  @IsBooleanString()
  DB_SYNC: string;

  @IsNumber()
  PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
