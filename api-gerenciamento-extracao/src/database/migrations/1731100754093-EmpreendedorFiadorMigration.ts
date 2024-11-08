import { MigrationInterface, QueryRunner } from "typeorm";

export class EmpreendedorFiadorMigration1731100754093 implements MigrationInterface {
    name = 'EmpreendedorFiadorMigration1731100754093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`empreendedor_fiador\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`nomeImobiliaria\` varchar(225) NOT NULL, \`cnpj\` varchar(65) NOT NULL, \`email\` varchar(225) NOT NULL, \`numNire\` varchar(65) NOT NULL, \`dataSessao\` date NOT NULL, \`endereco_id\` varchar(255) NULL, \`socio_id\` varchar(255) NULL, UNIQUE INDEX \`IDX_b04e00523fd925c203ccf0de81\` (\`cnpj\`), UNIQUE INDEX \`REL_6dcfd08c60a3c4843155c104ea\` (\`socio_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`empreendedor_fiador\` ADD CONSTRAINT \`FK_c390e033c65114e38b32b9b0652\` FOREIGN KEY (\`endereco_id\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`empreendedor_fiador\` ADD CONSTRAINT \`FK_6dcfd08c60a3c4843155c104eab\` FOREIGN KEY (\`socio_id\`) REFERENCES \`socio\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`empreendedor_fiador\` DROP FOREIGN KEY \`FK_6dcfd08c60a3c4843155c104eab\``);
        await queryRunner.query(`ALTER TABLE \`empreendedor_fiador\` DROP FOREIGN KEY \`FK_c390e033c65114e38b32b9b0652\``);
        await queryRunner.query(`DROP INDEX \`REL_6dcfd08c60a3c4843155c104ea\` ON \`empreendedor_fiador\``);
        await queryRunner.query(`DROP INDEX \`IDX_b04e00523fd925c203ccf0de81\` ON \`empreendedor_fiador\``);
        await queryRunner.query(`DROP TABLE \`empreendedor_fiador\``);
    }

}
