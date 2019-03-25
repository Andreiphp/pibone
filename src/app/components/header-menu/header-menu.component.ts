import {Component, OnInit} from '@angular/core';
import {MenuServices} from '../../services/menu.service';

@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.sass']
})
export class HeaderMenuComponent implements OnInit {
    flagOpenSinCart: boolean;
    flegSubCat: boolean;
    flagMainMenu: boolean;
    disalaySubCat: string;
    displayMainMenu: string;
    subCatHeigth: number;
    minHeigth: any;
    ht: any;

    constructor(public hero: MenuServices) {
        this.flagOpenSinCart = false;
        this.disalaySubCat = 'none';
        this.displayMainMenu = 'none'
        this.flegSubCat = false;
        this.subCatHeigth = 0;
        this.flagMainMenu = true;
        this.minHeigth = 0;
        if(window.innerWidth >= 990){
            this.flagMainMenu = true;
        }
        window.onresize = function(event){
            
                this.flegSubCat = false;
                if(window.innerWidth < 990){
                    this.flagMainMenu = true;
                }
                this.resize(event);

            
        }.bind(this);
     
      
    }
  
    openSinCart() {
        this.flagOpenSinCart = !this.flagOpenSinCart;
    }

    openMobileMenu(event){

        if(event.target.id === 'm'){
            if(window.innerWidth <= 990){
                this.flegSubCat = !this.flegSubCat;
               
    }
        }
    
}
    showMainMenu(){
        this.flagMainMenu  = !this.flagMainMenu;
    }

    hideAllMenu(){
        this.flagMainMenu = true;
        this.flegSubCat = false;
    }
   private resize(event){
    if(event.target.innerWidth >= 990){
        this.displayMainMenu = 'flex';
    }else{
        this.flagMainMenu = true;
    }
    }

    ngOnInit() {
        if(window.innerWidth >= 990){
            this.displayMainMenu = 'flex';
        }else{
            this.displayMainMenu = 'none';
        }

    }

}
