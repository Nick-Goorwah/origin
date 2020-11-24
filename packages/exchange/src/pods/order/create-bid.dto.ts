import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, IsPositive, Validate, ValidateNested } from 'class-validator';
import { IntUnitsOfEnergy, PositiveBNStringValidator } from '@energyweb/origin-backend-utils';

import { ApiProperty } from '@nestjs/swagger';
import { ProductDTO } from './product.dto';

export class CreateBidDTO {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @Validate(PositiveBNStringValidator)
    @Validate(IntUnitsOfEnergy)
    readonly volume: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    readonly price: number;

    @ApiProperty({ type: Date })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    readonly validFrom: Date;

    @ApiProperty({ type: ProductDTO })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ProductDTO)
    readonly product: ProductDTO;
}
