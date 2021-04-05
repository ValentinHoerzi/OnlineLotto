import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'rank',
    loadChildren: () => import('./rank/rank.module').then( m => m.RankPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'tip',
    loadChildren: () => import('./tip/tip.module').then( m => m.TipPageModule)
  },
  {
    path: 'winnings',
    loadChildren: () => import('./winnings/winnings.module').then( m => m.WinningsPageModule)
  },
  {
    path: 'drawings',
    loadChildren: () => import('./drawings/drawings.module').then( m => m.DrawingsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
