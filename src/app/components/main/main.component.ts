import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  user: any;
  constructor(public request: RequestsService) { }

  getDataTest(){
    //this.request.get_one_user();

   //this.request.concatObserv();

   //this.request.gitHun().subscribe(res=>{})
  }

  getDataTest2(){
    console.log('click2');
  }
  ngOnInit() {
  }

}
