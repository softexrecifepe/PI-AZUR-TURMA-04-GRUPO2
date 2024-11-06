import { Entity } from "typeorm";
import { EmpresaImobiliaria } from "./empresaImobiliaria.model";

@Entity("incorporadora")
export class Incorporadora extends EmpresaImobiliaria {}