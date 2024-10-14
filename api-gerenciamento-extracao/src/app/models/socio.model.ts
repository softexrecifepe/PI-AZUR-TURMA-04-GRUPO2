import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EstadoCivil } from "./enums/estadoCivil.enum";

@Entity("socio")
export class Socio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nome: string;

    @Column({ type: 'varchar', length: 65 })
    nacionalidade: string;

    @Column({ type: 'date' })
    dataNascimento: Date;

    @Column({ type: 'varchar', length: 100 })
    profissao: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    numeroCarteiraFuncional: string;

    @Column({ type: 'date', nullable: false })
    dataExpedicaoCREA: Date;

    @Column({ type: 'varchar', length: 14, unique: true })
    cpf: string;

    @Column({ type: 'enum', enum: EstadoCivil })
    estadoCivil: EstadoCivil;

    @Column({ type: 'varchar', length: 255 })
    nome_mae: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    nome_pai?: string;

    // @ManyToOne(() => Endereco)
    // endereco: Endereco;
}