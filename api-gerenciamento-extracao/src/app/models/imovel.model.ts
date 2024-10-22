import { Column, OneToOne, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Endereco } from "./endereco.model";

@Entity("imovel")
export class Imovel {
   
    @PrimaryGeneratedColumn()
    private id: number;

    @OneToOne(() => Endereco, { cascade: true })
    private endereco: Endereco;
   
    @Column({ type: 'varchar', length: 150 })
    private caracteristica: string;
   
    @Column({ type: 'int' })
    private areaConstruida: number;
  
    @Column({ type: 'int' })
    private areaPrivada: number;
   
    @Column({ type: 'int' })
    private areaComum: number;

    // Getters e Setters

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getEndereco(): Endereco {
        return this.endereco;
    }

    public setEndereco(endereco: Endereco): void {
        this.endereco = endereco;
    }

    public getCaracteristica(): string {
        return this.caracteristica;
    }

    public setCaracteristica(caracteristica: string): void {
        this.caracteristica = caracteristica;
    }

    public getAreaConstruida(): number {
        return this.areaConstruida;
    }

    public setAreaConstruida(areaConstruida: number): void {
        this.areaConstruida = areaConstruida;
    }

    public getAreaPrivada(): number {
        return this.areaPrivada;
    }

    public setAreaPrivada(areaPrivada: number): void {
        this.areaPrivada = areaPrivada;
    }

    public getAreaComum(): number {
        return this.areaComum;
    }

    public setAreaComum(areaComum: number): void {
        this.areaComum = areaComum;
    }
}
