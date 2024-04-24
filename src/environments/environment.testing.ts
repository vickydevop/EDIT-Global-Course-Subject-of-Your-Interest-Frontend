let  baseURL:any = 'https://p1api.getwow.community/api/';
let  baseURL_1:any = 'https://p15api.getwow.community/api/';
let  baseURL_2:any = 'https://manageapi.getwow.biz/api/';
export const environment = {
  production: true,
  get_global_syllabus_details:`${baseURL}add-edit-syllabus-of-your-interest/userapp-schedule-wise-teaching-faculty-and-location-get-syllabus-details`,
  get_tree_data:`${baseURL_1}global-wow-resource/global-course-subject-id-syllabus-details`,
  get_checked_tree_data:`${baseURL_1}global-wow-resource/checked-global-course-subject-id-syllabus-details`,
  registeredcountrycode:`${baseURL_2}educational_institutions_category/get_educational_institutions_register_country_code`,
  get_educational_institution_category_data:`${baseURL_2}educational_institutions_category/get_all_educational_institutions_category`,
  getSyllabusofyourinterest:`${baseURL}add-edit-syllabus-of-your-interest/get-syllabus-of-your-interest`,
  insert_global_id:`${baseURL}add-edit-syllabus-of-your-interest/insert-syllabus-of-your-interest`,
  delete_global_id:`${baseURL}add-edit-syllabus-of-your-interest/delete-syllabus-of-your-interest`,
  check_global_id:`${baseURL}add-edit-syllabus-of-your-interest/check-syllabus-of-your-interest`,
  create_based_on_user_id:`${baseURL}add-edit-syllabus-of-your-interest/create-table-based-on-user-id`,
  check_data_for_rmvbtn:`${baseURL}add-edit-syllabus-of-your-interest/check-data-for-remove-button`,
  ceph_user_login_image: 'https://ceph1.getwow.cloud/',
};
