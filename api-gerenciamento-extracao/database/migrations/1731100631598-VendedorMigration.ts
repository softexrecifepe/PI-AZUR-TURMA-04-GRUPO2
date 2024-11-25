import { MigrationInterface, QueryRunner } from "typeorm";

export class VendedorMigration1731100631598 implements MigrationInterface {
    name = 'VendedorMigration1731100631598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vendedor\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`nomeImobiliaria\` varchar(225) NOT NULL, \`cnpj\` varchar(65) NOT NULL, \`email\` varchar(225) NOT NULL, \`numNire\` varchar(65) NOT NULL, \`dataSessao\` date NOT NULL, \`endereco_id\` varchar(255) NULL, \`socio_id\` varchar(255) NULL, UNIQUE INDEX \`IDX_cb33e306c7a5bd05a45268350c\` (\`cnpj\`), UNIQUE INDEX \`REL_bbeb0b046d2e69b9c1c62f42f9\` (\`socio_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vendedor\` ADD CONSTRAINT \`FK_fe183557e3be84bff63c6a41311\` FOREIGN KEY (\`endereco_id\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vendedor\` ADD CONSTRAINT \`FK_bbeb0b046d2e69b9c1c62f42f93\` FOREIGN KEY (\`socio_id\`) REFERENCES \`socio\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vendedor\` DROP FOREIGN KEY \`FK_bbeb0b046d2e69b9c1c62f42f93\``);
        await queryRunner.query(`ALTER TABLE \`vendedor\` DROP FOREIGN KEY \`FK_fe183557e3be84bff63c6a41311\``);
        await queryRunner.query(`DROP INDEX \`REL_bbeb0b046d2e69b9c1c62f42f9\` ON \`vendedor\``);
        await queryRunner.query(`DROP INDEX \`IDX_cb33e306c7a5bd05a45268350c\` ON \`vendedor\``);
        await queryRunner.query(`DROP TABLE \`vendedor\``);
    }

}
