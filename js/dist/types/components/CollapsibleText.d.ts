import React, { Dispatch, SetStateAction } from "react";
type CollapsibleTextProps = {
    text: string[];
    limit: number;
    collapsed?: boolean | Dispatch<SetStateAction<boolean>>;
    className?: string;
    toggleCollapsed: () => void;
};
export declare const CollapsibleText: ({ text: items, limit, collapsed, className, toggleCollapsed }: CollapsibleTextProps) => React.JSX.Element;
export {};
