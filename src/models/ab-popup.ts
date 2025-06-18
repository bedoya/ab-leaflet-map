import type { ABPopupOptions } from '@/interfaces';
import { DefaultABPopupOptions } from '@/defaults/ab-popup-defaults';

export default class ABPopup {
    public readonly content: string;
    public readonly options: Required<ABPopupOptions>;

    constructor(content: string, userOptions: ABPopupOptions = {}) {
        this.content = content;
        this.options = {
            ...DefaultABPopupOptions,
            ...userOptions,
        };
    }

    public getOptions(): ABPopupOptions {
        return this.options;
    }

    public getContent(): string {
        return this.content;
    }
}