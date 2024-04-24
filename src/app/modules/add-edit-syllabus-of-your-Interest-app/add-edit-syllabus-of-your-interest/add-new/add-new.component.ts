import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { of } from 'rxjs';
import { TreeData } from 'src/app/models/tree.interface';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { CustomSpinnerService } from 'src/app/shared/services/custom-spinner/custom-spinner.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing/data-sharing.service';
import { NextAddEditSyllabusOfYourInterestComponent, PeriodicElement } from '../next-add-edit-syllabus-of-your-interest/next-add-edit-syllabus-of-your-interest.component';
import { CountryStateCityService } from 'src/app/shared/services/country-state-city/country-state-city.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DateTime } from 'luxon';
import * as XLSX from 'xlsx';
import { SnackBarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { IframeService } from 'src/app/shared/services/iframe/iframe.service';
import { environment } from 'src/environments/environment';
import { baseOriginUrl } from 'src/app/app.component';


interface Country {
  shortName: string;
  name: string;
  native: string;
  phone: string;
  continent: string;
  capital: string;
  currency: string;
}


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  //   sample_data: any = [
  //   {
  //     user_category_id: 5011,
  //     parent_user_category_id: null,
  //     user_category_name: 'SACRED HEART',
  //     is_the_category_hidden: 0,
  //     category_type: 2,
  //     children: [
  //       {
  //         user_category_id: 5012,
  //         parent_user_category_id: '5011',
  //         user_category_name: 'SHIFT 1',
  //         is_the_category_hidden: 0,
  //         category_type: 2,
  //         children: [
  //           {
  //             user_category_id: 5013,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'BCA',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5014,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'BSC',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5015,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'MATHS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5016,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'PHYSICS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5017,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'CS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5018,
  //             parent_user_category_id: '5012',
  //             user_category_name: 'TAMIL',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //         ],
  //       },
  //       {
  //         user_category_id: 5019,
  //         parent_user_category_id: '5011',
  //         user_category_name: 'SHIFT 2',
  //         is_the_category_hidden: 0,
  //         category_type: 2,
  //         children: [
  //           {
  //             user_category_id: 5020,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'BCA',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5021,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'BSC',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5022,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'MATHS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5023,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'PHYSICS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5024,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'CS',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5025,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'TAMIL',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //           {
  //             user_category_id: 5026,
  //             parent_user_category_id: '5019',
  //             user_category_name: 'Management',
  //             is_the_category_hidden: 0,
  //             category_type: 2,
  //             children: [],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  checkedTreeData: any[] = [];
  showTreeStructure = true;
  CountryfilteredOptions:any;
  countries: Country[] = [];
  nextcombtn:boolean = false;
  treeselected:boolean = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 20];

//* ---------------------------  Constructor  ----------------------------*//


constructor(     public add_new: MatDialogRef<AddNewComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog,
  public _apiService: ApiService,
  public _dateshare:DataSharingService,
  private _spinner:CustomSpinnerService,
  private service: CountryStateCityService,
  private _snackBar:SnackBarService,
  public _iframeService:IframeService
  ) {
    this.nestedTreeControl = new NestedTreeControl<any>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.CountryfilteredOptions = this.service.getCountries();
   }

   nestedTreeControl!: NestedTreeControl<any>;
   nestedDataSource!: MatTreeNestedDataSource<any>;
   checklistSelection = new SelectionModel<any>(true /* multiple */);
   selected_category_val: any = [];


form = new FormGroup({
  country: new FormControl('', Validators.required),
});

country_code: any;
country_details: any[] = this.service.getCountries();
country_select:any;
decodedToken:any;
  ngOnInit(): void {
    // console.log('ngOnInit');

    // this._iframeService.getIframeData.subscribe({
    //   next:(res:any) => {
    //     console.log(res,'iframedata');
    //   },error:() => {

    //   }
    // });

    const local_token: any = sessionStorage.getItem('access_token');
    const tokenPayload = local_token.split('.')[1];
    this.decodedToken = JSON.parse(atob(tokenPayload));

    this._apiService
    .registeredcountrycode().subscribe((res) => {
      // console.log(res);

      let country_code = res.data;
      // console.log(country_code);

      let filterd_values: any[] = [];
      for (let i = 0; i < country_code.length; i++) {
        const element = country_code[i].country_code;
        // console.log(element);

        this.country_details.map((e:any) => {
          // console.log(this.country_details);

          if (e.shortName === element) {
            filterd_values.push(e);
          }
        });
      }
      this.country_select = filterd_values;
      // console.log(this.country_select,"country");
      // //console.log(this.country_select);
    });



  this.form.controls['country'].valueChanges.subscribe((val) => {

    this.country_code = val;
    // console.log(this.country_code);

    this._apiService
      .get_educational_institution_category_data(val)
      .subscribe((res) => {
        // //console.log(res);
        // this.visibility = true;
        this.showTreeStructure = true;

        //------------------------------------------Tree Code-----------------------------------------------//
        this.nestedDataSource.data = res.data;
        this.nestedTreeControl.dataNodes = res.data;
        this.nestedTreeControl.expandAll();
        //-------------------------------------------------------Get default syllabus data-----------------------------//
      });
  });

    this.form.controls['country'].valueChanges.subscribe((data: any) => {
      // console.log(data);
      this.countries = this.service.getCountries();
      if (data !== undefined) {
        this.CountryfilteredOptions = this.countries?.filter((d: any) => {
          // console.log(d)
          if (d.name)
            return d?.name
              ?.toLowerCase()
              .includes(data.toString().toLowerCase());
        });
      }
    });
  }

  country:any;
  getval() {
    this._spinner.open();
    this._apiService
    .registeredcountrycode().subscribe((res) => {
      // console.log(res);
    this._spinner.close();
      let country_code = res.data;
      // console.log(country_code);

      let filterd_values: any[] = [];
      for (let i = 0; i < country_code.length; i++) {
        const element = country_code[i].country_code;
        // console.log(element);

        this.country_details.map((e:any) => {
          // console.log(this.country_details);

          if (e.shortName === element) {
            filterd_values.push(e);
          }
        });
      }
      this.country_select = filterd_values;
      // console.log(this.country_select[0].name);
      // //console.log(this.country_select);
      this.country = this.country_select[0].name
    });

  }

  displayCountry(user: any) {
    return user && user.name ? user.name : '';
  }

  next(){
    this.nextcombtn = true;
  }
    // -------------------------------------Tree Structure-----------------------------------------//




    category_ids:any[]=[];
    category:any[]=[];
    educational_institution_category_name:any;
    test:any[] = [];
    educational_institution_category_id:any;
    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: TreeData): void {
      this.checklistSelection.toggle(node);
      this.selected_category_val = this.checklistSelection.selected;

      // console.log(this.checklistSelection.selected,'selected');

      this.category_ids = this.selected_category_val;

      this.category = [];
        (this.category,"111");
        let tree_selected_data:any = this.checklistSelection.selected;

        // let a:any = [];

        // for(let j=0 ;j<tree_selected_data.length;j++) {
        //   a.push(tree_selected_data[j]?.educational_institution_category_id)
        // }
        // this.treeselected = true;
        // this.educational_institution_category_id = a;
        // // console.log(this.educational_institution_category_id,'educational_institution_category_id')
        // this._spinner.open();
        // this._apiService.getSyllabusofyourinterest(this.country_code,this.educational_institution_category_id).subscribe({
        //   next:(res)=>{
        // this._spinner.close();
        //   this.dataSource.data = res.data;
        //   },error:() => {
        // this._spinner.close();
        //   }
        // })
        // this._apiService.getSyllabusofyourinterest(this.country_code, body)
        // .subscribe((res) => {
        //   // console.log(res, 'data');
        //   this.dataSource.data = res.data;

        //   this._spinner.close();
        // });
      // this.ListOfWowFlashcardsRelevantComponent.getWOWResourcesRelevantToSyllabus();
    }
  global_course_subject_id:any;
  check_id:any;
  load_data(){
    this._spinner.open();
    this._apiService.getSyllabusofyourinterest(this.country_code,this.educational_institution_category_id).subscribe({
      next:(res)=>{
        // console.log(res,'res')
      this._spinner.close();
      if(res?.data.length>0){
        this.dataSource.data = res.data;
      }else {
        this._snackBar.success('Data Not Found')
        this.dataSource.data = []
      }
      },error:() => {
    this._spinner.close();
      }
    });
  }
    get_tree_view_name(_data:any) {
      this.selection.clear();
      // console.log(_data,'data');
      this.educational_institution_category_name = _data.value?.educational_institution_category_name_path;
      this.educational_institution_category_id = _data.value?.educational_institution_category_id;
      // console.log(this.educational_institution_category_id,'cat')
     this.load_data()

      // this._apiService.check_global_id(this.country_code,this.educational_institution_category_id).subscribe({
      //   next:(res) => {
      //     this.check_id = res.data;
      //     // console.log(this.check_id,'check');
      //   },error:() => {

      //   }
      // })
    }

    // isDisabled(courseSubject:any ) {
    //   console.log(courseSubject,'courseSubject');
    //   // console.log(this?.check_id.includes(courseSubject?.global_course_subject_id))
    //   // Check if the global_course_subject_id exists in the data array
    //   return this?.check_id.includes(courseSubject?.global_course_subject_id);
    // }

    private _getChildren = (node: any) => node.children;
    hasNestedChild = (_: string, nodeData: any) => nodeData.children.length > 0;
    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: any): void {
      let parent: any | null = this.getParentNode(node);
      while (parent) {
        this.checkRootNodeSelection(parent);
        parent = this.getParentNode(parent);
      }
    }

    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: any): void {
      const nodeSelected = this.checklistSelection.isSelected(node);
      const descendants = this.nestedTreeControl.getDescendants(node);
      const descAllSelected =
        descendants.length > 0 &&
        descendants.every((child) => {
          return this.checklistSelection.isSelected(child);
        });
      if (nodeSelected && !descAllSelected) {
        this.checklistSelection.deselect(node);
      } else if (!nodeSelected && descAllSelected) {
        this.checklistSelection.select(node);
      }
    }

    getLevel = (node: any) => node.level;
    /* Get the parent node of a node */
    getParentNode(node: any): any | null {
      const currentLevel = this.getLevel(node);

      // if (currentLevel < 1) {
      //   return null;
      // }

      const startIndex = this.nestedTreeControl?.dataNodes?.indexOf(node) - 1;

      for (let i = startIndex; i >= 0; i--) {
        const currentNode = this.nestedTreeControl.dataNodes[i];
      }
      return null;
    }


  btn_disable:boolean = false;

  selectRow() {
    // console.log(this.selection.selected,'checkbox');
    this.btn_disable = true;
    let b:any = [];
    for(let i=0; i<this.selection.selected.length;i++) {
      let a:any = this.selection.selected;
      b.push(a[i]?.global_course_subject_id);
    }
    this.global_course_subject_id = b;
    // console.log(this.global_course_subject_id);
  }

  _popup_response:any = 0;
  submit() {
    // console.log(this.educational_institution_category_id,this.global_course_subject_id,'educational_institution_category_id')
    this._spinner.open();
    this._apiService
      .insert_global_id(this.country_code,this.educational_institution_category_id,this.global_course_subject_id).subscribe({
        next:() => {
          this._spinner.close();
          this.btn_disable = false;
          this._popup_response = 1;
          this.load_data()
          this.sendMessage(true, baseOriginUrl);
          this._snackBar.success('Data Inserted Successfully');
        },error:() => {
          this._spinner.close();
          this.sendMessage(false, baseOriginUrl);
          this._snackBar.error('Error while inserting data');
        }
      })
  }

  sendMessage(body: any, targetOrigin: string) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(JSON.stringify(body), targetOrigin);
  }
  onNoClick(): void {
    this.add_new.close(this._popup_response);
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
      // console.log(this.selection.selected,'select')
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

  @ViewChild('pdfTable11', { static: false }) pdfTable11!: ElementRef;

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
    let customer_logo = `${environment.ceph_user_login_image}/${country_code}-${customer_id}/${customer_sub_domain_name}-icon-144x144.png`;

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
        +'.mat-checkbox-container {' +
        'display: none;' +
        '}' +
        '.pageFooter:after {' +
        '   content: "Page Number" counter(page)' +
        '}' +
        '.mat-checkbox {' +
        'visibility:collapse' +
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
          <img style="width:100px;height:100px" src="${customer_logo}"  onerror="this.src='https://getsterapps.getwow.education/assets/icons/logo.png'"  alt="app-logo" />
          <div style=" display: flex;flex-direction: column; width:100%">
            <span style="text-align: center;font-size:16px;color:blue;text-size:16px;font-weight:600;text-decoration-line: underline;">${this.decodedToken?.user?.customer_sub_domain_name}</span>
            <span style="text-align: center;font-size:16px;color:black;font-weight:600;text-transform: uppercase">Relevant Courses / Subjects to the above selected syllabus list of</span>
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

}
