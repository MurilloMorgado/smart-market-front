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


  constructor(data?: {
    produto?: { nome: string; imagem: string };
    ultimaCompra?: { supermercado: string; preco: number };
    compraMaisBarata?: { supermercado: string; preco: number };
    compraAtual?: { supermercado: string; preco: number };
    quantidade?: number;
  }) {
    if (data) {
      this.produto = data.produto;
      this.ultimaCompra = data.ultimaCompra;
      this.compraMaisBarata = data.compraMaisBarata;
      this.compraAtual = data.compraAtual;
      this.quantidade = data.quantidade;

      if (this.compraAtual && this.ultimaCompra) {
        this.diferenca = this.compraAtual.preco - this.ultimaCompra.preco;
      }

    }
  }
}