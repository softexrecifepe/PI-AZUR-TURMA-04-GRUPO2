import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { ImobiliariaResponseDto } from "../dtos/empresaImobiliaria/empresaImobiliaria-response-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { NotFoundError } from "../errors/not-found.error";
import { Incorporadora } from "../models/incorporadora.model";
import { EnderecoRepository } from "../repositories/endereco.repository";
import { IncorporadoraRepository } from "../repositories/incorporadora.repository";
import { SocioRepository } from "../repositories/socio.repository";


export class IncorporadoraService{ 
    private repository: IncorporadoraRepository;

    constructor(){
        this.repository = new IncorporadoraRepository();
    }

    async create(dto: CreateImobiliariaRequestDto){
        const data = dto.getAll();

        const enderecoRepository = new EnderecoRepository();
        const endereco = await enderecoRepository.findOne(data.enderecoId)

        if (!endereco) throw new NotFoundError("Endereço não encontrado")


        const socioRepository = new SocioRepository();
        const socio = await socioRepository.findOne(data.socioId)

        if (!socio) throw new NotFoundError("Socio não encontrado")


        const incorporadora = new Incorporadora();
        incorporadora.nomeImobiliaria = data.nomeImobiliaria;
        incorporadora.cnpj = data.cnpj;
        incorporadora.dataSessao = data.dataSessao;
        incorporadora.email = data.email;
        incorporadora.numNire = data.numNire;
        incorporadora.endereco = endereco;
        incorporadora.socio = socio;

        const savedIncorporadora = await this.repository.create(incorporadora);
        return this.toImobiliariaResponseDto(savedIncorporadora);
    }

    async update(id: string, dto: UpdateImobiliariaRequestDto): Promise<Incorporadora>{
        const incorporadora = await this.repository.findOne(id);
        if (!incorporadora) throw new NotFoundError('Incorporadora não encontrada');

        const data = dto.getAll();

        if (data.enderecoId) {
            const enderecoRepository = new EnderecoRepository();
            const endereco = await enderecoRepository.findOne(data.enderecoId);

            if (!endereco) throw new NotFoundError("Endereço não encontrado");
            incorporadora.endereco = endereco;
        }

        if (data.socioId) {
            const socioRepository = new SocioRepository();
            const socio = await socioRepository.findOne(data.socioId);

            if (!socio) throw new NotFoundError("Sócio não encontrado");
            incorporadora.socio = socio;
        }

        incorporadora.nomeImobiliaria = data.nomeImobiliaria ?? incorporadora.nomeImobiliaria;
        incorporadora.cnpj = data.cnpj ?? incorporadora.cnpj;
        incorporadora.dataSessao = data.dataSessao ?? incorporadora.dataSessao;
        incorporadora.email = data.email ?? incorporadora.email;
        incorporadora.numNire = data.numNire ?? incorporadora.numNire;

        const incorporadoraUpdate = await this.repository.update(id, incorporadora);
        const incorporadoraDto = this.toImobiliariaResponseDto(incorporadoraUpdate);
        return incorporadoraDto;
    }

    async findOne(id: string){
        const incorporadora = await this.repository.findOne(id);
        if (!incorporadora){
            throw new NotFoundError(`Incorporadora com o ID ${id} não encontrada`);
        }
        const incorporadoraDto = this.toImobiliariaResponseDto(incorporadora);
        return incorporadoraDto;
    }

    async remove(id: string){
        const incorporadora = await this.repository.findOne(id);
        if (!incorporadora){
            throw new NotFoundError(`Incorporadora com o ID ${id} não encontrada`);
        }
        await this.repository.remove(id);
    }

    private toImobiliariaResponseDto(incorporadora: Incorporadora): ImobiliariaResponseDto{
        return{
            id: incorporadora.id,
            created_at: incorporadora.created_at,
            nomeImobiliaria: incorporadora.nomeImobiliaria,
            cnpj: incorporadora.cnpj,
            email: incorporadora.email,
            numNire: incorporadora.numNire,
            dataSessao: incorporadora.dataSessao,
            endereco: incorporadora.endereco,
            socio: incorporadora.socio
        }
    }


}