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
        state('show', style({ bottom: 0 })),
        state('hide', style({ bottom: '-100px' })),
        transition('hide => show', [
            animate(animatePreset1)
        ]),
        transition('show => hide', [
            animate(animatePreset2)
        ])
    ]
);

export const notificationCenterAnimation = trigger(
    'openCloseAnimation', [
        state('open', style({ left: 0 })),
        state('close', style({ left: '-360px' })),
        transition('close => open', [
            animate(animatePreset1)
        ]),
        transition('open => close', [
            animate(animatePreset2)
        ])
    ]
);