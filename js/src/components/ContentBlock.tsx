import { ContentBlock, selectedVariants } from 'ai-construction-set';
import styled from "styled-components";
import theme from 'styled-theming';

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

export const ModelResponse = styled(ContentBlock)`
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

export const ToolResponse = styled(ContentBlock)`
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

const descriptionTextColor = theme('mode',  {
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

export const DescriptionBlock = styled(ContentBlock)`
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