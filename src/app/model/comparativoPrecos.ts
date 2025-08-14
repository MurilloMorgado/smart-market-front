export class ComparativoPreco {

  nomeProduto?: string;
  imagemProduto?: string;
  ultimaCompraPreco?: number;
  compraMaisBarataPreco?: number;
  compraAtualPreco?: number;
  diferenca?: number;
  quantidade?: number;

  constructor(
    nomeProduto?: string,
    imagemProduto?: string,
    ultimaCompraPreco?: number,
    compraMaisBarataPreco?: number,
    compraAtualPreco?: number,
    diferenca?: number,
    quantidade?: number
  ) {
    this.nomeProduto = nomeProduto;
    this.imagemProduto = imagemProduto;
    this.ultimaCompraPreco = ultimaCompraPreco;
    this.compraMaisBarataPreco = compraMaisBarataPreco;
    this.compraAtualPreco = compraAtualPreco;
    this.diferenca = diferenca;
    this.quantidade = quantidade;
  }
}