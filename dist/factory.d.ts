import { VoidComponent, fragment } from './component';
import type { ComponentInstance, HtmlTags, HtmlVoidtags } from './types';
import { input, textarea } from './components/input';
import { option } from './components/select';
export declare const htmlNormalTags: HtmlTags[];
export declare const htmlVoidTags: HtmlVoidtags[];
export declare const El: Record<HtmlTags, ComponentInstance> & Record<HtmlVoidtags, () => VoidComponent> & {
    fragment: typeof fragment;
    input: typeof input;
    textarea: typeof textarea;
    option: typeof option;
};
