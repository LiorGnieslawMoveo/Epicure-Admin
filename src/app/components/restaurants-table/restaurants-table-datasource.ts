import { GenericTableDataSource } from '../../shared/generic-table-datasource';
import { IRestaurant } from '../../interfaces/data.interface';
import { RestaurantsService } from '../../services/restaurant.service';
import { Observable } from 'rxjs';


export class RestaurantsTableDataSource extends GenericTableDataSource<IRestaurant> {
  constructor(private restaurantsService: RestaurantsService) {
    super(restaurantsService);
  }

  fetchData(): Observable<IRestaurant[]> {
    return this.restaurantsService.getRestaurantsAdmin();
  }
}