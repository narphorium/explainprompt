import { Base, Content, DefaultBlockFactory, List, NamedContent, Section, Selectable, Span } from 'ai-construction-set';
import React from 'react';
export declare class PaperBlockFactory extends DefaultBlockFactory {
    getClassNames(block: Base, selected_index?: number): string[];
    useStep(): import("../StepContext").StepState | null;
    useSelected(block: Selectable): {
        selected: boolean;
        setSelected: React.Dispatch<React.SetStateAction<boolean>>;
    };
    scrollToSelected(element: HTMLElement | undefined): () => void;
    scrollOnSelected(ref: React.RefObject<any>, setElement: (e: HTMLElement) => void): (selected: boolean) => void;
    contentContainsSelected(block: Content, selected_index: number): boolean;
    sectionConstainsSelected(block: Section, selected_index: number): boolean;
    selectableContainsSelected(block: Selectable, selected_index: number): boolean;
    listContainsSelected(block: List, selected_index: number): boolean;
    containsSelected(block: Base, selected_index: number): boolean;
    useCollapsed(block: NamedContent): {
        collapsed: boolean;
        toggleCollapsed: (c: boolean) => void;
    };
    gotoStep: (block: Selectable) => () => void;
    buildNamedContent(block: NamedContent, parent?: Base): JSX.Element;
    buildListItem(block: NamedContent, parent?: Base): JSX.Element;
    buildContent(block: Content, parent?: Base): JSX.Element;
    buildList(block: List, parent?: Base): JSX.Element;
    buildSection(block: Section, parent?: Base): JSX.Element;
    buildSpan(block: Span, parent?: Base): JSX.Element;
    buildSentinal(block: Selectable, parent?: Base): JSX.Element;
}
