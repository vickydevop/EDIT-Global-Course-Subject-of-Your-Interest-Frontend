import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatRadioButton } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
// import * as countryCityState from 'countrycitystatejson';

// import * as moment from 'moment';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { HeaderTitleService } from 'src/app/shared/services/header-title/header-title.service';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';

import * as XLSX from 'xlsx';
import { AddNewComponent } from './add-new/add-new.component';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { IframeService } from 'src/app/shared/services/iframe/iframe.service';
import { environment } from 'src/environments/environment';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import { baseOriginUrl } from 'src/app/app.component';
@Component({
  selector: 'app-add-edit-syllabus-of-your-interest',
  templateUrl: './add-edit-syllabus-of-your-interest.component.html',
  styleUrls: ['./add-edit-syllabus-of-your-interest.component.scss'],
})
export class AddEditSyllabusOfYourInterestComponent implements OnInit {
  //* --------------------------  Start  -----------------------------------*//
  ELEMENT_DATA: PeriodicElement[] = [];
  @Input('checkData') checkData: any;
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
    public _iframeService:IframeService,
    private route: Router
  ) {
    this.firstFormGroup = this._formBuilder.group({
      institution: ['', Validators.required],
      rating2: [4],
    });
  }
  decodedToken:any;
  ngOnInit(): void {
    this.getdata();
    const local_token:any = sessionStorage.getItem('access_token');
    const tokenPayload = local_token.split('.')[1];
    this.decodedToken = JSON.parse(atob(tokenPayload));
    // console.log(local_token,decodedToken,'token')
  }

  getdata() {
    this._spinner.open();
    this._apiService.get_global_syllabus_details().subscribe({
      next:(res) =>{
        setTimeout(() => {
          this.dataSource.data = res.data;
          if (res.data.length < 1) {
            this._snackBarService.success('Data Not Found');
          }
          this._spinner.close();
        }, 10);
      },error:()=>{
        this._spinner.close();
      }
    })
    // this._apiService.get_global_syllabus_details().subscribe((res) => {
    //   setTimeout(() => {
    //     this.dataSource.data = res.data;
    //     if (res.data.length < 1) {
    //       this._snackBarService.success('Date Not Found');
    //     }
    //     this._spinner.close();
    //   }, 10);
    //   // this.educational_institution_category_country_code = countryCityState.getCountryByShort(res.data.educational_institution_category_country_code).name;
    //   // console.log(this.dataSource.data);
    // });
  }

  row: any;
  // global_course_syllabus_id!: number;
  educational_institution_category_id!: string;
  educational_institution_category_country_code!: string;
  global_course_subject_id!: number;
  btn_disable: boolean = true;

  selectRow(element: any) {
    // console.log(element,'radio');
    this.row = element;
    // this.global_course_syllabus_id = this.row.global_course_subject_id;
    this.educational_institution_category_id =
      this.row.educational_institution_category_id;
    this.educational_institution_category_country_code =
      this.row.educational_institution_category_country_code;
    this.global_course_subject_id = this.row.global_course_subject_id; 
    
    this._apiService.check_data_for_rmvbtn(this.educational_institution_category_id,this.educational_institution_category_country_code,this.global_course_subject_id).subscribe({
      next:(res) =>{
        console.log(res);
        if(res.data[0]?.count == 0){
          // console.log('if');
          this.btn_disable = false;
        }else{
          // console.log('else');  
          this.btn_disable = true;
        }
      }
    })
    // console.log(this.global_course_subject_id, 'row');
  }

  delete() {
      let config: MatDialogConfig = {
        disableClose: true,
        maxWidth: '300px',
        minHeight: 'auto',
      };

      const dialogRef = this.dialog.open(DeletePopupComponent, config);
      dialogRef.afterClosed().subscribe((res) => {
        console.log(res);
        if (res == 'true') {
          this._apiService
            .delete_global_id(
              this.educational_institution_category_country_code,
              this.educational_institution_category_id,
              this.global_course_subject_id
            ) .subscribe ({
              next:() => {
              this.btn_disable = true
              this.getdata();
              this.sendMessage(true, baseOriginUrl);
              this._snackBarService.success('Data Removed Successfully');
              },
              error:() => {
              this.sendMessage(false, baseOriginUrl);
              this._snackBarService.error('Error while Data Removing');
              }
            })
        }
      });

    // console.log( this.educational_institution_category_country_code,
    //   this.educational_institution_category_id,
    //   this.global_course_syllabus_id,'delete');
      // .subscribe((res) => {
      //   this.dataSource.data = res.data;
      //   // console.log(this.dataSource.data);
      //   this._snackBarService.success('Data Removed Successfully');
      // });
    // this.getdata();
  }

  sendMessage(body: any, targetOrigin: string) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(JSON.stringify(body), targetOrigin);
  }
  filterValue = '';
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = this.filterValue;
  }

  displayedColumns: string[] = [
    'CountryName',
    'EducationalInstitutionCategoryName',
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

  filterDisable: boolean = true;
  pageChanged(event: PageEvent) {
    // console.log(event, 'event',event.pageSize.toString() , this.paginator.length.toString())
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    // this.loadData();

    if (event.pageSize.toString() == this.paginator.length.toString()) {
      this.filterDisable = false;
    } else {
      this.filterDisable = true;
    }
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

  @ViewChild('pdfTable1', { static: false }) pdfTable1!: ElementRef;

  public downloadAsPDF() {
    let pageIndex: number = Number(this.paginator.pageIndex);
    let pageSize: number = Number(this.paginator.pageSize);

    let currentPageEnd = pageSize * (pageIndex + 1);
    let currentPageStart = currentPageEnd - (pageSize - 1);

    let {
      registered_educational_institution_name,
      city_district_county,
      state_province,
      pin_code,
      address_line_1,
      address_line_2,
      user_id,
      customer_id,
      country_code,
      customer_sub_domain_name
    } = this.decodedToken.user;
    let customer_logo = `${environment.ceph_user_login_image}/${this.decodedToken.user.country_code}-${customer_id}/${customer_sub_domain_name}-icon-144x144.png`;
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
    var printContents = document.getElementById('pdfTable1')!.innerHTML;
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
        ' visibility:hidden' +
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
          <img style="width:100px;height:100px" src="${customer_logo}"  onerror="this.src='https://getsterapps.getwow.education/assets/icons/logo.png'"  alt="app-logo" />           <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">${this.decodedToken?.user?.customer_sub_domain_name}</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">List of Global Course / Subject of your Interest</span>
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

  addnew(): void {
    const dialogRef = this.dialog.open(AddNewComponent, {
      disableClose: true,
      width: 'calc(100vw - 50px)',
      height: 'calc(100vh - 50px)'
      // minWidth: '340px',
      // minHeight: '500px',
    }); // console.log(this.rowValue);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result,'popup');
      if(result == 1) {
        this.getdata();
      } else {

      }
    });
  }

  //! -------------------------------  End  --------------------------------!//
}
export interface PeriodicElement {
  name: any;
  user_id: any;
  select_user_category: any;
}
