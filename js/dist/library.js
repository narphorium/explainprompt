import e,{createContext as t,useReducer as s,useEffect as l,forwardRef as a,useContext as n,useState as o,useCallback as c,useRef as r,createElement as i}from"react";import{selectedVariants as d,NamedBlock as m,BlockListItem as p,BlockList as u,BlockFactoryContext as h,ContentBlock as g,ContentSection as b,ContentSpan as f,DefaultBlockFactory as k,Selectable as S,List as N,Content as E,Section as C,Stream as x,SentinalView as y,Span as $,Code as v,NamedContent as w}from"ai-construction-set";import{createRoot as _}from"react-dom/client";import O,{styled as T,ThemeProvider as P}from"styled-components";import I from"styled-theming";import{python as M}from"@codemirror/lang-python";import{vscodeDark as z}from"@uiw/codemirror-theme-vscode";import A from"@uiw/react-codemirror";const j=t({step:1,setStep:e=>{}}),L=t({element:void 0,setElement:e=>{}}),R=t({flag:!1,toggle:()=>{}});class F{step=1;numSteps=1}const J=(e,t)=>{switch(t.type){case"start":return{step:1,numSteps:e.numSteps};case"end":return{step:Math.max(1,e.numSteps),numSteps:e.numSteps};case"previous":return{step:Math.max(1,e.step-1),numSteps:e.numSteps};case"next":return{step:Math.min(e.numSteps,e.step+1),numSteps:e.numSteps};case"goto":return{step:Math.min(e.numSteps,Math.max(1,t.step)),numSteps:e.numSteps};default:throw new Error("Invalid action")}},V=t(null),H=t(null),U=({step:t,numSteps:a,onChange:n,children:o})=>{const[c,r]=s(J,{step:t,numSteps:a});return l((()=>{n&&n(c)}),[c]),e.createElement(V.Provider,{value:c},e.createElement(H.Provider,{value:r},o))},q=d("mode",{default:{light:"#666",dark:"#bbb"},selected:{light:"#222",dark:"#ffde98"}}),B=I("mode",{light:"#222",dark:"#ffde98"}),D=d("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),G=d("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),K='"Roboto Mono", monospace',Q=O(m)`
    color: ${q};
    background-color: ${D};
    border-color: ${G};
    font-family: ${K};

    & .aics-collapsible-block-title {
        color: ${q};
    }

    &.selected .aics-collapsible-block-title {
        color: ${B};
    }

    & .aics-collapsible-block-control svg path {
        fill: ${q};
    }
`,W=I("mode",{light:"#ccc",dark:"#595b60"}),X=O(p)`
    border-color: ${W};
    background-color: ${D};
`,Y=d("mode",{default:{light:"#222",dark:"#b3d7f8"},selected:{light:"#222",dark:"#bcdefe"}}),Z=d("mode",{default:{light:"transparent",dark:"transparent"},selected:{light:"#d8edff",dark:"rgb(60 108 194 / 24%)"}}),ee=I("mode",{light:"#222",dark:"#bcdefe"}),te=O(X)`
    color: ${Y};
    background-color: ${Z};

    &.selected .aics-content-span,
    &.selected .aics-content-section > span > label {
        color: ${ee} !important;
    }
`,se=O(u)`
    background-color: ${D};
    border-color: ${G};
    color: ${q};
`,le=I("mode",{light:"#e3e3e3",dark:"rgba(255 255 255 / 7%)"}),ae=I("mode",{light:"#6e7071",dark:"#bbbec9"}),ne=I("mode",{light:"#ccc",dark:"rgba(255 255 255 / 20%)"}),oe=I("mode",{light:"#a6a6ab",dark:"rgba(255 255 255 / 30%)"}),ce=T((({className:t,page:s,numPages:l,showEnds:a,setPage:n})=>{const[o,c]=e.useState(""),[r,i]=e.useState(""),[d,m]=e.useState(""),[p,u]=e.useState(""),h=()=>{let e=["aics-pagination"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),e.join(" ")},g=(e,t)=>{t("pulse1"),setTimeout((()=>{t("")}),400)},b=e.useCallback((e=>{(e=Math.min(l,Math.max(1,e)))!==s&&n(e)}),[s,n]),f=e.useCallback((()=>{b(1),g(0,c)}),[s,n]),k=e.useCallback((()=>{b(l),g(0,u)}),[s,n]),S=e.useCallback((()=>{b(s-1),g(0,i)}),[s,n]),N=e.useCallback((()=>{b(s+1),g(0,m)}),[s,n]);return!0===a?e.createElement("div",{className:h()},e.createElement("button",{className:"button-start "+o,title:"Return to start [home]",onClick:f},e.createElement("span",{className:"material-icons material-icons-outlined"},"first_page")),e.createElement("button",{className:"button-end "+r,title:"Previous step [←]",onClick:S},e.createElement("span",{className:"material-icons material-icons-outlined"},"chevron_left")),e.createElement("span",{className:"page"},s," of ",l),e.createElement("button",{className:"button-start "+d,title:"Next step [→]",onClick:N},e.createElement("span",{className:"material-icons material-icons-outlined"},"chevron_right")),e.createElement("button",{className:"button-end "+p,title:"Jump to end [end]",onClick:k},e.createElement("span",{className:"material-icons material-icons-outlined"},"last_page"))):e.createElement("div",{className:h()},e.createElement("button",{className:"button-start button-end "+r,title:"Previous step [←]",onClick:S},e.createElement("span",{className:"material-icons material-icons-outlined"},"chevron_left")),e.createElement("span",{className:"page"},s," of ",l),e.createElement("button",{className:"button-start button-end "+d,title:"Next step [→]",onClick:N},e.createElement("span",{className:"material-icons material-icons-outlined"},"chevron_right")))}))`
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
        background-color: ${le};
        border-radius: 8px;
        color: ${ae};
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
        background-color: ${ne};
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
          background-color: ${oe};
        }
        100% {}
    }
`,re=a((({className:t,stream:s,page:l,setPage:a},o)=>{const{factory:c,setFactory:r}=n(h);let i=1;s.blocks.forEach((e=>{void 0!==e.iteration&&e.iteration>i&&(i=e.iteration)}));const d=()=>{let e=["aics-block-stream"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),e.join(" ")};return i>1?e.createElement("div",{ref:o,className:d()},e.createElement("label",{className:"aics-block-stream-page-label"},s.name),e.createElement(ce,{page:l,numPages:i,setPage:a}),e.createElement("div",{className:"aics-block-stream-content"},s.blocks.filter((e=>e.iteration===l)).map(((e,t)=>c?.build(e))))):e.createElement("div",{ref:o,className:d()},e.createElement("div",{className:"aics-block-stream-content"},s.blocks.map(((e,t)=>c?.build(e)))))})),ie=d("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),de=O(re)`
margin-top: 4px;

.aics-block-stream .aics-block-stream-content {
    margin-left: 24px;
}

label {
    font-size: 12px;
    color: ${ie};
    margin-right: 8px;
}

.aics-pagination {
    display: inline-block;
    vertical-align: top;
}
`,me=T(a((({className:t,code:s,extensions:l,selected:a,onSelected:n,onClick:o,onChange:c,editable:r,key:i},d)=>{let m="";s.spans.forEach((e=>{m+=e.content}));let p=[];return void 0!==l&&(p=p.concat(l)),p.push(M()),e.createElement("div",{ref:d,className:(()=>{let e=["aics-code-section"];return t&&("string"==typeof t?e.push(t):Array.isArray(t)&&(e=e.concat(t))),a&&e.push("selected"),e.join(" ")})(),onClick:e=>{void 0!==o&&o(e)}},e.createElement(A,{value:m,basicSetup:!1,theme:z,editable:r,extensions:p,onChange:(e,t)=>{void 0!==c&&c(e,t)}}))})))`
  background-color: #303030;
  font-size: 9.5pt;
  padding: 4px;
  border-radius: 4px;
`,pe=d("mode",{default:{light:"#222",dark:"#292b2f"},selected:{light:"#222",dark:"#ffde98"}}),ue=d("mode",{default:{light:"white",dark:"#292b2f"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),he=d("mode",{default:{light:"#ccc",dark:"#595b60"},selected:{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}}),ge=O(g)`
    color: ${pe};
    background-color: ${ue};
    border-color: ${he};
`,be=d("mode",{default:{light:"#222",dark:"#b3d7f8"},selected:{light:"#222",dark:"#bcdefe"}}),fe=d("mode",{default:{light:"rgb(242 249 255)",dark:"#292b2f"},selected:{light:"#d8edff",dark:"rgb(60 108 194 / 24%)"}}),ke=d("mode",{default:{light:"#b4d9ff",dark:"#4a5f79"},selected:{light:"#a0c1e3",dark:"#4a5f79"}}),Se=I("mode",{light:"#222",dark:"#bcdefe"}),Ne=O(g)`
    color: ${be};
    background-color: ${fe};
    border-color: ${ke};

    & .aics-content-section > span > label,
    & .aics-content-span {
        color: ${be} !important;
    }

    &.selected .aics-content-span,
    &.selected .aics-content-section > span > label {
        color: ${Se} !important;
    }
`,Ee=I("mode",{light:"#222",dark:"#ffde98"}),Ce=I("mode",{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}),xe=I("mode",{light:"rgb(237, 211, 137)",dark:"rgb(109 102 81)"}),ye=I("mode",{light:"#222",dark:"#bcdefe"}),$e=I("mode",{light:"#d8edff",dark:"rgb(60 108 194 / 24%)"}),ve=I("mode",{light:"#a0c1e3",dark:"#4a5f79"}),we=O(g)`
    color: ${Ee};
    background-color: ${Ce};
    border-color: ${xe};

    & a {
        color: ${Ee};
    }

    &.tool-description {
        color: ${ye};
        background-color: ${$e};
        border-color: ${ve};

        .aics-content-span,
        .aics-content-section > span > label {
            color: ${Se} !important;
        }

        a {
            color: ${Se};
        }
    }
`,_e=I("mode",{light:"#222",dark:"#ffde98"}),Oe=O(b)`
    color: ${q} !important;
    font-size: 10pt;
    
    & > span > label {
        color: ${q} !important;
    }

    .selected & > span > label {
        color: ${_e} !important;
    }
`,Te=d("mode",{default:{light:"inherit",dark:"inherit"},selected:{light:"#222",dark:"#ffde98"}}),Pe=I("mode",{light:"#222",dark:"#ffde98"}),Ie=I("mode",{light:"rgb(0 0 0 / 8%)",dark:"rgb(255 255 255 / 8%)"}),Me=O(f)`
    color: ${Te};
    font-family: ${K};
    font-size: 10pt;

    .selected & {
        color: ${Pe} !important;
    }
`,ze=d("mode",{default:{light:"#007fff",dark:"#7dbdff"},selected:{light:"#fff",dark:"#fff"}}),Ae=d("mode",{default:{light:"rgb(0 127 255 / 10%)",dark:"rgb(84 169 255 / 20%)"},selected:{light:"rgb(82 162 244)",dark:"rgb(47 98 161)"}}),je=O(Me)`
    color: ${ze};
    background-color: ${Ae};
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
        color: ${Pe} !important;
        background-color: ${Ie};
    }
`,Le=d("mode",{default:{light:"inherit",dark:"inherit"},selected:{light:"#fff",dark:"#ffde98"}}),Re=d("mode",{default:{light:"rgb(0 0 0 / 8%)",dark:"rgb(255 255 255 / 8%)"},selected:{light:"rgb(82 162 244)",dark:"rgb(47 98 161)"}}),Fe=O(je)`
    color: ${Le};
    background-color: ${Re};
`,Je=d("mode",{default:{light:"#666",dark:"#bbb"},selected:{light:"#222",dark:"#ffde98"}}),Ve=d("mode",{default:{light:"rgb(0 0 0 / 8%)",dark:"rgb(255 255 255 / 8%)"},selected:{light:"rgb(253 235 184)",dark:"rgb(73 69 61)"}}),He=O(Me)`
    color: ${Je};
    background-color: ${Ve};
    margin: 0 4px;
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-block;
`;class Ue extends k{getClassNames(e,t){const s=[];return e instanceof S&&(null!==e.selection_index&&s.push("selectable"),t===e.selection_index&&s.push("selected")),s}useStep(){return n(V)}useSelected(e){const t=this.useStep(),[s,a]=o(e.selected);return l((()=>{null!=t&&a(e.selection_index===t?.step)}),[t]),{selected:s,setSelected:a}}scrollToSelected(e){return()=>{void 0!==e&&e.scrollIntoView({behavior:"smooth",block:"center"})}}scrollOnSelected(e,t){return s=>{s&&e.current&&(t(e.current),e.current.scrollIntoView({behavior:"smooth",block:"center"}))}}getContentSelectedChildren(e,t){let s=this.getSelectableSelectedChildren(e,t);return e.children.forEach((e=>{s=s.concat(this.getSelectedChildren(e,t))})),s}getSectionSelectedChildren(e,t){let s=this.getSelectableSelectedChildren(e,t);return e.spans.forEach((e=>{s=s.concat(this.getSelectedChildren(e,t))})),s}getSelectableSelectedChildren(e,t){return e.selection_index&&e.selection_index<=t?[e]:[]}getListSelectedChildren(e,t){let s=[];return e.items.forEach((e=>{s=s.concat(this.getSelectedChildren(e,t))})),s}getStreamSelectedChildren(e,t){let s=[];return e.blocks.forEach((e=>{s=s.concat(this.getSelectedChildren(e,t))})),s}getSelectedChildren(e,t){return e instanceof N?this.getListSelectedChildren(e,t):e instanceof E?this.getContentSelectedChildren(e,t):e instanceof C?this.getSectionSelectedChildren(e,t):e instanceof S?this.getSelectableSelectedChildren(e,t):e instanceof x?this.getStreamSelectedChildren(e,t):[]}useCollapsed(e){const{element:t,setElement:s}=n(L),a=this.useStep(),[r,i]=o(e.collapsed);l((()=>{null!=a&&i(0===this.getSelectedChildren(e,a.step).length)}),[a]);return{collapsed:r,toggleCollapsed:c((e=>{i(!e),s(void 0)}),[r])}}gotoStep=e=>{const t=n(H);return()=>{void 0!==t&&null!==e.selection_index&&t?.({type:"goto",step:e.selection_index})}};buildNamedContent(t,s){const l=this.useStep(),{element:a,setElement:o}=n(L),{selected:c,setSelected:i}=this.useSelected(t),{collapsed:d,toggleCollapsed:p}=this.useCollapsed(t),u=r(null);return t.classNames.has("prompt-named-content")?e.createElement(Q,{ref:u,className:this.getClassNames(t,l?.step),content:t,collapsed:d,onToggle:p,selected:c,onSelected:this.scrollOnSelected(u,o),onTransitionEnd:this.scrollToSelected(a),key:t.uuid}):e.createElement(m,{ref:u,className:this.getClassNames(t,l?.step),content:t,collapsed:d,onToggle:p,selected:c,onSelected:this.scrollOnSelected(u,o),onTransitionEnd:this.scrollToSelected(a),key:t.uuid})}buildListItem(t,s){const l=this.useStep(),{element:a,setElement:o}=n(L),{selected:c,setSelected:i}=this.useSelected(t),{collapsed:d,toggleCollapsed:m}=this.useCollapsed(t),u=r(null);return t.classNames.has("prompt-tool-named-content")?e.createElement(te,{ref:u,className:this.getClassNames(t,l?.step),content:t,collapsed:d,onToggle:m,selected:c,onSelected:this.scrollOnSelected(u,o),onTransitionEnd:this.scrollToSelected(a),key:t.uuid}):t.classNames.has("prompt-named-content")?e.createElement(X,{ref:u,className:this.getClassNames(t,l?.step),content:t,collapsed:d,onToggle:m,selected:c,onSelected:this.scrollOnSelected(u,o),onTransitionEnd:this.scrollToSelected(a),key:t.uuid}):e.createElement(p,{ref:u,className:this.getClassNames(t,l?.step),content:t,collapsed:d,onToggle:m,selected:c,onSelected:this.scrollOnSelected(u,o),onTransitionEnd:this.scrollToSelected(a),key:t.uuid})}buildContent(t,s){const l=this.useStep(),{element:a,setElement:o}=n(L),{selected:c,setSelected:i}=this.useSelected(t),d=r(null);return t.classNames.has("tool-response")?e.createElement(Ne,{ref:d,className:this.getClassNames(t,l?.step),content:t,selected:c,onSelected:this.scrollOnSelected(d,o),onClick:this.gotoStep(t),key:t.uuid}):e.createElement(ge,{ref:d,className:this.getClassNames(t,l?.step),content:t,selected:c,onSelected:this.scrollOnSelected(d,o),onClick:this.gotoStep(t),key:t.uuid})}buildList(t,s){const l=this.useStep();n(L);const a=r(null);return t.classNames.has("prompt-list")?e.createElement(se,{ref:a,className:this.getClassNames(t,l?.step),list:t,selected:!1,key:t.uuid}):e.createElement(u,{ref:a,className:this.getClassNames(t,l?.step),list:t,selected:!1,key:t.uuid})}buildSection(t,s){const l=this.useStep(),{element:a,setElement:o}=n(L),{selected:c,setSelected:i}=this.useSelected(t),d=r(null);return t.classNames.has("code")?e.createElement(me,{ref:d,className:this.getClassNames(t,l?.step),code:t,selected:c,editable:!1,onSelected:this.scrollOnSelected(d,o),onClick:this.gotoStep(t),key:t.uuid}):t.classNames.has("prompt-section")?e.createElement(Oe,{ref:d,className:this.getClassNames(t,l?.step),section:t,selected:c,onSelected:this.scrollOnSelected(d,o),onClick:this.gotoStep(t),key:t.uuid}):e.createElement(b,{ref:d,className:this.getClassNames(t,l?.step),section:t,selected:c,onSelected:this.scrollOnSelected(d,o),onClick:this.gotoStep(t),key:t.uuid})}buildSpan(t,s){const l=this.useStep(),{element:a,setElement:o}=n(L),{selected:c,setSelected:i}=this.useSelected(t),d=r(null);return t.classNames.has("special-token")?e.createElement(He,{ref:d,className:this.getClassNames(t,l?.step),span:t,selected:c,onSelected:this.scrollOnSelected(d,o),onClick:this.gotoStep(t),key:t.uuid}):t.classNames.has("tool-span")||t.classNames.has("tool")?t.classNames.has("prompt-span")?e.createElement(Fe,{ref:d,className:this.getClassNames(t,l?.step),span:t,selected:c,onSelected:this.scrollOnSelected(d,o),onClick:this.gotoStep(t),key:t.uuid}):e.createElement(je,{ref:d,className:this.getClassNames(t,l?.step),span:t,selected:c,onSelected:this.scrollOnSelected(d,o),onClick:this.gotoStep(t),key:t.uuid}):t.classNames.has("prompt-span")?e.createElement(Me,{ref:d,className:this.getClassNames(t,l?.step),span:t,selected:c,onSelected:this.scrollOnSelected(d,o),onClick:this.gotoStep(t),key:t.uuid}):e.createElement(f,{ref:d,className:this.getClassNames(t,l?.step),span:t,selected:c,onSelected:this.scrollOnSelected(d,o),onClick:this.gotoStep(t),key:t.uuid})}buildSentinal(t,s){const{element:l,setElement:a}=n(L),{selected:o,setSelected:c}=this.useSelected(t),i=r(null);return e.createElement(y,{ref:i,sentinal:t,selected:o,onSelected:this.scrollOnSelected(i,a),key:t.uuid})}buildStream(t,s){const a=this.useStep(),[n,c]=o(1),i=r(null);return l((()=>{null!=a&&this.getSelectedChildren(t,a.step)&&t.blocks.forEach((e=>{e.iteration&&this.getSelectedChildren(e,a.step)&&c(e.iteration)}))}),[a]),e.createElement(de,{ref:i,stream:t,page:n,setPage:c,key:t.uuid})}}const qe=new RegExp("<mark([^>]*)>(.*?)</mark>","gm"),Be=new RegExp('(\\w+)="([^"]*)"',"gm"),De=e=>{const t=new Map;let s;for(;null!==(s=Be.exec(e));)s.index===Be.lastIndex&&Be.lastIndex++,t.set(s[1],s[2]);return t},Ge=(e,t,s)=>{const l=new $(t);return s&&l.classNames.add("prompt-span"),l},Ke=(e,t)=>{const s=[];if("action"===e.type){const l=Ge(0,e.content,t);return e.step&&(l.selection_index=e.step),l.classNames.add("tool-span"),s.push(l),s}let l,a=0;const n=e.content;for(;null!==(l=qe.exec(n));){if(l.index===qe.lastIndex&&qe.lastIndex++,l.index>a){const e=new $(n.substring(a,l.index));t&&e.classNames.add("prompt-span"),s.push(e)}const e=Ge(0,l[2],t),o=De(l[1]);o.has("class")&&e.classNames.add(o.get("class")),o.has("step")&&(e.selection_index=parseInt(o.get("step"))),s.push(e),a=l.index+l[0].length}if(a<n.length){const e=Ge(0,n.substring(a),t);s.push(e)}return s},Qe=(e,t)=>{let s=new C;if(e.type){if("code"===e.type){s=new v;const t=s;e.language&&(t.language=e.language)}s.classNames.add(e.type)}t&&s.classNames.add("prompt-section"),e.step&&"action"!==e.type&&(s.selection_index=e.step);return e.label&&(s.name=e.label),s.spans=Ke({...e},t),s},We=e=>{const t=new E;return e.type&&t.classNames.add(e.type),t.children=e.sections.map((e=>Qe(e,!1))),e.step&&(t.selection_index=e.step),e.iteration&&(t.iteration=e.iteration),t},Xe=(e,t)=>{const s=new w(e.label);return e.type&&s.classNames.add(e.type),t&&s.classNames.add("prompt-named-content"),s.children=e.sections.map((e=>Qe(e,t))),e.step&&(s.selection_index=e.step),e.iteration&&(s.iteration=e.iteration),s},Ye=e=>{const t=new N;return t.classNames.add("prompt-list"),t.items=e.examples.map((e=>Xe(e,!0))),t},Ze=e=>{const t=new N;return t.classNames.add("prompt-list"),t.items=e.tools.map((e=>{const t=Xe(e,!0);return t.classNames.add("prompt-tool-named-content"),t})),t},et=e=>{const t=new w(e.label);return t.classNames.add("prompt-named-content"),e.type&&t.classNames.add(e.type),e.iteration&&(t.iteration=e.iteration),t.children=e.sections.map((e=>{switch(e.type){case"examples":return Ye(e);case"scratchpad":return Xe(e,!0);case"tools":return Ze(e);default:return Qe(e,!0)}})),t},tt=e=>{const t=new S;return e.step&&(t.selection_index=e.step),e.iteration&&(t.iteration=e.iteration),t},st=e=>{const t=new E;return e.type&&t.classNames.add(e.type),t.children=e.sections.map(Qe),e.step&&(t.selection_index=e.step),e.iteration&&(t.iteration=e.iteration),t},lt=e=>{const t=new x;return e.name&&(t.name=e.name),t.blocks=e.blocks,t},at=(e,t="1")=>{let s=[{id:t,blocks:[]}],l=s[s.length-1];return e.trajectory.map((e=>{if(l=s[s.length-1],s.length>1&&e.chain.id===s[s.length-2].id){const e=s.pop();l=s[s.length-1],e&&e.blocks.length>0&&l.blocks.push(lt(e))}else if(e.chain.id!==l.id){const t={id:e.chain.id,blocks:[]};e.chain.label&&(t.name=e.chain.label),s.push(t),l=s[s.length-1]}switch(e.type){case"tool-response":l.blocks.push(st(e));break;case"prompt":l.blocks.push(et(e));break;case"response":l.blocks.push(We(e));break;case"sentinal":l.blocks.push(tt(e));break;default:throw new Error("Unknown message type: "+e.type)}})),lt(l)},nt=({model:t})=>{let s=()=>{const e=JSON.parse(t.get("data"));return at(e)},l=()=>t.get("theme");const[a,n]=o(s()),[c,r]=o(l()),[i,d]=o(new Ue),[m,p]=o(1),[u,g]=o();return t.on("change:data",(()=>{n(s())})),t.on("change:theme",(()=>{r(l())})),e.createElement(P,{theme:{mode:c}},e.createElement(U,{step:m,numSteps:0,onChange:()=>{}},e.createElement(h.Provider,{value:{factory:i,setFactory:d}},e.createElement(L.Provider,{value:{element:u,setElement:g}},e.createElement(de,{stream:a,page:1,setPage:()=>{},key:a.uuid})))))},ot=({model:e,el:t})=>{_(t).render(i(nt,{model:e}))};export{de as BlockStream,re as BlockStreamComponent,we as DescriptionBlock,ge as ModelResponse,Ue as PaperBlockFactory,se as PromptBlockList,X as PromptBlockListItem,Oe as PromptContentSection,Me as PromptContentSpan,Q as PromptNamedContentBlock,Fe as PromptToolContentSpan,te as PromptToolListItem,R as ScrollFlagContext,L as SelectedElementContext,j as SelectedStepContext,He as SpecialTokenSpan,V as StepContext,H as StepDispatchContext,U as StepProvider,J as StepReducer,F as StepState,je as ToolContentSpan,Ne as ToolResponse,We as parseContent,Xe as parseNamedContent,et as parsePrompt,at as parsePromptChain,Ye as parsePromptExamples,Qe as parseSection,tt as parseSentinal,Ke as parseSpans,Ze as parseToolDefinitions,st as parseToolResponse,D as promptBgColor,G as promptBorderColor,K as promptFont,W as promptListItemBorderColor,q as promptTextColor,Re as promptToolBgColor,Le as promptToolTextColor,ot as render,Te as spanTextColor,Ve as specialTokenBgColor,Je as specialTokenTextColor,Ae as toolBgColor,ze as toolTextColor};
//# sourceMappingURL=library.js.map
