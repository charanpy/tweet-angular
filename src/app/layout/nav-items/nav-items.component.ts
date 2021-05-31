import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Input()
  active: string = '';

  @Output() actionEmitter = new EventEmitter<string | undefined>();
  constructor() {}

  ngOnInit(): void {}

  onClick(navigate?: string) {
    this.actionEmitter.emit(navigate && navigate);
  }
}
