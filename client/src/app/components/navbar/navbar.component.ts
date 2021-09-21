import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  headerTitle: string = "IBM Front End Developer Assignment";
  constructor() { }

  ngOnInit(): void {
  }

}
