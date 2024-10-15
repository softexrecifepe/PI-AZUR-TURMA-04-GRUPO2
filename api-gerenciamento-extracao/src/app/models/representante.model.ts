import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EstadoCivil } from "./enums/estadoCivil.enum";

@Entity("representante")
export class Representante{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar' , length: 255})
    nome: string;
    @Column({ type: 'varchar' , length: 65})
    nacionalidade: string;
    @Column({type: 'enum' , enum: EstadoCivil})
    estadoCivil: EstadoCivil;
    @Column({type: 'date'})
    dataNascimento: Date;
    @Column({type: 'varchar' , length: 100})
    profissao: string;
    @Column({type: 'varchar' , length: 50 , nullable: false})
    numDocumento: string;
    @Column({type: 'date' , nullable: false})
    dataExpedicao: Date;
    @Column({type: 'varchar' , unique: true})
    cpf: string; 


}