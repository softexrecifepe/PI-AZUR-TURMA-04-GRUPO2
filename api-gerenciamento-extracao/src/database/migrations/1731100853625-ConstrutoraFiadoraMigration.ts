import { MigrationInterface, QueryRunner } from "typeorm";

export class ConstrutoraFiadoraMigration1731100853625 implements MigrationInterface {
    name = 'ConstrutoraFiadoraMigration1731100853625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`construtora_fiadora\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`nomeImobiliaria\` varchar(225) NOT NULL, \`cnpj\` varchar(65) NOT NULL, \`email\` varchar(225) NOT NULL, \`numNire\` varchar(65) NOT NULL, \`dataSessao\` date NOT NULL, \`endereco_id\` varchar(255) NULL, \`socio_id\` varchar(255) NULL, UNIQUE INDEX \`IDX_353550837ad49e953b5586e0a4\` (\`cnpj\`), UNIQUE INDEX \`REL_a65942eb439feb317f8642caf4\` (\`socio_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`construtora_fiadora\` ADD CONSTRAINT \`FK_f6a607a8450df89dda3fd1179c1\` FOREIGN KEY (\`endereco_id\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`construtora_fiadora\` ADD CONSTRAINT \`FK_a65942eb439feb317f8642caf4b\` FOREIGN KEY (\`socio_id\`) REFERENCES \`socio\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`construtora_fiadora\` DROP FOREIGN KEY \`FK_a65942eb439feb317f8642caf4b\``);
        await queryRunner.query(`ALTER TABLE \`construtora_fiadora\` DROP FOREIGN KEY \`FK_f6a607a8450df89dda3fd1179c1\``);
        await queryRunner.query(`DROP INDEX \`REL_a65942eb439feb317f8642caf4\` ON \`construtora_fiadora\``);
        await queryRunner.query(`DROP INDEX \`IDX_353550837ad49e953b5586e0a4\` ON \`construtora_fiadora\``);
        await queryRunner.query(`DROP TABLE \`construtora_fiadora\``);
    }

}
