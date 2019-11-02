import { trigger, transition, animate, style, state } from '@angular/animations';

const animatePreset1 = '200ms ease-out';
const animatePreset2 = '300ms ease-out';

export const inputAnimation = trigger(
    'expandCollapseAnimation', [
    state('expand', style({ width: '250px' })),
    state('collapse', style({ width: '165px' })),
    transition('expand => collapse', [
        animate(animatePreset2)
    ]),
    transition('collapse => expand', [
        animate(animatePreset1)
    ])
]
);

export const bookmarkAnimation = trigger(
    'addDeleteAnimation', [
    state('add', style({ transform: 'rotate(0deg)', left: '-2px' })),
    state('delete', style({ transform: 'rotate(45deg)', left: '2px' })),
    transition('*<=>*', [
        animate(animatePreset1)
    ])
]
);

export const btnCollapseAnimation = trigger(
    'expandCollapseAnimation', [
    state('expand', style({ transform: 'rotate(180deg)' })),
    state('collapse', style({ transform: 'rotate(0deg)' })),
    transition('*<=>*', [
        animate(animatePreset1)
    ])
]
);

export const notifyAnimation = trigger(
    'showHideAnimation', [
    transition(':enter', [
        style({ bottom: '-100px' }),
        animate(animatePreset1, style({ bottom: 0 }))
    ]),
    transition(':leave', [
        animate(animatePreset2, style({ bottom: '-100px' }))
    ])
]
);

export const notificationCenterAnimation = trigger(
    'openCloseAnimation', [
    transition(':enter', [
        style({ left: '-360px' }),
        animate(animatePreset1, style({ left: 0 }))
    ]),
    transition(':leave', [
        animate(animatePreset2, style({ left: '-360px' }))
    ])
]
);
