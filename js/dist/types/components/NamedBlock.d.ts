import theme from 'styled-theming';
export declare const promptTextColor: (props: any) => string;
export declare const promptBgColor: (props: any) => string;
export declare const promptBorderColor: (props: any) => string;
export declare const promptFont = "\"Roboto Mono\", monospace";
export declare const PromptNamedContentBlock: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    content: import("ai-construction-set").NamedContent;
    collapsed: boolean | import("react").Dispatch<import("react").SetStateAction<boolean>>;
    selected?: boolean | import("react").Dispatch<import("react").SetStateAction<boolean>> | undefined;
    onToggle?: ((collapsed: boolean) => void) | undefined;
    onSelected?: ((selected: boolean) => void) | undefined;
    onTransitionEnd?: (() => void) | undefined;
    key: any;
    ref?: import("react").Ref<HTMLDivElement> | undefined;
}>;
export declare const promptListItemBorderColor: theme.ThemeSet;
export declare const PromptBlockListItem: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    content: import("ai-construction-set").NamedContent;
    collapsed: boolean | import("react").Dispatch<import("react").SetStateAction<boolean>>;
    selected?: boolean | import("react").Dispatch<import("react").SetStateAction<boolean>> | undefined;
    onToggle?: ((collapsed: boolean) => void) | undefined;
    onSelected?: ((selected: boolean) => void) | undefined;
    onTransitionEnd?: (() => void) | undefined;
    key: any;
    ref?: import("react").Ref<HTMLDivElement> | undefined;
}>;
export declare const PromptToolListItem: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    content: import("ai-construction-set").NamedContent;
    collapsed: boolean | import("react").Dispatch<import("react").SetStateAction<boolean>>;
    selected?: boolean | import("react").Dispatch<import("react").SetStateAction<boolean>> | undefined;
    onToggle?: ((collapsed: boolean) => void) | undefined;
    onSelected?: ((selected: boolean) => void) | undefined;
    onTransitionEnd?: (() => void) | undefined;
    key: any;
    ref?: import("react").Ref<HTMLDivElement> | undefined;
}>;
