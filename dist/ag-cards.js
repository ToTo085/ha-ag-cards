const e="0.11.0",t="Jost, sans-serif";function a(e,t,a,o){var i,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,a):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(r<3?i(n):r>3?i(t,a,n):i(t,a))||n);return r>3&&n&&Object.defineProperty(t,a,n),n}"function"==typeof SuppressedError&&SuppressedError;const o=globalThis,i=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),n=new WeakMap;let s=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const a=void 0!==t&&1===t.length;a&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&n.set(t,e))}return e}toString(){return this.cssText}};const l=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,a,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[o+1],e[0]);return new s(a,e,r)},c=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:d,defineProperty:u,getOwnPropertyDescriptor:h,getOwnPropertyNames:p,getOwnPropertySymbols:m,getPrototypeOf:g}=Object,f=globalThis,v=f.trustedTypes,_=v?v.emptyScript:"",b=f.reactiveElementPolyfillSupport,y=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let a=e;switch(t){case Boolean:a=null!==e;break;case Number:a=null===e?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch(e){a=null}}return a}},w=(e,t)=>!d(e,t),$={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),o=this.getPropertyDescriptor(e,a,t);void 0!==o&&u(this.prototype,e,o)}}static getPropertyDescriptor(e,t,a){const{get:o,set:i}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const r=o?.call(this);i?.call(this,t),this.requestUpdate(e,r,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...p(e),...m(e)];for(const a of t)this.createProperty(a,e[a])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const a=this._$Eu(e,t);void 0!==a&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const e of a)t.unshift(c(e))}else void 0!==e&&t.push(c(e));return t}static _$Eu(e,t){const a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(i)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const a of t){const t=document.createElement("style"),i=o.litNonce;void 0!==i&&t.setAttribute("nonce",i),t.textContent=a.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){const a=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,a);if(void 0!==o&&!0===a.reflect){const i=(void 0!==a.converter?.toAttribute?a.converter:x).toAttribute(t,a.type);this._$Em=e,null==i?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,t){const a=this.constructor,o=a._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=a.getPropertyOptions(o),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=o;const r=i.fromAttribute(t,e.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(e,t,a,o=!1,i){if(void 0!==e){const r=this.constructor;if(!1===o&&(i=this[e]),a??=r.getPropertyOptions(e),!((a.hasChanged??w)(i,t)||a.useDefault&&a.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,a))))return;this.C(e,t,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:o,wrapped:i},r){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==i||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,a]of e){const{wrapped:e}=a,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,a,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[y("elementProperties")]=new Map,z[y("finalized")]=new Map,b?.({ReactiveElement:z}),(f.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,A=e=>e,C=k.trustedTypes,S=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,H="?"+M,P=`<${H}>`,T=document,L=()=>T.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,U="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,q=/>/g,F=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,j=/"/g,W=/^(?:script|style|textarea|title)$/i,V=e=>(t,...a)=>({_$litType$:e,strings:t,values:a}),G=V(1),B=V(2),K=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),Z=new WeakMap,Y=T.createTreeWalker(T,129);function Q(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const X=(e,t)=>{const a=e.length-1,o=[];let i,r=2===t?"<svg>":3===t?"<math>":"",n=N;for(let t=0;t<a;t++){const a=e[t];let s,l,c=-1,d=0;for(;d<a.length&&(n.lastIndex=d,l=n.exec(a),null!==l);)d=n.lastIndex,n===N?"!--"===l[1]?n=I:void 0!==l[1]?n=q:void 0!==l[2]?(W.test(l[2])&&(i=RegExp("</"+l[2],"g")),n=F):void 0!==l[3]&&(n=F):n===F?">"===l[0]?(n=i??N,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,s=l[1],n=void 0===l[3]?F:'"'===l[3]?j:R):n===j||n===R?n=F:n===I||n===q?n=N:(n=F,i=void 0);const u=n===F&&e[t+1].startsWith("/>")?" ":"";r+=n===N?a+P:c>=0?(o.push(s),a.slice(0,c)+E+a.slice(c)+M+u):a+M+(-2===c?t:u)}return[Q(e,r+(e[a]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class ee{constructor({strings:e,_$litType$:t},a){let o;this.parts=[];let i=0,r=0;const n=e.length-1,s=this.parts,[l,c]=X(e,t);if(this.el=ee.createElement(l,a),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=Y.nextNode())&&s.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(E)){const t=c[r++],a=o.getAttribute(e).split(M),n=/([.?@])?(.*)/.exec(t);s.push({type:1,index:i,name:n[2],strings:a,ctor:"."===n[1]?re:"?"===n[1]?ne:"@"===n[1]?se:ie}),o.removeAttribute(e)}else e.startsWith(M)&&(s.push({type:6,index:i}),o.removeAttribute(e));if(W.test(o.tagName)){const e=o.textContent.split(M),t=e.length-1;if(t>0){o.textContent=C?C.emptyScript:"";for(let a=0;a<t;a++)o.append(e[a],L()),Y.nextNode(),s.push({type:2,index:++i});o.append(e[t],L())}}}else if(8===o.nodeType)if(o.data===H)s.push({type:2,index:i});else{let e=-1;for(;-1!==(e=o.data.indexOf(M,e+1));)s.push({type:7,index:i}),e+=M.length-1}i++}}static createElement(e,t){const a=T.createElement("template");return a.innerHTML=e,a}}function te(e,t,a=e,o){if(t===K)return t;let i=void 0!==o?a._$Co?.[o]:a._$Cl;const r=O(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),void 0===r?i=void 0:(i=new r(e),i._$AT(e,a,o)),void 0!==o?(a._$Co??=[])[o]=i:a._$Cl=i),void 0!==i&&(t=te(e,i._$AS(e,t.values),i,o)),t}class ae{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,o=(e?.creationScope??T).importNode(t,!0);Y.currentNode=o;let i=Y.nextNode(),r=0,n=0,s=a[0];for(;void 0!==s;){if(r===s.index){let t;2===s.type?t=new oe(i,i.nextSibling,this,e):1===s.type?t=new s.ctor(i,s.name,s.strings,this,e):6===s.type&&(t=new le(i,this,e)),this._$AV.push(t),s=a[++n]}r!==s?.index&&(i=Y.nextNode(),r++)}return Y.currentNode=T,o}p(e){let t=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class oe{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,o){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=te(this,e,t),O(e)?e===J||null==e||""===e?(this._$AH!==J&&this._$AR(),this._$AH=J):e!==this._$AH&&e!==K&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==J&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:a}=e,o="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=ee.createElement(Q(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new ae(o,this),a=e.u(this.options);e.p(t),this.T(a),this._$AH=e}}_$AC(e){let t=Z.get(e.strings);return void 0===t&&Z.set(e.strings,t=new ee(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let a,o=0;for(const i of e)o===t.length?t.push(a=new oe(this.O(L()),this.O(L()),this,this.options)):a=t[o],a._$AI(i),o++;o<t.length&&(this._$AR(a&&a._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}let ie=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,o,i){this.type=1,this._$AH=J,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=J}_$AI(e,t=this,a,o){const i=this.strings;let r=!1;if(void 0===i)e=te(this,e,t,0),r=!O(e)||e!==this._$AH&&e!==K,r&&(this._$AH=e);else{const o=e;let n,s;for(e=i[0],n=0;n<i.length-1;n++)s=te(this,o[a+n],t,n),s===K&&(s=this._$AH[n]),r||=!O(s)||s!==this._$AH[n],s===J?e=J:e!==J&&(e+=(s??"")+i[n+1]),this._$AH[n]=s}r&&!o&&this.j(e)}j(e){e===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};class re extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===J?void 0:e}}class ne extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==J)}}class se extends ie{constructor(e,t,a,o,i){super(e,t,a,o,i),this.type=5}_$AI(e,t=this){if((e=te(this,e,t,0)??J)===K)return;const a=this._$AH,o=e===J&&a!==J||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,i=e!==J&&(a===J||o);o&&this.element.removeEventListener(this.name,this,a),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}let le=class{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){te(this,e)}};const ce=k.litHtmlPolyfillSupport;ce?.(ee,oe),(k.litHtmlVersions??=[]).push("3.3.3");const de=globalThis;let ue=class extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,a)=>{const o=a?.renderBefore??t;let i=o._$litPart$;if(void 0===i){const e=a?.renderBefore??null;o._$litPart$=i=new oe(t.insertBefore(L(),e),e,void 0,a??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}};ue._$litElement$=!0,ue.finalized=!0,de.litElementHydrateSupport?.({LitElement:ue});const he=de.litElementPolyfillSupport;he?.({LitElement:ue}),(de.litElementVersions??=[]).push("4.2.2");const pe=e=>(t,a)=>{void 0!==a?a.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},me={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:w},ge=(e=me,t,a)=>{const{kind:o,metadata:i}=a;let r=globalThis.litPropertyMetadata.get(i);if(void 0===r&&globalThis.litPropertyMetadata.set(i,r=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),r.set(a.name,e),"accessor"===o){const{name:o}=a;return{set(a){const i=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,i,e,!0,a)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=a;return function(a){const i=this[o];t.call(this,a),this.requestUpdate(o,i,e,!0,a)}}throw Error("Unsupported decorator location: "+o)};function fe(e){return(t,a)=>"object"==typeof a?ge(e,t,a):((e,t,a)=>{const o=t.hasOwnProperty(a);return t.constructor.createProperty(a,e),o?Object.getOwnPropertyDescriptor(t,a):void 0})(e,t,a)}function ve(e){return fe({...e,state:!0,attribute:!1})}const _e=1,be=e=>(...t)=>({_$litDirective$:e,values:t});let ye=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,a){this._$Ct=e,this._$AM=t,this._$Ci=a}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const xe="important",we=" !"+xe,$e=be(class extends ye{constructor(e){if(super(e),e.type!==_e||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,a)=>{const o=e[a];return null==o?t:t+`${a=a.includes("-")?a:a.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(e,[t]){const{style:a}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?a.removeProperty(e):a[e]=null);for(const e in t){const o=t[e];if(null!=o){this.ft.add(e);const t="string"==typeof o&&o.endsWith(we);e.includes("-")||t?a.setProperty(e,t?o.slice(0,-11):o,t?xe:""):a[e]=o}}return K}});var ze,ke;function Ae(){return(Ae=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o])}return e}).apply(this,arguments)}!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(ze||(ze={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ke||(ke={}));var Ce=function(e,t,a){var o=t?function(e){switch(e.number_format){case ze.comma_decimal:return["en-US","en"];case ze.decimal_comma:return["de","es","it"];case ze.space_comma:return["fr","sv","cs"];case ze.system:return;default:return e.language}}(t):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},(null==t?void 0:t.number_format)!==ze.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(o,Se(e,a)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,Se(e,a)).format(Number(e))}return"string"==typeof e?e:function(e,t){return void 0===t&&(t=2),Math.round(e*Math.pow(10,t))/Math.pow(10,t)}(e,null==a?void 0:a.maximumFractionDigits).toString()+("currency"===(null==a?void 0:a.style)?" "+a.currency:"")},Se=function(e,t){var a=Ae({maximumFractionDigits:2},t);if("string"!=typeof e)return a;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){var o=e.indexOf(".")>-1?e.split(".")[1].length:0;a.minimumFractionDigits=o,a.maximumFractionDigits=o}return a},Ee=["closed","locked","off"],Me=function(e,t,a,o){o=o||{},a=null==a?{}:a;var i=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return i.detail=a,e.dispatchEvent(i),i},He=new Set(["call-service","divider","section","weblink","cast","select"]),Pe={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},Te=function(e){Me(window,"haptic",e)},Le=function(e,t,a,o){if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(Te("warning"),confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?")))switch(o.action){case"more-info":(a.entity||a.camera_image)&&Me(e,"hass-more-info",{entityId:a.entity?a.entity:a.camera_image});break;case"navigate":o.navigation_path&&function(e,t,a){void 0===a&&(a=!1),a?history.replaceState(null,"",t):history.pushState(null,"",t),Me(window,"location-changed",{replace:a})}(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":a.entity&&(function(e,t){(function(e,t,a){void 0===a&&(a=!0);var o,i=function(e){return e.substr(0,e.indexOf("."))}(t),r="group"===i?"homeassistant":i;switch(i){case"lock":o=a?"unlock":"lock";break;case"cover":o=a?"open_cover":"close_cover";break;default:o=a?"turn_on":"turn_off"}e.callService(r,o,{entity_id:t})})(e,t,Ee.includes(e.states[t].state))}(t,a.entity),Te("success"));break;case"call-service":if(!o.service)return void Te("failure");var i=o.service.split(".",2);t.callService(i[0],i[1],o.service_data,o.target),Te("success");break;case"fire-dom-event":Me(e,"ll-custom",o)}};function Oe(e){return void 0!==e&&"none"!==e.action}function De(e){window.customCards=window.customCards||[],window.customCards.find(t=>t.type===e.type)||window.customCards.push({preview:!0,...e})}class Ue extends HTMLElement{constructor(){super(...arguments),this.holdTime=500,this.held=!1,this.cancelled=!1}connectedCallback(){["touchcancel","mouseout","mouseup","touchmove","wheel","scroll"].forEach(e=>{document.addEventListener(e,()=>{this.cancelled=!0,this.timer&&(clearTimeout(this.timer),this.timer=void 0)},{passive:!0})})}bind(e,t={}){e.actionHandler&&((e,t)=>!!e&&!!t&&e.hasHold===t.hasHold&&e.hasDoubleClick===t.hasDoubleClick)(t,e.actionHandler.options)||(e.actionHandler?(e.removeEventListener("touchstart",e.actionHandler.start),e.removeEventListener("touchend",e.actionHandler.end),e.removeEventListener("touchcancel",e.actionHandler.end),e.removeEventListener("mousedown",e.actionHandler.start),e.removeEventListener("click",e.actionHandler.end),e.removeEventListener("keydown",e.actionHandler.handleKeyDown)):e.addEventListener("contextmenu",e=>{const t=e||window.event;return t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0,t.returnValue=!1,!1}),e.actionHandler={options:t},e.actionHandler.start=()=>{this.cancelled=!1,t.hasHold&&(this.held=!1,this.timer=window.setTimeout(()=>{this.held=!0},this.holdTime))},e.actionHandler.end=e=>{if(["touchend","touchcancel"].includes(e.type)&&this.cancelled)return;const a=e.target;e.cancelable&&e.preventDefault(),t.hasHold&&(clearTimeout(this.timer),this.timer=void 0),t.hasHold&&this.held?Me(a,"action",{action:"hold"}):t.hasDoubleClick?"click"===e.type&&e.detail<2||!this.dblClickTimeout||this.dblClickTarget!==a?(this.dblClickTarget=a,this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,Me(a,"action",{action:"tap"})},250)):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,Me(a,"action",{action:"double_tap"})):Me(a,"action",{action:"tap"})},e.actionHandler.handleKeyDown=e=>{["Enter"," "].includes(e.key)&&e.currentTarget.actionHandler.end(e)},e.addEventListener("touchstart",e.actionHandler.start,{passive:!0}),e.addEventListener("touchend",e.actionHandler.end),e.addEventListener("touchcancel",e.actionHandler.end),e.addEventListener("mousedown",e.actionHandler.start,{passive:!0}),e.addEventListener("click",e.actionHandler.end),e.addEventListener("keydown",e.actionHandler.handleKeyDown))}}var Ne,Ie;Ne="action-handler",Ie=Ue,customElements.get(Ne)||customElements.define(Ne,Ie);const qe=(e,t)=>{(()=>{const e=document.body,t=e.querySelector("action-handler");if(t)return t;const a=document.createElement("action-handler");return e.appendChild(a),a})().bind(e,t)},Fe=be(class extends ye{update(e,[t]){return qe(e.element,t),K}render(e){}});class Re extends ue{constructor(){super(...arguments),this._handleAction=e=>{this.hass&&this._config&&e.detail?.action&&function(e,t,a,o){var i;"double_tap"===o&&a.double_tap_action?i=a.double_tap_action:"hold"===o&&a.hold_action?i=a.hold_action:"tap"===o&&a.tap_action&&(i=a.tap_action),Le(e,t,a,i)}(this,this.hass,this._actionConfig(),e.detail.action)}}getCardSize(){return 3}getGridOptions(){return{rows:3,columns:6,min_rows:2}}shouldUpdate(e){return!!this._config&&(e.has("_config")||e.has("hass"))}_actionConfig(){return this._config??{}}_actionHandlerDirective(){const e=this._actionConfig();return Fe({hasHold:Oe(e.hold_action),hasDoubleClick:Oe(e.double_tap_action)})}_hasAnyAction(){const e=this._actionConfig();return Oe(e.tap_action??{action:"more-info"})||Oe(e.hold_action)||Oe(e.double_tap_action)}}a([fe({attribute:!1})],Re.prototype,"hass",void 0),a([ve()],Re.prototype,"_config",void 0);const je="ag-entity-card",We=`${je}-editor`,Ve={name:"",value_font:t};let Ge=class extends ue{constructor(){super(...arguments),this._schema=[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"value_font",selector:{text:{}}},{name:"",type:"expandable",title:"Azioni",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]}],this._computeLabel=e=>({entity:"Entità",name:"Nome",icon:"Icona",value_font:"Font",tap_action:"Azione al tap",hold_action:"Azione alla pressione prolungata",double_tap_action:"Azione al doppio tap"}[e.name]??e.title??e.name),this._computeHelper=e=>"value_font"===e.name?"Font di nome e stato. Default 'Jost, sans-serif'; scrivi 'inherit' per usare il font del tema. Il font va caricato dal tema HA, la card non può caricarlo da sé.":void 0}setConfig(e){this._config=e}_valueChanged(e){const t=e.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:J}};a([fe({attribute:!1})],Ge.prototype,"hass",void 0),a([ve()],Ge.prototype,"_config",void 0),Ge=a([pe(We)],Ge);let Be=class extends Re{static async getConfigElement(){return document.createElement(We)}static getStubConfig(){return{type:`custom:${je}`,entity:"sun.sun"}}setConfig(e){if(!e)throw new Error("Configurazione non valida");if(!e.entity)throw new Error("Specifica un'entità da visualizzare (campo 'entity')");this._config={...Ve,...e}}getGridOptions(){return{rows:1,columns:6,min_rows:1}}render(){if(!this._config||!this.hass)return J;const e=this._config.entity,t=e?this.hass.states[e]:void 0,a=this._config.name||t?.attributes.friendly_name||e||"",o=this._hasAnyAction(),i=this._config.value_font?.trim(),r=$e(i?{"--ag-value-font":i}:{});if(!t)return G`
        <ha-card
          class=${o?"interactive":""}
          style=${r}
          @action=${this._handleAction}
          .actionHandler=${this._actionHandlerDirective()}
        >
          <div class="content">
            <ha-icon class="icon unavailable" .icon=${this._config.icon||"mdi:alert-circle-outline"}></ha-icon>
            <span class="name">${a}</span>
            <span class="state unavailable">non disponibile</span>
          </div>
        </ha-card>
      `;const n=this._config.icon||t.attributes.icon,s=t.attributes.unit_of_measurement,l="unavailable"===t.state||"unknown"===t.state,c=this.hass.localize(`component.${t.entity_id.split(".")[0]}.entity_component._.state.${t.state}`)||`${t.state}${s?` ${s}`:""}`;return G`
      <ha-card
        class=${o?"interactive":""}
        style=${r}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content">
          <ha-state-icon
            class="icon"
            .hass=${this.hass}
            .stateObj=${t}
            .icon=${n}
          ></ha-state-icon>
          <span class="name">${a}</span>
          <span class="state ${l?"unavailable":""}">${c}</span>
        </div>
      </ha-card>
    `}};function Ke(e){if(void 0===e||""===e)return;const t=Number(e);return Number.isFinite(t)?t:void 0}Be.styles=l`
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
  `,Be=a([pe(je)],Be),De({type:je,name:"AG Entity Card",description:"Mostra icona, nome e stato di una singola entità.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const Je={mW:.001,W:1,kW:1e3,MW:1e6,GW:1e9,TW:1e12};function Ze(e,t){const a=(t??"W").trim();if(a in Je)return e*Je[a];const o=a.toLowerCase();return"w"===o?e:"kw"===o?1e3*e:void 0}function Ye(e,t){const a=Math.abs(e);return a>=1e3?`${Ce(a/1e3,t,{minimumFractionDigits:2,maximumFractionDigits:2})} kW`:`${Ce(a,t,{maximumFractionDigits:0})} W`}const Qe="ag-load-card",Xe=`${Qe}-editor`,et={name:"",standby_threshold:.5,value_font:t};let tt=class extends ue{constructor(){super(...arguments),this._schema=[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"power_entity",selector:{entity:{domain:"sensor",device_class:"power"}}},{name:"standby_threshold",selector:{number:{min:0,step:.1,mode:"box",unit_of_measurement:"W"}}},{name:"value_font",selector:{text:{}}},{name:"",type:"expandable",title:"Azioni",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]}],this._computeLabel=e=>({entity:"Entità",name:"Nome",icon:"Icona",power_entity:"Sensore di potenza",standby_threshold:"Soglia standby (W)",value_font:"Font",tap_action:"Azione al tap",hold_action:"Azione alla pressione prolungata",double_tap_action:"Azione al doppio tap"}[e.name]??e.title??e.name),this._computeHelper=e=>{switch(e.name){case"power_entity":return"Sensore in W associato al carico. Se assente, la riga potenza è omessa.";case"standby_threshold":return"Sotto questa potenza un carico acceso è considerato in standby (acceso a vuoto).";case"value_font":return"Font di nome e potenza. Default 'Jost, sans-serif'; scrivi 'inherit' per usare il font del tema. Il font va caricato dal tema HA, la card non può caricarlo da sé.";default:return}}}setConfig(e){this._config=e}_valueChanged(e){const t=e.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:J}};a([fe({attribute:!1})],tt.prototype,"hass",void 0),a([ve()],tt.prototype,"_config",void 0),tt=a([pe(Xe)],tt);let at=class extends Re{constructor(){super(...arguments),this._toggle=e=>{e.stopPropagation();const t=this._config?.entity;this.hass&&t&&this.hass.callService("homeassistant","toggle",{entity_id:t})},this._stop=e=>{e.stopPropagation()}}static async getConfigElement(){return document.createElement(Xe)}static getStubConfig(){return{type:`custom:${Qe}`,entity:"switch.decorative_lights"}}setConfig(e){if(!e)throw new Error("Configurazione non valida");if(!e.entity)throw new Error("Specifica un'entità da comandare (campo 'entity')");this._config={...et,...e}}getGridOptions(){return{rows:1,columns:6,min_rows:1}}render(){if(!this._config||!this.hass)return J;const e=this._config,t=e.entity,a=t?this.hass.states[t]:void 0,o=e.name||a?.attributes.friendly_name||t||"",i=this._hasAnyAction(),r=e.value_font?.trim(),n=$e(r?{"--ag-value-font":r}:{}),s=!a||"unavailable"===a.state||"unknown"===a.state,l="on"===a?.state,c=Boolean(e.power_entity),d=e.power_entity?this.hass.states[e.power_entity]:void 0;let u;if(d&&"unavailable"!==d.state&&"unknown"!==d.state){const e=Ke(d.state);u=void 0===e?void 0:Ze(e,d.attributes.unit_of_measurement)}const h=function(e){const{unavailable:t,isOn:a,hasPower:o,watts:i,threshold:r}=e;return t?"unavailable":a?o?void 0!==i&&i>r?"absorbing":"standby":"on":"off"}({unavailable:s,isOn:l,hasPower:c,watts:u,threshold:e.standby_threshold??.5}),p=function(e){return"on"===e||"absorbing"===e}(h),m="absorbing"===h,g=a?G`
          <ha-state-icon
            class="icon ${p?"gold":""} ${s?"unavailable":""}"
            .hass=${this.hass}
            .stateObj=${a}
            .icon=${e.icon}
          ></ha-state-icon>
        `:G`
          <ha-icon
            class="icon unavailable"
            .icon=${e.icon||"mdi:power-plug-outline"}
          ></ha-icon>
        `;return G`
      <ha-card
        class=${i?"interactive":""}
        style=${n}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content ${m?"absorbing":""}">
          ${g}
          <div class="info">
            <span class="name ${s?"unavailable":""}">${o}</span>
            ${c?G`
                  <span
                    class="power ${m?"absorbing":""} ${s?"unavailable":""}"
                    >${function(e,t,a){return void 0===e?"—":"absorbing"===t?Ye(e,a):`${Ce(e,a,{minimumFractionDigits:1,maximumFractionDigits:1})} W${"off"===t?" · spento":"standby"===t?" · standby":""}`}(u,h,this.hass.locale)}</span
                  >
                `:J}
          </div>
          <div
            class="toggle"
            @click=${this._stop}
            @mousedown=${this._stop}
            @touchstart=${this._stop}
            @touchend=${this._stop}
          >
            <ha-switch
              .checked=${l}
              .disabled=${s}
              @change=${this._toggle}
            ></ha-switch>
          </div>
        </div>
      </ha-card>
    `}};at.styles=l`
    ha-card.interactive {
      cursor: pointer;
    }
    /* Rete di sicurezza per i temi con raggio più generoso del chip: senza,
       la velatura sborderebbe squadrata dagli angoli arrotondati. */
    ha-card {
      overflow: hidden;
    }
    /* Come ag-entity-card: il contenitore che ha uno spazio proprio azzera
       --ag-item-padding-x, così le righe si allineano al titolo.
       L'altezza è FISSA e non dedotta dal testo: così una riga con la potenza e
       una senza sono alte uguali e le liste restano regolari. */
    .content {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: var(--ag-load-row-height, 48px);
      padding: 6px var(--ag-item-padding-x, 16px);
      box-sizing: border-box;
    }
    /* Stato "assorbe": velatura oro DIPINTA (pseudo-elemento) e non parte del
       box. Un chip con margini propri cambierebbe l'altezza della riga tra
       spento e assorbe, facendola saltare. Sta su .content e non su ha-card
       così sopravvive al flat, dove il contenitore dissolve la cornice della
       card. Il rientro verticale tiene separate due righe adiacenti che
       assorbono, anche con il gap del contenitore a zero.
       L'accento è affidato a velatura + icona + numero: niente filetto
       verticale a sinistra. */
    .content.absorbing::after {
      content: "";
      position: absolute;
      inset: 3px 0; /* rientro verticale -> 6px di stacco tra righe adiacenti */
      border-radius: 10px;
      background: color-mix(in srgb, var(--accent-color, #ff9800) 8%, transparent);
      z-index: 0;
    }
    /* Lo pseudo-elemento è posizionato: senza questo coprirebbe il contenuto
       statico invece di stargli dietro. */
    .content > * {
      position: relative;
      z-index: 1;
    }
    /* Neutro = attenuato (spento/standby), come nei mockup: --primary-color
       renderebbe l'icona di un carico spento brillante quanto una accesa. */
    .icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 24px;
      flex: 0 0 auto;
    }
    /* Acceso senza sensore, oppure acceso e assorbe: icona in oro. */
    .icon.gold {
      color: var(--accent-color, #ff9800);
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1px;
      flex: 1 1 auto;
      min-width: 0;
    }
    /* Le line-height esplicite non sono cosmetiche: senza, un tema con
       interlinea generosa sfonderebbe --ag-load-row-height e l'altezza della
       riga tornerebbe a dipendere dalla presenza della potenza.
       Conto: 18 + 1 + 15 = 34px di testo, +12px di padding = 46px < 48px. */
    .name {
      font-family: var(--ag-value-font, inherit);
      font-size: 15px;
      line-height: 1.2;
      font-weight: 600;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .power {
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Numero potenza in oro solo quando assorbe. */
    .power.absorbing {
      color: var(--accent-color, #ff9800);
      font-weight: 600;
    }
    .unavailable {
      color: var(--secondary-text-color);
      font-weight: 400;
    }
    .toggle {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
    }
    /* Interruttore acceso in oro.
       ATTENZIONE, dipende dalla versione di HA: ha-switch è stato migrato da
       MWC a webawesome e con esso TUTTA la famiglia di variabili. Nelle versioni
       recenti le --switch-checked-* non esistono più e il track ricade sul
       proprio default var(--ha-color-fill-primary-normal-resting), cioè il blu
       del brand: è il motivo per cui impostarle non sortiva alcun effetto, né
       qui né dal tema. Si impostano quindi entrambe le famiglie, perché la card
       è distribuita e non può sapere su quale versione gira.
       Anche il POMELLO va impostato: il suo default --ha-color-on-primary-normal
       è il contrasto pensato per il primary del brand, e su un track sostituito
       con l'accento resta blu. Lo si porta sul fondo della card, che è scuro in
       tema scuro e chiaro in tema chiaro: sempre in contrasto con l'oro. */
    ha-switch {
      /* HA recenti (webawesome) */
      --ha-switch-checked-background-color: var(--accent-color, #ff9800);
      --ha-switch-checked-background-color-hover: var(--accent-color, #ff9800);
      --ha-switch-checked-border-color: var(--accent-color, #ff9800);
      --ha-switch-checked-thumb-background-color: var(--card-background-color, #fff);
      --ha-switch-checked-thumb-background-color-hover: var(--card-background-color, #fff);
      --ha-switch-checked-thumb-border-color: var(--card-background-color, #fff);
      --ha-switch-checked-thumb-border-color-hover: var(--card-background-color, #fff);
      /* HA precedenti (MWC) */
      --switch-checked-color: var(--accent-color, #ff9800);
      --switch-checked-button-color: var(--accent-color, #ff9800);
      --switch-checked-track-color: var(--accent-color, #ff9800);
    }
  `,at=a([pe(Qe)],at),De({type:Qe,name:"AG Load Card",description:"Comanda on/off un carico e, con un sensore di potenza, distingue se assorbe o è acceso a vuoto.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const ot="ag-alarm-card",it=`${ot}-editor`,rt={name:"",value_font:t,force_arm:!0,show_messages:!1,show_ready_indicator:!1,show_bypass_warning:!1},nt=[{key:"home",bit:1,state:"armed_home",serviceMode:"home",icon:"mdi:shield-home"},{key:"away",bit:2,state:"armed_away",serviceMode:"away",icon:"mdi:shield-lock"},{key:"night",bit:4,state:"armed_night",serviceMode:"night",icon:"mdi:shield-moon"},{key:"vacation",bit:32,state:"armed_vacation",serviceMode:"vacation",icon:"mdi:shield-airplane"},{key:"custom",bit:16,state:"armed_custom_bypass",serviceMode:"custom",icon:"mdi:shield-half-full"}],st={key:"disarm",bit:0,state:"disarmed",icon:"mdi:shield-off"},lt={disarm:st,...Object.fromEntries(nt.map(e=>[e.key,e]))};function ct(e,t){const a=e?.supported_features,o=nt.filter(e=>{return t=e.bit,"number"!=typeof a||0!==(a&t);var t}).map(e=>e.key);if(t&&t.length){const e=new Set(nt.map(e=>e.key));return t.filter(t=>e.has(t)&&o.includes(t))}return o}const dt={disarmed:"disarm",armed_home:"home",armed_away:"away",armed_night:"night",armed_vacation:"vacation",armed_custom_bypass:"custom"};let ut=class extends ue{constructor(){super(...arguments),this._schema=[{name:"entity",required:!0,selector:{entity:{domain:"alarm_control_panel"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"value_font",selector:{text:{}}},{name:"",type:"expandable",title:"Modalità (avanzate)",icon:"mdi:shield-check",schema:[{name:"modes",selector:{select:{multiple:!0,mode:"list",options:[{value:"home",label:"Casa"},{value:"away",label:"Fuori"},{value:"night",label:"Notte"},{value:"vacation",label:"Vacanza"},{value:"custom",label:"Personalizzata"}]}}}]},{name:"",type:"expandable",title:"Funzioni alarmo",icon:"mdi:tune",schema:[{name:"show_messages",selector:{boolean:{}}},{name:"force_arm",selector:{boolean:{}}},{name:"show_ready_indicator",selector:{boolean:{}}},{name:"show_bypass_warning",selector:{boolean:{}}}]},{name:"",type:"expandable",title:"Azioni",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]}],this._computeLabel=e=>({entity:"Pannello alarmo",name:"Nome",icon:"Icona",value_font:"Font",modes:"Modalità mostrate",show_messages:"Messaggi diagnostici",force_arm:"Bottone «Forza inserimento»",show_ready_indicator:"Indicatore pronto/non pronto",show_bypass_warning:"Avviso sensori esclusi",tap_action:"Azione al tap",hold_action:"Azione alla pressione prolungata",double_tap_action:"Azione al doppio tap"}[e.name]??e.title??e.name),this._computeHelper=e=>{switch(e.name){case"modes":return"Quali modalità di inserimento mostrare, nell'ordine scelto. Vuoto = tutte quelle abilitate nel pannello.";case"show_messages":return"Mostra un messaggio quando l'allarme viene inserito o non può essere inserito (es. sensori aperti).";case"force_arm":return"Nel messaggio di inserimento bloccato aggiunge un bottone per forzare l'inserimento bypassando i sensori aperti. Solo con i messaggi attivi e senza codice richiesto.";case"show_ready_indicator":return"Un pallino sui pulsanti di inserimento indica se quella modalità è pronta (verde) o meno (rosso).";case"show_bypass_warning":return"Mostra un avviso quando l'allarme è inserito con dei sensori esclusi (bypass).";default:return}}}setConfig(e){this._config=e}_valueChanged(e){const t=e.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:J}};a([fe({attribute:!1})],ut.prototype,"hass",void 0),a([ve()],ut.prototype,"_config",void 0),ut=a([pe(it)],ut);let ht=class extends Re{constructor(){super(...arguments),this._readyFetching=!1,this._readyAttempted=!1,this._onAlarmoEvent=e=>{const t=e?.event;if(t&&(!e.entity_id||e.entity_id===this._config?.entity)&&(!this._config?.show_ready_indicator||"ready_to_arm_modes_changed"!==t&&"arm"!==t&&"disarm"!==t&&"failed_to_arm"!==t||this._fetchReadyModes(),this._config?.show_messages))switch(t){case"failed_to_arm":this._setMessage({kind:"error",text:this._blockedText(e),forceMode:this._forceModeFor()});break;case"invalid_code_provided":this._setMessage({kind:"error",text:"Codice non valido"},5e3);break;case"no_code_provided":this._setMessage({kind:"error",text:"Codice richiesto"},5e3);break;case"command_not_allowed":this._setMessage({kind:"error",text:"Comando non consentito"},5e3);break;case"trigger":this._setMessage({kind:"error",text:this._triggeredText(e)});break;case"arm":case"disarm":this._clearMessage()}},this._activate=(e,t)=>{e.stopPropagation();const a=this.hass,o=this._config?.entity;a&&o&&(this._codeRequired()?Me(this,"hass-more-info",{entityId:o}):"disarm"!==t.key?(this._lastArmMode=t.serviceMode,a.callService("alarmo","arm",{entity_id:o,mode:t.serviceMode})):a.callService("alarmo","disarm",{entity_id:o}))},this._forceArm=(e,t)=>{e.stopPropagation();const a=this.hass,o=this._config?.entity;a&&o&&(a.callService("alarmo","arm",{entity_id:o,mode:lt[t].serviceMode,force:!0}),this._clearMessage())},this._modeKeydown=(e,t)=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._activate(e,t))},this._stopGesture=e=>{e.stopPropagation()}}static async getConfigElement(){return document.createElement(it)}static getStubConfig(){return{type:`custom:${ot}`,entity:"alarm_control_panel.alarmo"}}setConfig(e){if(!e)throw new Error("Configurazione non valida");if(!e.entity)throw new Error("Specifica il pannello alarmo (campo 'entity')");this._config={...rt,...e}}getGridOptions(){return{rows:1,columns:6,min_rows:1}}shouldUpdate(e){return!!this._config&&(e.has("_config")||e.has("hass")||e.has("_message")||e.has("_readyModes"))}connectedCallback(){super.connectedCallback(),this._updateSubscription()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe(),this._clearMessageTimer(),this._subscribedKey=void 0}updated(e){(e.has("_config")||e.has("hass"))&&this._updateSubscription()}_updateSubscription(){this._syncSubscription(),this._ensureReadyModes()}_syncSubscription(){const e=this._config,t=this.hass,a=Boolean(e&&(e.show_messages||e.show_ready_indicator)),o=e?.entity,i=a&&t&&o?o:"";if(i!==this._subscribedKey&&(this._subscribedKey=i,this._unsubscribe(),this._readyModes=void 0,this._readyAttempted=!1,this._clearMessage(),i&&t))try{this._unsubMessage=t.connection.subscribeMessage(e=>this._onAlarmoEvent(e),{type:"alarmo_updated"}),this._unsubMessage.catch(()=>{this._unsubMessage=void 0})}catch{this._unsubMessage=void 0}}_unsubscribe(){const e=this._unsubMessage;this._unsubMessage=void 0,e&&e.then(e=>e()).catch(()=>{})}_ensureReadyModes(){!this._config?.show_ready_indicator||this._readyAttempted||this._readyFetching||this._fetchReadyModes()}_fetchReadyModes(){const e=this.hass,t=this._config?.entity;e&&t&&(this._readyFetching=!0,e.callWS({type:"alarmo/ready_to_arm_modes",entity_id:t}).then(e=>{this._readyModes=Array.isArray(e?.modes)?e.modes:[],this._readyFetching=!1,this._readyAttempted=!0}).catch(()=>{this._readyModes=void 0,this._readyFetching=!1,this._readyAttempted=!0}))}_forceModeFor(){if(this._config?.force_arm&&!this._codeRequired())return this._lastArmMode}_codeRequired(){const e=this._config?.entity,t=e?this.hass?.states[e]:void 0;return Boolean(t?.attributes.code_format)}_blockedText(e){const t=this._openSensorIds(e);return t.length?`Impossibile inserire: ${this._sensorNames(t)}`:"Impossibile inserire: sensori aperti"}_triggeredText(e){const t=this._openSensorIds(e);return t.length?`Allarme scattato: ${this._sensorNames(t)}`:"Allarme scattato"}_openSensorIds(e){if(e.open_sensors&&"object"==typeof e.open_sensors)return Object.keys(e.open_sensors);if(Array.isArray(e.sensors))return e.sensors;const t=this._config?.entity,a=t?this.hass?.states[t]?.attributes.open_sensors:void 0;return a&&"object"==typeof a?Object.keys(a):[]}_sensorNames(e){return e.map(e=>this.hass?.states[e]?.attributes.friendly_name||e).join(", ")}_setMessage(e,t){this._clearMessageTimer(),this._message=e,t&&(this._messageTimer=window.setTimeout(()=>{this._message=void 0,this._messageTimer=void 0},t))}_clearMessage(){this._clearMessageTimer(),this._message=void 0}_clearMessageTimer(){void 0!==this._messageTimer&&(clearTimeout(this._messageTimer),this._messageTimer=void 0)}render(){if(!this._config||!this.hass)return J;const e=this._config,t=e.entity,a=t?this.hass.states[t]:void 0,o=e.name||a?.attributes.friendly_name||t||"",i=this._hasAnyAction(),r=e.value_font?.trim(),n=$e(r?{"--ag-value-font":r}:{});if(!a)return G`
        <ha-card
          class=${i?"interactive":""}
          style=${n}
          @action=${this._handleAction}
          .actionHandler=${this._actionHandlerDirective()}
        >
          <div class="content unavailable">
            <ha-icon
              class="icon"
              .icon=${e.icon||"mdi:shield-alert-outline"}
            ></ha-icon>
            <div class="info">
              <span class="name">${o}</span>
              <span class="state">non disponibile</span>
            </div>
          </div>
        </ha-card>
      `;const s=a.state,l=function(e){return e&&"unavailable"!==e&&"unknown"!==e?"disarmed"===e?"disarmed":"arming"===e?"arming":"pending"===e?"pending":"triggered"===e?"triggered":e.startsWith("armed_")?"armed":"disarmed":"unavailable"}(s),c="unavailable"===l,d=this.hass.localize(`component.alarm_control_panel.entity_component._.state.${s}`)||s,u=function(e,t){if(e){if(dt[e])return dt[e];if("arming"===e||"pending"===e||"triggered"===e){const e=t?.arm_mode;if(e&&nt.some(t=>t.key===e))return e}}}(s,a.attributes),h=ct(a.attributes,e.modes),p=[st,...h.map(e=>lt[e])];return G`
      <ha-card
        class=${i?"interactive":""}
        style=${n}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content ${l}">
          <ha-state-icon
            class="icon"
            .hass=${this.hass}
            .stateObj=${a}
            .icon=${e.icon}
          ></ha-state-icon>
          <div class="info">
            <span class="name ${c?"unavailable":""}">${o}</span>
            <span class="state">${d}</span>
          </div>
          <div
            class="modes"
            @click=${this._stopGesture}
            @mousedown=${this._stopGesture}
            @touchstart=${this._stopGesture}
            @touchend=${this._stopGesture}
          >
            ${p.map(e=>this._renderModeButton(e,u,c))}
          </div>
        </div>
        ${this._renderNotice(a)}
      </ha-card>
    `}_renderModeButton(e,t,a){const o=e.key===t,i=this._modeLabel(e),r=Boolean(this._config?.show_ready_indicator)&&"disarm"!==e.key&&!!this._readyModes?this._readyModes?.includes(e.key)?"ready":"not-ready":"";return G`
      <div
        class="mode ${o?"selected":""} ${r} ${a?"disabled":""}"
        role="button"
        tabindex=${a?-1:0}
        aria-label=${i}
        aria-pressed=${o?"true":"false"}
        title=${i}
        @click=${t=>{a||this._activate(t,e)}}
        @keydown=${t=>{a||this._modeKeydown(t,e)}}
      >
        <ha-icon .icon=${e.icon}></ha-icon>
        ${r?G`<span class="ready-dot" aria-hidden="true"></span>`:J}
      </div>
    `}_modeLabel(e){const t=this.hass?.localize(`component.alarm_control_panel.entity_component._.state.${e.state}`);return t||e.key}_renderNotice(e){const t=this._config?.show_messages?this._message:void 0;if(t){const e=t.forceMode;return G`
        <div class="notice ${t.kind}">
          <ha-icon
            class="notice-icon"
            icon=${"info"===t.kind?"mdi:information-outline":"mdi:alert-outline"}
          ></ha-icon>
          <span class="notice-text">${t.text}</span>
          ${e?G`
                <button
                  class="force"
                  @click=${t=>this._forceArm(t,e)}
                  @mousedown=${this._stopGesture}
                  @touchstart=${this._stopGesture}
                >
                  Forza inserimento
                </button>
              `:J}
        </div>
      `}if(this._config?.show_bypass_warning){const t=e.attributes.bypassed_sensors;if(e.state.startsWith("armed_")&&t&&t.length){const e=1===t.length?"sensore escluso":"sensori esclusi";return G`
          <div class="notice warning">
            <ha-icon class="notice-icon" icon="mdi:shield-alert-outline"></ha-icon>
            <span class="notice-text"
              >Inserito con ${t.length} ${e}: ${this._sensorNames(t)}</span
            >
          </div>
        `}}return J}};ht.styles=l`
    ha-card.interactive {
      cursor: pointer;
    }
    /* Serve per contenere la velatura di stato entro gli angoli arrotondati. */
    ha-card {
      overflow: hidden;
    }

    /* --ag-state-color guida il colore di icona, stato e pulsante attivo in
       base allo stato del pannello: neutro da disinserito, oro da inserito,
       giallo in transizione, rosso se scattato. */
    .content {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      min-height: var(--ag-alarm-row-height, 48px);
      padding: 6px var(--ag-item-padding-x, 16px);
      box-sizing: border-box;
      --ag-state-color: var(--secondary-text-color);
    }
    .content.disarmed {
      --ag-state-color: var(--primary-text-color);
    }
    .content.armed {
      --ag-state-color: var(--accent-color, #ff9800);
    }
    .content.arming,
    .content.pending {
      --ag-state-color: var(--warning-color, #ffa600);
    }
    .content.triggered {
      --ag-state-color: var(--error-color, #db4437);
    }

    /* Velatura di stato DIPINTA (pseudo-elemento), come ag-load-card: non entra
       nel box, così l'altezza della riga non salta tra gli stati, e sopravvive
       al flat (dove il contenitore dissolve la cornice della card). */
    .content.armed::after,
    .content.arming::after,
    .content.pending::after,
    .content.triggered::after {
      content: "";
      position: absolute;
      inset: 3px 0;
      border-radius: 10px;
      background: color-mix(in srgb, var(--ag-state-color) 8%, transparent);
      z-index: 0;
    }
    .content.triggered::after {
      background: color-mix(in srgb, var(--ag-state-color) 14%, transparent);
    }
    .content > * {
      position: relative;
      z-index: 1;
    }

    .icon {
      color: var(--ag-state-color);
      --mdc-icon-size: 24px;
      flex: 0 0 auto;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1px;
      flex: 1 1 auto;
      min-width: 0;
    }
    /* line-height esplicite: senza, un tema con interlinea generosa sfonderebbe
       --ag-alarm-row-height. */
    .name {
      font-family: var(--ag-value-font, inherit);
      font-size: 15px;
      line-height: 1.2;
      font-weight: 600;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .state {
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Lo stato prende il colore solo quando "non è calma piatta". */
    .content.armed .state,
    .content.arming .state,
    .content.pending .state,
    .content.triggered .state {
      color: var(--ag-state-color);
      font-weight: 600;
    }
    .name.unavailable {
      color: var(--secondary-text-color);
      font-weight: 400;
    }

    /* -- Barra segmentata delle modalità -------------------------------- */
    .modes {
      flex: 0 0 auto;
      display: flex;
      align-items: stretch;
      border-radius: 10px;
      overflow: hidden;
      background-color: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
    .mode {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      padding: 6px 10px;
      box-sizing: border-box;
      cursor: pointer;
      color: var(--secondary-text-color);
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }
    .mode + .mode {
      border-left: 1px solid var(--divider-color, #e0e0e0);
    }
    .mode ha-icon {
      --mdc-icon-size: 20px;
    }
    .mode:hover {
      background-color: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
    }
    .mode:focus-visible {
      outline: 2px solid var(--accent-color, #ff9800);
      outline-offset: -2px;
    }
    /* Attivo: velatura + colore nel colore di stato corrente. Su disinserito è
       neutro (primary-text), da inserito è oro, ecc. */
    .mode.selected {
      background-color: color-mix(in srgb, var(--ag-state-color) 18%, transparent);
      color: var(--ag-state-color);
    }
    .mode.disabled {
      cursor: default;
      color: var(--disabled-text-color, #bdbdbd);
    }
    .mode.disabled:hover {
      background-color: transparent;
    }

    /* Pallino pronto/non pronto in alto a destra del pulsante. */
    .ready-dot {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--disabled-text-color, #bdbdbd);
    }
    .mode.ready .ready-dot {
      background-color: var(--success-color, #43a047);
    }
    .mode.not-ready .ready-dot {
      background-color: var(--error-color, #db4437);
    }

    /* -- Avviso / messaggio diagnostico --------------------------------- */
    .notice {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px var(--ag-item-padding-x, 16px);
      border-top: 1px solid var(--divider-color, #e0e0e0);
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      line-height: 1.35;
    }
    .notice.error {
      color: var(--error-color, #db4437);
    }
    .notice.warning {
      color: var(--warning-color, #ffa600);
    }
    .notice.info {
      color: var(--secondary-text-color);
    }
    .notice-icon {
      flex: 0 0 auto;
      --mdc-icon-size: 18px;
    }
    .notice-text {
      flex: 1 1 auto;
      min-width: 0;
      color: var(--primary-text-color);
    }
    .force {
      flex: 0 0 auto;
      font-family: inherit;
      font-size: 12px;
      font-weight: 600;
      color: var(--accent-color, #ff9800);
      background: none;
      border: 1px solid var(--accent-color, #ff9800);
      border-radius: 8px;
      padding: 4px 10px;
      cursor: pointer;
    }
    .force:hover {
      background-color: color-mix(in srgb, var(--accent-color, #ff9800) 12%, transparent);
    }

    @media (prefers-reduced-motion: reduce) {
      .mode {
        transition: none;
      }
    }
  `,a([ve()],ht.prototype,"_message",void 0),a([ve()],ht.prototype,"_readyModes",void 0),ht=a([pe(ot)],ht),De({type:ot,name:"AG Alarm Card",description:"Pannello allarme alarmo in stile mosaico: modalità di inserimento, messaggi, pronto/non pronto e avviso bypass.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const pt="ag-battery-card",mt=`${pt}-editor`,gt={level_warning:50,level_alarm:20,idle_power:50,title_size:15},ft={name:"",invert_power:!1,title_font:"",value_font:t,...gt},vt={normal:"var(--accent-color, #ff9800)",charging:"var(--success-color, #43a047)",warning:"var(--warning-color, #ffa600)",alarm:"var(--error-color, #db4437)"},_t="var(--disabled-text-color, #bdbdbd)";function bt(e,t=["on"]){const a=(e??"").split(",").map(e=>e.trim().toLowerCase()).filter(Boolean);return a.length?a:t}function yt(e,t){return void 0===e||""===e||"unavailable"===e||"unknown"===e?"unavailable":t.includes(e.toLowerCase())?"ok":"off"}const xt=2*Math.PI*42;let wt=class extends ue{constructor(){super(...arguments),this._schema=[{name:"battery_entity",required:!0,selector:{entity:{}}},{name:"power_entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"",type:"expandable",title:"Rete e backup",icon:"mdi:transmission-tower",schema:[{name:"backup_entity",selector:{entity:{}}},{name:"backup_ok_states",selector:{text:{}}},{name:"grid_entity",selector:{entity:{}}},{name:"grid_ok_states",selector:{text:{}}}]},{name:"",type:"expandable",title:"Soglie",icon:"mdi:tune",schema:[{name:"",type:"grid",schema:[{name:"level_warning",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}},{name:"level_alarm",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}}]},{name:"idle_power",selector:{number:{min:0,step:5,mode:"box",unit_of_measurement:"W"}}},{name:"invert_power",selector:{boolean:{}}}]},{name:"",type:"expandable",title:"Aspetto",icon:"mdi:palette",schema:[{name:"",type:"grid",schema:[{name:"title_font",selector:{text:{}}},{name:"title_size",selector:{number:{min:10,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}]},{name:"value_font",selector:{text:{}}},{name:"color_normal",selector:{text:{}}},{name:"color_charging",selector:{text:{}}},{name:"color_warning",selector:{text:{}}},{name:"color_alarm",selector:{text:{}}}]},{name:"",type:"expandable",title:"Azioni",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]}],this._computeLabel=e=>({battery_entity:"Entità carica (%)",power_entity:"Entità potenza",name:"Nome",backup_entity:"Entità gateway backup",backup_ok_states:"Stati backup considerati OK",grid_entity:"Entità rete",grid_ok_states:"Stati rete considerati OK",level_warning:"Soglia warning",level_alarm:"Soglia allarme",idle_power:"Soglia potenza in attesa",invert_power:"Inverti segno potenza",title_font:"Font del titolo",title_size:"Dimensione titolo",value_font:"Font di percentuale e righe",color_normal:"Colore normale",color_charging:"Colore in carica",color_warning:"Colore warning",color_alarm:"Colore allarme",tap_action:"Azione al tap",hold_action:"Azione alla pressione prolungata",double_tap_action:"Azione al doppio tap"}[e.name]??e.title??e.name),this._computeHelper=e=>{const t="Vuoto = colore del tema. Accetta CSS: #ff9800, red, var(--mia-var).",a="Elenco separato da virgola. Vuoto = convenzione HA: 'on' = OK.";return{power_entity:"Positiva in carica, negativa in scarica (usa l'inversione se è al contrario).",backup_ok_states:a,grid_ok_states:a,idle_power:"Sotto questo valore assoluto la batteria è considerata 'in attesa'.",invert_power:"Da attivare se la potenza è negativa durante la carica.",title_font:"Vuoto = font del tema. Es: 'Cormorant Garamond', serif — il font va caricato dal tema HA, la card non può caricarlo da sé.",title_size:"Dimensione del titolo. I serif da display stanno meglio sui 17-18px.",value_font:"Font della percentuale e delle righe di stato. Default 'Jost, sans-serif'; scrivi 'inherit' per usare il font del tema.",color_normal:t,color_charging:t,color_warning:t,color_alarm:t}[e.name]}}setConfig(e){this._config=e}_valueChanged(e){const t=e.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:J}};a([fe({attribute:!1})],wt.prototype,"hass",void 0),a([ve()],wt.prototype,"_config",void 0),wt=a([pe(mt)],wt);const $t={charging:"mdi:flash",discharging:"mdi:flash-outline",idle:"mdi:pause-circle-outline"};let zt=class extends Re{static async getConfigElement(){return document.createElement(mt)}static getStubConfig(e){const t=t=>e&&Object.keys(e.states).find(a=>a.startsWith("sensor.")&&e.states[a].attributes.device_class===t)||"";return{type:`custom:${pt}`,battery_entity:t("battery"),power_entity:t("power")}}setConfig(e){if(!e)throw new Error("Configurazione non valida");if(!e.battery_entity)throw new Error("Specifica l'entità della carica batteria (campo 'battery_entity')");if(!e.power_entity)throw new Error("Specifica l'entità della potenza batteria (campo 'power_entity')");const t=Object.fromEntries(Object.entries(e).filter(([,e])=>void 0!==e));this._config={...ft,...t}}getCardSize(){return 2}getGridOptions(){return{rows:2,columns:6,min_rows:2,min_columns:3}}_actionConfig(){const e=this._config;return{entity:e?.battery_entity,tap_action:e?.tap_action,hold_action:e?.hold_action,double_tap_action:e?.double_tap_action}}_color(e){const t=this._config,a="charging"===e?t?.color_charging:"warning"===e?t?.color_warning:"alarm"===e?t?.color_alarm:t?.color_normal;return a?.trim()||vt[e]}render(){if(!this._config||!this.hass)return J;const e=this._config,t=e.battery_entity?this.hass.states[e.battery_entity]:void 0,a=e.power_entity?this.hass.states[e.power_entity]:void 0,o=e.name||t?.attributes.friendly_name||e.battery_entity||"Batteria",i=this._hasAnyAction();if(!t||!a)return G`
        <ha-card
          class=${i?"interactive":""}
          @action=${this._handleAction}
          .actionHandler=${this._actionHandlerDirective()}
        >
          <div class="content">
            <div class="info">
              <div class="title">${o}</div>
              <div class="row muted">
                <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                <span>Entità non disponibile</span>
              </div>
            </div>
          </div>
        </ha-card>
      `;const r=Ke(t.state),n=void 0!==r,s=n?Math.min(100,Math.max(0,r)):0,l=e.level_warning??gt.level_warning,c=e.level_alarm??gt.level_alarm,d=n?function(e,t,a){return e<a?"alarm":e<t?"warning":"normal"}(s,l,c):"normal",u=n?this._color(d):_t,h=Ke(a.state),p=void 0===h?void 0:Ze(h,a.attributes.unit_of_measurement),m=void 0===p?void 0:e.invert_power?-p:p,g=Math.abs(e.idle_power??gt.idle_power),f=void 0===m?void 0:function(e,t){return e>t?"charging":e<-t?"discharging":"idle"}(m,g),v="charging"===f?this._color("charging"):"discharging"===f?u:"idle"===f?this._color("normal"):_t,_=f?$t[f]:"mdi:help-circle-outline",b=void 0===m||void 0===f?"Potenza non disponibile":"idle"===f?"In attesa":`${"charging"===f?"In carica":"In scarica"} · ${Ye(m,this.hass.locale)}`,y=function(e,t){if(void 0!==e||void 0!==t)return"unavailable"===e?{severity:"alarm",message:"Sistema di backup non disponibile",icon:"mdi:alert-circle"}:"off"===e?{severity:"alarm",message:"Anomalia sistema di backup",icon:"mdi:alert-circle"}:"unavailable"===t?{severity:"alarm",message:"Stato rete non disponibile",icon:"mdi:alert-circle"}:"off"===t?{severity:"warning",message:"Rete assente · funzionamento a isola",icon:"mdi:transmission-tower-off"}:"ok"===e&&"ok"===t?{severity:"normal",message:"Rete presente · backup pronto",icon:"mdi:transmission-tower"}:"ok"===t?{severity:"normal",message:"Rete presente",icon:"mdi:transmission-tower"}:{severity:"normal",message:"Backup pronto",icon:"mdi:shield-check"}}(e.backup_entity?yt(this.hass.states[e.backup_entity]?.state,bt(e.backup_ok_states)):void 0,e.grid_entity?yt(this.hass.states[e.grid_entity]?.state,bt(e.grid_ok_states)):void 0),x=y?.severity??"normal",w=e.title_font?.trim(),$=e.value_font?.trim(),z=$e({"--ag-gauge-color":u,"--ag-flow-color":v,"--ag-tint":this._color(x),"--ag-title-size":`${e.title_size??gt.title_size}px`,...w?{"--ag-title-font":w}:{},...$?{"--ag-value-font":$}:{}});return G`
      <ha-card
        class="${x}${i?" interactive":""}"
        style=${z}
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
            aria-valuenow=${n?Math.round(s):J}
            aria-valuetext=${n?`${Math.round(s)}%`:"non disponibile"}
          >
            <svg viewBox="0 0 100 100" aria-hidden="true">
              ${function(e){const t=void 0===e?0:Math.min(100,Math.max(0,e));return B`
    <circle class="ring-track" cx="50" cy="50" r="${42}"></circle>
    ${t>0?B`<circle
            class="ring-value"
            cx="50"
            cy="50"
            r="${42}"
            stroke-dasharray="${xt}"
            stroke-dashoffset="${xt*(1-t/100)}"
            transform="rotate(-90 50 50)"
          ></circle>`:J}
  `}(n?s:void 0)}
            </svg>
            <div class="gauge-label" aria-hidden="true">
              <span class="gauge-value"
                >${n?G`${Math.round(s)}<span class="pct">%</span>`:"–"}</span
              >
            </div>
          </div>

          <div class="info">
            <div class="title" title=${o}>${o}</div>
            <div class="row flow">
              <ha-icon .icon=${_}></ha-icon>
              <span>${b}</span>
            </div>
            ${y?G`
                  <div class="row system">
                    <ha-icon .icon=${y.icon}></ha-icon>
                    <span>${y.message}</span>
                  </div>
                `:J}
          </div>
        </div>
      </ha-card>
    `}};zt.styles=l`
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
  `,zt=a([pe(pt)],zt),De({type:pt,name:"AG Battery Card",description:"Stato di una batteria domestica: carica, potenza, rete e backup.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const kt="ag-bar-card",At=`${kt}-editor`,Ct=1,St=15,Et=6,Mt={name:"",description:"",icon:"",show_icon:!0,value_format:"auto",max_mode:"own",max_unit:"",level_direction:"above",title_font:t,value_font:t,decimals:Ct,title_size:St,bar_height:Et},Ht={normal:"var(--primary-color, #03a9f4)",warning:"var(--warning-color, #ffa600)",alarm:"var(--error-color, #db4437)"};function Pt(e,t){return e??t}let Tt=class extends ue{constructor(){super(...arguments),this._schema=[{name:"entity",required:!0,selector:{entity:{}}},{name:"",type:"grid",schema:[{name:"name",selector:{text:{}}},{name:"description",selector:{text:{}}}]},{name:"",type:"grid",schema:[{name:"icon",selector:{icon:{}}},{name:"show_icon",selector:{boolean:{}}}]},{name:"",type:"expandable",title:"Valore e massimo",icon:"mdi:ruler",schema:[{name:"",type:"grid",schema:[{name:"value_format",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Automatico"},{value:"power",label:"Potenza (W / kW)"}]}}},{name:"decimals",selector:{number:{min:0,max:3,step:1,mode:"box"}}}]},{name:"max_mode",selector:{select:{mode:"dropdown",options:[{value:"own",label:"Massimo della card"},{value:"group",label:"Massimo del gruppo"}]}}},{name:"max_entity",selector:{entity:{}}},{name:"",type:"grid",schema:[{name:"max_value",selector:{number:{min:0,step:"any",mode:"box"}}},{name:"max_unit",selector:{select:{mode:"dropdown",custom_value:!0,options:[{value:"",label:"Come l'entità"},{value:"W",label:"W"},{value:"kW",label:"kW"},{value:"MW",label:"MW"}]}}}]}]},{name:"",type:"expandable",title:"Soglie",icon:"mdi:tune",schema:[{name:"level_direction",selector:{select:{mode:"dropdown",options:[{value:"above",label:"Alto = allarme"},{value:"below",label:"Basso = allarme"}]}}},{name:"",type:"grid",schema:[{name:"level_warning",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}},{name:"level_alarm",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}}]}]},{name:"",type:"expandable",title:"Aspetto",icon:"mdi:palette",schema:[{name:"",type:"grid",schema:[{name:"title_font",selector:{text:{}}},{name:"value_font",selector:{text:{}}}]},{name:"title_size",selector:{number:{min:10,max:32,step:1,mode:"box",unit_of_measurement:"px"}}},{name:"bar_height",selector:{number:{min:2,max:24,step:1,mode:"box",unit_of_measurement:"px"}}},{name:"color_normal",selector:{text:{}}},{name:"color_warning",selector:{text:{}}},{name:"color_alarm",selector:{text:{}}}]},{name:"",type:"expandable",title:"Azioni",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]}],this._computeLabel=e=>({entity:"Entità del valore",name:"Nome",description:"Descrizione",icon:"Icona",show_icon:"Mostra icona",value_format:"Formato del valore",decimals:"Decimali",max_mode:"Origine del massimo",max_entity:"Entità del massimo",max_value:"Massimo",max_unit:"Unità del massimo",level_direction:"Direzione delle soglie",level_warning:"Soglia warning",level_alarm:"Soglia allarme",title_font:"Font di nome e descrizione",value_font:"Font del valore",title_size:"Dimensione nome",bar_height:"Spessore barra",color_normal:"Colore normale",color_warning:"Colore warning",color_alarm:"Colore allarme",tap_action:"Azione al tap",hold_action:"Azione alla pressione prolungata",double_tap_action:"Azione al doppio tap"}[e.name]??e.title??e.name),this._computeHelper=e=>{const t="Vuoto = colore del tema. Accetta CSS: #ff9800, red, var(--mia-var).",a=e=>`${e} Default 'Jost, sans-serif'; scrivi 'inherit' per usare il font del tema. Il font va caricato dal tema HA, la card non può caricarlo da sé.`,o="In percentuale del massimo. Vuota = nessuna soglia. Le soglie cambiano solo il colore della barra, non lo sfondo della card.";return{description:"Testo breve accanto al nome, in maiuscoletto (es. 19 KWP).",icon:"Vuota = icona dell'entità. Prende il colore della barra.",show_icon:"Spegni per non mostrare nessuna icona.",value_format:"Automatico usa valore e unità dell'entità. Potenza converte tutto in W e mostra W/kW: da usare su tutte le barre di un gruppo con unità diverse.",decimals:"Solo per il formato automatico: le potenze si formattano da sole.",max_mode:"Massimo del gruppo: tutte le barre dello stesso contenitore si scalano sulla capacità dichiarata più alta del gruppo. Va attivato anche 'Massimo condiviso' sul contenitore.",max_entity:"Entità che fornisce il massimo (es. la potenza di picco dell'impianto). Se impostata ha la precedenza sul campo Massimo.",max_value:"Massimo fisso. Vuoto e senza entità del massimo: la barra si scala sul proprio valore, quindi resta piena.",max_unit:"Unità in cui è espresso il Massimo, con il formato Potenza. 'Come l'entità' lo interpreta nell'unità del sensore: con un sensore in W, un impianto da 19 kWp va scritto 19 + kW, altrimenti vale 19 W e la barra resta sempre piena.",level_direction:"Alto = allarme per consumi e carichi; basso = allarme per livelli e riserve (come la batteria).",level_warning:o,level_alarm:o,title_font:a("Font di nome e descrizione, le due etichette a sinistra."),value_font:a("Font del solo valore, così il numero può differire dalle etichette."),title_size:"Dimensione del nome. I serif da display stanno meglio sui 17-18px.",bar_height:"Spessore della barra di progresso.",color_normal:t,color_warning:t,color_alarm:t}[e.name]}}setConfig(e){this._config=e}_valueChanged(e){const t=e.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:J}};a([fe({attribute:!1})],Tt.prototype,"hass",void 0),a([ve()],Tt.prototype,"_config",void 0),Tt=a([pe(At)],Tt);let Lt=class extends Re{static async getConfigElement(){return document.createElement(At)}static getStubConfig(e){const t=e&&Object.keys(e.states).find(t=>t.startsWith("sensor.")&&"power"===e.states[t].attributes.device_class)||"";return{type:`custom:${kt}`,entity:t,value_format:"power"}}setConfig(e){if(!e)throw new Error("Configurazione non valida");if(!e.entity)throw new Error("Specifica l'entità del valore (campo 'entity')");const t=Object.fromEntries(Object.entries(e).filter(([,e])=>void 0!==e));this._config={...Mt,...t}}getCardSize(){return 1}getGridOptions(){return{rows:1,columns:12,min_rows:1,min_columns:6}}shouldUpdate(e){return super.shouldUpdate(e)||e.has("_groupMax")}connectedCallback(){super.connectedCallback(),this._syncGroup()}disconnectedCallback(){this._leaveGroup(),super.disconnectedCallback()}willUpdate(e){super.willUpdate(e),this._syncGroup()}_syncGroup(){const e=this._config;if(!e||"group"!==e.max_mode)return void this._leaveGroup();const{compare:t,scale:a}=this._readValue(),o=Pt(this._declaredMax(),t);if(this._groupHandle)return void(o===this._publishedMax&&a===this._publishedScale||(this._publishedMax=o,this._publishedScale=a,this._groupHandle.update(o,a)));this._publishedMax=o,this._publishedScale=a;const i={source:this,value:o,scale:a,onMax:e=>{this._groupMax=e}};this.dispatchEvent(new CustomEvent("ag-group-max",{detail:i,bubbles:!0,composed:!0})),this._groupHandle=i.handle,this._groupHandle||(this._groupMax=void 0)}_leaveGroup(){this._groupHandle?.release(),this._groupHandle=void 0,this._publishedMax=void 0,this._publishedScale=void 0,this._groupMax=void 0}_readValue(){const e=this._config,t=e?.entity?this.hass?.states[e.entity]:void 0;return a=Ke(t?.state),o=t?.attributes.unit_of_measurement,"power"===(e?.value_format??"auto")?{raw:a,compare:void 0===a?void 0:Ze(a,o),scale:"W"}:{raw:a,compare:a,scale:(o??"").trim()};var a,o}_declaredMax(){const e=this._config;if(!e)return;const t=e.entity?this.hass?.states[e.entity]:void 0,a=e.max_entity?this.hass?.states[e.max_entity]:void 0;return function(e,t,a,o,i,r){if(void 0!==e)return"power"===r?Ze(e,t):e;if(void 0!==a)return"power"!==r?a:Ze(a,o?.trim()||i)}(Ke(a?.state),a?.attributes.unit_of_measurement,e.max_value,e.max_unit,t?.attributes.unit_of_measurement,e.value_format??"auto")}_color(e){const t=this._config,a="warning"===e?t?.color_warning:"alarm"===e?t?.color_alarm:t?.color_normal;return a?.trim()||Ht[e]}_formatValue(e,t){const a=this._config;if(void 0===e||!this.hass||!a)return"–";if("power"===a.value_format)return void 0===t?"–":`${t<0?"-":""}${Ye(t,this.hass.locale)}`;const o=a.entity?this.hass.states[a.entity]:void 0,i=a.decimals??Ct,r=Ce(e,this.hass.locale,{maximumFractionDigits:i}),n=o?.attributes.unit_of_measurement;return n?`${r} ${n}`:r}render(){if(!this._config||!this.hass)return J;const e=this._config,t=e.entity?this.hass.states[e.entity]:void 0,a=e.name||t?.attributes.friendly_name||e.entity||"",o=this._hasAnyAction(),{raw:i,compare:r}=this._readValue(),n=void 0!==r,s=(l=e.max_mode??"own",c=this._groupMax,d=Pt(this._declaredMax(),r),"group"===l?c??d:d);var l,c,d;const u=function(e,t){return void 0===e||void 0===t||!Number.isFinite(e)||!Number.isFinite(t)||t<=0?0:Math.min(100,Math.max(0,e/t*100))}(r,s),h=n?function(e,t,a,o){return"below"===o?void 0!==a&&e<a?"alarm":void 0!==t&&e<t?"warning":"normal":void 0!==a&&e>=a?"alarm":void 0!==t&&e>=t?"warning":"normal"}(u,e.level_warning,e.level_alarm,e.level_direction??"above"):"normal",p=n?this._color(h):"var(--disabled-text-color, #bdbdbd)",m=this._formatValue(i,r),g=e.title_font?.trim(),f=e.value_font?.trim(),v=$e({"--ag-bar-fill":`${u}%`,"--ag-bar-color":p,"--ag-bar-height":`${e.bar_height??Et}px`,"--ag-title-size":`${e.title_size??St}px`,...g?{"--ag-title-font":g}:{},...f?{"--ag-value-font":f}:{}});return G`
      <ha-card
        class=${o?"interactive":""}
        style=${v}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        <div class="content">
          <div class="row">
            ${!1===e.show_icon?J:t?G`
                    <ha-state-icon
                      class="icon"
                      .hass=${this.hass}
                      .stateObj=${t}
                      .icon=${e.icon||void 0}
                    ></ha-state-icon>
                  `:G`
                    <ha-icon
                      class="icon"
                      .icon=${e.icon||"mdi:alert-circle-outline"}
                    ></ha-icon>
                  `}
            <span class="name" title=${a}>${a}</span>
            ${e.description?G`<span class="description">${e.description}</span>`:J}
            <span class="value">${m}</span>
          </div>
          <div
            class="track"
            role="progressbar"
            aria-label=${a}
            aria-valuemin="0"
            aria-valuemax=${void 0!==s&&s>0?s:J}
            aria-valuenow=${n?r:J}
            aria-valuetext=${m}
          >
            <div class="fill"></div>
          </div>
        </div>
      </ha-card>
    `}};Lt.styles=l`
    ha-card {
      height: 100%;
      box-sizing: border-box;
    }
    ha-card.interactive {
      cursor: pointer;
    }

    /* Lo spazio lo azzera il contenitore che ne fornisce uno proprio (vedi
       ag-panel-card): sull'asse X per allineare la riga al titolo, sull'asse Y
       perché senza cornice non c'è più niente da cui distanziare il testo e a
       regolare il ritmo tra le barre resta il gap del contenitore. Fuori da
       un contenitore valgono i fallback. */
    .content {
      padding: var(--ag-item-padding-y, 10px) var(--ag-item-padding-x, 16px);
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
    /* Le icone non hanno una baseline utile: vanno centrate a parte.
       ha-state-icon rende dentro un ha-icon/ha-svg-icon su currentColor,
       quindi color e --mdc-icon-size valgono per entrambi i rami. */
    .icon {
      align-self: center;
      flex: 0 0 auto;
      color: var(--ag-bar-color);
      --mdc-icon-size: 18px;
    }
    /* Un font custom va caricato a livello di documento (dal tema HA): qui si
       può solo usarlo. Senza la variabile si eredita il font del tema.
       Nome e descrizione seguono --ag-title-font, il valore --ag-value-font:
       sono i due assi che l'utente può separare. */
    .name {
      font-family: var(--ag-title-font, inherit);
      font-size: var(--ag-title-size, 15px);
      font-weight: 600;
      color: var(--primary-text-color);
      flex: 0 1 auto;
      min-width: 0; /* senza questo l'ellipsis nei figli flex non scatta */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* Stesso trattamento di .summary-label del panel. Segue il nome e non il
       valore: sono le due etichette a sinistra, il numero sta per conto suo. */
    .description {
      font-family: var(--ag-title-font, inherit);
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
  `,a([ve()],Lt.prototype,"_groupMax",void 0),Lt=a([pe(kt)],Lt),De({type:kt,name:"AG Bar Card",description:"Barra orizzontale con nome, descrizione e valore; massimo proprio o condiviso col gruppo.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const Ot="ag-energy-card",Dt=`${Ot}-editor`,Ut={deadband:100,soc_low:15,title_size:15,bar_height:10},Nt={name:"",phase:"",layout:"verdict",power_unit:"kw",invert_grid:!1,invert_battery:!1,title_font:"",value_font:t,...Ut},It={export:"var(--success-color, #43a047)",self:"var(--accent-color, #ff9800)",buy:"var(--warning-color, #ffa600)",draw:"var(--error-color, #db4437)"},qt={pv:"var(--accent-color, #ff9800)",battery:"var(--success-color, #43a047)",grid:"var(--error-color, #db4437)"},Ft=["pv","battery","grid"],Rt={export:"normal",self:"normal",buy:"warning",draw:"alarm"};function jt(e){return Rt[e]}function Wt(e,t,a,o,i){const r=Math.max(0,e),n=Math.min(Math.max(0,t),r),s=Math.min(Math.max(a??0,0),r-n),l=Math.min(Math.max(o,0),r-n-s),c={pv:n,battery:s,grid:l},d=r>0?{pv:n/r,battery:s/r,grid:l/r}:{pv:0,battery:0,grid:0},u=d.pv+d.battery+d.grid;return{watts:c,share:d,unaccounted:Math.max(0,1-u),sources:Ft.filter(e=>c[e]>i)}}function Vt(e,t,a,o){return e<=o?"low":void 0===t?"idle":t<=-a?"charging":t>=a?"discharging":"idle"}function Gt(e,t,a,o){const i=Math.max(t??0,0);return{source:e>=o?"pv":i>=o?"battery":void 0,toHouse:e+i>=o,grid:a<=-o?"forward":a>=o?"reverse":"off"}}let Bt=class extends ue{constructor(){super(...arguments),this._schema=[{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"verdict",label:"Verdetto + striscia"},{value:"coverage",label:"Copertura del carico"}]}}},{name:"",type:"grid",schema:[{name:"name",selector:{text:{}}},{name:"phase",selector:{text:{}}}]},{name:"",type:"expandable",title:"Entità",icon:"mdi:transmission-tower",schema:[{name:"grid_entity",required:!0,selector:{entity:{}}},{name:"pv_entity",required:!0,selector:{entity:{}}},{name:"battery_entity",selector:{entity:{}}},{name:"soc_entity",selector:{entity:{}}},{name:"house_entity",selector:{entity:{}}},{name:"",type:"grid",schema:[{name:"invert_grid",selector:{boolean:{}}},{name:"invert_battery",selector:{boolean:{}}}]}]},{name:"",type:"expandable",title:"Lettura",icon:"mdi:tune",schema:[{name:"",type:"grid",schema:[{name:"deadband",selector:{number:{min:0,max:2e3,step:10,mode:"box",unit_of_measurement:"W"}}},{name:"power_unit",selector:{select:{mode:"dropdown",options:[{value:"kw",label:"Sempre kW"},{value:"auto",label:"Automatico (W / kW)"}]}}}]},{name:"soc_low",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}}]},{name:"",type:"expandable",title:"Aspetto",icon:"mdi:palette",schema:[{name:"",type:"grid",schema:[{name:"title_font",selector:{text:{}}},{name:"value_font",selector:{text:{}}}]},{name:"",type:"grid",schema:[{name:"title_size",selector:{number:{min:10,max:32,step:1,mode:"box",unit_of_measurement:"px"}}},{name:"bar_height",selector:{number:{min:2,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}]},{name:"color_export",selector:{text:{}}},{name:"color_self",selector:{text:{}}},{name:"color_buy",selector:{text:{}}},{name:"color_draw",selector:{text:{}}},{name:"color_pv",selector:{text:{}}},{name:"color_battery",selector:{text:{}}},{name:"color_grid",selector:{text:{}}}]},{name:"",type:"expandable",title:"Azioni",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{default_action:"more-info"}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]}],this._computeLabel=e=>({layout:"Layout",name:"Nome impianto",phase:"Tag di fase",grid_entity:"Potenza rete",pv_entity:"Potenza fotovoltaico",battery_entity:"Potenza batteria",soc_entity:"Carica batteria (%)",house_entity:"Potenza casa",invert_grid:"Inverti segno rete",invert_battery:"Inverti segno batteria",deadband:"Zona morta",power_unit:"Unità delle potenze",soc_low:"Carica critica",title_font:"Font del titolo",value_font:"Font dei valori",title_size:"Dimensione verdetto",bar_height:"Spessore barra",color_export:"Colore Esporto",color_self:"Colore Autoconsumo",color_buy:"Colore Acquisto",color_draw:"Colore Prelievo",color_pv:"Colore FV",color_battery:"Colore batteria",color_grid:"Colore rete",tap_action:"Azione al tap",hold_action:"Azione alla pressione prolungata",double_tap_action:"Azione al doppio tap"}[e.name]??e.title??e.name),this._computeHelper=e=>{const t="Vuoto = colore del tema. Accetta CSS: #ff9800, red, var(--mia-var).";return{layout:"Verdetto: parola di stato e kW di rete in evidenza, con le metriche FV / Casa / Batteria. Copertura: barra con le quote di consumo coperte da FV, batteria e rete.",phase:"Testo libero accanto al nome, in maiuscoletto (es. TRIFASE). Solo nel layout Verdetto.",grid_entity:"Potenza scambiata con la rete. La card si aspetta positivo = prelievo, negativo = immissione.",pv_entity:"Potenza prodotta dal fotovoltaico. I valori negativi vengono letti come zero.",battery_entity:"Facoltativa. La card si aspetta positivo = scarica (la batteria eroga), negativo = carica.",soc_entity:"Facoltativa: stato di carica in % (0-100). Mostra la mini-batteria in testata, che si riempie dal basso. Vuota = indicatore assente.",soc_low:"Sotto questa carica l'indicatore passa al colore di Prelievo, anche mentre la batteria sta caricando: quel che conta è quanta autonomia resta.",house_entity:"Facoltativa: vuota = ricavata come FV + Batteria + Rete. Serve un sensore diretto solo se il bilancio non torna.",invert_grid:"Attiva se il tuo inverter usa la convenzione opposta (positivo = immissione). Un segno sbagliato non dà errore: mostra un verdetto ribaltato.",invert_battery:"Attiva se il tuo inverter riporta positivo = carica.",deadband:"Sotto questa potenza la rete è considerata in pari (Autoconsumo). Alzala se il verdetto sfarfalla attorno allo zero. Vale anche, dimezzata, come soglia per elencare una fonte in 'Casa alimentata da'.",power_unit:"Sempre kW mantiene i valori incolonnati e confrontabili (un carico da 30 W si legge 0,03 kW). Automatico passa a W sotto il kilowatt.",title_font:"Font del nome impianto e del verdetto. Vuoto = font del tema. Il font va caricato dal tema HA, la card non può caricarlo da sé.",value_font:"Font di valori ed etichette. Default 'Jost, sans-serif'; 'inherit' usa il tema.",title_size:"Scala il verdetto e il numero di rete. I serif da display stanno meglio sui 17-18px.",bar_height:"Spessore della barra di copertura. Solo nel layout Copertura.",color_export:t,color_self:t,color_buy:t,color_draw:t,color_pv:t,color_battery:t,color_grid:t}[e.name]}}setConfig(e){this._config=e}_valueChanged(e){const t=e.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:J}};a([fe({attribute:!1})],Bt.prototype,"hass",void 0),a([ve()],Bt.prototype,"_config",void 0),Bt=a([pe(Dt)],Bt);const Kt={export:"Esporto",self:"Autoconsumo",buy:"Acquisto",draw:"Prelievo"},Jt={export:"mdi:arrow-up",self:"mdi:recycle",buy:"mdi:arrow-down",draw:"mdi:arrow-down"},Zt={export:"immetto in rete",self:"in pari",buy:"prelievo dalla rete",draw:"prelievo dalla rete"},Yt={pv:"FV",battery:"Batteria",grid:"Rete"},Qt={pv:"mdi:white-balance-sunny",battery:"mdi:battery-charging",grid:"mdi:transmission-tower"},Xt={low:"carica bassa",charging:"in carica",discharging:"in scarica",idle:"a riposo"},ea={missing:"Entità non disponibile",state:"Dati non disponibili",unit:"Unità non riconosciuta"};let ta,aa=class extends Re{static async getConfigElement(){return document.createElement(Dt)}static getStubConfig(e){const t=e?Object.keys(e.states).filter(t=>t.startsWith("sensor.")&&"power"===e.states[t].attributes.device_class):[],a=e=>t.find(t=>e.some(e=>t.includes(e))),o=a(["grid","rete","meter"])??t[0],i=a(["pv","solar","fotovolt","photovolt"])??t.find(e=>e!==o);return{type:`custom:${Ot}`,grid_entity:o??"",pv_entity:i??""}}setConfig(e){if(!e)throw new Error("Configurazione non valida");if(!e.grid_entity)throw new Error("Specifica l'entità della potenza di rete (campo 'grid_entity')");if(!e.pv_entity)throw new Error("Specifica l'entità della potenza fotovoltaica (campo 'pv_entity')");const t=Object.fromEntries(Object.entries(e).filter(([,e])=>void 0!==e));this._config={...Nt,...t}}getCardSize(){return 4}getGridOptions(){return"coverage"===this._config?.layout?{rows:4,columns:12,min_rows:3,min_columns:6}:{rows:4,columns:6,min_rows:3,min_columns:6}}_actionConfig(){const e=this._config;return{entity:e?.grid_entity,tap_action:e?.tap_action,hold_action:e?.hold_action,double_tap_action:e?.double_tap_action}}shouldUpdate(e){if(!this._config)return!1;const t=this._watchedStates(),a=this._watched;return this._watched=t,!!e.has("_config")||!!e.has("hass")&&(void 0===a||t.some((e,t)=>e!==a[t]))}_watchedStates(){const e=this._config,t=this.hass?.states;return[e?.grid_entity,e?.pv_entity,e?.battery_entity,e?.house_entity,e?.soc_entity].map(e=>e&&t?t[e]:void 0)}_readPower(e,t){if(!e)return{ok:!1,error:"missing"};const a=this.hass?.states[e];if(!a)return{ok:!1,error:"missing"};const o=Ke(a.state);if(void 0===o)return{ok:!1,error:"state"};const i=Ze(o,a.attributes.unit_of_measurement);return void 0===i?{ok:!1,error:"unit"}:{ok:!0,watts:t?-i:i}}_readOptional(e,t){if(!e)return{configured:!1,watts:void 0};const a=this._readPower(e,t);return{configured:!0,watts:a.ok?a.watts:void 0}}_readSoc(e){if(e)return Ke(this.hass?.states[e]?.state)}_power(e,t=!1){if(void 0===e||!this.hass)return"–";const a="auto"===this._config?.power_unit?Ye(e,this.hass.locale):function(e,t){return`${Ce(Math.abs(e)/1e3,t,{minimumFractionDigits:2,maximumFractionDigits:2})} kW`}(e,this.hass.locale);return t&&e<0?`−${a}`:a}_stateColor(e){const t=this._config,a="export"===e?t?.color_export:"self"===e?t?.color_self:"buy"===e?t?.color_buy:t?.color_draw;return a?.trim()||It[e]}_socColor(e){return"low"===e?this._stateColor("draw"):"charging"===e?this._sourceColor("pv"):"discharging"===e?this._sourceColor("battery"):"var(--secondary-text-color)"}_sourceColor(e){const t=this._config,a="pv"===e?t?.color_pv:"battery"===e?t?.color_battery:t?.color_grid;return a?.trim()||qt[e]}render(){if(!this._config||!this.hass)return J;const e=this._config,t=e.grid_entity?this.hass.states[e.grid_entity]:void 0,a=e.name||t?.attributes.friendly_name||"Energia",o=this._readPower(e.grid_entity,e.invert_grid),i=this._readPower(e.pv_entity);if(!o.ok||!i.ok){const e=o.ok?i.ok?"missing":i.error:o.error;return this._shell(G`
        <div class="content">
          <div class="head">
            <span class="plant" title=${a}>${a}</span>
          </div>
          <div class="row muted">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            <span>${ea[e]}</span>
          </div>
        </div>
      `)}const r=function(e,t){const a=Math.max(1,Math.abs(t.eps)),o=a/2,i=Math.max(0,e.pv),r=e.grid,n=e.battery.configured?e.battery.watts:void 0,s=function(e,t,a){return e<=-a?"export":e<a?"self":t>=a?"buy":"draw"}(r,i,a),l=e.house.configured?e.house.watts:function(e,t,a){if(!a.configured||void 0!==a.watts)return e+(a.watts??0)+t}(i,r,e.battery),c=void 0===l?void 0:Math.max(0,l),d=void 0===e.soc?void 0:Math.min(100,Math.max(0,e.soc));return{state:s,severity:jt(s),pv:i,grid:r,battery:n,house:c,houseDerived:!e.house.configured&&void 0!==c,provenance:void 0===c?void 0:Wt(c,i,n,r,o),surplus:r<=-a?Math.abs(r):void 0,charging:void 0!==n&&n<=-a?Math.abs(n):void 0,soc:d,socStatus:void 0===d?void 0:Vt(d,n,a,Math.min(100,Math.max(0,t.socLow))),flow:Gt(i,n,r,a)}}({grid:o.watts,pv:i.watts,battery:this._readOptional(e.battery_entity,e.invert_battery),house:this._readOptional(e.house_entity),soc:this._readSoc(e.soc_entity)},{eps:e.deadband??Ut.deadband,socLow:e.soc_low??Ut.soc_low});return this._shell("coverage"===e.layout?this._renderCoverage(a,r):this._renderVerdict(a,r),r.state)}_shell(e,t){const a=this._config,o=a?.title_font?.trim(),i=a?.value_font?.trim(),r=$e({"--ag-state-color":t?this._stateColor(t):"var(--secondary-text-color)","--ag-color-pv":this._sourceColor("pv"),"--ag-color-battery":this._sourceColor("battery"),"--ag-color-grid":this._sourceColor("grid"),"--ag-title-size":`${a?.title_size??Ut.title_size}px`,"--ag-bar-height":`${a?.bar_height??Ut.bar_height}px`,...o?{"--ag-title-font":o}:{},...i?{"--ag-value-font":i}:{}});return G`
      <ha-card
        class=${this._hasAnyAction()?"interactive":""}
        style=${r}
        @action=${this._handleAction}
        .actionHandler=${this._actionHandlerDirective()}
      >
        ${e}
      </ha-card>
    `}_renderSoc(e){const{soc:t,socStatus:a}=e;if(void 0===t||void 0===a)return J;const o=Math.round(t);return G`
      <span
        class="soc"
        role="meter"
        aria-label="Carica batteria"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${o}
        aria-valuetext="${o}%, ${Xt[a]}"
      >
        <span
          class="soc-cell"
          style=${$e({"--ag-soc-fill":`${t}%`,"--ag-soc-color":this._socColor(a)})}
          aria-hidden="true"
        >
          <span class="soc-level"></span>
        </span>
        <span class="soc-text" aria-hidden="true">${o}%</span>
      </span>
    `}_renderVerdict(e,t){const a=this._config,o=t.provenance?.sources??[],i=t.battery,r=void 0!==t.charging?"charging":void 0!==i&&i>0?"discharging":"";return G`
      <div class="content verdict">
        <div class="head">
          <span class="plant" title=${e}>${e}</span>
          <span class="head-right">
            ${a?.phase?G`<span class="phase">${a.phase}</span>`:J}
            ${this._renderSoc(t)}
          </span>
        </div>

        <div class="verdict-row">
          <ha-icon class="verdict-icon" .icon=${Jt[t.state]}></ha-icon>
          <span class="verdict-word">${Kt[t.state]}</span>
          <span class="verdict-value">${this._power(t.grid)}</span>
        </div>
        <div class="grid-label">${Zt[t.state]}</div>

        ${o.length?G`
              <div class="fed-by">
                <ha-icon .icon=${Qt[o[0]]}></ha-icon>
                <span
                  >Casa alimentata da
                  <strong>${o.map(e=>Yt[e]).join(" + ")}</strong></span
                >
              </div>
            `:J}

        ${this._renderFlow(t)}

        <div class="metrics">
          ${this._renderMetric("FV",Qt.pv,this._power(t.pv),"",a?.pv_entity)}
          ${this._renderMetric("CASA","mdi:home-outline",this._power(t.house),"",a?.house_entity)}
          ${this._renderMetric("BATT",Qt.battery,this._power(i,!0),r,a?.battery_entity)}
        </div>
      </div>
    `}_renderFlow(e){const{flow:t}=e,a="off"===t.grid?"off":"reverse"===t.grid?"on reverse":"on";return G`
      <div class="flow" aria-hidden="true">
        <ha-icon
          class="flow-node ${t.source?"live":""}"
          .icon=${Qt[t.source??"pv"]}
        ></ha-icon>
        <span class="flow-seg ${t.toHouse?"on":"off"}"></span>
        <ha-icon class="flow-node live" icon="mdi:home-outline"></ha-icon>
        <span class="flow-seg ${a}"></span>
        <ha-icon class="flow-node ${"off"===t.grid?"":"live"}" .icon=${Qt.grid}></ha-icon>
      </div>
    `}_renderMetric(e,t,a,o,i){const r=G`
      <span class="metric-label">
        <ha-icon .icon=${t}></ha-icon>
        <span>${e}</span>
      </span>
      <span class="metric-value ${o}">${a}</span>
    `;return i?G`
      <div
        class="metric interactive"
        role="button"
        tabindex="0"
        aria-label="Dettagli ${e}"
        @click=${e=>this._openMoreInfo(e,i)}
        @keydown=${e=>this._metricKeydown(e,i)}
        @mousedown=${this._stopGesture}
        @touchstart=${this._stopGesture}
        @touchend=${this._stopGesture}
      >
        ${r}
      </div>
    `:G`<div class="metric">${r}</div>`}_openMoreInfo(e,t){e.stopPropagation(),Me(this,"hass-more-info",{entityId:t})}_metricKeydown(e,t){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._openMoreInfo(e,t))}_stopGesture(e){e.stopPropagation()}_renderCoverage(e,t){const a=t.provenance,o=a?function(e){const t=Ft.map(t=>{const a=100*Math.max(0,e[t]);return{key:t,value:a,floor:Math.floor(a)}}),a=Math.min(100,Math.round(t.reduce((e,t)=>e+t.value,0))),o={pv:0,battery:0,grid:0};let i=0;for(const e of t)o[e.key]=e.floor,i+=e.floor;const r=[...t].sort((e,t)=>t.value-t.floor-(e.value-e.floor));for(const e of r){if(i>=a)break;o[e.key]+=1,i+=1}return o}(a.share):void 0,i=o?`Casa alimentata da ${Ft.map(e=>`${Yt[e]} ${o[e]}%`).join(", ")}`:"Copertura del carico non disponibile";return G`
      <div class="content coverage">
        <div class="head">
          <span class="plant" title=${e}>${e}</span>
          <span class="head-right">
            ${this._renderSoc(t)}
            <span class="verdict-tag">
              <span>${Kt[t.state]}</span>
              <ha-icon .icon=${Jt[t.state]}></ha-icon>
            </span>
          </span>
        </div>

        <div class="headline">
          <span class="headline-value">${this._power(t.grid)}</span>
          <span class="headline-label">${Zt[t.state]}</span>
          <span class="house">Casa <strong>${this._power(t.house)}</strong></span>
        </div>

        <div class="track" role="img" aria-label=${i}>
          ${a?Ft.map(e=>{const t=100*a.share[e];return t<=0?J:G`<div
                      class="seg ${e}"
                      style=${$e({width:`${t.toFixed(3)}%`})}
                    ></div>`}):J}
        </div>

        <div class="legend">
          ${Ft.map(e=>G`
              <span class="legend-item">
                <span class="swatch ${e}"></span>
                <span class="legend-label">${Yt[e]}</span>
                <strong>${this._power(a?.watts[e])}</strong>
              </span>
            `)}
        </div>

        ${void 0!==t.surplus||void 0!==t.charging?G`
              <div class="extras">
                ${void 0!==t.surplus?G`
                      <div class="row">
                        <ha-icon icon="mdi:arrow-up"></ha-icon>
                        <span>Surplus in rete <strong>${this._power(t.surplus)}</strong></span>
                      </div>
                    `:J}
                ${void 0!==t.charging?G`
                      <div class="row">
                        <ha-icon icon="mdi:battery-charging"></ha-icon>
                        <span
                          >Batteria in carica <strong>${this._power(t.charging)}</strong></span
                        >
                      </div>
                    `:J}
              </div>
            `:J}
      </div>
    `}};function oa(){return ta??=window.loadCardHelpers?window.loadCardHelpers():Promise.reject(new Error("window.loadCardHelpers non disponibile")),ta}aa.styles=l`
    ha-card {
      height: 100%;
      box-sizing: border-box;
    }
    ha-card.interactive {
      cursor: pointer;
    }

    /* Lo spazio orizzontale lo azzera il contenitore che ne fornisce uno
       proprio (vedi ag-panel-card), così le righe si allineano al titolo. */
    .content {
      display: flex;
      flex-direction: column;
      padding: 12px var(--ag-item-padding-x, 16px);
      box-sizing: border-box;
      height: 100%;
    }
    /* Il layout coverage ha 0-2 righe finali condizionali: distribuendo lo
       spazio la card riempie il box riservato in entrambi i casi. */
    .content.coverage {
      justify-content: space-between;
      gap: 8px;
    }
    /* Qui lo spazio lo dà già il gap del contenitore: sommarli distanzierebbe
       troppo la testata dal numero. */
    .content.coverage .head {
      margin-bottom: 0;
    }

    /* -- Testata ------------------------------------------------------- */
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
    }
    /* Un font custom va caricato a livello di documento (dal tema HA): qui si
       può solo usarlo. Senza --ag-title-font si eredita il font del tema. */
    .plant {
      font-family: var(--ag-title-font, inherit);
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      min-width: 0; /* senza questo l'ellipsis nei figli flex non scatta */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .phase {
      font-family: var(--ag-value-font, inherit);
      font-size: 11px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      flex: 0 0 auto;
    }
    .head-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 0 0 auto;
    }

    /* -- Indicatore di carica batteria --------------------------------- */
    .soc {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 0 0 auto;
    }
    /* La cella è il contenitore del livello: il contorno resta neutro e solo
       il riempimento prende il colore dello stato, così la lettura è
       "quanta ne resta" e non "che colore ha la batteria". */
    .soc-cell {
      position: relative;
      width: 9px;
      height: 15px;
      box-sizing: border-box;
      border: 1.5px solid var(--secondary-text-color);
      border-radius: 2px;
      overflow: hidden;
    }
    /* Il polo positivo in cima, che rende il glifo leggibile come batteria. */
    .soc-cell::before {
      content: "";
      position: absolute;
      top: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 2px;
      border-radius: 1px 1px 0 0;
      background-color: var(--secondary-text-color);
    }
    .soc-level {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: var(--ag-soc-fill, 0%);
      background-color: var(--ag-soc-color, var(--secondary-text-color));
      transition:
        height 0.4s ease-out,
        background-color 0.3s ease;
    }
    .soc-text {
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }

    .verdict-tag {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 0 0 auto;
      font-family: var(--ag-value-font, inherit);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--ag-state-color);
    }
    .verdict-tag ha-icon {
      --mdc-icon-size: 16px;
    }

    /* -- Verdetto (layout 1a) ------------------------------------------ */
    /* baseline: icona a parte, parola e valore hanno corpi diversi e devono
       appoggiare sulla stessa linea. */
    .verdict-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    /* ha-icon non ha una baseline utile: va centrata a parte. */
    .verdict-icon {
      align-self: center;
      flex: 0 0 auto;
      color: var(--ag-state-color);
      --mdc-icon-size: calc(var(--ag-title-size, 15px) * 1.2);
    }
    .verdict-word {
      font-family: var(--ag-title-font, inherit);
      font-size: calc(var(--ag-title-size, 15px) * 1.55);
      font-weight: 500;
      line-height: 1.1;
      color: var(--ag-state-color);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /* margin-left: auto spinge il valore a destra; non si comprime mai (la
       parola di stato sì). tabular-nums evita che il numero cambi larghezza
       a ogni aggiornamento del sensore. */
    .verdict-value {
      margin-left: auto;
      flex: 0 0 auto;
      font-family: var(--ag-value-font, inherit);
      font-size: calc(var(--ag-title-size, 15px) * 1.55);
      font-weight: 600;
      line-height: 1.1;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .grid-label {
      text-align: right;
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .fed-by {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
      font-family: var(--ag-value-font, inherit);
      font-size: 13px;
      color: var(--primary-text-color);
      min-width: 0;
    }
    .fed-by ha-icon {
      flex: 0 0 auto;
      color: var(--ag-color-pv);
      --mdc-icon-size: 16px;
    }
    .fed-by span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* -- Indicatore di flusso (layout 1a) ------------------------------ */
    .flow {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 12px 0;
    }
    .flow-node {
      flex: 0 0 auto;
      color: var(--disabled-text-color, #bdbdbd);
      --mdc-icon-size: 16px;
      transition: color 0.3s ease;
    }
    .flow-node.live {
      color: var(--secondary-text-color);
    }
    /* I puntini sono un gradiente ripetuto, non elementi: il segmento si
       allunga quanto serve senza doverne calcolare il numero. Animare
       background-position sposta i puntini senza toccare il layout. */
    .flow-seg {
      flex: 1 1 auto;
      height: 3px;
      min-width: 0;
      background-image: radial-gradient(
        circle,
        currentColor 1.5px,
        transparent 1.6px
      );
      background-size: 9px 3px;
      background-repeat: repeat-x;
      background-position: 0 center;
      color: var(--divider-color, #e0e0e0);
      transition: color 0.3s ease;
    }
    .flow-seg.on {
      color: var(--ag-state-color);
      animation: ag-flow 0.9s linear infinite;
    }
    /* L'unico segmento che cambia verso è quello della rete, in prelievo. */
    .flow-seg.reverse {
      animation-direction: reverse;
    }
    @keyframes ag-flow {
      from {
        background-position: 0 center;
      }
      to {
        background-position: 9px center;
      }
    }

    /* -- Mini-metriche (layout 1a) ------------------------------------- */
    /* Tre colonne uguali: i valori restano incolonnati anche cambiando
       larghezza. Lo sfondo è ricavato dal testo del tema, così funziona su
       chiaro e scuro con una regola sola. */
    .metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-top: auto;
      border-radius: 8px;
      overflow: hidden;
      background-color: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
    }
    .metric {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px 10px;
      min-width: 0;
    }
    .metric + .metric {
      border-left: 1px solid var(--divider-color, #e0e0e0);
    }
    /* Solo le metriche con un'entità dietro sono cliccabili: senza affordance
       le altre sembrerebbero rotte. */
    .metric.interactive {
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    .metric.interactive:hover {
      background-color: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    }
    .metric.interactive:focus-visible {
      outline: 2px solid var(--ag-state-color);
      outline-offset: -2px;
    }
    .metric-label {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: var(--ag-value-font, inherit);
      font-size: 10px;
      letter-spacing: 0.1em;
      color: var(--secondary-text-color);
      min-width: 0;
    }
    .metric-label ha-icon {
      flex: 0 0 auto;
      --mdc-icon-size: 13px;
    }
    .metric-label span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .metric-value {
      font-family: var(--ag-value-font, inherit);
      font-size: 15px;
      font-weight: 600;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .metric-value.charging {
      color: var(--ag-color-pv);
    }
    .metric-value.discharging {
      color: var(--ag-color-battery);
    }

    /* -- Copertura (layout 1b) ----------------------------------------- */
    .headline {
      display: flex;
      align-items: baseline;
      gap: 8px;
      flex-wrap: wrap;
    }
    .headline-value {
      font-family: var(--ag-title-font, inherit);
      font-size: calc(var(--ag-title-size, 15px) * 1.75);
      font-weight: 500;
      line-height: 1.1;
      color: var(--ag-state-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .headline-label {
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .house {
      margin-left: auto;
      flex: 0 0 auto;
      font-family: var(--ag-value-font, inherit);
      font-size: 13px;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .house strong {
      color: var(--primary-text-color);
      font-weight: 600;
    }

    /* Lo sfondo del track È la quota non coperta dalle fonti: nessun quarto
       segmento da disegnare. Il border-radius sta solo qui, così un segmento
       sub-pixel non renderizza schegge arrotondate. */
    .track {
      display: flex;
      height: var(--ag-bar-height, 10px);
      border-radius: calc(var(--ag-bar-height, 10px) / 2);
      background-color: var(--divider-color, #e0e0e0);
      overflow: hidden;
    }
    /* shrink attivo (0 1 auto, non 0 0 auto): un eventuale sforo da epsilon
       float viene assorbito in proporzione invece che clippato. */
    .seg {
      height: 100%;
      flex: 0 1 auto;
      min-width: 0;
      transition:
        width 0.4s ease-out,
        background-color 0.3s ease;
    }
    .seg.pv {
      background-color: var(--ag-color-pv);
    }
    .seg.battery {
      background-color: var(--ag-color-battery);
    }
    .seg.grid {
      background-color: var(--ag-color-grid);
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 16px;
      font-family: var(--ag-value-font, inherit);
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .legend-item strong {
      color: var(--primary-text-color);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .swatch {
      width: 9px;
      height: 9px;
      border-radius: 2px;
      flex: 0 0 auto;
    }
    .swatch.pv {
      background-color: var(--ag-color-pv);
    }
    .swatch.battery {
      background-color: var(--ag-color-battery);
    }
    .swatch.grid {
      background-color: var(--ag-color-grid);
    }

    .extras {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-top: 8px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    /* -- Righe generiche e degradi ------------------------------------- */
    .row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--ag-value-font, inherit);
      font-size: 13px;
      color: var(--primary-text-color);
      min-width: 0;
    }
    .row ha-icon {
      flex: 0 0 auto;
      color: var(--secondary-text-color);
      --mdc-icon-size: 16px;
    }
    .row span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .row strong {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }
    .muted {
      color: var(--secondary-text-color);
    }

    /* I puntini restano fermi ma il colore continua a dire dove va l'energia. */
    @media (prefers-reduced-motion: reduce) {
      .seg,
      .soc-level {
        transition: none;
      }
      .flow-seg.on {
        animation: none;
      }
    }
  `,aa=a([pe(Ot)],aa),De({type:Ot,name:"AG Energy Card",description:"Verdetto sullo scambio con la rete e copertura del carico, in due layout.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"});class ia extends Re{constructor(){super(...arguments),this.direction="column",this._buildGen=0,this._group=new Map,this._onGroupMax=e=>{e.stopPropagation();const t=e.detail,a=t.source,o={scale:t.scale,value:t.value,onMax:t.onMax,lastMax:void 0,pristine:!0};this._group.set(a,o);const i={update:(e,t)=>{this._group.get(a)===o&&(o.value=e,o.scale=t,this._broadcastGroupMax())},release:()=>{this._group.get(a)===o&&(this._group.delete(a),this._broadcastGroupMax())}};t.handle=i,this._broadcastGroupMax()}}setConfig(e){if(!e)throw new Error("Configurazione non valida");if(void 0!==e.cards&&!Array.isArray(e.cards))throw new Error("Il campo 'cards' deve essere una lista di card");for(const t of e.cards??[])if("object"!=typeof t||null===t||"string"!=typeof t.type)throw new Error("Ogni elemento di 'cards' deve avere un campo 'type'");const t=Object.fromEntries(Object.entries(e).filter(([,e])=>void 0!==e));this._config={flat:!0,share_max:!1,cards:[],...t},this._group.clear(),this._rebuildAll()}shouldUpdate(e){return super.shouldUpdate(e)||e.has("_cards")||e.has("_error")}updated(e){if(super.updated(e),e.has("hass")&&this.hass&&this._cards)for(const e of this._cards)e.hass=this.hass}getCardSize(){if(!this._cards||0===this._cards.length)return 1;const e=Promise.all(this._cards.map(e=>function(e){return"function"==typeof e.getCardSize?e.getCardSize():4}(e)));return"row"===this.direction?e.then(e=>Math.max(...e)):e.then(e=>e.reduce((e,t)=>e+t,0))}getGridOptions(){return{columns:12,rows:"auto"}}_broadcastGroupMax(){for(const[e]of this._group)e.isConnected||this._group.delete(e);const e=new Map;for(const t of this._group.values()){const a=t.value;if(void 0===a||!Number.isFinite(a)||a<=0)continue;const o=e.get(t.scale);(void 0===o||a>o)&&e.set(t.scale,a)}for(const t of this._group.values()){const a=e.get(t.scale);(t.pristine||a!==t.lastMax)&&(t.lastMax=a,t.pristine=!1,t.onMax(a))}}async _rebuildAll(){const e=++this._buildGen,t=this._config?.cards??[];try{const a=await Promise.all(t.map(e=>this._createCard(e)));e===this._buildGen&&(this._cards=a,this._error=void 0)}catch(t){e===this._buildGen&&(this._cards=[],this._error=t instanceof Error?t.message:String(t))}}async _createCard(e){let t;try{t=(await oa()).createCardElement(e)}catch{t=function(e,t){void 0===t&&(t=!1);var a=function(e,t){return o("hui-error-card",{type:"error",error:e,config:t})},o=function(e,t){var o=window.document.createElement(e);try{if(!o.setConfig)return;o.setConfig(t)}catch(o){return console.error(e,o),a(o.message,t)}return o};if(!e||"object"!=typeof e||!t&&!e.type)return a("No type defined",e);var i=e.type;if(i&&i.startsWith("custom:"))i=i.substr(7);else if(t)if(He.has(i))i="hui-"+i+"-row";else{if(!e.entity)return a("Invalid config given.",e);var r=e.entity.split(".",1)[0];i="hui-"+(Pe[r]||"text")+"-entity-row"}else i="hui-"+i+"-card";if(customElements.get(i))return o(i,e);var n=a("Custom element doesn't exist: "+e.type+".",e);n.style.display="None";var s=setTimeout(function(){n.style.display=""},2e3);return customElements.whenDefined(e.type).then(function(){clearTimeout(s),Me(n,"ll-rebuild",{},n)}),n}(e)}return this.hass&&(t.hass=this.hass),t.addEventListener("ll-rebuild",a=>{a.stopPropagation(),this._rebuildCard(t,e)},{once:!0}),t}async _rebuildCard(e,t){const a=this._buildGen,o=await this._createCard(t);a===this._buildGen&&this._cards&&(this._cards=this._cards.map(t=>t===e?o:t))}renderChildren(){if(this._error)return G`<div class="children-error">${this._error}</div>`;if(!this._cards)return J;const e=this._config?.flat??!0,t=!0===this._config?.share_max,a=this._config?.gap,o=$e(void 0!==a?{"--ag-stack-gap":`${a}px`}:{});return G`
      <div
        class="children ${this.direction}${e?" flat":""}"
        style=${o}
        @ag-group-max=${t?this._onGroupMax:void 0}
      >
        ${this._cards.map(e=>G`<div class="child">${e}</div>`)}
      </div>
    `}}a([ve()],ia.prototype,"_cards",void 0),a([ve()],ia.prototype,"_error",void 0);const ra=l`
  .children {
    display: flex;
    gap: var(--ag-stack-gap, 8px);
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
  /* Senza cornice il figlio fa parte del genitore, quindi è il genitore a
     dargli lo spazio: le card AG azzerano il proprio e si allineano al titolo,
     come fa da sempre il separator. Con la cornice (flat a false) il figlio
     torna autonomo e riprende i suoi 16px, esattamente come se stesse fuori da
     un contenitore.

     Vale per entrambi gli assi. Sull'asse verticale lo spazio della card
     separava il testo dalla propria cornice: tolta quella non separa più
     niente, e a regolare il ritmo tra i figli resta il solo gap qui sopra.
     Oggi la legge la sola ag-bar-card (le altre foglie tengono il loro spazio
     verticale fisso); la variabile è qui perché estenderle non richieda di
     rimettere mano ai contenitori. */
  .children.flat > .child {
    --ha-card-background: transparent;
    --ha-card-border-width: 0;
    --ha-card-box-shadow: none;
    --ha-card-border-color: transparent;
    --ag-item-padding-x: 0;
    --ag-item-padding-y: 0;
  }
  .children-error {
    color: var(--error-color, #db4437);
    font-size: 13px;
  }
`,na="ag-panel-card",sa=`${na}-editor`,la=15,ca=1;let da;function ua(){return da??=async function(){if(Boolean(customElements.get("hui-card-element-editor")&&customElements.get("hui-card-picker")))return!0;(await oa()).createCardElement({type:"vertical-stack",cards:[]}),await ha(customElements.whenDefined("hui-vertical-stack-card"));const e=customElements.get("hui-vertical-stack-card");return await(e?.getConfigElement?.()),await ha(Promise.all([customElements.whenDefined("hui-card-element-editor"),customElements.whenDefined("hui-card-picker")])),!0}().catch(()=>!1),da}function ha(e){return Promise.race([e,new Promise((e,t)=>window.setTimeout(()=>t(new Error("Timeout caricamento editor HA")),5e3))])}let pa=class extends ue{constructor(){super(...arguments),this.cards=[],this._selected=0,this._guiMode=!0,this._guiModeAvailable=!0,this._status="loading"}firstUpdated(){ua().then(e=>{this._status=e?"ready":"error"})}willUpdate(e){e.has("cards")&&this._selected>this.cards.length&&(this._selected=this.cards.length)}render(){if(!this.hass)return J;if("loading"===this._status)return G`<div class="note">Caricamento editor…</div>`;if("error"===this._status)return G`<div class="warning">
        Editor visuale delle card annidate non disponibile: configura la lista
        <code>cards</code> dall'editor YAML della card.
      </div>`;const e=this._selected===this.cards.length;return G`
      <div class="chips" role="tablist" aria-label="Card contenute">
        ${this.cards.map((e,t)=>G`
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
      ${e?G`
            <hui-card-picker
              .hass=${this.hass}
              .lovelace=${this.lovelace}
              @config-changed=${this._cardPicked}
            ></hui-card-picker>
          `:G`
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
    `}_select(e){this._selected=e,this._guiMode=!0,this._guiModeAvailable=!0}_toggleMode(){this._editorElement?.toggleMode?.()}_cardPicked(e){e.stopPropagation();const t=e.detail?.config;if(!t)return;const a=[...this.cards,t];this._select(a.length-1),this._emit(a)}_childConfigChanged(e){e.stopPropagation();const t=e.detail?.config;if(!t)return;const a=[...this.cards];a[this._selected]=t,this._guiModeAvailable=!1!==e.detail.guiModeAvailable,this._emit(a)}_guiModeChanged(e){e.stopPropagation(),this._guiMode=Boolean(e.detail.guiMode),this._guiModeAvailable=!1!==e.detail.guiModeAvailable}_move(e,t){const a=[...this.cards],[o]=a.splice(e,1);a.splice(t,0,o),this._selected=t,this._emit(a)}_delete(e){const t=this.cards.filter((t,a)=>a!==e);this._selected=Math.min(e,t.length),this._emit(t)}_emit(e){this.dispatchEvent(new CustomEvent("cards-changed",{detail:{cards:e}}))}};pa.styles=l`
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
  `,a([fe({attribute:!1})],pa.prototype,"hass",void 0),a([fe({attribute:!1})],pa.prototype,"lovelace",void 0),a([fe({attribute:!1})],pa.prototype,"cards",void 0),a([ve()],pa.prototype,"_selected",void 0),a([ve()],pa.prototype,"_guiMode",void 0),a([ve()],pa.prototype,"_guiModeAvailable",void 0),a([ve()],pa.prototype,"_status",void 0),a([function(e){return(t,a,o)=>((e,t,a)=>(a.configurable=!0,a.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,a),a))(t,a,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}("hui-card-element-editor")],pa.prototype,"_editorElement",void 0),pa=a([pe("ag-cards-editor-list")],pa);class ma extends ue{setConfig(e){this._config=e}connectedCallback(){if(super.connectedCallback(),void 0===this.lovelace)try{this.lovelace=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null}()?.config}catch{this.lovelace=void 0}}render(){return this.hass&&this._config?G`
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
    `:J}_valueChanged(e){if(e.stopPropagation(),!this._config)return;const t=e.detail.value;this._emit({...this._config,...t,cards:this._config.cards??[]})}_cardsChanged(e){e.stopPropagation(),this._config&&this._emit({...this._config,cards:e.detail.cards})}_emit(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}}ma.styles=l`
    .cards-heading {
      margin: 16px 0 8px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
  `,a([fe({attribute:!1})],ma.prototype,"hass",void 0),a([fe({attribute:!1})],ma.prototype,"lovelace",void 0),a([ve()],ma.prototype,"_config",void 0);let ga=class extends ma{constructor(){super(...arguments),this._schema=[{name:"title",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"subtitle",selector:{text:{}}},{name:"subtitle_align",selector:{select:{mode:"dropdown",options:[{value:"left",label:"Sinistra"},{value:"center",label:"Centro"},{value:"right",label:"Destra"}]}}}]},{name:"",type:"expandable",title:"Riepilogo",icon:"mdi:sigma",schema:[{name:"summary_label",selector:{text:{}}},{name:"summary_entities",selector:{entity:{multiple:!0}}},{name:"",type:"grid",schema:[{name:"summary_unit",selector:{text:{}}},{name:"summary_decimals",selector:{number:{min:0,max:3,step:1,mode:"box"}}}]},{name:"summary_color",selector:{text:{}}}]},{name:"",type:"expandable",title:"Aspetto",icon:"mdi:palette",schema:[{name:"",type:"grid",schema:[{name:"title_font",selector:{text:{}}},{name:"title_size",selector:{number:{min:10,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}]},{name:"value_font",selector:{text:{}}},{name:"gap",selector:{number:{min:0,max:48,step:1,mode:"box",unit_of_measurement:"px"}}},{name:"flat",selector:{boolean:{}}},{name:"share_max",selector:{boolean:{}}}]}],this._computeLabel=e=>({title:"Titolo",subtitle:"Sottotitolo",subtitle_align:"Allineamento sottotitolo",summary_label:"Didascalia",summary_entities:"Entità del valore",summary_unit:"Unità forzata",summary_decimals:"Decimali",summary_color:"Colore del valore",title_font:"Font del titolo",title_size:"Dimensione titolo",value_font:"Font di valori e didascalie",gap:"Spazio tra le card",flat:"Card figlie senza cornice",share_max:"Massimo condiviso tra le barre"}[e.name]??e.title??e.name),this._computeHelper=e=>({summary_label:"Testo libero nell'angolo destro dell'header (es. TRIFASE · BATTERIA).",summary_entities:"Una entità = il suo valore; più entità = la somma. Le potenze (W/kW) vengono convertite e formattate da sole.",summary_unit:"Vuota = automatica. Se impostata disattiva la conversione delle potenze e somma i valori così come sono.",summary_decimals:"Decimali della somma semplice (le potenze si formattano da sole).",summary_color:"Vuoto = accent. Accetta CSS: #ff9800, red, var(--mia-var).",title_font:"Vuoto = font del tema. Es: 'Cormorant Garamond', serif — il font va caricato dal tema HA, la card non può caricarlo da sé.",title_size:"Dimensione del titolo. I serif da display stanno meglio sui 17-18px.",value_font:"Font di riepilogo e sottotitolo. Default 'Jost, sans-serif'; scrivi 'inherit' per usare il font del tema.",gap:"Spazio tra le card contenute. Vuoto = 8px.",flat:"Nasconde sfondo, bordo e ombra delle card contenute.",share_max:"Le ag-bar-card contenute impostate su 'Massimo del gruppo' si scalano tutte sulla capacità dichiarata più alta del gruppo. Con contenitori annidati vince il più interno che ha l'opzione attiva."}[e.name])}};ga=a([pe(sa)],ga);let fa=class extends ia{static async getConfigElement(){return document.createElement(sa)}static getStubConfig(){return{type:`custom:${na}`,title:"Pannello",cards:[]}}getCardSize(){const e=super.getCardSize();return"number"==typeof e?e+1:e.then(e=>e+1)}_summaryValue(){const e=this._config,t=this.hass;if(!e?.summary_entities||!t)return;const a=Array.isArray(e.summary_entities)?e.summary_entities:[e.summary_entities];if(0===a.length)return;const o=function(e,t){const a=e.filter(e=>void 0!==e.value);if(0===a.length)return;if(!t?.trim()){const e=a.map(e=>void 0===e.unit?void 0:Ze(e.value,e.unit));if(e.every(e=>void 0!==e))return{kind:"power",watts:e.reduce((e,t)=>e+t,0)}}return{kind:"plain",total:a.reduce((e,t)=>e+t.value,0),unit:t?.trim()||a[0].unit}}(a.map(e=>{const a=t.states[e];return{value:Ke(a?.state),unit:a?.attributes.unit_of_measurement}}),e.summary_unit);if(!o)return"–";if("power"===o.kind)return`${o.watts<0?"-":""}${Ye(o.watts,t.locale)}`;const i=e.summary_decimals??ca,r=Ce(o.total,t.locale,{maximumFractionDigits:i});return o.unit?`${r} ${o.unit}`:r}render(){if(!this._config||!this.hass)return J;const e=this._config,a=this._summaryValue(),o=Boolean(e.summary_label||a),i=Boolean(e.title||e.subtitle||o),r=e.title_font?.trim(),n=(e.value_font??t).trim(),s=e.summary_color?.trim(),l=$e({"--ag-title-size":`${e.title_size??la}px`,"--ag-subtitle-align":e.subtitle_align??"left",...r?{"--ag-title-font":r}:{},...n?{"--ag-value-font":n}:{},...s?{"--ag-value-color":s}:{}});return G`
      <ha-card style=${l}>
        ${i?G`
              <div class="header">
                <div class="header-row">
                  <div class="title" title=${e.title||""}>${e.title||""}</div>
                  ${o?G`
                        <div class="summary">
                          ${e.summary_label?G`<span class="summary-label">${e.summary_label}</span>`:J}
                          ${a?G`<span class="summary-value">${a}</span>`:J}
                        </div>
                      `:J}
                </div>
                ${e.subtitle?G`<div class="subtitle">${e.subtitle}</div>`:J}
              </div>
            `:J}
        ${this.renderChildren()}
      </ha-card>
    `}};fa.styles=[ra,l`
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

      /* Equivalente al vecchio padding della ha-card, che ora e' a 0. */
      .children {
        padding: 0 16px 12px;
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
    `],fa=a([pe(na)],fa),De({type:na,name:"AG Panel Card",description:"Pannello con intestazione (titolo, sottotitolo, valore o somma a destra) e card figlie impilate.",preview:!1,documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const va="ag-vstack-card",_a=`${va}-editor`;let ba=class extends ma{constructor(){super(...arguments),this._schema=[{name:"flat",selector:{boolean:{}}},{name:"share_max",selector:{boolean:{}}},{name:"gap",selector:{number:{min:0,max:48,step:1,mode:"box",unit_of_measurement:"px"}}}],this._computeLabel=e=>({flat:"Card figlie senza cornice",share_max:"Massimo condiviso tra le barre",gap:"Spazio tra le card"}[e.name]??e.title??e.name),this._computeHelper=e=>({flat:"Nasconde sfondo, bordo e ombra delle card contenute.",share_max:"Le ag-bar-card contenute impostate su 'Massimo del gruppo' si scalano tutte sulla capacità dichiarata più alta del gruppo. Con contenitori annidati vince il più interno che ha l'opzione attiva.",gap:"Spazio tra le card contenute. Vuoto = 8px."}[e.name])}};ba=a([pe(_a)],ba);let ya=class extends ia{static async getConfigElement(){return document.createElement(_a)}static getStubConfig(){return{type:`custom:${va}`,cards:[]}}render(){return this._config&&this.hass?this.renderChildren():J}};ya.styles=[ra],ya=a([pe(va)],ya),De({type:va,name:"AG VStack Card",description:"Pila verticale di card senza cornice, da comporre dentro altre card.",preview:!1,documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const xa="ag-hstack-card",wa=`${xa}-editor`;let $a=class extends ma{constructor(){super(...arguments),this._schema=[{name:"flat",selector:{boolean:{}}},{name:"share_max",selector:{boolean:{}}},{name:"gap",selector:{number:{min:0,max:48,step:1,mode:"box",unit_of_measurement:"px"}}}],this._computeLabel=e=>({flat:"Card figlie senza cornice",share_max:"Massimo condiviso tra le barre",gap:"Spazio tra le card"}[e.name]??e.title??e.name),this._computeHelper=e=>({flat:"Nasconde sfondo, bordo e ombra delle card contenute.",share_max:"Le ag-bar-card contenute impostate su 'Massimo del gruppo' si scalano tutte sulla capacità dichiarata più alta del gruppo. Con contenitori annidati vince il più interno che ha l'opzione attiva.",gap:"Spazio tra le card contenute. Vuoto = 8px."}[e.name])}};$a=a([pe(wa)],$a);let za=class extends ia{constructor(){super(...arguments),this.direction="row"}static async getConfigElement(){return document.createElement(wa)}static getStubConfig(){return{type:`custom:${xa}`,cards:[]}}render(){return this._config&&this.hass?this.renderChildren():J}};za.styles=[ra],za=a([pe(xa)],za),De({type:xa,name:"AG HStack Card",description:"Fila orizzontale di card a larghezza uguale, senza cornice.",preview:!1,documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const ka="ag-separator-card",Aa=8;let Ca=class extends Re{static getConfigForm(){return{schema:[{name:"margin",selector:{number:{min:0,max:48,step:1,mode:"box",unit_of_measurement:"px"}}}],computeLabel:e=>"margin"===e.name?"Margine verticale":e.name}}static getStubConfig(){return{type:`custom:${ka}`}}setConfig(e){if(!e)throw new Error("Configurazione non valida");this._config={...e}}getCardSize(){return 1}getGridOptions(){return{columns:"full",rows:"auto"}}render(){if(!this._config)return J;const e=this._config.margin??Aa;return G`
      <div class="line" role="separator" style=${$e({"--ag-sep-margin":`${e}px`})}></div>
    `}};Ca.styles=l`
    .line {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      margin: var(--ag-sep-margin, 8px) 0;
    }
  `,Ca=a([pe(ka)],Ca),De({type:ka,name:"AG Separator Card",description:"Sottile linea divisoria da usare tra card.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"}),console.info(`%c AG-CARDS %c v${e} `,"color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{e as AG_CARDS_VERSION};
