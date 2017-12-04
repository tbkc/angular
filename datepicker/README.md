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
    
到NgModule檔加入DatepickerDirective

    @NgModule({
          declarations: [
              DatepickerDirective
          ]

# 使用

在要使用的Dom上加上appDatepicker標籤

<input type="text" appDatepicker />

在.ts檔中providers: [DatepickerService]

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
    
    ngOnInit() {
       第一個
       this.datepickerService.element[0].changeDate$.subscribe(data => {
         當日期改變時做什麼~~
       });
       
       第二個
       this.datepickerService.element[1].changeDate$.subscribe(data => {
         當日期改變時做什麼~~
       });
       
    }

或者你也可以這樣

.html

     <input type="text" (change)="changedate($event)" appDatepicker />

.ts

     changedate(event){
       //當日期改變要做什麼
     }

以後再慢慢加方法~~
