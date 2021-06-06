import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'sign',
        children: [
          {
            path: '',
            loadChildren: () => import('../sign/sign.module').then(m => m.SignPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'activities',
        children: [
          {
            path: '',
            loadChildren: () => import('../activities/activities.module').then(m => m.ActivitiesPageModule)
          }
        ]
      },
      {
        path: 'documents',
        children: [
          {
            path: '',
            loadChildren: () => import('../documents/documents.module').then(m => m.DocumentsPageModule)
          }
        ]
      },
      {
        path: 'issues',
        children: [
          {
            path: '',
            loadChildren: () => import('../issues/issues.module').then(m => m.IssuesPageModule)
          }
        ]
      },
      {
        path: 'schedule',
        children: [
          {
            path: '',
            loadChildren: () => import('../schedule/schedule.module').then(m => m.SchedulePageModule)
          }
        ]
      },
      {
        path: 'guardias',
        children: [
          {
            path: '',
            loadChildren: () => import('../guardias/guardias.module').then(m => m.GuardiasPageModule)
          }
        ]
      },
      {
        path: 'home',
        children : [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
