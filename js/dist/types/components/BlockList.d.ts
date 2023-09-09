/// <reference types="react" />
export declare const PromptBlockList: import("styled-components").IStyledComponent<"web", {
    className?: string | string[] | undefined;
    list: import("ai-construction-set").List;
    selected: boolean | import("react").Dispatch<import("react").SetStateAction<boolean>>;
    onSelected?: ((selected: boolean) => void) | undefined;
    key: any;
    ref?: import("react").Ref<HTMLDivElement> | undefined;
}>;
