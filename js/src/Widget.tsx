// import '@vscode/codicons/dist/codicon.css';
import { Base, BlockFactory, BlockFactoryContext, BlockStream } from "ai-construction-set";
// import 'devicon/devicon.min.css';
import React, { createElement, useState } from "react";
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "styled-components";
import { SelectedElementContext, StepProvider } from "./StepContext";
import { PaperBlockFactory } from "./components/BlockFactory";
// import './css/codicon.css';
// import './css/inter.css';
// import './css/material.css';
// import './css/roboto.css';
import { parsePromptChain } from "./parser";

interface WidgetModel {
    get(param: string): any;
    on(event: string, callback: (data: any) => void): void;
};

type WidgetProps = {
    model: WidgetModel;
};

export const Widget = ({model}: WidgetProps) => {
    let getData = () => {
        const json_data = JSON.parse(model.get("data"));
        return parsePromptChain(json_data);
    };
    let getTheme = () => model.get("theme");

    const [data, setData] = useState<Base[]>(getData());
    const [theme, setTheme] = useState(getTheme());
    const [factory, setFactory] = useState<BlockFactory>(new PaperBlockFactory());
    const [step, setStep] = useState(1);
    const [element, setElement] = useState<HTMLElement>();

    model.on("change:data", () => {
        setData(getData());
    });

    model.on("change:theme", () => {
        setTheme(getTheme());
    });

    return <ThemeProvider theme={{'mode': theme}}>
    <StepProvider step={step} numSteps={0} onChange={()=>{}}>
    <BlockFactoryContext.Provider value={{ factory, setFactory }}>
    <SelectedElementContext.Provider value={{ element, setElement }}>
        <BlockStream blocks={data} />
    </SelectedElementContext.Provider>
    </BlockFactoryContext.Provider>
    </StepProvider>
    </ThemeProvider>;
};

export const render = ({model, el}: {model: WidgetModel, el: HTMLDivElement}) => {
    // shadow DOM as react root
    const root = createRoot(el);

    // render react element inside shadow DOM
    root.render(createElement(Widget, {model: model}));
};