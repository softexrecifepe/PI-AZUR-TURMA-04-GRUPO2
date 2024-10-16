import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("endereco") 
export class Endereco {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ type: 'varchar', length: 255 })
    private rua: string;
   
    @Column({ type: 'int'})
    private numero: number;
   
    @Column({ type: 'varchar', length: 50 })
    private bairro: string;
   
    @Column({ type: 'varchar', length: 50 })
    private cidade: string;
   
    @Column({ type: 'varchar', length: 50 })
    private estado: string;
   
    @Column({ type: 'varchar', length: 8 })
    private cep: string;
}

