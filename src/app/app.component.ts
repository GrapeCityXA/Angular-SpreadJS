import { Component } from '@angular/core';
import * as GC from '@grapecity/spread-sheets';
import * as Excel from '@grapecity/spread-excelio';
import { SpreadSheetsModule } from '@grapecity/spread-sheets-angular';
import '@grapecity/spread-sheets-charts';
// 引入中文资源，也可以使用日文或韩文，按照自己的需求安装不同语言资源并引入即可
import '@grapecity/spread-sheets-resources-zh'
// 设计器资源，设计器资源要在设计器核心资源之前
import "@grapecity/spread-sheets-designer-resources-cn"
// 设计器核心资源
import * as GcDesigner from "@grapecity/spread-sheets-designer"
// 设计器css
// import "@grapecity/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css"
// import "@grapecity/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css"
 // 设计器对vue的支持资源
//  import Designer from "@grapecity/spread-sheets-designer-angular"
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//设置内容长度宽度格式
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
    const self = this;
    self.spread = args.spread;
    const sheet = self.spread.getActiveSheet();
    sheet.getCell(0, 0).text('Test Excel').foreColor('blue');
    // sheet.getCell(1, 0).text('Test Excel').foreColor('blue');
    // sheet.getCell(2, 0).text('Test Excel').foreColor('blue');
    // sheet.getCell(3, 0).text('Test Excel').foreColor('blue');
    // sheet.getCell(0, 1).text('Test Excel').foreColor('blue');
    // sheet.getCell(1, 1).text('Test Excel').foreColor('blue');
    // sheet.getCell(2, 1).text('Test Excel').foreColor('blue');
    // sheet.getCell(3, 1).text('Test Excel').foreColor('blue');
    // sheet.getCell(0, 2).text('Test Excel').foreColor('blue');
    // sheet.getCell(1, 2).text('Test Excel').foreColor('blue');
    // sheet.getCell(2, 2).text('Test Excel').foreColor('blue');
    // sheet.getCell(3, 2).text('Test Excel').foreColor('blue');
    // sheet.getCell(0, 3).text('Test Excel').foreColor('blue');
    // sheet.getCell(1, 3).text('Test Excel').foreColor('blue');
    // sheet.getCell(2, 3).text('Test Excel').foreColor('blue');
    // sheet.getCell(3, 3).text('Test Excel').foreColor('blue');
  }

  //上传文件代码
  onFileChange(args: any) {
    const self = this, file = args.srcElement && args.srcElement.files && args.srcElement.files[0];
    if (self.spread && file) {
      self.excelIO.open(file, (json: any) => {
        self.spread.fromJSON(json, {});
        setTimeout(() => {
          alert('load successfully');
        }, 0);
      }, (error: any) => {
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
}
