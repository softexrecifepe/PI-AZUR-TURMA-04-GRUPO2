import { CreateImovelRequestDto } from "../dtos/imovel/create-imovel-request-dto";
import { ImovelResponseDto } from "../dtos/imovel/imovel-response-dto";
import { UpdateImovelRequestDto } from "../dtos/imovel/update-imovel-request-dto";
import { Imovel } from "../models/imovel.model";
import { ImovelRepository } from "../repositories/imovel.repository";

export class ImovelService {
    private repository: ImovelRepository;

    constructor() {
        this.repository = new ImovelRepository();

    }

    async create(dto: CreateImovelRequestDto) {
        const data = dto.getAll();

        const imovel = new Imovel();
       // imovel.endereco.id = data.endereco;
        imovel.caracteristica = data.caracteristica;
        imovel.areaConstruida = data.areaConstruida;
        imovel.areaPrivada = data.areaPrivada;
        imovel.areaComum = data.areaComum;
        return await this.repository.create(imovel);

    }

    async update(id: string, dto: UpdateImovelRequestDto) {
        const imovel = await this.repository.findOne(id);
        if (!imovel) throw new Error('Endereço não encontrado');

        Object.assign(imovel, dto.getAll());
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
            throw new Error(`imovel com ID ${id} não encontrado`);
        }
        await this.repository.remove(id);
    }

    private toImovelResponseDto({
        id,
        created_at,
        caracteristica,
        areaConstruida,
        areaPrivada,
        areaComum
        

    }: Imovel): ImovelResponseDto {
        return { id,created_at, caracteristica, areaConstruida, areaPrivada, areaComum };
    }


}

