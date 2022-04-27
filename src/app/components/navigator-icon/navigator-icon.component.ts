import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navigator-icon',
  templateUrl: './navigator-icon.component.html',
  styleUrls: ['./navigator-icon.component.scss'],
})
export class NavigatorIconComponent implements OnInit, OnChanges {

  @Input() name: string;
  @Input() size: number;
  @Input() direction: number;
  public g: Element;
  public arrow: Element;
  public style: string;

  constructor() { }

  ngOnInit() {
    this.style = 'height:' + this.size + 'px;width:' + this.size + 'px';
    // this.g = document.getElementsByClassName('name')[0];
    // this.arrow.setAttribute('id', this.name);
    // this.arrow = document.getElementById(this.name);
    // this.arrow.setAttribute('transform', 'rotate('+ this.direction +' 30 30)');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.direction) {
      this.arrow.setAttribute('transform', 'rotate('+ changes.direction.currentValue +' 30 30)');
    }
  }

}
