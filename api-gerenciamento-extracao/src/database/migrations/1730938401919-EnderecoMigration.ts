import { MigrationInterface, QueryRunner } from "typeorm";

export class EnderecoMigration1730938401919 implements MigrationInterface {
    name = 'EnderecoMigration1730938401919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`endereco\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`rua\` varchar(255) NOT NULL, \`numero\` int NOT NULL, \`bairro\` varchar(50) NOT NULL, \`cidade\` varchar(50) NOT NULL, \`estado\` varchar(50) NOT NULL, \`cep\` varchar(8) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`endereco\``);
    }

}
