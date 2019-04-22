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
  get firstElementPosition() {
    return this.productsList[0].getBoundingClientRect();
  }
  get lastElementPosition() {
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
    this.productsList = this.sliderWrapper.getElementsByTagName('app-pre-view-product');
    this.firstElement = this.productsList[0].getBoundingClientRect();
    this.lastElement = this.productsList[this.productsList.length - 1].getBoundingClientRect();
  }
  setStyleWrapper() {
    this.moovDiv.style.transform = 'translate3d(0px, 0px, 100px)';
    this.moovDiv.style.transitionDuration = '0.9s';
  }
  nextSlide() {
    if (this.lastElementPosition.right < this.posMainElement.right) {
      const pnewPosition = +this.firstElementPosition.width * (this.productsList.length - 5);
      this.moovDiv.style.transform = 'translate3d(' + -pnewPosition + 'px,' + '0px,' + 100 + 'px' + ')';
      return;
    }
    this.findNearProductsNext();
    let position = +this.parseStyle().toFixed(2);
    this.moovDiv.style.transform = 'translate3d(' + (position - +this.firstElement.width.toFixed(2)) + 'px,' + '0px,' + 100 + 'px' + ')';
  }

  stopWrNext() {

  }
  parseStyle(): number {
    return +(this.moovDiv.style.transform.match(/\((-?\d*\.?\d*).*\)/)[1]);
  }
  prevSlide() {
    if (this.firstElementPosition.left > this.posMainElement.left) {
      this.moovDiv.style.transform = 'translate3d(' + 0 + 'px,' + '0px,' + 100 + 'px' + ')';
      return;
    }
    this.findNearProductsPrev();
    let position = +this.parseStyle().toFixed(2);
    this.moovDiv.style.transform = 'translate3d(' + (position + +this.firstElement.width.toFixed(2)) + 'px,' + '0px,' + 100 + 'px' + ')';
  }
  findNearProductsNext() {
    let { left: leftM, width: widthM, right: rightM } = this.posMainElement;
    [].slice.call(this.productsList).forEach((elemen: HTMLElement, index) => {
      let { left, width, right } = elemen.getBoundingClientRect();
      if ((Math.round(right - 20) <= (rightM + width)) && (Math.round(left - 20) >= (rightM - width))) {
        this.products[index].state = 'active';
        (function (i, context) {
          setTimeout(() => {
            console.log(i);
            context.products[i].state = 'all';
          }, 800);
        })(index, this);
      }
    });
  }
  findNearProductsPrev() {
    let { left: leftM, width: widthM, right: rightM } = this.posMainElement;
    [].slice.call(this.productsList).forEach((elemen: HTMLElement, index) => {
      let { left, width, right } = elemen.getBoundingClientRect();

    });
  }
}
