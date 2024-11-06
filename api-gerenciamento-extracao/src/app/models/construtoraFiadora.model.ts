import { Entity } from "typeorm";
import { EmpresaImobiliaria } from "./empresaImobiliaria.model";

@Entity("construtora_fiadora")
export class ConstrutoraFiadora extends EmpresaImobiliaria {}