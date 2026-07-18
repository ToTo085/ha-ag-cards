const e="0.6.0",t="Jost, sans-serif";function i(e,t,i,a){var o,n=arguments.length,r=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const a=globalThis,o=a.ShadowRoot&&(void 0===a.ShadyCSS||a.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap;let s=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const l=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new s(i,e,n)},c=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,n))(t)})(e):e,{is:d,defineProperty:u,getOwnPropertyDescriptor:h,getOwnPropertyNames:m,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,_=globalThis,f=_.trustedTypes,v=f?f.emptyScript:"",b=_.reactiveElementPolyfillSupport,y=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},$=(e,t)=>!d(e,t),w={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&u(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:o}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const n=a?.call(this);o?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...m(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(c(e))}else void 0!==e&&t.push(c(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(o)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of t){const t=document.createElement("style"),o=a.litNonce;void 0!==o&&t.setAttribute("nonce",o),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=a;const n=o.fromAttribute(t,e.type);this[a]=n??this._$Ej?.get(a)??n,this._$Em=null}}requestUpdate(e,t,i,a=!1,o){if(void 0!==e){const n=this.constructor;if(!1===a&&(o=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??$)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[y("elementProperties")]=new Map,A[y("finalized")]=new Map,b?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.1.2");const C=globalThis,E=e=>e,z=C.trustedTypes,S=z?z.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,H="?"+M,P=`<${H}>`,T=document,O=()=>T.createComment(""),U=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,L="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,j=/>/g,W=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),G=/'/g,I=/"/g,V=/^(?:script|style|textarea|title)$/i,q=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),F=q(1),B=q(2),K=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),Z=new WeakMap,Y=T.createTreeWalker(T,129);function Q(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const X=(e,t)=>{const i=e.length-1,a=[];let o,n=2===t?"<svg>":3===t?"<math>":"",r=N;for(let t=0;t<i;t++){const i=e[t];let s,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===N?"!--"===l[1]?r=R:void 0!==l[1]?r=j:void 0!==l[2]?(V.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=W):void 0!==l[3]&&(r=W):r===W?">"===l[0]?(r=o??N,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,s=l[1],r=void 0===l[3]?W:'"'===l[3]?I:G):r===I||r===G?r=W:r===R||r===j?r=N:(r=W,o=void 0);const u=r===W&&e[t+1].startsWith("/>")?" ":"";n+=r===N?i+P:c>=0?(a.push(s),i.slice(0,c)+k+i.slice(c)+M+u):i+M+(-2===c?t:u)}return[Q(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class ee{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let o=0,n=0;const r=e.length-1,s=this.parts,[l,c]=X(e,t);if(this.el=ee.createElement(l,i),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=Y.nextNode())&&s.length<r;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(k)){const t=c[n++],i=a.getAttribute(e).split(M),r=/([.?@])?(.*)/.exec(t);s.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?ne:"?"===r[1]?re:"@"===r[1]?se:oe}),a.removeAttribute(e)}else e.startsWith(M)&&(s.push({type:6,index:o}),a.removeAttribute(e));if(V.test(a.tagName)){const e=a.textContent.split(M),t=e.length-1;if(t>0){a.textContent=z?z.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],O()),Y.nextNode(),s.push({type:2,index:++o});a.append(e[t],O())}}}else if(8===a.nodeType)if(a.data===H)s.push({type:2,index:o});else{let e=-1;for(;-1!==(e=a.data.indexOf(M,e+1));)s.push({type:7,index:o}),e+=M.length-1}o++}}static createElement(e,t){const i=T.createElement("template");return i.innerHTML=e,i}}function te(e,t,i=e,a){if(t===K)return t;let o=void 0!==a?i._$Co?.[a]:i._$Cl;const n=U(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=o:i._$Cl=o),void 0!==o&&(t=te(e,o._$AS(e,t.values),o,a)),t}class ie{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??T).importNode(t,!0);Y.currentNode=a;let o=Y.nextNode(),n=0,r=0,s=i[0];for(;void 0!==s;){if(n===s.index){let t;2===s.type?t=new ae(o,o.nextSibling,this,e):1===s.type?t=new s.ctor(o,s.name,s.strings,this,e):6===s.type&&(t=new le(o,this,e)),this._$AV.push(t),s=i[++r]}n!==s?.index&&(o=Y.nextNode(),n++)}return Y.currentNode=T,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ae{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=te(this,e,t),U(e)?e===J||null==e||""===e?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=ee.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new ie(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new ee(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const o of e)a===t.length?t.push(i=new ae(this.O(O()),this.O(O()),this,this.options)):i=t[a],i._$AI(o),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=E(e).nextSibling;E(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}let oe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,o){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=J}_$AI(e,t=this,i,a){const o=this.strings;let n=!1;if(void 0===o)e=te(this,e,t,0),n=!U(e)||e!==this._$AH&&e!==K,n&&(this._$AH=e);else{const a=e;let r,s;for(e=o[0],r=0;r<o.length-1;r++)s=te(this,a[i+r],t,r),s===K&&(s=this._$AH[r]),n||=!U(s)||s!==this._$AH[r],s===J?e=J:e!==J&&(e+=(s??"")+o[r+1]),this._$AH[r]=s}n&&!a&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};class ne extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}}class re extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}}class se extends oe{constructor(e,t,i,a,o){super(e,t,i,a,o),this.type=5}_$AI(e,t=this){if((e=te(this,e,t,0)??J)===K)return;const i=this._$AH,a=e===J&&i!==J||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==J&&(i===J||a);a&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}let le=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){te(this,e)}};const ce=C.litHtmlPolyfillSupport;ce?.(ee,ae),(C.litHtmlVersions??=[]).push("3.3.3");const de=globalThis;let ue=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let o=a._$litPart$;if(void 0===o){const e=i?.renderBefore??null;a._$litPart$=o=new ae(t.insertBefore(O(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}};ue._$litElement$=!0,ue.finalized=!0,de.litElementHydrateSupport?.({LitElement:ue});const he=de.litElementPolyfillSupport;he?.({LitElement:ue}),(de.litElementVersions??=[]).push("4.2.2");const me=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:$},ge=(e=pe,t,i)=>{const{kind:a,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,o,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const o=this[a];t.call(this,i),this.requestUpdate(a,o,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function _e(e){return(t,i)=>"object"==typeof i?ge(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function fe(e){return _e({...e,state:!0,attribute:!1})}const ve=1,be=e=>(...t)=>({_$litDirective$:e,values:t});let ye=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const xe="important",$e=" !"+xe,we=be(class extends ye{constructor(e){if(super(e),e.type!==ve||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const a=e[i];return null==a?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${a};`},"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(const e in t){const a=t[e];if(null!=a){this.ft.add(e);const t="string"==typeof a&&a.endsWith($e);e.includes("-")||t?i.setProperty(e,t?a.slice(0,-11):a,t?xe:""):i[e]=a}}return K}});var Ae,Ce;function Ee(){return(Ee=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a])}return e}).apply(this,arguments)}!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Ae||(Ae={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Ce||(Ce={}));var ze=function(e,t,i){var a=t?function(e){switch(e.number_format){case Ae.comma_decimal:return["en-US","en"];case Ae.decimal_comma:return["de","es","it"];case Ae.space_comma:return["fr","sv","cs"];case Ae.system:return;default:return e.language}}(t):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},(null==t?void 0:t.number_format)!==Ae.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(a,Se(e,i)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,Se(e,i)).format(Number(e))}return"string"==typeof e?e:function(e,t){return void 0===t&&(t=2),Math.round(e*Math.pow(10,t))/Math.pow(10,t)}(e,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")},Se=function(e,t){var i=Ee({maximumFractionDigits:2},t);if("string"!=typeof e)return i;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){var a=e.indexOf(".")>-1?e.split(".")[1].length:0;i.minimumFractionDigits=a,i.maximumFractionDigits=a}return i},ke=["closed","locked","off"],Me=function(e,t,i,a){a=a||{},i=null==i?{}:i;var o=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return o.detail=i,e.dispatchEvent(o),o},He=new Set(["call-service","divider","section","weblink","cast","select"]),Pe={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},Te=function(e){Me(window,"haptic",e)},Oe=function(e,t,i,a){if(a||(a={action:"more-info"}),!a.confirmation||a.confirmation.exemptions&&a.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(Te("warning"),confirm(a.confirmation.text||"Are you sure you want to "+a.action+"?")))switch(a.action){case"more-info":(i.entity||i.camera_image)&&Me(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":a.navigation_path&&function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),Me(window,"location-changed",{replace:i})}(0,a.navigation_path);break;case"url":a.url_path&&window.open(a.url_path);break;case"toggle":i.entity&&(function(e,t){(function(e,t,i){void 0===i&&(i=!0);var a,o=function(e){return e.substr(0,e.indexOf("."))}(t),n="group"===o?"homeassistant":o;switch(o){case"lock":a=i?"unlock":"lock";break;case"cover":a=i?"open_cover":"close_cover";break;default:a=i?"turn_on":"turn_off"}e.callService(n,a,{entity_id:t})})(e,t,ke.includes(e.states[t].state))}(t,i.entity),Te("success"));break;case"call-service":if(!a.service)return void Te("failure");var o=a.service.split(".",2);t.callService(o[0],o[1],a.service_data,a.target),Te("success");break;case"fire-dom-event":Me(e,"ll-custom",a)}};function Ue(e){return void 0!==e&&"none"!==e.action}function De(e){window.customCards=window.customCards||[],window.customCards.find(t=>t.type===e.type)||window.customCards.push({preview:!0,...e})}class Le extends HTMLElement{constructor(){super(...arguments),this.holdTime=500,this.held=!1,this.cancelled=!1}connectedCallback(){["touchcancel","mouseout","mouseup","touchmove","wheel","scroll"].forEach(e=>{document.addEventListener(e,()=>{this.cancelled=!0,this.timer&&(clearTimeout(this.timer),this.timer=void 0)},{passive:!0})})}bind(e,t={}){e.actionHandler&&((e,t)=>!!e&&!!t&&e.hasHold===t.hasHold&&e.hasDoubleClick===t.hasDoubleClick)(t,e.actionHandler.options)||(e.actionHandler?(e.removeEventListener("touchstart",e.actionHandler.start),e.removeEventListener("touchend",e.actionHandler.end),e.removeEventListener("touchcancel",e.actionHandler.end),e.removeEventListener("mousedown",e.actionHandler.start),e.removeEventListener("click",e.actionHandler.end),e.removeEventListener("keydown",e.actionHandler.handleKeyDown)):e.addEventListener("contextmenu",e=>{const t=e||window.event;return t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0,t.returnValue=!1,!1}),e.actionHandler={options:t},e.actionHandler.start=()=>{this.cancelled=!1,t.hasHold&&(this.held=!1,this.timer=window.setTimeout(()=>{this.held=!0},this.holdTime))},e.actionHandler.end=e=>{if(["touchend","touchcancel"].includes(e.type)&&this.cancelled)return;const i=e.target;e.cancelable&&e.preventDefault(),t.hasHold&&(clearTimeout(this.timer),this.timer=void 0),t.hasHold&&this.held?Me(i,"action",{action:"hold"}):t.hasDoubleClick?"click"===e.type&&e.detail<2||!this.dblClickTimeout||this.dblClickTarget!==i?(this.dblClickTarget=i,this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,Me(i,"action",{action:"tap"})},250)):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,Me(i,"action",{action:"double_tap"})):Me(i,"action",{action:"tap"})},e.actionHandler.handleKeyDown=e=>{["Enter"," "].includes(e.key)&&e.currentTarget.actionHandler.end(e)},e.addEventListener("touchstart",e.actionHandler.start,{passive:!0}),e.addEventListener("touchend",e.actionHandler.end),e.addEventListener("touchcancel",e.actionHandler.end),e.addEventListener("mousedown",e.actionHandler.start,{passive:!0}),e.addEventListener("click",e.actionHandler.end),e.addEventListener("keydown",e.actionHandler.handleKeyDown))}}var Ne,Re;Ne="action-handler",Re=Le,customElements.get(Ne)||customElements.define(Ne,Re);const je=(e,t)=>{(()=>{const e=document.body,t=e.querySelector("action-handler");if(t)return t;const i=document.createElement("action-handler");return e.appendChild(i),i})().bind(e,t)},We=be(class extends ye{update(e,[t]){return je(e.element,t),K}render(e){}});class Ge extends ue{constructor(){super(...arguments),this._handleAction=e=>{this.hass&&this._config&&e.detail?.action&&function(e,t,i,a){var o;"double_tap"===a&&i.double_tap_action?o=i.double_tap_action:"hold"===a&&i.hold_action?o=i.hold_action:"tap"===a&&i.tap_action&&(o=i.tap_action),Oe(e,t,i,o)}(this,this.hass,this._actionConfig(),e.detail.action)}}getCardSize(){return 3}getGridOptions(){return{rows:3,columns:6,min_rows:2}}shouldUpdate(e){return!!this._config&&(e.has("_config")||e.has("hass"))}_actionConfig(){return this._config??{}}_actionHandlerDirective(){const e=this._actionConfig();return We({hasHold:Ue(e.hold_action),hasDoubleClick:Ue(e.double_tap_action)})}_hasAnyAction(){const e=this._actionConfig();return Ue(e.tap_action??{action:"more-info"})||Ue(e.hold_action)||Ue(e.double_tap_action)}}i([_e({attribute:!1})],Ge.prototype,"hass",void 0),i([fe()],Ge.prototype,"_config",void 0);const Ie="ag-entity-card",Ve=`${Ie}-editor`,qe={name:"",value_font:t};let Fe=class extends ue{constructor(){super(...arguments),this._schema=[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"value_font",selector:{text:{}}},{name:"",type:"expandable",title:"Azioni",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]}],this._computeLabel=e=>({entity:"Entità",name:"Nome",icon:"Icona",value_font:"Font",tap_action:"Azione al tap",hold_action:"Azione alla pressione prolungata",double_tap_action:"Azione al doppio tap"}[e.name]??e.title??e.name),this._computeHelper=e=>"value_font"===e.name?"Font di nome e stato. Default 'Jost, sans-serif'; scrivi 'inherit' per usare il font del tema. Il font va caricato dal tema HA, la card non può caricarlo da sé.":void 0}setConfig(e){this._config=e}_valueChanged(e){const t=e.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?F`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:J}};i([_e({attribute:!1})],Fe.prototype,"hass",void 0),i([fe()],Fe.prototype,"_config",void 0),Fe=i([me(Ve)],Fe);let Be=class extends Ge{static async getConfigElement(){return document.createElement(Ve)}static getStubConfig(){return{type:`custom:${Ie}`,entity:"sun.sun"}}setConfig(e){if(!e)throw new Error("Configurazione non valida");if(!e.entity)throw new Error("Specifica un'entità da visualizzare (campo 'entity')");this._config={...qe,...e}}getGridOptions(){return{rows:1,columns:6,min_rows:1}}render(){if(!this._config||!this.hass)return J;const e=this._config.entity,t=e?this.hass.states[e]:void 0,i=this._config.name||t?.attributes.friendly_name||e||"",a=this._hasAnyAction(),o=this._config.value_font?.trim(),n=we(o?{"--ag-value-font":o}:{});if(!t)return F`
        <ha-card
          class=${a?"interactive":""}
          style=${n}
          @action=${this._handleAction}
          .actionHandler=${this._actionHandlerDirective()}
        >
          <div class="content">
            <ha-icon class="icon unavailable" .icon=${this._config.icon||"mdi:alert-circle-outline"}></ha-icon>
            <span class="name">${i}</span>
            <span class="state unavailable">non disponibile</span>
          </div>
        </ha-card>
      `;const r=this._config.icon||t.attributes.icon,s=t.attributes.unit_of_measurement,l="unavailable"===t.state||"unknown"===t.state,c=this.hass.localize(`component.${t.entity_id.split(".")[0]}.entity_component._.state.${t.state}`)||`${t.state}${s?` ${s}`:""}`;return F`
      <ha-card
        class=${a?"interactive":""}
        style=${n}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content">
          <ha-state-icon
            class="icon"
            .hass=${this.hass}
            .stateObj=${t}
            .icon=${r}
          ></ha-state-icon>
          <span class="name">${i}</span>
          <span class="state ${l?"unavailable":""}">${c}</span>
        </div>
      </ha-card>
    `}};Be.styles=l`
    ha-card.interactive {
      cursor: pointer;
    }
    /* Vedi ag-bar-card: il contenitore che ha uno spazio proprio azzera
       --ag-item-padding-x, così le righe si allineano al titolo. */
    .content {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px var(--ag-item-padding-x, 16px);
    }
    .icon {
      color: var(--state-icon-color, var(--primary-color));
      flex: 0 0 auto;
    }
    .name {
      font-family: var(--ag-value-font, inherit);
      font-weight: 600;
      color: var(--primary-text-color);
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .state {
      font-family: var(--ag-value-font, inherit);
      color: var(--primary-color);
      font-weight: 500;
      flex: 0 0 auto;
    }
    .unavailable {
      color: var(--secondary-text-color);
      font-weight: 400;
    }
  `,Be=i([me(Ie)],Be),De({type:Ie,name:"AG Entity Card",description:"Mostra icona, nome e stato di una singola entità.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const Ke="ag-battery-card",Je=`${Ke}-editor`,Ze={level_warning:50,level_alarm:20,idle_power:50,title_size:15},Ye={name:"",invert_power:!1,title_font:"",value_font:t,...Ze},Qe={normal:"var(--accent-color, #ff9800)",charging:"var(--success-color, #43a047)",warning:"var(--warning-color, #ffa600)",alarm:"var(--error-color, #db4437)"},Xe="var(--disabled-text-color, #bdbdbd)";function et(e,t=["on"]){const i=(e??"").split(",").map(e=>e.trim().toLowerCase()).filter(Boolean);return i.length?i:t}function tt(e,t){return void 0===e||""===e||"unavailable"===e||"unknown"===e?"unavailable":t.includes(e.toLowerCase())?"ok":"off"}function it(e){if(void 0===e||""===e)return;const t=Number(e);return Number.isFinite(t)?t:void 0}const at={mW:.001,W:1,kW:1e3,MW:1e6,GW:1e9,TW:1e12};function ot(e,t){const i=(t??"W").trim();if(i in at)return e*at[i];const a=i.toLowerCase();return"w"===a?e:"kw"===a?1e3*e:void 0}function nt(e,t){const i=Math.abs(e);return i>=1e3?`${ze(i/1e3,t,{minimumFractionDigits:2,maximumFractionDigits:2})} kW`:`${ze(i,t,{maximumFractionDigits:0})} W`}const rt=2*Math.PI*42;let st=class extends ue{constructor(){super(...arguments),this._schema=[{name:"battery_entity",required:!0,selector:{entity:{}}},{name:"power_entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"",type:"expandable",title:"Rete e backup",icon:"mdi:transmission-tower",schema:[{name:"backup_entity",selector:{entity:{}}},{name:"backup_ok_states",selector:{text:{}}},{name:"grid_entity",selector:{entity:{}}},{name:"grid_ok_states",selector:{text:{}}}]},{name:"",type:"expandable",title:"Soglie",icon:"mdi:tune",schema:[{name:"",type:"grid",schema:[{name:"level_warning",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}},{name:"level_alarm",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}}]},{name:"idle_power",selector:{number:{min:0,step:5,mode:"box",unit_of_measurement:"W"}}},{name:"invert_power",selector:{boolean:{}}}]},{name:"",type:"expandable",title:"Aspetto",icon:"mdi:palette",schema:[{name:"",type:"grid",schema:[{name:"title_font",selector:{text:{}}},{name:"title_size",selector:{number:{min:10,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}]},{name:"value_font",selector:{text:{}}},{name:"color_normal",selector:{text:{}}},{name:"color_charging",selector:{text:{}}},{name:"color_warning",selector:{text:{}}},{name:"color_alarm",selector:{text:{}}}]},{name:"",type:"expandable",title:"Azioni",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]}],this._computeLabel=e=>({battery_entity:"Entità carica (%)",power_entity:"Entità potenza",name:"Nome",backup_entity:"Entità gateway backup",backup_ok_states:"Stati backup considerati OK",grid_entity:"Entità rete",grid_ok_states:"Stati rete considerati OK",level_warning:"Soglia warning",level_alarm:"Soglia allarme",idle_power:"Soglia potenza in attesa",invert_power:"Inverti segno potenza",title_font:"Font del titolo",title_size:"Dimensione titolo",value_font:"Font di percentuale e righe",color_normal:"Colore normale",color_charging:"Colore in carica",color_warning:"Colore warning",color_alarm:"Colore allarme",tap_action:"Azione al tap",hold_action:"Azione alla pressione prolungata",double_tap_action:"Azione al doppio tap"}[e.name]??e.title??e.name),this._computeHelper=e=>{const t="Vuoto = colore del tema. Accetta CSS: #ff9800, red, var(--mia-var).",i="Elenco separato da virgola. Vuoto = convenzione HA: 'on' = OK.";return{power_entity:"Positiva in carica, negativa in scarica (usa l'inversione se è al contrario).",backup_ok_states:i,grid_ok_states:i,idle_power:"Sotto questo valore assoluto la batteria è considerata 'in attesa'.",invert_power:"Da attivare se la potenza è negativa durante la carica.",title_font:"Vuoto = font del tema. Es: 'Cormorant Garamond', serif — il font va caricato dal tema HA, la card non può caricarlo da sé.",title_size:"Dimensione del titolo. I serif da display stanno meglio sui 17-18px.",value_font:"Font della percentuale e delle righe di stato. Default 'Jost, sans-serif'; scrivi 'inherit' per usare il font del tema.",color_normal:t,color_charging:t,color_warning:t,color_alarm:t}[e.name]}}setConfig(e){this._config=e}_valueChanged(e){const t=e.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?F`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:J}};i([_e({attribute:!1})],st.prototype,"hass",void 0),i([fe()],st.prototype,"_config",void 0),st=i([me(Je)],st);const lt={charging:"mdi:flash",discharging:"mdi:flash-outline",idle:"mdi:pause-circle-outline"};let ct=class extends Ge{static async getConfigElement(){return document.createElement(Je)}static getStubConfig(e){const t=t=>e&&Object.keys(e.states).find(i=>i.startsWith("sensor.")&&e.states[i].attributes.device_class===t)||"";return{type:`custom:${Ke}`,battery_entity:t("battery"),power_entity:t("power")}}setConfig(e){if(!e)throw new Error("Configurazione non valida");if(!e.battery_entity)throw new Error("Specifica l'entità della carica batteria (campo 'battery_entity')");if(!e.power_entity)throw new Error("Specifica l'entità della potenza batteria (campo 'power_entity')");const t=Object.fromEntries(Object.entries(e).filter(([,e])=>void 0!==e));this._config={...Ye,...t}}getCardSize(){return 2}getGridOptions(){return{rows:2,columns:6,min_rows:2,min_columns:3}}_actionConfig(){const e=this._config;return{entity:e?.battery_entity,tap_action:e?.tap_action,hold_action:e?.hold_action,double_tap_action:e?.double_tap_action}}_color(e){const t=this._config,i="charging"===e?t?.color_charging:"warning"===e?t?.color_warning:"alarm"===e?t?.color_alarm:t?.color_normal;return i?.trim()||Qe[e]}render(){if(!this._config||!this.hass)return J;const e=this._config,t=e.battery_entity?this.hass.states[e.battery_entity]:void 0,i=e.power_entity?this.hass.states[e.power_entity]:void 0,a=e.name||t?.attributes.friendly_name||e.battery_entity||"Batteria",o=this._hasAnyAction();if(!t||!i)return F`
        <ha-card
          class=${o?"interactive":""}
          @action=${this._handleAction}
          .actionHandler=${this._actionHandlerDirective()}
        >
          <div class="content">
            <div class="info">
              <div class="title">${a}</div>
              <div class="row muted">
                <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                <span>Entità non disponibile</span>
              </div>
            </div>
          </div>
        </ha-card>
      `;const n=it(t.state),r=void 0!==n,s=r?Math.min(100,Math.max(0,n)):0,l=e.level_warning??Ze.level_warning,c=e.level_alarm??Ze.level_alarm,d=r?function(e,t,i){return e<i?"alarm":e<t?"warning":"normal"}(s,l,c):"normal",u=r?this._color(d):Xe,h=it(i.state),m=void 0===h?void 0:ot(h,i.attributes.unit_of_measurement),p=void 0===m?void 0:e.invert_power?-m:m,g=Math.abs(e.idle_power??Ze.idle_power),_=void 0===p?void 0:function(e,t){return e>t?"charging":e<-t?"discharging":"idle"}(p,g),f="charging"===_?this._color("charging"):"discharging"===_?u:"idle"===_?this._color("normal"):Xe,v=_?lt[_]:"mdi:help-circle-outline",b=void 0===p||void 0===_?"Potenza non disponibile":"idle"===_?"In attesa":`${"charging"===_?"In carica":"In scarica"} · ${nt(p,this.hass.locale)}`,y=function(e,t){if(void 0!==e||void 0!==t)return"unavailable"===e?{severity:"alarm",message:"Sistema di backup non disponibile",icon:"mdi:alert-circle"}:"off"===e?{severity:"alarm",message:"Anomalia sistema di backup",icon:"mdi:alert-circle"}:"unavailable"===t?{severity:"alarm",message:"Stato rete non disponibile",icon:"mdi:alert-circle"}:"off"===t?{severity:"warning",message:"Rete assente · funzionamento a isola",icon:"mdi:transmission-tower-off"}:"ok"===e&&"ok"===t?{severity:"normal",message:"Rete presente · backup pronto",icon:"mdi:transmission-tower"}:"ok"===t?{severity:"normal",message:"Rete presente",icon:"mdi:transmission-tower"}:{severity:"normal",message:"Backup pronto",icon:"mdi:shield-check"}}(e.backup_entity?tt(this.hass.states[e.backup_entity]?.state,et(e.backup_ok_states)):void 0,e.grid_entity?tt(this.hass.states[e.grid_entity]?.state,et(e.grid_ok_states)):void 0),x=y?.severity??"normal",$=e.title_font?.trim(),w=e.value_font?.trim(),A=we({"--ag-gauge-color":u,"--ag-flow-color":f,"--ag-tint":this._color(x),"--ag-title-size":`${e.title_size??Ze.title_size}px`,...$?{"--ag-title-font":$}:{},...w?{"--ag-value-font":w}:{}});return F`
      <ha-card
        class="${x}${o?" interactive":""}"
        style=${A}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content">
          <div
            class="gauge"
            role="meter"
            aria-label="Carica batteria"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${r?Math.round(s):J}
            aria-valuetext=${r?`${Math.round(s)}%`:"non disponibile"}
          >
            <svg viewBox="0 0 100 100" aria-hidden="true">
              ${function(e){const t=void 0===e?0:Math.min(100,Math.max(0,e));return B`
    <circle class="ring-track" cx="50" cy="50" r="${42}"></circle>
    ${t>0?B`<circle
            class="ring-value"
            cx="50"
            cy="50"
            r="${42}"
            stroke-dasharray="${rt}"
            stroke-dashoffset="${rt*(1-t/100)}"
            transform="rotate(-90 50 50)"
          ></circle>`:J}
  `}(r?s:void 0)}
            </svg>
            <div class="gauge-label" aria-hidden="true">
              <span class="gauge-value"
                >${r?F`${Math.round(s)}<span class="pct">%</span>`:"–"}</span
              >
            </div>
          </div>

          <div class="info">
            <div class="title" title=${a}>${a}</div>
            <div class="row flow">
              <ha-icon .icon=${v}></ha-icon>
              <span>${b}</span>
            </div>
            ${y?F`
                  <div class="row system">
                    <ha-icon .icon=${y.icon}></ha-icon>
                    <span>${y.message}</span>
                  </div>
                `:J}
          </div>
        </div>
      </ha-card>
    `}};ct.styles=l`
    ha-card {
      height: 100%;
      box-sizing: border-box;
    }
    ha-card.interactive {
      cursor: pointer;
    }

    /* La tinta passa dalle custom property che ha-card già consuma, invece di
       sovrascriverne background e bordo: non dipende dai suoi interni.
       Il mix è calcolato su --card-background-color (una variabile diversa da
       quella che stiamo assegnando: referenziare --ha-card-background qui
       creerebbe un ciclo e la regola verrebbe scartata in silenzio).
       Mescolando contro lo sfondo effettivo del tema si ottiene bordeaux su
       tema scuro e rosa tenue su tema chiaro con una regola sola. */
    ha-card.warning,
    ha-card.alarm {
      --ha-card-background: color-mix(in srgb, var(--ag-tint) 12%, var(--card-background-color, #fff));
      --ha-card-border-color: color-mix(in srgb, var(--ag-tint) 45%, var(--card-background-color, #fff));
      /* Molti temi azzerano il bordo: in warning/allarme va riacceso. */
      --ha-card-border-width: 1px;
    }
    ha-card.warning .system,
    ha-card.alarm .system {
      color: var(--ag-tint);
      font-weight: 500;
    }
    ha-card.warning .title,
    ha-card.alarm .title {
      color: color-mix(in srgb, var(--ag-tint) 55%, var(--primary-text-color));
    }

    /* Vedi ag-bar-card: il contenitore che ha uno spazio proprio azzera
       --ag-item-padding-x, così le righe si allineano al titolo. */
    .content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px var(--ag-item-padding-x, 16px);
      box-sizing: border-box;
      height: 100%;
    }

    .gauge {
      position: relative;
      width: 76px;
      height: 76px;
      flex: 0 0 auto;
    }
    .gauge svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .ring-track,
    .ring-value {
      fill: none;
      stroke-width: 8;
    }
    .ring-track {
      stroke: var(--divider-color, #e0e0e0);
      opacity: 0.4;
    }
    .ring-value {
      stroke: var(--ag-gauge-color);
      stroke-linecap: round;
      transition:
        stroke-dashoffset 0.4s ease-out,
        stroke 0.3s ease;
    }
    .gauge-label {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    /* Numero e "%" stanno in un unico flex item: dentro sono contenuto inline,
       quindi le baseline si allineano da sole e align-items: center può
       centrare il blocco nell'anello. Come due item separati, invece,
       verrebbero centrati singolarmente e le baseline non combacerebbero. */
    .gauge-value {
      font-family: var(--ag-value-font, inherit);
      font-size: 20px;
      font-weight: 600;
      color: var(--primary-text-color);
      white-space: nowrap;
    }
    .gauge-value .pct {
      font-size: 11px;
      font-weight: 500;
      color: var(--secondary-text-color);
      margin-left: 1px;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2px;
      min-width: 0; /* senza questo l'ellipsis nei figli flex non scatta */
      flex: 1 1 auto;
    }
    /* Un font custom va caricato a livello di documento (dal tema HA): qui si
       può solo usarlo. Senza --ag-title-font si eredita il font del tema. */
    .title {
      font-family: var(--ag-title-font, inherit);
      font-weight: 500;
      font-size: var(--ag-title-size, 15px);
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--ag-value-font, inherit);
      font-size: 13px;
      min-width: 0;
    }
    .row span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .row ha-icon {
      --mdc-icon-size: 16px;
      flex: 0 0 auto;
    }
    .flow {
      color: var(--ag-flow-color);
      font-weight: 500;
    }
    .system {
      color: var(--secondary-text-color);
    }
    .muted {
      color: var(--secondary-text-color);
    }

    @media (prefers-reduced-motion: reduce) {
      .ring-value {
        transition: none;
      }
    }
  `,ct=i([me(Ke)],ct),De({type:Ke,name:"AG Battery Card",description:"Stato di una batteria domestica: carica, potenza, rete e backup.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const dt="ag-bar-card",ut=`${dt}-editor`,ht=1,mt=15,pt=6,gt={name:"",description:"",icon:"",value_format:"auto",max_mode:"own",max_unit:"",level_direction:"above",value_font:t,decimals:ht,title_size:mt,bar_height:pt},_t={normal:"var(--primary-color, #03a9f4)",warning:"var(--warning-color, #ffa600)",alarm:"var(--error-color, #db4437)"};function ft(e,t){return e??t}let vt=class extends ue{constructor(){super(...arguments),this._schema=[{name:"entity",required:!0,selector:{entity:{}}},{name:"",type:"grid",schema:[{name:"name",selector:{text:{}}},{name:"description",selector:{text:{}}}]},{name:"icon",selector:{icon:{}}},{name:"",type:"expandable",title:"Valore e massimo",icon:"mdi:ruler",schema:[{name:"",type:"grid",schema:[{name:"value_format",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Automatico"},{value:"power",label:"Potenza (W / kW)"}]}}},{name:"decimals",selector:{number:{min:0,max:3,step:1,mode:"box"}}}]},{name:"max_mode",selector:{select:{mode:"dropdown",options:[{value:"own",label:"Massimo della card"},{value:"group",label:"Massimo del gruppo"}]}}},{name:"max_entity",selector:{entity:{}}},{name:"",type:"grid",schema:[{name:"max_value",selector:{number:{min:0,step:"any",mode:"box"}}},{name:"max_unit",selector:{select:{mode:"dropdown",custom_value:!0,options:[{value:"",label:"Come l'entità"},{value:"W",label:"W"},{value:"kW",label:"kW"},{value:"MW",label:"MW"}]}}}]}]},{name:"",type:"expandable",title:"Soglie",icon:"mdi:tune",schema:[{name:"level_direction",selector:{select:{mode:"dropdown",options:[{value:"above",label:"Alto = allarme"},{value:"below",label:"Basso = allarme"}]}}},{name:"",type:"grid",schema:[{name:"level_warning",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}},{name:"level_alarm",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}}]}]},{name:"",type:"expandable",title:"Aspetto",icon:"mdi:palette",schema:[{name:"",type:"grid",schema:[{name:"value_font",selector:{text:{}}},{name:"title_size",selector:{number:{min:10,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}]},{name:"bar_height",selector:{number:{min:2,max:24,step:1,mode:"box",unit_of_measurement:"px"}}},{name:"color_normal",selector:{text:{}}},{name:"color_warning",selector:{text:{}}},{name:"color_alarm",selector:{text:{}}}]},{name:"",type:"expandable",title:"Azioni",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]}],this._computeLabel=e=>({entity:"Entità del valore",name:"Nome",description:"Descrizione",icon:"Icona",value_format:"Formato del valore",decimals:"Decimali",max_mode:"Origine del massimo",max_entity:"Entità del massimo",max_value:"Massimo",max_unit:"Unità del massimo",level_direction:"Direzione delle soglie",level_warning:"Soglia warning",level_alarm:"Soglia allarme",value_font:"Font",title_size:"Dimensione nome",bar_height:"Spessore barra",color_normal:"Colore normale",color_warning:"Colore warning",color_alarm:"Colore allarme",tap_action:"Azione al tap",hold_action:"Azione alla pressione prolungata",double_tap_action:"Azione al doppio tap"}[e.name]??e.title??e.name),this._computeHelper=e=>{const t="Vuoto = colore del tema. Accetta CSS: #ff9800, red, var(--mia-var).",i="In percentuale del massimo. Vuota = nessuna soglia. Le soglie cambiano solo il colore della barra, non lo sfondo della card.";return{description:"Testo breve accanto al nome, in maiuscoletto (es. 19 KWP).",icon:"Vuota = nessuna icona. Prende il colore della barra.",value_format:"Automatico usa valore e unità dell'entità. Potenza converte tutto in W e mostra W/kW: da usare su tutte le barre di un gruppo con unità diverse.",decimals:"Solo per il formato automatico: le potenze si formattano da sole.",max_mode:"Massimo del gruppo: tutte le barre dello stesso contenitore si scalano sulla capacità dichiarata più alta del gruppo. Va attivato anche 'Massimo condiviso' sul contenitore.",max_entity:"Entità che fornisce il massimo (es. la potenza di picco dell'impianto). Se impostata ha la precedenza sul campo Massimo.",max_value:"Massimo fisso. Vuoto e senza entità del massimo: la barra si scala sul proprio valore, quindi resta piena.",max_unit:"Unità in cui è espresso il Massimo, con il formato Potenza. 'Come l'entità' lo interpreta nell'unità del sensore: con un sensore in W, un impianto da 19 kWp va scritto 19 + kW, altrimenti vale 19 W e la barra resta sempre piena.",level_direction:"Alto = allarme per consumi e carichi; basso = allarme per livelli e riserve (come la batteria).",level_warning:i,level_alarm:i,value_font:"Font di nome, descrizione e valore. Default 'Jost, sans-serif'; scrivi 'inherit' per usare il font del tema. Il font va caricato dal tema HA, la card non può caricarlo da sé.",title_size:"Dimensione del nome. I serif da display stanno meglio sui 17-18px.",bar_height:"Spessore della barra di progresso.",color_normal:t,color_warning:t,color_alarm:t}[e.name]}}setConfig(e){this._config=e}_valueChanged(e){const t=e.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?F`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:J}};i([_e({attribute:!1})],vt.prototype,"hass",void 0),i([fe()],vt.prototype,"_config",void 0),vt=i([me(ut)],vt);let bt,yt=class extends Ge{static async getConfigElement(){return document.createElement(ut)}static getStubConfig(e){const t=e&&Object.keys(e.states).find(t=>t.startsWith("sensor.")&&"power"===e.states[t].attributes.device_class)||"";return{type:`custom:${dt}`,entity:t,value_format:"power"}}setConfig(e){if(!e)throw new Error("Configurazione non valida");if(!e.entity)throw new Error("Specifica l'entità del valore (campo 'entity')");const t=Object.fromEntries(Object.entries(e).filter(([,e])=>void 0!==e));this._config={...gt,...t}}getCardSize(){return 1}getGridOptions(){return{rows:1,columns:12,min_rows:1,min_columns:6}}shouldUpdate(e){return super.shouldUpdate(e)||e.has("_groupMax")}connectedCallback(){super.connectedCallback(),this._syncGroup()}disconnectedCallback(){this._leaveGroup(),super.disconnectedCallback()}willUpdate(e){super.willUpdate(e),this._syncGroup()}_syncGroup(){const e=this._config;if(!e||"group"!==e.max_mode)return void this._leaveGroup();const{compare:t,scale:i}=this._readValue(),a=ft(this._declaredMax(),t);if(this._groupHandle)return void(a===this._publishedMax&&i===this._publishedScale||(this._publishedMax=a,this._publishedScale=i,this._groupHandle.update(a,i)));this._publishedMax=a,this._publishedScale=i;const o={source:this,value:a,scale:i,onMax:e=>{this._groupMax=e}};this.dispatchEvent(new CustomEvent("ag-group-max",{detail:o,bubbles:!0,composed:!0})),this._groupHandle=o.handle,this._groupHandle||(this._groupMax=void 0)}_leaveGroup(){this._groupHandle?.release(),this._groupHandle=void 0,this._publishedMax=void 0,this._publishedScale=void 0,this._groupMax=void 0}_readValue(){const e=this._config,t=e?.entity?this.hass?.states[e.entity]:void 0;return i=it(t?.state),a=t?.attributes.unit_of_measurement,"power"===(e?.value_format??"auto")?{raw:i,compare:void 0===i?void 0:ot(i,a),scale:"W"}:{raw:i,compare:i,scale:(a??"").trim()};var i,a}_declaredMax(){const e=this._config;if(!e)return;const t=e.entity?this.hass?.states[e.entity]:void 0,i=e.max_entity?this.hass?.states[e.max_entity]:void 0;return function(e,t,i,a,o,n){if(void 0!==e)return"power"===n?ot(e,t):e;if(void 0!==i)return"power"!==n?i:ot(i,a?.trim()||o)}(it(i?.state),i?.attributes.unit_of_measurement,e.max_value,e.max_unit,t?.attributes.unit_of_measurement,e.value_format??"auto")}_color(e){const t=this._config,i="warning"===e?t?.color_warning:"alarm"===e?t?.color_alarm:t?.color_normal;return i?.trim()||_t[e]}_formatValue(e,t){const i=this._config;if(void 0===e||!this.hass||!i)return"–";if("power"===i.value_format)return void 0===t?"–":`${t<0?"-":""}${nt(t,this.hass.locale)}`;const a=i.entity?this.hass.states[i.entity]:void 0,o=i.decimals??ht,n=ze(e,this.hass.locale,{maximumFractionDigits:o}),r=a?.attributes.unit_of_measurement;return r?`${n} ${r}`:n}render(){if(!this._config||!this.hass)return J;const e=this._config,t=e.entity?this.hass.states[e.entity]:void 0,i=e.name||t?.attributes.friendly_name||e.entity||"",a=this._hasAnyAction(),{raw:o,compare:n}=this._readValue(),r=void 0!==n,s=(l=e.max_mode??"own",c=this._groupMax,d=ft(this._declaredMax(),n),"group"===l?c??d:d);var l,c,d;const u=function(e,t){return void 0===e||void 0===t||!Number.isFinite(e)||!Number.isFinite(t)||t<=0?0:Math.min(100,Math.max(0,e/t*100))}(n,s),h=r?function(e,t,i,a){return"below"===a?void 0!==i&&e<i?"alarm":void 0!==t&&e<t?"warning":"normal":void 0!==i&&e>=i?"alarm":void 0!==t&&e>=t?"warning":"normal"}(u,e.level_warning,e.level_alarm,e.level_direction??"above"):"normal",m=r?this._color(h):"var(--disabled-text-color, #bdbdbd)",p=this._formatValue(o,n),g=e.value_font?.trim(),_=we({"--ag-bar-fill":`${u}%`,"--ag-bar-color":m,"--ag-bar-height":`${e.bar_height??pt}px`,"--ag-title-size":`${e.title_size??mt}px`,...g?{"--ag-value-font":g}:{}});return F`
      <ha-card
        class=${a?"interactive":""}
        style=${_}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content">
          <div class="row">
            ${e.icon?F`<ha-icon class="icon" .icon=${e.icon}></ha-icon>`:J}
            <span class="name" title=${i}>${i}</span>
            ${e.description?F`<span class="description">${e.description}</span>`:J}
            <span class="value">${p}</span>
          </div>
          <div
            class="track"
            role="progressbar"
            aria-label=${i}
            aria-valuemin="0"
            aria-valuemax=${void 0!==s&&s>0?s:J}
            aria-valuenow=${r?n:J}
            aria-valuetext=${p}
          >
            <div class="fill"></div>
          </div>
        </div>
      </ha-card>
    `}};function xt(){return bt??=window.loadCardHelpers?window.loadCardHelpers():Promise.reject(new Error("window.loadCardHelpers non disponibile")),bt}yt.styles=l`
    ha-card {
      height: 100%;
      box-sizing: border-box;
    }
    ha-card.interactive {
      cursor: pointer;
    }

    /* Lo spazio orizzontale lo azzera il contenitore che ne fornisce uno
       proprio (vedi ag-panel-card), così la riga si allinea al titolo. */
    .content {
      padding: 10px var(--ag-item-padding-x, 16px);
      box-sizing: border-box;
    }

    /* baseline: nome, descrizione e valore hanno corpi diversi (15/11/15px) e
       devono appoggiare sulla stessa linea. */
    .row {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 6px;
    }
    /* ha-icon non ha una baseline utile: va centrata a parte. */
    .icon {
      align-self: center;
      flex: 0 0 auto;
      color: var(--ag-bar-color);
      --mdc-icon-size: 18px;
    }
    /* Un font custom va caricato a livello di documento (dal tema HA): qui si
       può solo usarlo. Senza --ag-value-font si eredita il font del tema. */
    .name {
      font-family: var(--ag-value-font, inherit);
      font-size: var(--ag-title-size, 15px);
      font-weight: 600;
      color: var(--primary-text-color);
      flex: 0 1 auto;
      min-width: 0; /* senza questo l'ellipsis nei figli flex non scatta */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Stesso trattamento di .summary-label del panel. */
    .description {
      font-family: var(--ag-value-font, inherit);
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      flex: 0 1 auto;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* margin-left: auto spinge il valore a destra sia con descrizione che
       senza; non si comprime mai (le due etichette a sinistra sì).
       tabular-nums evita che la barra "salti" quando cambia la larghezza del
       numero: con più barre incolonnate si nota. */
    .value {
      margin-left: auto;
      flex: 0 0 auto;
      font-family: var(--ag-value-font, inherit);
      font-size: 15px;
      font-weight: 600;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .track {
      height: var(--ag-bar-height, 6px);
      border-radius: calc(var(--ag-bar-height, 6px) / 2);
      background-color: var(--divider-color, #e0e0e0);
      overflow: hidden;
    }
    .fill {
      height: 100%;
      width: var(--ag-bar-fill, 0%);
      border-radius: inherit;
      background-color: var(--ag-bar-color);
      transition:
        width 0.4s ease-out,
        background-color 0.3s ease;
    }

    @media (prefers-reduced-motion: reduce) {
      .fill {
        transition: none;
      }
    }
  `,i([fe()],yt.prototype,"_groupMax",void 0),yt=i([me(dt)],yt),De({type:dt,name:"AG Bar Card",description:"Barra orizzontale con nome, descrizione e valore; massimo proprio o condiviso col gruppo.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"});class $t extends Ge{constructor(){super(...arguments),this.direction="column",this._buildGen=0,this._group=new Map,this._onGroupMax=e=>{e.stopPropagation();const t=e.detail,i=t.source,a={scale:t.scale,value:t.value,onMax:t.onMax,lastMax:void 0,pristine:!0};this._group.set(i,a);const o={update:(e,t)=>{this._group.get(i)===a&&(a.value=e,a.scale=t,this._broadcastGroupMax())},release:()=>{this._group.get(i)===a&&(this._group.delete(i),this._broadcastGroupMax())}};t.handle=o,this._broadcastGroupMax()}}setConfig(e){if(!e)throw new Error("Configurazione non valida");if(void 0!==e.cards&&!Array.isArray(e.cards))throw new Error("Il campo 'cards' deve essere una lista di card");for(const t of e.cards??[])if("object"!=typeof t||null===t||"string"!=typeof t.type)throw new Error("Ogni elemento di 'cards' deve avere un campo 'type'");const t=Object.fromEntries(Object.entries(e).filter(([,e])=>void 0!==e));this._config={flat:!0,share_max:!1,cards:[],...t},this._group.clear(),this._rebuildAll()}shouldUpdate(e){return super.shouldUpdate(e)||e.has("_cards")||e.has("_error")}updated(e){if(super.updated(e),e.has("hass")&&this.hass&&this._cards)for(const e of this._cards)e.hass=this.hass}getCardSize(){if(!this._cards||0===this._cards.length)return 1;const e=Promise.all(this._cards.map(e=>function(e){return"function"==typeof e.getCardSize?e.getCardSize():4}(e)));return"row"===this.direction?e.then(e=>Math.max(...e)):e.then(e=>e.reduce((e,t)=>e+t,0))}getGridOptions(){return{columns:12,rows:"auto"}}_broadcastGroupMax(){for(const[e]of this._group)e.isConnected||this._group.delete(e);const e=new Map;for(const t of this._group.values()){const i=t.value;if(void 0===i||!Number.isFinite(i)||i<=0)continue;const a=e.get(t.scale);(void 0===a||i>a)&&e.set(t.scale,i)}for(const t of this._group.values()){const i=e.get(t.scale);(t.pristine||i!==t.lastMax)&&(t.lastMax=i,t.pristine=!1,t.onMax(i))}}async _rebuildAll(){const e=++this._buildGen,t=this._config?.cards??[];try{const i=await Promise.all(t.map(e=>this._createCard(e)));e===this._buildGen&&(this._cards=i,this._error=void 0)}catch(t){e===this._buildGen&&(this._cards=[],this._error=t instanceof Error?t.message:String(t))}}async _createCard(e){let t;try{t=(await xt()).createCardElement(e)}catch{t=function(e,t){void 0===t&&(t=!1);var i=function(e,t){return a("hui-error-card",{type:"error",error:e,config:t})},a=function(e,t){var a=window.document.createElement(e);try{if(!a.setConfig)return;a.setConfig(t)}catch(a){return console.error(e,a),i(a.message,t)}return a};if(!e||"object"!=typeof e||!t&&!e.type)return i("No type defined",e);var o=e.type;if(o&&o.startsWith("custom:"))o=o.substr(7);else if(t)if(He.has(o))o="hui-"+o+"-row";else{if(!e.entity)return i("Invalid config given.",e);var n=e.entity.split(".",1)[0];o="hui-"+(Pe[n]||"text")+"-entity-row"}else o="hui-"+o+"-card";if(customElements.get(o))return a(o,e);var r=i("Custom element doesn't exist: "+e.type+".",e);r.style.display="None";var s=setTimeout(function(){r.style.display=""},2e3);return customElements.whenDefined(e.type).then(function(){clearTimeout(s),Me(r,"ll-rebuild",{},r)}),r}(e)}return this.hass&&(t.hass=this.hass),t.addEventListener("ll-rebuild",i=>{i.stopPropagation(),this._rebuildCard(t,e)},{once:!0}),t}async _rebuildCard(e,t){const i=this._buildGen,a=await this._createCard(t);i===this._buildGen&&this._cards&&(this._cards=this._cards.map(t=>t===e?a:t))}renderChildren(){if(this._error)return F`<div class="children-error">${this._error}</div>`;if(!this._cards)return J;const e=this._config?.flat??!0,t=!0===this._config?.share_max,i=this._config?.gap,a=this._config?.padding,o=we({...void 0!==i?{"--ag-stack-gap":`${i}px`}:{},...void 0!==a?{"--ag-children-padding":`${a}px`}:{}});return F`
      <div
        class="children ${this.direction}${e?" flat":""}"
        style=${o}
        @ag-group-max=${t?this._onGroupMax:void 0}
      >
        ${this._cards.map(e=>F`<div class="child">${e}</div>`)}
      </div>
    `}}i([fe()],$t.prototype,"_cards",void 0),i([fe()],$t.prototype,"_error",void 0);const wt=l`
  .children {
    display: flex;
    gap: var(--ag-stack-gap, 8px);
    /* Il panel non imposta questa property: il suo spazio sta sulla ha-card. */
    padding: var(--ag-children-padding, 0);
    box-sizing: border-box;
  }
  .children.column {
    flex-direction: column;
  }
  .children.row {
    flex-direction: row;
  }
  /* Larghezze uguali; min-width sblocca l'ellipsis dentro i figli flex. */
  .children.row > .child {
    flex: 1 1 0;
    min-width: 0;
  }
  .children.flat > .child {
    --ha-card-background: transparent;
    --ha-card-border-width: 0;
    --ha-card-box-shadow: none;
    --ha-card-border-color: transparent;
  }
  .children-error {
    color: var(--error-color, #db4437);
    font-size: 13px;
  }
`,At="ag-panel-card",Ct=`${At}-editor`,Et=15,zt=1;let St;function kt(){return St??=async function(){if(Boolean(customElements.get("hui-card-element-editor")&&customElements.get("hui-card-picker")))return!0;(await xt()).createCardElement({type:"vertical-stack",cards:[]}),await Mt(customElements.whenDefined("hui-vertical-stack-card"));const e=customElements.get("hui-vertical-stack-card");return await(e?.getConfigElement?.()),await Mt(Promise.all([customElements.whenDefined("hui-card-element-editor"),customElements.whenDefined("hui-card-picker")])),!0}().catch(()=>!1),St}function Mt(e){return Promise.race([e,new Promise((e,t)=>window.setTimeout(()=>t(new Error("Timeout caricamento editor HA")),5e3))])}let Ht=class extends ue{constructor(){super(...arguments),this.cards=[],this._selected=0,this._guiMode=!0,this._guiModeAvailable=!0,this._status="loading"}firstUpdated(){kt().then(e=>{this._status=e?"ready":"error"})}willUpdate(e){e.has("cards")&&this._selected>this.cards.length&&(this._selected=this.cards.length)}render(){if(!this.hass)return J;if("loading"===this._status)return F`<div class="note">Caricamento editor…</div>`;if("error"===this._status)return F`<div class="warning">
        Editor visuale delle card annidate non disponibile: configura la lista
        <code>cards</code> dall'editor YAML della card.
      </div>`;const e=this._selected===this.cards.length;return F`
      <div class="chips" role="tablist" aria-label="Card contenute">
        ${this.cards.map((e,t)=>F`
            <button
              class="chip ${t===this._selected?"active":""}"
              role="tab"
              aria-selected=${t===this._selected?"true":"false"}
              @click=${()=>this._select(t)}
            >
              ${t+1}
            </button>
          `)}
        <button
          class="chip add ${e?"active":""}"
          role="tab"
          aria-selected=${e?"true":"false"}
          aria-label="Aggiungi card"
          @click=${()=>this._select(this.cards.length)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
      ${e?F`
            <hui-card-picker
              .hass=${this.hass}
              .lovelace=${this.lovelace}
              @config-changed=${this._cardPicked}
            ></hui-card-picker>
          `:F`
            <div class="toolbar">
              <button
                class="tool text"
                .disabled=${!this._guiModeAvailable}
                @click=${this._toggleMode}
              >
                ${this._guiMode?"Editor YAML":"Editor visuale"}
              </button>
              <span class="spacer"></span>
              <button
                class="tool icon"
                aria-label="Sposta su"
                .disabled=${0===this._selected}
                @click=${()=>this._move(this._selected,this._selected-1)}
              >
                <ha-icon icon="mdi:arrow-up"></ha-icon>
              </button>
              <button
                class="tool icon"
                aria-label="Sposta giù"
                .disabled=${this._selected===this.cards.length-1}
                @click=${()=>this._move(this._selected,this._selected+1)}
              >
                <ha-icon icon="mdi:arrow-down"></ha-icon>
              </button>
              <button
                class="tool icon delete"
                aria-label="Elimina card"
                @click=${()=>this._delete(this._selected)}
              >
                <ha-icon icon="mdi:delete"></ha-icon>
              </button>
            </div>
            <hui-card-element-editor
              .hass=${this.hass}
              .lovelace=${this.lovelace}
              .value=${this.cards[this._selected]}
              @config-changed=${this._childConfigChanged}
              @GUImode-changed=${this._guiModeChanged}
            ></hui-card-element-editor>
          `}
    `}_select(e){this._selected=e,this._guiMode=!0,this._guiModeAvailable=!0}_toggleMode(){this._editorElement?.toggleMode?.()}_cardPicked(e){e.stopPropagation();const t=e.detail?.config;if(!t)return;const i=[...this.cards,t];this._select(i.length-1),this._emit(i)}_childConfigChanged(e){e.stopPropagation();const t=e.detail?.config;if(!t)return;const i=[...this.cards];i[this._selected]=t,this._guiModeAvailable=!1!==e.detail.guiModeAvailable,this._emit(i)}_guiModeChanged(e){e.stopPropagation(),this._guiMode=Boolean(e.detail.guiMode),this._guiModeAvailable=!1!==e.detail.guiModeAvailable}_move(e,t){const i=[...this.cards],[a]=i.splice(e,1);i.splice(t,0,a),this._selected=t,this._emit(i)}_delete(e){const t=this.cards.filter((t,i)=>i!==e);this._selected=Math.min(e,t.length),this._emit(t)}_emit(e){this.dispatchEvent(new CustomEvent("cards-changed",{detail:{cards:e}}))}};Ht.styles=l`
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .chip {
      min-width: 34px;
      height: 30px;
      padding: 0 10px;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 15px;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }
    .chip.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .chip ha-icon {
      --mdc-icon-size: 18px;
    }

    .toolbar {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 8px;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .tool {
      border: none;
      background: none;
      padding: 6px;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 13px;
      cursor: pointer;
      border-radius: 4px;
    }
    .tool:hover:not(:disabled) {
      color: var(--primary-text-color);
    }
    .tool:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .tool.text {
      color: var(--primary-color);
      font-weight: 500;
      padding: 6px 8px;
    }
    .tool.delete:hover:not(:disabled) {
      color: var(--error-color, #db4437);
    }
    .tool ha-icon {
      --mdc-icon-size: 20px;
      display: block;
    }

    .note,
    .warning {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .warning {
      color: var(--warning-color, #ffa600);
    }
  `,i([_e({attribute:!1})],Ht.prototype,"hass",void 0),i([_e({attribute:!1})],Ht.prototype,"lovelace",void 0),i([_e({attribute:!1})],Ht.prototype,"cards",void 0),i([fe()],Ht.prototype,"_selected",void 0),i([fe()],Ht.prototype,"_guiMode",void 0),i([fe()],Ht.prototype,"_guiModeAvailable",void 0),i([fe()],Ht.prototype,"_status",void 0),i([function(e){return(t,i,a)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}("hui-card-element-editor")],Ht.prototype,"_editorElement",void 0),Ht=i([me("ag-cards-editor-list")],Ht);class Pt extends ue{setConfig(e){this._config=e}connectedCallback(){if(super.connectedCallback(),void 0===this.lovelace)try{this.lovelace=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null}()?.config}catch{this.lovelace=void 0}}render(){return this.hass&&this._config?F`
      <ha-form
        .hass=${this.hass}
        .data=${{...this._config,flat:this._config.flat??!0}}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="cards-heading">Card contenute</div>
      <ag-cards-editor-list
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .cards=${this._config.cards??[]}
        @cards-changed=${this._cardsChanged}
      ></ag-cards-editor-list>
    `:J}_valueChanged(e){if(e.stopPropagation(),!this._config)return;const t=e.detail.value;this._emit({...this._config,...t,cards:this._config.cards??[]})}_cardsChanged(e){e.stopPropagation(),this._config&&this._emit({...this._config,cards:e.detail.cards})}_emit(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}}Pt.styles=l`
    .cards-heading {
      margin: 16px 0 8px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
  `,i([_e({attribute:!1})],Pt.prototype,"hass",void 0),i([_e({attribute:!1})],Pt.prototype,"lovelace",void 0),i([fe()],Pt.prototype,"_config",void 0);let Tt=class extends Pt{constructor(){super(...arguments),this._schema=[{name:"title",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"subtitle",selector:{text:{}}},{name:"subtitle_align",selector:{select:{mode:"dropdown",options:[{value:"left",label:"Sinistra"},{value:"center",label:"Centro"},{value:"right",label:"Destra"}]}}}]},{name:"",type:"expandable",title:"Riepilogo",icon:"mdi:sigma",schema:[{name:"summary_label",selector:{text:{}}},{name:"summary_entities",selector:{entity:{multiple:!0}}},{name:"",type:"grid",schema:[{name:"summary_unit",selector:{text:{}}},{name:"summary_decimals",selector:{number:{min:0,max:3,step:1,mode:"box"}}}]},{name:"summary_color",selector:{text:{}}}]},{name:"",type:"expandable",title:"Aspetto",icon:"mdi:palette",schema:[{name:"",type:"grid",schema:[{name:"title_font",selector:{text:{}}},{name:"title_size",selector:{number:{min:10,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}]},{name:"value_font",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"padding",selector:{number:{min:0,max:48,step:1,mode:"box",unit_of_measurement:"px"}}},{name:"gap",selector:{number:{min:0,max:48,step:1,mode:"box",unit_of_measurement:"px"}}}]},{name:"flat",selector:{boolean:{}}},{name:"share_max",selector:{boolean:{}}}]}],this._computeLabel=e=>({title:"Titolo",subtitle:"Sottotitolo",subtitle_align:"Allineamento sottotitolo",summary_label:"Didascalia",summary_entities:"Entità del valore",summary_unit:"Unità forzata",summary_decimals:"Decimali",summary_color:"Colore del valore",title_font:"Font del titolo",title_size:"Dimensione titolo",value_font:"Font di valori e didascalie",padding:"Spazio attorno alle card",gap:"Spazio tra le card",flat:"Card figlie senza cornice",share_max:"Massimo condiviso tra le barre"}[e.name]??e.title??e.name),this._computeHelper=e=>({summary_label:"Testo libero nell'angolo destro dell'header (es. TRIFASE · BATTERIA).",summary_entities:"Una entità = il suo valore; più entità = la somma. Le potenze (W/kW) vengono convertite e formattate da sole.",summary_unit:"Vuota = automatica. Se impostata disattiva la conversione delle potenze e somma i valori così come sono.",summary_decimals:"Decimali della somma semplice (le potenze si formattano da sole).",summary_color:"Vuoto = accent. Accetta CSS: #ff9800, red, var(--mia-var).",title_font:"Vuoto = font del tema. Es: 'Cormorant Garamond', serif — il font va caricato dal tema HA, la card non può caricarlo da sé.",title_size:"Dimensione del titolo. I serif da display stanno meglio sui 17-18px.",value_font:"Font di riepilogo e sottotitolo. Default 'Jost, sans-serif'; scrivi 'inherit' per usare il font del tema.",padding:"Spazio attorno alle sole card contenute. Vuoto = 16px ai lati. Con 0 arrivano a filo del bordo; il titolo resta dov'è.",gap:"Spazio tra le card contenute. Vuoto = 8px.",flat:"Nasconde sfondo, bordo e ombra delle card contenute.",share_max:"Le ag-bar-card contenute impostate su 'Massimo del gruppo' si scalano tutte sulla capacità dichiarata più alta del gruppo. Con contenitori annidati vince il più interno che ha l'opzione attiva."}[e.name])}};Tt=i([me(Ct)],Tt);let Ot=class extends $t{static async getConfigElement(){return document.createElement(Ct)}static getStubConfig(){return{type:`custom:${At}`,title:"Pannello",cards:[]}}getCardSize(){const e=super.getCardSize();return"number"==typeof e?e+1:e.then(e=>e+1)}_summaryValue(){const e=this._config,t=this.hass;if(!e?.summary_entities||!t)return;const i=Array.isArray(e.summary_entities)?e.summary_entities:[e.summary_entities];if(0===i.length)return;const a=function(e,t){const i=e.filter(e=>void 0!==e.value);if(0===i.length)return;if(!t?.trim()){const e=i.map(e=>void 0===e.unit?void 0:ot(e.value,e.unit));if(e.every(e=>void 0!==e))return{kind:"power",watts:e.reduce((e,t)=>e+t,0)}}return{kind:"plain",total:i.reduce((e,t)=>e+t.value,0),unit:t?.trim()||i[0].unit}}(i.map(e=>{const i=t.states[e];return{value:it(i?.state),unit:i?.attributes.unit_of_measurement}}),e.summary_unit);if(!a)return"–";if("power"===a.kind)return`${a.watts<0?"-":""}${nt(a.watts,t.locale)}`;const o=e.summary_decimals??zt,n=ze(a.total,t.locale,{maximumFractionDigits:o});return a.unit?`${n} ${a.unit}`:n}render(){if(!this._config||!this.hass)return J;const e=this._config,i=this._summaryValue(),a=Boolean(e.summary_label||i),o=Boolean(e.title||e.subtitle||a),n=e.title_font?.trim(),r=(e.value_font??t).trim(),s=e.summary_color?.trim(),l=we({"--ag-title-size":`${e.title_size??Et}px`,"--ag-subtitle-align":e.subtitle_align??"left",...n?{"--ag-title-font":n}:{},...r?{"--ag-value-font":r}:{},...s?{"--ag-value-color":s}:{}});return F`
      <ha-card style=${l}>
        ${o?F`
              <div class="header">
                <div class="header-row">
                  <div class="title" title=${e.title||""}>${e.title||""}</div>
                  ${a?F`
                        <div class="summary">
                          ${e.summary_label?F`<span class="summary-label">${e.summary_label}</span>`:J}
                          ${i?F`<span class="summary-value">${i}</span>`:J}
                        </div>
                      `:J}
                </div>
                ${e.subtitle?F`<div class="subtitle">${e.subtitle}</div>`:J}
              </div>
            `:J}
        ${this.renderChildren()}
      </ha-card>
    `}};Ot.styles=[wt,l`
      /* Lo spazio interno non sta sulla ha-card ma, separatamente, su header e
         contenitore dei figli: così un padding a 0 porta il contenuto a filo
         bordo senza schiacciare anche il titolo. */
      ha-card {
        height: 100%;
        box-sizing: border-box;
        padding: 0;
      }

      /* 12/16 come prima; i 10px in basso sostituiscono il vecchio margin. */
      .header {
        padding: 12px 16px 10px;
      }

      /* Default equivalente al vecchio padding della ha-card. Con il padding a
         0 in config i figli arrivano al bordo, header escluso. */
      .children {
        padding: var(--ag-children-padding, 0 16px 12px);
      }

      /* Le card AG figlie hanno un proprio spazio orizzontale: dentro il panel
         va azzerato, altrimenti si somma a questo e le righe risultano
         rientrate rispetto al titolo (il separator, che non ne ha, arriva
         invece a filo: era l'incoerenza da togliere). */
      .children > .child {
        --ag-item-padding-x: 0;
      }
      .header-row {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
      }
      /* Un font custom va caricato a livello di documento (dal tema HA): qui
         si può solo usarlo. Senza --ag-title-font si eredita il font del tema. */
      .title {
        font-family: var(--ag-title-font, inherit);
        font-size: var(--ag-title-size, 15px);
        font-weight: 500;
        color: var(--primary-text-color);
        flex: 1 1 auto;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .summary {
        display: flex;
        align-items: baseline;
        gap: 8px;
        flex: 0 0 auto;
      }
      .summary-label {
        font-family: var(--ag-value-font, inherit);
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }
      .summary-value {
        font-family: var(--ag-value-font, inherit);
        font-size: 15px;
        font-weight: 600;
        color: var(--ag-value-color, var(--accent-color));
        font-variant-numeric: tabular-nums;
      }
      .subtitle {
        font-family: var(--ag-value-font, inherit);
        margin-top: 2px;
        font-size: 12px;
        color: var(--secondary-text-color);
        text-align: var(--ag-subtitle-align, left);
      }
    `],Ot=i([me(At)],Ot),De({type:At,name:"AG Panel Card",description:"Pannello con intestazione (titolo, sottotitolo, valore o somma a destra) e card figlie impilate.",preview:!1,documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const Ut="ag-vstack-card",Dt=`${Ut}-editor`;let Lt=class extends Pt{constructor(){super(...arguments),this._schema=[{name:"flat",selector:{boolean:{}}},{name:"share_max",selector:{boolean:{}}},{name:"gap",selector:{number:{min:0,max:48,step:1,mode:"box",unit_of_measurement:"px"}}}],this._computeLabel=e=>({flat:"Card figlie senza cornice",share_max:"Massimo condiviso tra le barre",gap:"Spazio tra le card"}[e.name]??e.title??e.name),this._computeHelper=e=>({flat:"Nasconde sfondo, bordo e ombra delle card contenute.",share_max:"Le ag-bar-card contenute impostate su 'Massimo del gruppo' si scalano tutte sulla capacità dichiarata più alta del gruppo. Con contenitori annidati vince il più interno che ha l'opzione attiva.",gap:"Spazio tra le card contenute. Vuoto = 8px."}[e.name])}};Lt=i([me(Dt)],Lt);let Nt=class extends $t{static async getConfigElement(){return document.createElement(Dt)}static getStubConfig(){return{type:`custom:${Ut}`,cards:[]}}render(){return this._config&&this.hass?this.renderChildren():J}};Nt.styles=[wt],Nt=i([me(Ut)],Nt),De({type:Ut,name:"AG VStack Card",description:"Pila verticale di card senza cornice, da comporre dentro altre card.",preview:!1,documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const Rt="ag-hstack-card",jt=`${Rt}-editor`;let Wt=class extends Pt{constructor(){super(...arguments),this._schema=[{name:"flat",selector:{boolean:{}}},{name:"share_max",selector:{boolean:{}}},{name:"gap",selector:{number:{min:0,max:48,step:1,mode:"box",unit_of_measurement:"px"}}}],this._computeLabel=e=>({flat:"Card figlie senza cornice",share_max:"Massimo condiviso tra le barre",gap:"Spazio tra le card"}[e.name]??e.title??e.name),this._computeHelper=e=>({flat:"Nasconde sfondo, bordo e ombra delle card contenute.",share_max:"Le ag-bar-card contenute impostate su 'Massimo del gruppo' si scalano tutte sulla capacità dichiarata più alta del gruppo. Con contenitori annidati vince il più interno che ha l'opzione attiva.",gap:"Spazio tra le card contenute. Vuoto = 8px."}[e.name])}};Wt=i([me(jt)],Wt);let Gt=class extends $t{constructor(){super(...arguments),this.direction="row"}static async getConfigElement(){return document.createElement(jt)}static getStubConfig(){return{type:`custom:${Rt}`,cards:[]}}render(){return this._config&&this.hass?this.renderChildren():J}};Gt.styles=[wt],Gt=i([me(Rt)],Gt),De({type:Rt,name:"AG HStack Card",description:"Fila orizzontale di card a larghezza uguale, senza cornice.",preview:!1,documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const It="ag-separator-card",Vt=8;let qt=class extends Ge{static getConfigForm(){return{schema:[{name:"margin",selector:{number:{min:0,max:48,step:1,mode:"box",unit_of_measurement:"px"}}}],computeLabel:e=>"margin"===e.name?"Margine verticale":e.name}}static getStubConfig(){return{type:`custom:${It}`}}setConfig(e){if(!e)throw new Error("Configurazione non valida");this._config={...e}}getCardSize(){return 1}getGridOptions(){return{columns:"full",rows:"auto"}}render(){if(!this._config)return J;const e=this._config.margin??Vt;return F`
      <div class="line" role="separator" style=${we({"--ag-sep-margin":`${e}px`})}></div>
    `}};qt.styles=l`
    .line {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      margin: var(--ag-sep-margin, 8px) 0;
    }
  `,qt=i([me(It)],qt),De({type:It,name:"AG Separator Card",description:"Sottile linea divisoria da usare tra card.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"}),console.info(`%c AG-CARDS %c v${e} `,"color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{e as AG_CARDS_VERSION};
