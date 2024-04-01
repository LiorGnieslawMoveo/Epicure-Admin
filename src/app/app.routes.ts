import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishesTableComponent } from './components/dishes-table/dishes-table.component';

export const routes: Routes = [
    { path: '', component: DishesTableComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
