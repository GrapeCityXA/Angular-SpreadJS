### 看看Angular有啥新玩法！手把手教你在Angular15中集成报表插件


# Angular15新特性

Angular框架（以下简称“Angular”）作为一款由谷歌开发的Web应用程序框架，其强大的依赖注入系统、可重复使用的模块化开发理念和响应式编程模式等特点让Angular一问世便取得了巨大的关注和流量。 截止目前为止，Angular已经迭代了15个版本，而Angular15又有哪些新的亮眼表现呢？小编为大家简单介绍几个Angular15的新特性（以下特性源于Angular官网）：

1.  **独立API脱离开发者预览版**

在Angular14版本的更新中使用了独立的API，使得开发者能够在不使用 NgModules 的情况下构建应用程序。在Angular15中将这些API已经更新成为了稳定版，并且以后将通过语义版本去控制独立 APIs 的发展。

1.  **基于MDC的组件发布到稳定版**

Angular15优化了基于Material Design Components for Web（MDC）中Angular material对于组件的重构，这样使得 Angular更加接近Material Design的规范。对于大部分组件，Angular更新了样式和DOM结构。对于新组件，Angular保留了一部分TypeScript API和组件/指令选择器。

1. **语言服务中的自动导入**

   在Angular15中，可以自动导入在模板中使用但是没有添加到NgModule中的组

件或独立组件。

既然Angular都升级了，咱们是不是可以尝试一些新的玩法？想要在Angular15中整合一个报表，但不知道该怎么做？

没关系，今天小编来告诉你。

# Angular15中引入报表插件

大家都知道Excel作为一款统计、分析数据信息的办公软件，在大家日常工作和生活中起到了非常重要的作用。传统的报表需要从浏览器下载之后再用Excel打开才能修改数据，那么，有没有一种插件可以实现直接在浏览器中修改Excel报表数据呢？答案是肯定的。

下面将介绍如何在Angular15中集成Excel报表插件并实现简单的文件上传和下载。

在本教程中，我们将使用node.js，请确保已安装最新版本。除此之外还需要使用软件Visual Studio Code(以下简称“VSCode”)作为编程环境，请您以管理员身份运行它。

1.  **Angular集成报表插件:**

新建一个文件夹用来存放工作区代码（文件夹路径最好是英文）。

**使用指令初始化Angular工程（用命令提示符CMD输入指令）。**

//安装 Angular CLI globally

```
npm install -g @angular/cli
```

//通过Angular CLI 创建一个新项目

```
ng new spread-sheets-app
```

（初始化一个Angular工程）

**将下面的表格资源粘贴到package.json文件中的dependencies标签，并使用npm install指令下载和ng serve指令运行。**

```javascript
"@angular/animations": "\^15.2.9",

"@angular/common": "\^15.2.9",

"@angular/compiler": "\^15.2.9",

"@angular/core": "\^15.2.9",

"@angular/forms": "\^15.2.9",

"@angular/platform-browser": "\^15.2.9",

"@angular/platform-browser-dynamic": "\^15.2.9",

"@grapecity/spread-sheets-resources-zh": "15.1.0",

"@angular/router": "\^15.2.9",

"@grapecity/spread-excelio": "\^15.2.5",

"@grapecity/spread-sheets": "\^15.2.5",

"@grapecity/spread-sheets-angular": "\^15.2.5",

"@grapecity/spread-sheets-charts": "\^15.1.1",

"@grapecity/spread-sheets-designer": "15.1.2",

"@grapecity/spread-sheets-designer-resources-cn": "15.1.2",

"@grapecity/spread-sheets-designer-angular": "15.1.2",

"file-saver": "\^2.0.5",

"rxjs": "\~7.5.0",

"tslib": "\^2.3.0",

"zone.js": "\~0.11.4"
```

（Angular工程中引入表格插件资源）

**实例化表格组件并初始化表格对象内容。**

在src/app/app.component.html中初始化实例表格：

```javascript
\<div class='maincontainer'\>

\<gc-spread-sheets [backColor]="spreadBackColor" [hostStyle]="hostStyle" (workbookInitialized)="workbookInit(\$event)"\>

\</gc-spread-sheets\>

\</div\>
```

（初始化实例表格）

在src/app/app.component.ts中设置表格的大小和内容：

//设置内容长度宽度格式

```javascript
export class AppComponent {

spreadBackColor = 'aliceblue';

hostStyle = {

width: '95vw',

height: '80vh'

};

private spread;

private excelIO;

//创建Excel.IO对象

constructor() {

this.spread = new GC.Spread.Sheets.Workbook();

this.excelIO = new Excel.IO();

}

//初始化对象

workbookInit(args: any) {

//表格对象内容

//举例：设置第一个表格的内容为“Test Excel”且背景颜色为蓝色。

//const self = this;

// self.spread = args.spread;

// const sheet = self.spread.getActiveSheet();

// sheet.getCell(0, 0).text('Test Excel').foreColor('blue');

}

（设
```

置表格大小和内容）

**2.设置上传和下载按钮。**

在src/app/app.component.html中初始化上传、下载按钮：

```javascript
\<div class='maincontainer'\>

\<!--初始化上传按钮--\>

\<div class='loadExcelInput'\>

\<p\>Open Excel File\</p\>

\<input type="file" name="files[]" multiple id="jsonFile" accept=".xlsx" (change)="onFileChange(\$event)" /\>

\</div\>

\<!--初始化下载按钮--\>

\<div class='exportExcel'\>

\<p\>Save Excel File\</p\>

\<button (click)="onClickMe(\$event)"\>Save Excel!\</button\>

\</div\>

\</div\>

（初始化上传、下载按钮）

在src/app/app.component.ts中添加上传、下载按钮的方法：

//上传文件代码

onFileChange(args: any) {

const self = this, file = args.srcElement && args.srcElement.files && args.srcElement.files[0];

if (self.spread && file) {

self.excelIO.open(file, (json: any) =\> {

self.spread.fromJSON(json, {});

setTimeout(() =\> {

alert('load successfully');

}, 0);

}, (error: any) =\> {

alert('load fail');

});

}

}

//下载文件代码

onClickMe(args: any) {

const self = this;

const filename = 'exportExcel.xlsx';

const json = JSON.stringify(self.spread.toJSON());

self.excelIO.save(json, function (blob: any) {

saveAs(blob, filename);

}, function (error: any) {

console.log(error);

});

}
```

（添加上传、下载按钮的方法）

现在可以使用ng serve指令启动项目并在浏览器中测试上传文件、修改文件内容和下载文件的操作了。


![image](https://github.com/GrapeCityXA/Angular-SpreadJS/assets/18186858/96eb9403-767a-4ce3-95da-15a551721048)


**代码地址**：

<https://gitee.com/GrapeCity/angular> （[Gitee](https://gitee.com/GrapeCity/angular)）

<https://github.com/GrapeCityXA/Angular-SpreadJS> ([Github](https://github.com/GrapeCityXA/Angular-SpreadJS))

**扩展链接：**

[前端框架之争丨除了Vue、Angular和React还有谁与之争锋](https://www.grapecity.com.cn/blogs/gc-front-end-framework-debate)

[Angular性能优化实践——巧用第三方组件和懒加载技术](https://www.grapecity.com.cn/blogs/gc-angular-third-party-components-and-lazy-loading)

[如何在Angular CLI上使用SpreadJS](https://www.grapecity.com.cn/blogs/spreadjs-angularcli)
