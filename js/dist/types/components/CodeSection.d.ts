import { ViewUpdate } from '@codemirror/view';
import { Code } from 'ai-construction-set';
import React, { MouseEvent } from 'react';
export declare const CodeSection: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    code: Code;
    extensions?: any[] | undefined;
    selected?: boolean | React.Dispatch<React.SetStateAction<boolean>> | undefined;
    onSelected?: ((selected: boolean) => void) | undefined;
    onClick?: ((e: MouseEvent<HTMLDivElement>) => void) | undefined;
    onChange?: ((value: string, viewUpdate: ViewUpdate) => void) | undefined;
    editable: boolean;
    key: string;
    ref?: React.Ref<HTMLDivElement> | undefined;
}>;
