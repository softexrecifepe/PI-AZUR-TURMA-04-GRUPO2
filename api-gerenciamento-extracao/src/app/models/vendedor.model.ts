import { Entity } from "typeorm";
import { EmpresaImobiliaria } from "./empresaImobiliaria.model";

@Entity("vendedor")
export class Vendedor extends EmpresaImobiliaria {}