import { Routes } from '@angular/router';
import { ManagerLayout } from './layout/manager-layout/manager-layout';

export const routes: Routes = [
  // Auth pages without layout
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing').then((m) => m.Landing),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/signup/signup').then((m) => m.Signup),
  },

  // Pages with layout
  {
    path: '',
    component: ManagerLayout,
    children: [
      {
        path: 'overview',
        data: { title: 'Overview' },
        loadComponent: () =>
          import('./pages/overview/overview').then((m) => m.Overview),
      },
      {
        path: 'houses',
        data: { title: 'House Management' },
        loadComponent: () =>
          import('./pages/houses/house-management/house-management').then(
            (m) => m.HouseManagement
          ),
      },
      {
        path: 'users',
        data: { title: 'User Management' },
        loadComponent: () =>
          import('./pages/users/user-management/user-management').then(
            (m) => m.UserManagement
          ),
      },
    ],
  },

  // Wildcard fallback
  {
    path: '**',
    redirectTo: 'login',
  },
];
