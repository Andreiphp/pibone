import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import { Unsubscribable, from, pipe } from 'rxjs';
import {fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-main-latest-product',
  templateUrl: './main-latest-product.component.html',
  styleUrls: ['./main-latest-product.component.sass']
})
export class MainLatestProductComponent implements OnInit {
  unsubscribe: Unsubscribable;
  constructor(public request: RequestsService) {

   }

  ngOnInit() {
  }

}
