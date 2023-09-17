import { python } from '@codemirror/lang-python';
import { ViewUpdate } from '@codemirror/view';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import { Code } from 'ai-construction-set';
import React, { Dispatch, ForwardedRef, MouseEvent, SetStateAction, forwardRef } from 'react';
import { styled } from 'styled-components';


type CodeSectionProps = {
    className?: string | string[];
    code: Code,
    extensions?: any[],
    selected?: boolean | Dispatch<SetStateAction<boolean>>;
    onSelected?: (selected: boolean) => void;
    onClick?: (e: MouseEvent<HTMLDivElement>) => void;
    onChange?: (value: string, viewUpdate: ViewUpdate) => void,
    editable: boolean,
    key: string
};

const CodeSectionComponent = forwardRef((
  { className, code, extensions, selected, onSelected,  onClick, onChange, editable, key}: CodeSectionProps, ref: ForwardedRef<HTMLDivElement>) => {

  const getClasses = () => {
        let classes = ['aics-code-section'];
        if (className) {
            if (typeof className === 'string') {
                classes.push(className);
            } else if (Array.isArray(className)) {
                classes = classes.concat(className);
            }
        }
        if (selected) {
            classes.push('selected');
        }
        return classes.join(' ');
  };

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if (onClick !== undefined) {
            onClick(e);
        }
    };

  let codeContent = '';
  code.spans.forEach((span) => {
    codeContent += span.content;
});

  let config: any[] = [];
  if (extensions !== undefined) {
    config = config.concat(extensions);
  }
  config.push(python());

  return (<div ref={ref} className={getClasses()} onClick={handleClick}>
      <CodeMirror
        value={codeContent}
        basicSetup={false}
        theme={vscodeDark}
        editable={editable}
        extensions={config}
        onChange={(value: string, view_update: ViewUpdate) => {
          if (onChange !== undefined) {
            onChange(value, view_update);
          }
        }}
      />
    </div>
  );
});


export const CodeSection = styled(CodeSectionComponent)`
  background-color: #303030;
  font-size: 9.5pt;
  padding: 4px;
  border-radius: 4px;
`;