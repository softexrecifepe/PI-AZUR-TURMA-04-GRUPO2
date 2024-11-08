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
    .min(8, "CEP deve ter no mínimo 8 caracteres").max(8, "CEP deve ter no máximo 8 caracteres").optional(),
  
  complemento: z.string()
    .min(1, "Rua é obrigatória")
    .max(255, "Rua pode ter no máximo 255 caracteres").optional()
});

export class UpdateEnderecoRequestDto extends AbstractDTO<typeof updateEnderecoSchema> {

  protected rules() {
    return updateEnderecoSchema;
  }

}