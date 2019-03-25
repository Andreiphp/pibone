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
   this.request.subject.subscribe({
     next: (res)=>{
       console.log(res);
     }
   });
  
   }

 

  ngOnInit() {
    let g = document.getElementById('btn') as HTMLElement;
    console.log(g);
  let h =  fromEvent(g, 'click');

  let gg = h.pipe(map(()=>{
    var randomOffset = Math.floor(Math.random()*100);
    console.log(randomOffset);
    return this.request.gitHun(randomOffset);
  }))
  gg.subscribe(res=>{
    res.subscribe(res=>{
      console.log(res);
    })
  })

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe.unsubscribe();
    
  }

}