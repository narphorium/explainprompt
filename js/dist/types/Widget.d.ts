import React from "react";
interface WidgetModel {
    get(param: string): any;
    on(event: string, callback: (data: any) => void): void;
}
type WidgetProps = {
    model: WidgetModel;
};
export declare const Widget: ({ model }: WidgetProps) => React.JSX.Element;
export declare const render: ({ model, el }: {
    model: WidgetModel;
    el: HTMLDivElement;
}) => void;
export {};
