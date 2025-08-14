import { Component, OnInit } from '@angular/core';
import { Footer } from "../../components/footer/footer.component";
import { Header } from "../../components/header/header.component";
import { ComparativoPreco } from '../../model/comparativoPrecos';
import { Produto } from '../../model/produto';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './compra.html',
  styleUrl: './compra.scss'
})
export class Compra implements OnInit {

  comparativoPrecos: ComparativoPreco[] = [];
  listaDeCompraAtual: Produto[] = [];
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

  comprarPreco(): void {


  }

}
