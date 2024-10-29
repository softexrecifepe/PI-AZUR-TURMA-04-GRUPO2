import z from "zod";
import { AbstractDTO } from "../abstract.dto";

const updateEnderecoSchema = z.object({
  rua: z.string()
    .min(1, "Rua é obrigatória")
    .max(255, "Rua pode ter no máximo 255 caracteres").optional(),
  
  numero: z.number()
    .min(1, "Número é obrigatório")
    .nonnegative("Número não pode ser negativo").optional(),
  
  bairro: z.string()
    .min(1, "Bairro é obrigatório")
    .max(50, "Bairro pode ter no máximo 50 caracteres").optional(),
  
  cidade: z.string()
    .min(1, "Cidade é obrigatória")
    .max(50, "Cidade pode ter no máximo 50 caracteres").optional(),
  
  estado: z.string()
    .min(2, "Estado é obrigatório")
    .max(50, "Estado pode ter no máximo 50 caracteres").optional(),
  
  cep: z.string()
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato XXXXX-XXX").optional()
});

export class UpdateEnderecoRequestDto extends AbstractDTO<typeof updateEnderecoSchema> {

  protected rules() {
    return updateEnderecoSchema;
  }

}