import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.model';
import { Endereco } from './endereco.model';
import { Representante } from './representante.model';


@Entity('credora')
export class Credora extends BaseEntity{

    @Column({ type: 'varchar', length: 225})
    nomeCredora: string;

    @Column({ type: 'varchar', length: 225})
    nomeDoravante: string;

    @Column({ type: 'varchar', length: 65, unique: true})
    cnpj: string;

    @OneToOne(() => Representante)
    @JoinColumn()
    representante: Representante;  

}


