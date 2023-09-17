import { Base, BlockList, BlockListItem, Code, Content, ContentSection, ContentSpan, DefaultBlockFactory, List, NamedBlock, NamedContent, Section, Selectable, SentinalView, Span, Stream } from 'ai-construction-set';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { SelectedElementContext, StepContext, StepDispatchContext } from '../StepContext';
import { PromptBlockList } from './BlockList';
import { BlockStream } from './BlockStream';
import { CodeSection } from './CodeSection';
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

    getContentSelectedChildren(block: Content, selected_index: number): Base[] {
        let selected = this.getSelectableSelectedChildren(block, selected_index);
        block.children.forEach((child: Base) => {
            selected = selected.concat(this.getSelectedChildren(child, selected_index));
        });
        return selected;
    };

    getSectionSelectedChildren(block: Section, selected_index: number): Base[] {
        let selected = this.getSelectableSelectedChildren(block, selected_index);
        block.spans.forEach((span: Span) => {
            selected = selected.concat(this.getSelectedChildren(span, selected_index));
        });
        return selected;
    };

    getSelectableSelectedChildren(block: Selectable, selected_index: number): Base[] {
        if (block.selection_index && block.selection_index <= selected_index) {
            return [block];
        }
        return [];
    }

    getListSelectedChildren(block: List, selected_index: number): Base[] {
        let selected: Base[] = [];
        block.items.forEach((item: NamedContent) => {
            selected = selected.concat(this.getSelectedChildren(item, selected_index));
        });
        return selected;
    }

    getStreamSelectedChildren(block: Stream, selected_index: number): Base[] {
        let selected: Base[] = [];
        block.blocks.forEach((item: Base) => {
            selected = selected.concat(this.getSelectedChildren(item, selected_index));
        });
        return selected;
    }

    getSelectedChildren(block: Base, selected_index: number): Base[] {
        if (block instanceof List) {
            return this.getListSelectedChildren(block, selected_index);
        } else if (block instanceof Content) {
            return this.getContentSelectedChildren(block, selected_index);
        } else if (block instanceof Section) {
            return this.getSectionSelectedChildren(block, selected_index);
        } else if (block instanceof Selectable) {
            return this.getSelectableSelectedChildren(block, selected_index);
        } else if (block instanceof Stream) {
            return this.getStreamSelectedChildren(block, selected_index);
        }
        return [];
    }

    useCollapsed(block: NamedContent) {
        const {element, setElement} = useContext(SelectedElementContext);
        const step = this.useStep();
        const [collapsed, setCollapsed] = useState<boolean>(block.collapsed);
        useEffect(() => {
            if (step != undefined) {
                setCollapsed(this.getSelectedChildren(block, step.step).length === 0);
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
        if (block.classNames.has('code')) {
            return <CodeSection ref={ref}
                    className={this.getClassNames(block, step?.step)}
                    code={block as Code}
                    selected={selected} 
                    editable={false}
                    onSelected={this.scrollOnSelected(ref, setElement)} 
                    onClick={this.gotoStep(block)} 
                    key={block.uuid} />;
        } else {
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

    buildStream(stream: Stream, parent?: Base): JSX.Element {
        const step = this.useStep();
        const [page, setPage] = useState<number>(1);
        const ref = useRef<HTMLDivElement>(null);

        // Automatically turn to the selected page
        useEffect(() => {
            if (step != undefined) {
                if (this.getSelectedChildren(stream, step.step)) {
                    stream.blocks.forEach((block) => {
                        if (block.iteration && this.getSelectedChildren(block, step.step)) {
                            setPage(block.iteration);
                        }
                    });
                }
            }
        }, [step]);
        
        return <BlockStream ref={ref} 
            stream={stream}
            page={page}
            setPage={setPage}
            key={stream.uuid} />;
    }
}