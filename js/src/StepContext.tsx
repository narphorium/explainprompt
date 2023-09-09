import React, { Dispatch, createContext, useEffect, useReducer } from "react";

export const SelectedStepContext = createContext({
    step: 1,
    setStep: (step: number) => {}
});

interface SelectedElement {
    element: HTMLElement | undefined;
    setElement: (element: HTMLElement | undefined) => void;
}

export const SelectedElementContext = createContext<SelectedElement>({
    element: undefined,
    setElement: (element: HTMLElement | undefined) => {}
});

interface ScrollFlag {
    flag: boolean;
    toggle: () => void;
}

export const ScrollFlagContext = createContext<ScrollFlag>({
    flag: false,
    toggle: () => {}
});


export class StepState {
    public step: number = 1;
    public numSteps: number = 1;
};

export type StepAction =
 | { type: 'start' }
 | { type: 'end' }
 | { type: 'previous' }
 | { type: 'next' }
 | { type: 'goto', step: number };


export const StepReducer = (state: StepState, action: StepAction):StepState => {
    switch (action.type) {
        case "start":
            return { 
                step: 1, 
                numSteps: state.numSteps };
        case "end":
            return { 
                step: Math.max(1, state.numSteps), 
                numSteps: state.numSteps };
        case "previous":
            return { 
                step: Math.max(1, state.step - 1), 
                numSteps: state.numSteps };
        case "next":
            return { 
                step: Math.min(state.numSteps, state.step + 1), 
                numSteps: state.numSteps };
        case "goto":
            return { 
                step:  Math.min(state.numSteps,  Math.max(1, action.step)), 
                numSteps: state.numSteps };
        default:
            throw new Error("Invalid action");
    }
}

export const StepContext = createContext<StepState | null>(null);
export const StepDispatchContext = createContext<Dispatch<StepAction> | null>(null);

type StepProviderProps = {
    step: number;
    numSteps: number;
    onChange?: (state: StepState) => void;
    children: React.ReactNode;
};

export const StepProvider = ({ step, numSteps, onChange, children }: StepProviderProps) => {
    const [state, dispatch] = useReducer(StepReducer, {
        step: step,
        numSteps: numSteps
    });

    useEffect(() => {
        if (onChange) {
            onChange(state);
        }
    }, [state]);
  
    return <StepContext.Provider value={state}>
        <StepDispatchContext.Provider value={dispatch}>
          {children}
        </StepDispatchContext.Provider>
    </StepContext.Provider>;
  }