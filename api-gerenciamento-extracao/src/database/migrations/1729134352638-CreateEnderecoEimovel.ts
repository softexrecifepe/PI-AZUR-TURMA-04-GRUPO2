import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEndereco1729134352638 implements MigrationInterface {
    name = 'CreateEndereco1729134352638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "endereco" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "rua" varchar(255) NOT NULL, "numero" integer NOT NULL, "bairro" varchar(50) NOT NULL, "cidade" varchar(50) NOT NULL, "estado" varchar(50) NOT NULL, "cep" varchar(8) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "imovel" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "caracteristica" varchar(150) NOT NULL, "areaConstruida" integer NOT NULL, "areaPrivada" integer NOT NULL, "areaComum" integer NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "imovel"`);
        await queryRunner.query(`DROP TABLE "endereco"`);
    }

}
