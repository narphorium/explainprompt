import React from 'react';
type PaginationProps = {
    className?: string;
    page: number;
    numPages: number;
    showEnds?: boolean;
    setPage: (page: number) => void;
};
export declare const PaginationComponent: ({ className, page, numPages, showEnds, setPage }: PaginationProps) => React.JSX.Element;
export declare const Pagination: import("styled-components").IStyledComponent<"web", {
    className?: string | undefined;
    page: number;
    numPages: number;
    showEnds?: boolean | undefined;
    setPage: (page: number) => void;
}>;
export {};
