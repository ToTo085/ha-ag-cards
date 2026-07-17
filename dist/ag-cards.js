const t="0.3.1";function e(t,e,i,o){var r,s=arguments.length,a=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(s<3?r(a):s>3?r(e,i,a):r(e,i))||a);return s>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,o=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),s=new WeakMap;let a=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new a(i,t,r)},l=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:u,getOwnPropertySymbols:m,getPrototypeOf:p}=Object,g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",v=g.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&d(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);r?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...u(t),...m(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(o)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of e){const e=document.createElement("style"),r=i.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=o.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=o;const s=r.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,i,o=!1,r){if(void 0!==t){const s=this.constructor;if(!1===o&&(r=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:r},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==r||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,v?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,C=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+z,M=`<${P}>`,O=document,U=()=>O.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,H="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,L=/>/g,j=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,q=/"/g,B=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),G=W(1),F=W(2),V=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),Z=new WeakMap,J=O.createTreeWalker(O,129);function Y(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,o=[];let r,s=2===e?"<svg>":3===e?"<math>":"",a=R;for(let e=0;e<i;e++){const i=t[e];let n,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===R?"!--"===l[1]?a=D:void 0!==l[1]?a=L:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=j):void 0!==l[3]&&(a=j):a===j?">"===l[0]?(a=r??R,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?j:'"'===l[3]?q:I):a===q||a===I?a=j:a===D||a===L?a=R:(a=j,r=void 0);const h=a===j&&t[e+1].startsWith("/>")?" ":"";s+=a===R?i+M:c>=0?(o.push(n),i.slice(0,c)+k+i.slice(c)+z+h):i+z+(-2===c?e:h)}return[Y(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class X{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,s=0;const a=t.length-1,n=this.parts,[l,c]=Q(t,e);if(this.el=X.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=J.nextNode())&&n.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(k)){const e=c[s++],i=o.getAttribute(t).split(z),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?rt:"?"===a[1]?st:"@"===a[1]?at:ot}),o.removeAttribute(t)}else t.startsWith(z)&&(n.push({type:6,index:r}),o.removeAttribute(t));if(B.test(o.tagName)){const t=o.textContent.split(z),e=t.length-1;if(e>0){o.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],U()),J.nextNode(),n.push({type:2,index:++r});o.append(t[e],U())}}}else if(8===o.nodeType)if(o.data===P)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(z,t+1));)n.push({type:7,index:r}),t+=z.length-1}r++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function tt(t,e,i=t,o){if(e===V)return e;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const s=T(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(t),r._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(e=tt(t,r._$AS(t,e.values),r,o)),e}class et{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??O).importNode(e,!0);J.currentNode=o;let r=J.nextNode(),s=0,a=0,n=i[0];for(;void 0!==n;){if(s===n.index){let e;2===n.type?e=new it(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new nt(r,this,t)),this._$AV.push(e),n=i[++a]}s!==n?.index&&(r=J.nextNode(),s++)}return J.currentNode=O,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class it{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=tt(this,t,e),T(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new et(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new X(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new it(this.O(U()),this.O(U()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}let ot=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,r){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,o){const r=this.strings;let s=!1;if(void 0===r)t=tt(this,t,e,0),s=!T(t)||t!==this._$AH&&t!==V,s&&(this._$AH=t);else{const o=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=tt(this,o[i+a],e,a),n===V&&(n=this._$AH[a]),s||=!T(n)||n!==this._$AH[a],n===K?t=K:t!==K&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}s&&!o&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};class rt extends ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class st extends ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class at extends ot{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){if((t=tt(this,t,e,0)??K)===V)return;const i=this._$AH,o=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==K&&(i===K||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){tt(this,t)}}const lt=A.litHtmlPolyfillSupport;lt?.(X,it),(A.litHtmlVersions??=[]).push("3.3.3");const ct=globalThis;let dt=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let r=o._$litPart$;if(void 0===r){const t=i?.renderBefore??null;o._$litPart$=r=new it(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}};dt._$litElement$=!0,dt.finalized=!0,ct.litElementHydrateSupport?.({LitElement:dt});const ht=ct.litElementPolyfillSupport;ht?.({LitElement:dt}),(ct.litElementVersions??=[]).push("4.2.2");const ut=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},mt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},pt=(t=mt,e,i)=>{const{kind:o,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,r,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];e.call(this,i),this.requestUpdate(o,r,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function gt(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ft(t){return gt({...t,state:!0,attribute:!1})}class _t extends dt{getCardSize(){return 3}getGridOptions(){return{rows:3,columns:6,min_rows:2}}shouldUpdate(t){return!!this._config&&(t.has("_config")||t.has("hass"))}}function vt(t){window.customCards=window.customCards||[],window.customCards.find(e=>e.type===t.type)||window.customCards.push({preview:!0,...t})}e([gt({attribute:!1})],_t.prototype,"hass",void 0),e([ft()],_t.prototype,"_config",void 0);const bt="ag-entity-card",yt=`${bt}-editor`,$t={name:""};let wt=class extends dt{constructor(){super(...arguments),this._schema=[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}],this._computeLabel=t=>({entity:"Entità",name:"Nome",icon:"Icona"}[t.name]??t.name)}setConfig(t){this._config=t}_valueChanged(t){const e=t.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}};e([gt({attribute:!1})],wt.prototype,"hass",void 0),e([ft()],wt.prototype,"_config",void 0),wt=e([ut(yt)],wt);let xt=class extends _t{static async getConfigElement(){return document.createElement(yt)}static getStubConfig(){return{type:`custom:${bt}`,entity:"sun.sun"}}setConfig(t){if(!t)throw new Error("Configurazione non valida");if(!t.entity)throw new Error("Specifica un'entità da visualizzare (campo 'entity')");this._config={...$t,...t}}getGridOptions(){return{rows:1,columns:6,min_rows:1}}render(){if(!this._config||!this.hass)return K;const t=this._config.entity,e=t?this.hass.states[t]:void 0,i=this._config.name||e?.attributes.friendly_name||t||"";if(!e)return G`
        <ha-card>
          <div class="content">
            <ha-icon class="icon unavailable" .icon=${this._config.icon||"mdi:alert-circle-outline"}></ha-icon>
            <span class="name">${i}</span>
            <span class="state unavailable">non disponibile</span>
          </div>
        </ha-card>
      `;const o=this._config.icon||e.attributes.icon,r=e.attributes.unit_of_measurement,s="unavailable"===e.state||"unknown"===e.state,a=this.hass.localize(`component.${e.entity_id.split(".")[0]}.entity_component._.state.${e.state}`)||`${e.state}${r?` ${r}`:""}`;return G`
      <ha-card>
        <div class="content">
          <ha-state-icon
            class="icon"
            .hass=${this.hass}
            .stateObj=${e}
            .icon=${o}
          ></ha-state-icon>
          <span class="name">${i}</span>
          <span class="state ${s?"unavailable":""}">${a}</span>
        </div>
      </ha-card>
    `}};xt.styles=n`
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
  `,xt=e([ut(bt)],xt),vt({type:bt,name:"AG Entity Card",description:"Mostra icona, nome e stato di una singola entità.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const At=1;let Ct=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const Et="important",St=" !"+Et,kt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Ct{constructor(t){if(super(t),t.type!==At||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const o=t[i];return null==o?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const o=e[t];if(null!=o){this.ft.add(t);const e="string"==typeof o&&o.endsWith(St);t.includes("-")||e?i.setProperty(t,e?o.slice(0,-11):o,e?Et:""):i[t]=o}}return V}}),zt="ag-battery-card",Pt=`${zt}-editor`,Mt={level_warning:50,level_alarm:20,idle_power:50,title_size:15},Ot={name:"",invert_power:!1,title_font:"",...Mt},Ut={normal:"var(--accent-color, #ff9800)",charging:"var(--success-color, #43a047)",warning:"var(--warning-color, #ffa600)",alarm:"var(--error-color, #db4437)"},Tt="var(--disabled-text-color, #bdbdbd)";function Nt(t,e=["on"]){const i=(t??"").split(",").map(t=>t.trim().toLowerCase()).filter(Boolean);return i.length?i:e}function Ht(t,e){return void 0===t||""===t||"unavailable"===t||"unknown"===t?"unavailable":e.includes(t.toLowerCase())?"ok":"off"}function Rt(t){if(void 0===t||""===t)return;const e=Number(t);return Number.isFinite(e)?e:void 0}var Dt,Lt;function jt(){return(jt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])}return t}).apply(this,arguments)}!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Dt||(Dt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Lt||(Lt={}));var It=function(t,e,i){var o=e?function(t){switch(t.number_format){case Dt.comma_decimal:return["en-US","en"];case Dt.decimal_comma:return["de","es","it"];case Dt.space_comma:return["fr","sv","cs"];case Dt.system:return;default:return t.language}}(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==Dt.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(o,qt(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,qt(t,i)).format(Number(t))}return"string"==typeof t?t:function(t,e){return void 0===e&&(e=2),Math.round(t*Math.pow(10,e))/Math.pow(10,e)}(t,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")},qt=function(t,e){var i=jt({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var o=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=o,i.maximumFractionDigits=o}return i},Bt=new Set(["call-service","divider","section","weblink","cast","select"]),Wt={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},Gt=function(t,e){void 0===e&&(e=!1);var i=function(t,e){return o("hui-error-card",{type:"error",error:t,config:e})},o=function(t,e){var o=window.document.createElement(t);try{if(!o.setConfig)return;o.setConfig(e)}catch(o){return console.error(t,o),i(o.message,e)}return o};if(!t||"object"!=typeof t||!e&&!t.type)return i("No type defined",t);var r=t.type;if(r&&r.startsWith("custom:"))r=r.substr(7);else if(e)if(Bt.has(r))r="hui-"+r+"-row";else{if(!t.entity)return i("Invalid config given.",t);var s=t.entity.split(".",1)[0];r="hui-"+(Wt[s]||"text")+"-entity-row"}else r="hui-"+r+"-card";if(customElements.get(r))return o(r,t);var a=i("Custom element doesn't exist: "+t.type+".",t);a.style.display="None";var n=setTimeout(function(){a.style.display=""},2e3);return customElements.whenDefined(t.type).then(function(){clearTimeout(n),function(t,e,i,o){o=o||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});r.detail=i,t.dispatchEvent(r)}(a,"ll-rebuild",{},a)}),a};const Ft={mW:.001,W:1,kW:1e3,MW:1e6,GW:1e9,TW:1e12};function Vt(t,e){const i=(e??"W").trim();if(i in Ft)return t*Ft[i];const o=i.toLowerCase();return"w"===o?t:"kw"===o?1e3*t:void 0}function Kt(t,e){const i=Math.abs(t);return i>=1e3?`${It(i/1e3,e,{minimumFractionDigits:2,maximumFractionDigits:2})} kW`:`${It(i,e,{maximumFractionDigits:0})} W`}const Zt=2*Math.PI*42;let Jt=class extends dt{constructor(){super(...arguments),this._schema=[{name:"battery_entity",required:!0,selector:{entity:{}}},{name:"power_entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"",type:"expandable",title:"Rete e backup",icon:"mdi:transmission-tower",schema:[{name:"backup_entity",selector:{entity:{}}},{name:"backup_ok_states",selector:{text:{}}},{name:"grid_entity",selector:{entity:{}}},{name:"grid_ok_states",selector:{text:{}}}]},{name:"",type:"expandable",title:"Soglie",icon:"mdi:tune",schema:[{name:"",type:"grid",schema:[{name:"level_warning",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}},{name:"level_alarm",selector:{number:{min:0,max:100,step:1,mode:"box",unit_of_measurement:"%"}}}]},{name:"idle_power",selector:{number:{min:0,step:5,mode:"box",unit_of_measurement:"W"}}},{name:"invert_power",selector:{boolean:{}}}]},{name:"",type:"expandable",title:"Aspetto",icon:"mdi:palette",schema:[{name:"",type:"grid",schema:[{name:"title_font",selector:{text:{}}},{name:"title_size",selector:{number:{min:10,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}]},{name:"color_normal",selector:{text:{}}},{name:"color_charging",selector:{text:{}}},{name:"color_warning",selector:{text:{}}},{name:"color_alarm",selector:{text:{}}}]}],this._computeLabel=t=>({battery_entity:"Entità carica (%)",power_entity:"Entità potenza",name:"Nome",backup_entity:"Entità gateway backup",backup_ok_states:"Stati backup considerati OK",grid_entity:"Entità rete",grid_ok_states:"Stati rete considerati OK",level_warning:"Soglia warning",level_alarm:"Soglia allarme",idle_power:"Soglia potenza in attesa",invert_power:"Inverti segno potenza",title_font:"Font del titolo",title_size:"Dimensione titolo",color_normal:"Colore normale",color_charging:"Colore in carica",color_warning:"Colore warning",color_alarm:"Colore allarme"}[t.name]??t.title??t.name),this._computeHelper=t=>{const e="Vuoto = colore del tema. Accetta CSS: #ff9800, red, var(--mia-var).",i="Elenco separato da virgola. Vuoto = convenzione HA: 'on' = OK.";return{power_entity:"Positiva in carica, negativa in scarica (usa l'inversione se è al contrario).",backup_ok_states:i,grid_ok_states:i,idle_power:"Sotto questo valore assoluto la batteria è considerata 'in attesa'.",invert_power:"Da attivare se la potenza è negativa durante la carica.",title_font:"Vuoto = font del tema. Es: 'Cormorant Garamond', serif — il font va caricato dal tema HA, la card non può caricarlo da sé.",title_size:"Dimensione del titolo. I serif da display stanno meglio sui 17-18px.",color_normal:e,color_charging:e,color_warning:e,color_alarm:e}[t.name]}}setConfig(t){this._config=t}_valueChanged(t){const e=t.detail.value;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}render(){return this.hass&&this._config?G`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:K}};e([gt({attribute:!1})],Jt.prototype,"hass",void 0),e([ft()],Jt.prototype,"_config",void 0),Jt=e([ut(Pt)],Jt);const Yt={charging:"mdi:flash",discharging:"mdi:flash-outline",idle:"mdi:pause-circle-outline"};let Qt,Xt=class extends _t{static async getConfigElement(){return document.createElement(Pt)}static getStubConfig(t){const e=e=>t&&Object.keys(t.states).find(i=>i.startsWith("sensor.")&&t.states[i].attributes.device_class===e)||"";return{type:`custom:${zt}`,battery_entity:e("battery"),power_entity:e("power")}}setConfig(t){if(!t)throw new Error("Configurazione non valida");if(!t.battery_entity)throw new Error("Specifica l'entità della carica batteria (campo 'battery_entity')");if(!t.power_entity)throw new Error("Specifica l'entità della potenza batteria (campo 'power_entity')");const e=Object.fromEntries(Object.entries(t).filter(([,t])=>void 0!==t));this._config={...Ot,...e}}getCardSize(){return 2}getGridOptions(){return{rows:2,columns:6,min_rows:2,min_columns:3}}_color(t){const e=this._config,i="charging"===t?e?.color_charging:"warning"===t?e?.color_warning:"alarm"===t?e?.color_alarm:e?.color_normal;return i?.trim()||Ut[t]}render(){if(!this._config||!this.hass)return K;const t=this._config,e=t.battery_entity?this.hass.states[t.battery_entity]:void 0,i=t.power_entity?this.hass.states[t.power_entity]:void 0,o=t.name||e?.attributes.friendly_name||t.battery_entity||"Batteria";if(!e||!i)return G`
        <ha-card>
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
      `;const r=Rt(e.state),s=void 0!==r,a=s?Math.min(100,Math.max(0,r)):0,n=t.level_warning??Mt.level_warning,l=t.level_alarm??Mt.level_alarm,c=s?function(t,e,i){return t<i?"alarm":t<e?"warning":"normal"}(a,n,l):"normal",d=s?this._color(c):Tt,h=Rt(i.state),u=void 0===h?void 0:Vt(h,i.attributes.unit_of_measurement),m=void 0===u?void 0:t.invert_power?-u:u,p=Math.abs(t.idle_power??Mt.idle_power),g=void 0===m?void 0:function(t,e){return t>e?"charging":t<-e?"discharging":"idle"}(m,p),f="charging"===g?this._color("charging"):"discharging"===g?d:"idle"===g?this._color("normal"):Tt,_=g?Yt[g]:"mdi:help-circle-outline",v=void 0===m||void 0===g?"Potenza non disponibile":"idle"===g?"In attesa":`${"charging"===g?"In carica":"In scarica"} · ${Kt(m,this.hass.locale)}`,b=function(t,e){if(void 0!==t||void 0!==e)return"unavailable"===t?{severity:"alarm",message:"Sistema di backup non disponibile",icon:"mdi:alert-circle"}:"off"===t?{severity:"alarm",message:"Anomalia sistema di backup",icon:"mdi:alert-circle"}:"unavailable"===e?{severity:"alarm",message:"Stato rete non disponibile",icon:"mdi:alert-circle"}:"off"===e?{severity:"warning",message:"Rete assente · funzionamento a isola",icon:"mdi:transmission-tower-off"}:"ok"===t&&"ok"===e?{severity:"normal",message:"Rete presente · backup pronto",icon:"mdi:transmission-tower"}:"ok"===e?{severity:"normal",message:"Rete presente",icon:"mdi:transmission-tower"}:{severity:"normal",message:"Backup pronto",icon:"mdi:shield-check"}}(t.backup_entity?Ht(this.hass.states[t.backup_entity]?.state,Nt(t.backup_ok_states)):void 0,t.grid_entity?Ht(this.hass.states[t.grid_entity]?.state,Nt(t.grid_ok_states)):void 0),y=b?.severity??"normal",$=t.title_font?.trim(),w=kt({"--ag-gauge-color":d,"--ag-flow-color":f,"--ag-tint":this._color(y),"--ag-title-size":`${t.title_size??Mt.title_size}px`,...$?{"--ag-title-font":$}:{}});return G`
      <ha-card class=${y} style=${w}>
        <div class="content">
          <div
            class="gauge"
            role="meter"
            aria-label="Carica batteria"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${s?Math.round(a):K}
            aria-valuetext=${s?`${Math.round(a)}%`:"non disponibile"}
          >
            <svg viewBox="0 0 100 100" aria-hidden="true">
              ${function(t){const e=void 0===t?0:Math.min(100,Math.max(0,t));return F`
    <circle class="ring-track" cx="50" cy="50" r="${42}"></circle>
    ${e>0?F`<circle
            class="ring-value"
            cx="50"
            cy="50"
            r="${42}"
            stroke-dasharray="${Zt}"
            stroke-dashoffset="${Zt*(1-e/100)}"
            transform="rotate(-90 50 50)"
          ></circle>`:K}
  `}(s?a:void 0)}
            </svg>
            <div class="gauge-label" aria-hidden="true">
              <span class="gauge-value"
                >${s?G`${Math.round(a)}<span class="pct">%</span>`:"–"}</span
              >
            </div>
          </div>

          <div class="info">
            <div class="title" title=${o}>${o}</div>
            <div class="row flow">
              <ha-icon .icon=${_}></ha-icon>
              <span>${v}</span>
            </div>
            ${b?G`
                  <div class="row system">
                    <ha-icon .icon=${b.icon}></ha-icon>
                    <span>${b.message}</span>
                  </div>
                `:K}
          </div>
        </div>
      </ha-card>
    `}};function te(){return Qt??=window.loadCardHelpers?window.loadCardHelpers():Promise.reject(new Error("window.loadCardHelpers non disponibile")),Qt}Xt.styles=n`
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
  `,Xt=e([ut(zt)],Xt),vt({type:zt,name:"AG Battery Card",description:"Stato di una batteria domestica: carica, potenza, rete e backup.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"});class ee extends _t{constructor(){super(...arguments),this.direction="column",this._buildGen=0}setConfig(t){if(!t)throw new Error("Configurazione non valida");if(void 0!==t.cards&&!Array.isArray(t.cards))throw new Error("Il campo 'cards' deve essere una lista di card");for(const e of t.cards??[])if("object"!=typeof e||null===e||"string"!=typeof e.type)throw new Error("Ogni elemento di 'cards' deve avere un campo 'type'");const e=Object.fromEntries(Object.entries(t).filter(([,t])=>void 0!==t));this._config={flat:!0,cards:[],...e},this._rebuildAll()}shouldUpdate(t){return super.shouldUpdate(t)||t.has("_cards")||t.has("_error")}updated(t){if(super.updated(t),t.has("hass")&&this.hass&&this._cards)for(const t of this._cards)t.hass=this.hass}getCardSize(){if(!this._cards||0===this._cards.length)return 1;const t=Promise.all(this._cards.map(t=>function(t){return"function"==typeof t.getCardSize?t.getCardSize():4}(t)));return"row"===this.direction?t.then(t=>Math.max(...t)):t.then(t=>t.reduce((t,e)=>t+e,0))}getGridOptions(){return{columns:12,rows:"auto"}}async _rebuildAll(){const t=++this._buildGen,e=this._config?.cards??[];try{const i=await Promise.all(e.map(t=>this._createCard(t)));t===this._buildGen&&(this._cards=i,this._error=void 0)}catch(e){t===this._buildGen&&(this._cards=[],this._error=e instanceof Error?e.message:String(e))}}async _createCard(t){let e;try{e=(await te()).createCardElement(t)}catch{e=Gt(t)}return this.hass&&(e.hass=this.hass),e.addEventListener("ll-rebuild",i=>{i.stopPropagation(),this._rebuildCard(e,t)},{once:!0}),e}async _rebuildCard(t,e){const i=this._buildGen,o=await this._createCard(e);i===this._buildGen&&this._cards&&(this._cards=this._cards.map(e=>e===t?o:e))}renderChildren(){if(this._error)return G`<div class="children-error">${this._error}</div>`;if(!this._cards)return K;const t=this._config?.flat??!0;return G`
      <div class="children ${this.direction}${t?" flat":""}">
        ${this._cards.map(t=>G`<div class="child">${t}</div>`)}
      </div>
    `}}e([ft()],ee.prototype,"_cards",void 0),e([ft()],ee.prototype,"_error",void 0);const ie=n`
  .children {
    display: flex;
    gap: var(--ag-stack-gap, 8px);
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
`,oe="ag-panel-card",re=`${oe}-editor`,se=15,ae=1;let ne;function le(){return ne??=async function(){if(Boolean(customElements.get("hui-card-element-editor")&&customElements.get("hui-card-picker")))return!0;(await te()).createCardElement({type:"vertical-stack",cards:[]}),await ce(customElements.whenDefined("hui-vertical-stack-card"));const t=customElements.get("hui-vertical-stack-card");return await(t?.getConfigElement?.()),await ce(Promise.all([customElements.whenDefined("hui-card-element-editor"),customElements.whenDefined("hui-card-picker")])),!0}().catch(()=>!1),ne}function ce(t){return Promise.race([t,new Promise((t,e)=>window.setTimeout(()=>e(new Error("Timeout caricamento editor HA")),5e3))])}let de=class extends dt{constructor(){super(...arguments),this.cards=[],this._selected=0,this._guiMode=!0,this._guiModeAvailable=!0,this._status="loading"}firstUpdated(){le().then(t=>{this._status=t?"ready":"error"})}willUpdate(t){t.has("cards")&&this._selected>this.cards.length&&(this._selected=this.cards.length)}render(){if(!this.hass)return K;if("loading"===this._status)return G`<div class="note">Caricamento editor…</div>`;if("error"===this._status)return G`<div class="warning">
        Editor visuale delle card annidate non disponibile: configura la lista
        <code>cards</code> dall'editor YAML della card.
      </div>`;const t=this._selected===this.cards.length;return G`
      <div class="chips" role="tablist" aria-label="Card contenute">
        ${this.cards.map((t,e)=>G`
            <button
              class="chip ${e===this._selected?"active":""}"
              role="tab"
              aria-selected=${e===this._selected?"true":"false"}
              @click=${()=>this._select(e)}
            >
              ${e+1}
            </button>
          `)}
        <button
          class="chip add ${t?"active":""}"
          role="tab"
          aria-selected=${t?"true":"false"}
          aria-label="Aggiungi card"
          @click=${()=>this._select(this.cards.length)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
        </button>
      </div>
      ${t?G`
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
    `}_select(t){this._selected=t,this._guiMode=!0,this._guiModeAvailable=!0}_toggleMode(){this._editorElement?.toggleMode?.()}_cardPicked(t){t.stopPropagation();const e=t.detail?.config;if(!e)return;const i=[...this.cards,e];this._select(i.length-1),this._emit(i)}_childConfigChanged(t){t.stopPropagation();const e=t.detail?.config;if(!e)return;const i=[...this.cards];i[this._selected]=e,this._guiModeAvailable=!1!==t.detail.guiModeAvailable,this._emit(i)}_guiModeChanged(t){t.stopPropagation(),this._guiMode=Boolean(t.detail.guiMode),this._guiModeAvailable=!1!==t.detail.guiModeAvailable}_move(t,e){const i=[...this.cards],[o]=i.splice(t,1);i.splice(e,0,o),this._selected=e,this._emit(i)}_delete(t){const e=this.cards.filter((e,i)=>i!==t);this._selected=Math.min(t,e.length),this._emit(e)}_emit(t){this.dispatchEvent(new CustomEvent("cards-changed",{detail:{cards:t}}))}};de.styles=n`
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
  `,e([gt({attribute:!1})],de.prototype,"hass",void 0),e([gt({attribute:!1})],de.prototype,"lovelace",void 0),e([gt({attribute:!1})],de.prototype,"cards",void 0),e([ft()],de.prototype,"_selected",void 0),e([ft()],de.prototype,"_guiMode",void 0),e([ft()],de.prototype,"_guiModeAvailable",void 0),e([ft()],de.prototype,"_status",void 0),e([function(t){return(e,i,o)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}("hui-card-element-editor")],de.prototype,"_editorElement",void 0),de=e([ut("ag-cards-editor-list")],de);class he extends dt{setConfig(t){this._config=t}connectedCallback(){if(super.connectedCallback(),void 0===this.lovelace)try{this.lovelace=function(){var t=document.querySelector("home-assistant");if(t=(t=(t=(t=(t=(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root")){var e=t.lovelace;return e.current_view=t.___curView,e}return null}()?.config}catch{this.lovelace=void 0}}render(){return this.hass&&this._config?G`
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
    `:K}_valueChanged(t){if(t.stopPropagation(),!this._config)return;const e=t.detail.value;this._emit({...this._config,...e,cards:this._config.cards??[]})}_cardsChanged(t){t.stopPropagation(),this._config&&this._emit({...this._config,cards:t.detail.cards})}_emit(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}}he.styles=n`
    .cards-heading {
      margin: 16px 0 8px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
  `,e([gt({attribute:!1})],he.prototype,"hass",void 0),e([gt({attribute:!1})],he.prototype,"lovelace",void 0),e([ft()],he.prototype,"_config",void 0);let ue=class extends he{constructor(){super(...arguments),this._schema=[{name:"title",selector:{text:{}}},{name:"",type:"grid",schema:[{name:"subtitle",selector:{text:{}}},{name:"subtitle_align",selector:{select:{mode:"dropdown",options:[{value:"left",label:"Sinistra"},{value:"center",label:"Centro"},{value:"right",label:"Destra"}]}}}]},{name:"",type:"expandable",title:"Riepilogo",icon:"mdi:sigma",schema:[{name:"summary_label",selector:{text:{}}},{name:"summary_entities",selector:{entity:{multiple:!0}}},{name:"",type:"grid",schema:[{name:"summary_unit",selector:{text:{}}},{name:"summary_decimals",selector:{number:{min:0,max:3,step:1,mode:"box"}}}]},{name:"summary_color",selector:{text:{}}}]},{name:"",type:"expandable",title:"Aspetto",icon:"mdi:palette",schema:[{name:"",type:"grid",schema:[{name:"title_font",selector:{text:{}}},{name:"title_size",selector:{number:{min:10,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}]},{name:"flat",selector:{boolean:{}}}]}],this._computeLabel=t=>({title:"Titolo",subtitle:"Sottotitolo",subtitle_align:"Allineamento sottotitolo",summary_label:"Didascalia",summary_entities:"Entità del valore",summary_unit:"Unità forzata",summary_decimals:"Decimali",summary_color:"Colore del valore",title_font:"Font del titolo",title_size:"Dimensione titolo",flat:"Card figlie senza cornice"}[t.name]??t.title??t.name),this._computeHelper=t=>({summary_label:"Testo libero nell'angolo destro dell'header (es. TRIFASE · BATTERIA).",summary_entities:"Una entità = il suo valore; più entità = la somma. Le potenze (W/kW) vengono convertite e formattate da sole.",summary_unit:"Vuota = automatica. Se impostata disattiva la conversione delle potenze e somma i valori così come sono.",summary_decimals:"Decimali della somma semplice (le potenze si formattano da sole).",summary_color:"Vuoto = accent. Accetta CSS: #ff9800, red, var(--mia-var).",title_font:"Vuoto = font del tema. Es: 'Cormorant Garamond', serif — il font va caricato dal tema HA, la card non può caricarlo da sé.",title_size:"Dimensione del titolo. I serif da display stanno meglio sui 17-18px.",flat:"Nasconde sfondo, bordo e ombra delle card contenute."}[t.name])}};ue=e([ut(re)],ue);let me=class extends ee{static async getConfigElement(){return document.createElement(re)}static getStubConfig(){return{type:`custom:${oe}`,title:"Pannello",cards:[]}}getCardSize(){const t=super.getCardSize();return"number"==typeof t?t+1:t.then(t=>t+1)}_summaryValue(){const t=this._config,e=this.hass;if(!t?.summary_entities||!e)return;const i=Array.isArray(t.summary_entities)?t.summary_entities:[t.summary_entities];if(0===i.length)return;const o=function(t,e){const i=t.filter(t=>void 0!==t.value);if(0===i.length)return;if(!e?.trim()){const t=i.map(t=>void 0===t.unit?void 0:Vt(t.value,t.unit));if(t.every(t=>void 0!==t))return{kind:"power",watts:t.reduce((t,e)=>t+e,0)}}return{kind:"plain",total:i.reduce((t,e)=>t+e.value,0),unit:e?.trim()||i[0].unit}}(i.map(t=>{const i=e.states[t];return{value:Rt(i?.state),unit:i?.attributes.unit_of_measurement}}),t.summary_unit);if(!o)return"–";if("power"===o.kind)return`${o.watts<0?"-":""}${Kt(o.watts,e.locale)}`;const r=t.summary_decimals??ae,s=It(o.total,e.locale,{maximumFractionDigits:r});return o.unit?`${s} ${o.unit}`:s}render(){if(!this._config||!this.hass)return K;const t=this._config,e=this._summaryValue(),i=Boolean(t.summary_label||e),o=Boolean(t.title||t.subtitle||i),r=t.title_font?.trim(),s=t.summary_color?.trim(),a=kt({"--ag-title-size":`${t.title_size??se}px`,"--ag-subtitle-align":t.subtitle_align??"left",...r?{"--ag-title-font":r}:{},...s?{"--ag-value-color":s}:{}});return G`
      <ha-card style=${a}>
        ${o?G`
              <div class="header">
                <div class="header-row">
                  <div class="title" title=${t.title||""}>${t.title||""}</div>
                  ${i?G`
                        <div class="summary">
                          ${t.summary_label?G`<span class="summary-label">${t.summary_label}</span>`:K}
                          ${e?G`<span class="summary-value">${e}</span>`:K}
                        </div>
                      `:K}
                </div>
                ${t.subtitle?G`<div class="subtitle">${t.subtitle}</div>`:K}
              </div>
            `:K}
        ${this.renderChildren()}
      </ha-card>
    `}};me.styles=[ie,n`
      ha-card {
        height: 100%;
        box-sizing: border-box;
        padding: 12px 16px;
      }

      .header {
        margin-bottom: 10px;
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
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }
      .summary-value {
        font-size: 15px;
        font-weight: 600;
        color: var(--ag-value-color, var(--accent-color));
        font-variant-numeric: tabular-nums;
      }
      .subtitle {
        margin-top: 2px;
        font-size: 12px;
        color: var(--secondary-text-color);
        text-align: var(--ag-subtitle-align, left);
      }
    `],me=e([ut(oe)],me),vt({type:oe,name:"AG Panel Card",description:"Pannello con intestazione (titolo, sottotitolo, valore o somma a destra) e card figlie impilate.",preview:!1,documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const pe="ag-vstack-card",ge=`${pe}-editor`;let fe=class extends he{constructor(){super(...arguments),this._schema=[{name:"flat",selector:{boolean:{}}}],this._computeLabel=t=>"flat"===t.name?"Card figlie senza cornice":t.title??t.name,this._computeHelper=t=>"flat"===t.name?"Nasconde sfondo, bordo e ombra delle card contenute.":void 0}};fe=e([ut(ge)],fe);let _e=class extends ee{static async getConfigElement(){return document.createElement(ge)}static getStubConfig(){return{type:`custom:${pe}`,cards:[]}}render(){return this._config&&this.hass?this.renderChildren():K}};_e.styles=[ie],_e=e([ut(pe)],_e),vt({type:pe,name:"AG VStack Card",description:"Pila verticale di card senza cornice, da comporre dentro altre card.",preview:!1,documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const ve="ag-hstack-card",be=`${ve}-editor`;let ye=class extends he{constructor(){super(...arguments),this._schema=[{name:"flat",selector:{boolean:{}}}],this._computeLabel=t=>"flat"===t.name?"Card figlie senza cornice":t.title??t.name,this._computeHelper=t=>"flat"===t.name?"Nasconde sfondo, bordo e ombra delle card contenute.":void 0}};ye=e([ut(be)],ye);let $e=class extends ee{constructor(){super(...arguments),this.direction="row"}static async getConfigElement(){return document.createElement(be)}static getStubConfig(){return{type:`custom:${ve}`,cards:[]}}render(){return this._config&&this.hass?this.renderChildren():K}};$e.styles=[ie],$e=e([ut(ve)],$e),vt({type:ve,name:"AG HStack Card",description:"Fila orizzontale di card a larghezza uguale, senza cornice.",preview:!1,documentationURL:"https://github.com/ToTo085/ha-ag-cards"});const we="ag-separator-card",xe=8;let Ae=class extends _t{static getConfigForm(){return{schema:[{name:"margin",selector:{number:{min:0,max:48,step:1,mode:"box",unit_of_measurement:"px"}}}],computeLabel:t=>"margin"===t.name?"Margine verticale":t.name}}static getStubConfig(){return{type:`custom:${we}`}}setConfig(t){if(!t)throw new Error("Configurazione non valida");this._config={...t}}getCardSize(){return 1}getGridOptions(){return{columns:"full",rows:"auto"}}render(){if(!this._config)return K;const t=this._config.margin??xe;return G`
      <div class="line" role="separator" style=${kt({"--ag-sep-margin":`${t}px`})}></div>
    `}};Ae.styles=n`
    .line {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      margin: var(--ag-sep-margin, 8px) 0;
    }
  `,Ae=e([ut(we)],Ae),vt({type:we,name:"AG Separator Card",description:"Sottile linea divisoria da usare tra card.",documentationURL:"https://github.com/ToTo085/ha-ag-cards"}),console.info(`%c AG-CARDS %c v${t} `,"color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");export{t as AG_CARDS_VERSION};
