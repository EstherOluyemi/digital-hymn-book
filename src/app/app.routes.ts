import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

        {
            path: '',
            loadComponent: () =>
            import('./features/home/home').then(m => m.Home),
        },
        {
            path: 'hymns',
            loadComponent: () =>
            import('./features/hymns/hymn-library/hymn-library')
                .then(m => m.HymnLibrary),
        },
        {
            path: 'hymns/:id',
            loadComponent: () =>
            import('./features/hymns/hymn-details/hymn-details')
                .then(m => m.HymnDetails),
        },
        {
            path: 'categories',
            loadComponent: () =>
            import('./features/categories/categories/categories')
                .then(m => m.Categories),
        },
        {
            path: 'categories/:category',
            loadComponent: () =>
            import('./features/categories/category-hymns/category-hymns')
                .then(m => m.CategoryHymns),
        },
        {
            path: 'favorites',
            loadComponent: () =>
            import('./features/favorites/favorites')
                .then(m => m.Favorites),
            canActivate: [authGuard]
        },
        {
            path: 'suggest',
            loadComponent: () =>
            import('./features/suggest/suggest')
                .then(m => m.Suggest),
        },
        {
            path: 'settings',
            loadComponent: () =>
            import('./features/settings/settings')
                .then(m => m.Settings),
        },

        {
            path: 'register',
            loadComponent: () =>
            import('./features/auth/register/register')
                .then(m => m.Register)
        },

        {
            path: 'login',
            loadComponent: () =>
            import('./features/auth/login/login').
            then(m => m.Login)
        },
    
        {
            path: '**',
            redirectTo: '',
            pathMatch: 'full'
        }

];




