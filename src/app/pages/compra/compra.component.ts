import { Component, OnInit } from '@angular/core';
import { Footer } from "../../components/footer/footer.component";
import { Header } from "../../components/header/header.component";
import { ComparativoPreco } from '../../model/comparativoPrecos';
import { ListaDeCompra } from '../../model/ListaDeCompra';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Produto } from '../../model/produto';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './compra.html',
  styleUrl: './compra.scss'
})
export class Compra implements OnInit {

  comparativoPrecos: ComparativoPreco[] = [];
  listaDeCompraAtual: ListaDeCompra[] = [];
  produto: Produto[] = [];

  constructor(private http: HttpClient) { }

  async ngOnInit(): Promise<void> {
    const cache = localStorage.getItem('minhaLista');
    if (cache) {
      this.listaDeCompraAtual = JSON.parse(cache);
    }
     // this.buscarProdutos();
    // this.buscarHistorico();
    this.comparPreco();

  }

  async buscarProdutos(): Promise<void> {

    try {
      this.produto = await firstValueFrom(this.http.get<Produto[]>('data/produto.json'));
      console.log(this.produto);
    } catch (error) {
      console.log('Não foi possivel buscar a lista de produtos.', error);
    }

  }

  async buscarHistorico(): Promise<void> {
    try {
      console.log('buscar historico');
    } catch (error) {
      console.log('Não foi possivel buscar o historico de compras', error);
    }
  }

  async comparPreco(): Promise<void> {
    const historicoCompras = [
      { produto: "Feijão", supermercado: "Supermercado B", preco: 27.00, data: "2025-06-10" },
      { produto: "Feijão", supermercado: "Supermercado B", preco: 26.00, data: "2025-05-10" },
      { produto: "Arroz", supermercado: "Supermercado C", preco: 25.50, data: "2025-05-10" },
      { produto: "Miojo", supermercado: "Supermercado A", preco: 8.00, data: "2025-06-10" }
    ];

    this.comparativoPrecos = this.listaDeCompraAtual.map(item => {
      const nomeProduto = item.nome;
      const produtoInfo = item.imagem;
      console.log("nomeProduto : " + nomeProduto + "/ imagem : " + produtoInfo);
      

      const comprasDoProduto = historicoCompras
        .filter(c => c.produto === nomeProduto)
        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

      const ultimaCompra = comprasDoProduto[0];
      const compraMaisBarata = comprasDoProduto.reduce((maisBarata, atual) =>
        atual.preco < maisBarata.preco ? atual : maisBarata, comprasDoProduto[0]);

      const compraAtualPreco = 0;
      const diferenca = 0;

      return new ComparativoPreco(
        nomeProduto,
        produtoInfo,
        ultimaCompra?.preco,
        compraMaisBarata?.preco,
        compraAtualPreco,
        diferenca,
        item.quantidade
      );
    });
    console.log(this.comparativoPrecos);
    
  }

}
