import { MigrationInterface, QueryRunner } from "typeorm";

export class SocioMigration1729351276604 implements MigrationInterface {
    name = 'SocioMigration1729351276604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`socio\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`nome\` varchar(255) NOT NULL, \`nacionalidade\` varchar(65) NOT NULL, \`dataNascimento\` date NOT NULL, \`profissao\` varchar(100) NOT NULL, \`cpf\` varchar(14) NOT NULL, \`email\` varchar(100) NOT NULL, \`numeroCarteiraFuncional\` varchar(50) NOT NULL, \`dataExpedicaoCREA\` date NOT NULL, \`estadoCivil\` enum ('Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Separado') NOT NULL, \`nome_mae\` varchar(255) NOT NULL, \`nome_pai\` varchar(255) NULL, UNIQUE INDEX \`IDX_b24b8d2264306d947dd42815b7\` (\`cpf\`), UNIQUE INDEX \`IDX_50916dd1e5c9b3077e537bf638\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_50916dd1e5c9b3077e537bf638\` ON \`socio\``);
        await queryRunner.query(`DROP INDEX \`IDX_b24b8d2264306d947dd42815b7\` ON \`socio\``);
        await queryRunner.query(`DROP TABLE \`socio\``);
    }

}
