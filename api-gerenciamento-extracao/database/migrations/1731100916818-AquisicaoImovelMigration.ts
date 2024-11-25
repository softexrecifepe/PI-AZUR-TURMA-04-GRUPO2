import { MigrationInterface, QueryRunner } from "typeorm";

export class AquisicaoImovelMigration1731100916818 implements MigrationInterface {
    name = 'AquisicaoImovelMigration1731100916818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`aquisicao_imovel\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`valorAquisicao\` decimal(10,2) NOT NULL, \`recursosProprios\` decimal(10,2) NOT NULL, \`recursosFGTS\` decimal(10,2) NOT NULL, \`financiamentoCredora\` decimal(10,2) NOT NULL, \`origemRecursos\` varchar(255) NOT NULL, \`normaRegulamentadora\` varchar(255) NOT NULL, \`valorAcessorias\` decimal(10,2) NOT NULL, \`valorDivida\` decimal(10,2) NOT NULL, \`valorLeilao\` decimal(10,2) NOT NULL, \`sistemaAmortizacao\` varchar(255) NOT NULL, \`attSaldoDevedor\` decimal(10,2) NOT NULL, \`imovel_id\` varchar(255) NULL, UNIQUE INDEX \`REL_7bd9a4cec014e935663dd42d2f\` (\`imovel_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`aquisicao_imovel\` ADD CONSTRAINT \`FK_7bd9a4cec014e935663dd42d2ff\` FOREIGN KEY (\`imovel_id\`) REFERENCES \`imovel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aquisicao_imovel\` DROP FOREIGN KEY \`FK_7bd9a4cec014e935663dd42d2ff\``);
        await queryRunner.query(`DROP INDEX \`REL_7bd9a4cec014e935663dd42d2f\` ON \`aquisicao_imovel\``);
        await queryRunner.query(`DROP TABLE \`aquisicao_imovel\``);
    }

}
