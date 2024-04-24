import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtAuthService } from './jwtauthservice.service';
// import { JwtAuthService } from './jwtauthservice.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  customer_id: any;
  country_no: any;

  private httpClient: HttpClient;

  constructor(private http: HttpClient, private handler: HttpBackend,
    private _jwtAuthService: JwtAuthService
    ) {
    this.getvalues();
    this.httpClient = new HttpClient(handler);

  }

  getvalues() {
    this.customer_id = sessionStorage.getItem('customer_id');
    this.country_no = sessionStorage.getItem('country_no');
  }

  // post_form(body: any): Observable<any> {
  //   return this.http
  //     .post<any>(
  //       `${environment.form}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
  //       body
  //     )
  //     .pipe(
  //       map((m) => {
  //         let data = m.data;
  //         let msg = m.message;
  //         return [data, msg];
  //       })
  //     );
  // }


  get_global_syllabus_details(){
    return this.http.get<any>(
      `${environment.get_global_syllabus_details}`,
      this._jwtAuthService.getJwtToken()

    )
  }

  // get_tree_data(row_global_course_subject_id:number){
  //   return this.http.get<any>(
  //     `${environment.get_tree_data}?global_course_syllabus_id=${row_global_course_subject_id}`,
  //     this._jwtAuthService.getJwtToken()

  //   )
  // }

  // get_checked_tree_data(row_global_course_subject_id:number){
  //   return this.http.get<any>(
  //     `${environment.get_checked_tree_data}?global_course_syllabus_id=${row_global_course_subject_id}`,
  //     this._jwtAuthService.getJwtToken()

  //   )
  // }
  // WOWResourcesRelevantToSyllabus(global_course_syllabus_id:number, body:any){
  //   console.log(body,"api");

  //   return this.http.post<any>(
  //     `${environment.WOWResourcesRelevantToSyllabus}?global_course_syllabus_id=${global_course_syllabus_id}`,body,
  //     this._jwtAuthService.getJwtToken()

  //   )
  // }

  // link(institutional_wow_video_id:number, global_wow_video_id:number, global_course_syllabus_id:number){
  //   return this.http.post<any>(
  //     `${environment.link}?institutional_wow_video_id=${institutional_wow_video_id}&global_wow_video_id=${global_wow_video_id}&global_course_syllabus_id=${global_course_syllabus_id}`,null,
  //     this._jwtAuthService.getJwtToken()
  //   )
  // }

  // getWowSyllabusCategory(global_course_subject_id:number, body:any){
  //   console.log(body,"api");

  //   return this.http.post<any>(
  //     `${environment.getWowSyllabusCategory}?global_course_subject_id=${global_course_subject_id}`,body,
  //     this._jwtAuthService.getJwtToken()

  //   )
  // }

  // kjfls
  registeredcountrycode(){

    return this.http.get<any>(
      `${environment.registeredcountrycode}`,

    )
  }
  get_educational_institution_category_data(country_code:any)
  {
    return this.http.get<any>(
      `${environment.get_educational_institution_category_data}?country_code=${country_code}`,
      this._jwtAuthService.getJwtToken()

    )
  }
  check_global_id(educational_institutional_category_country_code:any, educational_institution_category_id:any){
    return this.http.get<any>(
      `${environment.check_global_id}?educational_institution_category_country_code=${educational_institutional_category_country_code}&educational_institution_category_id=${educational_institution_category_id}`,this._jwtAuthService.getJwtToken()
    )
  }
  getSyllabusofyourinterest(educational_institutional_category_country_code:any, educational_institution_category_id:any){
    return this.http.get<any>(
      `${environment.getSyllabusofyourinterest}?educational_institutional_category_country_code=${educational_institutional_category_country_code}&educational_institution_category_id=${educational_institution_category_id}`,
      this._jwtAuthService.getJwtToken()
      )
  }

  insert_global_id(educational_institutional_category_country_code:any, educational_institution_category_id:number, body:any){
    return this.http.post<any>(
      `${environment.insert_global_id}?educational_institution_category_country_code=${educational_institutional_category_country_code}&educational_institution_category_id=${educational_institution_category_id}`,body,
      this._jwtAuthService.getJwtToken()

      )
  }

  delete_global_id(educational_institutional_category_country_code:string,educational_institution_category_id:string, global_course_syllabus_id:number){
    return this.http.delete<any>(
      `${environment.delete_global_id}?educational_institution_category_country_code=${educational_institutional_category_country_code}&educational_institution_category_id=${educational_institution_category_id}&global_course_syllabus_id=${global_course_syllabus_id}`,
      this._jwtAuthService.getJwtToken()

      )
  }

  create_table_based_on_user_id(){
    return this.http.post<any>(
      `${environment.create_based_on_user_id}`,'',
      this._jwtAuthService.getJwtToken()

      )
  }

  // check data for remove btn 
  check_data_for_rmvbtn(educational_institution_category_id:string,educational_institution_category_country_code:string,global_course_subject_id:number){
    return this.http.get<any>(
      `${environment.check_data_for_rmvbtn}?educational_institution_category_id=${educational_institution_category_id}&educational_institution_category_country_code=${educational_institution_category_country_code}&global_course_subject_id=${global_course_subject_id}`,this._jwtAuthService.getJwtToken()
    )
  }
}
