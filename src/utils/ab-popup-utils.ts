import { ABPopupOptions } from "@/interfaces";
import { DefaultABPopupOptions } from '@/defaults/ab-popup-defaults';
import { PopupInput } from '@/types';
import wazeIcon from '@/assets/logos/logo-waze.svg';


export function generateWazeLink(lat: number, lng: number): string {
    const url = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
    return `
        <a href="${url}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            style="display: inline-flex; align-items: center; gap: 0.25rem; border-radius: 0.25rem; background-color: rgb(249 115 22); padding: 0.5rem 1rem; font-size: 0.875rem; line-height: 1.25rem; color: rgb(243 244 246); text-decoration-line: none;">
           <span style="margin-right: 0.5rem;">Enviar a Waze</span>
           <img src="${wazeIcon}" alt="Waze" style="width:25px; height:25px;" />
        </a>
    `.trim();
}

export function getPopupHtml(input: PopupInput): string {
    if ('content' in input) {
        return input.content;
    }

    const { text, link, class: className = '' } = input;

    const content = link
        ? `<a href="${link}" target="_blank">${text}</a>`
        : `<span>${text}</span>`;

    return `<div class="${className}">${content}</div>`;
}

export function getPopupOptions(input: Partial<ABPopupOptions> = {}): ABPopupOptions {
    const allowedKeys: (keyof ABPopupOptions)[] = [
        'maxWidth',
        'minWidth',
        'autoClose',
        'closeOnClick',
        'closeButton',
        'offset',
        'className',
        'openOnInit'
    ];

    const sanitizedInput: Partial<ABPopupOptions> = {};

    for (const key of allowedKeys) {
        if (key in input) {
            sanitizedInput[key] = input[key];
        }
    }

    return {
        ...DefaultABPopupOptions,
        ...sanitizedInput
    };
}