import { Base, Content, List, NamedContent, Section, Selectable, Span } from 'ai-construction-set';
export declare const parseSpans: (json: any, inPrompt: boolean) => Span[];
export declare const parseSection: (json: any, inPrompt: boolean) => Section;
export declare const parseContent: (json: any) => Content;
export declare const parseNamedContent: (json: any, inPrompt: boolean) => NamedContent;
export declare const parsePromptExamples: (json: any) => List;
export declare const parseToolDefinitions: (json: any) => List;
export declare const parsePrompt: (json: any) => NamedContent;
export declare const parseSentinal: (json: any) => Selectable;
export declare const parseToolResponse: (json: any) => Content;
export declare const parsePromptChain: (json: any[]) => Base[];
