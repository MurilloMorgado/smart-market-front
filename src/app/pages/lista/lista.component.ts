import { Component, OnInit } from '@angular/core';
import { Footer } from "../../components/footer/footer.component";
import { Header } from "../../components/header/header.component";
import { first, firstValueFrom } from 'rxjs';
import { Produto } from '../../model/produto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class Lista implements OnInit {

  listaDeProdutos: Produto[] = [];
  listaDeCompraAtual: Produto[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarListaDeProdutos();
  }

  async carregarListaDeProdutos() {
    try {
      this.listaDeProdutos = await firstValueFrom(this.http.get<Produto[]>('data/listaDeProduto.json'));
      console.log(this.listaDeProdutos);
    } catch (error) {
      console.log("Não foi possivel carregar a lista de produtos", error);
    }
  }

  removerUm(produtoNome: string): void {
    const produto = this.listaDeProdutos.find(p => p.nome === produtoNome);
    if (produto && produto.quantidade > 1) {
      produto.quantidade--;
      console.log(`Removi 1 do produto: ${produtoNome}, nova quantidade: ${produto.quantidade}`);
    } else {
      console.log(`A quantidade do produto ${produtoNome} não pode ser menor que 1.`);
    }
  }

  adicionarUm(produtoNome: string): void {
    const produto = this.listaDeProdutos.find(p => p.nome === produtoNome);
    if (produto) {
      produto.quantidade++;
      console.log(`Adicionei 1 ao produto: ${produtoNome}, nova quantidade: ${produto.quantidade}`);
    }
  }

  adicionarProduto(produtoNome: string): void {
    const produto = this.listaDeProdutos.find(p => p.nome === produtoNome);

    if (produto) {
      const produtoNaLista = this.listaDeCompraAtual.find(p => p.nome === produtoNome);
      if (produtoNaLista) {
        produtoNaLista.quantidade++;
        console.log(`Produto ${produtoNome} já estava na lista. Quantidade atualizada para ${produtoNaLista.quantidade}`);
      } else {
        this.listaDeCompraAtual.push({ ...produto });
        console.log(`Adicionei o produto ${produto.nome} à lista de compras`);

      }
    }
  }

}