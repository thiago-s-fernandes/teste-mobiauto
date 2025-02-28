export type FipeBase = {
  codigo: string;
  nome: string;
};

export type FipeBrands = FipeBase;
export type FipeYears = FipeBase;
export type FipeModels = { anos: FipeBase[]; modelos: FipeBase[] };

export interface FipeValue {
  TipoVeiculo: string;
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: string;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  SiglaCombustivel: string;
}
