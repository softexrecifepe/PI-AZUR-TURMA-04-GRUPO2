import { CreateSocioRequestDto } from "../../dtos/socio/create-socio-request-dto";
import { CreateSocioResponseDto } from "../../dtos/socio/create-socio-response-dto";
import { Socio } from "../../models/socio.model";
import { SocioRepository } from "../../repositories/socio.repository";

export class CreateSocioService {
    async execute(socioData: CreateSocioRequestDto){
        const data = socioData.getAll();

        const socio = new Socio();
        socio.nome = data.nome;
        socio.nacionalidade = data.nacionalidade;
        socio.dataNascimento = data.dataNascimento;
        socio.profissao = data.profissao;
        socio.email = data.email;
        socio.numeroCarteiraFuncional = data.numeroCarteiraFuncional;
        socio.dataExpedicaoCREA = data.dataExpedicaoCREA;
        socio.cpf = data.cpf;
        socio.estadoCivil = data.estadoCivil;
        socio.nome_mae = data.nome_mae;
        socio.nome_pai = data.nome_pai;

        const socioCreate = await new SocioRepository().create(socio);
    
        return socioCreate;
    }
}