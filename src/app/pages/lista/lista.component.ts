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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarListaDeProdutos();
  }

  async carregarListaDeProdutos() {
    try {
      this.listaDeProdutos = await firstValueFrom(this.http.get<Produto[]>('data/listaDeProduto.json'));
    } catch (error) {
      console.log("Não foi possivel carregar a lista de produtos", error);
    }
  }

  removerUm(produto: string) {
    console.log("removi um na quantidade :" + produto);
  }
  adicionarUm(produto: string) {
    console.log("adicionei um na quantidade :" + produto);
  }
  adicionarProduto(produto: string) {
    console.log("adicionei um produto :" + produto);
  }

}