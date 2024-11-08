import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Endereco } from './endereco.model'; 
import { Socio } from './socio.model'; 
import { BaseEntity } from './base.model';

export class EmpresaImobiliaria extends BaseEntity {
  
    @Column({ type: 'varchar', length: 225})
    nomeImobiliaria: string;

    @Column({ type: 'varchar', length: 65, unique: true})
    cnpj: string;

    @Column({type: 'varchar', length: 225})
    email: string;

    @Column({type: 'varchar', length: 65})
    numNire: string;

    @Column({type: 'date'})
    dataSessao: Date;

    @ManyToOne(() => Endereco)
    @JoinColumn({name: 'endereco_id'})
    endereco: Endereco;

    @OneToOne(() => Socio)
    @JoinColumn({name: 'socio_id'})
    socio: Socio;
}


