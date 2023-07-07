import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
@Component({
  selector: 'projects',
  templateUrl: './allprojects.html',
  styleUrls: ['./allprojects.css']
})
export class projects implements OnInit {
  constructor(private router: Router){}
  ngOnInit() {
  }
}