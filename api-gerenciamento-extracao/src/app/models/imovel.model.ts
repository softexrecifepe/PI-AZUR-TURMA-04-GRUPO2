import { Column, OneToOne, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Endereco } from "./endereco.model";

@Entity("imovel")
export class Imovel{
   
    @PrimaryGeneratedColumn()
    private id: number;

    @OneToOne(()=> Endereco, {cascade: true})
    private endereco: Endereco;
   
    @Column({ type: 'varchar', length: 150 })
    private caracteristica: string;
   
    @Column({ type: 'int' })
    private areaConstruida: number;
  
    @Column({ type: 'int'})
    private areaPrivada: number;
   
    @Column({ type: 'int'})
    private areaComum: number;



}