import type { ABPopupOptions } from '@/interfaces';

export const DefaultABPopupOptions: Required<ABPopupOptions> = {
    maxWidth: 300,
    minWidth: 100,
    autoClose: true,
    closeOnClick: true,
    closeButton: true,
    offset: [0, 0],
    className: '',
    openOnInit: false,
};