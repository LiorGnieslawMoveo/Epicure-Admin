import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { IGenericItem } from '../interfaces/genericItem.interface';

export abstract class GenericTableDataSource<IGenericItem> extends DataSource<IGenericItem> {
    data: IGenericItem[] = [];
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;

    constructor(private dataService: any) {
        super();
    }

    abstract fetchData(): Observable<IGenericItem[]>;

    connect(): Observable<IGenericItem[]> {
        if (this.paginator && this.sort) {
            console.log(this.sort)
            return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
                .pipe(map(() => {
                    return this.getPagedData(this.getSortedData([...this.data]));
                }));
        } else {
            throw Error('Please set the paginator and sort on the data source before connecting.');
        }
    }

    disconnect(): void { }

    private getPagedData(data: IGenericItem[]): IGenericItem[] {
        if (this.paginator) {
            const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
            return data.splice(startIndex, this.paginator.pageSize);
        } else {
            return data;
        }
    }

    private getSortedData(data: IGenericItem[]): IGenericItem[] {
        if (!this.sort || this.sort?.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a: any, b: any) => {
            const isAsc = this.sort?.direction === 'asc';
            switch (this.sort?.active) {
                case "id": return compare(a.title, b.title, isAsc);
                case "title": return compare(a.title, b.title, isAsc);
                case "name": return compare(a.name, b.name, isAsc);
                case "restaurants": return compare(a.title, b.title, isAsc);
                case "deleted": return compare(a.title, b.title, isAsc);
                case "rating": return compare(a.rating, b.rating, isAsc);
                case "price": return compare(a.price, b.price, isAsc);
                default: return 0;
            }
        });
    }
}

function compare(a: any, b: any, isAsc: boolean): number {
    let compared = 1;
    if (typeof a === 'string' && typeof b === 'string') {
        compared = a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    } else {
        compared = a < b ? -1 : 1;
    }
    return compared * (isAsc ? 1 : -1);
}

