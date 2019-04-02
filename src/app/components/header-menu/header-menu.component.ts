import {Component, OnInit} from '@angular/core';
import {MenuServices} from '../../services/menu.service';
import {openBascket} from './animate';

@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.sass'],
    animations: [openBascket]
})
export class HeaderMenuComponent implements OnInit {
    flagOpenSinCart: boolean;
    flegSubCat: boolean;
    flagMainMenu: boolean;

    constructor(public hero: MenuServices) {
        this.flagOpenSinCart = false;
        this.flegSubCat = false;
        this.flagMainMenu = false;
        if (window.innerWidth >= 990) {
            this.flagMainMenu = false;
        }   else {
            this.flagMainMenu = true;
        }
        window.onresize = function(event) {
                this.flegSubCat = false;
                if (window.innerWidth < 990) {
                    this.flagMainMenu = true;
                }
                this.resize(event);
        }.bind(this);
    }
    openSinCart() {
        this.flagOpenSinCart = !this.flagOpenSinCart;
    }

    openMobileMenu(event) {
        if (event.target.id === 'm') {
            if (window.innerWidth <= 990) {
                this.flegSubCat = !this.flegSubCat;
    }
        }
}
    showMainMenu() {
        this.flagMainMenu  = !this.flagMainMenu;
        if (this.flagMainMenu) {
          this.flegSubCat = false;
        }
    }

    hideAllMenu() {
        this.flagMainMenu = true;
        this.flegSubCat = false;
    }
   private resize(event) {
        if (event.target.innerWidth >= 990) {
            this.flagMainMenu = false;
            this.flegSubCat = false;
        }   else {
            this.flagMainMenu = true;
        }
    }

    ngOnInit() {
    }

}
