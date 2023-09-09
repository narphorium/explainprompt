import { BlockListItem, NamedBlock, selectedVariants } from 'ai-construction-set';
import styled from "styled-components";
import theme from 'styled-theming';


export const promptTextColor = selectedVariants('mode', {
    default: { light: '#666', dark: '#bbb' },
    selected: { light: '#222', dark: '#ffde98' },
});

const selectedTextColor = theme('mode', {
    light: '#222',
    dark: '#ffde98',
})

export const promptBgColor = selectedVariants('mode', {
    default: { light: 'transparent', dark: 'transparent' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' },
});

export const promptBorderColor = selectedVariants('mode', {
    default: { light: '#ccc', dark: '#595b60' },
    selected: { light: 'rgb(237, 211, 137)', dark: 'rgb(109 102 81)' },
});

export const promptFont = '"Roboto Mono", monospace';

export const PromptNamedContentBlock = styled(NamedBlock)`
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

export const promptListItemBorderColor = theme('mode', {
    light: '#ccc', 
    dark: '#595b60',
});

export const PromptBlockListItem = styled(BlockListItem)`
    border-color: ${promptListItemBorderColor};
    background-color: ${promptBgColor};
`;

const promptToolTextColor = selectedVariants('mode', {
    default: { light: '#222', dark: '#b3d7f8' },
    selected: { light: '#222', dark: '#bcdefe' },
});

const promptToolBgColor = selectedVariants('mode', {
    default: { light: 'transparent', dark: 'transparent' },
    selected: { light: '#d8edff', dark: 'rgb(60 108 194 / 24%)' },
});

const promptToolSelectedTextColor = theme('mode', {
    light: '#222', 
    dark: '#bcdefe'
});

export const PromptToolListItem = styled(PromptBlockListItem)`
    color: ${promptToolTextColor};
    background-color: ${promptToolBgColor};

    &.selected .aics-content-span,
    &.selected .aics-content-section > span > label {
        color: ${promptToolSelectedTextColor} !important;
    }
`;