import { Component } from '@angular/core';
import {MainServices} from '../../services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
  constructor(private _mainSrv: MainServices) {
    window.onresize = () => {
        this._mainSrv.subOnResize.next();
    };
    window.onload = () => {
      this._mainSrv.subOnload.next();
    };
  }
}
