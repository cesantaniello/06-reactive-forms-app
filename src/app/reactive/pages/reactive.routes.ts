import { Routes } from "@angular/router";
import { BasicPage } from "./basic-page/basic-page";
import { DynamicPage } from "./dynamic-page/dynamic-page";
import { SwitchesPage } from "./switches-page/switches-page";

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic', title: 'Básicos',
        loadComponent: () => BasicPage,
      },
      {
        path: 'dynamic', title: 'Dinámicos',
        loadComponent: () => DynamicPage,
      },
      {
        path: 'switches', title: 'Switches',
        loadComponent: () => SwitchesPage,
      },
      {
        path: '**',
        redirectTo: 'basic',
      }
    ]
  }
];
