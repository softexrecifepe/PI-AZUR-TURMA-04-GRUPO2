import { Column, Entity, JoinColumn, OneToOne} from "typeorm";
import { BaseEntity } from "./base.model";

@Entity('Comprador')
export class Comprador extends BaseEntity{
    @Column({ type: 'varchar', length: 255 })
    nome: string;

    @Column({ type: 'varchar', length: 255 })
    nacionalidade: string;

    @Column({ type: 'date', precision: 10, scale: 2})
    dataNascimento: Date;

    @Column({ type: 'varchar', precision: 10, scale: 2})
    profissao: string;

    @Column({ type: 'varchar', precision: 10, scale: 2})
    filiacao: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    documento: string;

    @Column({ type: 'varchar', length: 255 })
    orgaoExpedidor: string;

    @Column({ type: 'date', precision: 10, scale: 2})
    dataExpedicao: Date;

    @Column({ type: 'varchar', length: 255 })
    cpf: string;

    @Column({ type: 'varchar', length: 255 })
    estadoCivil: string;

    @Column({ type: 'varchar', length: 255 })
    endereco: string;

    @Column({ type: 'varchar', length: 255 })
    formaPagamento: string;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    rendaComprovada: number;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    rendaNaoComprovada: number;
}