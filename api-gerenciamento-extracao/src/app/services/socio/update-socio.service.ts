import { UpdateSocioRequestDto } from "../../dtos/socio/update-socio-request-dto";
import { SocioRepository } from "../../repositories/socio.repository";

export class UpdateSocioService {
    async execute(id: number, socioData: UpdateSocioRequestDto){
        const socioRepository = new SocioRepository();
        const existingSocio = await socioRepository.findOne(id);

        if (!existingSocio) {
            throw new Error('Sócio não encontrado');
        }

        const data = socioData.getAll();

        if (data.nome !== undefined) existingSocio.nome = data.nome;
        if (data.nacionalidade !== undefined) existingSocio.nacionalidade = data.nacionalidade;
        if (data.dataNascimento !== undefined) existingSocio.dataNascimento = data.dataNascimento;
        if (data.profissao !== undefined) existingSocio.profissao = data.profissao;
        if (data.email !== undefined) existingSocio.email = data.email;
        if (data.numeroCarteiraFuncional !== undefined) existingSocio.numeroCarteiraFuncional = data.numeroCarteiraFuncional;
        if (data.dataExpedicaoCREA !== undefined) existingSocio.dataExpedicaoCREA = data.dataExpedicaoCREA;
        if (data.cpf !== undefined) existingSocio.cpf = data.cpf;
        if (data.estadoCivil !== undefined) existingSocio.estadoCivil = data.estadoCivil;
        if (data.nome_mae !== undefined) existingSocio.nome_mae = data.nome_mae;
        if (data.nome_pai !== undefined) existingSocio.nome_pai = data.nome_pai;


        const socioUpdate = await socioRepository.update(id, existingSocio);
    
        return socioUpdate;
    }
}