import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-latest-product-slider',
  templateUrl: './latest-product-slider.component.html',
  styleUrls: ['./latest-product-slider.component.sass']
})
export class LatestProductSliderComponent implements OnInit {
  @Input() products;
  constructor() { }

  ngOnInit() {
  }
}
