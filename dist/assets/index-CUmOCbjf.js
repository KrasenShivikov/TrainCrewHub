(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();const $l=`<div class="d-flex flex-column min-vh-100 bg-light-subtle">\r
  <header id="app-header"></header>\r
  <main id="page-content" class="container py-4 flex-grow-1"></main>\r
  <footer id="app-footer"></footer>\r
</div>\r
`,Al=`<nav class="navbar navbar-expand-lg navbar-dark bg-primary">\r
  <div class="container">\r
    <a class="navbar-brand fw-semibold" href="/" data-link>TrainCrewHub</a>\r
    <button\r
      class="navbar-toggler"\r
      type="button"\r
      data-bs-toggle="collapse"\r
      data-bs-target="#mainNav"\r
      aria-controls="mainNav"\r
      aria-expanded="false"\r
      aria-label="Toggle navigation"\r
    >\r
      <span class="navbar-toggler-icon"></span>\r
    </button>\r
    <div class="collapse navbar-collapse" id="mainNav">\r
      <ul class="navbar-nav ms-auto gap-lg-2">\r
        <li class="nav-item">\r
          <a class="nav-link" href="/" data-link>Home</a>\r
        </li>\r
        <li class="nav-item dropdown">\r
          <a\r
            class="nav-link dropdown-toggle"\r
            href="#"\r
            role="button"\r
            data-bs-toggle="dropdown"\r
            aria-expanded="false"\r
          >\r
            Графици\r
          </a>\r
          <ul class="dropdown-menu dropdown-menu-end">\r
            <li><a class="dropdown-item" href="/schedule-keys" data-link>Ключ-График</a></li>\r
            <li><a class="dropdown-item" href="/plan-schedule" data-link>План График</a></li>\r
            <li><a class="dropdown-item" href="/schedule" data-link>График</a></li>\r
          </ul>\r
        </li>\r
        <li class="nav-item dropdown">\r
          <a\r
            class="nav-link dropdown-toggle"\r
            href="#"\r
            role="button"\r
            data-bs-toggle="dropdown"\r
            aria-expanded="false"\r
          >\r
            Повески\r
          </a>\r
          <ul class="dropdown-menu dropdown-menu-end">\r
            <li><a class="dropdown-item" href="/trains" data-link>Влакове</a></li>\r
            <li><a class="dropdown-item" href="/duties" data-link>Повески</a></li>\r
            <li><a class="dropdown-item" href="/duty-types" data-link>Типове повески</a></li>\r
            <li><a class="dropdown-item" href="/planned-duties" data-link>Планирани повески</a></li>\r
            <li><a class="dropdown-item" href="/actual-duties" data-link>Реални повески</a></li>\r
          </ul>\r
        </li>\r
        <li class="nav-item dropdown">\r
          <a\r
            class="nav-link dropdown-toggle"\r
            href="#"\r
            role="button"\r
            data-bs-toggle="dropdown"\r
            aria-expanded="false"\r
          >\r
            Персонал\r
          </a>\r
          <ul class="dropdown-menu dropdown-menu-end">\r
            <li><a class="dropdown-item" href="/employees" data-link>Служители</a></li>\r
            <li><a class="dropdown-item" href="/employee-absences" data-link>Отсъствия</a></li>\r
            <li><a class="dropdown-item" href="/user-profiles" data-link>Потребителски профили</a></li>\r
          </ul>\r
        </li>\r
        <li class="nav-item">\r
          <a class="nav-link" href="/documents" data-link>Документи</a>\r
        </li>\r
        <li class="nav-item d-none" id="nav-admin">\r
          <a class="nav-link" href="/admin" data-link>Админ</a>\r
        </li>\r
        <li class="nav-item" id="nav-sign-in">\r
          <a class="nav-link" href="/login" data-link>Sign In</a>\r
        </li>\r
        <li class="nav-item" id="nav-register">\r
          <a class="nav-link" href="/register" data-link>Register</a>\r
        </li>\r
        <li class="nav-item d-none" id="nav-my-profile">\r
          <a class="nav-link" href="/user-profiles" data-link>Профили</a>\r
        </li>\r
        <li class="nav-item d-none" id="nav-logout">\r
          <button type="button" class="nav-link btn btn-link p-0 border-0 text-decoration-none">Logout</button>\r
        </li>\r
      </ul>\r
    </div>\r
  </div>\r
</nav>\r
`;function Yn(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(r[n[s]]=e[n[s]]);return r}function Cl(e,t,r,n){function s(a){return a instanceof r?a:new r(function(i){i(a)})}return new(r||(r=Promise))(function(a,i){function o(c){try{d(n.next(c))}catch(u){i(u)}}function l(c){try{d(n.throw(c))}catch(u){i(u)}}function d(c){c.done?a(c.value):s(c.value).then(o,l)}d((n=n.apply(e,t||[])).next())})}const Rl=e=>e?(...t)=>e(...t):(...t)=>fetch(...t);class ma extends Error{constructor(t,r="FunctionsError",n){super(t),this.name=r,this.context=n}}class Il extends ma{constructor(t){super("Failed to send a request to the Edge Function","FunctionsFetchError",t)}}class Ba extends ma{constructor(t){super("Relay Error invoking the Edge Function","FunctionsRelayError",t)}}class Ka extends ma{constructor(t){super("Edge Function returned a non-2xx status code","FunctionsHttpError",t)}}var As;(function(e){e.Any="any",e.ApNortheast1="ap-northeast-1",e.ApNortheast2="ap-northeast-2",e.ApSouth1="ap-south-1",e.ApSoutheast1="ap-southeast-1",e.ApSoutheast2="ap-southeast-2",e.CaCentral1="ca-central-1",e.EuCentral1="eu-central-1",e.EuWest1="eu-west-1",e.EuWest2="eu-west-2",e.EuWest3="eu-west-3",e.SaEast1="sa-east-1",e.UsEast1="us-east-1",e.UsWest1="us-west-1",e.UsWest2="us-west-2"})(As||(As={}));class Dl{constructor(t,{headers:r={},customFetch:n,region:s=As.Any}={}){this.url=t,this.headers=r,this.region=s,this.fetch=Rl(n)}setAuth(t){this.headers.Authorization=`Bearer ${t}`}invoke(t){return Cl(this,arguments,void 0,function*(r,n={}){var s;let a,i;try{const{headers:o,method:l,body:d,signal:c,timeout:u}=n;let h={},{region:m}=n;m||(m=this.region);const p=new URL(`${this.url}/${r}`);m&&m!=="any"&&(h["x-region"]=m,p.searchParams.set("forceFunctionRegion",m));let f;d&&(o&&!Object.prototype.hasOwnProperty.call(o,"Content-Type")||!o)?typeof Blob<"u"&&d instanceof Blob||d instanceof ArrayBuffer?(h["Content-Type"]="application/octet-stream",f=d):typeof d=="string"?(h["Content-Type"]="text/plain",f=d):typeof FormData<"u"&&d instanceof FormData?f=d:(h["Content-Type"]="application/json",f=JSON.stringify(d)):d&&typeof d!="string"&&!(typeof Blob<"u"&&d instanceof Blob)&&!(d instanceof ArrayBuffer)&&!(typeof FormData<"u"&&d instanceof FormData)?f=JSON.stringify(d):f=d;let _=c;u&&(i=new AbortController,a=setTimeout(()=>i.abort(),u),c?(_=i.signal,c.addEventListener("abort",()=>i.abort())):_=i.signal);const y=yield this.fetch(p.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},h),this.headers),o),body:f,signal:_}).catch(k=>{throw new Il(k)}),g=y.headers.get("x-relay-error");if(g&&g==="true")throw new Ba(y);if(!y.ok)throw new Ka(y);let b=((s=y.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),w;return b==="application/json"?w=yield y.json():b==="application/octet-stream"||b==="application/pdf"?w=yield y.blob():b==="text/event-stream"?w=y:b==="multipart/form-data"?w=yield y.formData():w=yield y.text(),{data:w,error:null,response:y}}catch(o){return{data:null,error:o,response:o instanceof Ka||o instanceof Ba?o.context:void 0}}finally{a&&clearTimeout(a)}})}}var Pl=class extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}},Ol=class{constructor(e){var t,r,n;this.shouldThrowOnError=!1,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=(t=e.shouldThrowOnError)!==null&&t!==void 0?t:!1,this.signal=e.signal,this.isMaybeSingle=(r=e.isMaybeSingle)!==null&&r!==void 0?r:!1,this.urlLengthLimit=(n=e.urlLengthLimit)!==null&&n!==void 0?n:8e3,e.fetch?this.fetch=e.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}then(e,t){var r=this;this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const n=this.fetch;let s=n(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async a=>{let i=null,o=null,l=null,d=a.status,c=a.statusText;if(a.ok){var u,h;if(r.method!=="HEAD"){var m;const y=await a.text();y===""||(r.headers.get("Accept")==="text/csv"||r.headers.get("Accept")&&(!((m=r.headers.get("Accept"))===null||m===void 0)&&m.includes("application/vnd.pgrst.plan+text"))?o=y:o=JSON.parse(y))}const f=(u=r.headers.get("Prefer"))===null||u===void 0?void 0:u.match(/count=(exact|planned|estimated)/),_=(h=a.headers.get("content-range"))===null||h===void 0?void 0:h.split("/");f&&_&&_.length>1&&(l=parseInt(_[1])),r.isMaybeSingle&&r.method==="GET"&&Array.isArray(o)&&(o.length>1?(i={code:"PGRST116",details:`Results contain ${o.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},o=null,l=null,d=406,c="Not Acceptable"):o.length===1?o=o[0]:o=null)}else{var p;const f=await a.text();try{i=JSON.parse(f),Array.isArray(i)&&a.status===404&&(o=[],i=null,d=200,c="OK")}catch{a.status===404&&f===""?(d=204,c="No Content"):i={message:f}}if(i&&r.isMaybeSingle&&(!(i==null||(p=i.details)===null||p===void 0)&&p.includes("0 rows"))&&(i=null,d=200,c="OK"),i&&r.shouldThrowOnError)throw new Pl(i)}return{error:i,data:o,count:l,status:d,statusText:c}});return this.shouldThrowOnError||(s=s.catch(a=>{var i;let o="",l="",d="";const c=a==null?void 0:a.cause;if(c){var u,h,m,p;const y=(u=c==null?void 0:c.message)!==null&&u!==void 0?u:"",g=(h=c==null?void 0:c.code)!==null&&h!==void 0?h:"";o=`${(m=a==null?void 0:a.name)!==null&&m!==void 0?m:"FetchError"}: ${a==null?void 0:a.message}`,o+=`

Caused by: ${(p=c==null?void 0:c.name)!==null&&p!==void 0?p:"Error"}: ${y}`,g&&(o+=` (${g})`),c!=null&&c.stack&&(o+=`
${c.stack}`)}else{var f;o=(f=a==null?void 0:a.stack)!==null&&f!==void 0?f:""}const _=this.url.toString().length;return(a==null?void 0:a.name)==="AbortError"||(a==null?void 0:a.code)==="ABORT_ERR"?(d="",l="Request was aborted (timeout or manual cancellation)",_>this.urlLengthLimit&&(l+=`. Note: Your request URL is ${_} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((c==null?void 0:c.name)==="HeadersOverflowError"||(c==null?void 0:c.code)==="UND_ERR_HEADERS_OVERFLOW")&&(d="",l="HTTP headers exceeded server limits (typically 16KB)",_>this.urlLengthLimit&&(l+=`. Your request URL is ${_} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{error:{message:`${(i=a==null?void 0:a.name)!==null&&i!==void 0?i:"FetchError"}: ${a==null?void 0:a.message}`,details:o,hint:l,code:d},data:null,count:null,status:0,statusText:""}})),s.then(e,t)}returns(){return this}overrideTypes(){return this}},Ml=class extends Ol{select(e){let t=!1;const r=(e??"*").split("").map(n=>/\s/.test(n)&&!t?"":(n==='"'&&(t=!t),n)).join("");return this.url.searchParams.set("select",r),this.headers.append("Prefer","return=representation"),this}order(e,{ascending:t=!0,nullsFirst:r,foreignTable:n,referencedTable:s=n}={}){const a=s?`${s}.order`:"order",i=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${i?`${i},`:""}${e}.${t?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:r=t}={}){const n=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(n,`${e}`),this}range(e,t,{foreignTable:r,referencedTable:n=r}={}){const s=typeof n>"u"?"offset":`${n}.offset`,a=typeof n>"u"?"limit":`${n}.limit`;return this.url.searchParams.set(s,`${e}`),this.url.searchParams.set(a,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:e=!1,verbose:t=!1,settings:r=!1,buffers:n=!1,wal:s=!1,format:a="text"}={}){var i;const o=[e?"analyze":null,t?"verbose":null,r?"settings":null,n?"buffers":null,s?"wal":null].filter(Boolean).join("|"),l=(i=this.headers.get("Accept"))!==null&&i!==void 0?i:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${a}; for="${l}"; options=${o};`),a==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(e){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${e}`),this}};const za=new RegExp("[,()]");var Jt=class extends Ml{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){const r=Array.from(new Set(t)).map(n=>typeof n=="string"&&za.test(n)?`"${n}"`:`${n}`).join(",");return this.url.searchParams.append(e,`in.(${r})`),this}notIn(e,t){const r=Array.from(new Set(t)).map(n=>typeof n=="string"&&za.test(n)?`"${n}"`:`${n}`).join(",");return this.url.searchParams.append(e,`not.in.(${r})`),this}contains(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t=="string"?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:r,type:n}={}){let s="";n==="plain"?s="pl":n==="phrase"?s="ph":n==="websearch"&&(s="w");const a=r===void 0?"":`(${r})`;return this.url.searchParams.append(e,`${s}fts${a}.${t}`),this}match(e){return Object.entries(e).forEach(([t,r])=>{this.url.searchParams.append(t,`eq.${r}`)}),this}not(e,t,r){return this.url.searchParams.append(e,`not.${t}.${r}`),this}or(e,{foreignTable:t,referencedTable:r=t}={}){const n=r?`${r}.or`:"or";return this.url.searchParams.append(n,`(${e})`),this}filter(e,t,r){return this.url.searchParams.append(e,`${t}.${r}`),this}},jl=class{constructor(e,{headers:t={},schema:r,fetch:n,urlLengthLimit:s=8e3}){this.url=e,this.headers=new Headers(t),this.schema=r,this.fetch=n,this.urlLengthLimit=s}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){const{head:r=!1,count:n}=t??{},s=r?"HEAD":"GET";let a=!1;const i=(e??"*").split("").map(d=>/\s/.test(d)&&!a?"":(d==='"'&&(a=!a),d)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",i),n&&l.append("Prefer",`count=${n}`),new Jt({method:s,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}insert(e,{count:t,defaultToNull:r=!0}={}){var n;const s="POST",{url:a,headers:i}=this.cloneRequestState();if(t&&i.append("Prefer",`count=${t}`),r||i.append("Prefer","missing=default"),Array.isArray(e)){const o=e.reduce((l,d)=>l.concat(Object.keys(d)),[]);if(o.length>0){const l=[...new Set(o)].map(d=>`"${d}"`);a.searchParams.set("columns",l.join(","))}}return new Jt({method:s,url:a,headers:i,schema:this.schema,body:e,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit})}upsert(e,{onConflict:t,ignoreDuplicates:r=!1,count:n,defaultToNull:s=!0}={}){var a;const i="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${r?"ignore":"merge"}-duplicates`),t!==void 0&&o.searchParams.set("on_conflict",t),n&&l.append("Prefer",`count=${n}`),s||l.append("Prefer","missing=default"),Array.isArray(e)){const d=e.reduce((c,u)=>c.concat(Object.keys(u)),[]);if(d.length>0){const c=[...new Set(d)].map(u=>`"${u}"`);o.searchParams.set("columns",c.join(","))}}return new Jt({method:i,url:o,headers:l,schema:this.schema,body:e,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit})}update(e,{count:t}={}){var r;const n="PATCH",{url:s,headers:a}=this.cloneRequestState();return t&&a.append("Prefer",`count=${t}`),new Jt({method:n,url:s,headers:a,schema:this.schema,body:e,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit})}delete({count:e}={}){var t;const r="DELETE",{url:n,headers:s}=this.cloneRequestState();return e&&s.append("Prefer",`count=${e}`),new Jt({method:r,url:n,headers:s,schema:this.schema,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit})}};function Fr(e){"@babel/helpers - typeof";return Fr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Fr(e)}function Nl(e,t){if(Fr(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(Fr(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Hl(e){var t=Nl(e,"string");return Fr(t)=="symbol"?t:t+""}function Ul(e,t,r){return(t=Hl(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Wa(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,n)}return r}function mn(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Wa(Object(r),!0).forEach(function(n){Ul(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Wa(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}var Fl=class _o{constructor(t,{headers:r={},schema:n,fetch:s,timeout:a,urlLengthLimit:i=8e3}={}){this.url=t,this.headers=new Headers(r),this.schemaName=n,this.urlLengthLimit=i;const o=s??globalThis.fetch;a!==void 0&&a>0?this.fetch=(l,d)=>{const c=new AbortController,u=setTimeout(()=>c.abort(),a),h=d==null?void 0:d.signal;if(h){if(h.aborted)return clearTimeout(u),o(l,d);const m=()=>{clearTimeout(u),c.abort()};return h.addEventListener("abort",m,{once:!0}),o(l,mn(mn({},d),{},{signal:c.signal})).finally(()=>{clearTimeout(u),h.removeEventListener("abort",m)})}return o(l,mn(mn({},d),{},{signal:c.signal})).finally(()=>clearTimeout(u))}:this.fetch=o}from(t){if(!t||typeof t!="string"||t.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new jl(new URL(`${this.url}/${t}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}schema(t){return new _o(this.url,{headers:this.headers,schema:t,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}rpc(t,r={},{head:n=!1,get:s=!1,count:a}={}){var i;let o;const l=new URL(`${this.url}/rpc/${t}`);let d;const c=m=>m!==null&&typeof m=="object"&&(!Array.isArray(m)||m.some(c)),u=n&&Object.values(r).some(c);u?(o="POST",d=r):n||s?(o=n?"HEAD":"GET",Object.entries(r).filter(([m,p])=>p!==void 0).map(([m,p])=>[m,Array.isArray(p)?`{${p.join(",")}}`:`${p}`]).forEach(([m,p])=>{l.searchParams.append(m,p)})):(o="POST",d=r);const h=new Headers(this.headers);return u?h.set("Prefer",a?`count=${a},return=minimal`:"return=minimal"):a&&h.set("Prefer",`count=${a}`),new Jt({method:o,url:l,headers:h,schema:this.schemaName,body:d,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit})}};class Bl{constructor(){}static detectEnvironment(){var t;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((t=navigator.userAgent)===null||t===void 0)&&t.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const r=globalThis.process;if(r){const n=r.versions;if(n&&n.node){const s=n.node,a=parseInt(s.replace(/^v/,"").split(".")[0]);return a>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${a} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${a} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const t=this.detectEnvironment();if(t.constructor)return t.constructor;let r=t.error||"WebSocket not supported in this environment.";throw t.workaround&&(r+=`

Suggested solution: ${t.workaround}`),new Error(r)}static createWebSocket(t,r){const n=this.getWebSocketConstructor();return new n(t,r)}static isWebSocketSupported(){try{const t=this.detectEnvironment();return t.type==="native"||t.type==="ws"}catch{return!1}}}const Kl="2.95.3",zl=`realtime-js/${Kl}`,Wl="1.0.0",wo="2.0.0",Va=wo,Cs=1e4,Vl=1e3,Gl=100;var it;(function(e){e[e.connecting=0]="connecting",e[e.open=1]="open",e[e.closing=2]="closing",e[e.closed=3]="closed"})(it||(it={}));var ye;(function(e){e.closed="closed",e.errored="errored",e.joined="joined",e.joining="joining",e.leaving="leaving"})(ye||(ye={}));var ze;(function(e){e.close="phx_close",e.error="phx_error",e.join="phx_join",e.reply="phx_reply",e.leave="phx_leave",e.access_token="access_token"})(ze||(ze={}));var Rs;(function(e){e.websocket="websocket"})(Rs||(Rs={}));var Tt;(function(e){e.Connecting="connecting",e.Open="open",e.Closing="closing",e.Closed="closed"})(Tt||(Tt={}));class Jl{constructor(t){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=t??[]}encode(t,r){if(t.event===this.BROADCAST_EVENT&&!(t.payload instanceof ArrayBuffer)&&typeof t.payload.event=="string")return r(this._binaryEncodeUserBroadcastPush(t));let n=[t.join_ref,t.ref,t.topic,t.event,t.payload];return r(JSON.stringify(n))}_binaryEncodeUserBroadcastPush(t){var r;return this._isArrayBuffer((r=t.payload)===null||r===void 0?void 0:r.payload)?this._encodeBinaryUserBroadcastPush(t):this._encodeJsonUserBroadcastPush(t)}_encodeBinaryUserBroadcastPush(t){var r,n;const s=(n=(r=t.payload)===null||r===void 0?void 0:r.payload)!==null&&n!==void 0?n:new ArrayBuffer(0);return this._encodeUserBroadcastPush(t,this.BINARY_ENCODING,s)}_encodeJsonUserBroadcastPush(t){var r,n;const s=(n=(r=t.payload)===null||r===void 0?void 0:r.payload)!==null&&n!==void 0?n:{},i=new TextEncoder().encode(JSON.stringify(s)).buffer;return this._encodeUserBroadcastPush(t,this.JSON_ENCODING,i)}_encodeUserBroadcastPush(t,r,n){var s,a;const i=t.topic,o=(s=t.ref)!==null&&s!==void 0?s:"",l=(a=t.join_ref)!==null&&a!==void 0?a:"",d=t.payload.event,c=this.allowedMetadataKeys?this._pick(t.payload,this.allowedMetadataKeys):{},u=Object.keys(c).length===0?"":JSON.stringify(c);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(i.length>255)throw new Error(`topic length ${i.length} exceeds maximum of 255`);if(d.length>255)throw new Error(`userEvent length ${d.length} exceeds maximum of 255`);if(u.length>255)throw new Error(`metadata length ${u.length} exceeds maximum of 255`);const h=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+o.length+i.length+d.length+u.length,m=new ArrayBuffer(this.HEADER_LENGTH+h);let p=new DataView(m),f=0;p.setUint8(f++,this.KINDS.userBroadcastPush),p.setUint8(f++,l.length),p.setUint8(f++,o.length),p.setUint8(f++,i.length),p.setUint8(f++,d.length),p.setUint8(f++,u.length),p.setUint8(f++,r),Array.from(l,y=>p.setUint8(f++,y.charCodeAt(0))),Array.from(o,y=>p.setUint8(f++,y.charCodeAt(0))),Array.from(i,y=>p.setUint8(f++,y.charCodeAt(0))),Array.from(d,y=>p.setUint8(f++,y.charCodeAt(0))),Array.from(u,y=>p.setUint8(f++,y.charCodeAt(0)));var _=new Uint8Array(m.byteLength+n.byteLength);return _.set(new Uint8Array(m),0),_.set(new Uint8Array(n),m.byteLength),_.buffer}decode(t,r){if(this._isArrayBuffer(t)){let n=this._binaryDecode(t);return r(n)}if(typeof t=="string"){const n=JSON.parse(t),[s,a,i,o,l]=n;return r({join_ref:s,ref:a,topic:i,event:o,payload:l})}return r({})}_binaryDecode(t){const r=new DataView(t),n=r.getUint8(0),s=new TextDecoder;switch(n){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(t,r,s)}}_decodeUserBroadcast(t,r,n){const s=r.getUint8(1),a=r.getUint8(2),i=r.getUint8(3),o=r.getUint8(4);let l=this.HEADER_LENGTH+4;const d=n.decode(t.slice(l,l+s));l=l+s;const c=n.decode(t.slice(l,l+a));l=l+a;const u=n.decode(t.slice(l,l+i));l=l+i;const h=t.slice(l,t.byteLength),m=o===this.JSON_ENCODING?JSON.parse(n.decode(h)):h,p={type:this.BROADCAST_EVENT,event:c,payload:m};return i>0&&(p.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:d,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(t){var r;return t instanceof ArrayBuffer||((r=t==null?void 0:t.constructor)===null||r===void 0?void 0:r.name)==="ArrayBuffer"}_pick(t,r){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).filter(([n])=>r.includes(n)))}}class So{constructor(t,r){this.callback=t,this.timerCalc=r,this.timer=void 0,this.tries=0,this.callback=t,this.timerCalc=r}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var le;(function(e){e.abstime="abstime",e.bool="bool",e.date="date",e.daterange="daterange",e.float4="float4",e.float8="float8",e.int2="int2",e.int4="int4",e.int4range="int4range",e.int8="int8",e.int8range="int8range",e.json="json",e.jsonb="jsonb",e.money="money",e.numeric="numeric",e.oid="oid",e.reltime="reltime",e.text="text",e.time="time",e.timestamp="timestamp",e.timestamptz="timestamptz",e.timetz="timetz",e.tsrange="tsrange",e.tstzrange="tstzrange"})(le||(le={}));const Ga=(e,t,r={})=>{var n;const s=(n=r.skipTypes)!==null&&n!==void 0?n:[];return t?Object.keys(t).reduce((a,i)=>(a[i]=Ql(i,e,t,s),a),{}):{}},Ql=(e,t,r,n)=>{const s=t.find(o=>o.name===e),a=s==null?void 0:s.type,i=r[e];return a&&!n.includes(a)?ko(a,i):Is(i)},ko=(e,t)=>{if(e.charAt(0)==="_"){const r=e.slice(1,e.length);return ed(t,r)}switch(e){case le.bool:return Yl(t);case le.float4:case le.float8:case le.int2:case le.int4:case le.int8:case le.numeric:case le.oid:return Xl(t);case le.json:case le.jsonb:return Zl(t);case le.timestamp:return td(t);case le.abstime:case le.date:case le.daterange:case le.int4range:case le.int8range:case le.money:case le.reltime:case le.text:case le.time:case le.timestamptz:case le.timetz:case le.tsrange:case le.tstzrange:return Is(t);default:return Is(t)}},Is=e=>e,Yl=e=>{switch(e){case"t":return!0;case"f":return!1;default:return e}},Xl=e=>{if(typeof e=="string"){const t=parseFloat(e);if(!Number.isNaN(t))return t}return e},Zl=e=>{if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e},ed=(e,t)=>{if(typeof e!="string")return e;const r=e.length-1,n=e[r];if(e[0]==="{"&&n==="}"){let a;const i=e.slice(1,r);try{a=JSON.parse("["+i+"]")}catch{a=i?i.split(","):[]}return a.map(o=>ko(t,o))}return e},td=e=>typeof e=="string"?e.replace(" ","T"):e,xo=e=>{const t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,"http"),t.pathname=t.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),t.pathname===""||t.pathname==="/"?t.pathname="/api/broadcast":t.pathname=t.pathname+"/api/broadcast",t.href};class cs{constructor(t,r,n={},s=Cs){this.channel=t,this.event=r,this.payload=n,this.timeout=s,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(t){this.timeout=t,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(t){this.payload=Object.assign(Object.assign({},this.payload),t)}receive(t,r){var n;return this._hasReceived(t)&&r((n=this.receivedResp)===null||n===void 0?void 0:n.response),this.recHooks.push({status:t,callback:r}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const t=r=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=r,this._matchReceive(r)};this.channel._on(this.refEvent,{},t),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(t,r){this.refEvent&&this.channel._trigger(this.refEvent,{status:t,response:r})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:t,response:r}){this.recHooks.filter(n=>n.status===t).forEach(n=>n.callback(r))}_hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}}var Ja;(function(e){e.SYNC="sync",e.JOIN="join",e.LEAVE="leave"})(Ja||(Ja={}));class jr{constructor(t,r){this.channel=t,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const n=(r==null?void 0:r.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(n.state,{},s=>{const{onJoin:a,onLeave:i,onSync:o}=this.caller;this.joinRef=this.channel._joinRef(),this.state=jr.syncState(this.state,s,a,i),this.pendingDiffs.forEach(l=>{this.state=jr.syncDiff(this.state,l,a,i)}),this.pendingDiffs=[],o()}),this.channel._on(n.diff,{},s=>{const{onJoin:a,onLeave:i,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=jr.syncDiff(this.state,s,a,i),o())}),this.onJoin((s,a,i)=>{this.channel._trigger("presence",{event:"join",key:s,currentPresences:a,newPresences:i})}),this.onLeave((s,a,i)=>{this.channel._trigger("presence",{event:"leave",key:s,currentPresences:a,leftPresences:i})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(t,r,n,s){const a=this.cloneDeep(t),i=this.transformState(r),o={},l={};return this.map(a,(d,c)=>{i[d]||(l[d]=c)}),this.map(i,(d,c)=>{const u=a[d];if(u){const h=c.map(_=>_.presence_ref),m=u.map(_=>_.presence_ref),p=c.filter(_=>m.indexOf(_.presence_ref)<0),f=u.filter(_=>h.indexOf(_.presence_ref)<0);p.length>0&&(o[d]=p),f.length>0&&(l[d]=f)}else o[d]=c}),this.syncDiff(a,{joins:o,leaves:l},n,s)}static syncDiff(t,r,n,s){const{joins:a,leaves:i}={joins:this.transformState(r.joins),leaves:this.transformState(r.leaves)};return n||(n=()=>{}),s||(s=()=>{}),this.map(a,(o,l)=>{var d;const c=(d=t[o])!==null&&d!==void 0?d:[];if(t[o]=this.cloneDeep(l),c.length>0){const u=t[o].map(m=>m.presence_ref),h=c.filter(m=>u.indexOf(m.presence_ref)<0);t[o].unshift(...h)}n(o,c,l)}),this.map(i,(o,l)=>{let d=t[o];if(!d)return;const c=l.map(u=>u.presence_ref);d=d.filter(u=>c.indexOf(u.presence_ref)<0),t[o]=d,s(o,d,l),d.length===0&&delete t[o]}),t}static map(t,r){return Object.getOwnPropertyNames(t).map(n=>r(n,t[n]))}static transformState(t){return t=this.cloneDeep(t),Object.getOwnPropertyNames(t).reduce((r,n)=>{const s=t[n];return"metas"in s?r[n]=s.metas.map(a=>(a.presence_ref=a.phx_ref,delete a.phx_ref,delete a.phx_ref_prev,a)):r[n]=s,r},{})}static cloneDeep(t){return JSON.parse(JSON.stringify(t))}onJoin(t){this.caller.onJoin=t}onLeave(t){this.caller.onLeave=t}onSync(t){this.caller.onSync=t}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var Qa;(function(e){e.ALL="*",e.INSERT="INSERT",e.UPDATE="UPDATE",e.DELETE="DELETE"})(Qa||(Qa={}));var Nr;(function(e){e.BROADCAST="broadcast",e.PRESENCE="presence",e.POSTGRES_CHANGES="postgres_changes",e.SYSTEM="system"})(Nr||(Nr={}));var Xe;(function(e){e.SUBSCRIBED="SUBSCRIBED",e.TIMED_OUT="TIMED_OUT",e.CLOSED="CLOSED",e.CHANNEL_ERROR="CHANNEL_ERROR"})(Xe||(Xe={}));class er{constructor(t,r={config:{}},n){var s,a;if(this.topic=t,this.params=r,this.socket=n,this.bindings={},this.state=ye.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=t.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config),this.timeout=this.socket.timeout,this.joinPush=new cs(this,ze.join,this.params,this.timeout),this.rejoinTimer=new So(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=ye.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=ye.closed,this.socket._remove(this)}),this._onError(i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=ye.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=ye.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=ye.errored,this.rejoinTimer.scheduleTimeout())}),this._on(ze.reply,{},(i,o)=>{this._trigger(this._replyEventName(o),i)}),this.presence=new jr(this),this.broadcastEndpointURL=xo(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((a=(s=this.params.config)===null||s===void 0?void 0:s.broadcast)===null||a===void 0)&&a.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(t,r=this.timeout){var n,s,a;if(this.socket.isConnected()||this.socket.connect(),this.state==ye.closed){const{config:{broadcast:i,presence:o,private:l}}=this.params,d=(s=(n=this.bindings.postgres_changes)===null||n===void 0?void 0:n.map(m=>m.filter))!==null&&s!==void 0?s:[],c=!!this.bindings[Nr.PRESENCE]&&this.bindings[Nr.PRESENCE].length>0||((a=this.params.config.presence)===null||a===void 0?void 0:a.enabled)===!0,u={},h={broadcast:i,presence:Object.assign(Object.assign({},o),{enabled:c}),postgres_changes:d,private:l};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(m=>t==null?void 0:t(Xe.CHANNEL_ERROR,m)),this._onClose(()=>t==null?void 0:t(Xe.CLOSED)),this.updateJoinPayload(Object.assign({config:h},u)),this.joinedOnce=!0,this._rejoin(r),this.joinPush.receive("ok",async({postgres_changes:m})=>{var p;if(this.socket._isManualToken()||this.socket.setAuth(),m===void 0){t==null||t(Xe.SUBSCRIBED);return}else{const f=this.bindings.postgres_changes,_=(p=f==null?void 0:f.length)!==null&&p!==void 0?p:0,y=[];for(let g=0;g<_;g++){const b=f[g],{filter:{event:w,schema:k,table:L,filter:x}}=b,E=m&&m[g];if(E&&E.event===w&&er.isFilterValueEqual(E.schema,k)&&er.isFilterValueEqual(E.table,L)&&er.isFilterValueEqual(E.filter,x))y.push(Object.assign(Object.assign({},b),{id:E.id}));else{this.unsubscribe(),this.state=ye.errored,t==null||t(Xe.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=y,t&&t(Xe.SUBSCRIBED);return}}).receive("error",m=>{this.state=ye.errored,t==null||t(Xe.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(m).join(", ")||"error")))}).receive("timeout",()=>{t==null||t(Xe.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(t,r={}){return await this.send({type:"presence",event:"track",payload:t},r.timeout||this.timeout)}async untrack(t={}){return await this.send({type:"presence",event:"untrack"},t)}on(t,r,n){return this.state===ye.joined&&t===Nr.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(async()=>await this.subscribe())),this._on(t,r,n)}async httpSend(t,r,n={}){var s;if(r==null)return Promise.reject("Payload is required for httpSend()");const a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const i={method:"POST",headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:t,payload:r,private:this.private}]})},o=await this._fetchWithTimeout(this.broadcastEndpointURL,i,(s=n.timeout)!==null&&s!==void 0?s:this.timeout);if(o.status===202)return{success:!0};let l=o.statusText;try{const d=await o.json();l=d.error||d.message||l}catch{}return Promise.reject(new Error(l))}async send(t,r={}){var n,s;if(!this._canPush()&&t.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:a,payload:i}=t,o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:a,payload:i,private:this.private}]})};try{const d=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(n=r.timeout)!==null&&n!==void 0?n:this.timeout);return await((s=d.body)===null||s===void 0?void 0:s.cancel()),d.ok?"ok":"error"}catch(d){return d.name==="AbortError"?"timed out":"error"}}else return new Promise(a=>{var i,o,l;const d=this._push(t.type,t,r.timeout||this.timeout);t.type==="broadcast"&&!(!((l=(o=(i=this.params)===null||i===void 0?void 0:i.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&a("ok"),d.receive("ok",()=>a("ok")),d.receive("error",()=>a("error")),d.receive("timeout",()=>a("timed out"))})}updateJoinPayload(t){this.joinPush.updatePayload(t)}unsubscribe(t=this.timeout){this.state=ye.leaving;const r=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(ze.close,"leave",this._joinRef())};this.joinPush.destroy();let n=null;return new Promise(s=>{n=new cs(this,ze.leave,{},t),n.receive("ok",()=>{r(),s("ok")}).receive("timeout",()=>{r(),s("timed out")}).receive("error",()=>{s("error")}),n.send(),this._canPush()||n.trigger("ok",{})}).finally(()=>{n==null||n.destroy()})}teardown(){this.pushBuffer.forEach(t=>t.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=ye.closed,this.bindings={}}async _fetchWithTimeout(t,r,n){const s=new AbortController,a=setTimeout(()=>s.abort(),n),i=await this.socket.fetch(t,Object.assign(Object.assign({},r),{signal:s.signal}));return clearTimeout(a),i}_push(t,r,n=this.timeout){if(!this.joinedOnce)throw`tried to push '${t}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let s=new cs(this,t,r,n);return this._canPush()?s.send():this._addToPushBuffer(s),s}_addToPushBuffer(t){if(t.startTimeout(),this.pushBuffer.push(t),this.pushBuffer.length>Gl){const r=this.pushBuffer.shift();r&&(r.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${r.event}`,r.payload))}}_onMessage(t,r,n){return r}_isMember(t){return this.topic===t}_joinRef(){return this.joinPush.ref}_trigger(t,r,n){var s,a;const i=t.toLocaleLowerCase(),{close:o,error:l,leave:d,join:c}=ze;if(n&&[o,l,d,c].indexOf(i)>=0&&n!==this._joinRef())return;let h=this._onMessage(i,r,n);if(r&&!h)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(i)?(s=this.bindings.postgres_changes)===null||s===void 0||s.filter(m=>{var p,f,_;return((p=m.filter)===null||p===void 0?void 0:p.event)==="*"||((_=(f=m.filter)===null||f===void 0?void 0:f.event)===null||_===void 0?void 0:_.toLocaleLowerCase())===i}).map(m=>m.callback(h,n)):(a=this.bindings[i])===null||a===void 0||a.filter(m=>{var p,f,_,y,g,b;if(["broadcast","presence","postgres_changes"].includes(i))if("id"in m){const w=m.id,k=(p=m.filter)===null||p===void 0?void 0:p.event;return w&&((f=r.ids)===null||f===void 0?void 0:f.includes(w))&&(k==="*"||(k==null?void 0:k.toLocaleLowerCase())===((_=r.data)===null||_===void 0?void 0:_.type.toLocaleLowerCase()))}else{const w=(g=(y=m==null?void 0:m.filter)===null||y===void 0?void 0:y.event)===null||g===void 0?void 0:g.toLocaleLowerCase();return w==="*"||w===((b=r==null?void 0:r.event)===null||b===void 0?void 0:b.toLocaleLowerCase())}else return m.type.toLocaleLowerCase()===i}).map(m=>{if(typeof h=="object"&&"ids"in h){const p=h.data,{schema:f,table:_,commit_timestamp:y,type:g,errors:b}=p;h=Object.assign(Object.assign({},{schema:f,table:_,commit_timestamp:y,eventType:g,new:{},old:{},errors:b}),this._getPayloadRecords(p))}m.callback(h,n)})}_isClosed(){return this.state===ye.closed}_isJoined(){return this.state===ye.joined}_isJoining(){return this.state===ye.joining}_isLeaving(){return this.state===ye.leaving}_replyEventName(t){return`chan_reply_${t}`}_on(t,r,n){const s=t.toLocaleLowerCase(),a={type:s,filter:r,callback:n};return this.bindings[s]?this.bindings[s].push(a):this.bindings[s]=[a],this}_off(t,r){const n=t.toLocaleLowerCase();return this.bindings[n]&&(this.bindings[n]=this.bindings[n].filter(s=>{var a;return!(((a=s.type)===null||a===void 0?void 0:a.toLocaleLowerCase())===n&&er.isEqual(s.filter,r))})),this}static isEqual(t,r){if(Object.keys(t).length!==Object.keys(r).length)return!1;for(const n in t)if(t[n]!==r[n])return!1;return!0}static isFilterValueEqual(t,r){return(t??void 0)===(r??void 0)}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(t){this._on(ze.close,{},t)}_onError(t){this._on(ze.error,{},r=>t(r))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(t=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=ye.joining,this.joinPush.resend(t))}_getPayloadRecords(t){const r={new:{},old:{}};return(t.type==="INSERT"||t.type==="UPDATE")&&(r.new=Ga(t.columns,t.record)),(t.type==="UPDATE"||t.type==="DELETE")&&(r.old=Ga(t.columns,t.old_record)),r}}const us=()=>{},fn={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},rd=[1e3,2e3,5e3,1e4],nd=1e4,sd=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class ad{constructor(t,r){var n;if(this.accessTokenValue=null,this.apiKey=null,this._manuallySetToken=!1,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=Cs,this.transport=null,this.heartbeatIntervalMs=fn.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=us,this.ref=0,this.reconnectTimer=null,this.vsn=Va,this.logger=us,this.conn=null,this.sendBuffer=[],this.serializer=new Jl,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._heartbeatSentAt=null,this._resolveFetch=s=>s?(...a)=>s(...a):(...a)=>fetch(...a),!(!((n=r==null?void 0:r.params)===null||n===void 0)&&n.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=r.params.apikey,this.endPoint=`${t}/${Rs.websocket}`,this.httpEndpoint=xo(t),this._initializeOptions(r),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(r==null?void 0:r.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=Bl.createWebSocket(this.endpointURL())}catch(t){this._setConnectionState("disconnected");const r=t.message;throw r.includes("Node.js")?new Error(`${r}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${r}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:this.vsn}))}disconnect(t,r){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const n=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(n),this._setConnectionState("disconnected")},typeof this.conn.close=="function"&&(t?this.conn.close(t,r??""):this.conn.close()),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(t){const r=await t.unsubscribe();return r==="ok"&&this._remove(t),this.channels.length===0&&this.disconnect(),r}async removeAllChannels(){const t=await Promise.all(this.channels.map(r=>r.unsubscribe()));return this.channels=[],this.disconnect(),t}log(t,r,n){this.logger(t,r,n)}connectionState(){switch(this.conn&&this.conn.readyState){case it.connecting:return Tt.Connecting;case it.open:return Tt.Open;case it.closing:return Tt.Closing;default:return Tt.Closed}}isConnected(){return this.connectionState()===Tt.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(t,r={config:{}}){const n=`realtime:${t}`,s=this.getChannels().find(a=>a.topic===n);if(s)return s;{const a=new er(`realtime:${t}`,r,this);return this.channels.push(a),a}}push(t){const{topic:r,event:n,payload:s,ref:a}=t,i=()=>{this.encode(t,o=>{var l;(l=this.conn)===null||l===void 0||l.send(o)})};this.log("push",`${r} ${n} (${a})`,s),this.isConnected()?i():this.sendBuffer.push(i)}async setAuth(t=null){this._authPromise=this._performAuth(t);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){var t;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(r){this.log("error","error in heartbeat callback",r)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this._heartbeatSentAt=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(r){this.log("error","error in heartbeat callback",r)}this._wasManualDisconnect=!1,(t=this.conn)===null||t===void 0||t.close(Vl,"heartbeat timeout"),setTimeout(()=>{var r;this.isConnected()||(r=this.reconnectTimer)===null||r===void 0||r.scheduleTimeout()},fn.HEARTBEAT_TIMEOUT_FALLBACK);return}this._heartbeatSentAt=Date.now(),this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(r){this.log("error","error in heartbeat callback",r)}this._setAuthSafely("heartbeat")}onHeartbeat(t){this.heartbeatCallback=t}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}_makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}_leaveOpenTopic(t){let r=this.channels.find(n=>n.topic===t&&(n._isJoined()||n._isJoining()));r&&(this.log("transport",`leaving duplicate topic "${t}"`),r.unsubscribe())}_remove(t){this.channels=this.channels.filter(r=>r.topic!==t.topic)}_onConnMessage(t){this.decode(t.data,r=>{if(r.topic==="phoenix"&&r.event==="phx_reply"&&r.ref&&r.ref===this.pendingHeartbeatRef){const d=this._heartbeatSentAt?Date.now()-this._heartbeatSentAt:void 0;try{this.heartbeatCallback(r.payload.status==="ok"?"ok":"error",d)}catch(c){this.log("error","error in heartbeat callback",c)}this._heartbeatSentAt=null,this.pendingHeartbeatRef=null}const{topic:n,event:s,payload:a,ref:i}=r,o=i?`(${i})`:"",l=a.status||"";this.log("receive",`${l} ${n} ${s} ${o}`.trim(),a),this.channels.filter(d=>d._isMember(n)).forEach(d=>d._trigger(s,a,i)),this._triggerStateCallbacks("message",r)})}_clearTimer(t){var r;t==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):t==="reconnect"&&((r=this.reconnectTimer)===null||r===void 0||r.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=t=>this._onConnError(t),this.conn.onmessage=t=>this._onConnMessage(t),this.conn.onclose=t=>this._onConnClose(t),this.conn.readyState===it.open&&this._onConnOpen())}_teardownConnection(){if(this.conn){if(this.conn.readyState===it.open||this.conn.readyState===it.connecting)try{this.conn.close()}catch(t){this.log("error","Error closing connection",t)}this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null}this._clearAllTimers(),this._terminateWorker(),this.channels.forEach(t=>t.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).then(()=>{this.flushSendBuffer()}).catch(r=>{this.log("error","error waiting for auth on connect",r),this.flushSendBuffer()}),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const t=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(t),this.workerRef.onerror=r=>{this.log("worker","worker error",r.message),this._terminateWorker()},this.workerRef.onmessage=r=>{r.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_onConnClose(t){var r;this._setConnectionState("disconnected"),this.log("transport","close",t),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(r=this.reconnectTimer)===null||r===void 0||r.scheduleTimeout(),this._triggerStateCallbacks("close",t)}_onConnError(t){this._setConnectionState("disconnected"),this.log("transport",`${t}`),this._triggerChanError(),this._triggerStateCallbacks("error",t);try{this.heartbeatCallback("error")}catch(r){this.log("error","error in heartbeat callback",r)}}_triggerChanError(){this.channels.forEach(t=>t._trigger(ze.error))}_appendParams(t,r){if(Object.keys(r).length===0)return t;const n=t.match(/\?/)?"&":"?",s=new URLSearchParams(r);return`${t}${n}${s}`}_workerObjectUrl(t){let r;if(t)r=t;else{const n=new Blob([sd],{type:"application/javascript"});r=URL.createObjectURL(n)}return r}_setConnectionState(t,r=!1){this._connectionState=t,t==="connecting"?this._wasManualDisconnect=!1:t==="disconnecting"&&(this._wasManualDisconnect=r)}async _performAuth(t=null){let r,n=!1;if(t)r=t,n=!0;else if(this.accessToken)try{r=await this.accessToken()}catch(s){this.log("error","Error fetching access token from callback",s),r=this.accessTokenValue}else r=this.accessTokenValue;n?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=r&&(this.accessTokenValue=r,this.channels.forEach(s=>{const a={access_token:r,version:zl};r&&s.updateJoinPayload(a),s.joinedOnce&&s._isJoined()&&s._push(ze.access_token,{access_token:r})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(t="general"){this._isManualToken()||this.setAuth().catch(r=>{this.log("error",`Error setting auth in ${t}`,r)})}_triggerStateCallbacks(t,r){try{this.stateChangeCallbacks[t].forEach(n=>{try{n(r)}catch(s){this.log("error",`error in ${t} callback`,s)}})}catch(n){this.log("error",`error triggering ${t} callbacks`,n)}}_setupReconnectionTimer(){this.reconnectTimer=new So(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},fn.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(t){var r,n,s,a,i,o,l,d,c,u,h,m;switch(this.transport=(r=t==null?void 0:t.transport)!==null&&r!==void 0?r:null,this.timeout=(n=t==null?void 0:t.timeout)!==null&&n!==void 0?n:Cs,this.heartbeatIntervalMs=(s=t==null?void 0:t.heartbeatIntervalMs)!==null&&s!==void 0?s:fn.HEARTBEAT_INTERVAL,this.worker=(a=t==null?void 0:t.worker)!==null&&a!==void 0?a:!1,this.accessToken=(i=t==null?void 0:t.accessToken)!==null&&i!==void 0?i:null,this.heartbeatCallback=(o=t==null?void 0:t.heartbeatCallback)!==null&&o!==void 0?o:us,this.vsn=(l=t==null?void 0:t.vsn)!==null&&l!==void 0?l:Va,t!=null&&t.params&&(this.params=t.params),t!=null&&t.logger&&(this.logger=t.logger),(t!=null&&t.logLevel||t!=null&&t.log_level)&&(this.logLevel=t.logLevel||t.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(d=t==null?void 0:t.reconnectAfterMs)!==null&&d!==void 0?d:p=>rd[p-1]||nd,this.vsn){case Wl:this.encode=(c=t==null?void 0:t.encode)!==null&&c!==void 0?c:(p,f)=>f(JSON.stringify(p)),this.decode=(u=t==null?void 0:t.decode)!==null&&u!==void 0?u:(p,f)=>f(JSON.parse(p));break;case wo:this.encode=(h=t==null?void 0:t.encode)!==null&&h!==void 0?h:this.serializer.encode.bind(this.serializer),this.decode=(m=t==null?void 0:t.decode)!==null&&m!==void 0?m:this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${this.vsn}`)}if(this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=t==null?void 0:t.workerUrl}}}var Br=class extends Error{constructor(e,t){var r;super(e),this.name="IcebergError",this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown=t.icebergType==="CommitStateUnknownException"||[500,502,504].includes(t.status)&&((r=t.icebergType)==null?void 0:r.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function id(e,t,r){const n=new URL(t,e);if(r)for(const[s,a]of Object.entries(r))a!==void 0&&n.searchParams.set(s,a);return n.toString()}async function od(e){return!e||e.type==="none"?{}:e.type==="bearer"?{Authorization:`Bearer ${e.token}`}:e.type==="header"?{[e.name]:e.value}:e.type==="custom"?await e.getHeaders():{}}function ld(e){const t=e.fetchImpl??globalThis.fetch;return{async request({method:r,path:n,query:s,body:a,headers:i}){const o=id(e.baseUrl,n,s),l=await od(e.auth),d=await t(o,{method:r,headers:{...a?{"Content-Type":"application/json"}:{},...l,...i},body:a?JSON.stringify(a):void 0}),c=await d.text(),u=(d.headers.get("content-type")||"").includes("application/json"),h=u&&c?JSON.parse(c):c;if(!d.ok){const m=u?h:void 0,p=m==null?void 0:m.error;throw new Br((p==null?void 0:p.message)??`Request failed with status ${d.status}`,{status:d.status,icebergType:p==null?void 0:p.type,icebergCode:p==null?void 0:p.code,details:m})}return{status:d.status,headers:d.headers,data:h}}}}function yn(e){return e.join("")}var dd=class{constructor(e,t=""){this.client=e,this.prefix=t}async listNamespaces(e){const t=e?{parent:yn(e.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map(n=>({namespace:n}))}async createNamespace(e,t){const r={namespace:e.namespace,properties:t==null?void 0:t.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:r})).data}async dropNamespace(e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${yn(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${yn(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${yn(e.namespace)}`}),!0}catch(t){if(t instanceof Br&&t.status===404)return!1;throw t}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(r){if(r instanceof Br&&r.status===409)return;throw r}}};function Ft(e){return e.join("")}var cd=class{constructor(e,t="",r){this.client=e,this.prefix=t,this.accessDelegation=r}async listTables(e){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ft(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){const r={};return this.accessDelegation&&(r["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Ft(e.namespace)}/tables`,body:t,headers:r})).data.metadata}async updateTable(e,t){const r=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Ft(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":r.data["metadata-location"],metadata:r.data.metadata}}async dropTable(e,t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Ft(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String((t==null?void 0:t.purge)??!1)}})}async loadTable(e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ft(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){const t={};this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Ft(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(r){if(r instanceof Br&&r.status===404)return!1;throw r}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(r){if(r instanceof Br&&r.status===409)return await this.loadTable({namespace:e.namespace,name:t.name});throw r}}},ud=class{constructor(e){var n;let t="v1";e.catalogName&&(t+=`/${e.catalogName}`);const r=e.baseUrl.endsWith("/")?e.baseUrl:`${e.baseUrl}/`;this.client=ld({baseUrl:r,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=(n=e.accessDelegation)==null?void 0:n.join(","),this.namespaceOps=new dd(this.client,t),this.tableOps=new cd(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}},Xn=class extends Error{constructor(e,t="storage",r,n){super(e),this.__isStorageError=!0,this.namespace=t,this.name=t==="vectors"?"StorageVectorsError":"StorageError",this.status=r,this.statusCode=n}};function Zn(e){return typeof e=="object"&&e!==null&&"__isStorageError"in e}var bn=class extends Xn{constructor(e,t,r,n="storage"){super(e,n,t,r),this.name=n==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=t,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}},qo=class extends Xn{constructor(e,t,r="storage"){super(e,r),this.name=r==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=t}};const pd=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),hd=e=>{if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Ds=e=>{if(Array.isArray(e))return e.map(r=>Ds(r));if(typeof e=="function"||e!==Object(e))return e;const t={};return Object.entries(e).forEach(([r,n])=>{const s=r.replace(/([-_][a-z])/gi,a=>a.toUpperCase().replace(/[-_]/g,""));t[s]=Ds(n)}),t},md=e=>!e||typeof e!="string"||e.length===0||e.length>100||e.trim()!==e||e.includes("/")||e.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(e);function Kr(e){"@babel/helpers - typeof";return Kr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Kr(e)}function fd(e,t){if(Kr(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(Kr(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function yd(e){var t=fd(e,"string");return Kr(t)=="symbol"?t:t+""}function bd(e,t,r){return(t=yd(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Ya(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,n)}return r}function X(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Ya(Object(r),!0).forEach(function(n){bd(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ya(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}const Xa=e=>{var t;return e.msg||e.message||e.error_description||(typeof e.error=="string"?e.error:(t=e.error)===null||t===void 0?void 0:t.message)||JSON.stringify(e)},vd=async(e,t,r,n)=>{if(e&&typeof e=="object"&&"status"in e&&"ok"in e&&typeof e.status=="number"&&!(r!=null&&r.noResolveJson)){const s=e,a=s.status||500;if(typeof s.json=="function")s.json().then(i=>{const o=(i==null?void 0:i.statusCode)||(i==null?void 0:i.code)||a+"";t(new bn(Xa(i),a,o,n))}).catch(()=>{if(n==="vectors"){const i=a+"";t(new bn(s.statusText||`HTTP ${a} error`,a,i,n))}else{const i=a+"";t(new bn(s.statusText||`HTTP ${a} error`,a,i,n))}});else{const i=a+"";t(new bn(s.statusText||`HTTP ${a} error`,a,i,n))}}else t(new qo(Xa(e),e,n))},gd=(e,t,r,n)=>{const s={method:e,headers:(t==null?void 0:t.headers)||{}};return e==="GET"||e==="HEAD"||!n?X(X({},s),r):(hd(n)?(s.headers=X({"Content-Type":"application/json"},t==null?void 0:t.headers),s.body=JSON.stringify(n)):s.body=n,t!=null&&t.duplex&&(s.duplex=t.duplex),X(X({},s),r))};async function wr(e,t,r,n,s,a,i){return new Promise((o,l)=>{e(r,gd(t,n,s,a)).then(d=>{if(!d.ok)throw d;if(n!=null&&n.noResolveJson)return d;if(i==="vectors"){const c=d.headers.get("content-type");if(d.headers.get("content-length")==="0"||d.status===204)return{};if(!c||!c.includes("application/json"))return{}}return d.json()}).then(d=>o(d)).catch(d=>vd(d,l,n,i))})}function Lo(e="storage"){return{get:async(t,r,n,s)=>wr(t,"GET",r,n,s,void 0,e),post:async(t,r,n,s,a)=>wr(t,"POST",r,s,a,n,e),put:async(t,r,n,s,a)=>wr(t,"PUT",r,s,a,n,e),head:async(t,r,n,s)=>wr(t,"HEAD",r,X(X({},n),{},{noResolveJson:!0}),s,void 0,e),remove:async(t,r,n,s,a)=>wr(t,"DELETE",r,s,a,n,e)}}const _d=Lo("storage"),{get:zr,post:Ke,put:Ps,head:wd,remove:fa}=_d,Oe=Lo("vectors");var gr=class{constructor(e,t={},r,n="storage"){this.shouldThrowOnError=!1,this.url=e,this.headers=t,this.fetch=pd(r),this.namespace=n}throwOnError(){return this.shouldThrowOnError=!0,this}async handleOperation(e){var t=this;try{return{data:await e(),error:null}}catch(r){if(t.shouldThrowOnError)throw r;if(Zn(r))return{data:null,error:r};throw r}}},Sd=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}async execute(){var e=this;try{return{data:(await e.downloadFn()).body,error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Zn(t))return{data:null,error:t};throw t}}};let To;To=Symbol.toStringTag;var kd=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[To]="BlobDownloadBuilder",this.promise=null}asStream(){return new Sd(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var e=this;try{return{data:await(await e.downloadFn()).blob(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Zn(t))return{data:null,error:t};throw t}}};const xd={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Za={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var qd=class extends gr{constructor(e,t={},r,n){super(e,t,n,"storage"),this.bucketId=r}async uploadOrUpdate(e,t,r,n){var s=this;return s.handleOperation(async()=>{let a;const i=X(X({},Za),n);let o=X(X({},s.headers),e==="POST"&&{"x-upsert":String(i.upsert)});const l=i.metadata;typeof Blob<"u"&&r instanceof Blob?(a=new FormData,a.append("cacheControl",i.cacheControl),l&&a.append("metadata",s.encodeMetadata(l)),a.append("",r)):typeof FormData<"u"&&r instanceof FormData?(a=r,a.has("cacheControl")||a.append("cacheControl",i.cacheControl),l&&!a.has("metadata")&&a.append("metadata",s.encodeMetadata(l))):(a=r,o["cache-control"]=`max-age=${i.cacheControl}`,o["content-type"]=i.contentType,l&&(o["x-metadata"]=s.toBase64(s.encodeMetadata(l))),(typeof ReadableStream<"u"&&a instanceof ReadableStream||a&&typeof a=="object"&&"pipe"in a&&typeof a.pipe=="function")&&!i.duplex&&(i.duplex="half")),n!=null&&n.headers&&(o=X(X({},o),n.headers));const d=s._removeEmptyFolders(t),c=s._getFinalPath(d),u=await(e=="PUT"?Ps:Ke)(s.fetch,`${s.url}/object/${c}`,a,X({headers:o},i!=null&&i.duplex?{duplex:i.duplex}:{}));return{path:d,id:u.Id,fullPath:u.Key}})}async upload(e,t,r){return this.uploadOrUpdate("POST",e,t,r)}async uploadToSignedUrl(e,t,r,n){var s=this;const a=s._removeEmptyFolders(e),i=s._getFinalPath(a),o=new URL(s.url+`/object/upload/sign/${i}`);return o.searchParams.set("token",t),s.handleOperation(async()=>{let l;const d=X({upsert:Za.upsert},n),c=X(X({},s.headers),{"x-upsert":String(d.upsert)});return typeof Blob<"u"&&r instanceof Blob?(l=new FormData,l.append("cacheControl",d.cacheControl),l.append("",r)):typeof FormData<"u"&&r instanceof FormData?(l=r,l.append("cacheControl",d.cacheControl)):(l=r,c["cache-control"]=`max-age=${d.cacheControl}`,c["content-type"]=d.contentType),{path:a,fullPath:(await Ps(s.fetch,o.toString(),l,{headers:c})).Key}})}async createSignedUploadUrl(e,t){var r=this;return r.handleOperation(async()=>{let n=r._getFinalPath(e);const s=X({},r.headers);t!=null&&t.upsert&&(s["x-upsert"]="true");const a=await Ke(r.fetch,`${r.url}/object/upload/sign/${n}`,{},{headers:s}),i=new URL(r.url+a.url),o=i.searchParams.get("token");if(!o)throw new Xn("No token returned by API");return{signedUrl:i.toString(),path:e,token:o}})}async update(e,t,r){return this.uploadOrUpdate("PUT",e,t,r)}async move(e,t,r){var n=this;return n.handleOperation(async()=>await Ke(n.fetch,`${n.url}/object/move`,{bucketId:n.bucketId,sourceKey:e,destinationKey:t,destinationBucket:r==null?void 0:r.destinationBucket},{headers:n.headers}))}async copy(e,t,r){var n=this;return n.handleOperation(async()=>({path:(await Ke(n.fetch,`${n.url}/object/copy`,{bucketId:n.bucketId,sourceKey:e,destinationKey:t,destinationBucket:r==null?void 0:r.destinationBucket},{headers:n.headers})).Key}))}async createSignedUrl(e,t,r){var n=this;return n.handleOperation(async()=>{let s=n._getFinalPath(e),a=await Ke(n.fetch,`${n.url}/object/sign/${s}`,X({expiresIn:t},r!=null&&r.transform?{transform:r.transform}:{}),{headers:n.headers});const i=r!=null&&r.download?`&download=${r.download===!0?"":r.download}`:"";return{signedUrl:encodeURI(`${n.url}${a.signedURL}${i}`)}})}async createSignedUrls(e,t,r){var n=this;return n.handleOperation(async()=>{const s=await Ke(n.fetch,`${n.url}/object/sign/${n.bucketId}`,{expiresIn:t,paths:e},{headers:n.headers}),a=r!=null&&r.download?`&download=${r.download===!0?"":r.download}`:"";return s.map(i=>X(X({},i),{},{signedUrl:i.signedURL?encodeURI(`${n.url}${i.signedURL}${a}`):null}))})}download(e,t,r){const n=typeof(t==null?void 0:t.transform)<"u"?"render/image/authenticated":"object",s=this.transformOptsToQueryString((t==null?void 0:t.transform)||{}),a=s?`?${s}`:"",i=this._getFinalPath(e),o=()=>zr(this.fetch,`${this.url}/${n}/${i}${a}`,{headers:this.headers,noResolveJson:!0},r);return new kd(o,this.shouldThrowOnError)}async info(e){var t=this;const r=t._getFinalPath(e);return t.handleOperation(async()=>Ds(await zr(t.fetch,`${t.url}/object/info/${r}`,{headers:t.headers})))}async exists(e){var t=this;const r=t._getFinalPath(e);try{return await wd(t.fetch,`${t.url}/object/${r}`,{headers:t.headers}),{data:!0,error:null}}catch(n){if(t.shouldThrowOnError)throw n;if(Zn(n)&&n instanceof qo){const s=n.originalError;if([400,404].includes(s==null?void 0:s.status))return{data:!1,error:n}}throw n}}getPublicUrl(e,t){const r=this._getFinalPath(e),n=[],s=t!=null&&t.download?`download=${t.download===!0?"":t.download}`:"";s!==""&&n.push(s);const a=typeof(t==null?void 0:t.transform)<"u"?"render/image":"object",i=this.transformOptsToQueryString((t==null?void 0:t.transform)||{});i!==""&&n.push(i);let o=n.join("&");return o!==""&&(o=`?${o}`),{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${r}${o}`)}}}async remove(e){var t=this;return t.handleOperation(async()=>await fa(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers}))}async list(e,t,r){var n=this;return n.handleOperation(async()=>{const s=X(X(X({},xd),t),{},{prefix:e||""});return await Ke(n.fetch,`${n.url}/object/list/${n.bucketId}`,s,{headers:n.headers},r)})}async listV2(e,t){var r=this;return r.handleOperation(async()=>{const n=X({},e);return await Ke(r.fetch,`${r.url}/object/list-v2/${r.bucketId}`,n,{headers:r.headers},t)})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}};const Ld="2.95.3",ln={"X-Client-Info":`storage-js/${Ld}`};var Td=class extends gr{constructor(e,t={},r,n){const s=new URL(e);n!=null&&n.useNewHostname&&/supabase\.(co|in|red)$/.test(s.hostname)&&!s.hostname.includes("storage.supabase.")&&(s.hostname=s.hostname.replace("supabase.","storage.supabase."));const a=s.href.replace(/\/$/,""),i=X(X({},ln),t);super(a,i,r,"storage")}async listBuckets(e){var t=this;return t.handleOperation(async()=>{const r=t.listBucketOptionsToQueryString(e);return await zr(t.fetch,`${t.url}/bucket${r}`,{headers:t.headers})})}async getBucket(e){var t=this;return t.handleOperation(async()=>await zr(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers}))}async createBucket(e,t={public:!1}){var r=this;return r.handleOperation(async()=>await Ke(r.fetch,`${r.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:r.headers}))}async updateBucket(e,t){var r=this;return r.handleOperation(async()=>await Ps(r.fetch,`${r.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:r.headers}))}async emptyBucket(e){var t=this;return t.handleOperation(async()=>await Ke(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await fa(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}listBucketOptionsToQueryString(e){const t={};return e&&("limit"in e&&(t.limit=String(e.limit)),"offset"in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?"?"+new URLSearchParams(t).toString():""}},Ed=class extends gr{constructor(e,t={},r){const n=e.replace(/\/$/,""),s=X(X({},ln),t);super(n,s,r,"storage")}async createBucket(e){var t=this;return t.handleOperation(async()=>await Ke(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers}))}async listBuckets(e){var t=this;return t.handleOperation(async()=>{const r=new URLSearchParams;(e==null?void 0:e.limit)!==void 0&&r.set("limit",e.limit.toString()),(e==null?void 0:e.offset)!==void 0&&r.set("offset",e.offset.toString()),e!=null&&e.sortColumn&&r.set("sortColumn",e.sortColumn),e!=null&&e.sortOrder&&r.set("sortOrder",e.sortOrder),e!=null&&e.search&&r.set("search",e.search);const n=r.toString(),s=n?`${t.url}/bucket?${n}`:`${t.url}/bucket`;return await zr(t.fetch,s,{headers:t.headers})})}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await fa(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}from(e){var t=this;if(!md(e))throw new Xn("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const r=new ud({baseUrl:this.url,catalogName:e,auth:{type:"custom",getHeaders:async()=>t.headers},fetch:this.fetch}),n=this.shouldThrowOnError;return new Proxy(r,{get(s,a){const i=s[a];return typeof i!="function"?i:async(...o)=>{try{return{data:await i.apply(s,o),error:null}}catch(l){if(n)throw l;return{data:null,error:l}}}}})}},$d=class extends gr{constructor(e,t={},r){const n=e.replace(/\/$/,""),s=X(X({},ln),{},{"Content-Type":"application/json"},t);super(n,s,r,"vectors")}async createIndex(e){var t=this;return t.handleOperation(async()=>await Oe.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{})}async getIndex(e,t){var r=this;return r.handleOperation(async()=>await Oe.post(r.fetch,`${r.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:r.headers}))}async listIndexes(e){var t=this;return t.handleOperation(async()=>await Oe.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers}))}async deleteIndex(e,t){var r=this;return r.handleOperation(async()=>await Oe.post(r.fetch,`${r.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:r.headers})||{})}},Ad=class extends gr{constructor(e,t={},r){const n=e.replace(/\/$/,""),s=X(X({},ln),{},{"Content-Type":"application/json"},t);super(n,s,r,"vectors")}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return t.handleOperation(async()=>await Oe.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{})}async getVectors(e){var t=this;return t.handleOperation(async()=>await Oe.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers}))}async listVectors(e){var t=this;if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw new Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return t.handleOperation(async()=>await Oe.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers}))}async queryVectors(e){var t=this;return t.handleOperation(async()=>await Oe.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers}))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return t.handleOperation(async()=>await Oe.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{})}},Cd=class extends gr{constructor(e,t={},r){const n=e.replace(/\/$/,""),s=X(X({},ln),{},{"Content-Type":"application/json"},t);super(n,s,r,"vectors")}async createBucket(e){var t=this;return t.handleOperation(async()=>await Oe.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}async getBucket(e){var t=this;return t.handleOperation(async()=>await Oe.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers}))}async listBuckets(e={}){var t=this;return t.handleOperation(async()=>await Oe.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Oe.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}},Rd=class extends Cd{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new Id(this.url,this.headers,e,this.fetch)}async createBucket(e){var t=()=>super.createBucket,r=this;return t().call(r,e)}async getBucket(e){var t=()=>super.getBucket,r=this;return t().call(r,e)}async listBuckets(e={}){var t=()=>super.listBuckets,r=this;return t().call(r,e)}async deleteBucket(e){var t=()=>super.deleteBucket,r=this;return t().call(r,e)}},Id=class extends $d{constructor(e,t,r,n){super(e,t,n),this.vectorBucketName=r}async createIndex(e){var t=()=>super.createIndex,r=this;return t().call(r,X(X({},e),{},{vectorBucketName:r.vectorBucketName}))}async listIndexes(e={}){var t=()=>super.listIndexes,r=this;return t().call(r,X(X({},e),{},{vectorBucketName:r.vectorBucketName}))}async getIndex(e){var t=()=>super.getIndex,r=this;return t().call(r,r.vectorBucketName,e)}async deleteIndex(e){var t=()=>super.deleteIndex,r=this;return t().call(r,r.vectorBucketName,e)}index(e){return new Dd(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},Dd=class extends Ad{constructor(e,t,r,n,s){super(e,t,s),this.vectorBucketName=r,this.indexName=n}async putVectors(e){var t=()=>super.putVectors,r=this;return t().call(r,X(X({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async getVectors(e){var t=()=>super.getVectors,r=this;return t().call(r,X(X({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async listVectors(e={}){var t=()=>super.listVectors,r=this;return t().call(r,X(X({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async queryVectors(e){var t=()=>super.queryVectors,r=this;return t().call(r,X(X({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async deleteVectors(e){var t=()=>super.deleteVectors,r=this;return t().call(r,X(X({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}},Pd=class extends Td{constructor(e,t={},r,n){super(e,t,r,n)}from(e){return new qd(this.url,this.headers,e,this.fetch)}get vectors(){return new Rd(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Ed(this.url+"/iceberg",this.headers,this.fetch)}};const Eo="2.95.3",Qt=30*1e3,Os=3,ps=Os*Qt,Od="http://localhost:9999",Md="supabase.auth.token",jd={"X-Client-Info":`gotrue-js/${Eo}`},Ms="X-Supabase-Api-Version",$o={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Nd=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Hd=10*60*1e3;class Wr extends Error{constructor(t,r,n){super(t),this.__isAuthError=!0,this.name="AuthError",this.status=r,this.code=n}}function V(e){return typeof e=="object"&&e!==null&&"__isAuthError"in e}class Ud extends Wr{constructor(t,r,n){super(t,r,n),this.name="AuthApiError",this.status=r,this.code=n}}function Fd(e){return V(e)&&e.name==="AuthApiError"}class Et extends Wr{constructor(t,r){super(t),this.name="AuthUnknownError",this.originalError=r}}class st extends Wr{constructor(t,r,n,s){super(t,n,s),this.name=r,this.status=n}}class Ie extends st{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function hs(e){return V(e)&&e.name==="AuthSessionMissingError"}class Bt extends st{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class vn extends st{constructor(t){super(t,"AuthInvalidCredentialsError",400,void 0)}}class gn extends st{constructor(t,r=null){super(t,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=r}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function Bd(e){return V(e)&&e.name==="AuthImplicitGrantRedirectError"}class ei extends st{constructor(t,r=null){super(t,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=r}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class Kd extends st{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class js extends st{constructor(t,r){super(t,"AuthRetryableFetchError",r,void 0)}}function ms(e){return V(e)&&e.name==="AuthRetryableFetchError"}class ti extends st{constructor(t,r,n){super(t,"AuthWeakPasswordError",r,"weak_password"),this.reasons=n}}class Ns extends st{constructor(t){super(t,"AuthInvalidJwtError",400,"invalid_jwt")}}const Nn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),ri=` 	
\r=`.split(""),zd=(()=>{const e=new Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<ri.length;t+=1)e[ri[t].charCodeAt(0)]=-2;for(let t=0;t<Nn.length;t+=1)e[Nn[t].charCodeAt(0)]=t;return e})();function ni(e,t,r){if(e!==null)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;){const n=t.queue>>t.queuedBits-6&63;r(Nn[n]),t.queuedBits-=6}else if(t.queuedBits>0)for(t.queue=t.queue<<6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;){const n=t.queue>>t.queuedBits-6&63;r(Nn[n]),t.queuedBits-=6}}function Ao(e,t,r){const n=zd[e];if(n>-1)for(t.queue=t.queue<<6|n,t.queuedBits+=6;t.queuedBits>=8;)r(t.queue>>t.queuedBits-8&255),t.queuedBits-=8;else{if(n===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}}function si(e){const t=[],r=i=>{t.push(String.fromCodePoint(i))},n={utf8seq:0,codepoint:0},s={queue:0,queuedBits:0},a=i=>{Gd(i,n,r)};for(let i=0;i<e.length;i+=1)Ao(e.charCodeAt(i),s,a);return t.join("")}function Wd(e,t){if(e<=127){t(e);return}else if(e<=2047){t(192|e>>6),t(128|e&63);return}else if(e<=65535){t(224|e>>12),t(128|e>>6&63),t(128|e&63);return}else if(e<=1114111){t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),t(128|e&63);return}throw new Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}function Vd(e,t){for(let r=0;r<e.length;r+=1){let n=e.charCodeAt(r);if(n>55295&&n<=56319){const s=(n-55296)*1024&65535;n=(e.charCodeAt(r+1)-56320&65535|s)+65536,r+=1}Wd(n,t)}}function Gd(e,t,r){if(t.utf8seq===0){if(e<=127){r(e);return}for(let n=1;n<6;n+=1)if(!(e>>7-n&1)){t.utf8seq=n;break}if(t.utf8seq===2)t.codepoint=e&31;else if(t.utf8seq===3)t.codepoint=e&15;else if(t.utf8seq===4)t.codepoint=e&7;else throw new Error("Invalid UTF-8 sequence");t.utf8seq-=1}else if(t.utf8seq>0){if(e<=127)throw new Error("Invalid UTF-8 sequence");t.codepoint=t.codepoint<<6|e&63,t.utf8seq-=1,t.utf8seq===0&&r(t.codepoint)}}function cr(e){const t=[],r={queue:0,queuedBits:0},n=s=>{t.push(s)};for(let s=0;s<e.length;s+=1)Ao(e.charCodeAt(s),r,n);return new Uint8Array(t)}function Jd(e){const t=[];return Vd(e,r=>t.push(r)),new Uint8Array(t)}function Dt(e){const t=[],r={queue:0,queuedBits:0},n=s=>{t.push(s)};return e.forEach(s=>ni(s,r,n)),ni(null,r,n),t.join("")}function Qd(e){return Math.round(Date.now()/1e3)+e}function Yd(){return Symbol("auth-callback")}const xe=()=>typeof window<"u"&&typeof document<"u",wt={tested:!1,writable:!1},Co=()=>{if(!xe())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(wt.tested)return wt.writable;const e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),wt.tested=!0,wt.writable=!0}catch{wt.tested=!0,wt.writable=!1}return wt.writable};function Xd(e){const t={},r=new URL(e);if(r.hash&&r.hash[0]==="#")try{new URLSearchParams(r.hash.substring(1)).forEach((s,a)=>{t[a]=s})}catch{}return r.searchParams.forEach((n,s)=>{t[s]=n}),t}const Ro=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),Zd=e=>typeof e=="object"&&e!==null&&"status"in e&&"ok"in e&&"json"in e&&typeof e.json=="function",Yt=async(e,t,r)=>{await e.setItem(t,JSON.stringify(r))},St=async(e,t)=>{const r=await e.getItem(t);if(!r)return null;try{return JSON.parse(r)}catch{return r}},ke=async(e,t)=>{await e.removeItem(t)};class es{constructor(){this.promise=new es.promiseConstructor((t,r)=>{this.resolve=t,this.reject=r})}}es.promiseConstructor=Promise;function _n(e){const t=e.split(".");if(t.length!==3)throw new Ns("Invalid JWT structure");for(let n=0;n<t.length;n++)if(!Nd.test(t[n]))throw new Ns("JWT not in base64url format");return{header:JSON.parse(si(t[0])),payload:JSON.parse(si(t[1])),signature:cr(t[2]),raw:{header:t[0],payload:t[1]}}}async function ec(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}function tc(e,t){return new Promise((n,s)=>{(async()=>{for(let a=0;a<1/0;a++)try{const i=await e(a);if(!t(a,null,i)){n(i);return}}catch(i){if(!t(a,i)){s(i);return}}})()})}function rc(e){return("0"+e.toString(16)).substr(-2)}function nc(){const t=new Uint32Array(56);if(typeof crypto>"u"){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",n=r.length;let s="";for(let a=0;a<56;a++)s+=r.charAt(Math.floor(Math.random()*n));return s}return crypto.getRandomValues(t),Array.from(t,rc).join("")}async function sc(e){const r=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",r),s=new Uint8Array(n);return Array.from(s).map(a=>String.fromCharCode(a)).join("")}async function ac(e){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),e;const r=await sc(e);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function Kt(e,t,r=!1){const n=nc();let s=n;r&&(s+="/PASSWORD_RECOVERY"),await Yt(e,`${t}-code-verifier`,s);const a=await ac(n);return[a,n===a?"plain":"s256"]}const ic=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function oc(e){const t=e.headers.get(Ms);if(!t||!t.match(ic))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}function lc(e){if(!e)throw new Error("Missing exp claim");const t=Math.floor(Date.now()/1e3);if(e<=t)throw new Error("JWT has expired")}function dc(e){switch(e){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const cc=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function zt(e){if(!cc.test(e))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function fs(){const e={};return new Proxy(e,{get:(t,r)=>{if(r==="__isUserNotAvailableProxy")return!0;if(typeof r=="symbol"){const n=r.toString();if(n==="Symbol(Symbol.toPrimitive)"||n==="Symbol(Symbol.toStringTag)"||n==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)},set:(t,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(t,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function uc(e,t){return new Proxy(e,{get:(r,n,s)=>{if(n==="__isInsecureUserWarningProxy")return!0;if(typeof n=="symbol"){const a=n.toString();if(a==="Symbol(Symbol.toPrimitive)"||a==="Symbol(Symbol.toStringTag)"||a==="Symbol(util.inspect.custom)"||a==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(r,n,s)}return!t.value&&typeof n=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),t.value=!0),Reflect.get(r,n,s)}})}function ai(e){return JSON.parse(JSON.stringify(e))}const kt=e=>e.msg||e.message||e.error_description||e.error||JSON.stringify(e),pc=[502,503,504];async function ii(e){var t;if(!Zd(e))throw new js(kt(e),0);if(pc.includes(e.status))throw new js(kt(e),e.status);let r;try{r=await e.json()}catch(a){throw new Et(kt(a),a)}let n;const s=oc(e);if(s&&s.getTime()>=$o["2024-01-01"].timestamp&&typeof r=="object"&&r&&typeof r.code=="string"?n=r.code:typeof r=="object"&&r&&typeof r.error_code=="string"&&(n=r.error_code),n){if(n==="weak_password")throw new ti(kt(r),e.status,((t=r.weak_password)===null||t===void 0?void 0:t.reasons)||[]);if(n==="session_not_found")throw new Ie}else if(typeof r=="object"&&r&&typeof r.weak_password=="object"&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce((a,i)=>a&&typeof i=="string",!0))throw new ti(kt(r),e.status,r.weak_password.reasons);throw new Ud(kt(r),e.status||500,n)}const hc=(e,t,r,n)=>{const s={method:e,headers:(t==null?void 0:t.headers)||{}};return e==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},t==null?void 0:t.headers),s.body=JSON.stringify(n),Object.assign(Object.assign({},s),r))};async function Q(e,t,r,n){var s;const a=Object.assign({},n==null?void 0:n.headers);a[Ms]||(a[Ms]=$o["2024-01-01"].name),n!=null&&n.jwt&&(a.Authorization=`Bearer ${n.jwt}`);const i=(s=n==null?void 0:n.query)!==null&&s!==void 0?s:{};n!=null&&n.redirectTo&&(i.redirect_to=n.redirectTo);const o=Object.keys(i).length?"?"+new URLSearchParams(i).toString():"",l=await mc(e,t,r+o,{headers:a,noResolveJson:n==null?void 0:n.noResolveJson},{},n==null?void 0:n.body);return n!=null&&n.xform?n==null?void 0:n.xform(l):{data:Object.assign({},l),error:null}}async function mc(e,t,r,n,s,a){const i=hc(t,n,s,a);let o;try{o=await e(r,Object.assign({},i))}catch(l){throw console.error(l),new js(kt(l),0)}if(o.ok||await ii(o),n!=null&&n.noResolveJson)return o;try{return await o.json()}catch(l){await ii(l)}}function Be(e){var t;let r=null;bc(e)&&(r=Object.assign({},e),e.expires_at||(r.expires_at=Qd(e.expires_in)));const n=(t=e.user)!==null&&t!==void 0?t:e;return{data:{session:r,user:n},error:null}}function oi(e){const t=Be(e);return!t.error&&e.weak_password&&typeof e.weak_password=="object"&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&typeof e.weak_password.message=="string"&&e.weak_password.reasons.reduce((r,n)=>r&&typeof n=="string",!0)&&(t.data.weak_password=e.weak_password),t}function ht(e){var t;return{data:{user:(t=e.user)!==null&&t!==void 0?t:e},error:null}}function fc(e){return{data:e,error:null}}function yc(e){const{action_link:t,email_otp:r,hashed_token:n,redirect_to:s,verification_type:a}=e,i=Yn(e,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:t,email_otp:r,hashed_token:n,redirect_to:s,verification_type:a},l=Object.assign({},i);return{data:{properties:o,user:l},error:null}}function li(e){return e}function bc(e){return e.access_token&&e.refresh_token&&e.expires_in}const ys=["global","local","others"];class vc{constructor({url:t="",headers:r={},fetch:n}){this.url=t,this.headers=r,this.fetch=Ro(n),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)}}async signOut(t,r=ys[0]){if(ys.indexOf(r)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${ys.join(", ")}`);try{return await Q(this.fetch,"POST",`${this.url}/logout?scope=${r}`,{headers:this.headers,jwt:t,noResolveJson:!0}),{data:null,error:null}}catch(n){if(V(n))return{data:null,error:n};throw n}}async inviteUserByEmail(t,r={}){try{return await Q(this.fetch,"POST",`${this.url}/invite`,{body:{email:t,data:r.data},headers:this.headers,redirectTo:r.redirectTo,xform:ht})}catch(n){if(V(n))return{data:{user:null},error:n};throw n}}async generateLink(t){try{const{options:r}=t,n=Yn(t,["options"]),s=Object.assign(Object.assign({},n),r);return"newEmail"in n&&(s.new_email=n==null?void 0:n.newEmail,delete s.newEmail),await Q(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:yc,redirectTo:r==null?void 0:r.redirectTo})}catch(r){if(V(r))return{data:{properties:null,user:null},error:r};throw r}}async createUser(t){try{return await Q(this.fetch,"POST",`${this.url}/admin/users`,{body:t,headers:this.headers,xform:ht})}catch(r){if(V(r))return{data:{user:null},error:r};throw r}}async listUsers(t){var r,n,s,a,i,o,l;try{const d={nextPage:null,lastPage:0,total:0},c=await Q(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(r=t==null?void 0:t.page)===null||r===void 0?void 0:r.toString())!==null&&n!==void 0?n:"",per_page:(a=(s=t==null?void 0:t.perPage)===null||s===void 0?void 0:s.toString())!==null&&a!==void 0?a:""},xform:li});if(c.error)throw c.error;const u=await c.json(),h=(i=c.headers.get("x-total-count"))!==null&&i!==void 0?i:0,m=(l=(o=c.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return m.length>0&&(m.forEach(p=>{const f=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),_=JSON.parse(p.split(";")[1].split("=")[1]);d[`${_}Page`]=f}),d.total=parseInt(h)),{data:Object.assign(Object.assign({},u),d),error:null}}catch(d){if(V(d))return{data:{users:[]},error:d};throw d}}async getUserById(t){zt(t);try{return await Q(this.fetch,"GET",`${this.url}/admin/users/${t}`,{headers:this.headers,xform:ht})}catch(r){if(V(r))return{data:{user:null},error:r};throw r}}async updateUserById(t,r){zt(t);try{return await Q(this.fetch,"PUT",`${this.url}/admin/users/${t}`,{body:r,headers:this.headers,xform:ht})}catch(n){if(V(n))return{data:{user:null},error:n};throw n}}async deleteUser(t,r=!1){zt(t);try{return await Q(this.fetch,"DELETE",`${this.url}/admin/users/${t}`,{headers:this.headers,body:{should_soft_delete:r},xform:ht})}catch(n){if(V(n))return{data:{user:null},error:n};throw n}}async _listFactors(t){zt(t.userId);try{const{data:r,error:n}=await Q(this.fetch,"GET",`${this.url}/admin/users/${t.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:r,error:n}}catch(r){if(V(r))return{data:null,error:r};throw r}}async _deleteFactor(t){zt(t.userId),zt(t.id);try{return{data:await Q(this.fetch,"DELETE",`${this.url}/admin/users/${t.userId}/factors/${t.id}`,{headers:this.headers}),error:null}}catch(r){if(V(r))return{data:null,error:r};throw r}}async _listOAuthClients(t){var r,n,s,a,i,o,l;try{const d={nextPage:null,lastPage:0,total:0},c=await Q(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(r=t==null?void 0:t.page)===null||r===void 0?void 0:r.toString())!==null&&n!==void 0?n:"",per_page:(a=(s=t==null?void 0:t.perPage)===null||s===void 0?void 0:s.toString())!==null&&a!==void 0?a:""},xform:li});if(c.error)throw c.error;const u=await c.json(),h=(i=c.headers.get("x-total-count"))!==null&&i!==void 0?i:0,m=(l=(o=c.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return m.length>0&&(m.forEach(p=>{const f=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),_=JSON.parse(p.split(";")[1].split("=")[1]);d[`${_}Page`]=f}),d.total=parseInt(h)),{data:Object.assign(Object.assign({},u),d),error:null}}catch(d){if(V(d))return{data:{clients:[]},error:d};throw d}}async _createOAuthClient(t){try{return await Q(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:t,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(V(r))return{data:null,error:r};throw r}}async _getOAuthClient(t){try{return await Q(this.fetch,"GET",`${this.url}/admin/oauth/clients/${t}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(V(r))return{data:null,error:r};throw r}}async _updateOAuthClient(t,r){try{return await Q(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${t}`,{body:r,headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(V(n))return{data:null,error:n};throw n}}async _deleteOAuthClient(t){try{return await Q(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${t}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(V(r))return{data:null,error:r};throw r}}async _regenerateOAuthClientSecret(t){try{return await Q(this.fetch,"POST",`${this.url}/admin/oauth/clients/${t}/regenerate_secret`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(V(r))return{data:null,error:r};throw r}}}function di(e={}){return{getItem:t=>e[t]||null,setItem:(t,r)=>{e[t]=r},removeItem:t=>{delete e[t]}}}const Wt={debug:!!(globalThis&&Co()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Io extends Error{constructor(t){super(t),this.isAcquireTimeout=!0}}class gc extends Io{}async function _c(e,t,r){Wt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",e,t);const n=new globalThis.AbortController;return t>0&&setTimeout(()=>{n.abort(),Wt.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",e)},t),await Promise.resolve().then(()=>globalThis.navigator.locks.request(e,t===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:n.signal},async s=>{if(s){Wt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",e,s.name);try{return await r()}finally{Wt.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",e,s.name)}}else{if(t===0)throw Wt.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",e),new gc(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);if(Wt.debug)try{const a=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(a,null,"  "))}catch(a){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",a)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await r()}}))}function wc(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Do(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw new Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function Sc(e){return parseInt(e,16)}function kc(e){const t=new TextEncoder().encode(e);return"0x"+Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}function xc(e){var t;const{chainId:r,domain:n,expirationTime:s,issuedAt:a=new Date,nonce:i,notBefore:o,requestId:l,resources:d,scheme:c,uri:u,version:h}=e;{if(!Number.isInteger(r))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);if(!n)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(i&&i.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${i}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(h!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${h}`);if(!((t=e.statement)===null||t===void 0)&&t.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`)}const m=Do(e.address),p=c?`${c}://${n}`:n,f=e.statement?`${e.statement}
`:"",_=`${p} wants you to sign in with your Ethereum account:
${m}

${f}`;let y=`URI: ${u}
Version: ${h}
Chain ID: ${r}${i?`
Nonce: ${i}`:""}
Issued At: ${a.toISOString()}`;if(s&&(y+=`
Expiration Time: ${s.toISOString()}`),o&&(y+=`
Not Before: ${o.toISOString()}`),l&&(y+=`
Request ID: ${l}`),d){let g=`
Resources:`;for(const b of d){if(!b||typeof b!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${b}`);g+=`
- ${b}`}y+=g}return`${_}
${y}`}class fe extends Error{constructor({message:t,code:r,cause:n,name:s}){var a;super(t,{cause:n}),this.__isWebAuthnError=!0,this.name=(a=s??(n instanceof Error?n.name:void 0))!==null&&a!==void 0?a:"Unknown Error",this.code=r}}class Hn extends fe{constructor(t,r){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r,message:t}),this.name="WebAuthnUnknownError",this.originalError=r}}function qc({error:e,options:t}){var r,n,s;const{publicKey:a}=t;if(!a)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new fe({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else if(e.name==="ConstraintError"){if(((r=a.authenticatorSelection)===null||r===void 0?void 0:r.requireResidentKey)===!0)return new fe({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:e});if(t.mediation==="conditional"&&((n=a.authenticatorSelection)===null||n===void 0?void 0:n.userVerification)==="required")return new fe({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:e});if(((s=a.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new fe({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:e})}else{if(e.name==="InvalidStateError")return new fe({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:e});if(e.name==="NotAllowedError")return new fe({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="NotSupportedError")return a.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new fe({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:e}):new fe({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:e});if(e.name==="SecurityError"){const i=window.location.hostname;if(Po(i)){if(a.rp.id!==i)return new fe({message:`The RP ID "${a.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new fe({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="TypeError"){if(a.user.id.byteLength<1||a.user.id.byteLength>64)return new fe({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:e})}else if(e.name==="UnknownError")return new fe({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new fe({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}function Lc({error:e,options:t}){const{publicKey:r}=t;if(!r)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new fe({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else{if(e.name==="NotAllowedError")return new fe({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="SecurityError"){const n=window.location.hostname;if(Po(n)){if(r.rpId!==n)return new fe({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new fe({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="UnknownError")return new fe({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new fe({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}class Tc{createNewAbortSignal(){if(this.controller){const r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}const t=new AbortController;return this.controller=t,t.signal}cancelCeremony(){if(this.controller){const t=new Error("Manually cancelling existing WebAuthn API call");t.name="AbortError",this.controller.abort(t),this.controller=void 0}}}const Ec=new Tc;function $c(e){if(!e)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(e);const{challenge:t,user:r,excludeCredentials:n}=e,s=Yn(e,["challenge","user","excludeCredentials"]),a=cr(t).buffer,i=Object.assign(Object.assign({},r),{id:cr(r.id).buffer}),o=Object.assign(Object.assign({},s),{challenge:a,user:i});if(n&&n.length>0){o.excludeCredentials=new Array(n.length);for(let l=0;l<n.length;l++){const d=n[l];o.excludeCredentials[l]=Object.assign(Object.assign({},d),{id:cr(d.id).buffer,type:d.type||"public-key",transports:d.transports})}}return o}function Ac(e){if(!e)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(e);const{challenge:t,allowCredentials:r}=e,n=Yn(e,["challenge","allowCredentials"]),s=cr(t).buffer,a=Object.assign(Object.assign({},n),{challenge:s});if(r&&r.length>0){a.allowCredentials=new Array(r.length);for(let i=0;i<r.length;i++){const o=r[i];a.allowCredentials[i]=Object.assign(Object.assign({},o),{id:cr(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return a}function Cc(e){var t;if("toJSON"in e&&typeof e.toJSON=="function")return e.toJSON();const r=e;return{id:e.id,rawId:e.id,response:{attestationObject:Dt(new Uint8Array(e.response.attestationObject)),clientDataJSON:Dt(new Uint8Array(e.response.clientDataJSON))},type:"public-key",clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:(t=r.authenticatorAttachment)!==null&&t!==void 0?t:void 0}}function Rc(e){var t;if("toJSON"in e&&typeof e.toJSON=="function")return e.toJSON();const r=e,n=e.getClientExtensionResults(),s=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:Dt(new Uint8Array(s.authenticatorData)),clientDataJSON:Dt(new Uint8Array(s.clientDataJSON)),signature:Dt(new Uint8Array(s.signature)),userHandle:s.userHandle?Dt(new Uint8Array(s.userHandle)):void 0},type:"public-key",clientExtensionResults:n,authenticatorAttachment:(t=r.authenticatorAttachment)!==null&&t!==void 0?t:void 0}}function Po(e){return e==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function ci(){var e,t;return!!(xe()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.create)=="function"&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.get)=="function")}async function Ic(e){try{const t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Hn("Browser returned unexpected credential type",t)}:{data:null,error:new Hn("Empty credential response",t)}}catch(t){return{data:null,error:qc({error:t,options:e})}}}async function Dc(e){try{const t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Hn("Browser returned unexpected credential type",t)}:{data:null,error:new Hn("Empty credential response",t)}}catch(t){return{data:null,error:Lc({error:t,options:e})}}}const Pc={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Oc={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Un(...e){const t=s=>s!==null&&typeof s=="object"&&!Array.isArray(s),r=s=>s instanceof ArrayBuffer||ArrayBuffer.isView(s),n={};for(const s of e)if(s)for(const a in s){const i=s[a];if(i!==void 0)if(Array.isArray(i))n[a]=i;else if(r(i))n[a]=i;else if(t(i)){const o=n[a];t(o)?n[a]=Un(o,i):n[a]=Un(i)}else n[a]=i}return n}function Mc(e,t){return Un(Pc,e,t||{})}function jc(e,t){return Un(Oc,e,t||{})}class Nc{constructor(t){this.client=t,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(t){return this.client.mfa.enroll(Object.assign(Object.assign({},t),{factorType:"webauthn"}))}async _challenge({factorId:t,webauthn:r,friendlyName:n,signal:s},a){var i;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:t,webauthn:r});if(!o)return{data:null,error:l};const d=s??Ec.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:c}=o.webauthn.credential_options.publicKey;if(!c.name){const u=n;if(u)c.name=`${c.id}:${u}`;else{const m=(await this.client.getUser()).data.user,p=((i=m==null?void 0:m.user_metadata)===null||i===void 0?void 0:i.name)||(m==null?void 0:m.email)||(m==null?void 0:m.id)||"User";c.name=`${c.id}:${p}`}}c.displayName||(c.displayName=c.name)}switch(o.webauthn.type){case"create":{const c=Mc(o.webauthn.credential_options.publicKey,a==null?void 0:a.create),{data:u,error:h}=await Ic({publicKey:c,signal:d});return u?{data:{factorId:t,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:h}}case"request":{const c=jc(o.webauthn.credential_options.publicKey,a==null?void 0:a.request),{data:u,error:h}=await Dc(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:c,signal:d}));return u?{data:{factorId:t,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:h}}}}catch(o){return V(o)?{data:null,error:o}:{data:null,error:new Et("Unexpected error in challenge",o)}}}async _verify({challengeId:t,factorId:r,webauthn:n}){return this.client.mfa.verify({factorId:r,challengeId:t,webauthn:n})}async _authenticate({factorId:t,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:n=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},a){if(!r)return{data:null,error:new Wr("rpId is required for WebAuthn authentication")};try{if(!ci())return{data:null,error:new Et("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this.challenge({factorId:t,webauthn:{rpId:r,rpOrigins:n},signal:s},{request:a});if(!i)return{data:null,error:o};const{webauthn:l}=i;return this._verify({factorId:t,challengeId:i.challengeId,webauthn:{type:l.type,rpId:r,rpOrigins:n,credential_response:l.credential_response}})}catch(i){return V(i)?{data:null,error:i}:{data:null,error:new Et("Unexpected error in authenticate",i)}}}async _register({friendlyName:t,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:n=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},a){if(!r)return{data:null,error:new Wr("rpId is required for WebAuthn registration")};try{if(!ci())return{data:null,error:new Et("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this._enroll({friendlyName:t});if(!i)return await this.client.mfa.listFactors().then(c=>{var u;return(u=c.data)===null||u===void 0?void 0:u.all.find(h=>h.factor_type==="webauthn"&&h.friendly_name===t&&h.status!=="unverified")}).then(c=>c?this.client.mfa.unenroll({factorId:c==null?void 0:c.id}):void 0),{data:null,error:o};const{data:l,error:d}=await this._challenge({factorId:i.id,friendlyName:i.friendly_name,webauthn:{rpId:r,rpOrigins:n},signal:s},{create:a});return l?this._verify({factorId:i.id,challengeId:l.challengeId,webauthn:{rpId:r,rpOrigins:n,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:d}}catch(i){return V(i)?{data:null,error:i}:{data:null,error:new Et("Unexpected error in register",i)}}}}wc();const Hc={url:Od,storageKey:Md,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:jd,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:1e4};async function ui(e,t,r){return await r()}const Vt={};class Vr{get jwks(){var t,r;return(r=(t=Vt[this.storageKey])===null||t===void 0?void 0:t.jwks)!==null&&r!==void 0?r:{keys:[]}}set jwks(t){Vt[this.storageKey]=Object.assign(Object.assign({},Vt[this.storageKey]),{jwks:t})}get jwks_cached_at(){var t,r;return(r=(t=Vt[this.storageKey])===null||t===void 0?void 0:t.cachedAt)!==null&&r!==void 0?r:Number.MIN_SAFE_INTEGER}set jwks_cached_at(t){Vt[this.storageKey]=Object.assign(Object.assign({},Vt[this.storageKey]),{cachedAt:t})}constructor(t){var r,n,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const a=Object.assign(Object.assign({},Hc),t);if(this.storageKey=a.storageKey,this.instanceID=(r=Vr.nextInstanceID[this.storageKey])!==null&&r!==void 0?r:0,Vr.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!a.debug,typeof a.debug=="function"&&(this.logger=a.debug),this.instanceID>0&&xe()){const i=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(i),this.logDebugMessages&&console.trace(i)}if(this.persistSession=a.persistSession,this.autoRefreshToken=a.autoRefreshToken,this.admin=new vc({url:a.url,headers:a.headers,fetch:a.fetch}),this.url=a.url,this.headers=a.headers,this.fetch=Ro(a.fetch),this.lock=a.lock||ui,this.detectSessionInUrl=a.detectSessionInUrl,this.flowType=a.flowType,this.hasCustomAuthorizationHeader=a.hasCustomAuthorizationHeader,this.throwOnError=a.throwOnError,this.lockAcquireTimeout=a.lockAcquireTimeout,a.lock?this.lock=a.lock:this.persistSession&&xe()&&(!((n=globalThis==null?void 0:globalThis.navigator)===null||n===void 0)&&n.locks)?this.lock=_c:this.lock=ui,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Nc(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(a.storage?this.storage=a.storage:Co()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=di(this.memoryStorage)),a.userStorage&&(this.userStorage=a.userStorage)):(this.memoryStorage={},this.storage=di(this.memoryStorage)),xe()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(i){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",i)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async i=>{this._debug("received broadcast notification from other tab or client",i);try{await this._notifyAllSubscribers(i.data.event,i.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}this.initialize().catch(i=>{this._debug("#initialize()","error",i)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(t){if(this.throwOnError&&t&&t.error)throw t.error;return t}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Eo}) ${new Date().toISOString()}`}_debug(...t){return this.logDebugMessages&&this.logger(this._logPrefix(),...t),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var t;try{let r={},n="none";if(xe()&&(r=Xd(window.location.href),this._isImplicitGrantCallback(r)?n="implicit":await this._isPKCECallback(r)&&(n="pkce")),xe()&&this.detectSessionInUrl&&n!=="none"){const{data:s,error:a}=await this._getSessionFromURL(r,n);if(a){if(this._debug("#_initialize()","error detecting session from URL",a),Bd(a)){const l=(t=a.details)===null||t===void 0?void 0:t.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:a}}return{error:a}}const{session:i,redirectType:o}=s;return this._debug("#_initialize()","detected session in URL",i,"redirect type",o),await this._saveSession(i),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",i):await this._notifyAllSubscribers("SIGNED_IN",i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(r){return V(r)?this._returnResult({error:r}):this._returnResult({error:new Et("Unexpected error during initialization",r)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(t){var r,n,s;try{const a=await Q(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(n=(r=t==null?void 0:t.options)===null||r===void 0?void 0:r.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:(s=t==null?void 0:t.options)===null||s===void 0?void 0:s.captchaToken}},xform:Be}),{data:i,error:o}=a;if(o||!i)return this._returnResult({data:{user:null,session:null},error:o});const l=i.session,d=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:d,session:l},error:null})}catch(a){if(V(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signUp(t){var r,n,s;try{let a;if("email"in t){const{email:c,password:u,options:h}=t;let m=null,p=null;this.flowType==="pkce"&&([m,p]=await Kt(this.storage,this.storageKey)),a=await Q(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:h==null?void 0:h.emailRedirectTo,body:{email:c,password:u,data:(r=h==null?void 0:h.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken},code_challenge:m,code_challenge_method:p},xform:Be})}else if("phone"in t){const{phone:c,password:u,options:h}=t;a=await Q(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:c,password:u,data:(n=h==null?void 0:h.data)!==null&&n!==void 0?n:{},channel:(s=h==null?void 0:h.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken}},xform:Be})}else throw new vn("You must provide either an email or phone number and a password");const{data:i,error:o}=a;if(o||!i)return await ke(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const l=i.session,d=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:d,session:l},error:null})}catch(a){if(await ke(this.storage,`${this.storageKey}-code-verifier`),V(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signInWithPassword(t){try{let r;if("email"in t){const{email:a,password:i,options:o}=t;r=await Q(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:a,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:oi})}else if("phone"in t){const{phone:a,password:i,options:o}=t;r=await Q(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:a,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:oi})}else throw new vn("You must provide either an email or phone number and a password");const{data:n,error:s}=r;if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!n||!n.session||!n.user){const a=new Bt;return this._returnResult({data:{user:null,session:null},error:a})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),this._returnResult({data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:s})}catch(r){if(V(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOAuth(t){var r,n,s,a;return await this._handleProviderSignIn(t.provider,{redirectTo:(r=t.options)===null||r===void 0?void 0:r.redirectTo,scopes:(n=t.options)===null||n===void 0?void 0:n.scopes,queryParams:(s=t.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(a=t.options)===null||a===void 0?void 0:a.skipBrowserRedirect})}async exchangeCodeForSession(t){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(t))}async signInWithWeb3(t){const{chain:r}=t;switch(r){case"ethereum":return await this.signInWithEthereum(t);case"solana":return await this.signInWithSolana(t);default:throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)}}async signInWithEthereum(t){var r,n,s,a,i,o,l,d,c,u,h;let m,p;if("message"in t)m=t.message,p=t.signature;else{const{chain:f,wallet:_,statement:y,options:g}=t;let b;if(xe())if(typeof _=="object")b=_;else{const q=window;if("ethereum"in q&&typeof q.ethereum=="object"&&"request"in q.ethereum&&typeof q.ethereum.request=="function")b=q.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof _!="object"||!(g!=null&&g.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");b=_}const w=new URL((r=g==null?void 0:g.url)!==null&&r!==void 0?r:window.location.href),k=await b.request({method:"eth_requestAccounts"}).then(q=>q).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!k||k.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const L=Do(k[0]);let x=(n=g==null?void 0:g.signInWithEthereum)===null||n===void 0?void 0:n.chainId;if(!x){const q=await b.request({method:"eth_chainId"});x=Sc(q)}const E={domain:w.host,address:L,statement:y,uri:w.href,version:"1",chainId:x,nonce:(s=g==null?void 0:g.signInWithEthereum)===null||s===void 0?void 0:s.nonce,issuedAt:(i=(a=g==null?void 0:g.signInWithEthereum)===null||a===void 0?void 0:a.issuedAt)!==null&&i!==void 0?i:new Date,expirationTime:(o=g==null?void 0:g.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=g==null?void 0:g.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(d=g==null?void 0:g.signInWithEthereum)===null||d===void 0?void 0:d.requestId,resources:(c=g==null?void 0:g.signInWithEthereum)===null||c===void 0?void 0:c.resources};m=xc(E),p=await b.request({method:"personal_sign",params:[kc(m),L]})}try{const{data:f,error:_}=await Q(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:m,signature:p},!((u=t.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(h=t.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:Be});if(_)throw _;if(!f||!f.session||!f.user){const y=new Bt;return this._returnResult({data:{user:null,session:null},error:y})}return f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("SIGNED_IN",f.session)),this._returnResult({data:Object.assign({},f),error:_})}catch(f){if(V(f))return this._returnResult({data:{user:null,session:null},error:f});throw f}}async signInWithSolana(t){var r,n,s,a,i,o,l,d,c,u,h,m;let p,f;if("message"in t)p=t.message,f=t.signature;else{const{chain:_,wallet:y,statement:g,options:b}=t;let w;if(xe())if(typeof y=="object")w=y;else{const L=window;if("solana"in L&&typeof L.solana=="object"&&("signIn"in L.solana&&typeof L.solana.signIn=="function"||"signMessage"in L.solana&&typeof L.solana.signMessage=="function"))w=L.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!(b!=null&&b.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");w=y}const k=new URL((r=b==null?void 0:b.url)!==null&&r!==void 0?r:window.location.href);if("signIn"in w&&w.signIn){const L=await w.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},b==null?void 0:b.signInWithSolana),{version:"1",domain:k.host,uri:k.href}),g?{statement:g}:null));let x;if(Array.isArray(L)&&L[0]&&typeof L[0]=="object")x=L[0];else if(L&&typeof L=="object"&&"signedMessage"in L&&"signature"in L)x=L;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in x&&"signature"in x&&(typeof x.signedMessage=="string"||x.signedMessage instanceof Uint8Array)&&x.signature instanceof Uint8Array)p=typeof x.signedMessage=="string"?x.signedMessage:new TextDecoder().decode(x.signedMessage),f=x.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in w)||typeof w.signMessage!="function"||!("publicKey"in w)||typeof w!="object"||!w.publicKey||!("toBase58"in w.publicKey)||typeof w.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");p=[`${k.host} wants you to sign in with your Solana account:`,w.publicKey.toBase58(),...g?["",g,""]:[""],"Version: 1",`URI: ${k.href}`,`Issued At: ${(s=(n=b==null?void 0:b.signInWithSolana)===null||n===void 0?void 0:n.issuedAt)!==null&&s!==void 0?s:new Date().toISOString()}`,...!((a=b==null?void 0:b.signInWithSolana)===null||a===void 0)&&a.notBefore?[`Not Before: ${b.signInWithSolana.notBefore}`]:[],...!((i=b==null?void 0:b.signInWithSolana)===null||i===void 0)&&i.expirationTime?[`Expiration Time: ${b.signInWithSolana.expirationTime}`]:[],...!((o=b==null?void 0:b.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${b.signInWithSolana.chainId}`]:[],...!((l=b==null?void 0:b.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${b.signInWithSolana.nonce}`]:[],...!((d=b==null?void 0:b.signInWithSolana)===null||d===void 0)&&d.requestId?[`Request ID: ${b.signInWithSolana.requestId}`]:[],...!((u=(c=b==null?void 0:b.signInWithSolana)===null||c===void 0?void 0:c.resources)===null||u===void 0)&&u.length?["Resources",...b.signInWithSolana.resources.map(x=>`- ${x}`)]:[]].join(`
`);const L=await w.signMessage(new TextEncoder().encode(p),"utf8");if(!L||!(L instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");f=L}}try{const{data:_,error:y}=await Q(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:p,signature:Dt(f)},!((h=t.options)===null||h===void 0)&&h.captchaToken?{gotrue_meta_security:{captcha_token:(m=t.options)===null||m===void 0?void 0:m.captchaToken}}:null),xform:Be});if(y)throw y;if(!_||!_.session||!_.user){const g=new Bt;return this._returnResult({data:{user:null,session:null},error:g})}return _.session&&(await this._saveSession(_.session),await this._notifyAllSubscribers("SIGNED_IN",_.session)),this._returnResult({data:Object.assign({},_),error:y})}catch(_){if(V(_))return this._returnResult({data:{user:null,session:null},error:_});throw _}}async _exchangeCodeForSession(t){const r=await St(this.storage,`${this.storageKey}-code-verifier`),[n,s]=(r??"").split("/");try{if(!n&&this.flowType==="pkce")throw new Kd;const{data:a,error:i}=await Q(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:t,code_verifier:n},xform:Be});if(await ke(this.storage,`${this.storageKey}-code-verifier`),i)throw i;if(!a||!a.session||!a.user){const o=new Bt;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",a.session)),this._returnResult({data:Object.assign(Object.assign({},a),{redirectType:s??null}),error:i})}catch(a){if(await ke(this.storage,`${this.storageKey}-code-verifier`),V(a))return this._returnResult({data:{user:null,session:null,redirectType:null},error:a});throw a}}async signInWithIdToken(t){try{const{options:r,provider:n,token:s,access_token:a,nonce:i}=t,o=await Q(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:s,access_token:a,nonce:i,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},xform:Be}),{data:l,error:d}=o;if(d)return this._returnResult({data:{user:null,session:null},error:d});if(!l||!l.session||!l.user){const c=new Bt;return this._returnResult({data:{user:null,session:null},error:c})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:d})}catch(r){if(V(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOtp(t){var r,n,s,a,i;try{if("email"in t){const{email:o,options:l}=t;let d=null,c=null;this.flowType==="pkce"&&([d,c]=await Kt(this.storage,this.storageKey));const{error:u}=await Q(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(r=l==null?void 0:l.data)!==null&&r!==void 0?r:{},create_user:(n=l==null?void 0:l.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:d,code_challenge_method:c},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:u})}if("phone"in t){const{phone:o,options:l}=t,{data:d,error:c}=await Q(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(s=l==null?void 0:l.data)!==null&&s!==void 0?s:{},create_user:(a=l==null?void 0:l.shouldCreateUser)!==null&&a!==void 0?a:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(i=l==null?void 0:l.channel)!==null&&i!==void 0?i:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:d==null?void 0:d.message_id},error:c})}throw new vn("You must provide either an email or phone number.")}catch(o){if(await ke(this.storage,`${this.storageKey}-code-verifier`),V(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(t){var r,n;try{let s,a;"options"in t&&(s=(r=t.options)===null||r===void 0?void 0:r.redirectTo,a=(n=t.options)===null||n===void 0?void 0:n.captchaToken);const{data:i,error:o}=await Q(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},t),{gotrue_meta_security:{captcha_token:a}}),redirectTo:s,xform:Be});if(o)throw o;if(!i)throw new Error("An error occurred on token verification.");const l=i.session,d=i.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(t.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:d,session:l},error:null})}catch(s){if(V(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithSSO(t){var r,n,s,a,i;try{let o=null,l=null;this.flowType==="pkce"&&([o,l]=await Kt(this.storage,this.storageKey));const d=await Q(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in t?{provider_id:t.providerId}:null),"domain"in t?{domain:t.domain}:null),{redirect_to:(n=(r=t.options)===null||r===void 0?void 0:r.redirectTo)!==null&&n!==void 0?n:void 0}),!((s=t==null?void 0:t.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:t.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:fc});return!((a=d.data)===null||a===void 0)&&a.url&&xe()&&!(!((i=t.options)===null||i===void 0)&&i.skipBrowserRedirect)&&window.location.assign(d.data.url),this._returnResult(d)}catch(o){if(await ke(this.storage,`${this.storageKey}-code-verifier`),V(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async t=>{const{data:{session:r},error:n}=t;if(n)throw n;if(!r)throw new Ie;const{error:s}=await Q(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:r.access_token});return this._returnResult({data:{user:null,session:null},error:s})})}catch(t){if(V(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async resend(t){try{const r=`${this.url}/resend`;if("email"in t){const{email:n,type:s,options:a}=t,{error:i}=await Q(this.fetch,"POST",r,{headers:this.headers,body:{email:n,type:s,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},redirectTo:a==null?void 0:a.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:i})}else if("phone"in t){const{phone:n,type:s,options:a}=t,{data:i,error:o}=await Q(this.fetch,"POST",r,{headers:this.headers,body:{phone:n,type:s,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:i==null?void 0:i.message_id},error:o})}throw new vn("You must provide either an email or phone number and a type")}catch(r){if(V(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async r=>r))}async _acquireLock(t,r){this._debug("#_acquireLock","begin",t);try{if(this.lockAcquired){const n=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await n,await r()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,t,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const n=r();for(this.pendingInLock.push((async()=>{try{await n}catch{}})()),await n;this.pendingInLock.length;){const s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await n}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(t){this._debug("#_useSession","begin");try{const r=await this.__loadSession();return await t(r)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let t=null;const r=await St(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",r),r!==null&&(this._isValidSession(r)?t=r:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!t)return{data:{session:null},error:null};const n=t.expires_at?t.expires_at*1e3-Date.now()<ps:!1;if(this._debug("#__loadSession()",`session has${n?"":" not"} expired`,"expires_at",t.expires_at),!n){if(this.userStorage){const i=await St(this.userStorage,this.storageKey+"-user");i!=null&&i.user?t.user=i.user:t.user=fs()}if(this.storage.isServer&&t.user&&!t.user.__isUserNotAvailableProxy){const i={value:this.suppressGetSessionWarning};t.user=uc(t.user,i),i.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:t},error:null}}const{data:s,error:a}=await this._callRefreshToken(t.refresh_token);return a?this._returnResult({data:{session:null},error:a}):this._returnResult({data:{session:s},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(t){if(t)return await this._getUser(t);await this.initializePromise;const r=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return r.data.user&&(this.suppressGetSessionWarning=!0),r}async _getUser(t){try{return t?await Q(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:t,xform:ht}):await this._useSession(async r=>{var n,s,a;const{data:i,error:o}=r;if(o)throw o;return!(!((n=i.session)===null||n===void 0)&&n.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new Ie}:await Q(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(a=(s=i.session)===null||s===void 0?void 0:s.access_token)!==null&&a!==void 0?a:void 0,xform:ht})})}catch(r){if(V(r))return hs(r)&&(await this._removeSession(),await ke(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:r});throw r}}async updateUser(t,r={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(t,r))}async _updateUser(t,r={}){try{return await this._useSession(async n=>{const{data:s,error:a}=n;if(a)throw a;if(!s.session)throw new Ie;const i=s.session;let o=null,l=null;this.flowType==="pkce"&&t.email!=null&&([o,l]=await Kt(this.storage,this.storageKey));const{data:d,error:c}=await Q(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:r==null?void 0:r.emailRedirectTo,body:Object.assign(Object.assign({},t),{code_challenge:o,code_challenge_method:l}),jwt:i.access_token,xform:ht});if(c)throw c;return i.user=d.user,await this._saveSession(i),await this._notifyAllSubscribers("USER_UPDATED",i),this._returnResult({data:{user:i.user},error:null})})}catch(n){if(await ke(this.storage,`${this.storageKey}-code-verifier`),V(n))return this._returnResult({data:{user:null},error:n});throw n}}async setSession(t){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(t))}async _setSession(t){try{if(!t.access_token||!t.refresh_token)throw new Ie;const r=Date.now()/1e3;let n=r,s=!0,a=null;const{payload:i}=_n(t.access_token);if(i.exp&&(n=i.exp,s=n<=r),s){const{data:o,error:l}=await this._callRefreshToken(t.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};a=o}else{const{data:o,error:l}=await this._getUser(t.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});a={access_token:t.access_token,refresh_token:t.refresh_token,user:o.user,token_type:"bearer",expires_in:n-r,expires_at:n},await this._saveSession(a),await this._notifyAllSubscribers("SIGNED_IN",a)}return this._returnResult({data:{user:a.user,session:a},error:null})}catch(r){if(V(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}}async refreshSession(t){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(t))}async _refreshSession(t){try{return await this._useSession(async r=>{var n;if(!t){const{data:i,error:o}=r;if(o)throw o;t=(n=i.session)!==null&&n!==void 0?n:void 0}if(!(t!=null&&t.refresh_token))throw new Ie;const{data:s,error:a}=await this._callRefreshToken(t.refresh_token);return a?this._returnResult({data:{user:null,session:null},error:a}):s?this._returnResult({data:{user:s.user,session:s},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(r){if(V(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async _getSessionFromURL(t,r){try{if(!xe())throw new gn("No browser detected.");if(t.error||t.error_description||t.error_code)throw new gn(t.error_description||"Error in URL with unspecified error_description",{error:t.error||"unspecified_error",code:t.error_code||"unspecified_code"});switch(r){case"implicit":if(this.flowType==="pkce")throw new ei("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new gn("Not a valid implicit grant flow url.");break;default:}if(r==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!t.code)throw new ei("No code detected.");const{data:g,error:b}=await this._exchangeCodeForSession(t.code);if(b)throw b;const w=new URL(window.location.href);return w.searchParams.delete("code"),window.history.replaceState(window.history.state,"",w.toString()),{data:{session:g.session,redirectType:null},error:null}}const{provider_token:n,provider_refresh_token:s,access_token:a,refresh_token:i,expires_in:o,expires_at:l,token_type:d}=t;if(!a||!o||!i||!d)throw new gn("No session defined in URL");const c=Math.round(Date.now()/1e3),u=parseInt(o);let h=c+u;l&&(h=parseInt(l));const m=h-c;m*1e3<=Qt&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${m}s, should have been closer to ${u}s`);const p=h-u;c-p>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",p,h,c):c-p<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",p,h,c);const{data:f,error:_}=await this._getUser(a);if(_)throw _;const y={provider_token:n,provider_refresh_token:s,access_token:a,expires_in:u,expires_at:h,refresh_token:i,token_type:d,user:f.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:y,redirectType:t.type},error:null})}catch(n){if(V(n))return this._returnResult({data:{session:null,redirectType:null},error:n});throw n}}_isImplicitGrantCallback(t){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),t):!!(t.access_token||t.error_description)}async _isPKCECallback(t){const r=await St(this.storage,`${this.storageKey}-code-verifier`);return!!(t.code&&r)}async signOut(t={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(t))}async _signOut({scope:t}={scope:"global"}){return await this._useSession(async r=>{var n;const{data:s,error:a}=r;if(a&&!hs(a))return this._returnResult({error:a});const i=(n=s.session)===null||n===void 0?void 0:n.access_token;if(i){const{error:o}=await this.admin.signOut(i,t);if(o&&!(Fd(o)&&(o.status===404||o.status===401||o.status===403)||hs(o)))return this._returnResult({error:o})}return t!=="others"&&(await this._removeSession(),await ke(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(t){const r=Yd(),n={id:r,callback:t,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",r),this.stateChangeEmitters.delete(r)}};return this._debug("#onAuthStateChange()","registered callback with id",r),this.stateChangeEmitters.set(r,n),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(r)})))(),{data:{subscription:n}}}async _emitInitialSession(t){return await this._useSession(async r=>{var n,s;try{const{data:{session:a},error:i}=r;if(i)throw i;await((n=this.stateChangeEmitters.get(t))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",a)),this._debug("INITIAL_SESSION","callback id",t,"session",a)}catch(a){await((s=this.stateChangeEmitters.get(t))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",t,"error",a),console.error(a)}})}async resetPasswordForEmail(t,r={}){let n=null,s=null;this.flowType==="pkce"&&([n,s]=await Kt(this.storage,this.storageKey,!0));try{return await Q(this.fetch,"POST",`${this.url}/recover`,{body:{email:t,code_challenge:n,code_challenge_method:s,gotrue_meta_security:{captcha_token:r.captchaToken}},headers:this.headers,redirectTo:r.redirectTo})}catch(a){if(await ke(this.storage,`${this.storageKey}-code-verifier`),V(a))return this._returnResult({data:null,error:a});throw a}}async getUserIdentities(){var t;try{const{data:r,error:n}=await this.getUser();if(n)throw n;return this._returnResult({data:{identities:(t=r.user.identities)!==null&&t!==void 0?t:[]},error:null})}catch(r){if(V(r))return this._returnResult({data:null,error:r});throw r}}async linkIdentity(t){return"token"in t?this.linkIdentityIdToken(t):this.linkIdentityOAuth(t)}async linkIdentityOAuth(t){var r;try{const{data:n,error:s}=await this._useSession(async a=>{var i,o,l,d,c;const{data:u,error:h}=a;if(h)throw h;const m=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,t.provider,{redirectTo:(i=t.options)===null||i===void 0?void 0:i.redirectTo,scopes:(o=t.options)===null||o===void 0?void 0:o.scopes,queryParams:(l=t.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await Q(this.fetch,"GET",m,{headers:this.headers,jwt:(c=(d=u.session)===null||d===void 0?void 0:d.access_token)!==null&&c!==void 0?c:void 0})});if(s)throw s;return xe()&&!(!((r=t.options)===null||r===void 0)&&r.skipBrowserRedirect)&&window.location.assign(n==null?void 0:n.url),this._returnResult({data:{provider:t.provider,url:n==null?void 0:n.url},error:null})}catch(n){if(V(n))return this._returnResult({data:{provider:t.provider,url:null},error:n});throw n}}async linkIdentityIdToken(t){return await this._useSession(async r=>{var n;try{const{error:s,data:{session:a}}=r;if(s)throw s;const{options:i,provider:o,token:l,access_token:d,nonce:c}=t,u=await Q(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(n=a==null?void 0:a.access_token)!==null&&n!==void 0?n:void 0,body:{provider:o,id_token:l,access_token:d,nonce:c,link_identity:!0,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},xform:Be}),{data:h,error:m}=u;return m?this._returnResult({data:{user:null,session:null},error:m}):!h||!h.session||!h.user?this._returnResult({data:{user:null,session:null},error:new Bt}):(h.session&&(await this._saveSession(h.session),await this._notifyAllSubscribers("USER_UPDATED",h.session)),this._returnResult({data:h,error:m}))}catch(s){if(await ke(this.storage,`${this.storageKey}-code-verifier`),V(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}})}async unlinkIdentity(t){try{return await this._useSession(async r=>{var n,s;const{data:a,error:i}=r;if(i)throw i;return await Q(this.fetch,"DELETE",`${this.url}/user/identities/${t.identity_id}`,{headers:this.headers,jwt:(s=(n=a.session)===null||n===void 0?void 0:n.access_token)!==null&&s!==void 0?s:void 0})})}catch(r){if(V(r))return this._returnResult({data:null,error:r});throw r}}async _refreshAccessToken(t){const r=`#_refreshAccessToken(${t.substring(0,5)}...)`;this._debug(r,"begin");try{const n=Date.now();return await tc(async s=>(s>0&&await ec(200*Math.pow(2,s-1)),this._debug(r,"refreshing attempt",s),await Q(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:t},headers:this.headers,xform:Be})),(s,a)=>{const i=200*Math.pow(2,s);return a&&ms(a)&&Date.now()+i-n<Qt})}catch(n){if(this._debug(r,"error",n),V(n))return this._returnResult({data:{session:null,user:null},error:n});throw n}finally{this._debug(r,"end")}}_isValidSession(t){return typeof t=="object"&&t!==null&&"access_token"in t&&"refresh_token"in t&&"expires_at"in t}async _handleProviderSignIn(t,r){const n=await this._getUrlForProvider(`${this.url}/authorize`,t,{redirectTo:r.redirectTo,scopes:r.scopes,queryParams:r.queryParams});return this._debug("#_handleProviderSignIn()","provider",t,"options",r,"url",n),xe()&&!r.skipBrowserRedirect&&window.location.assign(n),{data:{provider:t,url:n},error:null}}async _recoverAndRefresh(){var t,r;const n="#_recoverAndRefresh()";this._debug(n,"begin");try{const s=await St(this.storage,this.storageKey);if(s&&this.userStorage){let i=await St(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!i&&(i={user:s.user},await Yt(this.userStorage,this.storageKey+"-user",i)),s.user=(t=i==null?void 0:i.user)!==null&&t!==void 0?t:fs()}else if(s&&!s.user&&!s.user){const i=await St(this.storage,this.storageKey+"-user");i&&(i!=null&&i.user)?(s.user=i.user,await ke(this.storage,this.storageKey+"-user"),await Yt(this.storage,this.storageKey,s)):s.user=fs()}if(this._debug(n,"session from storage",s),!this._isValidSession(s)){this._debug(n,"session is not valid"),s!==null&&await this._removeSession();return}const a=((r=s.expires_at)!==null&&r!==void 0?r:1/0)*1e3-Date.now()<ps;if(this._debug(n,`session has${a?"":" not"} expired with margin of ${ps}s`),a){if(this.autoRefreshToken&&s.refresh_token){const{error:i}=await this._callRefreshToken(s.refresh_token);i&&(console.error(i),ms(i)||(this._debug(n,"refresh failed with a non-retryable error, removing the session",i),await this._removeSession()))}}else if(s.user&&s.user.__isUserNotAvailableProxy===!0)try{const{data:i,error:o}=await this._getUser(s.access_token);!o&&(i!=null&&i.user)?(s.user=i.user,await this._saveSession(s),await this._notifyAllSubscribers("SIGNED_IN",s)):this._debug(n,"could not get user data, skipping SIGNED_IN notification")}catch(i){console.error("Error getting user data:",i),this._debug(n,"error getting user data, skipping SIGNED_IN notification",i)}else await this._notifyAllSubscribers("SIGNED_IN",s)}catch(s){this._debug(n,"error",s),console.error(s);return}finally{this._debug(n,"end")}}async _callRefreshToken(t){var r,n;if(!t)throw new Ie;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const s=`#_callRefreshToken(${t.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new es;const{data:a,error:i}=await this._refreshAccessToken(t);if(i)throw i;if(!a.session)throw new Ie;await this._saveSession(a.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",a.session);const o={data:a.session,error:null};return this.refreshingDeferred.resolve(o),o}catch(a){if(this._debug(s,"error",a),V(a)){const i={data:null,error:a};return ms(a)||await this._removeSession(),(r=this.refreshingDeferred)===null||r===void 0||r.resolve(i),i}throw(n=this.refreshingDeferred)===null||n===void 0||n.reject(a),a}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(t,r,n=!0){const s=`#_notifyAllSubscribers(${t})`;this._debug(s,"begin",r,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:t,session:r});const a=[],i=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(t,r)}catch(l){a.push(l)}});if(await Promise.all(i),a.length>0){for(let o=0;o<a.length;o+=1)console.error(a[o]);throw a[0]}}finally{this._debug(s,"end")}}async _saveSession(t){this._debug("#_saveSession()",t),this.suppressGetSessionWarning=!0,await ke(this.storage,`${this.storageKey}-code-verifier`);const r=Object.assign({},t),n=r.user&&r.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!n&&r.user&&await Yt(this.userStorage,this.storageKey+"-user",{user:r.user});const s=Object.assign({},r);delete s.user;const a=ai(s);await Yt(this.storage,this.storageKey,a)}else{const s=ai(r);await Yt(this.storage,this.storageKey,s)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await ke(this.storage,this.storageKey),await ke(this.storage,this.storageKey+"-code-verifier"),await ke(this.storage,this.storageKey+"-user"),this.userStorage&&await ke(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const t=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{t&&xe()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",t)}catch(r){console.error("removing visibilitychange callback failed",r)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const t=setInterval(()=>this._autoRefreshTokenTick(),Qt);this.autoRefreshTicker=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t);const r=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=r,r&&typeof r=="object"&&typeof r.unref=="function"?r.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(r)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const t=this.autoRefreshTicker;this.autoRefreshTicker=null,t&&clearInterval(t);const r=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,r&&clearTimeout(r)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const t=Date.now();try{return await this._useSession(async r=>{const{data:{session:n}}=r;if(!n||!n.refresh_token||!n.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((n.expires_at*1e3-t)/Qt);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${Qt}ms, refresh threshold is ${Os} ticks`),s<=Os&&await this._callRefreshToken(n.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(t){if(t.isAcquireTimeout||t instanceof Io)this._debug("auto refresh token tick lock not available");else throw t}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!xe()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(t){this._debug("#visibilityChangedCallback","error",t)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(t){console.error("_handleVisibilityChange",t)}}async _onVisibilityChanged(t){const r=`#_onVisibilityChanged(${t})`;this._debug(r,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),t||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(r,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(t,r,n){const s=[`provider=${encodeURIComponent(r)}`];if(n!=null&&n.redirectTo&&s.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`),n!=null&&n.scopes&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),this.flowType==="pkce"){const[a,i]=await Kt(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(a)}`,code_challenge_method:`${encodeURIComponent(i)}`});s.push(o.toString())}if(n!=null&&n.queryParams){const a=new URLSearchParams(n.queryParams);s.push(a.toString())}return n!=null&&n.skipBrowserRedirect&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),`${t}?${s.join("&")}`}async _unenroll(t){try{return await this._useSession(async r=>{var n;const{data:s,error:a}=r;return a?this._returnResult({data:null,error:a}):await Q(this.fetch,"DELETE",`${this.url}/factors/${t.factorId}`,{headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token})})}catch(r){if(V(r))return this._returnResult({data:null,error:r});throw r}}async _enroll(t){try{return await this._useSession(async r=>{var n,s;const{data:a,error:i}=r;if(i)return this._returnResult({data:null,error:i});const o=Object.assign({friendly_name:t.friendlyName,factor_type:t.factorType},t.factorType==="phone"?{phone:t.phone}:t.factorType==="totp"?{issuer:t.issuer}:{}),{data:l,error:d}=await Q(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(n=a==null?void 0:a.session)===null||n===void 0?void 0:n.access_token});return d?this._returnResult({data:null,error:d}):(t.factorType==="totp"&&l.type==="totp"&&(!((s=l==null?void 0:l.totp)===null||s===void 0)&&s.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(r){if(V(r))return this._returnResult({data:null,error:r});throw r}}async _verify(t){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var n;const{data:s,error:a}=r;if(a)return this._returnResult({data:null,error:a});const i=Object.assign({challenge_id:t.challengeId},"webauthn"in t?{webauthn:Object.assign(Object.assign({},t.webauthn),{credential_response:t.webauthn.type==="create"?Cc(t.webauthn.credential_response):Rc(t.webauthn.credential_response)})}:{code:t.code}),{data:o,error:l}=await Q(this.fetch,"POST",`${this.url}/factors/${t.factorId}/verify`,{body:i,headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),this._returnResult({data:o,error:l}))})}catch(r){if(V(r))return this._returnResult({data:null,error:r});throw r}})}async _challenge(t){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var n;const{data:s,error:a}=r;if(a)return this._returnResult({data:null,error:a});const i=await Q(this.fetch,"POST",`${this.url}/factors/${t.factorId}/challenge`,{body:t,headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token});if(i.error)return i;const{data:o}=i;if(o.type!=="webauthn")return{data:o,error:null};switch(o.webauthn.type){case"create":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:$c(o.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Ac(o.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(r){if(V(r))return this._returnResult({data:null,error:r});throw r}})}async _challengeAndVerify(t){const{data:r,error:n}=await this._challenge({factorId:t.factorId});return n?this._returnResult({data:null,error:n}):await this._verify({factorId:t.factorId,challengeId:r.id,code:t.code})}async _listFactors(){var t;const{data:{user:r},error:n}=await this.getUser();if(n)return{data:null,error:n};const s={all:[],phone:[],totp:[],webauthn:[]};for(const a of(t=r==null?void 0:r.factors)!==null&&t!==void 0?t:[])s.all.push(a),a.status==="verified"&&s[a.factor_type].push(a);return{data:s,error:null}}async _getAuthenticatorAssuranceLevel(t){var r,n,s,a;if(t)try{const{payload:m}=_n(t);let p=null;m.aal&&(p=m.aal);let f=p;const{data:{user:_},error:y}=await this.getUser(t);if(y)return this._returnResult({data:null,error:y});((n=(r=_==null?void 0:_.factors)===null||r===void 0?void 0:r.filter(w=>w.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(f="aal2");const b=m.amr||[];return{data:{currentLevel:p,nextLevel:f,currentAuthenticationMethods:b},error:null}}catch(m){if(V(m))return this._returnResult({data:null,error:m});throw m}const{data:{session:i},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!i)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=_n(i.access_token);let d=null;l.aal&&(d=l.aal);let c=d;((a=(s=i.user.factors)===null||s===void 0?void 0:s.filter(m=>m.status==="verified"))!==null&&a!==void 0?a:[]).length>0&&(c="aal2");const h=l.amr||[];return{data:{currentLevel:d,nextLevel:c,currentAuthenticationMethods:h},error:null}}async _getAuthorizationDetails(t){try{return await this._useSession(async r=>{const{data:{session:n},error:s}=r;return s?this._returnResult({data:null,error:s}):n?await Q(this.fetch,"GET",`${this.url}/oauth/authorizations/${t}`,{headers:this.headers,jwt:n.access_token,xform:a=>({data:a,error:null})}):this._returnResult({data:null,error:new Ie})})}catch(r){if(V(r))return this._returnResult({data:null,error:r});throw r}}async _approveAuthorization(t,r){try{return await this._useSession(async n=>{const{data:{session:s},error:a}=n;if(a)return this._returnResult({data:null,error:a});if(!s)return this._returnResult({data:null,error:new Ie});const i=await Q(this.fetch,"POST",`${this.url}/oauth/authorizations/${t}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&xe()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(n){if(V(n))return this._returnResult({data:null,error:n});throw n}}async _denyAuthorization(t,r){try{return await this._useSession(async n=>{const{data:{session:s},error:a}=n;if(a)return this._returnResult({data:null,error:a});if(!s)return this._returnResult({data:null,error:new Ie});const i=await Q(this.fetch,"POST",`${this.url}/oauth/authorizations/${t}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&xe()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(n){if(V(n))return this._returnResult({data:null,error:n});throw n}}async _listOAuthGrants(){try{return await this._useSession(async t=>{const{data:{session:r},error:n}=t;return n?this._returnResult({data:null,error:n}):r?await Q(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,xform:s=>({data:s,error:null})}):this._returnResult({data:null,error:new Ie})})}catch(t){if(V(t))return this._returnResult({data:null,error:t});throw t}}async _revokeOAuthGrant(t){try{return await this._useSession(async r=>{const{data:{session:n},error:s}=r;return s?this._returnResult({data:null,error:s}):n?(await Q(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,query:{client_id:t.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new Ie})})}catch(r){if(V(r))return this._returnResult({data:null,error:r});throw r}}async fetchJwk(t,r={keys:[]}){let n=r.keys.find(o=>o.kid===t);if(n)return n;const s=Date.now();if(n=this.jwks.keys.find(o=>o.kid===t),n&&this.jwks_cached_at+Hd>s)return n;const{data:a,error:i}=await Q(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(i)throw i;return!a.keys||a.keys.length===0||(this.jwks=a,this.jwks_cached_at=s,n=a.keys.find(o=>o.kid===t),!n)?null:n}async getClaims(t,r={}){try{let n=t;if(!n){const{data:m,error:p}=await this.getSession();if(p||!m.session)return this._returnResult({data:null,error:p});n=m.session.access_token}const{header:s,payload:a,signature:i,raw:{header:o,payload:l}}=_n(n);r!=null&&r.allowExpired||lc(a.exp);const d=!s.alg||s.alg.startsWith("HS")||!s.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(s.kid,r!=null&&r.keys?{keys:r.keys}:r==null?void 0:r.jwks);if(!d){const{error:m}=await this.getUser(n);if(m)throw m;return{data:{claims:a,header:s,signature:i},error:null}}const c=dc(s.alg),u=await crypto.subtle.importKey("jwk",d,c,!0,["verify"]);if(!await crypto.subtle.verify(c,u,i,Jd(`${o}.${l}`)))throw new Ns("Invalid JWT signature");return{data:{claims:a,header:s,signature:i},error:null}}catch(n){if(V(n))return this._returnResult({data:null,error:n});throw n}}}Vr.nextInstanceID={};const Uc=Vr,Fc="2.95.3";let Rr="";typeof Deno<"u"?Rr="deno":typeof document<"u"?Rr="web":typeof navigator<"u"&&navigator.product==="ReactNative"?Rr="react-native":Rr="node";const Bc={"X-Client-Info":`supabase-js-${Rr}/${Fc}`},Kc={headers:Bc},zc={schema:"public"},Wc={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Vc={};function Gr(e){"@babel/helpers - typeof";return Gr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Gr(e)}function Gc(e,t){if(Gr(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(Gr(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Jc(e){var t=Gc(e,"string");return Gr(t)=="symbol"?t:t+""}function Qc(e,t,r){return(t=Jc(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function pi(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,n)}return r}function pe(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?pi(Object(r),!0).forEach(function(n){Qc(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):pi(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}const Yc=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),Xc=()=>Headers,Zc=(e,t,r)=>{const n=Yc(r),s=Xc();return async(a,i)=>{var o;const l=(o=await t())!==null&&o!==void 0?o:e;let d=new s(i==null?void 0:i.headers);return d.has("apikey")||d.set("apikey",e),d.has("Authorization")||d.set("Authorization",`Bearer ${l}`),n(a,pe(pe({},i),{},{headers:d}))}};function eu(e){return e.endsWith("/")?e:e+"/"}function tu(e,t){var r,n;const{db:s,auth:a,realtime:i,global:o}=e,{db:l,auth:d,realtime:c,global:u}=t,h={db:pe(pe({},l),s),auth:pe(pe({},d),a),realtime:pe(pe({},c),i),storage:{},global:pe(pe(pe({},u),o),{},{headers:pe(pe({},(r=u==null?void 0:u.headers)!==null&&r!==void 0?r:{}),(n=o==null?void 0:o.headers)!==null&&n!==void 0?n:{})}),accessToken:async()=>""};return e.accessToken?h.accessToken=e.accessToken:delete h.accessToken,h}function ru(e){const t=e==null?void 0:e.trim();if(!t)throw new Error("supabaseUrl is required.");if(!t.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(eu(t))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var nu=class extends Uc{constructor(e){super(e)}},su=class{constructor(e,t,r){var n,s;this.supabaseUrl=e,this.supabaseKey=t;const a=ru(e);if(!t)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",a),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",a),this.storageUrl=new URL("storage/v1",a),this.functionsUrl=new URL("functions/v1",a);const i=`sb-${a.hostname.split(".")[0]}-auth-token`,o={db:zc,realtime:Vc,auth:pe(pe({},Wc),{},{storageKey:i}),global:Kc},l=tu(r??{},o);if(this.storageKey=(n=l.auth.storageKey)!==null&&n!==void 0?n:"",this.headers=(s=l.global.headers)!==null&&s!==void 0?s:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(c,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}});else{var d;this.auth=this._initSupabaseAuthClient((d=l.auth)!==null&&d!==void 0?d:{},this.headers,l.global.fetch)}this.fetch=Zc(t,this._getAccessToken.bind(this),l.global.fetch),this.realtime=this._initRealtimeClient(pe({headers:this.headers,accessToken:this._getAccessToken.bind(this)},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(c=>this.realtime.setAuth(c)).catch(c=>console.warn("Failed to set initial Realtime auth token:",c)),this.rest=new Fl(new URL("rest/v1",a).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new Pd(this.storageUrl.href,this.headers,this.fetch,r==null?void 0:r.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Dl(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,r)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e=this,t,r;if(e.accessToken)return await e.accessToken();const{data:n}=await e.auth.getSession();return(t=(r=n.session)===null||r===void 0?void 0:r.access_token)!==null&&t!==void 0?t:e.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:n,userStorage:s,storageKey:a,flowType:i,lock:o,debug:l,throwOnError:d},c,u){const h={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new nu({url:this.authUrl.href,headers:pe(pe({},h),c),storageKey:a,autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:n,userStorage:s,flowType:i,lock:o,debug:l,throwOnError:d,fetch:u,hasCustomAuthorizationHeader:Object.keys(this.headers).some(m=>m.toLowerCase()==="authorization")})}_initRealtimeClient(e){return new ad(this.realtimeUrl.href,pe(pe({},e),{},{params:pe(pe({},{apikey:this.supabaseKey}),e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,"CLIENT",t==null?void 0:t.access_token)})}_handleTokenChanged(e,t,r){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==r?(this.changedAccessToken=r,this.realtime.setAuth(r)):e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const au=(e,t,r)=>new su(e,t,r);function iu(){if(typeof window<"u")return!1;const e=globalThis.process;if(!e)return!1;const t=e.version;if(t==null)return!1;const r=t.match(/^v(\d+)\./);return r?parseInt(r[1],10)<=18:!1}iu()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const ou="https://ujxczpaupfqaiqrcoykl.supabase.co",lu="sb_publishable_EJ7wzzBh1hnKE0j_j7E1mQ_9TAJvRoO",S=au(ou,lu),hi="app-toast-container";function du(){let e=document.getElementById(hi);return e||(e=document.createElement("div"),e.id=hi,e.className="toast-container position-fixed top-0 end-0 p-3",e.style.zIndex="1080",document.body.appendChild(e)),e}function cu(e){return e==="success"?"text-bg-success":e==="error"?"text-bg-danger":e==="warning"?"text-bg-warning":"text-bg-primary"}function uu(e){const t=String(e||"").trim(),r=t.toLowerCase();return t?r.includes("row-level security")||r.includes("violates row-level security policy")?"Нямаш нужните права за това действие.":r.includes("foreign key constraint")||r.includes("violates foreign key constraint")?"Операцията не може да се изпълни, защото записът е свързан с други данни.":r.includes("duplicate key value")||r.includes("unique constraint")||r.includes("already exists")?"Запис с тези данни вече съществува.":r.includes("violates not-null constraint")?"Липсва задължително поле. Провери въведените данни.":r.includes("invalid input syntax")||r.includes("invalid uuid")||r.includes("date/time field value out of range")?"Невалиден формат на въведени данни.":r.includes("permission denied")||r.includes("not authorized")||r.includes("unauthorized")?"Нямаш достъп за това действие.":r.includes("jwt")||r.includes("token")||r.includes("session")?"Сесията е изтекла. Влез отново в системата.":r.includes("failed to fetch")||r.includes("networkerror")||r.includes("network request failed")?"Проблем с връзката. Провери интернет и опитай отново.":t:"Възникна неочаквана грешка."}function v(e,t="info"){const r=du(),n=document.createElement("div"),s=t==="error"?uu(e):String(e??"");n.className=`toast align-items-center border-0 ${cu(t)} show`,n.setAttribute("role","alert"),n.setAttribute("aria-live","assertive"),n.setAttribute("aria-atomic","true"),n.innerHTML=`
    <div class="d-flex">
      <div class="toast-body">${s}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
    </div>
  `;const a=n.querySelector("button");a==null||a.addEventListener("click",()=>{n.remove()}),r.appendChild(n),window.setTimeout(()=>{n.remove()},4e3)}async function ur(){const{data:e,error:t}=await S.auth.getSession();return t?null:e.session||null}async function ya(e){if(!e)return!1;const{data:t,error:r}=await S.from("user_roles").select("id").eq("user_id",e).eq("role","admin").limit(1);return r?!1:Array.isArray(t)&&t.length>0}async function pu(){var r;const e=await ur(),t=((r=e==null?void 0:e.user)==null?void 0:r.id)||"";return t?ya(t):!1}async function Hs(e){if(!e)return!1;const{data:t,error:r}=await S.from("user_roles").select("id").eq("user_id",e).limit(1);return r?!1:Array.isArray(t)&&t.length>0}async function Oo(e){if(!e)return!1;const{data:t,error:r}=await S.from("user_profiles").select("is_active").eq("id",e).maybeSingle();return r?!1:t?t.is_active!==!1:!0}async function mi(){var n;const e=await ur(),t=((n=e==null?void 0:e.user)==null?void 0:n.id)||"";return t?await Oo(t)?{allowed:!0,reason:""}:(await S.auth.signOut(),{allowed:!1,reason:"inactive-profile"}):{allowed:!1,reason:"no-session"}}const Mo="traincrewhub_permission_banner_enabled",hu={page_plan_schedule:"Страница План-График",page_schedule:"Страница График",schedule_keys:"Ключ-Графици",duties:"Повески",duty_types:"Типове повески",trains:"Влакове",employees:"Служители",employee_absences:"Отсъствия",planned_duties:"Планирани повески",actual_duties:"Реални повески",user_roles:"Роли на потребители",user_profiles:"Потребителски профили",role_permissions:"Права по роли",schedule_key_duties:"Повески към ключ-график",positions:"Позиции",absence_reasons:"Причини за отсъствие",duty_trains:"Влакове към повески",documents:"Документи"},Us={none:0,own:1,role_attached_employees:2,all:3};let xt="",$t=new Map,qt=!1,Pt=null;function At(e){const t=String(e||"").trim();return Object.hasOwn(Us,t)?t:"none"}function Sr(e,t){const r=At(e),n=At(t);return Us[r]>=Us[n]?r:n}async function mu(){var l,d;const{data:e}=await S.auth.getSession(),t=((d=(l=e==null?void 0:e.session)==null?void 0:l.user)==null?void 0:d.id)||"";if(!t){xt="",$t=new Map,qt=!0;return}if(qt&&xt===t)return;const{data:r,error:n}=await S.from("user_roles").select("role").eq("user_id",t);if(n){xt=t,$t=new Map,qt=!0;return}const s=[...new Set((r||[]).map(c=>String((c==null?void 0:c.role)||"").trim()).filter(Boolean))];if(!s.length){xt=t,$t=new Map,qt=!0;return}const{data:a,error:i}=await S.from("role_permissions").select("resource, view_screen_scope, view_records_scope, create_records_scope, edit_records_scope, delete_records_scope").in("role",s);if(i){xt=t,$t=new Map,qt=!0;return}const o=new Map;(a||[]).forEach(c=>{const u=String((c==null?void 0:c.resource)||"").trim();if(!u)return;const h=o.get(u)||{view_screen_scope:"none",view_records_scope:"none",create_records_scope:"none",edit_records_scope:"none",delete_records_scope:"none"};o.set(u,{view_screen_scope:Sr(h.view_screen_scope,c==null?void 0:c.view_screen_scope),view_records_scope:Sr(h.view_records_scope,c==null?void 0:c.view_records_scope),create_records_scope:Sr(h.create_records_scope,c==null?void 0:c.create_records_scope),edit_records_scope:Sr(h.edit_records_scope,c==null?void 0:c.edit_records_scope),delete_records_scope:Sr(h.delete_records_scope,c==null?void 0:c.delete_records_scope)})}),xt=t,$t=o,qt=!0}async function tt(e,t){await mu();const r=String(e||"").trim(),n=String(t||"").trim();if(!r||!n)return"none";const s=$t.get(r);return s?n==="view_screen"?At(s.view_screen_scope):n==="view_records"?At(s.view_records_scope):n==="edit_records"?At(s.edit_records_scope):n==="create_records"?At(s.create_records_scope):n==="delete_records"?At(s.delete_records_scope):"none":"none"}async function jo(e){return await tt(e,"view_screen")!=="none"}async function fu(e){const t=String(e||"").trim();if(!t)return{view_screen:"none",view_records:"none",create_records:"none",edit_records:"none",delete_records:"none"};const[r,n,s,a,i]=await Promise.all([tt(t,"view_screen"),tt(t,"view_records"),tt(t,"create_records"),tt(t,"edit_records"),tt(t,"delete_records")]);return{view_screen:r,view_records:n,create_records:s,edit_records:a,delete_records:i}}function bs(e,t){e&&(e.disabled=t,e.classList.toggle("disabled",t))}async function yu(e,t){Pt&&(Pt(),Pt=null);const r=String(t||"").trim();if(!e||!r)return;const n=await tt(r,"edit_records"),s=await tt(r,"create_records"),a=await tt(r,"delete_records"),i=s==="none",o=n==="none",l=a==="none",d=['button[id^="open-create-"]','button[id^="open-add-"]'],c=['[data-action="edit"]','[data-duty-action="edit"]','[data-action="duplicate"]','[data-duty-action="duplicate"]'],u=['[data-action="delete"]','[data-duty-action="delete"]'],h=()=>{i&&e.querySelectorAll(d.join(",")).forEach(f=>bs(f,!0)),o&&e.querySelectorAll(c.join(",")).forEach(f=>bs(f,!0)),l&&e.querySelectorAll(u.join(",")).forEach(f=>bs(f,!0))},m=f=>{const _=f.target;if(_){if(i&&_.closest(d.join(","))){f.preventDefault(),f.stopPropagation(),v("Нямаш права за създаване.","warning");return}if(o&&_.closest(c.join(","))){f.preventDefault(),f.stopPropagation(),v("Нямаш права за редакция.","warning");return}l&&_.closest(u.join(","))&&(f.preventDefault(),f.stopPropagation(),v("Нямаш права за изтриване.","warning"))}},p=new MutationObserver(()=>{h()});h(),e.addEventListener("click",m,!0),p.observe(e,{childList:!0,subtree:!0}),Pt=()=>{e.removeEventListener("click",m,!0),p.disconnect()}}function bu(){Pt&&(Pt(),Pt=null)}function No(){xt="",$t=new Map,qt=!1}function ts(e){const t=String(e||"").trim();return t?hu[t]||t:"-"}function Ho(){try{const e=localStorage.getItem(Mo);return e===null?!0:e==="true"}catch{return!0}}function vu(e){try{localStorage.setItem(Mo,String(!!e))}catch{}}let vs,wn,Sn,kn;async function gu(e){e.innerHTML=Al;const t=e.querySelector("nav.navbar"),r=e.querySelector("#nav-sign-in"),n=e.querySelector("#nav-register"),s=e.querySelector("#nav-my-profile"),a=e.querySelector("#nav-logout"),i=e.querySelector("#nav-admin"),o=a==null?void 0:a.querySelector("button"),l=e.querySelector("#mainNav"),d=e.querySelector(".navbar-toggler"),c=()=>{e.querySelectorAll(".nav-item.dropdown").forEach(p=>{var _;p.classList.remove("show"),(_=p.querySelector(".dropdown-menu"))==null||_.classList.remove("show");const f=p.querySelector(".dropdown-toggle");f&&f.setAttribute("aria-expanded","false")})},u=()=>{const p=window.location.pathname;e.querySelectorAll("a[data-link]").forEach(y=>{const b=y.getAttribute("href")===p;y.classList.toggle("active",b),y.setAttribute("aria-current",b?"page":"false")}),e.querySelectorAll(".nav-item.dropdown").forEach(y=>{const g=y.querySelector(".dropdown-toggle"),b=!!y.querySelector(".dropdown-item.active");g==null||g.classList.toggle("active",b),g&&g.setAttribute("aria-current",b?"page":"false")})},h=async()=>{var L;const{data:p}=await S.auth.getSession(),f=p.session,_=!!f,y=((L=f==null?void 0:f.user)==null?void 0:L.id)||"",g=y?await Hs(y):!1,b=_&&!g;if(t==null||t.classList.toggle("d-none",!_),r==null||r.classList.toggle("d-none",_),n==null||n.classList.toggle("d-none",_),a==null||a.classList.toggle("d-none",!_),b){e.querySelectorAll("#mainNav .navbar-nav > li").forEach(x=>{x.classList.add("d-none")}),a==null||a.classList.remove("d-none"),i==null||i.classList.add("d-none"),s==null||s.classList.add("d-none");return}let w=!1;y&&(w=await ya(y)),i==null||i.classList.toggle("d-none",!w),s==null||s.classList.toggle("d-none",!w);const k={"/schedule-keys":"schedule_keys","/duties":"duties","/duty-types":"duty_types","/trains":"trains","/employees":"employees","/employee-absences":"employee_absences","/planned-duties":"planned_duties","/actual-duties":"actual_duties","/documents":"documents","/user-profiles":"user_profiles","/plan-schedule":"page_plan_schedule","/schedule":"page_schedule","/schedule-key-duties":"duties"};await Promise.all(Object.entries(k).map(async([x,E])=>{const q=e.querySelector(`a[data-link][href="${x}"]`),T=q==null?void 0:q.closest("li");if(!q||!T)return;if(!_){T.classList.add("d-none");return}const C=await jo(E);T.classList.toggle("d-none",!C)}))};e.addEventListener("click",p=>{const f=p.target.closest(".dropdown-toggle");if(f&&e.contains(f)){p.preventDefault();const y=f.closest(".nav-item.dropdown"),g=y==null?void 0:y.querySelector(".dropdown-menu"),b=y==null?void 0:y.classList.contains("show");c(),!b&&y&&g&&(y.classList.add("show"),g.classList.add("show"),f.setAttribute("aria-expanded","true"));return}p.target.closest("a[data-link]")&&(c(),l!=null&&l.classList.contains("show")&&(l.classList.remove("show"),d==null||d.setAttribute("aria-expanded","false")))}),o==null||o.addEventListener("click",async()=>{const{error:p}=await S.auth.signOut();if(p){v(p.message,"error");return}v("Logged out successfully.","success"),window.history.pushState({},"","/login"),window.dispatchEvent(new PopStateEvent("popstate"))}),vs&&vs.unsubscribe(),wn&&window.removeEventListener("route:changed",wn),Sn&&document.removeEventListener("click",Sn),kn&&document.removeEventListener("keydown",kn),wn=u,window.addEventListener("route:changed",wn),Sn=p=>{e.contains(p.target)||c()},document.addEventListener("click",Sn),kn=p=>{p.key==="Escape"&&c()},document.addEventListener("keydown",kn);const{data:m}=S.auth.onAuthStateChange(()=>{No(),h()});vs=m.subscription,await h(),u()}const _u=`<div class="bg-white border-top py-3">\r
  <div class="container text-muted small text-center">\r
    TrainCrewHub Crew Management Platform\r
  </div>\r
</div>\r
`;async function wu(e){e.innerHTML=_u}async function Su(e){e.innerHTML=$l;const t=e.querySelector("#app-header"),r=e.querySelector("#app-footer");await Promise.all([gu(t),wu(r)])}const ku=`<div class="d-flex flex-column gap-3">\r
  <section class="card border-0 shadow-sm">\r
    <div class="card-body p-4 p-md-5">\r
      <div class="d-flex flex-wrap align-items-center gap-2 mb-2">\r
        <h1 class="h3 mb-0" id="index-welcome-title">Добре дошъл в TrainCrewHub</h1>\r
      </div>\r
      <p class="text-secondary mb-0" id="index-welcome-subtitle">Зареждане на профил...</p>\r
    </div>\r
  </section>\r
\r
  <section class="card border-0 shadow-sm">\r
    <div class="card-body p-4">\r
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">\r
        <h2 class="h5 mb-0">Бързи действия</h2>\r
        <span class="text-secondary small">Навигация към основните екрани</span>\r
      </div>\r
      <div class="d-flex flex-wrap gap-2" id="index-quick-actions">\r
        <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>\r
        <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>\r
        <a href="/employees" data-link class="btn btn-outline-primary">Служители</a>\r
        <a href="/plan-schedule" data-link class="btn btn-outline-primary">План-График</a>\r
        <a href="/schedule" data-link class="btn btn-outline-primary">График</a>\r
      </div>\r
    </div>\r
  </section>\r
\r
  <section class="card border-0 shadow-sm" id="index-management-section">\r
    <div class="card-body p-4">\r
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">\r
        <h2 class="h5 mb-0" id="index-management-title">Оперативен преглед за днес</h2>\r
        <button type="button" class="btn btn-sm btn-outline-secondary" id="index-refresh">Опресни</button>\r
      </div>\r
      <div class="row g-3" id="index-kpis">\r
        <div class="col-12 col-md-6 col-xl-3" id="index-kpi-card-planned">\r
          <article class="border rounded p-3 h-100">\r
            <div class="text-secondary small mb-1" id="index-kpi-label-1">Планирани повески</div>\r
            <div class="h4 mb-0" id="index-kpi-planned">-</div>\r
          </article>\r
        </div>\r
        <div class="col-12 col-md-6 col-xl-3" id="index-kpi-card-actual">\r
          <article class="border rounded p-3 h-100">\r
            <div class="text-secondary small mb-1" id="index-kpi-label-2">Реални повески</div>\r
            <div class="h4 mb-0" id="index-kpi-actual">-</div>\r
          </article>\r
        </div>\r
        <div class="col-12 col-md-6 col-xl-3" id="index-kpi-card-absences">\r
          <article class="border rounded p-3 h-100">\r
            <div class="text-secondary small mb-1" id="index-kpi-label-3">Активни отсъствия</div>\r
            <div class="h4 mb-0" id="index-kpi-absences">-</div>\r
          </article>\r
        </div>\r
        <div class="col-12 col-md-6 col-xl-3" id="index-kpi-card-employees">\r
          <article class="border rounded p-3 h-100">\r
            <div class="text-secondary small mb-1" id="index-kpi-label-4">Активни служители</div>\r
            <div class="h4 mb-0" id="index-kpi-employees">-</div>\r
          </article>\r
        </div>\r
      </div>\r
\r
      <section class="border rounded p-3 mt-3 d-none" id="index-certificates-panel">\r
        <h3 class="h6 mb-3">Сертификати</h3>\r
        <div class="d-flex flex-column gap-2">\r
          <div class="d-flex justify-content-between align-items-center border rounded p-2">\r
            <span>Изтичат до 30 дни</span>\r
            <button\r
              type="button"\r
              class="badge text-bg-warning border-0"\r
              id="index-certificates-soon-toggle"\r
              data-index-cert-action="toggle-soon"\r
            >\r
              0\r
            </button>\r
          </div>\r
          <div class="table-responsive d-none" id="index-certificates-soon-details">\r
            <table class="table table-sm align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Служител</th>\r
                  <th>Сертификат</th>\r
                  <th>Дата</th>\r
                </tr>\r
              </thead>\r
              <tbody id="index-certificates-soon-body">\r
                <tr><td colspan="3" class="text-secondary">Няма служители.</td></tr>\r
              </tbody>\r
            </table>\r
          </div>\r
\r
          <div class="d-flex justify-content-between align-items-center border rounded p-2">\r
            <span>Вече изтекли</span>\r
            <button\r
              type="button"\r
              class="badge text-bg-danger border-0"\r
              id="index-certificates-expired-toggle"\r
              data-index-cert-action="toggle-expired"\r
            >\r
              0\r
            </button>\r
          </div>\r
          <div class="table-responsive d-none" id="index-certificates-expired-details">\r
            <table class="table table-sm align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Служител</th>\r
                  <th>Сертификат</th>\r
                  <th>Дата</th>\r
                </tr>\r
              </thead>\r
              <tbody id="index-certificates-expired-body">\r
                <tr><td colspan="3" class="text-secondary">Няма служители.</td></tr>\r
              </tbody>\r
            </table>\r
          </div>\r
        </div>\r
      </section>\r
\r
      <section class="border rounded p-3 mt-3 d-none" id="index-absences-panel">\r
        <h3 class="h6 mb-3">Отсъстващи</h3>\r
        <div class="d-flex flex-column gap-2" id="index-absence-reasons-body">\r
          <p class="text-secondary mb-0">Няма активни отсъствия.</p>\r
        </div>\r
      </section>\r
\r
      <section class="border rounded p-3 mt-3 d-none" id="index-workload-panel">\r
        <div class="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-3">\r
          <h3 class="h6 mb-0">Натовареност на всички служители</h3>\r
          <div class="d-flex align-items-end gap-2">\r
            <div>\r
              <label for="index-workload-date" class="form-label mb-1">Към дата</label>\r
              <input id="index-workload-date" type="date" class="form-control form-control-sm" />\r
            </div>\r
            <button id="index-workload-refresh" type="button" class="btn btn-sm btn-outline-secondary">Опресни</button>\r
          </div>\r
        </div>\r
\r
        <div class="table-responsive">\r
          <table class="table table-sm align-middle mb-0">\r
            <thead>\r
              <tr>\r
                <th>Служител</th>\r
                <th>Планирани</th>\r
                <th>Реални</th>\r
                <th>Норма</th>\r
                <th>Отклонение</th>\r
              </tr>\r
            </thead>\r
            <tbody id="index-workload-body">\r
              <tr>\r
                <td colspan="5" class="text-secondary">Няма данни.</td>\r
              </tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </section>\r
\r
      <section class="border rounded p-3 mt-3 d-none" id="index-pending-users-panel">\r
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">\r
          <h3 class="h6 mb-0">Чакащи потребители за роля</h3>\r
          <div class="d-flex align-items-center gap-2">\r
            <span class="badge text-bg-warning" id="index-pending-users-count">0</span>\r
            <a href="/admin" data-link class="btn btn-sm btn-outline-primary">Към роли</a>\r
          </div>\r
        </div>\r
        <div class="table-responsive">\r
          <table class="table table-sm align-middle mb-0">\r
            <thead>\r
              <tr>\r
                <th>Потребител</th>\r
                <th>Създаден на</th>\r
                <th>Чака от</th>\r
              </tr>\r
            </thead>\r
            <tbody id="index-pending-users-body">\r
              <tr>\r
                <td colspan="3" class="text-secondary">Няма чакащи потребители.</td>\r
              </tr>\r
            </tbody>\r
          </table>\r
        </div>\r
      </section>\r
\r
      <p class="text-secondary small mt-3 mb-0" id="index-last-updated">-</p>\r
    </div>\r
  </section>\r
\r
  <section class="card border-0 shadow-sm d-none" id="index-crew-section">\r
    <div class="card-body p-4">\r
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">\r
        <h2 class="h5 mb-0">Моите повески за месеца</h2>\r
        <div class="d-flex align-items-center gap-2">\r
          <button type="button" class="btn btn-sm btn-outline-secondary" id="index-crew-prev-month">◀</button>\r
          <div class="fw-semibold" id="index-crew-month-label">-</div>\r
          <button type="button" class="btn btn-sm btn-outline-secondary" id="index-crew-next-month">▶</button>\r
          <button type="button" class="btn btn-sm btn-outline-primary" id="index-crew-today-month">Днес</button>\r
          <button type="button" class="btn btn-sm btn-outline-secondary" id="index-refresh-crew">Опресни</button>\r
        </div>\r
      </div>\r
\r
      <div class="index-crew-calendar-weekdays mb-2" aria-hidden="true">\r
        <span>Пн</span>\r
        <span>Вт</span>\r
        <span>Ср</span>\r
        <span>Чт</span>\r
        <span>Пт</span>\r
        <span>Сб</span>\r
        <span>Нд</span>\r
      </div>\r
\r
      <div class="index-crew-calendar-days mb-3" id="index-crew-calendar-days"></div>\r
\r
      <div class="d-flex flex-wrap align-items-center gap-2 mb-3 small text-secondary">\r
        <span class="badge text-bg-primary">П</span>\r
        <span>Планирани</span>\r
        <span class="badge text-bg-success">Р</span>\r
        <span>Реални</span>\r
        <span class="badge text-bg-warning">Промяна</span>\r
        <span>Смяна на служител — чака потвърждение</span>\r
        <span class="badge text-bg-info">ΔN</span>\r
        <span>Брой промени</span>\r
      </div>\r
\r
      <section class="border rounded p-3 mb-3" id="index-crew-hours-summary">\r
        <div class="row g-3">\r
          <div class="col-12 col-md-3">\r
            <div class="text-secondary small">Планирани часове до дата</div>\r
            <div class="fw-semibold" id="index-crew-planned-hours-total">00:00</div>\r
          </div>\r
          <div class="col-12 col-md-3">\r
            <div class="text-secondary small">Реални часове до дата</div>\r
            <div class="fw-semibold" id="index-crew-actual-hours-total">00:00</div>\r
          </div>\r
          <div class="col-12 col-md-3">\r
            <div class="text-secondary small">Норма (работни дни BG) до дата</div>\r
            <div class="fw-semibold" id="index-crew-norm-hours-total">00:00</div>\r
          </div>\r
          <div class="col-12 col-md-3">\r
            <div class="text-secondary small">Отклонение (Реални − Норма)</div>\r
            <div class="fw-semibold" id="index-crew-deviation-hours-total">+00:00</div>\r
          </div>\r
        </div>\r
      </section>\r
\r
      <h3 class="h6 mb-2" id="index-crew-selected-date-label">Избери ден</h3>\r
\r
      <div class="row g-3">\r
        <div class="col-12 col-xl-6">\r
          <h3 class="h6">Планирани</h3>\r
          <div class="d-flex flex-column gap-2" id="index-crew-planned-body">\r
            <p class="text-secondary mb-0">Няма планирани повески.</p>\r
          </div>\r
        </div>\r
        <div class="col-12 col-xl-6">\r
          <h3 class="h6">Реални</h3>\r
          <div class="d-flex flex-column gap-2" id="index-crew-actual-body">\r
            <p class="text-secondary mb-0">Няма реални повески.</p>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="mt-3">\r
        <h3 class="h6">Промени за деня</h3>\r
        <div class="d-flex flex-column gap-2" id="index-crew-change-body">\r
          <p class="text-secondary mb-0">Няма регистрирани промени за избрания ден.</p>\r
        </div>\r
      </div>\r
\r
      <div class="mt-3">\r
        <h3 class="h6">Отсъствия</h3>\r
        <div class="d-flex flex-column gap-2" id="index-crew-absence-body">\r
          <p class="text-secondary mb-0">Няма отсъствия за избрания ден.</p>\r
        </div>\r
      </div>\r
\r
      <p class="text-secondary small mt-3 mb-0" id="index-crew-last-updated">-</p>\r
    </div>\r
  </section>\r
</div>\r
\r
<div id="index-timetable-preview-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1070;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3 p-md-4">\r
    <div class="card w-100" style="max-width: 1100px;">\r
      <div class="card-body p-3 p-md-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="index-timetable-preview-title" class="h5 mb-0">Преглед на разписание</h2>\r
          <div class="d-flex align-items-center gap-2">\r
            <a id="index-timetable-preview-open" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">Отвори файла</a>\r
            <button id="index-timetable-preview-close" type="button" class="btn-close" aria-label="Close"></button>\r
          </div>\r
        </div>\r
        <div id="index-timetable-preview-fallback" class="alert alert-info py-2 d-none" role="alert">\r
          Този тип файл може да не се визуализира вградено. Използвай „Отвори файла" за директен преглед.\r
        </div>\r
        <iframe\r
          id="index-timetable-preview-frame"\r
          title="Преглед на разписание"\r
          class="w-100 border rounded"\r
          style="height: min(72vh, 760px);"\r
        ></iframe>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="index-actual-duty-edit-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1070;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3 p-md-4">\r
    <div class="card w-100" style="max-width: 620px;">\r
      <div class="card-body p-3 p-md-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Редакция на реална повеска</h2>\r
          <button id="index-actual-duty-edit-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="index-actual-duty-edit-form" class="row g-3">\r
          <input type="hidden" id="index-actual-duty-edit-id" />\r
\r
          <div class="col-6">\r
            <label for="index-actual-duty-start" class="form-label">Начало</label>\r
            <input id="index-actual-duty-start" type="time" class="form-control" required />\r
          </div>\r
\r
          <div class="col-6">\r
            <label for="index-actual-duty-end" class="form-label">Край</label>\r
            <input id="index-actual-duty-end" type="time" class="form-control" required />\r
          </div>\r
\r
          <div class="col-6">\r
            <label for="index-actual-duty-break-start" class="form-label">Начало на прекъсване</label>\r
            <input id="index-actual-duty-break-start" type="time" class="form-control" required />\r
          </div>\r
\r
          <div class="col-6">\r
            <label for="index-actual-duty-break-end" class="form-label">Край на прекъсване</label>\r
            <input id="index-actual-duty-break-end" type="time" class="form-control" required />\r
          </div>\r
\r
          <div class="col-12 d-flex justify-content-end gap-2 mt-2">\r
            <button id="index-actual-duty-edit-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="index-actual-duty-edit-save" type="submit" class="btn btn-primary">Запази</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function jt(e){if(!e)return"00:00";const t=String(e).match(/(\d{1,2}):(\d{2})(?::\d{2})?/);if(!t)return"00:00";const[,r,n]=t;return`${r.padStart(2,"0")}:${n}`}function fi(e){if(!e)return 0;const[t,r]=e.split(":"),n=Number(t),s=Number(r);return!Number.isFinite(n)||!Number.isFinite(s)?0:n*60+s}function Re(e,t){const r=fi(e),n=fi(t);return n>=r?n-r:24*60-r+n}async function xu(e,t){const{setText:r,formatDateTime:n,escapeHtml:s}=t,[a,i,o,l]=await Promise.all([S.from("user_profiles").select("id",{count:"exact",head:!0}),S.from("user_roles").select("user_id"),S.from("roles").select("name",{count:"exact",head:!0}),S.from("user_profiles").select("id",{count:"exact",head:!0}).not("employee_id","is",null)]);[a,i,o,l].some(u=>u.error)&&v("Част от админ данните на индекс страницата не могат да се заредят.","warning");const c=new Set((i.data||[]).map(u=>u.user_id).filter(Boolean));r(e,"#index-kpi-planned",String(a.count??0)),r(e,"#index-kpi-actual",String(c.size)),r(e,"#index-kpi-absences",String(l.count??0)),r(e,"#index-kpi-employees",String(o.count??0)),await qu(e,{setText:r,formatDateTime:n,escapeHtml:s}),r(e,"#index-last-updated",`Последно обновяване: ${n(new Date)}`)}async function qu(e,t){const{setText:r,formatDateTime:n,escapeHtml:s}=t,a=e.querySelector("#index-pending-users-panel"),i=e.querySelector("#index-pending-users-body");if(!a||!i)return;const[{data:o,error:l},{data:d,error:c}]=await Promise.all([S.from("user_profiles").select("id, username, created_at").order("created_at",{ascending:!0}),S.from("user_roles").select("user_id")]);if(l||c){v("Списъкът с чакащи потребители не може да се зареди.","warning"),r(e,"#index-pending-users-count","0"),i.innerHTML='<tr><td colspan="3" class="text-secondary">Грешка при зареждане.</td></tr>';return}const u=new Set((d||[]).map(m=>String((m==null?void 0:m.user_id)||"").trim()).filter(Boolean)),h=(o||[]).filter(m=>!u.has(String((m==null?void 0:m.id)||"").trim()));if(r(e,"#index-pending-users-count",String(h.length)),!h.length){i.innerHTML='<tr><td colspan="3" class="text-secondary">Няма чакащи потребители.</td></tr>';return}i.innerHTML=h.map(m=>{const p=String((m==null?void 0:m.username)||"").trim()||String((m==null?void 0:m.id)||"-"),f=(m==null?void 0:m.created_at)||"",_=f?new Date(f):null,y=_&&!Number.isNaN(_.getTime())?n(_):"-",g=Lu(f);return`
        <tr>
          <td>${s(p)}</td>
          <td>${s(y)}</td>
          <td>${s(g)}</td>
        </tr>
      `}).join("")}function Lu(e){if(!e)return"-";const t=new Date(e);if(Number.isNaN(t.getTime()))return"-";const r=Math.max(Date.now()-t.getTime(),0),n=Math.floor(r/6e4),s=Math.floor(n/(24*60)),a=Math.floor(n%(24*60)/60),i=n%60;return s>0?`${s} д ${a} ч`:a>0?`${a} ч ${i} мин`:i>0?`${i} мин`:"под 1 мин"}function Tu(e){const{loadKpiSnapshot:t,getTodayIsoDate:r,formatDate:n,escapeHtml:s,formatMinutesAsClock:a,formatSignedMinutesAsClock:i,getDeviationClassByThreshold:o,parseIsoDateSafe:l,toMonthKey:d,getMonthBounds:c,countBulgarianWorkdays:u,getDutyTimingSummary:h,getActualDutyTimingSummary:m,getDistinctBadgeClassByReason:p}=e,f={groups:[],selectedKey:""};function _($,A,D,O){const U=$.querySelector(A);if(U){if(!D.length){U.innerHTML=`<tr><td colspan="3" class="text-secondary">${O}</td></tr>`;return}U.innerHTML=D.map(z=>`
        <tr>
          <td>${s(z.employeeName)}</td>
          <td>${s(z.certificateLabel)}</td>
          <td>${s(n(z.date))}</td>
        </tr>
      `).join("")}}function y($){const A=new Date;A.setHours(0,0,0,0);const D=new Date(A);D.setDate(D.getDate()+30);const O=[{key:"psychological_assessment_expiry",label:"Психологическа годност"},{key:"medical_certificate_expiry",label:"Медицинско"},{key:"license_expiry",label:"Лиценз"}],U=[],z=[];($||[]).forEach(H=>{const K=`${(H==null?void 0:H.first_name)||""} ${(H==null?void 0:H.last_name)||""}`.trim()||"-";O.forEach(ee=>{const R=H==null?void 0:H[ee.key];if(!R)return;const P=new Date(`${R}T00:00:00`);if(Number.isNaN(P.getTime()))return;const j={employeeName:K,certificateLabel:ee.label,date:R};if(P<A){z.push(j);return}P<=D&&U.push(j)})});const W=(H,K)=>{const ee=String(H.date).localeCompare(String(K.date));return ee!==0?ee:String(H.employeeName).localeCompare(String(K.employeeName),"bg")};return{soon:U.sort(W),expired:z.sort(W)}}function g($,A){return A?$==="expired"?"text-bg-danger":"text-bg-warning":"text-bg-secondary"}function b($,A){const D=$.querySelector("#index-certificates-soon-details"),O=$.querySelector("#index-certificates-expired-details");if(!(!D||!O)){if(A==="soon"){D.classList.toggle("d-none"),O.classList.add("d-none");return}A==="expired"&&(O.classList.toggle("d-none"),D.classList.add("d-none"))}}async function w($){const A=$.querySelector("#index-certificates-panel"),D=$.querySelector("#index-certificates-soon-toggle"),O=$.querySelector("#index-certificates-expired-toggle");if(!A||!D||!O)return;const{data:U,error:z}=await S.from("employees").select("first_name, last_name, psychological_assessment_expiry, medical_certificate_expiry, license_expiry").eq("is_active",!0).order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(z){v("Сертификатите не могат да се заредят.","warning"),D.textContent="0",O.textContent="0",D.className="badge text-bg-secondary border-0",O.className="badge text-bg-secondary border-0",_($,"#index-certificates-soon-body",[],"Няма служители."),_($,"#index-certificates-expired-body",[],"Няма служители.");return}const W=y(U||[]);D.textContent=String(W.soon.length),O.textContent=String(W.expired.length),D.className=`badge ${g("soon",W.soon.length)} border-0`,O.className=`badge ${g("expired",W.expired.length)} border-0`,_($,"#index-certificates-soon-body",W.soon,"Няма служители с изтичащи сертификати."),_($,"#index-certificates-expired-body",W.expired,"Няма служители с изтекли сертификати.")}function k($){const A=new Map;($||[]).forEach(O=>{var ee,R,P;const U=String(((ee=O==null?void 0:O.absence_reasons)==null?void 0:ee.name)||"").trim()||"Без посочена причина",z=`${((R=O==null?void 0:O.employees)==null?void 0:R.first_name)||""} ${((P=O==null?void 0:O.employees)==null?void 0:P.last_name)||""}`.trim()||"-",W=(O==null?void 0:O.start_date)||"",H=(O==null?void 0:O.end_date)||"",K=A.get(U)||{reason:U,details:[]};K.details.push({employeeName:z,startDate:W,endDate:H}),A.set(U,K)});const D=Array.from(A.values()).map(O=>({...O,details:O.details.sort((U,z)=>String(U.employeeName).localeCompare(String(z.employeeName),"bg")),count:O.details.length}));return D.sort((O,U)=>U.count!==O.count?U.count-O.count:String(O.reason).localeCompare(String(U.reason),"bg")),D}function L($,A){const D=$.querySelector("#index-absence-reasons-body");if(D){if(!A.length){D.innerHTML='<p class="text-secondary mb-0">Няма активни отсъствия.</p>';return}D.innerHTML=A.map((O,U)=>{const z=p(O.reason),W=String(U),H=W===f.selectedKey,K=O.details.map(ee=>{const R=`${n(ee.startDate)} - ${n(ee.endDate)}`;return`
              <tr>
                <td>${s(ee.employeeName)}</td>
                <td>${s(R)}</td>
              </tr>
            `}).join("");return`
          <div class="d-flex justify-content-between align-items-center border rounded p-2">
            <span>${s(O.reason)}</span>
            <button
              type="button"
              class="badge ${z} border-0"
              data-index-absence-action="toggle-reason"
              data-index-absence-key="${W}"
              aria-expanded="${H?"true":"false"}"
            >
              ${s(String(O.count))}
            </button>
          </div>
          ${H?`
            <div class="table-responsive">
              <table class="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Служител</th>
                    <th>Период</th>
                  </tr>
                </thead>
                <tbody>
                  ${K}
                </tbody>
              </table>
            </div>
          `:""}
        `}).join("")}}function x($,A){if(A===""||A===f.selectedKey){f.selectedKey="",L($,f.groups);return}if(!(f.groups[Number(A)]||null)){f.selectedKey="",L($,f.groups);return}f.selectedKey=String(A),L($,f.groups)}async function E($){const A=r(),{data:D,error:O}=await S.from("employee_absences").select("start_date, end_date, employees(first_name, last_name), absence_reasons(name)").lte("start_date",A).gte("end_date",A).order("start_date",{ascending:!0});if(O){v("Отсъствията не могат да се заредят.","warning"),f.groups=[],f.selectedKey="",L($,[]);return}f.groups=k(D||[]),f.selectedKey="",L($,f.groups)}function q($,A){const D=$.querySelector("#index-workload-body");if(D){if(!A.length){D.innerHTML='<tr><td colspan="5" class="text-secondary">Няма данни.</td></tr>';return}D.innerHTML=A.map(O=>`
        <tr>
          <td>${s(O.employeeName)}</td>
          <td>${s(O.planned)}</td>
          <td>${s(O.actual)}</td>
          <td>${s(O.norm)}</td>
          <td><span class="badge ${s(O.deviationClass)}">${s(O.deviation)}</span></td>
        </tr>
      `).join("")}}async function T($){const A=$.querySelector("#index-workload-date"),D=String((A==null?void 0:A.value)||r()),O=l(D);if(!O){q($,[]);return}const U=d(O),{startDate:z}=c(U),W=u(z,D)*8*60,[H,K,ee]=await Promise.all([S.from("employees").select("id, first_name, last_name").eq("is_active",!0).order("last_name",{ascending:!0}).order("first_name",{ascending:!0}),S.from("planned_duties").select("employee_id, date, duties(start_time, end_time, break_start_time, break_end_time)").gte("date",z).lte("date",D),S.from("actual_duties").select("employee_id, date, start_time_override, end_time_override, break_start_time_override, break_end_time_override, duties(start_time, end_time, break_start_time, break_end_time)").gte("date",z).lte("date",D)]);if(H.error||K.error||ee.error){v("Натовареността не може да се зареди.","warning"),q($,[]);return}const R=H.data||[],P=K.data||[],j=ee.data||[],B=new Map;P.forEach(N=>{const J=String((N==null?void 0:N.employee_id)||"");if(!J)return;const ie=Number(h(N==null?void 0:N.duties).durationMinutes);Number.isFinite(ie)&&B.set(J,Number(B.get(J)||0)+ie)});const Y=new Map;j.forEach(N=>{const J=String((N==null?void 0:N.employee_id)||"");if(!J)return;const ie=Number(m(N).durationMinutes);Number.isFinite(ie)&&Y.set(J,Number(Y.get(J)||0)+ie)});const te=R.map(N=>{const J=String((N==null?void 0:N.id)||""),ie=`${(N==null?void 0:N.first_name)||""} ${(N==null?void 0:N.last_name)||""}`.trim()||"-",oe=Number(B.get(J)||0),he=Number(Y.get(J)||0),Se=he-W;return{employeeName:ie,planned:a(oe),actual:a(he),norm:a(W),deviation:i(Se),deviationClass:o(Se),deviationMinutes:Se}});te.sort((N,J)=>{const ie=Math.abs(Number(J.deviationMinutes||0))-Math.abs(Number(N.deviationMinutes||0));return ie!==0?ie:String(N.employeeName).localeCompare(String(J.employeeName),"bg")}),q($,te)}async function C($){await Promise.all([t($),w($),E($),T($)])}return{toggleCertificateDetails:b,toggleAbsenceReasonDetails:x,loadHeadOfTransportWorkload:T,loadHeadOfTransportSnapshot:C}}function Eu(e){return String(e||"").trim().toLowerCase()}function Ir(e,t){const r=(e||[]).map(n=>Eu(n));return t.some(n=>r.includes(n))}function Uo(e){return Ir(e,["crew","crew_member","user"])}function $u(e){return Ir(e,["admin"])?"admin":Ir(e,["head_of_transport"])?"head_of_transport":Ir(e,["crew_instructor","instructor"])?"instructor":Ir(e,["crew_manager"])?"manager":Uo(e)?"crew":"default"}function Ct(e){return e==="head_of_transport"||e==="instructor"}function Au(e,t){const{loadCrewMonthlySnapshot:r,crewCalendarState:n,toMonthKey:s,shiftMonthKey:a,getTodayIsoDate:i,renderCrewCalendarAndDetails:o,openCrewActualDutyEditModal:l,openCrewTimetablePreview:d,closeCrewTimetablePreview:c,closeCrewActualDutyEditModal:u,saveCrewActualDutyEdits:h}=t,m=e.querySelector("#index-refresh-crew"),p=e.querySelector("#index-crew-prev-month"),f=e.querySelector("#index-crew-next-month"),_=e.querySelector("#index-crew-today-month"),y=e.querySelector("#index-crew-calendar-days"),g=e.querySelector("#index-crew-actual-body"),b=e.querySelector("#index-timetable-preview-modal"),w=e.querySelector("#index-timetable-preview-close"),k=e.querySelector("#index-actual-duty-edit-modal"),L=e.querySelector("#index-actual-duty-edit-close"),x=e.querySelector("#index-actual-duty-edit-cancel"),E=e.querySelector("#index-actual-duty-edit-form");m==null||m.addEventListener("click",async()=>{const q=e.dataset.indexMode||"default",T=e.dataset.indexEmployeeId||"";q==="crew"&&(m.disabled=!0,await r(e,T,n.visibleMonth),m.disabled=!1)}),p==null||p.addEventListener("click",async()=>{const q=e.dataset.indexMode||"default",T=e.dataset.indexEmployeeId||"";if(q!=="crew")return;const C=n.visibleMonth||s(new Date),$=a(C,-1);await r(e,T,$)}),f==null||f.addEventListener("click",async()=>{const q=e.dataset.indexMode||"default",T=e.dataset.indexEmployeeId||"";if(q!=="crew")return;const C=n.visibleMonth||s(new Date),$=a(C,1);await r(e,T,$)}),_==null||_.addEventListener("click",async()=>{const q=e.dataset.indexMode||"default",T=e.dataset.indexEmployeeId||"";if(q!=="crew")return;const C=new Date;n.visibleMonth=s(C),n.selectedDate=i(),await r(e,T,n.visibleMonth)}),y==null||y.addEventListener("click",q=>{const T=q.target.closest('button[data-index-crew-action="select-day"]');if(!T||(e.dataset.indexMode||"default")!=="crew")return;const $=T.getAttribute("data-date")||"";$&&(n.selectedDate=$,o(e))}),g==null||g.addEventListener("click",q=>{const T=q.target.closest('button[data-index-crew-action="edit-actual-duty"]');if(T){if((e.dataset.indexMode||"default")!=="crew")return;const U=T.getAttribute("data-actual-duty-id")||"";if(!U)return;l(e,U);return}const C=q.target.closest('button[data-index-crew-action="preview-timetable"]');if(!C||(e.dataset.indexMode||"default")!=="crew")return;const A=decodeURIComponent(C.getAttribute("data-preview-url")||""),D=decodeURIComponent(C.getAttribute("data-preview-label")||"");d(e,A,D)}),w==null||w.addEventListener("click",()=>{c(e)}),b==null||b.addEventListener("click",q=>{q.target===b&&c(e)}),L==null||L.addEventListener("click",()=>{u(e)}),x==null||x.addEventListener("click",()=>{u(e)}),k==null||k.addEventListener("click",q=>{q.target===k&&u(e)}),E==null||E.addEventListener("submit",async q=>{q.preventDefault(),await h(e)})}function Cu(e){const{crewCalendarState:t,ensureCrewSelectedDate:r,renderCrewCalendar:n,renderCrewHoursSummary:s,renderCrewSelectedDayDetails:a,toMonthKey:i,getMonthBounds:o,loadSchedulePublicationDates:l,loadScheduleChangesSummary:d,formatDateTime:c,setText:u}=e;function h(p){r(t.visibleMonth),n(p),s(p),a(p)}async function m(p,f,_){const y=_||t.visibleMonth||i(new Date);if(t.visibleMonth=y,!f){t.plannedRows=[],t.actualRows=[],t.actualRowsById=new Map,t.absenceRows=[],t.confirmedDates=new Set,t.pendingConfirmationDates=new Set,t.changeCountByDate=new Map,t.changeEventsByDate=new Map,t.selectedDate="",h(p),u(p,"#index-crew-last-updated","Липсва прикачен служител към профила.");return}const{startDate:g,endDate:b}=o(y),[w,k,L,x,E]=await Promise.all([S.from("planned_duties").select("date, assignment_role, duties(name, start_time, end_time, second_day, break_start_time, break_end_time)").eq("employee_id",f).gte("date",g).lte("date",b).order("date",{ascending:!0}).order("duty_id",{ascending:!0}),S.from("actual_duties").select("id, date, assignment_role, reported_at, start_time_override, end_time_override, break_start_time_override, break_end_time_override, duties(name, start_time, end_time, second_day, break_start_time, break_end_time, duty_files, duty_trains(sequence_order, trains(number, timetable_url)))").eq("employee_id",f).gte("date",g).lte("date",b).order("date",{ascending:!0}).order("reported_at",{ascending:!1}),S.from("employee_absences").select("start_date, end_date, absence_reasons(name)").eq("employee_id",f).lte("start_date",b).gte("end_date",g).order("start_date",{ascending:!0}),l(g,b),d(g,b)]);(w.error||k.error||L.error||x.error||E.error)&&v("Част от данните за моите повески не могат да се заредят.","warning");const q=x.confirmedDateSet||new Set,T=x.pendingConfirmationDateSet||new Set,C=E.changeCountByDate||new Map,$=E.changeEventsByDate||new Map;t.plannedRows=w.data||[],t.actualRows=(k.data||[]).filter(A=>q.has(String((A==null?void 0:A.date)||""))),t.actualRowsById=new Map(t.actualRows.map(A=>[String((A==null?void 0:A.id)||""),A])),t.absenceRows=L.data||[],t.confirmedDates=q,t.pendingConfirmationDates=T,t.changeCountByDate=C,t.changeEventsByDate=$,h(p),u(p,"#index-crew-last-updated",`Последно обновяване: ${c(new Date)}`)}return{loadCrewMonthlySnapshot:m,renderCrewCalendarAndDetails:h}}const Ru={БО:"text-bg-warning",ДО:"text-bg-danger",ПО:"text-bg-primary",НП:"text-bg-dark",К:"text-bg-info",ОТС:"text-bg-secondary"};function Iu(e){const{crewCalendarState:t,setText:r,getTodayIsoDate:n,toMonthKey:s,toIsoDateFromDate:a,parseMonthKey:i,formatMonthLabel:o,getMonthBounds:l,formatDate:d,formatDateTime:c,escapeHtml:u,countBulgarianWorkdays:h,getDutyTimingSummary:m,getActualDutyTimingSummary:p,formatMinutesAsClock:f,formatSignedMinutesAsClock:_,getDeviationClassByThreshold:y,formatRoleLabel:g,getDistinctBadgeClassByReason:b}=e;function w(R){return R&&t.actualRowsById.get(R)||null}function k(R,P){const j=R.querySelector("#index-actual-duty-edit-modal"),B=R.querySelector("#index-actual-duty-edit-id"),Y=R.querySelector("#index-actual-duty-start"),te=R.querySelector("#index-actual-duty-end"),N=R.querySelector("#index-actual-duty-break-start"),J=R.querySelector("#index-actual-duty-break-end"),ie=w(P);if(!j||!B||!Y||!te||!N||!J||!ie){v("Не е намерена реална повеска за редакция.","warning");return}B.value=P;const oe=p(ie);Y.value=oe.startTime==="-"?"":oe.startTime,te.value=oe.endTime==="-"?"":oe.endTime,N.value=oe.breakStartTime==="-"?"00:00":oe.breakStartTime,J.value=oe.breakEndTime==="-"?"00:00":oe.breakEndTime,t.editingActualDutyId=P,j.classList.remove("d-none")}function L(R){const P=R.querySelector("#index-actual-duty-edit-modal"),j=R.querySelector("#index-actual-duty-edit-form"),B=R.querySelector("#index-actual-duty-edit-id");j&&j.reset(),B&&(B.value=""),t.editingActualDutyId="",P==null||P.classList.add("d-none")}function x(R){if(Array.isArray(R))return R.map((j,B)=>E(j,B)).filter(j=>j.url);const P=String(R||"").trim();if(!P)return[];if(P.startsWith("["))try{const j=JSON.parse(P);if(Array.isArray(j))return j.map((B,Y)=>E(B,Y)).filter(B=>B.url)}catch{return[{url:P,label:"Разписание 1"}]}return P.split(`
`).map((j,B)=>E(j,B)).filter(j=>j.url)}function E(R,P){if(R&&typeof R=="object"&&!Array.isArray(R)){const B=String(R.url||"").trim(),Y=String(R.label||"").trim()||`Разписание ${P+1}`;return{url:B,label:Y}}return{url:String(R||"").trim(),label:`Разписание ${P+1}`}}function q(R){const P=String(R||"").trim();if(!P)return"ОТС";const j=P.toLowerCase(),B={бо:"БО",болничен:"БО","болничен отпуск":"БО",до:"ДО","допълнителен отпуск":"ДО",по:"ПО","платен отпуск":"ПО",нп:"НП","неплатен отпуск":"НП",командировка:"К"};if(B[j])return B[j];if(P.length<=4&&/^[\p{L}\p{N}]+$/u.test(P))return P.toUpperCase();const Y=P.split(/\s+/).map(te=>te.trim()).filter(Boolean);return Y.length>=2?Y.slice(0,3).map(te=>te.charAt(0).toUpperCase()).join(""):P.slice(0,2).toUpperCase()}function T(R){const P=q(R);return Ru[P]||b(R)}function C(R,P){const j=new Date(`${R}T00:00:00`),B=new Date(`${P}T00:00:00`);if(Number.isNaN(j.getTime())||Number.isNaN(B.getTime())||j>B)return[];const Y=[],te=new Date(j);for(;te<=B;)Y.push(a(te)),te.setDate(te.getDate()+1);return Y}function $(R){var P;return String(((P=R==null?void 0:R.absence_reasons)==null?void 0:P.name)||"").trim()||"Отсъствие"}function A(R){const P=String(R||"").trim();if(!P)return"";try{const B=new URL(P).pathname.split("/").pop()||"",Y=B.includes(".")?B.split(".").pop():"";return String(Y||"").toLowerCase()}catch{return""}}function D(R){const P=A(R);return["doc","docx","xls","xlsx","ppt","pptx"].includes(P)?`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(R)}`:R}function O(R,P,j){const B=R.querySelector("#index-timetable-preview-modal"),Y=R.querySelector("#index-timetable-preview-frame"),te=R.querySelector("#index-timetable-preview-title"),N=R.querySelector("#index-timetable-preview-fallback"),J=R.querySelector("#index-timetable-preview-open");if(!B||!Y||!te||!N||!J)return;const ie=String(P||"").trim();if(!ie){v("Липсва линк за преглед.","warning");return}const oe=D(ie);te.textContent=j?`Преглед: ${j}`:"Преглед на разписание",J.setAttribute("href",ie),N.classList.add("d-none"),Y.src="about:blank",Y.src=oe,Y.onload=()=>{if(oe!==ie){N.classList.add("d-none");return}const he=A(ie),Se=["doc","docx","xls","xlsx","ppt","pptx"].includes(he);N.classList.toggle("d-none",!Se)},Y.onerror=()=>{N.classList.remove("d-none")},B.classList.remove("d-none")}function U(R){const P=R.querySelector("#index-timetable-preview-modal"),j=R.querySelector("#index-timetable-preview-frame"),B=R.querySelector("#index-timetable-preview-fallback"),Y=R.querySelector("#index-timetable-preview-open");!P||!j||!B||!Y||(j.src="about:blank",Y.setAttribute("href","#"),B.classList.add("d-none"),P.classList.add("d-none"))}function z(R){const P=i(R),j=s(P),B=n(),Y=B.startsWith(j);if(t.selectedDate&&t.selectedDate.startsWith(j))return;const te=[...new Set([...t.plannedRows.map(N=>N==null?void 0:N.date).filter(Boolean),...t.actualRows.map(N=>N==null?void 0:N.date).filter(Boolean),...t.absenceRows.flatMap(N=>C(N==null?void 0:N.start_date,N==null?void 0:N.end_date))])].sort((N,J)=>String(N).localeCompare(String(J),"bg"));if(Y){t.selectedDate=B;return}if(te.length){t.selectedDate=te[0];return}t.selectedDate=`${j}-01`}function W(){const R=new Map;return t.plannedRows.forEach(P=>{const j=P==null?void 0:P.date;if(!j)return;const B=R.get(j)||{planned:0,actual:0};B.planned+=1,R.set(j,B)}),t.actualRows.forEach(P=>{const j=P==null?void 0:P.date;if(!j)return;const B=R.get(j)||{planned:0,actual:0};B.actual+=1,R.set(j,B)}),t.pendingConfirmationDates.forEach(P=>{const j=R.get(P)||{planned:0,actual:0,absences:[]};j.pendingConfirmation=!0,R.set(P,j)}),t.changeCountByDate.forEach((P,j)=>{const B=R.get(j)||{planned:0,actual:0,absences:[]};B.changeCount=Number(P||0),R.set(j,B)}),t.absenceRows.forEach(P=>{const j=$(P),B=T(j);C(P==null?void 0:P.start_date,P==null?void 0:P.end_date).forEach(Y=>{const te=R.get(Y)||{planned:0,actual:0,absences:[]};Array.isArray(te.absences)||(te.absences=[]),te.absences.some(J=>(J==null?void 0:J.reason)===j)||te.absences.push({reason:j,className:B}),R.set(Y,te)})}),R}function H(R){const P=R.querySelector("#index-crew-calendar-days");if(!P)return;const j=t.visibleMonth||s(new Date),B=i(j),Y=new Date(B.getFullYear(),B.getMonth(),1),te=Y.getDay(),N=te===0?6:te-1,J=new Date(Y);J.setDate(Y.getDate()-N);const ie=W(),oe=n();r(R,"#index-crew-month-label",o(j));const he=[];for(let Se=0;Se<42;Se+=1){const I=new Date(J);I.setDate(J.getDate()+Se);const de=`${s(I)}-${String(I.getDate()).padStart(2,"0")}`,Ge=I.getMonth()!==B.getMonth(),Le=de===t.selectedDate,Ut=de===oe,Ae=ie.get(de)||{planned:0,actual:0,absences:[]},_t=Array.isArray(Ae.absences)?Ae.absences.map(Qe=>`<span class="badge ${u(Qe.className||"text-bg-danger")}" title="${u(Qe.reason||"Отсъствие")}">${u(Qe.reason||"Отсъствие")}</span>`).join(""):"";he.push(`
        <button
          type="button"
          class="index-crew-calendar-day ${Ge?"is-other-month":""} ${Le?"is-selected":""} ${Ut?"is-today":""}"
          data-index-crew-action="select-day"
          data-date="${de}"
        >
          <span class="index-crew-calendar-day-number">${I.getDate()}</span>
          <span class="index-crew-calendar-day-flags">
            ${Ae.planned?`<span class="badge text-bg-primary">П${Ae.planned}</span>`:""}
            ${Ae.actual?`<span class="badge text-bg-success">Р${Ae.actual}</span>`:""}
            ${Ae.pendingConfirmation?'<span class="badge text-bg-warning">Промяна</span>':""}
            ${Ae.changeCount?`<span class="badge text-bg-info" title="Извършени промени за деня">Δ${u(String(Ae.changeCount))}</span>`:""}
            ${_t}
          </span>
        </button>
      `)}P.innerHTML=he.join("")}function K(R){const P=t.selectedDate,j=R.querySelector("#index-crew-planned-body"),B=R.querySelector("#index-crew-actual-body"),Y=R.querySelector("#index-crew-change-body"),te=R.querySelector("#index-crew-absence-body");if(!j||!B||!Y||!te)return;r(R,"#index-crew-selected-date-label",`Детайли за ${d(P)}`);const N=t.plannedRows.filter(I=>(I==null?void 0:I.date)===P).sort((I,re)=>{var de,Ge;return String(((de=I==null?void 0:I.duties)==null?void 0:de.start_time)||"").localeCompare(String(((Ge=re==null?void 0:re.duties)==null?void 0:Ge.start_time)||""),"bg")});N.length?j.innerHTML=N.map(I=>{var Ut,Ae,_t,Qe;const re=((Ut=I==null?void 0:I.duties)==null?void 0:Ut.name)||"-",de=g(I==null?void 0:I.assignment_role),Ge=`${((Ae=I==null?void 0:I.duties)==null?void 0:Ae.start_time)||"-"} - ${((_t=I==null?void 0:I.duties)==null?void 0:_t.end_time)||"-"}${(Qe=I==null?void 0:I.duties)!=null&&Qe.second_day?" (+1)":""}`,Le=m(I==null?void 0:I.duties);return`
            <article class="border rounded p-2">
              <div class="fw-semibold">${u(re)}</div>
              <div class="small text-secondary">${u(de)} · ${u(Ge)}</div>
              <div class="small mt-1">
                <div><span class="text-secondary">Начало:</span> ${u(Le.startTime)}</div>
                <div><span class="text-secondary">Край:</span> ${u(Le.endTime)}</div>
                <div><span class="text-secondary">Начало на прекъсване:</span> ${u(Le.breakStartTime)}</div>
                <div><span class="text-secondary">Край на прекъсване:</span> ${u(Le.breakEndTime)}</div>
                <div><span class="text-secondary">Прекъсване:</span> ${u(Le.breakDuration)}</div>
                <div><span class="text-secondary">Времетраене:</span> ${u(Le.duration)}</div>
              </div>
            </article>
          `}).join(""):j.innerHTML='<p class="text-secondary mb-0">Няма планирани повески.</p>';const J=t.actualRows.filter(I=>(I==null?void 0:I.date)===P).sort((I,re)=>String((re==null?void 0:re.reported_at)||"").localeCompare(String((I==null?void 0:I.reported_at)||""),"bg")),ie=t.confirmedDates.has(P),oe=t.pendingConfirmationDates.has(P);ie?J.length?B.innerHTML=J.map(I=>{var Ma,ja,Na,Ha;const re=((Ma=I==null?void 0:I.duties)==null?void 0:Ma.name)||"-",de=g(I==null?void 0:I.assignment_role),Ge=I!=null&&I.reported_at?c(new Date(I.reported_at)):"-",Le=p(I),Ut=Array.isArray((ja=I==null?void 0:I.duties)==null?void 0:ja.duty_trains)?[...I.duties.duty_trains].sort((Te,at)=>Number((Te==null?void 0:Te.sequence_order)||0)-Number((at==null?void 0:at.sequence_order)||0)):(Na=I==null?void 0:I.duties)!=null&&Na.duty_trains?[I.duties.duty_trains]:[],Ae=x((Ha=I==null?void 0:I.duties)==null?void 0:Ha.duty_files),_t=Ut.map(Te=>{var Ua,Fa;const at=(Ua=Te==null?void 0:Te.trains)!=null&&Ua.number?`Влак ${Te.trains.number}`:"Влак",hn=x((Fa=Te==null?void 0:Te.trains)==null?void 0:Fa.timetable_url);if(!hn.length)return`<div class="small">${u(at)}: <span class="text-secondary">без разписание</span></div>`;const _r=hn.map(ls=>{const Tl=encodeURIComponent(ls.url),El=encodeURIComponent(ls.label||"Разписание"),ds=ls.label||"Разписание";return`
                    <span class="d-inline-flex align-items-center gap-1 me-2">
                      <span>${u(ds)}</span>
                      <button
                        type="button"
                        class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
                        data-index-crew-action="preview-timetable"
                        data-preview-url="${u(Tl)}"
                        data-preview-label="${u(El)}"
                        title="Преглед: ${u(ds)}"
                        aria-label="Преглед: ${u(ds)}"
                      >
                        👁
                      </button>
                    </span>
                  `}).join(" ");return`<div class="small">${u(at)}: ${_r}</div>`}).join(""),Qe=Ae.map(Te=>{const at=encodeURIComponent(Te.url),hn=encodeURIComponent(Te.label||"Файл"),_r=Te.label||"Файл";return`
                <span class="d-inline-flex align-items-center gap-1 me-2 small">
                  <span>${u(_r)}</span>
                  <button
                    type="button"
                    class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
                    data-index-crew-action="preview-timetable"
                    data-preview-url="${u(at)}"
                    data-preview-label="${u(hn)}"
                    title="Преглед: ${u(_r)}"
                    aria-label="Преглед: ${u(_r)}"
                  >
                    👁
                  </button>
                </span>
              `}).join("");return`
            <article class="border rounded p-2">
              <div class="d-flex align-items-start justify-content-between gap-2">
                <div class="fw-semibold">${u(re)}</div>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary py-0 px-2"
                  title="Редакция на часове"
                  aria-label="Редакция на часове"
                  data-index-crew-action="edit-actual-duty"
                  data-actual-duty-id="${u(String((I==null?void 0:I.id)||""))}"
                >
                  ✎
                </button>
              </div>
              <div class="small text-secondary mb-1">${u(de)} · Отчетена: ${u(Ge)}</div>
              <div class="small mb-1">
                <div><span class="text-secondary">Начало:</span> ${u(Le.startTime)}</div>
                <div><span class="text-secondary">Край:</span> ${u(Le.endTime)}</div>
                <div><span class="text-secondary">Начало на прекъсване:</span> ${u(Le.breakStartTime)}</div>
                <div><span class="text-secondary">Край на прекъсване:</span> ${u(Le.breakEndTime)}</div>
                <div><span class="text-secondary">Прекъсване:</span> ${u(Le.breakDuration)}</div>
                <div><span class="text-secondary">Времетраене:</span> ${u(Le.duration)}</div>
              </div>
              ${_t?`<div class="small"><span class="fw-semibold">Разписания:</span> ${_t}</div>`:""}
              ${Qe?`<div class="small"><span class="fw-semibold">Файлове:</span> ${Qe}</div>`:""}
            </article>
          `}).join(""):B.innerHTML='<p class="text-secondary mb-0">Няма реални повески.</p>':B.innerHTML=oe?'<p class="text-warning mb-0">Има смяна на служител по реална повеска. Нужна е повторна валидация от разписание.</p>':'<p class="text-secondary mb-0">Графикът за деня не е потвърден от разписание.</p>';const he=t.changeEventsByDate.get(P)||[];he.length?Y.innerHTML=he.map(I=>`
          <article class="border rounded p-2">
            <div class="small">${u(I.summary||"-")}</div>
            <div class="small text-secondary">${u(I.changedAt||"-")}</div>
          </article>
        `).join(""):Y.innerHTML='<p class="text-secondary mb-0">Няма регистрирани промени за избрания ден.</p>';const Se=t.absenceRows.filter(I=>{const re=String((I==null?void 0:I.start_date)||""),de=String((I==null?void 0:I.end_date)||"");return!!(re&&de&&P>=re&&P<=de)}).sort((I,re)=>{const de=String((I==null?void 0:I.start_date)||"").localeCompare(String((re==null?void 0:re.start_date)||""),"bg");return de!==0?de:$(I).localeCompare($(re),"bg")});if(!Se.length){te.innerHTML='<p class="text-secondary mb-0">Няма отсъствия за избрания ден.</p>';return}te.innerHTML=Se.map(I=>{const re=$(I),de=T(re),Ge=`${d(I==null?void 0:I.start_date)} - ${d(I==null?void 0:I.end_date)}`;return`
          <article class="border rounded p-2">
            <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
              <span class="badge ${u(de)}">${u(re)}</span>
            </div>
            <div class="small text-secondary">Период: ${u(Ge)}</div>
          </article>
        `}).join("")}function ee(R){const P=R.querySelector("#index-crew-planned-hours-total"),j=R.querySelector("#index-crew-actual-hours-total"),B=R.querySelector("#index-crew-norm-hours-total"),Y=R.querySelector("#index-crew-deviation-hours-total");if(!P||!j||!B||!Y)return;const te=String(t.selectedDate||"").trim();if(!te){P.textContent="00:00",j.textContent="00:00",B.textContent="00:00",Y.textContent="+00:00",Y.className="fw-semibold badge text-bg-success";return}const{startDate:N}=l(t.visibleMonth||s(new Date)),J=te>=N?te:N,ie=t.plannedRows.filter(I=>{const re=String((I==null?void 0:I.date)||"");return!!(re&&re>=N&&re<=J)}).reduce((I,re)=>{const de=Number(m(re==null?void 0:re.duties).durationMinutes);return Number.isFinite(de)?I+de:I},0),oe=t.actualRows.filter(I=>{const re=String((I==null?void 0:I.date)||"");return!!(re&&re>=N&&re<=J)}).reduce((I,re)=>{const de=Number(p(re).durationMinutes);return Number.isFinite(de)?I+de:I},0),he=h(N,J)*8*60,Se=oe-he;P.textContent=f(ie),j.textContent=f(oe),B.textContent=f(he),Y.textContent=_(Se),Y.className=`fw-semibold badge ${y(Se)}`}return{openCrewActualDutyEditModal:k,closeCrewActualDutyEditModal:L,openCrewTimetablePreview:O,closeCrewTimetablePreview:U,ensureCrewSelectedDate:z,renderCrewCalendar:H,renderCrewSelectedDayDetails:K,renderCrewHoursSummary:ee}}function tr(e){const t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0");return`${t}-${r}`}function gt(e){const t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${r}-${n}`}function rs(e){const[t,r]=String(e||"").split("-"),n=Number(t),s=Number(r);if(!Number.isInteger(n)||!Number.isInteger(s)||s<1||s>12){const a=new Date;return new Date(a.getFullYear(),a.getMonth(),1)}return new Date(n,s-1,1)}function Du(e,t){const r=rs(e);return r.setMonth(r.getMonth()+t),tr(r)}function Pu(e){const t=rs(e);return new Intl.DateTimeFormat("bg-BG",{month:"long",year:"numeric"}).format(t)}function gs(e){const t=rs(e),r=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:gt(t),endDate:gt(r)}}function Jr(e){const t=String(e||"").trim();if(!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;const[r,n,s]=t.split("-"),a=Number(r),i=Number(n),o=Number(s);return!Number.isInteger(a)||!Number.isInteger(i)||!Number.isInteger(o)?null:new Date(a,i-1,o)}function Ou(e,t,r){return new Date(Date.UTC(e,t-1,r))}function Mu(e){const t=e%4,r=e%7,s=(19*(e%19)+15)%30,a=(2*t+4*r-s+34)%7,i=Math.floor((s+a+114)/31),o=(s+a+114)%31+1,l=Ou(e,i,o);return l.setUTCDate(l.getUTCDate()+13),new Date(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate())}function ju(e,t){const r=gt(t);e.add(r);const n=t.getDay();if(n!==0&&n!==6)return;const s=new Date(t);for(s.setDate(s.getDate()+1);s.getDay()===0||s.getDay()===6||e.has(gt(s));)s.setDate(s.getDate()+1);e.add(gt(s))}function Nu(e){const t=new Set;[[1,1],[3,3],[5,1],[5,6],[5,24],[9,6],[9,22],[12,24],[12,25],[12,26]].forEach(([a,i])=>{ju(t,new Date(e,a-1,i))});const n=Mu(e);return[-2,-1,0,1].forEach(a=>{const i=new Date(n);i.setDate(i.getDate()+a),t.add(gt(i))}),t}function Hu(e,t){const r=Jr(e),n=Jr(t);if(!r||!n||r>n)return new Set;const s=new Set;for(let a=r.getFullYear();a<=n.getFullYear();a+=1)Nu(a).forEach(o=>s.add(o));return s}function yi(e,t){const r=Jr(e),n=Jr(t);if(!r||!n||r>n)return 0;const s=Hu(e,t);let a=0;const i=new Date(r);for(;i<=n;){const o=i.getDay(),l=gt(i),d=o===0||o===6,c=s.has(l);!d&&!c&&(a+=1),i.setDate(i.getDate()+1)}return a}function bi(e){const t=String(e||"").trim().toLowerCase();return t==="chief"?"Началник влак":t==="conductor"?"Кондуктор":t||"-"}function Uu(e){const t=String((e==null?void 0:e.first_name)||"").trim(),r=String((e==null?void 0:e.last_name)||"").trim();return`${t} ${r}`.trim()||"-"}async function Fu(e,t,r){const{data:n,error:s}=await e.from("schedule_publications").select("schedule_date, is_confirmed").gte("schedule_date",t).lte("schedule_date",r);if(s)return{confirmedDateSet:new Set,pendingConfirmationDateSet:new Set,error:s};const a=new Set,i=new Set;return(n||[]).forEach(o=>{const l=String((o==null?void 0:o.schedule_date)||"").trim();if(l){if(o!=null&&o.is_confirmed){a.add(l);return}i.add(l)}}),{confirmedDateSet:a,pendingConfirmationDateSet:i,error:null}}async function Bu(e,t,r,n){const{data:s,error:a}=await e.from("schedule_change_events").select("schedule_date, action, old_duty_id, new_duty_id, old_employee_id, new_employee_id, old_assignment_role, new_assignment_role, changed_at").gte("schedule_date",t).lte("schedule_date",r).order("changed_at",{ascending:!1});if(a)return{changeCountByDate:new Map,changeEventsByDate:new Map,error:a};const i=new Set,o=new Set;(s||[]).forEach(p=>{p!=null&&p.old_duty_id&&i.add(p.old_duty_id),p!=null&&p.new_duty_id&&i.add(p.new_duty_id),p!=null&&p.old_employee_id&&o.add(p.old_employee_id),p!=null&&p.new_employee_id&&o.add(p.new_employee_id)});const[l,d]=await Promise.all([i.size?e.from("duties").select("id, name").in("id",Array.from(i)):Promise.resolve({data:[],error:null}),o.size?e.from("employees").select("id, first_name, last_name").in("id",Array.from(o)):Promise.resolve({data:[],error:null})]);if(l.error||d.error)return{changeCountByDate:new Map,changeEventsByDate:new Map,error:l.error||d.error};const c=new Map((l.data||[]).map(p=>[String((p==null?void 0:p.id)||""),String((p==null?void 0:p.name)||"").trim()||"-"]).filter(([p])=>p)),u=new Map((d.data||[]).map(p=>[String((p==null?void 0:p.id)||""),Uu(p)]).filter(([p])=>p)),h=new Map,m=new Map;return(s||[]).forEach(p=>{const f=String((p==null?void 0:p.schedule_date)||"").trim();if(!f)return;const _=Number(h.get(f)||0);h.set(f,_+1);const y=c.get(String((p==null?void 0:p.old_duty_id)||""))||"-",g=c.get(String((p==null?void 0:p.new_duty_id)||""))||"-",b=u.get(String((p==null?void 0:p.old_employee_id)||""))||"-",w=u.get(String((p==null?void 0:p.new_employee_id)||""))||"-",k=bi(p==null?void 0:p.old_assignment_role),L=bi(p==null?void 0:p.new_assignment_role),x=String((p==null?void 0:p.action)||"").trim().toLowerCase(),E=p!=null&&p.changed_at?n(new Date(p.changed_at)):"-";let q="";x==="insert"?q=`Добавено: ${w} | ${g} | ${L}`:x==="delete"?q=`Премахнато: ${b} | ${y} | ${k}`:q=`Промяна: ${b} | ${y} | ${k} → ${w} | ${g} | ${L}`;const T=m.get(f)||[];T.push({summary:q,changedAt:E}),m.set(f,T)}),{changeCountByDate:h,changeEventsByDate:m,error:null}}function vi(e,t){t.forEach((r,n)=>{const s=e.querySelector(`#index-kpi-label-${n+1}`);s&&(s.textContent=r)})}function Ku(e,t,r){const{setText:n,isTransportAnalyticsMode:s,getTodayIsoDate:a}=r,i=e.querySelector("#index-management-section"),o=e.querySelector("#index-crew-section"),l=e.querySelector("#index-kpi-card-planned"),d=e.querySelector("#index-kpi-card-actual"),c=e.querySelector("#index-kpi-card-absences"),u=e.querySelector("#index-kpi-card-employees"),h=e.querySelector("#index-certificates-panel"),m=e.querySelector("#index-absences-panel"),p=e.querySelector("#index-workload-panel"),f=e.querySelector("#index-pending-users-panel"),_=e.querySelector("#index-workload-date"),y=e.querySelector("#index-certificates-soon-details"),g=e.querySelector("#index-certificates-expired-details"),b=e.querySelector("#index-quick-actions"),w=(t==null?void 0:t.mode)||"default";if(n(e,"#index-management-title","Оперативен преглед за днес"),vi(e,["Планирани повески","Реални повески","Активни отсъствия","Активни служители"]),w!=="crew"){e.dataset.indexMode=w,i==null||i.classList.remove("d-none"),o==null||o.classList.add("d-none"),l==null||l.classList.remove("d-none"),d==null||d.classList.remove("d-none"),c==null||c.classList.remove("col-xl-6"),c==null||c.classList.add("col-xl-3"),u==null||u.classList.remove("col-xl-6"),u==null||u.classList.add("col-xl-3"),h==null||h.classList.add("d-none"),m==null||m.classList.add("d-none"),p==null||p.classList.add("d-none"),f==null||f.classList.add("d-none"),y==null||y.classList.add("d-none"),g==null||g.classList.add("d-none"),b&&(w==="admin"?(b.innerHTML=`
          <a href="/admin" data-link class="btn btn-outline-danger">Админ Панел</a>
          <a href="/employees" data-link class="btn btn-outline-primary">Служители</a>
        `,n(e,"#index-welcome-subtitle","Административен преглед на потребители, роли и системно състояние."),n(e,"#index-management-title","Административен преглед"),vi(e,["Профили","Потребители с роля","Профили със служител","Роли"]),f==null||f.classList.remove("d-none")):w==="manager"?(b.innerHTML=`
          <a href="/plan-schedule" data-link class="btn btn-outline-primary">План-График</a>
          <a href="/schedule" data-link class="btn btn-outline-primary">График</a>
          <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
          <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
        `,n(e,"#index-welcome-subtitle","Оперативен преглед за управление на екипи и дневни повески.")):s(w)&&(b.innerHTML=`
          <a href="/plan-schedule" data-link class="btn btn-outline-primary">План-График</a>
          <a href="/schedule" data-link class="btn btn-outline-primary">График</a>
          <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
          <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
        `,n(e,"#index-welcome-subtitle","Оперативен преглед с акцент върху празни позиции, сертификати и отсъствия."),l==null||l.classList.add("d-none"),d==null||d.classList.add("d-none"),c==null||c.classList.remove("col-xl-3"),c==null||c.classList.add("col-xl-6"),u==null||u.classList.remove("col-xl-3"),u==null||u.classList.add("col-xl-6"),h==null||h.classList.remove("d-none"),m==null||m.classList.remove("d-none"),p==null||p.classList.remove("d-none"),_&&!_.value&&(_.value=a())));return}e.dataset.indexMode="crew",e.dataset.indexEmployeeId=t.employeeId||"",i==null||i.classList.add("d-none"),o==null||o.classList.remove("d-none"),n(e,"#index-welcome-subtitle","Виждаш своя месечен календар за планирани и реални повески."),b&&(b.innerHTML=`
      <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
      <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
    `)}const rr={visibleMonth:"",selectedDate:"",plannedRows:[],actualRows:[],actualRowsById:new Map,absenceRows:[],confirmedDates:new Set,pendingConfirmationDates:new Set,changeCountByDate:new Map,changeEventsByDate:new Map,editingActualDutyId:""},zu=-20*60,Wu=30*60;function nr(){return new Date().toISOString().slice(0,10)}function Hr(e){return new Intl.DateTimeFormat("bg-BG",{dateStyle:"medium",timeStyle:"short"}).format(e)}function gi(e){return e?new Intl.DateTimeFormat("bg-BG",{dateStyle:"medium"}).format(new Date(`${e}T00:00:00`)):"-"}function Fs(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Dr(e){return e==null||e===""?"":jt(String(e))||""}function xn(e){const t=Dr(e);return t?t.slice(0,5):"-"}function Fn(e){const t=Number(e);if(!Number.isFinite(t)||t<0)return"-";const r=Math.floor(t/60),n=t%60;return`${String(r).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function _i(e){const t=Number(e);if(!Number.isFinite(t))return"-";const r=t<0?"-":"+",n=Math.abs(t),s=Math.floor(n/60),a=n%60;return`${r}${String(s).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function wi(e){const t=Number(e||0);return Number.isFinite(t)?t<zu||t>Wu?"text-bg-danger":"text-bg-success":"text-bg-secondary"}function Bs(e){const t=Dr(e==null?void 0:e.start_time),r=Dr(e==null?void 0:e.end_time),n=Dr(e==null?void 0:e.break_start_time),s=Dr(e==null?void 0:e.break_end_time),a=n&&s?Re(n,s):null,i=t&&r?Re(t,r):null,o=Number.isFinite(i)&&Number.isFinite(a)?Math.max(0,i-a):null;return{startTime:xn(e==null?void 0:e.start_time),endTime:xn(e==null?void 0:e.end_time),breakStartTime:xn(e==null?void 0:e.break_start_time),breakEndTime:xn(e==null?void 0:e.break_end_time),breakDuration:a===null?"-":Fn(a),duration:o===null?"-":Fn(o),breakDurationMinutes:a,durationMinutes:o}}function Si(e){const t=(e==null?void 0:e.duties)||{};return Bs({start_time:(e==null?void 0:e.start_time_override)??(t==null?void 0:t.start_time),end_time:(e==null?void 0:e.end_time_override)??(t==null?void 0:t.end_time),break_start_time:(e==null?void 0:e.break_start_time_override)??(t==null?void 0:t.break_start_time),break_end_time:(e==null?void 0:e.break_end_time_override)??(t==null?void 0:t.break_end_time)})}function qn(e){return e?`${String(e).slice(0,5)}:00`:null}async function Vu(e,t,r){var f,_,y,g,b;if((e.dataset.indexMode||"default")!=="crew")return;const s=e.dataset.indexEmployeeId||"",a=(((f=e.querySelector("#index-actual-duty-edit-id"))==null?void 0:f.value)||"").trim(),i=(((_=e.querySelector("#index-actual-duty-start"))==null?void 0:_.value)||"").trim(),o=(((y=e.querySelector("#index-actual-duty-end"))==null?void 0:y.value)||"").trim(),l=(((g=e.querySelector("#index-actual-duty-break-start"))==null?void 0:g.value)||"").trim(),d=(((b=e.querySelector("#index-actual-duty-break-end"))==null?void 0:b.value)||"").trim(),c=e.querySelector("#index-actual-duty-edit-save");if(!a||!i||!o||!l||!d){v("Попълни всички полета.","warning");return}const u=Re(i,o);if(Re(l,d)>u){v("Прекъсването не може да е по-голямо от продължителността.","warning");return}const m=(c==null?void 0:c.innerHTML)||"Запази";c&&(c.disabled=!0,c.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...');const{error:p}=await S.from("actual_duties").update({start_time_override:qn(i),end_time_override:qn(o),break_start_time_override:qn(l),break_end_time_override:qn(d)}).eq("id",a);if(c&&(c.disabled=!1,c.innerHTML=m),p){v(p.message||"Редакцията не беше запазена.","error");return}r(e),await t(e,s,rr.visibleMonth),v("Реалната повеска е обновена.","success")}function Gu(e){const t=normalizeRole(e);return t==="chief"?"Началник влак":t==="conductor"?"Кондуктор":t==="driver"?"Машинист":t==="assistant_driver"?"Пом. машинист":"Кондуктор"}function Me(e,t,r){const n=e.querySelector(t);n&&(n.textContent=r)}async function Ju(e){const{data:t}=await S.auth.getSession(),r=(t==null?void 0:t.session)||null,n=(r==null?void 0:r.user)||null;if(!(n!=null&&n.id))return Me(e,"#index-welcome-title","Добре дошъл в TrainCrewHub"),Me(e,"#index-welcome-subtitle","Влез в профила си, за да видиш персонална информация."),{userId:"",employeeId:"",roles:[],crew:!1,mode:"default"};const[{data:s},{data:a}]=await Promise.all([S.from("user_profiles").select("username, employee_id, employees(first_name, last_name)").eq("id",n.id).maybeSingle(),S.from("user_roles").select("role").eq("user_id",n.id)]),i=(s==null?void 0:s.username)||n.email||n.id,o=s!=null&&s.employees?`${s.employees.first_name||""} ${s.employees.last_name||""}`.trim():"",l=[...new Set((a||[]).map(c=>String((c==null?void 0:c.role)||"").trim()).filter(Boolean))],d=$u(l);return Me(e,"#index-welcome-title",`Здравей, ${i}${o?` | ${o}`:""}`),Me(e,"#index-welcome-subtitle","Тук виждаш твоя профил и бърз оперативен преглед за деня."),{userId:n.id,employeeId:(s==null?void 0:s.employee_id)||"",roles:l,crew:Uo(l),mode:d}}function ki(e){const t=["text-bg-primary","text-bg-success","text-bg-warning","text-bg-danger","text-bg-info","text-bg-dark"],r=String(e||"").trim().toLowerCase();if(!r)return t[0];const n={бо:"text-bg-warning",do:"text-bg-danger",до:"text-bg-danger",болничен:"text-bg-warning",отпуск:"text-bg-primary",командировка:"text-bg-info"};if(n[r])return n[r];let s=0;for(let a=0;a<r.length;a+=1)s=(s*31+r.charCodeAt(a))%2147483647;return t[Math.abs(s)%t.length]}async function Ks(e){var c;const t=nr(),[r,n,s,a,i]=await Promise.all([S.from("planned_duties").select("id",{count:"exact",head:!0}).eq("date",t),S.from("actual_duties").select("id",{count:"exact",head:!0}).eq("date",t),S.from("employee_absences").select("id",{count:"exact",head:!0}).lte("start_date",t).gte("end_date",t),S.from("employees").select("id",{count:"exact",head:!0}).eq("is_active",!0),S.from("schedule_publications").select("is_confirmed").eq("schedule_date",t).maybeSingle()]);[r,n,s,a,i].some(u=>u.error)&&v("Част от данните за индекс страницата не могат да се заредят.","warning");const d=!!((c=i==null?void 0:i.data)!=null&&c.is_confirmed)?Number(n.count??0):0;Me(e,"#index-kpi-planned",String(r.count??0)),Me(e,"#index-kpi-actual",String(d)),Me(e,"#index-kpi-absences",String(s.count??0)),Me(e,"#index-kpi-employees",String(a.count??0)),Me(e,"#index-last-updated",`Последно обновяване: ${Hr(new Date)}`)}async function Fo(e){await xu(e,{setText:Me,formatDateTime:Hr,escapeHtml:Fs})}function Qu(e,t,r,n){const s=e.querySelector("#index-refresh"),a=e.querySelector("#index-certificates-panel"),i=e.querySelector("#index-absences-panel"),o=e.querySelector("#index-workload-date"),l=e.querySelector("#index-workload-refresh"),{loadCrewMonthlySnapshot:d,renderCrewCalendarAndDetails:c}=r,{openCrewActualDutyEditModal:u,openCrewTimetablePreview:h,closeCrewTimetablePreview:m,closeCrewActualDutyEditModal:p}=n;Au(e,{loadCrewMonthlySnapshot:d,crewCalendarState:rr,toMonthKey:tr,shiftMonthKey:Du,getTodayIsoDate:nr,renderCrewCalendarAndDetails:c,openCrewActualDutyEditModal:u,openCrewTimetablePreview:h,closeCrewTimetablePreview:m,closeCrewActualDutyEditModal:p,saveCrewActualDutyEdits:f=>Vu(f,d,p)}),s==null||s.addEventListener("click",async()=>{const f=e.dataset.indexMode||"default";if(f==="admin"){s.disabled=!0,await Fo(e),s.disabled=!1;return}if(Ct(f)){s.disabled=!0,await t.loadHeadOfTransportSnapshot(e),s.disabled=!1;return}f!=="crew"&&(s.disabled=!0,await Ks(e),s.disabled=!1)}),a==null||a.addEventListener("click",f=>{const _=f.target.closest("button[data-index-cert-action]");if(!_)return;const y=e.dataset.indexMode||"default";if(!Ct(y))return;const g=_.getAttribute("data-index-cert-action")||"";if(g==="toggle-soon"){t.toggleCertificateDetails(e,"soon");return}g==="toggle-expired"&&t.toggleCertificateDetails(e,"expired")}),i==null||i.addEventListener("click",f=>{const _=f.target.closest("button[data-index-absence-action]");if(!_)return;const y=e.dataset.indexMode||"default";if(!Ct(y)||(_.getAttribute("data-index-absence-action")||"")!=="toggle-reason")return;const b=_.getAttribute("data-index-absence-key")||"";t.toggleAbsenceReasonDetails(e,b)}),o==null||o.addEventListener("change",async()=>{const f=e.dataset.indexMode||"default";Ct(f)&&await t.loadHeadOfTransportWorkload(e)}),l==null||l.addEventListener("click",async()=>{const f=e.dataset.indexMode||"default";Ct(f)&&(l.disabled=!0,await t.loadHeadOfTransportWorkload(e),l.disabled=!1)})}async function Yu(e){e.innerHTML=ku;const t=Tu({loadKpiSnapshot:Ks,getTodayIsoDate:nr,formatDate:gi,escapeHtml:Fs,formatMinutesAsClock:Fn,formatSignedMinutesAsClock:_i,getDeviationClassByThreshold:wi,parseIsoDateSafe:Jr,toMonthKey:tr,getMonthBounds:gs,countBulgarianWorkdays:yi,getDutyTimingSummary:Bs,getActualDutyTimingSummary:Si,getDistinctBadgeClassByReason:ki}),r=Iu({crewCalendarState:rr,setText:Me,getTodayIsoDate:nr,toMonthKey:tr,toIsoDateFromDate:gt,parseMonthKey:rs,formatMonthLabel:Pu,getMonthBounds:gs,formatDate:gi,formatDateTime:Hr,escapeHtml:Fs,countBulgarianWorkdays:yi,getDutyTimingSummary:Bs,getActualDutyTimingSummary:Si,formatMinutesAsClock:Fn,formatSignedMinutesAsClock:_i,getDeviationClassByThreshold:wi,formatRoleLabel:Gu,getDistinctBadgeClassByReason:ki}),n=Cu({crewCalendarState:rr,ensureCrewSelectedDate:r.ensureCrewSelectedDate,renderCrewCalendar:r.renderCrewCalendar,renderCrewHoursSummary:r.renderCrewHoursSummary,renderCrewSelectedDayDetails:r.renderCrewSelectedDayDetails,toMonthKey:tr,getMonthBounds:gs,loadSchedulePublicationDates:(a,i)=>Fu(S,a,i),loadScheduleChangesSummary:(a,i)=>Bu(S,a,i,Hr),formatDateTime:Hr,setText:Me});Qu(e,t,n,r);const s=await Ju(e);if(Ku(e,s,{setText:Me,isTransportAnalyticsMode:Ct,getTodayIsoDate:nr}),(s==null?void 0:s.mode)==="crew"){const a=tr(new Date);rr.visibleMonth=a,rr.selectedDate=nr(),await n.loadCrewMonthlySnapshot(e,s.employeeId||"",a);return}if((s==null?void 0:s.mode)==="admin"){await Fo(e);return}if(Ct((s==null?void 0:s.mode)||"default")){await t.loadHeadOfTransportSnapshot(e);return}await Ks(e)}const Xu=`<section class="card border-0 shadow-sm" style="max-width: 400px; margin: 0 auto;">\r
  <div class="card-body p-4">\r
    <h1 class="h4 mb-4 text-center">Вход</h1>\r
    \r
    <form id="login-form" class="needs-validation" novalidate>\r
      <div class="mb-3">\r
        <label for="identifier" class="form-label">Имейл или потребителско име</label>\r
        <input\r
          type="text"\r
          class="form-control"\r
          id="identifier"\r
          name="identifier"\r
          placeholder="email@domain.com или username"\r
          required\r
        />\r
      </div>\r
      \r
      <div class="mb-3">\r
        <label for="password" class="form-label">Парола</label>\r
        <div class="input-group">\r
          <input\r
            type="password"\r
            class="form-control"\r
            id="password"\r
            name="password"\r
            placeholder="••••••••"\r
            required\r
          />\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary"\r
            data-toggle-password="password"\r
            aria-label="Покажи паролата"\r
          >\r
            👁\r
          </button>\r
        </div>\r
        <div class="mt-2 text-end">\r
          <a href="/forgot-password" data-link class="small text-primary">Забравена парола?</a>\r
        </div>\r
      </div>\r
      \r
      <button type="submit" class="btn btn-primary w-100">Вход</button>\r
    </form>\r
    \r
    <div class="mt-3 text-center">\r
      <p class="text-secondary small">\r
        Нямаш акаунт?\r
        <a href="/register" data-link class="text-primary fw-semibold">Регистрирай се</a>\r
      </p>\r
    </div>\r
  </div>\r
</section>\r
`;async function Zu({attempts:e=10,delayMs:t=120}={}){var r,n;for(let s=0;s<e;s+=1){const{data:a}=await S.auth.getSession();if((n=(r=a==null?void 0:a.session)==null?void 0:r.user)!=null&&n.id)return!0;await new Promise(i=>{window.setTimeout(i,t)})}return!1}async function ep(e){e.innerHTML=Xu,tp(e),rp(e)}function tp(e){e.querySelectorAll("button[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const r=t.getAttribute("data-toggle-password")||"",n=e.querySelector(`#${r}`);if(!n)return;const s=n.type==="password";n.type=s?"text":"password",t.textContent=s?"🙈":"👁",t.setAttribute("aria-label",s?"Скрий паролата":"Покажи паролата")})})}function rp(e){const t=e.querySelector("#login-form");t&&t.addEventListener("submit",async r=>{var h,m,p,f,_;r.preventDefault();const n=t.querySelector('input[name="identifier"]').value.trim(),s=t.querySelector('input[name="password"]').value;if(!n||!s){v("Попълни имейл/потребителско име и парола.","warning");return}let a=n;if(!n.includes("@")){const{data:y}=await S.rpc("resolve_login_email",{input_username:n});y&&(a=String(y).trim())}const i=t.querySelector('button[type="submit"]'),o=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Влизане...';const{data:l,error:d}=await S.auth.signInWithPassword({email:a,password:s});if(i.disabled=!1,i.innerHTML=o,d){v("Невалидни данни за вход.","error");return}const c=((h=l==null?void 0:l.user)==null?void 0:h.id)||((p=(m=l==null?void 0:l.session)==null?void 0:m.user)==null?void 0:p.id)||"";if(c&&!await Oo(c)){await S.auth.signOut(),v("Профилът е деактивиран. Свържи се с администратор.","warning");return}if(v("Успешен вход.","success"),!(!!((_=(f=l==null?void 0:l.session)==null?void 0:f.user)!=null&&_.id)||await Zu())){v("Влизането е успешно, но сесията не е активирана. Опитай отново.","warning");return}window.history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))})}const np=`<section class="card border-0 shadow-sm" style="max-width: 400px; margin: 0 auto;">\r
  <div class="card-body p-4">\r
    <h1 class="h4 mb-4 text-center">Регистрация</h1>\r
    \r
    <form id="register-form" class="needs-validation" novalidate>\r
      <div class="mb-3">\r
        <label for="username" class="form-label">Потребителско име</label>\r
        <input\r
          type="text"\r
          class="form-control"\r
          id="username"\r
          name="username"\r
          placeholder="username"\r
          minlength="3"\r
          maxlength="30"\r
          pattern="^[A-Za-z0-9_]{3,30}$"\r
          title="Потребителското име трябва да е между 3 и 30 символа и да съдържа само латински букви, цифри и _"\r
          autocomplete="username"\r
          required\r
        />\r
        <div class="form-text">3-30 символа: латински букви, цифри и _</div>\r
      </div>\r
\r
      <div class="mb-3">\r
        <label for="email" class="form-label">Имейл</label>\r
        <input\r
          type="email"\r
          class="form-control"\r
          id="email"\r
          name="email"\r
          placeholder="your@email.com"\r
          required\r
        />\r
      </div>\r
\r
      <div class="mb-3">\r
        <label for="first_name" class="form-label">Собствено име</label>\r
        <input\r
          type="text"\r
          class="form-control"\r
          id="first_name"\r
          name="first_name"\r
          placeholder="Собствено име"\r
          required\r
        />\r
      </div>\r
\r
      <div class="mb-3">\r
        <label for="last_name" class="form-label">Фамилия</label>\r
        <input\r
          type="text"\r
          class="form-control"\r
          id="last_name"\r
          name="last_name"\r
          placeholder="Фамилия"\r
          required\r
        />\r
      </div>\r
      \r
      <div class="mb-3">\r
        <label for="password" class="form-label">Парола</label>\r
        <div class="input-group">\r
          <input\r
            type="password"\r
            class="form-control"\r
            id="password"\r
            name="password"\r
            placeholder="••••••••"\r
            pattern="^(?!.*[\\u0400-\\u04FF]).*$"\r
            title="Паролата не трябва да съдържа кирилица"\r
            required\r
          />\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary"\r
            data-toggle-password="password"\r
            aria-label="Покажи паролата"\r
          >\r
            👁\r
          </button>\r
        </div>\r
      </div>\r
      \r
      <div class="mb-3">\r
        <label for="confirm-password" class="form-label">Потвърди парола</label>\r
        <div class="input-group">\r
          <input\r
            type="password"\r
            class="form-control"\r
            id="confirm-password"\r
            name="confirm-password"\r
            placeholder="••••••••"\r
            pattern="^(?!.*[\\u0400-\\u04FF]).*$"\r
            title="Паролата не трябва да съдържа кирилица"\r
            required\r
          />\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary"\r
            data-toggle-password="confirm-password"\r
            aria-label="Покажи потвърждението на паролата"\r
          >\r
            👁\r
          </button>\r
        </div>\r
      </div>\r
      \r
      <button type="submit" class="btn btn-primary w-100">Създай акаунт</button>\r
    </form>\r
    \r
    <div class="mt-3 text-center">\r
      <p class="text-secondary small">\r
        Вече имаш акаунт?\r
        <a href="/login" data-link class="text-primary fw-semibold">Влез оттук</a>\r
      </p>\r
    </div>\r
  </div>\r
</section>\r
`;async function sp(e){e.innerHTML=np,ap(e),ip(e)}function ap(e){e.querySelectorAll("button[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const r=t.getAttribute("data-toggle-password")||"",n=e.querySelector(`#${r}`);if(!n)return;const s=n.type==="password";n.type=s?"text":"password",t.textContent=s?"🙈":"👁";const a=r.includes("confirm"),i=a?"Покажи потвърждението на паролата":"Покажи паролата",o=a?"Скрий потвърждението на паролата":"Скрий паролата";t.setAttribute("aria-label",s?o:i)})})}function ip(e){const t=e.querySelector("#register-form");t&&t.addEventListener("submit",async r=>{var y;r.preventDefault();const n=t.querySelector('input[name="username"]').value.trim(),s=t.querySelector('input[name="email"]').value.trim(),a=t.querySelector('input[name="first_name"]').value.trim(),i=t.querySelector('input[name="last_name"]').value.trim(),o=t.querySelector('input[name="password"]').value,l=t.querySelector('input[name="confirm-password"]').value;if(!n||!s||!a||!i||!o||!l){v("Моля, попълни всички полета.","warning");return}if(!/^[A-Za-z0-9_]{3,30}$/.test(n)){v("Потребителското име трябва да е 3-30 символа и да съдържа само латински букви, цифри и _.","warning");return}const c=/[\u0400-\u04FF]/;if(c.test(o)||c.test(l)){v("Паролата не трябва да съдържа кирилица.","warning");return}if(o!==l){v("Паролите не съвпадат.","warning");return}const u=t.querySelector('button[type="submit"]'),h=u.innerHTML;u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Регистрация...';const{data:m,error:p}=await S.auth.signUp({email:s,password:o,options:{data:{username:n,first_name:a,last_name:i}}});if(p){u.disabled=!1,u.innerHTML=h,v(p.message,"error");return}const f=(y=m.user)==null?void 0:y.id;if(f){const{error:g}=await S.from("user_profiles").upsert({id:f,username:n,email:s,first_name:a,last_name:i,created_from:s},{onConflict:"id"});if(g){u.disabled=!1,u.innerHTML=h,v(g.message,"error");return}}if(!!!m.session){const{error:g}=await S.auth.signInWithPassword({email:s,password:o});if(g){u.disabled=!1,u.innerHTML=h,v("Регистрацията е успешна, но автоматичният вход е достъпен след имейл потвърждение.","warning"),window.history.pushState({},"","/login"),window.dispatchEvent(new PopStateEvent("popstate"));return}}u.disabled=!1,u.innerHTML=h,v("Регистрацията е успешна. Вече си влязъл в системата.","success"),window.history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))})}const op=`<section class="card border-0 shadow-sm" style="max-width: 440px; margin: 0 auto;">\r
  <div class="card-body p-4">\r
    <h1 class="h4 mb-3 text-center">Възстановяване на парола</h1>\r
    <p class="text-secondary small mb-4 text-center">\r
      Въведи имейл или потребителско име. Ако акаунтът съществува, ще получиш линк за смяна на паролата.\r
    </p>\r
\r
    <form id="forgot-password-form" class="needs-validation" novalidate>\r
      <div class="mb-3">\r
        <label for="forgot-identifier" class="form-label">Имейл или потребителско име</label>\r
        <input\r
          type="text"\r
          class="form-control"\r
          id="forgot-identifier"\r
          name="identifier"\r
          placeholder="email@domain.com или username"\r
          required\r
        />\r
      </div>\r
\r
      <button type="submit" class="btn btn-primary w-100">Изпрати линк</button>\r
    </form>\r
\r
    <div class="mt-3 text-center">\r
      <a href="/login" data-link class="text-primary fw-semibold">Назад към вход</a>\r
    </div>\r
  </div>\r
</section>\r
`;function lp(){return`${window.location.origin}/reset-password`}async function dp(e){if(e.includes("@"))return e;const{data:t}=await S.rpc("resolve_login_email",{input_username:e});return String(t||"").trim()}async function cp(e){e.innerHTML=op;const t=e.querySelector("#forgot-password-form");t&&t.addEventListener("submit",async r=>{var i;r.preventDefault();const n=(((i=t.querySelector('input[name="identifier"]'))==null?void 0:i.value)||"").trim();if(!n){v("Въведи имейл или потребителско име.","warning");return}const s=t.querySelector('button[type="submit"]'),a=(s==null?void 0:s.innerHTML)||"Изпрати линк";s&&(s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изпращане...');try{const o=await dp(n);o&&await S.auth.resetPasswordForEmail(o,{redirectTo:lp()})}catch{}s&&(s.disabled=!1,s.innerHTML=a),v("Ако акаунтът съществува, изпратихме инструкции за смяна на паролата.","success"),t.reset()})}const up=`<section class="card border-0 shadow-sm" style="max-width: 460px; margin: 0 auto;">\r
  <div class="card-body p-4">\r
    <h1 class="h4 mb-3 text-center">Задай нова парола</h1>\r
    <p id="reset-password-info" class="text-secondary small mb-4 text-center">\r
      Отвори страницата през линка от имейла за възстановяване.\r
    </p>\r
\r
    <form id="reset-password-form" class="needs-validation" novalidate>\r
      <div class="mb-3">\r
        <label for="reset-password" class="form-label">Нова парола</label>\r
        <div class="input-group">\r
          <input\r
            type="password"\r
            class="form-control"\r
            id="reset-password"\r
            name="password"\r
            minlength="6"\r
            pattern="^(?!.*[\\u0400-\\u04FF]).*$"\r
            title="Паролата не трябва да съдържа кирилица"\r
            required\r
          />\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary"\r
            data-toggle-password="reset-password"\r
            aria-label="Покажи новата парола"\r
          >\r
            👁\r
          </button>\r
        </div>\r
      </div>\r
\r
      <div class="mb-3">\r
        <label for="reset-password-confirm" class="form-label">Потвърди нова парола</label>\r
        <div class="input-group">\r
          <input\r
            type="password"\r
            class="form-control"\r
            id="reset-password-confirm"\r
            name="confirm-password"\r
            minlength="6"\r
            pattern="^(?!.*[\\u0400-\\u04FF]).*$"\r
            title="Паролата не трябва да съдържа кирилица"\r
            required\r
          />\r
          <button\r
            type="button"\r
            class="btn btn-outline-secondary"\r
            data-toggle-password="reset-password-confirm"\r
            aria-label="Покажи потвърждението на новата парола"\r
          >\r
            👁\r
          </button>\r
        </div>\r
      </div>\r
\r
      <button id="reset-password-submit" type="submit" class="btn btn-primary w-100" disabled>Запази нова парола</button>\r
    </form>\r
\r
    <div class="mt-3 text-center">\r
      <a href="/login" data-link class="text-primary fw-semibold">Към вход</a>\r
    </div>\r
  </div>\r
</section>\r
`;function pp(e){e.querySelectorAll("button[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const r=t.getAttribute("data-toggle-password")||"",n=e.querySelector(`#${r}`);if(!n)return;const s=n.type==="password";n.type=s?"text":"password",t.textContent=s?"🙈":"👁";const a=r.includes("confirm"),i=a?"Покажи потвърждението на новата парола":"Покажи новата парола",o=a?"Скрий потвърждението на новата парола":"Скрий новата парола";t.setAttribute("aria-label",s?o:i)})})}function hp(){const e=String(window.location.hash||"").replace(/^#/,""),t=new URLSearchParams(e);return{accessToken:t.get("access_token")||"",refreshToken:t.get("refresh_token")||"",type:t.get("type")||""}}async function mp(){const t=new URLSearchParams(window.location.search).get("code")||"";if(t){const{error:s}=await S.auth.exchangeCodeForSession(t);if(!s)return!0}const r=hp();if(r.type!=="recovery"||!r.accessToken||!r.refreshToken)return!1;const{error:n}=await S.auth.setSession({access_token:r.accessToken,refresh_token:r.refreshToken});return n?!1:(window.history.replaceState({},"","/reset-password"),!0)}async function fp(e){var i,o;e.innerHTML=up,pp(e);const t=e.querySelector("#reset-password-info"),r=e.querySelector("#reset-password-submit"),n=e.querySelector("#reset-password-form"),{data:s}=await S.auth.getSession();let a=!!((o=(i=s==null?void 0:s.session)==null?void 0:i.user)!=null&&o.id);if(a||(a=await mp()),!a){t&&(t.textContent="Линкът е невалиден или е изтекъл. Заяви нов линк за възстановяване.",t.className="text-warning small mb-4 text-center"),r&&(r.disabled=!0);return}t&&(t.textContent="Въведи нова парола за профила си."),r&&(r.disabled=!1),n==null||n.addEventListener("submit",async l=>{var p,f;l.preventDefault();const d=(((p=e.querySelector("#reset-password"))==null?void 0:p.value)||"").trim(),c=(((f=e.querySelector("#reset-password-confirm"))==null?void 0:f.value)||"").trim();if(!d||!c){v("Попълни и двете полета за парола.","warning");return}if(d.length<6){v("Паролата трябва да е поне 6 символа.","warning");return}const u=/[\u0400-\u04FF]/;if(u.test(d)||u.test(c)){v("Паролата не трябва да съдържа кирилица.","warning");return}if(d!==c){v("Паролите не съвпадат.","warning");return}const h=(r==null?void 0:r.innerHTML)||"Запази нова парола";r&&(r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...');const{error:m}=await S.auth.updateUser({password:d});if(r&&(r.disabled=!1,r.innerHTML=h),m){v(m.message||"Неуспешна смяна на паролата.","error");return}v("Паролата е сменена успешно.","success"),window.history.pushState({},"","/login"),window.dispatchEvent(new PopStateEvent("popstate"))})}const yp=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5 text-center">\r
    <h1 class="h4 mb-3">Акаунтът чака одобрение</h1>\r
    <p class="text-secondary mb-4">\r
      Нямаш активна роля в системата. Моля, изчакай администратор да ти присвои роля.\r
    </p>\r
    <div class="d-flex flex-wrap justify-content-center gap-2">\r
      <button type="button" class="btn btn-outline-secondary" id="pending-access-refresh">Опресни</button>\r
      <button type="button" class="btn btn-primary" id="pending-access-logout">Изход</button>\r
    </div>\r
  </div>\r
</section>\r
`,bp=3e4;let In=null,Ur=null;function xi(){In&&(window.clearInterval(In),In=null),Ur&&(window.removeEventListener("route:changed",Ur),Ur=null)}function qi(){window.location.pathname==="/pending-access"&&window.dispatchEvent(new PopStateEvent("popstate"))}async function vp(e){xi(),e.innerHTML=yp;const t=e.querySelector("#pending-access-refresh"),r=e.querySelector("#pending-access-logout");t==null||t.addEventListener("click",()=>{qi()}),r==null||r.addEventListener("click",async()=>{const{error:n}=await S.auth.signOut();if(n){v(n.message,"error");return}v("Излезе успешно от системата.","success"),window.history.replaceState({},"","/login"),window.dispatchEvent(new PopStateEvent("popstate"))}),In=window.setInterval(()=>{qi()},bp),Ur=()=>{window.location.pathname!=="/pending-access"&&xi()},window.addEventListener("route:changed",Ur)}const gp=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Ключ-График</h1>\r
      <button id="open-create-schedule-key" type="button" class="btn btn-primary">Нов Ключ-График</button>\r
    </div>\r
\r
    <p class="text-secondary">Списък с активни и архивни ключове на графици.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
        <button id="filter-reset" type="button" class="btn btn-sm btn-outline-secondary">Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3">\r
        <div class="col-md-4">\r
          <label for="filter-name" class="form-label">Наименование</label>\r
          <input id="filter-name" class="form-control form-control-sm" type="text" placeholder="Търси по име" />\r
        </div>\r
        <div class="col-md-2">\r
          <label for="filter-type" class="form-label">Тип</label>\r
          <select id="filter-type" class="form-select form-select-sm">\r
            <option value="">Всички</option>\r
            <option value="seasonal">seasonal</option>\r
            <option value="ad-hoc">ad-hoc</option>\r
            <option value="temporary">temporary</option>\r
          </select>\r
        </div>\r
        <div class="col-md-2">\r
          <label for="filter-crew-role" class="form-label">Екип</label>\r
          <select id="filter-crew-role" class="form-select form-select-sm">\r
            <option value="">Всички</option>\r
            <option value="началник влак">Началник влак</option>\r
            <option value="кондуктор">Кондуктор</option>\r
          </select>\r
        </div>\r
        <div class="col-md-2">\r
          <label for="filter-active" class="form-label">Активен</label>\r
          <select id="filter-active" class="form-select form-select-sm">\r
            <option value="">Всички</option>\r
            <option value="true">Да</option>\r
            <option value="false">Не</option>\r
          </select>\r
        </div>\r
        <div class="col-md-2">\r
          <label for="filter-valid-from" class="form-label">От дата</label>\r
          <input id="filter-valid-from" class="form-control form-control-sm" type="date" />\r
        </div>\r
        <div class="col-md-2">\r
          <label for="filter-valid-to" class="form-label">До дата</label>\r
          <input id="filter-valid-to" class="form-control form-control-sm" type="date" />\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th>Наименование</th>\r
            <th>Тип</th>\r
            <th>Екип</th>\r
            <th>Активен</th>\r
            <th>От дата</th>\r
            <th>До дата</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="schedule-keys-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="schedule-keys-empty" class="text-secondary d-none mb-0"></p>\r
  </div>\r
</section>\r
\r
<div id="schedule-key-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="schedule-keys-form-title" class="h5 mb-0">Нов Ключ-График</h2>\r
          <button id="schedule-key-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="schedule-keys-form">\r
          <input type="hidden" id="schedule-key-id" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-6">\r
              <label for="schedule-key-name" class="form-label">Наименование</label>\r
              <input id="schedule-key-name" class="form-control" type="text" required />\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="schedule-key-type" class="form-label">Тип</label>\r
              <select id="schedule-key-type" class="form-select" required>\r
                <option value="seasonal">seasonal</option>\r
                <option value="ad-hoc">ad-hoc</option>\r
                <option value="temporary">temporary</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="schedule-key-crew-role" class="form-label">Екип</label>\r
              <select id="schedule-key-crew-role" class="form-select" required>\r
                <option value="началник влак">Началник влак</option>\r
                <option value="кондуктор">Кондуктор</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-3 d-flex align-items-end">\r
              <div class="form-check mb-2">\r
                <input class="form-check-input" type="checkbox" id="schedule-key-active" checked />\r
                <label class="form-check-label" for="schedule-key-active">Активен</label>\r
              </div>\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="schedule-key-valid-from" class="form-label">От дата</label>\r
              <input id="schedule-key-valid-from" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="schedule-key-valid-to" class="form-label">До дата</label>\r
              <input id="schedule-key-valid-to" class="form-control" type="date" required />\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="schedule-key-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="schedule-key-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="schedule-key-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш този запис?</p>\r
        <input type="hidden" id="schedule-key-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="schedule-key-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="schedule-key-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function _s(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Li=new Map;function _p(e,t){const r=Li.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){pr(a);return}}};Li.set(e,n),document.addEventListener("keydown",n)}function pr(e){var t,r;e.classList.add("d-none"),(t=document.querySelector("#schedule-key-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#schedule-key-delete-modal"))!=null&&r.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Fe(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const ue={rows:[],filters:{name:"",type:"",crewRole:"",isActive:"",validFrom:"",validTo:""}};async function ba(e){const{data:t,error:r}=await S.from("schedule_keys").select("id, name, is_active, type, crew_role, valid_from, valid_to").order("valid_from",{ascending:!1});if(r){v(r.message,"error"),ue.rows=[],Ze(e,"Грешка при зареждане на Ключ-График.");return}ue.rows=t||[],Ze(e)}function Ze(e,t){const r=e.querySelector("#schedule-keys-table-body"),n=e.querySelector("#schedule-keys-empty"),s=ue.rows.filter(a=>{const i=!ue.filters.name||(a.name||"").toLowerCase().includes(ue.filters.name),o=!ue.filters.type||a.type===ue.filters.type,l=!ue.filters.crewRole||a.crew_role===ue.filters.crewRole,d=!ue.filters.isActive||String(!!a.is_active)===ue.filters.isActive,c=!ue.filters.validFrom||a.valid_from===ue.filters.validFrom,u=!ue.filters.validTo||a.valid_to===ue.filters.validTo;return i&&o&&l&&d&&c&&u});if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма записи по зададените филтри.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>`
        <tr>
          <td>${Fe(a.name??"-")}</td>
          <td>${Fe(a.type??"-")}</td>
          <td>${Fe(a.crew_role??"-")}</td>
          <td>${a.is_active?"Да":"Не"}</td>
          <td>${Fe(a.valid_from??"-")}</td>
          <td>${Fe(a.valid_to??"-")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${a.id}"
                data-name="${Fe(a.name??"")}"
                data-type="${Fe(a.type??"seasonal")}"
                data-crew-role="${Fe(a.crew_role??"кондуктор")}"
                data-active="${a.is_active?"true":"false"}"
                data-valid-from="${Fe(a.valid_from??"")}"
                data-valid-to="${Fe(a.valid_to??"")}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="duties"
                data-id="${a.id}"
                data-name="${Fe(a.name??"")}"
              >
                Повески
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${a.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `).join("")}async function wp(e){e.innerHTML=gp,Sp(e),await ba(e)}function Sp(e){const t=e.querySelector("#open-create-schedule-key"),r=e.querySelector("#schedule-keys-form"),n=e.querySelector("#schedule-key-cancel-btn"),s=e.querySelector("#schedule-keys-table-body"),a=e.querySelector("#schedule-key-modal"),i=e.querySelector("#schedule-key-delete-modal"),o=e.querySelector("#schedule-key-modal-close"),l=e.querySelector("#schedule-key-delete-confirm"),d=e.querySelector("#schedule-key-delete-cancel"),c=e.querySelector("#filter-name"),u=e.querySelector("#filter-type"),h=e.querySelector("#filter-crew-role"),m=e.querySelector("#filter-active"),p=e.querySelector("#filter-valid-from"),f=e.querySelector("#filter-valid-to"),_=e.querySelector("#filter-reset");t==null||t.addEventListener("click",()=>{va(e),_s(a)}),r==null||r.addEventListener("submit",async y=>{y.preventDefault(),await kp(e)}),n==null||n.addEventListener("click",()=>{pr(a)}),o==null||o.addEventListener("click",()=>{pr(a)}),d==null||d.addEventListener("click",()=>{pr(i)}),c==null||c.addEventListener("input",y=>{ue.filters.name=y.target.value.trim().toLowerCase(),Ze(e)}),u==null||u.addEventListener("change",y=>{ue.filters.type=y.target.value,Ze(e)}),h==null||h.addEventListener("change",y=>{ue.filters.crewRole=y.target.value,Ze(e)}),m==null||m.addEventListener("change",y=>{ue.filters.isActive=y.target.value,Ze(e)}),p==null||p.addEventListener("change",y=>{ue.filters.validFrom=y.target.value,Ze(e)}),f==null||f.addEventListener("change",y=>{ue.filters.validTo=y.target.value,Ze(e)}),_==null||_.addEventListener("click",()=>{ue.filters={name:"",type:"",crewRole:"",isActive:"",validFrom:"",validTo:""},c&&(c.value=""),u&&(u.value=""),h&&(h.value=""),m&&(m.value=""),p&&(p.value=""),f&&(f.value=""),Ze(e)}),_p("schedule-keys",[i,a]),l==null||l.addEventListener("click",async()=>{const y=e.querySelector("#schedule-key-delete-id").value;await qp(y,e)}),s==null||s.addEventListener("click",async y=>{const g=y.target.closest("button[data-action]");if(!g)return;const b=g.getAttribute("data-action");if(b==="edit"){xp(e,{id:g.getAttribute("data-id"),name:g.getAttribute("data-name"),type:g.getAttribute("data-type"),crewRole:g.getAttribute("data-crew-role")||"кондуктор",isActive:g.getAttribute("data-active")==="true",validFrom:g.getAttribute("data-valid-from"),validTo:g.getAttribute("data-valid-to")}),_s(a);return}if(b==="delete"){const w=g.getAttribute("data-id");e.querySelector("#schedule-key-delete-id").value=w,_s(i);return}if(b==="duties"){const w=g.getAttribute("data-id"),k=g.getAttribute("data-name")||"",L=new URLSearchParams({scheduleKeyId:w,scheduleKeyName:k});window.history.pushState({},"",`/schedule-key-duties?${L.toString()}`),window.dispatchEvent(new PopStateEvent("popstate"))}})}async function kp(e){var b;const t=e.querySelector("#schedule-key-id"),r=e.querySelector("#schedule-key-name"),n=e.querySelector("#schedule-key-type"),s=e.querySelector("#schedule-key-crew-role"),a=e.querySelector("#schedule-key-active"),i=e.querySelector("#schedule-key-valid-from"),o=e.querySelector("#schedule-key-valid-to"),l=e.querySelector("#schedule-key-save-btn"),d=r.value.trim(),c=n.value,u=s.value,h=a.checked,m=i.value,p=o.value,f=t.value;if(!d||!c||!u||!m||!p){v("Моля, попълни всички задължителни полета.","warning");return}if(!["началник влак","кондуктор"].includes(u)){v("Невалидна стойност за екип.","warning");return}if(p<m){v('Полето "До дата" трябва да е след "От дата".',"warning");return}const _=l.innerHTML;l.disabled=!0,l.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const y={name:d,type:c,crew_role:u,is_active:h,valid_from:m,valid_to:p};let g;if(f)({error:g}=await S.from("schedule_keys").update(y).eq("id",f));else{const{data:w}=await S.auth.getUser(),k=((b=w==null?void 0:w.user)==null?void 0:b.email)??"web_app";({error:g}=await S.from("schedule_keys").insert({...y,created_from:k}))}if(l.disabled=!1,l.innerHTML=_,g){v(Bo(g),"error");return}v(f?"Записът е обновен.":"Записът е създаден.","success"),pr(e.querySelector("#schedule-key-modal")),va(e),await ba(e)}function xp(e,t){e.querySelector("#schedule-key-id").value=t.id,e.querySelector("#schedule-key-name").value=t.name??"",e.querySelector("#schedule-key-type").value=t.type??"seasonal",e.querySelector("#schedule-key-crew-role").value=t.crewRole??"кондуктор",e.querySelector("#schedule-key-active").checked=!!t.isActive,e.querySelector("#schedule-key-valid-from").value=t.validFrom??"",e.querySelector("#schedule-key-valid-to").value=t.validTo??"",e.querySelector("#schedule-keys-form-title").textContent="Редакция на Ключ-График",e.querySelector("#schedule-key-save-btn").textContent="Запази",e.querySelector("#schedule-key-cancel-btn").classList.remove("d-none")}function va(e){e.querySelector("#schedule-key-id").value="",e.querySelector("#schedule-key-name").value="",e.querySelector("#schedule-key-type").value="seasonal",e.querySelector("#schedule-key-crew-role").value="кондуктор",e.querySelector("#schedule-key-active").checked=!0,e.querySelector("#schedule-key-valid-from").value="",e.querySelector("#schedule-key-valid-to").value="",e.querySelector("#schedule-keys-form-title").textContent="Нов Ключ-График",e.querySelector("#schedule-key-save-btn").textContent="Създай",e.querySelector("#schedule-key-cancel-btn").classList.add("d-none")}async function qp(e,t){const r=t.querySelector("#schedule-key-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("schedule_keys").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,s){v(Bo(s),"error");return}v("Записът е изтрит.","success"),pr(t.querySelector("#schedule-key-delete-modal")),va(t),await ba(t)}function Bo(e){const t=String((e==null?void 0:e.message)||"").trim(),r=t.toLowerCase();return String((e==null?void 0:e.code)||"").trim()==="23503"||r.includes("foreign key constraint")||r.includes("duties_schedule_key_id_fkey")?"Този ключ-график не може да бъде изтрит или променен, защото се използва в повески.":t||"Възникна неочаквана грешка."}const Lp=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Повески</h1>\r
      <button id="open-create-duty" type="button" class="btn btn-primary">Нова Повеска</button>\r
    </div>\r
\r
    <p class="text-secondary">Списък с повески и тяхното времетраене.</p>\r
\r
        <section class="search-panel mb-4" aria-label="Панел за търсене">\r
          <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
            <button id="duties-filter-reset" type="button" class="btn btn-sm btn-outline-secondary">Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-4">\r
          <label for="duties-search" class="form-label">Име</label>\r
          <input id="duties-search" type="text" class="form-control" placeholder="Търси по наименование" />\r
        </div>\r
        <div class="col-md-4">\r
          <label for="duties-schedule-key-filter" class="form-label">Ключ-график</label>\r
          <select id="duties-schedule-key-filter" class="form-select">\r
            <option value="">Всички</option>\r
          </select>\r
        </div>\r
        <div class="col-md-4">\r
              <label for="duties-type-filter" class="form-label">Тип</label>\r
              <select id="duties-type-filter" class="form-select">\r
                <option value="">Всички</option>\r
              </select>\r
            </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th style="width: 44px;">↕</th>\r
            <th class="duties-name-col">Наименование</th>\r
            <th>Тип</th>\r
            <th>Начало</th>\r
            <th>Край</th>\r
            <th>Прекъсване</th>\r
            <th>Времетраене</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="duties-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="duties-empty" class="text-secondary d-none mb-0"></p>\r
\r
    <div id="duties-pagination" class="d-flex justify-content-between align-items-center mt-3 d-none">\r
      <small id="duties-page-info" class="text-secondary"></small>\r
      <div class="d-flex gap-2">\r
        <button id="duties-prev-page" type="button" class="btn btn-sm btn-outline-secondary">Назад</button>\r
        <button id="duties-next-page" type="button" class="btn btn-sm btn-outline-secondary">Напред</button>\r
      </div>\r
    </div>\r
  </div>\r
</section>\r
\r
<div id="duty-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-start justify-content-center h-100 p-3 p-md-4" style="overflow: auto;">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4" style="max-height: calc(100vh - 64px); overflow: auto;">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="duty-form-title" class="h5 mb-0">Нова Повеска</h2>\r
          <button id="duty-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="duty-form">\r
          <input type="hidden" id="duty-id" />\r
\r
          <div id="duty-form-fields" class="row g-3"></div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="duty-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="duty-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="duty-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш тази повеска?</p>\r
        <input type="hidden" id="duty-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="duty-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="duty-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="duty-profile-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-start justify-content-center h-100 p-3 p-md-4" style="overflow: auto;">\r
    <div class="card w-100" style="max-width: 960px;">\r
      <div class="card-body p-4" style="max-height: calc(100vh - 64px); overflow: auto;">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Профил на повеска</h2>\r
          <button id="duty-profile-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
        <div id="duty-profile-content"></div>\r
        <div class="d-flex justify-content-end gap-2 mt-4">\r
          <button id="duty-profile-close-secondary" type="button" class="btn btn-outline-secondary">Затвори</button>\r
          <button id="duty-profile-duplicate" type="button" class="btn btn-outline-secondary">Копирай</button>\r
          <button id="duty-profile-edit" type="button" class="btn btn-primary">Редакция</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="duty-attachment-preview-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1070;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3 p-md-4">\r
    <div class="card w-100" style="max-width: 1100px;">\r
      <div class="card-body p-3 p-md-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="duty-attachment-preview-title" class="h5 mb-0">Преглед на файл</h2>\r
          <div class="d-flex align-items-center gap-2">\r
            <a id="duty-attachment-preview-open" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">Отвори файла</a>\r
            <button id="duty-attachment-preview-close" type="button" class="btn-close" aria-label="Close"></button>\r
          </div>\r
        </div>\r
        <div id="duty-attachment-preview-fallback" class="alert alert-info py-2 d-none" role="alert">\r
          Този тип файл може да не се визуализира вградено. Използвай „Отвори файла" за директен преглед.\r
        </div>\r
        <div id="duty-attachment-preview-text-wrap" class="d-none">\r
          <pre id="duty-attachment-preview-text" class="border rounded p-3 bg-light mb-0" style="height: min(72vh, 760px); overflow: auto; white-space: pre-wrap; word-break: break-word;"></pre>\r
        </div>\r
        <div id="duty-attachment-preview-csv-wrap" class="d-none">\r
          <p id="duty-attachment-preview-csv-note" class="text-secondary small mb-2"></p>\r
          <div class="table-responsive border rounded" style="height: min(72vh, 760px); overflow: auto;">\r
            <table class="table table-sm table-striped table-bordered mb-0">\r
              <thead id="duty-attachment-preview-csv-head"></thead>\r
              <tbody id="duty-attachment-preview-csv-body"></tbody>\r
            </table>\r
          </div>\r
        </div>\r
        <iframe\r
          id="duty-attachment-preview-frame"\r
          title="Преглед на файл"\r
          class="w-100 border rounded"\r
          style="height: min(72vh, 760px);"\r
        ></iframe>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Ko({duty:e,scheduleKeyNames:t,trainNumbers:r,attachmentEntries:n,escapeHtml:s,intervalToTimeInput:a,formatInterval:i}){var u;const o=((e==null?void 0:e.start_time)||"-").slice(0,5)||"-",l=((e==null?void 0:e.end_time)||"-").slice(0,5)||"-",d=(a((e==null?void 0:e.break_start_time)||"00:00:00")||"-").slice(0,5)||"-",c=(a((e==null?void 0:e.break_end_time)||"00:00:00")||"-").slice(0,5)||"-";return`
    <div class="row g-3">
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Наименование</div>
          <div class="fw-semibold">${s((e==null?void 0:e.name)||"-")}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Тип</div>
          <div class="fw-semibold">${s(((u=e==null?void 0:e.duty_types)==null?void 0:u.name)||"-")}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Ключ-графици</div>
          <div class="fw-semibold">${s(t!=null&&t.length?t.join(", "):"-")}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Влакове</div>
          <div class="fw-semibold">${s(r!=null&&r.length?r.join(", "):"-")}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало</div>
          <div class="fw-semibold">${s(o)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край</div>
          <div class="fw-semibold">${s(l)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Втори ден</div>
          <div class="fw-semibold">${e!=null&&e.second_day?"Да":"Не"}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало на прекъсване</div>
          <div class="fw-semibold">${s(d)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край на прекъсване</div>
          <div class="fw-semibold">${s(c)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Прекъсване</div>
          <div class="fw-semibold">${s(i(e==null?void 0:e.break_duration_interval))}</div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Времетраене</div>
          <div class="fw-semibold">${s(i(e==null?void 0:e.duration_interval))}</div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small mb-2">Прикачени файлове</div>
          <div class="fw-semibold">
            ${(n||[]).length?(n||[]).map(h=>{const m=(h==null?void 0:h.label)||"Файл",p=(h==null?void 0:h.url)||"#";return`
          <div class="d-flex align-items-center gap-2 mb-1">
            <button
              type="button"
              class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
              data-duty-profile-action="preview-attachment"
              data-url="${s(p)}"
              data-label="${s(m)}"
              title="Преглед: ${s(m)}"
              aria-label="Преглед: ${s(m)}"
            >
              👁
            </button>
            <a href="${s(p)}" target="_blank" rel="noopener noreferrer">${s(m)}</a>
          </div>
        `}).join(""):"-"}
          </div>
        </div>
      </div>
    </div>
  `}function zs({idPrefix:e}){return`
    <div class="col-md-6">
      <label for="${e}-name" class="form-label">Наименование</label>
      <input id="${e}-name" class="form-control" type="text" required />
    </div>

    <div class="col-md-6">
      <label for="${e}-type" class="form-label">Тип на повеската</label>
      <select id="${e}-type" class="form-select" required>
        <option value="">Избери тип</option>
      </select>
    </div>

    <div class="col-md-6">
      <label for="${e}-schedule-keys" class="form-label">Ключ-Графици</label>
      <select id="${e}-schedule-keys" class="form-select" multiple required size="5"></select>
      <div class="form-text">Може да избереш един или повече ключ-графика.</div>
    </div>

    <div class="col-md-6">
      <label for="${e}-trains" class="form-label">Влакове</label>
      <select id="${e}-trains" class="form-select" multiple size="5"></select>
      <div class="form-text">Избери един или повече влака за тази повеска.</div>
    </div>

    <div class="col-md-6">
      <label for="${e}-start" class="form-label">Начало</label>
      <input id="${e}-start" class="form-control" type="time" required />
    </div>

    <div class="col-md-6">
      <label for="${e}-end" class="form-label">Край</label>
      <input id="${e}-end" class="form-control" type="time" required />
    </div>

    <div class="col-md-6 d-flex align-items-end">
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="${e}-second-day" />
        <label class="form-check-label" for="${e}-second-day">Втори ден</label>
      </div>
    </div>

    <div class="col-md-6">
      <label for="${e}-break-start" class="form-label">Начало на прекъсването</label>
      <input id="${e}-break-start" class="form-control" type="time" value="00:00" required />
    </div>

    <div class="col-md-6">
      <label for="${e}-break-end" class="form-label">Край на прекъсването</label>
      <input id="${e}-break-end" class="form-control" type="time" value="00:00" required />
    </div>

    <div class="col-12">
      <label for="${e}-notes" class="form-label">Бележки</label>
      <textarea id="${e}-notes" class="form-control" rows="3" placeholder="Въведи бележки (по избор)"></textarea>
    </div>
  `}function Nt(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Ti=new Map;function Tp(e,t){const r=Ti.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){We(a);return}}};Ti.set(e,n),document.addEventListener("keydown",n)}function We(e){var t,r,n,s;e.classList.add("d-none"),(t=document.querySelector("#duty-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#duty-delete-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#duty-profile-modal"))!=null&&n.classList.contains("d-none"))&&((s=document.querySelector("#duty-attachment-preview-modal"))!=null&&s.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Ei(e){return e?typeof e=="string"?e.replace(".000000",""):String(e):"-"}function ce(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Ln=8,Z={allDuties:[],searchQuery:"",scheduleKeyFilter:"",dutyTypeFilter:"",currentPage:1,draggedDutyId:null};async function ns(e){const{data:t,error:r}=await S.from("duties").select("id, name, notes, duty_files, duty_type_id, start_time, end_time, second_day, break_start_time, break_end_time, break_duration_interval, duration_interval, display_order, duty_types(name), schedule_key_duties(schedule_key_id, schedule_keys(name)), duty_trains(train_id, sequence_order, trains(number))").order("display_order",{ascending:!0}).order("name",{ascending:!0});if(r){v(r.message,"error"),Z.allDuties=[],et(e,"Грешка при зареждане на повеските.");return}Z.allDuties=t||[],et(e)}async function Ep(){const e=Z.allDuties.map((n,s)=>S.from("duties").update({display_order:s+1}).eq("id",n.id)),r=(await Promise.all(e)).find(n=>n.error);return r!=null&&r.error?(v(r.error.message,"error"),!1):(Z.allDuties=Z.allDuties.map((n,s)=>({...n,display_order:s+1})),!0)}function et(e,t){const r=e.querySelector("#duties-table-body"),n=e.querySelector("#duties-empty"),s=e.querySelector("#duties-pagination"),a=e.querySelector("#duties-page-info"),i=e.querySelector("#duties-prev-page"),o=e.querySelector("#duties-next-page");Ip(e),Dp(e);const l=Z.allDuties.filter(m=>{var k;const p=(m.name||"").toLowerCase(),f=(((k=m.duty_types)==null?void 0:k.name)||"").toLowerCase(),_=Ws(m).map(L=>L.toLowerCase()),y=Ap(m).join(" ").toLowerCase(),g=!Z.searchQuery||p.includes(Z.searchQuery)||y.includes(Z.searchQuery),b=!Z.scheduleKeyFilter||_.includes(Z.scheduleKeyFilter),w=!Z.dutyTypeFilter||f===Z.dutyTypeFilter;return g&&b&&w});if(!l.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени повески.",s.classList.add("d-none");return}n.classList.add("d-none");const d=Math.max(1,Math.ceil(l.length/Ln));Z.currentPage>d&&(Z.currentPage=d),Z.currentPage<1&&(Z.currentPage=1);const c=(Z.currentPage-1)*Ln,u=c+Ln,h=l.slice(c,u);if(r.innerHTML=h.map(m=>{var b;const p=Ws(m),f=$p(m);Cp(m);const _=Rp(m),y=`<span class="badge text-bg-info" title="${ce(p.join(", "))}">${f.length} кл-гр</span>`,g=_>0?`<span class="badge text-bg-secondary" title="Прикачени файлове">${_} док.</span>`:"";return`
        <tr data-duty-id="${m.id}" draggable="true">
          <td class="text-secondary">↕</td>
          <td>
            <div class="d-flex align-items-center gap-2 flex-wrap">
              ${y}
              ${g}
              <span class="duties-name-ellipsis" title="${ce(m.name??"-")}">${ce(m.name??"-")}</span>
            </div>
          </td>
          <td>${ce(((b=m.duty_types)==null?void 0:b.name)??"-")}</td>
          <td>${ce(m.start_time??"-")}</td>
          <td>${ce(m.end_time??"-")}</td>
          <td>${ce(Ei(m.break_duration_interval))}</td>
          <td>${ce(Ei(m.duration_interval))}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="profile"
                data-id="${m.id}"
              >
                Профил
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${m.id}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="duplicate"
                data-id="${m.id}"
              >
                Копирай
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${m.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join(""),l.length<=Ln){s.classList.add("d-none");return}s.classList.remove("d-none"),a.textContent=`Страница ${Z.currentPage} от ${d}`,i.disabled=Z.currentPage<=1,o.disabled=Z.currentPage>=d}function zo(e){return Array.isArray(e.schedule_key_duties)?e.schedule_key_duties:e.schedule_key_duties?[e.schedule_key_duties]:[]}function Wo(e){return Array.isArray(e.duty_trains)?e.duty_trains:e.duty_trains?[e.duty_trains]:[]}function Ws(e){const t=zo(e).map(r=>{var n;return(n=r==null?void 0:r.schedule_keys)==null?void 0:n.name}).filter(Boolean);return[...new Set(t)]}function $p(e){const t=zo(e).map(r=>r==null?void 0:r.schedule_key_id).filter(Boolean);return[...new Set(t)]}function Ap(e){const t=Wo(e).map(r=>{var n;return(n=r==null?void 0:r.trains)==null?void 0:n.number}).filter(Boolean);return[...new Set(t)]}function Cp(e){const t=Wo(e).map(r=>({trainId:r==null?void 0:r.train_id,sequenceOrder:Number.isFinite(Number(r==null?void 0:r.sequence_order))?Number(r.sequence_order):Number.MAX_SAFE_INTEGER})).filter(r=>!!r.trainId).sort((r,n)=>r.sequenceOrder-n.sequenceOrder);return[...new Set(t.map(r=>r.trainId))]}function Rp(e){const t=String((e==null?void 0:e.duty_files)||"").trim();if(!t)return 0;if(t.startsWith("["))try{const r=JSON.parse(t);if(Array.isArray(r))return r.filter(n=>String((n==null?void 0:n.url)||"").trim()).length}catch{return 1}return t.split(`
`).map(r=>r.trim()).filter(Boolean).length}function Ip(e){const t=e.querySelector("#duties-type-filter");if(!t)return;const r=Z.dutyTypeFilter||"",n=[...new Set(Z.allDuties.map(s=>{var a;return String(((a=s==null?void 0:s.duty_types)==null?void 0:a.name)||"").trim()}).filter(Boolean))].sort((s,a)=>s.localeCompare(a,"bg"));t.innerHTML=`
    <option value="">Всички</option>
    ${n.map(s=>`<option value="${ce(s.toLowerCase())}">${ce(s)}</option>`).join("")}
  `,t.value=r}function Dp(e){const t=e.querySelector("#duties-schedule-key-filter");if(!t)return;const r=Z.scheduleKeyFilter||"",n=[...new Set(Z.allDuties.flatMap(s=>Ws(s)).map(s=>String(s||"").trim()).filter(Boolean))].sort((s,a)=>s.localeCompare(a,"bg"));t.innerHTML=`
    <option value="">Всички</option>
    ${n.map(s=>`<option value="${ce(s.toLowerCase())}">${ce(s)}</option>`).join("")}
  `,t.value=r}const Qr="duty-files",Yr=5;async function Pp(e){e.innerHTML=Lp,Op(e),Np(e),await jp(e),await Hp(e),await Mp(e),await ns(e)}function Op(e){const t=e.querySelector("#duty-form-fields");t&&(t.innerHTML=`
    ${zs({idPrefix:"duty"})}

    <div class="col-12">
      <label for="duty-attachment-file" class="form-label">Файлове</label>
      <input id="duty-attachment-file" class="form-control" type="file" multiple />
      <div class="form-text">Може да добавиш до ${Yr} файла общо.</div>
    </div>

    <div id="duty-current-attachments-wrap" class="col-12 d-none">
      <label class="form-label">Текущи файлове</label>
      <div id="duty-current-attachments-links" class="d-flex flex-column gap-2"></div>
    </div>

    <input type="hidden" id="duty-existing-attachments" />
    <input type="hidden" id="duty-draft-attachments" />
  `)}async function Mp(e){const t=e.querySelector("#duty-trains"),{data:r,error:n}=await S.from("trains").select("id, number, origin_station, destination_station").order("number",{ascending:!0});if(n){v(Yp(n),"error");return}const s=(r||[]).map(a=>{const i=`${a.origin_station||"-"} - ${a.destination_station||"-"}`;return`<option value="${a.id}">${ce(a.number||"-")} (${ce(i)})</option>`}).join("");t.innerHTML=s}async function jp(e){const t=e.querySelector("#duty-type"),{data:r,error:n}=await S.from("duty_types").select("id, name").order("name",{ascending:!0});if(n){v(n.message,"error");return}const s=(r||[]).map(a=>`<option value="${a.id}">${ce(a.name)}</option>`).join("");t.innerHTML='<option value="">Избери тип</option>'+s}function Np(e){var E,q;const t=e.querySelector("#open-create-duty"),r=e.querySelector("#duty-form"),n=e.querySelector("#duty-cancel-btn"),s=e.querySelector("#duties-table-body"),a=e.querySelector("#duty-modal"),i=e.querySelector("#duty-delete-modal"),o=e.querySelector("#duty-profile-modal"),l=e.querySelector("#duty-attachment-preview-modal"),d=e.querySelector("#duty-modal-close"),c=e.querySelector("#duty-delete-confirm"),u=e.querySelector("#duty-delete-cancel"),h=e.querySelector("#duty-profile-close"),m=e.querySelector("#duty-profile-close-secondary"),p=e.querySelector("#duty-profile-duplicate"),f=e.querySelector("#duty-profile-edit"),_=e.querySelector("#duties-search"),y=e.querySelector("#duties-schedule-key-filter"),g=e.querySelector("#duties-type-filter"),b=e.querySelector("#duties-filter-reset"),w=e.querySelector("#duties-prev-page"),k=e.querySelector("#duties-next-page"),L=e.querySelector("#duty-attachment-file"),x=e.querySelector("#duty-current-attachments-links");t==null||t.addEventListener("click",()=>{ga(e),Nt(a)}),r==null||r.addEventListener("submit",async T=>{T.preventDefault(),await Up(e)}),n==null||n.addEventListener("click",()=>{We(a)}),d==null||d.addEventListener("click",()=>{We(a)}),u==null||u.addEventListener("click",()=>{We(i)}),h==null||h.addEventListener("click",()=>{We(o)}),m==null||m.addEventListener("click",()=>{We(o)}),(E=e.querySelector("#duty-profile-content"))==null||E.addEventListener("click",T=>{const C=T.target.closest('button[data-duty-profile-action="preview-attachment"]');if(!C)return;const $=String(C.getAttribute("data-url")||"").trim(),A=String(C.getAttribute("data-label")||"").trim();$i(e,$,A)}),(q=e.querySelector("#duty-attachment-preview-close"))==null||q.addEventListener("click",()=>{Wp(e)}),f==null||f.addEventListener("click",()=>{var C;const T=((C=o==null?void 0:o.dataset)==null?void 0:C.dutyId)||"";T&&(We(o),Ai(e,T))}),p==null||p.addEventListener("click",()=>{var C;const T=((C=o==null?void 0:o.dataset)==null?void 0:C.dutyId)||"";T&&(We(o),Ci(e,T))}),_==null||_.addEventListener("input",T=>{Z.searchQuery=T.target.value.trim().toLowerCase(),Z.currentPage=1,et(e)}),g==null||g.addEventListener("change",T=>{Z.dutyTypeFilter=T.target.value||"",Z.currentPage=1,et(e)}),y==null||y.addEventListener("change",T=>{Z.scheduleKeyFilter=T.target.value||"",Z.currentPage=1,et(e)}),b==null||b.addEventListener("click",()=>{Z.searchQuery="",Z.scheduleKeyFilter="",Z.dutyTypeFilter="",Z.currentPage=1,_&&(_.value=""),y&&(y.value=""),g&&(g.value=""),et(e)}),w==null||w.addEventListener("click",()=>{Z.currentPage-=1,et(e)}),k==null||k.addEventListener("click",()=>{Z.currentPage+=1,et(e)}),L==null||L.addEventListener("change",()=>{var T;(T=L.files)!=null&&T.length&&L.files.length>Yr&&(v(`Може да избереш до ${Yr} файла наведнъж.`,"warning"),L.value="")}),x==null||x.addEventListener("input",T=>{const C=T.target.closest(".duty-existing-attachment-label");if(!C)return;const $=Number(C.getAttribute("data-index"));if(!Number.isInteger($)||$<0)return;const A=e.querySelector("#duty-draft-attachments"),D=Ht((A==null?void 0:A.value)||"");D[$]&&(D[$].label=C.value,A&&(A.value=Xr(D)||""))}),x==null||x.addEventListener("click",T=>{const C=T.target.closest(".duty-existing-attachment-preview");if(C){const U=String(C.getAttribute("data-url")||"").trim(),z=String(C.getAttribute("data-label")||"").trim();$i(e,U,z);return}const $=T.target.closest(".duty-existing-attachment-remove");if(!$)return;const A=Number($.getAttribute("data-index"));if(!Number.isInteger(A)||A<0)return;const D=e.querySelector("#duty-draft-attachments"),O=Ht((D==null?void 0:D.value)||"");O[A]&&(O.splice(A,1),_a(e,O))}),Tp("duties",[l,o,i,a]),c==null||c.addEventListener("click",async()=>{const T=e.querySelector("#duty-delete-id").value;await Fp(T,e)}),s==null||s.addEventListener("click",async T=>{const C=T.target.closest("button[data-action]");if(!C)return;const $=C.getAttribute("data-action");if($==="profile"){const A=C.getAttribute("data-id");Xp(e,A);return}if($==="edit"){const A=C.getAttribute("data-id");Ai(e,A);return}if($==="duplicate"){const A=C.getAttribute("data-id");Ci(e,A);return}if($==="delete"){const A=C.getAttribute("data-id");e.querySelector("#duty-delete-id").value=A,Nt(i)}}),s==null||s.addEventListener("dragstart",T=>{const C=T.target.closest("tr[data-duty-id]");C&&(Z.draggedDutyId=C.getAttribute("data-duty-id"),C.classList.add("table-active"))}),s==null||s.addEventListener("dragend",T=>{const C=T.target.closest("tr[data-duty-id]");C&&C.classList.remove("table-active"),Z.draggedDutyId=null}),s==null||s.addEventListener("dragover",T=>{T.preventDefault()}),s==null||s.addEventListener("drop",async T=>{T.preventDefault();const C=T.target.closest("tr[data-duty-id]"),$=Z.draggedDutyId;if(!C||!$)return;const A=C.getAttribute("data-duty-id");if(!A||A===$)return;const D=Z.allDuties.findIndex(W=>W.id===$),O=Z.allDuties.findIndex(W=>W.id===A);if(D<0||O<0)return;const[U]=Z.allDuties.splice(D,1);if(Z.allDuties.splice(O,0,U),et(e),!await Ep()){await ns(e);return}v("Редът на повеските е запазен.","success")})}async function Hp(e){const t=e.querySelector("#duty-schedule-keys"),{data:r,error:n}=await S.from("schedule_keys").select("id, name").order("name",{ascending:!0});if(n){v(n.message,"error");return}const s=(r||[]).map(a=>`<option value="${a.id}">${ce(a.name)}</option>`).join("");t.innerHTML=s}async function Up(e){var Y,te;const t=e.querySelector("#duty-id"),r=e.querySelector("#duty-name"),n=e.querySelector("#duty-type"),s=e.querySelector("#duty-schedule-keys"),a=e.querySelector("#duty-trains"),i=Pr(e,"#duty-start","#duty-start-time"),o=Pr(e,"#duty-end","#duty-end-time"),l=e.querySelector("#duty-second-day"),d=Pr(e,"#duty-break-start","#duty-break-start-time"),c=Pr(e,"#duty-break-end","#duty-break-end-time"),u=e.querySelector("#duty-notes"),h=e.querySelector("#duty-attachment-file"),m=e.querySelector("#duty-existing-attachments"),p=e.querySelector("#duty-draft-attachments"),f=e.querySelector("#duty-save-btn"),_=r.value.trim(),y=n.value||null,g=Array.from(s.selectedOptions||[]).map(N=>N.value).filter(Boolean),b=Array.from(a.selectedOptions||[]).map(N=>N.value).filter(Boolean),w=g[0]||null,k=(i==null?void 0:i.value)||"",L=(o==null?void 0:o.value)||"",x=l.checked,E=(d==null?void 0:d.value)||"00:00",q=(c==null?void 0:c.value)||"00:00",T=u.value.trim()||null,C=Ht((m==null?void 0:m.value)||""),$=Ht((p==null?void 0:p.value)||""),A=Array.from((h==null?void 0:h.files)||[]),D=t.value;if(!_||!y||!k||!L){v("Моля, попълни всички задължителни полета.","warning");return}if(!g.length){v("Избери поне един ключ-график.","warning");return}const O=Re(k,L);if(Re(E,q)>O){v("Прекъсването не може да е по-голямо от продължителността на повеската.","warning");return}const z=f.innerHTML;f.disabled=!0,f.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const W=D||crypto.randomUUID(),H=Bn($),K=[];if(H.length+A.length>Yr){f.disabled=!1,f.innerHTML=z,v(`Максимум ${Yr} файла/линка за една повеска.`,"warning");return}if(A.length){const N=await zp(A,W);if(!N){f.disabled=!1,f.innerHTML=z;return}N.forEach(J=>{J!=null&&J.url&&H.push({url:J.url,label:J.label||Zr(J.url,H.length)}),J!=null&&J.objectPath&&K.push(J.objectPath)})}const R=Bn(H),P={name:_,duty_type_id:y,schedule_key_id:w,start_time:k,end_time:L,second_day:x,break_start_time:E,break_end_time:q,notes:T,duty_files:Xr(R)};let j,B=D||null;if(D)({error:j}=await S.from("duties").update(P).eq("id",D));else{const{data:N}=await S.auth.getUser(),J=((Y=N==null?void 0:N.user)==null?void 0:Y.id)??((te=N==null?void 0:N.user)==null?void 0:te.email)??"web_app",ie=Z.allDuties.reduce((Se,I)=>Math.max(Se,Number(I.display_order)||0),0),{data:oe,error:he}=await S.from("duties").insert({...P,id:W,created_from:J,display_order:ie+1}).select("id").single();j=he,B=(oe==null?void 0:oe.id)??null}if(!j&&B&&(j=await Bp(B,g)),!j&&B&&(j=await Kp(B,b)),f.disabled=!1,f.innerHTML=z,j){K.length&&await en(K),v(j.message,"error");return}if(D){const N=C.map(he=>Vs(he.url)).filter(Boolean),J=R.map(he=>Vs(he.url)).filter(Boolean),ie=new Set(J),oe=N.filter(he=>!ie.has(he));oe.length&&await en(oe)}v(D?"Повеската е обновена.":"Повеската е създадена.","success"),We(e.querySelector("#duty-modal")),ga(e),await ns(e)}function Vo(e,t){const r=Ht(t.dutyFiles);e.querySelector("#duty-id").value=t.id,e.querySelector("#duty-name").value=t.name??"",e.querySelector("#duty-type").value=t.dutyTypeId??"";const n=e.querySelector("#duty-schedule-keys"),s=t.scheduleKeyIds||[];Array.from(n.options).forEach(o=>{o.selected=s.includes(o.value)});const a=e.querySelector("#duty-trains"),i=t.trainIds||[];Array.from(a.options).forEach(o=>{o.selected=i.includes(o.value)}),ft(e,t.startTime??"","#duty-start","#duty-start-time"),ft(e,t.endTime??"","#duty-end","#duty-end-time"),e.querySelector("#duty-second-day").checked=!!t.secondDay,ft(e,jt(t.breakStartTime),"#duty-break-start","#duty-break-start-time"),ft(e,jt(t.breakEndTime),"#duty-break-end","#duty-break-end-time"),e.querySelector("#duty-notes").value=t.notes??"",e.querySelector("#duty-existing-attachments").value=Xr(r)||"",e.querySelector("#duty-draft-attachments").value=Xr(r)||"",e.querySelector("#duty-attachment-file").value="",_a(e,r),e.querySelector("#duty-form-title").textContent="Редакция на Повеска",e.querySelector("#duty-save-btn").textContent="Запази"}function ga(e){e.querySelector("#duty-id").value="",e.querySelector("#duty-name").value="",e.querySelector("#duty-type").value="";const t=e.querySelector("#duty-schedule-keys");Array.from(t.options).forEach(n=>{n.selected=!1});const r=e.querySelector("#duty-trains");Array.from(r.options).forEach(n=>{n.selected=!1}),ft(e,"","#duty-start","#duty-start-time"),ft(e,"","#duty-end","#duty-end-time"),e.querySelector("#duty-second-day").checked=!1,ft(e,"00:00","#duty-break-start","#duty-break-start-time"),ft(e,"00:00","#duty-break-end","#duty-break-end-time"),e.querySelector("#duty-notes").value="",e.querySelector("#duty-existing-attachments").value="",e.querySelector("#duty-draft-attachments").value="",e.querySelector("#duty-attachment-file").value="",_a(e,[]),e.querySelector("#duty-form-title").textContent="Нова Повеска",e.querySelector("#duty-save-btn").textContent="Създай"}async function Fp(e,t){const r=t.querySelector("#duty-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{data:s,error:a}=await S.from("duties").select("duty_files").eq("id",e).maybeSingle();if(a){r.disabled=!1,r.innerHTML=n,v(a.message,"error");return}const{error:i}=await S.from("duties").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,i){v(i.message,"error");return}const o=Ht(s==null?void 0:s.duty_files).map(l=>Vs(l.url)).filter(Boolean);o.length&&await en(o),v("Повеската е изтрита.","success"),We(t.querySelector("#duty-delete-modal")),ga(t),await ns(t)}async function Bp(e,t){const{error:r}=await S.from("schedule_key_duties").delete().eq("duty_id",e);if(r)return r;const n=t.map(a=>({duty_id:e,schedule_key_id:a})),{error:s}=await S.from("schedule_key_duties").insert(n);return s}async function Kp(e,t){const{error:r}=await S.from("duty_trains").delete().eq("duty_id",e);if(r)return r;if(!t.length)return null;const n=t.map((a,i)=>({duty_id:e,train_id:a,sequence_order:i+1})),{error:s}=await S.from("duty_trains").insert(n);return s}function _a(e,t){const r=e.querySelector("#duty-current-attachments-wrap"),n=e.querySelector("#duty-current-attachments-links"),s=e.querySelector("#duty-draft-attachments");if(!r||!n||!s)return;const a=Bn(t);if(s.value=Xr(a)||"",!a.length){r.classList.add("d-none"),n.innerHTML="";return}r.classList.remove("d-none"),n.innerHTML=a.map((i,o)=>{const l=i.label||Zr(i.url,o);return`
        <div class="border rounded p-2 w-100">
          <div class="mb-2 d-flex align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <a href="${ce(i.url)}" target="_blank" rel="noopener noreferrer">Отвори</a>
              <button
                type="button"
                class="btn btn-link btn-sm p-0 lh-1 text-decoration-none duty-existing-attachment-preview"
                data-url="${ce(i.url)}"
                data-label="${ce(l)}"
                title="Преглед"
                aria-label="Преглед"
              >
                👁
              </button>
            </div>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger duty-existing-attachment-remove"
              data-index="${o}"
            >
              Премахни
            </button>
          </div>
          <input
            type="text"
            class="form-control form-control-sm duty-existing-attachment-label"
            data-index="${o}"
            value="${ce(l)}"
            placeholder="Име на файла/линка"
          />
        </div>
      `}).join("")}function Ht(e){if(Array.isArray(e))return e.map((r,n)=>Dn(r,n)).filter(r=>r.url);const t=String(e||"").trim();if(!t)return[];if(t.startsWith("["))try{const r=JSON.parse(t);if(Array.isArray(r))return r.map((n,s)=>Dn(n,s)).filter(n=>n.url)}catch{return[{url:t,label:Zr(t,0)}]}return t.split(`
`).map((r,n)=>Dn(r,n)).filter(r=>r.url)}function Dn(e,t){if(e&&typeof e=="object"&&!Array.isArray(e)){const n=String(e.url||"").trim(),s=String(e.label||"").trim()||Zr(n,t);return{url:n,label:s}}const r=String(e||"").trim();return{url:r,label:Zr(r,t)}}function Xr(e){const t=Bn(e);return t.length?JSON.stringify(t):""}function Bn(e){const t=[],r=new Set;for(const n of e||[]){const s=Dn(n,t.length);if(!s.url)continue;const a=s.url.toLowerCase();r.has(a)||(r.add(a),t.push(s))}return t}function Zr(e,t){const r=String(e||"").trim();if(!r)return`Файл ${t+1}`;try{const s=new URL(r).pathname.split("/").pop()||"",a=decodeURIComponent(s);if(a)return a}catch{}return`Файл ${t+1}`}async function zp(e,t){var n;if(!Array.isArray(e)||!e.length||!t)return[];const r=[];for(const s of e){const i=(((n=s.name)==null?void 0:n.split(".").pop())||"pdf").toLowerCase().replace(/[^a-z0-9]/g,"")||"pdf",o=Math.random().toString(36).slice(2,10),l=`${t}/${Date.now()}-${o}.${i}`,{error:d}=await S.storage.from(Qr).upload(l,s,{upsert:!0,contentType:s.type||void 0});if(d)return r.length&&await en(r.map(u=>u.objectPath)),v(d.message,"error"),null;const{data:c}=S.storage.from(Qr).getPublicUrl(l);if(!(c!=null&&c.publicUrl))return await en([l,...r.map(u=>u.objectPath)]),v("Файлът е качен, но не успях да генерирам публичен линк.","error"),null;r.push({url:c.publicUrl,label:s.name||"",objectPath:l})}return r}function Vs(e){const t=String(e||"").trim();if(!t)return"";if(!/^https?:\/\//i.test(t)){const r=t.replace(/^\/+/,""),n=`${Qr}/`;return r.startsWith(n)?r.slice(n.length):""}try{const r=new URL(t),n=`/storage/v1/object/public/${Qr}/`,s=r.pathname.indexOf(n);return s===-1?"":decodeURIComponent(r.pathname.slice(s+n.length))}catch{return""}}async function en(e){const t=Array.from(new Set((e||[]).filter(Boolean)));t.length&&await S.storage.from(Qr).remove(t)}function $i(e,t,r){const n=e.querySelector("#duty-attachment-preview-modal"),s=e.querySelector("#duty-attachment-preview-frame"),a=e.querySelector("#duty-attachment-preview-text-wrap"),i=e.querySelector("#duty-attachment-preview-text"),o=e.querySelector("#duty-attachment-preview-csv-wrap"),l=e.querySelector("#duty-attachment-preview-csv-note"),d=e.querySelector("#duty-attachment-preview-csv-head"),c=e.querySelector("#duty-attachment-preview-csv-body"),u=e.querySelector("#duty-attachment-preview-title"),h=e.querySelector("#duty-attachment-preview-fallback"),m=e.querySelector("#duty-attachment-preview-open");if(!n||!s||!a||!i||!o||!l||!d||!c||!u||!h||!m)return;const p=String(t||"").trim();if(!p){v("Липсва линк за преглед.","warning");return}const f=Qp(p),_=Gs(p),y=_==="csv",g=["txt","csv","json"].includes(_);u.textContent=r?`Преглед: ${r}`:"Преглед на файл",m.setAttribute("href",p),h.classList.add("d-none"),a.classList.add("d-none"),o.classList.add("d-none"),l.textContent="",d.innerHTML="",c.innerHTML="",i.textContent="",s.classList.remove("d-none"),s.src="about:blank",y?(o.classList.remove("d-none"),s.classList.add("d-none"),Vp(p,d,c,l,h)):g?(a.classList.remove("d-none"),s.classList.add("d-none"),i.textContent="Зареждане...",Jp(p,i,h)):(s.src=f,s.onload=()=>{if(f!==p){h.classList.add("d-none");return}const b=Gs(p),w=["doc","docx","xls","xlsx","ppt","pptx"].includes(b);h.classList.toggle("d-none",!w)},s.onerror=()=>{h.classList.remove("d-none")}),Nt(n)}function Wp(e){const t=e.querySelector("#duty-attachment-preview-modal"),r=e.querySelector("#duty-attachment-preview-frame"),n=e.querySelector("#duty-attachment-preview-text-wrap"),s=e.querySelector("#duty-attachment-preview-text"),a=e.querySelector("#duty-attachment-preview-csv-wrap"),i=e.querySelector("#duty-attachment-preview-csv-note"),o=e.querySelector("#duty-attachment-preview-csv-head"),l=e.querySelector("#duty-attachment-preview-csv-body"),d=e.querySelector("#duty-attachment-preview-fallback"),c=e.querySelector("#duty-attachment-preview-open");!t||!r||!n||!s||!a||!i||!o||!l||!d||!c||(r.src="about:blank",r.classList.remove("d-none"),n.classList.add("d-none"),a.classList.add("d-none"),s.textContent="",i.textContent="",o.innerHTML="",l.innerHTML="",c.setAttribute("href","#"),d.classList.add("d-none"),We(t))}async function Vp(e,t,r,n,s){try{const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const i=await a.text(),o=Gp(i);if(!o.length){t.innerHTML="",r.innerHTML="",n.textContent="Файлът е празен.",s.classList.add("d-none");return}const l=200,d=o.slice(0,l),c=d[0]||[],u=d.slice(1);t.innerHTML=`
      <tr>${c.map(h=>`<th>${ce(h)}</th>`).join("")}</tr>
    `,r.innerHTML=u.map(h=>`<tr>${h.map(m=>`<td>${ce(m)}</td>`).join("")}</tr>`).join(""),o.length>l?n.textContent=`Показани са първите ${l} реда от общо ${o.length}.`:n.textContent=`Редове: ${o.length}.`,s.classList.add("d-none")}catch{t.innerHTML="",r.innerHTML="",n.textContent="",s.classList.remove("d-none")}}function Gp(e){const t=[];let r=[],n="",s=!1;for(let a=0;a<e.length;a+=1){const i=e[a],o=e[a+1];if(i==='"'){s&&o==='"'?(n+='"',a+=1):s=!s;continue}if(!s&&i===","){r.push(n),n="";continue}if(!s&&(i===`
`||i==="\r")){i==="\r"&&o===`
`&&(a+=1),r.push(n),t.push(r),r=[],n="";continue}n+=i}return(n.length||r.length)&&(r.push(n),t.push(r)),t}async function Jp(e,t,r){try{const n=await fetch(e,{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.text();t.textContent=s||"(Празен файл)",r.classList.add("d-none")}catch{t.textContent="Неуспешно зареждане на текстов преглед.",r.classList.remove("d-none")}}function Qp(e){const t=Gs(e);return["doc","docx","xls","xlsx","ppt","pptx"].includes(t)?`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(e)}`:e}function Gs(e){const t=String(e||"").trim();if(!t)return"";try{const n=new URL(t).pathname.split("/").pop()||"",s=n.includes(".")?n.split(".").pop():"";return String(s||"").toLowerCase()}catch{return""}}function Yp(e){const t=String((e==null?void 0:e.message)||"").trim(),r=t.toLowerCase(),n=r.includes("row-level security")||r.includes("violates row-level security policy")||String((e==null?void 0:e.code)||"")==="42501";return n&&r.includes("duty_trains")?"Нямаш права да свързваш влакове към повески. Свържи се с администратор.":n&&r.includes("duties")?"Нямаш права да създаваш или редактираш повески. Свържи се с администратор.":n?"Достъпът е ограничен от права за сигурност (RLS).":t||"Възникна неочаквана грешка."}function Xp(e,t){const r=Z.allDuties.find(c=>c.id===t),n=e.querySelector("#duty-profile-content"),s=e.querySelector("#duty-profile-modal"),a=e.querySelector("#duty-profile-duplicate"),i=e.querySelector("#duty-profile-edit");if(!n||!s)return;if(!r){s.dataset.dutyId="",i&&(i.disabled=!0),a&&(a.disabled=!0),n.innerHTML='<p class="text-secondary mb-0">Няма данни за тази повеска.</p>',Nt(s);return}s.dataset.dutyId=r.id,i&&(i.disabled=!1),a&&(a.disabled=!1);const o=Zp(r),l=eh(r),d=Ht(r==null?void 0:r.duty_files);n.innerHTML=Ko({duty:r,scheduleKeyNames:o,trainNumbers:l,attachmentEntries:d,escapeHtml:ce,intervalToTimeInput:jt,formatInterval:th}),Nt(s)}function Ai(e,t){const r=Z.allDuties.find(n=>n.id===t);if(!r){v("Не е намерена повеска за редакция.","warning");return}Vo(e,{id:r.id,name:r.name||"",dutyTypeId:r.duty_type_id||"",scheduleKeyIds:Go(r),trainIds:Jo(r),startTime:Kn(r.start_time),endTime:Kn(r.end_time),secondDay:!!r.second_day,breakStartTime:r.break_start_time||"00:00:00",breakEndTime:r.break_end_time||"00:00:00",notes:r.notes||"",dutyFiles:r.duty_files||""}),Nt(e.querySelector("#duty-modal"))}function Ci(e,t){const r=Z.allDuties.find(n=>n.id===t);if(!r){v("Не е намерена повеска за копиране.","warning");return}Vo(e,{id:"",name:r.name?`${r.name} (копие)`:"",dutyTypeId:r.duty_type_id||"",scheduleKeyIds:Go(r),trainIds:Jo(r),startTime:Kn(r.start_time),endTime:Kn(r.end_time),secondDay:!!r.second_day,breakStartTime:r.break_start_time||"00:00:00",breakEndTime:r.break_end_time||"00:00:00",notes:r.notes||"",dutyFiles:r.duty_files||""}),e.querySelector("#duty-id").value="",e.querySelector("#duty-form-title").textContent="Нова Повеска (копие)",e.querySelector("#duty-save-btn").textContent="Създай",Nt(e.querySelector("#duty-modal"))}function Zp(e){const r=(Array.isArray(e==null?void 0:e.schedule_key_duties)?e.schedule_key_duties:e!=null&&e.schedule_key_duties?[e.schedule_key_duties]:[]).map(n=>{var s;return(s=n==null?void 0:n.schedule_keys)==null?void 0:s.name}).filter(Boolean);return[...new Set(r)]}function Go(e){const r=(Array.isArray(e==null?void 0:e.schedule_key_duties)?e.schedule_key_duties:e!=null&&e.schedule_key_duties?[e.schedule_key_duties]:[]).map(n=>n==null?void 0:n.schedule_key_id).filter(Boolean);return[...new Set(r)]}function eh(e){return(Array.isArray(e==null?void 0:e.duty_trains)?e.duty_trains:e!=null&&e.duty_trains?[e.duty_trains]:[]).map(r=>{var n;return{number:(n=r==null?void 0:r.trains)==null?void 0:n.number,sequenceOrder:Number.isFinite(Number(r==null?void 0:r.sequence_order))?Number(r.sequence_order):Number.MAX_SAFE_INTEGER}}).filter(r=>!!r.number).sort((r,n)=>r.sequenceOrder-n.sequenceOrder).map(r=>r.number).filter((r,n,s)=>s.indexOf(r)===n)}function Jo(e){return(Array.isArray(e==null?void 0:e.duty_trains)?e.duty_trains:e!=null&&e.duty_trains?[e.duty_trains]:[]).map(r=>({id:r==null?void 0:r.train_id,sequenceOrder:Number.isFinite(Number(r==null?void 0:r.sequence_order))?Number(r.sequence_order):Number.MAX_SAFE_INTEGER})).filter(r=>!!r.id).sort((r,n)=>r.sequenceOrder-n.sequenceOrder).map(r=>r.id).filter((r,n,s)=>s.indexOf(r)===n)}function Kn(e){return e?String(e).slice(0,5):""}function Pr(e,...t){for(const r of t){const n=e.querySelector(r);if(n)return n}return null}function ft(e,t,...r){const n=Pr(e,...r);n&&(n.value=t)}function th(e){return e?String(e).replace(".000000",""):"-"}const rh=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Служители</h1>\r
      <button id="open-create-employee" type="button" class="btn btn-primary">Нов служител</button>\r
    </div>\r
\r
    <p class="text-secondary">Управление на служители и срокове на документи.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
        <button id="employees-filter-reset" type="button" class="btn btn-sm btn-outline-secondary">Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-6">\r
          <label for="employees-search" class="form-label">Търсене</label>\r
          <input id="employees-search" type="text" class="form-control" placeholder="Търси по име или позиция" />\r
        </div>\r
        <div class="col-md-3">\r
          <label for="employees-position-filter" class="form-label">Позиция</label>\r
          <select id="employees-position-filter" class="form-select">\r
            <option value="">Всички</option>\r
          </select>\r
        </div>\r
        <div class="col-md-3">\r
          <label for="employees-active-filter" class="form-label">Активен</label>\r
          <select id="employees-active-filter" class="form-select">\r
            <option value="">Всички</option>\r
            <option value="true">Да</option>\r
            <option value="false">Не</option>\r
          </select>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th>Име</th>\r
            <th>Свързан профил</th>\r
            <th>Позиция</th>\r
            <th>Активен</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="employees-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="employees-empty" class="text-secondary d-none mb-0"></p>\r
  </div>\r
</section>\r
\r
<div id="employee-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 860px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="employee-form-title" class="h5 mb-0">Нов служител</h2>\r
          <button id="employee-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="employee-form">\r
          <input type="hidden" id="employee-id" />\r
          <input type="hidden" id="employee-photo-path" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-6">\r
              <label for="employee-first-name" class="form-label">Име</label>\r
              <input id="employee-first-name" class="form-control" type="text" required />\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="employee-last-name" class="form-label">Фамилия</label>\r
              <input id="employee-last-name" class="form-control" type="text" required />\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="employee-position" class="form-label">Позиция</label>\r
              <select id="employee-position" class="form-select">\r
                <option value="">Без позиция</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-6 d-flex align-items-end">\r
              <div class="form-check mb-2">\r
                <input class="form-check-input" type="checkbox" id="employee-active" checked />\r
                <label class="form-check-label" for="employee-active">Активен</label>\r
              </div>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="employee-psych-expiry" class="form-label">Психологическа оценка</label>\r
              <input id="employee-psych-expiry" class="form-control" type="date" />\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="employee-medical-expiry" class="form-label">Медицинско свидетелство</label>\r
              <input id="employee-medical-expiry" class="form-control" type="date" />\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="employee-license-expiry" class="form-label">Лиценз</label>\r
              <input id="employee-license-expiry" class="form-control" type="date" />\r
            </div>\r
\r
            <div class="col-12">\r
              <label for="employee-photo-file" class="form-label">Снимка</label>\r
              <input id="employee-photo-file" class="form-control" type="file" accept="image/*" />\r
              <div class="d-flex justify-content-between align-items-center mt-2">\r
                <div class="form-text m-0">Избери изображение (jpg, png, webp).</div>\r
                <button id="employee-photo-remove-btn" type="button" class="btn btn-sm btn-outline-secondary">Премахни снимка</button>\r
              </div>\r
            </div>\r
\r
            <div class="col-12">\r
              <div class="border rounded p-3 text-center bg-light">\r
                <img\r
                  id="employee-photo-preview"\r
                  src=""\r
                  alt="Преглед на снимка"\r
                  class="img-thumbnail d-none"\r
                  style="max-height: 160px; object-fit: cover;"\r
                />\r
                <div id="employee-photo-preview-empty" class="small text-secondary">Няма избрана снимка</div>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="employee-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="employee-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="employee-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш този служител?</p>\r
        <input type="hidden" id="employee-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="employee-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="employee-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="employee-profile-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 860px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="employee-profile-title" class="h5 mb-0">Профил на служител</h2>\r
          <button id="employee-profile-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <div class="row g-3">\r
          <div class="col-12">\r
            <div class="text-center">\r
              <img\r
                id="employee-profile-photo"\r
                src=""\r
                alt="Снимка на служителя"\r
                class="img-thumbnail d-none"\r
                style="max-height: 180px; object-fit: cover;"\r
              />\r
              <div id="employee-profile-photo-empty" class="small text-secondary">Няма снимка</div>\r
            </div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="small text-secondary">Име</div>\r
            <div id="employee-profile-name" class="fw-semibold">-</div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="small text-secondary">Позиция</div>\r
            <div id="employee-profile-position">-</div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="small text-secondary">Активен</div>\r
            <div id="employee-profile-active">-</div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="small text-secondary">Свързани профили</div>\r
            <div id="employee-profile-linked-profiles">-</div>\r
          </div>\r
          <div class="col-md-4">\r
            <div class="small text-secondary">Психологическа оценка</div>\r
            <div id="employee-profile-psych">-</div>\r
          </div>\r
          <div class="col-md-4">\r
            <div class="small text-secondary">Медицинско свидетелство</div>\r
            <div id="employee-profile-medical">-</div>\r
          </div>\r
          <div class="col-md-4">\r
            <div class="small text-secondary">Лиценз</div>\r
            <div id="employee-profile-license">-</div>\r
          </div>\r
          <div class="col-12">\r
            <div class="small text-secondary">Други сертификати</div>\r
            <pre id="employee-profile-certificates" class="bg-light border rounded p-3 mb-0" style="white-space: pre-wrap;">-</pre>\r
          </div>\r
        </div>\r
\r
        <div class="d-flex justify-content-end mt-4">\r
          <button id="employee-profile-close-btn" type="button" class="btn btn-outline-secondary">Затвори</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Pn(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Ri=new Map;function nh(e,t){const r=Ri.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){mt(a);return}}};Ri.set(e,n),document.addEventListener("keydown",n)}function mt(e){var t,r,n;e.classList.add("d-none"),(t=document.querySelector("#employee-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#employee-delete-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#employee-profile-modal"))!=null&&n.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function De(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const we={rows:[],searchQuery:"",positionFilter:"",activeFilter:""};async function wa(e){const{data:t,error:r}=await S.from("employees").select("id, first_name, last_name, position_id, is_active, photo_url, psychological_assessment_expiry, medical_certificate_expiry, license_expiry, positions(title), user_profiles(id, username)").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(r){v(r.message,"error"),we.rows=[],sr(e,"Грешка при зареждане на служители.");return}we.rows=t||[],sr(e)}function sr(e,t){const r=e.querySelector("#employees-table-body"),n=e.querySelector("#employees-empty");sh(e);const s=we.rows.filter(a=>{var u;const i=`${a.first_name||""} ${a.last_name||""}`.toLowerCase(),o=(((u=a.positions)==null?void 0:u.title)||"").toLowerCase(),l=!we.searchQuery||i.includes(we.searchQuery)||o.includes(we.searchQuery),d=!we.positionFilter||o===we.positionFilter,c=!we.activeFilter||String(!!a.is_active)===we.activeFilter;return l&&d&&c});if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени служители.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>{var l;const i=Array.isArray(a.user_profiles)?a.user_profiles:a.user_profiles?[a.user_profiles]:[],o=i.length?i.map(d=>{const c=(d==null?void 0:d.username)||(d==null?void 0:d.id)||"";return c||""}).filter(Boolean).join(", "):"-";return`
        <tr data-employee-id="${a.id}">
          <td>${De(a.first_name??"")} ${De(a.last_name??"")}</td>
          <td>${De(o)}</td>
          <td>${De(((l=a.positions)==null?void 0:l.title)??"-")}</td>
          <td>${a.is_active?"Да":"Не"}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="profile"
                data-id="${a.id}"
              >
                Профил
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${a.id}"
                data-first-name="${De(a.first_name??"")}"
                data-last-name="${De(a.last_name??"")}"
                data-position-id="${a.position_id??""}"
                data-active="${a.is_active?"true":"false"}"
                data-photo-url="${De(a.photo_url??"")}"
                data-psych-expiry="${De(a.psychological_assessment_expiry??"")}"
                data-medical-expiry="${De(a.medical_certificate_expiry??"")}"
                data-license-expiry="${De(a.license_expiry??"")}"
              >
                Редакция
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}function sh(e){const t=e.querySelector("#employees-position-filter");if(!t)return;const r=we.positionFilter||"",n=[...new Set(we.rows.map(s=>{var a;return String(((a=s==null?void 0:s.positions)==null?void 0:a.title)||"").trim()}).filter(Boolean))].sort((s,a)=>s.localeCompare(a,"bg"));t.innerHTML=`
    <option value="">Всички</option>
    ${n.map(s=>`<option value="${De(s.toLowerCase())}">${De(s)}</option>`).join("")}
  `,t.value=r}const Ii="employee-photos";let kr=null;async function ah(e){e.innerHTML=rh,oh(e),await lh(e),await wa(e);const t=ih();t&&await Qo(e,t)}function ih(){return new URLSearchParams(window.location.search).get("profile")||""}function oh(e){const t=e.querySelector("#open-create-employee"),r=e.querySelector("#employee-form"),n=e.querySelector("#employee-cancel-btn"),s=e.querySelector("#employees-table-body"),a=e.querySelector("#employee-modal"),i=e.querySelector("#employee-delete-modal"),o=e.querySelector("#employee-profile-modal"),l=e.querySelector("#employee-modal-close"),d=e.querySelector("#employee-profile-close"),c=e.querySelector("#employee-profile-close-btn"),u=e.querySelector("#employee-delete-confirm"),h=e.querySelector("#employee-delete-cancel"),m=e.querySelector("#employees-search"),p=e.querySelector("#employees-position-filter"),f=e.querySelector("#employees-active-filter"),_=e.querySelector("#employees-filter-reset"),y=e.querySelector("#employee-photo-file"),g=e.querySelector("#employee-photo-remove-btn");t==null||t.addEventListener("click",()=>{Sa(e),Pn(a)}),r==null||r.addEventListener("submit",async b=>{b.preventDefault(),await dh(e)}),n==null||n.addEventListener("click",()=>{mt(a)}),l==null||l.addEventListener("click",()=>{mt(a)}),h==null||h.addEventListener("click",()=>{mt(i)}),d==null||d.addEventListener("click",()=>{mt(o)}),c==null||c.addEventListener("click",()=>{mt(o)}),m==null||m.addEventListener("input",b=>{we.searchQuery=b.target.value.trim().toLowerCase(),sr(e)}),p==null||p.addEventListener("change",b=>{we.positionFilter=b.target.value||"",sr(e)}),f==null||f.addEventListener("change",b=>{we.activeFilter=b.target.value||"",sr(e)}),_==null||_.addEventListener("click",()=>{we.searchQuery="",we.positionFilter="",we.activeFilter="",m&&(m.value=""),p&&(p.value=""),f&&(f.value=""),sr(e)}),y==null||y.addEventListener("change",()=>{var w,k,L,x;const b=((w=y.files)==null?void 0:w[0])??null;if(!b){const E=((k=e.querySelector("#employee-photo-path"))==null?void 0:k.value)||"";ar(e,E);return}if(!((L=b.type)!=null&&L.startsWith("image/"))){v("Избери валиден файл с изображение.","warning"),y.value="";const E=((x=e.querySelector("#employee-photo-path"))==null?void 0:x.value)||"";ar(e,E);return}ar(e,b)}),g==null||g.addEventListener("click",()=>{const b=e.querySelector("#employee-photo-path");b&&(b.value=""),y&&(y.value=""),ar(e,null)}),nh("employees",[i,o,a]),u==null||u.addEventListener("click",async()=>{const b=e.querySelector("#employee-delete-id").value;await uh(b,e)}),s==null||s.addEventListener("click",async b=>{const w=b.target.closest("button[data-action]");if(!w)return;const k=w.getAttribute("data-action");if(k==="profile"){const L=w.getAttribute("data-id");await Qo(e,L);return}if(k==="edit"){ch(e,{id:w.getAttribute("data-id"),firstName:w.getAttribute("data-first-name"),lastName:w.getAttribute("data-last-name"),positionId:w.getAttribute("data-position-id"),isActive:w.getAttribute("data-active")==="true",psychExpiry:w.getAttribute("data-psych-expiry"),medicalExpiry:w.getAttribute("data-medical-expiry"),licenseExpiry:w.getAttribute("data-license-expiry"),photoUrl:w.getAttribute("data-photo-url")}),Pn(a);return}if(k==="delete"){const L=w.getAttribute("data-id");e.querySelector("#employee-delete-id").value=L,Pn(i)}})}async function Qo(e,t){var c;const{data:r,error:n}=await S.from("employees").select("id, first_name, last_name, is_active, photo_url, psychological_assessment_expiry, medical_certificate_expiry, license_expiry, other_certificates, positions(title), user_profiles(id, username)").eq("id",t).maybeSingle();if(n||!r){v((n==null?void 0:n.message)||"Служителят не е намерен.","error");return}const s=Array.isArray(r.user_profiles)?r.user_profiles:r.user_profiles?[r.user_profiles]:[],a=s.length?s.map(u=>{const h=(u==null?void 0:u.username)||(u==null?void 0:u.id)||"";return h||""}).filter(Boolean).join(", "):"-",i=r.other_certificates?JSON.stringify(r.other_certificates,null,2):"-",o=Yo(r.photo_url),l=e.querySelector("#employee-profile-photo"),d=e.querySelector("#employee-profile-photo-empty");l&&d&&(o?(l.src=o,l.classList.remove("d-none"),d.classList.add("d-none")):(l.src="",l.classList.add("d-none"),d.classList.remove("d-none"))),e.querySelector("#employee-profile-name").textContent=`${r.first_name??""} ${r.last_name??""}`.trim()||"-",e.querySelector("#employee-profile-position").textContent=((c=r.positions)==null?void 0:c.title)||"-",e.querySelector("#employee-profile-active").textContent=r.is_active?"Да":"Не",e.querySelector("#employee-profile-linked-profiles").textContent=a,e.querySelector("#employee-profile-psych").textContent=r.psychological_assessment_expiry||"-",e.querySelector("#employee-profile-medical").textContent=r.medical_certificate_expiry||"-",e.querySelector("#employee-profile-license").textContent=r.license_expiry||"-",e.querySelector("#employee-profile-certificates").textContent=i,Pn(e.querySelector("#employee-profile-modal"))}function Yo(e){if(!e)return null;const t=String(e).trim();if(!t)return null;if(/^https?:\/\//i.test(t))return t;const r=t.replace(/^\/+/,""),n=["employee-photos","employees","employee_photos"],s=[],a=r.split("/");if(a.length>1){const o=a[0],l=a.slice(1).join("/");s.push({bucket:o,objectPath:l})}n.forEach(o=>{s.push({bucket:o,objectPath:r})});const i=new Set;for(const o of s){const l=`${o.bucket}/${o.objectPath}`;if(i.has(l)||!o.bucket||!o.objectPath)continue;i.add(l);const{data:d}=S.storage.from(o.bucket).getPublicUrl(o.objectPath);if(d!=null&&d.publicUrl)return d.publicUrl}return null}async function lh(e){const t=e.querySelector("#employee-position"),{data:r,error:n}=await S.from("positions").select("id, title").order("title",{ascending:!0});if(n){v(n.message,"error");return}const s=(r||[]).map(a=>`<option value="${a.id}">${De(a.title)}</option>`).join("");t.innerHTML='<option value="">Без позиция</option>'+s}async function dh(e){var C,$,A;const t=e.querySelector("#employee-id"),r=e.querySelector("#employee-first-name"),n=e.querySelector("#employee-last-name"),s=e.querySelector("#employee-position"),a=e.querySelector("#employee-active"),i=e.querySelector("#employee-psych-expiry"),o=e.querySelector("#employee-medical-expiry"),l=e.querySelector("#employee-license-expiry"),d=e.querySelector("#employee-photo-file"),c=e.querySelector("#employee-photo-path"),u=e.querySelector("#employee-save-btn"),h=r.value.trim(),m=n.value.trim(),p=s.value||null,f=a.checked,_=i.value||null,y=o.value||null,g=l.value||null,b=((C=d.files)==null?void 0:C[0])??null,w=c.value.trim()||null,k=t.value;if(!h||!m){v("Моля, попълни име и фамилия.","warning");return}const L=u.innerHTML;u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const x={first_name:h,last_name:m,position_id:p,is_active:f,psychological_assessment_expiry:_,medical_certificate_expiry:y,license_expiry:g,updated_at:new Date().toISOString()};if(b&&!(($=b.type)!=null&&$.startsWith("image/"))){u.disabled=!1,u.innerHTML=L,v("Избери валиден файл с изображение.","warning");return}let E,q=k||null,T=w;if(k){if(b){const D=await Di(b,k);if(!D){u.disabled=!1,u.innerHTML=L;return}T=D}x.photo_url=T,{error:E}=await S.from("employees").update(x).eq("id",k)}else{const{data:D}=await S.auth.getUser(),O=((A=D==null?void 0:D.user)==null?void 0:A.email)??"web_app",{data:U,error:z}=await S.from("employees").insert({...x,created_from:O}).select("id").single();if(E=z,q=(U==null?void 0:U.id)??null,!E&&q&&b){const W=await Di(b,q);if(!W){u.disabled=!1,u.innerHTML=L;return}const{error:H}=await S.from("employees").update({photo_url:W,updated_at:new Date().toISOString()}).eq("id",q);E=H,T=W}}if(u.disabled=!1,u.innerHTML=L,E){v(E.message,"error");return}v(k?"Служителят е обновен.":"Служителят е създаден.","success"),mt(e.querySelector("#employee-modal")),Sa(e),await wa(e)}function ch(e,t){e.querySelector("#employee-id").value=t.id,e.querySelector("#employee-first-name").value=t.firstName??"",e.querySelector("#employee-last-name").value=t.lastName??"",e.querySelector("#employee-position").value=t.positionId??"",e.querySelector("#employee-active").checked=!!t.isActive,e.querySelector("#employee-psych-expiry").value=t.psychExpiry??"",e.querySelector("#employee-medical-expiry").value=t.medicalExpiry??"",e.querySelector("#employee-license-expiry").value=t.licenseExpiry??"",e.querySelector("#employee-photo-path").value=t.photoUrl??"",e.querySelector("#employee-photo-file").value="",ar(e,t.photoUrl??null),e.querySelector("#employee-form-title").textContent="Редакция на служител",e.querySelector("#employee-save-btn").textContent="Запази"}function Sa(e){e.querySelector("#employee-id").value="",e.querySelector("#employee-first-name").value="",e.querySelector("#employee-last-name").value="",e.querySelector("#employee-position").value="",e.querySelector("#employee-active").checked=!0,e.querySelector("#employee-psych-expiry").value="",e.querySelector("#employee-medical-expiry").value="",e.querySelector("#employee-license-expiry").value="",e.querySelector("#employee-photo-path").value="",e.querySelector("#employee-photo-file").value="",ar(e,null),e.querySelector("#employee-form-title").textContent="Нов служител",e.querySelector("#employee-save-btn").textContent="Създай"}async function uh(e,t){const r=t.querySelector("#employee-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("employees").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,s){v(s.message,"error");return}v("Служителят е изтрит.","success"),mt(t.querySelector("#employee-delete-modal")),Sa(t),await wa(t)}async function Di(e,t){var o;if(!e||!t)return null;const n=(((o=e.name)==null?void 0:o.split(".").pop())||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"")||"jpg",s=Math.random().toString(36).slice(2,10),a=`${t}/${Date.now()}-${s}.${n}`,{error:i}=await S.storage.from(Ii).upload(a,e,{upsert:!0,contentType:e.type||void 0});return i?(v(i.message,"error"),null):`${Ii}/${a}`}function ar(e,t){const r=e.querySelector("#employee-photo-preview"),n=e.querySelector("#employee-photo-preview-empty");if(!r||!n)return;if(kr&&(URL.revokeObjectURL(kr),kr=null),!t){r.src="",r.classList.add("d-none"),n.classList.remove("d-none");return}if(t instanceof File){kr=URL.createObjectURL(t),r.src=kr,r.classList.remove("d-none"),n.classList.add("d-none");return}const s=Yo(t);if(!s){r.src="",r.classList.add("d-none"),n.classList.remove("d-none");return}r.src=s,r.classList.remove("d-none"),n.classList.add("d-none")}const ph=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Отсъствия</h1>\r
      <button id="open-create-employee-absence" type="button" class="btn btn-primary">Ново отсъствие</button>\r
    </div>\r
\r
    <p class="text-secondary">Управление на отсъствия на служители.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
        <button id="employee-absences-filter-reset" type="button" class="btn btn-sm btn-outline-secondary">Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-6">\r
          <label for="employee-absences-search" class="form-label">Търсене</label>\r
          <input id="employee-absences-search" type="text" class="form-control" placeholder="Търси по служител, причина, период или бележки" />\r
        </div>\r
        <div class="col-md-3">\r
          <label for="employee-absences-date-from" class="form-label">От дата</label>\r
          <input id="employee-absences-date-from" type="date" class="form-control" />\r
        </div>\r
        <div class="col-md-3">\r
          <label for="employee-absences-date-to" class="form-label">До дата</label>\r
          <input id="employee-absences-date-to" type="date" class="form-control" />\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th>Служител</th>\r
            <th>Причина</th>\r
            <th>От</th>\r
            <th>До</th>\r
            <th>Бележки</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="employee-absences-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="employee-absences-empty" class="text-secondary d-none mb-0"></p>\r
  </div>\r
</section>\r
\r
<div id="employee-absence-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="employee-absence-form-title" class="h5 mb-0">Ново отсъствие</h2>\r
          <button id="employee-absence-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="employee-absence-form">\r
          <input type="hidden" id="employee-absence-id" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-6">\r
              <label for="employee-absence-employee" class="form-label">Служител</label>\r
              <select id="employee-absence-employee" class="form-select" required>\r
                <option value="">Избери служител</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="employee-absence-reason" class="form-label">Причина</label>\r
              <select id="employee-absence-reason" class="form-select" required>\r
                <option value="">Избери причина</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="employee-absence-start-date" class="form-label">От дата</label>\r
              <input id="employee-absence-start-date" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="employee-absence-end-date" class="form-label">До дата</label>\r
              <input id="employee-absence-end-date" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-12">\r
              <label for="employee-absence-notes" class="form-label">Бележки</label>\r
              <textarea id="employee-absence-notes" class="form-control" rows="3" maxlength="2000"></textarea>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="employee-absence-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="employee-absence-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="employee-absence-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш това отсъствие?</p>\r
        <input type="hidden" id="employee-absence-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="employee-absence-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="employee-absence-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function ws(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Pi=new Map;function hh(e,t){const r=Pi.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){hr(a);return}}};Pi.set(e,n),document.addEventListener("keydown",n)}function hr(e){var t,r;e.classList.add("d-none"),(t=document.querySelector("#employee-absence-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#employee-absence-delete-modal"))!=null&&r.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Je(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const ve={rows:[],searchQuery:"",dateFrom:"",dateTo:""};function Oi(e){return e&&`${e.first_name??""} ${e.last_name??""}`.trim()||"-"}async function ka(e){const{data:t,error:r}=await S.from("employee_absences").select("id, employee_id, reason_id, start_date, end_date, notes, employees(first_name, last_name), absence_reasons(name)").order("start_date",{ascending:!1}).order("end_date",{ascending:!1});if(r){v(r.message,"error"),ve.rows=[],ir(e,"Грешка при зареждане на отсъствията.");return}ve.rows=t||[],ir(e)}function ir(e,t){const r=e.querySelector("#employee-absences-table-body"),n=e.querySelector("#employee-absences-empty"),s=ve.rows.filter(a=>{var p;const i=Oi(a.employees).toLowerCase(),o=(((p=a.absence_reasons)==null?void 0:p.name)||"").toLowerCase(),l=String(a.start_date||"").toLowerCase(),d=String(a.end_date||"").toLowerCase(),c=String(a.notes||"").toLowerCase(),u=!ve.searchQuery||i.includes(ve.searchQuery)||o.includes(ve.searchQuery)||l.includes(ve.searchQuery)||d.includes(ve.searchQuery)||c.includes(ve.searchQuery),h=!ve.dateFrom||String(a.end_date||"")>=ve.dateFrom,m=!ve.dateTo||String(a.start_date||"")<=ve.dateTo;return u&&h&&m});if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени отсъствия.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>{var i;return`
        <tr>
          <td>${Je(Oi(a.employees))}</td>
          <td>${Je(((i=a.absence_reasons)==null?void 0:i.name)??"-")}</td>
          <td>${Je(a.start_date??"-")}</td>
          <td>${Je(a.end_date??"-")}</td>
          <td>${Je(a.notes??"")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${a.id}"
                data-employee-id="${a.employee_id??""}"
                data-reason-id="${a.reason_id??""}"
                data-start-date="${Je(a.start_date??"")}"
                data-end-date="${Je(a.end_date??"")}"
                data-notes="${Je(a.notes??"")}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${a.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}async function mh(e){e.innerHTML=ph,fh(e),await yh(e),await bh(e),await ka(e)}function fh(e){const t=e.querySelector("#open-create-employee-absence"),r=e.querySelector("#employee-absence-form"),n=e.querySelector("#employee-absence-cancel-btn"),s=e.querySelector("#employee-absences-table-body"),a=e.querySelector("#employee-absence-modal"),i=e.querySelector("#employee-absence-delete-modal"),o=e.querySelector("#employee-absence-modal-close"),l=e.querySelector("#employee-absence-delete-confirm"),d=e.querySelector("#employee-absence-delete-cancel"),c=e.querySelector("#employee-absences-search"),u=e.querySelector("#employee-absences-date-from"),h=e.querySelector("#employee-absences-date-to"),m=e.querySelector("#employee-absences-filter-reset");t==null||t.addEventListener("click",()=>{xa(e),ws(a)}),r==null||r.addEventListener("submit",async p=>{p.preventDefault(),await vh(e)}),n==null||n.addEventListener("click",()=>{hr(a)}),o==null||o.addEventListener("click",()=>{hr(a)}),d==null||d.addEventListener("click",()=>{hr(i)}),c==null||c.addEventListener("input",p=>{ve.searchQuery=p.target.value.trim().toLowerCase(),ir(e)}),u==null||u.addEventListener("change",p=>{ve.dateFrom=p.target.value||"",ir(e)}),h==null||h.addEventListener("change",p=>{ve.dateTo=p.target.value||"",ir(e)}),m==null||m.addEventListener("click",()=>{ve.searchQuery="",ve.dateFrom="",ve.dateTo="",c&&(c.value=""),u&&(u.value=""),h&&(h.value=""),ir(e)}),hh("employee-absences",[i,a]),l==null||l.addEventListener("click",async()=>{const p=e.querySelector("#employee-absence-delete-id").value;await _h(p,e)}),s==null||s.addEventListener("click",p=>{const f=p.target.closest("button[data-action]");if(!f)return;const _=f.getAttribute("data-action");if(_==="edit"){gh(e,{id:f.getAttribute("data-id"),employeeId:f.getAttribute("data-employee-id"),reasonId:f.getAttribute("data-reason-id"),startDate:f.getAttribute("data-start-date"),endDate:f.getAttribute("data-end-date"),notes:f.getAttribute("data-notes")}),ws(a);return}if(_==="delete"){const y=f.getAttribute("data-id");e.querySelector("#employee-absence-delete-id").value=y,ws(i)}})}async function yh(e){const t=e.querySelector("#employee-absence-employee"),{data:r,error:n}=await S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(n){v(n.message,"error");return}const s=(r||[]).map(a=>{const i=`${a.first_name??""} ${a.last_name??""}`.trim()||"-";return`<option value="${a.id}">${Je(i)}</option>`}).join("");t.innerHTML='<option value="">Избери служител</option>'+s}async function bh(e){const t=e.querySelector("#employee-absence-reason"),{data:r,error:n}=await S.from("absence_reasons").select("id, name").order("name",{ascending:!0});if(n){v(n.message,"error");return}const s=(r||[]).map(a=>`<option value="${a.id}">${Je(a.name??"-")}</option>`).join("");t.innerHTML='<option value="">Избери причина</option>'+s}async function vh(e){var y;const t=e.querySelector("#employee-absence-id"),r=e.querySelector("#employee-absence-employee"),n=e.querySelector("#employee-absence-reason"),s=e.querySelector("#employee-absence-start-date"),a=e.querySelector("#employee-absence-end-date"),i=e.querySelector("#employee-absence-notes"),o=e.querySelector("#employee-absence-save-btn"),l=r.value||null,d=n.value||null,c=s.value,u=a.value,h=i.value.trim()||null,m=t.value;if(!l||!d||!c||!u){v("Моля, попълни всички задължителни полета.","warning");return}if(u<c){v('Полето "До дата" трябва да е след или равно на "От дата".',"warning");return}const p=o.innerHTML;o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const f={employee_id:l,reason_id:d,start_date:c,end_date:u,notes:h};let _;if(m)({error:_}=await S.from("employee_absences").update(f).eq("id",m));else{const{data:g}=await S.auth.getUser(),b=((y=g==null?void 0:g.user)==null?void 0:y.email)??"web_app";({error:_}=await S.from("employee_absences").insert({...f,created_from:b}))}if(o.disabled=!1,o.innerHTML=p,_){v(_.message,"error");return}v(m?"Отсъствието е обновено.":"Отсъствието е създадено.","success"),hr(e.querySelector("#employee-absence-modal")),xa(e),await ka(e)}function gh(e,t){e.querySelector("#employee-absence-id").value=t.id,e.querySelector("#employee-absence-employee").value=t.employeeId??"",e.querySelector("#employee-absence-reason").value=t.reasonId??"",e.querySelector("#employee-absence-start-date").value=t.startDate??"",e.querySelector("#employee-absence-end-date").value=t.endDate??"",e.querySelector("#employee-absence-notes").value=t.notes??"",e.querySelector("#employee-absence-form-title").textContent="Редакция на отсъствие",e.querySelector("#employee-absence-save-btn").textContent="Запази"}function xa(e){e.querySelector("#employee-absence-id").value="",e.querySelector("#employee-absence-employee").value="",e.querySelector("#employee-absence-reason").value="",e.querySelector("#employee-absence-start-date").value="",e.querySelector("#employee-absence-end-date").value="",e.querySelector("#employee-absence-notes").value="",e.querySelector("#employee-absence-form-title").textContent="Ново отсъствие",e.querySelector("#employee-absence-save-btn").textContent="Създай"}async function _h(e,t){const r=t.querySelector("#employee-absence-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("employee_absences").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,s){v(s.message,"error");return}v("Отсъствието е изтрито.","success"),hr(t.querySelector("#employee-absence-delete-modal")),xa(t),await ka(t)}const wh=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Планирани повески</h1>\r
      <div class="d-flex gap-2">\r
        <button id="go-to-plan-schedule" type="button" class="btn btn-outline-secondary" disabled>Към План-График</button>\r
        <button id="add-selected-to-actual-duty" type="button" class="btn btn-outline-success" disabled>Към Актуални</button>\r
        <button id="open-bulk-delete-planned-duty" type="button" class="btn btn-outline-danger" disabled>Изтрий избраните</button>\r
        <button id="open-auto-plan-duty" type="button" class="btn btn-outline-primary">Автоматично планиране</button>\r
        <button id="open-create-planned-duty" type="button" class="btn btn-primary">Ново планиране</button>\r
      </div>\r
    </div>\r
\r
    <p class="text-secondary">Планиране на служители по повески за конкретна дата.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
        <button id="planned-duties-filter-reset" type="button" class="btn btn-sm btn-outline-secondary">Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-5">\r
          <label for="planned-duties-search" class="form-label">Търсене</label>\r
          <input id="planned-duties-search" type="text" class="form-control" placeholder="Търси по служител, повеска или дата" />\r
        </div>\r
        <div class="col-md-4">\r
          <label for="planned-duties-date-filter" class="form-label">Филтър по дата</label>\r
          <input id="planned-duties-date-filter" type="date" class="form-control" />\r
        </div>\r
        <div class="col-md-3">\r
          <label for="planned-duties-role-filter" class="form-label">Роля</label>\r
          <select id="planned-duties-role-filter" class="form-select">\r
            <option value="">Всички</option>\r
            <option value="conductor">Кондуктор</option>\r
            <option value="chief">Началник влак</option>\r
          </select>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th style="width: 42px;">\r
              <input id="planned-duties-select-all" class="form-check-input" type="checkbox" aria-label="Избери всички" />\r
            </th>\r
            <th>Дата</th>\r
            <th>Служител</th>\r
            <th>Роля</th>\r
            <th>Повеска</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="planned-duties-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="planned-duties-empty" class="text-secondary d-none mb-0"></p>\r
  </div>\r
</section>\r
\r
<div id="planned-duty-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="planned-duty-form-title" class="h5 mb-0">Ново планиране</h2>\r
          <button id="planned-duty-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="planned-duty-form">\r
          <input type="hidden" id="planned-duty-id" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-4">\r
              <label for="planned-duty-date" class="form-label">Дата</label>\r
              <input id="planned-duty-date" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="planned-duty-employee" class="form-label">Служител</label>\r
              <select id="planned-duty-employee" class="form-select" required>\r
                <option value="">Избери служител</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="planned-duty-assignment-role" class="form-label">Роля</label>\r
              <select id="planned-duty-assignment-role" class="form-select" required>\r
                <option value="conductor">Кондуктор</option>\r
                <option value="chief">Началник влак</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="planned-duty-schedule-key" class="form-label">Ключ-график</label>\r
              <select id="planned-duty-schedule-key" class="form-select" required>\r
                <option value="">Избери ключ-график</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="planned-duty-duty" class="form-label">Повеска</label>\r
              <select id="planned-duty-duty" class="form-select" required>\r
                <option value="">Избери повеска</option>\r
              </select>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="planned-duty-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="planned-duty-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="planned-duty-auto-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 860px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Автоматично планиране</h2>\r
          <button id="planned-duty-auto-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="planned-duty-auto-form">\r
          <div class="row g-3">\r
            <div class="col-md-6">\r
              <label for="planned-duty-auto-employee" class="form-label">Служител</label>\r
              <select id="planned-duty-auto-employee" class="form-select" required>\r
                <option value="">Избери служител</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="planned-duty-auto-assignment-role" class="form-label">Роля</label>\r
              <select id="planned-duty-auto-assignment-role" class="form-select" required>\r
                <option value="conductor">Кондуктор</option>\r
                <option value="chief">Началник влак</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="planned-duty-auto-date-from" class="form-label">От дата</label>\r
              <input id="planned-duty-auto-date-from" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="planned-duty-auto-date-to" class="form-label">До дата</label>\r
              <input id="planned-duty-auto-date-to" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="planned-duty-auto-schedule-key" class="form-label">Ключ-график</label>\r
              <select id="planned-duty-auto-schedule-key" class="form-select" required>\r
                <option value="">Избери ключ-график</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-6">\r
              <label for="planned-duty-auto-start-duty" class="form-label">Стартова повеска</label>\r
              <select id="planned-duty-auto-start-duty" class="form-select" required>\r
                <option value="">Първо избери ключ-график</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-12">\r
              <div class="form-check mt-1">\r
                <input class="form-check-input" type="checkbox" id="planned-duty-auto-overwrite" />\r
                <label class="form-check-label" for="planned-duty-auto-overwrite">\r
                  Презапиши съществуващите планирания за служителя в избрания период\r
                </label>\r
              </div>\r
              <div class="form-text text-danger">\r
                Внимание: при включено презаписване всички съществуващи планирания на избрания служител за периода ще бъдат изтрити и заменени с новите.\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="planned-duty-auto-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="planned-duty-auto-save-btn" type="submit" class="btn btn-primary">Генерирай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="planned-duty-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш това планиране?</p>\r
        <input type="hidden" id="planned-duty-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="planned-duty-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="planned-duty-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="planned-duty-bulk-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди масово изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш избраните планирания (<span id="planned-duty-bulk-delete-count">0</span>)?</p>\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="planned-duty-bulk-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="planned-duty-bulk-delete-confirm" type="button" class="btn btn-danger">Изтрий избраните</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Or(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Mi=new Map;function Sh(e,t){const r=Mi.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){He(a);return}}};Mi.set(e,n),document.addEventListener("keydown",n)}function He(e){var t,r,n,s;e.classList.add("d-none"),(t=document.querySelector("#planned-duty-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#planned-duty-delete-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#planned-duty-auto-modal"))!=null&&n.classList.contains("d-none"))&&((s=document.querySelector("#planned-duty-bulk-delete-modal"))!=null&&s.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function rt(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const G={rows:[],searchQuery:"",dateFilter:"",roleFilter:"",selectedIds:[],visibleRowIds:[]};function ji(e){return e&&`${e.first_name??""} ${e.last_name??""}`.trim()||"-"}async function mr(e){const{data:t,error:r}=await S.from("planned_duties").select("id, date, employee_id, duty_id, assignment_role, employees(first_name, last_name), duties(name, schedule_key_duties(schedule_key_id))").order("date",{ascending:!1});if(r){v(r.message,"error"),G.rows=[],ot(e,"Грешка при зареждане на планираните повески.");return}G.rows=t||[],ot(e)}function ot(e,t){const r=e.querySelector("#planned-duties-table-body"),n=e.querySelector("#planned-duties-empty"),s=e.querySelector("#planned-duties-select-all"),a=e.querySelector("#open-bulk-delete-planned-duty"),i=e.querySelector("#add-selected-to-actual-duty");G.selectedIds=G.selectedIds.filter(d=>G.rows.some(c=>c.id===d));const o=G.rows.filter(d=>{var _;const c=ji(d.employees).toLowerCase(),u=(((_=d.duties)==null?void 0:_.name)||"").toLowerCase(),h=(d.date||"").toLowerCase(),m=!G.searchQuery||c.includes(G.searchQuery)||u.includes(G.searchQuery)||h.includes(G.searchQuery),p=!G.dateFilter||d.date===G.dateFilter,f=!G.roleFilter||d.assignment_role===G.roleFilter;return m&&p&&f});if(!o.length){G.visibleRowIds=[],r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма планирани повески.",s&&(s.checked=!1,s.indeterminate=!1,s.disabled=!0),a&&(a.disabled=G.selectedIds.length===0,a.textContent=G.selectedIds.length?`Изтрий избраните (${G.selectedIds.length})`:"Изтрий избраните"),i&&(i.disabled=G.selectedIds.length===0,i.textContent=G.selectedIds.length?`Към Актуални (${G.selectedIds.length})`:"Към Актуални");return}G.visibleRowIds=o.map(d=>d.id),n.classList.add("d-none"),r.innerHTML=o.map(d=>{var h;const c=kh(d),u=G.selectedIds.includes(d.id);return`
        <tr>
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              data-select-id="${d.id}"
              ${u?"checked":""}
              aria-label="Избери планиране"
            />
          </td>
          <td>${rt(d.date??"-")}</td>
          <td>${rt(ji(d.employees))}</td>
          <td>${rt(xh(d.assignment_role))}</td>
          <td>${rt(((h=d.duties)==null?void 0:h.name)??"-")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${d.id}"
                data-date="${rt(d.date??"")}"
                data-employee-id="${d.employee_id??""}"
                data-duty-id="${d.duty_id??""}"
                data-assignment-role="${d.assignment_role??"conductor"}"
                data-duty-schedule-key-id="${c}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${d.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("");const l=o.filter(d=>G.selectedIds.includes(d.id)).length;s&&(s.disabled=!1,s.checked=l>0&&l===o.length,s.indeterminate=l>0&&l<o.length),a&&(a.disabled=G.selectedIds.length===0,a.textContent=G.selectedIds.length?`Изтрий избраните (${G.selectedIds.length})`:"Изтрий избраните"),i&&(i.disabled=G.selectedIds.length===0,i.textContent=G.selectedIds.length?`Към Актуални (${G.selectedIds.length})`:"Към Актуални")}function kh(e){var r,n,s;return((s=(Array.isArray((r=e==null?void 0:e.duties)==null?void 0:r.schedule_key_duties)?e.duties.schedule_key_duties:(n=e==null?void 0:e.duties)!=null&&n.schedule_key_duties?[e.duties.schedule_key_duties]:[]).find(a=>a==null?void 0:a.schedule_key_id))==null?void 0:s.schedule_key_id)||""}function xh(e){return e==="chief"?"Началник влак":"Кондуктор"}let qa=[];async function qh(e){const t=e.querySelector("#planned-duty-employee"),r=e.querySelector("#planned-duty-auto-employee"),{data:n,error:s}=await S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(s){v(s.message,"error");return}const i='<option value="">Избери служител</option>'+(n||[]).map(o=>{const l=`${o.first_name??""} ${o.last_name??""}`.trim()||"-";return`<option value="${o.id}">${rt(l)}</option>`}).join("");t.innerHTML=i,r.innerHTML=i}async function Lh(e){const t=e.querySelector("#planned-duty-schedule-key"),r=e.querySelector("#planned-duty-auto-schedule-key"),{data:n,error:s}=await S.from("schedule_keys").select("id, name, crew_role").order("name",{ascending:!0});if(s){v(s.message,"error");return}const i='<option value="">Избери ключ-график</option>'+(n||[]).map(o=>{const l=Th(o.crew_role),d=l?`${o.name??"-"} (${l})`:o.name??"-";return`<option value="${o.id}">${rt(d)}</option>`}).join("");t.innerHTML=i,r.innerHTML=i}function Th(e){return e==="началник влак"?"Началник влак":e==="кондуктор"?"Кондуктор":""}async function Eh(e){const{data:t,error:r}=await S.from("schedule_key_duties").select("schedule_key_id, duty_id, duties(id, name)");if(r){v(r.message,"error");return}const n=new Map;(t||[]).forEach(s=>{const a=s==null?void 0:s.duties;if(!(a!=null&&a.id))return;const i=n.get(a.id)||{id:a.id,name:a.name||"-",scheduleKeyIds:[]};s.schedule_key_id&&!i.scheduleKeyIds.includes(s.schedule_key_id)&&i.scheduleKeyIds.push(s.schedule_key_id),n.set(a.id,i)}),qa=Array.from(n.values()).sort((s,a)=>String(s.name||"").localeCompare(String(a.name||""),"bg")),ss(e,"","")}function ss(e,t,r){const n=e.querySelector("#planned-duty-duty");if(!n)return;if(!t){n.innerHTML='<option value="">Първо избери ключ-график</option>',n.value="";return}const s=qa.filter(a=>{var i;return(i=a.scheduleKeyIds)==null?void 0:i.includes(t)}).map(a=>{const i=a.id===r?"selected":"";return`<option value="${a.id}" ${i}>${rt(a.name??"-")}</option>`}).join("");n.innerHTML='<option value="">Избери повеска</option>'+s,r&&(n.value=r)}function $h(e,t){var n;const r=qa.find(s=>s.id===e);return!!(r&&((n=r.scheduleKeyIds)!=null&&n.includes(t)))}const Ss=new Map;async function Ni(e,t,r){const n=e.querySelector("#planned-duty-auto-start-duty");if(!n)return;if(!t){n.innerHTML='<option value="">Първо избери ключ-график</option>',n.value="";return}const s=await Zo(t);if(!s.length){n.innerHTML='<option value="">Няма повески за този ключ-график</option>',n.value="";return}const a=s.map(i=>{const o=i.id===r?"selected":"";return`<option value="${i.id}" ${o}>${rt(i.name??"-")}</option>`}).join("");n.innerHTML='<option value="">Избери стартова повеска</option>'+a}function Xo(e){e.querySelector("#planned-duty-auto-employee").value="",e.querySelector("#planned-duty-auto-assignment-role").value="conductor",e.querySelector("#planned-duty-auto-date-from").value="",e.querySelector("#planned-duty-auto-date-to").value="",e.querySelector("#planned-duty-auto-schedule-key").value="",e.querySelector("#planned-duty-auto-overwrite").checked=!1,e.querySelector("#planned-duty-auto-start-duty").innerHTML='<option value="">Първо избери ключ-график</option>'}async function Ah(e,t){var E;const r=e.querySelector("#planned-duty-auto-employee").value||null,n=e.querySelector("#planned-duty-auto-assignment-role").value||"",s=e.querySelector("#planned-duty-auto-date-from").value,a=e.querySelector("#planned-duty-auto-date-to").value,i=e.querySelector("#planned-duty-auto-schedule-key").value||null,o=e.querySelector("#planned-duty-auto-start-duty").value||null,l=e.querySelector("#planned-duty-auto-overwrite").checked,d=e.querySelector("#planned-duty-auto-save-btn");if(!r||!n||!s||!a||!i||!o){v("Моля, попълни всички полета за автоматично планиране.","warning");return}if(!["chief","conductor"].includes(n)){v("Невалидна роля. Избери Кондуктор или Началник влак.","warning");return}if(a<s){v('Полето "До дата" трябва да е след или равно на "От дата".',"warning");return}const c=await Zo(i);if(!c.length){v("Няма повески за избрания ключ-график.","warning");return}const u=c.findIndex(q=>q.id===o);if(u<0){v("Избери валидна стартова повеска.","warning");return}const h=Ch(s,a);if(!h.length){v("Невалиден период.","warning");return}const m=d.innerHTML;d.disabled=!0,d.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Генериране...';const{data:p}=await S.auth.getUser(),f=((E=p==null?void 0:p.user)==null?void 0:E.email)??"web_app",{data:_,error:y}=await S.from("planned_duties").select("date").eq("employee_id",r).gte("date",s).lte("date",a);if(y){d.disabled=!1,d.innerHTML=m,v(y.message,"error");return}const g=new Set((_||[]).map(q=>q.date)),b=g.size,w=[];let k=0;if(h.forEach((q,T)=>{if(!l&&g.has(q)){k+=1;return}const C=c[(u+T)%c.length];w.push({date:q,employee_id:r,assignment_role:n,duty_id:C.id,created_from:f})}),!w.length){d.disabled=!1,d.innerHTML=m,v("Няма нови записи за създаване. За периода вече има планиране за служителя.","warning");return}if(l){const{error:q}=await S.from("planned_duties").delete().eq("employee_id",r).gte("date",s).lte("date",a);if(q){d.disabled=!1,d.innerHTML=m,v(q.message,"error");return}}let L=null;for(let q=0;q<w.length;q+=200){const T=w.slice(q,q+200),{error:C}=await S.from("planned_duties").insert(T);if(C){L=C;break}}if(d.disabled=!1,d.innerHTML=m,L){v(L.message,"error");return}He(e.querySelector("#planned-duty-auto-modal")),Xo(e),await t();const x=w.length;if(l){v(`Създадени записи: ${x}. Презаписани дати: ${b}.`,"success");return}if(k>0){v(`Създадени: ${x}. Пропуснати (вече съществуват за датата): ${k}.`,"success");return}v(`Създадени записи: ${x}.`,"success")}async function Zo(e){if(!e)return[];if(Ss.has(e))return Ss.get(e);const{data:t,error:r}=await S.from("schedule_key_duties").select("duty_id, duties(id, name, display_order)").eq("schedule_key_id",e);if(r)return v(r.message,"error"),[];const n=(t||[]).map(s=>{var a,i,o;return{id:(a=s==null?void 0:s.duties)==null?void 0:a.id,name:((i=s==null?void 0:s.duties)==null?void 0:i.name)||"-",displayOrder:Number((o=s==null?void 0:s.duties)==null?void 0:o.display_order)||0}}).filter(s=>s.id).sort((s,a)=>s.displayOrder!==a.displayOrder?s.displayOrder-a.displayOrder:String(s.name||"").localeCompare(String(a.name||""),"bg"));return Ss.set(e,n),n}function Ch(e,t){const r=[],n=new Date(`${e}T00:00:00`),s=new Date(`${t}T00:00:00`);if(Number.isNaN(n.getTime())||Number.isNaN(s.getTime())||n>s)return r;for(let a=new Date(n);a<=s;a.setDate(a.getDate()+1)){const i=a.getFullYear(),o=String(a.getMonth()+1).padStart(2,"0"),l=String(a.getDate()).padStart(2,"0");r.push(`${i}-${o}-${l}`)}return r}function Rh(e){if(!G.selectedIds.length){v("Избери поне едно планиране за изтриване.","warning");return}const t=e.querySelector("#planned-duty-bulk-delete-count");t&&(t.textContent=String(G.selectedIds.length)),Or(e.querySelector("#planned-duty-bulk-delete-modal"))}function Ih(e){const t=G.visibleRowIds||[];if(e){const r=new Set(G.selectedIds);t.forEach(n=>r.add(n)),G.selectedIds=Array.from(r);return}G.selectedIds=G.selectedIds.filter(r=>!t.includes(r))}function Dh(e,t){if(e){if(t){G.selectedIds.includes(e)||(G.selectedIds=[...G.selectedIds,e]);return}G.selectedIds=G.selectedIds.filter(r=>r!==e)}}async function Ph(e,t){const r=e.querySelector("#planned-duty-bulk-delete-confirm"),n=[...G.selectedIds];if(!n.length){He(e.querySelector("#planned-duty-bulk-delete-modal"));return}const s=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';let a=null;for(let o=0;o<n.length;o+=200){const l=n.slice(o,o+200),{error:d}=await S.from("planned_duties").delete().in("id",l);if(d){a=d;break}}if(r.disabled=!1,r.innerHTML=s,a){v(a.message,"error");return}const i=n.length;G.selectedIds=[],He(e.querySelector("#planned-duty-bulk-delete-modal")),await t(),v(`Изтрити планирания: ${i}.`,"success")}async function Oh(e,t){const r=e.querySelector("#add-selected-to-actual-duty"),n=[...G.selectedIds];if(!n.length){v("Избери поне едно планиране за прехвърляне към Актуални.","warning");return}const s=new Set(n),a=G.rows.filter(c=>s.has(c.id));if(!a.length){v("Няма валидни избрани планирания за прехвърляне.","warning");return}const i=a.filter(c=>(c==null?void 0:c.date)&&(c==null?void 0:c.employee_id)&&(c==null?void 0:c.duty_id)).map(c=>({date:c.date,employee_id:c.employee_id,duty_id:c.duty_id,assignment_role:c.assignment_role||"conductor"}));if(!i.length){v("Избраните записи са невалидни за прехвърляне.","warning");return}const o=(r==null?void 0:r.innerHTML)||"Към Актуални";r&&(r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Прехвърляне...');let l=null;for(let c=0;c<i.length;c+=200){const u=i.slice(c,c+200),{error:h}=await S.from("actual_duties").upsert(u,{onConflict:"date,employee_id,duty_id",ignoreDuplicates:!0});if(h){l=h;break}}if(r&&(r.disabled=!1,r.innerHTML=o),l){v(l.message,"error");return}const d=i.length;G.selectedIds=[],await t(),v(`Прехвърлени към Актуални: ${d}. Съществуващите са пропуснати.`,"success")}async function Mh(e){e.innerHTML=wh,jh(e),await qh(e),await Lh(e),await Eh(e),await mr(e)}function jh(e){const t=e.querySelector("#open-create-planned-duty"),r=e.querySelector("#open-bulk-delete-planned-duty"),n=e.querySelector("#add-selected-to-actual-duty"),s=e.querySelector("#go-to-plan-schedule"),a=e.querySelector("#open-auto-plan-duty"),i=e.querySelector("#planned-duty-form"),o=e.querySelector("#planned-duty-auto-form"),l=e.querySelector("#planned-duty-cancel-btn"),d=e.querySelector("#planned-duty-auto-cancel-btn"),c=e.querySelector("#planned-duties-table-body"),u=e.querySelector("#planned-duty-modal"),h=e.querySelector("#planned-duty-auto-modal"),m=e.querySelector("#planned-duty-delete-modal"),p=e.querySelector("#planned-duty-bulk-delete-modal"),f=e.querySelector("#planned-duty-modal-close"),_=e.querySelector("#planned-duty-auto-modal-close"),y=e.querySelector("#planned-duty-delete-confirm"),g=e.querySelector("#planned-duty-delete-cancel"),b=e.querySelector("#planned-duty-bulk-delete-confirm"),w=e.querySelector("#planned-duty-bulk-delete-cancel"),k=e.querySelector("#planned-duties-select-all"),L=e.querySelector("#planned-duties-search"),x=e.querySelector("#planned-duties-date-filter"),E=e.querySelector("#planned-duties-role-filter"),q=e.querySelector("#planned-duties-filter-reset"),T=e.querySelector("#planned-duty-schedule-key"),C=e.querySelector("#planned-duty-auto-schedule-key");t==null||t.addEventListener("click",()=>{La(e),Or(u)}),r==null||r.addEventListener("click",()=>{Rh(e)}),n==null||n.addEventListener("click",async()=>{await Oh(e,async()=>{await mr(e)})}),a==null||a.addEventListener("click",async()=>{Xo(e),Or(h),await Ni(e,(C==null?void 0:C.value)||"","")}),i==null||i.addEventListener("submit",async $=>{$.preventDefault(),await Nh(e)}),o==null||o.addEventListener("submit",async $=>{$.preventDefault(),await Ah(e,async()=>{await mr(e)})}),l==null||l.addEventListener("click",()=>{He(u)}),f==null||f.addEventListener("click",()=>{He(u)}),_==null||_.addEventListener("click",()=>{He(h)}),d==null||d.addEventListener("click",()=>{He(h)}),g==null||g.addEventListener("click",()=>{He(m)}),w==null||w.addEventListener("click",()=>{He(p)}),L==null||L.addEventListener("input",$=>{G.searchQuery=$.target.value.trim().toLowerCase(),ot(e)}),x==null||x.addEventListener("change",$=>{G.dateFilter=$.target.value||"",ks(s,G.dateFilter),ot(e)}),E==null||E.addEventListener("change",$=>{G.roleFilter=$.target.value||"",ot(e)}),q==null||q.addEventListener("click",()=>{G.searchQuery="",G.dateFilter="",G.roleFilter="",L&&(L.value=""),x&&(x.value=""),E&&(E.value=""),ks(s,G.dateFilter),ot(e)}),s==null||s.addEventListener("click",()=>{const $=G.dateFilter||(x==null?void 0:x.value)||"";if(!$){v("Избери дата от филтъра, за да отвориш План-График.","warning");return}const A=new URLSearchParams({date:$});window.history.pushState({},"",`/plan-schedule?${A.toString()}`),window.dispatchEvent(new PopStateEvent("popstate"))}),ks(s,G.dateFilter||(x==null?void 0:x.value)||""),T==null||T.addEventListener("change",()=>{ss(e,T.value||"","")}),C==null||C.addEventListener("change",async()=>{await Ni(e,C.value||"","")}),k==null||k.addEventListener("change",()=>{Ih(k.checked),ot(e)}),Sh("planned-duties",[m,p,h,u]),y==null||y.addEventListener("click",async()=>{const $=e.querySelector("#planned-duty-delete-id").value;await Uh($,e)}),b==null||b.addEventListener("click",async()=>{await Ph(e,async()=>{await mr(e)})}),c==null||c.addEventListener("change",$=>{const A=$.target.closest("input[data-select-id]");if(!A)return;const D=A.getAttribute("data-select-id");Dh(D,A.checked),ot(e)}),c==null||c.addEventListener("click",$=>{const A=$.target.closest("button[data-action]");if(!A)return;const D=A.getAttribute("data-action");if(D==="edit"){Hh(e,{id:A.getAttribute("data-id"),date:A.getAttribute("data-date"),employeeId:A.getAttribute("data-employee-id"),assignmentRole:A.getAttribute("data-assignment-role")||"conductor",dutyId:A.getAttribute("data-duty-id"),dutyScheduleKeyId:A.getAttribute("data-duty-schedule-key-id")}),Or(u);return}if(D==="delete"){const O=A.getAttribute("data-id");e.querySelector("#planned-duty-delete-id").value=O,Or(m)}})}async function Nh(e){var y;const t=e.querySelector("#planned-duty-id"),r=e.querySelector("#planned-duty-date"),n=e.querySelector("#planned-duty-employee"),s=e.querySelector("#planned-duty-assignment-role"),a=e.querySelector("#planned-duty-schedule-key"),i=e.querySelector("#planned-duty-duty"),o=e.querySelector("#planned-duty-save-btn"),l=r.value,d=n.value||null,c=s.value||"",u=a.value||null,h=i.value||null,m=t.value;if(!l||!d||!c||!u||!h){v("Моля, попълни всички полета.","warning");return}if(!["chief","conductor"].includes(c)){v("Невалидна роля. Избери Кондуктор или Началник влак.","warning");return}if(!$h(h,u)){v("Избери повеска от посочения ключ-график.","warning");return}const p=o.innerHTML;o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const f={date:l,employee_id:d,assignment_role:c,duty_id:h};let _;if(m)({error:_}=await S.from("planned_duties").update(f).eq("id",m));else{const{data:g}=await S.auth.getUser(),b=((y=g==null?void 0:g.user)==null?void 0:y.email)??"web_app";({error:_}=await S.from("planned_duties").insert({...f,created_from:b}))}if(o.disabled=!1,o.innerHTML=p,_){if(_.code==="23505"){v("Това планиране вече съществува за тази дата.","warning");return}v(_.message,"error");return}v(m?"Планирането е обновено.":"Планирането е създадено.","success"),He(e.querySelector("#planned-duty-modal")),La(e),await mr(e)}function Hh(e,t){e.querySelector("#planned-duty-id").value=t.id,e.querySelector("#planned-duty-date").value=t.date??"",e.querySelector("#planned-duty-employee").value=t.employeeId??"",e.querySelector("#planned-duty-assignment-role").value=t.assignmentRole??"conductor",e.querySelector("#planned-duty-schedule-key").value=t.dutyScheduleKeyId??"",ss(e,t.dutyScheduleKeyId??"",t.dutyId??""),e.querySelector("#planned-duty-form-title").textContent="Редакция на планиране",e.querySelector("#planned-duty-save-btn").textContent="Запази"}function La(e){e.querySelector("#planned-duty-id").value="",e.querySelector("#planned-duty-date").value="",e.querySelector("#planned-duty-employee").value="",e.querySelector("#planned-duty-assignment-role").value="conductor",e.querySelector("#planned-duty-schedule-key").value="",ss(e,"",""),e.querySelector("#planned-duty-form-title").textContent="Ново планиране",e.querySelector("#planned-duty-save-btn").textContent="Създай"}async function Uh(e,t){const r=t.querySelector("#planned-duty-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("planned_duties").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,s){v(s.message,"error");return}v("Планирането е изтрито.","success"),G.selectedIds=G.selectedIds.filter(a=>a!==e),He(t.querySelector("#planned-duty-delete-modal")),La(t),await mr(t)}function ks(e,t){e&&(e.disabled=!t)}const Fh=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Реално изпълнение</h1>\r
      <div class="d-flex gap-2">\r
        <button id="go-to-schedule" type="button" class="btn btn-outline-secondary" disabled>Към График</button>\r
        <button id="open-bulk-delete-actual-duty" type="button" class="btn btn-outline-danger" disabled>Изтрий избраните</button>\r
        <button id="open-create-actual-duty" type="button" class="btn btn-primary">Нов запис</button>\r
      </div>\r
    </div>\r
\r
    <p class="text-secondary">Служители по повески - реално изпълнение.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
        <button id="actual-duties-filter-reset" type="button" class="btn btn-sm btn-outline-secondary">Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-5">\r
          <label for="actual-duties-search" class="form-label">Търсене</label>\r
          <input id="actual-duties-search" type="text" class="form-control" placeholder="Търси по служител, повеска или дата" />\r
        </div>\r
        <div class="col-md-4">\r
          <label for="actual-duties-date-filter" class="form-label">Филтър по дата</label>\r
          <input id="actual-duties-date-filter" type="date" class="form-control" />\r
        </div>\r
        <div class="col-md-3">\r
          <label for="actual-duties-role-filter" class="form-label">Роля</label>\r
          <select id="actual-duties-role-filter" class="form-select">\r
            <option value="">Всички</option>\r
            <option value="conductor">Кондуктор</option>\r
            <option value="chief">Началник влак</option>\r
          </select>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th style="width: 42px;">\r
              <input id="actual-duties-select-all" class="form-check-input" type="checkbox" aria-label="Избери всички" />\r
            </th>\r
            <th>Дата</th>\r
            <th>Служител</th>\r
            <th>Роля</th>\r
            <th>Повеска</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="actual-duties-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="actual-duties-empty" class="text-secondary d-none mb-0"></p>\r
  </div>\r
</section>\r
\r
<div id="actual-duty-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="actual-duty-form-title" class="h5 mb-0">Нов запис</h2>\r
          <button id="actual-duty-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="actual-duty-form">\r
          <input type="hidden" id="actual-duty-id" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-4">\r
              <label for="actual-duty-date" class="form-label">Дата</label>\r
              <input id="actual-duty-date" class="form-control" type="date" required />\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="actual-duty-employee" class="form-label">Служител</label>\r
              <select id="actual-duty-employee" class="form-select" required>\r
                <option value="">Избери служител</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="actual-duty-schedule-key" class="form-label">Ключ-график</label>\r
              <select id="actual-duty-schedule-key" class="form-select" required>\r
                <option value="">Избери ключ-график</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="actual-duty-duty" class="form-label">Повеска</label>\r
              <select id="actual-duty-duty" class="form-select" required>\r
                <option value="">Избери повеска</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-4">\r
              <label for="actual-duty-assignment-role" class="form-label">Роля</label>\r
              <select id="actual-duty-assignment-role" class="form-select" required>\r
                <option value="conductor">Кондуктор</option>\r
                <option value="chief">Началник влак</option>\r
              </select>\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="actual-duty-start-time" class="form-label">Начало</label>\r
              <input id="actual-duty-start-time" class="form-control" type="time" required />\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="actual-duty-end-time" class="form-label">Край</label>\r
              <input id="actual-duty-end-time" class="form-control" type="time" required />\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="actual-duty-break-start-time" class="form-label">Начало на прекъсване</label>\r
              <input id="actual-duty-break-start-time" class="form-control" type="time" required />\r
            </div>\r
\r
            <div class="col-md-3">\r
              <label for="actual-duty-break-end-time" class="form-label">Край на прекъсване</label>\r
              <input id="actual-duty-break-end-time" class="form-control" type="time" required />\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="actual-duty-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="actual-duty-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="actual-duty-profile-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Профил на реална повеска</h2>\r
          <button id="actual-duty-profile-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <div id="actual-duty-profile-content"></div>\r
\r
        <div class="d-flex justify-content-end mt-4">\r
          <button id="actual-duty-profile-close-secondary" type="button" class="btn btn-outline-secondary">Затвори</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="actual-duty-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш този запис?</p>\r
        <input type="hidden" id="actual-duty-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="actual-duty-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="actual-duty-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="actual-duty-bulk-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди масово изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш избраните записи (<span id="actual-duty-bulk-delete-count">0</span>)?</p>\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="actual-duty-bulk-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="actual-duty-bulk-delete-confirm" type="button" class="btn btn-danger">Изтрий избраните</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="actual-duty-bulk-add-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 960px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Добави от планирани повески</h2>\r
          <button id="actual-duty-bulk-add-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <section class="search-panel mb-3" aria-label="Панел за търсене">\r
          <div class="search-panel-header">\r
            <h2 class="h6 mb-0">Панел за търсене</h2>\r
            <button id="actual-duty-bulk-add-filter-reset" type="button" class="btn btn-sm btn-outline-secondary">Изчисти филтрите</button>\r
          </div>\r
\r
          <div class="row g-3 align-items-end">\r
            <div class="col-md-7">\r
              <label for="actual-duty-bulk-add-search" class="form-label">Търсене</label>\r
              <input id="actual-duty-bulk-add-search" type="text" class="form-control" placeholder="Търси по служител, повеска или дата" />\r
            </div>\r
            <div class="col-md-5">\r
              <label for="actual-duty-bulk-add-date-filter" class="form-label">Филтър по дата</label>\r
              <input id="actual-duty-bulk-add-date-filter" type="date" class="form-control" />\r
            </div>\r
          </div>\r
        </section>\r
\r
        <div class="table-responsive">\r
          <table class="table align-middle">\r
            <thead>\r
              <tr>\r
                <th style="width: 42px;">\r
                  <input id="actual-duty-bulk-add-select-all" class="form-check-input" type="checkbox" aria-label="Избери всички" />\r
                </th>\r
                <th>Дата</th>\r
                <th>Служител</th>\r
                <th>Роля</th>\r
                <th>Повеска</th>\r
              </tr>\r
            </thead>\r
            <tbody id="actual-duty-bulk-add-table-body"></tbody>\r
          </table>\r
        </div>\r
\r
        <p id="actual-duty-bulk-add-empty" class="text-secondary d-none mb-0"></p>\r
\r
        <div class="d-flex justify-content-end gap-2 mt-4">\r
          <button id="actual-duty-bulk-add-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="actual-duty-bulk-add-confirm" type="button" class="btn btn-primary" disabled>Добави избраните</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Rt(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Hi=new Map;function Bh(e,t){const r=Hi.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Ce(a);return}}};Hi.set(e,n),document.addEventListener("keydown",n)}function Ce(e){var t,r,n,s,a;e.classList.add("d-none"),(t=document.querySelector("#actual-duty-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#actual-duty-delete-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#actual-duty-bulk-delete-modal"))!=null&&n.classList.contains("d-none"))&&((s=document.querySelector("#actual-duty-bulk-add-modal"))!=null&&s.classList.contains("d-none"))&&((a=document.querySelector("#actual-duty-profile-modal"))!=null&&a.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function se(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const M={rows:[],searchQuery:"",dateFilter:"",roleFilter:"",selectedIds:[],visibleRowIds:[],plannedRows:[],plannedSearchQuery:"",plannedDateFilter:"",plannedSelectedIds:[],plannedVisibleRowIds:[]};function Ui(e){return e&&`${e.first_name??""} ${e.last_name??""}`.trim()||"-"}async function dn(e){const{data:t,error:r}=await S.from("actual_duties").select("id, date, employee_id, duty_id, assignment_role, start_time_override, end_time_override, break_start_time_override, break_end_time_override, employees(first_name, last_name), duties(name, start_time, end_time, break_start_time, break_end_time, schedule_key_duties(schedule_key_id))").order("date",{ascending:!1});if(r){v(r.message,"error"),M.rows=[],lt(e,"Грешка при зареждане на реалните повески.");return}M.rows=t||[],lt(e)}function lt(e,t){const r=e.querySelector("#actual-duties-table-body"),n=e.querySelector("#actual-duties-empty"),s=e.querySelector("#actual-duties-select-all"),a=e.querySelector("#open-bulk-delete-actual-duty");M.selectedIds=M.selectedIds.filter(l=>M.rows.some(d=>d.id===l));const i=M.rows.filter(l=>{var f;const d=Ui(l.employees).toLowerCase(),c=(((f=l.duties)==null?void 0:f.name)||"").toLowerCase(),u=(l.date||"").toLowerCase(),h=!M.searchQuery||d.includes(M.searchQuery)||c.includes(M.searchQuery)||u.includes(M.searchQuery),m=!M.dateFilter||l.date===M.dateFilter,p=!M.roleFilter||l.assignment_role===M.roleFilter;return h&&m&&p});if(!i.length){M.visibleRowIds=[],r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма записи за реално изпълнение.",s&&(s.checked=!1,s.indeterminate=!1,s.disabled=!0),a&&(a.disabled=M.selectedIds.length===0,a.textContent=M.selectedIds.length?`Изтрий избраните (${M.selectedIds.length})`:"Изтрий избраните");return}M.visibleRowIds=i.map(l=>l.id),n.classList.add("d-none"),r.innerHTML=i.map(l=>{var u,h,m,p,f;const d=Kh(l),c=M.selectedIds.includes(l.id);return`
        <tr>
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              data-select-id="${l.id}"
              ${c?"checked":""}
              aria-label="Избери запис"
            />
          </td>
          <td>${se(l.date??"-")}</td>
          <td>${se(Ui(l.employees))}</td>
          <td>${se(zh(l.assignment_role))}</td>
          <td>${se(((u=l.duties)==null?void 0:u.name)??"-")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="profile"
                data-id="${l.id}"
              >
                Профил
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${l.id}"
                data-date="${se(l.date??"")}"
                data-employee-id="${l.employee_id??""}"
                data-duty-id="${l.duty_id??""}"
                data-assignment-role="${l.assignment_role??"conductor"}"
                data-duty-schedule-key-id="${d}"
                data-start-time-override="${se((l.start_time_override||"").slice(0,5))}"
                data-end-time-override="${se((l.end_time_override||"").slice(0,5))}"
                data-break-start-time-override="${se((l.break_start_time_override||"").slice(0,5))}"
                data-break-end-time-override="${se((l.break_end_time_override||"").slice(0,5))}"
                data-duty-start-time="${se((((h=l.duties)==null?void 0:h.start_time)||"").slice(0,5))}"
                data-duty-end-time="${se((((m=l.duties)==null?void 0:m.end_time)||"").slice(0,5))}"
                data-duty-break-start-time="${se((((p=l.duties)==null?void 0:p.break_start_time)||"").slice(0,5))}"
                data-duty-break-end-time="${se((((f=l.duties)==null?void 0:f.break_end_time)||"").slice(0,5))}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${l.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("");const o=i.filter(l=>M.selectedIds.includes(l.id)).length;s&&(s.disabled=!1,s.checked=o>0&&o===i.length,s.indeterminate=o>0&&o<i.length),a&&(a.disabled=M.selectedIds.length===0,a.textContent=M.selectedIds.length?`Изтрий избраните (${M.selectedIds.length})`:"Изтрий избраните")}function Kh(e){var r,n,s;return((s=(Array.isArray((r=e==null?void 0:e.duties)==null?void 0:r.schedule_key_duties)?e.duties.schedule_key_duties:(n=e==null?void 0:e.duties)!=null&&n.schedule_key_duties?[e.duties.schedule_key_duties]:[]).find(a=>a==null?void 0:a.schedule_key_id))==null?void 0:s.schedule_key_id)||""}function zh(e){return e==="chief"?"Началник влак":"Кондуктор"}let as=[];async function Wh(e){e.innerHTML=Fh;const t=im(),r=e.querySelector("#actual-duties-date-filter");t&&r&&(r.value=t,M.dateFilter=t),Vh(e),await Gh(e),await Jh(e),await Qh(e),await dn(e)}function Vh(e){const t=e.querySelector("#open-create-actual-duty"),r=e.querySelector("#go-to-schedule"),n=e.querySelector("#open-bulk-delete-actual-duty"),s=e.querySelector("#open-bulk-add-actual-duty"),a=e.querySelector("#actual-duty-form"),i=e.querySelector("#actual-duties-table-body"),o=e.querySelector("#actual-duty-modal"),l=e.querySelector("#actual-duty-delete-modal"),d=e.querySelector("#actual-duty-bulk-delete-modal"),c=e.querySelector("#actual-duty-bulk-add-modal"),u=e.querySelector("#actual-duty-profile-modal"),h=e.querySelector("#actual-duty-modal-close"),m=e.querySelector("#actual-duty-cancel-btn"),p=e.querySelector("#actual-duty-profile-close"),f=e.querySelector("#actual-duty-profile-close-secondary"),_=e.querySelector("#actual-duty-delete-confirm"),y=e.querySelector("#actual-duty-delete-cancel"),g=e.querySelector("#actual-duty-bulk-delete-confirm"),b=e.querySelector("#actual-duty-bulk-delete-cancel"),w=e.querySelector("#actual-duty-bulk-add-modal-close"),k=e.querySelector("#actual-duty-bulk-add-cancel"),L=e.querySelector("#actual-duty-bulk-add-confirm"),x=e.querySelector("#actual-duty-bulk-add-search"),E=e.querySelector("#actual-duty-bulk-add-date-filter"),q=e.querySelector("#actual-duty-bulk-add-filter-reset"),T=e.querySelector("#actual-duty-bulk-add-select-all"),C=e.querySelector("#actual-duty-bulk-add-table-body"),$=e.querySelector("#actual-duties-search"),A=e.querySelector("#actual-duties-date-filter"),D=e.querySelector("#actual-duties-role-filter"),O=e.querySelector("#actual-duties-filter-reset"),U=e.querySelector("#actual-duty-schedule-key"),z=e.querySelector("#actual-duties-select-all");t==null||t.addEventListener("click",()=>{el(e),Rt(o)}),n==null||n.addEventListener("click",()=>{if(!M.selectedIds.length){v("Избери поне един запис за изтриване.","warning");return}const H=e.querySelector("#actual-duty-bulk-delete-count");H&&(H.textContent=String(M.selectedIds.length)),Rt(d)}),s==null||s.addEventListener("click",async()=>{Ki(e),await sm(e),Rt(c)}),a==null||a.addEventListener("submit",async H=>{H.preventDefault(),await em(e)}),h==null||h.addEventListener("click",()=>{Ce(o)}),m==null||m.addEventListener("click",()=>{Ce(o)}),p==null||p.addEventListener("click",()=>{Ce(u)}),f==null||f.addEventListener("click",()=>{Ce(u)}),y==null||y.addEventListener("click",()=>{Ce(l)}),b==null||b.addEventListener("click",()=>{Ce(d)}),w==null||w.addEventListener("click",()=>{Ce(c)}),k==null||k.addEventListener("click",()=>{Ce(c)}),$==null||$.addEventListener("input",H=>{M.searchQuery=H.target.value.trim().toLowerCase(),lt(e)}),A==null||A.addEventListener("change",H=>{M.dateFilter=H.target.value||"",xs(r,M.dateFilter),lt(e)}),D==null||D.addEventListener("change",H=>{M.roleFilter=H.target.value||"",lt(e)}),O==null||O.addEventListener("click",()=>{M.searchQuery="",M.dateFilter="",M.roleFilter="",$&&($.value=""),A&&(A.value=""),D&&(D.value=""),xs(r,M.dateFilter),lt(e)}),r==null||r.addEventListener("click",()=>{const H=M.dateFilter||(A==null?void 0:A.value)||"";if(!H){v("Избери дата от филтъра, за да отвориш График.","warning");return}const K=new URLSearchParams({date:H});window.history.pushState({},"",`/schedule?${K.toString()}`),window.dispatchEvent(new PopStateEvent("popstate"))}),xs(r,M.dateFilter||(A==null?void 0:A.value)||""),U==null||U.addEventListener("change",()=>{is(e,U.value||"",""),Bi(e)});const W=e.querySelector("#actual-duty-duty");W==null||W.addEventListener("change",()=>{Bi(e)}),z==null||z.addEventListener("change",()=>{const H=M.visibleRowIds||[];if(z.checked){const K=new Set(M.selectedIds);H.forEach(ee=>K.add(ee)),M.selectedIds=Array.from(K)}else M.selectedIds=M.selectedIds.filter(K=>!H.includes(K));lt(e)}),_==null||_.addEventListener("click",async()=>{const H=e.querySelector("#actual-duty-delete-id").value;await rm(H,e)}),g==null||g.addEventListener("click",async()=>{await nm(e)}),L==null||L.addEventListener("click",async()=>{await am(e)}),x==null||x.addEventListener("input",H=>{M.plannedSearchQuery=H.target.value.trim().toLowerCase(),It(e)}),E==null||E.addEventListener("change",H=>{M.plannedDateFilter=H.target.value||"",It(e)}),q==null||q.addEventListener("click",()=>{Ki(e),It(e)}),T==null||T.addEventListener("change",()=>{const H=M.plannedVisibleRowIds||[];if(T.checked){const K=new Set(M.plannedSelectedIds);H.forEach(ee=>K.add(ee)),M.plannedSelectedIds=Array.from(K)}else M.plannedSelectedIds=M.plannedSelectedIds.filter(K=>!H.includes(K));It(e)}),C==null||C.addEventListener("change",H=>{const K=H.target.closest("input[data-planned-select-id]");if(!K)return;const ee=K.getAttribute("data-planned-select-id");ee&&(K.checked?M.plannedSelectedIds.includes(ee)||(M.plannedSelectedIds=[...M.plannedSelectedIds,ee]):M.plannedSelectedIds=M.plannedSelectedIds.filter(R=>R!==ee),It(e))}),i==null||i.addEventListener("change",H=>{const K=H.target.closest("input[data-select-id]");if(!K)return;const ee=K.getAttribute("data-select-id");ee&&(K.checked?M.selectedIds.includes(ee)||(M.selectedIds=[...M.selectedIds,ee]):M.selectedIds=M.selectedIds.filter(R=>R!==ee),lt(e))}),i==null||i.addEventListener("click",H=>{const K=H.target.closest("button[data-action]");if(!K)return;const ee=K.getAttribute("data-action");if(ee==="profile"){const R=K.getAttribute("data-id");om(e,R);return}if(ee==="edit"){tm(e,{id:K.getAttribute("data-id"),date:K.getAttribute("data-date"),employeeId:K.getAttribute("data-employee-id"),assignmentRole:K.getAttribute("data-assignment-role")||"conductor",dutyId:K.getAttribute("data-duty-id"),dutyScheduleKeyId:K.getAttribute("data-duty-schedule-key-id"),startTimeOverride:K.getAttribute("data-start-time-override")||"",endTimeOverride:K.getAttribute("data-end-time-override")||"",breakStartTimeOverride:K.getAttribute("data-break-start-time-override")||"",breakEndTimeOverride:K.getAttribute("data-break-end-time-override")||"",dutyStartTime:K.getAttribute("data-duty-start-time")||"",dutyEndTime:K.getAttribute("data-duty-end-time")||"",dutyBreakStartTime:K.getAttribute("data-duty-break-start-time")||"",dutyBreakEndTime:K.getAttribute("data-duty-break-end-time")||""}),Rt(o);return}if(ee==="delete"){const R=K.getAttribute("data-id");e.querySelector("#actual-duty-delete-id").value=R,Rt(l)}}),Bh("actual-duties",[u,l,d,c,o])}async function Gh(e){const t=e.querySelector("#actual-duty-employee"),{data:r,error:n}=await S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(n){v(n.message,"error");return}const s=(r||[]).map(a=>{const i=`${a.first_name??""} ${a.last_name??""}`.trim()||"-";return`<option value="${a.id}">${se(i)}</option>`}).join("");t.innerHTML='<option value="">Избери служител</option>'+s}async function Jh(e){const t=e.querySelector("#actual-duty-schedule-key"),{data:r,error:n}=await S.from("schedule_keys").select("id, name").order("name",{ascending:!0});if(n){v(n.message,"error");return}const s=(r||[]).map(a=>`<option value="${a.id}">${se(a.name??"-")}</option>`).join("");t.innerHTML='<option value="">Избери ключ-график</option>'+s}async function Qh(e){const{data:t,error:r}=await S.from("schedule_key_duties").select("schedule_key_id, duty_id, duties(id, name, start_time, end_time, break_start_time, break_end_time)");if(r){v(r.message,"error");return}const n=new Map;(t||[]).forEach(s=>{const a=s==null?void 0:s.duties;if(!(a!=null&&a.id))return;const i=n.get(a.id)||{id:a.id,name:a.name||"-",scheduleKeyIds:[],startTime:yt(a.start_time),endTime:yt(a.end_time),breakStartTime:yt(a.break_start_time),breakEndTime:yt(a.break_end_time)};s.schedule_key_id&&!i.scheduleKeyIds.includes(s.schedule_key_id)&&i.scheduleKeyIds.push(s.schedule_key_id),n.set(a.id,i)}),as=Array.from(n.values()).sort((s,a)=>String(s.name||"").localeCompare(String(a.name||""),"bg")),is(e,"","")}function is(e,t,r){const n=e.querySelector("#actual-duty-duty");if(!n)return;if(!t){n.innerHTML='<option value="">Първо избери ключ-график</option>',n.value="";return}const s=as.filter(a=>{var i;return(i=a.scheduleKeyIds)==null?void 0:i.includes(t)}).map(a=>{const i=a.id===r?"selected":"";return`<option value="${a.id}" ${i}>${se(a.name??"-")}</option>`}).join("");n.innerHTML='<option value="">Избери повеска</option>'+s,r&&(n.value=r)}function Yh(e,t){var n;const r=as.find(s=>s.id===e);return!!(r&&((n=r.scheduleKeyIds)!=null&&n.includes(t)))}function Xh(e){return as.find(t=>t.id===e)||null}function yt(e){return e?String(e).slice(0,5):""}function qe(e,t=""){const r=String(e||"").slice(0,5);return/^\d{2}:\d{2}$/.test(r)?r:t}function Tn(e){const t=qe(e,"");return t?`${t}:00`:null}function Fi(e){const t=Number(e);if(!Number.isFinite(t)||t<0)return"-";const r=Math.floor(t/60),n=t%60;return`${String(r).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function Zh(e,t,r,n){const s=qe(e,""),a=qe(t,""),i=qe(r,"00:00"),o=qe(n,"00:00"),l=s&&a?Re(s,a):null,d=Re(i,o),c=Number.isFinite(l)?Math.max(0,l-d):null;return{startTime:s||"-",endTime:a||"-",breakStartTime:i||"-",breakEndTime:o||"-",breakDuration:Fi(d),duration:c===null?"-":Fi(c)}}function Bi(e){var o;const t=((o=e.querySelector("#actual-duty-duty"))==null?void 0:o.value)||"",r=Xh(t);if(!r)return;const n=e.querySelector("#actual-duty-start-time"),s=e.querySelector("#actual-duty-end-time"),a=e.querySelector("#actual-duty-break-start-time"),i=e.querySelector("#actual-duty-break-end-time");n&&(n.value=r.startTime||""),s&&(s.value=r.endTime||""),a&&(a.value=r.breakStartTime||"00:00"),i&&(i.value=r.breakEndTime||"00:00")}async function em(e){const t=e.querySelector("#actual-duty-id"),r=e.querySelector("#actual-duty-date"),n=e.querySelector("#actual-duty-employee"),s=e.querySelector("#actual-duty-schedule-key"),a=e.querySelector("#actual-duty-duty"),i=e.querySelector("#actual-duty-assignment-role"),o=e.querySelector("#actual-duty-start-time"),l=e.querySelector("#actual-duty-end-time"),d=e.querySelector("#actual-duty-break-start-time"),c=e.querySelector("#actual-duty-break-end-time"),u=e.querySelector("#actual-duty-save-btn"),h=r.value,m=n.value||null,p=s.value||null,f=a.value||null,_=i.value||"conductor",y=qe((o==null?void 0:o.value)||"",""),g=qe((l==null?void 0:l.value)||"",""),b=qe((d==null?void 0:d.value)||"","00:00"),w=qe((c==null?void 0:c.value)||"","00:00"),k=t.value;if(!h||!m||!p||!f||!y||!g){v("Моля, попълни всички полета.","warning");return}if(!Yh(f,p)){v("Избери повеска от посочения ключ-график.","warning");return}if(!["chief","conductor"].includes(_)){v("Невалидна роля. Избери Кондуктор или Началник влак.","warning");return}const L=Re(y,g);if(Re(b,w)>L){v("Прекъсването не може да е по-голямо от продължителността на повеската.","warning");return}const E=u.innerHTML;u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const q={date:h,employee_id:m,duty_id:f,assignment_role:_,start_time_override:Tn(y),end_time_override:Tn(g),break_start_time_override:Tn(b),break_end_time_override:Tn(w)};let T;if(k?{error:T}=await S.from("actual_duties").update(q).eq("id",k):{error:T}=await S.from("actual_duties").insert(q),u.disabled=!1,u.innerHTML=E,T){if(T.code==="23505"){v("Този запис вече съществува за тази дата.","warning");return}v(T.message,"error");return}v(k?"Записът е обновен.":"Записът е създаден.","success"),Ce(e.querySelector("#actual-duty-modal")),el(e),await dn(e)}function tm(e,t){e.querySelector("#actual-duty-id").value=t.id,e.querySelector("#actual-duty-date").value=t.date??"",e.querySelector("#actual-duty-employee").value=t.employeeId??"",e.querySelector("#actual-duty-assignment-role").value=t.assignmentRole??"conductor",e.querySelector("#actual-duty-schedule-key").value=t.dutyScheduleKeyId??"",is(e,t.dutyScheduleKeyId??"",t.dutyId??""),e.querySelector("#actual-duty-start-time").value=qe(t.startTimeOverride,t.dutyStartTime||""),e.querySelector("#actual-duty-end-time").value=qe(t.endTimeOverride,t.dutyEndTime||""),e.querySelector("#actual-duty-break-start-time").value=qe(t.breakStartTimeOverride,t.dutyBreakStartTime||"00:00"),e.querySelector("#actual-duty-break-end-time").value=qe(t.breakEndTimeOverride,t.dutyBreakEndTime||"00:00"),e.querySelector("#actual-duty-form-title").textContent="Редакция на запис",e.querySelector("#actual-duty-save-btn").textContent="Запази"}function el(e){e.querySelector("#actual-duty-id").value="",e.querySelector("#actual-duty-date").value="",e.querySelector("#actual-duty-employee").value="",e.querySelector("#actual-duty-assignment-role").value="conductor",e.querySelector("#actual-duty-schedule-key").value="",is(e,"",""),e.querySelector("#actual-duty-start-time").value="",e.querySelector("#actual-duty-end-time").value="",e.querySelector("#actual-duty-break-start-time").value="00:00",e.querySelector("#actual-duty-break-end-time").value="00:00",e.querySelector("#actual-duty-form-title").textContent="Нов запис",e.querySelector("#actual-duty-save-btn").textContent="Създай"}async function rm(e,t){const r=t.querySelector("#actual-duty-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("actual_duties").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,s){v(s.message,"error");return}M.selectedIds=M.selectedIds.filter(a=>a!==e),Ce(t.querySelector("#actual-duty-delete-modal")),await dn(t),v("Записът е изтрит.","success")}async function nm(e){const t=e.querySelector("#actual-duty-bulk-delete-confirm"),r=[...M.selectedIds];if(!r.length){Ce(e.querySelector("#actual-duty-bulk-delete-modal"));return}const n=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';let s=null;for(let i=0;i<r.length;i+=200){const o=r.slice(i,i+200),{error:l}=await S.from("actual_duties").delete().in("id",o);if(l){s=l;break}}if(t.disabled=!1,t.innerHTML=n,s){v(s.message,"error");return}const a=r.length;M.selectedIds=[],Ce(e.querySelector("#actual-duty-bulk-delete-modal")),await dn(e),v(`Изтрити записи: ${a}.`,"success")}async function sm(e){const{data:t,error:r}=await S.from("planned_duties").select("id, date, employee_id, duty_id, assignment_role, employees(first_name, last_name), duties(name)").order("date",{ascending:!1});if(r){v(r.message,"error"),M.plannedRows=[],It(e,"Грешка при зареждане на планираните повески.");return}M.plannedRows=t||[],M.plannedSelectedIds=[],It(e)}function It(e,t){const r=e.querySelector("#actual-duty-bulk-add-table-body"),n=e.querySelector("#actual-duty-bulk-add-empty"),s=e.querySelector("#actual-duty-bulk-add-select-all"),a=e.querySelector("#actual-duty-bulk-add-confirm");M.plannedSelectedIds=M.plannedSelectedIds.filter(l=>M.plannedRows.some(d=>d.id===l));const i=M.plannedRows.filter(l=>{var p,f,_;const d=`${((p=l.employees)==null?void 0:p.first_name)??""} ${((f=l.employees)==null?void 0:f.last_name)??""}`.trim().toLowerCase(),c=(((_=l.duties)==null?void 0:_.name)||"").toLowerCase(),u=(l.date||"").toLowerCase(),h=!M.plannedSearchQuery||d.includes(M.plannedSearchQuery)||c.includes(M.plannedSearchQuery)||u.includes(M.plannedSearchQuery),m=!M.plannedDateFilter||l.date===M.plannedDateFilter;return h&&m});if(!i.length){M.plannedVisibleRowIds=[],r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма записи за добавяне.",s.checked=!1,s.indeterminate=!1,s.disabled=!0,a.disabled=M.plannedSelectedIds.length===0,a.textContent=M.plannedSelectedIds.length?`Добави избраните (${M.plannedSelectedIds.length})`:"Добави избраните";return}M.plannedVisibleRowIds=i.map(l=>l.id),n.classList.add("d-none"),r.innerHTML=i.map(l=>{var u,h,m;const d=M.plannedSelectedIds.includes(l.id),c=`${((u=l.employees)==null?void 0:u.first_name)??""} ${((h=l.employees)==null?void 0:h.last_name)??""}`.trim()||"-";return`
        <tr>
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              data-planned-select-id="${l.id}"
              ${d?"checked":""}
              aria-label="Избери планиране"
            />
          </td>
          <td>${se(l.date??"-")}</td>
          <td>${se(c)}</td>
          <td>${se(tl(l.assignment_role))}</td>
          <td>${se(((m=l.duties)==null?void 0:m.name)??"-")}</td>
        </tr>
      `}).join("");const o=i.filter(l=>M.plannedSelectedIds.includes(l.id)).length;s.disabled=!1,s.checked=o>0&&o===i.length,s.indeterminate=o>0&&o<i.length,a.disabled=M.plannedSelectedIds.length===0,a.textContent=M.plannedSelectedIds.length?`Добави избраните (${M.plannedSelectedIds.length})`:"Добави избраните"}function Ki(e){M.plannedSearchQuery="",M.plannedDateFilter="";const t=e.querySelector("#actual-duty-bulk-add-search"),r=e.querySelector("#actual-duty-bulk-add-date-filter");t&&(t.value=""),r&&(r.value="")}async function am(e){const t=e.querySelector("#actual-duty-bulk-add-confirm"),r=[...M.plannedSelectedIds];if(!r.length){v("Избери поне един запис от планирани повески.","warning");return}const n=new Set(r),s=M.plannedRows.filter(d=>n.has(d.id));if(!s.length){v("Няма валидни записи за добавяне.","warning");return}const a=s.map(d=>({date:d.date,employee_id:d.employee_id,duty_id:d.duty_id,assignment_role:d.assignment_role||"conductor"})),i=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...';let o=null;for(let d=0;d<a.length;d+=200){const c=a.slice(d,d+200),{error:u}=await S.from("actual_duties").upsert(c,{onConflict:"date,employee_id,duty_id",ignoreDuplicates:!0});if(u){o=u;break}}if(t.disabled=!1,t.innerHTML=i,o){v(o.message,"error");return}const l=a.length;Ce(e.querySelector("#actual-duty-bulk-add-modal")),await dn(e),v(`Обработени записи: ${l}. Съществуващите са пропуснати.`,"success")}function xs(e,t){e&&(e.disabled=!t)}function im(){const t=new URLSearchParams(window.location.search).get("date")||"";return/^\d{4}-\d{2}-\d{2}$/.test(t)?t:""}function tl(e){return e==="chief"?"Началник влак":"Кондуктор"}function om(e,t){var m,p,f,_,y,g,b;const r=e.querySelector("#actual-duty-profile-modal"),n=e.querySelector("#actual-duty-profile-content");if(!r||!n)return;const s=(M.rows||[]).find(w=>w.id===t);if(!s){n.innerHTML='<p class="text-secondary mb-0">Няма данни за този запис.</p>',Rt(r);return}const a=`${((m=s.employees)==null?void 0:m.first_name)??""} ${((p=s.employees)==null?void 0:p.last_name)??""}`.trim()||"-",i=((f=s.duties)==null?void 0:f.name)||"-",o=tl(s.assignment_role),l=qe(s.start_time_override,yt((_=s.duties)==null?void 0:_.start_time)),d=qe(s.end_time_override,yt((y=s.duties)==null?void 0:y.end_time)),c=qe(s.break_start_time_override,yt((g=s.duties)==null?void 0:g.break_start_time)||"00:00"),u=qe(s.break_end_time_override,yt((b=s.duties)==null?void 0:b.break_end_time)||"00:00"),h=Zh(l,d,c,u);n.innerHTML=`
    <div class="row g-3">
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Дата</div>
          <div class="fw-semibold">${se(s.date||"-")}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Служител</div>
          <div class="fw-semibold">${se(a)}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Роля</div>
          <div class="fw-semibold">${se(o)}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Повеска</div>
          <div class="fw-semibold">${se(i)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало</div>
          <div class="fw-semibold">${se(h.startTime)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край</div>
          <div class="fw-semibold">${se(h.endTime)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Прекъсване</div>
          <div class="fw-semibold">${se(h.breakDuration)}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало на прекъсване</div>
          <div class="fw-semibold">${se(h.breakStartTime)}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край на прекъсване</div>
          <div class="fw-semibold">${se(h.breakEndTime)}</div>
        </div>
      </div>
      <div class="col-12">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Времетраене</div>
          <div class="fw-semibold">${se(h.duration)}</div>
        </div>
      </div>
    </div>
  `,Rt(r)}const lm=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3 no-print">\r
      <h1 class="h3 mb-0">План График</h1>\r
      <div class="d-flex gap-2">\r
        <button id="plan-schedule-print" type="button" class="btn btn-outline-secondary">Печат</button>\r
      </div>\r
    </div>\r
\r
    <p class="text-secondary no-print">Разпределение по формат, близък до хартиения образец.</p>\r
\r
    <div class="row g-3 align-items-end mb-4 no-print">\r
      <div class="col-md-4">\r
        <label for="plan-schedule-date" class="form-label">Дата</label>\r
        <input id="plan-schedule-date" type="date" class="form-control" />\r
      </div>\r
      <div class="col-md-3">\r
        <label for="plan-schedule-print-orientation" class="form-label">Ориентация за печат</label>\r
        <select id="plan-schedule-print-orientation" class="form-select">\r
          <option value="landscape" selected>Landscape</option>\r
          <option value="portrait">Portrait</option>\r
        </select>\r
      </div>\r
      <div class="col-md-2">\r
        <div class="form-check mt-4 pt-2">\r
          <input class="form-check-input" type="checkbox" id="plan-schedule-print-compact" checked />\r
          <label class="form-check-label" for="plan-schedule-print-compact">Компактен</label>\r
        </div>\r
      </div>\r
      <div class="col-md-3">\r
        <div class="form-check mt-4 pt-2">\r
          <input class="form-check-input" type="checkbox" id="plan-schedule-print-fit-one-page" checked />\r
          <label class="form-check-label" for="plan-schedule-print-fit-one-page">Събери на 1 страница</label>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <p class="small text-secondary no-print">Избери ориентация и включи „Събери на 1 страница“ за автоматично мащабиране при печат.</p>\r
\r
    <article class="border rounded p-3 p-md-4 plan-schedule-sheet">\r
      <header class="schedule-sheet-header text-center mb-3">\r
        <div id="plan-schedule-print-left-label" class="schedule-print-left-label">ПС - Стара Загора</div>\r
        <div class="schedule-sheet-title-wrap">\r
          <h2 class="h3 mb-1">ПЛАН ГРАФИК</h2>\r
          <p id="plan-schedule-sheet-date" class="mb-0 text-secondary"></p>\r
        </div>\r
      </header>\r
\r
      <section class="mb-4">\r
        <div id="plan-schedule-train" class="table-responsive"></div>\r
      </section>\r
\r
      <section class="mb-4">\r
        <div id="plan-schedule-business-trip" class="table-responsive"></div>\r
      </section>\r
\r
      <section>\r
        <div id="plan-schedule-day-off" class="table-responsive"></div>\r
      </section>\r
\r
      <section id="plan-schedule-absence-section" class="mt-4">\r
        <h3 class="h6 text-uppercase text-center mb-2">Разход</h3>\r
        <div id="plan-schedule-absence" class="table-responsive"></div>\r
      </section>\r
\r
      <footer class="row g-3 mt-3">\r
        <div class="col-md-4 text-center">\r
          <div class="small text-uppercase text-secondary">Одобрил:</div>\r
          <div class="border-bottom mt-4"></div>\r
        </div>\r
        <div class="col-md-4 text-center">\r
          <div class="small text-uppercase text-secondary">Изготвил:</div>\r
          <div class="border-bottom mt-4"></div>\r
        </div>\r
        <div class="col-md-4 text-center">\r
          <div class="small text-uppercase text-secondary">Проверил:</div>\r
          <div class="border-bottom mt-4"></div>\r
        </div>\r
      </footer>\r
    </article>\r
\r
    <div id="plan-schedule-empty" class="text-secondary mt-3 d-none"></div>\r
    <div id="plan-schedule-error" class="text-danger mt-3 d-none"></div>\r
    <div id="plan-schedule-hint" class="text-secondary mt-3 d-none"></div>\r
  </div>\r
</section>\r
`,dm="ПС - Стара Загора";function rl(e,t){const r=e==null?void 0:e.querySelector(t);r&&(r.textContent=dm)}const zi="id, name, notes, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name)";async function nl(e){const{data:t,error:r}=await S.from("schedule_keys").select("id").lte("valid_from",e).gte("valid_to",e);if(r)return{data:[],error:r};const n=(t||[]).map(h=>h==null?void 0:h.id).filter(Boolean);if(!n.length)return{data:[],error:null};const{data:s,error:a}=await S.from("duties").select(zi).in("schedule_key_id",n);if(a)return{data:[],error:a};const{data:i,error:o}=await S.from("schedule_key_duties").select("duty_id").in("schedule_key_id",n);if(o)return{data:[],error:o};const l=new Set((s||[]).map(h=>h==null?void 0:h.id).filter(Boolean)),d=[...new Set((i||[]).map(h=>h==null?void 0:h.duty_id).filter(Boolean))].filter(h=>!l.has(h));if(!d.length)return{data:s||[],error:null};const{data:c,error:u}=await S.from("duties").select(zi).in("id",d);return u?{data:[],error:u}:{data:[...s||[],...c||[]],error:null}}function cm(e){const t=String(e||"").trim().toLowerCase();return t==="chief"||t==="conductor"?t:""}function sl(e){const t=(e==null?void 0:e.first_name)??"",r=(e==null?void 0:e.last_name)??"";return`${t} ${r}`.trim()}function um(e){var r;const t=e==null?void 0:e.positions;return Array.isArray(t)?((r=t[0])==null?void 0:r.title)??"":t&&typeof t=="object"?t.title??"":""}function pm(e){var r;const t=e==null?void 0:e.duty_types;return Array.isArray(t)?((r=t[0])==null?void 0:r.name)??"":t&&typeof t=="object"?t.name??"":""}function hm(e){var r;const t=Array.isArray(e)?(r=e[0])==null?void 0:r.name:e&&typeof e=="object"?e.name:"";return String(t||"").trim()}function mm(e){const t=e==null?void 0:e.duties;return Array.isArray(t)?t[0]||null:t&&typeof t=="object"?t:null}function Wi(e){const t=String(e||"").trim();if(!t)return"99:99:99";const r=t.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);if(!r)return"99:99:99";const n=String(Number(r[1])).padStart(2,"0"),s=r[2],a=r[3]||"00";return`${n}:${s}:${a}`}function fm(){const t=new URLSearchParams(window.location.search).get("date")||"";return/^\d{4}-\d{2}-\d{2}$/.test(t)?t:""}function Ee(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Vi=96/25.4;function ym(e,{orientation:t,compact:r,fitOnePage:n}){const s=document.documentElement,a=e.querySelector(".plan-schedule-sheet");if(s.classList.add("print-preparing"),s.classList.toggle("print-compact",r),s.classList.toggle("print-fit-one-page",n),a&&(a.classList.toggle("print-landscape-page",t==="landscape"),a.classList.toggle("print-portrait-page",t==="portrait")),!n||!a){s.style.setProperty("--plan-print-scale","1");return}s.style.setProperty("--plan-print-scale","1");const i=a.getBoundingClientRect(),o=t==="portrait"?210:297,l=t==="portrait"?297:210,d=(o-20)*Vi,c=(l-20)*Vi,u=d/Math.max(i.width,1),h=c/Math.max(i.height,1),m=Math.min(u,h,1);s.style.setProperty("--plan-print-scale",String(Math.max(.6,m)))}function bm(){const e=document.documentElement;e.classList.remove("print-preparing","print-compact","print-fit-one-page","print-hide-second-day"),e.style.setProperty("--plan-print-scale","1"),document.querySelectorAll(".plan-schedule-sheet").forEach(t=>{t.classList.remove("print-landscape-page","print-portrait-page")})}function vm(e){const t=new Map;return(e||[]).forEach(r=>{const n=r==null?void 0:r.employee_id;if(!n)return;const s=t.get(n)||{employeeId:n,employeeName:sl(r.employees),reasons:[]},a=hm(r.absence_reasons);a&&!s.reasons.includes(a)&&s.reasons.push(a),t.set(n,s)}),t}function gm(e){const t={train:[],businessTrip:[],dayOff:[]},r=new Map;return(e||[]).forEach(n=>{const s=mm(n);s!=null&&s.id&&(r.has(s.id)||r.set(s.id,s))}),Array.from(r.values()).forEach(n=>{const s=pm(n).toLowerCase();if(s.includes("на влак")){t.train.push(n);return}if(s.includes("командировка")){t.businessTrip.push(n);return}s.includes("свободен ден")&&t.dayOff.push(n)}),t.train.sort(xm),t.businessTrip.sort(Js),t.dayOff.sort(Js),t}function _m(e,t){const r=new Map,n=new Map;return e.forEach(s=>{if(!(s!=null&&s.duty_id)||!(s!=null&&s.employees))return;if(s!=null&&s.employee_id&&(t!=null&&t.has(s.employee_id))){const l=t.get(s.employee_id);l&&!n.has(s.employee_id)&&n.set(s.employee_id,{employeeId:l.employeeId,employeeName:l.employeeName,reason:l.reasons.join(", ")});return}const a=r.get(s.duty_id)||{chiefs:[],conductors:[]},i=sl(s.employees),o=cm(s.assignment_role);if(o==="chief"&&i&&!a.chiefs.includes(i)&&a.chiefs.push(i),o==="conductor"&&i&&!a.conductors.includes(i)&&a.conductors.push(i),!o){const l=um(s.employees).toLowerCase();l.includes("началник")&&l.includes("влак")&&i&&!a.chiefs.includes(i)&&a.chiefs.push(i),l.includes("кондуктор")&&i&&!a.conductors.includes(i)&&a.conductors.push(i)}r.set(s.duty_id,a)}),{assignmentsByDuty:r,absentAssignments:Array.from(n.values()).sort((s,a)=>String((s==null?void 0:s.employeeName)||"").localeCompare(String((a==null?void 0:a.employeeName)||""),"bg"))}}function xr(e,t,r){qs(e.querySelector("#plan-schedule-train"),t.train,r,{conductorRows:2,showHours:!0,separateSecondDay:!0,minPanels:2,printAsCards:!0}),qs(e.querySelector("#plan-schedule-business-trip"),t.businessTrip,r,{conductorRows:3,showHours:!1,minPanels:1,hideEmptyConductorRows:!0,printAsCards:!0}),qs(e.querySelector("#plan-schedule-day-off"),t.dayOff,r,{conductorRows:3,showHours:!1,minPanels:1,hideEmptyConductorRows:!0,printAsCards:!0})}function qr(e,t){if(!e)return;if(!t.length){e.innerHTML='<p class="text-secondary mb-0">Няма служители в разход.</p>';return}const r=t.map(n=>`
      <tr>
        <td>${Ee(n.employeeName||"")}</td>
        <td>${Ee(n.reason||"")}</td>
      </tr>
    `).join("");e.innerHTML=`
    <table class="table table-bordered align-middle mb-0 plan-schedule-table">
      <thead>
        <tr>
          <th scope="col">Служител</th>
          <th scope="col">Причина</th>
        </tr>
      </thead>
      <tbody>
        ${r}
      </tbody>
    </table>
  `}function Lr(e,{hint:t,error:r,empty:n}){const s=e.querySelector("#plan-schedule-hint"),a=e.querySelector("#plan-schedule-error"),i=e.querySelector("#plan-schedule-empty");s&&(s.textContent=t||"",s.classList.toggle("d-none",!t)),a&&(a.textContent=r||"",a.classList.toggle("d-none",!r)),i&&(i.textContent=n||"",i.classList.toggle("d-none",!n))}function wm(e){const t=new Date(`${e}T00:00:00`);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("bg-BG",{day:"2-digit",month:"long",year:"numeric"}).format(t)}function qs(e,t,r,n={}){if(!e)return;if(!t.length){e.innerHTML='<p class="text-secondary mb-0">Няма повески от този тип.</p>';return}const s=n.separateSecondDay?qm(t):t,a=Number.isInteger(n.conductorRows)&&n.conductorRows>=0?n.conductorRows:3,i=5,o=km(s,i),l=Number.isInteger(n.minPanels)&&n.minPanels>0?n.minPanels:1;for(;o.length<l;)o.push([]);e.innerHTML=o.map(d=>{const c=[...d];for(;c.length<i;)c.push(null);const u=c.map(b=>{const w=$n(b,"text-center"),k=dt(b)?"":(b==null?void 0:b.name)??"";if(!k)return`<th scope="col"${w}></th>`;const L=String((b==null?void 0:b.notes)||"").trim(),x=L?`<div class="schedule-duty-note" title="${Ee(L)}">${Ee(L)}</div>`:"";return`<th scope="col"${w}><span class="schedule-duty-name-wrap">${En("Влак","train")}<span class="schedule-duty-name-ellipsis" title="${Ee(k)}">${Ee(k)}</span></span>${x}</th>`}).join(""),h=c.map(b=>{const w=$n(b),k=b&&!dt(b)?al(b):"";return!b||dt(b)?`<td${w}></td>`:`<td${w}>${En("Час","hours")}${Ee(k)}</td>`}).join(""),m=c.map(b=>{if(!b)return"<td></td>";const w=$n(b);if(dt(b))return`<td${w}></td>`;const k=r.get(b.id)||{chiefs:[]},L=k.chiefs.length?k.chiefs.join(", "):"";return`<td${w}>${En("НВ","chief")}${Ee(L)}</td>`}).join("");let p=a;if(n.hideEmptyConductorRows){const b=c.reduce((w,k)=>{if(!k||dt(k))return w;const L=r.get(k.id)||{conductors:[]},x=Array.isArray(L.conductors)?L.conductors.length:0;return Math.max(w,x)},0);p=Math.min(a,b)}const f=p>0?Array.from({length:p},(b,w)=>`
            <tr>
              ${c.map(L=>{if(!L)return"<td></td>";const x=$n(L);if(dt(L))return`<td${x}></td>`;const q=(r.get(L.id)||{conductors:[]}).conductors[w]||"";return`<td${x}>${En("К-р","conductor")}${Ee(q)}</td>`}).join("")}
            </tr>
          `).join(""):"",_=n.showHours===!1?"":`
            <tr>
              ${h}
            </tr>
          `,y=`
        <table class="table table-bordered align-middle mb-3 plan-schedule-table">
          <thead>
            <tr>
              ${u}
            </tr>
          </thead>
          <tbody>
            ${_}
            <tr>
              ${m}
            </tr>
            ${f}
          </tbody>
        </table>
      `;if(!n.printAsCards)return y;const g=Sm(c,r,p,n);return`
        <div class="print-as-cards">
          ${y}
          <div class="print-only-duty-cards mb-3">${g}</div>
        </div>
      `}).join("")}function Sm(e,t,r,n={}){return`<div class="print-duty-cards-grid">${e.map(a=>{const i=n.showHours!==!1,o=i?`
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">Час</span>
              <span class="print-duty-card-value"></span>
            </div>
          `:"";if(!a||dt(a)){const u=Array.from({length:r},()=>`
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">К-р</span>
            <span class="print-duty-card-value"></span>
          </div>
        `).join("");return`
          <article class="print-duty-card">
            <div class="print-duty-card-title"></div>
            <div class="print-duty-card-note"></div>
            ${o}
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">НВ</span>
              <span class="print-duty-card-value"></span>
            </div>
            ${u}
          </article>
        `}const l=t.get(a.id)||{chiefs:[],conductors:[]},d=Array.isArray(l.chiefs)?l.chiefs.join(", "):"",c=Array.from({length:r},(u,h)=>{const m=Array.isArray(l.conductors)&&l.conductors[h]||"";return`
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">К-р</span>
            <span class="print-duty-card-value">${Ee(m)}</span>
          </div>
        `}).join("");return`
        <article class="print-duty-card">
          <div class="print-duty-card-title">${Ee(a.name||"")}</div>
          <div class="print-duty-card-note">${Ee(String(a.notes||"").trim())}</div>
          ${i?`
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">Час</span>
              <span class="print-duty-card-value">${Ee(al(a))}</span>
            </div>
          `:""}
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">НВ</span>
            <span class="print-duty-card-value">${Ee(d)}</span>
          </div>
          ${c}
        </article>
      `}).join("")}</div>`}function km(e,t){const r=[];for(let n=0;n<e.length;n+=t)r.push(e.slice(n,n+t));return r}function al(e){const t=((e==null?void 0:e.start_time)||"").slice(0,5),r=((e==null?void 0:e.end_time)||"").slice(0,5);return!t&&!r?"":t&&r?`${t} - ${r}`:t||r}function En(e,t){return`<span class="${t?`schedule-cell-key-badge schedule-cell-key-badge-${t}`:"schedule-cell-key-badge"}">${Ee(e)}</span>`}function Js(e,t){const r=(e==null?void 0:e.schedule_key_id)||"",n=(t==null?void 0:t.schedule_key_id)||"";if(r!==n)return String(r).localeCompare(String(n),"bg");const s=Number.isFinite(Number(e==null?void 0:e.display_order))?Number(e.display_order):Number.MAX_SAFE_INTEGER,a=Number.isFinite(Number(t==null?void 0:t.display_order))?Number(t.display_order):Number.MAX_SAFE_INTEGER;return s!==a?s-a:String((e==null?void 0:e.name)||"").localeCompare(String((t==null?void 0:t.name)||""),"bg")}function xm(e,t){const r=!!(e!=null&&e.second_day),n=!!(t!=null&&t.second_day);if(r!==n)return r?1:-1;const s=Wi(e==null?void 0:e.start_time),a=Wi(t==null?void 0:t.start_time);return s!==a?s.localeCompare(a,"bg"):Js(e,t)}function qm(e){const t=[],r=[];return e.forEach(a=>{if(a!=null&&a.second_day){r.push(a);return}t.push(a)}),!t.length||!r.length?e:t.length%5!==0?[...t,{__separator:!0},...r]:[...t,...r]}function dt(e){return!!(e&&e.__separator)}function $n(e,t=""){const r=[];return t&&r.push(t),dt(e)?r.push("separator-col"):e!=null&&e.second_day&&r.push("second-day-col"),r.length?` class="${r.join(" ")}"`:""}async function Lm(e){e.innerHTML=lm,rl(e,"#plan-schedule-print-left-label");const t=e.querySelector("#plan-schedule-date"),r=e.querySelector("#plan-schedule-print"),n=e.querySelector("#plan-schedule-print-orientation"),s=e.querySelector("#plan-schedule-print-compact"),a=e.querySelector("#plan-schedule-print-fit-one-page"),i=fm();t&&i?t.value=i:t&&!t.value&&(t.value=new Date().toISOString().split("T")[0]),t==null||t.addEventListener("change",async()=>{await Gi(e)}),r==null||r.addEventListener("click",()=>{const o=(n==null?void 0:n.value)==="portrait"?"portrait":"landscape",l=(s==null?void 0:s.checked)??!0,d=(a==null?void 0:a.checked)??!0;ym(e,{orientation:o,compact:l,fitOnePage:d}),window.addEventListener("afterprint",bm,{once:!0}),window.print()}),await Gi(e)}async function Gi(e){const t=e.querySelector("#plan-schedule-date"),r=t==null?void 0:t.value,n=e.querySelector("#plan-schedule-sheet-date");if(n&&(n.textContent=r?wm(r):""),!r){xr(e,{train:[],businessTrip:[],dayOff:[]},new Map),qr(e.querySelector("#plan-schedule-absence"),[]),Lr(e,{hint:"Избери дата.",error:"",empty:""});return}const{data:s,error:a}=await S.from("planned_duties").select("employee_id, duty_id, assignment_role, employees(first_name, last_name, positions(title)), duties(id, name, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name))").eq("date",r);if(a){v(a.message,"error"),xr(e,{train:[],businessTrip:[],dayOff:[]},new Map),qr(e.querySelector("#plan-schedule-absence"),[]),Lr(e,{hint:"",error:"Грешка при зареждане на планираните записи.",empty:""});return}const{data:i,error:o}=await nl(r);if(o){v(o.message,"error"),xr(e,{train:[],businessTrip:[],dayOff:[]},new Map),qr(e.querySelector("#plan-schedule-absence"),[]),Lr(e,{hint:"",error:"Грешка при зареждане на повеските.",empty:""});return}const{data:l,error:d}=await S.from("employee_absences").select("employee_id, start_date, end_date, employees(first_name, last_name), absence_reasons(name)").lte("start_date",r).gte("end_date",r);if(d){v(d.message,"error"),xr(e,{train:[],businessTrip:[],dayOff:[]},new Map),qr(e.querySelector("#plan-schedule-absence"),[]),Lr(e,{hint:"",error:"Грешка при зареждане на отсъствията.",empty:""});return}const c=vm(l||[]),u=gm((i||[]).map(f=>({duties:f}))),{assignmentsByDuty:h,absentAssignments:m}=_m(s||[],c);xr(e,u,h),qr(e.querySelector("#plan-schedule-absence"),m);const p=u.train.length+u.businessTrip.length+u.dayOff.length;Lr(e,{hint:"",error:"",empty:p||m.length?"":"Няма повески за показване по избраните типове."})}const Tm=`<section class="card border-0 shadow-sm schedule-page-root">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3 no-print">\r
      <h1 class="h3 mb-0">Разпределение</h1>\r
      <div class="d-flex gap-2">\r
        <button id="schedule-confirm-from-timetable" type="button" class="btn btn-primary">\r
          Потвърди от разписание\r
          <span id="schedule-confirm-required-badge" class="badge text-bg-warning ms-2 d-none">Нужно е повторно потвърждение</span>\r
        </button>\r
        <button id="schedule-go-to-actual" type="button" class="btn btn-outline-secondary">Към Реални повески</button>\r
        <button id="schedule-print" type="button" class="btn btn-outline-secondary">Печат</button>\r
      </div>\r
    </div>\r
\r
    <p class="text-secondary no-print">Разпределение по реални повески с възможност за редакция на служителите.</p>\r
\r
    <div class="row g-3 align-items-end mb-4 no-print">\r
      <div class="col-md-4">\r
        <label for="schedule-date" class="form-label">Дата</label>\r
        <input id="schedule-date" type="date" class="form-control" />\r
        <div id="schedule-publication-status" class="form-text mt-2">Статус: непотвърдено</div>\r
        <div class="form-text">Повторно потвърждение е нужно само при смяна на служителя в реална повеска.</div>\r
      </div>\r
      <div class="col-md-3">\r
        <label for="schedule-print-orientation" class="form-label">Ориентация за печат</label>\r
        <select id="schedule-print-orientation" class="form-select">\r
          <option value="landscape" selected>Landscape</option>\r
          <option value="portrait">Portrait</option>\r
        </select>\r
      </div>\r
      <div class="col-md-2">\r
        <div class="form-check mt-4 pt-2">\r
          <input class="form-check-input" type="checkbox" id="schedule-print-compact" checked />\r
          <label class="form-check-label" for="schedule-print-compact">Компактен</label>\r
        </div>\r
      </div>\r
      <div class="col-md-3">\r
        <div class="form-check mt-4 pt-2">\r
          <input class="form-check-input" type="checkbox" id="schedule-print-fit-one-page" checked />\r
          <label class="form-check-label" for="schedule-print-fit-one-page">Събери на 1 страница</label>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <p class="small text-secondary no-print mb-1">Кликни върху име в таблицата, за да редактираш реалния запис.</p>\r
    <p class="small text-secondary no-print">Плъзни име на служител и пусни в желана клетка за бързо преразпределение.</p>\r
\r
    <article class="border rounded p-3 p-md-4 plan-schedule-sheet">\r
      <header class="schedule-sheet-header text-center mb-3">\r
        <div id="schedule-print-left-label" class="schedule-print-left-label">ПС - Стара Загора</div>\r
        <div class="schedule-sheet-title-wrap">\r
          <h2 class="h3 mb-1">РАЗПРЕДЕЛЕНИЕ</h2>\r
          <p id="schedule-sheet-date" class="mb-0 text-secondary"></p>\r
        </div>\r
      </header>\r
\r
      <section class="mb-4">\r
        <div id="schedule-train" class="table-responsive"></div>\r
      </section>\r
\r
      <section class="mb-4 print-hide-train-only">\r
        <div id="schedule-business-trip" class="table-responsive"></div>\r
      </section>\r
\r
      <section class="print-hide-train-only">\r
        <div id="schedule-day-off" class="table-responsive"></div>\r
      </section>\r
\r
      <footer class="row g-3 mt-3">\r
        <div class="col-md-4 text-center">\r
          <div class="small text-uppercase text-secondary">Одобрил:</div>\r
          <div class="border-bottom mt-4"></div>\r
        </div>\r
        <div class="col-md-4 text-center">\r
          <div class="small text-uppercase text-secondary">Изготвил:</div>\r
          <div class="border-bottom mt-4"></div>\r
        </div>\r
        <div class="col-md-4 text-center">\r
          <div class="small text-uppercase text-secondary">Проверил:</div>\r
          <div class="border-bottom mt-4"></div>\r
        </div>\r
      </footer>\r
    </article>\r
\r
    <div id="schedule-empty" class="text-secondary mt-3 d-none"></div>\r
    <div id="schedule-error" class="text-danger mt-3 d-none"></div>\r
    <div id="schedule-hint" class="text-secondary mt-3 d-none"></div>\r
  </div>\r
</section>\r
\r
<div id="schedule-actual-edit-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 640px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="schedule-actual-edit-title" class="h5 mb-0">Редакция на актуална повеска</h2>\r
          <button id="schedule-actual-edit-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="schedule-actual-edit-form">\r
          <input type="hidden" id="schedule-actual-edit-id" />\r
          <input type="hidden" id="schedule-actual-edit-duty-id" />\r
          <input type="hidden" id="schedule-actual-edit-date-value" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-6">\r
              <label class="form-label">Дата</label>\r
              <input id="schedule-actual-edit-date" class="form-control" type="text" disabled />\r
            </div>\r
            <div class="col-md-6">\r
              <label class="form-label">Повеска</label>\r
              <input id="schedule-actual-edit-duty" class="form-control" type="text" disabled />\r
            </div>\r
            <div class="col-md-12">\r
              <label for="schedule-actual-edit-employee" class="form-label">Служител</label>\r
              <select id="schedule-actual-edit-employee" class="form-select" required>\r
                <option value="">Избери служител</option>\r
              </select>\r
            </div>\r
            <div class="col-md-12">\r
              <label for="schedule-actual-edit-assignment-role" class="form-label">Роля</label>\r
              <select id="schedule-actual-edit-assignment-role" class="form-select" required>\r
                <option value="conductor">Кондуктор</option>\r
                <option value="chief">Началник влак</option>\r
              </select>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="schedule-actual-edit-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="schedule-actual-edit-save" type="submit" class="btn btn-primary">Запази</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,Ji=new Map;function Qi(e){const t=String(e||"").trim();if(!t)return"99:99:99";const r=t.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);if(!r)return"99:99:99";const n=String(Number(r[1])).padStart(2,"0"),s=r[2],a=r[3]||"00";return`${n}:${s}:${a}`}function Em(e){const t=(e==null?void 0:e.first_name)??"",r=(e==null?void 0:e.last_name)??"";return`${t} ${r}`.trim()}function $m(e){var r;const t=e==null?void 0:e.positions;return Array.isArray(t)?((r=t[0])==null?void 0:r.title)??"":t&&typeof t=="object"?t.title??"":""}function Qs(e){const t=String((e==null?void 0:e.assignment_role)||"").trim().toLowerCase();if(t==="chief"||t==="conductor")return t;const r=$m(e==null?void 0:e.employees).toLowerCase();return r.includes("началник")&&r.includes("влак")?"chief":"conductor"}function Ot(e){var r;const t=e==null?void 0:e.duty_types;return Array.isArray(t)?((r=t[0])==null?void 0:r.name)??"":t&&typeof t=="object"?t.name??"":""}function zn(e){const t=e==null?void 0:e.duties;return Array.isArray(t)?t[0]||null:t&&typeof t=="object"?t:null}function Am(){const t=new URLSearchParams(window.location.search).get("date")||"";return/^\d{4}-\d{2}-\d{2}$/.test(t)?t:""}function ge(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function Cm(e){e==null||e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}function On(e){e==null||e.classList.add("d-none"),!!document.querySelector("#schedule-actual-edit-modal:not(.d-none)")||document.body.classList.remove("overflow-hidden")}function Rm(e,t){const r=Ji.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){On(a);return}}};Ji.set(e,n),document.addEventListener("keydown",n)}const Yi=96/25.4;function Im(e,{orientation:t,compact:r,fitOnePage:n}){const s=document.documentElement,a=e.querySelector(".plan-schedule-sheet");if(s.classList.add("print-preparing"),s.classList.add("print-hide-second-day"),s.classList.toggle("print-compact",r),s.classList.toggle("print-fit-one-page",n),a&&(a.classList.toggle("print-landscape-page",t==="landscape"),a.classList.toggle("print-portrait-page",t==="portrait")),!n||!a){s.style.setProperty("--plan-print-scale","1");return}s.style.setProperty("--plan-print-scale","1");const i=a.getBoundingClientRect(),o=t==="portrait"?210:297,l=t==="portrait"?297:210,d=(o-20)*Yi,c=(l-20)*Yi,u=d/Math.max(i.width,1),h=c/Math.max(i.height,1),m=Math.min(u,h,1);s.style.setProperty("--plan-print-scale",String(Math.max(.6,m)))}function Dm(){const e=document.documentElement;e.classList.remove("print-preparing","print-compact","print-fit-one-page","print-hide-second-day"),e.style.setProperty("--plan-print-scale","1"),document.querySelectorAll(".plan-schedule-sheet").forEach(t=>{t.classList.remove("print-landscape-page","print-portrait-page")})}function Pm(e,t){const r=new Map;return e.forEach(n=>{var l;if(!(n!=null&&n.duty_id)||!(n!=null&&n.employees)||!(n!=null&&n.id)||n!=null&&n.employee_id&&(t!=null&&t.has(n.employee_id)))return;const s=r.get(n.duty_id)||{chiefs:[],conductors:[]},a=Em(n.employees),i=Qs(n),o={id:n.id,employeeId:n.employee_id,role:i,name:a,dutyName:((l=zn(n))==null?void 0:l.name)||"",date:n.date||""};i==="chief"?a&&!s.chiefs.some(d=>d.id===o.id)&&s.chiefs.push(o):i==="conductor"&&a&&!s.conductors.some(d=>d.id===o.id)&&s.conductors.push(o),r.set(n.duty_id,s)}),r}function Tr(e,t,r,n){Ls(e.querySelector("#schedule-train"),t.train,r,n,{allowAdd:!0,allowEdit:!0,conductorRows:2,printConductorRows:3,printExtraCardRows:1,showHours:!0,separateSecondDay:!0,minPanels:2,printAsCards:!0,printHideSecondDay:!0}),Ls(e.querySelector("#schedule-business-trip"),t.businessTrip,r,n,{allowAdd:!0,allowEdit:!0,conductorRows:3,showHours:!1,minPanels:1,hideEmptyConductorRows:!0}),Ls(e.querySelector("#schedule-day-off"),t.dayOff,r,n,{allowAdd:!0,allowEdit:!0,conductorRows:3,showHours:!1,minPanels:1,hideEmptyConductorRows:!0})}function Er(e,{hint:t,error:r,empty:n}){const s=e.querySelector("#schedule-hint"),a=e.querySelector("#schedule-error"),i=e.querySelector("#schedule-empty");s&&(s.textContent=t||"",s.classList.toggle("d-none",!t)),a&&(a.textContent=r||"",a.classList.toggle("d-none",!r)),i&&(i.textContent=n||"",i.classList.toggle("d-none",!n))}function Om(e){const t=new Date(`${e}T00:00:00`);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("bg-BG",{day:"2-digit",month:"long",year:"numeric"}).format(t)}function Ys(e,t){const r=(e==null?void 0:e.schedule_key_id)||"",n=(t==null?void 0:t.schedule_key_id)||"";if(r!==n)return String(r).localeCompare(String(n),"bg");const s=Number.isFinite(Number(e==null?void 0:e.display_order))?Number(e.display_order):Number.MAX_SAFE_INTEGER,a=Number.isFinite(Number(t==null?void 0:t.display_order))?Number(t.display_order):Number.MAX_SAFE_INTEGER;return s!==a?s-a:String((e==null?void 0:e.name)||"").localeCompare(String((t==null?void 0:t.name)||""),"bg")}function Mm(e,t){const r=!!(e!=null&&e.second_day),n=!!(t!=null&&t.second_day);if(r!==n)return r?1:-1;const s=Qi(e==null?void 0:e.start_time),a=Qi(t==null?void 0:t.start_time);return s!==a?s.localeCompare(a,"bg"):Ys(e,t)}function Ls(e,t,r,n,s={}){if(!e)return;if(!t.length){e.innerHTML='<p class="text-secondary mb-0">Няма повески от този тип.</p>';return}const a=s.separateSecondDay?Nm(t):t,i=Number.isInteger(s.conductorRows)&&s.conductorRows>=0?s.conductorRows:3,o=5,l=Hm(a,o),d=Number.isInteger(s.minPanels)&&s.minPanels>0?s.minPanels:1,c=Number.isInteger(s.printConductorRows)&&s.printConductorRows>0?s.printConductorRows:i;for(;l.length<d;)l.push([]);const u=l.map(p=>{const f=[...p];for(;f.length<o;)f.push(null);const _=f.map(E=>{const q=Cn(E,"text-center"),T=ct(E)?"":(E==null?void 0:E.name)??"";if(!T)return`<th scope="col"${q}></th>`;const C=String((E==null?void 0:E.notes)||"").trim(),$=C?`<div class="schedule-duty-note" title="${ge(C)}">${ge(C)}</div>`:"";return`<th scope="col"${q}><span class="schedule-duty-name-wrap">${An("Влак","train")}<span class="schedule-duty-name-ellipsis" title="${ge(T)}">${ge(T)}</span></span>${$}</th>`}).join(""),y=f.map(E=>{const q=Cn(E),T=E&&!ct(E)?ll(E):"";return!E||ct(E)?`<td${q}></td>`:`<td${q}>${An("Час","hours")}${ge(T)}</td>`}).join(""),g=f.map(E=>{if(!E)return"<td></td>";const q=Cn(E);if(ct(E))return`<td${q}></td>`;const T=r.get(E.id)||{chiefs:[]},C=Ot(E).toLowerCase();return`<td${q} data-drop-duty-id="${E.id}" data-drop-duty-name="${ge((E==null?void 0:E.name)||"")}" data-drop-date="${n}" data-drop-role="chief" data-drop-duty-type="${ge(C)}">${An("НВ","chief")}${jm(T.chiefs,E,n,s)}</td>`}).join("");let b=i;if(s.hideEmptyConductorRows){const E=f.reduce((q,T)=>{if(!T||ct(T))return q;const C=r.get(T.id)||{conductors:[]},$=Array.isArray(C.conductors)?C.conductors.length:0;return Math.max(q,$)},0);b=Math.min(i,E)}const w=b>0?Array.from({length:b},(E,q)=>`
          <tr>
            ${f.map(C=>{if(!C)return"<td></td>";const $=Cn(C);if(ct(C))return`<td${$}></td>`;const A=r.get(C.id)||{conductors:[]},D=Number.isInteger(s.conductorRowOffset)&&s.conductorRowOffset>0?s.conductorRowOffset:0,O=q-D,U=O>=0&&Array.isArray(A.conductors)?A.conductors[O]:void 0,z=Ot(C).toLowerCase();return`<td${$} data-drop-duty-id="${C.id}" data-drop-duty-name="${ge((C==null?void 0:C.name)||"")}" data-drop-date="${n}" data-drop-role="conductor" data-drop-duty-type="${ge(z)}">${An("К-р","conductor")}${il(U,C,n,s)}</td>`}).join("")}
          </tr>
        `).join(""):"",k=s.showHours===!1?"":`
            <tr>
              ${y}
            </tr>
          `,L=`
        <table class="table table-bordered align-middle mb-3 plan-schedule-table">
          <thead>
            <tr>
              ${_}
            </tr>
          </thead>
          <tbody>
            ${k}
            <tr>
              ${g}
            </tr>
            ${w}
          </tbody>
        </table>
      `;if(!s.printAsCards)return L;const x=Xi(f,r,c,s);return`
        <div class="print-as-cards">
          ${L}
          <div class="print-only-duty-cards mb-3">${x}</div>
        </div>
      `}).join(""),h=Number.isInteger(s.printExtraCardRows)&&s.printExtraCardRows>0?s.printExtraCardRows:0,m=s.printAsCards&&h>0?Array.from({length:h},()=>`
        <div class="print-as-cards">
          <div class="print-only-duty-cards mb-3">${Xi(Array.from({length:o},()=>null),new Map,c,s)}</div>
        </div>
      `).join(""):"";e.innerHTML=u+m}function Xi(e,t,r,n={}){return`<div class="print-duty-cards-grid">${e.map(a=>{const i=n.printHideSecondDay&&(a!=null&&a.second_day)?null:a;if(!i||ct(i))return`
          <article class="print-duty-card">
            <div class="print-duty-card-title"></div>
            <div class="print-duty-card-note"></div>
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">Час</span>
              <span class="print-duty-card-value"></span>
            </div>
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">НВ</span>
              <span class="print-duty-card-value"></span>
            </div>
            ${Array.from({length:r},()=>`
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">К-р</span>
            <span class="print-duty-card-value"></span>
          </div>
        `).join("")}
          </article>
        `;const o=t.get(i.id)||{chiefs:[],conductors:[]},l=Array.isArray(o.chiefs)?o.chiefs.map(c=>(c==null?void 0:c.name)||"").filter(Boolean).join(", "):"",d=Array.from({length:r},(c,u)=>{var f;const h=Number.isInteger(n.conductorRowOffset)&&n.conductorRowOffset>0?n.conductorRowOffset:0,m=u-h,p=Array.isArray(o.conductors)&&m>=0&&((f=o.conductors[m])==null?void 0:f.name)||"";return`
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">К-р</span>
            <span class="print-duty-card-value">${ge(p)}</span>
          </div>
        `}).join("");return`
        <article class="print-duty-card">
          <div class="print-duty-card-title">${ge(i.name||"")}</div>
          <div class="print-duty-card-note">${ge(String(i.notes||"").trim())}</div>
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">Час</span>
            <span class="print-duty-card-value">${ge(ll(i))}</span>
          </div>
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">НВ</span>
            <span class="print-duty-card-value">${ge(l)}</span>
          </div>
          ${d}
        </article>
      `}).join("")}</div>`}function jm(e,t,r,n={}){return e!=null&&e.length?e.map(s=>il(s,t,r,n)).join("<br>"):ol(t,r,n)}function il(e,t,r,n={}){return e!=null&&e.id?n.allowEdit!==!1?`<button type="button" class="btn btn-link p-0 text-decoration-none align-baseline" draggable="true" data-actual-edit-id="${e.id}" data-actual-drag-id="${e.id}">${ge(e.name||"")}</button>`:ge(e.name||""):ol(t,r,n)}function ol(e,t,r={}){return!(r.allowAdd!==!1)||!(e!=null&&e.id)||!t?"":`<button type="button" class="btn btn-link p-0 text-decoration-none no-print" data-actual-add-duty-id="${e.id}" data-actual-add-date="${t}" data-actual-add-duty-name="${ge(e.name||"")}">Добави</button>`}function An(e,t){return`<span class="${t?`schedule-cell-key-badge schedule-cell-key-badge-${t}`:"schedule-cell-key-badge"}">${ge(e)}</span>`}function ll(e){const t=((e==null?void 0:e.start_time)||"").slice(0,5),r=((e==null?void 0:e.end_time)||"").slice(0,5);return!t&&!r?"":t&&r?`${t} - ${r}`:t||r}function Nm(e){const t=[],r=[];return e.forEach(a=>{if(a!=null&&a.second_day){r.push(a);return}t.push(a)}),!t.length||!r.length?e:t.length%5!==0?[...t,{__separator:!0},...r]:[...t,...r]}function ct(e){return!!(e&&e.__separator)}function Cn(e,t=""){const r=[];return t&&r.push(t),ct(e)?r.push("separator-col"):e!=null&&e.second_day&&r.push("second-day-col"),r.length?` class="${r.join(" ")}"`:""}function Hm(e,t){const r=[];for(let n=0;n<e.length;n+=t)r.push(e.slice(n,n+t));return r}function Um({actualRowsById:e,supabase:t,showToast:r,getDutyFromRow:n,resolveActualDutyRole:s,openModal:a,closeModal:i,loadScheduleData:o,removeEmployeeTripAndDayOffEntries:l}){function d(y){return y==="chief"?"Началник влак":"Кондуктор"}function c(y){var w,k;const g=((w=y==null?void 0:y.employees)==null?void 0:w.first_name)??"",b=((k=y==null?void 0:y.employees)==null?void 0:k.last_name)??"";return`${g} ${b}`.trim()||"-"}function u(y,g){const b=y.querySelector("#schedule-actual-edit-employee");if(!b||!g)return"-";const w=Array.from(b.options||[]).find(k=>(k==null?void 0:k.value)===g);return String((w==null?void 0:w.textContent)||"").trim()||"-"}function h({employeeName:y,dutyName:g,date:b,role:w}){return`${y||"-"} | ${g||"-"} | ${b||"-"} | ${d(w)}`}function m(y){if(!Array.isArray(y)||!y.length)return"";const g=y.map(b=>String((b==null?void 0:b.dutyName)||(b==null?void 0:b.dutyTypeName)||"").trim()).filter(Boolean);return g.length?` Премахнати: ${g.join(", ")}.`:" Премахнати са автоматично конфликтни записи."}function p(y,g){const b=e.get(g);if(!b){r("Записът не е намерен.","warning");return}const w=n(b);y.querySelector("#schedule-actual-edit-title").textContent="Редакция на актуална повеска",y.querySelector("#schedule-actual-edit-id").value=b.id,y.querySelector("#schedule-actual-edit-duty-id").value=b.duty_id||(w==null?void 0:w.id)||"",y.querySelector("#schedule-actual-edit-date-value").value=b.date||"",y.querySelector("#schedule-actual-edit-date").value=b.date||"",y.querySelector("#schedule-actual-edit-duty").value=(w==null?void 0:w.name)||"",y.querySelector("#schedule-actual-edit-employee").value=b.employee_id||"",y.querySelector("#schedule-actual-edit-assignment-role").value=s(b),y.querySelector("#schedule-actual-edit-save").textContent="Запази",a(y.querySelector("#schedule-actual-edit-modal"))}function f(y,{dutyId:g,date:b,dutyName:w}){y.querySelector("#schedule-actual-edit-title").textContent="Нов актуален запис",y.querySelector("#schedule-actual-edit-id").value="",y.querySelector("#schedule-actual-edit-duty-id").value=g,y.querySelector("#schedule-actual-edit-date-value").value=b,y.querySelector("#schedule-actual-edit-date").value=b,y.querySelector("#schedule-actual-edit-duty").value=w||"",y.querySelector("#schedule-actual-edit-employee").value="",y.querySelector("#schedule-actual-edit-assignment-role").value="conductor",y.querySelector("#schedule-actual-edit-save").textContent="Създай",a(y.querySelector("#schedule-actual-edit-modal"))}async function _(y){var P;const g=y.querySelector("#schedule-actual-edit-id"),b=y.querySelector("#schedule-actual-edit-duty-id"),w=y.querySelector("#schedule-actual-edit-date-value"),k=y.querySelector("#schedule-actual-edit-employee"),L=y.querySelector("#schedule-actual-edit-assignment-role"),x=y.querySelector("#schedule-actual-edit-save"),E=(g==null?void 0:g.value)||"",q=(b==null?void 0:b.value)||"",T=(w==null?void 0:w.value)||"",C=(k==null?void 0:k.value)||"",$=(L==null?void 0:L.value)||"conductor";if(!C){r("Избери служител.","warning");return}if(!E&&(!q||!T)){r("Липсват дата или повеска за новия запис.","warning");return}if(!["chief","conductor"].includes($)){r("Невалидна роля. Избери Кондуктор или Началник влак.","warning");return}const A=x.innerHTML;x.disabled=!0,x.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';let D,O=E;const U=E?e.get(E):null,z=n(U),W=U?{employeeName:c(U),dutyName:(z==null?void 0:z.name)||"",date:(U==null?void 0:U.date)||T,role:s(U)}:null;if(E)({error:D}=await t.from("actual_duties").update({employee_id:C,assignment_role:$}).eq("id",E));else{const{data:j,error:B}=await t.from("actual_duties").insert({date:T,duty_id:q,employee_id:C,assignment_role:$}).select("id").single();D=B,O=(j==null?void 0:j.id)||""}if(x.disabled=!1,x.innerHTML=A,D){if(D.code==="23505"){r("Този запис вече съществува за служителя и повеската.","warning");return}r(D.message,"error");return}const H=await l(C,T,q,O);if(H!=null&&H.error){r(H.error.message,"error");return}const K=(z==null?void 0:z.name)||((P=y.querySelector("#schedule-actual-edit-duty"))==null?void 0:P.value)||"",ee={employeeName:u(y,C),dutyName:K,date:T,role:$},R=m((H==null?void 0:H.removedEntries)||[]);if(i(y.querySelector("#schedule-actual-edit-modal")),E&&W){const j=h(W),B=h(ee);r(`Промяна: ${j} → ${B}.${R}`,"success")}else{const j=h(ee);r(`Ново назначение: ${j}.${R}`,"success")}await o(y)}return{openEditActualDutyModal:p,openCreateActualDutyModal:f,saveEditedActualDuty:_}}let Ye=null;function Fm({actualRowsById:e,supabase:t,showToast:r,resolveActualDutyRole:n,getDutyFromRow:s,getDutyTypeName:a,loadScheduleData:i,removeEmployeeTripAndDayOffEntries:o}){function l(y){return y==="chief"?"Началник влак":"Кондуктор"}function d(y){var w,k;const g=((w=y==null?void 0:y.employees)==null?void 0:w.first_name)??"",b=((k=y==null?void 0:y.employees)==null?void 0:k.last_name)??"";return`${g} ${b}`.trim()||"-"}function c({employeeName:y,dutyName:g,date:b,role:w}){return`${y||"-"} | ${g||"-"} | ${b||"-"} | ${l(w)}`}function u(y){if(!Array.isArray(y)||!y.length)return"";const g=y.map(b=>String((b==null?void 0:b.dutyName)||(b==null?void 0:b.dutyTypeName)||"").trim()).filter(Boolean);return g.length?` Премахнати: ${g.join(", ")}.`:" Премахнати са автоматично конфликтни записи."}function h(y){const g=String(y||"").toLowerCase();return g.includes("на влак")?"train":g.includes("командировка")?"business-trip":g.includes("свободен ден")?"day-off":""}function m(y){y.querySelectorAll(".schedule-drop-target, .schedule-drop-target-business-trip, .schedule-drop-target-preferred, .schedule-drop-target-hover").forEach(g=>{g.classList.remove("schedule-drop-target","schedule-drop-target-business-trip","schedule-drop-target-preferred","schedule-drop-target-hover")}),Ye=null}function p(y,g){if(m(y),!g)return;const b=e.get(g),w=s(b),k=h(a(w));y.querySelectorAll("td[data-drop-duty-id]").forEach(L=>{const x=h(L.getAttribute("data-drop-duty-type")||"");L.classList.add("schedule-drop-target"),x==="business-trip"&&L.classList.add("schedule-drop-target-business-trip"),k&&x===k&&L.classList.add("schedule-drop-target-preferred")})}function f(y){const g=y.target.closest("td[data-drop-duty-id]");if(!g){Ye&&(Ye.classList.remove("schedule-drop-target-hover"),Ye=null);return}y.preventDefault(),Ye&&Ye!==g&&Ye.classList.remove("schedule-drop-target-hover"),Ye=g,Ye.classList.add("schedule-drop-target-hover"),y.dataTransfer&&(y.dataTransfer.dropEffect="move")}async function _(y,g,b,w,k,L=""){var K;const x=e.get(g);if(!x)return;const E=x.duty_id===b,q=x.date===w,T=k==="chief"||k==="conductor"?k:"",C=n(x);if(E&&q&&(!T||C===T))return;const A={duty_id:b,date:w},D=((K=s(x))==null?void 0:K.name)||"",O={employeeName:d(x),dutyName:D,date:x.date||"",role:C};T&&(A.assignment_role=T);const{error:U}=await t.from("actual_duties").update(A).eq("id",g);if(U){if(U.code==="23505"){r("Този запис вече съществува за служителя и повеската.","warning");return}r(U.message,"error");return}const z=await o(x.employee_id,w,b,g);if(z!=null&&z.error){r(z.error.message,"error");return}const W={employeeName:d(x),dutyName:L||D,date:w,role:T||C},H=u((z==null?void 0:z.removedEntries)||[]);await i(y),r(`Промяна: ${c(O)} → ${c(W)}.${H}`,"success")}return{applyDropTargetHighlights:p,clearDropTargetHighlights:m,handleDragOver:f,moveDraggedActualDuty:_}}const ut=new Map;let Gt="";function Bm(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?"":new Intl.DateTimeFormat("bg-BG",{dateStyle:"medium",timeStyle:"short"}).format(t)}function Ts(e,t){const r=e.querySelector("#schedule-publication-status"),n=e.querySelector("#schedule-confirm-required-badge");if(!r)return;if(!!!(t!=null&&t.is_confirmed)){const l=!!t;n==null||n.classList.toggle("d-none",!l),t?r.textContent="Статус: има смяна на служител, нужно е повторно потвърждение от разписание":r.textContent="Статус: непотвърдено от разписание",r.classList.remove("text-success"),r.classList.add("text-warning");return}n==null||n.classList.add("d-none");const a=String((t==null?void 0:t.source)||"timetable").trim(),i=a==="timetable"?"разписание":a,o=Bm(t==null?void 0:t.confirmed_at);r.textContent=o?`Статус: потвърдено от ${i} (${o})`:`Статус: потвърдено от ${i}`,r.classList.remove("text-warning"),r.classList.add("text-success")}async function Xt(e,t){if(!t)return Ts(e,null),null;const{data:r,error:n}=await S.from("schedule_publications").select("schedule_date, is_confirmed, source, confirmed_at").eq("schedule_date",t).maybeSingle();return n?(Ts(e,null),null):(Ts(e,r||null),r||null)}async function Km(e,t){var i;if(!t){v("Избери дата за потвърждение.","warning");return}const{data:r}=await S.auth.getUser(),n=((i=r==null?void 0:r.user)==null?void 0:i.id)||null,s=new Date().toISOString(),{error:a}=await S.from("schedule_publications").upsert({schedule_date:t,is_confirmed:!0,source:"timetable",confirmed_at:s,confirmed_by:n,created_from:n},{onConflict:"schedule_date"});if(a){v(a.message,"error");return}await Xt(e,t),v("Графикът е потвърден от разписание.","success")}async function zm(e){e.innerHTML=Tm,rl(e,"#schedule-print-left-label");const t=e.querySelector("#schedule-date"),r=e.querySelector("#schedule-confirm-from-timetable"),n=e.querySelector("#schedule-go-to-actual"),s=e.querySelector("#schedule-print"),a=e.querySelector("#schedule-print-orientation"),i=e.querySelector("#schedule-print-compact"),o=e.querySelector("#schedule-print-fit-one-page"),l=Am();t&&l?t.value=l:t&&!t.value&&(t.value=new Date().toISOString().split("T")[0]),Wm(e),await Vm(e),t==null||t.addEventListener("change",async()=>{await Wn(e)}),r==null||r.addEventListener("click",async()=>{const d=(t==null?void 0:t.value)||"";r.disabled=!0,await Km(e,d),r.disabled=!1}),n==null||n.addEventListener("click",()=>{const d=(t==null?void 0:t.value)||"";if(!d){v("Избери дата, за да отвориш Реални повески.","warning");return}const c=new URLSearchParams({date:d});window.history.pushState({},"",`/actual-duties?${c.toString()}`),window.dispatchEvent(new PopStateEvent("popstate"))}),s==null||s.addEventListener("click",()=>{const d=(a==null?void 0:a.value)==="portrait"?"portrait":"landscape",c=(i==null?void 0:i.checked)??!0,u=(o==null?void 0:o.checked)??!0;Im(e,{orientation:d,compact:c,fitOnePage:u}),window.addEventListener("afterprint",Dm,{once:!0}),window.print()}),await Wn(e)}function Wm(e){const t=e.querySelector("#schedule-actual-edit-modal"),r=e.querySelector("#schedule-actual-edit-modal-close"),n=e.querySelector("#schedule-actual-edit-cancel"),s=e.querySelector("#schedule-actual-edit-form"),a=Um({actualRowsById:ut,supabase:S,showToast:v,getDutyFromRow:zn,resolveActualDutyRole:Qs,openModal:Cm,closeModal:On,loadScheduleData:Wn,removeEmployeeTripAndDayOffEntries:Zi}),i=Fm({actualRowsById:ut,supabase:S,showToast:v,resolveActualDutyRole:Qs,getDutyFromRow:zn,getDutyTypeName:Ot,loadScheduleData:Wn,removeEmployeeTripAndDayOffEntries:Zi});r==null||r.addEventListener("click",()=>On(t)),n==null||n.addEventListener("click",()=>On(t)),s==null||s.addEventListener("submit",async o=>{o.preventDefault(),await a.saveEditedActualDuty(e)}),e.addEventListener("click",o=>{const l=o.target.closest("button[data-actual-edit-id]");if(l){const m=l.getAttribute("data-actual-edit-id")||"";if(!m)return;a.openEditActualDutyModal(e,m);return}const d=o.target.closest("button[data-actual-add-duty-id]");if(!d)return;const c=d.getAttribute("data-actual-add-duty-id")||"",u=d.getAttribute("data-actual-add-date")||"",h=d.getAttribute("data-actual-add-duty-name")||"";!c||!u||a.openCreateActualDutyModal(e,{dutyId:c,date:u,dutyName:h})}),e.addEventListener("dragstart",o=>{const l=o.target.closest("button[data-actual-drag-id]");l&&(Gt=l.getAttribute("data-actual-drag-id")||"",Gt&&($r(!0),l.classList.add("opacity-50"),o.dataTransfer&&(o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/plain",Gt)),i.applyDropTargetHighlights(e,Gt)))}),e.addEventListener("dragend",o=>{const l=o.target.closest("button[data-actual-drag-id]");l==null||l.classList.remove("opacity-50"),i.clearDropTargetHighlights(e),Gt="",$r(!1)}),e.addEventListener("dragover",o=>{i.handleDragOver(o)}),e.addEventListener("drop",async o=>{var f;const l=o.target.closest("td[data-drop-duty-id]");if(!l){i.clearDropTargetHighlights(e),$r(!1);return}o.preventDefault();const d=l.getAttribute("data-drop-duty-id")||"",c=l.getAttribute("data-drop-duty-name")||"",u=l.getAttribute("data-drop-date")||"",h=l.getAttribute("data-drop-role")||"",p=((f=o.dataTransfer)==null?void 0:f.getData("text/plain"))||""||Gt;if(!d||!u||!p){i.clearDropTargetHighlights(e),$r(!1);return}i.clearDropTargetHighlights(e),await i.moveDraggedActualDuty(e,p,d,u,h,c),$r(!1)}),Rm("schedule",[t])}async function Vm(e){const t=e.querySelector("#schedule-actual-edit-employee"),{data:r,error:n}=await S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(n){v(n.message,"error");return}const s=(r||[]).map(a=>{const i=`${a.first_name??""} ${a.last_name??""}`.trim()||"-";return`<option value="${a.id}">${ge(i)}</option>`}).join("");t&&(t.innerHTML='<option value="">Избери служител</option>'+s)}async function Wn(e){const t=e.querySelector("#schedule-date"),r=t==null?void 0:t.value,n=e.querySelector("#schedule-sheet-date");if(n&&(n.textContent=r?Om(r):""),!r){ut.clear(),Tr(e,{train:[],businessTrip:[],dayOff:[]},new Map),Er(e,{hint:"Избери дата.",error:"",empty:""}),await Xt(e,"");return}const{data:s,error:a}=await S.from("actual_duties").select("id, date, duty_id, employee_id, assignment_role, employees(first_name, last_name, positions(title)), duties(id, name, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name))").eq("date",r);if(a){v(a.message,"error"),ut.clear(),Tr(e,{train:[],businessTrip:[],dayOff:[]},new Map),Er(e,{hint:"",error:"Грешка при зареждане на актуалните записи.",empty:""}),await Xt(e,r);return}const{data:i,error:o}=await S.from("employee_absences").select("employee_id").lte("start_date",r).gte("end_date",r);if(o){v(o.message,"error"),ut.clear(),Tr(e,{train:[],businessTrip:[],dayOff:[]},new Map),Er(e,{hint:"",error:"Грешка при зареждане на отсъствията.",empty:""}),await Xt(e,r);return}const{data:l,error:d}=await nl(r);if(d){v(d.message,"error"),ut.clear(),Tr(e,{train:[],businessTrip:[],dayOff:[]},new Map),Er(e,{hint:"",error:"Грешка при зареждане на повеските.",empty:""}),await Xt(e,r);return}const c=new Set((i||[]).map(p=>p==null?void 0:p.employee_id).filter(Boolean));ut.clear(),(s||[]).forEach(p=>{p!=null&&p.id&&ut.set(p.id,p)});const u={train:[],businessTrip:[],dayOff:[]};(l||[]).forEach(p=>{const f=Ot(p).toLowerCase();if(f.includes("на влак")){u.train.push(p);return}if(f.includes("командировка")){u.businessTrip.push(p);return}f.includes("свободен ден")&&u.dayOff.push(p)}),u.train.sort(Mm),u.businessTrip.sort(Ys),u.dayOff.sort(Ys);const h=Pm(s||[],c);Tr(e,u,h,r);const m=u.train.length+u.businessTrip.length+u.dayOff.length;Er(e,{hint:"",error:"",empty:m?"":"Няма повески за показване по избраните типове."}),await Xt(e,r)}async function Zi(e,t,r,n){const s={error:null,removedEntries:[]};if(!e||!t||!r)return s;const{data:a,error:i}=await S.from("duties").select("id, duty_types(name)").eq("id",r).single();if(i)return{error:i,removedEntries:[]};if(!Ot(a).toLowerCase().includes("на влак"))return s;const{data:l,error:d}=await S.from("duties").select("id, duty_types(name)");if(d)return{error:d,removedEntries:[]};const c=(l||[]).filter(y=>{const g=Ot(y).toLowerCase();return g.includes("командировка")||g.includes("свободен ден")}).map(y=>y.id).filter(Boolean);if(!c.length)return s;let u=S.from("actual_duties").select("id, date, duties(name, duty_types(name))").eq("employee_id",e).eq("date",t).in("duty_id",c);n&&(u=u.neq("id",n));const{data:h,error:m}=await u;if(m)return{error:m,removedEntries:[]};const p=(h||[]).map(y=>y==null?void 0:y.id).filter(Boolean);if(!p.length)return s;const{error:f}=await S.from("actual_duties").delete().in("id",p);return f?{error:f,removedEntries:[]}:{error:null,removedEntries:(h||[]).map(y=>{const g=zn(y);return{dutyName:String((g==null?void 0:g.name)||"").trim(),dutyTypeName:String(Ot(g)||"").trim(),date:String((y==null?void 0:y.date)||"").trim()}})}}function $r(e){document.body.classList.toggle("schedule-dragging",!!e)}const Gm=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Типове повески</h1>\r
      <button id="open-create-duty-type" type="button" class="btn btn-primary">Нов тип</button>\r
    </div>\r
\r
    <p class="text-secondary">Управление на типовете за повески.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-6">\r
          <label for="duty-types-search" class="form-label">Търсене</label>\r
          <input id="duty-types-search" type="text" class="form-control" placeholder="Търси по наименование" />\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th>Наименование</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="duty-types-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="duty-types-empty" class="text-secondary d-none mb-0"></p>\r
  </div>\r
</section>\r
\r
<div id="duty-type-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 640px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="duty-type-form-title" class="h5 mb-0">Нов тип</h2>\r
          <button id="duty-type-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="duty-type-form">\r
          <input type="hidden" id="duty-type-id" />\r
\r
          <div class="row g-3">\r
            <div class="col-12">\r
              <label for="duty-type-name" class="form-label">Наименование</label>\r
              <input id="duty-type-name" class="form-control" type="text" required />\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="duty-type-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="duty-type-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="duty-type-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш този тип?</p>\r
        <input type="hidden" id="duty-type-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="duty-type-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="duty-type-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Es(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const eo=new Map;function Jm(e,t){const r=eo.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){fr(a);return}}};eo.set(e,n),document.addEventListener("keydown",n)}function fr(e){var t,r;e.classList.add("d-none"),(t=document.querySelector("#duty-type-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#duty-type-delete-modal"))!=null&&r.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function to(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const yr={rows:[],searchQuery:""};async function Ta(e){const{data:t,error:r}=await S.from("duty_types").select("id, name").order("name",{ascending:!0});if(r){v(r.message,"error"),yr.rows=[],Xs(e,"Грешка при зареждане на типовете повески.");return}yr.rows=t||[],Xs(e)}function Xs(e,t){const r=e.querySelector("#duty-types-table-body"),n=e.querySelector("#duty-types-empty"),s=yr.rows.filter(a=>yr.searchQuery?(a.name||"").toLowerCase().includes(yr.searchQuery):!0);if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени типове повески.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>`
        <tr>
          <td>${to(a.name??"-")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${a.id}"
                data-name="${to(a.name??"")}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${a.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `).join("")}async function Qm(e){e.innerHTML=Gm,Ym(e),await Ta(e)}function Ym(e){const t=e.querySelector("#open-create-duty-type"),r=e.querySelector("#duty-type-form"),n=e.querySelector("#duty-type-cancel-btn"),s=e.querySelector("#duty-types-table-body"),a=e.querySelector("#duty-type-modal"),i=e.querySelector("#duty-type-delete-modal"),o=e.querySelector("#duty-type-modal-close"),l=e.querySelector("#duty-type-delete-confirm"),d=e.querySelector("#duty-type-delete-cancel"),c=e.querySelector("#duty-types-search");t==null||t.addEventListener("click",()=>{Ea(e),Es(a)}),r==null||r.addEventListener("submit",async u=>{u.preventDefault(),await Xm(e)}),n==null||n.addEventListener("click",()=>{fr(a)}),o==null||o.addEventListener("click",()=>{fr(a)}),d==null||d.addEventListener("click",()=>{fr(i)}),c==null||c.addEventListener("input",u=>{yr.searchQuery=u.target.value.trim().toLowerCase(),Xs(e)}),Jm("duty-types",[i,a]),l==null||l.addEventListener("click",async()=>{const u=e.querySelector("#duty-type-delete-id").value;await ef(u,e)}),s==null||s.addEventListener("click",u=>{const h=u.target.closest("button[data-action]");if(!h)return;const m=h.getAttribute("data-action");if(m==="edit"){Zm(e,{id:h.getAttribute("data-id"),name:h.getAttribute("data-name")}),Es(a);return}if(m==="delete"){const p=h.getAttribute("data-id");e.querySelector("#duty-type-delete-id").value=p,Es(i)}})}async function Xm(e){var l;const t=e.querySelector("#duty-type-id"),r=e.querySelector("#duty-type-name"),n=e.querySelector("#duty-type-save-btn"),s=r.value.trim(),a=t.value;if(!s){v("Моля, попълни наименование.","warning");return}const i=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';let o;if(a)({error:o}=await S.from("duty_types").update({name:s}).eq("id",a));else{const{data:d}=await S.auth.getUser(),c=((l=d==null?void 0:d.user)==null?void 0:l.email)??"web_app";({error:o}=await S.from("duty_types").insert({name:s,created_from:c}))}if(n.disabled=!1,n.innerHTML=i,o){if(o.code==="23505"){v("Такъв тип вече съществува.","warning");return}v(o.message,"error");return}v(a?"Типът е обновен.":"Типът е създаден.","success"),fr(e.querySelector("#duty-type-modal")),Ea(e),await Ta(e)}function Zm(e,t){e.querySelector("#duty-type-id").value=t.id,e.querySelector("#duty-type-name").value=t.name??"",e.querySelector("#duty-type-form-title").textContent="Редакция на тип",e.querySelector("#duty-type-save-btn").textContent="Запази"}function Ea(e){e.querySelector("#duty-type-id").value="",e.querySelector("#duty-type-name").value="",e.querySelector("#duty-type-form-title").textContent="Нов тип",e.querySelector("#duty-type-save-btn").textContent="Създай"}async function ef(e,t){const r=t.querySelector("#duty-type-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{count:s,error:a}=await S.from("duties").select("id",{count:"exact",head:!0}).eq("duty_type_id",e);if(a){r.disabled=!1,r.innerHTML=n,v(a.message,"error");return}if((s||0)>0){r.disabled=!1,r.innerHTML=n,v("Типът не може да се изтрие, защото се използва от повески.","warning");return}const{error:i}=await S.from("duty_types").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,i){if(i.code==="23503"){v("Типът не може да се изтрие, защото се използва от повески.","warning");return}v(i.message,"error");return}v("Типът е изтрит.","success"),fr(t.querySelector("#duty-type-delete-modal")),Ea(t),await Ta(t)}const tf=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Повески към Ключ-График</h1>\r
      <div class="d-flex gap-2">\r
        <button id="open-create-schedule-key-duty" type="button" class="btn btn-primary">Нова повеска</button>\r
        <a href="/schedule-keys" data-link class="btn btn-outline-secondary">Назад към Ключ-График</a>\r
      </div>\r
    </div>\r
\r
    <p class="text-secondary mb-4">Ключ-график: <strong id="schedule-key-duties-title">-</strong></p>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle mb-0">\r
        <thead>\r
          <tr>\r
            <th style="width: 44px;">↕</th>\r
            <th>Наименование</th>\r
            <th>Начало</th>\r
            <th>Край</th>\r
            <th>Втори ден</th>\r
            <th>Прекъсване</th>\r
            <th>Времетраене</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="schedule-key-duties-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="schedule-key-duties-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
  </div>\r
</section>\r
\r
<div id="schedule-key-duty-create-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 860px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Нова повеска</h2>\r
          <button id="schedule-key-duty-create-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="schedule-key-duty-create-form">\r
          <div id="schedule-key-duty-create-form-fields" class="row g-3"></div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="schedule-key-duty-create-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="schedule-key-duty-create-save" type="submit" class="btn btn-primary">Добави</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="schedule-key-duty-edit-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-start justify-content-center h-100 p-3 p-md-4" style="overflow: auto;">\r
    <div class="card w-100" style="max-width: 760px;">\r
      <div class="card-body p-4" style="max-height: calc(100vh - 64px); overflow: auto;">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Редакция на повеска</h2>\r
          <button id="schedule-key-duty-edit-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="schedule-key-duty-edit-form">\r
          <input type="hidden" id="schedule-key-duty-edit-id" />\r
          <div id="schedule-key-duty-edit-form-fields" class="row g-3"></div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="schedule-key-duty-edit-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="schedule-key-duty-edit-save" type="submit" class="btn btn-primary">Запази</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="schedule-key-duty-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш тази повеска?</p>\r
        <input type="hidden" id="schedule-key-duty-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="schedule-key-duty-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="schedule-key-duty-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="schedule-key-duty-profile-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-start justify-content-center h-100 p-3 p-md-4" style="overflow: auto;">\r
    <div class="card w-100" style="max-width: 960px;">\r
      <div class="card-body p-4" style="max-height: calc(100vh - 64px); overflow: auto;">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Профил на повеска</h2>\r
          <button id="schedule-key-duty-profile-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
        <div id="schedule-key-duty-profile-content"></div>\r
        <div class="d-flex justify-content-end gap-2 mt-4">\r
          <button id="schedule-key-duty-profile-close-secondary" type="button" class="btn btn-outline-secondary">Затвори</button>\r
          <button id="schedule-key-duty-profile-edit" type="button" class="btn btn-primary">Редакция</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>`;function Ve(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ro(e){return e?typeof e=="string"?e.replace(".000000",""):String(e):"-"}function rf(){return new URLSearchParams(window.location.search).get("scheduleKeyId")||""}function nf(){return new URLSearchParams(window.location.search).get("scheduleKeyName")||""}function tn(e){e==null||e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const no=new Map;function sf(e,t){const r=no.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Ne(a);return}}};no.set(e,n),document.addEventListener("keydown",n)}function Ne(e){var a,i,o,l;e==null||e.classList.add("d-none");const t=(a=document.querySelector("#schedule-key-duty-create-modal"))==null?void 0:a.classList.contains("d-none"),r=(i=document.querySelector("#schedule-key-duty-edit-modal"))==null?void 0:i.classList.contains("d-none"),n=(o=document.querySelector("#schedule-key-duty-delete-modal"))==null?void 0:o.classList.contains("d-none"),s=(l=document.querySelector("#schedule-key-duty-profile-modal"))==null?void 0:l.classList.contains("d-none");t&&r&&n&&s&&document.body.classList.remove("overflow-hidden")}const ne={scheduleKeyId:"",scheduleKeyName:"",duties:[],draggedDutyId:null,lastCreatedDutyTypeId:"",lastCreatedScheduleKeyIds:[]},so="id, name, notes, duty_type_id, schedule_key_id, start_time, end_time, second_day, break_start_time, break_end_time, break_duration_interval, duration_interval, display_order, duty_types(name), schedule_key_duties(schedule_key_id, schedule_keys(name)), duty_trains(train_id, sequence_order, trains(number))";async function cn(e){const t=ne.scheduleKeyId,{data:r,error:n}=await S.from("duties").select(so).eq("schedule_key_id",t).order("display_order",{ascending:!0}).order("name",{ascending:!0});if(n){ne.duties=[],or(e,"Грешка при зареждане на повеските."),v(n.message,"error");return}const{data:s,error:a}=await S.from("schedule_key_duties").select("duty_id").eq("schedule_key_id",t);if(a){ne.duties=[],or(e,"Грешка при зареждане на повеските."),v(a.message,"error");return}const i=r||[],o=new Set(i.map(c=>c==null?void 0:c.id).filter(Boolean)),l=[...new Set((s||[]).map(c=>c==null?void 0:c.duty_id).filter(Boolean))].filter(c=>!o.has(c));let d=[];if(l.length){const{data:c,error:u}=await S.from("duties").select(so).in("id",l);if(u){ne.duties=[],or(e,"Грешка при зареждане на повеските."),v(u.message,"error");return}d=c||[]}ne.duties=[...i,...d].sort((c,u)=>{const h=Number.isFinite(Number(c==null?void 0:c.display_order))?Number(c.display_order):Number.MAX_SAFE_INTEGER,m=Number.isFinite(Number(u==null?void 0:u.display_order))?Number(u.display_order):Number.MAX_SAFE_INTEGER;return h!==m?h-m:String((c==null?void 0:c.name)||"").localeCompare(String((u==null?void 0:u.name)||""),"bg")}),or(e)}function or(e,t){const r=e.querySelector("#schedule-key-duties-body"),n=e.querySelector("#schedule-key-duties-empty");if(!ne.duties.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма повески към този Ключ-График.";return}n.classList.add("d-none"),r.innerHTML=ne.duties.map(s=>{const a=of(s),i=lf(s),o=`<span class="badge text-bg-info" title="${Ve(i.join(", "))}">${a.length} кл-гр</span>`;return`
        <tr data-duty-id="${s.id}" draggable="true">
          <td class="text-secondary">↕</td>
          <td>
            <div class="d-flex align-items-center gap-2 flex-wrap">
              ${o}
              <span>${Ve(s.name??"-")}</span>           
            </div>
          </td>
          <td>${Ve(s.start_time??"-")}</td>
          <td>${Ve(s.end_time??"-")}</td>
          <td>${s.second_day?"Да":"Не"}</td>
          <td>${Ve(ro(s.break_duration_interval))}</td>
          <td>${Ve(ro(s.duration_interval))}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-duty-action="profile"
                data-id="${s.id}"
              >
                Профил
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-duty-action="edit"
                data-id="${s.id}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-duty-action="delete"
                data-id="${s.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}async function af(){const e=ne.duties.map((n,s)=>S.from("duties").update({display_order:s+1}).eq("id",n.id)),r=(await Promise.all(e)).find(n=>n.error);return r!=null&&r.error?(v(r.error.message,"error"),!1):(ne.duties=ne.duties.map((n,s)=>({...n,display_order:s+1})),!0)}function dl(e){return Array.isArray(e.schedule_key_duties)?e.schedule_key_duties:e.schedule_key_duties?[e.schedule_key_duties]:[]}function of(e){const t=dl(e).map(n=>n==null?void 0:n.schedule_key_id).filter(Boolean),r=t.length?t:e.schedule_key_id?[e.schedule_key_id]:[];return[...new Set(r)]}function lf(e){const t=dl(e).map(r=>{var n;return(n=r==null?void 0:r.schedule_keys)==null?void 0:n.name}).filter(Boolean);return[...new Set(t)]}async function df(e){e.innerHTML=tf,cf(e),uf(e),await hf(e),await mf(e),await ff(e),await pf(e)}function cf(e){const t=e.querySelector("#schedule-key-duty-create-form-fields");t&&(t.innerHTML=zs({idPrefix:"schedule-key-duty-create"}));const r=e.querySelector("#schedule-key-duty-edit-form-fields");r&&(r.innerHTML=zs({idPrefix:"schedule-key-duty-edit"}))}function uf(e){const t=e.querySelector("#open-create-schedule-key-duty"),r=e.querySelector("#schedule-key-duty-create-modal"),n=e.querySelector("#schedule-key-duty-create-form"),s=e.querySelector("#schedule-key-duty-create-modal-close"),a=e.querySelector("#schedule-key-duty-create-cancel"),i=e.querySelector("#schedule-key-duties-body"),o=e.querySelector("#schedule-key-duty-edit-modal"),l=e.querySelector("#schedule-key-duty-delete-modal"),d=e.querySelector("#schedule-key-duty-edit-form"),c=e.querySelector("#schedule-key-duty-edit-modal-close"),u=e.querySelector("#schedule-key-duty-edit-cancel"),h=e.querySelector("#schedule-key-duty-delete-cancel"),m=e.querySelector("#schedule-key-duty-delete-confirm"),p=e.querySelector("#schedule-key-duty-profile-modal"),f=e.querySelector("#schedule-key-duty-profile-close"),_=e.querySelector("#schedule-key-duty-profile-close-secondary"),y=e.querySelector("#schedule-key-duty-profile-edit");t==null||t.addEventListener("click",()=>{$a(e),tn(r)}),s==null||s.addEventListener("click",()=>{Ne(r)}),a==null||a.addEventListener("click",()=>{Ne(r)}),n==null||n.addEventListener("submit",async g=>{g.preventDefault(),await yf(e)}),d==null||d.addEventListener("submit",async g=>{g.preventDefault(),await bf(e)}),c==null||c.addEventListener("click",()=>{Ne(o)}),u==null||u.addEventListener("click",()=>{Ne(o)}),h==null||h.addEventListener("click",()=>{Ne(l)}),m==null||m.addEventListener("click",async()=>{const g=e.querySelector("#schedule-key-duty-delete-id").value;await qf(e,g)}),f==null||f.addEventListener("click",()=>{Ne(p)}),_==null||_.addEventListener("click",()=>{Ne(p)}),y==null||y.addEventListener("click",()=>{var b;const g=((b=p==null?void 0:p.dataset)==null?void 0:b.dutyId)||"";g&&(Ne(p),ao(e,g))}),sf("schedule-key-duties",[p,l,o,r]),i==null||i.addEventListener("dragstart",g=>{const b=g.target.closest("tr[data-duty-id]");b&&(ne.draggedDutyId=b.getAttribute("data-duty-id"),b.classList.add("table-active"))}),i==null||i.addEventListener("dragend",g=>{const b=g.target.closest("tr[data-duty-id]");b&&b.classList.remove("table-active"),ne.draggedDutyId=null}),i==null||i.addEventListener("dragover",g=>{g.preventDefault()}),i==null||i.addEventListener("drop",async g=>{g.preventDefault();const b=g.target.closest("tr[data-duty-id]"),w=ne.draggedDutyId;if(!b||!w)return;const k=b.getAttribute("data-duty-id");if(!k||k===w)return;const L=ne.duties.findIndex(T=>T.id===w),x=ne.duties.findIndex(T=>T.id===k);if(L<0||x<0)return;const[E]=ne.duties.splice(L,1);if(ne.duties.splice(x,0,E),or(e),!await af()){await cn(e);return}v("Редът на повеските е запазен.","success")}),i==null||i.addEventListener("click",async g=>{const b=g.target.closest("button[data-duty-action]");if(!b)return;const w=b.getAttribute("data-duty-action");if(w==="profile"){const k=b.getAttribute("data-id");vf(e,k);return}if(w==="edit"){const k=b.getAttribute("data-id");ao(e,k);return}if(w==="delete"){const k=b.getAttribute("data-id");xf(e,k)}})}async function pf(e){if(ne.scheduleKeyId=rf(),ne.scheduleKeyName=nf(),!ne.scheduleKeyId){or(e,"Няма избран Ключ-График. Върни се и избери запис."),e.querySelector("#open-create-schedule-key-duty").classList.add("d-none");return}if(!ne.scheduleKeyName){const{data:t,error:r}=await S.from("schedule_keys").select("name").eq("id",ne.scheduleKeyId).single();r&&v(r.message,"error"),ne.scheduleKeyName=(t==null?void 0:t.name)||ne.scheduleKeyId}e.querySelector("#schedule-key-duties-title").textContent=ne.scheduleKeyName,$a(e),await cn(e)}async function hf(e){const t=e.querySelector("#schedule-key-duty-create-type"),r=e.querySelector("#schedule-key-duty-edit-type"),{data:n,error:s}=await S.from("duty_types").select("id, name").order("name",{ascending:!0});if(s){v(s.message,"error");return}const a=(n||[]).map(i=>`<option value="${i.id}">${Ve(i.name)}</option>`).join("");t.innerHTML='<option value="">Избери тип</option>'+a,r.innerHTML='<option value="">Избери тип</option>'+a}async function mf(e){const t=e.querySelector("#schedule-key-duty-create-schedule-keys"),r=e.querySelector("#schedule-key-duty-edit-schedule-keys"),{data:n,error:s}=await S.from("schedule_keys").select("id, name").order("name",{ascending:!0});if(s){v(s.message,"error");return}const a=(n||[]).map(i=>`<option value="${i.id}">${Ve(i.name)}</option>`).join("");t.innerHTML=a,r.innerHTML=a}async function ff(e){const t=e.querySelector("#schedule-key-duty-create-trains"),r=e.querySelector("#schedule-key-duty-edit-trains"),{data:n,error:s}=await S.from("trains").select("id, number, origin_station, destination_station").order("number",{ascending:!0});if(s){v(s.message,"error");return}const a=(n||[]).map(i=>{const o=`${i.origin_station||"-"} - ${i.destination_station||"-"}`;return`<option value="${i.id}">${Ve(i.number||"-")} (${Ve(o)})</option>`}).join("");t&&(t.innerHTML=a),r&&(r.innerHTML=a)}async function yf(e){var U,z;const t=e.querySelector("#schedule-key-duty-create-name"),r=e.querySelector("#schedule-key-duty-create-type"),n=e.querySelector("#schedule-key-duty-create-schedule-keys"),s=nt(e,"#schedule-key-duty-create-start","#schedule-key-duty-create-start-time"),a=nt(e,"#schedule-key-duty-create-end","#schedule-key-duty-create-end-time"),i=e.querySelector("#schedule-key-duty-create-second-day"),o=nt(e,"#schedule-key-duty-create-break-start","#schedule-key-duty-create-break-start-time"),l=nt(e,"#schedule-key-duty-create-break-end","#schedule-key-duty-create-break-end-time"),d=e.querySelector("#schedule-key-duty-create-trains"),c=e.querySelector("#schedule-key-duty-create-save"),u=t.value.trim(),h=r.value||null,m=Array.from(n.selectedOptions||[]).map(W=>W.value).filter(Boolean),p=m[0]||null,f=(s==null?void 0:s.value)||"",_=(a==null?void 0:a.value)||"",y=i.checked,g=(o==null?void 0:o.value)||"00:00",b=(l==null?void 0:l.value)||"00:00",w=e.querySelector("#schedule-key-duty-create-notes").value.trim()||null,k=Array.from(d.selectedOptions||[]).map(W=>W.value).filter(Boolean);if(!ne.scheduleKeyId||!u||!h||!f||!_){v("Моля, попълни всички полета за повеската.","warning");return}if(!m.length){v("Избери поне един ключ-график.","warning");return}const L=Re(f,_);if(Re(g,b)>L){v("Прекъсването не може да е по-голямо от продължителността на повеската.","warning");return}const E=c.innerHTML;c.disabled=!0,c.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...';const{data:q}=await S.auth.getUser(),T=((U=q==null?void 0:q.user)==null?void 0:U.id)??((z=q==null?void 0:q.user)==null?void 0:z.email)??"web_app",C=ne.duties.reduce((W,H)=>Math.max(W,Number(H.display_order)||0),0),{data:$,error:A}=await S.from("duties").insert({schedule_key_id:p,duty_type_id:h,name:u,start_time:f,end_time:_,second_day:y,break_start_time:g,break_end_time:b,notes:w,created_from:T,display_order:C+1}).select("id").single(),D=A?null:await cl($==null?void 0:$.id,m),O=A||D?null:await ul($==null?void 0:$.id,k);if(c.disabled=!1,c.innerHTML=E,A||D||O){v((A||D||O).message,"error");return}ne.lastCreatedDutyTypeId=h,ne.lastCreatedScheduleKeyIds=[...m],Ne(e.querySelector("#schedule-key-duty-create-modal")),$a(e),v("Повеската е добавена към Ключ-График.","success"),await cn(e)}function ao(e,t){const r=ne.duties.find(o=>o.id===t);if(!r){v("Повеската не е намерена.","warning");return}e.querySelector("#schedule-key-duty-edit-id").value=r.id,e.querySelector("#schedule-key-duty-edit-name").value=r.name??"",e.querySelector("#schedule-key-duty-edit-type").value=r.duty_type_id??"";const n=e.querySelector("#schedule-key-duty-edit-schedule-keys"),s=_f(r);Array.from(n.options).forEach(o=>{o.selected=s.includes(o.value)});const a=e.querySelector("#schedule-key-duty-edit-trains"),i=Sf(r);Array.from(a.options).forEach(o=>{o.selected=i.includes(o.value)}),bt(e,(r.start_time||"").slice(0,5),"#schedule-key-duty-edit-start","#schedule-key-duty-edit-start-time"),bt(e,(r.end_time||"").slice(0,5),"#schedule-key-duty-edit-end","#schedule-key-duty-edit-end-time"),e.querySelector("#schedule-key-duty-edit-second-day").checked=!!r.second_day,bt(e,jt(r.break_start_time),"#schedule-key-duty-edit-break-start","#schedule-key-duty-edit-break-start-time"),bt(e,jt(r.break_end_time),"#schedule-key-duty-edit-break-end","#schedule-key-duty-edit-break-end-time"),e.querySelector("#schedule-key-duty-edit-notes").value=r.notes??"",tn(e.querySelector("#schedule-key-duty-edit-modal"))}function $a(e){var s;e.querySelector("#schedule-key-duty-create-name").value="",e.querySelector("#schedule-key-duty-create-type").value=ne.lastCreatedDutyTypeId||"";const t=(s=ne.lastCreatedScheduleKeyIds)!=null&&s.length?ne.lastCreatedScheduleKeyIds:[ne.scheduleKeyId],r=e.querySelector("#schedule-key-duty-create-schedule-keys");Array.from(r.options).forEach(a=>{a.selected=t.includes(a.value)}),bt(e,"","#schedule-key-duty-create-start","#schedule-key-duty-create-start-time"),bt(e,"","#schedule-key-duty-create-end","#schedule-key-duty-create-end-time"),e.querySelector("#schedule-key-duty-create-second-day").checked=!1,bt(e,"00:00","#schedule-key-duty-create-break-start","#schedule-key-duty-create-break-start-time"),bt(e,"00:00","#schedule-key-duty-create-break-end","#schedule-key-duty-create-break-end-time"),e.querySelector("#schedule-key-duty-create-notes").value="";const n=e.querySelector("#schedule-key-duty-create-trains");Array.from(n.options).forEach(a=>{a.selected=!1})}async function bf(e){var w,k,L,x;const t=e.querySelector("#schedule-key-duty-edit-id").value,r=e.querySelector("#schedule-key-duty-edit-name").value.trim(),n=e.querySelector("#schedule-key-duty-edit-type").value||null,s=Array.from(e.querySelector("#schedule-key-duty-edit-schedule-keys").selectedOptions||[]).map(E=>E.value).filter(Boolean),a=s[0]||null,i=((w=nt(e,"#schedule-key-duty-edit-start","#schedule-key-duty-edit-start-time"))==null?void 0:w.value)||"",o=((k=nt(e,"#schedule-key-duty-edit-end","#schedule-key-duty-edit-end-time"))==null?void 0:k.value)||"",l=e.querySelector("#schedule-key-duty-edit-second-day").checked,d=((L=nt(e,"#schedule-key-duty-edit-break-start","#schedule-key-duty-edit-break-start-time"))==null?void 0:L.value)||"00:00",c=((x=nt(e,"#schedule-key-duty-edit-break-end","#schedule-key-duty-edit-break-end-time"))==null?void 0:x.value)||"00:00",u=e.querySelector("#schedule-key-duty-edit-notes").value.trim()||null,h=Array.from(e.querySelector("#schedule-key-duty-edit-trains").selectedOptions||[]).map(E=>E.value).filter(Boolean),m=e.querySelector("#schedule-key-duty-edit-save");if(!t||!r||!n||!i||!o){v("Моля, попълни всички полета за повеската.","warning");return}if(!s.length){v("Избери поне един ключ-график.","warning");return}const p=Re(i,o);if(Re(d,c)>p){v("Прекъсването не може да е по-голямо от продължителността на повеската.","warning");return}const _=m.innerHTML;m.disabled=!0,m.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const{error:y}=await S.from("duties").update({name:r,duty_type_id:n,schedule_key_id:a,start_time:i,end_time:o,second_day:l,break_start_time:d,break_end_time:c,notes:u}).eq("id",t),g=y?null:await cl(t,s),b=y||g?null:await ul(t,h);if(m.disabled=!1,m.innerHTML=_,y||g||b){v((y||g||b).message,"error");return}Ne(e.querySelector("#schedule-key-duty-edit-modal")),v("Повеската е обновена.","success"),await cn(e)}async function cl(e,t){if(!e)return{message:"Липсва идентификатор на повеска за запис на ключ-графици."};const{error:r}=await S.from("schedule_key_duties").delete().eq("duty_id",e);if(r)return r;const n=t.map(a=>({duty_id:e,schedule_key_id:a})),{error:s}=await S.from("schedule_key_duties").insert(n);return s}async function ul(e,t){if(!e)return{message:"Липсва идентификатор на повеска за запис на влакове."};const{error:r}=await S.from("duty_trains").delete().eq("duty_id",e);if(r)return r;if(!t.length)return null;const n=t.map((a,i)=>({duty_id:e,train_id:a,sequence_order:i+1})),{error:s}=await S.from("duty_trains").insert(n);return s}function vf(e,t){const r=ne.duties.find(l=>l.id===t),n=e.querySelector("#schedule-key-duty-profile-content"),s=e.querySelector("#schedule-key-duty-profile-modal"),a=e.querySelector("#schedule-key-duty-profile-edit");if(!n||!s)return;if(!r){s.dataset.dutyId="",a&&(a.disabled=!0),n.innerHTML='<p class="text-secondary mb-0">Няма данни за тази повеска.</p>',tn(s);return}s.dataset.dutyId=r.id,a&&(a.disabled=!1);const i=wf(r),o=kf(r);n.innerHTML=Ko({duty:r,scheduleKeyNames:i,trainNumbers:o,escapeHtml:Ve,intervalToTimeInput:jt,formatInterval:gf}),tn(s)}function gf(e){return e?String(e).replace(".000000",""):"-"}function nt(e,...t){for(const r of t){const n=e.querySelector(r);if(n)return n}return null}function bt(e,t,...r){const n=nt(e,...r);n&&(n.value=t)}function pl(e){return Array.isArray(e==null?void 0:e.schedule_key_duties)?e.schedule_key_duties:e!=null&&e.schedule_key_duties?[e.schedule_key_duties]:[]}function _f(e){const t=pl(e).map(n=>n==null?void 0:n.schedule_key_id).filter(Boolean),r=t.length?t:e!=null&&e.schedule_key_id?[e.schedule_key_id]:[];return[...new Set(r)]}function wf(e){const t=pl(e).map(r=>{var n;return(n=r==null?void 0:r.schedule_keys)==null?void 0:n.name}).filter(Boolean);return[...new Set(t)]}function hl(e){return Array.isArray(e==null?void 0:e.duty_trains)?e.duty_trains:e!=null&&e.duty_trains?[e.duty_trains]:[]}function Sf(e){return hl(e).map(t=>({id:t==null?void 0:t.train_id,sequenceOrder:Number.isFinite(Number(t==null?void 0:t.sequence_order))?Number(t.sequence_order):Number.MAX_SAFE_INTEGER})).filter(t=>!!t.id).sort((t,r)=>t.sequenceOrder-r.sequenceOrder).map(t=>t.id).filter((t,r,n)=>n.indexOf(t)===r)}function kf(e){return hl(e).map(t=>{var r;return{number:(r=t==null?void 0:t.trains)==null?void 0:r.number,sequenceOrder:Number.isFinite(Number(t==null?void 0:t.sequence_order))?Number(t.sequence_order):Number.MAX_SAFE_INTEGER}}).filter(t=>!!t.number).sort((t,r)=>t.sequenceOrder-r.sequenceOrder).map(t=>t.number).filter((t,r,n)=>n.indexOf(t)===r)}function xf(e,t){e.querySelector("#schedule-key-duty-delete-id").value=t,tn(e.querySelector("#schedule-key-duty-delete-modal"))}async function qf(e,t){const r=e.querySelector("#schedule-key-duty-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("duties").delete().eq("id",t).eq("schedule_key_id",ne.scheduleKeyId);if(r.disabled=!1,r.innerHTML=n,s){v(s.message,"error");return}Ne(e.querySelector("#schedule-key-duty-delete-modal")),v("Повеската е изтрита.","success"),await cn(e)}const Lf=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Влакове</h1>\r
      <button id="open-create-train" type="button" class="btn btn-primary">Нов влак</button>\r
    </div>\r
\r
    <p class="text-secondary">Управление на влаковете, използвани в повеските.</p>\r
\r
    <section class="search-panel mb-4" aria-label="Панел за търсене">\r
      <div class="search-panel-header">\r
        <h2 class="h6 mb-0">Панел за търсене</h2>\r
        <button id="trains-filter-reset" type="button" class="btn btn-sm btn-outline-secondary">Изчисти филтрите</button>\r
      </div>\r
\r
      <div class="row g-3 align-items-end">\r
        <div class="col-md-6">\r
          <label for="trains-search" class="form-label">Търсене</label>\r
          <input id="trains-search" type="text" class="form-control" placeholder="Търси по номер, начална или крайна гара" />\r
        </div>\r
        <div class="col-md-3">\r
          <label for="trains-origin-filter" class="form-label">Начална гара</label>\r
          <select id="trains-origin-filter" class="form-select">\r
            <option value="">Всички</option>\r
          </select>\r
        </div>\r
        <div class="col-md-3">\r
          <label for="trains-destination-filter" class="form-label">Крайна гара</label>\r
          <select id="trains-destination-filter" class="form-select">\r
            <option value="">Всички</option>\r
          </select>\r
        </div>\r
      </div>\r
    </section>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle">\r
        <thead>\r
          <tr>\r
            <th>Номер</th>\r
            <th>Начална гара</th>\r
            <th>Крайна гара</th>\r
            <th>Отпътуване</th>\r
            <th>Пристигане</th>\r
            <th>Разписание</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="trains-table-body"></tbody>\r
      </table>\r
    </div>\r
\r
    <p id="trains-empty" class="text-secondary d-none mb-0"></p>\r
  </div>\r
</section>\r
\r
<div id="train-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-start justify-content-center h-100 p-3 p-md-4" style="overflow-y: auto;">\r
    <div class="card w-100" style="max-width: 900px;">\r
      <div class="card-body p-4" style="max-height: calc(100vh - 64px); overflow-y: auto;">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="train-form-title" class="h5 mb-0">Нов влак</h2>\r
          <button id="train-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="train-form">\r
          <input type="hidden" id="train-id" />\r
          <input type="hidden" id="train-existing-timetable-url" />\r
          <input type="hidden" id="train-draft-timetable-url" />\r
\r
          <div class="row g-3">\r
            <div class="col-md-4">\r
              <label for="train-number" class="form-label">Номер</label>\r
              <input id="train-number" class="form-control" type="text" required />\r
            </div>\r
            <div class="col-md-4">\r
              <label for="train-origin-station" class="form-label">Начална гара</label>\r
              <input id="train-origin-station" class="form-control" type="text" required />\r
            </div>\r
            <div class="col-md-4">\r
              <label for="train-destination-station" class="form-label">Крайна гара</label>\r
              <input id="train-destination-station" class="form-control" type="text" required />\r
            </div>\r
            <div class="col-md-3">\r
              <label for="train-departure-time" class="form-label">Отпътуване</label>\r
              <input id="train-departure-time" class="form-control" type="time" required />\r
            </div>\r
            <div class="col-md-3">\r
              <label for="train-arrival-time" class="form-label">Пристигане</label>\r
              <input id="train-arrival-time" class="form-control" type="time" required />\r
            </div>\r
            <div class="col-md-6">\r
              <label for="train-timetable-file" class="form-label">Файл с разписание</label>\r
              <input id="train-timetable-file" class="form-control" type="file" multiple accept=".pdf,.csv,.xlsx,.xls,.doc,.docx,.txt,.png,.jpg,.jpeg,.webp" />\r
              <div class="form-text">Можеш да избереш един или повече файлове (до 5 общо за влак); всички се качват в Storage.</div>\r
            </div>\r
            <div class="col-md-6">\r
              <label for="train-timetable-url" class="form-label">Добави външен линк (по избор)</label>\r
              <input id="train-timetable-url" class="form-control" type="url" placeholder="https://..." />\r
              <div class="mt-2">\r
                <label for="train-timetable-label" class="form-label">Име на външния линк</label>\r
                <input id="train-timetable-label" class="form-control" type="text" placeholder="Пример: Разписание Пловдив - София" />\r
              </div>\r
              <div id="train-current-timetable-wrap" class="form-text mt-2 d-none">\r
                <span class="d-block mb-1">Текущи файлове/линкове:</span>\r
                <div id="train-current-timetable-links" class="d-flex flex-wrap gap-2"></div>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="train-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="train-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="train-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш този влак?</p>\r
        <input type="hidden" id="train-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="train-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="train-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="train-timetable-preview-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1070;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3 p-md-4">\r
    <div class="card w-100" style="max-width: 1100px;">\r
      <div class="card-body p-3 p-md-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="train-timetable-preview-title" class="h5 mb-0">Преглед на разписание</h2>\r
          <div class="d-flex align-items-center gap-2">\r
            <a id="train-timetable-preview-open" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">Отвори файла</a>\r
            <button id="train-timetable-preview-close" type="button" class="btn-close" aria-label="Close"></button>\r
          </div>\r
        </div>\r
        <div id="train-timetable-preview-fallback" class="alert alert-info py-2 d-none" role="alert">\r
          Този тип файл може да не се визуализира вградено. Използвай „Отвори файла" за директен преглед.\r
        </div>\r
        <div id="train-timetable-preview-text-wrap" class="d-none">\r
          <pre id="train-timetable-preview-text" class="border rounded p-3 bg-light mb-0" style="height: min(72vh, 760px); overflow: auto; white-space: pre-wrap; word-break: break-word;"></pre>\r
        </div>\r
        <div id="train-timetable-preview-csv-wrap" class="d-none">\r
          <p id="train-timetable-preview-csv-note" class="text-secondary small mb-2"></p>\r
          <div class="table-responsive border rounded" style="height: min(72vh, 760px); overflow: auto;">\r
            <table class="table table-sm table-striped table-bordered mb-0">\r
              <thead id="train-timetable-preview-csv-head"></thead>\r
              <tbody id="train-timetable-preview-csv-body"></tbody>\r
            </table>\r
          </div>\r
        </div>\r
        <iframe\r
          id="train-timetable-preview-frame"\r
          title="Преглед на разписание"\r
          class="w-100 border rounded"\r
          style="height: min(72vh, 760px);"\r
        ></iframe>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Mn(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const io=new Map;function Tf(e,t){const r=io.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Mt(a);return}}};io.set(e,n),document.addEventListener("keydown",n)}function Mt(e){var t,r,n;e.classList.add("d-none"),(t=document.querySelector("#train-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#train-delete-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#train-timetable-preview-modal"))!=null&&n.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function be(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function oo(e){const t=String(e||"").trim();if(!t)return"";const r=t.match(/^(\d{1,2}:\d{2})/);return r?r[1]:t.slice(0,5)}const _e={rows:[],searchQuery:"",originFilter:"",destinationFilter:""};async function Aa(e){const{data:t,error:r}=await S.from("trains").select("id, number, origin_station, destination_station, departure_time, arrival_time, timetable_url").order("number",{ascending:!0});if(r){v(r.message,"error"),_e.rows=[],lr(e,"Грешка при зареждане на влаковете.");return}_e.rows=t||[],lr(e)}function lr(e,t){const r=e.querySelector("#trains-table-body"),n=e.querySelector("#trains-empty");$f(e);const s=_e.rows.filter(a=>{const i=`${a.number||""} ${a.origin_station||""} ${a.destination_station||""}`.toLowerCase(),o=String(a.origin_station||"").trim().toLowerCase(),l=String(a.destination_station||"").trim().toLowerCase(),d=!_e.searchQuery||i.includes(_e.searchQuery),c=!_e.originFilter||o===_e.originFilter,u=!_e.destinationFilter||l===_e.destinationFilter;return d&&c&&u});if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени влакове.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>{const i=Ef(a.timetable_url),o=i.length?`<div class="d-flex flex-column gap-0">${i.map((l,d)=>{const c=l.label||`Файл ${d+1}`,u=encodeURIComponent(l.url),h=encodeURIComponent(c);return`
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <a class="text-decoration-none" href="${be(l.url)}" target="_blank" rel="noopener noreferrer">${be(c)}</a>
                <button
                  type="button"
                  class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
                  data-action="preview-timetable"
                  data-preview-url="${be(u)}"
                  data-preview-label="${be(h)}"
                  title="Преглед"
                  aria-label="Преглед"
                >
                  👁
                </button>
              </div>
            `}).join("")}</div>`:'<span class="text-secondary">-</span>';return`
        <tr>
          <td>${be(a.number??"-")}</td>
          <td>${be(a.origin_station??"-")}</td>
          <td>${be(a.destination_station??"-")}</td>
          <td>${be((a.departure_time||"").slice(0,5)||"-")}</td>
          <td>${be((a.arrival_time||"").slice(0,5)||"-")}</td>
          <td>${o}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${a.id}"
                data-number="${be(a.number??"")}"
                data-origin-station="${be(a.origin_station??"")}"
                data-destination-station="${be(a.destination_station??"")}"
                data-departure-time="${be(a.departure_time??"")}"
                data-arrival-time="${be(a.arrival_time??"")}"
                data-timetable-url="${be(encodeURIComponent(a.timetable_url??""))}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${a.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}function Ef(e){if(Array.isArray(e))return e.map((r,n)=>$s(r,n)).filter(r=>r.url);const t=String(e||"").trim();if(!t)return[];if(t.startsWith("["))try{const r=JSON.parse(t);if(Array.isArray(r))return r.map((n,s)=>$s(n,s)).filter(n=>n.url)}catch{return[{url:t,label:Zs(t,0)}]}return t.split(`
`).map((r,n)=>$s(r,n)).filter(r=>r.url)}function $f(e){const t=e.querySelector("#trains-origin-filter"),r=e.querySelector("#trains-destination-filter");if(!t||!r)return;const n=_e.originFilter||"",s=_e.destinationFilter||"",a=[...new Set(_e.rows.map(o=>String((o==null?void 0:o.origin_station)||"").trim()).filter(Boolean))].sort((o,l)=>o.localeCompare(l,"bg")),i=[...new Set(_e.rows.map(o=>String((o==null?void 0:o.destination_station)||"").trim()).filter(Boolean))].sort((o,l)=>o.localeCompare(l,"bg"));t.innerHTML=`
    <option value="">Всички</option>
    ${a.map(o=>`<option value="${be(o.toLowerCase())}">${be(o)}</option>`).join("")}
  `,r.innerHTML=`
    <option value="">Всички</option>
    ${i.map(o=>`<option value="${be(o.toLowerCase())}">${be(o)}</option>`).join("")}
  `,t.value=n,r.value=s}function $s(e,t){if(e&&typeof e=="object"&&!Array.isArray(e)){const n=String(e.url||"").trim(),s=String(e.label||"").trim()||Zs(n,t);return{url:n,label:s}}const r=String(e||"").trim();return{url:r,label:Zs(r,t)}}function Zs(e,t){const r=String(e||"").trim();if(!r)return`Файл ${t+1}`;try{const s=new URL(r).pathname.split("/").pop()||"",a=decodeURIComponent(s);if(a)return a}catch{}return`Файл ${t+1}`}const rn="train-timetables",Vn=5;async function Af(e){e.innerHTML=Lf,Cf(e),await Aa(e)}function Cf(e){const t=e.querySelector("#open-create-train"),r=e.querySelector("#train-form"),n=e.querySelector("#train-cancel-btn"),s=e.querySelector("#trains-table-body"),a=e.querySelector("#train-modal"),i=e.querySelector("#train-delete-modal"),o=e.querySelector("#train-timetable-preview-modal"),l=e.querySelector("#train-modal-close"),d=e.querySelector("#train-delete-confirm"),c=e.querySelector("#train-delete-cancel"),u=e.querySelector("#train-timetable-preview-close"),h=e.querySelector("#trains-search"),m=e.querySelector("#trains-origin-filter"),p=e.querySelector("#trains-destination-filter"),f=e.querySelector("#trains-filter-reset"),_=e.querySelector("#train-timetable-url"),y=e.querySelector("#train-timetable-label"),g=e.querySelector("#train-timetable-file"),b=e.querySelector("#train-current-timetable-links");t==null||t.addEventListener("click",()=>{Ca(e),Mn(a)}),r==null||r.addEventListener("submit",async w=>{w.preventDefault(),await Rf(e)}),n==null||n.addEventListener("click",()=>{Mt(a)}),l==null||l.addEventListener("click",()=>{Mt(a)}),c==null||c.addEventListener("click",()=>{Mt(i)}),u==null||u.addEventListener("click",()=>{Of(e)}),h==null||h.addEventListener("input",w=>{_e.searchQuery=w.target.value.trim().toLowerCase(),lr(e)}),m==null||m.addEventListener("change",w=>{_e.originFilter=w.target.value||"",lr(e)}),p==null||p.addEventListener("change",w=>{_e.destinationFilter=w.target.value||"",lr(e)}),f==null||f.addEventListener("click",()=>{_e.searchQuery="",_e.originFilter="",_e.destinationFilter="",h&&(h.value=""),m&&(m.value=""),p&&(p.value=""),lr(e)}),_==null||_.addEventListener("input",()=>{}),y==null||y.addEventListener("input",()=>{}),g==null||g.addEventListener("change",()=>{var w;if((w=g.files)!=null&&w.length&&g.files.length>Vn){v(`Може да избереш до ${Vn} файла наведнъж.`,"warning"),g.value="";return}}),b==null||b.addEventListener("input",w=>{const k=w.target.closest(".train-existing-timetable-label");if(!k)return;const L=Number(k.getAttribute("data-index"));if(!Number.isInteger(L)||L<0)return;const x=e.querySelector("#train-draft-timetable-url"),E=br((x==null?void 0:x.value)||"");E[L]&&(E[L].label=k.value,x&&(x.value=sn(E)||""))}),b==null||b.addEventListener("click",w=>{const k=w.target.closest(".train-existing-timetable-preview");if(k){const T=String(k.getAttribute("data-url")||"").trim(),C=String(k.getAttribute("data-label")||"").trim();lo(e,T,C);return}const L=w.target.closest(".train-existing-timetable-remove");if(!L)return;const x=Number(L.getAttribute("data-index"));if(!Number.isInteger(x)||x<0)return;const E=e.querySelector("#train-draft-timetable-url"),q=br((E==null?void 0:E.value)||"");q[x]&&(q.splice(x,1),Ra(e,q))}),Tf("trains",[o,i,a]),d==null||d.addEventListener("click",async()=>{const w=e.querySelector("#train-delete-id").value;await Pf(w,e)}),s==null||s.addEventListener("click",w=>{const k=w.target.closest("button[data-action]");if(!k)return;const L=k.getAttribute("data-action");if(L==="edit"){If(e,{id:k.getAttribute("data-id"),number:k.getAttribute("data-number"),originStation:k.getAttribute("data-origin-station"),destinationStation:k.getAttribute("data-destination-station"),departureTime:k.getAttribute("data-departure-time"),arrivalTime:k.getAttribute("data-arrival-time"),timetableUrl:decodeURIComponent(k.getAttribute("data-timetable-url")||"")}),Mn(a);return}if(L==="delete"){const x=k.getAttribute("data-id");e.querySelector("#train-delete-id").value=x,Mn(i);return}if(L==="preview-timetable"){const x=decodeURIComponent(k.getAttribute("data-preview-url")||""),E=decodeURIComponent(k.getAttribute("data-preview-label")||"");lo(e,x,E)}})}async function Rf(e){var U;const t=e.querySelector("#train-id"),r=e.querySelector("#train-number"),n=e.querySelector("#train-origin-station"),s=e.querySelector("#train-destination-station"),a=e.querySelector("#train-departure-time"),i=e.querySelector("#train-arrival-time"),o=e.querySelector("#train-timetable-url"),l=e.querySelector("#train-timetable-label"),d=e.querySelector("#train-timetable-file"),c=e.querySelector("#train-existing-timetable-url"),u=e.querySelector("#train-draft-timetable-url"),h=e.querySelector("#train-save-btn"),m=r.value.trim(),p=n.value.trim(),f=s.value.trim(),_=a.value,y=i.value,g=br(c.value),b=br(u.value),w=o.value.trim()||"",k=l.value.trim()||"",L=Array.from((d==null?void 0:d.files)||[]),x=t.value;if(!m||!p||!f||!_||!y){v("Моля, попълни всички задължителни полета.","warning");return}if(k&&!w){v("За да зададеш име, въведи и линк.","warning");return}const E=h.innerHTML;h.disabled=!0,h.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const q=x||crypto.randomUUID(),T=Gn(b),C=[];if(w&&T.push({url:w,label:k||vr(w,T.length)}),T.length+L.length>Vn){h.disabled=!1,h.innerHTML=E,v(`Максимум ${Vn} файла/линка за един влак.`,"warning");return}if(L.length){const z=await Df(L,q);if(!z){h.disabled=!1,h.innerHTML=E;return}z.forEach(W=>{W!=null&&W.url&&T.push({url:W.url,label:W.label||vr(W.url,T.length)}),W!=null&&W.objectPath&&C.push(W.objectPath)})}const A=Gn(T),D={number:m,origin_station:p,destination_station:f,departure_time:_,arrival_time:y,timetable_url:sn(A)};let O;if(x)({error:O}=await S.from("trains").update(D).eq("id",x));else{const{data:z}=await S.auth.getUser(),W=((U=z==null?void 0:z.user)==null?void 0:U.email)??"web_app";({error:O}=await S.from("trains").insert({...D,id:q,created_from:W}))}if(h.disabled=!1,h.innerHTML=E,O){C.length&&await nn(C),v(O.message,"error");return}if(x){const z=g.map(ee=>ea(ee.url)).filter(Boolean),W=A.map(ee=>ea(ee.url)).filter(Boolean),H=new Set(W),K=z.filter(ee=>!H.has(ee));K.length&&await nn(K)}v(x?"Влакът е обновен.":"Влакът е създаден.","success"),Mt(e.querySelector("#train-modal")),Ca(e),await Aa(e)}function If(e,t){const r=br(t.timetableUrl);e.querySelector("#train-id").value=t.id,e.querySelector("#train-existing-timetable-url").value=sn(r)||"",e.querySelector("#train-draft-timetable-url").value=sn(r)||"",e.querySelector("#train-number").value=t.number??"",e.querySelector("#train-origin-station").value=t.originStation??"",e.querySelector("#train-destination-station").value=t.destinationStation??"",e.querySelector("#train-departure-time").value=oo(t.departureTime),e.querySelector("#train-arrival-time").value=oo(t.arrivalTime),e.querySelector("#train-timetable-file").value="",e.querySelector("#train-timetable-url").value="",e.querySelector("#train-timetable-label").value="",Ra(e,r),e.querySelector("#train-form-title").textContent="Редакция на влак",e.querySelector("#train-save-btn").textContent="Запази"}function Ca(e){e.querySelector("#train-id").value="",e.querySelector("#train-existing-timetable-url").value="",e.querySelector("#train-draft-timetable-url").value="",e.querySelector("#train-number").value="",e.querySelector("#train-origin-station").value="",e.querySelector("#train-destination-station").value="",e.querySelector("#train-departure-time").value="",e.querySelector("#train-arrival-time").value="",e.querySelector("#train-timetable-file").value="",e.querySelector("#train-timetable-url").value="",e.querySelector("#train-timetable-label").value="",Ra(e,[]),e.querySelector("#train-form-title").textContent="Нов влак",e.querySelector("#train-save-btn").textContent="Създай"}async function Df(e,t){var n;if(!Array.isArray(e)||!e.length||!t)return[];const r=[];for(const s of e){const i=(((n=s.name)==null?void 0:n.split(".").pop())||"pdf").toLowerCase().replace(/[^a-z0-9]/g,"")||"pdf",o=Math.random().toString(36).slice(2,10),l=`${t}/${Date.now()}-${o}.${i}`,{error:d}=await S.storage.from(rn).upload(l,s,{upsert:!0,contentType:s.type||void 0});if(d)return r.length&&await nn(r.map(u=>u.objectPath)),v(d.message,"error"),null;const{data:c}=S.storage.from(rn).getPublicUrl(l);if(!(c!=null&&c.publicUrl))return await nn([l,...r.map(u=>u.objectPath)]),v("Файлът е качен, но не успях да генерирам публичен линк.","error"),null;r.push({url:c.publicUrl,label:s.name||"",objectPath:l})}return r}function ea(e){const t=String(e||"").trim();if(!t)return"";if(!/^https?:\/\//i.test(t)){const r=t.replace(/^\/+/,""),n=`${rn}/`;return r.startsWith(n)?r.slice(n.length):""}try{const r=new URL(t),n=`/storage/v1/object/public/${rn}/`,s=r.pathname.indexOf(n);return s===-1?"":decodeURIComponent(r.pathname.slice(s+n.length))}catch{return""}}async function nn(e){const t=Array.from(new Set((e||[]).filter(Boolean)));t.length&&await S.storage.from(rn).remove(t)}async function Pf(e,t){const r=t.querySelector("#train-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{count:s,error:a}=await S.from("duty_trains").select("duty_id",{count:"exact",head:!0}).eq("train_id",e);if(a){r.disabled=!1,r.innerHTML=n,v(a.message,"error");return}if((s||0)>0){r.disabled=!1,r.innerHTML=n,v("Влакът не може да се изтрие, защото се използва в повески.","warning");return}const{data:i,error:o}=await S.from("trains").select("timetable_url").eq("id",e).maybeSingle();if(o){r.disabled=!1,r.innerHTML=n,v(o.message,"error");return}const{error:l}=await S.from("trains").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,l){if(l.code==="23503"){v("Влакът не може да се изтрие, защото се използва в повески.","warning");return}v(l.message,"error");return}const c=br(i==null?void 0:i.timetable_url).map(u=>ea(u.url)).filter(Boolean);c.length&&await nn(c),v("Влакът е изтрит.","success"),Mt(t.querySelector("#train-delete-modal")),Ca(t),await Aa(t)}function Ra(e,t){const r=e.querySelector("#train-current-timetable-wrap"),n=e.querySelector("#train-current-timetable-links"),s=e.querySelector("#train-draft-timetable-url");if(!r||!n||!s)return;const a=Gn(t);if(s.value=sn(a)||"",!a.length){r.classList.add("d-none"),n.innerHTML="";return}r.classList.remove("d-none"),n.innerHTML=a.map((i,o)=>{const l=i.label||vr(i.url,o);return`
        <div class="border rounded p-2 w-100">
          <div class="mb-2 d-flex align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <a href="${dr(i.url)}" target="_blank" rel="noopener noreferrer">Отвори</a>
              <button
                type="button"
                class="btn btn-link btn-sm p-0 lh-1 text-decoration-none train-existing-timetable-preview"
                data-url="${dr(i.url)}"
                data-label="${dr(l)}"
                title="Преглед"
                aria-label="Преглед"
              >
                👁
              </button>
            </div>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger train-existing-timetable-remove"
              data-index="${o}"
            >
              Премахни
            </button>
          </div>
          <input
            type="text"
            class="form-control form-control-sm train-existing-timetable-label"
            data-index="${o}"
            value="${dr(l)}"
            placeholder="Име на файла/линка"
          />
        </div>
      `}).join("")}function br(e){if(Array.isArray(e))return e.map((r,n)=>jn(r,n)).filter(r=>r.url);const t=String(e||"").trim();if(!t)return[];if(t.startsWith("["))try{const r=JSON.parse(t);if(Array.isArray(r))return r.map((n,s)=>jn(n,s)).filter(n=>n.url)}catch{return[{url:t,label:vr(t,0)}]}return t.split(`
`).map((r,n)=>jn(r,n)).filter(r=>r.url)}function jn(e,t){if(e&&typeof e=="object"&&!Array.isArray(e)){const n=String(e.url||"").trim(),s=String(e.label||"").trim()||vr(n,t);return{url:n,label:s}}const r=String(e||"").trim();return{url:r,label:vr(r,t)}}function Gn(e){const t=new Set;return(e||[]).map((r,n)=>jn(r,n)).filter(r=>!r.url||t.has(r.url)?!1:(t.add(r.url),!0))}function sn(e){const t=Gn(e);return t.length?JSON.stringify(t):null}function vr(e,t){const r=String(e||"").trim();if(!r)return`Файл ${t+1}`;try{const s=new URL(r).pathname.split("/").pop()||"",a=decodeURIComponent(s);if(a)return a}catch{}return`Файл ${t+1}`}function dr(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function lo(e,t,r){const n=e.querySelector("#train-timetable-preview-modal"),s=e.querySelector("#train-timetable-preview-frame"),a=e.querySelector("#train-timetable-preview-text-wrap"),i=e.querySelector("#train-timetable-preview-text"),o=e.querySelector("#train-timetable-preview-csv-wrap"),l=e.querySelector("#train-timetable-preview-csv-note"),d=e.querySelector("#train-timetable-preview-csv-head"),c=e.querySelector("#train-timetable-preview-csv-body"),u=e.querySelector("#train-timetable-preview-title"),h=e.querySelector("#train-timetable-preview-fallback"),m=e.querySelector("#train-timetable-preview-open");if(!n||!s||!a||!i||!o||!l||!d||!c||!u||!h||!m)return;const p=String(t||"").trim();if(!p){v("Липсва линк за преглед.","warning");return}const f=Hf(p),_=ta(p),y=_==="csv",g=["txt","csv","json"].includes(_);u.textContent=r?`Преглед: ${r}`:"Преглед на разписание",m.setAttribute("href",p),h.classList.add("d-none"),a.classList.add("d-none"),o.classList.add("d-none"),l.textContent="",d.innerHTML="",c.innerHTML="",i.textContent="",s.classList.remove("d-none"),s.src="about:blank",y?(o.classList.remove("d-none"),s.classList.add("d-none"),Mf(p,d,c,l,h)):g?(a.classList.remove("d-none"),s.classList.add("d-none"),i.textContent="Зареждане...",Nf(p,i,h)):(s.src=f,s.onload=()=>{if(f!==p){h.classList.add("d-none");return}const b=ta(p),w=["doc","docx","xls","xlsx","ppt","pptx"].includes(b);h.classList.toggle("d-none",!w)},s.onerror=()=>{h.classList.remove("d-none")}),Mn(n)}function Of(e){const t=e.querySelector("#train-timetable-preview-modal"),r=e.querySelector("#train-timetable-preview-frame"),n=e.querySelector("#train-timetable-preview-text-wrap"),s=e.querySelector("#train-timetable-preview-text"),a=e.querySelector("#train-timetable-preview-csv-wrap"),i=e.querySelector("#train-timetable-preview-csv-note"),o=e.querySelector("#train-timetable-preview-csv-head"),l=e.querySelector("#train-timetable-preview-csv-body"),d=e.querySelector("#train-timetable-preview-fallback"),c=e.querySelector("#train-timetable-preview-open");!t||!r||!n||!s||!a||!i||!o||!l||!d||!c||(r.src="about:blank",r.classList.remove("d-none"),n.classList.add("d-none"),a.classList.add("d-none"),s.textContent="",i.textContent="",o.innerHTML="",l.innerHTML="",c.setAttribute("href","#"),d.classList.add("d-none"),Mt(t))}async function Mf(e,t,r,n,s){try{const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const i=await a.text(),o=jf(i);if(!o.length){t.innerHTML="",r.innerHTML="",n.textContent="Файлът е празен.",s.classList.add("d-none");return}const l=200,d=o.slice(0,l),c=d[0]||[],u=d.slice(1);t.innerHTML=`
      <tr>${c.map(h=>`<th>${dr(h)}</th>`).join("")}</tr>
    `,r.innerHTML=u.map(h=>`<tr>${h.map(m=>`<td>${dr(m)}</td>`).join("")}</tr>`).join(""),o.length>l?n.textContent=`Показани са първите ${l} реда от общо ${o.length}.`:n.textContent=`Редове: ${o.length}.`,s.classList.add("d-none")}catch{t.innerHTML="",r.innerHTML="",n.textContent="",s.classList.remove("d-none")}}function jf(e){const t=[];let r=[],n="",s=!1;for(let a=0;a<e.length;a+=1){const i=e[a],o=e[a+1];if(i==='"'){s&&o==='"'?(n+='"',a+=1):s=!s;continue}if(!s&&i===","){r.push(n),n="";continue}if(!s&&(i===`
`||i==="\r")){i==="\r"&&o===`
`&&(a+=1),r.push(n),t.push(r),r=[],n="";continue}n+=i}return(n.length||r.length)&&(r.push(n),t.push(r)),t}async function Nf(e,t,r){try{const n=await fetch(e,{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.text();t.textContent=s||"(Празен файл)",r.classList.add("d-none")}catch{t.textContent="Неуспешно зареждане на текстов преглед.",r.classList.remove("d-none")}}function Hf(e){const t=ta(e);return["doc","docx","xls","xlsx","ppt","pptx"].includes(t)?`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(e)}`:e}function ta(e){const t=String(e||"").trim();if(!t)return"";try{const n=new URL(t).pathname.split("/").pop()||"",s=n.includes(".")?n.split(".").pop():"";return String(s||"").toLowerCase()}catch{return""}}const Uf=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Админ панел</h1>\r
    </div>\r
\r
    <p class="text-secondary mb-4">Управление на потребителски роли и свързване на профили към служители.</p>\r
\r
    <div class="mb-3">\r
      <div class="nav nav-tabs" role="tablist" aria-label="Админ панели">\r
        <button type="button" class="nav-link active" data-admin-tab="roles" role="tab" aria-selected="true">Роли</button>\r
        <button type="button" class="nav-link" data-admin-tab="profiles" role="tab" aria-selected="false">Профили към служители</button>\r
        <button type="button" class="nav-link" data-admin-tab="permissions" role="tab" aria-selected="false">Права по роли</button>\r
      </div>\r
    </div>\r
\r
    <div class="tab-content">\r
      <section class="tab-pane border rounded p-3 active" data-admin-tab-pane="roles" role="tabpanel">\r
          <div class="d-flex justify-content-between align-items-center mb-3">\r
            <h2 class="h5 mb-0">Роли към потребители</h2>\r
            <button id="open-admin-role-modal" type="button" class="btn btn-sm btn-outline-primary">Нова роля</button>\r
          </div>\r
\r
          <div class="table-responsive mb-4">\r
            <table class="table align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Код</th>\r
                  <th>Име (БГ)</th>\r
                  <th class="text-end">Действия</th>\r
                </tr>\r
              </thead>\r
              <tbody id="admin-role-catalog-body"></tbody>\r
            </table>\r
          </div>\r
          <p id="admin-role-catalog-empty" class="text-secondary d-none mt-2 mb-3"></p>\r
\r
          <div class="table-responsive">\r
            <table class="table align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Потребител</th>\r
                  <th>Роля</th>\r
                  <th>Дадена от</th>\r
                  <th class="text-end">Действия</th>\r
                </tr>\r
              </thead>\r
              <tbody id="admin-roles-body"></tbody>\r
            </table>\r
          </div>\r
          <p id="admin-roles-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
\r
          <hr class="my-4" />\r
\r
          <div class="d-flex justify-content-between align-items-center mb-3">\r
            <h3 class="h6 mb-0">История на ролеви промени</h3>\r
          </div>\r
\r
          <div class="table-responsive">\r
            <table class="table table-sm align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Кога</th>\r
                  <th>Действие</th>\r
                  <th>Роля</th>\r
                  <th>Кой</th>\r
                  <th>За кого</th>\r
                </tr>\r
              </thead>\r
              <tbody id="admin-role-audit-body"></tbody>\r
            </table>\r
          </div>\r
          <p id="admin-role-audit-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
      </section>\r
\r
      <section class="tab-pane border rounded p-3 d-none" data-admin-tab-pane="profiles" role="tabpanel">\r
          <div class="d-flex justify-content-between align-items-center mb-3">\r
            <h2 class="h5 mb-0">Профили към служители</h2>\r
          </div>\r
\r
          <div class="table-responsive">\r
            <table class="table align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Профил</th>\r
                  <th>Статус</th>\r
                  <th>Свързан служител</th>\r
                  <th class="text-end">Действия</th>\r
                </tr>\r
              </thead>\r
              <tbody id="admin-profiles-body"></tbody>\r
            </table>\r
          </div>\r
          <p id="admin-profiles-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
      </section>\r
\r
      <section class="tab-pane border rounded p-3 d-none" data-admin-tab-pane="permissions" role="tabpanel">\r
          <div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">\r
            <div>\r
              <h2 class="h5 mb-1">Права по роли</h2>\r
              <p class="text-secondary mb-0">Нива на достъп за всяко действие: без достъп, всички, собствени, към прикачени служители по роля.</p>\r
              <div class="form-check form-switch mt-2">\r
                <input class="form-check-input" type="checkbox" id="admin-permissions-banner-toggle" />\r
                <label class="form-check-label" for="admin-permissions-banner-toggle">Показвай индикатор за права в страниците</label>\r
              </div>\r
            </div>\r
            <form id="admin-permissions-form" class="d-flex flex-wrap align-items-end gap-2">\r
              <div>\r
                <label for="admin-permissions-role" class="form-label mb-1">Роля</label>\r
                <select id="admin-permissions-role" class="form-select">\r
                  <option value="">Избери роля</option>\r
                </select>\r
              </div>\r
              <button id="admin-permissions-save" type="submit" class="btn btn-primary">Запази права</button>\r
            </form>\r
          </div>\r
\r
          <div class="table-responsive">\r
            <table class="table align-middle mb-0">\r
              <thead>\r
                <tr>\r
                  <th>Таблица</th>\r
                  <th class="text-center">Виж екрана</th>\r
                  <th class="text-center">Виж записи</th>\r
                  <th class="text-center">Създаване</th>\r
                  <th class="text-center">Редакция</th>\r
                  <th class="text-center">Изтриване</th>\r
                </tr>\r
              </thead>\r
              <tbody id="admin-permissions-body"></tbody>\r
            </table>\r
          </div>\r
          <p id="admin-permissions-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
      </section>\r
    </div>\r
  </div>\r
</section>\r
\r
<div id="admin-role-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 560px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="admin-role-modal-title" class="h5 mb-0">Нова роля</h2>\r
          <button id="admin-role-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="admin-role-modal-form" class="row g-3">\r
          <input type="hidden" id="admin-role-modal-original-name" />\r
          <div class="col-12">\r
            <label for="admin-role-modal-name" class="form-label">Код на роля</label>\r
            <input id="admin-role-modal-name" class="form-control" type="text" placeholder="например: dispatcher" required />\r
            <div class="form-text">Използвай малки латински букви, цифри и _</div>\r
          </div>\r
          <div class="col-12">\r
            <label for="admin-role-modal-name-bg" class="form-label">Име на български</label>\r
            <input id="admin-role-modal-name-bg" class="form-control" type="text" placeholder="например: Диспечер" required />\r
          </div>\r
          <div class="col-12 d-flex justify-content-end gap-2 mt-2">\r
            <button id="admin-role-modal-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="admin-role-modal-save" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="admin-role-warning-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Потвърди действие</h2>\r
          <button id="admin-role-warning-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
        <p id="admin-role-warning-message" class="text-secondary mb-4">Сигурен ли си?</p>\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="admin-role-warning-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="admin-role-warning-confirm" type="button" class="btn btn-danger">Потвърди</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="admin-assign-role-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 560px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Добави роля към потребител</h2>\r
          <button id="admin-assign-role-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="admin-role-form" class="row g-3">\r
          <div class="col-12">\r
            <label for="admin-role-profile-id" class="form-label">Профил</label>\r
            <select id="admin-role-profile-id" class="form-select" required>\r
              <option value="">Избери профил</option>\r
            </select>\r
          </div>\r
          <div class="col-12">\r
            <label for="admin-role-value" class="form-label">Роля</label>\r
            <select id="admin-role-value" class="form-select" required>\r
              <option value="">Избери роля</option>\r
            </select>\r
          </div>\r
          <div class="col-12 d-flex justify-content-end gap-2 mt-2">\r
            <button id="admin-assign-role-modal-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="admin-role-add" type="submit" class="btn btn-primary">Добави роля</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="admin-profile-link-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 560px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Свържи профил към служител</h2>\r
          <button id="admin-profile-link-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="admin-profile-link-form" class="row g-3">\r
          <div class="col-12">\r
            <label for="admin-profile-link-id" class="form-label">Профил</label>\r
            <select id="admin-profile-link-id" class="form-select" required>\r
              <option value="">Избери профил</option>\r
            </select>\r
          </div>\r
          <div class="col-12">\r
            <label for="admin-profile-link-employee-id" class="form-label">Служител</label>\r
            <select id="admin-profile-link-employee-id" class="form-select" required>\r
              <option value="">Избери служител</option>\r
            </select>\r
          </div>\r
          <div class="col-12 d-flex justify-content-end gap-2 mt-2">\r
            <button id="admin-profile-link-modal-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="admin-profile-link-clear" type="button" class="btn btn-outline-secondary">Разкачи</button>\r
            <button id="admin-profile-link-save" type="submit" class="btn btn-primary">Запази</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,F={profiles:[],employees:[],roleCatalog:[],availableRoles:[],roles:[],roleAuditLogs:[],currentUserId:"",currentUserProtectedAdminIds:[],permissionsRole:"admin",permissions:[]},Ff={admin:"Админ",crew_manager:"Ръководител екип",head_of_transport:"Ръководител транспорт",crew_instructor:"Инструктор екип",instructor:"Инструктор",crew:"Екип",crew_member:"Член екип",user:"Потребител"};function me(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;")}function ml(e){const t=String((e==null?void 0:e.username)||"").trim(),r=String((e==null?void 0:e.id)||"").trim(),n=(e==null?void 0:e.is_active)===!1;if(t&&r)return`${t} (${r})${n?" (деактивиран)":""}`;const s=t||r||"-";return n&&s!=="-"?`${s} (деактивиран)`:s}function fl(e){const t=String((e==null?void 0:e.first_name)||"").trim(),r=String((e==null?void 0:e.last_name)||"").trim(),n=`${t} ${r}`.trim();return n?(e==null?void 0:e.is_active)===!1?`${n} (неактивен)`:n:"-"}function an(e){const t=String(e||"").trim().toLowerCase();return t?Ff[t]||e:"-"}const yl=[{value:"none",label:"без достъп"},{value:"all",label:"всички"},{value:"own",label:"собствени"},{value:"role_attached_employees",label:"към прикачени служители по роля"}],Bf=[{value:"none",label:"Не"},{value:"all",label:"Да"}],Kf=[{value:"none",label:"Не"},{value:"all",label:"Да"}];function ra(e){const t=e.querySelector("#admin-role-profile-id"),r=e.querySelector("#admin-profile-link-id"),n=e.querySelector("#admin-profile-link-employee-id"),s=(t==null?void 0:t.value)||"",a=(r==null?void 0:r.value)||"",i=(n==null?void 0:n.value)||"",o=F.profiles.map(d=>{const c=ml(d);return`<option value="${d.id}">${me(c)}</option>`}).join("");t&&(t.innerHTML=`<option value="">Избери профил</option>${o}`,t.value=F.profiles.some(d=>d.id===s)?s:""),r&&(r.innerHTML=`<option value="">Избери профил</option>${o}`,r.value=F.profiles.some(d=>d.id===a)?a:"");const l=F.employees.map(d=>{const c=fl(d);return`<option value="${d.id}">${me(c)}</option>`}).join("");n&&(n.innerHTML=`<option value="">Избери служител</option>${l}`,n.value=F.employees.some(d=>d.id===i)?i:"")}function na(e,t){const r=e.querySelector("#admin-roles-body"),n=e.querySelector("#admin-roles-empty");if(!r||!n)return;if(!F.roles.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма добавени роли.";return}n.classList.add("d-none");const s=F.roles.filter(a=>String((a==null?void 0:a.role)||"").trim().toLowerCase()==="admin").length;r.innerHTML=F.roles.map(a=>{const i=(a==null?void 0:a.username)||(a==null?void 0:a.user_id)||"-",o=a!=null&&a.role?zf(a.role):"-",l=(a==null?void 0:a.granted_by_username)||(a==null?void 0:a.granted_by_user_id)||"-",d=(a==null?void 0:a.user_id)||"",c=!!(a!=null&&a.role),u=String((a==null?void 0:a.role)||"").trim().toLowerCase()==="admin",h=u&&s<=1,m=u&&d&&F.currentUserProtectedAdminIds.includes(d),p=!c||h||m,f=[c?`<span class="badge text-bg-secondary">${me(o)}</span>`:'<span class="text-secondary">-</span>',m?'<span class="badge text-bg-info">Твой grantor lineage</span>':""].filter(Boolean).join(" "),_=h?"Не може да се премахне последният администратор.":m?"Не можеш да премахнеш админ права нагоре по grantor веригата.":"";return`
        <tr>
          <td>${me(i)}</td>
          <td>${f}</td>
          <td>${c?me(l):'<span class="text-secondary">-</span>'}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-admin-action="add-role"
                data-user-id="${d}"
                data-username="${me(i)}"
              >
                Добави роля
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-admin-action="remove-role"
                data-role-id="${a.id||""}"
                ${p?"disabled":""}
                title="${_}"
              >
                Премахни
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}function sa(e,t){const r=e.querySelector("#admin-role-catalog-body"),n=e.querySelector("#admin-role-catalog-empty");if(!(!r||!n)){if(!F.roleCatalog.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма налични роли.";return}n.classList.add("d-none"),r.innerHTML=F.roleCatalog.map(s=>{const a=String((s==null?void 0:s.name)||"").trim(),i=String((s==null?void 0:s.display_name_bg)||"").trim()||an(a),o=a==="admin";return`
        <tr>
          <td>${me(a)}</td>
          <td>${me(i)}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-admin-action="edit-catalog-role"
                data-role-name="${me(a)}"
                data-role-bg="${me(i)}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-admin-action="delete-catalog-role"
                data-role-name="${me(a)}"
                ${o?"disabled":""}
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}}function aa(e,t){const r=e.querySelector("#admin-profiles-body"),n=e.querySelector("#admin-profiles-empty");if(!(!r||!n)){if(!F.profiles.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма налични профили.";return}n.classList.add("d-none"),r.innerHTML=F.profiles.map(s=>{const a=ml(s),i=(s==null?void 0:s.is_active)!==!1,o=i?'<span class="badge text-bg-success">Активен</span>':'<span class="badge text-bg-secondary">Деактивиран</span>',l=s!=null&&s.employees?fl(s.employees):"-",d=!!(s!=null&&s.employee_id),c=String((s==null?void 0:s.id)||"")===String(F.currentUserId||""),u=!i||c,h=i,m=c;return`
        <tr>
          <td>${me(a)}</td>
          <td>${o}</td>
          <td>${me(l)}</td>
          <td class="text-end">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary me-2"
              data-admin-action="link-profile"
              data-profile-id="${s.id}"
            >
              Свържи
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger me-2"
              data-admin-action="unlink-profile"
              data-profile-id="${s.id}"
              ${d?"":"disabled"}
            >
              Разкачи
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-warning me-2"
              data-admin-action="deactivate-profile"
              data-profile-id="${s.id}"
              ${u?"disabled":""}
              title="${c?"Не можеш да деактивираш собствения си профил.":""}"
            >
              Деактивирай
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-success"
              data-admin-action="restore-profile"
              data-profile-id="${s.id}"
              ${h?"disabled":""}
            >
              Възстанови
            </button>
            <button
              type="button"
              class="btn btn-sm btn-danger ms-2"
              data-admin-action="hard-delete-user"
              data-profile-id="${s.id}"
              ${m?"disabled":""}
              title="${c?"Не можеш да изтриеш собствения си акаунт.":"Необратимо изтриване (Auth + профил + роли)."}"
            >
              Изтрий
            </button>
          </td>
        </tr>
      `}).join("")}}function ia(e,t){const r=e.querySelector("#admin-permissions-body"),n=e.querySelector("#admin-permissions-empty");if(!(!r||!n)){if(!F.permissions.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма данни за права.";return}n.classList.add("d-none"),r.innerHTML=F.permissions.map(s=>{const a=String((s==null?void 0:s.resource)||"-"),i=String((s==null?void 0:s.display_name_bg)||"").trim()||ts(a),o=Cr(s==null?void 0:s.view_screen_scope),l=Cr(s==null?void 0:s.view_records_scope),d=Cr(s==null?void 0:s.create_records_scope),c=Cr(s==null?void 0:s.edit_records_scope),u=Cr(s==null?void 0:s.delete_records_scope);return`
        <tr data-resource="${me(a)}">
          <td>${me(i)}</td>
          <td class="text-center">
            ${Ar("view_screen_scope",o)}
          </td>
          <td class="text-center">
            ${Ar("view_records_scope",l)}
          </td>
          <td class="text-center">
            ${Ar("create_records_scope",d)}
          </td>
          <td class="text-center">
            ${Ar("edit_records_scope",c)}
          </td>
          <td class="text-center">
            ${Ar("delete_records_scope",u)}
          </td>
        </tr>
      `}).join("")}}function oa(e,t){const r=e.querySelector("#admin-role-audit-body"),n=e.querySelector("#admin-role-audit-empty");if(!(!r||!n)){if(!F.roleAuditLogs.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма записани промени по роли.";return}n.classList.add("d-none"),r.innerHTML=F.roleAuditLogs.map(s=>{const a=String((s==null?void 0:s.action)||"").trim(),i=a==="grant"?"Добавяне":a==="revoke"?"Премахване":"Обновяване",o=(s==null?void 0:s.role_label)||"-",l=(s==null?void 0:s.actor_label)||"-",d=(s==null?void 0:s.target_label)||"-",c=Wf(s==null?void 0:s.occurred_at);return`
        <tr>
          <td>${me(c)}</td>
          <td>${me(i)}</td>
          <td>${me(o)}</td>
          <td>${me(l)}</td>
          <td>${me(d)}</td>
        </tr>
      `}).join("")}}function Ar(e,t){const n=(e==="view_screen_scope"?Bf:e==="create_records_scope"?Kf:yl).map(s=>{const a=s.value===t?"selected":"";return`<option value="${s.value}" ${a}>${me(s.label)}</option>`}).join("");return`<select class="form-select form-select-sm" data-permission-field="${e}">${n}</select>`}function Cr(e){const t=String(e||"").trim();return yl.some(r=>r.value===t)?t:"none"}function zf(e){const t=String(e||"").trim();if(!t)return"-";const r=F.roleCatalog.find(s=>(s==null?void 0:s.name)===t);return r&&String((r==null?void 0:r.display_name_bg)||"").trim()||an(t)}function Wf(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?"-":t.toLocaleString("bg-BG")}const Vf=["admin","head_of_transport","instructor","crew","user"],co={admin:10,crew_manager:20,head_of_transport:30,crew_instructor:40,instructor:50,crew:60,crew_member:70,user:80};let Zt=null;async function Gf(e){e.innerHTML=Uf;const t=e.querySelector("#admin-permissions-banner-toggle"),r=e.querySelector("#admin-permissions-role");t&&(t.checked=Ho()),r&&(r.value=F.permissionsRole),Jn(e),oy(e),Jf(e),await Ia(e),await un(e,F.permissionsRole)}function Jf(e){const t=e.querySelector("#admin-assign-role-modal"),r=e.querySelector("#admin-assign-role-modal-close"),n=e.querySelector("#admin-assign-role-modal-cancel"),s=e.querySelector("#admin-profile-link-modal"),a=e.querySelector("#admin-profile-link-modal-close"),i=e.querySelector("#admin-profile-link-modal-cancel"),o=e.querySelector("#open-admin-role-modal"),l=e.querySelector("#admin-role-modal"),d=e.querySelector("#admin-role-modal-form"),c=e.querySelector("#admin-role-modal-close"),u=e.querySelector("#admin-role-modal-cancel"),h=e.querySelector("#admin-role-warning-modal"),m=e.querySelector("#admin-role-warning-close"),p=e.querySelector("#admin-role-warning-cancel"),f=e.querySelector("#admin-role-warning-confirm"),_=e.querySelector("#admin-role-form"),y=e.querySelector("#admin-profile-link-form"),g=e.querySelector("#admin-profile-link-clear"),b=e.querySelector("#admin-permissions-form"),w=e.querySelector("#admin-permissions-role"),k=e.querySelector("#admin-permissions-banner-toggle"),L=e.querySelector("#admin-roles-body"),x=e.querySelector("#admin-role-catalog-body"),E=e.querySelector("#admin-profiles-body");r==null||r.addEventListener("click",()=>{Pe(t)}),n==null||n.addEventListener("click",()=>{Pe(t)}),a==null||a.addEventListener("click",()=>{Pe(s)}),i==null||i.addEventListener("click",()=>{Pe(s)}),o==null||o.addEventListener("click",()=>{po(e,{mode:"create"})}),d==null||d.addEventListener("submit",async q=>{q.preventDefault(),await Zf(e)}),c==null||c.addEventListener("click",()=>{Pe(l),Jn(e)}),u==null||u.addEventListener("click",()=>{Pe(l),Jn(e)}),m==null||m.addEventListener("click",()=>{Pe(h),Zt=null}),p==null||p.addEventListener("click",()=>{Pe(h),Zt=null}),f==null||f.addEventListener("click",async()=>{if(!Zt){Pe(h);return}const q=Zt;Zt=null,Pe(h),await q()}),_==null||_.addEventListener("submit",async q=>{q.preventDefault(),await ey(e)}),y==null||y.addEventListener("submit",async q=>{q.preventDefault(),await ry(e)}),g==null||g.addEventListener("click",async()=>{var T;const q=((T=e.querySelector("#admin-profile-link-id"))==null?void 0:T.value)||"";if(!q){v("Избери профил за разкачане.","warning");return}pt(e,{message:"Сигурен ли си, че искаш да разкачиш профила от служителя?",confirmLabel:"Разкачи",onConfirm:()=>la(e,q,null)})}),b==null||b.addEventListener("submit",async q=>{q.preventDefault(),await dy(e)}),w==null||w.addEventListener("change",async q=>{const T=q.target.value||"admin";F.permissionsRole=T,await un(e,T)}),k==null||k.addEventListener("change",q=>{var T;vu(!!((T=q.target)!=null&&T.checked)),v("Настройката за индикатора е запазена.","success")}),L==null||L.addEventListener("click",async q=>{const T=q.target.closest('button[data-admin-action="add-role"]');if(T){const A=T.getAttribute("data-user-id")||"";if(!A)return;Xf(e,A);return}const C=q.target.closest('button[data-admin-action="remove-role"]');if(!C)return;const $=C.getAttribute("data-role-id")||"";$&&pt(e,{message:"Сигурен ли си, че искаш да разкачиш тази роля от потребителя?",confirmLabel:"Разкачи",onConfirm:()=>ty(e,$)})}),x==null||x.addEventListener("click",async q=>{const T=q.target.closest('button[data-admin-action="edit-catalog-role"]');if(T){const A=T.getAttribute("data-role-name")||"",D=T.getAttribute("data-role-bg")||"";po(e,{mode:"edit",roleName:A,roleNameBg:D});return}const C=q.target.closest('button[data-admin-action="delete-catalog-role"]');if(!C)return;const $=C.getAttribute("data-role-name")||"";$&&await iy(e,$)}),E==null||E.addEventListener("click",async q=>{const T=q.target.closest('button[data-admin-action="link-profile"]');if(T){const U=T.getAttribute("data-profile-id")||"";U&&Yf(e,U);return}const C=q.target.closest('button[data-admin-action="unlink-profile"]');if(C){const U=C.getAttribute("data-profile-id")||"";if(!U)return;pt(e,{message:"Сигурен ли си, че искаш да разкачиш профила от служителя?",confirmLabel:"Разкачи",onConfirm:()=>la(e,U,null)});return}const $=q.target.closest('button[data-admin-action="deactivate-profile"]');if($){const U=$.getAttribute("data-profile-id")||"";if(!U)return;if(U===F.currentUserId){v("Не можеш да деактивираш собствения си профил.","warning");return}pt(e,{message:"Сигурен ли си, че искаш да деактивираш този профил? Потребителят ще загуби достъп до системата.",confirmLabel:"Деактивирай",onConfirm:()=>uo(e,U,!1)});return}const A=q.target.closest('button[data-admin-action="restore-profile"]');if(A){const U=A.getAttribute("data-profile-id")||"";if(!U)return;pt(e,{message:"Сигурен ли си, че искаш да възстановиш този профил?",confirmLabel:"Възстанови",onConfirm:()=>uo(e,U,!0)});return}const D=q.target.closest('button[data-admin-action="hard-delete-user"]');if(!D)return;const O=D.getAttribute("data-profile-id")||"";if(O){if(O===F.currentUserId){v("Не можеш да изтриеш собствения си акаунт.","warning");return}pt(e,{message:"Сигурен ли си? Това е необратимо: ще бъдат изтрити Auth акаунтът, профилът и ролите.",confirmLabel:"Изтрий",onConfirm:()=>Qf(e,O)})}})}async function Qf(e,t){if(!t)return;const r=async()=>{var p,f;const{data:c,error:u}=await S.auth.refreshSession();if(!u&&((p=c==null?void 0:c.session)!=null&&p.access_token))return c.session.access_token;const{data:h,error:m}=await S.auth.getSession();return m||!((f=h==null?void 0:h.session)!=null&&f.access_token)?"":h.session.access_token};let n=await r();if(!n){v("Липсва активна сесия. Влез отново и опитай пак.","warning");return}const s="https://ujxczpaupfqaiqrcoykl.supabase.co",a="sb_publishable_EJ7wzzBh1hnKE0j_j7E1mQ_9TAJvRoO",i="admin-hard-delete-user-v2",o=async c=>fetch(`${s}/functions/v1/${i}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:a,Authorization:`Bearer ${c}`},body:JSON.stringify({userId:t,reason:"admin_panel"})});let l;try{l=await o(n)}catch{v("Неуспешна връзка към Edge функцията.","error");return}let d=null;try{d=await l.json()}catch{d=null}if(l.status===401&&(n=await r(),n))try{l=await o(n),d=null;try{d=await l.json()}catch{d=null}}catch{v("Неуспешна връзка към Edge функцията.","error");return}if(!l.ok){const c=String((d==null?void 0:d.error)||(d==null?void 0:d.message)||l.statusText||"Изтриването не беше успешно.");if(l.status===401){v("Нямаш валидна сесия за Edge функцията. Опитай logout/login.","warning");return}if(String(c).toLowerCase().includes("last admin")){v("Не може да се изтрие последният администратор.","warning");return}v(c,"error");return}if(!(d!=null&&d.ok)){v("Изтриването не беше успешно.","error");return}v("Потребителят е изтрит.","success"),await Ia(e)}function Yf(e,t){const r=e.querySelector("#admin-profile-link-modal"),n=e.querySelector("#admin-profile-link-id"),s=e.querySelector("#admin-profile-link-employee-id"),a=F.profiles.find(i=>i.id===t);n&&(n.value=t),s&&(s.value=(a==null?void 0:a.employee_id)||""),os(r)}function Xf(e,t){const r=e.querySelector("#admin-assign-role-modal"),n=e.querySelector("#admin-role-profile-id"),s=e.querySelector("#admin-role-value");n&&(n.value=t),s&&(s.value=""),os(r)}async function Ia(e){var h;const{data:t}=await S.auth.getUser();F.currentUserId=((h=t==null?void 0:t.user)==null?void 0:h.id)||"";const[{data:r,error:n},{data:s,error:a},{data:i,error:o},{data:l,error:d},{data:c,error:u}]=await Promise.all([S.from("user_profiles").select("id, username, is_active, employee_id, employees(id, first_name, last_name, is_active)").order("username",{ascending:!0}),S.from("employees").select("id, first_name, last_name, is_active").order("last_name",{ascending:!0}).order("first_name",{ascending:!0}),S.from("user_roles").select("id, user_id, role, granted_by_user_id").order("role",{ascending:!0}).order("created_at",{ascending:!1}),S.from("roles").select("name, display_name_bg").order("name",{ascending:!0}),S.from("user_role_audit_logs").select("id, action, role, actor_user_id, target_user_id, occurred_at").order("occurred_at",{ascending:!1}).limit(100)]);if(n||a||o||d||u){v((n==null?void 0:n.message)||(a==null?void 0:a.message)||(o==null?void 0:o.message)||(d==null?void 0:d.message)||(u==null?void 0:u.message)||"Грешка при зареждане на админ панела.","error"),F.profiles=[],F.employees=[],F.roleCatalog=[],F.availableRoles=[],F.roles=[],F.roleAuditLogs=[],F.currentUserProtectedAdminIds=[],ra(e),sa(e,"Няма налични роли."),na(e,"Няма данни за роли."),oa(e,"Няма записани промени по роли."),aa(e,"Няма данни за профили.");return}F.profiles=r||[],F.employees=s||[],F.roleCatalog=l||[],F.roles=sy(i||[],F.profiles),F.roleAuditLogs=vl(c||[],F.profiles),F.currentUserProtectedAdminIds=gl(F.roles),F.availableRoles=_l(l||[],i||[]),wl(e),ra(e),sa(e),na(e),oa(e),aa(e)}async function Zf(e){var f,_;const t=e.querySelector("#admin-role-modal-original-name"),r=e.querySelector("#admin-role-modal-name"),n=e.querySelector("#admin-role-modal-name-bg"),s=e.querySelector("#admin-role-modal-save"),a=((f=t==null?void 0:t.value)==null?void 0:f.trim())||"",i=(r==null?void 0:r.value)||"",o=(n==null?void 0:n.value)||"",l=i.trim().toLowerCase(),d=o.trim();if(!l){v("Въведи име на роля.","warning");return}if(!d){v("Въведи име на ролята на български.","warning");return}if(!/^[a-z0-9_]+$/.test(l)){v("Ролята може да съдържа само малки латински букви, цифри и _.","warning");return}const c=(s==null?void 0:s.innerHTML)||"";s&&(s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Създаване...');const{data:u}=await S.auth.getUser();let h=null;if(a){const{error:y}=await S.from("roles").update({name:l,display_name_bg:d||l}).eq("name",a);h=y}else{const{error:y}=await S.from("roles").insert({name:l,display_name_bg:d||l,created_from:((_=u==null?void 0:u.user)==null?void 0:_.email)||"admin_panel"});h=y}if(h){s&&(s.disabled=!1,s.innerHTML=c),v(h.message,"error");return}const m=[...new Map(F.permissions.map(y=>[y.resource,y]).filter(([y])=>!!y)).values()];if(m.length){const y=m.map(b=>({role:l,resource:b.resource,display_name_bg:b.display_name_bg||ts(b.resource),view_screen_scope:"none",view_records_scope:"none",create_records_scope:"none",edit_records_scope:"none",delete_records_scope:"none"})),{error:g}=await S.from("role_permissions").upsert(y,{onConflict:"role,resource"});if(g){s&&(s.disabled=!1,s.innerHTML=c),v(g.message,"error");return}}r&&(r.value=""),n&&(n.value=""),t&&(t.value=""),s&&(s.disabled=!1,s.innerHTML=c),v(a?"Ролята е обновена.":"Ролята е създадена.","success"),await Sl(e);const p=e.querySelector("#admin-permissions-role");p&&(p.value=l),F.permissionsRole=l,await un(e,l),Pe(e.querySelector("#admin-role-modal")),Jn(e)}async function ey(e){var d,c,u,h;const t=((d=e.querySelector("#admin-role-profile-id"))==null?void 0:d.value)||"",r=((c=e.querySelector("#admin-role-value"))==null?void 0:c.value)||"",n=e.querySelector("#admin-role-add");if(!t||!r){v("Избери профил и роля.","warning");return}const s=(n==null?void 0:n.innerHTML)||"";n&&(n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...');const{data:a}=await S.auth.getUser(),{error:i}=await S.from("user_roles").insert({user_id:t,role:r,granted_by_user_id:((u=a==null?void 0:a.user)==null?void 0:u.id)||null,created_from:((h=a==null?void 0:a.user)==null?void 0:h.email)||"admin_panel"});if(n&&(n.disabled=!1,n.innerHTML=s),i){v(i.message,"error");return}v("Ролята е добавена.","success"),Pe(e.querySelector("#admin-assign-role-modal"));const o=e.querySelector("#admin-role-profile-id"),l=e.querySelector("#admin-role-value");o&&(o.value=""),l&&(l.value=""),await Promise.all([Da(e),bl(e)])}async function ty(e,t){const{error:r}=await S.from("user_roles").delete().eq("id",t);if(r){if(String(r.message||"").toLowerCase().includes("last admin")){v("Не може да се премахне последната админ роля.","warning");return}if(String(r.message||"").toLowerCase().includes("grantor")){v("Не можеш да отнемеш админ права нагоре по grantor веригата.","warning");return}v(r.message,"error");return}v("Ролята е премахната.","success"),await Promise.all([Da(e),bl(e)])}async function ry(e){var n,s;const t=((n=e.querySelector("#admin-profile-link-id"))==null?void 0:n.value)||"",r=((s=e.querySelector("#admin-profile-link-employee-id"))==null?void 0:s.value)||"";if(!t||!r){v("Избери профил и служител.","warning");return}await la(e,t,r)}async function la(e,t,r){const n=e.querySelector("#admin-profile-link-save"),s=(n==null?void 0:n.innerHTML)||"";if(n&&(n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...'),r){const{error:l}=await S.from("user_profiles").update({employee_id:null,updated_at:new Date().toISOString()}).eq("employee_id",r).neq("id",t);if(l){n&&(n.disabled=!1,n.innerHTML=s),v(l.message,"error");return}}const{error:a}=await S.from("user_profiles").update({employee_id:r,updated_at:new Date().toISOString()}).eq("id",t);if(n&&(n.disabled=!1,n.innerHTML=s),a){v(a.message,"error");return}v(r?"Профилът е свързан със служителя.":"Профилът е разкачен от служител.","success"),Pe(e.querySelector("#admin-profile-link-modal"));const i=e.querySelector("#admin-profile-link-id"),o=e.querySelector("#admin-profile-link-employee-id");i&&(i.value=""),o&&(o.value=""),await ly(e)}async function uo(e,t,r){if(!t)return;const n=F.profiles.find(i=>String((i==null?void 0:i.id)||"")===String(t));if((n==null?void 0:n.is_active)!==!1===r){v(r?"Профилът вече е активен.":"Профилът вече е деактивиран.","warning");return}const{error:a}=await S.from("user_profiles").update({is_active:r,updated_at:new Date().toISOString()}).eq("id",t);if(a){if(String(a.message||"").toLowerCase().includes("last active admin")){v("Не може да деактивираш последния активен администратор.","warning");return}v(a.message,"error");return}v(r?"Профилът е възстановен.":"Профилът е деактивиран.","success"),await Ia(e)}async function Da(e){const{data:t,error:r}=await S.from("user_roles").select("id, user_id, role, granted_by_user_id").order("created_at",{ascending:!1});if(r){v(r.message,"error");return}F.roles=ny(t||[],F.profiles),F.currentUserProtectedAdminIds=gl(F.roles),na(e)}async function bl(e){const{data:t,error:r}=await S.from("user_role_audit_logs").select("id, action, role, actor_user_id, target_user_id, occurred_at").order("occurred_at",{ascending:!1}).limit(100);if(r){v(r.message,"error");return}F.roleAuditLogs=vl(t||[],F.profiles),oa(e)}function vl(e,t){const r=new Map((t||[]).map(n=>[n.id,n]));return(e||[]).map(n=>{const s=r.get(n.actor_user_id),a=r.get(n.target_user_id),i=String((n==null?void 0:n.role)||"").trim();return{...n,role_label:i?an(i):"-",actor_label:(s==null?void 0:s.username)||(n==null?void 0:n.actor_user_id)||"-",target_label:(a==null?void 0:a.username)||(n==null?void 0:n.target_user_id)||"-"}})}function gl(e){const t=String(F.currentUserId||"").trim();if(!t)return[];const r=(e||[]).filter(d=>String((d==null?void 0:d.role)||"").trim().toLowerCase()==="admin"),n=new Map(r.map(d=>[String((d==null?void 0:d.user_id)||"").trim(),String((d==null?void 0:d.granted_by_user_id)||"").trim()])),s=(e||[]).find(d=>String((d==null?void 0:d.user_id)||"").trim()===t&&String((d==null?void 0:d.role)||"").trim().toLowerCase()==="admin"),a=String((s==null?void 0:s.granted_by_user_id)||"").trim();if(!a)return[];const i=[],o=new Set([t]);let l=a;for(;l&&!o.has(l);){i.push(l),o.add(l);const d=String(n.get(l)||"").trim();if(!d||d===l)break;l=d}return i}function ny(e,t){const r=new Map((t||[]).map(n=>[n.id,n]));return(e||[]).map(n=>{var s,a;return{...n,username:((s=r.get(n.user_id))==null?void 0:s.username)||"",granted_by_username:((a=r.get(n.granted_by_user_id))==null?void 0:a.username)||""}})}function sy(e,t){const r=new Map((t||[]).map(a=>[a.id,a])),n=new Map;(e||[]).forEach(a=>{n.has(a.user_id)||n.set(a.user_id,[]),n.get(a.user_id).push(a)});const s=[];return(t||[]).forEach(a=>{const i=n.get(a.id)||[];i.length>0?i.forEach(o=>{var l;s.push({...o,username:a.username,user_id:a.id,granted_by_username:((l=r.get(o.granted_by_user_id))==null?void 0:l.username)||""})}):s.push({id:null,user_id:a.id,role:null,username:a.username,granted_by_user_id:null,granted_by_username:""})}),s}function _l(e,t){const r=(e||[]).map(a=>String((a==null?void 0:a.name)||"").trim()).filter(Boolean),n=(t||[]).map(a=>String((a==null?void 0:a.role)||"").trim()).filter(Boolean);return[...new Set([...Vf,...r,...n])].sort((a,i)=>{const o=String(a||"").trim().toLowerCase(),l=String(i||"").trim().toLowerCase(),d=co[o]??999,c=co[l]??999;return d!==c?d-c:o.localeCompare(l,"en")})}function wl(e){const t=e.querySelector("#admin-role-value"),r=e.querySelector("#admin-permissions-role"),n=(t==null?void 0:t.value)||"",s=(r==null?void 0:r.value)||F.permissionsRole||"",a=F.availableRoles.map(i=>{const o=kl(i);return`<option value="${i}">${o}</option>`}).join("");if(t&&(t.innerHTML=`<option value="">Избери роля</option>${a}`,t.value=F.availableRoles.includes(n)?n:""),r){r.innerHTML=a;const i=F.availableRoles.includes("admin")?"admin":F.availableRoles[0]||"",o=F.availableRoles.includes(s)?s:i;r.value=o,F.permissionsRole=o}}async function Sl(e){const{data:t,error:r}=await S.from("roles").select("name, display_name_bg").order("name",{ascending:!0});if(r){v(r.message,"error");return}F.roleCatalog=t||[],F.availableRoles=_l(t||[],F.roles),wl(e),sa(e)}function kl(e){const t=F.roleCatalog.find(n=>(n==null?void 0:n.name)===e),r=String((t==null?void 0:t.display_name_bg)||"").trim();return r||an(e)}async function ay(e,t){if(!t)return;if(t==="admin"){v("Ролята admin не може да бъде изтрита.","warning");return}const{error:r}=await S.from("role_permissions").delete().eq("role",t);if(r){v(r.message,"error");return}const{error:n}=await S.from("roles").delete().eq("name",t);if(n){v(n.message,"error");return}if(v("Ролята е изтрита.","success"),await Sl(e),await Da(e),F.permissionsRole===t){const s=F.availableRoles.includes("admin")?"admin":F.availableRoles[0]||"";F.permissionsRole=s,s?await un(e,s):(F.permissions=[],ia(e,"Няма данни за права."))}}function po(e,{mode:t,roleName:r="",roleNameBg:n=""}){const s=e.querySelector("#admin-role-modal"),a=e.querySelector("#admin-role-modal-title"),i=e.querySelector("#admin-role-modal-original-name"),o=e.querySelector("#admin-role-modal-name"),l=e.querySelector("#admin-role-modal-name-bg"),d=e.querySelector("#admin-role-modal-save");i&&(i.value=t==="edit"?r:""),o&&(o.value=t==="edit"?r:""),l&&(l.value=t==="edit"?n||r:""),a&&(a.textContent=t==="edit"?"Редакция на роля":"Нова роля"),d&&(d.textContent=t==="edit"?"Запази":"Създай"),os(s)}function Jn(e){const t=e.querySelector("#admin-role-modal-original-name"),r=e.querySelector("#admin-role-modal-name"),n=e.querySelector("#admin-role-modal-name-bg"),s=e.querySelector("#admin-role-modal-title"),a=e.querySelector("#admin-role-modal-save");t&&(t.value=""),r&&(r.value=""),n&&(n.value=""),s&&(s.textContent="Нова роля"),a&&(a.textContent="Създай")}function pt(e,{message:t,confirmLabel:r,onConfirm:n}){const s=e.querySelector("#admin-role-warning-modal"),a=e.querySelector("#admin-role-warning-message"),i=e.querySelector("#admin-role-warning-confirm");Zt=typeof n=="function"?n:null,a&&(a.textContent=t||"Сигурен ли си?"),i&&(i.textContent=r||"Потвърди"),os(s)}async function iy(e,t){const{count:r,error:n}=await S.from("user_roles").select("id",{count:"exact",head:!0}).eq("role",t);if(n){v(n.message,"error");return}const s=kl(t),a=Number(r||0);if(a>0){pt(e,{message:`Ролята "${s}" не може да бъде изтрита, защото е разкачена към ${a} потребител(и). Първо премахни свързаните роли от потребителите.`,confirmLabel:"Затвори",onConfirm:null});return}pt(e,{message:`Сигурен ли си, че искаш да премахнеш ролята "${s}"? Ще бъдат изтрити и всички права за тази роля.`,confirmLabel:"Премахни",onConfirm:()=>ay(e,t)})}function os(e){e&&e.classList.remove("d-none")}function Pe(e){e&&e.classList.add("d-none")}function oy(e){var a,i;const t=[...e.querySelectorAll("[data-admin-tab]")],r=[...e.querySelectorAll("[data-admin-tab-pane]")];if(!t.length||!r.length)return;const n=o=>{t.forEach(l=>{const d=l.getAttribute("data-admin-tab")===o;l.classList.toggle("active",d),l.setAttribute("aria-selected",d?"true":"false")}),r.forEach(l=>{const d=l.getAttribute("data-admin-tab-pane")===o;l.classList.toggle("active",d),l.classList.toggle("d-none",!d)})};t.forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-admin-tab")||"";l&&n(l)})});const s=((a=t.find(o=>o.classList.contains("active")))==null?void 0:a.getAttribute("data-admin-tab"))||((i=t[0])==null?void 0:i.getAttribute("data-admin-tab"))||"";s&&n(s)}async function ly(e){const{data:t,error:r}=await S.from("user_profiles").select("id, username, is_active, employee_id, employees(id, first_name, last_name, is_active)").order("username",{ascending:!0});if(r){v(r.message,"error");return}F.profiles=t||[],ra(e),aa(e)}async function un(e,t){const r=t||"admin",{data:n,error:s}=await S.from("role_permissions").select("role, resource, display_name_bg, view_screen_scope, view_records_scope, create_records_scope, edit_records_scope, delete_records_scope").eq("role",r).order("resource",{ascending:!0});if(s){v(s.message,"error"),F.permissions=[],ia(e,"Няма данни за права.");return}F.permissions=n||[],ia(e)}async function dy(e){const t=e.querySelector("#admin-permissions-save"),r=e.querySelector("#admin-permissions-role"),n=(r==null?void 0:r.value)||"admin",s=[...e.querySelectorAll("#admin-permissions-body tr[data-resource]")];if(!s.length){v("Няма редове за запис.","warning");return}const a=s.map(l=>{const d=l.getAttribute("data-resource")||"",c=F.permissions.find(h=>h.resource===d),u=h=>{var p;const m=((p=l.querySelector(`[data-permission-field="${h}"]`))==null?void 0:p.value)||"none";return h==="view_screen_scope"||h==="create_records_scope"?["none","all"].includes(m)?m:"none":["none","all","own","role_attached_employees"].includes(m)?m:"none"};return{role:n,resource:d,display_name_bg:(c==null?void 0:c.display_name_bg)||ts(d),view_screen_scope:u("view_screen_scope"),view_records_scope:u("view_records_scope"),create_records_scope:u("create_records_scope"),edit_records_scope:u("edit_records_scope"),delete_records_scope:u("delete_records_scope"),updated_at:new Date().toISOString()}}),i=(t==null?void 0:t.innerHTML)||"";t&&(t.disabled=!0,t.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...');const{error:o}=await S.from("role_permissions").upsert(a,{onConflict:"role,resource"});if(t&&(t.disabled=!1,t.innerHTML=i),o){v(o.message,"error");return}v("Правата са записани.","success"),await un(e,n)}const cy=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex justify-content-between align-items-center mb-3">\r
      <h1 class="h3 mb-0">Документи</h1>\r
      <div class="d-flex gap-2">\r
        <button id="open-create-document-category" type="button" class="btn btn-outline-primary">Нова категория</button>\r
        <button id="open-create-document" type="button" class="btn btn-primary">Нов документ</button>\r
      </div>\r
    </div>\r
\r
    <p class="text-secondary">Управление на категории и документи към тях.</p>\r
\r
    <div class="row g-4">\r
      <div class="col-12 col-lg-4">\r
        <h2 class="h6 mb-3">Категории</h2>\r
        <div class="table-responsive">\r
          <table class="table align-middle table-sm">\r
            <thead>\r
              <tr>\r
                <th>Име</th>\r
                <th class="text-end">Действия</th>\r
              </tr>\r
            </thead>\r
            <tbody id="document-categories-table-body"></tbody>\r
          </table>\r
        </div>\r
        <p id="document-categories-empty" class="text-secondary d-none mb-0"></p>\r
      </div>\r
\r
      <div class="col-12 col-lg-8">\r
        <div class="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-3">\r
          <h2 class="h6 mb-0">Документи</h2>\r
          <div class="d-flex gap-2 align-items-end">\r
            <div>\r
              <label for="documents-search" class="form-label mb-1">Търсене</label>\r
              <input id="documents-search" type="text" class="form-control form-control-sm" placeholder="Търси по заглавие" />\r
            </div>\r
            <div>\r
              <label for="documents-category-filter" class="form-label mb-1">Категория</label>\r
              <select id="documents-category-filter" class="form-select form-select-sm">\r
                <option value="">Всички</option>\r
              </select>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="table-responsive">\r
          <table class="table align-middle">\r
            <thead>\r
              <tr>\r
                <th>Заглавие</th>\r
                <th>Категория</th>\r
                <th>Линк</th>\r
                <th class="text-end">Действия</th>\r
              </tr>\r
            </thead>\r
            <tbody id="documents-table-body"></tbody>\r
          </table>\r
        </div>\r
        <p id="documents-empty" class="text-secondary d-none mb-0"></p>\r
      </div>\r
    </div>\r
  </div>\r
</section>\r
\r
<div id="document-category-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 620px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="document-category-form-title" class="h5 mb-0">Нова категория</h2>\r
          <button id="document-category-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="document-category-form">\r
          <input type="hidden" id="document-category-id" />\r
          <div class="row g-3">\r
            <div class="col-12">\r
              <label for="document-category-name" class="form-label">Име</label>\r
              <input id="document-category-name" type="text" class="form-control" required />\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="document-category-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="document-category-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="document-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 720px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="document-form-title" class="h5 mb-0">Нов документ</h2>\r
          <button id="document-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="document-form">\r
          <input type="hidden" id="document-id" />\r
          <div class="row g-3">\r
            <div class="col-12">\r
              <label for="document-title" class="form-label">Заглавие</label>\r
              <input id="document-title" type="text" class="form-control" required />\r
            </div>\r
            <div class="col-md-6">\r
              <label for="document-category" class="form-label">Категория</label>\r
              <select id="document-category" class="form-select" required>\r
                <option value="">Избери категория</option>\r
              </select>\r
            </div>\r
            <div class="col-md-6">\r
              <label for="document-file" class="form-label">Файл</label>\r
              <input id="document-file" type="file" class="form-control" required />\r
              <div class="form-text" id="document-file-help">Качи файл за документа.</div>\r
              <div class="form-text d-none" id="document-current-file-wrap">\r
                Текущ файл: <a id="document-current-file-link" href="#" target="_blank" rel="noopener noreferrer">Отвори</a>\r
              </div>\r
            </div>\r
            <div class="col-12">\r
              <label for="document-notes" class="form-label">Бележки</label>\r
              <textarea id="document-notes" class="form-control" rows="3" placeholder="По избор"></textarea>\r
            </div>\r
          </div>\r
\r
          <div class="d-flex justify-content-end gap-2 mt-4">\r
            <button id="document-cancel-btn" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="document-save-btn" type="submit" class="btn btn-primary">Създай</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="document-category-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш тази категория?</p>\r
        <input type="hidden" id="document-category-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="document-category-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="document-category-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="document-delete-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <h2 class="h5 mb-3">Потвърди изтриване</h2>\r
        <p class="text-secondary mb-4">Сигурен ли си, че искаш да изтриеш този документ?</p>\r
        <input type="hidden" id="document-delete-id" />\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="document-delete-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="document-delete-confirm" type="button" class="btn btn-danger">Изтрий</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="document-preview-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1070;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3 p-md-4">\r
    <div class="card w-100" style="max-width: 1100px;">\r
      <div class="card-body p-3 p-md-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 id="document-preview-title" class="h5 mb-0">Преглед на документ</h2>\r
          <div class="d-flex align-items-center gap-2">\r
            <a id="document-preview-open" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary">Отвори файла</a>\r
            <button id="document-preview-close" type="button" class="btn-close" aria-label="Close"></button>\r
          </div>\r
        </div>\r
        <div id="document-preview-fallback" class="alert alert-info py-2 d-none" role="alert">\r
          Този тип файл може да не се визуализира вградено. Използвай „Отвори файла" за директен преглед.\r
        </div>\r
        <div id="document-preview-text-wrap" class="d-none">\r
          <pre id="document-preview-text" class="border rounded p-3 bg-light mb-0" style="height: min(72vh, 760px); overflow: auto; white-space: pre-wrap; word-break: break-word;"></pre>\r
        </div>\r
        <div id="document-preview-csv-wrap" class="d-none">\r
          <p id="document-preview-csv-note" class="text-secondary small mb-2"></p>\r
          <div class="table-responsive border rounded" style="height: min(72vh, 760px); overflow: auto;">\r
            <table class="table table-sm table-striped table-bordered mb-0">\r
              <thead id="document-preview-csv-head"></thead>\r
              <tbody id="document-preview-csv-body"></tbody>\r
            </table>\r
          </div>\r
        </div>\r
        <iframe\r
          id="document-preview-frame"\r
          title="Преглед на документ"\r
          class="w-100 border rounded"\r
          style="height: min(72vh, 760px);"\r
        ></iframe>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Lt(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const ho=new Map;function uy(e,t){const r=ho.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Ue(a);return}}};ho.set(e,n),document.addEventListener("keydown",n)}function Ue(e){var t,r,n,s,a;e.classList.add("d-none"),(t=document.querySelector("#document-category-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#document-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#document-category-delete-modal"))!=null&&n.classList.contains("d-none"))&&((s=document.querySelector("#document-delete-modal"))!=null&&s.classList.contains("d-none"))&&((a=document.querySelector("#document-preview-modal"))!=null&&a.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function je(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const $e={categories:[],documents:[],searchQuery:"",categoryFilter:""};async function py(e){const{data:t,error:r}=await S.from("document_categories").select("id, name").order("name",{ascending:!0});if(r){v(r.message,"error"),$e.categories=[],mo(e,"Грешка при зареждане на категориите.");return}$e.categories=t||[],mo(e),Pa(e)}async function hy(e){const{data:t,error:r}=await S.from("documents").select("id, title, document_url, storage_path, notes, category_id, document_categories(name)").order("title",{ascending:!0});if(r){v(r.message,"error"),$e.documents=[],Qn(e,"Грешка при зареждане на документите.");return}$e.documents=t||[],Qn(e)}function Pa(e){const t=e.querySelector("#documents-category-filter"),r=e.querySelector("#document-category"),n=($e.categories||[]).map(s=>`<option value="${s.id}">${je(s.name||"-")}</option>`).join("");t&&(t.innerHTML='<option value="">Всички</option>'+n,t.value=$e.categoryFilter||""),r&&(r.innerHTML='<option value="">Избери категория</option>'+n)}function mo(e,t){const r=e.querySelector("#document-categories-table-body"),n=e.querySelector("#document-categories-empty"),s=$e.categories||[];if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени категории.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>`
      <tr>
        <td>${je(a.name||"-")}</td>
        <td class="text-end">
          <div class="d-inline-flex gap-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              data-category-action="edit"
              data-id="${a.id}"
              data-name="${je(a.name||"")}"
            >
              Редакция
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger"
              data-category-action="delete"
              data-id="${a.id}"
            >
              Изтрий
            </button>
          </div>
        </td>
      </tr>
    `).join("")}function Qn(e,t){const r=e.querySelector("#documents-table-body"),n=e.querySelector("#documents-empty"),s=($e.documents||[]).filter(a=>{const i=!$e.searchQuery||String((a==null?void 0:a.title)||"").toLowerCase().includes($e.searchQuery),o=!$e.categoryFilter||String((a==null?void 0:a.category_id)||"")===String($e.categoryFilter||"");return i&&o});if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени документи.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>{var i;return`
      <tr>
        <td>${je(a.title||"-")}</td>
        <td>${je(((i=a.document_categories)==null?void 0:i.name)||"-")}</td>
        <td>
          <div class="d-inline-flex gap-2 align-items-center">
            <button
              type="button"
              class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
              data-document-action="preview"
              data-title="${je(a.title||"")}"
              data-url="${je(a.document_url||"")}"
              title="Преглед"
              aria-label="Преглед"
            >
              👁
            </button>
            <a href="${je(a.document_url||"#")}" target="_blank" rel="noopener noreferrer">Отвори</a>
          </div>
        </td>
        <td class="text-end">
          <div class="d-inline-flex gap-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              data-document-action="edit"
              data-id="${a.id}"
              data-title="${je(a.title||"")}"
              data-category-id="${a.category_id||""}"
              data-url="${je(a.document_url||"")}"
              data-storage-path="${je(a.storage_path||"")}"
              data-notes="${je(a.notes||"")}"
            >
              Редакция
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-danger"
              data-document-action="delete"
              data-id="${a.id}"
            >
              Изтрий
            </button>
          </div>
        </td>
      </tr>
    `}).join("")}const on="documents-files";async function my(e){e.innerHTML=cy,fy(e),await pn(e)}async function pn(e){await py(e),await hy(e)}function fy(e){var p,f,_,y,g,b,w,k,L;const t=e.querySelector("#open-create-document-category"),r=e.querySelector("#open-create-document"),n=e.querySelector("#document-category-modal"),s=e.querySelector("#document-modal"),a=e.querySelector("#document-category-delete-modal"),i=e.querySelector("#document-delete-modal"),o=e.querySelector("#document-preview-modal"),l=e.querySelector("#document-category-form"),d=e.querySelector("#document-form"),c=e.querySelector("#document-categories-table-body"),u=e.querySelector("#documents-table-body"),h=e.querySelector("#documents-search"),m=e.querySelector("#documents-category-filter");t==null||t.addEventListener("click",()=>{xl(e),Lt(n)}),r==null||r.addEventListener("click",()=>{if(!($e.categories||[]).length){v("Добави първо категория.","warning");return}ql(e),Pa(e),Lt(s)}),l==null||l.addEventListener("submit",async x=>{x.preventDefault(),await yy(e)}),d==null||d.addEventListener("submit",async x=>{x.preventDefault(),await by(e)}),(p=e.querySelector("#document-category-modal-close"))==null||p.addEventListener("click",()=>Ue(n)),(f=e.querySelector("#document-category-cancel-btn"))==null||f.addEventListener("click",()=>Ue(n)),(_=e.querySelector("#document-modal-close"))==null||_.addEventListener("click",()=>Ue(s)),(y=e.querySelector("#document-cancel-btn"))==null||y.addEventListener("click",()=>Ue(s)),(g=e.querySelector("#document-category-delete-cancel"))==null||g.addEventListener("click",()=>Ue(a)),(b=e.querySelector("#document-delete-cancel"))==null||b.addEventListener("click",()=>Ue(i)),(w=e.querySelector("#document-preview-close"))==null||w.addEventListener("click",()=>xy(e)),(k=e.querySelector("#document-category-delete-confirm"))==null||k.addEventListener("click",async()=>{const x=e.querySelector("#document-category-delete-id").value;await vy(e,x)}),(L=e.querySelector("#document-delete-confirm"))==null||L.addEventListener("click",async()=>{const x=e.querySelector("#document-delete-id").value;await gy(e,x)}),c==null||c.addEventListener("click",x=>{const E=x.target.closest("button[data-category-action]");if(!E)return;const q=E.getAttribute("data-category-action");if(q==="edit"){_y(e,{id:E.getAttribute("data-id"),name:E.getAttribute("data-name")}),Lt(n);return}q==="delete"&&(e.querySelector("#document-category-delete-id").value=E.getAttribute("data-id")||"",Lt(a))}),u==null||u.addEventListener("click",x=>{const E=x.target.closest("button[data-document-action]");if(!E)return;const q=E.getAttribute("data-document-action");if(q==="edit"){wy(e,{id:E.getAttribute("data-id"),title:E.getAttribute("data-title"),categoryId:E.getAttribute("data-category-id"),url:E.getAttribute("data-url"),storagePath:E.getAttribute("data-storage-path"),notes:E.getAttribute("data-notes")}),Lt(s);return}if(q==="delete"){e.querySelector("#document-delete-id").value=E.getAttribute("data-id")||"",Lt(i);return}if(q==="preview"){const T=String(E.getAttribute("data-url")||"").trim(),C=String(E.getAttribute("data-title")||"").trim();ky(e,T,C)}}),h==null||h.addEventListener("input",x=>{$e.searchQuery=x.target.value.trim().toLowerCase(),Qn(e)}),m==null||m.addEventListener("change",x=>{$e.categoryFilter=x.target.value||"",Qn(e)}),uy("documents-page",[o,i,a,s,n])}async function yy(e){var o,l;const t=e.querySelector("#document-category-id").value,r=e.querySelector("#document-category-name"),n=e.querySelector("#document-category-save-btn"),s=r.value.trim();if(!s){v("Попълни име на категория.","warning");return}const a=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';let i=null;if(t)({error:i}=await S.from("document_categories").update({name:s,updated_at:new Date().toISOString()}).eq("id",t));else{const{data:d}=await S.auth.getUser(),c=((o=d==null?void 0:d.user)==null?void 0:o.id)??((l=d==null?void 0:d.user)==null?void 0:l.email)??"web_app";({error:i}=await S.from("document_categories").insert({name:s,created_from:c}))}if(n.disabled=!1,n.innerHTML=a,i){if(i.code==="23505"){v("Категория с това име вече съществува.","warning");return}v(i.message,"error");return}Ue(e.querySelector("#document-category-modal")),xl(e),await pn(e),v(t?"Категорията е обновена.":"Категорията е създадена.","success")}async function by(e){var p,f,_,y,g,b;const t=e.querySelector("#document-id").value,r=e.querySelector("#document-title").value.trim(),n=e.querySelector("#document-category").value||null,s=((p=e.querySelector("#document-current-file-link"))==null?void 0:p.getAttribute("href"))||"",a=((_=(f=e.querySelector("#document-current-file-link"))==null?void 0:f.dataset)==null?void 0:_.storagePath)||"",i=e.querySelector("#document-file"),o=((y=i==null?void 0:i.files)==null?void 0:y[0])||null,l=e.querySelector("#document-notes").value.trim()||null,d=e.querySelector("#document-save-btn");if(!r||!n){v("Попълни всички задължителни полета.","warning");return}if(!t&&!o){v("Качи файл за документа.","warning");return}const c=d.innerHTML;d.disabled=!0,d.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';let u=null,h=s,m=a;if(o){const w=await Sy(o);if(w.error){d.disabled=!1,d.innerHTML=c,v(w.error.message||"Файлът не може да се качи.","error");return}h=w.publicUrl,m=w.path}if(t)({error:u}=await S.from("documents").update({title:r,category_id:n,document_url:h,storage_path:m,notes:l,updated_at:new Date().toISOString()}).eq("id",t));else{const{data:w}=await S.auth.getUser(),k=((g=w==null?void 0:w.user)==null?void 0:g.id)??((b=w==null?void 0:w.user)==null?void 0:b.email)??"web_app";({error:u}=await S.from("documents").insert({title:r,category_id:n,document_url:h,storage_path:m,notes:l,created_from:k}))}if(d.disabled=!1,d.innerHTML=c,u){o&&m&&await S.storage.from(on).remove([m]),v(u.message,"error");return}t&&o&&a&&a!==m&&await S.storage.from(on).remove([a]),Ue(e.querySelector("#document-modal")),ql(e),await pn(e),v(t?"Документът е обновен.":"Документът е създаден.","success")}async function vy(e,t){const r=e.querySelector("#document-category-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{count:s,error:a}=await S.from("documents").select("id",{count:"exact",head:!0}).eq("category_id",t);if(a){r.disabled=!1,r.innerHTML=n,v(a.message,"error");return}if((s||0)>0){r.disabled=!1,r.innerHTML=n,v("Категорията не може да се изтрие, защото съдържа документи.","warning");return}const{error:i}=await S.from("document_categories").delete().eq("id",t);if(r.disabled=!1,r.innerHTML=n,i){v(i.message,"error");return}Ue(e.querySelector("#document-category-delete-modal")),await pn(e),v("Категорията е изтрита.","success")}async function gy(e,t){const r=e.querySelector("#document-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{data:s}=await S.from("documents").select("storage_path").eq("id",t).maybeSingle(),{error:a}=await S.from("documents").delete().eq("id",t);if(r.disabled=!1,r.innerHTML=n,a){v(a.message,"error");return}s!=null&&s.storage_path&&await S.storage.from(on).remove([s.storage_path]),Ue(e.querySelector("#document-delete-modal")),await pn(e),v("Документът е изтрит.","success")}function _y(e,t){e.querySelector("#document-category-id").value=t.id||"",e.querySelector("#document-category-name").value=t.name||"",e.querySelector("#document-category-form-title").textContent="Редакция на категория",e.querySelector("#document-category-save-btn").textContent="Запази"}function xl(e){e.querySelector("#document-category-id").value="",e.querySelector("#document-category-name").value="",e.querySelector("#document-category-form-title").textContent="Нова категория",e.querySelector("#document-category-save-btn").textContent="Създай"}function wy(e,t){Pa(e);const r=e.querySelector("#document-file"),n=e.querySelector("#document-file-help"),s=e.querySelector("#document-current-file-wrap"),a=e.querySelector("#document-current-file-link");e.querySelector("#document-id").value=t.id||"",e.querySelector("#document-title").value=t.title||"",e.querySelector("#document-category").value=t.categoryId||"",e.querySelector("#document-notes").value=t.notes||"",r&&(r.value="",r.required=!1),n&&(n.textContent="По избор: качи нов файл, за да замениш текущия."),s&&a&&t.url&&(s.classList.remove("d-none"),a.setAttribute("href",t.url),a.dataset.storagePath=t.storagePath||""),e.querySelector("#document-form-title").textContent="Редакция на документ",e.querySelector("#document-save-btn").textContent="Запази"}function ql(e){const t=e.querySelector("#document-file"),r=e.querySelector("#document-file-help"),n=e.querySelector("#document-current-file-wrap"),s=e.querySelector("#document-current-file-link");e.querySelector("#document-id").value="",e.querySelector("#document-title").value="",e.querySelector("#document-category").value="",e.querySelector("#document-notes").value="",t&&(t.value="",t.required=!0),r&&(r.textContent="Качи файл за документа."),n&&n.classList.add("d-none"),s&&(s.setAttribute("href","#"),s.dataset.storagePath=""),e.querySelector("#document-form-title").textContent="Нов документ",e.querySelector("#document-save-btn").textContent="Създай"}async function Sy(e){var l,d;const{data:t}=await S.auth.getSession(),r=((d=(l=t==null?void 0:t.session)==null?void 0:l.user)==null?void 0:d.id)||"anonymous",n=Date.now(),s=String((e==null?void 0:e.name)||"document").replace(/[^a-zA-Z0-9._-]/g,"_"),a=`${r}/${n}_${s}`,{error:i}=await S.storage.from(on).upload(a,e,{upsert:!1});if(i)return{error:i};const{data:o}=S.storage.from(on).getPublicUrl(a);return{path:a,publicUrl:(o==null?void 0:o.publicUrl)||"",error:null}}function ky(e,t,r){const n=e.querySelector("#document-preview-modal"),s=e.querySelector("#document-preview-frame"),a=e.querySelector("#document-preview-text-wrap"),i=e.querySelector("#document-preview-text"),o=e.querySelector("#document-preview-csv-wrap"),l=e.querySelector("#document-preview-csv-note"),d=e.querySelector("#document-preview-csv-head"),c=e.querySelector("#document-preview-csv-body"),u=e.querySelector("#document-preview-title"),h=e.querySelector("#document-preview-fallback"),m=e.querySelector("#document-preview-open");if(!n||!s||!a||!i||!o||!l||!d||!c||!u||!h||!m)return;const p=String(t||"").trim();if(!p){v("Липсва файл за преглед.","warning");return}const f=Ey(p),_=da(p),y=_==="csv",g=["txt","csv","json"].includes(_);u.textContent=r?`Преглед: ${r}`:"Преглед на документ",m.setAttribute("href",p),h.classList.add("d-none"),a.classList.add("d-none"),o.classList.add("d-none"),l.textContent="",d.innerHTML="",c.innerHTML="",i.textContent="",s.classList.remove("d-none"),s.src="about:blank",y?(o.classList.remove("d-none"),s.classList.add("d-none"),qy(p,d,c,l,h)):g?(a.classList.remove("d-none"),s.classList.add("d-none"),i.textContent="Зареждане...",Ty(p,i,h)):(s.src=f,s.onload=()=>{if(f!==p){h.classList.add("d-none");return}const b=da(p),w=["doc","docx","xls","xlsx","ppt","pptx"].includes(b);h.classList.toggle("d-none",!w)},s.onerror=()=>{h.classList.remove("d-none")}),Lt(n)}function xy(e){const t=e.querySelector("#document-preview-modal"),r=e.querySelector("#document-preview-frame"),n=e.querySelector("#document-preview-text-wrap"),s=e.querySelector("#document-preview-text"),a=e.querySelector("#document-preview-csv-wrap"),i=e.querySelector("#document-preview-csv-note"),o=e.querySelector("#document-preview-csv-head"),l=e.querySelector("#document-preview-csv-body"),d=e.querySelector("#document-preview-fallback"),c=e.querySelector("#document-preview-open");!t||!r||!n||!s||!a||!i||!o||!l||!d||!c||(r.src="about:blank",r.classList.remove("d-none"),n.classList.add("d-none"),a.classList.add("d-none"),s.textContent="",i.textContent="",o.innerHTML="",l.innerHTML="",c.setAttribute("href","#"),d.classList.add("d-none"),Ue(t))}async function qy(e,t,r,n,s){try{const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const i=await a.text(),o=Ly(i);if(!o.length){t.innerHTML="",r.innerHTML="",n.textContent="Файлът е празен.",s.classList.add("d-none");return}const l=200,d=o.slice(0,l),c=d[0]||[],u=d.slice(1);t.innerHTML=`
      <tr>${c.map(h=>`<th>${fo(h)}</th>`).join("")}</tr>
    `,r.innerHTML=u.map(h=>`<tr>${h.map(m=>`<td>${fo(m)}</td>`).join("")}</tr>`).join(""),o.length>l?n.textContent=`Показани са първите ${l} реда от общо ${o.length}.`:n.textContent=`Редове: ${o.length}.`,s.classList.add("d-none")}catch{t.innerHTML="",r.innerHTML="",n.textContent="",s.classList.remove("d-none")}}function Ly(e){const t=[];let r=[],n="",s=!1;for(let a=0;a<e.length;a+=1){const i=e[a],o=e[a+1];if(i==='"'){s&&o==='"'?(n+='"',a+=1):s=!s;continue}if(!s&&i===","){r.push(n),n="";continue}if(!s&&(i===`
`||i==="\r")){i==="\r"&&o===`
`&&(a+=1),r.push(n),t.push(r),r=[],n="";continue}n+=i}return(n.length||r.length)&&(r.push(n),t.push(r)),t}async function Ty(e,t,r){try{const n=await fetch(e,{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.text();t.textContent=s||"(Празен файл)",r.classList.add("d-none")}catch{t.textContent="Неуспешно зареждане на текстов преглед.",r.classList.remove("d-none")}}function Ey(e){const t=da(e);return["doc","docx","xls","xlsx","ppt","pptx"].includes(t)?`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(e)}`:e}function da(e){const t=String(e||"").trim();if(!t)return"";try{const n=new URL(t).pathname.split("/").pop()||"",s=n.includes(".")?n.split(".").pop():"";return String(s||"").toLowerCase()}catch{return""}}function fo(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const $y=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">\r
      <div>\r
        <h1 class="h3 mb-1">Потребителски профили</h1>\r
        <p class="text-secondary mb-0">Преглед и редакция на профили според правата за достъп.</p>\r
      </div>\r
      <div style="min-width: 260px;">\r
        <label for="user-profiles-search" class="form-label mb-1">Търсене</label>\r
        <input id="user-profiles-search" type="text" class="form-control form-control-sm" placeholder="Търси по username, email, име" />\r
      </div>\r
    </div>\r
\r
    <div class="table-responsive">\r
      <table class="table align-middle mb-0">\r
        <thead>\r
          <tr>\r
            <th>Потребителско име</th>\r
            <th>Имейл</th>\r
            <th>Име</th>\r
            <th>Служител</th>\r
            <th class="text-end">Действия</th>\r
          </tr>\r
        </thead>\r
        <tbody id="user-profiles-table-body"></tbody>\r
      </table>\r
    </div>\r
    <p id="user-profiles-empty" class="text-secondary d-none mt-3 mb-0"></p>\r
  </div>\r
</section>\r
\r
<div id="user-profile-view-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 680px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Преглед на профил</h2>\r
          <button id="user-profile-view-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <div class="row g-3">\r
          <div class="col-md-6">\r
            <div class="border rounded p-3">\r
              <div class="text-secondary small">Потребителско име</div>\r
              <div id="user-profile-view-username" class="fw-semibold">-</div>\r
            </div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="border rounded p-3">\r
              <div class="text-secondary small">Имейл</div>\r
              <div id="user-profile-view-email" class="fw-semibold">-</div>\r
            </div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="border rounded p-3">\r
              <div class="text-secondary small">Собствено име</div>\r
              <div id="user-profile-view-first-name" class="fw-semibold">-</div>\r
            </div>\r
          </div>\r
          <div class="col-md-6">\r
            <div class="border rounded p-3">\r
              <div class="text-secondary small">Фамилия</div>\r
              <div id="user-profile-view-last-name" class="fw-semibold">-</div>\r
            </div>\r
          </div>\r
          <div class="col-12">\r
            <div class="border rounded p-3">\r
              <div class="text-secondary small">Свързан служител</div>\r
              <div id="user-profile-view-employee" class="fw-semibold">-</div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="d-flex justify-content-end mt-4">\r
          <button id="user-profile-view-close-secondary" type="button" class="btn btn-outline-secondary">Затвори</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="user-profile-edit-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 680px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Редакция на профил</h2>\r
          <button id="user-profile-edit-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <form id="user-profile-edit-form" class="row g-3">\r
          <input id="user-profile-edit-id" type="hidden" />\r
\r
          <div class="col-md-6">\r
            <label for="user-profile-edit-username" class="form-label">Потребителско име</label>\r
            <input id="user-profile-edit-username" type="text" class="form-control" required minlength="3" maxlength="30" pattern="^[A-Za-z0-9_]{3,30}$" />\r
          </div>\r
\r
          <div class="col-md-6">\r
            <label for="user-profile-edit-email" class="form-label">Имейл</label>\r
            <input id="user-profile-edit-email" type="email" class="form-control" required />\r
          </div>\r
\r
          <div class="col-md-6">\r
            <label for="user-profile-edit-first-name" class="form-label">Собствено име</label>\r
            <input id="user-profile-edit-first-name" type="text" class="form-control" required />\r
          </div>\r
\r
          <div class="col-md-6">\r
            <label for="user-profile-edit-last-name" class="form-label">Фамилия</label>\r
            <input id="user-profile-edit-last-name" type="text" class="form-control" required />\r
          </div>\r
\r
          <div id="user-profile-password-wrap" class="col-12 d-none">\r
            <div class="border rounded p-3">\r
              <div class="text-secondary small mb-2">Смяна на парола</div>\r
              <div class="row g-3">\r
                <div class="col-md-6">\r
                  <label for="user-profile-edit-new-password" class="form-label">Нова парола</label>\r
                  <div class="input-group">\r
                    <input\r
                      id="user-profile-edit-new-password"\r
                      type="password"\r
                      class="form-control"\r
                      minlength="6"\r
                      pattern="^(?!.*[\\u0400-\\u04FF]).*$"\r
                      title="Паролата не трябва да съдържа кирилица"\r
                    />\r
                    <button\r
                      type="button"\r
                      class="btn btn-outline-secondary"\r
                      data-toggle-password="user-profile-edit-new-password"\r
                      aria-label="Покажи новата парола"\r
                    >\r
                      👁\r
                    </button>\r
                  </div>\r
                </div>\r
                <div class="col-md-6">\r
                  <label for="user-profile-edit-confirm-password" class="form-label">Потвърди нова парола</label>\r
                  <div class="input-group">\r
                    <input\r
                      id="user-profile-edit-confirm-password"\r
                      type="password"\r
                      class="form-control"\r
                      minlength="6"\r
                      pattern="^(?!.*[\\u0400-\\u04FF]).*$"\r
                      title="Паролата не трябва да съдържа кирилица"\r
                    />\r
                    <button\r
                      type="button"\r
                      class="btn btn-outline-secondary"\r
                      data-toggle-password="user-profile-edit-confirm-password"\r
                      aria-label="Покажи потвърждението на новата парола"\r
                    >\r
                      👁\r
                    </button>\r
                  </div>\r
                </div>\r
              </div>\r
              <div class="form-text mt-2">Остави празно, ако не искаш смяна на паролата.</div>\r
            </div>\r
          </div>\r
\r
          <div id="user-profile-edit-employee-wrap" class="col-12 d-none">\r
            <label for="user-profile-edit-employee-id" class="form-label">Свързан служител</label>\r
            <select id="user-profile-edit-employee-id" class="form-select">\r
              <option value="">Без свързан служител</option>\r
            </select>\r
          </div>\r
\r
          <div class="col-12 d-flex justify-content-end gap-2 mt-2">\r
            <button id="user-profile-edit-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
            <button id="user-profile-edit-save" type="submit" class="btn btn-primary">Запази</button>\r
          </div>\r
        </form>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
\r
<div id="user-profile-reset-confirm-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 520px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Потвърждение</h2>\r
          <button id="user-profile-reset-confirm-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <p id="user-profile-reset-confirm-message" class="mb-4">Сигурни ли сте, че искате да изпратите линк?</p>\r
\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="user-profile-reset-confirm-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="user-profile-reset-confirm-accept" type="button" class="btn btn-warning">Изпрати</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`;function Oa(e){e==null||e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const yo=new Map;function Ay(e,t){const r=yo.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){vt(a);return}}};yo.set(e,n),document.addEventListener("keydown",n)}function vt(e){var t,r,n;e==null||e.classList.add("d-none"),(t=document.querySelector("#user-profile-view-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#user-profile-edit-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#user-profile-reset-confirm-modal"))!=null&&n.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Mr(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function ca(e){var s,a;const t=String(((s=e==null?void 0:e.employees)==null?void 0:s.first_name)||"").trim(),r=String(((a=e==null?void 0:e.employees)==null?void 0:a.last_name)||"").trim();return`${t} ${r}`.trim()||"-"}const ae={rows:[],employees:[],searchQuery:"",isAdmin:!1,currentUserId:"",resetConfirmResolver:null};function ua(e,t){const r=e.querySelector("#user-profiles-table-body"),n=e.querySelector("#user-profiles-empty"),s=(ae.rows||[]).filter(a=>{const i=[a==null?void 0:a.username,a==null?void 0:a.email,a==null?void 0:a.first_name,a==null?void 0:a.last_name,ca(a)].map(o=>String(o||"").toLowerCase()).join(" ");return!ae.searchQuery||i.includes(ae.searchQuery)});if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма намерени профили.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>{const i=`${String((a==null?void 0:a.first_name)||"").trim()} ${String((a==null?void 0:a.last_name)||"").trim()}`.trim()||"-",o=ca(a);return`
        <tr>
          <td>${Mr((a==null?void 0:a.username)||"-")}</td>
          <td>${Mr((a==null?void 0:a.email)||"-")}</td>
          <td>${Mr(i)}</td>
          <td>${Mr(o)}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-user-profile-action="view"
                data-id="${a.id}"
              >
                Преглед
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-user-profile-action="edit"
                data-id="${a.id}"
              >
                Редакция
              </button>
              ${ae.isAdmin?`
                <button
                  type="button"
                  class="btn btn-sm btn-outline-warning"
                  data-user-profile-action="reset-password"
                  data-id="${a.id}"
                >
                  Reset парола
                </button>
              `:""}
            </div>
          </td>
        </tr>
      `}).join("")}function Cy(e){const t=e.querySelector("#user-profile-edit-employee-id");if(!t)return;const r=(ae.employees||[]).map(n=>{const s=`${String((n==null?void 0:n.first_name)||"").trim()} ${String((n==null?void 0:n.last_name)||"").trim()}`.trim()||"-";return`<option value="${n.id}">${Mr(s)}</option>`}).join("");t.innerHTML='<option value="">Без свързан служител</option>'+r}async function Ry(e){e.innerHTML=$y,Iy(e),Oy(e),await pa(e)}function Iy(e){e.querySelectorAll("button[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const r=t.getAttribute("data-toggle-password")||"",n=e.querySelector(`#${r}`);if(!n)return;const s=n.type==="password";n.type=s?"text":"password",t.textContent=s?"🙈":"👁";const a=r.includes("confirm"),i=a?"Покажи потвърждението на новата парола":"Покажи новата парола",o=a?"Скрий потвърждението на новата парола":"Скрий новата парола";t.setAttribute("aria-label",s?o:i)})})}function Dy(){return`${window.location.origin}/reset-password`}function Rn(e,t){const r=ae.resetConfirmResolver;r&&(ae.resetConfirmResolver=null,vt(e.querySelector("#user-profile-reset-confirm-modal")),r(!!t))}function Py(e,t){const r=e.querySelector("#user-profile-reset-confirm-modal"),n=e.querySelector("#user-profile-reset-confirm-message");if(!r||!n)return Promise.resolve(!1);if(ae.resetConfirmResolver){const s=ae.resetConfirmResolver;ae.resetConfirmResolver=null,s(!1)}return n.textContent=`Да се изпрати ли линк за смяна на парола до ${t}?`,Oa(r),new Promise(s=>{ae.resetConfirmResolver=s})}function Oy(e){var i,o,l,d,c,u,h,m;const t=e.querySelector("#user-profiles-search"),r=e.querySelector("#user-profiles-table-body"),n=e.querySelector("#user-profile-view-modal"),s=e.querySelector("#user-profile-edit-modal"),a=e.querySelector("#user-profile-reset-confirm-modal");t==null||t.addEventListener("input",p=>{var f;ae.searchQuery=String(((f=p.target)==null?void 0:f.value)||"").trim().toLowerCase(),ua(e)}),r==null||r.addEventListener("click",p=>{const f=p.target.closest("button[data-user-profile-action]");if(!f)return;const _=f.getAttribute("data-user-profile-action"),y=f.getAttribute("data-id")||"";if(_==="view"){jy(e,y);return}if(_==="edit"){Ny(e,y);return}_==="reset-password"&&My(e,y,f)}),(i=e.querySelector("#user-profile-view-close"))==null||i.addEventListener("click",()=>vt(n)),(o=e.querySelector("#user-profile-view-close-secondary"))==null||o.addEventListener("click",()=>vt(n)),(l=e.querySelector("#user-profile-edit-close"))==null||l.addEventListener("click",()=>vt(s)),(d=e.querySelector("#user-profile-edit-cancel"))==null||d.addEventListener("click",()=>vt(s)),(c=e.querySelector("#user-profile-reset-confirm-close"))==null||c.addEventListener("click",()=>Rn(e,!1)),(u=e.querySelector("#user-profile-reset-confirm-cancel"))==null||u.addEventListener("click",()=>Rn(e,!1)),(h=e.querySelector("#user-profile-reset-confirm-accept"))==null||h.addEventListener("click",()=>Rn(e,!0)),a==null||a.addEventListener("click",p=>{p.target===a&&Rn(e,!1)}),(m=e.querySelector("#user-profile-edit-form"))==null||m.addEventListener("submit",async p=>{p.preventDefault(),await Hy(e)}),Ay("user-profiles",[a,s,n])}async function My(e,t,r){if(!ae.isAdmin){v("Нямаш права за това действие.","warning");return}const n=ae.rows.find(c=>c.id===t);if(!n){v("Профилът не е намерен.","warning");return}const s=String(n.email||"").trim();if(!s){v("Потребителят няма валиден имейл.","warning");return}const i=`${String(n.first_name||"").trim()} ${String(n.last_name||"").trim()}`.trim()||n.username||s;if(!await Py(e,i))return;const l=(r==null?void 0:r.innerHTML)||"Reset парола";r&&(r.disabled=!0,r.innerHTML="Изпращане...");const{error:d}=await S.auth.resetPasswordForEmail(s,{redirectTo:Dy()});if(r&&(r.disabled=!1,r.innerHTML=l),d){v(d.message||"Линкът за смяна на парола не беше изпратен.","error");return}v("Изпратен е линк за смяна на парола към потребителя.","success")}async function pa(e){var d,c;const t=await ur(),r=((d=t==null?void 0:t.user)==null?void 0:d.id)||"";ae.currentUserId=r,ae.isAdmin=await pu();const n=e.querySelector("#user-profiles-search");n&&(n.classList.toggle("d-none",!ae.isAdmin),(c=n.previousElementSibling)==null||c.classList.toggle("d-none",!ae.isAdmin));const s=S.from("user_profiles").select("id, username, email, first_name, last_name, employee_id, employees(id, first_name, last_name)").order("username",{ascending:!0});!ae.isAdmin&&r&&s.eq("id",r);const[{data:a,error:i},{data:o,error:l}]=await Promise.all([s,ae.isAdmin?S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0}):Promise.resolve({data:[],error:null})]);if(i||l){v((i==null?void 0:i.message)||(l==null?void 0:l.message)||"Грешка при зареждане на профили.","error"),ae.rows=[],ae.employees=[],ua(e,"Няма данни за профили.");return}ae.rows=a||[],ae.employees=o||[],Cy(e),ua(e)}function jy(e,t){const r=ae.rows.find(n=>n.id===t);if(!r){v("Профилът не е намерен.","warning");return}e.querySelector("#user-profile-view-username").textContent=r.username||"-",e.querySelector("#user-profile-view-email").textContent=r.email||"-",e.querySelector("#user-profile-view-first-name").textContent=r.first_name||"-",e.querySelector("#user-profile-view-last-name").textContent=r.last_name||"-",e.querySelector("#user-profile-view-employee").textContent=ca(r),Oa(e.querySelector("#user-profile-view-modal"))}function Ny(e,t){const r=ae.rows.find(l=>l.id===t);if(!r){v("Профилът не е намерен.","warning");return}const n=e.querySelector("#user-profile-edit-employee-wrap"),s=e.querySelector("#user-profile-password-wrap"),a=e.querySelector("#user-profile-edit-new-password"),i=e.querySelector("#user-profile-edit-confirm-password");n&&n.classList.toggle("d-none",!ae.isAdmin);const o=r.id===ae.currentUserId;s&&s.classList.toggle("d-none",!o),a&&(a.value=""),i&&(i.value=""),e.querySelector("#user-profile-edit-id").value=r.id,e.querySelector("#user-profile-edit-username").value=r.username||"",e.querySelector("#user-profile-edit-email").value=r.email||"",e.querySelector("#user-profile-edit-first-name").value=r.first_name||"",e.querySelector("#user-profile-edit-last-name").value=r.last_name||"",e.querySelector("#user-profile-edit-employee-id").value=r.employee_id||"",Oa(e.querySelector("#user-profile-edit-modal"))}async function Hy(e){var f,_,y,g,b,w,k,L;const t=(((f=e.querySelector("#user-profile-edit-id"))==null?void 0:f.value)||"").trim(),r=(((_=e.querySelector("#user-profile-edit-username"))==null?void 0:_.value)||"").trim(),n=(((y=e.querySelector("#user-profile-edit-email"))==null?void 0:y.value)||"").trim(),s=(((g=e.querySelector("#user-profile-edit-first-name"))==null?void 0:g.value)||"").trim(),a=(((b=e.querySelector("#user-profile-edit-last-name"))==null?void 0:b.value)||"").trim(),i=((w=e.querySelector("#user-profile-edit-new-password"))==null?void 0:w.value)||"",o=((k=e.querySelector("#user-profile-edit-confirm-password"))==null?void 0:k.value)||"",l=((L=e.querySelector("#user-profile-edit-employee-id"))==null?void 0:L.value)||null,d=e.querySelector("#user-profile-edit-save"),c=t===ae.currentUserId;if(!t||!r||!n||!s||!a){v("Попълни всички задължителни полета.","warning");return}if(!/^[A-Za-z0-9_]{3,30}$/.test(r)){v("Потребителското име трябва да е 3-30 символа и да съдържа само латински букви, цифри и _.","warning");return}if((i||o)&&!c){v("Можеш да сменяш паролата само на собствения си профил.","warning");return}if(c&&(i||o)){if(i.length<6){v("Новата парола трябва да е поне 6 символа.","warning");return}const x=/[\u0400-\u04FF]/;if(x.test(i)||x.test(o)){v("Паролата не трябва да съдържа кирилица.","warning");return}if(i!==o){v("Новата парола и потвърждението не съвпадат.","warning");return}}const h=(d==null?void 0:d.innerHTML)||"";d&&(d.disabled=!0,d.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...');const m={username:r,email:n,first_name:s,last_name:a,updated_at:new Date().toISOString()};ae.isAdmin&&(m.employee_id=l||null);const{error:p}=await S.from("user_profiles").update(m).eq("id",t);if(d&&(d.disabled=!1,d.innerHTML=h),p){if(p.code==="23505"){v("Потребителско име или имейл вече съществува.","warning");return}v(p.message,"error");return}if(c&&i){const{error:x}=await S.auth.updateUser({password:i});if(x){v(x.message||"Профилът е обновен, но паролата не беше сменена.","warning"),await pa(e),vt(e.querySelector("#user-profile-edit-modal"));return}}vt(e.querySelector("#user-profile-edit-modal")),await pa(e),v(c&&i?"Профилът и паролата са обновени.":"Профилът е обновен.","success")}const bo={"/":{render:Yu,title:"TrainCrewHub"},"/login":{render:ep,title:"TrainCrewHub / Sign In"},"/register":{render:sp,title:"TrainCrewHub / Register"},"/forgot-password":{render:cp,title:"TrainCrewHub / Forgot Password"},"/reset-password":{render:fp,title:"TrainCrewHub / Reset Password"},"/pending-access":{render:vp,title:"TrainCrewHub / Чака одобрение"},"/schedule-keys":{render:wp,title:"TrainCrewHub / Ключ-График",resource:"schedule_keys"},"/duties":{render:Pp,title:"TrainCrewHub / Повески",resource:"duties"},"/duty-types":{render:Qm,title:"TrainCrewHub / Типове повески",resource:"duty_types"},"/trains":{render:Af,title:"TrainCrewHub / Влакове",resource:"trains"},"/employees":{render:ah,title:"TrainCrewHub / Служители",resource:"employees"},"/employee-absences":{render:mh,title:"TrainCrewHub / Отсъствия",resource:"employee_absences"},"/planned-duties":{render:Mh,title:"TrainCrewHub / Планирани повески",resource:"planned_duties"},"/actual-duties":{render:Wh,title:"TrainCrewHub / Реални повески",resource:"actual_duties"},"/plan-schedule":{render:Lm,title:"TrainCrewHub / План График",screenResource:"page_plan_schedule",resource:"planned_duties"},"/schedule":{render:zm,title:"TrainCrewHub / График",screenResource:"page_schedule",resource:"actual_duties"},"/schedule-key-duties":{render:df,title:"TrainCrewHub / Повески към Ключ-График",resource:"duties"},"/documents":{render:my,title:"TrainCrewHub / Документи",resource:"documents"},"/user-profiles":{render:Ry,title:"TrainCrewHub / Потребителски профили"},"/admin":{render:Gf,title:"TrainCrewHub / Админ Панел",requiresAdmin:!0}},Uy="page-content",Fy={none:"без достъп",all:"всички",own:"собствени",role_attached_employees:"към прикачени служители по роля"};function By(e){return e==="all"?"text-bg-success":e==="own"||e==="role_attached_employees"?"text-bg-warning":"text-bg-secondary"}async function Ky(e,t){if(!e||!t||!Ho())return;const r=await fu(t),n=ts(t),a=[{label:"Екран",key:"view_screen"},{label:"Виж записи",key:"view_records"},{label:"Създаване",key:"create_records"},{label:"Редакция",key:"edit_records"},{label:"Изтриване",key:"delete_records"}].map(({label:o,key:l})=>{const d=r[l]||"none",c=Fy[d]||d,u=By(d);return`
        <span class="me-3 mb-2 d-inline-flex align-items-center gap-2">
          <span class="text-secondary small">${o}:</span>
          <span class="badge ${u}">${c}</span>
        </span>
      `}).join(""),i=document.createElement("div");i.className="alert alert-light border d-flex flex-wrap align-items-center gap-1 mb-3",i.innerHTML=`
    <span class="fw-semibold me-2">Права за ${n}</span>
    ${a}
  `,e.prepend(i)}function vo(e){return bo[e]??bo["/"]}async function zy(e,t){var a,i,o,l;const r=new Set(["/login","/register","/forgot-password","/reset-password"]);let n=null;if(!r.has(e)){const d=await mi();if(!d.allowed)return d.reason==="inactive-profile"&&v("Профилът е деактивиран. Свържи се с администратор.","warning"),"/login";if(n=await ur(),!((a=n==null?void 0:n.user)!=null&&a.id))return"/login";if(!await Hs(n.user.id))return e==="/pending-access"?e:(v("Акаунтът ти чака одобрение от администратор.","warning"),"/pending-access")}if(e==="/pending-access"){if(!((i=n==null?void 0:n.user)!=null&&i.id)){const c=await mi();if(!c.allowed)return c.reason==="inactive-profile"&&v("Профилът е деактивиран. Свържи се с администратор.","warning"),"/login";n=await ur()}return(o=n==null?void 0:n.user)!=null&&o.id?await Hs(n.user.id)?"/":e:"/login"}if(!(t!=null&&t.requiresAdmin)){const d=(t==null?void 0:t.screenResource)||(t==null?void 0:t.resource)||"";return!d||await jo(d)?e:(v("Нямаш права за достъп до този екран.","warning"),"/")}return n=n||await ur(),(l=n==null?void 0:n.user)!=null&&l.id?await ya(n.user.id)?e:(v("Нямаш права за достъп до админ панела.","warning"),"/"):"/login"}async function ha(){const e=document.getElementById(Uy);bu();const t=window.location.pathname,r=vo(t),n=await zy(t,r);n!==t&&window.history.replaceState({},"",n);const s=vo(n);document.title=s.title,await s.render(e),s.resource&&(await Ky(e,s.resource),await yu(e,s.resource)),window.dispatchEvent(new CustomEvent("route:changed",{detail:{pathname:n}}))}function Wy(e){const t=e.target.closest("a[data-link]");if(!t)return;e.preventDefault();const r=t.getAttribute("href");r!==window.location.pathname&&(window.history.pushState({},"",r),ha())}function Vy(){No(),window.addEventListener("popstate",ha),document.addEventListener("click",Wy),ha()}function Ll(){return document.getElementById("app")}function Gy(e){const t=Ll();t&&(t.innerHTML=`
		<div class="container py-5">
			<div class="alert alert-danger" role="alert">
				<h4 class="alert-heading">Грешка при зареждане</h4>
				<p class="mb-2">${e}</p>
				<hr />
				<p class="mb-0">Ако това е Netlify deploy: провери Environment variables за <code>VITE_SUPABASE_URL</code> и <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> и пусни нов deploy.</p>
			</div>
		</div>
	`)}async function Jy(){const e=Ll();if(!e)throw new Error("App root element (#app) not found.");await Su(e),Vy()}function go(){Jy().catch(e=>{const t=e instanceof Error?e.message:String(e);console.error("App bootstrap failed:",e),Gy(t)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",go,{once:!0}):go();
