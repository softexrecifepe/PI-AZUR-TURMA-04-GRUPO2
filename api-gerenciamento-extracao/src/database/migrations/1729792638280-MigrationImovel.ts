import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationImovel1729792638280 implements MigrationInterface {
    name = 'MigrationImovel1729792638280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`imovel\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`caracteristica\` varchar(150) NOT NULL, \`areaConstruida\` int NOT NULL, \`areaPrivada\` int NOT NULL, \`areaComum\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`imovel\``);
    }

}
