import { Column, OneToOne, Entity, JoinColumn } from "typeorm";
import { Endereco } from "./endereco.model";
import { BaseEntity } from "./base.model";

@Entity("imovel")
export class Imovel extends BaseEntity{

    @OneToOne(() => Endereco)
    @JoinColumn({name: "endereco_id"})
    endereco: Endereco;
   
    @Column({ type: 'varchar', length: 150 })
    caracteristica: string;
   
    @Column({ type: 'int' })
    areaConstruida: number;
  
    @Column({ type: 'int' })
    areaPrivada: number;
   
    @Column({ type: 'int' })
    areaComum: number;


}
