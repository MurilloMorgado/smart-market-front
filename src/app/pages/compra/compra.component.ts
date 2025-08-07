import { Component } from '@angular/core';
import { Header } from "../../components/header/header.component";
import { Footer } from "../../components/footer/footer.component";

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './compra.html',
  styleUrl: './compra.scss'
})
export class Compra {

}
