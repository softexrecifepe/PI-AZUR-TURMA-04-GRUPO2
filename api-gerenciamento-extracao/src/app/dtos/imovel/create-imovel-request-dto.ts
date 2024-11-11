import z from "zod";
import { AbstractDTO } from "../abstract.dto";
import { Endereco } from "../../models/endereco.model";

const createImovelSchema = z.object({
    // endereco: z.object({
    //     bairro: z.string()
    //     .min(1, "bairro é obrigatório")
    //     .max(255, "bairro só pode ter no máximo 255"),
    //     cidade: z.string()
    //     .min(1, "cidade é obrigatório")
    //     .max(255, "cidade só pode ter no máximo 255"),
    //     estado: z.string()
    //     .min(1, "estado é obrigatório")
    //     .max(255, "estado só pode ter no máximo 255"),
    //     cep: z.string()
    //     .min(1, "cep é obrigatório")
    //     .max(8, "cep só pode ter no máximo 8"),
    // }),
    
    enderecoId: z.string().uuid("O ID do endereço deve ser um UUID válido"),
    caracteristica: z.string()
        .min(1, "Característica é obrigatório")
        .max(255, "Característica só pode ter no máximo 255 caracteres"),
    
    areaConstruida: z.number()
      .min(1, "Área é obrigatório")
      .nonnegative("Área não pode ser negativo"),

    areaPrivada: z.number()
      .min(1, "Área é obrigatório")
      .nonnegative("Área não pode ser negativo"),

    areaComum: z.number()
      .min(1, "Área é obrigatório")
      .nonnegative("Área não pode ser negativo"),
    
  });
  
  export class CreateImovelRequestDto extends AbstractDTO<typeof createImovelSchema> {
  
    protected rules() {
      return createImovelSchema;
    }
  
  }