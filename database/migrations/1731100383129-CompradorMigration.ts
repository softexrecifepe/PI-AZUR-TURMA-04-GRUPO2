import { MigrationInterface, QueryRunner } from "typeorm";

export class CompradorMigration1731100383129 implements MigrationInterface {
    name = 'CompradorMigration1731100383129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comprador\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`nome\` varchar(255) NOT NULL, \`nacionalidade\` varchar(65) NOT NULL, \`email\` varchar(100) NOT NULL, \`dataNascimento\` date NOT NULL, \`profissao\` varchar(100) NOT NULL, \`cpf\` varchar(14) NOT NULL, \`numDocumento\` varchar(50) NOT NULL, \`dataExpedicao\` date NOT NULL, \`orgaoExpedidor\` varchar(100) NOT NULL, \`estadoCivil\` enum ('Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Uniao estável') NOT NULL, \`regimeComunhao\` varchar(100) NULL, \`nome_mae\` varchar(255) NOT NULL, \`nome_pai\` varchar(255) NULL, \`formaPagamento\` varchar(255) NOT NULL, \`rendaComprovada\` decimal(10,2) NOT NULL, \`rendaNaoComprovada\` decimal(10,2) NOT NULL, \`endereco_id\` varchar(255) NULL, UNIQUE INDEX \`IDX_b2d9ab925cc630bd6e62958ca7\` (\`email\`), UNIQUE INDEX \`IDX_57a4582be2254d52a987218b72\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comprador\` ADD CONSTRAINT \`FK_889deb551aa1b189cbddfd1ac96\` FOREIGN KEY (\`endereco_id\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comprador\` DROP FOREIGN KEY \`FK_889deb551aa1b189cbddfd1ac96\``);
        await queryRunner.query(`DROP INDEX \`IDX_57a4582be2254d52a987218b72\` ON \`comprador\``);
        await queryRunner.query(`DROP INDEX \`IDX_b2d9ab925cc630bd6e62958ca7\` ON \`comprador\``);
        await queryRunner.query(`DROP TABLE \`comprador\``);
    }

}
