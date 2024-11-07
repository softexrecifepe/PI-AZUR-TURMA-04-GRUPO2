import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.model";
import { nullable } from "zod";

@Entity("endereco") 
export class Endereco extends BaseEntity{
    @Column({ type: 'varchar', length: 255 })
    rua: string;
   
    @Column({ type: 'int' })
    numero: number;
   
    @Column({ type: 'varchar', length: 50 })
    bairro: string;
   
    @Column({ type: 'varchar', length: 50 })
    cidade: string;
   
    @Column({ type: 'varchar', length: 50 })
    estado: string;
   
    @Column({ type: 'varchar', length: 8 })
    cep: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    complemento: string;
   
}
