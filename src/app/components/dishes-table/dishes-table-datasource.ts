import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface IDish {
  _id?: string;
  title: string;
  image: string;
  description: string[];
  price: number;
  restaurant: string;
}

const EXAMPLE_DATA: IDish[] = [
  {
    title: 'Spaghetti Carbonara',
    image: 'spaghetti_carbonara.jpg',
    description: ['Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.'],
    price: 12.99,
    restaurant: 'Italian Delight'
  },
  {
    title: 'Margherita Pizza',
    image: 'margherita_pizza.jpg',
    description: ['Traditional Italian pizza topped with tomato sauce, mozzarella cheese, and fresh basil.'],
    price: 9.99,
    restaurant: 'Pizza Palace'
  },
  {
    title: 'Grilled Salmon',
    image: 'grilled_salmon.jpg',
    description: ['Fresh salmon fillet grilled to perfection and served with lemon butter sauce.'],
    price: 15.99,
    restaurant: 'Seafood Paradise'
  }];

export class DishesTableDataSource extends DataSource<IDish> {
  data: IDish[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  connect(): Observable<IDish[]> {
    if (this.paginator && this.sort) {
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(): void { }

  private getPagedData(data: IDish[]): IDish[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: IDish[]): IDish[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        // case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
