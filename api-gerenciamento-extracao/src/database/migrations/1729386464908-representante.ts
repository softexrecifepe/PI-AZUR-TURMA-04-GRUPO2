import { MigrationInterface, QueryRunner } from "typeorm";

export class Representante1729386464908 implements MigrationInterface {
    name = 'Representante1729386464908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`representante\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`nome\` varchar(255) NOT NULL, \`nacionalidade\` varchar(65) NOT NULL, \`dataNascimento\` date NOT NULL, \`profissao\` varchar(100) NOT NULL, \`cpf\` varchar(14) NOT NULL, \`estadoCivil\` enum ('Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Separado') NOT NULL, \`numDocumento\` varchar(50) NOT NULL, \`dataExpedicao\` date NOT NULL, UNIQUE INDEX \`IDX_abf651affca968ba97f7ce7c96\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_abf651affca968ba97f7ce7c96\` ON \`representante\``);
        await queryRunner.query(`DROP TABLE \`representante\``);
    }

}
