import { Directive, ElementRef, OnInit, Input, HostListener, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { GridviewService } from './gridview.service';
import { Subject, Observable, Subscription } from 'rxjs/Rx';

@Directive({
  selector: '[appOrderby]'
})
export class OrderbyDirective implements OnInit, OnDestroy {
  @Input() appOrderby;
  sortIcon: any;
  sortIncrementIcon: any;
  sortDescendingIcon: any;
  orderbyPropertySubscription: Subscription;
  orderbyDescendingSubscription: Subscription;
  constructor(private el: ElementRef, private gridviewService: GridviewService, private renderer: Renderer2) { }
  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.createIcon();
    this.setSortIcon();
  }

  @HostListener('click') orderby() {
    this.gridviewService.orderby(this.appOrderby);
  }

  private createIcon() {
    this.createSortIcon();
    this.createSortIncrementIcon();
    this.createSortDescendingIcon();
    this.subscribeStreams();
  }

  private subscribeStreams() {
    this.orderbyPropertySubscription = this.gridviewService.orderbyProperty$.distinctUntilChanged().subscribe(orderbyProperty => {
      this.orderbyDescendingSubscription = this.gridviewService.orderbyDescending$.distinctUntilChanged().subscribe(orderbyDescending => {
        const th: HTMLElement = this.el.nativeElement;
        if (this.el.nativeElement.querySelector('i')) {
          this.renderer.removeChild(this.el.nativeElement, this.el.nativeElement.querySelector('i'));

          if (orderbyProperty === this.appOrderby) {
            if (orderbyDescending) {
              this.setSortDescendingIcon();
            } else {
              this.setSortIncrementIcon();
            }
          } else {
            this.setSortIcon();
          }
        }


      });
    });
  }
  ngOnDestroy() {
    this.orderbyPropertySubscription.unsubscribe();
    this.orderbyDescendingSubscription.unsubscribe();
  }

  private createElement() {
    const element = this.renderer.createElement('i');
    this.renderer.addClass(element, 'fa');
    this.renderer.setStyle(element, 'margin-left', '5px');
    return element;
  }

  private createSortIcon() {
    this.sortIcon = this.createElement();
    this.renderer.addClass(this.sortIcon, 'fa-sort');
  }

  private setSortIcon() {
    this.renderer.appendChild(this.el.nativeElement, this.sortIcon);
  }

  private createSortIncrementIcon() {
    this.sortIncrementIcon = this.createElement();
    this.renderer.addClass(this.sortIncrementIcon, 'fa-sort-amount-asc');
  }

  private setSortIncrementIcon() {
    this.renderer.appendChild(this.el.nativeElement, this.sortIncrementIcon);
  }

  private createSortDescendingIcon() {
    this.sortDescendingIcon = this.createElement();
    this.renderer.addClass(this.sortDescendingIcon, 'fa-sort-amount-desc');
  }

  private setSortDescendingIcon() {
    this.renderer.appendChild(this.el.nativeElement, this.sortDescendingIcon);
  }
}
