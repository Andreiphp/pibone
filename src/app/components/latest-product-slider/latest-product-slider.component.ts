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
  private moovDiv: HTMLElement;
  get positionMainElement() {
    return this.sliderWrapper.getBoundingClientRect();
  }
  constructor() {
    window.onresize = function () {
      this.init();
    }.bind(this);
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    window.onload = () => {
      this.sliderWrapper = this.domSlider.nativeElement;
      this.init();
      this.setStyleWrapper();
    };
  }

  init() {
    this.moovDiv = this.sliderWrapper.querySelector('#sw');
    this.productsList = this.sliderWrapper.getElementsByTagName('app-pre-view-product');
    this.firstElement = this.productsList[0].getBoundingClientRect();
    this.lastElement = this.productsList[this.productsList.length - 1].getBoundingClientRect();
  }
  setStyleWrapper() {
    this.moovDiv.style.transform = 'translateX(0px)';
    this.moovDiv.style.transitionDuration = '0.9s';
    this.moovDiv.style.transitionDelay = '0.2s';
  }
  nextSlide() {
    let position = this.parseStyle();
    this.moovDiv.style.transform = 'translate3d(' + Math.ceil(position - this.firstElement.width) + 'px,' + '0px,' + 100 + 'px' + ')';
  }
  parseStyle(): number {
    return +(this.moovDiv.style.transform.match(/\((-?\d*).*\)/)[1]);
  }
  prevSlide() {
    let position = this.parseStyle();
    this.moovDiv.style.transform = 'translate3d(' + Math.ceil(position + this.firstElement.width) + 'px,' + '0px,' + 100 + 'px' + ')';
  }
}
