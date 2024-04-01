import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishesTableComponent } from './components/dishes-table/dishes-table.component';
import { RestaurantsTableComponent } from './components/restaurants-table/restaurants-table.component';
import { ChefsTableComponent } from './components/chefs-table/chefs-table.component';

export const routes: Routes = [
    { path: 'dishes', component: DishesTableComponent },
    { path: 'restaurants', component: RestaurantsTableComponent },
    { path: 'chefs', component: ChefsTableComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
