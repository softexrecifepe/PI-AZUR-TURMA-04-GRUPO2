import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { Endereco } from "../../models/endereco.model"; 
import { Socio } from "../../models/socio.model";

const updateImobiliariaSchema = z.object({
    nomeImobiliaria: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caracteres").optional(),
    cnpj: z.string().regex(/^\d{14}$/, "CNPJ deve conter exatamente 14 dígitos").optional(),
});


export class UpdateImobiliariaRequestDto extends AbstractDTO<typeof updateImobiliariaSchema> {

    protected rules() {
        return updateImobiliariaSchema;
    }

}