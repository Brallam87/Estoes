import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { project1 } from './Main/newproject/newproject';
import { projects } from "./Main/allprojects";
import { editproject } from "./Main/EditProject/project";

const routes: Routes = [
  {path:"", redirectTo: "projects", pathMatch: "full"},
  { path: 'projects', component: projects },
  { path: "project1",component: project1},
  { path: "editproject/:index" ,component: editproject},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
