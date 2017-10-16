import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

@Injectable()
export class GridviewService {
  options = {
    searchEnabled: true,
    pagingEnabled: true,
    pageSize: 10,
    searchAlign: 'right',
    pageAlign: 'right'
  };

  dataSource: any[];
  searchedItems: any[];
  pagedItems: any[];
  sortedItems: any[];
  searchKey = '';

  items: any[];
  itemsSubject = new BehaviorSubject<any[]>(null);
  items$ = this.itemsSubject.asObservable();

  pagination: any = {};
  paginationSubject = new BehaviorSubject<any>(null);
  pagination$ = this.paginationSubject.asObservable();

  orderbyProperty = '';
  orderbyPropertySubject = new BehaviorSubject<string>(null);
  orderbyProperty$ = this.orderbyPropertySubject.asObservable();

  orderbyDescending = false;
  orderbyDescendingSubject = new BehaviorSubject<boolean>(null);
  orderbyDescending$ = this.orderbyDescendingSubject.asObservable();

  constructor() { }

  orderby(_property: string) {
    if (_property) {
      this.orderbyProperty = _property;
    }

    if (this.searchedItems.length > 1 && this.searchedItems[0].hasOwnProperty(this.orderbyProperty)) {
      if (this.orderbyDescending) {
        this.sortedItems = this.searchedItems.sort(function (x, y) { return (x[_property] < y[_property]) ? 1 : -1; });
      } else {
        this.sortedItems = this.searchedItems.sort(function (x, y) { return (x[_property] > y[_property]) ? 1 : -1; });
      }
      this.orderbyDescending = !this.orderbyDescending;
    } else {
      this.sortedItems = this.searchedItems.slice();
    }

    if (this.options.pagingEnabled) {
      this.setPage(1);
    } else {
      this.pagedItems = this.sortedItems.slice();
      this.setItems();
    }
  }

  search(_key: string) {
    this.searchKey = _key;
    if (this.searchKey === null || this.searchKey.trim() === '') {
      this.searchedItems = this.dataSource.slice();
    } else {
      const searchKeyArray = this.searchKey.split(' ');
      let searchingItems = this.dataSource.slice();
      searchKeyArray.forEach(key => {
        const searchedItems = [];
        if (key !== '') {
          searchingItems.forEach(obj => {
            for (const index in obj) {
              if (obj[index] && obj[index].toString().toLowerCase().indexOf(key.toLowerCase()) > -1) {
                searchedItems.push(obj);
                break;
              }
            }
          });
          searchingItems = searchedItems.slice();
        } else {
          // do-nothing
        }
      });
      this.searchedItems = searchingItems.slice();
    }

    this.orderby(this.orderbyProperty);
  }

  setPage(_page: number) {
    const totalPages = Math.ceil(this.sortedItems.length / this.options.pageSize);
    if (_page < 1 || _page > totalPages) {
      this.pagination = this.getPager(this.sortedItems.length, _page);
      this.pagedItems = this.sortedItems.slice();
    } else {
      this.pagination = this.getPager(this.sortedItems.length, _page);
      this.pagedItems = this.sortedItems.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    }

    this.setItems();
  }

  private getPager(totalItems: number, currentPage: number = 1, pageSize: number = this.options.pageSize) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    //  Array.range(startPage, endPage + 1);
    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  private notify() {
    this.itemsSubject.next(this.items);
    this.orderbyPropertySubject.next(this.orderbyProperty);
    this.orderbyDescendingSubject.next(this.orderbyDescending);
    this.paginationSubject.next(this.pagination);
  }

  private setItems() {
    this.items = this.pagedItems.slice();
    this.notify();
  }
}
