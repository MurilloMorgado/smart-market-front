import { Component, OnInit } from '@angular/core';
import { Footer } from "../../components/footer/footer.component";
import { Header } from "../../components/header/header.component";
import { ProdutoDestaque } from '../../model/produtoDestaque';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Footer, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {


  produtoDestaque: ProdutoDestaque[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.buscarProdutosEmDestaque();
  }

  async buscarProdutosEmDestaque() {
    try {
      this.produtoDestaque = await firstValueFrom(
        this.http.get<ProdutoDestaque[]>('data/produto-destaque.json')
      );
      console.log(this.produtoDestaque);
    } catch (erro) {
      console.error('Erro ao buscar produtos em destaque:', erro);
    }
  }

}
