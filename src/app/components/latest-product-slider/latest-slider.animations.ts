import { trigger, state, style, animate, transition } from '@angular/animations';
export const sliderState = trigger('productNew', [
  state('hide', style ({
    opacity: 0,
    color: 'black',
    transform: 'translateY(-30px)'
  })),
  state('active', style ({
    opacity: 1,
    color: 'red',
    transform: 'translateY(0px)'
  })),
  transition('hide => active', [
    animate('400ms')
  ]),
  transition('active => hide', [
    animate('400ms')
  ]),
  transition('* => active', [
    animate('400ms')
  ]),
]);


