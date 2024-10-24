import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { Endereco  } from "../../models/endereco.model";
import { Representante } from "../../models/representante.model";

const updateImobiliariaSchema = z.object({
nomeCredora: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caractere").optional(),
nomeDoravante: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caractere").optional(),
cnpj: z.string().regex(/^\d{14}$/, "CNPJ deve conter exatamente 14 dígitos").optional(),
});

export class UpdateImobiliariaRequestDto extends AbstractDTO<typeof updateImobiliariaSchema> {

    protected rules() {
        return updateImobiliariaSchema;
    }

}