import { MigrationInterface, QueryRunner } from "typeorm";

export class ImovelMIgration1731100491293 implements MigrationInterface {
    name = 'ImovelMIgration1731100491293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`imovel\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`caracteristica\` varchar(150) NOT NULL, \`areaConstruida\` int NOT NULL, \`areaPrivada\` int NOT NULL, \`areaComum\` int NOT NULL, \`endereco_id\` varchar(255) NULL, UNIQUE INDEX \`REL_0cdc4574c72f21166ae1bc6b91\` (\`endereco_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`imovel\` ADD CONSTRAINT \`FK_0cdc4574c72f21166ae1bc6b91c\` FOREIGN KEY (\`endereco_id\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`imovel\` DROP FOREIGN KEY \`FK_0cdc4574c72f21166ae1bc6b91c\``);
        await queryRunner.query(`DROP INDEX \`REL_0cdc4574c72f21166ae1bc6b91\` ON \`imovel\``);
        await queryRunner.query(`DROP TABLE \`imovel\``);
    }

}
