import { CreateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/create-empresaImobiliaria-request-dto";
import { ImobiliariaResponseDto } from "../dtos/empresaImobiliaria/empresaImobiliaria-response-dto";
import { UpdateImobiliariaRequestDto } from "../dtos/empresaImobiliaria/update-empresaImobiliaria-request-dto";
import { NotFoundError } from "../errors/not-found.error";
import { Vendedor } from "../models/vendedor.model";
import { EnderecoRepository } from "../repositories/endereco.repository";
import { SocioRepository } from "../repositories/socio.repository";
import { VendedorRepository } from "../repositories/vendedor.repository";

export class VendedorService{ 
    private repository: VendedorRepository;

    constructor(){
        this.repository = new VendedorRepository();
    }

    async create(dto: CreateImobiliariaRequestDto){
        const data = dto.getAll();

        const enderecoRepository = new EnderecoRepository();
        const endereco = await enderecoRepository.findOne(data.enderecoId)

        if (!endereco) throw new NotFoundError("Endereço não encontrado")

        const socioRepository = new SocioRepository();
        const socio = await socioRepository.findById(data.socioId)

        if (!socio) throw new NotFoundError("Socio não encontrado")

        const vendedor = new Vendedor();
        vendedor.nomeImobiliaria = data.nomeImobiliaria;
        vendedor.cnpj = data.cnpj;
        vendedor.dataSessao = data.dataSessao;
        vendedor.email = data.email;
        vendedor.numNire = data.numNire;
        vendedor.endereco = endereco;
        vendedor.socio = socio;

        const savedEmpresaImobiliaria = await this.repository.create(vendedor);
        return this.toVendedorResponseDto(savedEmpresaImobiliaria);
    }

    async update(id: string, dto: UpdateImobiliariaRequestDto): Promise<Vendedor>{
        const vendedor = await this.repository.findOne(id);
        if (!vendedor) throw new NotFoundError('Empresa não encontrada');

        const data = dto.getAll();

        if (data.enderecoId) {
            const enderecoRepository = new EnderecoRepository();
            const endereco = await enderecoRepository.findOne(data.enderecoId);

            if (!endereco) throw new NotFoundError("Endereço não encontrado");
            vendedor.endereco = endereco;
        }

        if (data.socioId) {
            const socioRepository = new SocioRepository();
            const socio = await socioRepository.findById(data.socioId);

            if (!socio) throw new NotFoundError("Sócio não encontrado");
            vendedor.socio = socio;
        }

        vendedor.nomeImobiliaria = data.nomeImobiliaria ?? vendedor.nomeImobiliaria;
        vendedor.cnpj = data.cnpj ?? vendedor.cnpj;
        vendedor.dataSessao = data.dataSessao ?? vendedor.dataSessao;
        vendedor.email = data.email ?? vendedor.email;
        vendedor.numNire = data.numNire ?? vendedor.numNire;

        const vendedrUpdate = await this.repository.update(id, vendedor);
        return this.toVendedorResponseDto(vendedrUpdate);
    }

    async findOne(id: string){
        const vendedor = await this.repository.findById(id);
        if (!vendedor) throw new NotFoundError(`Vendedor com o ID ${id} não encontrado`);
        return this.toVendedorResponseDto(vendedor);
    }

    async remove(id: string){
        const vendedor = await this.repository.findOne(id);
        if (!vendedor) throw new NotFoundError(`Vendedor com o ID ${id} não encontrado`);
        await this.repository.remove(id);
    }

    
    async findAll() {
        const vendedor = await this.repository.findAll();
        return vendedor.map((rep) => this.toVendedorResponseDto(rep));
    }

    private toVendedorResponseDto(vendedor: Vendedor): ImobiliariaResponseDto{
        return{
            id: vendedor.id,
            created_at: vendedor.created_at,
            nomeImobiliaria: vendedor.nomeImobiliaria,
            cnpj: vendedor.cnpj,
            email: vendedor.email,
            numNire: vendedor.numNire,
            dataSessao: vendedor.dataSessao,
            endereco: vendedor.endereco,
            socio: vendedor.socio
        }
    }


}