import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridviewService } from './../gridview.service';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnDestroy {
  pagination: any = {};
  paginationSubscription: Subscription;
  constructor(private gridviewService: GridviewService) { }

  ngOnInit() {
    this.subscribeStreams();
  }
  ngOnDestroy() {
    this.paginationSubscription.unsubscribe();
  }
  private subscribeStreams() {
    this.paginationSubscription = this.gridviewService.pagination$.distinctUntilChanged().subscribe(pagination => { this.pagination = pagination; });
  }
  setPage(_page: number) {
    this.gridviewService.setPage(_page);
  }
}
