import { MigrationInterface, QueryRunner } from "typeorm";

export class CredoraMigration1731100802736 implements MigrationInterface {
    name = 'CredoraMigration1731100802736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`credora\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`nomeCredora\` varchar(225) NOT NULL, \`nomeDoravante\` varchar(225) NOT NULL, \`cnpj\` varchar(65) NOT NULL, \`endereco_id\` varchar(255) NULL, \`representante_id\` varchar(255) NULL, UNIQUE INDEX \`IDX_a230f9b52e2697c8c0244bc39d\` (\`cnpj\`), UNIQUE INDEX \`REL_50ddb8b4519afd35fe5dfc9b4c\` (\`representante_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`credora\` ADD CONSTRAINT \`FK_9ebd732618ba6773a8e01115372\` FOREIGN KEY (\`endereco_id\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`credora\` ADD CONSTRAINT \`FK_50ddb8b4519afd35fe5dfc9b4c3\` FOREIGN KEY (\`representante_id\`) REFERENCES \`representante\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`credora\` DROP FOREIGN KEY \`FK_50ddb8b4519afd35fe5dfc9b4c3\``);
        await queryRunner.query(`ALTER TABLE \`credora\` DROP FOREIGN KEY \`FK_9ebd732618ba6773a8e01115372\``);
        await queryRunner.query(`DROP INDEX \`REL_50ddb8b4519afd35fe5dfc9b4c\` ON \`credora\``);
        await queryRunner.query(`DROP INDEX \`IDX_a230f9b52e2697c8c0244bc39d\` ON \`credora\``);
        await queryRunner.query(`DROP TABLE \`credora\``);
    }

}
