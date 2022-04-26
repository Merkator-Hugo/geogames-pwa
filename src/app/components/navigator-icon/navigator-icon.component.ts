import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator-icon',
  templateUrl: './navigator-icon.component.html',
  styleUrls: ['./navigator-icon.component.scss'],
})
export class NavigatorIconComponent implements OnInit {

  @Input() size: number;
  public arrow: Element;
  public style: string;

  constructor() { }

  ngOnInit() {
    this.style = 'height:' + this.size + 'px;width:' + this.size + 'px';
    this.arrow = document.getElementById('arrow');
    // this.arrow.setAttribute('transform', 'rotate('+ 180 +' ' + 50 + ' ' + 50 + ')');
    // this.arrow.setAttribute('transform', 'rotate(180)');
  }

}
