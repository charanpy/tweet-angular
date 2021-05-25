import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagesnotfound',
  templateUrl: './pagesnotfound.component.html',
  styleUrls: ['./pagesnotfound.component.scss'],
})
export class PagesnotfoundComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url);
  }
}
