import { BlockList } from 'ai-construction-set';
import styled from "styled-components";
import { promptBgColor, promptBorderColor, promptTextColor } from './NamedBlock';

export const PromptBlockList = styled(BlockList)`
    background-color: ${promptBgColor};
    border-color: ${promptBorderColor};
    color: ${promptTextColor};
`;
