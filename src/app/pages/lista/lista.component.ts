import { Component, OnInit } from '@angular/core';
import { Footer } from "../../components/footer/footer.component";
import { Header } from "../../components/header/header.component";
import { firstValueFrom } from 'rxjs';
import { jsPDF } from 'jspdf';
import { ListaDeCompra } from '../../model/ListaDeCompra';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class Lista implements OnInit {

  listaDeProdutos: ListaDeCompra[] = [];
  listaDeCompraAtual: ListaDeCompra[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarListaDeProdutos();

    const cache = localStorage.getItem('minhaLista');
    if (cache) {
      this.listaDeCompraAtual = JSON.parse(cache);
    }
  }

  async carregarListaDeProdutos() {
    try {
      this.listaDeProdutos = await firstValueFrom(this.http.get<ListaDeCompra[]>('data/listaDeProduto.json'));
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

  gerarPDF() {
    const doc = new jsPDF();

    // Cabeçalho
    doc.setFontSize(16);
    doc.text("Lista de Produtos", 20, 20);

    // Títulos das colunas
    doc.setFontSize(12);
    doc.text("Nome do Produto", 20, 30);
    doc.text("Quantidade", 150, 30);

    // Adicionar produtos
    let y = 40;  // Posição inicial
    this.listaDeCompraAtual.forEach(produto => {
      doc.text(produto.nome, 20, y);
      doc.text(String(produto.quantidade), 150, y);
      y += 10;  // Aumenta o valor de Y para a próxima linha
    });

    // Salvar o PDF
    doc.save('lista_de_produtos.pdf');
  }

  salvarLista() {
    console.log(this.listaDeCompraAtual);
    localStorage.setItem('minhaLista', JSON.stringify(this.listaDeCompraAtual));
  }
}