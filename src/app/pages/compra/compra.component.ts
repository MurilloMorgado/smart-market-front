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

  ngOnInit(): void {
    this.buscarProdutos();
    this.buscarHistorico();

    const cache = localStorage.getItem('minhaLista');
    if (cache) {
      this.listaDeCompraAtual = JSON.parse(cache);
    }
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

  comparPreco(): void {

    const historicoCompras = [
      { produto: "Arroz 5kg", supermercado: "Supermercado B", preco: 27.00, data: "2025-06-10" },
      { produto: "Arroz 5kg", supermercado: "Supermercado C", preco: 25.50, data: "2025-05-10" },
      { produto: "Feijão", supermercado: "Supermercado A", preco: 8.00, data: "2025-06-10" }
    ];

    // const comparativo = new ComparativoPreco(
    //   this.listaDeCompraAtual[0],
    //   this.produto[0],
    //   historicoCompras
    // );

  }

}
