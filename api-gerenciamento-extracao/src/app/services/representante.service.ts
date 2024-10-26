import { CreateRepresentanteRequestDto } from "../dtos/representante/create-representante-request-dto";
import { RepresentanteResponseDTO } from "../dtos/representante/representante-response-dtos";
import { UpdateRepresentanteRequestDto } from "../dtos/representante/update-representante-request-dto";
import { Representante } from "../models/representante.model";
import { RepresentanteRepository } from "../repositories/representante.repository";

export class RepresentanteService {
    private repository: RepresentanteRepository;

    constructor() {
        this.repository = new RepresentanteRepository();

    }

    async create(dto: CreateRepresentanteRequestDto) {
        const data = dto.getAll();

        const representante = new Representante();
        representante.nome = data.nome;
        representante.nacionalidade = data.nacionalidade;
        representante.dataNascimento = data.dataNascimento;
        representante.profissao = data.profissao;
        representante.cpf = data.cpf;
        representante.estadoCivil = data.estadoCivil;
        representante.numDocumento = data.numDocumento;
        representante.dataExpedicao = data.dataExpedicao;

        const representanteCreate = await this.repository.create(representante);
        const representantedto = this.toRepresentanteResponseDto(representanteCreate);
        return representantedto;


    }

    async update(id: string, dto: UpdateRepresentanteRequestDto) {
        const representante = await this.repository.findOne(id);
        if (!representante) throw new Error('Representante não encontrado');

        Object.assign(representante, dto.getAll());
        const representanteUpdate = await this.repository.update(id, representante);
        const representantedto = this.toRepresentanteResponseDto(representanteUpdate);
        return representantedto;
    }



    async findOne(id: string){
        const representante = await this.repository.findOne(id);
        if (!representante) {
            throw new Error(`Representante com ID ${id} não encontrado`);
        }
        const representantedto = this.toRepresentanteResponseDto(representante);
        return representantedto;
    }


    async remove(id: string){
        const representante = await this.repository.findOne(id);
        if (!representante) {
            throw new Error(`Representante com ID ${id} não encontrado`);
        }
        await this.repository.remove(id);
    }

    async findAll(){
        const representante = await this.repository.findAll();
        return representante.map((rep)=>this.toRepresentanteResponseDto(rep));
    }

    private toRepresentanteResponseDto({
        id,
        created_at,
        nome,
        nacionalidade,
        dataNascimento,
        profissao,
        numDocumento,
        dataExpedicao,
        cpf,
        estadoCivil,
    }: Representante): RepresentanteResponseDTO {
        return { id, created_at, nome, nacionalidade, dataNascimento, profissao, numDocumento, dataExpedicao, cpf, estadoCivil };
    }
}


