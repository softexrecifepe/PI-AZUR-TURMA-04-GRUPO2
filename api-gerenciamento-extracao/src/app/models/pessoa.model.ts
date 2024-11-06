import { Column, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.model";
import { Endereco } from "./endereco.model";
import { EstadoCivil } from "./enums/estadoCivil.enum";


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

    @Column({type: 'varchar' , length: 50 , nullable: false})
    numDocumento: string;
    
    @Column({type: 'date' , nullable: false})
    dataExpedicao: Date;

    @Column({type: 'varchar', length: 100, unique: true})
    orgaoExpedidor: string;

    @Column({ type: 'enum', enum: EstadoCivil })
    estadoCivil: EstadoCivil;

    @Column({type: 'varchar', length: 100})
    regimeComunhao: string; 

    @ManyToOne(() => Endereco)
    @JoinColumn({name: 'endereco_id'})
    endereco: Endereco;

}