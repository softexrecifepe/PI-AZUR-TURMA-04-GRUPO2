import { MigrationInterface, QueryRunner } from "typeorm";

export class RepresentanteMigration1728957292406 implements MigrationInterface {
    name = 'RepresentanteMigration1728957292406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`representante\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`nacionalidade\` varchar(65) NOT NULL, \`estadoCivil\` enum ('Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'Separado') NOT NULL, \`dataNascimento\` date NOT NULL, \`profissao\` varchar(100) NOT NULL, \`numDocumento\` varchar(50) NOT NULL, \`dataExpedicao\` date NOT NULL, \`cpf\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_abf651affca968ba97f7ce7c96\` (\`cpf\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_abf651affca968ba97f7ce7c96\` ON \`representante\``);
        await queryRunner.query(`DROP TABLE \`representante\``);
    }

}
