import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {initPositions} from '../../interfaces/sliderSetting.interfaces';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.sass']
})
export class SliderComponent implements OnInit , AfterViewInit {
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
   InitPosition: number

@ViewChild('sliderSection') sliderSection: ElementRef;

    constructor(public el: ElementRef) {
        this.flagMoov = false;
        window.ondragstart = ()=> false;
        this.moovX = 0;
        window.onresize = ()=>{
            this.InitPosition = this.getPosotionsElements(this.sliderSection.nativeElement);
            this.initImage();
        }
    }

    initImage(): void{
      this.moovEndSetParam(0, 0, this.InitPosition, -this.InitPosition/2, -this.InitPosition, this.InitPosition/2,1,'1',1,'1');
     
    }
    changeNumberSlideTo(){
        this.currentSlide >= this.images.length - 1 ? this.currentSlide = 0 : ++this.currentSlide;
        this.currentSlide === 0 ? this.prevSlideImg = this.images.length - 1 : this.prevSlideImg = this.currentSlide - 1;
        this.currentSlide === this.images.length -1 ? this.nextSlideImg = 0 : this.nextSlideImg = this.currentSlide + 1;
    }
    changeNumberSlideBack(){
        this.currentSlide <= 0 ? this.currentSlide = this.images.length - 1 : --this.currentSlide;
        this.currentSlide === this.images.length - 1 ? this.nextSlideImg = 0 : this.nextSlideImg = this.currentSlide + 1;
        this.currentSlide === 0 ? this.prevSlideImg = this.images.length -1 : this.prevSlideImg = this.currentSlide - 1;
    }
    nextSlide(){
     
      this.moovEndSetParam(-this.InitPosition, this.InitPosition/2, 0, 0, this.InitPosition, -this.InitPosition/2, 0, '0s', 3,'1s');
      this.changeNumberSlideTo();
    }

    prevSlide(){
     
     this.moovEndSetParam(this.InitPosition, -this.InitPosition/2, -this.InitPosition, this.InitPosition/2, 0, 0, 3, '1s', 0, '0');
     this.changeNumberSlideBack();
    }

    mouseDoun(event: MouseEvent): boolean{
        this.flagMoov = true;
        this.flagnewSlideMoov = true;
        if(event.which !== 1){
            return false;
        }

        if(this.flagMoov){
            this.shiftPrev = -this.InitPosition;
            this.shiftPrevCh = this.InitPosition/2;
            this.shiftnext = this.InitPosition;
            this.shiftChildNext = -this.InitPosition/2;
            this.shiftCurent = 0;
            this.dragObject.offsetX = event.pageX;
            document.onmousemove = this.movSlider.bind(this);
        }
        document.onmouseup = this.endSlide.bind(this);
    }

    movSlider(event: MouseEvent){
            this.moovX = event.pageX - this.dragObject.offsetX;
            if(Math.abs(this.moovX) < 3){
                return false;
            }
            if(this.moovX > this.moobTo){
                this.flagToBack = false;
               
            }else{
                this.flagToBack = true;
            }
         
            let offPrev = -(Math.abs(this.shiftPrev) + (this.dragObject.offsetX - event.pageX));
            let offPrevCh = this.shiftPrevCh + ((this.dragObject.offsetX - event.pageX) /2);
            let offsetCurrnt =  ((this.dragObject.offsetX - event.pageX) /2) ;
            let offsetX = this.shiftnext - (this.dragObject.offsetX - event.pageX);
            let offsetChild = this.shiftChildNext + ((this.dragObject.offsetX - event.pageX) /2);
            this.dragSlideShangeParams(-offsetCurrnt, offsetX, offsetChild, offPrev, offPrevCh);
            this.moobTo = this.moovX;
            this.flagnewSlideMoov = false;
        
        return false;
    }
    endSlide(event): boolean{
        if(this.flagToBack){
            if(Math.abs(this.moovX) > this.InitPosition/2){
                this.moovEndSetParam(-this.InitPosition, this.InitPosition/2, 0, 0, this.InitPosition, -this.InitPosition/2, 0, '0s', 3,'1s');
                this.changeNumberSlideTo();
            }else{
                this.moovEndSetParam(0, 0, this.InitPosition, -this.InitPosition/2, -this.InitPosition, this.InitPosition/2, 0, '0s',  3,'1s');
            }
        }else{
             if(Math.abs(this.moovX) > this.InitPosition/2){
                this.moovEndSetParam(this.InitPosition, -this.InitPosition/2, -this.InitPosition, this.InitPosition/2, 0, 0, 3, '1s', 0, '0');
                this.changeNumberSlideBack();
              
            }else{
                this.moovEndSetParam(0, 0, this.InitPosition, -this.InitPosition/2, -this.InitPosition, this.InitPosition/2, 3,'1s',0,'0');
            }
        }

        
        this.flagMoov = false;
        document.onmousemove = null;
        document.onmouseup = null;
        return false;
    }
    leaveMouse(): boolean{
        this.flagMoov = false;
        this.moobTo = 0;
        this.moovX = 0;
        document.onmousemove = null;
        document.onmouseup = null;
        return false;
    }

    dragSlideShangeParams(offsetCurrnt, offsetX, offsetChild, offPrev, offPrevCh){
        (this.images[this.currentSlide] as any).style.transition = "0s";
        (this.images[this.currentSlide] as any).style.transform = "translate3d(" + (0) + 'px,' + 0 + 'px,' + 0 + 'px' + ")";
        (this.DivWrapper[this.currentSlide] as any).style.zIndex = "1";
        (this.DivWrapper[this.currentSlide] as any).style.transition = "0s";
        (this.DivWrapper[this.currentSlide] as any).style.transform = "translate3d(" + (offsetCurrnt) + 'px,' + 0 + 'px,' + 0 + 'px' + ")";
        (this.images[this.nextSlideImg] as any).style.transition = "0s";
        (this.images[this.nextSlideImg] as any).style.transform = "translate3d(" + (offsetChild) + 'px,' + 0 + 'px,' + 0 + 'px' + ")";
        (this.DivWrapper[this.nextSlideImg] as any).style.transition = "0s";
        (this.DivWrapper[this.nextSlideImg] as any).style.zIndex = "3";
        (this.DivWrapper[this.nextSlideImg] as any).style.transform = "translate3d(" + (offsetX) + 'px,' + 0 + 'px,' + 0 + 'px' + ")";
        (this.images[this.prevSlideImg] as any).style.transition = "0s";
        (this.images[this.prevSlideImg] as any).style.transform = "translate3d(" + (offPrevCh) + 'px,' + 0 + 'px,' + 0 + 'px' + ")";
        (this.DivWrapper[this.prevSlideImg] as any).style.transition = "0s";
        (this.DivWrapper[this.prevSlideImg] as any).style.zIndex = "3";
        (this.DivWrapper[this.prevSlideImg] as any).style.transform = "translate3d(" + (offPrev) + 'px,' + 0 + 'px,' + 0 + 'px' + ")";
    }
    moovEndSetParam(current:number, curch: number, next: number, nextch: number, prev:number, prevch: number, zIndexP:number, transitionP: string,zIndexN:number, transitionN: string){
        (this.images[this.currentSlide] as any).style.transition = "1s";
        (this.images[this.currentSlide] as any).style.zIndex = 1;
        (this.images[this.currentSlide] as any).style.transform = "translate3d(" + (curch) + 'px,' + 0 + 'px,' + 0 + 'px' + ")";
        (this.DivWrapper[this.currentSlide] as any).style.transition = "1s";
        (this.DivWrapper[this.currentSlide] as any).style.transform = "translate3d(" + (current) + 'px,' + 0 + 'px,' + 0 + 'px' + ")";
        (this.DivWrapper[this.currentSlide] as any).style.zIndex = 2;
        (this.images[this.nextSlideImg] as any).style.transition = transitionN;
        (this.images[this.nextSlideImg] as any).style.transform = "translate3d(" + (nextch) + 'px,' + 0 + 'px,' + 0 + 'px' + ")";
        (this.DivWrapper[this.nextSlideImg] as any).style.transition = transitionN;
        (this.DivWrapper[this.nextSlideImg] as any).style.zIndex = zIndexN;
        (this.DivWrapper[this.nextSlideImg] as any).style.transform = "translate3d(" + (next) + 'px,' + 0 + 'px,' + 0 + 'px' + ")";
        (this.images[this.prevSlideImg] as any).style.transition = transitionP;
        (this.images[this.prevSlideImg] as any).style.zIndex = zIndexP;
        (this.images[this.prevSlideImg] as any).style.transform = "translate3d(" + (prevch) + 'px,' + 0 + 'px,' + 0 + 'px' + ")";
        (this.DivWrapper[this.prevSlideImg] as any).style.transition = transitionP;
        (this.DivWrapper[this.prevSlideImg] as any).style.zIndex = zIndexP;
        (this.DivWrapper[this.prevSlideImg] as any).style.transform = "translate3d(" + (prev) + 'px,' + 0 + 'px,' + 0 + 'px' + ")";
    }
    getPosotionsElements(element: Element) : number{
        return element.getBoundingClientRect().width - 10;
    }

    ngAfterViewInit(): void{
        this.currentSlide = 1;
        this.prevSlideImg = 0;
        this.nextSlideImg = 2;
        this.images = this.sliderSection.nativeElement.querySelectorAll('.slider_link');
        this.DivWrapper = this.sliderSection.nativeElement.querySelectorAll('.slider-div');
      
        this.navBtn = this.sliderSection.nativeElement.querySelectorAll('.nav-slide');
        this.InitPosition = this.getPosotionsElements(this.sliderSection.nativeElement);
        this.initImage();

}


    ngOnInit() {
    }
}