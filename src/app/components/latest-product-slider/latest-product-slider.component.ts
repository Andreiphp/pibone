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
  private offsetX: number;
  private moovX: number;
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
    window.onresize =  () => {
      this.init();
      this.moovDiv.style.transform = 'translate3d(' + 0 + 'px,' + '0px,' + 100 + 'px' + ')';
    };
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
    if (!this.BackFromNext()) {
      this.findNearProductsNext();
      let position = +this.parseStyle().toFixed(2);
      this.moovDiv.style.transform = 'translate3d(' + (position - +this.firstElement.width.toFixed(2)) + 'px,' + '0px,' + 100 + 'px' + ')';
    }
  }
  BackFromNext(): boolean {
    if (this.lastElementPosition.right < this.posMainElement.right) {
      const pnewPosition = +this.firstElementPosition.width * (this.productsList.length - 5);
      this.moovDiv.style.transform = 'translate3d(' + -pnewPosition + 'px,' + '0px,' + 100 + 'px' + ')';
      return true;
    } else {
      return false;
    }
  }

  stopWrNext() {

  }
  parseStyle(): number {
    return +(this.moovDiv.style.transform.match(/\((-?\d*\.?\d*).*\)/)[1]);
  }
  prevSlide() {
    if (!this.BackFromPrev()) {
      this.findNearProductsPrev();
      let position = +this.parseStyle().toFixed(2);
      this.moovDiv.style.transform = 'translate3d(' + (position + +this.firstElement.width.toFixed(2)) + 'px,' + '0px,' + 100 + 'px' + ')';
    }
  }
  BackFromPrev(): boolean {
    if (this.firstElementPosition.left > this.posMainElement.left) {
      this.moovDiv.style.transform = 'translate3d(' + 0 + 'px,' + '0px,' + 100 + 'px' + ')';
      return true;
    }
    return false;
  }
  findNearProductsNext() {
    [].slice.call(this.productsList).forEach((element: HTMLElement, index) => {
      this.goSlide(true, index, element);
    });
  }

  findNearProductsPrev(): void {
    [].slice.call(this.productsList).forEach((element: HTMLElement, index) => {
      this.goSlide(false, index, element);
    });
  }
  goSlide(bool: boolean, index: number, element: HTMLElement): void {
    if (this.findConditionMoov(bool, this.posMainElement.left, this.posMainElement.right, element)) {
      this.products[index].state = 'active';
      // (function (i, context) {
      //   setTimeout(() => {
      //     context.products[i].state = 'all';
      //   }, 800);
      // })(index, this);
    }
  }
  findConditionMoov(flagGoOrBack: boolean, leftM, rightM, element: HTMLElement): boolean {
    let { left, width, right } = element.getBoundingClientRect();
    if (flagGoOrBack) {
      return ((Math.round(right - 20) <= (rightM + width)) && (Math.round(left - 20) >= (rightM - width)));
    } else {
      return ((Math.round(left + 20) >= (leftM - width)) && (Math.round(right + 20) <= (leftM + width)));
    }
  }

  mouseDoun(event: MouseEvent) {
    let position = +this.parseStyle().toFixed(2);
    this.moovDiv.style.transitionDuration = '0s';
    this.offsetX = event.pageX;
    if (event.which !== 1) {
      return false;
    }
    document.onmousemove = (even) => {
      this.moovX = this.offsetX - even.pageX;
      if (Math.abs(this.moovX) < 3) {
        return false;
      }
      if (Math.abs(this.moovX) > 10) {
          if (this.moovX > 0) {
            this.findNearProductsNext();
          } else {
            this.findNearProductsPrev();
          }
      }
      if (this.getOffsetPosition(event)) {
        this.moovDiv.style.transform = 'translate3d(' + (position + -(this.moovX + 2.8)) + 'px,' + '0px,' + 100 + 'px' + ')';
      } else {
        this.moovDiv.style.transform = 'translate3d(' + (position + -this.moovX) + 'px,' + '0px,' + 100 + 'px' + ')';
      }
      document.onmouseup = (e) => {
        this.endSlide(e);
      };
      document['onmouseleave'] = (e) => {
        this.leaveMouse(e);
      };
    };
  }
  getOffsetPosition(event): boolean {
    if (this.firstElementPosition.left > this.posMainElement.left || this.lastElementPosition.right + 5 < this.posMainElement.right) {
      return true;
    } else {
      return false;
    }
  }
  leaveMouse($event) {
    console.log('leave');
    this.moovDiv.style.transitionDuration = '0.9s';
    this.endSlide($event);
  }
  endSlide($event) {
    this.moovDiv.style.transitionDuration = '0.9s';
    let positions = +this.parseStyle().toFixed(2);
    if (this.checkfirstAndLastElements()) {
      [].slice.call(this.productsList).forEach((element: HTMLElement, index) => {
        this.products[index].state = 'all';
        let { left, width, right } = element.getBoundingClientRect();
        if (left < this.posMainElement.left && right < (this.posMainElement.left + width)) {
          const findPosition = this.posMainElement.left - (left - 20);
          this.moovDiv.style.transform = 'translate3d(' + (positions + findPosition) + 'px,' + '0px,' + 100 + 'px' + ')';
        }
      });
    }
    document.onmousemove = null;
    document.onmouseup = null;
    document['onmouseleave'] = null;
  }
  checkfirstAndLastElements() {
    if (!this.BackFromNext() && !this.BackFromPrev()) {
      return true;
    }
    return false;
  }
}
