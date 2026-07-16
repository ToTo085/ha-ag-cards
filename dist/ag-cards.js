const t="0.2.0";function e(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,n)},c=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,n))(e)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:u,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),w={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...u(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(s)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),n=i.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const o=this.constructor;if(!1===s&&(n=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[y("elementProperties")]=new Map,A[y("finalized")]=new Map,v?.({ReactiveElement:A}),(g.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,E=t=>t,S=x.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+P,M=`<${O}>`,z=document,U=()=>z.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,H="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,j=/>/g,L=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,W=/"/g,q=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=B(1),V=B(2),G=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),Z=new WeakMap,J=z.createTreeWalker(z,129);function Q(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=R;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(r.lastIndex=h,c=r.exec(i),null!==c);)h=r.lastIndex,r===R?"!--"===c[1]?r=D:void 0!==c[1]?r=j:void 0!==c[2]?(q.test(c[2])&&(n=RegExp("</"+c[2],"g")),r=L):void 0!==c[3]&&(r=L):r===L?">"===c[0]?(r=n??R,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?L:'"'===c[3]?W:I):r===W||r===I?r=L:r===D||r===j?r=R:(r=L,n=void 0);const d=r===L&&t[e+1].startsWith("/>")?" ":"";o+=r===R?i+M:l>=0?(s.push(a),i.slice(0,l)+k+i.slice(l)+P+d):i+P+(-2===l?e:d)}return[Q(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[c,l]=X(t,e);if(this.el=Y.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(k)){const e=l[o++],i=s.getAttribute(t).split(P),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?nt:"?"===r[1]?ot:"@"===r[1]?rt:st}),s.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(q.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),J.nextNode(),a.push({type:2,index:++n});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===O)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)a.push({type:7,index:n}),t+=P.length-1}n++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function tt(t,e,i=t,s){if(e===G)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=N(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=tt(t,n._$AS(t,e.values),n,s)),e}class et{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);J.currentNode=s;let n=J.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new it(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new at(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=J.nextNode(),o++)}return J.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class it{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),N(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new et(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new Y(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new it(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}let st=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=tt(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==G,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=tt(this,s[i+r],e,r),a===G&&(a=this._$AH[r]),o||=!N(a)||a!==this._$AH[r],a===K?t=K:t!==K&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};class nt extends st{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class ot extends st{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class rt extends st{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??K)===G)return;const i=this._$AH,s=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}}const ct=x.litHtmlPolyfillSupport;ct?.(Y,it),(x.litHtmlVersions??=[]).push("3.3.3");const lt=globalThis;let ht=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new it(e.insertBefore(U(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}};ht._$litElement$=!0,ht.finalized=!0,lt.litElementHydrateSupport?.({LitElement:ht});const dt=lt.litElementPolyfillSupport;dt?.({LitElement:ht}),(lt.litElementVersions??=[]).push("4.2.2");const ut=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:b},mt=(t=pt,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function gt(t){return(e,i)=>"object"==typeof i?mt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ft(t){return gt({...t,state:!0,attribute:!1})}class _t extends ht{getCardSize(){return 3}getGridOptions(){return{rows:3,columns:6,min_rows:2}}shouldUpdate(t){return!!this._config&&(t.has("_config")||t.has("hass"))}}function vt(t){window.customCards=window.customCards||[],window.customCards.find(e=>e.type===t.type)||window.customCards.push({preview:!0,...t})}e([gt({attribute:!1})],_t.prototype,"hass",void 0),e([ft()],_t.prototype,"_config",void 0);const yt="ag-entity-card",$t=`${yt}-editor`,bt={name:""};let wt=class extends ht{constructor(){super(...arguments),this._schema=[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}],this._computeLabel=t=>({entity:"Entità",name:"Nome",icon:"Icona"}[t.name]??t.name)}setConfig(t){this._config=t}_valueChanged(t){const e=t.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?F`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}};e([gt({attribute:!1})],wt.prototype,"hass",void 0),e([ft()],wt.prototype,"_config",void 0),wt=e([ut($t)],wt);let At=class extends _t{static async getConfigElement(){return document.createElement($t)}static getStubConfig(){return{type:`custom:${yt}`,entity:"sun.sun"}}setConfig(t){if(!t)throw new Error("Configurazione non valida");if(!t.entity)throw new Error("Specifica un'entità da visualizzare (campo 'entity')");this._config={...bt,...t}}getGridOptions(){return{rows:1,columns:6,min_rows:1}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity,e=t?this.hass.states[t]:void 0,i=this._config.name||e?.attributes.friendly_name||t||"";if(!e)return F`
        <ha-card>
          <div class="content">
            <ha-icon class="icon unavailable" .icon=${this._config.icon||"mdi:alert-circle-outline"}></ha-icon>
            <span class="name">${i}</span>
            <span class="state unavailable">non disponibile</span>
          </div>
        </ha-card>
      `;const s=this._config.icon||e.attributes.icon,n=e.attributes.unit_of_measurement,o="unavailable"===e.state||"unknown"===e.state,r=this.hass.localize(`component.${e.entity_id.split(".")[0]}.entity_component._.state.${e.state}`)||`${e.state}${n?` ${n}`:""}`;return F`
      <ha-card>
        <div class="content">
          <ha-state-icon
            class="icon"
            .hass=${this.hass}
            .stateObj=${e}
            .icon=${s}
          ></ha-state-icon>
          <span class="name">${i}</span>
          <span class="state ${o?"unavailable":""}">${r}</span>
        </div>
      </ha-card>
    `}};At.styles=a`
    .content {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
    }
    .icon {
      color: var(--state-icon-color, var(--primary-color));
      flex: 0 0 auto;
    }
    .name {
      font-weight: 500;
      color: var(--primary-text-color);
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .state {
      color: var(--primary-color);
      font-weight: 500;
      flex: 0 0 auto;
    }
    .unavailable {
      color: var(--secondary-text-color);
      font-weight: 400;
    }
  `,At=e([ut(yt)],At),vt({type:yt,name:"AG Entity Card",description:"Mostra icona, nome e stato di una singola entità.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const xt=1;let Et=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const St="important",Ct=" !"+St,kt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Et{constructor(t){if(super(t),t.type!==xt||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(Ct);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?St:""):i[t]=s}}return G}}),Pt="ag-battery-card",Ot=`${Pt}-editor`,Mt={level_warning:50,level_alarm:20,idle_power:50,title_size:15},zt={name:"",invert_power:!1,title_font:"",...Mt},Ut={normal:"var(--accent-color, #ff9800)",charging:"var(--success-color, #43a047)",warning:"var(--warning-color, #ffa600)",alarm:"var(--error-color, #db4437)"},Nt="var(--disabled-text-color, #bdbdbd)";function Tt(t){if(void 0===t||""===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}function Ht(t,e=["on"]){const i=(t??"").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean);return i.length?i:e}function Rt(t,e){return void 0===t||""===t||"unavailable"===t||"unknown"===t?"unavailable":e.includes(t.toLowerCase())?"ok":"off"}var Dt,jt;function Lt(){return(Lt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t}).apply(this,arguments)}!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Dt||(Dt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(jt||(jt={}));var It=function(t,e,i){var s=e?function(t){switch(t.number_format){case Dt.comma_decimal:return["en-US","en"];case Dt.decimal_comma:return["de","es","it"];case Dt.space_comma:return["fr","sv","cs"];case Dt.system:return;default:return t.language}}(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==Dt.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(s,Wt(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,Wt(t,i)).format(Number(t))}return"string"==typeof t?t:function(t,e){return void 0===e&&(e=2),Math.round(t*Math.pow(10,e))/Math.pow(10,e)}(t,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")},Wt=function(t,e){var i=Lt({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var s=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=s,i.maximumFractionDigits=s}return i};const qt={mW:.001,W:1,kW:1e3,MW:1e6,GW:1e9,TW:1e12};const Bt=2*Math.PI*42;let Ft=class extends ht{constructor(){super(...arguments),this._schema=[{name:"battery_entity",required:!0,selector:{entity:{}}},{name:"power_entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"",type:"expandable",title:"Rete e backup",icon:"mdi:transmission-tower",schema:[{name:"backup_entity",selector:{entity:{}}},{name:"backup_ok_states",selector:{text:{}}},{name:"grid_entity",selector:{entity:{}}},{name:"grid_ok_states",selector:{text:{}}}]},{name:"",type:"expandable",title:"Soglie",icon:"mdi:tune",schema:[{name:"",type:"grid",schema:[{name:"level_warning",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}},{name:"level_alarm",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}}]},{name:"idle_power",selector:{number:{min:0,step:5,mode:"box",unit_of_measurement:"W"}}},{name:"invert_power",selector:{boolean:{}}}]},{name:"",type:"expandable",title:"Aspetto",icon:"mdi:palette",schema:[{name:"",type:"grid",schema:[{name:"title_font",selector:{text:{}}},{name:"title_size",selector:{number:{min:10,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}]},{name:"color_normal",selector:{text:{}}},{name:"color_charging",selector:{text:{}}},{name:"color_warning",selector:{text:{}}},{name:"color_alarm",selector:{text:{}}}]}],this._computeLabel=t=>({battery_entity:"Entità carica (%)",power_entity:"Entità potenza",name:"Nome",backup_entity:"Entità gateway backup",backup_ok_states:"Stati backup considerati OK",grid_entity:"Entità rete",grid_ok_states:"Stati rete considerati OK",level_warning:"Soglia warning",level_alarm:"Soglia allarme",idle_power:"Soglia potenza in attesa",invert_power:"Inverti segno potenza",title_font:"Font del titolo",title_size:"Dimensione titolo",color_normal:"Colore normale",color_charging:"Colore in carica",color_warning:"Colore warning",color_alarm:"Colore allarme"}[t.name]??t.title??t.name),this._computeHelper=t=>{const e="Vuoto = colore del tema. Accetta CSS: #ff9800, red, var(--mia-var).",i="Elenco separato da virgola. Vuoto = convenzione HA: 'on' = OK.";return{power_entity:"Positiva in carica, negativa in scarica (usa l'inversione se è al contrario).",backup_ok_states:i,grid_ok_states:i,idle_power:"Sotto questo valore assoluto la batteria è considerata 'in attesa'.",invert_power:"Da attivare se la potenza è negativa durante la carica.",title_font:"Vuoto = font del tema. Es: 'Cormorant Garamond', serif — il font va caricato dal tema HA, la card non può caricarlo da sé.",title_size:"Dimensione del titolo. I serif da display stanno meglio sui 17-18px.",color_normal:e,color_charging:e,color_warning:e,color_alarm:e}[t.name]}}setConfig(t){this._config=t}_valueChanged(t){const e=t.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?F`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}};e([gt({attribute:!1})],Ft.prototype,"hass",void 0),e([ft()],Ft.prototype,"_config",void 0),Ft=e([ut(Ot)],Ft);const Vt={charging:"mdi:flash",discharging:"mdi:flash-outline",idle:"mdi:pause-circle-outline"};let Gt=class extends _t{static async getConfigElement(){return document.createElement(Ot)}static getStubConfig(t){const e=e=>t&&Object.keys(t.states).find(i=>i.startsWith("sensor.")&&t.states[i].attributes.device_class===e)||"";return{type:`custom:${Pt}`,battery_entity:e("battery"),power_entity:e("power")}}setConfig(t){if(!t)throw new Error("Configurazione non valida");if(!t.battery_entity)throw new Error("Specifica l'entità della carica batteria (campo 'battery_entity')");if(!t.power_entity)throw new Error("Specifica l'entità della potenza batteria (campo 'power_entity')");const e=Object.fromEntries(Object.entries(t).filter(([,t])=>void 0!==t));this._config={...zt,...e}}getCardSize(){return 2}getGridOptions(){return{rows:2,columns:6,min_rows:2,min_columns:3}}_color(t){const e=this._config,i="charging"===t?e?.color_charging:"warning"===t?e?.color_warning:"alarm"===t?e?.color_alarm:e?.color_normal;return i?.trim()||Ut[t]}render(){if(!this._config||!this.hass)return K;const t=this._config,e=t.battery_entity?this.hass.states[t.battery_entity]:void 0,i=t.power_entity?this.hass.states[t.power_entity]:void 0,s=t.name||e?.attributes.friendly_name||t.battery_entity||"Batteria";if(!e||!i)return F`
        <ha-card>
          <div class="content">
            <div class="info">
              <div class="title">${s}</div>
              <div class="row muted">
                <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                <span>Entità non disponibile</span>
              </div>
            </div>
          </div>
        </ha-card>
      `;const n=Tt(e.state),o=void 0!==n,r=o?Math.min(100,Math.max(0,n)):0,a=t.level_warning??Mt.level_warning,c=t.level_alarm??Mt.level_alarm,l=o?function(t,e,i){return t<i?"alarm":t<e?"warning":"normal"}(r,a,c):"normal",h=o?this._color(l):Nt,d=Tt(i.state),u=void 0===d?void 0:function(t,e){const i=(e??"W").trim();if(i in qt)return t*qt[i];const s=i.toLowerCase();return"w"===s?t:"kw"===s?1e3*t:void 0}(d,i.attributes.unit_of_measurement),p=void 0===u?void 0:t.invert_power?-u:u,m=Math.abs(t.idle_power??Mt.idle_power),g=void 0===p?void 0:function(t,e){return t>e?"charging":t<-e?"discharging":"idle"}(p,m),f="charging"===g?this._color("charging"):"discharging"===g?h:"idle"===g?this._color("normal"):Nt,_=g?Vt[g]:"mdi:help-circle-outline",v=void 0===p||void 0===g?"Potenza non disponibile":"idle"===g?"In attesa":`${"charging"===g?"In carica":"In scarica"} · ${function(t,e){const i=Math.abs(t);return i>=1e3?`${It(i/1e3,e,{minimumFractionDigits:2,maximumFractionDigits:2})} kW`:`${It(i,e,{maximumFractionDigits:0})} W`}(p,this.hass.locale)}`,y=function(t,e){if(void 0!==t||void 0!==e)return"unavailable"===t?{severity:"alarm",message:"Sistema di backup non disponibile",icon:"mdi:alert-circle"}:"off"===t?{severity:"alarm",message:"Anomalia sistema di backup",icon:"mdi:alert-circle"}:"unavailable"===e?{severity:"alarm",message:"Stato rete non disponibile",icon:"mdi:alert-circle"}:"off"===e?{severity:"warning",message:"Rete assente · funzionamento a isola",icon:"mdi:transmission-tower-off"}:"ok"===t&&"ok"===e?{severity:"normal",message:"Rete presente · backup pronto",icon:"mdi:transmission-tower"}:"ok"===e?{severity:"normal",message:"Rete presente",icon:"mdi:transmission-tower"}:{severity:"normal",message:"Backup pronto",icon:"mdi:shield-check"}}(t.backup_entity?Rt(this.hass.states[t.backup_entity]?.state,Ht(t.backup_ok_states)):void 0,t.grid_entity?Rt(this.hass.states[t.grid_entity]?.state,Ht(t.grid_ok_states)):void 0),$=y?.severity??"normal",b=t.title_font?.trim(),w=kt({"--ag-gauge-color":h,"--ag-flow-color":f,"--ag-tint":this._color($),"--ag-title-size":`${t.title_size??Mt.title_size}px`,...b?{"--ag-title-font":b}:{}});return F`
      <ha-card class=${$} style=${w}>
        <div class="content">
          <div
            class="gauge"
            role="meter"
            aria-label="Carica batteria"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${o?Math.round(r):K}
            aria-valuetext=${o?`${Math.round(r)}%`:"non disponibile"}
          >
            <svg viewBox="0 0 100 100" aria-hidden="true">
              ${function(t){const e=void 0===t?0:Math.min(100,Math.max(0,t));return V`
    <circle class="ring-track" cx="50" cy="50" r="${42}"></circle>
    ${e>0?V`<circle
            class="ring-value"
            cx="50"
            cy="50"
            r="${42}"
            stroke-dasharray="${Bt}"
            stroke-dashoffset="${Bt*(1-e/100)}"
            transform="rotate(-90 50 50)"
          ></circle>`:K}
  `}(o?r:void 0)}
            </svg>
            <div class="gauge-label" aria-hidden="true">
              <span class="gauge-value"
                >${o?F`${Math.round(r)}<span class="pct">%</span>`:"–"}</span
              >
            </div>
          </div>

          <div class="info">
            <div class="title" title=${s}>${s}</div>
            <div class="row flow">
              <ha-icon .icon=${_}></ha-icon>
              <span>${v}</span>
            </div>
            ${y?F`
                  <div class="row system">
                    <ha-icon .icon=${y.icon}></ha-icon>
                    <span>${y.message}</span>
                  </div>
                `:K}
          </div>
        </div>
      </ha-card>
    `}};Gt.styles=a`
    ha-card {
      height: 100%;
      box-sizing: border-box;
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

    .content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 16px;
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
  `,Gt=e([ut(Pt)],Gt),vt({type:Pt,name:"AG Battery Card",description:"Stato di una batteria domestica: carica, potenza, rete e backup.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"}),console.info(`%c AG-CARDS %c v${t} `,"color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{t as AG_CARDS_VERSION};
