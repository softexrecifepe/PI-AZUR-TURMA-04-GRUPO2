import { MigrationInterface, QueryRunner } from "typeorm";

export class RepresentanteMigration1731100267034 implements MigrationInterface {
    name = 'RepresentanteMigration1731100267034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`representante\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`nome\` varchar(255) NOT NULL, \`nacionalidade\` varchar(65) NOT NULL, \`email\` varchar(100) NOT NULL, \`dataNascimento\` date NOT NULL, \`profissao\` varchar(100) NOT NULL, \`cpf\` varchar(14) NOT NULL, \`numDocumento\` varchar(50) NOT NULL, \`dataExpedicao\` date NOT NULL, \`orgaoExpedidor\` varchar(100) NOT NULL, \`estadoCivil\` enum ('Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Uniao estável') NOT NULL, \`regimeComunhao\` varchar(100) NULL, \`nome_mae\` varchar(255) NOT NULL, \`nome_pai\` varchar(255) NULL, \`endereco_id\` varchar(255) NULL, UNIQUE INDEX \`IDX_068f0d270ac291b5f88704d931\` (\`email\`), UNIQUE INDEX \`IDX_abf651affca968ba97f7ce7c96\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`representante\` ADD CONSTRAINT \`FK_1e1d345cfdc0220b2071ba6c638\` FOREIGN KEY (\`endereco_id\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`representante\` DROP FOREIGN KEY \`FK_1e1d345cfdc0220b2071ba6c638\``);
        await queryRunner.query(`DROP INDEX \`IDX_abf651affca968ba97f7ce7c96\` ON \`representante\``);
        await queryRunner.query(`DROP INDEX \`IDX_068f0d270ac291b5f88704d931\` ON \`representante\``);
        await queryRunner.query(`DROP TABLE \`representante\``);
    }

}
