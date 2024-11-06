import { Entity } from "typeorm";
import { EmpresaImobiliaria } from "./empresaImobiliaria.model";

@Entity("empreendedor_fiador")
export class EmpreendedorFiador extends EmpresaImobiliaria {}