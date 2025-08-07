import { Routes } from '@angular/router';
import { Home } from './pages/home/home.component';
import { Sobre } from './pages/sobre/sobre.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Home },
  { path: 'sobre', component: Sobre },
];
