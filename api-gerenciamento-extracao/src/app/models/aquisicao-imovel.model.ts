import { Column, Entity, JoinColumn, OneToOne} from "typeorm";
import { BaseEntity } from "./base.model";
import { Imovel } from "./imovel.model";

@Entity('aquisicao_imovel') 
export class AquisicaoImovel extends BaseEntity {
    @Column({ type: 'decimal', precision: 10, scale: 2})
    valorAquisicao: number;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    recursosProprios: number;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    recursosFGTS: number;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    financiamentoCredora: number;

    @Column({ type: 'varchar', length: 255 })
    origemRecursos: string;

    @Column({ type: 'varchar', length: 255 })
    normaRegulamentadora: string;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    valorAcessorias: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    valorDivida: number;

    @Column({type: 'decimal', precision: 10, scale: 2})
    valorLeilao: number;

    @Column({type: 'varchar', length: 255 })
    sistemaAmortizacao: string;
    
    @Column({type: 'decimal', precision: 10, scale: 2})
    attSaldoDevedor: number;

    @OneToOne(() => Imovel) 
    @JoinColumn({ name: 'imovel_id' }) 
    imovel: Imovel;


    











}



