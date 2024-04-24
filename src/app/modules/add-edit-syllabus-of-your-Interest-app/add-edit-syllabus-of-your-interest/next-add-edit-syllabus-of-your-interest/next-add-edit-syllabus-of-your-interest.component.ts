import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatRadioButton } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import * as XLSX from 'xlsx';

import { ApiService } from 'src/app/shared/services/api/api.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';

@Component({
  selector: 'app-next-add-edit-syllabus-of-your-interest',
  templateUrl: './next-add-edit-syllabus-of-your-interest.component.html',
  styleUrls: ['./next-add-edit-syllabus-of-your-interest.component.scss'],
})
export class NextAddEditSyllabusOfYourInterestComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//
  // ELEMENT_DATA: PeriodicElement[] = [];
  @Input('checkData') checkData: any;

  @Input('educational_institution_category_name')
  educational_institution_category_name: any;
  @Input('category') category: any;
  @Input('country_code') country_code: any;
  @Input('country') country: any;

  sort_value: any;
  //* -----------------------  Decorated Methods  --------------------------*//
  @ViewChild('radio') radio!: MatRadioButton;

  //* -----------------------  Variable Declaration  -----------------------*//
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  disableBtn: boolean = true;

  //* ---------------------------  Constructor  ----------------------------*//
  firstFormGroup!: UntypedFormGroup;
  // public rating2:any[] = [];
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _httpClient: HttpClient,
    private _headerTitle: HeaderTitleService,
    private _apiService: ApiService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _dataSharingService: DataSharingService,
    private _snackBarService: SnackBarService,
    private _spinner: CustomSpinnerService,

    private route: Router
  ) {
    this.firstFormGroup = this._formBuilder.group({
      institution: ['', Validators.required],
      rating2: [4],
    });
  }
  decodedToken: any;
  ngOnInit(): void {
    this.educational_institution_category_name;
    // console.log(this.educational_institution_category_name);
    this.getSyllabusofyourinterest();
    const local_token: any = sessionStorage.getItem('access_token');
    const tokenPayload = local_token.split('.')[1];
    this.decodedToken = JSON.parse(atob(tokenPayload));
  }

  getSyllabusofyourinterest() {
    let body: any = {
      category_ids: this.category,
    };
    // console.log(body);

    this._spinner.open();
    this._apiService
      .getSyllabusofyourinterest(this.country_code, body)
      .subscribe((res) => {
        // console.log(res, 'data');
        this.dataSource.data = res.data;

        this._spinner.close();
      });
  }
  row: any;
  global_course_syllabus_id!: number;
  btndisable: boolean = false;

  selectRow(element: any) {
    this.row = element;
    this.global_course_syllabus_id = this.row.global_course_subject_id;

    // console.log(this.row, 'row');
    this.btndisable = true;
  }

  submit() {
    let body: any = {
      category_ids: this.category,
    };
    this._spinner.open();
    this._apiService
      .insert_global_id(this.country_code, this.global_course_syllabus_id, body)
      .subscribe((res) => {
        // console.log(res, 'data');
        this.dataSource.data = res.data;

        this._spinner.close();
        this.btndisable = false;

        this.getSyllabusofyourinterest();
        if (res.statusCode == 200) {
          this._snackBarService.success('Data Inserted Successfully');
        } else {
          this._snackBarService.error('Data Not-Inserted Successfully');
        }
      });
  }

  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = [
    'GlobalCourseSubjectName',
    'CourseSubjectCategoryType',
  ];

  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('paginatorElement', { read: ElementRef })
  paginatorHtmlElement!: ElementRef;

  rowValue: any[] = [];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // console.log(this.selection.selected);
    this.rowValue = this.selection.selected;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.translateMatPaginator(this.paginator);
  }

  ngDoCheck(): void {
    if (this.selection.selected.length <= 0) {
      this.rowValue = [];
    }
  }

  table_json_data: any;

  loadData() {
    // this._apiService
    //   .get_periodic_elements(this.currentPage, this.pageSize)
    //   .subscribe((res) => {
    //     this.table_json_data = res;
    //     this.dataSource.data = res.data.rows;
    //     setTimeout(() => {
    //       this.paginator.pageIndex = this.currentPage;
    //       this.paginator.length = res.data.count;
    //     });
    //   });
  }

  pageChanged(event: PageEvent) {
    // console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }
  showPageSizeOptions: boolean = true;

  translateMatPaginator(paginator: MatPaginator) {
    paginator._intl.firstPageLabel = 'First';
    paginator._intl.itemsPerPageLabel = 'Records Per Page';
    paginator._intl.lastPageLabel = 'Last';
    paginator._intl.nextPageLabel = 'Next';
    paginator._intl.previousPageLabel = 'Previous';
  }

  exportReport(fileName: any): void {
    /* pass here the table id */
    let element = document.getElementById('excel_table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  onPrint() {
    window.print();
  }

  @ViewChild('pdfTable11', { static: false }) pdfTable11!: ElementRef;

  public downloadAsPDF() {
    let pageIndex: number = Number(this.paginator.pageIndex);
    let pageSize: number = Number(this.paginator.pageSize);

    let currentPageEnd = pageSize * (pageIndex + 1);
    let currentPageStart = currentPageEnd - (pageSize - 1);

    const htmlToPrint =
      '' +
      '<style type="text/css">' +
      '.pageFooter {' +
      '    display: table-footer-group;' +
      '    counter-increment: page;' +
      '}' +
      '.pageFooter:after {' +
      '   content: "Page " counter(page)' +
      '}' +
      '</style>';
    var printContents = document.getElementById('pdfTable11')!.innerHTML;
    let popupWin: any = window.open(
      'Angular Large Table to pdf',
      '_blank',
      'width=768,height=auto'
    );

    popupWin.document.write(
      '<html><head>' +
        '<link rel="stylesheet" href="' +
        'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"/>' +
        '<style type="text/css">' +
        '.pageFooter {' +
        '    display: table-footer-group;' +
        '    counter-increment: page;' +
        '}' +
        +'.mat-radio-container {' +
        'display: none;' +
        '}' +
        '.pageFooter:after {' +
        '   content: "Page Number" counter(page)' +
        '}' +
        '.mat-radio-button {' +
        'visibility:none' +
        '}' +
        '</style>' +
        `</head>

        <body onload="window.print()">
          <style>
          .mat-column-select{display:none}
          .mat-table{
            margin-left:auto;
            margin-right:auto;
            width:80%;
           }
          </style>

          <div style="width:100%;  display: flex;flex-direction: row;align-items:center; margin-bottom:5px;margin-top:10px">
          <img style="width:100px;height:100px;padding:10px;" src="assets/icons/favicon.png" alt="app-logo" />
          <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">GETster.TECH PVT.LTD</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">Select the Relevant Courses / Subjects list of</span>
            <span style="text-align: center;font-size:14px;color:black;font-weight:600;">Records : ( ${currentPageStart} - ${currentPageEnd} of ${
          this.paginator.length
        } ) ${
          this.filterValue.length >= 1
            ? `(Filtered by -" ${this.filterValue} ")`
            : ''
        } (${DateTime.local().toFormat('yyyy-MM-dd TT')})</span>
          </div>
          </div>

          ` +
        printContents +
        '</body>' +
        `
          <footer style="position: fixed; bottom: 0; width: 100%;">
          <div style=" display: flex;flex-direction: column; width:100%; align-items:center">
          <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">${this.decodedToken.user?.address_line_1}, ${this.decodedToken.user?.address_line_2}, </span>
          <span style="text-align: end;font-size:12px;text-size:12px;font-weight:500">${this.decodedToken.user?.city_district_county}, ${this.decodedToken.user?.state_province} ${this.decodedToken.user?.pin_code}</span>
          </div>
          </footer>
        ` +
        '</html>'
    );
    popupWin.document.close();
  }

  //* ------------------------------ Helper Function -----------------------*//
}
export interface PeriodicElement {
  name: any;
  user_id: any;
  select_user_category: any;
}
