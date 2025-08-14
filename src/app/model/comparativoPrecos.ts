export class ComparativoPreco {

  produto?: {
    nome: string;
    imagem: string;
  }

  ultimaCompra?: {
    supermercado: string;
    preco: number;
  };

  compraMaisBarata?: {
    supermercado: string;
    preco: number;
  };

  compraAtual?: {
    supermercado: string;
    preco: number;
  };

  diferenca?: number;
  quantidade?: number;


  constructor(
    produto?: { nome: string; imagem: string },
    ultimaCompra?: { supermercado: string; preco: number },
    compraMaisBarata?: { supermercado: string; preco: number },
    compraAtual?: { supermercado: string; preco: number },
    diferenca?: number,
    quantidade?: number
  ) {
    this.produto = produto;
    this.ultimaCompra = ultimaCompra;
    this.compraMaisBarata = compraMaisBarata;
    this.compraAtual = compraAtual;
    this.diferenca = diferenca;
    this.quantidade = quantidade;
  }

}