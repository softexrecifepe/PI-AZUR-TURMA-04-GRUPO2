import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("endereco") 
export class Endereco {

    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ type: 'varchar', length: 255 })
    private rua: string;
   
    @Column({ type: 'int' })
    private numero: number;
   
    @Column({ type: 'varchar', length: 50 })
    private bairro: string;
   
    @Column({ type: 'varchar', length: 50 })
    private cidade: string;
   
    @Column({ type: 'varchar', length: 50 })
    private estado: string;
   
    @Column({ type: 'varchar', length: 8 })
    private cep: string;

    // Getters e Setters

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getRua(): string {
        return this.rua;
    }

    public setRua(rua: string): void {
        this.rua = rua;
    }

    public getNumero(): number {
        return this.numero;
    }

    public setNumero(numero: number): void {
        this.numero = numero;
    }

    public getBairro(): string {
        return this.bairro;
    }

    public setBairro(bairro: string): void {
        this.bairro = bairro;
    }

    public getCidade(): string {
        return this.cidade;
    }

    public setCidade(cidade: string): void {
        this.cidade = cidade;
    }

    public getEstado(): string {
        return this.estado;
    }

    public setEstado(estado: string): void {
        this.estado = estado;
    }

    public getCep(): string {
        return this.cep;
    }

    public setCep(cep: string): void {
        this.cep = cep;
    }
}
