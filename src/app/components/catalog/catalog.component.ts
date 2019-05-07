import { Component, OnInit } from '@angular/core';
import {divTrigger} from './catalog-animations';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass'],
  animations: [
    divTrigger
  ]
})
export class CatalogComponent implements OnInit {
  public isVisible = false;
  public products = [
    {
      id: '1',
      title: 'werty',
      price: 'image',
      image: 'product-10.jpg',
      state: 'all'
  },
    {
      id: '1',
      title: 'werty',
      price: 'image',
      image: 'product-10.jpg',
      state: 'all'
  },
    {
      id: '1',
      title: 'werty',
      price: 'image',
      image: 'product-10.jpg',
      state: 'all'
  },
    {
      id: '1',
      title: 'werty',
      price: 'image',
      image: 'product-11.jpg',
      state: 'all'
  },
    {
      id: '1',
      title: 'werty',
      price: 'image',
      image: 'product-11.jpg',
      state: 'all'
  },
    {
      id: '1',
      title: 'werty',
      price: 'image',
      image: 'product-11.jpg',
      state: 'all'
  },
    {
      id: '1',
      title: 'werty',
      price: 'image',
      image: 'product-11.jpg',
      state: 'all'
  },
    {
      id: '1',
      title: 'werty',
      price: 'image',
      image: 'product-11.jpg',
      state: 'all'
  },
  ]
  constructor() { }

  ngOnInit() {
  }

}
