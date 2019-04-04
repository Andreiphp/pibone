import { state, style, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.sass'],
  animations: [
    trigger('clickDiv', [
      state('start', style({
        backgroundColor: 'blue',
        width: '150px',
        height: '150px'
      })),
      state('end', style({
        backgroundColor: 'red',
        width: '300px',
        height: '300px'
      }))
    ])
  ]
})
export class SliderComponent implements OnInit, AfterViewInit {
  images: HTMLAllCollection;
  DivWrapper: HTMLAllCollection;
  navBtn: NodeList;
  currentSlide: number;
  prevSlideImg: number;
  nextSlideImg: number;
  flagMoov: boolean;
  dragObject = {
    offsetX: 0
  };
  moobTo: number;
  moovX: number;
  shiftnext: number;
  shiftChildNext: number;
  shiftCurent: number;
  shiftPrev: number;
  shiftPrevCh: number;
  flagToBack: boolean;
  flagnewSlideMoov: boolean;
  InitPosition: number;
  private countSliders: number;

  @ViewChild('sliderSection') sliderSection: ElementRef;

  constructor(public el: ElementRef) {
    this.flagMoov = false;
    window.ondragstart = () => false;
    this.moovX = 0;
    window.onresize = () => {
      this.InitPosition = this.getPosotionsElements(this.sliderSection.nativeElement);
      this.initSliders();
    };
  }

  changeNumberSlideTo() {
    this.currentSlide >= this.images.length - 1 ? this.currentSlide = 0 : ++this.currentSlide;
    this.currentSlide === 0 ? this.prevSlideImg = this.images.length - 1 : this.prevSlideImg = this.currentSlide - 1;
    this.currentSlide === this.images.length - 1 ? this.nextSlideImg = 0 : this.nextSlideImg = this.currentSlide + 1;
  }
  changeNumberSlideBack() {
    this.currentSlide <= 0 ? this.currentSlide = this.images.length - 1 : --this.currentSlide;
    this.currentSlide === this.images.length - 1 ? this.nextSlideImg = 0 : this.nextSlideImg = this.currentSlide + 1;
    this.currentSlide === 0 ? this.prevSlideImg = this.images.length - 1 : this.prevSlideImg = this.currentSlide - 1;
  }
  nextSlide() {
    this.moovEndSetParamNext();
    setTimeout(() => {
      this.upsliders();
      this.changeNumberSlideTo();
      this.setCurentStyle(this.nextSlideImg, 1, 0, '0s', -this.InitPosition / 2, this.InitPosition );
    }, 1000);
  }

  prevSlide() {
    //  this.moovEndSetParamPrev();
    this.changeNumberSlideBack();
  }

  mouseDoun(event: MouseEvent): boolean {
    this.flagMoov = true;
    this.flagnewSlideMoov = true;
    if (event.which !== 1) {
      return false;
    }

    if (this.flagMoov) {
      this.shiftPrev = -this.InitPosition;
      this.shiftPrevCh = this.InitPosition / 2;
      this.shiftnext = this.InitPosition;
      this.shiftChildNext = -this.InitPosition / 2;
      this.shiftCurent = 0;
      this.dragObject.offsetX = event.pageX;
      document.onmousemove = this.movSlider.bind(this);
    }
    document.onmouseup = this.endSlide.bind(this);
  }

  movSlider(event: MouseEvent) {
    this.moovX = event.pageX - this.dragObject.offsetX;
    if (Math.abs(this.moovX) < 3) {
      return false;
    }
    if (this.moovX > this.moobTo) {
      this.flagToBack = false;
    } else {
      this.flagToBack = true;
    }
    const offPrev = -(Math.abs(this.shiftPrev) + (this.dragObject.offsetX - event.pageX));
    const offPrevCh = this.shiftPrevCh + ((this.dragObject.offsetX - event.pageX) / 2);
    const offsetCurrnt = ((this.dragObject.offsetX - event.pageX) / 2);
    const offsetX = this.shiftnext - (this.dragObject.offsetX - event.pageX);
    const offsetChild = this.shiftChildNext + ((this.dragObject.offsetX - event.pageX) / 2);
    this.dragSlideShangeParams(-offsetCurrnt, offsetX, offsetChild, offPrev, offPrevCh);
    this.moobTo = this.moovX;
    this.flagnewSlideMoov = false;
    return false;
  }
  endSlide(event): void {
    // if (this.flagToBack) {
    //     if (Math.abs(this.moovX) > this.InitPosition  / 2) {
    //         this.moovEndSetParam(-this.InitPosition, this.InitPosition / 2, 0,
    //            0, this.InitPosition, -this.InitPosition / 2, 0, '0s', 3, '1s');
    //         this.changeNumberSlideTo();
    //      } else {
    //         this.moovEndSetParam(0, 0, this.InitPosition, -this.InitPosition / 2,
    //            -this.InitPosition, this.InitPosition / 2, 0, '0s',  3, '1s');
    //     }
    // } else {
    //      if (Math.abs(this.moovX) > this.InitPosition / 2) {
    //         this.moovEndSetParam(
    //           this.InitPosition, -this.InitPosition / 2,
    //           -this.InitPosition, this.InitPosition / 2, 0, 0, 3, '1s', 0, '0');
    //            this.changeNumberSlideBack();
    //     } else {
    //         this.moovEndSetParam(0, 0, this.InitPosition, -this.InitPosition / 2,
    //            -this.InitPosition, this.InitPosition / 2, 3, '1s', 0, '0');
    //     }
    // }
    // this.flagMoov = false;
    // document.onmousemove = null;
    // document.onmouseup = null;
    // return false;
  }
  leaveMouse(): boolean {
    this.flagMoov = false;
    this.moobTo = 0;
    this.moovX = 0;
    document.onmousemove = null;
    document.onmouseup = null;
    return false;
  }

  dragSlideShangeParams(offsetCurrnt, offsetX, offsetChild, offPrev, offPrevCh) {
    (this.images[this.currentSlide] as any).style.transition = '0s';
    (this.images[this.currentSlide] as any).style.transform = 'translate3d(' + (0) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.DivWrapper[this.currentSlide] as any).style.zIndex = '1';
    (this.DivWrapper[this.currentSlide] as any).style.transition = '0s';
    (this.DivWrapper[this.currentSlide] as any).style.transform = 'translate3d(' + (offsetCurrnt) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.images[this.nextSlideImg] as any).style.transition = '0s';
    (this.images[this.nextSlideImg] as any).style.transform = 'translate3d(' + (offsetChild) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.DivWrapper[this.nextSlideImg] as any).style.transition = '0s';
    (this.DivWrapper[this.nextSlideImg] as any).style.zIndex = '3';
    (this.DivWrapper[this.nextSlideImg] as any).style.transform = 'translate3d(' + (offsetX) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.images[this.prevSlideImg] as any).style.transition = '0s';
    (this.images[this.prevSlideImg] as any).style.transform = 'translate3d(' + (offPrevCh) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.DivWrapper[this.prevSlideImg] as any).style.transition = '0s';
    (this.DivWrapper[this.prevSlideImg] as any).style.zIndex = '3';
    (this.DivWrapper[this.prevSlideImg] as any).style.transform = 'translate3d(' + (offPrev) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
  }
  moovEndSetParamNext(): void {
    this.setCurentStyle(this.currentSlide, 1, 1, '1s', this.InitPosition / 2, -this.InitPosition);
    this.setCurentStyle(this.nextSlideImg, 3, 1, '1s', 0, 0);
  }
  // moovEndSetParamPrev(): void {
  //     this.setCurentStyle(this.currentSlide, 1, -this.InitPosition / 2, this.InitPosition);
  //     this.setCurentStyle(this.nextSlideImg, 1, this.InitPosition / 2, -this.InitPosition);
  //     this.setCurentStyle(this.prevSlideImg, 3, 0, 0);
  //     this.images[0].addEventListener('transitionend', this.outAnimate);
  // }
  outAnimate() {
    console.log('out');
  }
  setCurentStyle(index, zIndex: number, opacity: number, tr: string, imgTranslate: number, divTranslate: number) {
    (this.images[index] as any).style.transition = tr;
    (this.images[index] as any).style.zIndex = zIndex;
    (this.images[index] as any).style.opacity = opacity;
    (this.images[index] as any).style.transform = 'translate3d(' + (imgTranslate) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.DivWrapper[index] as any).style.transition = tr;
    (this.DivWrapper[index] as any).style.transform = 'translate3d(' + (divTranslate) + 'px,' + 0 + 'px,' + 0 + 'px' + ')';
    (this.DivWrapper[index] as any).style.zIndex = zIndex;
  }
  resetStyle(index, zIndex, opacity, tr) {
    (this.images[index] as any).style.transition = tr;
    (this.images[index] as any).style.zIndex = zIndex;
    (this.images[index] as any).style.opacity = opacity;
    (this.DivWrapper[index] as any).style.transition = tr;
    (this.DivWrapper[index] as any).style.zIndex = zIndex;
  }

  getPosotionsElements(element: Element): number {
    return element.getBoundingClientRect().width - 10;
  }

  ngAfterViewInit(): void {
    this.currentSlide = 1;
    this.nextSlideImg = 2;
    this.prevSlideImg = 0;
    this.images = this.sliderSection.nativeElement.querySelectorAll('.slider_link');
    this.DivWrapper = this.sliderSection.nativeElement.querySelectorAll('.slider-div');
    this.navBtn = this.sliderSection.nativeElement.querySelectorAll('.nav-slide');
    this.InitPosition = this.getPosotionsElements(this.sliderSection.nativeElement);
    this.initSliders();
  }


  ngOnInit() {

  }
  upsliders() {
    for (let i = 0; i <= this.countSliders; i += 1) {
      if (i !== this.currentSlide) {
        this.resetStyle(i, 1, 1, '0s');
      } else {
          this.resetStyle(i, 3, 1, '1s');
      }
    }
  }
  initSliders() {
    this.countSliders = this.DivWrapper.length - 1;
    if (this.countSliders > 2) {
      for (let i = 0; i <= this.countSliders; i += 1) {
        if (i === 1) {
          this.setCurentStyle(i, 3, 1, '0s', 0, 0);
        } else if (i === 2) {
          this.setCurentStyle(i, 1, 1, '0s', -this.InitPosition / 2, this.InitPosition);
        } else if (i === 1) {
          this.setCurentStyle(i, 1, 1, '0s', this.InitPosition / 2, -this.InitPosition);
        } else {
          this.setCurentStyle(i, 0, 0, '0s', this.InitPosition / 2, -this.InitPosition);
        }
      }
    }
  }

  // initImage(): void {
  //     this.setCurentStyle(this.currentSlide, 3, 0, 0);
  //     this.setCurentStyle(this.nextSlideImg, 1, -this.InitPosition / 2, this.InitPosition);
  //     this.setCurentStyle(this.prevSlideImg, 1, this.InitPosition / 2, -this.InitPosition);
  // }
}
