import { Component } from '@angular/core';
import { Header } from "../../components/header/header.component";
import { Footer } from "../../components/footer/footer.component";

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './lista.html',
  styleUrl: './lista.scss'
})
export class Lista {

}
