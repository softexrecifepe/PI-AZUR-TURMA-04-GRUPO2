import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Endereco } from './endereco.model'; 
import { Socio } from './socio.model'; 
import { BaseEntity } from './base.model';

@Entity("EmpresaImobiliaria")
export class EmpresaImobiliaria extends BaseEntity {
  
    @Column({ type: 'varchar', length: 225})
    nomeImobiliaria: string;

    @Column({ type: 'varchar', length: 65, unique: true})
    cnpj: string;

    // @OneToOne(() => Socio)
    // @JoinColumn()
    // socio: Socio;
}


