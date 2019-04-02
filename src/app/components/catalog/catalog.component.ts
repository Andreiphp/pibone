import { Component, OnInit } from '@angular/core';
import {divTrigger} from './catalog-animations';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass'],
  animations: [
    divTrigger
  ]
})
export class CatalogComponent implements OnInit {
  public isVisible = false;
  constructor() { }

  ngOnInit() {
  }

}
