import React, { createContext, useReducer, useEffect, useContext, useState, useCallback, useRef, createElement } from 'react';
import { selectedVariants, NamedBlock, BlockListItem, BlockList, ContentBlock, ContentSection, ContentSpan, DefaultBlockFactory, Selectable, List, Content, Section, SentinalView, Span, NamedContent, BlockFactoryContext, BlockStream } from 'ai-construction-set';
import { createRoot } from 'react-dom/client';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'styled-theming';

const SelectedStepContext = createContext({
    step: 1,
    setStep: (step) => { }
});
const SelectedElementContext = createContext({
    element: undefined,
    setElement: (element) => { }
});
const ScrollFlagContext = createContext({
    flag: false,
    toggle: () => { }
});
class StepState {
    step = 1;
    numSteps = 1;
}
const StepReducer = (state, action) => {
    switch (action.type) {
        case "start":
            return {
                step: 1,
                numSteps: state.numSteps
            };
        case "end":
            return {
                step: Math.max(1, state.numSteps),
                numSteps: state.numSteps
            };
        case "previous":
            return {
                step: Math.max(1, state.step - 1),
                numSteps: state.numSteps
            };
        case "next":
            return {
                step: Math.min(state.numSteps, state.step + 1),
                numSteps: state.numSteps
            };
        case "goto":
            return {
                step: Math.min(state.numSteps, Math.max(1, action.step)),
                numSteps: state.numSteps
            };
        default:
            throw new Error("Invalid action");
    }
};
const StepContext = createContext(null);
const StepDispatchContext = createContext(null);
const StepProvider = ({ step, numSteps, onChange, children }) => {
    const [state, dispatch] = useReducer(StepReducer, {
        step: step,
        numSteps: numSteps
    });
    useEffect(() => {
        if (onChange) {
            onChange(state);
        }
    }, [state]);
    return React.createElement(StepContext.Provider, { value: state },
        React.createElement(StepDispatchContext.Provider, { value: dispatch }, children));
};

const promptTextColor = selectedVariants('mode', {
    default: { light: '#666', dark: '#bbb' },
    selected: { light: '#222', dark: '#ffde98' },
});
const selectedTextColor = theme('mode', {
    light: '#222',
    dark: '#ffde98',
});
const promptBgColor = selectedVariants('mode', {
    default: { light: 'transparent', dark: 'transparent' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});
const promptBorderColor = selectedVariants('mode', {
    default: { light: '#ccc', dark: '#595b60' },
    selected: { light: 'rgb(237, 211, 137)', dark: 'rgb(109 102 81)' },
});
const promptFont = '"Roboto Mono", monospace';
const PromptNamedContentBlock = styled(NamedBlock) `
    color: ${promptTextColor};
    background-color: ${promptBgColor};
    border-color: ${promptBorderColor};
    font-family: ${promptFont};

    & .aics-collapsible-block-title {
        color: ${promptTextColor};
    }

    &.selected .aics-collapsible-block-title {
        color: ${selectedTextColor};
    }

    & .aics-collapsible-block-control {
        color: ${promptTextColor};
    }
`;
const promptListItemBorderColor = theme('mode', {
    light: '#ccc',
    dark: '#595b60',
});
const PromptBlockListItem = styled(BlockListItem) `
    border-color: ${promptListItemBorderColor};
    background-color: ${promptBgColor};
`;
const promptToolTextColor$1 = selectedVariants('mode', {
    default: { light: '#222', dark: '#b3d7f8' },
    selected: { light: '#222', dark: '#bcdefe' },
});
const promptToolBgColor$1 = selectedVariants('mode', {
    default: { light: 'transparent', dark: 'transparent' },
    selected: { light: '#d8edff', dark: 'rgb(60 108 194 / 24%)' },
});
const promptToolSelectedTextColor = theme('mode', {
    light: '#222',
    dark: '#bcdefe'
});
const PromptToolListItem = styled(PromptBlockListItem) `
    color: ${promptToolTextColor$1};
    background-color: ${promptToolBgColor$1};

    &.selected .aics-content-span,
    &.selected .aics-content-section > span > label {
        color: ${promptToolSelectedTextColor} !important;
    }
`;

const PromptBlockList = styled(BlockList) `
    background-color: ${promptBgColor};
    border-color: ${promptBorderColor};
    color: ${promptTextColor};
`;

/* Model response */
const responseTextColor = selectedVariants('mode', {
    default: { light: '#222', dark: '#292b2f' },
    selected: { light: '#222', dark: '#ffde98' },
});
const responseBgColor = selectedVariants('mode', {
    default: { light: 'white', dark: '#292b2f' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});
const responseBorderColor = selectedVariants('mode', {
    default: { light: '#ccc', dark: '#595b60' },
    selected: { light: 'rgb(237, 211, 137)', dark: 'rgb(109 102 81)' },
});
const ModelResponse = styled(ContentBlock) `
    color: ${responseTextColor};
    background-color: ${responseBgColor};
    border-color: ${responseBorderColor};
`;
/* Tool Response */
const toolResponseTextColor = selectedVariants('mode', {
    default: { light: '#222', dark: '#b3d7f8' },
    selected: { light: '#222', dark: '#bcdefe' },
});
const toolResponseBgColor = selectedVariants('mode', {
    default: { light: 'rgb(242 249 255)', dark: '#292b2f' },
    selected: { light: '#d8edff', dark: 'rgb(60 108 194 / 24%)' },
});
const toolResponseBorderColor = selectedVariants('mode', {
    default: { light: '#b4d9ff', dark: '#4a5f79' },
    selected: { light: '#a0c1e3', dark: '#4a5f79' },
});
const toolResponseSelectedTextColor = theme('mode', {
    light: '#222',
    dark: '#bcdefe'
});
const ToolResponse = styled(ContentBlock) `
    color: ${toolResponseTextColor};
    background-color: ${toolResponseBgColor};
    border-color: ${toolResponseBorderColor};

    & .aics-content-section > span > label,
    & .aics-content-span {
        color: ${toolResponseTextColor} !important;
    }

    &.selected .aics-content-span,
    &.selected .aics-content-section > span > label {
        color: ${toolResponseSelectedTextColor} !important;
    }
`;
/* Descriptions */
const descriptionTextColor = theme('mode', {
    light: '#222',
    dark: '#ffde98',
});
const descriptionBgColor = theme('mode', {
    light: 'rgb(253 235 184)',
    dark: 'rgb(73 69 61)',
});
const descriptionBorderColor = theme('mode', {
    light: 'rgb(237, 211, 137)',
    dark: 'rgb(109 102 81)',
});
const toolDescriptionTextColor = theme('mode', {
    light: '#222',
    dark: '#bcdefe',
});
const toolDescriptioneBgColor = theme('mode', {
    light: '#d8edff',
    dark: 'rgb(60 108 194 / 24%)',
});
const toolDescriptionBorderColor = theme('mode', {
    light: '#a0c1e3',
    dark: '#4a5f79',
});
const DescriptionBlock = styled(ContentBlock) `
    color: ${descriptionTextColor};
    background-color: ${descriptionBgColor};
    border-color: ${descriptionBorderColor};

    & a {
        color: ${descriptionTextColor};
    }

    &.tool-description {
        color: ${toolDescriptionTextColor};
        background-color: ${toolDescriptioneBgColor};
        border-color: ${toolDescriptionBorderColor};

        .aics-content-span,
        .aics-content-section > span > label {
            color: ${toolResponseSelectedTextColor} !important;
        }

        a {
            color: ${toolResponseSelectedTextColor};
        }
    }
`;

const selectedLabelColor = theme('mode', {
    light: '#222',
    dark: '#ffde98',
});
const PromptContentSection = styled(ContentSection) `
    color: ${promptTextColor} !important;
    font-size: 10pt;
    
    & > span > label {
        color: ${promptTextColor} !important;
    }

    .selected & > span > label {
        color: ${selectedLabelColor} !important;
    }
`;

const spanTextColor = selectedVariants('mode', {
    default: { light: 'inherit', dark: 'inherit' },
    selected: { light: '#222', dark: '#ffde98' },
});
const selectedChildSpanColor = theme('mode', {
    light: '#222',
    dark: '#ffde98',
});
const selectedChildBgColor = theme('mode', {
    light: 'rgb(0 0 0 / 8%)',
    dark: 'rgb(255 255 255 / 8%)',
});
const PromptContentSpan = styled(ContentSpan) `
    color: ${spanTextColor};
    font-family: ${promptFont};
    font-size: 10pt;

    .selected & {
        color: ${selectedChildSpanColor} !important;
    }
`;
const toolTextColor = selectedVariants('mode', {
    default: { light: '#007fff', dark: '#7dbdff' },
    selected: { light: '#fff', dark: '#fff' },
});
const toolBgColor = selectedVariants('mode', {
    default: { light: 'rgb(0 127 255 / 10%)', dark: 'rgb(84 169 255 / 20%)' },
    selected: { light: 'rgb(82 162 244)', dark: 'rgb(47 98 161)' },
});
const ToolContentSpan = styled(PromptContentSpan) `
    color: ${toolTextColor};
    background-color: ${toolBgColor};
    font-family: ${promptFont};
    padding: 2px 6px 2px 22px;
    border-radius: 4px;
    position: relative;
    font-size: 10pt;
    display: inline-block;

    &::before {
        position: absolute;
        top: 5px;
        left: 6px;
        content: "\\eb6d";
        font: normal normal normal 12px/1 codicon;
        text-decoration: none;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .selected & {
        color: ${selectedChildSpanColor} !important;
        background-color: ${selectedChildBgColor};
    }
`;
const promptToolTextColor = selectedVariants('mode', {
    default: { light: 'inherit', dark: 'inherit' },
    selected: { light: '#fff', dark: '#ffde98' },
});
const promptToolBgColor = selectedVariants('mode', {
    default: { light: 'rgb(0 0 0 / 8%)', dark: 'rgb(255 255 255 / 8%)' },
    selected: { light: 'rgb(82 162 244)', dark: 'rgb(47 98 161)' },
});
const PromptToolContentSpan = styled(ToolContentSpan) `
    color: ${promptToolTextColor};
    background-color: ${promptToolBgColor};
`;
const specialTokenTextColor = selectedVariants('mode', {
    default: { light: '#666', dark: '#bbb' },
    selected: { light: '#222', dark: '#ffde98' },
});
const specialTokenBgColor = selectedVariants('mode', {
    default: { light: 'rgb(0 0 0 / 8%)', dark: 'rgb(255 255 255 / 8%)' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});
const SpecialTokenSpan = styled(PromptContentSpan) `
    color: ${specialTokenTextColor};
    background-color: ${specialTokenBgColor};
    margin: 0 4px;
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-block;
`;

class PaperBlockFactory extends DefaultBlockFactory {
    getClassNames(block, selected_index) {
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
    }
    ;
    useStep() {
        return useContext(StepContext);
    }
    useSelected(block) {
        const step = this.useStep();
        const [selected, setSelected] = useState(block.selected);
        useEffect(() => {
            if (step != undefined) {
                setSelected(block.selection_index === step?.step);
            }
        }, [step]);
        return { selected, setSelected };
    }
    scrollToSelected(element) {
        return () => {
            if (element !== undefined) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        };
    }
    scrollOnSelected(ref, setElement) {
        return (selected) => {
            if (selected && ref.current) {
                setElement(ref.current);
                ref.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        };
    }
    contentContainsSelected(block, selected_index) {
        let contains = this.selectableContainsSelected(block, selected_index);
        block.children.forEach((child) => {
            if (this.containsSelected(child, selected_index)) {
                contains = true;
            }
        });
        return contains;
    }
    ;
    sectionConstainsSelected(block, selected_index) {
        let contains = this.selectableContainsSelected(block, selected_index);
        block.spans.forEach((span) => {
            if (this.containsSelected(span, selected_index)) {
                contains = true;
            }
        });
        return contains;
    }
    ;
    selectableContainsSelected(block, selected_index) {
        if (block.selection_index === null) {
            return false;
        }
        return block.selection_index <= selected_index;
    }
    listContainsSelected(block, selected_index) {
        let contains = false;
        block.items.forEach((item) => {
            if (this.containsSelected(item, selected_index)) {
                contains = true;
            }
        });
        return contains;
    }
    containsSelected(block, selected_index) {
        if (block instanceof List) {
            return this.listContainsSelected(block, selected_index);
        }
        else if (block instanceof Content) {
            return this.contentContainsSelected(block, selected_index);
        }
        else if (block instanceof Section) {
            return this.sectionConstainsSelected(block, selected_index);
        }
        else if (block instanceof Selectable) {
            return this.selectableContainsSelected(block, selected_index);
        }
        return false;
    }
    useCollapsed(block) {
        const { element, setElement } = useContext(SelectedElementContext);
        const step = this.useStep();
        const [collapsed, setCollapsed] = useState(block.collapsed);
        useEffect(() => {
            if (step != undefined) {
                setCollapsed(!this.containsSelected(block, step.step));
            }
        }, [step]);
        const toggleCollapsed = useCallback((c) => {
            setCollapsed(!c);
            setElement(undefined); // Don't scroll when manually collapsing
        }, [collapsed]);
        return { collapsed, toggleCollapsed };
    }
    gotoStep = (block) => {
        const dispatch = useContext(StepDispatchContext);
        return () => {
            if (dispatch !== undefined && block.selection_index !== null) {
                dispatch?.({ type: 'goto', step: block.selection_index });
            }
        };
    };
    buildNamedContent(block, parent) {
        const step = this.useStep();
        const { element, setElement } = useContext(SelectedElementContext);
        const { selected, setSelected } = this.useSelected(block);
        const { collapsed, toggleCollapsed } = this.useCollapsed(block);
        const ref = useRef(null);
        if (block.classNames.has('prompt-named-content')) {
            return React.createElement(PromptNamedContentBlock, { ref: ref, className: this.getClassNames(block, step?.step), content: block, collapsed: collapsed, onToggle: toggleCollapsed, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onTransitionEnd: this.scrollToSelected(element), key: block.uuid });
        }
        else {
            return React.createElement(NamedBlock, { ref: ref, className: this.getClassNames(block, step?.step), content: block, collapsed: collapsed, onToggle: toggleCollapsed, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onTransitionEnd: this.scrollToSelected(element), key: block.uuid });
        }
    }
    buildListItem(block, parent) {
        const step = this.useStep();
        const { element, setElement } = useContext(SelectedElementContext);
        const { selected, setSelected } = this.useSelected(block);
        const { collapsed, toggleCollapsed } = this.useCollapsed(block);
        const ref = useRef(null);
        if (block.classNames.has('prompt-tool-named-content')) {
            return React.createElement(PromptToolListItem, { ref: ref, className: this.getClassNames(block, step?.step), content: block, collapsed: collapsed, onToggle: toggleCollapsed, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onTransitionEnd: this.scrollToSelected(element), key: block.uuid });
        }
        else if (block.classNames.has('prompt-named-content')) {
            return React.createElement(PromptBlockListItem, { ref: ref, className: this.getClassNames(block, step?.step), content: block, collapsed: collapsed, onToggle: toggleCollapsed, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onTransitionEnd: this.scrollToSelected(element), key: block.uuid });
        }
        else {
            return React.createElement(BlockListItem, { ref: ref, className: this.getClassNames(block, step?.step), content: block, collapsed: collapsed, onToggle: toggleCollapsed, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onTransitionEnd: this.scrollToSelected(element), key: block.uuid });
        }
    }
    buildContent(block, parent) {
        const step = this.useStep();
        const { element, setElement } = useContext(SelectedElementContext);
        const { selected, setSelected } = this.useSelected(block);
        const ref = useRef(null);
        if (block.classNames.has('tool-response')) {
            return React.createElement(ToolResponse, { ref: ref, className: this.getClassNames(block, step?.step), content: block, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onClick: this.gotoStep(block), key: block.uuid });
        }
        else {
            return React.createElement(ModelResponse, { ref: ref, className: this.getClassNames(block, step?.step), content: block, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onClick: this.gotoStep(block), key: block.uuid });
        }
    }
    buildList(block, parent) {
        const step = this.useStep();
        useContext(SelectedElementContext);
        const ref = useRef(null);
        if (block.classNames.has('prompt-list')) {
            return React.createElement(PromptBlockList, { ref: ref, className: this.getClassNames(block, step?.step), list: block, selected: false, key: block.uuid });
        }
        else {
            return React.createElement(BlockList, { ref: ref, className: this.getClassNames(block, step?.step), list: block, selected: false, key: block.uuid });
        }
    }
    buildSection(block, parent) {
        const step = this.useStep();
        const { element, setElement } = useContext(SelectedElementContext);
        const { selected, setSelected } = this.useSelected(block);
        const ref = useRef(null);
        if (block.classNames.has('prompt-section')) {
            return React.createElement(PromptContentSection, { ref: ref, className: this.getClassNames(block, step?.step), section: block, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onClick: this.gotoStep(block), key: block.uuid });
        }
        else {
            return React.createElement(ContentSection, { ref: ref, className: this.getClassNames(block, step?.step), section: block, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onClick: this.gotoStep(block), key: block.uuid });
        }
    }
    buildSpan(block, parent) {
        const step = this.useStep();
        const { element, setElement } = useContext(SelectedElementContext);
        const { selected, setSelected } = this.useSelected(block);
        const ref = useRef(null);
        if (block.classNames.has('special-token')) {
            return React.createElement(SpecialTokenSpan, { ref: ref, className: this.getClassNames(block, step?.step), span: block, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onClick: this.gotoStep(block), key: block.uuid });
        }
        else if (block.classNames.has('tool-span') || block.classNames.has('tool')) {
            if (block.classNames.has('prompt-span')) {
                return React.createElement(PromptToolContentSpan, { ref: ref, className: this.getClassNames(block, step?.step), span: block, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onClick: this.gotoStep(block), key: block.uuid });
            }
            else {
                return React.createElement(ToolContentSpan, { ref: ref, className: this.getClassNames(block, step?.step), span: block, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onClick: this.gotoStep(block), key: block.uuid });
            }
        }
        else {
            if (block.classNames.has('prompt-span')) {
                return React.createElement(PromptContentSpan, { ref: ref, className: this.getClassNames(block, step?.step), span: block, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onClick: this.gotoStep(block), key: block.uuid });
            }
            else {
                return React.createElement(ContentSpan, { ref: ref, className: this.getClassNames(block, step?.step), span: block, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), onClick: this.gotoStep(block), key: block.uuid });
            }
        }
    }
    buildSentinal(block, parent) {
        const { element, setElement } = useContext(SelectedElementContext);
        const { selected, setSelected } = this.useSelected(block);
        const ref = useRef(null);
        return React.createElement(SentinalView, { ref: ref, sentinal: block, selected: selected, onSelected: this.scrollOnSelected(ref, setElement), key: block.uuid });
    }
}

const ANNOTATION_PATTERN = new RegExp("<mark([^>]*)>(.*?)</mark>", 'gm');
const ARGS_PATTERN = new RegExp("(\\w+)=\"([^\"]*)\"", 'gm');
const parseSpanArgs = (args) => {
    const argMap = new Map();
    let m;
    while ((m = ARGS_PATTERN.exec(args)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === ARGS_PATTERN.lastIndex) {
            ARGS_PATTERN.lastIndex++;
        }
        argMap.set(m[1], m[2]);
    }
    return argMap;
};
const buildSpan = (json, content, inPrompt) => {
    const span = new Span(content);
    if (inPrompt) {
        span.classNames.add('prompt-span');
    }
    return span;
};
const parseSpans = (json, inPrompt) => {
    const spans = [];
    if (json['type'] === 'action') {
        const span = buildSpan(json, json['content'], inPrompt);
        if (json['step']) {
            span.selection_index = json['step'];
        }
        span.classNames.add('tool-span');
        spans.push(span);
        return spans;
    }
    let m;
    let offset = 0;
    const content = json['content'];
    while ((m = ANNOTATION_PATTERN.exec(content)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === ANNOTATION_PATTERN.lastIndex) {
            ANNOTATION_PATTERN.lastIndex++;
        }
        if (m.index > offset) {
            const span = new Span(content.substring(offset, m.index));
            if (inPrompt) {
                span.classNames.add('prompt-span');
            }
            spans.push(span);
        }
        const span = buildSpan(json, m[2], inPrompt);
        const args = parseSpanArgs(m[1]);
        if (args.has('class')) {
            // FIXME: Handle multiple classes
            span.classNames.add(args.get('class'));
        }
        if (args.has('step')) {
            span.selection_index = parseInt(args.get('step'));
        }
        spans.push(span);
        offset = m.index + m[0].length;
    }
    if (offset < content.length) {
        const span = buildSpan(json, content.substring(offset), inPrompt);
        spans.push(span);
    }
    return spans;
};
const parseSection = (json, inPrompt) => {
    const section = new Section();
    if (json['type']) {
        if (json['type'] === 'code') {
            const code = section;
            if (json['language']) {
                code.language = json['language'];
            }
            return code;
        }
        section.classNames.add(json['type']);
    }
    if (inPrompt) {
        section.classNames.add('prompt-section');
    }
    if (json['step'] && json['type'] !== 'action') {
        section.selection_index = json['step'];
    }
    let update = {};
    if (json['label']) {
        section.name = json['label'];
    }
    section.spans = parseSpans({ ...json, ...update }, inPrompt);
    return section;
};
const parseContent = (json) => {
    const response = new Content();
    if (json['type']) {
        response.classNames.add(json['type']);
    }
    response.children = json.sections.map((s) => parseSection(s, false));
    if (json['step']) {
        response.selection_index = json['step'];
    }
    return response;
};
const parseNamedContent = (json, inPrompt) => {
    const response = new NamedContent(json['label']);
    if (json['type']) {
        response.classNames.add(json['type']);
    }
    if (inPrompt) {
        response.classNames.add('prompt-named-content');
    }
    response.children = json.sections.map((c) => parseSection(c, inPrompt));
    if (json['step']) {
        response.selection_index = json['step'];
    }
    return response;
};
const parsePromptExamples = (json) => {
    const examples = new List();
    examples.classNames.add('prompt-list');
    examples.items = json.examples.map((e) => parseNamedContent(e, true));
    return examples;
};
const parseToolDefinitions = (json) => {
    const definitions = new List();
    definitions.classNames.add('prompt-list');
    definitions.items = json['tools'].map((t) => {
        const def = parseNamedContent(t, true);
        def.classNames.add('prompt-tool-named-content');
        return def;
    });
    return definitions;
};
const parsePrompt = (json) => {
    const prompt = new NamedContent(json.label);
    prompt.classNames.add('prompt-named-content');
    if (json['type']) {
        prompt.classNames.add(json['type']);
    }
    prompt.children = json.sections.map((s) => {
        switch (s['type']) {
            case 'examples':
                return parsePromptExamples(s);
            case 'scratchpad':
                return parseNamedContent(s, true);
            case 'tools':
                return parseToolDefinitions(s);
            case 'text':
                return parseSection(s, true);
            default:
                return parseSection(s, true);
        }
    });
    return prompt;
};
const parseSentinal = (json) => {
    const sentinal = new Selectable();
    if (json['step']) {
        sentinal.selection_index = json['step'];
    }
    return sentinal;
};
const parseToolResponse = (json) => {
    const response = new Content();
    if (json['type']) {
        response.classNames.add(json['type']);
    }
    response.children = json['sections'].map(parseSection);
    if (json['step']) {
        response.selection_index = json['step'];
    }
    return response;
};
const parsePromptChain = (json) => {
    return json.map((m) => {
        switch (m.type) {
            case 'tool-response':
                return parseToolResponse(m);
            case 'prompt':
                return parsePrompt(m);
            case 'response':
                return parseContent(m);
            case 'sentinal':
                return parseSentinal(m);
            default:
                throw new Error("Unknown message type: " + m.type);
        }
    });
};

// import '@vscode/codicons/dist/codicon.css';
const Widget = ({ model }) => {
    let getData = () => {
        const json_data = JSON.parse(model.get("data"));
        return parsePromptChain(json_data);
    };
    let getTheme = () => model.get("theme");
    const [data, setData] = useState(getData());
    const [theme, setTheme] = useState(getTheme());
    const [factory, setFactory] = useState(new PaperBlockFactory());
    const [step, setStep] = useState(1);
    const [element, setElement] = useState();
    model.on("change:data", () => {
        setData(getData());
    });
    model.on("change:theme", () => {
        setTheme(getTheme());
    });
    return React.createElement(ThemeProvider, { theme: { 'mode': theme } },
        React.createElement(StepProvider, { step: step, numSteps: 0, onChange: () => { } },
            React.createElement(BlockFactoryContext.Provider, { value: { factory, setFactory } },
                React.createElement(SelectedElementContext.Provider, { value: { element, setElement } },
                    React.createElement(BlockStream, { blocks: data })))));
};
const render = ({ model, el }) => {
    // shadow DOM as react root
    const root = createRoot(el);
    // render react element inside shadow DOM
    root.render(createElement(Widget, { model: model }));
};

export { DescriptionBlock, ModelResponse, PaperBlockFactory, PromptBlockList, PromptBlockListItem, PromptContentSection, PromptContentSpan, PromptNamedContentBlock, PromptToolContentSpan, PromptToolListItem, ScrollFlagContext, SelectedElementContext, SelectedStepContext, SpecialTokenSpan, StepContext, StepDispatchContext, StepProvider, StepReducer, StepState, ToolContentSpan, ToolResponse, parseContent, parseNamedContent, parsePrompt, parsePromptChain, parsePromptExamples, parseSection, parseSentinal, parseSpans, parseToolDefinitions, parseToolResponse, promptBgColor, promptBorderColor, promptFont, promptListItemBorderColor, promptTextColor, promptToolBgColor, promptToolTextColor, render, spanTextColor, specialTokenBgColor, specialTokenTextColor, toolBgColor, toolTextColor };
