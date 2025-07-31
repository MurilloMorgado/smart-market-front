import { Component } from '@angular/core';
import { Header } from "../../components/header/header.component";
import { Footer } from "../../components/footer/footer.component";

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './sobre.html',
  styleUrl: './sobre.scss'
})
export class Sobre {

}
