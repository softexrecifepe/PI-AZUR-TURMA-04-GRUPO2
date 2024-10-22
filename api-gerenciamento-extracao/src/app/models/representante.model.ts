import { Column, Entity } from "typeorm";
import { EstadoCivil } from "./enums/estadoCivil.enum";
import { Pessoa } from "./pessoa.model";

@Entity("representante")
export class Representante extends Pessoa{
    @Column({type: 'enum' , enum: EstadoCivil})
    estadoCivil: EstadoCivil;
    @Column({type: 'varchar' , length: 50 , nullable: false})
    numDocumento: string;
    @Column({type: 'date' , nullable: false})
    dataExpedicao: Date;
; 


}
