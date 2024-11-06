import { Column, Entity } from "typeorm";
import { EstadoCivil } from "./enums/estadoCivil.enum";
import { Pessoa } from "./pessoa.model";

@Entity("representante")
export class Representante extends Pessoa{

}
