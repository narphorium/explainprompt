import { Base, Code, Content, List, NamedContent, Section, Selectable, Span } from 'ai-construction-set';

const ANNOTATION_PATTERN = new RegExp("<mark([^>]*)>(.*?)</mark>", 'gm');
const ARGS_PATTERN = new RegExp("(\\w+)=\"([^\"]*)\"", 'gm');

const parseSpanArgs = (args: string): Map<string, string> => {
    const argMap = new Map<string, string>();
    let m;
    while ((m = ARGS_PATTERN.exec(args)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === ARGS_PATTERN.lastIndex) {
            ARGS_PATTERN.lastIndex++;
        }
        argMap.set(m[1], m[2]);
    }
    return argMap;
}

const buildSpan = (json: any, content: string, inPrompt: boolean): Span => {
    const span = new Span(content);
    if (inPrompt) {
        span.classNames.add('prompt-span');
    }
    return span;
};


export const parseSpans = (json: any, inPrompt: boolean): Span[] => {
    const spans: Span[] = [];
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
            span.classNames.add(args.get('class') as string);
        }
        if (args.has('step')) {
            span.selection_index = parseInt(args.get('step') as string);
        }
        spans.push(span);
        offset = m.index + m[0].length;
    }
    if (offset < content.length) {
        const span = buildSpan(json, content.substring(offset), inPrompt);
        spans.push(span);
    }
    return spans;
}

export const parseSection = (json: any, inPrompt: boolean): Section => {
    const section = new Section();
    
    if (json['type']) {
        if (json['type'] === 'code') {
            const code = section as Code;
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
    section.spans = parseSpans({...json, ...update}, inPrompt);
    return section;
}

export const parseContent = (json: any): Content => {
    const response = new Content();
    if (json['type']) {
        response.classNames.add(json['type']);
    }
    response.children = json.sections.map((s: any) => parseSection(s, false));
    if (json['step']) {
        response.selection_index = json['step'];
    }
    return response;
}

export const parseNamedContent = (json: any, inPrompt: boolean): NamedContent => {
    const response = new NamedContent(json['label']);
    if (json['type']) {
        response.classNames.add(json['type']);
    }
    if (inPrompt) {
        response.classNames.add('prompt-named-content');
    }
    response.children = json.sections.map((c: any) => parseSection(c, inPrompt));
    if (json['step']) {
        response.selection_index = json['step'];
    }
    return response;
}

export const parsePromptExamples = (json: any): List => {
    const examples = new List();
    examples.classNames.add('prompt-list');
    examples.items = json.examples.map((e: any) => parseNamedContent(e, true));
    return examples;
}

export const parseToolDefinitions = (json: any): List => {
    const definitions = new List();
    definitions.classNames.add('prompt-list');
    definitions.items = json['tools'].map((t: any) => {
        const def = parseNamedContent(t, true);
        def.classNames.add('prompt-tool-named-content');
        return def;
    });
    return definitions;
}

export const parsePrompt = (json: any): NamedContent => {
    const prompt = new NamedContent(json.label);
    prompt.classNames.add('prompt-named-content');
    if (json['type']) {
        prompt.classNames.add(json['type']);
    }
    prompt.children = json.sections.map((s: any) => {
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
}

export const parseSentinal = (json: any): Selectable => {
    const sentinal = new Selectable();
    if (json['step']) {
        sentinal.selection_index = json['step'];
    }
    return sentinal
}

export const parseToolResponse = (json: any): Content => {
    const response = new Content();
    if (json['type']) {
        response.classNames.add(json['type']);
    }
    response.children = json['sections'].map(parseSection);
    if (json['step']) {
        response.selection_index = json['step'];
    }
    return response;
}

export const parsePromptChain = (json: any[]): Base[] => {
    return json.map((m: any) => {
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
}