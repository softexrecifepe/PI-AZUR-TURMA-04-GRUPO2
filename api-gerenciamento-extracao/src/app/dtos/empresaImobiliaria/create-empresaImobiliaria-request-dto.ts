import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { Socio } from "../../models/socio.model";
import { Endereco } from "../../models/endereco.model";

const createImobiliariaSchema = z.object({
    nomeImobiliaria: z.string().min(3, "Nome é obrigatório").max(255, "Nome pode ter no máximo 255 caracteres"),
    cnpj: z.string().regex(/^\d{14}$/, "CNPJ deve conter exatamente 14 dígitos"),
    email: z.string().email("Email inválido").max(100, "Email pode ter no máximo 100 caracteres"),
    numNire: z.string().max(100, "Numero do NIRE é obrigatório"),
    dataSessao:  z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data de expedição deve estar no formato YYYY-MM-DD")
    .transform((str) => new Date(str))
    .refine((date) => date <= new Date(), "Data de expedição não pode ser no futuro"),
    enderecoId: z.string().uuid("O ID do endereço deve ser um UUID válido"),
    socioId: z.string().uuid("O ID do sócio deve ser um UUID válido"),

})


export class CreateImobiliariaRequestDto extends AbstractDTO<typeof createImobiliariaSchema> {

    protected rules() {
        return createImobiliariaSchema;
    }

}