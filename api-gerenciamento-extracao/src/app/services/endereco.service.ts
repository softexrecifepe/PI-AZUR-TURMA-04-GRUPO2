import { CreateEnderecoRequestDto } from "../dtos/endereco/create-endereco-request-dto";
import { EnderecoResponseDto } from "../dtos/endereco/endereco-response-dto";
import { UpdateEnderecoRequestDto } from "../dtos/endereco/update-endereco-request-dto";
import { Endereco } from "../models/endereco.model";
import { EnderecoRepository } from "../repositories/endereco.repository";

export class EnderecoService {
    private repository: EnderecoRepository;

    constructor() {
        this.repository = new EnderecoRepository();

    }

    async create(dto: CreateEnderecoRequestDto) {
        const data = dto.getAll();

        const endereco = new Endereco();
        endereco.rua = data.rua;
        endereco.numero = data.numero;
        endereco.cidade = data.cidade;
        endereco.cep = data.cep;
        endereco.estado = data.estado;
        endereco.bairro = data.bairro
        return await this.repository.create(endereco);

    }

    async update(id: string, dto: UpdateEnderecoRequestDto) {
        const endereco = await this.repository.findOne(id);
        if (!endereco) throw new Error('Endereço não encontrado');

        Object.assign(endereco, dto.getAll());
        const enderecoUpdate = await this.repository.update(id, endereco);
        const enderecodtodto = this.toEnderecoResponseDto(enderecoUpdate);
        return enderecodtodto;
    }
    async findOne(id: string){
        const endereco = await this.repository.findOne(id);
        if (!endereco) {
            throw new Error(`Endereço com ID ${id} não encontrado`);
        }
        const enderecodto = this.toEnderecoResponseDto(endereco);
        return enderecodto;
    }

    async remove(id: string){
        const endereco = await this.repository.findOne(id);
        if (!endereco) {
            throw new Error(`Endereço com ID ${id} não encontrado`);
        }
        await this.repository.remove(id);
    }


    private toEnderecoResponseDto({
        id,
        created_at,
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep

    }: Endereco): EnderecoResponseDto {
        return { id,created_at, rua, numero, bairro, cidade, estado, cep };
    }


}

