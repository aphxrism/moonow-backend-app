/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';
import { DatabaseConfig } from '../config';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up (pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`
        INSERT INTO ${DatabaseConfig.TABLE_NAMES.Categories} (short_name) values 
            ('CPC'),
            ('NFT'),
            ('NTR');
    `)
}

export async function down (pgm: MigrationBuilder): Promise<void> {
    pgm.sql(`DELETE FROM ${DatabaseConfig.TABLE_NAMES.Categories}`)
}
