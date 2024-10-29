import { Column, OneToOne, Entity } from "typeorm";
import { Endereco } from "./endereco.model";
import { BaseEntity } from "./base.model";

@Entity("imovel")
export class Imovel extends BaseEntity{

    @OneToOne(() => Endereco, { cascade: true })
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
