import { Column } from "typeorm";
import { BaseEntity } from "./base.model";

export class Pessoa extends BaseEntity {
    @Column({ type: 'varchar', length: 255 })
    nome: string;

    @Column({ type: 'varchar', length: 65 })
    nacionalidade: string;

    @Column({ type: 'date' })
    dataNascimento: Date;

    @Column({ type: 'varchar', length: 100 })
    profissao: string;

    @Column({ type: 'varchar', length: 14, unique: true })
    cpf: string;

    // @ManyToOne(() => Endereco)
    // endereco: Endereco;
}