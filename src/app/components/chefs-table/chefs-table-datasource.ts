import { GenericTableDataSource } from '../../shared/generic-table-datasource';
import { ChefService } from '../../services/chef.service';
import { IChef } from '../../interfaces/data.interface';
import { Observable } from 'rxjs';


export class ChefsTableDataSource extends GenericTableDataSource<IChef> {
  constructor(private chefService: ChefService) {
    super(chefService);
  }

  fetchData(): Observable<IChef[]> {
    return this.chefService.getChefsAdmin();
  }
}