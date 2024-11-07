import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { ImobiliariaResponseDto } from "../dtos/empresaImobiliaria/empresaImobiliaria-response-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { EmpreendedorFiador } from "../models/empreendedorFiador.model";
import { EmpreendedorFiadorRepository } from "../repositories/empreendedorFiador.repository";
import { EnderecoRepository } from "../repositories/endereco.repository";
import { SocioRepository } from "../repositories/socio.repository";



export class EmpreendedorFiadorService{ 
    private repository: EmpreendedorFiadorRepository;

    constructor(){
        this.repository = new EmpreendedorFiadorRepository();
    }

    async create(dto: CreateImobiliariaRequestDto){
        const data = dto.getAll();

        const enderecoRepository = new EnderecoRepository();
        const endereco = await enderecoRepository.findOne(data.enderecoId)

        if (!endereco) throw new Error("Endereço não encontrado")


        const socioRepository = new SocioRepository();
        const socio = await socioRepository.findOne(data.socioId)

        if (!socio) throw new Error("Socio não encontrado")

        const empreendedorFiador = new EmpreendedorFiador();
        empreendedorFiador.nomeImobiliaria = data.nomeImobiliaria;
        empreendedorFiador.cnpj = data.cnpj;
        empreendedorFiador.dataSessao = data.dataSessao;
        empreendedorFiador.email = data.email;
        empreendedorFiador.numNire = data.numNire;
        empreendedorFiador.endereco = endereco;
        empreendedorFiador.socio = socio;

        const savedEmpreendedorFiador = await this.repository.create(empreendedorFiador);
        return this.toImobiliariaResponseDto(savedEmpreendedorFiador);
    }

    async update(id: string, dto: UpdateImobiliariaRequestDto): Promise<EmpreendedorFiador>{
        const empreendedorFiador = await this.repository.findOne(id);
        if (!empreendedorFiador) throw new Error ('Empreendedor e Fiador não encontrado');

        const data = dto.getAll();

        if (data.enderecoId) {
            const enderecoRepository = new EnderecoRepository();
            const endereco = await enderecoRepository.findOne(data.enderecoId);

            if (!endereco) throw new Error("Endereço não encontrado");
            empreendedorFiador.endereco = endereco;
        }

        if (data.socioId) {
            const socioRepository = new SocioRepository();
            const socio = await socioRepository.findOne(data.socioId);

            if (!socio) throw new Error("Sócio não encontrado");
            empreendedorFiador.socio = socio;
        }

        empreendedorFiador.nomeImobiliaria = data.nomeImobiliaria ?? empreendedorFiador.nomeImobiliaria;
        empreendedorFiador.cnpj = data.cnpj ?? empreendedorFiador.cnpj;
        empreendedorFiador.dataSessao = data.dataSessao ?? empreendedorFiador.dataSessao;
        empreendedorFiador.email = data.email ?? empreendedorFiador.email;
        empreendedorFiador.numNire = data.numNire ?? empreendedorFiador.numNire;

        const empreendedorFiadorUpdate = await this.repository.update(id, empreendedorFiador);
        const empreendedorFiadorDto = this.toImobiliariaResponseDto(empreendedorFiadorUpdate);
        return empreendedorFiadorDto;
    }

    async findOne(id: string){
        const empreendedorFiador = await this.repository.findOne(id);
        if (!empreendedorFiador){
            throw new Error (`Empreendedor e Fiador com o ID ${id} não encontrado`);
        }
        const empreendedorFiadorDto = this.toImobiliariaResponseDto(empreendedorFiador);
        return empreendedorFiadorDto;
    }

    async remove(id: string){
        const empreendedorFiador = await this.repository.findOne(id);
        if (!empreendedorFiador){
            throw new Error (`Empreendedor e Fiador com o ID ${id} não encontrado`);
        }
        await this.repository.remove(id);
    }

    private toImobiliariaResponseDto(empreendedorFiador: EmpreendedorFiador): ImobiliariaResponseDto{
        return{
            id: empreendedorFiador.id,
            created_at: empreendedorFiador.created_at,
            nomeImobiliaria: empreendedorFiador.nomeImobiliaria,
            cnpj: empreendedorFiador.cnpj,
            email: empreendedorFiador.email,
            numNire: empreendedorFiador.numNire,
            dataSessao: empreendedorFiador.dataSessao,
            endereco: empreendedorFiador.endereco,
            socio: empreendedorFiador.socio
        }
    }


}