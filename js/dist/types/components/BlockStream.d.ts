import { Stream } from 'ai-construction-set';
import React from 'react';
interface BlockStreamProps {
    className?: string | string[];
    stream: Stream;
    page: number;
    setPage: (page: number) => void;
    key: string;
}
export declare const BlockStreamComponent: React.ForwardRefExoticComponent<BlockStreamProps & React.RefAttributes<HTMLDivElement>>;
export declare const BlockStream: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    stream: Stream;
    page: number;
    setPage: (page: number) => void;
    key: string;
    ref?: React.Ref<HTMLDivElement> | undefined;
}>;
export {};
