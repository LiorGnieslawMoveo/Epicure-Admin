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
        this.fetchData();
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

        return data.sort((a, b) => {
            const isAsc = this.sort?.direction === 'asc';
            switch (this.sort?.active) {
                // case 'title': return compare(a.title, b.title, isAsc);
                default: return 0;
            }
        });
    }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
