import { Routes } from '@angular/router';
import { Home } from './pages/home/home.component';
import { Sobre } from './pages/sobre/sobre.component';
import { Compra } from './pages/compra/compra.component';
import { Lista } from './pages/lista/lista.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Home },
  { path: 'sobre', component: Sobre },
  { path: 'compras', component: Compra },
  { path: 'lista', component: Lista },
];
