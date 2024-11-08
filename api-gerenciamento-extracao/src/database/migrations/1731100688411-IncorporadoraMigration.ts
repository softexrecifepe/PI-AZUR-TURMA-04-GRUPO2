import { MigrationInterface, QueryRunner } from "typeorm";

export class IncorporadoraMigration1731100688411 implements MigrationInterface {
    name = 'IncorporadoraMigration1731100688411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`incorporadora\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`nomeImobiliaria\` varchar(225) NOT NULL, \`cnpj\` varchar(65) NOT NULL, \`email\` varchar(225) NOT NULL, \`numNire\` varchar(65) NOT NULL, \`dataSessao\` date NOT NULL, \`endereco_id\` varchar(255) NULL, \`socio_id\` varchar(255) NULL, UNIQUE INDEX \`IDX_37690090d8c3fdc30ac086862f\` (\`cnpj\`), UNIQUE INDEX \`REL_f0fc3bf2e3561e43e7cdde0bf6\` (\`socio_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`incorporadora\` ADD CONSTRAINT \`FK_6df5ed848211f96d36920ef14e3\` FOREIGN KEY (\`endereco_id\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`incorporadora\` ADD CONSTRAINT \`FK_f0fc3bf2e3561e43e7cdde0bf6a\` FOREIGN KEY (\`socio_id\`) REFERENCES \`socio\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`incorporadora\` DROP FOREIGN KEY \`FK_f0fc3bf2e3561e43e7cdde0bf6a\``);
        await queryRunner.query(`ALTER TABLE \`incorporadora\` DROP FOREIGN KEY \`FK_6df5ed848211f96d36920ef14e3\``);
        await queryRunner.query(`DROP INDEX \`REL_f0fc3bf2e3561e43e7cdde0bf6\` ON \`incorporadora\``);
        await queryRunner.query(`DROP INDEX \`IDX_37690090d8c3fdc30ac086862f\` ON \`incorporadora\``);
        await queryRunner.query(`DROP TABLE \`incorporadora\``);
    }

}
