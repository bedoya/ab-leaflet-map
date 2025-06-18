export type ABCoord = [number, number];

export type TextLinkInput = {
    text: string;
    link?: string;
    class?: string;
};

export type ContentInput = {
    content: string;
};

export type PopupInput = TextLinkInput | ContentInput;