import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { Socio } from "../../models/socio.model";
import { Endereco } from "../../models/endereco.model";

const createImobiliariaSchema = z.object({
    nomeImobiliaria: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caracteres"),
    cnpj: z.string().regex(/^\d{14}$/, "CNPJ deve conter exatamente 14 dígitos"),
})

export class CreateImobiliariaRequestDto extends AbstractDTO<typeof createImobiliariaSchema> {

    protected rules() {
        return createImobiliariaSchema;
    }

}