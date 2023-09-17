import React, { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';
import theme from 'styled-theming';


type PaginationProps = {
    className?: string;
    page: number;
    numPages: number;
    showEnds?: boolean;
    setPage: (page: number) => void;
};

export const PaginationComponent = ({className, page, numPages, showEnds, setPage}: PaginationProps) => {

    const [btn1, setBtn1] = React.useState('');
    const [btn2, setBtn2] = React.useState('');
    const [btn3, setBtn3] = React.useState('');
    const [btn4, setBtn4] = React.useState('');


    const getClasses = () => {
        let classes = ['aics-pagination'];
        if (className) {
            if (typeof className === 'string') {
                classes.push(className);
            } else if (Array.isArray(className)) {
                classes = classes.concat(className);
            }
        }
        return classes.join(' ');
    };

    const pulseButton = (btn: string, setBtn: Dispatch<SetStateAction<string>>) => {
        setBtn('pulse1');
        setTimeout(() => {
            setBtn('');
        }, 400);
    };

    const gotoPage = React.useCallback((new_page: number) => {
        setPage(new_page);
        // new_page = Math.min(numPages,  Math.max(1, new_page));
        // if (new_page !== page) {
        //     setPage(page);
        // }
    }, [page, setPage]);

    const gotoStart = React.useCallback(() => {
        gotoPage(1);
        pulseButton(btn1, setBtn1);
    }, [page, setPage]);

    const gotoEnd = React.useCallback(() => {
        gotoPage(numPages);
        pulseButton(btn4, setBtn4);
    }, [page, setPage]);

    const previousStep = React.useCallback(() => {
        gotoPage(page - 1);
        pulseButton(btn2, setBtn2);
    }, [page, setPage]);

    const nextStep = React.useCallback(() => {
        gotoPage(page + 1);
        pulseButton(btn3, setBtn3);
    }, [page, setPage]);

    if (showEnds === true) {
        return <div className={getClasses()}>
            <button className={"button-start " + btn1} title="Return to start [home]" onClick={gotoStart}><span className="material-icons material-icons-outlined">first_page</span></button>
            <button className={"button-end " + btn2} title="Previous step [←]" onClick={previousStep}><span className="material-icons material-icons-outlined">chevron_left</span></button>
            <span className="page">{ page } of { numPages }</span>
            <button className={"button-start " + btn3} title="Next step [→]" onClick={nextStep}><span className="material-icons material-icons-outlined">chevron_right</span></button>
            <button className={"button-end " + btn4} title="Jump to end [end]" onClick={gotoEnd}><span className="material-icons material-icons-outlined">last_page</span></button>
        </div>;
    } else {
        return <div className={getClasses()}>
            <button className={"button-start button-end " + btn2} title="Previous step [←]" onClick={previousStep}><span className="material-icons material-icons-outlined">chevron_left</span></button>
            <span className="page">{ page } of { numPages }</span>
            <button className={"button-start button-end " + btn3} title="Next step [→]" onClick={nextStep}><span className="material-icons material-icons-outlined">chevron_right</span></button>
        </div>;
    }
};

const buttonBgColor = theme('mode', {
    light: '#e3e3e3',
    dark: 'rgba(255 255 255 / 7%)',
});

const buttonTextColor = theme('mode', {
    light: '#6e7071',
    dark: '#bbbec9',
});

const buttonHoverBgColor = theme('mode', {
    light: '#ccc',
    dark: 'rgba(255 255 255 / 20%)',
});

const buttonPulseBgColor = theme('mode', {
    light: '#a6a6ab',
    dark: 'rgba(255 255 255 / 30%)',
});


export const Pagination = styled(PaginationComponent)`
    text-align: left;

    .page {
        vertical-align: top;
        line-height: 22px;
        margin: 0 8px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 9pt;
    }
      
    button {
        border: 0;
        background-color: ${buttonBgColor};
        border-radius: 8px;
        color: ${buttonTextColor};
        margin: 0 1px;
        padding: 0 2px;
        height: 22px;

        span {
            font-size: 18px;
            margin: 1px 0;
        }
    }

    button.button-start {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    button.button-end {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
      
    button:hover {
        background-color: ${buttonHoverBgColor};
    }
      
    button:focus {
        outline: 0;
    }

    button.pulse1 {
        animation-name: pulse1;
        animation-duration: 0.2s;
        animation-iteration-count: 1;
        animation-direction: alternate-reverse;
        animation-timing-function: ease;
    }
      
    @keyframes pulse1 {
        0% {}
        50% {
          background-color: ${buttonPulseBgColor};
        }
        100% {}
    }
`;