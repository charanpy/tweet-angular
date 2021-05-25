import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.scss'],
})
export class NavItemsComponent implements OnInit {
  @Input()
  iconName: string = '';
  @Input()
  routeName: string = '';
  @Input()
  navigateTo: string = '';
  @Output() actionEmitter = new EventEmitter<string | undefined>();
  currentRouter: string = '';
  constructor(private router: Router) {
    this.currentRouter = this.router.url;
  }

  ngOnInit(): void {}

  onClick(navigate?: string) {
    this.actionEmitter.emit(navigate && navigate);
  }
}
