import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridviewComponent } from './gridview.component';
import { OrderbyDirective } from './orderby.directive';

import { GridviewService } from './gridview.service';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GridviewComponent,
    OrderbyDirective,
    PaginationComponent
  ],
  exports: [GridviewComponent, PaginationComponent, OrderbyDirective],
  providers: [GridviewService]
})
export class GridviewModule { }
