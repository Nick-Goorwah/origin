import { IntUnitsOfEnergy } from '@energyweb/origin-backend-utils';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DemandModule } from './demand';
import { OrderModule } from './order';
import { OrderBookModule } from './order-book';
import { ProductModule } from './product';
import { RunnerModule } from './runner';
import { TradeModule } from './trade';
import { ExportModule } from './export';
import { ImportModule } from './import';

@Module({
    imports: [
        ConfigModule,
        OrderModule,
        OrderBookModule,
        ProductModule,
        RunnerModule,
        DemandModule,
        TradeModule,
        ExportModule,
        ImportModule
    ],
    providers: [IntUnitsOfEnergy]
})
export class AppModule {}
