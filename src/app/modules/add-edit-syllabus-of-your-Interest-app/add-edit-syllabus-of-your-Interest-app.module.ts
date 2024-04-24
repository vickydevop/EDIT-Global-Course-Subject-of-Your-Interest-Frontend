import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  AddEditSyllabusOfYourInterestAppRoutingModule} from './add-edit-syllabus-of-your-Interest-app-routing.module';
// import {  GlobalWowVideosAppComponent } from './global-wow-videos-app/global-wow-videos-app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShowBackgroundImageComponent } from './Components/show-background-image/show-background-image.component';
// import { WowResourceTableComponent } from './global-wow-videos-app/wow-resource-table/wow-resource-table.component';
// import { ListOfWowFlashcardsRelevantComponent } from './global-wow-videos-app/list-of-wow-flashcards-relevant/list-of-wow-flashcards-relevant.component';
// import { GlobalWowFlashcardComponent } from './global-wow-resource-app/global-wow-flashcard/global-wow-flashcard.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { AddEditSyllabusOfYourInterestComponent } from './add-edit-syllabus-of-your-interest/add-edit-syllabus-of-your-interest.component';
import { AddNewComponent } from './add-edit-syllabus-of-your-interest/add-new/add-new.component';
import { NextAddEditSyllabusOfYourInterestComponent } from './add-edit-syllabus-of-your-interest/next-add-edit-syllabus-of-your-interest/next-add-edit-syllabus-of-your-interest.component';
import { DeletePopupComponent } from './add-edit-syllabus-of-your-interest/delete-popup/delete-popup.component';


@NgModule({
  declarations: [
   ShowBackgroundImageComponent,
    // ListOfWowFlashcardsRelevantComponent,
  //  GlobalWowVideosAppComponent,
  //  WowResourceTableComponent,
   AddEditSyllabusOfYourInterestComponent,
   AddNewComponent,
   NextAddEditSyllabusOfYourInterestComponent,
   DeletePopupComponent,

    // GlobalWowFlashcardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AddEditSyllabusOfYourInterestAppRoutingModule,
    NgxStarRatingModule,
  ]
})
export class AddEditSyllabusOfYourInterestAppModule { }
