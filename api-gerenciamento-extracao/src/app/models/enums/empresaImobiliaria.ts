import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Endereco } from "./enums/endereco.model";
import { Socio } from "./enums/socio.model";

@Entity("empresaImobiliaria")
export class empresaImobiliaria {
    // @PrimaryGeneratedColumn() 
    // id: number;

    @Column({ type: 'varchar', length: 225})
    nome: string;

    @Column({ type: 'varchar', length: 65, unique: true})
    cnpj: string;

}

