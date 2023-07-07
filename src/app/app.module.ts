import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import{projects} from"./Main/allprojects";
import { project } from './Main/Project/projectComponent';
import { project1 } from './Main/newproject/newproject';
import { AppRoutingModule } from './app-routing.module';
import { LocalStorageService } from "./db/LocalStorageService";
import { editproject } from './Main/EditProject/project';


//import { editproject } from './Main/EditProject/editproject';

@NgModule({
  declarations: [
    AppComponent,
    projects,
    [project],
    project1,
    editproject
  ],
  imports: [
    BrowserModule,
    [ FormsModule],
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    LocalStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
