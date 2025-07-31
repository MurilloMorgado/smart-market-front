import { Component } from '@angular/core';
import { Header } from "../../components/header/header.component";
import { Footer } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
