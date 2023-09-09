import { Base, BlockList, BlockListItem, Content, ContentSection, ContentSpan, DefaultBlockFactory, List, NamedBlock, NamedContent, Section, Selectable, SentinalView, Span } from 'ai-construction-set';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SelectedElementContext, StepContext, StepDispatchContext } from '../StepContext';
import { PromptBlockList } from './BlockList';
import { ModelResponse, ToolResponse } from './ContentBlock';
import { PromptContentSection } from './ContentSection';
import { PromptContentSpan, PromptToolContentSpan, SpecialTokenSpan, ToolContentSpan } from './ContentSpan';
import { PromptBlockListItem, PromptNamedContentBlock, PromptToolListItem } from './NamedBlock';

export class PaperBlockFactory extends DefaultBlockFactory {

    getClassNames(block: Base, selected_index?: number): string[] {
        const classNames = [];
        if (block instanceof Selectable) {
            if (block.selection_index !== null) {
                classNames.push('selectable');
            }
            if (selected_index === block.selection_index) {
                classNames.push('selected');
            }
        }
        return classNames;
    };

    useStep() {
        return useContext(StepContext);
    }

    useSelected(block: Selectable) {
        const step = this.useStep();
        const [selected, setSelected] = useState<boolean>(block.selected);
        useEffect(() => {
            if (step != undefined) {
                setSelected(block.selection_index === step?.step);
            }
        }, [step]);
        return {selected, setSelected};
    }

    scrollToSelected(element: HTMLElement | undefined) {
        return () => {
            if (element !== undefined) {
                element.scrollIntoView({
                    behavior: "smooth", 
                    block: "center"
                });
            }
        };
    }

    scrollOnSelected(ref: React.RefObject<any>, setElement: (e: HTMLElement)=>void) {
        return (selected: boolean) => {
            if (selected && ref.current) {
                setElement(ref.current);
                ref.current.scrollIntoView({
                    behavior: "smooth", 
                    block: "center"
                });
            }
        }
    }

    contentContainsSelected(block: Content, selected_index: number): boolean {
        let contains = this.selectableContainsSelected(block, selected_index);
        block.children.forEach((child: Base) => {
            if (this.containsSelected(child, selected_index)) {
                contains = true;
            }
        });
        return contains;
    };

    sectionConstainsSelected(block: Section, selected_index: number): boolean {
        let contains = this.selectableContainsSelected(block, selected_index);
        block.spans.forEach((span: Span) => {
            if (this.containsSelected(span, selected_index)) {
                contains = true;
            }
        });
        return contains;
    };

    selectableContainsSelected(block: Selectable, selected_index: number): boolean {
        if (block.selection_index === null) {
            return false;
        }
        return block.selection_index <= selected_index;
    }

    listContainsSelected(block: List, selected_index: number): boolean {
        let contains = false;
        block.items.forEach((item: NamedContent) => {
            if (this.containsSelected(item, selected_index)) {
                contains = true;
            }
        });
        return contains;
    }

    containsSelected(block: Base, selected_index: number): boolean {
        if (block instanceof List) {
            return this.listContainsSelected(block, selected_index);
        } else if (block instanceof Content) {
            return this.contentContainsSelected(block, selected_index);
        } else if (block instanceof Section) {
            return this.sectionConstainsSelected(block, selected_index);
        } else if (block instanceof Selectable) {
            return this.selectableContainsSelected(block, selected_index);
        }
        return false;
    }

    useCollapsed(block: NamedContent) {
        const {element, setElement} = useContext(SelectedElementContext);
        const step = this.useStep();
        const [collapsed, setCollapsed] = useState<boolean>(block.collapsed);
        useEffect(() => {
            if (step != undefined) {
                setCollapsed(!this.containsSelected(block, step.step));
            }
        }, [step]);
        const toggleCollapsed = useCallback((c: boolean) => {
            setCollapsed(!c);
            setElement(undefined); // Don't scroll when manually collapsing
        }, 
                                            [collapsed]);
        return {collapsed, toggleCollapsed};
    }

    gotoStep = (block: Selectable) => {
        const dispatch = useContext(StepDispatchContext);
        return () => {
            if (dispatch !== undefined && block.selection_index !== null) {
                dispatch?.({type: 'goto', step: block.selection_index});
            }
        };
    }

    buildNamedContent(block: NamedContent, parent?: Base): JSX.Element {
        const step = this.useStep();
        const {element, setElement} = useContext(SelectedElementContext);
        const {selected, setSelected} = this.useSelected(block);
        const {collapsed, toggleCollapsed} = this.useCollapsed(block);
        const ref = useRef<HTMLDivElement>(null);
        if (block.classNames.has('prompt-named-content')) {
            return <PromptNamedContentBlock ref={ref} 
                className={this.getClassNames(block, step?.step)} 
                content={block} 
                collapsed={collapsed} 
                onToggle={toggleCollapsed} 
                selected={selected} 
                onSelected={this.scrollOnSelected(ref, setElement)} 
                onTransitionEnd={this.scrollToSelected(element)} 
                key={block.uuid}/>;
        } else {
            return <NamedBlock ref={ref} 
                className={this.getClassNames(block, step?.step)} 
                content={block} 
                collapsed={collapsed} 
                onToggle={toggleCollapsed} 
                selected={selected} 
                onSelected={this.scrollOnSelected(ref, setElement)} 
                onTransitionEnd={this.scrollToSelected(element)} 
                key={block.uuid}/>;
        }
    }

    buildListItem(block: NamedContent, parent?: Base): JSX.Element {
        const step = this.useStep();
        const {element, setElement} = useContext(SelectedElementContext);
        const {selected, setSelected} = this.useSelected(block);
        const {collapsed, toggleCollapsed} = this.useCollapsed(block);
        const ref = useRef<HTMLDivElement>(null);
        if (block.classNames.has('prompt-tool-named-content')) {
            return <PromptToolListItem ref={ref}
                className={this.getClassNames(block, step?.step)} 
                content={block} 
                collapsed={collapsed} 
                onToggle={toggleCollapsed} 
                selected={selected} 
                onSelected={this.scrollOnSelected(ref, setElement)} 
                onTransitionEnd={this.scrollToSelected(element)} 
                key={block.uuid}/>;
        } else if (block.classNames.has('prompt-named-content')) {
            return <PromptBlockListItem ref={ref}
                className={this.getClassNames(block, step?.step)} 
                content={block} 
                collapsed={collapsed} 
                onToggle={toggleCollapsed} 
                selected={selected} 
                onSelected={this.scrollOnSelected(ref, setElement)} 
                onTransitionEnd={this.scrollToSelected(element)} 
                key={block.uuid}/>;
        } else {
            return <BlockListItem ref={ref}
                className={this.getClassNames(block, step?.step)} 
                content={block} 
                collapsed={collapsed} 
                onToggle={toggleCollapsed} 
                selected={selected} 
                onSelected={this.scrollOnSelected(ref, setElement)} 
                onTransitionEnd={this.scrollToSelected(element)} 
                key={block.uuid}/>;
        }  
    }

    buildContent(block: Content, parent?: Base): JSX.Element {
        const step = this.useStep();
        const {element, setElement} = useContext(SelectedElementContext);
        const {selected, setSelected} = this.useSelected(block);
        const ref = useRef<HTMLDivElement>(null);
        if (block.classNames.has('tool-response')) {
            return <ToolResponse ref={ref}
                className={this.getClassNames(block, step?.step)} 
                content={block} 
                selected={selected} 
                onSelected={this.scrollOnSelected(ref, setElement)} 
                onClick={this.gotoStep(block)} 
                key={block.uuid} />;
        } else {
            return <ModelResponse ref={ref}
                className={this.getClassNames(block, step?.step)} 
                content={block} 
                selected={selected} 
                onSelected={this.scrollOnSelected(ref, setElement)} 
                onClick={this.gotoStep(block)} 
                key={block.uuid} />;
        }
    }

    buildList(block: List, parent?: Base): JSX.Element {
        const step = this.useStep();
        const {element, setElement} = useContext(SelectedElementContext);
        const ref = useRef<HTMLDivElement>(null);
        if (block.classNames.has('prompt-list')) {
            return <PromptBlockList ref={ref}
                className={this.getClassNames(block, step?.step)} 
                list={block} 
                selected={false} 
                key={block.uuid} />;
        } else {
            return <BlockList ref={ref}
                className={this.getClassNames(block, step?.step)} 
                list={block} 
                selected={false} 
                key={block.uuid} />;
        }
    }

    buildSection(block: Section, parent?: Base): JSX.Element {
        const step = this.useStep();
        const {element, setElement} = useContext(SelectedElementContext);
        const {selected, setSelected} = this.useSelected(block);
        const ref = useRef<HTMLDivElement>(null);
        if (block.classNames.has('prompt-section')) {
            return <PromptContentSection ref={ref}
                className={this.getClassNames(block, step?.step)} 
                section={block} 
                selected={selected} 
                onSelected={this.scrollOnSelected(ref, setElement)} 
                onClick={this.gotoStep(block)} 
                key={block.uuid} />;
        } else {
            return <ContentSection ref={ref}
                className={this.getClassNames(block, step?.step)}
                section={block} 
                selected={selected} 
                onSelected={this.scrollOnSelected(ref, setElement)} 
                onClick={this.gotoStep(block)} 
                key={block.uuid} />;
        }
    }

    buildSpan(block: Span, parent?: Base): JSX.Element {
        const step = this.useStep();
        const {element, setElement} = useContext(SelectedElementContext);
        const {selected, setSelected} = this.useSelected(block);
        const ref = useRef<HTMLSpanElement>(null);
        if (block.classNames.has('special-token')) {
            return <SpecialTokenSpan ref={ref}
                className={this.getClassNames(block, step?.step)} 
                span={block} 
                selected={selected} 
                onSelected={this.scrollOnSelected(ref, setElement)} 
                onClick={this.gotoStep(block)} 
                key={block.uuid} />
        } else if (block.classNames.has('tool-span') || block.classNames.has('tool')) {
            if (block.classNames.has('prompt-span')) {
                return <PromptToolContentSpan ref={ref}
                    className={this.getClassNames(block, step?.step)} 
                    span={block} selected={selected} 
                    onSelected={this.scrollOnSelected(ref, setElement)} 
                    onClick={this.gotoStep(block)} 
                    key={block.uuid} />;
            } else {
                return <ToolContentSpan ref={ref}
                    className={this.getClassNames(block, step?.step)} 
                    span={block} 
                    selected={selected} 
                    onSelected={this.scrollOnSelected(ref, setElement)} 
                    onClick={this.gotoStep(block)} 
                    key={block.uuid} />;
            }
        } else {
            if (block.classNames.has('prompt-span')) {
                return <PromptContentSpan ref={ref}
                    className={this.getClassNames(block, step?.step)} 
                    span={block} 
                    selected={selected} 
                    onSelected={this.scrollOnSelected(ref, setElement)} 
                    onClick={this.gotoStep(block)} 
                    key={block.uuid} />;
            } else {
                return <ContentSpan ref={ref}
                    className={this.getClassNames(block, step?.step)} 
                    span={block} selected={selected} 
                    onSelected={this.scrollOnSelected(ref, setElement)} 
                    onClick={this.gotoStep(block)} 
                    key={block.uuid} />;
            }
        }
    }

    buildSentinal(block: Selectable, parent?: Base): JSX.Element {
        const {element, setElement} = useContext(SelectedElementContext);
        const {selected, setSelected} = this.useSelected(block);
        const ref = useRef<HTMLDivElement>(null);
        return <SentinalView ref={ref} 
            sentinal={block} 
            selected={selected} 
            onSelected={this.scrollOnSelected(ref, setElement)} 
            key={block.uuid} />;
    }
}