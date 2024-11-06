import { Column, Entity } from "typeorm";
import { EstadoCivil } from "./enums/estadoCivil.enum";
import { Pessoa } from "./pessoa.model";

@Entity("socio")
export class Socio extends Pessoa {

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    numeroCarteiraFuncional: string;

    @Column({ type: 'date', nullable: false })
    dataExpedicaoCREA: Date;

    @Column({ type: 'varchar', length: 255 })
    nome_mae: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    nome_pai?: string;
}