import { trigger, state, style, animate, transition } from '@angular/animations';
export const sliderState = trigger('productNew', [
  state('hide', style ({
    opacity: 0,
    color: 'black',
    transform: 'scale3d(0.3, 0.3, 0.3)'
  })),
  state('active', style ({
    opacity: 1,
    color: 'red',
    transform: 'scale3d(1, 1, 1)'
  })),
  transition('hide => active', [
    animate('400ms')
  ]),
  transition('active => hide', [
    animate('400ms')
  ]),
]);


