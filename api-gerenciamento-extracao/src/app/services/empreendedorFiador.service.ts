import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { ImobiliariaResponseDto } from "../dtos/empresaImobiliaria/empresaImobiliaria-response-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { EmpreendedorFiador } from "../models/empreendedorFiador.model";
import { EmpreendedorFiadorRepository } from "../repositories/empreendedorFiador.repository";



export class EmpreendedorFiadorService{ 
    private repository: EmpreendedorFiadorRepository;

    constructor(){
        this.repository = new EmpreendedorFiadorRepository();
    }

    async create(dto: CreateImobiliariaRequestDto){
        const data = dto.getAll();

        const empreendedorFiador = new EmpreendedorFiador();
        empreendedorFiador.nomeImobiliaria = data.nomeImobiliaria;
        empreendedorFiador.cnpj = data.cnpj;

        const savedEmpreendedorFiador = await this.repository.create(empreendedorFiador);
        return this.toImobiliariaResponseDto(savedEmpreendedorFiador);
    }

    async update(id: string, dto: UpdateImobiliariaRequestDto): Promise<EmpreendedorFiador>{
        const empreendedorFiador = await this.repository.findOne(id);
        if (!empreendedorFiador) throw new Error ('Empreendedor e Fiador não encontrado');

        Object.assign(empreendedorFiador, dto.getAll());
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
            cnpj: empreendedorFiador.cnpj
        }
    }


}