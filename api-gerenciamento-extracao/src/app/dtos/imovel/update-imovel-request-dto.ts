import z, { object } from "zod";
import { AbstractDTO } from "../abstract.dto";

const updateImovelSchema = z.object({
    rua: z.string()
    .min(1, "Rua é obrigatória")
    .max(255, "Rua pode ter no máximo 255 caracteres")
    .optional(),

  endereco: z.object({
      bairro: z.string()
      .min(1, "bairro é obrigatório")
      .max(255, "bairro só pode ter no máximo 255"),
      cidade: z.string()
      .min(1, "cidade é obrigatório")
      .max(255, "cidade só pode ter no máximo 255"),
      estado: z.string()
      .min(1, "estado é obrigatório")
      .max(255, "estado só pode ter no máximo 255"),
      cep: z.string()
      .min(1, "cep é obrigatório")
      .max(8, "cep só pode ter no máximo 8"),
  })
  .optional(),
  enderecoId: z.string().uuid("O ID do endereço deve ser um UUID válido"),
  caracteristica: z.string()
      .min(1, "Característica é obrigatório")
      .max(255, "Característica só pode ter no máximo 255 caracteres")
      .optional(),
  
  areaConstruida: z.number()
    .min(1, "Área é obrigatório")
    .nonnegative("Área não pode ser negativo")
    .optional(),

  areaPrivada: z.number()
    .min(1, "Área é obrigatório")
    .nonnegative("Área não pode ser negativo")
    .optional(),

  areaComum: z.number()
    .min(1, "Área é obrigatório")
    .nonnegative("Área não pode ser negativo")
    .optional(),
});

export class UpdateImovelRequestDto extends AbstractDTO <typeof updateImovelSchema> {
    protected rules(){
        return updateImovelSchema;
    }
}