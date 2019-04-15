import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-latest-product-slider',
  templateUrl: './latest-product-slider.component.html',
  styleUrls: ['./latest-product-slider.component.sass']
})
export class LatestProductSliderComponent implements OnInit, AfterViewInit {
  @Input() products;
  @ViewChild('sliderProduct')
  domSlider: ElementRef;
  public sliderWrapper: any;
  public productsList: HTMLCollection;
  public firstElement: ClientRect;
  public lastElement: ClientRect;
  get positionMainElement() {
    return this.sliderWrapper.getBoundingClientRect();
  }
  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    window.onload = () => {
      this.init();
    };
  }

  init() {
    this.sliderWrapper = this.domSlider.nativeElement;
    this.productsList = this.sliderWrapper.getElementsByTagName('app-pre-view-product');
    this.firstElement = this.productsList[0].getBoundingClientRect();
    this.lastElement = this.productsList[this.productsList.length - 1].getBoundingClientRect();
  }
  setStyleWrapper() {

  }
}
