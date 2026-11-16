import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { Play } from './pages/play';

export const routes: Routes = [
  { path: '', component: Home, title: 'さんすう れんしゅう' },
  { path: 'play/:levelId', component: Play, title: 'れんしゅう | さんすう れんしゅう' },
  { path: '**', redirectTo: '' },
];
