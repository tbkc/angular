# Angular datepicker

這是改別人的datepicker多加了個民國年這樣~~

作者網址
https://github.com/uxsolutions/bootstrap-datepicker

作者文件
https://bootstrap-datepicker.readthedocs.io/en/stable/

# 需求

Jquery

bootstrap3 or 4

# 安裝

npm i @tbkc/datepicker

# 事前設定

至.angular-cli.json加入相關styles與javascript

    "styles": [
      "../node_modules/@tbkc/datepicker/css/bootstrap-datepicker.css"
     ],
    "scripts": [
      "../node_modules/@tbkc/datepicker/js/bootstrap-datepicker.js"
    ],
    
到NgModule檔加入DatepickerModule

    @NgModule({
          imports: [
               DatepickerModule
          ],

# 使用

在要使用的Dom上加上appDatepicker標籤

    <input type="text" appDatepicker />
    
或者使用ngModel

.html

    <input type="text" [(ngModel)]="d1" appDatepicker />

.ts

    d1:any | string | Date
    
    ngOnInit() {
      this.d1=2017-10-10;
      // 字串或日期格式皆可，輸入輸出皆為西元年，但顯示時會是民國年
    }
    



# 設定檔

預設為民國年中文，如要改其他格式或設定

    <input type="text" appDatepicker [option]="設定" />

設定格式請參考原作者文件

# 方法

原生函式使用方法

.html

    <input type="text" appDatepicker #d1 />

.ts

    ViewChild('d1') d1:any;

    $(this.d1.nativeElement).datepicker(方法)

方法請參考原作者文件....

# angular2只先做了一個方法 - 日期改變事件

.html

    <input type="text" appDatepicker />
    <input type="text" appDatepicker />

.ts

    constructor(private datepickerService: DatepickerService) { }
    ngAfterViewInit() {
       this.datepickerService.element[0].changeDate$.subscribe(data => {
       // 第一個dom
       });
       this.datepickerService.element[1].changeDate$.subscribe(data => {
       // 第二個dom
       });
    }

     
或者你也可以這樣

.html

     <input type="text" (change)="changedate($event)" appDatepicker />

.ts

     changedate(event){
       //當日期改變要做什麼
     }
