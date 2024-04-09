import { GenericTableDataSource } from '../../shared/generic-table-datasource';
import { IDish } from '../../interfaces/data.interface';
import { DishService } from '../../services/dish.service';
import { Observable } from 'rxjs';


export class DishesTableDataSource extends GenericTableDataSource<IDish> {
  constructor(private dishService: DishService) {
    super(dishService);
  }

  fetchData(): Observable<IDish[]> {
    return this.dishService.getDishesAdmin();
  }
}