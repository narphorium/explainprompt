import { Content, List, NamedContent, Section, Selectable, Span, Stream } from 'ai-construction-set';
type JsonData = {
    [name: string]: any;
};
export declare const parseSpans: (json: JsonData, inPrompt: boolean) => Span[];
export declare const parseSection: (json: JsonData, inPrompt: boolean) => Section;
export declare const parseContent: (json: JsonData) => Content;
export declare const parseNamedContent: (json: JsonData, inPrompt: boolean) => NamedContent;
export declare const parsePromptExamples: (json: JsonData) => List;
export declare const parseToolDefinitions: (json: JsonData) => List;
export declare const parsePrompt: (json: JsonData) => NamedContent;
export declare const parseSentinal: (json: JsonData) => Selectable;
export declare const parseToolResponse: (json: JsonData) => Content;
export declare const parsePromptChain: (json: JsonData, id?: string) => Stream;
export {};
