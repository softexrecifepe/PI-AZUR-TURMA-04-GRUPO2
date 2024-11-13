import { Entity } from "typeorm";
import { Pessoa } from "./pessoa.model";

@Entity("socio")
export class Socio extends Pessoa {}