import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

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
        if (!this.sort || !this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a: any, b: any) => {
            const isAsc = this.sort?.direction === 'asc';
            switch (this.sort?.active) {
                case 'id':
                case 'rating':
                case 'price':
                    return compare(a[this.sort.active], b[this.sort.active], isAsc);
                case 'title':
                case 'name':
                case 'restaurants':
                case 'deleted':
                    return compare(a[this.sort.active].toLowerCase(), b[this.sort.active].toLowerCase(), isAsc);
                default:
                    return 0;
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
