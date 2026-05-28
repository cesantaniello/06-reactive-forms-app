import { Routes } from "@angular/router";
import { RegisterPage } from "./register-page/register-page";

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up',
        loadComponent: () => RegisterPage,
      },
      {
        path: '**',
        redirectTo: 'sign-up',
      }
    ]
  }
];
