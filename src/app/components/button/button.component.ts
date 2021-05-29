import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input()
  type: string = 'submit';

  @Input()
  color: string = '#00e676';

  @Input()
  customFont: boolean = false;

  @Input()
  disabled: boolean = false;

  @Output() buttonClickAction = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  OnClick(): void {
    this.buttonClickAction.emit();
  }
}
