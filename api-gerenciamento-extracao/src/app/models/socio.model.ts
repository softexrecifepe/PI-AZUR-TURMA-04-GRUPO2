import { Column, Entity } from "typeorm";
import { EstadoCivil } from "./enums/estadoCivil.enum";
import { Pessoa } from "./pessoa.model";

@Entity("socio")
export class Socio extends Pessoa {}