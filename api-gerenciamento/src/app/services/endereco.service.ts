import { EnderecoResponseDto } from "../dtos/endereco/endereco-response-dto";
import { NotFoundError } from "../errors/not-found.error";
import { Endereco } from "../models/endereco.model";
import { EnderecoRepository } from "../../../../api-gerenciamento-extracao/src/app/repositories/endereco.repository";

export class EnderecoService {
    private repository: EnderecoRepository;

    constructor() {
        this.repository = new EnderecoRepository();

    }

    async findOne(id: string){
        const endereco = await this.repository.findOne(id);
        if (!endereco) {
            throw new NotFoundError(`Endereço com ID ${id} não encontrado`);
        }
        const enderecodto = this.toEnderecoResponseDto(endereco);
        return enderecodto;
    }

    async findAll() {
        const endereco = await this.repository.findAll();
        return endereco.map((rep) => this.toEnderecoResponseDto(rep));
    }

    private toEnderecoResponseDto({
        id,
        created_at,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        complemento

    }: Endereco): EnderecoResponseDto {
        return { id,created_at, rua, numero, bairro, cidade, estado, cep, complemento };
    }


}

