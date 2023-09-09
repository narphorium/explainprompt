import React from "react";
export declare const SelectedStepContext: React.Context<{
    step: number;
    setStep: (step: number) => void;
}>;
interface SelectedElement {
    element: HTMLElement | undefined;
    setElement: (element: HTMLElement | undefined) => void;
}
export declare const SelectedElementContext: React.Context<SelectedElement>;
interface ScrollFlag {
    flag: boolean;
    toggle: () => void;
}
export declare const ScrollFlagContext: React.Context<ScrollFlag>;
export declare class StepState {
    step: number;
    numSteps: number;
}
export type StepAction = {
    type: 'start';
} | {
    type: 'end';
} | {
    type: 'previous';
} | {
    type: 'next';
} | {
    type: 'goto';
    step: number;
};
export declare const StepReducer: (state: StepState, action: StepAction) => StepState;
export declare const StepContext: React.Context<StepState | null>;
export declare const StepDispatchContext: React.Context<React.Dispatch<StepAction> | null>;
type StepProviderProps = {
    step: number;
    numSteps: number;
    onChange?: (state: StepState) => void;
    children: React.ReactNode;
};
export declare const StepProvider: ({ step, numSteps, onChange, children }: StepProviderProps) => React.JSX.Element;
export {};
