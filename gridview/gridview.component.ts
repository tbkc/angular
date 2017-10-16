import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { GridviewService } from './gridview.service';

@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css']
})
export class GridviewComponent implements OnInit, OnDestroy {
  items: any[];
  itemsSubscription: Subscription;
  constructor(private gridviewService: GridviewService) { }

  ngOnInit() {
    this.subscribeStreams();
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

  /** @description 搜尋函數
     * @summary 自訂搜尋欄位input標籤加入 (keyup)="gridviewComponent.search($event.target.value)"
    */
  search(_key: string) {
    this.gridviewService.search(_key);
  }

  /** @description 設定資料來源
  */
  setDataSource(_data: any) {
    this.gridviewService.dataSource = _data;
    this.search('');
  }

  /** @description 設定函數
   * @paramTag {GridviewOptions} 函數參數
   * @property {boolean} searchEnabled 開啟搜尋欄位，預設值true
   * @property {boolean} pagingEnabled 開啟分頁功能，預設值true
   * @property {number} pageSize 每頁資料筆數，預設值10
   * @property {string} searchAlign 搜尋位置，預設值'right'，設定值'left'、'center'或'right'，值為'center'時，則不能設定gridview-header樣板
   * @property {string} pageAlign 分頁位置，預設值'right'，設定值'left'、'center'或'right'
   */
  setOption(_options: any) {
    let changed = false;
    if (typeof (_options) === 'object') {
      for (const property in _options) {
        if (this.gridviewService.options.hasOwnProperty(property)
          && typeof (_options[property]) === typeof (this.gridviewService.options[property])
          && this.gridviewService.options[property] !== _options[property]) {
          this.gridviewService.options[property] = _options[property];
          changed = true;
        }
      }
    }
    if (changed) {
      this.gridviewService.search(this.gridviewService.searchKey);
    }
  }

  private subscribeStreams() {
    this.itemsSubscription = this.gridviewService.items$.distinctUntilChanged().subscribe(items => { this.items = items; });
  }
}
