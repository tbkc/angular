# Angular datepicker

這是改別人的datepicker多加了個民國年這樣~~
作者網址
https://github.com/uxsolutions/bootstrap-datepicker

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

# 設定檔

預設為民國年中文，如要改其他格式或設定

<input type="text" appDatepicker [option]="設定" />

設定格式請參考原作者文件

# 方法

如要原函式使用方法

.html

    <input type="text" appDatepicker #d1 />

.ts

    ViewChild('d1') d1:any;

    $(this.d1.nativeElement).datepicker(方法)

方法請參考原作者文件....以後有空再包成angular2~~

# 只先做了一個方法

.html

    <input type="text" appDatepicker #d1="appDatepicker" />


.ts

    ViewChild('d1') d1:DatepickerDirective;
    ngOnInit() {
       this.d1.changeDate$.subscribe(data => {
       //當日期改變時做什麼~~
       });
    }