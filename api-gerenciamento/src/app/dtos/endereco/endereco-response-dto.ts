export type EnderecoResponseDto = {
    id: string;
    created_at: Date;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    complemento: string;
}