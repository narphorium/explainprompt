import { Code, Content, List, NamedContent, Section, Selectable, Span, Stream } from 'ai-construction-set';

const ANNOTATION_PATTERN = new RegExp("<mark([^>]*)>(.*?)</mark>", 'gm');
const ARGS_PATTERN = new RegExp("(\\w+)=\"([^\"]*)\"", 'gm');

type JsonData = { [name: string]: any };

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

const buildSpan = (json: JsonData, content: string, inPrompt: boolean): Span => {
    const span = new Span(content);
    if (inPrompt) {
        span.classNames.add('prompt-span');
    }
    return span;
};


export const parseSpans = (json: JsonData, inPrompt: boolean): Span[] => {
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

export const parseSection = (json: JsonData, inPrompt: boolean): Section => {
    let section = new Section();
    
    if (json['type']) {
        if (json['type'] === 'code') {
            section = new Code();
            const code = section as Code;
            if (json['language']) {
                code.language = json['language'];
            }
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

export const parseContent = (json: JsonData): Content => {
    const response = new Content();
    if (json['type']) {
        response.classNames.add(json['type']);
    }
    response.children = json.sections.map((s: any) => parseSection(s, false));
    if (json['step']) {
        response.selection_index = json['step'];
    }
    if (json['iteration']) {
        response.iteration = json['iteration'];
    }
    return response;
}

export const parseNamedContent = (json: JsonData, inPrompt: boolean): NamedContent => {
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
    if (json['iteration']) {
        response.iteration = json['iteration'];
    }
    return response;
}

export const parsePromptExamples = (json: JsonData): List => {
    const examples = new List();
    examples.classNames.add('prompt-list');
    examples.items = json.examples.map((e: any) => parseNamedContent(e, true));
    return examples;
}

export const parseToolDefinitions = (json: JsonData): List => {
    const definitions = new List();
    definitions.classNames.add('prompt-list');
    definitions.items = json['tools'].map((t: any) => {
        const def = parseNamedContent(t, true);
        def.classNames.add('prompt-tool-named-content');
        return def;
    });
    return definitions;
}

export const parsePrompt = (json: JsonData): NamedContent => {
    const prompt = new NamedContent(json.label);
    prompt.classNames.add('prompt-named-content');
    if (json['type']) {
        prompt.classNames.add(json['type']);
    }
    if (json['iteration']) {
        prompt.iteration = json['iteration'];
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

export const parseSentinal = (json: JsonData): Selectable => {
    const sentinal = new Selectable();
    if (json['step']) {
        sentinal.selection_index = json['step'];
    }
    if (json['iteration']) {
        sentinal.iteration = json['iteration'];
    }
    return sentinal
}

export const parseToolResponse = (json: JsonData): Content => {
    const response = new Content();
    if (json['type']) {
        response.classNames.add(json['type']);
    }
    response.children = json['sections'].map(parseSection);
    if (json['step']) {
        response.selection_index = json['step'];
    }
    if (json['iteration']) {
        response.iteration = json['iteration'];
    }
    return response;
}

const buildStream = (data: JsonData) => {
    const stream = new Stream();
    if (data['name']) {
        stream.name = data['name'];
    }
    stream.blocks = data['blocks'];
    return stream;
};

export const parsePromptChain = (json: JsonData, id = "1"): Stream => {
    let current_data: JsonData[] = [{'id': id, 'blocks':[]}];
    let current_current_data = current_data[current_data.length - 1];

    if (json['label']) {
        current_current_data['name'] = json['label'];
    }

    json['trajectory'].map((m: any) => {
        current_current_data = current_data[current_data.length - 1];
        if (current_data.length > 1 && m['chain']['id'] === current_data[current_data.length - 2]['id']) {
            // If we're going back up the chain, pop the current data
            const tmp = current_data.pop();
            current_current_data = current_data[current_data.length - 1];
            if (tmp && tmp['blocks'].length > 0) {
                // If there's anything in the popped data, push it to the current data
                current_current_data['blocks'].push(buildStream(tmp));
            }
        } else if (m['chain']['id'] !== current_current_data['id']) {
            // If we're going down the chain, push the current data
            
            const new_data: JsonData = {'id': m['chain']['id'], 'blocks':[]};
            if (m['label']) {
                new_data['name'] = m['label'];
            }

            current_data.push(new_data);
            current_current_data = current_data[current_data.length - 1];
        }

        switch (m.type) {
            case 'tool-response':
                current_current_data['blocks'].push(parseToolResponse(m));
                break;
            case 'prompt':
                current_current_data['blocks'].push(parsePrompt(m));
                break;
            case 'response':
                current_current_data['blocks'].push(parseContent(m));
                break;
            case 'sentinal':
                current_current_data['blocks'].push(parseSentinal(m));
                break;
            default:
                throw new Error("Unknown message type: " + m.type);
        }
    });

    return buildStream(current_current_data);
}