import { ContentSection } from 'ai-construction-set';
import styled from "styled-components";
import theme from 'styled-theming';
import { promptTextColor } from './NamedBlock';

const selectedLabelColor = theme('mode', {
    light: '#222',
    dark: '#ffde98',
})

export const PromptContentSection = styled(ContentSection)`
    color: ${promptTextColor} !important;
    font-size: 10pt;
    
    & > span > label {
        color: ${promptTextColor} !important;
    }

    .selected & > span > label {
        color: ${selectedLabelColor} !important;
    }
`;



