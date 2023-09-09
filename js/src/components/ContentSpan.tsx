import { ContentSpan, selectedVariants } from 'ai-construction-set';
import styled from "styled-components";
import theme from 'styled-theming';
import { promptFont } from './NamedBlock';

export const spanTextColor = selectedVariants('mode', {
    default: { light: 'inherit', dark: 'inherit' },
    selected: { light: '#222', dark: '#ffde98' },
});

const selectedChildSpanColor = theme('mode', {
    light: '#222',
    dark: '#ffde98',
})

const selectedChildBgColor = theme('mode', {
    light: 'rgb(0 0 0 / 8%)',
    dark: 'rgb(255 255 255 / 8%)',
})

export const PromptContentSpan = styled(ContentSpan)`
    color: ${spanTextColor};
    font-family: ${promptFont};
    font-size: 10pt;

    .selected & {
        color: ${selectedChildSpanColor} !important;
    }
`;

export const toolTextColor = selectedVariants('mode', {
    default: { light: '#007fff', dark: '#7dbdff' },
    selected: { light: '#fff', dark: '#fff' },
});

export const toolBgColor = selectedVariants('mode', {
    default: { light: 'rgb(0 127 255 / 10%)', dark: 'rgb(84 169 255 / 20%)' },
    selected: { light: 'rgb(82 162 244)', dark: 'rgb(47 98 161)' },
});

export const ToolContentSpan = styled(PromptContentSpan)`
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

export const promptToolTextColor = selectedVariants('mode', {
    default: { light: 'inherit', dark: 'inherit' },
    selected: { light: '#fff', dark: '#ffde98' },
});

export const promptToolBgColor = selectedVariants('mode', {
    default: { light: 'rgb(0 0 0 / 8%)', dark: 'rgb(255 255 255 / 8%)' },
    selected: { light: 'rgb(82 162 244)', dark: 'rgb(47 98 161)' },
});

export const PromptToolContentSpan = styled(ToolContentSpan)`
    color: ${promptToolTextColor};
    background-color: ${promptToolBgColor};
`;

export const specialTokenTextColor = selectedVariants('mode', {
    default: { light: '#666', dark: '#bbb' },
    selected: { light: '#222', dark: '#ffde98' },
});

export const specialTokenBgColor = selectedVariants('mode', {
    default: { light: 'rgb(0 0 0 / 8%)', dark: 'rgb(255 255 255 / 8%)' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});

export const SpecialTokenSpan = styled(PromptContentSpan)`
    color: ${specialTokenTextColor};
    background-color: ${specialTokenBgColor};
    margin: 0 4px;
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-block;
`;