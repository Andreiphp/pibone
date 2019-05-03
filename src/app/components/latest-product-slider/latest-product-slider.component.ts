import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { sliderState } from '../latest-product-slider/latest-slider.animations';

@Component({
  selector: 'app-latest-product-slider',
  templateUrl: './latest-product-slider.component.html',
  styleUrls: ['./latest-product-slider.component.sass'],
  animations: [sliderState],
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
  private alfaHide;
  private alfaVisible;
  get posMainElement() {
    return this.sliderWrapper.getBoundingClientRect();
  }
  get positionFirstElement() {
    return this.productsList[0].getBoundingClientRect();
  }
  get positionLastElement() {
    return this.productsList[this.productsList.length - 1].getBoundingClientRect();
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
    this.productsList = this.sliderWrapper.getElementsByClassName('slider-wr-prod');
    this.firstElement = this.productsList[0].getBoundingClientRect();
    this.lastElement = this.productsList[this.productsList.length - 1].getBoundingClientRect();
  }
  setStyleWrapper() {
    this.moovDiv.style.transform = 'translate3d(0px, 0px, 0px)';
  }
  nextSlide() {
    this.findNearProductsNext();
    let position = +this.parseStyle().toFixed(2);
    requestAnimationFrame(() => {
      this.moovDiv.style.transform = 'translate3d(' + (position - +this.firstElement.width.toFixed(2)) + 'px,' + '0px,' + 100 + 'px' + ')';
    });
  }
  parseStyle(): number {
    return +(this.moovDiv.style.transform.match(/\((-?\d*\.?\d*).*\)/)[1]);
  }
  prevSlide() {
    this.findNearProductsPrev();
    let position = +this.parseStyle().toFixed(2);
    requestAnimationFrame(() => {
      this.moovDiv.style.transform = 'translate3d(' + (position + +this.firstElement.width.toFixed(2)) + 'px,' + '0px,' + 100 + 'px' + ')';
    });
  }
  findNearProductsNext() {
    let { left: leftM, width: widthM, right: rightM } = this.posMainElement;
    [].slice.call(this.productsList).forEach((elemen: HTMLElement, index) => {
      let { left, width, right } = elemen.getBoundingClientRect();
      if (Math.round(left - 20) === leftM) {
        this.products[index].state = 'hide';
      }
      if (Math.round(left + 20) === rightM) {
        this.products[index].state = 'active';
      }
    });
  }
  findNearProductsPrev() {
    let { left: leftM, width: widthM, right: rightM } = this.posMainElement;
    [].slice.call(this.productsList).forEach((elemen: HTMLElement, index) => {
      let { left, width, right } = elemen.getBoundingClientRect();
      if (Math.round(right - 20) === leftM) {
        this.products[index].state = 'active';
      }
      if (Math.round(right + 20) === rightM) {
        this.products[index].state = 'hide';
      }
    });
  }
  checkProductalfa(index: number) {
    if (String(index) !== '0') {
      this.alfaHide = index - 1;
    }
    this.alfaVisible = index;
  }
  setStateAnimate() {
    let { left: leftM, width: widthM, right: rightM } = this.posMainElement;
    console.log(leftM);
    [].slice.call(this.productsList).forEach(product => {
      let { left, width, right } = product.getBoundingClientRect();
      console.log(left)
      if ((leftM > (left + 20)) && ((left + 20) <= (leftM - width))) {
        console.log(product);
      }
    });
  }
}
