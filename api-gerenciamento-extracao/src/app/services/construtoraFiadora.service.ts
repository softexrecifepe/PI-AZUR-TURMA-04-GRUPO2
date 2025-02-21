import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { ImobiliariaResponseDto } from "../dtos/empresaImobiliaria/empresaImobiliaria-response-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { NotFoundError } from "../errors/not-found.error";
import { ConstrutoraFiadora } from "../models/construtoraFiadora.model";
import { ConstrutoraFiadoraRepository } from "../repositories/construtoraFiadora.repository";
import { EnderecoRepository } from "../repositories/endereco.repository";
import { SocioRepository } from "../repositories/socio.repository";


export class ConstrutoraFiadoraService {
    private repository: ConstrutoraFiadoraRepository;

    constructor() {
        this.repository = new ConstrutoraFiadoraRepository();
    }

    async create(dto: CreateImobiliariaRequestDto) {
        const data = dto.getAll();

        const enderecoRepository = new EnderecoRepository();
        const endereco = await enderecoRepository.findOne(data.enderecoId)

        if (!endereco) throw new NotFoundError("Endereço não encontrado")


        const socioRepository = new SocioRepository();
        const socio = await socioRepository.findOne(data.socioId)

        if (!socio) throw new NotFoundError("Socio não encontrado")

        const construtoraFiadora = new ConstrutoraFiadora();
        construtoraFiadora.nomeImobiliaria = data.nomeImobiliaria;
        construtoraFiadora.cnpj = data.cnpj;
        construtoraFiadora.dataSessao = data.dataSessao;
        construtoraFiadora.email = data.email;
        construtoraFiadora.numNire = data.numNire;
        construtoraFiadora.endereco = endereco;
        construtoraFiadora.socio = socio;

        const savedConstrutoraFiadora = await this.repository.create(construtoraFiadora);
        return this.toImobiliariaResponseDto(savedConstrutoraFiadora);
    }

    async update(id: string, dto: UpdateImobiliariaRequestDto): Promise<ConstrutoraFiadora> {
        const construtoraFiadora = await this.repository.findOne(id);
        if (!construtoraFiadora) throw new NotFoundError('Construtora e Fiadora não encontrada');


        const data = dto.getAll();

        if (data.enderecoId) {
            const enderecoRepository = new EnderecoRepository();
            const endereco = await enderecoRepository.findOne(data.enderecoId);

            if (!endereco) throw new NotFoundError("Endereço não encontrado");
            construtoraFiadora.endereco = endereco;
        }

        if (data.socioId) {
            const socioRepository = new SocioRepository();
            const socio = await socioRepository.findOne(data.socioId);

            if (!socio) throw new NotFoundError("Sócio não encontrado");
            construtoraFiadora.socio = socio;
        }

        construtoraFiadora.nomeImobiliaria = data.nomeImobiliaria ?? construtoraFiadora.nomeImobiliaria;
        construtoraFiadora.cnpj = data.cnpj ?? construtoraFiadora.cnpj;
        construtoraFiadora.dataSessao = data.dataSessao ?? construtoraFiadora.dataSessao;
        construtoraFiadora.email = data.email ?? construtoraFiadora.email;
        construtoraFiadora.numNire = data.numNire ?? construtoraFiadora.numNire;

        const construtoraFiadoraUpdate = await this.repository.update(id, construtoraFiadora);
        const construtoraFiadoraDto = this.toImobiliariaResponseDto(construtoraFiadoraUpdate);
        return construtoraFiadoraDto;
    }

    async findOne(id: string) {
        const construtoraFiadora = await this.repository.findOne(id);
        if (!construtoraFiadora) {
            throw new NotFoundError(`Construtora e Fiadora com o ID ${id} não encontrada`);
        }
        const construtoraFiadoraDto = this.toImobiliariaResponseDto(construtoraFiadora);
        return construtoraFiadoraDto;
    }

    async remove(id: string) {
        const construtoraFiadora = await this.repository.findOne(id);
        if (!construtoraFiadora) {
            throw new NotFoundError(`Construtora e Fiadora com o ID ${id} não encontrada`);
        }
        await this.repository.remove(id);
    }

    private toImobiliariaResponseDto(construtoraFiadora: ConstrutoraFiadora): ImobiliariaResponseDto {
        return {
            id: construtoraFiadora.id,
            created_at: construtoraFiadora.created_at,
            nomeImobiliaria: construtoraFiadora.nomeImobiliaria,
            cnpj: construtoraFiadora.cnpj,
            email: construtoraFiadora.email,
            numNire: construtoraFiadora.numNire,
            dataSessao: construtoraFiadora.dataSessao,
            endereco: construtoraFiadora.endereco,
            socio: construtoraFiadora.socio
        }
    }


}