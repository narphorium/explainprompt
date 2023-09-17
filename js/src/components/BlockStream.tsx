import { BlockFactoryContext, Stream } from 'ai-construction-set';
import React, { ForwardedRef, forwardRef, useContext } from 'react';
import styled from 'styled-components';
import { Pagination } from './Pagination';


interface BlockStreamProps {
    className?: string | string[];
    stream: Stream;
    page: number;
    setPage: (page: number) => void;
    key: string;
}

export const BlockStreamComponent = forwardRef(({className, stream, page, setPage}: BlockStreamProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {factory, setFactory} = useContext(BlockFactoryContext);

    let numPages = 1;
    stream.blocks.forEach((block) => {
        if (block.iteration !== undefined && block.iteration > numPages) {
            numPages = block.iteration;
        }
    });

    const getClasses = () => {
        let classes = ['aics-block-stream'];
        if (className) {
            if (typeof className === 'string') {
                classes.push(className);
            } else if (Array.isArray(className)) {
                classes = classes.concat(className);
            }
        }
        return classes.join(' ');
    };

    if (numPages > 1) {
        return <div ref={ref} className={getClasses()}>
            <label className='aics-block-stream-page-label'>{ stream.name }</label>
            <Pagination page={page} numPages={numPages} setPage={setPage} />
            <div className='aics-block-stream-content'>
            { stream.blocks.filter((block) => block.iteration === page).map((block, index) => {
                return factory?.build(block);
            }) }
            </div>
        </div>;
    } else {
        return <div ref={ref} className={getClasses()}>
            <div className='aics-block-stream-content'>
            { stream.blocks.map((block, index) => {
                return factory?.build(block);
            }) }
            </div>
        </div>;
    }
});

export const BlockStream = styled(BlockStreamComponent)`
margin-top: 4px;

.aics-block-stream .aics-block-stream-content {
    margin-left: 24px;
}
`;