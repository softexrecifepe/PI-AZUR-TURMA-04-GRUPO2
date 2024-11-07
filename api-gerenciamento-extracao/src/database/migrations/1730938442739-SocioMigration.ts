import { MigrationInterface, QueryRunner } from "typeorm";

export class SocioMigration1730938442739 implements MigrationInterface {
    name = 'SocioMigration1730938442739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`socio\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`nome\` varchar(255) NOT NULL, \`nacionalidade\` varchar(65) NOT NULL, \`email\` varchar(100) NOT NULL, \`dataNascimento\` date NOT NULL, \`profissao\` varchar(100) NOT NULL, \`cpf\` varchar(14) NOT NULL, \`numDocumento\` varchar(50) NOT NULL, \`dataExpedicao\` date NOT NULL, \`orgaoExpedidor\` varchar(100) NOT NULL, \`estadoCivil\` enum ('Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Uniao estável') NOT NULL, \`regimeComunhao\` varchar(100) NULL, \`nome_mae\` varchar(255) NOT NULL, \`nome_pai\` varchar(255) NULL, \`endereco_id\` varchar(255) NULL, UNIQUE INDEX \`IDX_50916dd1e5c9b3077e537bf638\` (\`email\`), UNIQUE INDEX \`IDX_b24b8d2264306d947dd42815b7\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`socio\` ADD CONSTRAINT \`FK_69b432d11d7245c37ee5512e272\` FOREIGN KEY (\`endereco_id\`) REFERENCES \`endereco\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`socio\` DROP FOREIGN KEY \`FK_69b432d11d7245c37ee5512e272\``);
        await queryRunner.query(`DROP INDEX \`IDX_b24b8d2264306d947dd42815b7\` ON \`socio\``);
        await queryRunner.query(`DROP INDEX \`IDX_50916dd1e5c9b3077e537bf638\` ON \`socio\``);
        await queryRunner.query(`DROP TABLE \`socio\``);
    }

}
