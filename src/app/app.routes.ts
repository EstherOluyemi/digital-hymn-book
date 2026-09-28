import { Routes } from '@angular/router';

import { Home } from './features/home/home';
import { HymnLibrary } from './features/hymns/hymn-library/hymn-library';
import { HymnDetails } from './features/hymns/hymn-details/hymn-details';
import { Categories } from './features/categories/categories/categories';
import { CategoryHymns } from './features/categories/category-hymns/category-hymns';
import { Favorites } from './features/favorites/favorites';
import { Suggest } from './features/suggest/suggest';
import { Settings } from './features/settings/settings';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'hymns',
        component: HymnLibrary,
    },
    {
        path: 'hymns/:id',
        component: HymnDetails,
    },
    {
        path: 'categories',
        component: Categories,
    },
    {
        path: 'categories/:category',
        component: CategoryHymns,
    },
    {
        path: 'favorites',
        component: Favorites,
    },
    {
        path: 'suggest',
        component: Suggest,
    },
    {
        path: 'settings',
        component: Settings,
    },
];
