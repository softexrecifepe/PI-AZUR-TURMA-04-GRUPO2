import { Column, Entity } from "typeorm";
import { Pessoa } from "./pessoa.model";

@Entity('comprador')
export class Comprador extends Pessoa {

    @Column({ type: 'varchar', length: 255 })
    formaPagamento: string;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    rendaComprovada: number;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    rendaNaoComprovada: number;
}