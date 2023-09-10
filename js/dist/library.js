import e,{createContext as t,useReducer as s,useEffect as l,forwardRef as n,useContext as o,useState as c,useCallback as a,useRef as r,createElement as d}from"react";import{selectedVariants as i,NamedBlock as p,BlockListItem as m,BlockList as u,ContentBlock as h,ContentSection as g,ContentSpan as f,DefaultBlockFactory as b,Selectable as S,List as k,Content as N,Section as y,Code as x,SentinalView as C,Span as E,NamedContent as $,BlockFactoryContext as w,BlockStream as v}from"ai-construction-set";import{createRoot as O}from"react-dom/client";import T,{styled as _,ThemeProvider as I}from"styled-components";import M from"styled-theming";import{python as z}from"@codemirror/lang-python";import{vscodeDark as P}from"@uiw/codemirror-theme-vscode";import R from"@uiw/react-codemirror";const A=t({step:1,setStep:e=>{}}),L=t({element:void 0,setElement:e=>{}}),V=t({flag:!1,toggle:()=>{}});class j{step=1;numSteps=1}const F=(e,t)=>{switch(t.type){case"start":return{step:1,numSteps:e.numSteps};case"end":return{step:Math.max(1,e.numSteps),numSteps:e.numSteps};case"previous":return{step:Math.max(1,e.step-1),numSteps:e.numSteps};case"next":return{step:Math.min(e.numSteps,e.step+1),numSteps:e.numSteps};case"goto":return{step:Math.min(e.numSteps,Math.max(1,t.step)),numSteps:e.numSteps};default:throw new Error("Invalid action")}},J=t(null),U=t(null),q=({step:t,numSteps:n,onChange:o,children:c})=>{const[a,r]=s(F,{step:t,numSteps:n});return l((()=>{o&&o(a)}),[a]),e.createElement(J.Provider,{value:a},e.createElement(U.Provider,{value:r},c))},B=i("mode",{default:{light:"#666",dark:"#bbb"},selected:{light:"#222",dark:"#ffde98"}}),D=M("mode",{light:"#222",dark:"#ffde98"}),G=i("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),H=i("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),K='"Roboto Mono", monospace',Q=T(p)`
    color: ${B};
    background-color: ${G};
    border-color: ${H};
    font-family: ${K};

    & .aics-collapsible-block-title {
        color: ${B};
    }

    &.selected .aics-collapsible-block-title {
        color: ${D};
    }

    & .aics-collapsible-block-control {
        color: ${B};
    }
`,W=M("mode",{light:"#ccc",dark:"#595b60"}),X=T(m)`
    border-color: ${W};
    background-color: ${G};
`,Y=i("mode",{default:{light:"#222",dark:"#b3d7f8"},selected:{light:"#222",dark:"#bcdefe"}}),Z=i("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"#d8edff",dark:"rgb(60 108 194 / 24%)"}}),ee=M("mode",{light:"#222",dark:"#bcdefe"}),te=T(X)`
    color: ${Y};
    background-color: ${Z};

    &.selected .aics-content-span,
    &.selected .aics-content-section > span > label {
        color: ${ee} !important;
    }
`,se=T(u)`
    background-color: ${G};
    border-color: ${H};
    color: ${B};
`,le=_(n((({className:t,code:s,extensions:l,selected:n,onSelected:o,onClick:c,onChange:a,editable:r,key:d},i)=>{let p="";s.spans.forEach((e=>{p+=e.content}));let m=[];return void 0!==l&&(m=m.concat(l)),m.push(z()),e.createElement("div",{ref:i,className:(()=>{let e=["aics-code-section"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),n&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==c&&c(e)}},e.createElement(R,{value:p,basicSetup:!1,theme:P,editable:r,extensions:m,onChange:(e,t)=>{void 0!==a&&a(e,t)}}))})))`

`,ne=i("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),oe=i("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),ce=i("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),ae=T(h)`
    color: ${ne};
    background-color: ${oe};
    border-color: ${ce};
`,re=i("mode",{default:{light:"#222",dark:"#b3d7f8"},selected:{light:"#222",dark:"#bcdefe"}}),de=i("mode",{default:{light:"rgb(242 249 255)",dark:"#292b2f"},selected:{light:"#d8edff",dark:"rgb(60 108 194 / 24%)"}}),ie=i("mode",{default:{light:"#b4d9ff",dark:"#4a5f79"},selected:{light:"#a0c1e3",dark:"#4a5f79"}}),pe=M("mode",{light:"#222",dark:"#bcdefe"}),me=T(h)`
    color: ${re};
    background-color: ${de};
    border-color: ${ie};

    & .aics-content-section > span > label,
    & .aics-content-span {
        color: ${re} !important;
    }

    &.selected .aics-content-span,
    &.selected .aics-content-section > span > label {
        color: ${pe} !important;
    }
`,ue=M("mode",{light:"#222",dark:"#ffde98"}),he=M("mode",{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}),ge=M("mode",{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}),fe=M("mode",{light:"#222",dark:"#bcdefe"}),be=M("mode",{light:"#d8edff",dark:"rgb(60 108 194 / 24%)"}),Se=M("mode",{light:"#a0c1e3",dark:"#4a5f79"}),ke=T(h)`
    color: ${ue};
    background-color: ${he};
    border-color: ${ge};

    & a {
        color: ${ue};
    }

    &.tool-description {
        color: ${fe};
        background-color: ${be};
        border-color: ${Se};

        .aics-content-span,
        .aics-content-section > span > label {
            color: ${pe} !important;
        }

        a {
            color: ${pe};
        }
    }
`,Ne=M("mode",{light:"#222",dark:"#ffde98"}),ye=T(g)`
    color: ${B} !important;
    font-size: 10pt;
    
    & > span > label {
        color: ${B} !important;
    }

    .selected & > span > label {
        color: ${Ne} !important;
    }
`,xe=i("mode",{default:{light:"inherit",dark:"inherit"},selected:{light:"#222",dark:"#ffde98"}}),Ce=M("mode",{light:"#222",dark:"#ffde98"}),Ee=M("mode",{light:"rgb(0 0 0 / 8%)",dark:"rgb(255 255 255 / 8%)"}),$e=T(f)`
    color: ${xe};
    font-family: ${K};
    font-size: 10pt;

    .selected & {
        color: ${Ce} !important;
    }
`,we=i("mode",{default:{light:"#007fff",dark:"#7dbdff"},selected:{light:"#fff",dark:"#fff"}}),ve=i("mode",{default:{light:"rgb(0 127 255 / 10%)",dark:"rgb(84 169 255 / 20%)"},selected:{light:"rgb(82 162 244)",dark:"rgb(47 98 161)"}}),Oe=T($e)`
    color: ${we};
    background-color: ${ve};
    font-family: ${K};
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
        color: ${Ce} !important;
        background-color: ${Ee};
    }
`,Te=i("mode",{default:{light:"inherit",dark:"inherit"},selected:{light:"#fff",dark:"#ffde98"}}),_e=i("mode",{default:{light:"rgb(0 0 0 / 8%)",dark:"rgb(255 255 255 / 8%)"},selected:{light:"rgb(82 162 244)",dark:"rgb(47 98 161)"}}),Ie=T(Oe)`
    color: ${Te};
    background-color: ${_e};
`,Me=i("mode",{default:{light:"#666",dark:"#bbb"},selected:{light:"#222",dark:"#ffde98"}}),ze=i("mode",{default:{light:"rgb(0 0 0 / 8%)",dark:"rgb(255 255 255 / 8%)"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),Pe=T($e)`
    color: ${Me};
    background-color: ${ze};
    margin: 0 4px;
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-block;
`;class Re extends b{getClassNames(e,t){const s=[];return e instanceof S&&(null!==e.selection_index&&s.push("selectable"),t===e.selection_index&&s.push("selected")),s}useStep(){return o(J)}useSelected(e){const t=this.useStep(),[s,n]=c(e.selected);return l((()=>{null!=t&&n(e.selection_index===t?.step)}),[t]),{selected:s,setSelected:n}}scrollToSelected(e){return()=>{void 0!==e&&e.scrollIntoView({behavior:"smooth",block:"center"})}}scrollOnSelected(e,t){return s=>{s&&e.current&&(t(e.current),e.current.scrollIntoView({behavior:"smooth",block:"center"}))}}contentContainsSelected(e,t){let s=this.selectableContainsSelected(e,t);return e.children.forEach((e=>{this.containsSelected(e,t)&&(s=!0)})),s}sectionConstainsSelected(e,t){let s=this.selectableContainsSelected(e,t);return e.spans.forEach((e=>{this.containsSelected(e,t)&&(s=!0)})),s}selectableContainsSelected(e,t){return null!==e.selection_index&&e.selection_index<=t}listContainsSelected(e,t){let s=!1;return e.items.forEach((e=>{this.containsSelected(e,t)&&(s=!0)})),s}containsSelected(e,t){return e instanceof k?this.listContainsSelected(e,t):e instanceof N?this.contentContainsSelected(e,t):e instanceof y?this.sectionConstainsSelected(e,t):e instanceof S&&this.selectableContainsSelected(e,t)}useCollapsed(e){const{element:t,setElement:s}=o(L),n=this.useStep(),[r,d]=c(e.collapsed);l((()=>{null!=n&&d(!this.containsSelected(e,n.step))}),[n]);return{collapsed:r,toggleCollapsed:a((e=>{d(!e),s(void 0)}),[r])}}gotoStep=e=>{const t=o(U);return()=>{void 0!==t&&null!==e.selection_index&&t?.({type:"goto",step:e.selection_index})}};buildNamedContent(t,s){const l=this.useStep(),{element:n,setElement:c}=o(L),{selected:a,setSelected:d}=this.useSelected(t),{collapsed:i,toggleCollapsed:m}=this.useCollapsed(t),u=r(null);return t.classNames.has("prompt-named-content")?e.createElement(Q,{ref:u,className:this.getClassNames(t,l?.step),content:t,collapsed:i,onToggle:m,selected:a,onSelected:this.scrollOnSelected(u,c),onTransitionEnd:this.scrollToSelected(n),key:t.uuid}):e.createElement(p,{ref:u,className:this.getClassNames(t,l?.step),content:t,collapsed:i,onToggle:m,selected:a,onSelected:this.scrollOnSelected(u,c),onTransitionEnd:this.scrollToSelected(n),key:t.uuid})}buildListItem(t,s){const l=this.useStep(),{element:n,setElement:c}=o(L),{selected:a,setSelected:d}=this.useSelected(t),{collapsed:i,toggleCollapsed:p}=this.useCollapsed(t),u=r(null);return t.classNames.has("prompt-tool-named-content")?e.createElement(te,{ref:u,className:this.getClassNames(t,l?.step),content:t,collapsed:i,onToggle:p,selected:a,onSelected:this.scrollOnSelected(u,c),onTransitionEnd:this.scrollToSelected(n),key:t.uuid}):t.classNames.has("prompt-named-content")?e.createElement(X,{ref:u,className:this.getClassNames(t,l?.step),content:t,collapsed:i,onToggle:p,selected:a,onSelected:this.scrollOnSelected(u,c),onTransitionEnd:this.scrollToSelected(n),key:t.uuid}):e.createElement(m,{ref:u,className:this.getClassNames(t,l?.step),content:t,collapsed:i,onToggle:p,selected:a,onSelected:this.scrollOnSelected(u,c),onTransitionEnd:this.scrollToSelected(n),key:t.uuid})}buildContent(t,s){const l=this.useStep(),{element:n,setElement:c}=o(L),{selected:a,setSelected:d}=this.useSelected(t),i=r(null);return t.classNames.has("tool-response")?e.createElement(me,{ref:i,className:this.getClassNames(t,l?.step),content:t,selected:a,onSelected:this.scrollOnSelected(i,c),onClick:this.gotoStep(t),key:t.uuid}):e.createElement(ae,{ref:i,className:this.getClassNames(t,l?.step),content:t,selected:a,onSelected:this.scrollOnSelected(i,c),onClick:this.gotoStep(t),key:t.uuid})}buildList(t,s){const l=this.useStep();o(L);const n=r(null);return t.classNames.has("prompt-list")?e.createElement(se,{ref:n,className:this.getClassNames(t,l?.step),list:t,selected:!1,key:t.uuid}):e.createElement(u,{ref:n,className:this.getClassNames(t,l?.step),list:t,selected:!1,key:t.uuid})}buildSection(t,s){const l=this.useStep(),{element:n,setElement:c}=o(L),{selected:a,setSelected:d}=this.useSelected(t),i=r(null);return t instanceof x?e.createElement(le,{ref:i,className:this.getClassNames(t,l?.step),code:t,selected:a,editable:!1,onSelected:this.scrollOnSelected(i,c),onClick:this.gotoStep(t),key:t.uuid}):t.classNames.has("prompt-section")?e.createElement(ye,{ref:i,className:this.getClassNames(t,l?.step),section:t,selected:a,onSelected:this.scrollOnSelected(i,c),onClick:this.gotoStep(t),key:t.uuid}):e.createElement(g,{ref:i,className:this.getClassNames(t,l?.step),section:t,selected:a,onSelected:this.scrollOnSelected(i,c),onClick:this.gotoStep(t),key:t.uuid})}buildSpan(t,s){const l=this.useStep(),{element:n,setElement:c}=o(L),{selected:a,setSelected:d}=this.useSelected(t),i=r(null);return t.classNames.has("special-token")?e.createElement(Pe,{ref:i,className:this.getClassNames(t,l?.step),span:t,selected:a,onSelected:this.scrollOnSelected(i,c),onClick:this.gotoStep(t),key:t.uuid}):t.classNames.has("tool-span")||t.classNames.has("tool")?t.classNames.has("prompt-span")?e.createElement(Ie,{ref:i,className:this.getClassNames(t,l?.step),span:t,selected:a,onSelected:this.scrollOnSelected(i,c),onClick:this.gotoStep(t),key:t.uuid}):e.createElement(Oe,{ref:i,className:this.getClassNames(t,l?.step),span:t,selected:a,onSelected:this.scrollOnSelected(i,c),onClick:this.gotoStep(t),key:t.uuid}):t.classNames.has("prompt-span")?e.createElement($e,{ref:i,className:this.getClassNames(t,l?.step),span:t,selected:a,onSelected:this.scrollOnSelected(i,c),onClick:this.gotoStep(t),key:t.uuid}):e.createElement(f,{ref:i,className:this.getClassNames(t,l?.step),span:t,selected:a,onSelected:this.scrollOnSelected(i,c),onClick:this.gotoStep(t),key:t.uuid})}buildSentinal(t,s){const{element:l,setElement:n}=o(L),{selected:c,setSelected:a}=this.useSelected(t),d=r(null);return e.createElement(C,{ref:d,sentinal:t,selected:c,onSelected:this.scrollOnSelected(d,n),key:t.uuid})}}const Ae=new RegExp("<mark([^>]*)>(.*?)</mark>","gm"),Le=new RegExp('(\\w+)="([^"]*)"',"gm"),Ve=e=>{const t=new Map;let s;for(;null!==(s=Le.exec(e));)s.index===Le.lastIndex&&Le.lastIndex++,t.set(s[1],s[2]);return t},je=(e,t,s)=>{const l=new E(t);return s&&l.classNames.add("prompt-span"),l},Fe=(e,t)=>{const s=[];if("action"===e.type){const l=je(0,e.content,t);return e.step&&(l.selection_index=e.step),l.classNames.add("tool-span"),s.push(l),s}let l,n=0;const o=e.content;for(;null!==(l=Ae.exec(o));){if(l.index===Ae.lastIndex&&Ae.lastIndex++,l.index>n){const e=new E(o.substring(n,l.index));t&&e.classNames.add("prompt-span"),s.push(e)}const e=je(0,l[2],t),c=Ve(l[1]);c.has("class")&&e.classNames.add(c.get("class")),c.has("step")&&(e.selection_index=parseInt(c.get("step"))),s.push(e),n=l.index+l[0].length}if(n<o.length){const e=je(0,o.substring(n),t);s.push(e)}return s},Je=(e,t)=>{let s=new y;e.type&&s.classNames.add(e.type),t&&s.classNames.add("prompt-section"),e.step&&"action"!==e.type&&(s.selection_index=e.step);if(e.label&&(s.name=e.label),s.spans=Fe({...e},t),e.type&&"code"===e.type){const t=s;return e.language&&(t.language=e.language),t}return s},Ue=e=>{const t=new N;return e.type&&t.classNames.add(e.type),t.children=e.sections.map((e=>Je(e,!1))),e.step&&(t.selection_index=e.step),t},qe=(e,t)=>{const s=new $(e.label);return e.type&&s.classNames.add(e.type),t&&s.classNames.add("prompt-named-content"),s.children=e.sections.map((e=>Je(e,t))),e.step&&(s.selection_index=e.step),s},Be=e=>{const t=new k;return t.classNames.add("prompt-list"),t.items=e.examples.map((e=>qe(e,!0))),t},De=e=>{const t=new k;return t.classNames.add("prompt-list"),t.items=e.tools.map((e=>{const t=qe(e,!0);return t.classNames.add("prompt-tool-named-content"),t})),t},Ge=e=>{const t=new $(e.label);return t.classNames.add("prompt-named-content"),e.type&&t.classNames.add(e.type),t.children=e.sections.map((e=>{switch(e.type){case"examples":return Be(e);case"scratchpad":return qe(e,!0);case"tools":return De(e);default:return Je(e,!0)}})),t},He=e=>{const t=new S;return e.step&&(t.selection_index=e.step),t},Ke=e=>{const t=new N;return e.type&&t.classNames.add(e.type),t.children=e.sections.map(Je),e.step&&(t.selection_index=e.step),t},Qe=e=>e.map((e=>{switch(e.type){case"tool-response":return Ke(e);case"prompt":return Ge(e);case"response":return Ue(e);case"sentinal":return He(e);default:throw new Error("Unknown message type: "+e.type)}})),We=({model:t})=>{let s=()=>{const e=JSON.parse(t.get("data"));return Qe(e)},l=()=>t.get("theme");const[n,o]=c(s()),[a,r]=c(l()),[d,i]=c(new Re),[p,m]=c(1),[u,h]=c();return t.on("change:data",(()=>{o(s())})),t.on("change:theme",(()=>{r(l())})),e.createElement(I,{theme:{mode:a}},e.createElement(q,{step:p,numSteps:0,onChange:()=>{}},e.createElement(w.Provider,{value:{factory:d,setFactory:i}},e.createElement(L.Provider,{value:{element:u,setElement:h}},e.createElement(v,{blocks:n})))))},Xe=({model:e,el:t})=>{O(t).render(d(We,{model:e}))};export{ke as DescriptionBlock,ae as ModelResponse,Re as PaperBlockFactory,se as PromptBlockList,X as PromptBlockListItem,ye as PromptContentSection,$e as PromptContentSpan,Q as PromptNamedContentBlock,Ie as PromptToolContentSpan,te as PromptToolListItem,V as ScrollFlagContext,L as SelectedElementContext,A as SelectedStepContext,Pe as SpecialTokenSpan,J as StepContext,U as StepDispatchContext,q as StepProvider,F as StepReducer,j as StepState,Oe as ToolContentSpan,me as ToolResponse,Ue as parseContent,qe as parseNamedContent,Ge as parsePrompt,Qe as parsePromptChain,Be as parsePromptExamples,Je as parseSection,He as parseSentinal,Fe as parseSpans,De as parseToolDefinitions,Ke as parseToolResponse,G as promptBgColor,H as promptBorderColor,K as promptFont,W as promptListItemBorderColor,B as promptTextColor,_e as promptToolBgColor,Te as promptToolTextColor,Xe as render,xe as spanTextColor,ze as specialTokenBgColor,Me as specialTokenTextColor,ve as toolBgColor,we as toolTextColor};
