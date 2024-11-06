import { CreateImovelRequestDto } from "../dtos/imovel/create-imovel-request-dto";
import { ImovelResponseDto } from "../dtos/imovel/imovel-response-dto";
import { UpdateImovelRequestDto } from "../dtos/imovel/update-imovel-request-dto";
import { Imovel } from "../models/imovel.model";
import { EnderecoRepository } from "../repositories/endereco.repository";
import { ImovelRepository } from "../repositories/imovel.repository";

export class ImovelService {
    private repository: ImovelRepository;

    constructor() {
        this.repository = new ImovelRepository();

    }

    async create(dto: CreateImovelRequestDto) {
        const data = dto.getAll();

        const enderecoRepository = new EnderecoRepository();
        const endereco = await enderecoRepository.findOne(data.enderecoId)

        if(!endereco) throw new Error("Endereço não encontrado")

        const imovel = new Imovel();
        imovel.endereco = endereco;
        imovel.caracteristica = data.caracteristica;
        imovel.areaConstruida = data.areaConstruida;
        imovel.areaPrivada = data.areaPrivada;
        imovel.areaComum = data.areaComum;
        return await this.repository.create(imovel);
    }

    async update(id: string, dto: UpdateImovelRequestDto) {
        const imovel = await this.repository.findOne(id);
        if (!imovel) throw new Error('Endereço não encontrado');

        const data = dto.getAll();

        // Se o ID de endereço for fornecido no DTO, atualize o endereço do imóvel
        if (data.enderecoId) {
            const enderecoRepository = new EnderecoRepository();
            const endereco = await enderecoRepository.findOne(data.enderecoId);

            if (!endereco) throw new Error("Endereço não encontrado");
            imovel.endereco = endereco;
        }

        // Atualize as demais propriedades do imóvel
        imovel.caracteristica = data.caracteristica ?? imovel.caracteristica;
        imovel.areaConstruida = data.areaConstruida ?? imovel.areaConstruida;
        imovel.areaPrivada = data.areaPrivada ?? imovel.areaPrivada;
        imovel.areaComum = data.areaComum ?? imovel.areaComum;

        const imovelUpdate = await this.repository.update(id, imovel);
        const imoveldtodto = this.toImovelResponseDto(imovelUpdate);
        return imoveldtodto;
    }
    async findOne(id: string){
        const imovel = await this.repository.findOne(id);
        if (!imovel) {
            throw new Error(`Imovel com ID ${id} não encontrado`);
        }
        const imoveldto = this.toImovelResponseDto(imovel);
        return imoveldto;
    }

    async remove(id: string){
        const imovel = await this.repository.findOne(id);
        if (!imovel) {
            throw new Error(`Imovel com ID ${id} não encontrado`);
        }
        await this.repository.remove(id);
    }

    private toImovelResponseDto({
        id,
        created_at,
        endereco,
        caracteristica,
        areaConstruida,
        areaPrivada,
        areaComum
    }: Imovel): ImovelResponseDto {
        return { id,created_at, endereco, caracteristica, areaConstruida, areaPrivada, areaComum };
    }


}

