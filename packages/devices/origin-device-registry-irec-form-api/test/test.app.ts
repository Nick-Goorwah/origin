/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Configuration, ConfigurationModule } from '@energyweb/origin-backend';
import { IUser, OrganizationStatus, Role, UserStatus } from '@energyweb/origin-backend-core';
import { DatabaseService } from '@energyweb/origin-backend-utils';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Device, DeviceModule, DeviceService } from '../src/device';

export enum TestUser {
    OrganizationAdmin = '0',
    OtherOrganizationAdmin = '1',
    PlatformAdmin = '2',
    SubmittedOrganizationAdmin = '3'
}

export const testUsers = new Map([
    [
        TestUser.OrganizationAdmin,
        {
            id: 1,
            organization: { id: 1000, status: OrganizationStatus.Active },
            status: UserStatus.Active,
            rights: Role.OrganizationAdmin
        } as IUser
    ],
    [
        TestUser.SubmittedOrganizationAdmin,
        {
            id: 1,
            organization: { id: 1000, status: OrganizationStatus.Submitted },
            status: UserStatus.Active,
            rights: Role.OrganizationAdmin
        } as IUser
    ],
    [
        TestUser.OtherOrganizationAdmin,
        {
            id: 2,
            organization: { id: 1001, status: OrganizationStatus.Active },
            status: UserStatus.Active,
            rights: Role.OrganizationAdmin
        } as IUser
    ],
    [
        TestUser.PlatformAdmin,
        {
            id: 3,
            organization: { id: 1002, status: OrganizationStatus.Active },
            status: UserStatus.Active,
            rights: Role.Admin
        } as IUser
    ]
]);

const authGuard: CanActivate = {
    canActivate: (context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        req.user = testUsers.get(req.headers['test-user']);
        return true;
    }
};

export const bootstrapTestInstance = async () => {
    const moduleFixture = await Test.createTestingModule({
        imports: [
            TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST ?? 'kyanite-server.postgres.database.azure.com',
                port: Number(process.env.DB_PORT) ?? 5432,
                username: process.env.DB_USERNAME ?? 'lvcddedcrc',
                password: process.env.DB_PASSWORD ?? '3N8U0QL1L35L43JR$',
                database: process.env.DB_DATABASE ?? 'origin',
                entities: [Device, Configuration],
                logging: ['info']
            }),
            ConfigurationModule,
            DeviceModule.register(null)
        ],
        providers: [DatabaseService]
    })
        .overrideGuard(AuthGuard('default'))
        .useValue(authGuard)
        .compile();

    const app = moduleFixture.createNestApplication();

    const deviceService = await app.resolve<DeviceService>(DeviceService);
    const databaseService = await app.resolve<DatabaseService>(DatabaseService);

    app.useLogger(['log', 'error']);
    app.enableCors();

    return {
        deviceService,
        databaseService,
        app
    };
};
