import { Component, OnInit } from '@angular/core';
import { Footer } from "../../components/footer/footer.component";
import { Header } from "../../components/header/header.component";
import { ProdutoDestaque } from '../../model/produtoDestaque';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UltimaCompra } from '../../model/ultimaCompra';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Footer, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {


  produtoDestaque: ProdutoDestaque[] = [];
  ultimaCompra: UltimaCompra[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.buscarProdutosEmDestaque();
    this.ultimaCompraRealizada();
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

  async ultimaCompraRealizada() {
    try {
      this.ultimaCompra = await firstValueFrom(this.http.get<UltimaCompra[]>('data/ultima-compra.json'));
    } catch (erro) {
      console.error('Erro ao buscar ultima compra:', erro);
    }
  }

}
