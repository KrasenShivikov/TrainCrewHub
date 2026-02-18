(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();const Dl=`<div class="d-flex flex-column min-vh-100 bg-light-subtle">\r
  <header id="app-header"></header>\r
  <main id="page-content" class="container py-4 flex-grow-1"></main>\r
  <footer id="app-footer"></footer>\r
</div>\r
`,Ol=`<nav class="navbar navbar-expand-lg navbar-dark bg-primary">\r
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
`;function rs(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(r[n[s]]=e[n[s]]);return r}function Pl(e,t,r,n){function s(a){return a instanceof r?a:new r(function(i){i(a)})}return new(r||(r=Promise))(function(a,i){function o(c){try{d(n.next(c))}catch(u){i(u)}}function l(c){try{d(n.throw(c))}catch(u){i(u)}}function d(c){c.done?a(c.value):s(c.value).then(o,l)}d((n=n.apply(e,t||[])).next())})}const Ml=e=>e?(...t)=>e(...t):(...t)=>fetch(...t);class ga extends Error{constructor(t,r="FunctionsError",n){super(t),this.name=r,this.context=n}}class jl extends ga{constructor(t){super("Failed to send a request to the Edge Function","FunctionsFetchError",t)}}class Qa extends ga{constructor(t){super("Relay Error invoking the Edge Function","FunctionsRelayError",t)}}class Ya extends ga{constructor(t){super("Edge Function returned a non-2xx status code","FunctionsHttpError",t)}}var Os;(function(e){e.Any="any",e.ApNortheast1="ap-northeast-1",e.ApNortheast2="ap-northeast-2",e.ApSouth1="ap-south-1",e.ApSoutheast1="ap-southeast-1",e.ApSoutheast2="ap-southeast-2",e.CaCentral1="ca-central-1",e.EuCentral1="eu-central-1",e.EuWest1="eu-west-1",e.EuWest2="eu-west-2",e.EuWest3="eu-west-3",e.SaEast1="sa-east-1",e.UsEast1="us-east-1",e.UsWest1="us-west-1",e.UsWest2="us-west-2"})(Os||(Os={}));class Nl{constructor(t,{headers:r={},customFetch:n,region:s=Os.Any}={}){this.url=t,this.headers=r,this.region=s,this.fetch=Ml(n)}setAuth(t){this.headers.Authorization=`Bearer ${t}`}invoke(t){return Pl(this,arguments,void 0,function*(r,n={}){var s;let a,i;try{const{headers:o,method:l,body:d,signal:c,timeout:u}=n;let p={},{region:m}=n;m||(m=this.region);const h=new URL(`${this.url}/${r}`);m&&m!=="any"&&(p["x-region"]=m,h.searchParams.set("forceFunctionRegion",m));let f;d&&(o&&!Object.prototype.hasOwnProperty.call(o,"Content-Type")||!o)?typeof Blob<"u"&&d instanceof Blob||d instanceof ArrayBuffer?(p["Content-Type"]="application/octet-stream",f=d):typeof d=="string"?(p["Content-Type"]="text/plain",f=d):typeof FormData<"u"&&d instanceof FormData?f=d:(p["Content-Type"]="application/json",f=JSON.stringify(d)):d&&typeof d!="string"&&!(typeof Blob<"u"&&d instanceof Blob)&&!(d instanceof ArrayBuffer)&&!(typeof FormData<"u"&&d instanceof FormData)?f=JSON.stringify(d):f=d;let w=c;u&&(i=new AbortController,a=setTimeout(()=>i.abort(),u),c?(w=i.signal,c.addEventListener("abort",()=>i.abort())):w=i.signal);const y=yield this.fetch(h.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},p),this.headers),o),body:f,signal:w}).catch(k=>{throw new jl(k)}),v=y.headers.get("x-relay-error");if(v&&v==="true")throw new Qa(y);if(!y.ok)throw new Ya(y);let b=((s=y.headers.get("Content-Type"))!==null&&s!==void 0?s:"text/plain").split(";")[0].trim(),_;return b==="application/json"?_=yield y.json():b==="application/octet-stream"||b==="application/pdf"?_=yield y.blob():b==="text/event-stream"?_=y:b==="multipart/form-data"?_=yield y.formData():_=yield y.text(),{data:_,error:null,response:y}}catch(o){return{data:null,error:o,response:o instanceof Ya||o instanceof Qa?o.context:void 0}}finally{a&&clearTimeout(a)}})}}var Hl=class extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}},Ul=class{constructor(e){var t,r,n;this.shouldThrowOnError=!1,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=(t=e.shouldThrowOnError)!==null&&t!==void 0?t:!1,this.signal=e.signal,this.isMaybeSingle=(r=e.isMaybeSingle)!==null&&r!==void 0?r:!1,this.urlLengthLimit=(n=e.urlLengthLimit)!==null&&n!==void 0?n:8e3,e.fetch?this.fetch=e.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}then(e,t){var r=this;this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const n=this.fetch;let s=n(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async a=>{let i=null,o=null,l=null,d=a.status,c=a.statusText;if(a.ok){var u,p;if(r.method!=="HEAD"){var m;const y=await a.text();y===""||(r.headers.get("Accept")==="text/csv"||r.headers.get("Accept")&&(!((m=r.headers.get("Accept"))===null||m===void 0)&&m.includes("application/vnd.pgrst.plan+text"))?o=y:o=JSON.parse(y))}const f=(u=r.headers.get("Prefer"))===null||u===void 0?void 0:u.match(/count=(exact|planned|estimated)/),w=(p=a.headers.get("content-range"))===null||p===void 0?void 0:p.split("/");f&&w&&w.length>1&&(l=parseInt(w[1])),r.isMaybeSingle&&r.method==="GET"&&Array.isArray(o)&&(o.length>1?(i={code:"PGRST116",details:`Results contain ${o.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},o=null,l=null,d=406,c="Not Acceptable"):o.length===1?o=o[0]:o=null)}else{var h;const f=await a.text();try{i=JSON.parse(f),Array.isArray(i)&&a.status===404&&(o=[],i=null,d=200,c="OK")}catch{a.status===404&&f===""?(d=204,c="No Content"):i={message:f}}if(i&&r.isMaybeSingle&&(!(i==null||(h=i.details)===null||h===void 0)&&h.includes("0 rows"))&&(i=null,d=200,c="OK"),i&&r.shouldThrowOnError)throw new Hl(i)}return{error:i,data:o,count:l,status:d,statusText:c}});return this.shouldThrowOnError||(s=s.catch(a=>{var i;let o="",l="",d="";const c=a==null?void 0:a.cause;if(c){var u,p,m,h;const y=(u=c==null?void 0:c.message)!==null&&u!==void 0?u:"",v=(p=c==null?void 0:c.code)!==null&&p!==void 0?p:"";o=`${(m=a==null?void 0:a.name)!==null&&m!==void 0?m:"FetchError"}: ${a==null?void 0:a.message}`,o+=`

Caused by: ${(h=c==null?void 0:c.name)!==null&&h!==void 0?h:"Error"}: ${y}`,v&&(o+=` (${v})`),c!=null&&c.stack&&(o+=`
${c.stack}`)}else{var f;o=(f=a==null?void 0:a.stack)!==null&&f!==void 0?f:""}const w=this.url.toString().length;return(a==null?void 0:a.name)==="AbortError"||(a==null?void 0:a.code)==="ABORT_ERR"?(d="",l="Request was aborted (timeout or manual cancellation)",w>this.urlLengthLimit&&(l+=`. Note: Your request URL is ${w} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((c==null?void 0:c.name)==="HeadersOverflowError"||(c==null?void 0:c.code)==="UND_ERR_HEADERS_OVERFLOW")&&(d="",l="HTTP headers exceeded server limits (typically 16KB)",w>this.urlLengthLimit&&(l+=`. Your request URL is ${w} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{error:{message:`${(i=a==null?void 0:a.name)!==null&&i!==void 0?i:"FetchError"}: ${a==null?void 0:a.message}`,details:o,hint:l,code:d},data:null,count:null,status:0,statusText:""}})),s.then(e,t)}returns(){return this}overrideTypes(){return this}},Fl=class extends Ul{select(e){let t=!1;const r=(e??"*").split("").map(n=>/\s/.test(n)&&!t?"":(n==='"'&&(t=!t),n)).join("");return this.url.searchParams.set("select",r),this.headers.append("Prefer","return=representation"),this}order(e,{ascending:t=!0,nullsFirst:r,foreignTable:n,referencedTable:s=n}={}){const a=s?`${s}.order`:"order",i=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${i?`${i},`:""}${e}.${t?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:r=t}={}){const n=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(n,`${e}`),this}range(e,t,{foreignTable:r,referencedTable:n=r}={}){const s=typeof n>"u"?"offset":`${n}.offset`,a=typeof n>"u"?"limit":`${n}.limit`;return this.url.searchParams.set(s,`${e}`),this.url.searchParams.set(a,`${t-e+1}`),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:e=!1,verbose:t=!1,settings:r=!1,buffers:n=!1,wal:s=!1,format:a="text"}={}){var i;const o=[e?"analyze":null,t?"verbose":null,r?"settings":null,n?"buffers":null,s?"wal":null].filter(Boolean).join("|"),l=(i=this.headers.get("Accept"))!==null&&i!==void 0?i:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${a}; for="${l}"; options=${o};`),a==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(e){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${e}`),this}};const Xa=new RegExp("[,()]");var Zt=class extends Fl{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){const r=Array.from(new Set(t)).map(n=>typeof n=="string"&&Xa.test(n)?`"${n}"`:`${n}`).join(",");return this.url.searchParams.append(e,`in.(${r})`),this}notIn(e,t){const r=Array.from(new Set(t)).map(n=>typeof n=="string"&&Xa.test(n)?`"${n}"`:`${n}`).join(",");return this.url.searchParams.append(e,`not.in.(${r})`),this}contains(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return typeof t=="string"?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return typeof t=="string"?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:r,type:n}={}){let s="";n==="plain"?s="pl":n==="phrase"?s="ph":n==="websearch"&&(s="w");const a=r===void 0?"":`(${r})`;return this.url.searchParams.append(e,`${s}fts${a}.${t}`),this}match(e){return Object.entries(e).forEach(([t,r])=>{this.url.searchParams.append(t,`eq.${r}`)}),this}not(e,t,r){return this.url.searchParams.append(e,`not.${t}.${r}`),this}or(e,{foreignTable:t,referencedTable:r=t}={}){const n=r?`${r}.or`:"or";return this.url.searchParams.append(n,`(${e})`),this}filter(e,t,r){return this.url.searchParams.append(e,`${t}.${r}`),this}},Bl=class{constructor(e,{headers:t={},schema:r,fetch:n,urlLengthLimit:s=8e3}){this.url=e,this.headers=new Headers(t),this.schema=r,this.fetch=n,this.urlLengthLimit=s}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){const{head:r=!1,count:n}=t??{},s=r?"HEAD":"GET";let a=!1;const i=(e??"*").split("").map(d=>/\s/.test(d)&&!a?"":(d==='"'&&(a=!a),d)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",i),n&&l.append("Prefer",`count=${n}`),new Zt({method:s,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}insert(e,{count:t,defaultToNull:r=!0}={}){var n;const s="POST",{url:a,headers:i}=this.cloneRequestState();if(t&&i.append("Prefer",`count=${t}`),r||i.append("Prefer","missing=default"),Array.isArray(e)){const o=e.reduce((l,d)=>l.concat(Object.keys(d)),[]);if(o.length>0){const l=[...new Set(o)].map(d=>`"${d}"`);a.searchParams.set("columns",l.join(","))}}return new Zt({method:s,url:a,headers:i,schema:this.schema,body:e,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit})}upsert(e,{onConflict:t,ignoreDuplicates:r=!1,count:n,defaultToNull:s=!0}={}){var a;const i="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${r?"ignore":"merge"}-duplicates`),t!==void 0&&o.searchParams.set("on_conflict",t),n&&l.append("Prefer",`count=${n}`),s||l.append("Prefer","missing=default"),Array.isArray(e)){const d=e.reduce((c,u)=>c.concat(Object.keys(u)),[]);if(d.length>0){const c=[...new Set(d)].map(u=>`"${u}"`);o.searchParams.set("columns",c.join(","))}}return new Zt({method:i,url:o,headers:l,schema:this.schema,body:e,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit})}update(e,{count:t}={}){var r;const n="PATCH",{url:s,headers:a}=this.cloneRequestState();return t&&a.append("Prefer",`count=${t}`),new Zt({method:n,url:s,headers:a,schema:this.schema,body:e,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit})}delete({count:e}={}){var t;const r="DELETE",{url:n,headers:s}=this.cloneRequestState();return e&&s.append("Prefer",`count=${e}`),new Zt({method:r,url:n,headers:s,schema:this.schema,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit})}};function Vr(e){"@babel/helpers - typeof";return Vr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Vr(e)}function Kl(e,t){if(Vr(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(Vr(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function zl(e){var t=Kl(e,"string");return Vr(t)=="symbol"?t:t+""}function Wl(e,t,r){return(t=zl(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Za(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,n)}return r}function _n(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Za(Object(r),!0).forEach(function(n){Wl(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Za(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}var Vl=class To{constructor(t,{headers:r={},schema:n,fetch:s,timeout:a,urlLengthLimit:i=8e3}={}){this.url=t,this.headers=new Headers(r),this.schemaName=n,this.urlLengthLimit=i;const o=s??globalThis.fetch;a!==void 0&&a>0?this.fetch=(l,d)=>{const c=new AbortController,u=setTimeout(()=>c.abort(),a),p=d==null?void 0:d.signal;if(p){if(p.aborted)return clearTimeout(u),o(l,d);const m=()=>{clearTimeout(u),c.abort()};return p.addEventListener("abort",m,{once:!0}),o(l,_n(_n({},d),{},{signal:c.signal})).finally(()=>{clearTimeout(u),p.removeEventListener("abort",m)})}return o(l,_n(_n({},d),{},{signal:c.signal})).finally(()=>clearTimeout(u))}:this.fetch=o}from(t){if(!t||typeof t!="string"||t.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Bl(new URL(`${this.url}/${t}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}schema(t){return new To(this.url,{headers:this.headers,schema:t,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}rpc(t,r={},{head:n=!1,get:s=!1,count:a}={}){var i;let o;const l=new URL(`${this.url}/rpc/${t}`);let d;const c=m=>m!==null&&typeof m=="object"&&(!Array.isArray(m)||m.some(c)),u=n&&Object.values(r).some(c);u?(o="POST",d=r):n||s?(o=n?"HEAD":"GET",Object.entries(r).filter(([m,h])=>h!==void 0).map(([m,h])=>[m,Array.isArray(h)?`{${h.join(",")}}`:`${h}`]).forEach(([m,h])=>{l.searchParams.append(m,h)})):(o="POST",d=r);const p=new Headers(this.headers);return u?p.set("Prefer",a?`count=${a},return=minimal`:"return=minimal"):a&&p.set("Prefer",`count=${a}`),new Zt({method:o,url:l,headers:p,schema:this.schemaName,body:d,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit})}};class Gl{constructor(){}static detectEnvironment(){var t;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((t=navigator.userAgent)===null||t===void 0)&&t.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const r=globalThis.process;if(r){const n=r.versions;if(n&&n.node){const s=n.node,a=parseInt(s.replace(/^v/,"").split(".")[0]);return a>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${a} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${a} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const t=this.detectEnvironment();if(t.constructor)return t.constructor;let r=t.error||"WebSocket not supported in this environment.";throw t.workaround&&(r+=`

Suggested solution: ${t.workaround}`),new Error(r)}static createWebSocket(t,r){const n=this.getWebSocketConstructor();return new n(t,r)}static isWebSocketSupported(){try{const t=this.detectEnvironment();return t.type==="native"||t.type==="ws"}catch{return!1}}}const Jl="2.95.3",Ql=`realtime-js/${Jl}`,Yl="1.0.0",Eo="2.0.0",ei=Eo,Ps=1e4,Xl=1e3,Zl=100;var lt;(function(e){e[e.connecting=0]="connecting",e[e.open=1]="open",e[e.closing=2]="closing",e[e.closed=3]="closed"})(lt||(lt={}));var be;(function(e){e.closed="closed",e.errored="errored",e.joined="joined",e.joining="joining",e.leaving="leaving"})(be||(be={}));var We;(function(e){e.close="phx_close",e.error="phx_error",e.join="phx_join",e.reply="phx_reply",e.leave="phx_leave",e.access_token="access_token"})(We||(We={}));var Ms;(function(e){e.websocket="websocket"})(Ms||(Ms={}));var $t;(function(e){e.Connecting="connecting",e.Open="open",e.Closing="closing",e.Closed="closed"})($t||($t={}));class ed{constructor(t){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=t??[]}encode(t,r){if(t.event===this.BROADCAST_EVENT&&!(t.payload instanceof ArrayBuffer)&&typeof t.payload.event=="string")return r(this._binaryEncodeUserBroadcastPush(t));let n=[t.join_ref,t.ref,t.topic,t.event,t.payload];return r(JSON.stringify(n))}_binaryEncodeUserBroadcastPush(t){var r;return this._isArrayBuffer((r=t.payload)===null||r===void 0?void 0:r.payload)?this._encodeBinaryUserBroadcastPush(t):this._encodeJsonUserBroadcastPush(t)}_encodeBinaryUserBroadcastPush(t){var r,n;const s=(n=(r=t.payload)===null||r===void 0?void 0:r.payload)!==null&&n!==void 0?n:new ArrayBuffer(0);return this._encodeUserBroadcastPush(t,this.BINARY_ENCODING,s)}_encodeJsonUserBroadcastPush(t){var r,n;const s=(n=(r=t.payload)===null||r===void 0?void 0:r.payload)!==null&&n!==void 0?n:{},i=new TextEncoder().encode(JSON.stringify(s)).buffer;return this._encodeUserBroadcastPush(t,this.JSON_ENCODING,i)}_encodeUserBroadcastPush(t,r,n){var s,a;const i=t.topic,o=(s=t.ref)!==null&&s!==void 0?s:"",l=(a=t.join_ref)!==null&&a!==void 0?a:"",d=t.payload.event,c=this.allowedMetadataKeys?this._pick(t.payload,this.allowedMetadataKeys):{},u=Object.keys(c).length===0?"":JSON.stringify(c);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(i.length>255)throw new Error(`topic length ${i.length} exceeds maximum of 255`);if(d.length>255)throw new Error(`userEvent length ${d.length} exceeds maximum of 255`);if(u.length>255)throw new Error(`metadata length ${u.length} exceeds maximum of 255`);const p=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+o.length+i.length+d.length+u.length,m=new ArrayBuffer(this.HEADER_LENGTH+p);let h=new DataView(m),f=0;h.setUint8(f++,this.KINDS.userBroadcastPush),h.setUint8(f++,l.length),h.setUint8(f++,o.length),h.setUint8(f++,i.length),h.setUint8(f++,d.length),h.setUint8(f++,u.length),h.setUint8(f++,r),Array.from(l,y=>h.setUint8(f++,y.charCodeAt(0))),Array.from(o,y=>h.setUint8(f++,y.charCodeAt(0))),Array.from(i,y=>h.setUint8(f++,y.charCodeAt(0))),Array.from(d,y=>h.setUint8(f++,y.charCodeAt(0))),Array.from(u,y=>h.setUint8(f++,y.charCodeAt(0)));var w=new Uint8Array(m.byteLength+n.byteLength);return w.set(new Uint8Array(m),0),w.set(new Uint8Array(n),m.byteLength),w.buffer}decode(t,r){if(this._isArrayBuffer(t)){let n=this._binaryDecode(t);return r(n)}if(typeof t=="string"){const n=JSON.parse(t),[s,a,i,o,l]=n;return r({join_ref:s,ref:a,topic:i,event:o,payload:l})}return r({})}_binaryDecode(t){const r=new DataView(t),n=r.getUint8(0),s=new TextDecoder;switch(n){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(t,r,s)}}_decodeUserBroadcast(t,r,n){const s=r.getUint8(1),a=r.getUint8(2),i=r.getUint8(3),o=r.getUint8(4);let l=this.HEADER_LENGTH+4;const d=n.decode(t.slice(l,l+s));l=l+s;const c=n.decode(t.slice(l,l+a));l=l+a;const u=n.decode(t.slice(l,l+i));l=l+i;const p=t.slice(l,t.byteLength),m=o===this.JSON_ENCODING?JSON.parse(n.decode(p)):p,h={type:this.BROADCAST_EVENT,event:c,payload:m};return i>0&&(h.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:d,event:this.BROADCAST_EVENT,payload:h}}_isArrayBuffer(t){var r;return t instanceof ArrayBuffer||((r=t==null?void 0:t.constructor)===null||r===void 0?void 0:r.name)==="ArrayBuffer"}_pick(t,r){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).filter(([n])=>r.includes(n)))}}class $o{constructor(t,r){this.callback=t,this.timerCalc=r,this.timer=void 0,this.tries=0,this.callback=t,this.timerCalc=r}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var de;(function(e){e.abstime="abstime",e.bool="bool",e.date="date",e.daterange="daterange",e.float4="float4",e.float8="float8",e.int2="int2",e.int4="int4",e.int4range="int4range",e.int8="int8",e.int8range="int8range",e.json="json",e.jsonb="jsonb",e.money="money",e.numeric="numeric",e.oid="oid",e.reltime="reltime",e.text="text",e.time="time",e.timestamp="timestamp",e.timestamptz="timestamptz",e.timetz="timetz",e.tsrange="tsrange",e.tstzrange="tstzrange"})(de||(de={}));const ti=(e,t,r={})=>{var n;const s=(n=r.skipTypes)!==null&&n!==void 0?n:[];return t?Object.keys(t).reduce((a,i)=>(a[i]=td(i,e,t,s),a),{}):{}},td=(e,t,r,n)=>{const s=t.find(o=>o.name===e),a=s==null?void 0:s.type,i=r[e];return a&&!n.includes(a)?Ao(a,i):js(i)},Ao=(e,t)=>{if(e.charAt(0)==="_"){const r=e.slice(1,e.length);return ad(t,r)}switch(e){case de.bool:return rd(t);case de.float4:case de.float8:case de.int2:case de.int4:case de.int8:case de.numeric:case de.oid:return nd(t);case de.json:case de.jsonb:return sd(t);case de.timestamp:return id(t);case de.abstime:case de.date:case de.daterange:case de.int4range:case de.int8range:case de.money:case de.reltime:case de.text:case de.time:case de.timestamptz:case de.timetz:case de.tsrange:case de.tstzrange:return js(t);default:return js(t)}},js=e=>e,rd=e=>{switch(e){case"t":return!0;case"f":return!1;default:return e}},nd=e=>{if(typeof e=="string"){const t=parseFloat(e);if(!Number.isNaN(t))return t}return e},sd=e=>{if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e},ad=(e,t)=>{if(typeof e!="string")return e;const r=e.length-1,n=e[r];if(e[0]==="{"&&n==="}"){let a;const i=e.slice(1,r);try{a=JSON.parse("["+i+"]")}catch{a=i?i.split(","):[]}return a.map(o=>Ao(t,o))}return e},id=e=>typeof e=="string"?e.replace(" ","T"):e,Co=e=>{const t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,"http"),t.pathname=t.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),t.pathname===""||t.pathname==="/"?t.pathname="/api/broadcast":t.pathname=t.pathname+"/api/broadcast",t.href};class ms{constructor(t,r,n={},s=Ps){this.channel=t,this.event=r,this.payload=n,this.timeout=s,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(t){this.timeout=t,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(t){this.payload=Object.assign(Object.assign({},this.payload),t)}receive(t,r){var n;return this._hasReceived(t)&&r((n=this.receivedResp)===null||n===void 0?void 0:n.response),this.recHooks.push({status:t,callback:r}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const t=r=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=r,this._matchReceive(r)};this.channel._on(this.refEvent,{},t),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(t,r){this.refEvent&&this.channel._trigger(this.refEvent,{status:t,response:r})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:t,response:r}){this.recHooks.filter(n=>n.status===t).forEach(n=>n.callback(r))}_hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}}var ri;(function(e){e.SYNC="sync",e.JOIN="join",e.LEAVE="leave"})(ri||(ri={}));class Fr{constructor(t,r){this.channel=t,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const n=(r==null?void 0:r.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(n.state,{},s=>{const{onJoin:a,onLeave:i,onSync:o}=this.caller;this.joinRef=this.channel._joinRef(),this.state=Fr.syncState(this.state,s,a,i),this.pendingDiffs.forEach(l=>{this.state=Fr.syncDiff(this.state,l,a,i)}),this.pendingDiffs=[],o()}),this.channel._on(n.diff,{},s=>{const{onJoin:a,onLeave:i,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(s):(this.state=Fr.syncDiff(this.state,s,a,i),o())}),this.onJoin((s,a,i)=>{this.channel._trigger("presence",{event:"join",key:s,currentPresences:a,newPresences:i})}),this.onLeave((s,a,i)=>{this.channel._trigger("presence",{event:"leave",key:s,currentPresences:a,leftPresences:i})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(t,r,n,s){const a=this.cloneDeep(t),i=this.transformState(r),o={},l={};return this.map(a,(d,c)=>{i[d]||(l[d]=c)}),this.map(i,(d,c)=>{const u=a[d];if(u){const p=c.map(w=>w.presence_ref),m=u.map(w=>w.presence_ref),h=c.filter(w=>m.indexOf(w.presence_ref)<0),f=u.filter(w=>p.indexOf(w.presence_ref)<0);h.length>0&&(o[d]=h),f.length>0&&(l[d]=f)}else o[d]=c}),this.syncDiff(a,{joins:o,leaves:l},n,s)}static syncDiff(t,r,n,s){const{joins:a,leaves:i}={joins:this.transformState(r.joins),leaves:this.transformState(r.leaves)};return n||(n=()=>{}),s||(s=()=>{}),this.map(a,(o,l)=>{var d;const c=(d=t[o])!==null&&d!==void 0?d:[];if(t[o]=this.cloneDeep(l),c.length>0){const u=t[o].map(m=>m.presence_ref),p=c.filter(m=>u.indexOf(m.presence_ref)<0);t[o].unshift(...p)}n(o,c,l)}),this.map(i,(o,l)=>{let d=t[o];if(!d)return;const c=l.map(u=>u.presence_ref);d=d.filter(u=>c.indexOf(u.presence_ref)<0),t[o]=d,s(o,d,l),d.length===0&&delete t[o]}),t}static map(t,r){return Object.getOwnPropertyNames(t).map(n=>r(n,t[n]))}static transformState(t){return t=this.cloneDeep(t),Object.getOwnPropertyNames(t).reduce((r,n)=>{const s=t[n];return"metas"in s?r[n]=s.metas.map(a=>(a.presence_ref=a.phx_ref,delete a.phx_ref,delete a.phx_ref_prev,a)):r[n]=s,r},{})}static cloneDeep(t){return JSON.parse(JSON.stringify(t))}onJoin(t){this.caller.onJoin=t}onLeave(t){this.caller.onLeave=t}onSync(t){this.caller.onSync=t}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var ni;(function(e){e.ALL="*",e.INSERT="INSERT",e.UPDATE="UPDATE",e.DELETE="DELETE"})(ni||(ni={}));var Br;(function(e){e.BROADCAST="broadcast",e.PRESENCE="presence",e.POSTGRES_CHANGES="postgres_changes",e.SYSTEM="system"})(Br||(Br={}));var Ze;(function(e){e.SUBSCRIBED="SUBSCRIBED",e.TIMED_OUT="TIMED_OUT",e.CLOSED="CLOSED",e.CHANNEL_ERROR="CHANNEL_ERROR"})(Ze||(Ze={}));class sr{constructor(t,r={config:{}},n){var s,a;if(this.topic=t,this.params=r,this.socket=n,this.bindings={},this.state=be.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=t.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config),this.timeout=this.socket.timeout,this.joinPush=new ms(this,We.join,this.params,this.timeout),this.rejoinTimer=new $o(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=be.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(i=>i.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=be.closed,this.socket._remove(this)}),this._onError(i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=be.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=be.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",i=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,i),this.state=be.errored,this.rejoinTimer.scheduleTimeout())}),this._on(We.reply,{},(i,o)=>{this._trigger(this._replyEventName(o),i)}),this.presence=new Fr(this),this.broadcastEndpointURL=Co(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((a=(s=this.params.config)===null||s===void 0?void 0:s.broadcast)===null||a===void 0)&&a.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(t,r=this.timeout){var n,s,a;if(this.socket.isConnected()||this.socket.connect(),this.state==be.closed){const{config:{broadcast:i,presence:o,private:l}}=this.params,d=(s=(n=this.bindings.postgres_changes)===null||n===void 0?void 0:n.map(m=>m.filter))!==null&&s!==void 0?s:[],c=!!this.bindings[Br.PRESENCE]&&this.bindings[Br.PRESENCE].length>0||((a=this.params.config.presence)===null||a===void 0?void 0:a.enabled)===!0,u={},p={broadcast:i,presence:Object.assign(Object.assign({},o),{enabled:c}),postgres_changes:d,private:l};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(m=>t==null?void 0:t(Ze.CHANNEL_ERROR,m)),this._onClose(()=>t==null?void 0:t(Ze.CLOSED)),this.updateJoinPayload(Object.assign({config:p},u)),this.joinedOnce=!0,this._rejoin(r),this.joinPush.receive("ok",async({postgres_changes:m})=>{var h;if(this.socket._isManualToken()||this.socket.setAuth(),m===void 0){t==null||t(Ze.SUBSCRIBED);return}else{const f=this.bindings.postgres_changes,w=(h=f==null?void 0:f.length)!==null&&h!==void 0?h:0,y=[];for(let v=0;v<w;v++){const b=f[v],{filter:{event:_,schema:k,table:x,filter:L}}=b,q=m&&m[v];if(q&&q.event===_&&sr.isFilterValueEqual(q.schema,k)&&sr.isFilterValueEqual(q.table,x)&&sr.isFilterValueEqual(q.filter,L))y.push(Object.assign(Object.assign({},b),{id:q.id}));else{this.unsubscribe(),this.state=be.errored,t==null||t(Ze.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=y,t&&t(Ze.SUBSCRIBED);return}}).receive("error",m=>{this.state=be.errored,t==null||t(Ze.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(m).join(", ")||"error")))}).receive("timeout",()=>{t==null||t(Ze.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(t,r={}){return await this.send({type:"presence",event:"track",payload:t},r.timeout||this.timeout)}async untrack(t={}){return await this.send({type:"presence",event:"untrack"},t)}on(t,r,n){return this.state===be.joined&&t===Br.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(async()=>await this.subscribe())),this._on(t,r,n)}async httpSend(t,r,n={}){var s;if(r==null)return Promise.reject("Payload is required for httpSend()");const a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const i={method:"POST",headers:a,body:JSON.stringify({messages:[{topic:this.subTopic,event:t,payload:r,private:this.private}]})},o=await this._fetchWithTimeout(this.broadcastEndpointURL,i,(s=n.timeout)!==null&&s!==void 0?s:this.timeout);if(o.status===202)return{success:!0};let l=o.statusText;try{const d=await o.json();l=d.error||d.message||l}catch{}return Promise.reject(new Error(l))}async send(t,r={}){var n,s;if(!this._canPush()&&t.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:a,payload:i}=t,o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:a,payload:i,private:this.private}]})};try{const d=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(n=r.timeout)!==null&&n!==void 0?n:this.timeout);return await((s=d.body)===null||s===void 0?void 0:s.cancel()),d.ok?"ok":"error"}catch(d){return d.name==="AbortError"?"timed out":"error"}}else return new Promise(a=>{var i,o,l;const d=this._push(t.type,t,r.timeout||this.timeout);t.type==="broadcast"&&!(!((l=(o=(i=this.params)===null||i===void 0?void 0:i.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&a("ok"),d.receive("ok",()=>a("ok")),d.receive("error",()=>a("error")),d.receive("timeout",()=>a("timed out"))})}updateJoinPayload(t){this.joinPush.updatePayload(t)}unsubscribe(t=this.timeout){this.state=be.leaving;const r=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(We.close,"leave",this._joinRef())};this.joinPush.destroy();let n=null;return new Promise(s=>{n=new ms(this,We.leave,{},t),n.receive("ok",()=>{r(),s("ok")}).receive("timeout",()=>{r(),s("timed out")}).receive("error",()=>{s("error")}),n.send(),this._canPush()||n.trigger("ok",{})}).finally(()=>{n==null||n.destroy()})}teardown(){this.pushBuffer.forEach(t=>t.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=be.closed,this.bindings={}}async _fetchWithTimeout(t,r,n){const s=new AbortController,a=setTimeout(()=>s.abort(),n),i=await this.socket.fetch(t,Object.assign(Object.assign({},r),{signal:s.signal}));return clearTimeout(a),i}_push(t,r,n=this.timeout){if(!this.joinedOnce)throw`tried to push '${t}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let s=new ms(this,t,r,n);return this._canPush()?s.send():this._addToPushBuffer(s),s}_addToPushBuffer(t){if(t.startTimeout(),this.pushBuffer.push(t),this.pushBuffer.length>Zl){const r=this.pushBuffer.shift();r&&(r.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${r.event}`,r.payload))}}_onMessage(t,r,n){return r}_isMember(t){return this.topic===t}_joinRef(){return this.joinPush.ref}_trigger(t,r,n){var s,a;const i=t.toLocaleLowerCase(),{close:o,error:l,leave:d,join:c}=We;if(n&&[o,l,d,c].indexOf(i)>=0&&n!==this._joinRef())return;let p=this._onMessage(i,r,n);if(r&&!p)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(i)?(s=this.bindings.postgres_changes)===null||s===void 0||s.filter(m=>{var h,f,w;return((h=m.filter)===null||h===void 0?void 0:h.event)==="*"||((w=(f=m.filter)===null||f===void 0?void 0:f.event)===null||w===void 0?void 0:w.toLocaleLowerCase())===i}).map(m=>m.callback(p,n)):(a=this.bindings[i])===null||a===void 0||a.filter(m=>{var h,f,w,y,v,b;if(["broadcast","presence","postgres_changes"].includes(i))if("id"in m){const _=m.id,k=(h=m.filter)===null||h===void 0?void 0:h.event;return _&&((f=r.ids)===null||f===void 0?void 0:f.includes(_))&&(k==="*"||(k==null?void 0:k.toLocaleLowerCase())===((w=r.data)===null||w===void 0?void 0:w.type.toLocaleLowerCase()))}else{const _=(v=(y=m==null?void 0:m.filter)===null||y===void 0?void 0:y.event)===null||v===void 0?void 0:v.toLocaleLowerCase();return _==="*"||_===((b=r==null?void 0:r.event)===null||b===void 0?void 0:b.toLocaleLowerCase())}else return m.type.toLocaleLowerCase()===i}).map(m=>{if(typeof p=="object"&&"ids"in p){const h=p.data,{schema:f,table:w,commit_timestamp:y,type:v,errors:b}=h;p=Object.assign(Object.assign({},{schema:f,table:w,commit_timestamp:y,eventType:v,new:{},old:{},errors:b}),this._getPayloadRecords(h))}m.callback(p,n)})}_isClosed(){return this.state===be.closed}_isJoined(){return this.state===be.joined}_isJoining(){return this.state===be.joining}_isLeaving(){return this.state===be.leaving}_replyEventName(t){return`chan_reply_${t}`}_on(t,r,n){const s=t.toLocaleLowerCase(),a={type:s,filter:r,callback:n};return this.bindings[s]?this.bindings[s].push(a):this.bindings[s]=[a],this}_off(t,r){const n=t.toLocaleLowerCase();return this.bindings[n]&&(this.bindings[n]=this.bindings[n].filter(s=>{var a;return!(((a=s.type)===null||a===void 0?void 0:a.toLocaleLowerCase())===n&&sr.isEqual(s.filter,r))})),this}static isEqual(t,r){if(Object.keys(t).length!==Object.keys(r).length)return!1;for(const n in t)if(t[n]!==r[n])return!1;return!0}static isFilterValueEqual(t,r){return(t??void 0)===(r??void 0)}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(t){this._on(We.close,{},t)}_onError(t){this._on(We.error,{},r=>t(r))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(t=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=be.joining,this.joinPush.resend(t))}_getPayloadRecords(t){const r={new:{},old:{}};return(t.type==="INSERT"||t.type==="UPDATE")&&(r.new=ti(t.columns,t.record)),(t.type==="UPDATE"||t.type==="DELETE")&&(r.old=ti(t.columns,t.old_record)),r}}const fs=()=>{},wn={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},od=[1e3,2e3,5e3,1e4],ld=1e4,dd=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class cd{constructor(t,r){var n;if(this.accessTokenValue=null,this.apiKey=null,this._manuallySetToken=!1,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=Ps,this.transport=null,this.heartbeatIntervalMs=wn.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=fs,this.ref=0,this.reconnectTimer=null,this.vsn=ei,this.logger=fs,this.conn=null,this.sendBuffer=[],this.serializer=new ed,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._heartbeatSentAt=null,this._resolveFetch=s=>s?(...a)=>s(...a):(...a)=>fetch(...a),!(!((n=r==null?void 0:r.params)===null||n===void 0)&&n.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=r.params.apikey,this.endPoint=`${t}/${Ms.websocket}`,this.httpEndpoint=Co(t),this._initializeOptions(r),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(r==null?void 0:r.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=Gl.createWebSocket(this.endpointURL())}catch(t){this._setConnectionState("disconnected");const r=t.message;throw r.includes("Node.js")?new Error(`${r}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${r}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:this.vsn}))}disconnect(t,r){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const n=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(n),this._setConnectionState("disconnected")},typeof this.conn.close=="function"&&(t?this.conn.close(t,r??""):this.conn.close()),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(t){const r=await t.unsubscribe();return r==="ok"&&this._remove(t),this.channels.length===0&&this.disconnect(),r}async removeAllChannels(){const t=await Promise.all(this.channels.map(r=>r.unsubscribe()));return this.channels=[],this.disconnect(),t}log(t,r,n){this.logger(t,r,n)}connectionState(){switch(this.conn&&this.conn.readyState){case lt.connecting:return $t.Connecting;case lt.open:return $t.Open;case lt.closing:return $t.Closing;default:return $t.Closed}}isConnected(){return this.connectionState()===$t.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(t,r={config:{}}){const n=`realtime:${t}`,s=this.getChannels().find(a=>a.topic===n);if(s)return s;{const a=new sr(`realtime:${t}`,r,this);return this.channels.push(a),a}}push(t){const{topic:r,event:n,payload:s,ref:a}=t,i=()=>{this.encode(t,o=>{var l;(l=this.conn)===null||l===void 0||l.send(o)})};this.log("push",`${r} ${n} (${a})`,s),this.isConnected()?i():this.sendBuffer.push(i)}async setAuth(t=null){this._authPromise=this._performAuth(t);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){var t;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(r){this.log("error","error in heartbeat callback",r)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this._heartbeatSentAt=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(r){this.log("error","error in heartbeat callback",r)}this._wasManualDisconnect=!1,(t=this.conn)===null||t===void 0||t.close(Xl,"heartbeat timeout"),setTimeout(()=>{var r;this.isConnected()||(r=this.reconnectTimer)===null||r===void 0||r.scheduleTimeout()},wn.HEARTBEAT_TIMEOUT_FALLBACK);return}this._heartbeatSentAt=Date.now(),this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(r){this.log("error","error in heartbeat callback",r)}this._setAuthSafely("heartbeat")}onHeartbeat(t){this.heartbeatCallback=t}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}_makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}_leaveOpenTopic(t){let r=this.channels.find(n=>n.topic===t&&(n._isJoined()||n._isJoining()));r&&(this.log("transport",`leaving duplicate topic "${t}"`),r.unsubscribe())}_remove(t){this.channels=this.channels.filter(r=>r.topic!==t.topic)}_onConnMessage(t){this.decode(t.data,r=>{if(r.topic==="phoenix"&&r.event==="phx_reply"&&r.ref&&r.ref===this.pendingHeartbeatRef){const d=this._heartbeatSentAt?Date.now()-this._heartbeatSentAt:void 0;try{this.heartbeatCallback(r.payload.status==="ok"?"ok":"error",d)}catch(c){this.log("error","error in heartbeat callback",c)}this._heartbeatSentAt=null,this.pendingHeartbeatRef=null}const{topic:n,event:s,payload:a,ref:i}=r,o=i?`(${i})`:"",l=a.status||"";this.log("receive",`${l} ${n} ${s} ${o}`.trim(),a),this.channels.filter(d=>d._isMember(n)).forEach(d=>d._trigger(s,a,i)),this._triggerStateCallbacks("message",r)})}_clearTimer(t){var r;t==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):t==="reconnect"&&((r=this.reconnectTimer)===null||r===void 0||r.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=t=>this._onConnError(t),this.conn.onmessage=t=>this._onConnMessage(t),this.conn.onclose=t=>this._onConnClose(t),this.conn.readyState===lt.open&&this._onConnOpen())}_teardownConnection(){if(this.conn){if(this.conn.readyState===lt.open||this.conn.readyState===lt.connecting)try{this.conn.close()}catch(t){this.log("error","Error closing connection",t)}this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null}this._clearAllTimers(),this._terminateWorker(),this.channels.forEach(t=>t.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).then(()=>{this.flushSendBuffer()}).catch(r=>{this.log("error","error waiting for auth on connect",r),this.flushSendBuffer()}),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const t=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(t),this.workerRef.onerror=r=>{this.log("worker","worker error",r.message),this._terminateWorker()},this.workerRef.onmessage=r=>{r.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_onConnClose(t){var r;this._setConnectionState("disconnected"),this.log("transport","close",t),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(r=this.reconnectTimer)===null||r===void 0||r.scheduleTimeout(),this._triggerStateCallbacks("close",t)}_onConnError(t){this._setConnectionState("disconnected"),this.log("transport",`${t}`),this._triggerChanError(),this._triggerStateCallbacks("error",t);try{this.heartbeatCallback("error")}catch(r){this.log("error","error in heartbeat callback",r)}}_triggerChanError(){this.channels.forEach(t=>t._trigger(We.error))}_appendParams(t,r){if(Object.keys(r).length===0)return t;const n=t.match(/\?/)?"&":"?",s=new URLSearchParams(r);return`${t}${n}${s}`}_workerObjectUrl(t){let r;if(t)r=t;else{const n=new Blob([dd],{type:"application/javascript"});r=URL.createObjectURL(n)}return r}_setConnectionState(t,r=!1){this._connectionState=t,t==="connecting"?this._wasManualDisconnect=!1:t==="disconnecting"&&(this._wasManualDisconnect=r)}async _performAuth(t=null){let r,n=!1;if(t)r=t,n=!0;else if(this.accessToken)try{r=await this.accessToken()}catch(s){this.log("error","Error fetching access token from callback",s),r=this.accessTokenValue}else r=this.accessTokenValue;n?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=r&&(this.accessTokenValue=r,this.channels.forEach(s=>{const a={access_token:r,version:Ql};r&&s.updateJoinPayload(a),s.joinedOnce&&s._isJoined()&&s._push(We.access_token,{access_token:r})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(t="general"){this._isManualToken()||this.setAuth().catch(r=>{this.log("error",`Error setting auth in ${t}`,r)})}_triggerStateCallbacks(t,r){try{this.stateChangeCallbacks[t].forEach(n=>{try{n(r)}catch(s){this.log("error",`error in ${t} callback`,s)}})}catch(n){this.log("error",`error triggering ${t} callbacks`,n)}}_setupReconnectionTimer(){this.reconnectTimer=new $o(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},wn.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(t){var r,n,s,a,i,o,l,d,c,u,p,m;switch(this.transport=(r=t==null?void 0:t.transport)!==null&&r!==void 0?r:null,this.timeout=(n=t==null?void 0:t.timeout)!==null&&n!==void 0?n:Ps,this.heartbeatIntervalMs=(s=t==null?void 0:t.heartbeatIntervalMs)!==null&&s!==void 0?s:wn.HEARTBEAT_INTERVAL,this.worker=(a=t==null?void 0:t.worker)!==null&&a!==void 0?a:!1,this.accessToken=(i=t==null?void 0:t.accessToken)!==null&&i!==void 0?i:null,this.heartbeatCallback=(o=t==null?void 0:t.heartbeatCallback)!==null&&o!==void 0?o:fs,this.vsn=(l=t==null?void 0:t.vsn)!==null&&l!==void 0?l:ei,t!=null&&t.params&&(this.params=t.params),t!=null&&t.logger&&(this.logger=t.logger),(t!=null&&t.logLevel||t!=null&&t.log_level)&&(this.logLevel=t.logLevel||t.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(d=t==null?void 0:t.reconnectAfterMs)!==null&&d!==void 0?d:h=>od[h-1]||ld,this.vsn){case Yl:this.encode=(c=t==null?void 0:t.encode)!==null&&c!==void 0?c:(h,f)=>f(JSON.stringify(h)),this.decode=(u=t==null?void 0:t.decode)!==null&&u!==void 0?u:(h,f)=>f(JSON.parse(h));break;case Eo:this.encode=(p=t==null?void 0:t.encode)!==null&&p!==void 0?p:this.serializer.encode.bind(this.serializer),this.decode=(m=t==null?void 0:t.decode)!==null&&m!==void 0?m:this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${this.vsn}`)}if(this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=t==null?void 0:t.workerUrl}}}var Gr=class extends Error{constructor(e,t){var r;super(e),this.name="IcebergError",this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown=t.icebergType==="CommitStateUnknownException"||[500,502,504].includes(t.status)&&((r=t.icebergType)==null?void 0:r.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function ud(e,t,r){const n=new URL(t,e);if(r)for(const[s,a]of Object.entries(r))a!==void 0&&n.searchParams.set(s,a);return n.toString()}async function pd(e){return!e||e.type==="none"?{}:e.type==="bearer"?{Authorization:`Bearer ${e.token}`}:e.type==="header"?{[e.name]:e.value}:e.type==="custom"?await e.getHeaders():{}}function hd(e){const t=e.fetchImpl??globalThis.fetch;return{async request({method:r,path:n,query:s,body:a,headers:i}){const o=ud(e.baseUrl,n,s),l=await pd(e.auth),d=await t(o,{method:r,headers:{...a?{"Content-Type":"application/json"}:{},...l,...i},body:a?JSON.stringify(a):void 0}),c=await d.text(),u=(d.headers.get("content-type")||"").includes("application/json"),p=u&&c?JSON.parse(c):c;if(!d.ok){const m=u?p:void 0,h=m==null?void 0:m.error;throw new Gr((h==null?void 0:h.message)??`Request failed with status ${d.status}`,{status:d.status,icebergType:h==null?void 0:h.type,icebergCode:h==null?void 0:h.code,details:m})}return{status:d.status,headers:d.headers,data:p}}}}function Sn(e){return e.join("")}var md=class{constructor(e,t=""){this.client=e,this.prefix=t}async listNamespaces(e){const t=e?{parent:Sn(e.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map(n=>({namespace:n}))}async createNamespace(e,t){const r={namespace:e.namespace,properties:t==null?void 0:t.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:r})).data}async dropNamespace(e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Sn(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Sn(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Sn(e.namespace)}`}),!0}catch(t){if(t instanceof Gr&&t.status===404)return!1;throw t}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(r){if(r instanceof Gr&&r.status===409)return;throw r}}};function Kt(e){return e.join("")}var fd=class{constructor(e,t="",r){this.client=e,this.prefix=t,this.accessDelegation=r}async listTables(e){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Kt(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){const r={};return this.accessDelegation&&(r["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Kt(e.namespace)}/tables`,body:t,headers:r})).data.metadata}async updateTable(e,t){const r=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Kt(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":r.data["metadata-location"],metadata:r.data.metadata}}async dropTable(e,t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Kt(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String((t==null?void 0:t.purge)??!1)}})}async loadTable(e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Kt(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){const t={};this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Kt(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(r){if(r instanceof Gr&&r.status===404)return!1;throw r}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(r){if(r instanceof Gr&&r.status===409)return await this.loadTable({namespace:e.namespace,name:t.name});throw r}}},yd=class{constructor(e){var n;let t="v1";e.catalogName&&(t+=`/${e.catalogName}`);const r=e.baseUrl.endsWith("/")?e.baseUrl:`${e.baseUrl}/`;this.client=hd({baseUrl:r,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=(n=e.accessDelegation)==null?void 0:n.join(","),this.namespaceOps=new md(this.client,t),this.tableOps=new fd(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}},ns=class extends Error{constructor(e,t="storage",r,n){super(e),this.__isStorageError=!0,this.namespace=t,this.name=t==="vectors"?"StorageVectorsError":"StorageError",this.status=r,this.statusCode=n}};function ss(e){return typeof e=="object"&&e!==null&&"__isStorageError"in e}var kn=class extends ns{constructor(e,t,r,n="storage"){super(e,n,t,r),this.name=n==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=t,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}},Ro=class extends ns{constructor(e,t,r="storage"){super(e,r),this.name=r==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=t}};const bd=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),vd=e=>{if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},Ns=e=>{if(Array.isArray(e))return e.map(r=>Ns(r));if(typeof e=="function"||e!==Object(e))return e;const t={};return Object.entries(e).forEach(([r,n])=>{const s=r.replace(/([-_][a-z])/gi,a=>a.toUpperCase().replace(/[-_]/g,""));t[s]=Ns(n)}),t},gd=e=>!e||typeof e!="string"||e.length===0||e.length>100||e.trim()!==e||e.includes("/")||e.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(e);function Jr(e){"@babel/helpers - typeof";return Jr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Jr(e)}function _d(e,t){if(Jr(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(Jr(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function wd(e){var t=_d(e,"string");return Jr(t)=="symbol"?t:t+""}function Sd(e,t,r){return(t=wd(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function si(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,n)}return r}function Z(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?si(Object(r),!0).forEach(function(n){Sd(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):si(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}const ai=e=>{var t;return e.msg||e.message||e.error_description||(typeof e.error=="string"?e.error:(t=e.error)===null||t===void 0?void 0:t.message)||JSON.stringify(e)},kd=async(e,t,r,n)=>{if(e&&typeof e=="object"&&"status"in e&&"ok"in e&&typeof e.status=="number"&&!(r!=null&&r.noResolveJson)){const s=e,a=s.status||500;if(typeof s.json=="function")s.json().then(i=>{const o=(i==null?void 0:i.statusCode)||(i==null?void 0:i.code)||a+"";t(new kn(ai(i),a,o,n))}).catch(()=>{if(n==="vectors"){const i=a+"";t(new kn(s.statusText||`HTTP ${a} error`,a,i,n))}else{const i=a+"";t(new kn(s.statusText||`HTTP ${a} error`,a,i,n))}});else{const i=a+"";t(new kn(s.statusText||`HTTP ${a} error`,a,i,n))}}else t(new Ro(ai(e),e,n))},xd=(e,t,r,n)=>{const s={method:e,headers:(t==null?void 0:t.headers)||{}};return e==="GET"||e==="HEAD"||!n?Z(Z({},s),r):(vd(n)?(s.headers=Z({"Content-Type":"application/json"},t==null?void 0:t.headers),s.body=JSON.stringify(n)):s.body=n,t!=null&&t.duplex&&(s.duplex=t.duplex),Z(Z({},s),r))};async function xr(e,t,r,n,s,a,i){return new Promise((o,l)=>{e(r,xd(t,n,s,a)).then(d=>{if(!d.ok)throw d;if(n!=null&&n.noResolveJson)return d;if(i==="vectors"){const c=d.headers.get("content-type");if(d.headers.get("content-length")==="0"||d.status===204)return{};if(!c||!c.includes("application/json"))return{}}return d.json()}).then(d=>o(d)).catch(d=>kd(d,l,n,i))})}function Io(e="storage"){return{get:async(t,r,n,s)=>xr(t,"GET",r,n,s,void 0,e),post:async(t,r,n,s,a)=>xr(t,"POST",r,s,a,n,e),put:async(t,r,n,s,a)=>xr(t,"PUT",r,s,a,n,e),head:async(t,r,n,s)=>xr(t,"HEAD",r,Z(Z({},n),{},{noResolveJson:!0}),s,void 0,e),remove:async(t,r,n,s,a)=>xr(t,"DELETE",r,s,a,n,e)}}const qd=Io("storage"),{get:Qr,post:ze,put:Hs,head:Ld,remove:_a}=qd,Me=Io("vectors");var Sr=class{constructor(e,t={},r,n="storage"){this.shouldThrowOnError=!1,this.url=e,this.headers=t,this.fetch=bd(r),this.namespace=n}throwOnError(){return this.shouldThrowOnError=!0,this}async handleOperation(e){var t=this;try{return{data:await e(),error:null}}catch(r){if(t.shouldThrowOnError)throw r;if(ss(r))return{data:null,error:r};throw r}}},Td=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}async execute(){var e=this;try{return{data:(await e.downloadFn()).body,error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(ss(t))return{data:null,error:t};throw t}}};let Do;Do=Symbol.toStringTag;var Ed=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[Do]="BlobDownloadBuilder",this.promise=null}asStream(){return new Td(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var e=this;try{return{data:await(await e.downloadFn()).blob(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(ss(t))return{data:null,error:t};throw t}}};const $d={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},ii={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var Ad=class extends Sr{constructor(e,t={},r,n){super(e,t,n,"storage"),this.bucketId=r}async uploadOrUpdate(e,t,r,n){var s=this;return s.handleOperation(async()=>{let a;const i=Z(Z({},ii),n);let o=Z(Z({},s.headers),e==="POST"&&{"x-upsert":String(i.upsert)});const l=i.metadata;typeof Blob<"u"&&r instanceof Blob?(a=new FormData,a.append("cacheControl",i.cacheControl),l&&a.append("metadata",s.encodeMetadata(l)),a.append("",r)):typeof FormData<"u"&&r instanceof FormData?(a=r,a.has("cacheControl")||a.append("cacheControl",i.cacheControl),l&&!a.has("metadata")&&a.append("metadata",s.encodeMetadata(l))):(a=r,o["cache-control"]=`max-age=${i.cacheControl}`,o["content-type"]=i.contentType,l&&(o["x-metadata"]=s.toBase64(s.encodeMetadata(l))),(typeof ReadableStream<"u"&&a instanceof ReadableStream||a&&typeof a=="object"&&"pipe"in a&&typeof a.pipe=="function")&&!i.duplex&&(i.duplex="half")),n!=null&&n.headers&&(o=Z(Z({},o),n.headers));const d=s._removeEmptyFolders(t),c=s._getFinalPath(d),u=await(e=="PUT"?Hs:ze)(s.fetch,`${s.url}/object/${c}`,a,Z({headers:o},i!=null&&i.duplex?{duplex:i.duplex}:{}));return{path:d,id:u.Id,fullPath:u.Key}})}async upload(e,t,r){return this.uploadOrUpdate("POST",e,t,r)}async uploadToSignedUrl(e,t,r,n){var s=this;const a=s._removeEmptyFolders(e),i=s._getFinalPath(a),o=new URL(s.url+`/object/upload/sign/${i}`);return o.searchParams.set("token",t),s.handleOperation(async()=>{let l;const d=Z({upsert:ii.upsert},n),c=Z(Z({},s.headers),{"x-upsert":String(d.upsert)});return typeof Blob<"u"&&r instanceof Blob?(l=new FormData,l.append("cacheControl",d.cacheControl),l.append("",r)):typeof FormData<"u"&&r instanceof FormData?(l=r,l.append("cacheControl",d.cacheControl)):(l=r,c["cache-control"]=`max-age=${d.cacheControl}`,c["content-type"]=d.contentType),{path:a,fullPath:(await Hs(s.fetch,o.toString(),l,{headers:c})).Key}})}async createSignedUploadUrl(e,t){var r=this;return r.handleOperation(async()=>{let n=r._getFinalPath(e);const s=Z({},r.headers);t!=null&&t.upsert&&(s["x-upsert"]="true");const a=await ze(r.fetch,`${r.url}/object/upload/sign/${n}`,{},{headers:s}),i=new URL(r.url+a.url),o=i.searchParams.get("token");if(!o)throw new ns("No token returned by API");return{signedUrl:i.toString(),path:e,token:o}})}async update(e,t,r){return this.uploadOrUpdate("PUT",e,t,r)}async move(e,t,r){var n=this;return n.handleOperation(async()=>await ze(n.fetch,`${n.url}/object/move`,{bucketId:n.bucketId,sourceKey:e,destinationKey:t,destinationBucket:r==null?void 0:r.destinationBucket},{headers:n.headers}))}async copy(e,t,r){var n=this;return n.handleOperation(async()=>({path:(await ze(n.fetch,`${n.url}/object/copy`,{bucketId:n.bucketId,sourceKey:e,destinationKey:t,destinationBucket:r==null?void 0:r.destinationBucket},{headers:n.headers})).Key}))}async createSignedUrl(e,t,r){var n=this;return n.handleOperation(async()=>{let s=n._getFinalPath(e),a=await ze(n.fetch,`${n.url}/object/sign/${s}`,Z({expiresIn:t},r!=null&&r.transform?{transform:r.transform}:{}),{headers:n.headers});const i=r!=null&&r.download?`&download=${r.download===!0?"":r.download}`:"";return{signedUrl:encodeURI(`${n.url}${a.signedURL}${i}`)}})}async createSignedUrls(e,t,r){var n=this;return n.handleOperation(async()=>{const s=await ze(n.fetch,`${n.url}/object/sign/${n.bucketId}`,{expiresIn:t,paths:e},{headers:n.headers}),a=r!=null&&r.download?`&download=${r.download===!0?"":r.download}`:"";return s.map(i=>Z(Z({},i),{},{signedUrl:i.signedURL?encodeURI(`${n.url}${i.signedURL}${a}`):null}))})}download(e,t,r){const n=typeof(t==null?void 0:t.transform)<"u"?"render/image/authenticated":"object",s=this.transformOptsToQueryString((t==null?void 0:t.transform)||{}),a=s?`?${s}`:"",i=this._getFinalPath(e),o=()=>Qr(this.fetch,`${this.url}/${n}/${i}${a}`,{headers:this.headers,noResolveJson:!0},r);return new Ed(o,this.shouldThrowOnError)}async info(e){var t=this;const r=t._getFinalPath(e);return t.handleOperation(async()=>Ns(await Qr(t.fetch,`${t.url}/object/info/${r}`,{headers:t.headers})))}async exists(e){var t=this;const r=t._getFinalPath(e);try{return await Ld(t.fetch,`${t.url}/object/${r}`,{headers:t.headers}),{data:!0,error:null}}catch(n){if(t.shouldThrowOnError)throw n;if(ss(n)&&n instanceof Ro){const s=n.originalError;if([400,404].includes(s==null?void 0:s.status))return{data:!1,error:n}}throw n}}getPublicUrl(e,t){const r=this._getFinalPath(e),n=[],s=t!=null&&t.download?`download=${t.download===!0?"":t.download}`:"";s!==""&&n.push(s);const a=typeof(t==null?void 0:t.transform)<"u"?"render/image":"object",i=this.transformOptsToQueryString((t==null?void 0:t.transform)||{});i!==""&&n.push(i);let o=n.join("&");return o!==""&&(o=`?${o}`),{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${r}${o}`)}}}async remove(e){var t=this;return t.handleOperation(async()=>await _a(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers}))}async list(e,t,r){var n=this;return n.handleOperation(async()=>{const s=Z(Z(Z({},$d),t),{},{prefix:e||""});return await ze(n.fetch,`${n.url}/object/list/${n.bucketId}`,s,{headers:n.headers},r)})}async listV2(e,t){var r=this;return r.handleOperation(async()=>{const n=Z({},e);return await ze(r.fetch,`${r.url}/object/list-v2/${r.bucketId}`,n,{headers:r.headers},t)})}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(e){const t=[];return e.width&&t.push(`width=${e.width}`),e.height&&t.push(`height=${e.height}`),e.resize&&t.push(`resize=${e.resize}`),e.format&&t.push(`format=${e.format}`),e.quality&&t.push(`quality=${e.quality}`),t.join("&")}};const Cd="2.95.3",hn={"X-Client-Info":`storage-js/${Cd}`};var Rd=class extends Sr{constructor(e,t={},r,n){const s=new URL(e);n!=null&&n.useNewHostname&&/supabase\.(co|in|red)$/.test(s.hostname)&&!s.hostname.includes("storage.supabase.")&&(s.hostname=s.hostname.replace("supabase.","storage.supabase."));const a=s.href.replace(/\/$/,""),i=Z(Z({},hn),t);super(a,i,r,"storage")}async listBuckets(e){var t=this;return t.handleOperation(async()=>{const r=t.listBucketOptionsToQueryString(e);return await Qr(t.fetch,`${t.url}/bucket${r}`,{headers:t.headers})})}async getBucket(e){var t=this;return t.handleOperation(async()=>await Qr(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers}))}async createBucket(e,t={public:!1}){var r=this;return r.handleOperation(async()=>await ze(r.fetch,`${r.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:r.headers}))}async updateBucket(e,t){var r=this;return r.handleOperation(async()=>await Hs(r.fetch,`${r.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:r.headers}))}async emptyBucket(e){var t=this;return t.handleOperation(async()=>await ze(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await _a(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}listBucketOptionsToQueryString(e){const t={};return e&&("limit"in e&&(t.limit=String(e.limit)),"offset"in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?"?"+new URLSearchParams(t).toString():""}},Id=class extends Sr{constructor(e,t={},r){const n=e.replace(/\/$/,""),s=Z(Z({},hn),t);super(n,s,r,"storage")}async createBucket(e){var t=this;return t.handleOperation(async()=>await ze(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers}))}async listBuckets(e){var t=this;return t.handleOperation(async()=>{const r=new URLSearchParams;(e==null?void 0:e.limit)!==void 0&&r.set("limit",e.limit.toString()),(e==null?void 0:e.offset)!==void 0&&r.set("offset",e.offset.toString()),e!=null&&e.sortColumn&&r.set("sortColumn",e.sortColumn),e!=null&&e.sortOrder&&r.set("sortOrder",e.sortOrder),e!=null&&e.search&&r.set("search",e.search);const n=r.toString(),s=n?`${t.url}/bucket?${n}`:`${t.url}/bucket`;return await Qr(t.fetch,s,{headers:t.headers})})}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await _a(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers}))}from(e){var t=this;if(!gd(e))throw new ns("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const r=new yd({baseUrl:this.url,catalogName:e,auth:{type:"custom",getHeaders:async()=>t.headers},fetch:this.fetch}),n=this.shouldThrowOnError;return new Proxy(r,{get(s,a){const i=s[a];return typeof i!="function"?i:async(...o)=>{try{return{data:await i.apply(s,o),error:null}}catch(l){if(n)throw l;return{data:null,error:l}}}}})}},Dd=class extends Sr{constructor(e,t={},r){const n=e.replace(/\/$/,""),s=Z(Z({},hn),{},{"Content-Type":"application/json"},t);super(n,s,r,"vectors")}async createIndex(e){var t=this;return t.handleOperation(async()=>await Me.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{})}async getIndex(e,t){var r=this;return r.handleOperation(async()=>await Me.post(r.fetch,`${r.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:r.headers}))}async listIndexes(e){var t=this;return t.handleOperation(async()=>await Me.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers}))}async deleteIndex(e,t){var r=this;return r.handleOperation(async()=>await Me.post(r.fetch,`${r.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:r.headers})||{})}},Od=class extends Sr{constructor(e,t={},r){const n=e.replace(/\/$/,""),s=Z(Z({},hn),{},{"Content-Type":"application/json"},t);super(n,s,r,"vectors")}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return t.handleOperation(async()=>await Me.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{})}async getVectors(e){var t=this;return t.handleOperation(async()=>await Me.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers}))}async listVectors(e){var t=this;if(e.segmentCount!==void 0){if(e.segmentCount<1||e.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(e.segmentIndex!==void 0&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw new Error(`segmentIndex must be between 0 and ${e.segmentCount-1}`)}return t.handleOperation(async()=>await Me.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers}))}async queryVectors(e){var t=this;return t.handleOperation(async()=>await Me.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers}))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return t.handleOperation(async()=>await Me.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{})}},Pd=class extends Sr{constructor(e,t={},r){const n=e.replace(/\/$/,""),s=Z(Z({},hn),{},{"Content-Type":"application/json"},t);super(n,s,r,"vectors")}async createBucket(e){var t=this;return t.handleOperation(async()=>await Me.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}async getBucket(e){var t=this;return t.handleOperation(async()=>await Me.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers}))}async listBuckets(e={}){var t=this;return t.handleOperation(async()=>await Me.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers}))}async deleteBucket(e){var t=this;return t.handleOperation(async()=>await Me.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{})}},Md=class extends Pd{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new jd(this.url,this.headers,e,this.fetch)}async createBucket(e){var t=()=>super.createBucket,r=this;return t().call(r,e)}async getBucket(e){var t=()=>super.getBucket,r=this;return t().call(r,e)}async listBuckets(e={}){var t=()=>super.listBuckets,r=this;return t().call(r,e)}async deleteBucket(e){var t=()=>super.deleteBucket,r=this;return t().call(r,e)}},jd=class extends Dd{constructor(e,t,r,n){super(e,t,n),this.vectorBucketName=r}async createIndex(e){var t=()=>super.createIndex,r=this;return t().call(r,Z(Z({},e),{},{vectorBucketName:r.vectorBucketName}))}async listIndexes(e={}){var t=()=>super.listIndexes,r=this;return t().call(r,Z(Z({},e),{},{vectorBucketName:r.vectorBucketName}))}async getIndex(e){var t=()=>super.getIndex,r=this;return t().call(r,r.vectorBucketName,e)}async deleteIndex(e){var t=()=>super.deleteIndex,r=this;return t().call(r,r.vectorBucketName,e)}index(e){return new Nd(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},Nd=class extends Od{constructor(e,t,r,n,s){super(e,t,s),this.vectorBucketName=r,this.indexName=n}async putVectors(e){var t=()=>super.putVectors,r=this;return t().call(r,Z(Z({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async getVectors(e){var t=()=>super.getVectors,r=this;return t().call(r,Z(Z({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async listVectors(e={}){var t=()=>super.listVectors,r=this;return t().call(r,Z(Z({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async queryVectors(e){var t=()=>super.queryVectors,r=this;return t().call(r,Z(Z({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async deleteVectors(e){var t=()=>super.deleteVectors,r=this;return t().call(r,Z(Z({},e),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}},Hd=class extends Rd{constructor(e,t={},r,n){super(e,t,r,n)}from(e){return new Ad(this.url,this.headers,e,this.fetch)}get vectors(){return new Md(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Id(this.url+"/iceberg",this.headers,this.fetch)}};const Oo="2.95.3",er=30*1e3,Us=3,ys=Us*er,Ud="http://localhost:9999",Fd="supabase.auth.token",Bd={"X-Client-Info":`gotrue-js/${Oo}`},Fs="X-Supabase-Api-Version",Po={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Kd=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,zd=10*60*1e3;class Yr extends Error{constructor(t,r,n){super(t),this.__isAuthError=!0,this.name="AuthError",this.status=r,this.code=n}}function G(e){return typeof e=="object"&&e!==null&&"__isAuthError"in e}class Wd extends Yr{constructor(t,r,n){super(t,r,n),this.name="AuthApiError",this.status=r,this.code=n}}function Vd(e){return G(e)&&e.name==="AuthApiError"}class At extends Yr{constructor(t,r){super(t),this.name="AuthUnknownError",this.originalError=r}}class at extends Yr{constructor(t,r,n,s){super(t,n,s),this.name=r,this.status=n}}class De extends at{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function bs(e){return G(e)&&e.name==="AuthSessionMissingError"}class zt extends at{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class xn extends at{constructor(t){super(t,"AuthInvalidCredentialsError",400,void 0)}}class qn extends at{constructor(t,r=null){super(t,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=r}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function Gd(e){return G(e)&&e.name==="AuthImplicitGrantRedirectError"}class oi extends at{constructor(t,r=null){super(t,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=r}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class Jd extends at{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Bs extends at{constructor(t,r){super(t,"AuthRetryableFetchError",r,void 0)}}function vs(e){return G(e)&&e.name==="AuthRetryableFetchError"}class li extends at{constructor(t,r,n){super(t,"AuthWeakPasswordError",r,"weak_password"),this.reasons=n}}class Ks extends at{constructor(t){super(t,"AuthInvalidJwtError",400,"invalid_jwt")}}const Kn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),di=` 	
\r=`.split(""),Qd=(()=>{const e=new Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<di.length;t+=1)e[di[t].charCodeAt(0)]=-2;for(let t=0;t<Kn.length;t+=1)e[Kn[t].charCodeAt(0)]=t;return e})();function ci(e,t,r){if(e!==null)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;){const n=t.queue>>t.queuedBits-6&63;r(Kn[n]),t.queuedBits-=6}else if(t.queuedBits>0)for(t.queue=t.queue<<6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;){const n=t.queue>>t.queuedBits-6&63;r(Kn[n]),t.queuedBits-=6}}function Mo(e,t,r){const n=Qd[e];if(n>-1)for(t.queue=t.queue<<6|n,t.queuedBits+=6;t.queuedBits>=8;)r(t.queue>>t.queuedBits-8&255),t.queuedBits-=8;else{if(n===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}}function ui(e){const t=[],r=i=>{t.push(String.fromCodePoint(i))},n={utf8seq:0,codepoint:0},s={queue:0,queuedBits:0},a=i=>{Zd(i,n,r)};for(let i=0;i<e.length;i+=1)Mo(e.charCodeAt(i),s,a);return t.join("")}function Yd(e,t){if(e<=127){t(e);return}else if(e<=2047){t(192|e>>6),t(128|e&63);return}else if(e<=65535){t(224|e>>12),t(128|e>>6&63),t(128|e&63);return}else if(e<=1114111){t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),t(128|e&63);return}throw new Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}function Xd(e,t){for(let r=0;r<e.length;r+=1){let n=e.charCodeAt(r);if(n>55295&&n<=56319){const s=(n-55296)*1024&65535;n=(e.charCodeAt(r+1)-56320&65535|s)+65536,r+=1}Yd(n,t)}}function Zd(e,t,r){if(t.utf8seq===0){if(e<=127){r(e);return}for(let n=1;n<6;n+=1)if(!(e>>7-n&1)){t.utf8seq=n;break}if(t.utf8seq===2)t.codepoint=e&31;else if(t.utf8seq===3)t.codepoint=e&15;else if(t.utf8seq===4)t.codepoint=e&7;else throw new Error("Invalid UTF-8 sequence");t.utf8seq-=1}else if(t.utf8seq>0){if(e<=127)throw new Error("Invalid UTF-8 sequence");t.codepoint=t.codepoint<<6|e&63,t.utf8seq-=1,t.utf8seq===0&&r(t.codepoint)}}function mr(e){const t=[],r={queue:0,queuedBits:0},n=s=>{t.push(s)};for(let s=0;s<e.length;s+=1)Mo(e.charCodeAt(s),r,n);return new Uint8Array(t)}function ec(e){const t=[];return Xd(e,r=>t.push(r)),new Uint8Array(t)}function Pt(e){const t=[],r={queue:0,queuedBits:0},n=s=>{t.push(s)};return e.forEach(s=>ci(s,r,n)),ci(null,r,n),t.join("")}function tc(e){return Math.round(Date.now()/1e3)+e}function rc(){return Symbol("auth-callback")}const xe=()=>typeof window<"u"&&typeof document<"u",kt={tested:!1,writable:!1},jo=()=>{if(!xe())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(kt.tested)return kt.writable;const e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),kt.tested=!0,kt.writable=!0}catch{kt.tested=!0,kt.writable=!1}return kt.writable};function nc(e){const t={},r=new URL(e);if(r.hash&&r.hash[0]==="#")try{new URLSearchParams(r.hash.substring(1)).forEach((s,a)=>{t[a]=s})}catch{}return r.searchParams.forEach((n,s)=>{t[s]=n}),t}const No=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),sc=e=>typeof e=="object"&&e!==null&&"status"in e&&"ok"in e&&"json"in e&&typeof e.json=="function",tr=async(e,t,r)=>{await e.setItem(t,JSON.stringify(r))},xt=async(e,t)=>{const r=await e.getItem(t);if(!r)return null;try{return JSON.parse(r)}catch{return r}},ke=async(e,t)=>{await e.removeItem(t)};class as{constructor(){this.promise=new as.promiseConstructor((t,r)=>{this.resolve=t,this.reject=r})}}as.promiseConstructor=Promise;function Ln(e){const t=e.split(".");if(t.length!==3)throw new Ks("Invalid JWT structure");for(let n=0;n<t.length;n++)if(!Kd.test(t[n]))throw new Ks("JWT not in base64url format");return{header:JSON.parse(ui(t[0])),payload:JSON.parse(ui(t[1])),signature:mr(t[2]),raw:{header:t[0],payload:t[1]}}}async function ac(e){return await new Promise(t=>{setTimeout(()=>t(null),e)})}function ic(e,t){return new Promise((n,s)=>{(async()=>{for(let a=0;a<1/0;a++)try{const i=await e(a);if(!t(a,null,i)){n(i);return}}catch(i){if(!t(a,i)){s(i);return}}})()})}function oc(e){return("0"+e.toString(16)).substr(-2)}function lc(){const t=new Uint32Array(56);if(typeof crypto>"u"){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",n=r.length;let s="";for(let a=0;a<56;a++)s+=r.charAt(Math.floor(Math.random()*n));return s}return crypto.getRandomValues(t),Array.from(t,oc).join("")}async function dc(e){const r=new TextEncoder().encode(e),n=await crypto.subtle.digest("SHA-256",r),s=new Uint8Array(n);return Array.from(s).map(a=>String.fromCharCode(a)).join("")}async function cc(e){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),e;const r=await dc(e);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function Wt(e,t,r=!1){const n=lc();let s=n;r&&(s+="/PASSWORD_RECOVERY"),await tr(e,`${t}-code-verifier`,s);const a=await cc(n);return[a,n===a?"plain":"s256"]}const uc=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function pc(e){const t=e.headers.get(Fs);if(!t||!t.match(uc))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}function hc(e){if(!e)throw new Error("Missing exp claim");const t=Math.floor(Date.now()/1e3);if(e<=t)throw new Error("JWT has expired")}function mc(e){switch(e){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const fc=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Vt(e){if(!fc.test(e))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function gs(){const e={};return new Proxy(e,{get:(t,r)=>{if(r==="__isUserNotAvailableProxy")return!0;if(typeof r=="symbol"){const n=r.toString();if(n==="Symbol(Symbol.toPrimitive)"||n==="Symbol(Symbol.toStringTag)"||n==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)},set:(t,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(t,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function yc(e,t){return new Proxy(e,{get:(r,n,s)=>{if(n==="__isInsecureUserWarningProxy")return!0;if(typeof n=="symbol"){const a=n.toString();if(a==="Symbol(Symbol.toPrimitive)"||a==="Symbol(Symbol.toStringTag)"||a==="Symbol(util.inspect.custom)"||a==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(r,n,s)}return!t.value&&typeof n=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),t.value=!0),Reflect.get(r,n,s)}})}function pi(e){return JSON.parse(JSON.stringify(e))}const qt=e=>e.msg||e.message||e.error_description||e.error||JSON.stringify(e),bc=[502,503,504];async function hi(e){var t;if(!sc(e))throw new Bs(qt(e),0);if(bc.includes(e.status))throw new Bs(qt(e),e.status);let r;try{r=await e.json()}catch(a){throw new At(qt(a),a)}let n;const s=pc(e);if(s&&s.getTime()>=Po["2024-01-01"].timestamp&&typeof r=="object"&&r&&typeof r.code=="string"?n=r.code:typeof r=="object"&&r&&typeof r.error_code=="string"&&(n=r.error_code),n){if(n==="weak_password")throw new li(qt(r),e.status,((t=r.weak_password)===null||t===void 0?void 0:t.reasons)||[]);if(n==="session_not_found")throw new De}else if(typeof r=="object"&&r&&typeof r.weak_password=="object"&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce((a,i)=>a&&typeof i=="string",!0))throw new li(qt(r),e.status,r.weak_password.reasons);throw new Wd(qt(r),e.status||500,n)}const vc=(e,t,r,n)=>{const s={method:e,headers:(t==null?void 0:t.headers)||{}};return e==="GET"?s:(s.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},t==null?void 0:t.headers),s.body=JSON.stringify(n),Object.assign(Object.assign({},s),r))};async function X(e,t,r,n){var s;const a=Object.assign({},n==null?void 0:n.headers);a[Fs]||(a[Fs]=Po["2024-01-01"].name),n!=null&&n.jwt&&(a.Authorization=`Bearer ${n.jwt}`);const i=(s=n==null?void 0:n.query)!==null&&s!==void 0?s:{};n!=null&&n.redirectTo&&(i.redirect_to=n.redirectTo);const o=Object.keys(i).length?"?"+new URLSearchParams(i).toString():"",l=await gc(e,t,r+o,{headers:a,noResolveJson:n==null?void 0:n.noResolveJson},{},n==null?void 0:n.body);return n!=null&&n.xform?n==null?void 0:n.xform(l):{data:Object.assign({},l),error:null}}async function gc(e,t,r,n,s,a){const i=vc(t,n,s,a);let o;try{o=await e(r,Object.assign({},i))}catch(l){throw console.error(l),new Bs(qt(l),0)}if(o.ok||await hi(o),n!=null&&n.noResolveJson)return o;try{return await o.json()}catch(l){await hi(l)}}function Ke(e){var t;let r=null;Sc(e)&&(r=Object.assign({},e),e.expires_at||(r.expires_at=tc(e.expires_in)));const n=(t=e.user)!==null&&t!==void 0?t:e;return{data:{session:r,user:n},error:null}}function mi(e){const t=Ke(e);return!t.error&&e.weak_password&&typeof e.weak_password=="object"&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&typeof e.weak_password.message=="string"&&e.weak_password.reasons.reduce((r,n)=>r&&typeof n=="string",!0)&&(t.data.weak_password=e.weak_password),t}function ft(e){var t;return{data:{user:(t=e.user)!==null&&t!==void 0?t:e},error:null}}function _c(e){return{data:e,error:null}}function wc(e){const{action_link:t,email_otp:r,hashed_token:n,redirect_to:s,verification_type:a}=e,i=rs(e,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:t,email_otp:r,hashed_token:n,redirect_to:s,verification_type:a},l=Object.assign({},i);return{data:{properties:o,user:l},error:null}}function fi(e){return e}function Sc(e){return e.access_token&&e.refresh_token&&e.expires_in}const _s=["global","local","others"];class kc{constructor({url:t="",headers:r={},fetch:n}){this.url=t,this.headers=r,this.fetch=No(n),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)}}async signOut(t,r=_s[0]){if(_s.indexOf(r)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${_s.join(", ")}`);try{return await X(this.fetch,"POST",`${this.url}/logout?scope=${r}`,{headers:this.headers,jwt:t,noResolveJson:!0}),{data:null,error:null}}catch(n){if(G(n))return{data:null,error:n};throw n}}async inviteUserByEmail(t,r={}){try{return await X(this.fetch,"POST",`${this.url}/invite`,{body:{email:t,data:r.data},headers:this.headers,redirectTo:r.redirectTo,xform:ft})}catch(n){if(G(n))return{data:{user:null},error:n};throw n}}async generateLink(t){try{const{options:r}=t,n=rs(t,["options"]),s=Object.assign(Object.assign({},n),r);return"newEmail"in n&&(s.new_email=n==null?void 0:n.newEmail,delete s.newEmail),await X(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:s,headers:this.headers,xform:wc,redirectTo:r==null?void 0:r.redirectTo})}catch(r){if(G(r))return{data:{properties:null,user:null},error:r};throw r}}async createUser(t){try{return await X(this.fetch,"POST",`${this.url}/admin/users`,{body:t,headers:this.headers,xform:ft})}catch(r){if(G(r))return{data:{user:null},error:r};throw r}}async listUsers(t){var r,n,s,a,i,o,l;try{const d={nextPage:null,lastPage:0,total:0},c=await X(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(r=t==null?void 0:t.page)===null||r===void 0?void 0:r.toString())!==null&&n!==void 0?n:"",per_page:(a=(s=t==null?void 0:t.perPage)===null||s===void 0?void 0:s.toString())!==null&&a!==void 0?a:""},xform:fi});if(c.error)throw c.error;const u=await c.json(),p=(i=c.headers.get("x-total-count"))!==null&&i!==void 0?i:0,m=(l=(o=c.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return m.length>0&&(m.forEach(h=>{const f=parseInt(h.split(";")[0].split("=")[1].substring(0,1)),w=JSON.parse(h.split(";")[1].split("=")[1]);d[`${w}Page`]=f}),d.total=parseInt(p)),{data:Object.assign(Object.assign({},u),d),error:null}}catch(d){if(G(d))return{data:{users:[]},error:d};throw d}}async getUserById(t){Vt(t);try{return await X(this.fetch,"GET",`${this.url}/admin/users/${t}`,{headers:this.headers,xform:ft})}catch(r){if(G(r))return{data:{user:null},error:r};throw r}}async updateUserById(t,r){Vt(t);try{return await X(this.fetch,"PUT",`${this.url}/admin/users/${t}`,{body:r,headers:this.headers,xform:ft})}catch(n){if(G(n))return{data:{user:null},error:n};throw n}}async deleteUser(t,r=!1){Vt(t);try{return await X(this.fetch,"DELETE",`${this.url}/admin/users/${t}`,{headers:this.headers,body:{should_soft_delete:r},xform:ft})}catch(n){if(G(n))return{data:{user:null},error:n};throw n}}async _listFactors(t){Vt(t.userId);try{const{data:r,error:n}=await X(this.fetch,"GET",`${this.url}/admin/users/${t.userId}/factors`,{headers:this.headers,xform:s=>({data:{factors:s},error:null})});return{data:r,error:n}}catch(r){if(G(r))return{data:null,error:r};throw r}}async _deleteFactor(t){Vt(t.userId),Vt(t.id);try{return{data:await X(this.fetch,"DELETE",`${this.url}/admin/users/${t.userId}/factors/${t.id}`,{headers:this.headers}),error:null}}catch(r){if(G(r))return{data:null,error:r};throw r}}async _listOAuthClients(t){var r,n,s,a,i,o,l;try{const d={nextPage:null,lastPage:0,total:0},c=await X(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(n=(r=t==null?void 0:t.page)===null||r===void 0?void 0:r.toString())!==null&&n!==void 0?n:"",per_page:(a=(s=t==null?void 0:t.perPage)===null||s===void 0?void 0:s.toString())!==null&&a!==void 0?a:""},xform:fi});if(c.error)throw c.error;const u=await c.json(),p=(i=c.headers.get("x-total-count"))!==null&&i!==void 0?i:0,m=(l=(o=c.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return m.length>0&&(m.forEach(h=>{const f=parseInt(h.split(";")[0].split("=")[1].substring(0,1)),w=JSON.parse(h.split(";")[1].split("=")[1]);d[`${w}Page`]=f}),d.total=parseInt(p)),{data:Object.assign(Object.assign({},u),d),error:null}}catch(d){if(G(d))return{data:{clients:[]},error:d};throw d}}async _createOAuthClient(t){try{return await X(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:t,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(G(r))return{data:null,error:r};throw r}}async _getOAuthClient(t){try{return await X(this.fetch,"GET",`${this.url}/admin/oauth/clients/${t}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(G(r))return{data:null,error:r};throw r}}async _updateOAuthClient(t,r){try{return await X(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${t}`,{body:r,headers:this.headers,xform:n=>({data:n,error:null})})}catch(n){if(G(n))return{data:null,error:n};throw n}}async _deleteOAuthClient(t){try{return await X(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${t}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(G(r))return{data:null,error:r};throw r}}async _regenerateOAuthClientSecret(t){try{return await X(this.fetch,"POST",`${this.url}/admin/oauth/clients/${t}/regenerate_secret`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(G(r))return{data:null,error:r};throw r}}}function yi(e={}){return{getItem:t=>e[t]||null,setItem:(t,r)=>{e[t]=r},removeItem:t=>{delete e[t]}}}const Gt={debug:!!(globalThis&&jo()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Ho extends Error{constructor(t){super(t),this.isAcquireTimeout=!0}}class xc extends Ho{}async function qc(e,t,r){Gt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",e,t);const n=new globalThis.AbortController;return t>0&&setTimeout(()=>{n.abort(),Gt.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",e)},t),await Promise.resolve().then(()=>globalThis.navigator.locks.request(e,t===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:n.signal},async s=>{if(s){Gt.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",e,s.name);try{return await r()}finally{Gt.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",e,s.name)}}else{if(t===0)throw Gt.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",e),new xc(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);if(Gt.debug)try{const a=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(a,null,"  "))}catch(a){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",a)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await r()}}))}function Lc(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Uo(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw new Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function Tc(e){return parseInt(e,16)}function Ec(e){const t=new TextEncoder().encode(e);return"0x"+Array.from(t,n=>n.toString(16).padStart(2,"0")).join("")}function $c(e){var t;const{chainId:r,domain:n,expirationTime:s,issuedAt:a=new Date,nonce:i,notBefore:o,requestId:l,resources:d,scheme:c,uri:u,version:p}=e;{if(!Number.isInteger(r))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);if(!n)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(i&&i.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${i}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(p!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${p}`);if(!((t=e.statement)===null||t===void 0)&&t.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`)}const m=Uo(e.address),h=c?`${c}://${n}`:n,f=e.statement?`${e.statement}
`:"",w=`${h} wants you to sign in with your Ethereum account:
${m}

${f}`;let y=`URI: ${u}
Version: ${p}
Chain ID: ${r}${i?`
Nonce: ${i}`:""}
Issued At: ${a.toISOString()}`;if(s&&(y+=`
Expiration Time: ${s.toISOString()}`),o&&(y+=`
Not Before: ${o.toISOString()}`),l&&(y+=`
Request ID: ${l}`),d){let v=`
Resources:`;for(const b of d){if(!b||typeof b!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${b}`);v+=`
- ${b}`}y+=v}return`${w}
${y}`}class ye extends Error{constructor({message:t,code:r,cause:n,name:s}){var a;super(t,{cause:n}),this.__isWebAuthnError=!0,this.name=(a=s??(n instanceof Error?n.name:void 0))!==null&&a!==void 0?a:"Unknown Error",this.code=r}}class zn extends ye{constructor(t,r){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r,message:t}),this.name="WebAuthnUnknownError",this.originalError=r}}function Ac({error:e,options:t}){var r,n,s;const{publicKey:a}=t;if(!a)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new ye({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else if(e.name==="ConstraintError"){if(((r=a.authenticatorSelection)===null||r===void 0?void 0:r.requireResidentKey)===!0)return new ye({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:e});if(t.mediation==="conditional"&&((n=a.authenticatorSelection)===null||n===void 0?void 0:n.userVerification)==="required")return new ye({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:e});if(((s=a.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new ye({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:e})}else{if(e.name==="InvalidStateError")return new ye({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:e});if(e.name==="NotAllowedError")return new ye({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="NotSupportedError")return a.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new ye({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:e}):new ye({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:e});if(e.name==="SecurityError"){const i=window.location.hostname;if(Fo(i)){if(a.rp.id!==i)return new ye({message:`The RP ID "${a.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new ye({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="TypeError"){if(a.user.id.byteLength<1||a.user.id.byteLength>64)return new ye({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:e})}else if(e.name==="UnknownError")return new ye({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new ye({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}function Cc({error:e,options:t}){const{publicKey:r}=t;if(!r)throw Error("options was missing required publicKey property");if(e.name==="AbortError"){if(t.signal instanceof AbortSignal)return new ye({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else{if(e.name==="NotAllowedError")return new ye({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if(e.name==="SecurityError"){const n=window.location.hostname;if(Fo(n)){if(r.rpId!==n)return new ye({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else return new ye({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e})}else if(e.name==="UnknownError")return new ye({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new ye({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}class Rc{createNewAbortSignal(){if(this.controller){const r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}const t=new AbortController;return this.controller=t,t.signal}cancelCeremony(){if(this.controller){const t=new Error("Manually cancelling existing WebAuthn API call");t.name="AbortError",this.controller.abort(t),this.controller=void 0}}}const Ic=new Rc;function Dc(e){if(!e)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(e);const{challenge:t,user:r,excludeCredentials:n}=e,s=rs(e,["challenge","user","excludeCredentials"]),a=mr(t).buffer,i=Object.assign(Object.assign({},r),{id:mr(r.id).buffer}),o=Object.assign(Object.assign({},s),{challenge:a,user:i});if(n&&n.length>0){o.excludeCredentials=new Array(n.length);for(let l=0;l<n.length;l++){const d=n[l];o.excludeCredentials[l]=Object.assign(Object.assign({},d),{id:mr(d.id).buffer,type:d.type||"public-key",transports:d.transports})}}return o}function Oc(e){if(!e)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(e);const{challenge:t,allowCredentials:r}=e,n=rs(e,["challenge","allowCredentials"]),s=mr(t).buffer,a=Object.assign(Object.assign({},n),{challenge:s});if(r&&r.length>0){a.allowCredentials=new Array(r.length);for(let i=0;i<r.length;i++){const o=r[i];a.allowCredentials[i]=Object.assign(Object.assign({},o),{id:mr(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return a}function Pc(e){var t;if("toJSON"in e&&typeof e.toJSON=="function")return e.toJSON();const r=e;return{id:e.id,rawId:e.id,response:{attestationObject:Pt(new Uint8Array(e.response.attestationObject)),clientDataJSON:Pt(new Uint8Array(e.response.clientDataJSON))},type:"public-key",clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:(t=r.authenticatorAttachment)!==null&&t!==void 0?t:void 0}}function Mc(e){var t;if("toJSON"in e&&typeof e.toJSON=="function")return e.toJSON();const r=e,n=e.getClientExtensionResults(),s=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:Pt(new Uint8Array(s.authenticatorData)),clientDataJSON:Pt(new Uint8Array(s.clientDataJSON)),signature:Pt(new Uint8Array(s.signature)),userHandle:s.userHandle?Pt(new Uint8Array(s.userHandle)):void 0},type:"public-key",clientExtensionResults:n,authenticatorAttachment:(t=r.authenticatorAttachment)!==null&&t!==void 0?t:void 0}}function Fo(e){return e==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function bi(){var e,t;return!!(xe()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.create)=="function"&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.get)=="function")}async function jc(e){try{const t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new zn("Browser returned unexpected credential type",t)}:{data:null,error:new zn("Empty credential response",t)}}catch(t){return{data:null,error:Ac({error:t,options:e})}}}async function Nc(e){try{const t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new zn("Browser returned unexpected credential type",t)}:{data:null,error:new zn("Empty credential response",t)}}catch(t){return{data:null,error:Cc({error:t,options:e})}}}const Hc={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Uc={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Wn(...e){const t=s=>s!==null&&typeof s=="object"&&!Array.isArray(s),r=s=>s instanceof ArrayBuffer||ArrayBuffer.isView(s),n={};for(const s of e)if(s)for(const a in s){const i=s[a];if(i!==void 0)if(Array.isArray(i))n[a]=i;else if(r(i))n[a]=i;else if(t(i)){const o=n[a];t(o)?n[a]=Wn(o,i):n[a]=Wn(i)}else n[a]=i}return n}function Fc(e,t){return Wn(Hc,e,t||{})}function Bc(e,t){return Wn(Uc,e,t||{})}class Kc{constructor(t){this.client=t,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(t){return this.client.mfa.enroll(Object.assign(Object.assign({},t),{factorType:"webauthn"}))}async _challenge({factorId:t,webauthn:r,friendlyName:n,signal:s},a){var i;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:t,webauthn:r});if(!o)return{data:null,error:l};const d=s??Ic.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:c}=o.webauthn.credential_options.publicKey;if(!c.name){const u=n;if(u)c.name=`${c.id}:${u}`;else{const m=(await this.client.getUser()).data.user,h=((i=m==null?void 0:m.user_metadata)===null||i===void 0?void 0:i.name)||(m==null?void 0:m.email)||(m==null?void 0:m.id)||"User";c.name=`${c.id}:${h}`}}c.displayName||(c.displayName=c.name)}switch(o.webauthn.type){case"create":{const c=Fc(o.webauthn.credential_options.publicKey,a==null?void 0:a.create),{data:u,error:p}=await jc({publicKey:c,signal:d});return u?{data:{factorId:t,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}case"request":{const c=Bc(o.webauthn.credential_options.publicKey,a==null?void 0:a.request),{data:u,error:p}=await Nc(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:c,signal:d}));return u?{data:{factorId:t,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:p}}}}catch(o){return G(o)?{data:null,error:o}:{data:null,error:new At("Unexpected error in challenge",o)}}}async _verify({challengeId:t,factorId:r,webauthn:n}){return this.client.mfa.verify({factorId:r,challengeId:t,webauthn:n})}async _authenticate({factorId:t,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:n=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},a){if(!r)return{data:null,error:new Yr("rpId is required for WebAuthn authentication")};try{if(!bi())return{data:null,error:new At("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this.challenge({factorId:t,webauthn:{rpId:r,rpOrigins:n},signal:s},{request:a});if(!i)return{data:null,error:o};const{webauthn:l}=i;return this._verify({factorId:t,challengeId:i.challengeId,webauthn:{type:l.type,rpId:r,rpOrigins:n,credential_response:l.credential_response}})}catch(i){return G(i)?{data:null,error:i}:{data:null,error:new At("Unexpected error in authenticate",i)}}}async _register({friendlyName:t,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:n=typeof window<"u"?[window.location.origin]:void 0,signal:s}={}},a){if(!r)return{data:null,error:new Yr("rpId is required for WebAuthn registration")};try{if(!bi())return{data:null,error:new At("Browser does not support WebAuthn",null)};const{data:i,error:o}=await this._enroll({friendlyName:t});if(!i)return await this.client.mfa.listFactors().then(c=>{var u;return(u=c.data)===null||u===void 0?void 0:u.all.find(p=>p.factor_type==="webauthn"&&p.friendly_name===t&&p.status!=="unverified")}).then(c=>c?this.client.mfa.unenroll({factorId:c==null?void 0:c.id}):void 0),{data:null,error:o};const{data:l,error:d}=await this._challenge({factorId:i.id,friendlyName:i.friendly_name,webauthn:{rpId:r,rpOrigins:n},signal:s},{create:a});return l?this._verify({factorId:i.id,challengeId:l.challengeId,webauthn:{rpId:r,rpOrigins:n,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:d}}catch(i){return G(i)?{data:null,error:i}:{data:null,error:new At("Unexpected error in register",i)}}}}Lc();const zc={url:Ud,storageKey:Fd,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Bd,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:1e4};async function vi(e,t,r){return await r()}const Jt={};class Xr{get jwks(){var t,r;return(r=(t=Jt[this.storageKey])===null||t===void 0?void 0:t.jwks)!==null&&r!==void 0?r:{keys:[]}}set jwks(t){Jt[this.storageKey]=Object.assign(Object.assign({},Jt[this.storageKey]),{jwks:t})}get jwks_cached_at(){var t,r;return(r=(t=Jt[this.storageKey])===null||t===void 0?void 0:t.cachedAt)!==null&&r!==void 0?r:Number.MIN_SAFE_INTEGER}set jwks_cached_at(t){Jt[this.storageKey]=Object.assign(Object.assign({},Jt[this.storageKey]),{cachedAt:t})}constructor(t){var r,n,s;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const a=Object.assign(Object.assign({},zc),t);if(this.storageKey=a.storageKey,this.instanceID=(r=Xr.nextInstanceID[this.storageKey])!==null&&r!==void 0?r:0,Xr.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!a.debug,typeof a.debug=="function"&&(this.logger=a.debug),this.instanceID>0&&xe()){const i=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(i),this.logDebugMessages&&console.trace(i)}if(this.persistSession=a.persistSession,this.autoRefreshToken=a.autoRefreshToken,this.admin=new kc({url:a.url,headers:a.headers,fetch:a.fetch}),this.url=a.url,this.headers=a.headers,this.fetch=No(a.fetch),this.lock=a.lock||vi,this.detectSessionInUrl=a.detectSessionInUrl,this.flowType=a.flowType,this.hasCustomAuthorizationHeader=a.hasCustomAuthorizationHeader,this.throwOnError=a.throwOnError,this.lockAcquireTimeout=a.lockAcquireTimeout,a.lock?this.lock=a.lock:this.persistSession&&xe()&&(!((n=globalThis==null?void 0:globalThis.navigator)===null||n===void 0)&&n.locks)?this.lock=qc:this.lock=vi,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Kc(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(a.storage?this.storage=a.storage:jo()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=yi(this.memoryStorage)),a.userStorage&&(this.userStorage=a.userStorage)):(this.memoryStorage={},this.storage=yi(this.memoryStorage)),xe()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(i){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",i)}(s=this.broadcastChannel)===null||s===void 0||s.addEventListener("message",async i=>{this._debug("received broadcast notification from other tab or client",i);try{await this._notifyAllSubscribers(i.data.event,i.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}this.initialize().catch(i=>{this._debug("#initialize()","error",i)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(t){if(this.throwOnError&&t&&t.error)throw t.error;return t}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Oo}) ${new Date().toISOString()}`}_debug(...t){return this.logDebugMessages&&this.logger(this._logPrefix(),...t),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var t;try{let r={},n="none";if(xe()&&(r=nc(window.location.href),this._isImplicitGrantCallback(r)?n="implicit":await this._isPKCECallback(r)&&(n="pkce")),xe()&&this.detectSessionInUrl&&n!=="none"){const{data:s,error:a}=await this._getSessionFromURL(r,n);if(a){if(this._debug("#_initialize()","error detecting session from URL",a),Gd(a)){const l=(t=a.details)===null||t===void 0?void 0:t.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:a}}return{error:a}}const{session:i,redirectType:o}=s;return this._debug("#_initialize()","detected session in URL",i,"redirect type",o),await this._saveSession(i),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",i):await this._notifyAllSubscribers("SIGNED_IN",i)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(r){return G(r)?this._returnResult({error:r}):this._returnResult({error:new At("Unexpected error during initialization",r)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(t){var r,n,s;try{const a=await X(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(n=(r=t==null?void 0:t.options)===null||r===void 0?void 0:r.data)!==null&&n!==void 0?n:{},gotrue_meta_security:{captcha_token:(s=t==null?void 0:t.options)===null||s===void 0?void 0:s.captchaToken}},xform:Ke}),{data:i,error:o}=a;if(o||!i)return this._returnResult({data:{user:null,session:null},error:o});const l=i.session,d=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:d,session:l},error:null})}catch(a){if(G(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signUp(t){var r,n,s;try{let a;if("email"in t){const{email:c,password:u,options:p}=t;let m=null,h=null;this.flowType==="pkce"&&([m,h]=await Wt(this.storage,this.storageKey)),a=await X(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:p==null?void 0:p.emailRedirectTo,body:{email:c,password:u,data:(r=p==null?void 0:p.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken},code_challenge:m,code_challenge_method:h},xform:Ke})}else if("phone"in t){const{phone:c,password:u,options:p}=t;a=await X(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:c,password:u,data:(n=p==null?void 0:p.data)!==null&&n!==void 0?n:{},channel:(s=p==null?void 0:p.channel)!==null&&s!==void 0?s:"sms",gotrue_meta_security:{captcha_token:p==null?void 0:p.captchaToken}},xform:Ke})}else throw new xn("You must provide either an email or phone number and a password");const{data:i,error:o}=a;if(o||!i)return await ke(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const l=i.session,d=i.user;return i.session&&(await this._saveSession(i.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:d,session:l},error:null})}catch(a){if(await ke(this.storage,`${this.storageKey}-code-verifier`),G(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signInWithPassword(t){try{let r;if("email"in t){const{email:a,password:i,options:o}=t;r=await X(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:a,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:mi})}else if("phone"in t){const{phone:a,password:i,options:o}=t;r=await X(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:a,password:i,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:mi})}else throw new xn("You must provide either an email or phone number and a password");const{data:n,error:s}=r;if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!n||!n.session||!n.user){const a=new zt;return this._returnResult({data:{user:null,session:null},error:a})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),this._returnResult({data:Object.assign({user:n.user,session:n.session},n.weak_password?{weakPassword:n.weak_password}:null),error:s})}catch(r){if(G(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOAuth(t){var r,n,s,a;return await this._handleProviderSignIn(t.provider,{redirectTo:(r=t.options)===null||r===void 0?void 0:r.redirectTo,scopes:(n=t.options)===null||n===void 0?void 0:n.scopes,queryParams:(s=t.options)===null||s===void 0?void 0:s.queryParams,skipBrowserRedirect:(a=t.options)===null||a===void 0?void 0:a.skipBrowserRedirect})}async exchangeCodeForSession(t){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(t))}async signInWithWeb3(t){const{chain:r}=t;switch(r){case"ethereum":return await this.signInWithEthereum(t);case"solana":return await this.signInWithSolana(t);default:throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)}}async signInWithEthereum(t){var r,n,s,a,i,o,l,d,c,u,p;let m,h;if("message"in t)m=t.message,h=t.signature;else{const{chain:f,wallet:w,statement:y,options:v}=t;let b;if(xe())if(typeof w=="object")b=w;else{const T=window;if("ethereum"in T&&typeof T.ethereum=="object"&&"request"in T.ethereum&&typeof T.ethereum.request=="function")b=T.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof w!="object"||!(v!=null&&v.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");b=w}const _=new URL((r=v==null?void 0:v.url)!==null&&r!==void 0?r:window.location.href),k=await b.request({method:"eth_requestAccounts"}).then(T=>T).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!k||k.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const x=Uo(k[0]);let L=(n=v==null?void 0:v.signInWithEthereum)===null||n===void 0?void 0:n.chainId;if(!L){const T=await b.request({method:"eth_chainId"});L=Tc(T)}const q={domain:_.host,address:x,statement:y,uri:_.href,version:"1",chainId:L,nonce:(s=v==null?void 0:v.signInWithEthereum)===null||s===void 0?void 0:s.nonce,issuedAt:(i=(a=v==null?void 0:v.signInWithEthereum)===null||a===void 0?void 0:a.issuedAt)!==null&&i!==void 0?i:new Date,expirationTime:(o=v==null?void 0:v.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=v==null?void 0:v.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(d=v==null?void 0:v.signInWithEthereum)===null||d===void 0?void 0:d.requestId,resources:(c=v==null?void 0:v.signInWithEthereum)===null||c===void 0?void 0:c.resources};m=$c(q),h=await b.request({method:"personal_sign",params:[Ec(m),x]})}try{const{data:f,error:w}=await X(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:m,signature:h},!((u=t.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(p=t.options)===null||p===void 0?void 0:p.captchaToken}}:null),xform:Ke});if(w)throw w;if(!f||!f.session||!f.user){const y=new zt;return this._returnResult({data:{user:null,session:null},error:y})}return f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("SIGNED_IN",f.session)),this._returnResult({data:Object.assign({},f),error:w})}catch(f){if(G(f))return this._returnResult({data:{user:null,session:null},error:f});throw f}}async signInWithSolana(t){var r,n,s,a,i,o,l,d,c,u,p,m;let h,f;if("message"in t)h=t.message,f=t.signature;else{const{chain:w,wallet:y,statement:v,options:b}=t;let _;if(xe())if(typeof y=="object")_=y;else{const x=window;if("solana"in x&&typeof x.solana=="object"&&("signIn"in x.solana&&typeof x.solana.signIn=="function"||"signMessage"in x.solana&&typeof x.solana.signMessage=="function"))_=x.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!(b!=null&&b.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");_=y}const k=new URL((r=b==null?void 0:b.url)!==null&&r!==void 0?r:window.location.href);if("signIn"in _&&_.signIn){const x=await _.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},b==null?void 0:b.signInWithSolana),{version:"1",domain:k.host,uri:k.href}),v?{statement:v}:null));let L;if(Array.isArray(x)&&x[0]&&typeof x[0]=="object")L=x[0];else if(x&&typeof x=="object"&&"signedMessage"in x&&"signature"in x)L=x;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in L&&"signature"in L&&(typeof L.signedMessage=="string"||L.signedMessage instanceof Uint8Array)&&L.signature instanceof Uint8Array)h=typeof L.signedMessage=="string"?L.signedMessage:new TextDecoder().decode(L.signedMessage),f=L.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in _)||typeof _.signMessage!="function"||!("publicKey"in _)||typeof _!="object"||!_.publicKey||!("toBase58"in _.publicKey)||typeof _.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");h=[`${k.host} wants you to sign in with your Solana account:`,_.publicKey.toBase58(),...v?["",v,""]:[""],"Version: 1",`URI: ${k.href}`,`Issued At: ${(s=(n=b==null?void 0:b.signInWithSolana)===null||n===void 0?void 0:n.issuedAt)!==null&&s!==void 0?s:new Date().toISOString()}`,...!((a=b==null?void 0:b.signInWithSolana)===null||a===void 0)&&a.notBefore?[`Not Before: ${b.signInWithSolana.notBefore}`]:[],...!((i=b==null?void 0:b.signInWithSolana)===null||i===void 0)&&i.expirationTime?[`Expiration Time: ${b.signInWithSolana.expirationTime}`]:[],...!((o=b==null?void 0:b.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${b.signInWithSolana.chainId}`]:[],...!((l=b==null?void 0:b.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${b.signInWithSolana.nonce}`]:[],...!((d=b==null?void 0:b.signInWithSolana)===null||d===void 0)&&d.requestId?[`Request ID: ${b.signInWithSolana.requestId}`]:[],...!((u=(c=b==null?void 0:b.signInWithSolana)===null||c===void 0?void 0:c.resources)===null||u===void 0)&&u.length?["Resources",...b.signInWithSolana.resources.map(L=>`- ${L}`)]:[]].join(`
`);const x=await _.signMessage(new TextEncoder().encode(h),"utf8");if(!x||!(x instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");f=x}}try{const{data:w,error:y}=await X(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:h,signature:Pt(f)},!((p=t.options)===null||p===void 0)&&p.captchaToken?{gotrue_meta_security:{captcha_token:(m=t.options)===null||m===void 0?void 0:m.captchaToken}}:null),xform:Ke});if(y)throw y;if(!w||!w.session||!w.user){const v=new zt;return this._returnResult({data:{user:null,session:null},error:v})}return w.session&&(await this._saveSession(w.session),await this._notifyAllSubscribers("SIGNED_IN",w.session)),this._returnResult({data:Object.assign({},w),error:y})}catch(w){if(G(w))return this._returnResult({data:{user:null,session:null},error:w});throw w}}async _exchangeCodeForSession(t){const r=await xt(this.storage,`${this.storageKey}-code-verifier`),[n,s]=(r??"").split("/");try{if(!n&&this.flowType==="pkce")throw new Jd;const{data:a,error:i}=await X(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:t,code_verifier:n},xform:Ke});if(await ke(this.storage,`${this.storageKey}-code-verifier`),i)throw i;if(!a||!a.session||!a.user){const o=new zt;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",a.session)),this._returnResult({data:Object.assign(Object.assign({},a),{redirectType:s??null}),error:i})}catch(a){if(await ke(this.storage,`${this.storageKey}-code-verifier`),G(a))return this._returnResult({data:{user:null,session:null,redirectType:null},error:a});throw a}}async signInWithIdToken(t){try{const{options:r,provider:n,token:s,access_token:a,nonce:i}=t,o=await X(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:n,id_token:s,access_token:a,nonce:i,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},xform:Ke}),{data:l,error:d}=o;if(d)return this._returnResult({data:{user:null,session:null},error:d});if(!l||!l.session||!l.user){const c=new zt;return this._returnResult({data:{user:null,session:null},error:c})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:d})}catch(r){if(G(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOtp(t){var r,n,s,a,i;try{if("email"in t){const{email:o,options:l}=t;let d=null,c=null;this.flowType==="pkce"&&([d,c]=await Wt(this.storage,this.storageKey));const{error:u}=await X(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(r=l==null?void 0:l.data)!==null&&r!==void 0?r:{},create_user:(n=l==null?void 0:l.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:d,code_challenge_method:c},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:u})}if("phone"in t){const{phone:o,options:l}=t,{data:d,error:c}=await X(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(s=l==null?void 0:l.data)!==null&&s!==void 0?s:{},create_user:(a=l==null?void 0:l.shouldCreateUser)!==null&&a!==void 0?a:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(i=l==null?void 0:l.channel)!==null&&i!==void 0?i:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:d==null?void 0:d.message_id},error:c})}throw new xn("You must provide either an email or phone number.")}catch(o){if(await ke(this.storage,`${this.storageKey}-code-verifier`),G(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(t){var r,n;try{let s,a;"options"in t&&(s=(r=t.options)===null||r===void 0?void 0:r.redirectTo,a=(n=t.options)===null||n===void 0?void 0:n.captchaToken);const{data:i,error:o}=await X(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},t),{gotrue_meta_security:{captcha_token:a}}),redirectTo:s,xform:Ke});if(o)throw o;if(!i)throw new Error("An error occurred on token verification.");const l=i.session,d=i.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(t.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:d,session:l},error:null})}catch(s){if(G(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithSSO(t){var r,n,s,a,i;try{let o=null,l=null;this.flowType==="pkce"&&([o,l]=await Wt(this.storage,this.storageKey));const d=await X(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in t?{provider_id:t.providerId}:null),"domain"in t?{domain:t.domain}:null),{redirect_to:(n=(r=t.options)===null||r===void 0?void 0:r.redirectTo)!==null&&n!==void 0?n:void 0}),!((s=t==null?void 0:t.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:t.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:_c});return!((a=d.data)===null||a===void 0)&&a.url&&xe()&&!(!((i=t.options)===null||i===void 0)&&i.skipBrowserRedirect)&&window.location.assign(d.data.url),this._returnResult(d)}catch(o){if(await ke(this.storage,`${this.storageKey}-code-verifier`),G(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async t=>{const{data:{session:r},error:n}=t;if(n)throw n;if(!r)throw new De;const{error:s}=await X(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:r.access_token});return this._returnResult({data:{user:null,session:null},error:s})})}catch(t){if(G(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async resend(t){try{const r=`${this.url}/resend`;if("email"in t){const{email:n,type:s,options:a}=t,{error:i}=await X(this.fetch,"POST",r,{headers:this.headers,body:{email:n,type:s,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},redirectTo:a==null?void 0:a.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:i})}else if("phone"in t){const{phone:n,type:s,options:a}=t,{data:i,error:o}=await X(this.fetch,"POST",r,{headers:this.headers,body:{phone:n,type:s,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:i==null?void 0:i.message_id},error:o})}throw new xn("You must provide either an email or phone number and a type")}catch(r){if(G(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async r=>r))}async _acquireLock(t,r){this._debug("#_acquireLock","begin",t);try{if(this.lockAcquired){const n=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),s=(async()=>(await n,await r()))();return this.pendingInLock.push((async()=>{try{await s}catch{}})()),s}return await this.lock(`lock:${this.storageKey}`,t,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const n=r();for(this.pendingInLock.push((async()=>{try{await n}catch{}})()),await n;this.pendingInLock.length;){const s=[...this.pendingInLock];await Promise.all(s),this.pendingInLock.splice(0,s.length)}return await n}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(t){this._debug("#_useSession","begin");try{const r=await this.__loadSession();return await t(r)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let t=null;const r=await xt(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",r),r!==null&&(this._isValidSession(r)?t=r:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!t)return{data:{session:null},error:null};const n=t.expires_at?t.expires_at*1e3-Date.now()<ys:!1;if(this._debug("#__loadSession()",`session has${n?"":" not"} expired`,"expires_at",t.expires_at),!n){if(this.userStorage){const i=await xt(this.userStorage,this.storageKey+"-user");i!=null&&i.user?t.user=i.user:t.user=gs()}if(this.storage.isServer&&t.user&&!t.user.__isUserNotAvailableProxy){const i={value:this.suppressGetSessionWarning};t.user=yc(t.user,i),i.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:t},error:null}}const{data:s,error:a}=await this._callRefreshToken(t.refresh_token);return a?this._returnResult({data:{session:null},error:a}):this._returnResult({data:{session:s},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(t){if(t)return await this._getUser(t);await this.initializePromise;const r=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return r.data.user&&(this.suppressGetSessionWarning=!0),r}async _getUser(t){try{return t?await X(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:t,xform:ft}):await this._useSession(async r=>{var n,s,a;const{data:i,error:o}=r;if(o)throw o;return!(!((n=i.session)===null||n===void 0)&&n.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new De}:await X(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(a=(s=i.session)===null||s===void 0?void 0:s.access_token)!==null&&a!==void 0?a:void 0,xform:ft})})}catch(r){if(G(r))return bs(r)&&(await this._removeSession(),await ke(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:r});throw r}}async updateUser(t,r={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(t,r))}async _updateUser(t,r={}){try{return await this._useSession(async n=>{const{data:s,error:a}=n;if(a)throw a;if(!s.session)throw new De;const i=s.session;let o=null,l=null;this.flowType==="pkce"&&t.email!=null&&([o,l]=await Wt(this.storage,this.storageKey));const{data:d,error:c}=await X(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:r==null?void 0:r.emailRedirectTo,body:Object.assign(Object.assign({},t),{code_challenge:o,code_challenge_method:l}),jwt:i.access_token,xform:ft});if(c)throw c;return i.user=d.user,await this._saveSession(i),await this._notifyAllSubscribers("USER_UPDATED",i),this._returnResult({data:{user:i.user},error:null})})}catch(n){if(await ke(this.storage,`${this.storageKey}-code-verifier`),G(n))return this._returnResult({data:{user:null},error:n});throw n}}async setSession(t){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(t))}async _setSession(t){try{if(!t.access_token||!t.refresh_token)throw new De;const r=Date.now()/1e3;let n=r,s=!0,a=null;const{payload:i}=Ln(t.access_token);if(i.exp&&(n=i.exp,s=n<=r),s){const{data:o,error:l}=await this._callRefreshToken(t.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};a=o}else{const{data:o,error:l}=await this._getUser(t.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});a={access_token:t.access_token,refresh_token:t.refresh_token,user:o.user,token_type:"bearer",expires_in:n-r,expires_at:n},await this._saveSession(a),await this._notifyAllSubscribers("SIGNED_IN",a)}return this._returnResult({data:{user:a.user,session:a},error:null})}catch(r){if(G(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}}async refreshSession(t){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(t))}async _refreshSession(t){try{return await this._useSession(async r=>{var n;if(!t){const{data:i,error:o}=r;if(o)throw o;t=(n=i.session)!==null&&n!==void 0?n:void 0}if(!(t!=null&&t.refresh_token))throw new De;const{data:s,error:a}=await this._callRefreshToken(t.refresh_token);return a?this._returnResult({data:{user:null,session:null},error:a}):s?this._returnResult({data:{user:s.user,session:s},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(r){if(G(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async _getSessionFromURL(t,r){try{if(!xe())throw new qn("No browser detected.");if(t.error||t.error_description||t.error_code)throw new qn(t.error_description||"Error in URL with unspecified error_description",{error:t.error||"unspecified_error",code:t.error_code||"unspecified_code"});switch(r){case"implicit":if(this.flowType==="pkce")throw new oi("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new qn("Not a valid implicit grant flow url.");break;default:}if(r==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!t.code)throw new oi("No code detected.");const{data:v,error:b}=await this._exchangeCodeForSession(t.code);if(b)throw b;const _=new URL(window.location.href);return _.searchParams.delete("code"),window.history.replaceState(window.history.state,"",_.toString()),{data:{session:v.session,redirectType:null},error:null}}const{provider_token:n,provider_refresh_token:s,access_token:a,refresh_token:i,expires_in:o,expires_at:l,token_type:d}=t;if(!a||!o||!i||!d)throw new qn("No session defined in URL");const c=Math.round(Date.now()/1e3),u=parseInt(o);let p=c+u;l&&(p=parseInt(l));const m=p-c;m*1e3<=er&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${m}s, should have been closer to ${u}s`);const h=p-u;c-h>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",h,p,c):c-h<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",h,p,c);const{data:f,error:w}=await this._getUser(a);if(w)throw w;const y={provider_token:n,provider_refresh_token:s,access_token:a,expires_in:u,expires_at:p,refresh_token:i,token_type:d,user:f.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:y,redirectType:t.type},error:null})}catch(n){if(G(n))return this._returnResult({data:{session:null,redirectType:null},error:n});throw n}}_isImplicitGrantCallback(t){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),t):!!(t.access_token||t.error_description)}async _isPKCECallback(t){const r=await xt(this.storage,`${this.storageKey}-code-verifier`);return!!(t.code&&r)}async signOut(t={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(t))}async _signOut({scope:t}={scope:"global"}){return await this._useSession(async r=>{var n;const{data:s,error:a}=r;if(a&&!bs(a))return this._returnResult({error:a});const i=(n=s.session)===null||n===void 0?void 0:n.access_token;if(i){const{error:o}=await this.admin.signOut(i,t);if(o&&!(Vd(o)&&(o.status===404||o.status===401||o.status===403)||bs(o)))return this._returnResult({error:o})}return t!=="others"&&(await this._removeSession(),await ke(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(t){const r=rc(),n={id:r,callback:t,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",r),this.stateChangeEmitters.delete(r)}};return this._debug("#onAuthStateChange()","registered callback with id",r),this.stateChangeEmitters.set(r,n),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(r)})))(),{data:{subscription:n}}}async _emitInitialSession(t){return await this._useSession(async r=>{var n,s;try{const{data:{session:a},error:i}=r;if(i)throw i;await((n=this.stateChangeEmitters.get(t))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",a)),this._debug("INITIAL_SESSION","callback id",t,"session",a)}catch(a){await((s=this.stateChangeEmitters.get(t))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",t,"error",a),console.error(a)}})}async resetPasswordForEmail(t,r={}){let n=null,s=null;this.flowType==="pkce"&&([n,s]=await Wt(this.storage,this.storageKey,!0));try{return await X(this.fetch,"POST",`${this.url}/recover`,{body:{email:t,code_challenge:n,code_challenge_method:s,gotrue_meta_security:{captcha_token:r.captchaToken}},headers:this.headers,redirectTo:r.redirectTo})}catch(a){if(await ke(this.storage,`${this.storageKey}-code-verifier`),G(a))return this._returnResult({data:null,error:a});throw a}}async getUserIdentities(){var t;try{const{data:r,error:n}=await this.getUser();if(n)throw n;return this._returnResult({data:{identities:(t=r.user.identities)!==null&&t!==void 0?t:[]},error:null})}catch(r){if(G(r))return this._returnResult({data:null,error:r});throw r}}async linkIdentity(t){return"token"in t?this.linkIdentityIdToken(t):this.linkIdentityOAuth(t)}async linkIdentityOAuth(t){var r;try{const{data:n,error:s}=await this._useSession(async a=>{var i,o,l,d,c;const{data:u,error:p}=a;if(p)throw p;const m=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,t.provider,{redirectTo:(i=t.options)===null||i===void 0?void 0:i.redirectTo,scopes:(o=t.options)===null||o===void 0?void 0:o.scopes,queryParams:(l=t.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await X(this.fetch,"GET",m,{headers:this.headers,jwt:(c=(d=u.session)===null||d===void 0?void 0:d.access_token)!==null&&c!==void 0?c:void 0})});if(s)throw s;return xe()&&!(!((r=t.options)===null||r===void 0)&&r.skipBrowserRedirect)&&window.location.assign(n==null?void 0:n.url),this._returnResult({data:{provider:t.provider,url:n==null?void 0:n.url},error:null})}catch(n){if(G(n))return this._returnResult({data:{provider:t.provider,url:null},error:n});throw n}}async linkIdentityIdToken(t){return await this._useSession(async r=>{var n;try{const{error:s,data:{session:a}}=r;if(s)throw s;const{options:i,provider:o,token:l,access_token:d,nonce:c}=t,u=await X(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(n=a==null?void 0:a.access_token)!==null&&n!==void 0?n:void 0,body:{provider:o,id_token:l,access_token:d,nonce:c,link_identity:!0,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},xform:Ke}),{data:p,error:m}=u;return m?this._returnResult({data:{user:null,session:null},error:m}):!p||!p.session||!p.user?this._returnResult({data:{user:null,session:null},error:new zt}):(p.session&&(await this._saveSession(p.session),await this._notifyAllSubscribers("USER_UPDATED",p.session)),this._returnResult({data:p,error:m}))}catch(s){if(await ke(this.storage,`${this.storageKey}-code-verifier`),G(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}})}async unlinkIdentity(t){try{return await this._useSession(async r=>{var n,s;const{data:a,error:i}=r;if(i)throw i;return await X(this.fetch,"DELETE",`${this.url}/user/identities/${t.identity_id}`,{headers:this.headers,jwt:(s=(n=a.session)===null||n===void 0?void 0:n.access_token)!==null&&s!==void 0?s:void 0})})}catch(r){if(G(r))return this._returnResult({data:null,error:r});throw r}}async _refreshAccessToken(t){const r=`#_refreshAccessToken(${t.substring(0,5)}...)`;this._debug(r,"begin");try{const n=Date.now();return await ic(async s=>(s>0&&await ac(200*Math.pow(2,s-1)),this._debug(r,"refreshing attempt",s),await X(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:t},headers:this.headers,xform:Ke})),(s,a)=>{const i=200*Math.pow(2,s);return a&&vs(a)&&Date.now()+i-n<er})}catch(n){if(this._debug(r,"error",n),G(n))return this._returnResult({data:{session:null,user:null},error:n});throw n}finally{this._debug(r,"end")}}_isValidSession(t){return typeof t=="object"&&t!==null&&"access_token"in t&&"refresh_token"in t&&"expires_at"in t}async _handleProviderSignIn(t,r){const n=await this._getUrlForProvider(`${this.url}/authorize`,t,{redirectTo:r.redirectTo,scopes:r.scopes,queryParams:r.queryParams});return this._debug("#_handleProviderSignIn()","provider",t,"options",r,"url",n),xe()&&!r.skipBrowserRedirect&&window.location.assign(n),{data:{provider:t,url:n},error:null}}async _recoverAndRefresh(){var t,r;const n="#_recoverAndRefresh()";this._debug(n,"begin");try{const s=await xt(this.storage,this.storageKey);if(s&&this.userStorage){let i=await xt(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!i&&(i={user:s.user},await tr(this.userStorage,this.storageKey+"-user",i)),s.user=(t=i==null?void 0:i.user)!==null&&t!==void 0?t:gs()}else if(s&&!s.user&&!s.user){const i=await xt(this.storage,this.storageKey+"-user");i&&(i!=null&&i.user)?(s.user=i.user,await ke(this.storage,this.storageKey+"-user"),await tr(this.storage,this.storageKey,s)):s.user=gs()}if(this._debug(n,"session from storage",s),!this._isValidSession(s)){this._debug(n,"session is not valid"),s!==null&&await this._removeSession();return}const a=((r=s.expires_at)!==null&&r!==void 0?r:1/0)*1e3-Date.now()<ys;if(this._debug(n,`session has${a?"":" not"} expired with margin of ${ys}s`),a){if(this.autoRefreshToken&&s.refresh_token){const{error:i}=await this._callRefreshToken(s.refresh_token);i&&(console.error(i),vs(i)||(this._debug(n,"refresh failed with a non-retryable error, removing the session",i),await this._removeSession()))}}else if(s.user&&s.user.__isUserNotAvailableProxy===!0)try{const{data:i,error:o}=await this._getUser(s.access_token);!o&&(i!=null&&i.user)?(s.user=i.user,await this._saveSession(s),await this._notifyAllSubscribers("SIGNED_IN",s)):this._debug(n,"could not get user data, skipping SIGNED_IN notification")}catch(i){console.error("Error getting user data:",i),this._debug(n,"error getting user data, skipping SIGNED_IN notification",i)}else await this._notifyAllSubscribers("SIGNED_IN",s)}catch(s){this._debug(n,"error",s),console.error(s);return}finally{this._debug(n,"end")}}async _callRefreshToken(t){var r,n;if(!t)throw new De;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const s=`#_callRefreshToken(${t.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new as;const{data:a,error:i}=await this._refreshAccessToken(t);if(i)throw i;if(!a.session)throw new De;await this._saveSession(a.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",a.session);const o={data:a.session,error:null};return this.refreshingDeferred.resolve(o),o}catch(a){if(this._debug(s,"error",a),G(a)){const i={data:null,error:a};return vs(a)||await this._removeSession(),(r=this.refreshingDeferred)===null||r===void 0||r.resolve(i),i}throw(n=this.refreshingDeferred)===null||n===void 0||n.reject(a),a}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(t,r,n=!0){const s=`#_notifyAllSubscribers(${t})`;this._debug(s,"begin",r,`broadcast = ${n}`);try{this.broadcastChannel&&n&&this.broadcastChannel.postMessage({event:t,session:r});const a=[],i=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(t,r)}catch(l){a.push(l)}});if(await Promise.all(i),a.length>0){for(let o=0;o<a.length;o+=1)console.error(a[o]);throw a[0]}}finally{this._debug(s,"end")}}async _saveSession(t){this._debug("#_saveSession()",t),this.suppressGetSessionWarning=!0,await ke(this.storage,`${this.storageKey}-code-verifier`);const r=Object.assign({},t),n=r.user&&r.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!n&&r.user&&await tr(this.userStorage,this.storageKey+"-user",{user:r.user});const s=Object.assign({},r);delete s.user;const a=pi(s);await tr(this.storage,this.storageKey,a)}else{const s=pi(r);await tr(this.storage,this.storageKey,s)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await ke(this.storage,this.storageKey),await ke(this.storage,this.storageKey+"-code-verifier"),await ke(this.storage,this.storageKey+"-user"),this.userStorage&&await ke(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const t=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{t&&xe()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",t)}catch(r){console.error("removing visibilitychange callback failed",r)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const t=setInterval(()=>this._autoRefreshTokenTick(),er);this.autoRefreshTicker=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t);const r=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=r,r&&typeof r=="object"&&typeof r.unref=="function"?r.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(r)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const t=this.autoRefreshTicker;this.autoRefreshTicker=null,t&&clearInterval(t);const r=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,r&&clearTimeout(r)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const t=Date.now();try{return await this._useSession(async r=>{const{data:{session:n}}=r;if(!n||!n.refresh_token||!n.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const s=Math.floor((n.expires_at*1e3-t)/er);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${er}ms, refresh threshold is ${Us} ticks`),s<=Us&&await this._callRefreshToken(n.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(t){if(t.isAcquireTimeout||t instanceof Ho)this._debug("auto refresh token tick lock not available");else throw t}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!xe()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(t){this._debug("#visibilityChangedCallback","error",t)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(t){console.error("_handleVisibilityChange",t)}}async _onVisibilityChanged(t){const r=`#_onVisibilityChanged(${t})`;this._debug(r,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),t||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(r,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(t,r,n){const s=[`provider=${encodeURIComponent(r)}`];if(n!=null&&n.redirectTo&&s.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`),n!=null&&n.scopes&&s.push(`scopes=${encodeURIComponent(n.scopes)}`),this.flowType==="pkce"){const[a,i]=await Wt(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(a)}`,code_challenge_method:`${encodeURIComponent(i)}`});s.push(o.toString())}if(n!=null&&n.queryParams){const a=new URLSearchParams(n.queryParams);s.push(a.toString())}return n!=null&&n.skipBrowserRedirect&&s.push(`skip_http_redirect=${n.skipBrowserRedirect}`),`${t}?${s.join("&")}`}async _unenroll(t){try{return await this._useSession(async r=>{var n;const{data:s,error:a}=r;return a?this._returnResult({data:null,error:a}):await X(this.fetch,"DELETE",`${this.url}/factors/${t.factorId}`,{headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token})})}catch(r){if(G(r))return this._returnResult({data:null,error:r});throw r}}async _enroll(t){try{return await this._useSession(async r=>{var n,s;const{data:a,error:i}=r;if(i)return this._returnResult({data:null,error:i});const o=Object.assign({friendly_name:t.friendlyName,factor_type:t.factorType},t.factorType==="phone"?{phone:t.phone}:t.factorType==="totp"?{issuer:t.issuer}:{}),{data:l,error:d}=await X(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(n=a==null?void 0:a.session)===null||n===void 0?void 0:n.access_token});return d?this._returnResult({data:null,error:d}):(t.factorType==="totp"&&l.type==="totp"&&(!((s=l==null?void 0:l.totp)===null||s===void 0)&&s.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(r){if(G(r))return this._returnResult({data:null,error:r});throw r}}async _verify(t){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var n;const{data:s,error:a}=r;if(a)return this._returnResult({data:null,error:a});const i=Object.assign({challenge_id:t.challengeId},"webauthn"in t?{webauthn:Object.assign(Object.assign({},t.webauthn),{credential_response:t.webauthn.type==="create"?Pc(t.webauthn.credential_response):Mc(t.webauthn.credential_response)})}:{code:t.code}),{data:o,error:l}=await X(this.fetch,"POST",`${this.url}/factors/${t.factorId}/verify`,{body:i,headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+o.expires_in},o)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",o),this._returnResult({data:o,error:l}))})}catch(r){if(G(r))return this._returnResult({data:null,error:r});throw r}})}async _challenge(t){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async r=>{var n;const{data:s,error:a}=r;if(a)return this._returnResult({data:null,error:a});const i=await X(this.fetch,"POST",`${this.url}/factors/${t.factorId}/challenge`,{body:t,headers:this.headers,jwt:(n=s==null?void 0:s.session)===null||n===void 0?void 0:n.access_token});if(i.error)return i;const{data:o}=i;if(o.type!=="webauthn")return{data:o,error:null};switch(o.webauthn.type){case"create":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Dc(o.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},o),{webauthn:Object.assign(Object.assign({},o.webauthn),{credential_options:Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:Oc(o.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(r){if(G(r))return this._returnResult({data:null,error:r});throw r}})}async _challengeAndVerify(t){const{data:r,error:n}=await this._challenge({factorId:t.factorId});return n?this._returnResult({data:null,error:n}):await this._verify({factorId:t.factorId,challengeId:r.id,code:t.code})}async _listFactors(){var t;const{data:{user:r},error:n}=await this.getUser();if(n)return{data:null,error:n};const s={all:[],phone:[],totp:[],webauthn:[]};for(const a of(t=r==null?void 0:r.factors)!==null&&t!==void 0?t:[])s.all.push(a),a.status==="verified"&&s[a.factor_type].push(a);return{data:s,error:null}}async _getAuthenticatorAssuranceLevel(t){var r,n,s,a;if(t)try{const{payload:m}=Ln(t);let h=null;m.aal&&(h=m.aal);let f=h;const{data:{user:w},error:y}=await this.getUser(t);if(y)return this._returnResult({data:null,error:y});((n=(r=w==null?void 0:w.factors)===null||r===void 0?void 0:r.filter(_=>_.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(f="aal2");const b=m.amr||[];return{data:{currentLevel:h,nextLevel:f,currentAuthenticationMethods:b},error:null}}catch(m){if(G(m))return this._returnResult({data:null,error:m});throw m}const{data:{session:i},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!i)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=Ln(i.access_token);let d=null;l.aal&&(d=l.aal);let c=d;((a=(s=i.user.factors)===null||s===void 0?void 0:s.filter(m=>m.status==="verified"))!==null&&a!==void 0?a:[]).length>0&&(c="aal2");const p=l.amr||[];return{data:{currentLevel:d,nextLevel:c,currentAuthenticationMethods:p},error:null}}async _getAuthorizationDetails(t){try{return await this._useSession(async r=>{const{data:{session:n},error:s}=r;return s?this._returnResult({data:null,error:s}):n?await X(this.fetch,"GET",`${this.url}/oauth/authorizations/${t}`,{headers:this.headers,jwt:n.access_token,xform:a=>({data:a,error:null})}):this._returnResult({data:null,error:new De})})}catch(r){if(G(r))return this._returnResult({data:null,error:r});throw r}}async _approveAuthorization(t,r){try{return await this._useSession(async n=>{const{data:{session:s},error:a}=n;if(a)return this._returnResult({data:null,error:a});if(!s)return this._returnResult({data:null,error:new De});const i=await X(this.fetch,"POST",`${this.url}/oauth/authorizations/${t}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&xe()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(n){if(G(n))return this._returnResult({data:null,error:n});throw n}}async _denyAuthorization(t,r){try{return await this._useSession(async n=>{const{data:{session:s},error:a}=n;if(a)return this._returnResult({data:null,error:a});if(!s)return this._returnResult({data:null,error:new De});const i=await X(this.fetch,"POST",`${this.url}/oauth/authorizations/${t}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return i.data&&i.data.redirect_url&&xe()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(i.data.redirect_url),i})}catch(n){if(G(n))return this._returnResult({data:null,error:n});throw n}}async _listOAuthGrants(){try{return await this._useSession(async t=>{const{data:{session:r},error:n}=t;return n?this._returnResult({data:null,error:n}):r?await X(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,xform:s=>({data:s,error:null})}):this._returnResult({data:null,error:new De})})}catch(t){if(G(t))return this._returnResult({data:null,error:t});throw t}}async _revokeOAuthGrant(t){try{return await this._useSession(async r=>{const{data:{session:n},error:s}=r;return s?this._returnResult({data:null,error:s}):n?(await X(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:n.access_token,query:{client_id:t.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new De})})}catch(r){if(G(r))return this._returnResult({data:null,error:r});throw r}}async fetchJwk(t,r={keys:[]}){let n=r.keys.find(o=>o.kid===t);if(n)return n;const s=Date.now();if(n=this.jwks.keys.find(o=>o.kid===t),n&&this.jwks_cached_at+zd>s)return n;const{data:a,error:i}=await X(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(i)throw i;return!a.keys||a.keys.length===0||(this.jwks=a,this.jwks_cached_at=s,n=a.keys.find(o=>o.kid===t),!n)?null:n}async getClaims(t,r={}){try{let n=t;if(!n){const{data:m,error:h}=await this.getSession();if(h||!m.session)return this._returnResult({data:null,error:h});n=m.session.access_token}const{header:s,payload:a,signature:i,raw:{header:o,payload:l}}=Ln(n);r!=null&&r.allowExpired||hc(a.exp);const d=!s.alg||s.alg.startsWith("HS")||!s.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(s.kid,r!=null&&r.keys?{keys:r.keys}:r==null?void 0:r.jwks);if(!d){const{error:m}=await this.getUser(n);if(m)throw m;return{data:{claims:a,header:s,signature:i},error:null}}const c=mc(s.alg),u=await crypto.subtle.importKey("jwk",d,c,!0,["verify"]);if(!await crypto.subtle.verify(c,u,i,ec(`${o}.${l}`)))throw new Ks("Invalid JWT signature");return{data:{claims:a,header:s,signature:i},error:null}}catch(n){if(G(n))return this._returnResult({data:null,error:n});throw n}}}Xr.nextInstanceID={};const Wc=Xr,Vc="2.95.3";let Pr="";typeof Deno<"u"?Pr="deno":typeof document<"u"?Pr="web":typeof navigator<"u"&&navigator.product==="ReactNative"?Pr="react-native":Pr="node";const Gc={"X-Client-Info":`supabase-js-${Pr}/${Vc}`},Jc={headers:Gc},Qc={schema:"public"},Yc={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Xc={};function Zr(e){"@babel/helpers - typeof";return Zr=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Zr(e)}function Zc(e,t){if(Zr(e)!="object"||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t);if(Zr(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function eu(e){var t=Zc(e,"string");return Zr(t)=="symbol"?t:t+""}function tu(e,t,r){return(t=eu(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function gi(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,n)}return r}function me(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?gi(Object(r),!0).forEach(function(n){tu(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):gi(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}const ru=e=>e?(...t)=>e(...t):(...t)=>fetch(...t),nu=()=>Headers,su=(e,t,r)=>{const n=ru(r),s=nu();return async(a,i)=>{var o;const l=(o=await t())!==null&&o!==void 0?o:e;let d=new s(i==null?void 0:i.headers);return d.has("apikey")||d.set("apikey",e),d.has("Authorization")||d.set("Authorization",`Bearer ${l}`),n(a,me(me({},i),{},{headers:d}))}};function au(e){return e.endsWith("/")?e:e+"/"}function iu(e,t){var r,n;const{db:s,auth:a,realtime:i,global:o}=e,{db:l,auth:d,realtime:c,global:u}=t,p={db:me(me({},l),s),auth:me(me({},d),a),realtime:me(me({},c),i),storage:{},global:me(me(me({},u),o),{},{headers:me(me({},(r=u==null?void 0:u.headers)!==null&&r!==void 0?r:{}),(n=o==null?void 0:o.headers)!==null&&n!==void 0?n:{})}),accessToken:async()=>""};return e.accessToken?p.accessToken=e.accessToken:delete p.accessToken,p}function ou(e){const t=e==null?void 0:e.trim();if(!t)throw new Error("supabaseUrl is required.");if(!t.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(au(t))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var lu=class extends Wc{constructor(e){super(e)}},du=class{constructor(e,t,r){var n,s;this.supabaseUrl=e,this.supabaseKey=t;const a=ou(e);if(!t)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",a),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",a),this.storageUrl=new URL("storage/v1",a),this.functionsUrl=new URL("functions/v1",a);const i=`sb-${a.hostname.split(".")[0]}-auth-token`,o={db:Qc,realtime:Xc,auth:me(me({},Yc),{},{storageKey:i}),global:Jc},l=iu(r??{},o);if(this.storageKey=(n=l.auth.storageKey)!==null&&n!==void 0?n:"",this.headers=(s=l.global.headers)!==null&&s!==void 0?s:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(c,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}});else{var d;this.auth=this._initSupabaseAuthClient((d=l.auth)!==null&&d!==void 0?d:{},this.headers,l.global.fetch)}this.fetch=su(t,this._getAccessToken.bind(this),l.global.fetch),this.realtime=this._initRealtimeClient(me({headers:this.headers,accessToken:this._getAccessToken.bind(this)},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(c=>this.realtime.setAuth(c)).catch(c=>console.warn("Failed to set initial Realtime auth token:",c)),this.rest=new Vl(new URL("rest/v1",a).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new Hd(this.storageUrl.href,this.headers,this.fetch,r==null?void 0:r.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Nl(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,r)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var e=this,t,r;if(e.accessToken)return await e.accessToken();const{data:n}=await e.auth.getSession();return(t=(r=n.session)===null||r===void 0?void 0:r.access_token)!==null&&t!==void 0?t:e.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:n,userStorage:s,storageKey:a,flowType:i,lock:o,debug:l,throwOnError:d},c,u){const p={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new lu({url:this.authUrl.href,headers:me(me({},p),c),storageKey:a,autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:n,userStorage:s,flowType:i,lock:o,debug:l,throwOnError:d,fetch:u,hasCustomAuthorizationHeader:Object.keys(this.headers).some(m=>m.toLowerCase()==="authorization")})}_initRealtimeClient(e){return new cd(this.realtimeUrl.href,me(me({},e),{},{params:me(me({},{apikey:this.supabaseKey}),e==null?void 0:e.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((e,t)=>{this._handleTokenChanged(e,"CLIENT",t==null?void 0:t.access_token)})}_handleTokenChanged(e,t,r){(e==="TOKEN_REFRESHED"||e==="SIGNED_IN")&&this.changedAccessToken!==r?(this.changedAccessToken=r,this.realtime.setAuth(r)):e==="SIGNED_OUT"&&(this.realtime.setAuth(),t=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const cu=(e,t,r)=>new du(e,t,r);function uu(){if(typeof window<"u")return!1;const e=globalThis.process;if(!e)return!1;const t=e.version;if(t==null)return!1;const r=t.match(/^v(\d+)\./);return r?parseInt(r[1],10)<=18:!1}uu()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const pu="https://ujxczpaupfqaiqrcoykl.supabase.co",hu="sb_publishable_EJ7wzzBh1hnKE0j_j7E1mQ_9TAJvRoO",S=cu(pu,hu),_i="app-toast-container";function mu(){let e=document.getElementById(_i);return e||(e=document.createElement("div"),e.id=_i,e.className="toast-container position-fixed top-0 end-0 p-3",e.style.zIndex="1080",document.body.appendChild(e)),e}function fu(e){return e==="success"?"text-bg-success":e==="error"?"text-bg-danger":e==="warning"?"text-bg-warning":"text-bg-primary"}function yu(e){const t=String(e||"").trim(),r=t.toLowerCase();return t?r.includes("row-level security")||r.includes("violates row-level security policy")?"Нямаш нужните права за това действие.":r.includes("foreign key constraint")||r.includes("violates foreign key constraint")?"Операцията не може да се изпълни, защото записът е свързан с други данни.":r.includes("duplicate key value")||r.includes("unique constraint")||r.includes("already exists")?"Запис с тези данни вече съществува.":r.includes("violates not-null constraint")?"Липсва задължително поле. Провери въведените данни.":r.includes("invalid input syntax")||r.includes("invalid uuid")||r.includes("date/time field value out of range")?"Невалиден формат на въведени данни.":r.includes("permission denied")||r.includes("not authorized")||r.includes("unauthorized")?"Нямаш достъп за това действие.":r.includes("jwt")||r.includes("token")||r.includes("session")?"Сесията е изтекла. Влез отново в системата.":r.includes("failed to fetch")||r.includes("networkerror")||r.includes("network request failed")?"Проблем с връзката. Провери интернет и опитай отново.":t:"Възникна неочаквана грешка."}function g(e,t="info"){const r=mu(),n=document.createElement("div"),s=t==="error"?yu(e):String(e??"");n.className=`toast align-items-center border-0 ${fu(t)} show`,n.setAttribute("role","alert"),n.setAttribute("aria-live","assertive"),n.setAttribute("aria-atomic","true"),n.innerHTML=`
    <div class="d-flex">
      <div class="toast-body">${s}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
    </div>
  `;const a=n.querySelector("button");a==null||a.addEventListener("click",()=>{n.remove()}),r.appendChild(n),window.setTimeout(()=>{n.remove()},4e3)}async function fr(){const{data:e,error:t}=await S.auth.getSession();return t?null:e.session||null}async function wa(e){if(!e)return!1;const{data:t,error:r}=await S.from("user_roles").select("id").eq("user_id",e).eq("role","admin").limit(1);return r?!1:Array.isArray(t)&&t.length>0}async function bu(){var r;const e=await fr(),t=((r=e==null?void 0:e.user)==null?void 0:r.id)||"";return t?wa(t):!1}async function zs(e){if(!e)return!1;const{data:t,error:r}=await S.from("user_roles").select("id").eq("user_id",e).limit(1);return r?!1:Array.isArray(t)&&t.length>0}async function Bo(e){if(!e)return!1;const{data:t,error:r}=await S.from("user_profiles").select("is_active").eq("id",e).maybeSingle();return r?!1:t?t.is_active!==!1:!0}async function wi(){var n;const e=await fr(),t=((n=e==null?void 0:e.user)==null?void 0:n.id)||"";return t?await Bo(t)?{allowed:!0,reason:""}:(await S.auth.signOut(),{allowed:!1,reason:"inactive-profile"}):{allowed:!1,reason:"no-session"}}const vu={page_plan_schedule:"Страница План-График",page_schedule:"Страница График",schedule_keys:"Ключ-Графици",duties:"Повески",duty_types:"Типове повески",trains:"Влакове",employees:"Служители",employee_absences:"Отсъствия",planned_duties:"Планирани повески",actual_duties:"Реални повески",user_roles:"Роли на потребители",user_profiles:"Потребителски профили",role_permissions:"Права по роли",schedule_key_duties:"Повески към ключ-график",positions:"Позиции",absence_reasons:"Причини за отсъствие",duty_trains:"Влакове към повески",documents:"Документи"},Ws={none:0,own:1,role_attached_employees:2,all:3};let Lt="",Ct=new Map,Tt=!1,Mt=null;function Rt(e){const t=String(e||"").trim();return Object.hasOwn(Ws,t)?t:"none"}function qr(e,t){const r=Rt(e),n=Rt(t);return Ws[r]>=Ws[n]?r:n}async function gu(){var l,d;const{data:e}=await S.auth.getSession(),t=((d=(l=e==null?void 0:e.session)==null?void 0:l.user)==null?void 0:d.id)||"";if(!t){Lt="",Ct=new Map,Tt=!0;return}if(Tt&&Lt===t)return;const{data:r,error:n}=await S.from("user_roles").select("role").eq("user_id",t);if(n){Lt=t,Ct=new Map,Tt=!0;return}const s=[...new Set((r||[]).map(c=>String((c==null?void 0:c.role)||"").trim()).filter(Boolean))];if(!s.length){Lt=t,Ct=new Map,Tt=!0;return}const{data:a,error:i}=await S.from("role_permissions").select("resource, view_screen_scope, view_records_scope, create_records_scope, edit_records_scope, delete_records_scope").in("role",s);if(i){Lt=t,Ct=new Map,Tt=!0;return}const o=new Map;(a||[]).forEach(c=>{const u=String((c==null?void 0:c.resource)||"").trim();if(!u)return;const p=o.get(u)||{view_screen_scope:"none",view_records_scope:"none",create_records_scope:"none",edit_records_scope:"none",delete_records_scope:"none"};o.set(u,{view_screen_scope:qr(p.view_screen_scope,c==null?void 0:c.view_screen_scope),view_records_scope:qr(p.view_records_scope,c==null?void 0:c.view_records_scope),create_records_scope:qr(p.create_records_scope,c==null?void 0:c.create_records_scope),edit_records_scope:qr(p.edit_records_scope,c==null?void 0:c.edit_records_scope),delete_records_scope:qr(p.delete_records_scope,c==null?void 0:c.delete_records_scope)})}),Lt=t,Ct=o,Tt=!0}async function jn(e,t){await gu();const r=String(e||"").trim(),n=String(t||"").trim();if(!r||!n)return"none";const s=Ct.get(r);return s?n==="view_screen"?Rt(s.view_screen_scope):n==="view_records"?Rt(s.view_records_scope):n==="edit_records"?Rt(s.edit_records_scope):n==="create_records"?Rt(s.create_records_scope):n==="delete_records"?Rt(s.delete_records_scope):"none":"none"}async function Ko(e){return await jn(e,"view_screen")!=="none"}function Qt(e,t){if(!e)return;const r=e.dataset.permissionHidden==="1";if(t){e.classList.add("d-none"),e.dataset.permissionHidden="1";return}r&&(e.classList.remove("d-none"),delete e.dataset.permissionHidden)}async function _u(e,t){Mt&&(Mt(),Mt=null);const r=String(t||"").trim();if(!e||!r)return;const n=await jn(r,"edit_records"),s=await jn(r,"create_records"),a=await jn(r,"delete_records"),i=s==="none",o=n==="none",l=a==="none",d=['button[id^="open-create-"]','button[id^="open-add-"]',"#open-auto-plan-duty","#go-to-plan-schedule","#add-selected-to-actual-duty","#go-to-schedule","#schedule-confirm-from-timetable","button[data-actual-add-duty-id]"],c=['[data-action="edit"]','[data-duty-action="edit"]','[data-action="duplicate"]','[data-duty-action="duplicate"]',"button[data-actual-edit-id]","button[data-actual-drag-id]","#schedule-actual-edit-save"],u=['[data-action="delete"]','[data-duty-action="delete"]',"#open-bulk-delete-planned-duty","#open-bulk-delete-actual-duty"],p=()=>{i&&e.querySelectorAll(d.join(",")).forEach(f=>Qt(f,!0)),o&&e.querySelectorAll(c.join(",")).forEach(f=>Qt(f,!0)),l&&e.querySelectorAll(u.join(",")).forEach(f=>Qt(f,!0)),i||e.querySelectorAll(d.join(",")).forEach(f=>Qt(f,!1)),o||e.querySelectorAll(c.join(",")).forEach(f=>Qt(f,!1)),l||e.querySelectorAll(u.join(",")).forEach(f=>Qt(f,!1))},m=f=>{const w=f.target;if(w){if(i&&w.closest(d.join(","))){f.preventDefault(),f.stopPropagation(),g("Нямаш права за създаване.","warning");return}if(o&&w.closest(c.join(","))){f.preventDefault(),f.stopPropagation(),g("Нямаш права за редакция.","warning");return}l&&w.closest(u.join(","))&&(f.preventDefault(),f.stopPropagation(),g("Нямаш права за изтриване.","warning"))}},h=new MutationObserver(()=>{p()});p(),e.addEventListener("click",m,!0),h.observe(e,{childList:!0,subtree:!0}),Mt=()=>{e.removeEventListener("click",m,!0),h.disconnect()}}function wu(){Mt&&(Mt(),Mt=null)}function zo(){Lt="",Ct=new Map,Tt=!1}function Sa(e){const t=String(e||"").trim();return t?vu[t]||t:"-"}let ws,Tn,En,$n;async function Su(e){e.innerHTML=Ol;const t=e.querySelector("nav.navbar"),r=e.querySelector("#nav-sign-in"),n=e.querySelector("#nav-register"),s=e.querySelector("#nav-my-profile"),a=e.querySelector("#nav-logout"),i=e.querySelector("#nav-admin"),o=a==null?void 0:a.querySelector("button"),l=e.querySelector("#mainNav"),d=e.querySelector(".navbar-toggler"),c=globalThis.bootstrap,u=!!(c!=null&&c.Collapse),p=!!(c!=null&&c.Dropdown),m=()=>{if(l){if(u){c.Collapse.getOrCreateInstance(l,{toggle:!1}).hide();return}l.classList.contains("show")&&(l.classList.remove("show"),d==null||d.setAttribute("aria-expanded","false"))}},h=()=>{if(p){e.querySelectorAll(".dropdown-toggle").forEach(v=>{try{c.Dropdown.getOrCreateInstance(v).hide()}catch{}});return}e.querySelectorAll(".nav-item.dropdown").forEach(v=>{var _;v.classList.remove("show"),(_=v.querySelector(".dropdown-menu"))==null||_.classList.remove("show");const b=v.querySelector(".dropdown-toggle");b&&b.setAttribute("aria-expanded","false")})},f=()=>{const v=window.location.pathname;e.querySelectorAll("a[data-link]").forEach(k=>{const L=k.getAttribute("href")===v;k.classList.toggle("active",L),k.setAttribute("aria-current",L?"page":"false")}),e.querySelectorAll(".nav-item.dropdown").forEach(k=>{const x=k.querySelector(".dropdown-toggle"),L=!!k.querySelector(".dropdown-item.active");x==null||x.classList.toggle("active",L),x&&x.setAttribute("aria-current",L?"page":"false")})},w=async()=>{var E;const{data:v}=await S.auth.getSession(),b=v.session,_=!!b,k=((E=b==null?void 0:b.user)==null?void 0:E.id)||"",x=k?await zs(k):!1,L=_&&!x;if(t==null||t.classList.toggle("d-none",!_),r==null||r.classList.toggle("d-none",_),n==null||n.classList.toggle("d-none",_),a==null||a.classList.toggle("d-none",!_),L){e.querySelectorAll("#mainNav .navbar-nav > li").forEach($=>{$.classList.add("d-none")}),a==null||a.classList.remove("d-none"),i==null||i.classList.add("d-none"),s==null||s.classList.add("d-none");return}let q=!1;k&&(q=await wa(k)),i==null||i.classList.toggle("d-none",!q),s==null||s.classList.toggle("d-none",!q);const T={"/schedule-keys":"schedule_keys","/duties":"duties","/duty-types":"duty_types","/trains":"trains","/employees":"employees","/employee-absences":"employee_absences","/planned-duties":"planned_duties","/actual-duties":"actual_duties","/documents":"documents","/user-profiles":"user_profiles","/plan-schedule":"page_plan_schedule","/schedule":"page_schedule","/schedule-key-duties":"duties"};await Promise.all(Object.entries(T).map(async([$,A])=>{const C=e.querySelector(`a[data-link][href="${$}"]`),I=C==null?void 0:C.closest("li");if(!C||!I)return;if(!_){I.classList.add("d-none");return}const R=await Ko(A);I.classList.toggle("d-none",!R)}))};e.addEventListener("click",v=>{const b=v.target.closest(".dropdown-toggle");if(b&&e.contains(b)){if(v.preventDefault(),p){const T=b.closest(".nav-item.dropdown"),E=T==null?void 0:T.classList.contains("show");h();const $=c.Dropdown.getOrCreateInstance(b);E?$.hide():$.show();return}const x=b.closest(".nav-item.dropdown"),L=x==null?void 0:x.querySelector(".dropdown-menu"),q=x==null?void 0:x.classList.contains("show");h(),!q&&x&&L&&(x.classList.add("show"),L.classList.add("show"),b.setAttribute("aria-expanded","true"));return}const _=v.target.closest(".navbar-toggler");if(_&&e.contains(_)){if(v.preventDefault(),h(),l)if(u)c.Collapse.getOrCreateInstance(l,{toggle:!1}).toggle();else{const x=!l.classList.contains("show");l.classList.toggle("show",x),d==null||d.setAttribute("aria-expanded",x?"true":"false")}return}v.target.closest("a[data-link]")&&(h(),m())}),o==null||o.addEventListener("click",async()=>{const{error:v}=await S.auth.signOut();if(v){g(v.message,"error");return}g("Logged out successfully.","success"),window.history.pushState({},"","/login"),window.dispatchEvent(new PopStateEvent("popstate"))}),ws&&ws.unsubscribe(),Tn&&window.removeEventListener("route:changed",Tn),En&&document.removeEventListener("click",En),$n&&document.removeEventListener("keydown",$n),Tn=f,window.addEventListener("route:changed",Tn),En=v=>{e.contains(v.target)||(h(),m())},document.addEventListener("click",En),$n=v=>{v.key==="Escape"&&h()},document.addEventListener("keydown",$n);const{data:y}=S.auth.onAuthStateChange(()=>{zo(),w()});ws=y.subscription,await w(),f()}const ku=`<div class="bg-white border-top py-3">\r
  <div class="container text-muted small text-center">\r
    TrainCrewHub Crew Management Platform\r
  </div>\r
</div>\r
`;async function xu(e){e.innerHTML=ku}async function qu(e){e.innerHTML=Dl;const t=e.querySelector("#app-header"),r=e.querySelector("#app-footer");await Promise.all([Su(t),xu(r)])}const Lu=`<div class="d-flex flex-column gap-3">\r
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
`;function Ht(e){if(!e)return"00:00";const t=String(e).match(/(\d{1,2}):(\d{2})(?::\d{2})?/);if(!t)return"00:00";const[,r,n]=t;return`${r.padStart(2,"0")}:${n}`}function Si(e){if(!e)return 0;const[t,r]=e.split(":"),n=Number(t),s=Number(r);return!Number.isFinite(n)||!Number.isFinite(s)?0:n*60+s}function Ie(e,t){const r=Si(e),n=Si(t);return n>=r?n-r:24*60-r+n}async function Tu(e,t){const{setText:r,formatDateTime:n,escapeHtml:s}=t,[a,i,o,l]=await Promise.all([S.from("user_profiles").select("id",{count:"exact",head:!0}),S.from("user_roles").select("user_id"),S.from("roles").select("name",{count:"exact",head:!0}),S.from("user_profiles").select("id",{count:"exact",head:!0}).not("employee_id","is",null)]);[a,i,o,l].some(u=>u.error)&&g("Част от админ данните на индекс страницата не могат да се заредят.","warning");const c=new Set((i.data||[]).map(u=>u.user_id).filter(Boolean));r(e,"#index-kpi-planned",String(a.count??0)),r(e,"#index-kpi-actual",String(c.size)),r(e,"#index-kpi-absences",String(l.count??0)),r(e,"#index-kpi-employees",String(o.count??0)),await Eu(e,{setText:r,formatDateTime:n,escapeHtml:s}),r(e,"#index-last-updated",`Последно обновяване: ${n(new Date)}`)}async function Eu(e,t){const{setText:r,formatDateTime:n,escapeHtml:s}=t,a=e.querySelector("#index-pending-users-panel"),i=e.querySelector("#index-pending-users-body");if(!a||!i)return;const[{data:o,error:l},{data:d,error:c}]=await Promise.all([S.from("user_profiles").select("id, username, created_at").order("created_at",{ascending:!0}),S.from("user_roles").select("user_id")]);if(l||c){g("Списъкът с чакащи потребители не може да се зареди.","warning"),r(e,"#index-pending-users-count","0"),i.innerHTML='<tr><td colspan="3" class="text-secondary">Грешка при зареждане.</td></tr>';return}const u=new Set((d||[]).map(m=>String((m==null?void 0:m.user_id)||"").trim()).filter(Boolean)),p=(o||[]).filter(m=>!u.has(String((m==null?void 0:m.id)||"").trim()));if(r(e,"#index-pending-users-count",String(p.length)),!p.length){i.innerHTML='<tr><td colspan="3" class="text-secondary">Няма чакащи потребители.</td></tr>';return}i.innerHTML=p.map(m=>{const h=String((m==null?void 0:m.username)||"").trim()||String((m==null?void 0:m.id)||"-"),f=(m==null?void 0:m.created_at)||"",w=f?new Date(f):null,y=w&&!Number.isNaN(w.getTime())?n(w):"-",v=$u(f);return`
        <tr>
          <td>${s(h)}</td>
          <td>${s(y)}</td>
          <td>${s(v)}</td>
        </tr>
      `}).join("")}function $u(e){if(!e)return"-";const t=new Date(e);if(Number.isNaN(t.getTime()))return"-";const r=Math.max(Date.now()-t.getTime(),0),n=Math.floor(r/6e4),s=Math.floor(n/(24*60)),a=Math.floor(n%(24*60)/60),i=n%60;return s>0?`${s} д ${a} ч`:a>0?`${a} ч ${i} мин`:i>0?`${i} мин`:"под 1 мин"}function Au(e){const{loadKpiSnapshot:t,getTodayIsoDate:r,formatDate:n,escapeHtml:s,formatMinutesAsClock:a,formatSignedMinutesAsClock:i,getDeviationClassByThreshold:o,parseIsoDateSafe:l,toMonthKey:d,getMonthBounds:c,countBulgarianWorkdays:u,getDutyTimingSummary:p,getActualDutyTimingSummary:m,getDistinctBadgeClassByReason:h}=e,f={groups:[],selectedKey:""};function w(A,C,I,R){const W=A.querySelector(C);if(W){if(!I.length){W.innerHTML=`<tr><td colspan="3" class="text-secondary">${R}</td></tr>`;return}W.innerHTML=I.map(K=>`
        <tr>
          <td>${s(K.employeeName)}</td>
          <td>${s(K.certificateLabel)}</td>
          <td>${s(n(K.date))}</td>
        </tr>
      `).join("")}}function y(A){const C=new Date;C.setHours(0,0,0,0);const I=new Date(C);I.setDate(I.getDate()+30);const R=[{key:"psychological_assessment_expiry",label:"Психологическа годност"},{key:"medical_certificate_expiry",label:"Медицинско"},{key:"license_expiry",label:"Лиценз"}],W=[],K=[];(A||[]).forEach(j=>{const z=`${(j==null?void 0:j.first_name)||""} ${(j==null?void 0:j.last_name)||""}`.trim()||"-";R.forEach(ee=>{const le=j==null?void 0:j[ee.key];if(!le)return;const P=new Date(`${le}T00:00:00`);if(Number.isNaN(P.getTime()))return;const D={employeeName:z,certificateLabel:ee.label,date:le};if(P<C){K.push(D);return}P<=I&&W.push(D)})});const V=(j,z)=>{const ee=String(j.date).localeCompare(String(z.date));return ee!==0?ee:String(j.employeeName).localeCompare(String(z.employeeName),"bg")};return{soon:W.sort(V),expired:K.sort(V)}}function v(A,C){return C?A==="expired"?"text-bg-danger":"text-bg-warning":"text-bg-secondary"}function b(A,C){const I=A.querySelector("#index-certificates-soon-details"),R=A.querySelector("#index-certificates-expired-details");if(!(!I||!R)){if(C==="soon"){I.classList.toggle("d-none"),R.classList.add("d-none");return}C==="expired"&&(R.classList.toggle("d-none"),I.classList.add("d-none"))}}async function _(A){const C=A.querySelector("#index-certificates-panel"),I=A.querySelector("#index-certificates-soon-toggle"),R=A.querySelector("#index-certificates-expired-toggle");if(!C||!I||!R)return;const{data:W,error:K}=await S.from("employees").select("first_name, last_name, psychological_assessment_expiry, medical_certificate_expiry, license_expiry").eq("is_active",!0).order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(K){g("Сертификатите не могат да се заредят.","warning"),I.textContent="0",R.textContent="0",I.className="badge text-bg-secondary border-0",R.className="badge text-bg-secondary border-0",w(A,"#index-certificates-soon-body",[],"Няма служители."),w(A,"#index-certificates-expired-body",[],"Няма служители.");return}const V=y(W||[]);I.textContent=String(V.soon.length),R.textContent=String(V.expired.length),I.className=`badge ${v("soon",V.soon.length)} border-0`,R.className=`badge ${v("expired",V.expired.length)} border-0`,w(A,"#index-certificates-soon-body",V.soon,"Няма служители с изтичащи сертификати."),w(A,"#index-certificates-expired-body",V.expired,"Няма служители с изтекли сертификати.")}function k(A){const C=new Map;(A||[]).forEach(R=>{var ee,le,P;const W=String(((ee=R==null?void 0:R.absence_reasons)==null?void 0:ee.name)||"").trim()||"Без посочена причина",K=`${((le=R==null?void 0:R.employees)==null?void 0:le.first_name)||""} ${((P=R==null?void 0:R.employees)==null?void 0:P.last_name)||""}`.trim()||"-",V=(R==null?void 0:R.start_date)||"",j=(R==null?void 0:R.end_date)||"",z=C.get(W)||{reason:W,details:[]};z.details.push({employeeName:K,startDate:V,endDate:j}),C.set(W,z)});const I=Array.from(C.values()).map(R=>({...R,details:R.details.sort((W,K)=>String(W.employeeName).localeCompare(String(K.employeeName),"bg")),count:R.details.length}));return I.sort((R,W)=>W.count!==R.count?W.count-R.count:String(R.reason).localeCompare(String(W.reason),"bg")),I}function x(A,C){const I=A.querySelector("#index-absence-reasons-body");if(I){if(!C.length){I.innerHTML='<p class="text-secondary mb-0">Няма активни отсъствия.</p>';return}I.innerHTML=C.map((R,W)=>{const K=h(R.reason),V=String(W),j=V===f.selectedKey,z=R.details.map(ee=>{const le=`${n(ee.startDate)} - ${n(ee.endDate)}`;return`
              <tr>
                <td>${s(ee.employeeName)}</td>
                <td>${s(le)}</td>
              </tr>
            `}).join("");return`
          <div class="d-flex justify-content-between align-items-center border rounded p-2">
            <span>${s(R.reason)}</span>
            <button
              type="button"
              class="badge ${K} border-0"
              data-index-absence-action="toggle-reason"
              data-index-absence-key="${V}"
              aria-expanded="${j?"true":"false"}"
            >
              ${s(String(R.count))}
            </button>
          </div>
          ${j?`
            <div class="table-responsive">
              <table class="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Служител</th>
                    <th>Период</th>
                  </tr>
                </thead>
                <tbody>
                  ${z}
                </tbody>
              </table>
            </div>
          `:""}
        `}).join("")}}function L(A,C){if(C===""||C===f.selectedKey){f.selectedKey="",x(A,f.groups);return}if(!(f.groups[Number(C)]||null)){f.selectedKey="",x(A,f.groups);return}f.selectedKey=String(C),x(A,f.groups)}async function q(A){const C=r(),{data:I,error:R}=await S.from("employee_absences").select("start_date, end_date, employees(first_name, last_name), absence_reasons(name)").lte("start_date",C).gte("end_date",C).order("start_date",{ascending:!0});if(R){g("Отсъствията не могат да се заредят.","warning"),f.groups=[],f.selectedKey="",x(A,[]);return}f.groups=k(I||[]),f.selectedKey="",x(A,f.groups)}function T(A,C){const I=A.querySelector("#index-workload-body");if(I){if(!C.length){I.innerHTML='<tr><td colspan="5" class="text-secondary">Няма данни.</td></tr>';return}I.innerHTML=C.map(R=>`
        <tr>
          <td>${s(R.employeeName)}</td>
          <td>${s(R.planned)}</td>
          <td>${s(R.actual)}</td>
          <td>${s(R.norm)}</td>
          <td><span class="badge ${s(R.deviationClass)}">${s(R.deviation)}</span></td>
        </tr>
      `).join("")}}async function E(A){const C=A.querySelector("#index-workload-date"),I=String((C==null?void 0:C.value)||r()),R=l(I);if(!R){T(A,[]);return}const W=d(R),{startDate:K}=c(W),V=u(K,I)*8*60,[j,z,ee]=await Promise.all([S.from("employees").select("id, first_name, last_name").eq("is_active",!0).order("last_name",{ascending:!0}).order("first_name",{ascending:!0}),S.from("planned_duties").select("employee_id, date, duties(start_time, end_time, break_start_time, break_end_time)").gte("date",K).lte("date",I),S.from("actual_duties").select("employee_id, date, start_time_override, end_time_override, break_start_time_override, break_end_time_override, duties(start_time, end_time, break_start_time, break_end_time)").gte("date",K).lte("date",I)]);if(j.error||z.error||ee.error){g("Натовареността не може да се зареди.","warning"),T(A,[]);return}const le=j.data||[],P=z.data||[],D=ee.data||[],N=new Map;P.forEach(H=>{const J=String((H==null?void 0:H.employee_id)||"");if(!J)return;const re=Number(p(H==null?void 0:H.duties).durationMinutes);Number.isFinite(re)&&N.set(J,Number(N.get(J)||0)+re)});const F=new Map;D.forEach(H=>{const J=String((H==null?void 0:H.employee_id)||"");if(!J)return;const re=Number(m(H).durationMinutes);Number.isFinite(re)&&F.set(J,Number(F.get(J)||0)+re)});const Y=le.map(H=>{const J=String((H==null?void 0:H.id)||""),re=`${(H==null?void 0:H.first_name)||""} ${(H==null?void 0:H.last_name)||""}`.trim()||"-",ce=Number(N.get(J)||0),ae=Number(F.get(J)||0),ne=ae-V;return{employeeName:re,planned:a(ce),actual:a(ae),norm:a(V),deviation:i(ne),deviationClass:o(ne),deviationMinutes:ne}});Y.sort((H,J)=>{const re=Math.abs(Number(J.deviationMinutes||0))-Math.abs(Number(H.deviationMinutes||0));return re!==0?re:String(H.employeeName).localeCompare(String(J.employeeName),"bg")}),T(A,Y)}async function $(A){await Promise.all([t(A),_(A),q(A),E(A)])}return{toggleCertificateDetails:b,toggleAbsenceReasonDetails:L,loadHeadOfTransportWorkload:E,loadHeadOfTransportSnapshot:$}}function Cu(e){return String(e||"").trim().toLowerCase()}function Mr(e,t){const r=(e||[]).map(n=>Cu(n));return t.some(n=>r.includes(n))}function ka(e){return Mr(e,["crew","crew_member","user"])}function Ru(e){return Mr(e,["admin"])?"admin":Mr(e,["head_of_transport"])?"head_of_transport":Mr(e,["crew_instructor","instructor"])?"instructor":Mr(e,["crew_manager"])?"manager":ka(e)?"crew":"default"}function It(e){return e==="head_of_transport"||e==="instructor"}function Iu(e,t){const{loadCrewMonthlySnapshot:r,crewCalendarState:n,toMonthKey:s,shiftMonthKey:a,getTodayIsoDate:i,renderCrewCalendarAndDetails:o,openCrewActualDutyEditModal:l,openCrewTimetablePreview:d,closeCrewTimetablePreview:c,closeCrewActualDutyEditModal:u,saveCrewActualDutyEdits:p}=t,m=e.querySelector("#index-refresh-crew"),h=e.querySelector("#index-crew-prev-month"),f=e.querySelector("#index-crew-next-month"),w=e.querySelector("#index-crew-today-month"),y=e.querySelector("#index-crew-calendar-days"),v=e.querySelector("#index-crew-actual-body"),b=e.querySelector("#index-timetable-preview-modal"),_=e.querySelector("#index-timetable-preview-close"),k=e.querySelector("#index-actual-duty-edit-modal"),x=e.querySelector("#index-actual-duty-edit-close"),L=e.querySelector("#index-actual-duty-edit-cancel"),q=e.querySelector("#index-actual-duty-edit-form");m==null||m.addEventListener("click",async()=>{const T=e.dataset.indexMode||"default",E=e.dataset.indexEmployeeId||"";T==="crew"&&(m.disabled=!0,await r(e,E,n.visibleMonth),m.disabled=!1)}),h==null||h.addEventListener("click",async()=>{const T=e.dataset.indexMode||"default",E=e.dataset.indexEmployeeId||"";if(T!=="crew")return;const $=n.visibleMonth||s(new Date),A=a($,-1);await r(e,E,A)}),f==null||f.addEventListener("click",async()=>{const T=e.dataset.indexMode||"default",E=e.dataset.indexEmployeeId||"";if(T!=="crew")return;const $=n.visibleMonth||s(new Date),A=a($,1);await r(e,E,A)}),w==null||w.addEventListener("click",async()=>{const T=e.dataset.indexMode||"default",E=e.dataset.indexEmployeeId||"";if(T!=="crew")return;const $=new Date;n.visibleMonth=s($),n.selectedDate=i(),await r(e,E,n.visibleMonth)}),y==null||y.addEventListener("click",T=>{const E=T.target.closest('button[data-index-crew-action="select-day"]');if(!E||(e.dataset.indexMode||"default")!=="crew")return;const A=E.getAttribute("data-date")||"";A&&(n.selectedDate=A,o(e))}),v==null||v.addEventListener("click",T=>{const E=T.target.closest('button[data-index-crew-action="edit-actual-duty"]');if(E){if((e.dataset.indexMode||"default")!=="crew")return;const W=E.getAttribute("data-actual-duty-id")||"";if(!W)return;l(e,W);return}const $=T.target.closest('button[data-index-crew-action="preview-timetable"]');if(!$||(e.dataset.indexMode||"default")!=="crew")return;const C=decodeURIComponent($.getAttribute("data-preview-url")||""),I=decodeURIComponent($.getAttribute("data-preview-label")||"");d(e,C,I)}),_==null||_.addEventListener("click",()=>{c(e)}),b==null||b.addEventListener("click",T=>{T.target===b&&c(e)}),x==null||x.addEventListener("click",()=>{u(e)}),L==null||L.addEventListener("click",()=>{u(e)}),k==null||k.addEventListener("click",T=>{T.target===k&&u(e)}),q==null||q.addEventListener("submit",async T=>{T.preventDefault(),await p(e)})}function Du(e){const{crewCalendarState:t,ensureCrewSelectedDate:r,renderCrewCalendar:n,renderCrewHoursSummary:s,renderCrewSelectedDayDetails:a,toMonthKey:i,getMonthBounds:o,loadSchedulePublicationDates:l,loadScheduleChangesSummary:d,formatDateTime:c,setText:u}=e;function p(w){r(t.visibleMonth),n(w),s(w),a(w)}const m=w=>{if(!w)return"";if(w instanceof Date&&!Number.isNaN(w.getTime()))return w.toISOString().slice(0,10);const y=String(w).trim(),v=y.match(/\d{4}-\d{2}-\d{2}/);return v?v[0]:y},h=w=>{if(!w||typeof w!="object")return w;const y=m(w.date);return!y||w.date===y?w:{...w,date:y}};async function f(w,y,v){const b=v||t.visibleMonth||i(new Date);if(t.visibleMonth=b,!y){t.plannedRows=[],t.actualRows=[],t.actualRowsById=new Map,t.absenceRows=[],t.confirmedDates=new Set,t.pendingConfirmationDates=new Set,t.changeCountByDate=new Map,t.changeEventsByDate=new Map,t.selectedDate="",p(w),u(w,"#index-crew-last-updated","Липсва прикачен служител към профила.");return}const{startDate:_,endDate:k}=o(b),[x,L,q,T,E]=await Promise.all([S.from("planned_duties").select("date, assignment_role, duties(name, start_time, end_time, second_day, break_start_time, break_end_time)").eq("employee_id",y).gte("date",_).lte("date",k).order("date",{ascending:!0}).order("duty_id",{ascending:!0}),S.from("actual_duties").select("id, date, assignment_role, reported_at, start_time_override, end_time_override, break_start_time_override, break_end_time_override, duties(name, start_time, end_time, second_day, break_start_time, break_end_time, duty_files, duty_trains(sequence_order, trains(number, timetable_url)))").eq("employee_id",y).gte("date",_).lte("date",k).order("date",{ascending:!0}).order("reported_at",{ascending:!1}),S.from("employee_absences").select("start_date, end_date, absence_reasons(name)").eq("employee_id",y).lte("start_date",k).gte("end_date",_).order("start_date",{ascending:!0}),l(_,k),d(_,k)]);(x.error||L.error||q.error||T.error||E.error)&&g("Част от данните за моите повески не могат да се заредят.","warning");const $=T.confirmedDateSet||new Set,A=T.pendingConfirmationDateSet||new Set,C=E.changeCountByDate||new Map,I=E.changeEventsByDate||new Map,R=x.data||[],W=L.data||[],K=R.map(h),V=W.map(h).filter(j=>$.has(m(j==null?void 0:j.date)));t.plannedRows=K,t.actualRows=V,t.actualRowsById=new Map(t.actualRows.map(j=>[String((j==null?void 0:j.id)||""),j])),t.absenceRows=q.data||[],t.confirmedDates=$,t.pendingConfirmationDates=A,t.changeCountByDate=C,t.changeEventsByDate=I,p(w),u(w,"#index-crew-last-updated",`Последно обновяване: ${c(new Date)}`)}return{loadCrewMonthlySnapshot:f,renderCrewCalendarAndDetails:p}}const Ou={БО:"text-bg-warning",ДО:"text-bg-danger",ПО:"text-bg-primary",НП:"text-bg-dark",К:"text-bg-info",ОТС:"text-bg-secondary"};function Pu(e){const{crewCalendarState:t,setText:r,getTodayIsoDate:n,toMonthKey:s,toIsoDateFromDate:a,parseMonthKey:i,formatMonthLabel:o,getMonthBounds:l,formatDate:d,formatDateTime:c,escapeHtml:u,countBulgarianWorkdays:p,getDutyTimingSummary:m,getActualDutyTimingSummary:h,formatMinutesAsClock:f,formatSignedMinutesAsClock:w,getDeviationClassByThreshold:y,formatRoleLabel:v,getDistinctBadgeClassByReason:b}=e;function _(P){if(!P)return"";if(P instanceof Date&&!Number.isNaN(P.getTime()))return P.toISOString().slice(0,10);const D=String(P).trim(),N=D.match(/\d{4}-\d{2}-\d{2}/);return N?N[0]:D}function k(P){return P&&t.actualRowsById.get(P)||null}function x(P,D){const N=P.querySelector("#index-actual-duty-edit-modal"),F=P.querySelector("#index-actual-duty-edit-id"),Y=P.querySelector("#index-actual-duty-start"),H=P.querySelector("#index-actual-duty-end"),J=P.querySelector("#index-actual-duty-break-start"),re=P.querySelector("#index-actual-duty-break-end"),ce=k(D);if(!N||!F||!Y||!H||!J||!re||!ce){g("Не е намерена реална повеска за редакция.","warning");return}F.value=D;const ae=h(ce);Y.value=ae.startTime==="-"?"":ae.startTime,H.value=ae.endTime==="-"?"":ae.endTime,J.value=ae.breakStartTime==="-"?"00:00":ae.breakStartTime,re.value=ae.breakEndTime==="-"?"00:00":ae.breakEndTime,t.editingActualDutyId=D,N.classList.remove("d-none")}function L(P){const D=P.querySelector("#index-actual-duty-edit-modal"),N=P.querySelector("#index-actual-duty-edit-form"),F=P.querySelector("#index-actual-duty-edit-id");N&&N.reset(),F&&(F.value=""),t.editingActualDutyId="",D==null||D.classList.add("d-none")}function q(P){if(Array.isArray(P))return P.map((N,F)=>T(N,F)).filter(N=>N.url);const D=String(P||"").trim();if(!D)return[];if(D.startsWith("["))try{const N=JSON.parse(D);if(Array.isArray(N))return N.map((F,Y)=>T(F,Y)).filter(F=>F.url)}catch{return[{url:D,label:"Разписание 1"}]}return D.split(`
`).map((N,F)=>T(N,F)).filter(N=>N.url)}function T(P,D){if(P&&typeof P=="object"&&!Array.isArray(P)){const F=String(P.url||"").trim(),Y=String(P.label||"").trim()||`Разписание ${D+1}`;return{url:F,label:Y}}return{url:String(P||"").trim(),label:`Разписание ${D+1}`}}function E(P){const D=String(P||"").trim();if(!D)return"ОТС";const N=D.toLowerCase(),F={бо:"БО",болничен:"БО","болничен отпуск":"БО",до:"ДО","допълнителен отпуск":"ДО",по:"ПО","платен отпуск":"ПО",нп:"НП","неплатен отпуск":"НП",командировка:"К"};if(F[N])return F[N];if(D.length<=4&&/^[\p{L}\p{N}]+$/u.test(D))return D.toUpperCase();const Y=D.split(/\s+/).map(H=>H.trim()).filter(Boolean);return Y.length>=2?Y.slice(0,3).map(H=>H.charAt(0).toUpperCase()).join(""):D.slice(0,2).toUpperCase()}function $(P){const D=E(P);return Ou[D]||b(P)}function A(P,D){const N=new Date(`${P}T00:00:00`),F=new Date(`${D}T00:00:00`);if(Number.isNaN(N.getTime())||Number.isNaN(F.getTime())||N>F)return[];const Y=[],H=new Date(N);for(;H<=F;)Y.push(a(H)),H.setDate(H.getDate()+1);return Y}function C(P){var D;return String(((D=P==null?void 0:P.absence_reasons)==null?void 0:D.name)||"").trim()||"Отсъствие"}function I(P){const D=String(P||"").trim();if(!D)return"";try{const F=new URL(D).pathname.split("/").pop()||"",Y=F.includes(".")?F.split(".").pop():"";return String(Y||"").toLowerCase()}catch{return""}}function R(P){const D=I(P);return["doc","docx","xls","xlsx","ppt","pptx"].includes(D)?`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(P)}`:P}function W(P,D,N){const F=P.querySelector("#index-timetable-preview-modal"),Y=P.querySelector("#index-timetable-preview-frame"),H=P.querySelector("#index-timetable-preview-title"),J=P.querySelector("#index-timetable-preview-fallback"),re=P.querySelector("#index-timetable-preview-open");if(!F||!Y||!H||!J||!re)return;const ce=String(D||"").trim();if(!ce){g("Липсва линк за преглед.","warning");return}const ae=R(ce);H.textContent=N?`Преглед: ${N}`:"Преглед на разписание",re.setAttribute("href",ce),J.classList.add("d-none"),Y.src="about:blank",Y.src=ae,Y.onload=()=>{if(ae!==ce){J.classList.add("d-none");return}const ne=I(ce),Le=["doc","docx","xls","xlsx","ppt","pptx"].includes(ne);J.classList.toggle("d-none",!Le)},Y.onerror=()=>{J.classList.remove("d-none")},F.classList.remove("d-none")}function K(P){const D=P.querySelector("#index-timetable-preview-modal"),N=P.querySelector("#index-timetable-preview-frame"),F=P.querySelector("#index-timetable-preview-fallback"),Y=P.querySelector("#index-timetable-preview-open");!D||!N||!F||!Y||(N.src="about:blank",Y.setAttribute("href","#"),F.classList.add("d-none"),D.classList.add("d-none"))}function V(P){const D=i(P),N=s(D),F=n(),Y=F.startsWith(N),H=new Set([...t.plannedRows.map(ne=>_(ne==null?void 0:ne.date)).filter(Boolean),...t.actualRows.map(ne=>_(ne==null?void 0:ne.date)).filter(Boolean),...t.absenceRows.flatMap(ne=>A(ne==null?void 0:ne.start_date,ne==null?void 0:ne.end_date)),...Array.from(t.pendingConfirmationDates||[]).map(ne=>_(ne)).filter(Boolean),...Array.from((t.changeCountByDate||new Map).keys()).map(ne=>_(ne)).filter(Boolean)]),J=_(t.selectedDate),re=J?H.has(J):!1,ce=H.size>0;if(J&&J.startsWith(N)&&(!ce||re))return;const ae=[...H].sort((ne,Le)=>String(ne).localeCompare(String(Le),"bg"));if(Y&&H.has(F)){t.selectedDate=F;return}if(ae.length){t.selectedDate=String(ae[0]);return}t.selectedDate=`${N}-01`}function j(){const P=new Map;return t.plannedRows.forEach(D=>{const N=_(D==null?void 0:D.date);if(!N)return;const F=P.get(N)||{planned:0,actual:0};F.planned+=1,P.set(N,F)}),t.actualRows.forEach(D=>{const N=_(D==null?void 0:D.date);if(!N)return;const F=P.get(N)||{planned:0,actual:0};F.actual+=1,P.set(N,F)}),t.pendingConfirmationDates.forEach(D=>{const N=_(D);if(!N)return;const F=P.get(N)||{planned:0,actual:0,absences:[]};F.pendingConfirmation=!0,P.set(N,F)}),t.changeCountByDate.forEach((D,N)=>{const F=_(N);if(!F)return;const Y=P.get(F)||{planned:0,actual:0,absences:[]};Y.changeCount=Number(D||0),P.set(F,Y)}),t.absenceRows.forEach(D=>{const N=C(D),F=$(N);A(D==null?void 0:D.start_date,D==null?void 0:D.end_date).forEach(Y=>{const H=P.get(Y)||{planned:0,actual:0,absences:[]};Array.isArray(H.absences)||(H.absences=[]),H.absences.some(re=>(re==null?void 0:re.reason)===N)||H.absences.push({reason:N,className:F}),P.set(Y,H)})}),P}function z(P){const D=P.querySelector("#index-crew-calendar-days");if(!D)return;const N=t.visibleMonth||s(new Date),F=i(N),Y=new Date(F.getFullYear(),F.getMonth(),1),H=Y.getDay(),J=H===0?6:H-1,re=new Date(Y);re.setDate(Y.getDate()-J);const ce=j(),ae=n();r(P,"#index-crew-month-label",o(N));const ne=[];for(let Le=0;Le<42;Le+=1){const O=new Date(re);O.setDate(re.getDate()+Le);const ue=`${s(O)}-${String(O.getDate()).padStart(2,"0")}`,Je=O.getMonth()!==F.getMonth(),Te=ue===t.selectedDate,Bt=ue===ae,Ce=ce.get(ue)||{planned:0,actual:0,absences:[]},St=Array.isArray(Ce.absences)?Ce.absences.map(Ye=>`<span class="badge ${u(Ye.className||"text-bg-danger")}" title="${u(Ye.reason||"Отсъствие")}">${u(Ye.reason||"Отсъствие")}</span>`).join(""):"";ne.push(`
        <button
          type="button"
          class="index-crew-calendar-day ${Je?"is-other-month":""} ${Te?"is-selected":""} ${Bt?"is-today":""}"
          data-index-crew-action="select-day"
          data-date="${ue}"
        >
          <span class="index-crew-calendar-day-number">${O.getDate()}</span>
          <span class="index-crew-calendar-day-flags">
            ${Ce.planned?`<span class="badge text-bg-primary">П${Ce.planned}</span>`:""}
            ${Ce.actual?`<span class="badge text-bg-success">Р${Ce.actual}</span>`:""}
            ${Ce.pendingConfirmation?'<span class="badge text-bg-warning">Промяна</span>':""}
            ${Ce.changeCount?`<span class="badge text-bg-info" title="Извършени промени за деня">Δ${u(String(Ce.changeCount))}</span>`:""}
            ${St}
          </span>
        </button>
      `)}D.innerHTML=ne.join("")}function ee(P){const D=_(t.selectedDate),N=P.querySelector("#index-crew-planned-body"),F=P.querySelector("#index-crew-actual-body"),Y=P.querySelector("#index-crew-change-body"),H=P.querySelector("#index-crew-absence-body");if(!N||!F||!Y||!H)return;r(P,"#index-crew-selected-date-label",`Детайли за ${d(D)}`);const J=t.plannedRows.filter(O=>_(O==null?void 0:O.date)===D).sort((O,se)=>{var ue,Je;return String(((ue=O==null?void 0:O.duties)==null?void 0:ue.start_time)||"").localeCompare(String(((Je=se==null?void 0:se.duties)==null?void 0:Je.start_time)||""),"bg")});J.length?N.innerHTML=J.map(O=>{var Bt,Ce,St,Ye;const se=((Bt=O==null?void 0:O.duties)==null?void 0:Bt.name)||"-",ue=v(O==null?void 0:O.assignment_role),Je=`${((Ce=O==null?void 0:O.duties)==null?void 0:Ce.start_time)||"-"} - ${((St=O==null?void 0:O.duties)==null?void 0:St.end_time)||"-"}${(Ye=O==null?void 0:O.duties)!=null&&Ye.second_day?" (+1)":""}`,Te=m(O==null?void 0:O.duties);return`
            <article class="border rounded p-2">
              <div class="fw-semibold">${u(se)}</div>
              <div class="small text-secondary">${u(ue)} · ${u(Je)}</div>
              <div class="small mt-1">
                <div><span class="text-secondary">Начало:</span> ${u(Te.startTime)}</div>
                <div><span class="text-secondary">Край:</span> ${u(Te.endTime)}</div>
                <div><span class="text-secondary">Начало на прекъсване:</span> ${u(Te.breakStartTime)}</div>
                <div><span class="text-secondary">Край на прекъсване:</span> ${u(Te.breakEndTime)}</div>
                <div><span class="text-secondary">Прекъсване:</span> ${u(Te.breakDuration)}</div>
                <div><span class="text-secondary">Времетраене:</span> ${u(Te.duration)}</div>
              </div>
            </article>
          `}).join(""):N.innerHTML='<p class="text-secondary mb-0">Няма планирани повески.</p>';const re=t.actualRows.filter(O=>_(O==null?void 0:O.date)===D).sort((O,se)=>String((se==null?void 0:se.reported_at)||"").localeCompare(String((O==null?void 0:O.reported_at)||""),"bg")),ce=t.confirmedDates.has(D),ae=t.pendingConfirmationDates.has(D);ce?re.length?F.innerHTML=re.map(O=>{var Ka,za,Wa,Va;const se=((Ka=O==null?void 0:O.duties)==null?void 0:Ka.name)||"-",ue=v(O==null?void 0:O.assignment_role),Je=O!=null&&O.reported_at?c(new Date(O.reported_at)):"-",Te=h(O),Bt=Array.isArray((za=O==null?void 0:O.duties)==null?void 0:za.duty_trains)?[...O.duties.duty_trains].sort((Ee,it)=>Number((Ee==null?void 0:Ee.sequence_order)||0)-Number((it==null?void 0:it.sequence_order)||0)):(Wa=O==null?void 0:O.duties)!=null&&Wa.duty_trains?[O.duties.duty_trains]:[],Ce=q((Va=O==null?void 0:O.duties)==null?void 0:Va.duty_files),St=Bt.map(Ee=>{var Ga,Ja;const it=(Ga=Ee==null?void 0:Ee.trains)!=null&&Ga.number?`Влак ${Ee.trains.number}`:"Влак",gn=q((Ja=Ee==null?void 0:Ee.trains)==null?void 0:Ja.timetable_url);if(!gn.length)return`<div class="small">${u(it)}: <span class="text-secondary">без разписание</span></div>`;const kr=gn.map(ps=>{const Rl=encodeURIComponent(ps.url),Il=encodeURIComponent(ps.label||"Разписание"),hs=ps.label||"Разписание";return`
                    <span class="d-inline-flex align-items-center gap-1 me-2">
                      <span>${u(hs)}</span>
                      <button
                        type="button"
                        class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
                        data-index-crew-action="preview-timetable"
                        data-preview-url="${u(Rl)}"
                        data-preview-label="${u(Il)}"
                        title="Преглед: ${u(hs)}"
                        aria-label="Преглед: ${u(hs)}"
                      >
                        👁
                      </button>
                    </span>
                  `}).join(" ");return`<div class="small">${u(it)}: ${kr}</div>`}).join(""),Ye=Ce.map(Ee=>{const it=encodeURIComponent(Ee.url),gn=encodeURIComponent(Ee.label||"Файл"),kr=Ee.label||"Файл";return`
                <span class="d-inline-flex align-items-center gap-1 me-2 small">
                  <span>${u(kr)}</span>
                  <button
                    type="button"
                    class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
                    data-index-crew-action="preview-timetable"
                    data-preview-url="${u(it)}"
                    data-preview-label="${u(gn)}"
                    title="Преглед: ${u(kr)}"
                    aria-label="Преглед: ${u(kr)}"
                  >
                    👁
                  </button>
                </span>
              `}).join("");return`
            <article class="border rounded p-2">
              <div class="d-flex align-items-start justify-content-between gap-2">
                <div class="fw-semibold">${u(se)}</div>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-secondary py-0 px-2"
                  title="Редакция на часове"
                  aria-label="Редакция на часове"
                  data-index-crew-action="edit-actual-duty"
                  data-actual-duty-id="${u(String((O==null?void 0:O.id)||""))}"
                >
                  ✎
                </button>
              </div>
              <div class="small text-secondary mb-1">${u(ue)} · Отчетена: ${u(Je)}</div>
              <div class="small mb-1">
                <div><span class="text-secondary">Начало:</span> ${u(Te.startTime)}</div>
                <div><span class="text-secondary">Край:</span> ${u(Te.endTime)}</div>
                <div><span class="text-secondary">Начало на прекъсване:</span> ${u(Te.breakStartTime)}</div>
                <div><span class="text-secondary">Край на прекъсване:</span> ${u(Te.breakEndTime)}</div>
                <div><span class="text-secondary">Прекъсване:</span> ${u(Te.breakDuration)}</div>
                <div><span class="text-secondary">Времетраене:</span> ${u(Te.duration)}</div>
              </div>
              ${St?`<div class="small"><span class="fw-semibold">Разписания:</span> ${St}</div>`:""}
              ${Ye?`<div class="small"><span class="fw-semibold">Файлове:</span> ${Ye}</div>`:""}
            </article>
          `}).join(""):F.innerHTML='<p class="text-secondary mb-0">Няма реални повески.</p>':F.innerHTML=ae?'<p class="text-warning mb-0">Има смяна на служител по реална повеска. Нужна е повторна валидация от разписание.</p>':'<p class="text-secondary mb-0">Графикът за деня не е потвърден от разписание.</p>';const ne=t.changeEventsByDate.get(D)||[];ne.length?Y.innerHTML=ne.map(O=>`
          <article class="border rounded p-2">
            <div class="small">${u(O.summary||"-")}</div>
            <div class="small text-secondary">${u(O.changedAt||"-")}</div>
          </article>
        `).join(""):Y.innerHTML='<p class="text-secondary mb-0">Няма регистрирани промени за избрания ден.</p>';const Le=t.absenceRows.filter(O=>{const se=String((O==null?void 0:O.start_date)||""),ue=String((O==null?void 0:O.end_date)||"");return!!(se&&ue&&D>=se&&D<=ue)}).sort((O,se)=>{const ue=String((O==null?void 0:O.start_date)||"").localeCompare(String((se==null?void 0:se.start_date)||""),"bg");return ue!==0?ue:C(O).localeCompare(C(se),"bg")});if(!Le.length){H.innerHTML='<p class="text-secondary mb-0">Няма отсъствия за избрания ден.</p>';return}H.innerHTML=Le.map(O=>{const se=C(O),ue=$(se),Je=`${d(O==null?void 0:O.start_date)} - ${d(O==null?void 0:O.end_date)}`;return`
          <article class="border rounded p-2">
            <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
              <span class="badge ${u(ue)}">${u(se)}</span>
            </div>
            <div class="small text-secondary">Период: ${u(Je)}</div>
          </article>
        `}).join("")}function le(P){const D=P.querySelector("#index-crew-planned-hours-total"),N=P.querySelector("#index-crew-actual-hours-total"),F=P.querySelector("#index-crew-norm-hours-total"),Y=P.querySelector("#index-crew-deviation-hours-total");if(!D||!N||!F||!Y)return;const H=String(t.selectedDate||"").trim();if(!H){D.textContent="00:00",N.textContent="00:00",F.textContent="00:00",Y.textContent="+00:00",Y.className="fw-semibold badge text-bg-success";return}const{startDate:J}=l(t.visibleMonth||s(new Date)),re=H>=J?H:J,ce=t.plannedRows.filter(O=>{const se=String((O==null?void 0:O.date)||"");return!!(se&&se>=J&&se<=re)}).reduce((O,se)=>{const ue=Number(m(se==null?void 0:se.duties).durationMinutes);return Number.isFinite(ue)?O+ue:O},0),ae=t.actualRows.filter(O=>{const se=String((O==null?void 0:O.date)||"");return!!(se&&se>=J&&se<=re)}).reduce((O,se)=>{const ue=Number(h(se).durationMinutes);return Number.isFinite(ue)?O+ue:O},0),ne=p(J,re)*8*60,Le=ae-ne;D.textContent=f(ce),N.textContent=f(ae),F.textContent=f(ne),Y.textContent=w(Le),Y.className=`fw-semibold badge ${y(Le)}`}return{openCrewActualDutyEditModal:x,closeCrewActualDutyEditModal:L,openCrewTimetablePreview:W,closeCrewTimetablePreview:K,ensureCrewSelectedDate:V,renderCrewCalendar:z,renderCrewSelectedDayDetails:ee,renderCrewHoursSummary:le}}function ar(e){const t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0");return`${t}-${r}`}function wt(e){const t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${r}-${n}`}function is(e){const[t,r]=String(e||"").split("-"),n=Number(t),s=Number(r);if(!Number.isInteger(n)||!Number.isInteger(s)||s<1||s>12){const a=new Date;return new Date(a.getFullYear(),a.getMonth(),1)}return new Date(n,s-1,1)}function Mu(e,t){const r=is(e);return r.setMonth(r.getMonth()+t),ar(r)}function ju(e){const t=is(e);return new Intl.DateTimeFormat("bg-BG",{month:"long",year:"numeric"}).format(t)}function Ss(e){const t=is(e),r=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:wt(t),endDate:wt(r)}}function en(e){const t=String(e||"").trim();if(!/^\d{4}-\d{2}-\d{2}$/.test(t))return null;const[r,n,s]=t.split("-"),a=Number(r),i=Number(n),o=Number(s);return!Number.isInteger(a)||!Number.isInteger(i)||!Number.isInteger(o)?null:new Date(a,i-1,o)}function Nu(e,t,r){return new Date(Date.UTC(e,t-1,r))}function Hu(e){const t=e%4,r=e%7,s=(19*(e%19)+15)%30,a=(2*t+4*r-s+34)%7,i=Math.floor((s+a+114)/31),o=(s+a+114)%31+1,l=Nu(e,i,o);return l.setUTCDate(l.getUTCDate()+13),new Date(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate())}function Uu(e,t){const r=wt(t);e.add(r);const n=t.getDay();if(n!==0&&n!==6)return;const s=new Date(t);for(s.setDate(s.getDate()+1);s.getDay()===0||s.getDay()===6||e.has(wt(s));)s.setDate(s.getDate()+1);e.add(wt(s))}function Fu(e){const t=new Set;[[1,1],[3,3],[5,1],[5,6],[5,24],[9,6],[9,22],[12,24],[12,25],[12,26]].forEach(([a,i])=>{Uu(t,new Date(e,a-1,i))});const n=Hu(e);return[-2,-1,0,1].forEach(a=>{const i=new Date(n);i.setDate(i.getDate()+a),t.add(wt(i))}),t}function Bu(e,t){const r=en(e),n=en(t);if(!r||!n||r>n)return new Set;const s=new Set;for(let a=r.getFullYear();a<=n.getFullYear();a+=1)Fu(a).forEach(o=>s.add(o));return s}function ki(e,t){const r=en(e),n=en(t);if(!r||!n||r>n)return 0;const s=Bu(e,t);let a=0;const i=new Date(r);for(;i<=n;){const o=i.getDay(),l=wt(i),d=o===0||o===6,c=s.has(l);!d&&!c&&(a+=1),i.setDate(i.getDate()+1)}return a}function xi(e){const t=String(e||"").trim().toLowerCase();return t==="chief"?"Началник влак":t==="conductor"?"Кондуктор":t||"-"}function Ku(e){const t=String((e==null?void 0:e.first_name)||"").trim(),r=String((e==null?void 0:e.last_name)||"").trim();return`${t} ${r}`.trim()||"-"}async function zu(e,t,r){const{data:n,error:s}=await e.from("schedule_publications").select("schedule_date, is_confirmed").gte("schedule_date",t).lte("schedule_date",r);if(s)return{confirmedDateSet:new Set,pendingConfirmationDateSet:new Set,error:s};const a=new Set,i=new Set,o=l=>{const d=String(l||"").trim(),c=d.match(/\d{4}-\d{2}-\d{2}/);return c?c[0]:d};return(n||[]).forEach(l=>{const d=o(l==null?void 0:l.schedule_date);if(d){if(l!=null&&l.is_confirmed){a.add(d);return}i.add(d)}}),{confirmedDateSet:a,pendingConfirmationDateSet:i,error:null}}async function Wu(e,t,r,n){const{data:s,error:a}=await e.from("schedule_change_events").select("schedule_date, action, old_duty_id, new_duty_id, old_employee_id, new_employee_id, old_assignment_role, new_assignment_role, changed_at").gte("schedule_date",t).lte("schedule_date",r).order("changed_at",{ascending:!1});if(a)return{changeCountByDate:new Map,changeEventsByDate:new Map,error:a};const i=new Set,o=new Set;(s||[]).forEach(h=>{h!=null&&h.old_duty_id&&i.add(h.old_duty_id),h!=null&&h.new_duty_id&&i.add(h.new_duty_id),h!=null&&h.old_employee_id&&o.add(h.old_employee_id),h!=null&&h.new_employee_id&&o.add(h.new_employee_id)});const[l,d]=await Promise.all([i.size?e.from("duties").select("id, name").in("id",Array.from(i)):Promise.resolve({data:[],error:null}),o.size?e.from("employees").select("id, first_name, last_name").in("id",Array.from(o)):Promise.resolve({data:[],error:null})]);if(l.error||d.error)return{changeCountByDate:new Map,changeEventsByDate:new Map,error:l.error||d.error};const c=new Map((l.data||[]).map(h=>[String((h==null?void 0:h.id)||""),String((h==null?void 0:h.name)||"").trim()||"-"]).filter(([h])=>h)),u=new Map((d.data||[]).map(h=>[String((h==null?void 0:h.id)||""),Ku(h)]).filter(([h])=>h)),p=new Map,m=new Map;return(s||[]).forEach(h=>{const f=String((h==null?void 0:h.schedule_date)||"").trim();if(!f)return;const w=Number(p.get(f)||0);p.set(f,w+1);const y=c.get(String((h==null?void 0:h.old_duty_id)||""))||"-",v=c.get(String((h==null?void 0:h.new_duty_id)||""))||"-",b=u.get(String((h==null?void 0:h.old_employee_id)||""))||"-",_=u.get(String((h==null?void 0:h.new_employee_id)||""))||"-",k=xi(h==null?void 0:h.old_assignment_role),x=xi(h==null?void 0:h.new_assignment_role),L=String((h==null?void 0:h.action)||"").trim().toLowerCase(),q=h!=null&&h.changed_at?n(new Date(h.changed_at)):"-";let T="";L==="insert"?T=`Добавено: ${_} | ${v} | ${x}`:L==="delete"?T=`Премахнато: ${b} | ${y} | ${k}`:T=`Промяна: ${b} | ${y} | ${k} → ${_} | ${v} | ${x}`;const E=m.get(f)||[];E.push({summary:T,changedAt:q}),m.set(f,E)}),{changeCountByDate:p,changeEventsByDate:m,error:null}}function qi(e,t){t.forEach((r,n)=>{const s=e.querySelector(`#index-kpi-label-${n+1}`);s&&(s.textContent=r)})}function Vu(e,t,r){const{setText:n,isTransportAnalyticsMode:s,getTodayIsoDate:a}=r,i=e.querySelector("#index-management-section"),o=e.querySelector("#index-crew-section"),l=e.querySelector("#index-kpi-card-planned"),d=e.querySelector("#index-kpi-card-actual"),c=e.querySelector("#index-kpi-card-absences"),u=e.querySelector("#index-kpi-card-employees"),p=e.querySelector("#index-certificates-panel"),m=e.querySelector("#index-absences-panel"),h=e.querySelector("#index-workload-panel"),f=e.querySelector("#index-pending-users-panel"),w=e.querySelector("#index-workload-date"),y=e.querySelector("#index-certificates-soon-details"),v=e.querySelector("#index-certificates-expired-details"),b=e.querySelector("#index-quick-actions"),_=(t==null?void 0:t.mode)||"default";if(n(e,"#index-management-title","Оперативен преглед за днес"),qi(e,["Планирани повески","Реални повески","Активни отсъствия","Активни служители"]),_!=="crew"){e.dataset.indexMode=_,i==null||i.classList.remove("d-none"),o==null||o.classList.add("d-none"),l==null||l.classList.remove("d-none"),d==null||d.classList.remove("d-none"),c==null||c.classList.remove("col-xl-6"),c==null||c.classList.add("col-xl-3"),u==null||u.classList.remove("col-xl-6"),u==null||u.classList.add("col-xl-3"),p==null||p.classList.add("d-none"),m==null||m.classList.add("d-none"),h==null||h.classList.add("d-none"),f==null||f.classList.add("d-none"),y==null||y.classList.add("d-none"),v==null||v.classList.add("d-none"),b&&(_==="admin"?(b.innerHTML=`
          <a href="/admin" data-link class="btn btn-outline-danger">Админ Панел</a>
          <a href="/employees" data-link class="btn btn-outline-primary">Служители</a>
        `,n(e,"#index-welcome-subtitle","Административен преглед на потребители, роли и системно състояние."),n(e,"#index-management-title","Административен преглед"),qi(e,["Профили","Потребители с роля","Профили със служител","Роли"]),f==null||f.classList.remove("d-none")):_==="manager"?(b.innerHTML=`
          <a href="/plan-schedule" data-link class="btn btn-outline-primary">План-График</a>
          <a href="/schedule" data-link class="btn btn-outline-primary">График</a>
          <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
          <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
        `,n(e,"#index-welcome-subtitle","Оперативен преглед за управление на екипи и дневни повески.")):s(_)&&(b.innerHTML=`
          <a href="/plan-schedule" data-link class="btn btn-outline-primary">План-График</a>
          <a href="/schedule" data-link class="btn btn-outline-primary">График</a>
          <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
          <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
        `,n(e,"#index-welcome-subtitle","Оперативен преглед с акцент върху празни позиции, сертификати и отсъствия."),l==null||l.classList.add("d-none"),d==null||d.classList.add("d-none"),c==null||c.classList.remove("col-xl-3"),c==null||c.classList.add("col-xl-6"),u==null||u.classList.remove("col-xl-3"),u==null||u.classList.add("col-xl-6"),p==null||p.classList.remove("d-none"),m==null||m.classList.remove("d-none"),h==null||h.classList.remove("d-none"),w&&!w.value&&(w.value=a())));return}e.dataset.indexMode="crew",e.dataset.indexEmployeeId=t.employeeId||"",i==null||i.classList.add("d-none"),o==null||o.classList.remove("d-none"),n(e,"#index-welcome-subtitle","Виждаш своя месечен календар за планирани и реални повески."),b&&(b.innerHTML=`
      <a href="/planned-duties" data-link class="btn btn-outline-primary">Планирани повески</a>
      <a href="/actual-duties" data-link class="btn btn-outline-primary">Реални повески</a>
    `)}const ir={visibleMonth:"",selectedDate:"",plannedRows:[],actualRows:[],actualRowsById:new Map,absenceRows:[],confirmedDates:new Set,pendingConfirmationDates:new Set,changeCountByDate:new Map,changeEventsByDate:new Map,editingActualDutyId:""},Gu=-20*60,Ju=30*60;function or(){return new Date().toISOString().slice(0,10)}function Kr(e){return new Intl.DateTimeFormat("bg-BG",{dateStyle:"medium",timeStyle:"short"}).format(e)}function Li(e){return e?new Intl.DateTimeFormat("bg-BG",{dateStyle:"medium"}).format(new Date(`${e}T00:00:00`)):"-"}function Qu(e){return String(e||"").trim().toLowerCase()}function Vs(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function jr(e){return e==null||e===""?"":Ht(String(e))||""}function An(e){const t=jr(e);return t?t.slice(0,5):"-"}function Vn(e){const t=Number(e);if(!Number.isFinite(t)||t<0)return"-";const r=Math.floor(t/60),n=t%60;return`${String(r).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function Ti(e){const t=Number(e);if(!Number.isFinite(t))return"-";const r=t<0?"-":"+",n=Math.abs(t),s=Math.floor(n/60),a=n%60;return`${r}${String(s).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function Ei(e){const t=Number(e||0);return Number.isFinite(t)?t<Gu||t>Ju?"text-bg-danger":"text-bg-success":"text-bg-secondary"}function Gs(e){const t=jr(e==null?void 0:e.start_time),r=jr(e==null?void 0:e.end_time),n=jr(e==null?void 0:e.break_start_time),s=jr(e==null?void 0:e.break_end_time),a=n&&s?Ie(n,s):null,i=t&&r?Ie(t,r):null,o=Number.isFinite(i)&&Number.isFinite(a)?Math.max(0,i-a):null;return{startTime:An(e==null?void 0:e.start_time),endTime:An(e==null?void 0:e.end_time),breakStartTime:An(e==null?void 0:e.break_start_time),breakEndTime:An(e==null?void 0:e.break_end_time),breakDuration:a===null?"-":Vn(a),duration:o===null?"-":Vn(o),breakDurationMinutes:a,durationMinutes:o}}function $i(e){const t=(e==null?void 0:e.duties)||{};return Gs({start_time:(e==null?void 0:e.start_time_override)??(t==null?void 0:t.start_time),end_time:(e==null?void 0:e.end_time_override)??(t==null?void 0:t.end_time),break_start_time:(e==null?void 0:e.break_start_time_override)??(t==null?void 0:t.break_start_time),break_end_time:(e==null?void 0:e.break_end_time_override)??(t==null?void 0:t.break_end_time)})}function Cn(e){return e?`${String(e).slice(0,5)}:00`:null}async function Yu(e,t,r){var f,w,y,v,b;if((e.dataset.indexMode||"default")!=="crew")return;const s=e.dataset.indexEmployeeId||"",a=(((f=e.querySelector("#index-actual-duty-edit-id"))==null?void 0:f.value)||"").trim(),i=(((w=e.querySelector("#index-actual-duty-start"))==null?void 0:w.value)||"").trim(),o=(((y=e.querySelector("#index-actual-duty-end"))==null?void 0:y.value)||"").trim(),l=(((v=e.querySelector("#index-actual-duty-break-start"))==null?void 0:v.value)||"").trim(),d=(((b=e.querySelector("#index-actual-duty-break-end"))==null?void 0:b.value)||"").trim(),c=e.querySelector("#index-actual-duty-edit-save");if(!a||!i||!o||!l||!d){g("Попълни всички полета.","warning");return}const u=Ie(i,o);if(Ie(l,d)>u){g("Прекъсването не може да е по-голямо от продължителността.","warning");return}const m=(c==null?void 0:c.innerHTML)||"Запази";c&&(c.disabled=!0,c.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...');const{error:h}=await S.from("actual_duties").update({start_time_override:Cn(i),end_time_override:Cn(o),break_start_time_override:Cn(l),break_end_time_override:Cn(d)}).eq("id",a);if(c&&(c.disabled=!1,c.innerHTML=m),h){g(h.message||"Редакцията не беше запазена.","error");return}r(e),await t(e,s,ir.visibleMonth),g("Реалната повеска е обновена.","success")}function Xu(e){const t=Qu(e);return t==="chief"?"Началник влак":t==="conductor"?"Кондуктор":t==="driver"?"Машинист":t==="assistant_driver"?"Пом. машинист":"Кондуктор"}function je(e,t,r){const n=e.querySelector(t);n&&(n.textContent=r)}async function Zu(e){const{data:t}=await S.auth.getSession(),r=(t==null?void 0:t.session)||null,n=(r==null?void 0:r.user)||null;if(!(n!=null&&n.id))return je(e,"#index-welcome-title","Добре дошъл в TrainCrewHub"),je(e,"#index-welcome-subtitle","Влез в профила си, за да видиш персонална информация."),{userId:"",employeeId:"",roles:[],crew:!1,mode:"default"};const[{data:s},{data:a}]=await Promise.all([S.from("user_profiles").select("username, employee_id, employees(first_name, last_name)").eq("id",n.id).maybeSingle(),S.from("user_roles").select("role").eq("user_id",n.id)]),i=(s==null?void 0:s.username)||n.email||n.id,o=s!=null&&s.employees?`${s.employees.first_name||""} ${s.employees.last_name||""}`.trim():"",l=[...new Set((a||[]).map(c=>String((c==null?void 0:c.role)||"").trim()).filter(Boolean))],d=Ru(l);return je(e,"#index-welcome-title",`Здравей, ${i}${o?` | ${o}`:""}`),je(e,"#index-welcome-subtitle","Тук виждаш твоя профил и бърз оперативен преглед за деня."),{userId:n.id,employeeId:(s==null?void 0:s.employee_id)||"",roles:l,crew:ka(l),mode:d}}function Ai(e){const t=["text-bg-primary","text-bg-success","text-bg-warning","text-bg-danger","text-bg-info","text-bg-dark"],r=String(e||"").trim().toLowerCase();if(!r)return t[0];const n={бо:"text-bg-warning",do:"text-bg-danger",до:"text-bg-danger",болничен:"text-bg-warning",отпуск:"text-bg-primary",командировка:"text-bg-info"};if(n[r])return n[r];let s=0;for(let a=0;a<r.length;a+=1)s=(s*31+r.charCodeAt(a))%2147483647;return t[Math.abs(s)%t.length]}async function Js(e){var c;const t=or(),[r,n,s,a,i]=await Promise.all([S.from("planned_duties").select("id",{count:"exact",head:!0}).eq("date",t),S.from("actual_duties").select("id",{count:"exact",head:!0}).eq("date",t),S.from("employee_absences").select("id",{count:"exact",head:!0}).lte("start_date",t).gte("end_date",t),S.from("employees").select("id",{count:"exact",head:!0}).eq("is_active",!0),S.from("schedule_publications").select("is_confirmed").eq("schedule_date",t).maybeSingle()]);[r,n,s,a,i].some(u=>u.error)&&g("Част от данните за индекс страницата не могат да се заредят.","warning");const d=!!((c=i==null?void 0:i.data)!=null&&c.is_confirmed)?Number(n.count??0):0;je(e,"#index-kpi-planned",String(r.count??0)),je(e,"#index-kpi-actual",String(d)),je(e,"#index-kpi-absences",String(s.count??0)),je(e,"#index-kpi-employees",String(a.count??0)),je(e,"#index-last-updated",`Последно обновяване: ${Kr(new Date)}`)}async function Wo(e){await Tu(e,{setText:je,formatDateTime:Kr,escapeHtml:Vs})}function ep(e,t,r,n){const s=e.querySelector("#index-refresh"),a=e.querySelector("#index-certificates-panel"),i=e.querySelector("#index-absences-panel"),o=e.querySelector("#index-workload-date"),l=e.querySelector("#index-workload-refresh"),{loadCrewMonthlySnapshot:d,renderCrewCalendarAndDetails:c}=r,{openCrewActualDutyEditModal:u,openCrewTimetablePreview:p,closeCrewTimetablePreview:m,closeCrewActualDutyEditModal:h}=n;Iu(e,{loadCrewMonthlySnapshot:d,crewCalendarState:ir,toMonthKey:ar,shiftMonthKey:Mu,getTodayIsoDate:or,renderCrewCalendarAndDetails:c,openCrewActualDutyEditModal:u,openCrewTimetablePreview:p,closeCrewTimetablePreview:m,closeCrewActualDutyEditModal:h,saveCrewActualDutyEdits:f=>Yu(f,d,h)}),s==null||s.addEventListener("click",async()=>{const f=e.dataset.indexMode||"default";if(f==="admin"){s.disabled=!0,await Wo(e),s.disabled=!1;return}if(It(f)){s.disabled=!0,await t.loadHeadOfTransportSnapshot(e),s.disabled=!1;return}f!=="crew"&&(s.disabled=!0,await Js(e),s.disabled=!1)}),a==null||a.addEventListener("click",f=>{const w=f.target.closest("button[data-index-cert-action]");if(!w)return;const y=e.dataset.indexMode||"default";if(!It(y))return;const v=w.getAttribute("data-index-cert-action")||"";if(v==="toggle-soon"){t.toggleCertificateDetails(e,"soon");return}v==="toggle-expired"&&t.toggleCertificateDetails(e,"expired")}),i==null||i.addEventListener("click",f=>{const w=f.target.closest("button[data-index-absence-action]");if(!w)return;const y=e.dataset.indexMode||"default";if(!It(y)||(w.getAttribute("data-index-absence-action")||"")!=="toggle-reason")return;const b=w.getAttribute("data-index-absence-key")||"";t.toggleAbsenceReasonDetails(e,b)}),o==null||o.addEventListener("change",async()=>{const f=e.dataset.indexMode||"default";It(f)&&await t.loadHeadOfTransportWorkload(e)}),l==null||l.addEventListener("click",async()=>{const f=e.dataset.indexMode||"default";It(f)&&(l.disabled=!0,await t.loadHeadOfTransportWorkload(e),l.disabled=!1)})}async function tp(e){e.innerHTML=Lu;const t=Au({loadKpiSnapshot:Js,getTodayIsoDate:or,formatDate:Li,escapeHtml:Vs,formatMinutesAsClock:Vn,formatSignedMinutesAsClock:Ti,getDeviationClassByThreshold:Ei,parseIsoDateSafe:en,toMonthKey:ar,getMonthBounds:Ss,countBulgarianWorkdays:ki,getDutyTimingSummary:Gs,getActualDutyTimingSummary:$i,getDistinctBadgeClassByReason:Ai}),r=Pu({crewCalendarState:ir,setText:je,getTodayIsoDate:or,toMonthKey:ar,toIsoDateFromDate:wt,parseMonthKey:is,formatMonthLabel:ju,getMonthBounds:Ss,formatDate:Li,formatDateTime:Kr,escapeHtml:Vs,countBulgarianWorkdays:ki,getDutyTimingSummary:Gs,getActualDutyTimingSummary:$i,formatMinutesAsClock:Vn,formatSignedMinutesAsClock:Ti,getDeviationClassByThreshold:Ei,formatRoleLabel:Xu,getDistinctBadgeClassByReason:Ai}),n=Du({crewCalendarState:ir,ensureCrewSelectedDate:r.ensureCrewSelectedDate,renderCrewCalendar:r.renderCrewCalendar,renderCrewHoursSummary:r.renderCrewHoursSummary,renderCrewSelectedDayDetails:r.renderCrewSelectedDayDetails,toMonthKey:ar,getMonthBounds:Ss,loadSchedulePublicationDates:(a,i)=>zu(S,a,i),loadScheduleChangesSummary:(a,i)=>Wu(S,a,i,Kr),formatDateTime:Kr,setText:je});ep(e,t,n,r);const s=await Zu(e);if(Vu(e,s,{setText:je,isTransportAnalyticsMode:It,getTodayIsoDate:or}),(s==null?void 0:s.mode)==="crew"){const a=ar(new Date);ir.visibleMonth=a,ir.selectedDate=or(),await n.loadCrewMonthlySnapshot(e,s.employeeId||"",a);return}if((s==null?void 0:s.mode)==="admin"){await Wo(e);return}if(It((s==null?void 0:s.mode)||"default")){await t.loadHeadOfTransportSnapshot(e);return}await Js(e)}const rp=`<section class="card border-0 shadow-sm" style="max-width: 400px; margin: 0 auto;">\r
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
`;async function np({attempts:e=10,delayMs:t=120}={}){var r,n;for(let s=0;s<e;s+=1){const{data:a}=await S.auth.getSession();if((n=(r=a==null?void 0:a.session)==null?void 0:r.user)!=null&&n.id)return!0;await new Promise(i=>{window.setTimeout(i,t)})}return!1}async function sp(e){e.innerHTML=rp,ap(e),ip(e)}function ap(e){e.querySelectorAll("button[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const r=t.getAttribute("data-toggle-password")||"",n=e.querySelector(`#${r}`);if(!n)return;const s=n.type==="password";n.type=s?"text":"password",t.textContent=s?"🙈":"👁",t.setAttribute("aria-label",s?"Скрий паролата":"Покажи паролата")})})}function ip(e){const t=e.querySelector("#login-form");t&&t.addEventListener("submit",async r=>{var p,m,h,f,w;r.preventDefault();const n=t.querySelector('input[name="identifier"]').value.trim(),s=t.querySelector('input[name="password"]').value;if(!n||!s){g("Попълни имейл/потребителско име и парола.","warning");return}let a=n;if(!n.includes("@")){const{data:y}=await S.rpc("resolve_login_email",{input_username:n});y&&(a=String(y).trim())}const i=t.querySelector('button[type="submit"]'),o=i.innerHTML;i.disabled=!0,i.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Влизане...';const{data:l,error:d}=await S.auth.signInWithPassword({email:a,password:s});if(i.disabled=!1,i.innerHTML=o,d){g("Невалидни данни за вход.","error");return}const c=((p=l==null?void 0:l.user)==null?void 0:p.id)||((h=(m=l==null?void 0:l.session)==null?void 0:m.user)==null?void 0:h.id)||"";if(c&&!await Bo(c)){await S.auth.signOut(),g("Профилът е деактивиран. Свържи се с администратор.","warning");return}if(g("Успешен вход.","success"),!(!!((w=(f=l==null?void 0:l.session)==null?void 0:f.user)!=null&&w.id)||await np())){g("Влизането е успешно, но сесията не е активирана. Опитай отново.","warning");return}window.history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))})}const op=`<section class="card border-0 shadow-sm" style="max-width: 400px; margin: 0 auto;">\r
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
`;async function lp(e){e.innerHTML=op,dp(e),cp(e)}function dp(e){e.querySelectorAll("button[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const r=t.getAttribute("data-toggle-password")||"",n=e.querySelector(`#${r}`);if(!n)return;const s=n.type==="password";n.type=s?"text":"password",t.textContent=s?"🙈":"👁";const a=r.includes("confirm"),i=a?"Покажи потвърждението на паролата":"Покажи паролата",o=a?"Скрий потвърждението на паролата":"Скрий паролата";t.setAttribute("aria-label",s?o:i)})})}function cp(e){const t=e.querySelector("#register-form");t&&t.addEventListener("submit",async r=>{var y;r.preventDefault();const n=t.querySelector('input[name="username"]').value.trim(),s=t.querySelector('input[name="email"]').value.trim(),a=t.querySelector('input[name="first_name"]').value.trim(),i=t.querySelector('input[name="last_name"]').value.trim(),o=t.querySelector('input[name="password"]').value,l=t.querySelector('input[name="confirm-password"]').value;if(!n||!s||!a||!i||!o||!l){g("Моля, попълни всички полета.","warning");return}if(!/^[A-Za-z0-9_]{3,30}$/.test(n)){g("Потребителското име трябва да е 3-30 символа и да съдържа само латински букви, цифри и _.","warning");return}const c=/[\u0400-\u04FF]/;if(c.test(o)||c.test(l)){g("Паролата не трябва да съдържа кирилица.","warning");return}if(o!==l){g("Паролите не съвпадат.","warning");return}const u=t.querySelector('button[type="submit"]'),p=u.innerHTML;u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Регистрация...';const{data:m,error:h}=await S.auth.signUp({email:s,password:o,options:{data:{username:n,first_name:a,last_name:i}}});if(h){u.disabled=!1,u.innerHTML=p,g(h.message,"error");return}const f=(y=m.user)==null?void 0:y.id;if(f){const{error:v}=await S.from("user_profiles").upsert({id:f,username:n,email:s,first_name:a,last_name:i,created_from:s},{onConflict:"id"});if(v){u.disabled=!1,u.innerHTML=p,g(v.message,"error");return}}if(!!!m.session){const{error:v}=await S.auth.signInWithPassword({email:s,password:o});if(v){u.disabled=!1,u.innerHTML=p,g("Регистрацията е успешна, но автоматичният вход е достъпен след имейл потвърждение.","warning"),window.history.pushState({},"","/login"),window.dispatchEvent(new PopStateEvent("popstate"));return}}u.disabled=!1,u.innerHTML=p,g("Регистрацията е успешна. Вече си влязъл в системата.","success"),window.history.pushState({},"","/"),window.dispatchEvent(new PopStateEvent("popstate"))})}const up=`<section class="card border-0 shadow-sm" style="max-width: 440px; margin: 0 auto;">\r
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
`;function pp(){return`${window.location.origin}/reset-password`}async function hp(e){if(e.includes("@"))return e;const{data:t}=await S.rpc("resolve_login_email",{input_username:e});return String(t||"").trim()}async function mp(e){e.innerHTML=up;const t=e.querySelector("#forgot-password-form");t&&t.addEventListener("submit",async r=>{var i;r.preventDefault();const n=(((i=t.querySelector('input[name="identifier"]'))==null?void 0:i.value)||"").trim();if(!n){g("Въведи имейл или потребителско име.","warning");return}const s=t.querySelector('button[type="submit"]'),a=(s==null?void 0:s.innerHTML)||"Изпрати линк";s&&(s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изпращане...');try{const o=await hp(n);o&&await S.auth.resetPasswordForEmail(o,{redirectTo:pp()})}catch{}s&&(s.disabled=!1,s.innerHTML=a),g("Ако акаунтът съществува, изпратихме инструкции за смяна на паролата.","success"),t.reset()})}const fp=`<section class="card border-0 shadow-sm" style="max-width: 460px; margin: 0 auto;">\r
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
`;function yp(e){e.querySelectorAll("button[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const r=t.getAttribute("data-toggle-password")||"",n=e.querySelector(`#${r}`);if(!n)return;const s=n.type==="password";n.type=s?"text":"password",t.textContent=s?"🙈":"👁";const a=r.includes("confirm"),i=a?"Покажи потвърждението на новата парола":"Покажи новата парола",o=a?"Скрий потвърждението на новата парола":"Скрий новата парола";t.setAttribute("aria-label",s?o:i)})})}function bp(){const e=String(window.location.hash||"").replace(/^#/,""),t=new URLSearchParams(e);return{accessToken:t.get("access_token")||"",refreshToken:t.get("refresh_token")||"",type:t.get("type")||""}}async function vp(){const t=new URLSearchParams(window.location.search).get("code")||"";if(t){const{error:s}=await S.auth.exchangeCodeForSession(t);if(!s)return!0}const r=bp();if(r.type!=="recovery"||!r.accessToken||!r.refreshToken)return!1;const{error:n}=await S.auth.setSession({access_token:r.accessToken,refresh_token:r.refreshToken});return n?!1:(window.history.replaceState({},"","/reset-password"),!0)}async function gp(e){var i,o;e.innerHTML=fp,yp(e);const t=e.querySelector("#reset-password-info"),r=e.querySelector("#reset-password-submit"),n=e.querySelector("#reset-password-form"),{data:s}=await S.auth.getSession();let a=!!((o=(i=s==null?void 0:s.session)==null?void 0:i.user)!=null&&o.id);if(a||(a=await vp()),!a){t&&(t.textContent="Линкът е невалиден или е изтекъл. Заяви нов линк за възстановяване.",t.className="text-warning small mb-4 text-center"),r&&(r.disabled=!0);return}t&&(t.textContent="Въведи нова парола за профила си."),r&&(r.disabled=!1),n==null||n.addEventListener("submit",async l=>{var h,f;l.preventDefault();const d=(((h=e.querySelector("#reset-password"))==null?void 0:h.value)||"").trim(),c=(((f=e.querySelector("#reset-password-confirm"))==null?void 0:f.value)||"").trim();if(!d||!c){g("Попълни и двете полета за парола.","warning");return}if(d.length<6){g("Паролата трябва да е поне 6 символа.","warning");return}const u=/[\u0400-\u04FF]/;if(u.test(d)||u.test(c)){g("Паролата не трябва да съдържа кирилица.","warning");return}if(d!==c){g("Паролите не съвпадат.","warning");return}const p=(r==null?void 0:r.innerHTML)||"Запази нова парола";r&&(r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...');const{error:m}=await S.auth.updateUser({password:d});if(r&&(r.disabled=!1,r.innerHTML=p),m){g(m.message||"Неуспешна смяна на паролата.","error");return}g("Паролата е сменена успешно.","success"),window.history.pushState({},"","/login"),window.dispatchEvent(new PopStateEvent("popstate"))})}const _p=`<section class="card border-0 shadow-sm">\r
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
`,wp=3e4;let Nn=null,zr=null;function Ci(){Nn&&(window.clearInterval(Nn),Nn=null),zr&&(window.removeEventListener("route:changed",zr),zr=null)}function Ri(){window.location.pathname==="/pending-access"&&window.dispatchEvent(new PopStateEvent("popstate"))}async function Sp(e){Ci(),e.innerHTML=_p;const t=e.querySelector("#pending-access-refresh"),r=e.querySelector("#pending-access-logout");t==null||t.addEventListener("click",()=>{Ri()}),r==null||r.addEventListener("click",async()=>{const{error:n}=await S.auth.signOut();if(n){g(n.message,"error");return}g("Излезе успешно от системата.","success"),window.history.replaceState({},"","/login"),window.dispatchEvent(new PopStateEvent("popstate"))}),Nn=window.setInterval(()=>{Ri()},wp),zr=()=>{window.location.pathname!=="/pending-access"&&Ci()},window.addEventListener("route:changed",zr)}const kp=`<section class="card border-0 shadow-sm">\r
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
`;function ks(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Ii=new Map;function xp(e,t){const r=Ii.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){yr(a);return}}};Ii.set(e,n),document.addEventListener("keydown",n)}function yr(e){var t,r;e.classList.add("d-none"),(t=document.querySelector("#schedule-key-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#schedule-key-delete-modal"))!=null&&r.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Be(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const he={rows:[],filters:{name:"",type:"",crewRole:"",isActive:"",validFrom:"",validTo:""}};async function xa(e){const{data:t,error:r}=await S.from("schedule_keys").select("id, name, is_active, type, crew_role, valid_from, valid_to").order("valid_from",{ascending:!1});if(r){g(r.message,"error"),he.rows=[],et(e,"Грешка при зареждане на Ключ-График.");return}he.rows=t||[],et(e)}function et(e,t){const r=e.querySelector("#schedule-keys-table-body"),n=e.querySelector("#schedule-keys-empty"),s=he.rows.filter(a=>{const i=!he.filters.name||(a.name||"").toLowerCase().includes(he.filters.name),o=!he.filters.type||a.type===he.filters.type,l=!he.filters.crewRole||a.crew_role===he.filters.crewRole,d=!he.filters.isActive||String(!!a.is_active)===he.filters.isActive,c=!he.filters.validFrom||a.valid_from===he.filters.validFrom,u=!he.filters.validTo||a.valid_to===he.filters.validTo;return i&&o&&l&&d&&c&&u});if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма записи по зададените филтри.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>`
        <tr>
          <td>${Be(a.name??"-")}</td>
          <td>${Be(a.type??"-")}</td>
          <td>${Be(a.crew_role??"-")}</td>
          <td>${a.is_active?"Да":"Не"}</td>
          <td>${Be(a.valid_from??"-")}</td>
          <td>${Be(a.valid_to??"-")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${a.id}"
                data-name="${Be(a.name??"")}"
                data-type="${Be(a.type??"seasonal")}"
                data-crew-role="${Be(a.crew_role??"кондуктор")}"
                data-active="${a.is_active?"true":"false"}"
                data-valid-from="${Be(a.valid_from??"")}"
                data-valid-to="${Be(a.valid_to??"")}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="duties"
                data-id="${a.id}"
                data-name="${Be(a.name??"")}"
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
      `).join("")}async function qp(e){e.innerHTML=kp,Lp(e),await xa(e)}function Lp(e){const t=e.querySelector("#open-create-schedule-key"),r=e.querySelector("#schedule-keys-form"),n=e.querySelector("#schedule-key-cancel-btn"),s=e.querySelector("#schedule-keys-table-body"),a=e.querySelector("#schedule-key-modal"),i=e.querySelector("#schedule-key-delete-modal"),o=e.querySelector("#schedule-key-modal-close"),l=e.querySelector("#schedule-key-delete-confirm"),d=e.querySelector("#schedule-key-delete-cancel"),c=e.querySelector("#filter-name"),u=e.querySelector("#filter-type"),p=e.querySelector("#filter-crew-role"),m=e.querySelector("#filter-active"),h=e.querySelector("#filter-valid-from"),f=e.querySelector("#filter-valid-to"),w=e.querySelector("#filter-reset");t==null||t.addEventListener("click",()=>{qa(e),ks(a)}),r==null||r.addEventListener("submit",async y=>{y.preventDefault(),await Tp(e)}),n==null||n.addEventListener("click",()=>{yr(a)}),o==null||o.addEventListener("click",()=>{yr(a)}),d==null||d.addEventListener("click",()=>{yr(i)}),c==null||c.addEventListener("input",y=>{he.filters.name=y.target.value.trim().toLowerCase(),et(e)}),u==null||u.addEventListener("change",y=>{he.filters.type=y.target.value,et(e)}),p==null||p.addEventListener("change",y=>{he.filters.crewRole=y.target.value,et(e)}),m==null||m.addEventListener("change",y=>{he.filters.isActive=y.target.value,et(e)}),h==null||h.addEventListener("change",y=>{he.filters.validFrom=y.target.value,et(e)}),f==null||f.addEventListener("change",y=>{he.filters.validTo=y.target.value,et(e)}),w==null||w.addEventListener("click",()=>{he.filters={name:"",type:"",crewRole:"",isActive:"",validFrom:"",validTo:""},c&&(c.value=""),u&&(u.value=""),p&&(p.value=""),m&&(m.value=""),h&&(h.value=""),f&&(f.value=""),et(e)}),xp("schedule-keys",[i,a]),l==null||l.addEventListener("click",async()=>{const y=e.querySelector("#schedule-key-delete-id").value;await $p(y,e)}),s==null||s.addEventListener("click",async y=>{const v=y.target.closest("button[data-action]");if(!v)return;const b=v.getAttribute("data-action");if(b==="edit"){Ep(e,{id:v.getAttribute("data-id"),name:v.getAttribute("data-name"),type:v.getAttribute("data-type"),crewRole:v.getAttribute("data-crew-role")||"кондуктор",isActive:v.getAttribute("data-active")==="true",validFrom:v.getAttribute("data-valid-from"),validTo:v.getAttribute("data-valid-to")}),ks(a);return}if(b==="delete"){const _=v.getAttribute("data-id");e.querySelector("#schedule-key-delete-id").value=_,ks(i);return}if(b==="duties"){const _=v.getAttribute("data-id"),k=v.getAttribute("data-name")||"",x=new URLSearchParams({scheduleKeyId:_,scheduleKeyName:k});window.history.pushState({},"",`/schedule-key-duties?${x.toString()}`),window.dispatchEvent(new PopStateEvent("popstate"))}})}async function Tp(e){var b;const t=e.querySelector("#schedule-key-id"),r=e.querySelector("#schedule-key-name"),n=e.querySelector("#schedule-key-type"),s=e.querySelector("#schedule-key-crew-role"),a=e.querySelector("#schedule-key-active"),i=e.querySelector("#schedule-key-valid-from"),o=e.querySelector("#schedule-key-valid-to"),l=e.querySelector("#schedule-key-save-btn"),d=r.value.trim(),c=n.value,u=s.value,p=a.checked,m=i.value,h=o.value,f=t.value;if(!d||!c||!u||!m||!h){g("Моля, попълни всички задължителни полета.","warning");return}if(!["началник влак","кондуктор"].includes(u)){g("Невалидна стойност за екип.","warning");return}if(h<m){g('Полето "До дата" трябва да е след "От дата".',"warning");return}const w=l.innerHTML;l.disabled=!0,l.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const y={name:d,type:c,crew_role:u,is_active:p,valid_from:m,valid_to:h};let v;if(f)({error:v}=await S.from("schedule_keys").update(y).eq("id",f));else{const{data:_}=await S.auth.getUser(),k=((b=_==null?void 0:_.user)==null?void 0:b.email)??"web_app";({error:v}=await S.from("schedule_keys").insert({...y,created_from:k}))}if(l.disabled=!1,l.innerHTML=w,v){g(Vo(v),"error");return}g(f?"Записът е обновен.":"Записът е създаден.","success"),yr(e.querySelector("#schedule-key-modal")),qa(e),await xa(e)}function Ep(e,t){e.querySelector("#schedule-key-id").value=t.id,e.querySelector("#schedule-key-name").value=t.name??"",e.querySelector("#schedule-key-type").value=t.type??"seasonal",e.querySelector("#schedule-key-crew-role").value=t.crewRole??"кондуктор",e.querySelector("#schedule-key-active").checked=!!t.isActive,e.querySelector("#schedule-key-valid-from").value=t.validFrom??"",e.querySelector("#schedule-key-valid-to").value=t.validTo??"",e.querySelector("#schedule-keys-form-title").textContent="Редакция на Ключ-График",e.querySelector("#schedule-key-save-btn").textContent="Запази",e.querySelector("#schedule-key-cancel-btn").classList.remove("d-none")}function qa(e){e.querySelector("#schedule-key-id").value="",e.querySelector("#schedule-key-name").value="",e.querySelector("#schedule-key-type").value="seasonal",e.querySelector("#schedule-key-crew-role").value="кондуктор",e.querySelector("#schedule-key-active").checked=!0,e.querySelector("#schedule-key-valid-from").value="",e.querySelector("#schedule-key-valid-to").value="",e.querySelector("#schedule-keys-form-title").textContent="Нов Ключ-График",e.querySelector("#schedule-key-save-btn").textContent="Създай",e.querySelector("#schedule-key-cancel-btn").classList.add("d-none")}async function $p(e,t){const r=t.querySelector("#schedule-key-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("schedule_keys").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,s){g(Vo(s),"error");return}g("Записът е изтрит.","success"),yr(t.querySelector("#schedule-key-delete-modal")),qa(t),await xa(t)}function Vo(e){const t=String((e==null?void 0:e.message)||"").trim(),r=t.toLowerCase();return String((e==null?void 0:e.code)||"").trim()==="23503"||r.includes("foreign key constraint")||r.includes("duties_schedule_key_id_fkey")?"Този ключ-график не може да бъде изтрит или променен, защото се използва в повески.":t||"Възникна неочаквана грешка."}const Ap=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">\r
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
      <table class="table align-middle table-mobile-wrap">\r
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
`;function Go({duty:e,scheduleKeyNames:t,trainNumbers:r,attachmentEntries:n,escapeHtml:s,intervalToTimeInput:a,formatInterval:i}){var u;const o=((e==null?void 0:e.start_time)||"-").slice(0,5)||"-",l=((e==null?void 0:e.end_time)||"-").slice(0,5)||"-",d=(a((e==null?void 0:e.break_start_time)||"00:00:00")||"-").slice(0,5)||"-",c=(a((e==null?void 0:e.break_end_time)||"00:00:00")||"-").slice(0,5)||"-";return`
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
            ${(n||[]).length?(n||[]).map(p=>{const m=(p==null?void 0:p.label)||"Файл",h=(p==null?void 0:p.url)||"#";return`
          <div class="d-flex align-items-center gap-2 mb-1">
            <button
              type="button"
              class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
              data-duty-profile-action="preview-attachment"
              data-url="${s(h)}"
              data-label="${s(m)}"
              title="Преглед: ${s(m)}"
              aria-label="Преглед: ${s(m)}"
            >
              👁
            </button>
            <a href="${s(h)}" target="_blank" rel="noopener noreferrer">${s(m)}</a>
          </div>
        `}).join(""):"-"}
          </div>
        </div>
      </div>
    </div>
  `}function Qs({idPrefix:e}){return`
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
  `}function Ut(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Di=new Map;function Cp(e,t){const r=Di.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Ve(a);return}}};Di.set(e,n),document.addEventListener("keydown",n)}function Ve(e){var t,r,n,s;e.classList.add("d-none"),(t=document.querySelector("#duty-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#duty-delete-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#duty-profile-modal"))!=null&&n.classList.contains("d-none"))&&((s=document.querySelector("#duty-attachment-preview-modal"))!=null&&s.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Oi(e){return e?typeof e=="string"?e.replace(".000000",""):String(e):"-"}function pe(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Rn=8,Q={allDuties:[],searchQuery:"",scheduleKeyFilter:"",dutyTypeFilter:"",currentPage:1,draggedDutyId:null,reorderEnabled:!0};async function os(e){const{data:t,error:r}=await S.from("duties").select("id, name, notes, duty_files, duty_type_id, start_time, end_time, second_day, break_start_time, break_end_time, break_duration_interval, duration_interval, display_order, duty_types(name), schedule_key_duties(schedule_key_id, schedule_keys(name)), duty_trains(train_id, sequence_order, trains(number))").order("display_order",{ascending:!0}).order("name",{ascending:!0});if(r){g(r.message,"error"),Q.allDuties=[],tt(e,"Грешка при зареждане на повеските.");return}Q.allDuties=t||[],tt(e)}async function Rp(){const e=Q.allDuties.map((n,s)=>S.from("duties").update({display_order:s+1}).eq("id",n.id)),r=(await Promise.all(e)).find(n=>n.error);return r!=null&&r.error?(g(r.error.message,"error"),!1):(Q.allDuties=Q.allDuties.map((n,s)=>({...n,display_order:s+1})),!0)}function tt(e,t){const r=e.querySelector("#duties-table-body"),n=e.querySelector("#duties-empty"),s=e.querySelector("#duties-pagination"),a=e.querySelector("#duties-page-info"),i=e.querySelector("#duties-prev-page"),o=e.querySelector("#duties-next-page");Mp(e),jp(e);const l=Q.allDuties.filter(h=>{var x;const f=(h.name||"").toLowerCase(),w=(((x=h.duty_types)==null?void 0:x.name)||"").toLowerCase(),y=Ys(h).map(L=>L.toLowerCase()),v=Dp(h).join(" ").toLowerCase(),b=!Q.searchQuery||f.includes(Q.searchQuery)||v.includes(Q.searchQuery),_=!Q.scheduleKeyFilter||y.includes(Q.scheduleKeyFilter),k=!Q.dutyTypeFilter||w===Q.dutyTypeFilter;return b&&_&&k});if(!l.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени повески.",s.classList.add("d-none");return}n.classList.add("d-none");const d=Math.max(1,Math.ceil(l.length/Rn));Q.currentPage>d&&(Q.currentPage=d),Q.currentPage<1&&(Q.currentPage=1);const c=(Q.currentPage-1)*Rn,u=c+Rn,p=l.slice(c,u),m=Q.reorderEnabled!==!1;if(r.innerHTML=p.map(h=>{var _;const f=Ys(h),w=Ip(h);Op(h);const y=Pp(h),v=`<span class="badge text-bg-info" title="${pe(f.join(", "))}">${w.length} кл-гр</span>`,b=y>0?`<span class="badge text-bg-secondary" title="Прикачени файлове">${y} док.</span>`:"";return`
        <tr data-duty-id="${h.id}" draggable="${m?"true":"false"}">
          <td class="text-secondary">${m?"↕":""}</td>
          <td>
            <div class="d-flex align-items-center gap-2 flex-wrap">
              ${v}
              ${b}
              <span class="duties-name-ellipsis" title="${pe(h.name??"-")}">${pe(h.name??"-")}</span>
            </div>
          </td>
          <td>${pe(((_=h.duty_types)==null?void 0:_.name)??"-")}</td>
          <td>${pe(h.start_time??"-")}</td>
          <td>${pe(h.end_time??"-")}</td>
          <td>${pe(Oi(h.break_duration_interval))}</td>
          <td>${pe(Oi(h.duration_interval))}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="profile"
                data-id="${h.id}"
              >
                Профил
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${h.id}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="duplicate"
                data-id="${h.id}"
              >
                Копирай
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${h.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join(""),l.length<=Rn){s.classList.add("d-none");return}s.classList.remove("d-none"),a.textContent=`Страница ${Q.currentPage} от ${d}`,i.disabled=Q.currentPage<=1,o.disabled=Q.currentPage>=d}function Jo(e){return Array.isArray(e.schedule_key_duties)?e.schedule_key_duties:e.schedule_key_duties?[e.schedule_key_duties]:[]}function Qo(e){return Array.isArray(e.duty_trains)?e.duty_trains:e.duty_trains?[e.duty_trains]:[]}function Ys(e){const t=Jo(e).map(r=>{var n;return(n=r==null?void 0:r.schedule_keys)==null?void 0:n.name}).filter(Boolean);return[...new Set(t)]}function Ip(e){const t=Jo(e).map(r=>r==null?void 0:r.schedule_key_id).filter(Boolean);return[...new Set(t)]}function Dp(e){const t=Qo(e).map(r=>{var n;return(n=r==null?void 0:r.trains)==null?void 0:n.number}).filter(Boolean);return[...new Set(t)]}function Op(e){const t=Qo(e).map(r=>({trainId:r==null?void 0:r.train_id,sequenceOrder:Number.isFinite(Number(r==null?void 0:r.sequence_order))?Number(r.sequence_order):Number.MAX_SAFE_INTEGER})).filter(r=>!!r.trainId).sort((r,n)=>r.sequenceOrder-n.sequenceOrder);return[...new Set(t.map(r=>r.trainId))]}function Pp(e){const t=String((e==null?void 0:e.duty_files)||"").trim();if(!t)return 0;if(t.startsWith("["))try{const r=JSON.parse(t);if(Array.isArray(r))return r.filter(n=>String((n==null?void 0:n.url)||"").trim()).length}catch{return 1}return t.split(`
`).map(r=>r.trim()).filter(Boolean).length}function Mp(e){const t=e.querySelector("#duties-type-filter");if(!t)return;const r=Q.dutyTypeFilter||"",n=[...new Set(Q.allDuties.map(s=>{var a;return String(((a=s==null?void 0:s.duty_types)==null?void 0:a.name)||"").trim()}).filter(Boolean))].sort((s,a)=>s.localeCompare(a,"bg"));t.innerHTML=`
    <option value="">Всички</option>
    ${n.map(s=>`<option value="${pe(s.toLowerCase())}">${pe(s)}</option>`).join("")}
  `,t.value=r}function jp(e){const t=e.querySelector("#duties-schedule-key-filter");if(!t)return;const r=Q.scheduleKeyFilter||"",n=[...new Set(Q.allDuties.flatMap(s=>Ys(s)).map(s=>String(s||"").trim()).filter(Boolean))].sort((s,a)=>s.localeCompare(a,"bg"));t.innerHTML=`
    <option value="">Всички</option>
    ${n.map(s=>`<option value="${pe(s.toLowerCase())}">${pe(s)}</option>`).join("")}
  `,t.value=r}let Lr="",Yt=null;async function Np(){var i,o;const{data:e,error:t}=await S.auth.getSession();if(t)return Lr="",Yt=[],[];const r=((o=(i=e==null?void 0:e.session)==null?void 0:i.user)==null?void 0:o.id)||"";if(!r)return Lr="",Yt=[],[];if(Yt&&Lr===r)return Yt;const{data:n,error:s}=await S.from("user_roles").select("role").eq("user_id",r);if(s)return Lr=r,Yt=[],[];const a=[...new Set((n||[]).map(l=>String((l==null?void 0:l.role)||"").trim()).filter(Boolean))];return Lr=r,Yt=a,a}async function mn(){const e=await Np();return ka(e)}const tn="duty-files",rn=5;async function Hp(e){e.innerHTML=Ap,Q.reorderEnabled=!await mn(),Up(e),Kp(e),await Bp(e),await zp(e),await Fp(e),await os(e)}function Up(e){const t=e.querySelector("#duty-form-fields");t&&(t.innerHTML=`
    ${Qs({idPrefix:"duty"})}

    <div class="col-12">
      <label for="duty-attachment-file" class="form-label">Файлове</label>
      <input id="duty-attachment-file" class="form-control" type="file" multiple />
      <div class="form-text">Може да добавиш до ${rn} файла общо.</div>
    </div>

    <div id="duty-current-attachments-wrap" class="col-12 d-none">
      <label class="form-label">Текущи файлове</label>
      <div id="duty-current-attachments-links" class="d-flex flex-column gap-2"></div>
    </div>

    <input type="hidden" id="duty-existing-attachments" />
    <input type="hidden" id="duty-draft-attachments" />
  `)}async function Fp(e){const t=e.querySelector("#duty-trains"),{data:r,error:n}=await S.from("trains").select("id, number, origin_station, destination_station").order("number",{ascending:!0});if(n){g(rh(n),"error");return}const s=(r||[]).map(a=>{const i=`${a.origin_station||"-"} - ${a.destination_station||"-"}`;return`<option value="${a.id}">${pe(a.number||"-")} (${pe(i)})</option>`}).join("");t.innerHTML=s}async function Bp(e){const t=e.querySelector("#duty-type"),{data:r,error:n}=await S.from("duty_types").select("id, name").order("name",{ascending:!0});if(n){g(n.message,"error");return}const s=(r||[]).map(a=>`<option value="${a.id}">${pe(a.name)}</option>`).join("");t.innerHTML='<option value="">Избери тип</option>'+s}function Kp(e){var q,T;const t=e.querySelector("#open-create-duty"),r=e.querySelector("#duty-form"),n=e.querySelector("#duty-cancel-btn"),s=e.querySelector("#duties-table-body"),a=e.querySelector("#duty-modal"),i=e.querySelector("#duty-delete-modal"),o=e.querySelector("#duty-profile-modal"),l=e.querySelector("#duty-attachment-preview-modal"),d=e.querySelector("#duty-modal-close"),c=e.querySelector("#duty-delete-confirm"),u=e.querySelector("#duty-delete-cancel"),p=e.querySelector("#duty-profile-close"),m=e.querySelector("#duty-profile-close-secondary"),h=e.querySelector("#duty-profile-duplicate"),f=e.querySelector("#duty-profile-edit"),w=e.querySelector("#duties-search"),y=e.querySelector("#duties-schedule-key-filter"),v=e.querySelector("#duties-type-filter"),b=e.querySelector("#duties-filter-reset"),_=e.querySelector("#duties-prev-page"),k=e.querySelector("#duties-next-page"),x=e.querySelector("#duty-attachment-file"),L=e.querySelector("#duty-current-attachments-links");t==null||t.addEventListener("click",()=>{La(e),Ut(a)}),r==null||r.addEventListener("submit",async E=>{E.preventDefault(),await Wp(e)}),n==null||n.addEventListener("click",()=>{Ve(a)}),d==null||d.addEventListener("click",()=>{Ve(a)}),u==null||u.addEventListener("click",()=>{Ve(i)}),p==null||p.addEventListener("click",()=>{Ve(o)}),m==null||m.addEventListener("click",()=>{Ve(o)}),(q=e.querySelector("#duty-profile-content"))==null||q.addEventListener("click",E=>{const $=E.target.closest('button[data-duty-profile-action="preview-attachment"]');if(!$)return;const A=String($.getAttribute("data-url")||"").trim(),C=String($.getAttribute("data-label")||"").trim();Pi(e,A,C)}),(T=e.querySelector("#duty-attachment-preview-close"))==null||T.addEventListener("click",()=>{Yp(e)}),f==null||f.addEventListener("click",()=>{var $;const E=(($=o==null?void 0:o.dataset)==null?void 0:$.dutyId)||"";E&&(Ve(o),Mi(e,E))}),h==null||h.addEventListener("click",()=>{var $;const E=(($=o==null?void 0:o.dataset)==null?void 0:$.dutyId)||"";E&&(Ve(o),ji(e,E))}),w==null||w.addEventListener("input",E=>{Q.searchQuery=E.target.value.trim().toLowerCase(),Q.currentPage=1,tt(e)}),v==null||v.addEventListener("change",E=>{Q.dutyTypeFilter=E.target.value||"",Q.currentPage=1,tt(e)}),y==null||y.addEventListener("change",E=>{Q.scheduleKeyFilter=E.target.value||"",Q.currentPage=1,tt(e)}),b==null||b.addEventListener("click",()=>{Q.searchQuery="",Q.scheduleKeyFilter="",Q.dutyTypeFilter="",Q.currentPage=1,w&&(w.value=""),y&&(y.value=""),v&&(v.value=""),tt(e)}),_==null||_.addEventListener("click",()=>{Q.currentPage-=1,tt(e)}),k==null||k.addEventListener("click",()=>{Q.currentPage+=1,tt(e)}),x==null||x.addEventListener("change",()=>{var E;(E=x.files)!=null&&E.length&&x.files.length>rn&&(g(`Може да избереш до ${rn} файла наведнъж.`,"warning"),x.value="")}),L==null||L.addEventListener("input",E=>{const $=E.target.closest(".duty-existing-attachment-label");if(!$)return;const A=Number($.getAttribute("data-index"));if(!Number.isInteger(A)||A<0)return;const C=e.querySelector("#duty-draft-attachments"),I=Ft((C==null?void 0:C.value)||"");I[A]&&(I[A].label=$.value,C&&(C.value=nn(I)||""))}),L==null||L.addEventListener("click",E=>{const $=E.target.closest(".duty-existing-attachment-preview");if($){const W=String($.getAttribute("data-url")||"").trim(),K=String($.getAttribute("data-label")||"").trim();Pi(e,W,K);return}const A=E.target.closest(".duty-existing-attachment-remove");if(!A)return;const C=Number(A.getAttribute("data-index"));if(!Number.isInteger(C)||C<0)return;const I=e.querySelector("#duty-draft-attachments"),R=Ft((I==null?void 0:I.value)||"");R[C]&&(R.splice(C,1),Ta(e,R))}),Cp("duties",[l,o,i,a]),c==null||c.addEventListener("click",async()=>{const E=e.querySelector("#duty-delete-id").value;await Vp(E,e)}),s==null||s.addEventListener("click",async E=>{const $=E.target.closest("button[data-action]");if(!$)return;const A=$.getAttribute("data-action");if(A==="profile"){const C=$.getAttribute("data-id");nh(e,C);return}if(A==="edit"){const C=$.getAttribute("data-id");Mi(e,C);return}if(A==="duplicate"){const C=$.getAttribute("data-id");ji(e,C);return}if(A==="delete"){const C=$.getAttribute("data-id");e.querySelector("#duty-delete-id").value=C,Ut(i)}}),s==null||s.addEventListener("dragstart",E=>{if(!Q.reorderEnabled)return;const $=E.target.closest("tr[data-duty-id]");$&&(Q.draggedDutyId=$.getAttribute("data-duty-id"),$.classList.add("table-active"))}),s==null||s.addEventListener("dragend",E=>{if(!Q.reorderEnabled)return;const $=E.target.closest("tr[data-duty-id]");$&&$.classList.remove("table-active"),Q.draggedDutyId=null}),s==null||s.addEventListener("dragover",E=>{Q.reorderEnabled&&E.preventDefault()}),s==null||s.addEventListener("drop",async E=>{if(!Q.reorderEnabled)return;E.preventDefault();const $=E.target.closest("tr[data-duty-id]"),A=Q.draggedDutyId;if(!$||!A)return;const C=$.getAttribute("data-duty-id");if(!C||C===A)return;const I=Q.allDuties.findIndex(V=>V.id===A),R=Q.allDuties.findIndex(V=>V.id===C);if(I<0||R<0)return;const[W]=Q.allDuties.splice(I,1);if(Q.allDuties.splice(R,0,W),tt(e),!await Rp()){await os(e);return}g("Редът на повеските е запазен.","success")})}async function zp(e){const t=e.querySelector("#duty-schedule-keys"),{data:r,error:n}=await S.from("schedule_keys").select("id, name").order("name",{ascending:!0});if(n){g(n.message,"error");return}const s=(r||[]).map(a=>`<option value="${a.id}">${pe(a.name)}</option>`).join("");t.innerHTML=s}async function Wp(e){var F,Y;const t=e.querySelector("#duty-id"),r=e.querySelector("#duty-name"),n=e.querySelector("#duty-type"),s=e.querySelector("#duty-schedule-keys"),a=e.querySelector("#duty-trains"),i=Nr(e,"#duty-start","#duty-start-time"),o=Nr(e,"#duty-end","#duty-end-time"),l=e.querySelector("#duty-second-day"),d=Nr(e,"#duty-break-start","#duty-break-start-time"),c=Nr(e,"#duty-break-end","#duty-break-end-time"),u=e.querySelector("#duty-notes"),p=e.querySelector("#duty-attachment-file"),m=e.querySelector("#duty-existing-attachments"),h=e.querySelector("#duty-draft-attachments"),f=e.querySelector("#duty-save-btn"),w=r.value.trim(),y=n.value||null,v=Array.from(s.selectedOptions||[]).map(H=>H.value).filter(Boolean),b=Array.from(a.selectedOptions||[]).map(H=>H.value).filter(Boolean),_=v[0]||null,k=(i==null?void 0:i.value)||"",x=(o==null?void 0:o.value)||"",L=l.checked,q=(d==null?void 0:d.value)||"00:00",T=(c==null?void 0:c.value)||"00:00",E=u.value.trim()||null,$=Ft((m==null?void 0:m.value)||""),A=Ft((h==null?void 0:h.value)||""),C=Array.from((p==null?void 0:p.files)||[]),I=t.value;if(!w||!y||!k||!x){g("Моля, попълни всички задължителни полета.","warning");return}if(!v.length){g("Избери поне един ключ-график.","warning");return}const R=Ie(k,x);if(Ie(q,T)>R){g("Прекъсването не може да е по-голямо от продължителността на повеската.","warning");return}const K=f.innerHTML;f.disabled=!0,f.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const V=I||crypto.randomUUID(),j=Gn(A),z=[];if(j.length+C.length>rn){f.disabled=!1,f.innerHTML=K,g(`Максимум ${rn} файла/линка за една повеска.`,"warning");return}if(C.length){const H=await Qp(C,V);if(!H){f.disabled=!1,f.innerHTML=K;return}H.forEach(J=>{J!=null&&J.url&&j.push({url:J.url,label:J.label||sn(J.url,j.length)}),J!=null&&J.objectPath&&z.push(J.objectPath)})}const le=Gn(j),P={name:w,duty_type_id:y,schedule_key_id:_,start_time:k,end_time:x,second_day:L,break_start_time:q,break_end_time:T,notes:E,duty_files:nn(le)};let D,N=I||null;if(I)({error:D}=await S.from("duties").update(P).eq("id",I));else{const{data:H}=await S.auth.getUser(),J=((F=H==null?void 0:H.user)==null?void 0:F.id)??((Y=H==null?void 0:H.user)==null?void 0:Y.email)??"web_app",re=Q.allDuties.reduce((ne,Le)=>Math.max(ne,Number(Le.display_order)||0),0),{data:ce,error:ae}=await S.from("duties").insert({...P,id:V,created_from:J,display_order:re+1}).select("id").single();D=ae,N=(ce==null?void 0:ce.id)??null}if(!D&&N&&(D=await Gp(N,v)),!D&&N&&(D=await Jp(N,b)),f.disabled=!1,f.innerHTML=K,D){z.length&&await an(z),g(D.message,"error");return}if(I){const H=$.map(ae=>Xs(ae.url)).filter(Boolean),J=le.map(ae=>Xs(ae.url)).filter(Boolean),re=new Set(J),ce=H.filter(ae=>!re.has(ae));ce.length&&await an(ce)}g(I?"Повеската е обновена.":"Повеската е създадена.","success"),Ve(e.querySelector("#duty-modal")),La(e),await os(e)}function Yo(e,t){const r=Ft(t.dutyFiles);e.querySelector("#duty-id").value=t.id,e.querySelector("#duty-name").value=t.name??"",e.querySelector("#duty-type").value=t.dutyTypeId??"";const n=e.querySelector("#duty-schedule-keys"),s=t.scheduleKeyIds||[];Array.from(n.options).forEach(o=>{o.selected=s.includes(o.value)});const a=e.querySelector("#duty-trains"),i=t.trainIds||[];Array.from(a.options).forEach(o=>{o.selected=i.includes(o.value)}),bt(e,t.startTime??"","#duty-start","#duty-start-time"),bt(e,t.endTime??"","#duty-end","#duty-end-time"),e.querySelector("#duty-second-day").checked=!!t.secondDay,bt(e,Ht(t.breakStartTime),"#duty-break-start","#duty-break-start-time"),bt(e,Ht(t.breakEndTime),"#duty-break-end","#duty-break-end-time"),e.querySelector("#duty-notes").value=t.notes??"",e.querySelector("#duty-existing-attachments").value=nn(r)||"",e.querySelector("#duty-draft-attachments").value=nn(r)||"",e.querySelector("#duty-attachment-file").value="",Ta(e,r),e.querySelector("#duty-form-title").textContent="Редакция на Повеска",e.querySelector("#duty-save-btn").textContent="Запази"}function La(e){e.querySelector("#duty-id").value="",e.querySelector("#duty-name").value="",e.querySelector("#duty-type").value="";const t=e.querySelector("#duty-schedule-keys");Array.from(t.options).forEach(n=>{n.selected=!1});const r=e.querySelector("#duty-trains");Array.from(r.options).forEach(n=>{n.selected=!1}),bt(e,"","#duty-start","#duty-start-time"),bt(e,"","#duty-end","#duty-end-time"),e.querySelector("#duty-second-day").checked=!1,bt(e,"00:00","#duty-break-start","#duty-break-start-time"),bt(e,"00:00","#duty-break-end","#duty-break-end-time"),e.querySelector("#duty-notes").value="",e.querySelector("#duty-existing-attachments").value="",e.querySelector("#duty-draft-attachments").value="",e.querySelector("#duty-attachment-file").value="",Ta(e,[]),e.querySelector("#duty-form-title").textContent="Нова Повеска",e.querySelector("#duty-save-btn").textContent="Създай"}async function Vp(e,t){const r=t.querySelector("#duty-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{data:s,error:a}=await S.from("duties").select("duty_files").eq("id",e).maybeSingle();if(a){r.disabled=!1,r.innerHTML=n,g(a.message,"error");return}const{error:i}=await S.from("duties").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,i){g(i.message,"error");return}const o=Ft(s==null?void 0:s.duty_files).map(l=>Xs(l.url)).filter(Boolean);o.length&&await an(o),g("Повеската е изтрита.","success"),Ve(t.querySelector("#duty-delete-modal")),La(t),await os(t)}async function Gp(e,t){const{error:r}=await S.from("schedule_key_duties").delete().eq("duty_id",e);if(r)return r;const n=t.map(a=>({duty_id:e,schedule_key_id:a})),{error:s}=await S.from("schedule_key_duties").insert(n);return s}async function Jp(e,t){const{error:r}=await S.from("duty_trains").delete().eq("duty_id",e);if(r)return r;if(!t.length)return null;const n=t.map((a,i)=>({duty_id:e,train_id:a,sequence_order:i+1})),{error:s}=await S.from("duty_trains").insert(n);return s}function Ta(e,t){const r=e.querySelector("#duty-current-attachments-wrap"),n=e.querySelector("#duty-current-attachments-links"),s=e.querySelector("#duty-draft-attachments");if(!r||!n||!s)return;const a=Gn(t);if(s.value=nn(a)||"",!a.length){r.classList.add("d-none"),n.innerHTML="";return}r.classList.remove("d-none"),n.innerHTML=a.map((i,o)=>{const l=i.label||sn(i.url,o);return`
        <div class="border rounded p-2 w-100">
          <div class="mb-2 d-flex align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <a href="${pe(i.url)}" target="_blank" rel="noopener noreferrer">Отвори</a>
              <button
                type="button"
                class="btn btn-link btn-sm p-0 lh-1 text-decoration-none duty-existing-attachment-preview"
                data-url="${pe(i.url)}"
                data-label="${pe(l)}"
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
            value="${pe(l)}"
            placeholder="Име на файла/линка"
          />
        </div>
      `}).join("")}function Ft(e){if(Array.isArray(e))return e.map((r,n)=>Hn(r,n)).filter(r=>r.url);const t=String(e||"").trim();if(!t)return[];if(t.startsWith("["))try{const r=JSON.parse(t);if(Array.isArray(r))return r.map((n,s)=>Hn(n,s)).filter(n=>n.url)}catch{return[{url:t,label:sn(t,0)}]}return t.split(`
`).map((r,n)=>Hn(r,n)).filter(r=>r.url)}function Hn(e,t){if(e&&typeof e=="object"&&!Array.isArray(e)){const n=String(e.url||"").trim(),s=String(e.label||"").trim()||sn(n,t);return{url:n,label:s}}const r=String(e||"").trim();return{url:r,label:sn(r,t)}}function nn(e){const t=Gn(e);return t.length?JSON.stringify(t):""}function Gn(e){const t=[],r=new Set;for(const n of e||[]){const s=Hn(n,t.length);if(!s.url)continue;const a=s.url.toLowerCase();r.has(a)||(r.add(a),t.push(s))}return t}function sn(e,t){const r=String(e||"").trim();if(!r)return`Файл ${t+1}`;try{const s=new URL(r).pathname.split("/").pop()||"",a=decodeURIComponent(s);if(a)return a}catch{}return`Файл ${t+1}`}async function Qp(e,t){var n;if(!Array.isArray(e)||!e.length||!t)return[];const r=[];for(const s of e){const i=(((n=s.name)==null?void 0:n.split(".").pop())||"pdf").toLowerCase().replace(/[^a-z0-9]/g,"")||"pdf",o=Math.random().toString(36).slice(2,10),l=`${t}/${Date.now()}-${o}.${i}`,{error:d}=await S.storage.from(tn).upload(l,s,{upsert:!0,contentType:s.type||void 0});if(d)return r.length&&await an(r.map(u=>u.objectPath)),g(d.message,"error"),null;const{data:c}=S.storage.from(tn).getPublicUrl(l);if(!(c!=null&&c.publicUrl))return await an([l,...r.map(u=>u.objectPath)]),g("Файлът е качен, но не успях да генерирам публичен линк.","error"),null;r.push({url:c.publicUrl,label:s.name||"",objectPath:l})}return r}function Xs(e){const t=String(e||"").trim();if(!t)return"";if(!/^https?:\/\//i.test(t)){const r=t.replace(/^\/+/,""),n=`${tn}/`;return r.startsWith(n)?r.slice(n.length):""}try{const r=new URL(t),n=`/storage/v1/object/public/${tn}/`,s=r.pathname.indexOf(n);return s===-1?"":decodeURIComponent(r.pathname.slice(s+n.length))}catch{return""}}async function an(e){const t=Array.from(new Set((e||[]).filter(Boolean)));t.length&&await S.storage.from(tn).remove(t)}function Pi(e,t,r){const n=e.querySelector("#duty-attachment-preview-modal"),s=e.querySelector("#duty-attachment-preview-frame"),a=e.querySelector("#duty-attachment-preview-text-wrap"),i=e.querySelector("#duty-attachment-preview-text"),o=e.querySelector("#duty-attachment-preview-csv-wrap"),l=e.querySelector("#duty-attachment-preview-csv-note"),d=e.querySelector("#duty-attachment-preview-csv-head"),c=e.querySelector("#duty-attachment-preview-csv-body"),u=e.querySelector("#duty-attachment-preview-title"),p=e.querySelector("#duty-attachment-preview-fallback"),m=e.querySelector("#duty-attachment-preview-open");if(!n||!s||!a||!i||!o||!l||!d||!c||!u||!p||!m)return;const h=String(t||"").trim();if(!h){g("Липсва линк за преглед.","warning");return}const f=th(h),w=Zs(h),y=w==="csv",v=["txt","csv","json"].includes(w);u.textContent=r?`Преглед: ${r}`:"Преглед на файл",m.setAttribute("href",h),p.classList.add("d-none"),a.classList.add("d-none"),o.classList.add("d-none"),l.textContent="",d.innerHTML="",c.innerHTML="",i.textContent="",s.classList.remove("d-none"),s.src="about:blank",y?(o.classList.remove("d-none"),s.classList.add("d-none"),Xp(h,d,c,l,p)):v?(a.classList.remove("d-none"),s.classList.add("d-none"),i.textContent="Зареждане...",eh(h,i,p)):(s.src=f,s.onload=()=>{if(f!==h){p.classList.add("d-none");return}const b=Zs(h),_=["doc","docx","xls","xlsx","ppt","pptx"].includes(b);p.classList.toggle("d-none",!_)},s.onerror=()=>{p.classList.remove("d-none")}),Ut(n)}function Yp(e){const t=e.querySelector("#duty-attachment-preview-modal"),r=e.querySelector("#duty-attachment-preview-frame"),n=e.querySelector("#duty-attachment-preview-text-wrap"),s=e.querySelector("#duty-attachment-preview-text"),a=e.querySelector("#duty-attachment-preview-csv-wrap"),i=e.querySelector("#duty-attachment-preview-csv-note"),o=e.querySelector("#duty-attachment-preview-csv-head"),l=e.querySelector("#duty-attachment-preview-csv-body"),d=e.querySelector("#duty-attachment-preview-fallback"),c=e.querySelector("#duty-attachment-preview-open");!t||!r||!n||!s||!a||!i||!o||!l||!d||!c||(r.src="about:blank",r.classList.remove("d-none"),n.classList.add("d-none"),a.classList.add("d-none"),s.textContent="",i.textContent="",o.innerHTML="",l.innerHTML="",c.setAttribute("href","#"),d.classList.add("d-none"),Ve(t))}async function Xp(e,t,r,n,s){try{const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const i=await a.text(),o=Zp(i);if(!o.length){t.innerHTML="",r.innerHTML="",n.textContent="Файлът е празен.",s.classList.add("d-none");return}const l=200,d=o.slice(0,l),c=d[0]||[],u=d.slice(1);t.innerHTML=`
      <tr>${c.map(p=>`<th>${pe(p)}</th>`).join("")}</tr>
    `,r.innerHTML=u.map(p=>`<tr>${p.map(m=>`<td>${pe(m)}</td>`).join("")}</tr>`).join(""),o.length>l?n.textContent=`Показани са първите ${l} реда от общо ${o.length}.`:n.textContent=`Редове: ${o.length}.`,s.classList.add("d-none")}catch{t.innerHTML="",r.innerHTML="",n.textContent="",s.classList.remove("d-none")}}function Zp(e){const t=[];let r=[],n="",s=!1;for(let a=0;a<e.length;a+=1){const i=e[a],o=e[a+1];if(i==='"'){s&&o==='"'?(n+='"',a+=1):s=!s;continue}if(!s&&i===","){r.push(n),n="";continue}if(!s&&(i===`
`||i==="\r")){i==="\r"&&o===`
`&&(a+=1),r.push(n),t.push(r),r=[],n="";continue}n+=i}return(n.length||r.length)&&(r.push(n),t.push(r)),t}async function eh(e,t,r){try{const n=await fetch(e,{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.text();t.textContent=s||"(Празен файл)",r.classList.add("d-none")}catch{t.textContent="Неуспешно зареждане на текстов преглед.",r.classList.remove("d-none")}}function th(e){const t=Zs(e);return["doc","docx","xls","xlsx","ppt","pptx"].includes(t)?`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(e)}`:e}function Zs(e){const t=String(e||"").trim();if(!t)return"";try{const n=new URL(t).pathname.split("/").pop()||"",s=n.includes(".")?n.split(".").pop():"";return String(s||"").toLowerCase()}catch{return""}}function rh(e){const t=String((e==null?void 0:e.message)||"").trim(),r=t.toLowerCase(),n=r.includes("row-level security")||r.includes("violates row-level security policy")||String((e==null?void 0:e.code)||"")==="42501";return n&&r.includes("duty_trains")?"Нямаш права да свързваш влакове към повески. Свържи се с администратор.":n&&r.includes("duties")?"Нямаш права да създаваш или редактираш повески. Свържи се с администратор.":n?"Достъпът е ограничен от права за сигурност (RLS).":t||"Възникна неочаквана грешка."}function nh(e,t){const r=Q.allDuties.find(c=>c.id===t),n=e.querySelector("#duty-profile-content"),s=e.querySelector("#duty-profile-modal"),a=e.querySelector("#duty-profile-duplicate"),i=e.querySelector("#duty-profile-edit");if(!n||!s)return;if(!r){s.dataset.dutyId="",i&&(i.disabled=!0),a&&(a.disabled=!0),n.innerHTML='<p class="text-secondary mb-0">Няма данни за тази повеска.</p>',Ut(s);return}s.dataset.dutyId=r.id,i&&(i.disabled=!1),a&&(a.disabled=!1);const o=sh(r),l=ah(r),d=Ft(r==null?void 0:r.duty_files);n.innerHTML=Go({duty:r,scheduleKeyNames:o,trainNumbers:l,attachmentEntries:d,escapeHtml:pe,intervalToTimeInput:Ht,formatInterval:ih}),Ut(s)}function Mi(e,t){const r=Q.allDuties.find(n=>n.id===t);if(!r){g("Не е намерена повеска за редакция.","warning");return}Yo(e,{id:r.id,name:r.name||"",dutyTypeId:r.duty_type_id||"",scheduleKeyIds:Xo(r),trainIds:Zo(r),startTime:Jn(r.start_time),endTime:Jn(r.end_time),secondDay:!!r.second_day,breakStartTime:r.break_start_time||"00:00:00",breakEndTime:r.break_end_time||"00:00:00",notes:r.notes||"",dutyFiles:r.duty_files||""}),Ut(e.querySelector("#duty-modal"))}function ji(e,t){const r=Q.allDuties.find(n=>n.id===t);if(!r){g("Не е намерена повеска за копиране.","warning");return}Yo(e,{id:"",name:r.name?`${r.name} (копие)`:"",dutyTypeId:r.duty_type_id||"",scheduleKeyIds:Xo(r),trainIds:Zo(r),startTime:Jn(r.start_time),endTime:Jn(r.end_time),secondDay:!!r.second_day,breakStartTime:r.break_start_time||"00:00:00",breakEndTime:r.break_end_time||"00:00:00",notes:r.notes||"",dutyFiles:r.duty_files||""}),e.querySelector("#duty-id").value="",e.querySelector("#duty-form-title").textContent="Нова Повеска (копие)",e.querySelector("#duty-save-btn").textContent="Създай",Ut(e.querySelector("#duty-modal"))}function sh(e){const r=(Array.isArray(e==null?void 0:e.schedule_key_duties)?e.schedule_key_duties:e!=null&&e.schedule_key_duties?[e.schedule_key_duties]:[]).map(n=>{var s;return(s=n==null?void 0:n.schedule_keys)==null?void 0:s.name}).filter(Boolean);return[...new Set(r)]}function Xo(e){const r=(Array.isArray(e==null?void 0:e.schedule_key_duties)?e.schedule_key_duties:e!=null&&e.schedule_key_duties?[e.schedule_key_duties]:[]).map(n=>n==null?void 0:n.schedule_key_id).filter(Boolean);return[...new Set(r)]}function ah(e){return(Array.isArray(e==null?void 0:e.duty_trains)?e.duty_trains:e!=null&&e.duty_trains?[e.duty_trains]:[]).map(r=>{var n;return{number:(n=r==null?void 0:r.trains)==null?void 0:n.number,sequenceOrder:Number.isFinite(Number(r==null?void 0:r.sequence_order))?Number(r.sequence_order):Number.MAX_SAFE_INTEGER}}).filter(r=>!!r.number).sort((r,n)=>r.sequenceOrder-n.sequenceOrder).map(r=>r.number).filter((r,n,s)=>s.indexOf(r)===n)}function Zo(e){return(Array.isArray(e==null?void 0:e.duty_trains)?e.duty_trains:e!=null&&e.duty_trains?[e.duty_trains]:[]).map(r=>({id:r==null?void 0:r.train_id,sequenceOrder:Number.isFinite(Number(r==null?void 0:r.sequence_order))?Number(r.sequence_order):Number.MAX_SAFE_INTEGER})).filter(r=>!!r.id).sort((r,n)=>r.sequenceOrder-n.sequenceOrder).map(r=>r.id).filter((r,n,s)=>s.indexOf(r)===n)}function Jn(e){return e?String(e).slice(0,5):""}function Nr(e,...t){for(const r of t){const n=e.querySelector(r);if(n)return n}return null}function bt(e,t,...r){const n=Nr(e,...r);n&&(n.value=t)}function ih(e){return e?String(e).replace(".000000",""):"-"}const oh=`<section class="card border-0 shadow-sm">\r
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
`;function Un(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Ni=new Map;function lh(e,t){const r=Ni.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){yt(a);return}}};Ni.set(e,n),document.addEventListener("keydown",n)}function yt(e){var t,r,n;e.classList.add("d-none"),(t=document.querySelector("#employee-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#employee-delete-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#employee-profile-modal"))!=null&&n.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Oe(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Se={rows:[],searchQuery:"",positionFilter:"",activeFilter:""};async function Ea(e){const{data:t,error:r}=await S.from("employees").select("id, first_name, last_name, position_id, is_active, photo_url, psychological_assessment_expiry, medical_certificate_expiry, license_expiry, positions(title), user_profiles(id, username)").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(r){g(r.message,"error"),Se.rows=[],lr(e,"Грешка при зареждане на служители.");return}Se.rows=t||[],lr(e)}function lr(e,t){const r=e.querySelector("#employees-table-body"),n=e.querySelector("#employees-empty");dh(e);const s=Se.rows.filter(a=>{var u;const i=`${a.first_name||""} ${a.last_name||""}`.toLowerCase(),o=(((u=a.positions)==null?void 0:u.title)||"").toLowerCase(),l=!Se.searchQuery||i.includes(Se.searchQuery)||o.includes(Se.searchQuery),d=!Se.positionFilter||o===Se.positionFilter,c=!Se.activeFilter||String(!!a.is_active)===Se.activeFilter;return l&&d&&c});if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени служители.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>{var l;const i=Array.isArray(a.user_profiles)?a.user_profiles:a.user_profiles?[a.user_profiles]:[],o=i.length?i.map(d=>{const c=(d==null?void 0:d.username)||(d==null?void 0:d.id)||"";return c||""}).filter(Boolean).join(", "):"-";return`
        <tr data-employee-id="${a.id}">
          <td>${Oe(a.first_name??"")} ${Oe(a.last_name??"")}</td>
          <td>${Oe(o)}</td>
          <td>${Oe(((l=a.positions)==null?void 0:l.title)??"-")}</td>
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
                data-first-name="${Oe(a.first_name??"")}"
                data-last-name="${Oe(a.last_name??"")}"
                data-position-id="${a.position_id??""}"
                data-active="${a.is_active?"true":"false"}"
                data-photo-url="${Oe(a.photo_url??"")}"
                data-psych-expiry="${Oe(a.psychological_assessment_expiry??"")}"
                data-medical-expiry="${Oe(a.medical_certificate_expiry??"")}"
                data-license-expiry="${Oe(a.license_expiry??"")}"
              >
                Редакция
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}function dh(e){const t=e.querySelector("#employees-position-filter");if(!t)return;const r=Se.positionFilter||"",n=[...new Set(Se.rows.map(s=>{var a;return String(((a=s==null?void 0:s.positions)==null?void 0:a.title)||"").trim()}).filter(Boolean))].sort((s,a)=>s.localeCompare(a,"bg"));t.innerHTML=`
    <option value="">Всички</option>
    ${n.map(s=>`<option value="${Oe(s.toLowerCase())}">${Oe(s)}</option>`).join("")}
  `,t.value=r}const Hi="employee-photos";let Tr=null;async function ch(e){e.innerHTML=oh,ph(e),await hh(e),await Ea(e);const t=uh();t&&await el(e,t)}function uh(){return new URLSearchParams(window.location.search).get("profile")||""}function ph(e){const t=e.querySelector("#open-create-employee"),r=e.querySelector("#employee-form"),n=e.querySelector("#employee-cancel-btn"),s=e.querySelector("#employees-table-body"),a=e.querySelector("#employee-modal"),i=e.querySelector("#employee-delete-modal"),o=e.querySelector("#employee-profile-modal"),l=e.querySelector("#employee-modal-close"),d=e.querySelector("#employee-profile-close"),c=e.querySelector("#employee-profile-close-btn"),u=e.querySelector("#employee-delete-confirm"),p=e.querySelector("#employee-delete-cancel"),m=e.querySelector("#employees-search"),h=e.querySelector("#employees-position-filter"),f=e.querySelector("#employees-active-filter"),w=e.querySelector("#employees-filter-reset"),y=e.querySelector("#employee-photo-file"),v=e.querySelector("#employee-photo-remove-btn");t==null||t.addEventListener("click",()=>{$a(e),Un(a)}),r==null||r.addEventListener("submit",async b=>{b.preventDefault(),await mh(e)}),n==null||n.addEventListener("click",()=>{yt(a)}),l==null||l.addEventListener("click",()=>{yt(a)}),p==null||p.addEventListener("click",()=>{yt(i)}),d==null||d.addEventListener("click",()=>{yt(o)}),c==null||c.addEventListener("click",()=>{yt(o)}),m==null||m.addEventListener("input",b=>{Se.searchQuery=b.target.value.trim().toLowerCase(),lr(e)}),h==null||h.addEventListener("change",b=>{Se.positionFilter=b.target.value||"",lr(e)}),f==null||f.addEventListener("change",b=>{Se.activeFilter=b.target.value||"",lr(e)}),w==null||w.addEventListener("click",()=>{Se.searchQuery="",Se.positionFilter="",Se.activeFilter="",m&&(m.value=""),h&&(h.value=""),f&&(f.value=""),lr(e)}),y==null||y.addEventListener("change",()=>{var _,k,x,L;const b=((_=y.files)==null?void 0:_[0])??null;if(!b){const q=((k=e.querySelector("#employee-photo-path"))==null?void 0:k.value)||"";dr(e,q);return}if(!((x=b.type)!=null&&x.startsWith("image/"))){g("Избери валиден файл с изображение.","warning"),y.value="";const q=((L=e.querySelector("#employee-photo-path"))==null?void 0:L.value)||"";dr(e,q);return}dr(e,b)}),v==null||v.addEventListener("click",()=>{const b=e.querySelector("#employee-photo-path");b&&(b.value=""),y&&(y.value=""),dr(e,null)}),lh("employees",[i,o,a]),u==null||u.addEventListener("click",async()=>{const b=e.querySelector("#employee-delete-id").value;await yh(b,e)}),s==null||s.addEventListener("click",async b=>{const _=b.target.closest("button[data-action]");if(!_)return;const k=_.getAttribute("data-action");if(k==="profile"){const x=_.getAttribute("data-id");await el(e,x);return}if(k==="edit"){fh(e,{id:_.getAttribute("data-id"),firstName:_.getAttribute("data-first-name"),lastName:_.getAttribute("data-last-name"),positionId:_.getAttribute("data-position-id"),isActive:_.getAttribute("data-active")==="true",psychExpiry:_.getAttribute("data-psych-expiry"),medicalExpiry:_.getAttribute("data-medical-expiry"),licenseExpiry:_.getAttribute("data-license-expiry"),photoUrl:_.getAttribute("data-photo-url")}),Un(a);return}if(k==="delete"){const x=_.getAttribute("data-id");e.querySelector("#employee-delete-id").value=x,Un(i)}})}async function el(e,t){var c;const{data:r,error:n}=await S.from("employees").select("id, first_name, last_name, is_active, photo_url, psychological_assessment_expiry, medical_certificate_expiry, license_expiry, other_certificates, positions(title), user_profiles(id, username)").eq("id",t).maybeSingle();if(n||!r){g((n==null?void 0:n.message)||"Служителят не е намерен.","error");return}const s=Array.isArray(r.user_profiles)?r.user_profiles:r.user_profiles?[r.user_profiles]:[],a=s.length?s.map(u=>{const p=(u==null?void 0:u.username)||(u==null?void 0:u.id)||"";return p||""}).filter(Boolean).join(", "):"-",i=r.other_certificates?JSON.stringify(r.other_certificates,null,2):"-",o=tl(r.photo_url),l=e.querySelector("#employee-profile-photo"),d=e.querySelector("#employee-profile-photo-empty");l&&d&&(o?(l.src=o,l.classList.remove("d-none"),d.classList.add("d-none")):(l.src="",l.classList.add("d-none"),d.classList.remove("d-none"))),e.querySelector("#employee-profile-name").textContent=`${r.first_name??""} ${r.last_name??""}`.trim()||"-",e.querySelector("#employee-profile-position").textContent=((c=r.positions)==null?void 0:c.title)||"-",e.querySelector("#employee-profile-active").textContent=r.is_active?"Да":"Не",e.querySelector("#employee-profile-linked-profiles").textContent=a,e.querySelector("#employee-profile-psych").textContent=r.psychological_assessment_expiry||"-",e.querySelector("#employee-profile-medical").textContent=r.medical_certificate_expiry||"-",e.querySelector("#employee-profile-license").textContent=r.license_expiry||"-",e.querySelector("#employee-profile-certificates").textContent=i,Un(e.querySelector("#employee-profile-modal"))}function tl(e){if(!e)return null;const t=String(e).trim();if(!t)return null;if(/^https?:\/\//i.test(t))return t;const r=t.replace(/^\/+/,""),n=["employee-photos","employees","employee_photos"],s=[],a=r.split("/");if(a.length>1){const o=a[0],l=a.slice(1).join("/");s.push({bucket:o,objectPath:l})}n.forEach(o=>{s.push({bucket:o,objectPath:r})});const i=new Set;for(const o of s){const l=`${o.bucket}/${o.objectPath}`;if(i.has(l)||!o.bucket||!o.objectPath)continue;i.add(l);const{data:d}=S.storage.from(o.bucket).getPublicUrl(o.objectPath);if(d!=null&&d.publicUrl)return d.publicUrl}return null}async function hh(e){const t=e.querySelector("#employee-position"),{data:r,error:n}=await S.from("positions").select("id, title").order("title",{ascending:!0});if(n){g(n.message,"error");return}const s=(r||[]).map(a=>`<option value="${a.id}">${Oe(a.title)}</option>`).join("");t.innerHTML='<option value="">Без позиция</option>'+s}async function mh(e){var $,A,C;const t=e.querySelector("#employee-id"),r=e.querySelector("#employee-first-name"),n=e.querySelector("#employee-last-name"),s=e.querySelector("#employee-position"),a=e.querySelector("#employee-active"),i=e.querySelector("#employee-psych-expiry"),o=e.querySelector("#employee-medical-expiry"),l=e.querySelector("#employee-license-expiry"),d=e.querySelector("#employee-photo-file"),c=e.querySelector("#employee-photo-path"),u=e.querySelector("#employee-save-btn"),p=r.value.trim(),m=n.value.trim(),h=s.value||null,f=a.checked,w=i.value||null,y=o.value||null,v=l.value||null,b=(($=d.files)==null?void 0:$[0])??null,_=c.value.trim()||null,k=t.value;if(!p||!m){g("Моля, попълни име и фамилия.","warning");return}const x=u.innerHTML;u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const L={first_name:p,last_name:m,position_id:h,is_active:f,psychological_assessment_expiry:w,medical_certificate_expiry:y,license_expiry:v,updated_at:new Date().toISOString()};if(b&&!((A=b.type)!=null&&A.startsWith("image/"))){u.disabled=!1,u.innerHTML=x,g("Избери валиден файл с изображение.","warning");return}let q,T=k||null,E=_;if(k){if(b){const I=await Ui(b,k);if(!I){u.disabled=!1,u.innerHTML=x;return}E=I}L.photo_url=E,{error:q}=await S.from("employees").update(L).eq("id",k)}else{const{data:I}=await S.auth.getUser(),R=((C=I==null?void 0:I.user)==null?void 0:C.email)??"web_app",{data:W,error:K}=await S.from("employees").insert({...L,created_from:R}).select("id").single();if(q=K,T=(W==null?void 0:W.id)??null,!q&&T&&b){const V=await Ui(b,T);if(!V){u.disabled=!1,u.innerHTML=x;return}const{error:j}=await S.from("employees").update({photo_url:V,updated_at:new Date().toISOString()}).eq("id",T);q=j,E=V}}if(u.disabled=!1,u.innerHTML=x,q){g(q.message,"error");return}g(k?"Служителят е обновен.":"Служителят е създаден.","success"),yt(e.querySelector("#employee-modal")),$a(e),await Ea(e)}function fh(e,t){e.querySelector("#employee-id").value=t.id,e.querySelector("#employee-first-name").value=t.firstName??"",e.querySelector("#employee-last-name").value=t.lastName??"",e.querySelector("#employee-position").value=t.positionId??"",e.querySelector("#employee-active").checked=!!t.isActive,e.querySelector("#employee-psych-expiry").value=t.psychExpiry??"",e.querySelector("#employee-medical-expiry").value=t.medicalExpiry??"",e.querySelector("#employee-license-expiry").value=t.licenseExpiry??"",e.querySelector("#employee-photo-path").value=t.photoUrl??"",e.querySelector("#employee-photo-file").value="",dr(e,t.photoUrl??null),e.querySelector("#employee-form-title").textContent="Редакция на служител",e.querySelector("#employee-save-btn").textContent="Запази"}function $a(e){e.querySelector("#employee-id").value="",e.querySelector("#employee-first-name").value="",e.querySelector("#employee-last-name").value="",e.querySelector("#employee-position").value="",e.querySelector("#employee-active").checked=!0,e.querySelector("#employee-psych-expiry").value="",e.querySelector("#employee-medical-expiry").value="",e.querySelector("#employee-license-expiry").value="",e.querySelector("#employee-photo-path").value="",e.querySelector("#employee-photo-file").value="",dr(e,null),e.querySelector("#employee-form-title").textContent="Нов служител",e.querySelector("#employee-save-btn").textContent="Създай"}async function yh(e,t){const r=t.querySelector("#employee-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("employees").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,s){g(s.message,"error");return}g("Служителят е изтрит.","success"),yt(t.querySelector("#employee-delete-modal")),$a(t),await Ea(t)}async function Ui(e,t){var o;if(!e||!t)return null;const n=(((o=e.name)==null?void 0:o.split(".").pop())||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"")||"jpg",s=Math.random().toString(36).slice(2,10),a=`${t}/${Date.now()}-${s}.${n}`,{error:i}=await S.storage.from(Hi).upload(a,e,{upsert:!0,contentType:e.type||void 0});return i?(g(i.message,"error"),null):`${Hi}/${a}`}function dr(e,t){const r=e.querySelector("#employee-photo-preview"),n=e.querySelector("#employee-photo-preview-empty");if(!r||!n)return;if(Tr&&(URL.revokeObjectURL(Tr),Tr=null),!t){r.src="",r.classList.add("d-none"),n.classList.remove("d-none");return}if(t instanceof File){Tr=URL.createObjectURL(t),r.src=Tr,r.classList.remove("d-none"),n.classList.add("d-none");return}const s=tl(t);if(!s){r.src="",r.classList.add("d-none"),n.classList.remove("d-none");return}r.src=s,r.classList.remove("d-none"),n.classList.add("d-none")}const bh=`<section class="card border-0 shadow-sm">\r
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
`;function xs(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Fi=new Map;function vh(e,t){const r=Fi.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){br(a);return}}};Fi.set(e,n),document.addEventListener("keydown",n)}function br(e){var t,r;e.classList.add("d-none"),(t=document.querySelector("#employee-absence-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#employee-absence-delete-modal"))!=null&&r.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Qe(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const ge={rows:[],searchQuery:"",dateFrom:"",dateTo:""};function Bi(e){return e&&`${e.first_name??""} ${e.last_name??""}`.trim()||"-"}async function Aa(e){const{data:t,error:r}=await S.from("employee_absences").select("id, employee_id, reason_id, start_date, end_date, notes, employees(first_name, last_name), absence_reasons(name)").order("start_date",{ascending:!1}).order("end_date",{ascending:!1});if(r){g(r.message,"error"),ge.rows=[],cr(e,"Грешка при зареждане на отсъствията.");return}ge.rows=t||[],cr(e)}function cr(e,t){const r=e.querySelector("#employee-absences-table-body"),n=e.querySelector("#employee-absences-empty"),s=ge.rows.filter(a=>{var h;const i=Bi(a.employees).toLowerCase(),o=(((h=a.absence_reasons)==null?void 0:h.name)||"").toLowerCase(),l=String(a.start_date||"").toLowerCase(),d=String(a.end_date||"").toLowerCase(),c=String(a.notes||"").toLowerCase(),u=!ge.searchQuery||i.includes(ge.searchQuery)||o.includes(ge.searchQuery)||l.includes(ge.searchQuery)||d.includes(ge.searchQuery)||c.includes(ge.searchQuery),p=!ge.dateFrom||String(a.end_date||"")>=ge.dateFrom,m=!ge.dateTo||String(a.start_date||"")<=ge.dateTo;return u&&p&&m});if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени отсъствия.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>{var i;return`
        <tr>
          <td>${Qe(Bi(a.employees))}</td>
          <td>${Qe(((i=a.absence_reasons)==null?void 0:i.name)??"-")}</td>
          <td>${Qe(a.start_date??"-")}</td>
          <td>${Qe(a.end_date??"-")}</td>
          <td>${Qe(a.notes??"")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${a.id}"
                data-employee-id="${a.employee_id??""}"
                data-reason-id="${a.reason_id??""}"
                data-start-date="${Qe(a.start_date??"")}"
                data-end-date="${Qe(a.end_date??"")}"
                data-notes="${Qe(a.notes??"")}"
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
      `}).join("")}async function gh(e){e.innerHTML=bh,_h(e),await wh(e),await Sh(e),await Aa(e)}function _h(e){const t=e.querySelector("#open-create-employee-absence"),r=e.querySelector("#employee-absence-form"),n=e.querySelector("#employee-absence-cancel-btn"),s=e.querySelector("#employee-absences-table-body"),a=e.querySelector("#employee-absence-modal"),i=e.querySelector("#employee-absence-delete-modal"),o=e.querySelector("#employee-absence-modal-close"),l=e.querySelector("#employee-absence-delete-confirm"),d=e.querySelector("#employee-absence-delete-cancel"),c=e.querySelector("#employee-absences-search"),u=e.querySelector("#employee-absences-date-from"),p=e.querySelector("#employee-absences-date-to"),m=e.querySelector("#employee-absences-filter-reset");t==null||t.addEventListener("click",()=>{Ca(e),xs(a)}),r==null||r.addEventListener("submit",async h=>{h.preventDefault(),await kh(e)}),n==null||n.addEventListener("click",()=>{br(a)}),o==null||o.addEventListener("click",()=>{br(a)}),d==null||d.addEventListener("click",()=>{br(i)}),c==null||c.addEventListener("input",h=>{ge.searchQuery=h.target.value.trim().toLowerCase(),cr(e)}),u==null||u.addEventListener("change",h=>{ge.dateFrom=h.target.value||"",cr(e)}),p==null||p.addEventListener("change",h=>{ge.dateTo=h.target.value||"",cr(e)}),m==null||m.addEventListener("click",()=>{ge.searchQuery="",ge.dateFrom="",ge.dateTo="",c&&(c.value=""),u&&(u.value=""),p&&(p.value=""),cr(e)}),vh("employee-absences",[i,a]),l==null||l.addEventListener("click",async()=>{const h=e.querySelector("#employee-absence-delete-id").value;await qh(h,e)}),s==null||s.addEventListener("click",h=>{const f=h.target.closest("button[data-action]");if(!f)return;const w=f.getAttribute("data-action");if(w==="edit"){xh(e,{id:f.getAttribute("data-id"),employeeId:f.getAttribute("data-employee-id"),reasonId:f.getAttribute("data-reason-id"),startDate:f.getAttribute("data-start-date"),endDate:f.getAttribute("data-end-date"),notes:f.getAttribute("data-notes")}),xs(a);return}if(w==="delete"){const y=f.getAttribute("data-id");e.querySelector("#employee-absence-delete-id").value=y,xs(i)}})}async function wh(e){const t=e.querySelector("#employee-absence-employee"),{data:r,error:n}=await S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(n){g(n.message,"error");return}const s=(r||[]).map(a=>{const i=`${a.first_name??""} ${a.last_name??""}`.trim()||"-";return`<option value="${a.id}">${Qe(i)}</option>`}).join("");t.innerHTML='<option value="">Избери служител</option>'+s}async function Sh(e){const t=e.querySelector("#employee-absence-reason"),{data:r,error:n}=await S.from("absence_reasons").select("id, name").order("name",{ascending:!0});if(n){g(n.message,"error");return}const s=(r||[]).map(a=>`<option value="${a.id}">${Qe(a.name??"-")}</option>`).join("");t.innerHTML='<option value="">Избери причина</option>'+s}async function kh(e){var y;const t=e.querySelector("#employee-absence-id"),r=e.querySelector("#employee-absence-employee"),n=e.querySelector("#employee-absence-reason"),s=e.querySelector("#employee-absence-start-date"),a=e.querySelector("#employee-absence-end-date"),i=e.querySelector("#employee-absence-notes"),o=e.querySelector("#employee-absence-save-btn"),l=r.value||null,d=n.value||null,c=s.value,u=a.value,p=i.value.trim()||null,m=t.value;if(!l||!d||!c||!u){g("Моля, попълни всички задължителни полета.","warning");return}if(u<c){g('Полето "До дата" трябва да е след или равно на "От дата".',"warning");return}const h=o.innerHTML;o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const f={employee_id:l,reason_id:d,start_date:c,end_date:u,notes:p};let w;if(m)({error:w}=await S.from("employee_absences").update(f).eq("id",m));else{const{data:v}=await S.auth.getUser(),b=((y=v==null?void 0:v.user)==null?void 0:y.email)??"web_app";({error:w}=await S.from("employee_absences").insert({...f,created_from:b}))}if(o.disabled=!1,o.innerHTML=h,w){g(w.message,"error");return}g(m?"Отсъствието е обновено.":"Отсъствието е създадено.","success"),br(e.querySelector("#employee-absence-modal")),Ca(e),await Aa(e)}function xh(e,t){e.querySelector("#employee-absence-id").value=t.id,e.querySelector("#employee-absence-employee").value=t.employeeId??"",e.querySelector("#employee-absence-reason").value=t.reasonId??"",e.querySelector("#employee-absence-start-date").value=t.startDate??"",e.querySelector("#employee-absence-end-date").value=t.endDate??"",e.querySelector("#employee-absence-notes").value=t.notes??"",e.querySelector("#employee-absence-form-title").textContent="Редакция на отсъствие",e.querySelector("#employee-absence-save-btn").textContent="Запази"}function Ca(e){e.querySelector("#employee-absence-id").value="",e.querySelector("#employee-absence-employee").value="",e.querySelector("#employee-absence-reason").value="",e.querySelector("#employee-absence-start-date").value="",e.querySelector("#employee-absence-end-date").value="",e.querySelector("#employee-absence-notes").value="",e.querySelector("#employee-absence-form-title").textContent="Ново отсъствие",e.querySelector("#employee-absence-save-btn").textContent="Създай"}async function qh(e,t){const r=t.querySelector("#employee-absence-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("employee_absences").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,s){g(s.message,"error");return}g("Отсъствието е изтрито.","success"),br(t.querySelector("#employee-absence-delete-modal")),Ca(t),await Aa(t)}const Lh=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-2 mb-3">\r
      <h1 class="h3 mb-0">Планирани повески</h1>\r
      <div class="d-flex gap-2 page-actions">\r
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
      <table class="table align-middle table-mobile-wrap">\r
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
`;function Hr(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Ki=new Map;function Th(e,t){const r=Ki.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Ue(a);return}}};Ki.set(e,n),document.addEventListener("keydown",n)}function Ue(e){var t,r,n,s;e.classList.add("d-none"),(t=document.querySelector("#planned-duty-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#planned-duty-delete-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#planned-duty-auto-modal"))!=null&&n.classList.contains("d-none"))&&((s=document.querySelector("#planned-duty-bulk-delete-modal"))!=null&&s.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function rt(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const B={rows:[],searchQuery:"",dateFilter:"",roleFilter:"",selectedIds:[],visibleRowIds:[],selectionEnabled:!0};function zi(e){return e&&`${e.first_name??""} ${e.last_name??""}`.trim()||"-"}async function vr(e){const{data:t,error:r}=await S.from("planned_duties").select("id, date, employee_id, duty_id, assignment_role, employees(first_name, last_name), duties(name, schedule_key_duties(schedule_key_id))").order("date",{ascending:!1});if(r){g(r.message,"error"),B.rows=[],dt(e,"Грешка при зареждане на планираните повески.");return}B.rows=t||[],dt(e)}function dt(e,t){var c,u;const r=e.querySelector("#planned-duties-table-body"),n=e.querySelector("#planned-duties-empty"),s=e.querySelector("#planned-duties-select-all"),a=e.querySelector("#open-bulk-delete-planned-duty"),i=e.querySelector("#add-selected-to-actual-duty"),o=B.selectionEnabled!==!1;o||(B.selectedIds=[]),B.selectedIds=B.selectedIds.filter(p=>B.rows.some(m=>m.id===p));const l=B.rows.filter(p=>{var b;const m=zi(p.employees).toLowerCase(),h=(((b=p.duties)==null?void 0:b.name)||"").toLowerCase(),f=(p.date||"").toLowerCase(),w=!B.searchQuery||m.includes(B.searchQuery)||h.includes(B.searchQuery)||f.includes(B.searchQuery),y=!B.dateFilter||p.date===B.dateFilter,v=!B.roleFilter||p.assignment_role===B.roleFilter;return w&&y&&v});if(!l.length){B.visibleRowIds=[],r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма планирани повески.",s&&(s.checked=!1,s.indeterminate=!1,s.disabled=!o,(c=s.closest("th"))==null||c.classList.toggle("d-none",!o)),a&&(a.disabled=!o||B.selectedIds.length===0,a.textContent=B.selectedIds.length?`Изтрий избраните (${B.selectedIds.length})`:"Изтрий избраните"),i&&(i.disabled=!o||B.selectedIds.length===0,i.textContent=B.selectedIds.length?`Към Актуални (${B.selectedIds.length})`:"Към Актуални");return}B.visibleRowIds=l.map(p=>p.id),n.classList.add("d-none"),s&&(s.disabled=!o,(u=s.closest("th"))==null||u.classList.toggle("d-none",!o)),r.innerHTML=l.map(p=>{var f;const m=Eh(p),h=o&&B.selectedIds.includes(p.id);return`
        <tr>
          ${o?`
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              data-select-id="${p.id}"
              ${h?"checked":""}
              aria-label="Избери планиране"
            />
          </td>
          `:""}
          <td>${rt(p.date??"-")}</td>
          <td>${rt(zi(p.employees))}</td>
          <td>${rt($h(p.assignment_role))}</td>
          <td>${rt(((f=p.duties)==null?void 0:f.name)??"-")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${p.id}"
                data-date="${rt(p.date??"")}"
                data-employee-id="${p.employee_id??""}"
                data-duty-id="${p.duty_id??""}"
                data-assignment-role="${p.assignment_role??"conductor"}"
                data-duty-schedule-key-id="${m}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${p.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("");const d=l.filter(p=>B.selectedIds.includes(p.id)).length;s&&(s.disabled=!o,s.checked=o&&d>0&&d===l.length,s.indeterminate=o&&d>0&&d<l.length),a&&(a.disabled=!o||B.selectedIds.length===0,a.textContent=B.selectedIds.length?`Изтрий избраните (${B.selectedIds.length})`:"Изтрий избраните"),i&&(i.disabled=!o||B.selectedIds.length===0,i.textContent=B.selectedIds.length?`Към Актуални (${B.selectedIds.length})`:"Към Актуални")}function Eh(e){var r,n,s;return((s=(Array.isArray((r=e==null?void 0:e.duties)==null?void 0:r.schedule_key_duties)?e.duties.schedule_key_duties:(n=e==null?void 0:e.duties)!=null&&n.schedule_key_duties?[e.duties.schedule_key_duties]:[]).find(a=>a==null?void 0:a.schedule_key_id))==null?void 0:s.schedule_key_id)||""}function $h(e){return e==="chief"?"Началник влак":"Кондуктор"}let Ra=[];async function Ah(e){const t=e.querySelector("#planned-duty-employee"),r=e.querySelector("#planned-duty-auto-employee"),{data:n,error:s}=await S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(s){g(s.message,"error");return}const i='<option value="">Избери служител</option>'+(n||[]).map(o=>{const l=`${o.first_name??""} ${o.last_name??""}`.trim()||"-";return`<option value="${o.id}">${rt(l)}</option>`}).join("");t.innerHTML=i,r.innerHTML=i}async function Ch(e){const t=e.querySelector("#planned-duty-schedule-key"),r=e.querySelector("#planned-duty-auto-schedule-key"),{data:n,error:s}=await S.from("schedule_keys").select("id, name, crew_role").order("name",{ascending:!0});if(s){g(s.message,"error");return}const i='<option value="">Избери ключ-график</option>'+(n||[]).map(o=>{const l=Rh(o.crew_role),d=l?`${o.name??"-"} (${l})`:o.name??"-";return`<option value="${o.id}">${rt(d)}</option>`}).join("");t.innerHTML=i,r.innerHTML=i}function Rh(e){return e==="началник влак"?"Началник влак":e==="кондуктор"?"Кондуктор":""}async function Ih(e){const{data:t,error:r}=await S.from("schedule_key_duties").select("schedule_key_id, duty_id, duties(id, name)");if(r){g(r.message,"error");return}const n=new Map;(t||[]).forEach(s=>{const a=s==null?void 0:s.duties;if(!(a!=null&&a.id))return;const i=n.get(a.id)||{id:a.id,name:a.name||"-",scheduleKeyIds:[]};s.schedule_key_id&&!i.scheduleKeyIds.includes(s.schedule_key_id)&&i.scheduleKeyIds.push(s.schedule_key_id),n.set(a.id,i)}),Ra=Array.from(n.values()).sort((s,a)=>String(s.name||"").localeCompare(String(a.name||""),"bg")),ls(e,"","")}function ls(e,t,r){const n=e.querySelector("#planned-duty-duty");if(!n)return;if(!t){n.innerHTML='<option value="">Първо избери ключ-график</option>',n.value="";return}const s=Ra.filter(a=>{var i;return(i=a.scheduleKeyIds)==null?void 0:i.includes(t)}).map(a=>{const i=a.id===r?"selected":"";return`<option value="${a.id}" ${i}>${rt(a.name??"-")}</option>`}).join("");n.innerHTML='<option value="">Избери повеска</option>'+s,r&&(n.value=r)}function Dh(e,t){var n;const r=Ra.find(s=>s.id===e);return!!(r&&((n=r.scheduleKeyIds)!=null&&n.includes(t)))}const qs=new Map;async function Wi(e,t,r){const n=e.querySelector("#planned-duty-auto-start-duty");if(!n)return;if(!t){n.innerHTML='<option value="">Първо избери ключ-график</option>',n.value="";return}const s=await nl(t);if(!s.length){n.innerHTML='<option value="">Няма повески за този ключ-график</option>',n.value="";return}const a=s.map(i=>{const o=i.id===r?"selected":"";return`<option value="${i.id}" ${o}>${rt(i.name??"-")}</option>`}).join("");n.innerHTML='<option value="">Избери стартова повеска</option>'+a}function rl(e){e.querySelector("#planned-duty-auto-employee").value="",e.querySelector("#planned-duty-auto-assignment-role").value="conductor",e.querySelector("#planned-duty-auto-date-from").value="",e.querySelector("#planned-duty-auto-date-to").value="",e.querySelector("#planned-duty-auto-schedule-key").value="",e.querySelector("#planned-duty-auto-overwrite").checked=!1,e.querySelector("#planned-duty-auto-start-duty").innerHTML='<option value="">Първо избери ключ-график</option>'}async function Oh(e,t){var q;const r=e.querySelector("#planned-duty-auto-employee").value||null,n=e.querySelector("#planned-duty-auto-assignment-role").value||"",s=e.querySelector("#planned-duty-auto-date-from").value,a=e.querySelector("#planned-duty-auto-date-to").value,i=e.querySelector("#planned-duty-auto-schedule-key").value||null,o=e.querySelector("#planned-duty-auto-start-duty").value||null,l=e.querySelector("#planned-duty-auto-overwrite").checked,d=e.querySelector("#planned-duty-auto-save-btn");if(!r||!n||!s||!a||!i||!o){g("Моля, попълни всички полета за автоматично планиране.","warning");return}if(!["chief","conductor"].includes(n)){g("Невалидна роля. Избери Кондуктор или Началник влак.","warning");return}if(a<s){g('Полето "До дата" трябва да е след или равно на "От дата".',"warning");return}const c=await nl(i);if(!c.length){g("Няма повески за избрания ключ-график.","warning");return}const u=c.findIndex(T=>T.id===o);if(u<0){g("Избери валидна стартова повеска.","warning");return}const p=Ph(s,a);if(!p.length){g("Невалиден период.","warning");return}const m=d.innerHTML;d.disabled=!0,d.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Генериране...';const{data:h}=await S.auth.getUser(),f=((q=h==null?void 0:h.user)==null?void 0:q.email)??"web_app",{data:w,error:y}=await S.from("planned_duties").select("date").eq("employee_id",r).gte("date",s).lte("date",a);if(y){d.disabled=!1,d.innerHTML=m,g(y.message,"error");return}const v=new Set((w||[]).map(T=>T.date)),b=v.size,_=[];let k=0;if(p.forEach((T,E)=>{if(!l&&v.has(T)){k+=1;return}const $=c[(u+E)%c.length];_.push({date:T,employee_id:r,assignment_role:n,duty_id:$.id,created_from:f})}),!_.length){d.disabled=!1,d.innerHTML=m,g("Няма нови записи за създаване. За периода вече има планиране за служителя.","warning");return}if(l){const{error:T}=await S.from("planned_duties").delete().eq("employee_id",r).gte("date",s).lte("date",a);if(T){d.disabled=!1,d.innerHTML=m,g(T.message,"error");return}}let x=null;for(let T=0;T<_.length;T+=200){const E=_.slice(T,T+200),{error:$}=await S.from("planned_duties").insert(E);if($){x=$;break}}if(d.disabled=!1,d.innerHTML=m,x){g(x.message,"error");return}Ue(e.querySelector("#planned-duty-auto-modal")),rl(e),await t();const L=_.length;if(l){g(`Създадени записи: ${L}. Презаписани дати: ${b}.`,"success");return}if(k>0){g(`Създадени: ${L}. Пропуснати (вече съществуват за датата): ${k}.`,"success");return}g(`Създадени записи: ${L}.`,"success")}async function nl(e){if(!e)return[];if(qs.has(e))return qs.get(e);const{data:t,error:r}=await S.from("schedule_key_duties").select("duty_id, duties(id, name, display_order)").eq("schedule_key_id",e);if(r)return g(r.message,"error"),[];const n=(t||[]).map(s=>{var a,i,o;return{id:(a=s==null?void 0:s.duties)==null?void 0:a.id,name:((i=s==null?void 0:s.duties)==null?void 0:i.name)||"-",displayOrder:Number((o=s==null?void 0:s.duties)==null?void 0:o.display_order)||0}}).filter(s=>s.id).sort((s,a)=>s.displayOrder!==a.displayOrder?s.displayOrder-a.displayOrder:String(s.name||"").localeCompare(String(a.name||""),"bg"));return qs.set(e,n),n}function Ph(e,t){const r=[],n=new Date(`${e}T00:00:00`),s=new Date(`${t}T00:00:00`);if(Number.isNaN(n.getTime())||Number.isNaN(s.getTime())||n>s)return r;for(let a=new Date(n);a<=s;a.setDate(a.getDate()+1)){const i=a.getFullYear(),o=String(a.getMonth()+1).padStart(2,"0"),l=String(a.getDate()).padStart(2,"0");r.push(`${i}-${o}-${l}`)}return r}function Mh(e){if(!B.selectedIds.length){g("Избери поне едно планиране за изтриване.","warning");return}const t=e.querySelector("#planned-duty-bulk-delete-count");t&&(t.textContent=String(B.selectedIds.length)),Hr(e.querySelector("#planned-duty-bulk-delete-modal"))}function jh(e){const t=B.visibleRowIds||[];if(e){const r=new Set(B.selectedIds);t.forEach(n=>r.add(n)),B.selectedIds=Array.from(r);return}B.selectedIds=B.selectedIds.filter(r=>!t.includes(r))}function Nh(e,t){if(e){if(t){B.selectedIds.includes(e)||(B.selectedIds=[...B.selectedIds,e]);return}B.selectedIds=B.selectedIds.filter(r=>r!==e)}}async function Hh(e,t){const r=e.querySelector("#planned-duty-bulk-delete-confirm"),n=[...B.selectedIds];if(!n.length){Ue(e.querySelector("#planned-duty-bulk-delete-modal"));return}const s=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';let a=null;for(let o=0;o<n.length;o+=200){const l=n.slice(o,o+200),{error:d}=await S.from("planned_duties").delete().in("id",l);if(d){a=d;break}}if(r.disabled=!1,r.innerHTML=s,a){g(a.message,"error");return}const i=n.length;B.selectedIds=[],Ue(e.querySelector("#planned-duty-bulk-delete-modal")),await t(),g(`Изтрити планирания: ${i}.`,"success")}async function Uh(e,t){const r=e.querySelector("#add-selected-to-actual-duty"),n=[...B.selectedIds];if(!n.length){g("Избери поне едно планиране за прехвърляне към Актуални.","warning");return}const s=new Set(n),a=B.rows.filter(c=>s.has(c.id));if(!a.length){g("Няма валидни избрани планирания за прехвърляне.","warning");return}const i=a.filter(c=>(c==null?void 0:c.date)&&(c==null?void 0:c.employee_id)&&(c==null?void 0:c.duty_id)).map(c=>({date:c.date,employee_id:c.employee_id,duty_id:c.duty_id,assignment_role:c.assignment_role||"conductor"}));if(!i.length){g("Избраните записи са невалидни за прехвърляне.","warning");return}const o=(r==null?void 0:r.innerHTML)||"Към Актуални";r&&(r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Прехвърляне...');let l=null;for(let c=0;c<i.length;c+=200){const u=i.slice(c,c+200),{error:p}=await S.from("actual_duties").upsert(u,{onConflict:"date,employee_id,duty_id",ignoreDuplicates:!0});if(p){l=p;break}}if(r&&(r.disabled=!1,r.innerHTML=o),l){g(l.message,"error");return}const d=i.length;B.selectedIds=[],await t(),g(`Прехвърлени към Актуални: ${d}. Съществуващите са пропуснати.`,"success")}async function Fh(e){e.innerHTML=Lh,B.selectionEnabled=!await mn(),Bh(e),Kh(e),await Ah(e),await Ch(e),await Ih(e),await vr(e)}function Bh(e){var r,n;if(B.selectionEnabled)return;(r=e.querySelector(".page-actions"))==null||r.classList.add("d-none");const t=e.querySelector("#planned-duties-select-all");(n=t==null?void 0:t.closest("th"))==null||n.classList.add("d-none")}function Kh(e){const t=e.querySelector("#open-create-planned-duty"),r=e.querySelector("#open-bulk-delete-planned-duty"),n=e.querySelector("#add-selected-to-actual-duty"),s=e.querySelector("#go-to-plan-schedule"),a=e.querySelector("#open-auto-plan-duty"),i=e.querySelector("#planned-duty-form"),o=e.querySelector("#planned-duty-auto-form"),l=e.querySelector("#planned-duty-cancel-btn"),d=e.querySelector("#planned-duty-auto-cancel-btn"),c=e.querySelector("#planned-duties-table-body"),u=e.querySelector("#planned-duty-modal"),p=e.querySelector("#planned-duty-auto-modal"),m=e.querySelector("#planned-duty-delete-modal"),h=e.querySelector("#planned-duty-bulk-delete-modal"),f=e.querySelector("#planned-duty-modal-close"),w=e.querySelector("#planned-duty-auto-modal-close"),y=e.querySelector("#planned-duty-delete-confirm"),v=e.querySelector("#planned-duty-delete-cancel"),b=e.querySelector("#planned-duty-bulk-delete-confirm"),_=e.querySelector("#planned-duty-bulk-delete-cancel"),k=e.querySelector("#planned-duties-select-all"),x=e.querySelector("#planned-duties-search"),L=e.querySelector("#planned-duties-date-filter"),q=e.querySelector("#planned-duties-role-filter"),T=e.querySelector("#planned-duties-filter-reset"),E=e.querySelector("#planned-duty-schedule-key"),$=e.querySelector("#planned-duty-auto-schedule-key");t==null||t.addEventListener("click",()=>{Ia(e),Hr(u)}),r==null||r.addEventListener("click",()=>{B.selectionEnabled&&Mh(e)}),n==null||n.addEventListener("click",async()=>{B.selectionEnabled&&await Uh(e,async()=>{await vr(e)})}),a==null||a.addEventListener("click",async()=>{rl(e),Hr(p),await Wi(e,($==null?void 0:$.value)||"","")}),i==null||i.addEventListener("submit",async A=>{A.preventDefault(),await zh(e)}),o==null||o.addEventListener("submit",async A=>{A.preventDefault(),await Oh(e,async()=>{await vr(e)})}),l==null||l.addEventListener("click",()=>{Ue(u)}),f==null||f.addEventListener("click",()=>{Ue(u)}),w==null||w.addEventListener("click",()=>{Ue(p)}),d==null||d.addEventListener("click",()=>{Ue(p)}),v==null||v.addEventListener("click",()=>{Ue(m)}),_==null||_.addEventListener("click",()=>{Ue(h)}),x==null||x.addEventListener("input",A=>{B.searchQuery=A.target.value.trim().toLowerCase(),dt(e)}),L==null||L.addEventListener("change",A=>{B.dateFilter=A.target.value||"",Ls(s,B.dateFilter),dt(e)}),q==null||q.addEventListener("change",A=>{B.roleFilter=A.target.value||"",dt(e)}),T==null||T.addEventListener("click",()=>{B.searchQuery="",B.dateFilter="",B.roleFilter="",x&&(x.value=""),L&&(L.value=""),q&&(q.value=""),Ls(s,B.dateFilter),dt(e)}),s==null||s.addEventListener("click",()=>{const A=B.dateFilter||(L==null?void 0:L.value)||"";if(!A){g("Избери дата от филтъра, за да отвориш План-График.","warning");return}const C=new URLSearchParams({date:A});window.history.pushState({},"",`/plan-schedule?${C.toString()}`),window.dispatchEvent(new PopStateEvent("popstate"))}),Ls(s,B.dateFilter||(L==null?void 0:L.value)||""),E==null||E.addEventListener("change",()=>{ls(e,E.value||"","")}),$==null||$.addEventListener("change",async()=>{await Wi(e,$.value||"","")}),k==null||k.addEventListener("change",()=>{B.selectionEnabled&&(jh(k.checked),dt(e))}),Th("planned-duties",[m,h,p,u]),y==null||y.addEventListener("click",async()=>{const A=e.querySelector("#planned-duty-delete-id").value;await Vh(A,e)}),b==null||b.addEventListener("click",async()=>{await Hh(e,async()=>{await vr(e)})}),c==null||c.addEventListener("change",A=>{if(!B.selectionEnabled)return;const C=A.target.closest("input[data-select-id]");if(!C)return;const I=C.getAttribute("data-select-id");Nh(I,C.checked),dt(e)}),c==null||c.addEventListener("click",A=>{const C=A.target.closest("button[data-action]");if(!C)return;const I=C.getAttribute("data-action");if(I==="edit"){Wh(e,{id:C.getAttribute("data-id"),date:C.getAttribute("data-date"),employeeId:C.getAttribute("data-employee-id"),assignmentRole:C.getAttribute("data-assignment-role")||"conductor",dutyId:C.getAttribute("data-duty-id"),dutyScheduleKeyId:C.getAttribute("data-duty-schedule-key-id")}),Hr(u);return}if(I==="delete"){const R=C.getAttribute("data-id");e.querySelector("#planned-duty-delete-id").value=R,Hr(m)}})}async function zh(e){var y;const t=e.querySelector("#planned-duty-id"),r=e.querySelector("#planned-duty-date"),n=e.querySelector("#planned-duty-employee"),s=e.querySelector("#planned-duty-assignment-role"),a=e.querySelector("#planned-duty-schedule-key"),i=e.querySelector("#planned-duty-duty"),o=e.querySelector("#planned-duty-save-btn"),l=r.value,d=n.value||null,c=s.value||"",u=a.value||null,p=i.value||null,m=t.value;if(!l||!d||!c||!u||!p){g("Моля, попълни всички полета.","warning");return}if(!["chief","conductor"].includes(c)){g("Невалидна роля. Избери Кондуктор или Началник влак.","warning");return}if(!Dh(p,u)){g("Избери повеска от посочения ключ-график.","warning");return}const h=o.innerHTML;o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const f={date:l,employee_id:d,assignment_role:c,duty_id:p};let w;if(m)({error:w}=await S.from("planned_duties").update(f).eq("id",m));else{const{data:v}=await S.auth.getUser(),b=((y=v==null?void 0:v.user)==null?void 0:y.email)??"web_app";({error:w}=await S.from("planned_duties").insert({...f,created_from:b}))}if(o.disabled=!1,o.innerHTML=h,w){if(w.code==="23505"){g("Това планиране вече съществува за тази дата.","warning");return}g(w.message,"error");return}g(m?"Планирането е обновено.":"Планирането е създадено.","success"),Ue(e.querySelector("#planned-duty-modal")),Ia(e),await vr(e)}function Wh(e,t){e.querySelector("#planned-duty-id").value=t.id,e.querySelector("#planned-duty-date").value=t.date??"",e.querySelector("#planned-duty-employee").value=t.employeeId??"",e.querySelector("#planned-duty-assignment-role").value=t.assignmentRole??"conductor",e.querySelector("#planned-duty-schedule-key").value=t.dutyScheduleKeyId??"",ls(e,t.dutyScheduleKeyId??"",t.dutyId??""),e.querySelector("#planned-duty-form-title").textContent="Редакция на планиране",e.querySelector("#planned-duty-save-btn").textContent="Запази"}function Ia(e){e.querySelector("#planned-duty-id").value="",e.querySelector("#planned-duty-date").value="",e.querySelector("#planned-duty-employee").value="",e.querySelector("#planned-duty-assignment-role").value="conductor",e.querySelector("#planned-duty-schedule-key").value="",ls(e,"",""),e.querySelector("#planned-duty-form-title").textContent="Ново планиране",e.querySelector("#planned-duty-save-btn").textContent="Създай"}async function Vh(e,t){const r=t.querySelector("#planned-duty-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("planned_duties").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,s){g(s.message,"error");return}g("Планирането е изтрито.","success"),B.selectedIds=B.selectedIds.filter(a=>a!==e),Ue(t.querySelector("#planned-duty-delete-modal")),Ia(t),await vr(t)}function Ls(e,t){e&&(e.disabled=!t)}const Gh=`<section class="card border-0 shadow-sm">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-2 mb-3">\r
      <h1 class="h3 mb-0">Реално изпълнение</h1>\r
      <div class="d-flex gap-2 page-actions">\r
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
      <table class="table align-middle table-mobile-wrap">\r
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
`;function Dt(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const Vi=new Map;function Jh(e,t){const r=Vi.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Re(a);return}}};Vi.set(e,n),document.addEventListener("keydown",n)}function Re(e){var t,r,n,s,a;e.classList.add("d-none"),(t=document.querySelector("#actual-duty-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#actual-duty-delete-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#actual-duty-bulk-delete-modal"))!=null&&n.classList.contains("d-none"))&&((s=document.querySelector("#actual-duty-bulk-add-modal"))!=null&&s.classList.contains("d-none"))&&((a=document.querySelector("#actual-duty-profile-modal"))!=null&&a.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function ie(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const M={rows:[],searchQuery:"",dateFilter:"",roleFilter:"",selectedIds:[],visibleRowIds:[],selectionEnabled:!0,crewEditTimeOnly:!1,plannedRows:[],plannedSearchQuery:"",plannedDateFilter:"",plannedSelectedIds:[],plannedVisibleRowIds:[]};function Gi(e){return e&&`${e.first_name??""} ${e.last_name??""}`.trim()||"-"}async function fn(e){const{data:t,error:r}=await S.from("actual_duties").select("id, date, employee_id, duty_id, assignment_role, start_time_override, end_time_override, break_start_time_override, break_end_time_override, employees(first_name, last_name), duties(name, start_time, end_time, break_start_time, break_end_time, schedule_key_duties(schedule_key_id))").order("date",{ascending:!1});if(r){g(r.message,"error"),M.rows=[],ct(e,"Грешка при зареждане на реалните повески.");return}M.rows=t||[],ct(e)}function ct(e,t){var d,c;const r=e.querySelector("#actual-duties-table-body"),n=e.querySelector("#actual-duties-empty"),s=e.querySelector("#actual-duties-select-all"),a=e.querySelector("#open-bulk-delete-actual-duty"),i=M.selectionEnabled!==!1;i||(M.selectedIds=[]),M.selectedIds=M.selectedIds.filter(u=>M.rows.some(p=>p.id===u));const o=M.rows.filter(u=>{var v;const p=Gi(u.employees).toLowerCase(),m=(((v=u.duties)==null?void 0:v.name)||"").toLowerCase(),h=(u.date||"").toLowerCase(),f=!M.searchQuery||p.includes(M.searchQuery)||m.includes(M.searchQuery)||h.includes(M.searchQuery),w=!M.dateFilter||u.date===M.dateFilter,y=!M.roleFilter||u.assignment_role===M.roleFilter;return f&&w&&y});if(!o.length){M.visibleRowIds=[],r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма записи за реално изпълнение.",s&&(s.checked=!1,s.indeterminate=!1,s.disabled=!i,(d=s.closest("th"))==null||d.classList.toggle("d-none",!i)),a&&(a.disabled=!i||M.selectedIds.length===0,a.textContent=M.selectedIds.length?`Изтрий избраните (${M.selectedIds.length})`:"Изтрий избраните");return}M.visibleRowIds=o.map(u=>u.id),n.classList.add("d-none"),s&&(s.disabled=!i,(c=s.closest("th"))==null||c.classList.toggle("d-none",!i)),r.innerHTML=o.map(u=>{var h,f,w,y,v;const p=Qh(u),m=i&&M.selectedIds.includes(u.id);return`
        <tr>
          ${i?`
          <td>
            <input
              type="checkbox"
              class="form-check-input"
              data-select-id="${u.id}"
              ${m?"checked":""}
              aria-label="Избери запис"
            />
          </td>
          `:""}
          <td>${ie(u.date??"-")}</td>
          <td>${ie(Gi(u.employees))}</td>
          <td>${ie(Yh(u.assignment_role))}</td>
          <td>${ie(((h=u.duties)==null?void 0:h.name)??"-")}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-action="profile"
                data-id="${u.id}"
              >
                Профил
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${u.id}"
                data-date="${ie(u.date??"")}"
                data-employee-id="${u.employee_id??""}"
                data-duty-id="${u.duty_id??""}"
                data-assignment-role="${u.assignment_role??"conductor"}"
                data-duty-schedule-key-id="${p}"
                data-start-time-override="${ie((u.start_time_override||"").slice(0,5))}"
                data-end-time-override="${ie((u.end_time_override||"").slice(0,5))}"
                data-break-start-time-override="${ie((u.break_start_time_override||"").slice(0,5))}"
                data-break-end-time-override="${ie((u.break_end_time_override||"").slice(0,5))}"
                data-duty-start-time="${ie((((f=u.duties)==null?void 0:f.start_time)||"").slice(0,5))}"
                data-duty-end-time="${ie((((w=u.duties)==null?void 0:w.end_time)||"").slice(0,5))}"
                data-duty-break-start-time="${ie((((y=u.duties)==null?void 0:y.break_start_time)||"").slice(0,5))}"
                data-duty-break-end-time="${ie((((v=u.duties)==null?void 0:v.break_end_time)||"").slice(0,5))}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${u.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("");const l=o.filter(u=>M.selectedIds.includes(u.id)).length;s&&(s.disabled=!i,s.checked=i&&l>0&&l===o.length,s.indeterminate=i&&l>0&&l<o.length),a&&(a.disabled=!i||M.selectedIds.length===0,a.textContent=M.selectedIds.length?`Изтрий избраните (${M.selectedIds.length})`:"Изтрий избраните")}function Qh(e){var r,n,s;return((s=(Array.isArray((r=e==null?void 0:e.duties)==null?void 0:r.schedule_key_duties)?e.duties.schedule_key_duties:(n=e==null?void 0:e.duties)!=null&&n.schedule_key_duties?[e.duties.schedule_key_duties]:[]).find(a=>a==null?void 0:a.schedule_key_id))==null?void 0:s.schedule_key_id)||""}function Yh(e){return e==="chief"?"Началник влак":"Кондуктор"}let ds=[];async function Xh(e){e.innerHTML=Gh;const t=await mn();M.selectionEnabled=!t,M.crewEditTimeOnly=t,Zh(e);const r=hm(),n=e.querySelector("#actual-duties-date-filter");r&&n&&(n.value=r,M.dateFilter=r),em(e),await tm(e),await rm(e),await nm(e),await fn(e)}function Zh(e){var t,r,n;M.selectionEnabled||((t=e.querySelector("#open-bulk-delete-actual-duty"))==null||t.classList.add("d-none"),(n=(r=e.querySelector("#actual-duties-select-all"))==null?void 0:r.closest("th"))==null||n.classList.add("d-none"))}function Ts(e,t){["actual-duty-date","actual-duty-employee","actual-duty-schedule-key","actual-duty-duty","actual-duty-assignment-role"].forEach(n=>{const s=e.querySelector(`#${n}`),a=(s==null?void 0:s.closest(".col-md-4"))||(s==null?void 0:s.closest(".col-md-3"))||(s==null?void 0:s.closest(".col-12"));a&&a.classList.toggle("d-none",t),s&&(s.disabled=t)})}function em(e){const t=e.querySelector("#open-create-actual-duty"),r=e.querySelector("#go-to-schedule"),n=e.querySelector("#open-bulk-delete-actual-duty"),s=e.querySelector("#open-bulk-add-actual-duty"),a=e.querySelector("#actual-duty-form"),i=e.querySelector("#actual-duties-table-body"),o=e.querySelector("#actual-duty-modal"),l=e.querySelector("#actual-duty-delete-modal"),d=e.querySelector("#actual-duty-bulk-delete-modal"),c=e.querySelector("#actual-duty-bulk-add-modal"),u=e.querySelector("#actual-duty-profile-modal"),p=e.querySelector("#actual-duty-modal-close"),m=e.querySelector("#actual-duty-cancel-btn"),h=e.querySelector("#actual-duty-profile-close"),f=e.querySelector("#actual-duty-profile-close-secondary"),w=e.querySelector("#actual-duty-delete-confirm"),y=e.querySelector("#actual-duty-delete-cancel"),v=e.querySelector("#actual-duty-bulk-delete-confirm"),b=e.querySelector("#actual-duty-bulk-delete-cancel"),_=e.querySelector("#actual-duty-bulk-add-modal-close"),k=e.querySelector("#actual-duty-bulk-add-cancel"),x=e.querySelector("#actual-duty-bulk-add-confirm"),L=e.querySelector("#actual-duty-bulk-add-search"),q=e.querySelector("#actual-duty-bulk-add-date-filter"),T=e.querySelector("#actual-duty-bulk-add-filter-reset"),E=e.querySelector("#actual-duty-bulk-add-select-all"),$=e.querySelector("#actual-duty-bulk-add-table-body"),A=e.querySelector("#actual-duties-search"),C=e.querySelector("#actual-duties-date-filter"),I=e.querySelector("#actual-duties-role-filter"),R=e.querySelector("#actual-duties-filter-reset"),W=e.querySelector("#actual-duty-schedule-key"),K=e.querySelector("#actual-duties-select-all");t==null||t.addEventListener("click",()=>{sl(e),Ts(e,!1),Dt(o)}),n==null||n.addEventListener("click",()=>{if(!M.selectionEnabled)return;if(!M.selectedIds.length){g("Избери поне един запис за изтриване.","warning");return}const j=e.querySelector("#actual-duty-bulk-delete-count");j&&(j.textContent=String(M.selectedIds.length)),Dt(d)}),s==null||s.addEventListener("click",async()=>{Yi(e),await um(e),Dt(c)}),a==null||a.addEventListener("submit",async j=>{j.preventDefault(),await om(e)}),p==null||p.addEventListener("click",()=>{Re(o)}),m==null||m.addEventListener("click",()=>{Re(o)}),h==null||h.addEventListener("click",()=>{Re(u)}),f==null||f.addEventListener("click",()=>{Re(u)}),y==null||y.addEventListener("click",()=>{Re(l)}),b==null||b.addEventListener("click",()=>{Re(d)}),_==null||_.addEventListener("click",()=>{Re(c)}),k==null||k.addEventListener("click",()=>{Re(c)}),A==null||A.addEventListener("input",j=>{M.searchQuery=j.target.value.trim().toLowerCase(),ct(e)}),C==null||C.addEventListener("change",j=>{M.dateFilter=j.target.value||"",Es(r,M.dateFilter),ct(e)}),I==null||I.addEventListener("change",j=>{M.roleFilter=j.target.value||"",ct(e)}),R==null||R.addEventListener("click",()=>{M.searchQuery="",M.dateFilter="",M.roleFilter="",A&&(A.value=""),C&&(C.value=""),I&&(I.value=""),Es(r,M.dateFilter),ct(e)}),r==null||r.addEventListener("click",()=>{const j=M.dateFilter||(C==null?void 0:C.value)||"";if(!j){g("Избери дата от филтъра, за да отвориш График.","warning");return}const z=new URLSearchParams({date:j});window.history.pushState({},"",`/schedule?${z.toString()}`),window.dispatchEvent(new PopStateEvent("popstate"))}),Es(r,M.dateFilter||(C==null?void 0:C.value)||""),W==null||W.addEventListener("change",()=>{cs(e,W.value||"",""),Qi(e)});const V=e.querySelector("#actual-duty-duty");V==null||V.addEventListener("change",()=>{Qi(e)}),K==null||K.addEventListener("change",()=>{if(!M.selectionEnabled)return;const j=M.visibleRowIds||[];if(K.checked){const z=new Set(M.selectedIds);j.forEach(ee=>z.add(ee)),M.selectedIds=Array.from(z)}else M.selectedIds=M.selectedIds.filter(z=>!j.includes(z));ct(e)}),w==null||w.addEventListener("click",async()=>{const j=e.querySelector("#actual-duty-delete-id").value;await dm(j,e)}),v==null||v.addEventListener("click",async()=>{await cm(e)}),x==null||x.addEventListener("click",async()=>{await pm(e)}),L==null||L.addEventListener("input",j=>{M.plannedSearchQuery=j.target.value.trim().toLowerCase(),Ot(e)}),q==null||q.addEventListener("change",j=>{M.plannedDateFilter=j.target.value||"",Ot(e)}),T==null||T.addEventListener("click",()=>{Yi(e),Ot(e)}),E==null||E.addEventListener("change",()=>{const j=M.plannedVisibleRowIds||[];if(E.checked){const z=new Set(M.plannedSelectedIds);j.forEach(ee=>z.add(ee)),M.plannedSelectedIds=Array.from(z)}else M.plannedSelectedIds=M.plannedSelectedIds.filter(z=>!j.includes(z));Ot(e)}),$==null||$.addEventListener("change",j=>{const z=j.target.closest("input[data-planned-select-id]");if(!z)return;const ee=z.getAttribute("data-planned-select-id");ee&&(z.checked?M.plannedSelectedIds.includes(ee)||(M.plannedSelectedIds=[...M.plannedSelectedIds,ee]):M.plannedSelectedIds=M.plannedSelectedIds.filter(le=>le!==ee),Ot(e))}),i==null||i.addEventListener("change",j=>{if(!M.selectionEnabled)return;const z=j.target.closest("input[data-select-id]");if(!z)return;const ee=z.getAttribute("data-select-id");ee&&(z.checked?M.selectedIds.includes(ee)||(M.selectedIds=[...M.selectedIds,ee]):M.selectedIds=M.selectedIds.filter(le=>le!==ee),ct(e))}),i==null||i.addEventListener("click",j=>{const z=j.target.closest("button[data-action]");if(!z)return;const ee=z.getAttribute("data-action");if(ee==="profile"){const le=z.getAttribute("data-id");mm(e,le);return}if(ee==="edit"){lm(e,{id:z.getAttribute("data-id"),date:z.getAttribute("data-date"),employeeId:z.getAttribute("data-employee-id"),assignmentRole:z.getAttribute("data-assignment-role")||"conductor",dutyId:z.getAttribute("data-duty-id"),dutyScheduleKeyId:z.getAttribute("data-duty-schedule-key-id"),startTimeOverride:z.getAttribute("data-start-time-override")||"",endTimeOverride:z.getAttribute("data-end-time-override")||"",breakStartTimeOverride:z.getAttribute("data-break-start-time-override")||"",breakEndTimeOverride:z.getAttribute("data-break-end-time-override")||"",dutyStartTime:z.getAttribute("data-duty-start-time")||"",dutyEndTime:z.getAttribute("data-duty-end-time")||"",dutyBreakStartTime:z.getAttribute("data-duty-break-start-time")||"",dutyBreakEndTime:z.getAttribute("data-duty-break-end-time")||""}),M.crewEditTimeOnly?Ts(e,!0):Ts(e,!1),Dt(o);return}if(ee==="delete"){const le=z.getAttribute("data-id");e.querySelector("#actual-duty-delete-id").value=le,Dt(l)}}),Jh("actual-duties",[u,l,d,c,o])}async function tm(e){const t=e.querySelector("#actual-duty-employee"),{data:r,error:n}=await S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(n){g(n.message,"error");return}const s=(r||[]).map(a=>{const i=`${a.first_name??""} ${a.last_name??""}`.trim()||"-";return`<option value="${a.id}">${ie(i)}</option>`}).join("");t.innerHTML='<option value="">Избери служител</option>'+s}async function rm(e){const t=e.querySelector("#actual-duty-schedule-key"),{data:r,error:n}=await S.from("schedule_keys").select("id, name").order("name",{ascending:!0});if(n){g(n.message,"error");return}const s=(r||[]).map(a=>`<option value="${a.id}">${ie(a.name??"-")}</option>`).join("");t.innerHTML='<option value="">Избери ключ-график</option>'+s}async function nm(e){const{data:t,error:r}=await S.from("schedule_key_duties").select("schedule_key_id, duty_id, duties(id, name, start_time, end_time, break_start_time, break_end_time)");if(r){g(r.message,"error");return}const n=new Map;(t||[]).forEach(s=>{const a=s==null?void 0:s.duties;if(!(a!=null&&a.id))return;const i=n.get(a.id)||{id:a.id,name:a.name||"-",scheduleKeyIds:[],startTime:vt(a.start_time),endTime:vt(a.end_time),breakStartTime:vt(a.break_start_time),breakEndTime:vt(a.break_end_time)};s.schedule_key_id&&!i.scheduleKeyIds.includes(s.schedule_key_id)&&i.scheduleKeyIds.push(s.schedule_key_id),n.set(a.id,i)}),ds=Array.from(n.values()).sort((s,a)=>String(s.name||"").localeCompare(String(a.name||""),"bg")),cs(e,"","")}function cs(e,t,r){const n=e.querySelector("#actual-duty-duty");if(!n)return;if(!t){n.innerHTML='<option value="">Първо избери ключ-график</option>',n.value="";return}const s=ds.filter(a=>{var i;return(i=a.scheduleKeyIds)==null?void 0:i.includes(t)}).map(a=>{const i=a.id===r?"selected":"";return`<option value="${a.id}" ${i}>${ie(a.name??"-")}</option>`}).join("");n.innerHTML='<option value="">Избери повеска</option>'+s,r&&(n.value=r)}function sm(e,t){var n;const r=ds.find(s=>s.id===e);return!!(r&&((n=r.scheduleKeyIds)!=null&&n.includes(t)))}function am(e){return ds.find(t=>t.id===e)||null}function vt(e){return e?String(e).slice(0,5):""}function qe(e,t=""){const r=String(e||"").slice(0,5);return/^\d{2}:\d{2}$/.test(r)?r:t}function ot(e){const t=qe(e,"");return t?`${t}:00`:null}function Ji(e){const t=Number(e);if(!Number.isFinite(t)||t<0)return"-";const r=Math.floor(t/60),n=t%60;return`${String(r).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function im(e,t,r,n){const s=qe(e,""),a=qe(t,""),i=qe(r,"00:00"),o=qe(n,"00:00"),l=s&&a?Ie(s,a):null,d=Ie(i,o),c=Number.isFinite(l)?Math.max(0,l-d):null;return{startTime:s||"-",endTime:a||"-",breakStartTime:i||"-",breakEndTime:o||"-",breakDuration:Ji(d),duration:c===null?"-":Ji(c)}}function Qi(e){var o;const t=((o=e.querySelector("#actual-duty-duty"))==null?void 0:o.value)||"",r=am(t);if(!r)return;const n=e.querySelector("#actual-duty-start-time"),s=e.querySelector("#actual-duty-end-time"),a=e.querySelector("#actual-duty-break-start-time"),i=e.querySelector("#actual-duty-break-end-time");n&&(n.value=r.startTime||""),s&&(s.value=r.endTime||""),a&&(a.value=r.breakStartTime||"00:00"),i&&(i.value=r.breakEndTime||"00:00")}async function om(e){const t=e.querySelector("#actual-duty-id"),r=e.querySelector("#actual-duty-date"),n=e.querySelector("#actual-duty-employee"),s=e.querySelector("#actual-duty-schedule-key"),a=e.querySelector("#actual-duty-duty"),i=e.querySelector("#actual-duty-assignment-role"),o=e.querySelector("#actual-duty-start-time"),l=e.querySelector("#actual-duty-end-time"),d=e.querySelector("#actual-duty-break-start-time"),c=e.querySelector("#actual-duty-break-end-time"),u=e.querySelector("#actual-duty-save-btn"),p=r.value,m=n.value||null,h=s.value||null,f=a.value||null,w=i.value||"conductor",y=qe((o==null?void 0:o.value)||"",""),v=qe((l==null?void 0:l.value)||"",""),b=qe((d==null?void 0:d.value)||"","00:00"),_=qe((c==null?void 0:c.value)||"","00:00"),k=t.value,x=!!k&&M.crewEditTimeOnly;if(x){if(!y||!v){g("Моля, попълни Начало и Край.","warning");return}}else{if(!p||!m||!h||!f||!y||!v){g("Моля, попълни всички полета.","warning");return}if(!sm(f,h)){g("Избери повеска от посочения ключ-график.","warning");return}if(!["chief","conductor"].includes(w)){g("Невалидна роля. Избери Кондуктор или Началник влак.","warning");return}}const L=Ie(y,v);if(Ie(b,_)>L){g("Прекъсването не може да е по-голямо от продължителността на повеската.","warning");return}const T=u.innerHTML;u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const E=x?{start_time_override:ot(y),end_time_override:ot(v),break_start_time_override:ot(b),break_end_time_override:ot(_)}:{date:p,employee_id:m,duty_id:f,assignment_role:w,start_time_override:ot(y),end_time_override:ot(v),break_start_time_override:ot(b),break_end_time_override:ot(_)};let $;if(k?{error:$}=await S.from("actual_duties").update(E).eq("id",k):{error:$}=await S.from("actual_duties").insert(E),u.disabled=!1,u.innerHTML=T,$){if($.code==="23505"){g("Този запис вече съществува за тази дата.","warning");return}g($.message,"error");return}g(k?"Записът е обновен.":"Записът е създаден.","success"),Re(e.querySelector("#actual-duty-modal")),sl(e),await fn(e)}function lm(e,t){e.querySelector("#actual-duty-id").value=t.id,e.querySelector("#actual-duty-date").value=t.date??"",e.querySelector("#actual-duty-employee").value=t.employeeId??"",e.querySelector("#actual-duty-assignment-role").value=t.assignmentRole??"conductor",e.querySelector("#actual-duty-schedule-key").value=t.dutyScheduleKeyId??"",cs(e,t.dutyScheduleKeyId??"",t.dutyId??""),e.querySelector("#actual-duty-start-time").value=qe(t.startTimeOverride,t.dutyStartTime||""),e.querySelector("#actual-duty-end-time").value=qe(t.endTimeOverride,t.dutyEndTime||""),e.querySelector("#actual-duty-break-start-time").value=qe(t.breakStartTimeOverride,t.dutyBreakStartTime||"00:00"),e.querySelector("#actual-duty-break-end-time").value=qe(t.breakEndTimeOverride,t.dutyBreakEndTime||"00:00"),e.querySelector("#actual-duty-form-title").textContent="Редакция на запис",e.querySelector("#actual-duty-save-btn").textContent="Запази"}function sl(e){e.querySelector("#actual-duty-id").value="",e.querySelector("#actual-duty-date").value="",e.querySelector("#actual-duty-employee").value="",e.querySelector("#actual-duty-assignment-role").value="conductor",e.querySelector("#actual-duty-schedule-key").value="",cs(e,"",""),e.querySelector("#actual-duty-start-time").value="",e.querySelector("#actual-duty-end-time").value="",e.querySelector("#actual-duty-break-start-time").value="00:00",e.querySelector("#actual-duty-break-end-time").value="00:00",e.querySelector("#actual-duty-form-title").textContent="Нов запис",e.querySelector("#actual-duty-save-btn").textContent="Създай"}async function dm(e,t){const r=t.querySelector("#actual-duty-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("actual_duties").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,s){g(s.message,"error");return}M.selectedIds=M.selectedIds.filter(a=>a!==e),Re(t.querySelector("#actual-duty-delete-modal")),await fn(t),g("Записът е изтрит.","success")}async function cm(e){const t=e.querySelector("#actual-duty-bulk-delete-confirm"),r=[...M.selectedIds];if(!r.length){Re(e.querySelector("#actual-duty-bulk-delete-modal"));return}const n=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';let s=null;for(let i=0;i<r.length;i+=200){const o=r.slice(i,i+200),{error:l}=await S.from("actual_duties").delete().in("id",o);if(l){s=l;break}}if(t.disabled=!1,t.innerHTML=n,s){g(s.message,"error");return}const a=r.length;M.selectedIds=[],Re(e.querySelector("#actual-duty-bulk-delete-modal")),await fn(e),g(`Изтрити записи: ${a}.`,"success")}async function um(e){const{data:t,error:r}=await S.from("planned_duties").select("id, date, employee_id, duty_id, assignment_role, employees(first_name, last_name), duties(name)").order("date",{ascending:!1});if(r){g(r.message,"error"),M.plannedRows=[],Ot(e,"Грешка при зареждане на планираните повески.");return}M.plannedRows=t||[],M.plannedSelectedIds=[],Ot(e)}function Ot(e,t){const r=e.querySelector("#actual-duty-bulk-add-table-body"),n=e.querySelector("#actual-duty-bulk-add-empty"),s=e.querySelector("#actual-duty-bulk-add-select-all"),a=e.querySelector("#actual-duty-bulk-add-confirm");M.plannedSelectedIds=M.plannedSelectedIds.filter(l=>M.plannedRows.some(d=>d.id===l));const i=M.plannedRows.filter(l=>{var h,f,w;const d=`${((h=l.employees)==null?void 0:h.first_name)??""} ${((f=l.employees)==null?void 0:f.last_name)??""}`.trim().toLowerCase(),c=(((w=l.duties)==null?void 0:w.name)||"").toLowerCase(),u=(l.date||"").toLowerCase(),p=!M.plannedSearchQuery||d.includes(M.plannedSearchQuery)||c.includes(M.plannedSearchQuery)||u.includes(M.plannedSearchQuery),m=!M.plannedDateFilter||l.date===M.plannedDateFilter;return p&&m});if(!i.length){M.plannedVisibleRowIds=[],r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма записи за добавяне.",s.checked=!1,s.indeterminate=!1,s.disabled=!0,a.disabled=M.plannedSelectedIds.length===0,a.textContent=M.plannedSelectedIds.length?`Добави избраните (${M.plannedSelectedIds.length})`:"Добави избраните";return}M.plannedVisibleRowIds=i.map(l=>l.id),n.classList.add("d-none"),r.innerHTML=i.map(l=>{var u,p,m;const d=M.plannedSelectedIds.includes(l.id),c=`${((u=l.employees)==null?void 0:u.first_name)??""} ${((p=l.employees)==null?void 0:p.last_name)??""}`.trim()||"-";return`
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
          <td>${ie(l.date??"-")}</td>
          <td>${ie(c)}</td>
          <td>${ie(al(l.assignment_role))}</td>
          <td>${ie(((m=l.duties)==null?void 0:m.name)??"-")}</td>
        </tr>
      `}).join("");const o=i.filter(l=>M.plannedSelectedIds.includes(l.id)).length;s.disabled=!1,s.checked=o>0&&o===i.length,s.indeterminate=o>0&&o<i.length,a.disabled=M.plannedSelectedIds.length===0,a.textContent=M.plannedSelectedIds.length?`Добави избраните (${M.plannedSelectedIds.length})`:"Добави избраните"}function Yi(e){M.plannedSearchQuery="",M.plannedDateFilter="";const t=e.querySelector("#actual-duty-bulk-add-search"),r=e.querySelector("#actual-duty-bulk-add-date-filter");t&&(t.value=""),r&&(r.value="")}async function pm(e){const t=e.querySelector("#actual-duty-bulk-add-confirm"),r=[...M.plannedSelectedIds];if(!r.length){g("Избери поне един запис от планирани повески.","warning");return}const n=new Set(r),s=M.plannedRows.filter(d=>n.has(d.id));if(!s.length){g("Няма валидни записи за добавяне.","warning");return}const a=s.map(d=>({date:d.date,employee_id:d.employee_id,duty_id:d.duty_id,assignment_role:d.assignment_role||"conductor"})),i=t.innerHTML;t.disabled=!0,t.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...';let o=null;for(let d=0;d<a.length;d+=200){const c=a.slice(d,d+200),{error:u}=await S.from("actual_duties").upsert(c,{onConflict:"date,employee_id,duty_id",ignoreDuplicates:!0});if(u){o=u;break}}if(t.disabled=!1,t.innerHTML=i,o){g(o.message,"error");return}const l=a.length;Re(e.querySelector("#actual-duty-bulk-add-modal")),await fn(e),g(`Обработени записи: ${l}. Съществуващите са пропуснати.`,"success")}function Es(e,t){e&&(e.disabled=!t)}function hm(){const t=new URLSearchParams(window.location.search).get("date")||"";return/^\d{4}-\d{2}-\d{2}$/.test(t)?t:""}function al(e){return e==="chief"?"Началник влак":"Кондуктор"}function mm(e,t){var m,h,f,w,y,v,b;const r=e.querySelector("#actual-duty-profile-modal"),n=e.querySelector("#actual-duty-profile-content");if(!r||!n)return;const s=(M.rows||[]).find(_=>_.id===t);if(!s){n.innerHTML='<p class="text-secondary mb-0">Няма данни за този запис.</p>',Dt(r);return}const a=`${((m=s.employees)==null?void 0:m.first_name)??""} ${((h=s.employees)==null?void 0:h.last_name)??""}`.trim()||"-",i=((f=s.duties)==null?void 0:f.name)||"-",o=al(s.assignment_role),l=qe(s.start_time_override,vt((w=s.duties)==null?void 0:w.start_time)),d=qe(s.end_time_override,vt((y=s.duties)==null?void 0:y.end_time)),c=qe(s.break_start_time_override,vt((v=s.duties)==null?void 0:v.break_start_time)||"00:00"),u=qe(s.break_end_time_override,vt((b=s.duties)==null?void 0:b.break_end_time)||"00:00"),p=im(l,d,c,u);n.innerHTML=`
    <div class="row g-3">
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Дата</div>
          <div class="fw-semibold">${ie(s.date||"-")}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Служител</div>
          <div class="fw-semibold">${ie(a)}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Роля</div>
          <div class="fw-semibold">${ie(o)}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Повеска</div>
          <div class="fw-semibold">${ie(i)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало</div>
          <div class="fw-semibold">${ie(p.startTime)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край</div>
          <div class="fw-semibold">${ie(p.endTime)}</div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Прекъсване</div>
          <div class="fw-semibold">${ie(p.breakDuration)}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Начало на прекъсване</div>
          <div class="fw-semibold">${ie(p.breakStartTime)}</div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Край на прекъсване</div>
          <div class="fw-semibold">${ie(p.breakEndTime)}</div>
        </div>
      </div>
      <div class="col-12">
        <div class="border rounded p-3 h-100">
          <div class="text-secondary small">Времетраене</div>
          <div class="fw-semibold">${ie(p.duration)}</div>
        </div>
      </div>
    </div>
  `,Dt(r)}const fm=`<section class="card border-0 shadow-sm">\r
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
`,ym="ПС - Стара Загора";function il(e,t){const r=e==null?void 0:e.querySelector(t);r&&(r.textContent=ym)}const Xi="id, name, notes, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name)";async function ol(e){const{data:t,error:r}=await S.from("schedule_keys").select("id").lte("valid_from",e).gte("valid_to",e);if(r)return{data:[],error:r};const n=(t||[]).map(p=>p==null?void 0:p.id).filter(Boolean);if(!n.length)return{data:[],error:null};const{data:s,error:a}=await S.from("duties").select(Xi).in("schedule_key_id",n);if(a)return{data:[],error:a};const{data:i,error:o}=await S.from("schedule_key_duties").select("duty_id").in("schedule_key_id",n);if(o)return{data:[],error:o};const l=new Set((s||[]).map(p=>p==null?void 0:p.id).filter(Boolean)),d=[...new Set((i||[]).map(p=>p==null?void 0:p.duty_id).filter(Boolean))].filter(p=>!l.has(p));if(!d.length)return{data:s||[],error:null};const{data:c,error:u}=await S.from("duties").select(Xi).in("id",d);return u?{data:[],error:u}:{data:[...s||[],...c||[]],error:null}}function bm(e){const t=String(e||"").trim().toLowerCase();return t==="chief"||t==="conductor"?t:""}function ll(e){const t=(e==null?void 0:e.first_name)??"",r=(e==null?void 0:e.last_name)??"";return`${t} ${r}`.trim()}function vm(e){var r;const t=e==null?void 0:e.positions;return Array.isArray(t)?((r=t[0])==null?void 0:r.title)??"":t&&typeof t=="object"?t.title??"":""}function gm(e){var r;const t=e==null?void 0:e.duty_types;return Array.isArray(t)?((r=t[0])==null?void 0:r.name)??"":t&&typeof t=="object"?t.name??"":""}function _m(e){var r;const t=Array.isArray(e)?(r=e[0])==null?void 0:r.name:e&&typeof e=="object"?e.name:"";return String(t||"").trim()}function wm(e){const t=e==null?void 0:e.duties;return Array.isArray(t)?t[0]||null:t&&typeof t=="object"?t:null}function Zi(e){const t=String(e||"").trim();if(!t)return"99:99:99";const r=t.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);if(!r)return"99:99:99";const n=String(Number(r[1])).padStart(2,"0"),s=r[2],a=r[3]||"00";return`${n}:${s}:${a}`}function Sm(){const t=new URLSearchParams(window.location.search).get("date")||"";return/^\d{4}-\d{2}-\d{2}$/.test(t)?t:""}function $e(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const eo=96/25.4;function km(e,{orientation:t,compact:r,fitOnePage:n}){const s=document.documentElement,a=e.querySelector(".plan-schedule-sheet");if(s.classList.add("print-preparing"),s.classList.toggle("print-compact",r),s.classList.toggle("print-fit-one-page",n),a&&(a.classList.toggle("print-landscape-page",t==="landscape"),a.classList.toggle("print-portrait-page",t==="portrait")),!n||!a){s.style.setProperty("--plan-print-scale","1");return}s.style.setProperty("--plan-print-scale","1");const i=a.getBoundingClientRect(),o=t==="portrait"?210:297,l=t==="portrait"?297:210,d=(o-20)*eo,c=(l-20)*eo,u=d/Math.max(i.width,1),p=c/Math.max(i.height,1),m=Math.min(u,p,1);s.style.setProperty("--plan-print-scale",String(Math.max(.6,m)))}function xm(){const e=document.documentElement;e.classList.remove("print-preparing","print-compact","print-fit-one-page","print-hide-second-day"),e.style.setProperty("--plan-print-scale","1"),document.querySelectorAll(".plan-schedule-sheet").forEach(t=>{t.classList.remove("print-landscape-page","print-portrait-page")})}function qm(e){const t=new Map;return(e||[]).forEach(r=>{const n=r==null?void 0:r.employee_id;if(!n)return;const s=t.get(n)||{employeeId:n,employeeName:ll(r.employees),reasons:[]},a=_m(r.absence_reasons);a&&!s.reasons.includes(a)&&s.reasons.push(a),t.set(n,s)}),t}function Lm(e){const t={train:[],businessTrip:[],dayOff:[]},r=new Map;return(e||[]).forEach(n=>{const s=wm(n);s!=null&&s.id&&(r.has(s.id)||r.set(s.id,s))}),Array.from(r.values()).forEach(n=>{const s=gm(n).toLowerCase();if(s.includes("на влак")){t.train.push(n);return}if(s.includes("командировка")){t.businessTrip.push(n);return}s.includes("свободен ден")&&t.dayOff.push(n)}),t.train.sort(Cm),t.businessTrip.sort(ea),t.dayOff.sort(ea),t}function Tm(e,t){const r=new Map,n=new Map;return e.forEach(s=>{if(!(s!=null&&s.duty_id)||!(s!=null&&s.employees))return;if(s!=null&&s.employee_id&&(t!=null&&t.has(s.employee_id))){const l=t.get(s.employee_id);l&&!n.has(s.employee_id)&&n.set(s.employee_id,{employeeId:l.employeeId,employeeName:l.employeeName,reason:l.reasons.join(", ")});return}const a=r.get(s.duty_id)||{chiefs:[],conductors:[]},i=ll(s.employees),o=bm(s.assignment_role);if(o==="chief"&&i&&!a.chiefs.includes(i)&&a.chiefs.push(i),o==="conductor"&&i&&!a.conductors.includes(i)&&a.conductors.push(i),!o){const l=vm(s.employees).toLowerCase();l.includes("началник")&&l.includes("влак")&&i&&!a.chiefs.includes(i)&&a.chiefs.push(i),l.includes("кондуктор")&&i&&!a.conductors.includes(i)&&a.conductors.push(i)}r.set(s.duty_id,a)}),{assignmentsByDuty:r,absentAssignments:Array.from(n.values()).sort((s,a)=>String((s==null?void 0:s.employeeName)||"").localeCompare(String((a==null?void 0:a.employeeName)||""),"bg"))}}function Er(e,t,r){$s(e.querySelector("#plan-schedule-train"),t.train,r,{conductorRows:2,showHours:!0,separateSecondDay:!0,minPanels:2,printAsCards:!0}),$s(e.querySelector("#plan-schedule-business-trip"),t.businessTrip,r,{conductorRows:3,showHours:!1,minPanels:1,hideEmptyConductorRows:!0,printAsCards:!0}),$s(e.querySelector("#plan-schedule-day-off"),t.dayOff,r,{conductorRows:3,showHours:!1,minPanels:1,hideEmptyConductorRows:!0,printAsCards:!0})}function $r(e,t){if(!e)return;if(!t.length){e.innerHTML='<p class="text-secondary mb-0">Няма служители в разход.</p>';return}const r=t.map(n=>`
      <tr>
        <td>${$e(n.employeeName||"")}</td>
        <td>${$e(n.reason||"")}</td>
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
  `}function Ar(e,{hint:t,error:r,empty:n}){const s=e.querySelector("#plan-schedule-hint"),a=e.querySelector("#plan-schedule-error"),i=e.querySelector("#plan-schedule-empty");s&&(s.textContent=t||"",s.classList.toggle("d-none",!t)),a&&(a.textContent=r||"",a.classList.toggle("d-none",!r)),i&&(i.textContent=n||"",i.classList.toggle("d-none",!n))}function Em(e){const t=new Date(`${e}T00:00:00`);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("bg-BG",{day:"2-digit",month:"long",year:"numeric"}).format(t)}function $s(e,t,r,n={}){if(!e)return;if(!t.length){e.innerHTML='<p class="text-secondary mb-0">Няма повески от този тип.</p>';return}const s=n.separateSecondDay?Rm(t):t,a=Number.isInteger(n.conductorRows)&&n.conductorRows>=0?n.conductorRows:3,i=5,o=Am(s,i),l=Number.isInteger(n.minPanels)&&n.minPanels>0?n.minPanels:1;for(;o.length<l;)o.push([]);e.innerHTML=o.map(d=>{const c=[...d];for(;c.length<i;)c.push(null);const u=c.map(b=>{const _=Dn(b,"text-center"),k=ut(b)?"":(b==null?void 0:b.name)??"";if(!k)return`<th scope="col"${_}></th>`;const x=String((b==null?void 0:b.notes)||"").trim(),L=x?`<div class="schedule-duty-note" title="${$e(x)}">${$e(x)}</div>`:"";return`<th scope="col"${_}><span class="schedule-duty-name-wrap">${In("Влак","train")}<span class="schedule-duty-name-ellipsis" title="${$e(k)}">${$e(k)}</span></span>${L}</th>`}).join(""),p=c.map(b=>{const _=Dn(b),k=b&&!ut(b)?dl(b):"";return!b||ut(b)?`<td${_}></td>`:`<td${_}>${In("Час","hours")}${$e(k)}</td>`}).join(""),m=c.map(b=>{if(!b)return"<td></td>";const _=Dn(b);if(ut(b))return`<td${_}></td>`;const k=r.get(b.id)||{chiefs:[]},x=k.chiefs.length?k.chiefs.join(", "):"";return`<td${_}>${In("НВ","chief")}${$e(x)}</td>`}).join("");let h=a;if(n.hideEmptyConductorRows){const b=c.reduce((_,k)=>{if(!k||ut(k))return _;const x=r.get(k.id)||{conductors:[]},L=Array.isArray(x.conductors)?x.conductors.length:0;return Math.max(_,L)},0);h=Math.min(a,b)}const f=h>0?Array.from({length:h},(b,_)=>`
            <tr>
              ${c.map(x=>{if(!x)return"<td></td>";const L=Dn(x);if(ut(x))return`<td${L}></td>`;const T=(r.get(x.id)||{conductors:[]}).conductors[_]||"";return`<td${L}>${In("К-р","conductor")}${$e(T)}</td>`}).join("")}
            </tr>
          `).join(""):"",w=n.showHours===!1?"":`
            <tr>
              ${p}
            </tr>
          `,y=`
        <table class="table table-bordered align-middle mb-3 plan-schedule-table">
          <thead>
            <tr>
              ${u}
            </tr>
          </thead>
          <tbody>
            ${w}
            <tr>
              ${m}
            </tr>
            ${f}
          </tbody>
        </table>
      `;if(!n.printAsCards)return y;const v=$m(c,r,h,n);return`
        <div class="print-as-cards">
          ${y}
          <div class="print-only-duty-cards mb-3">${v}</div>
        </div>
      `}).join("")}function $m(e,t,r,n={}){return`<div class="print-duty-cards-grid">${e.map(a=>{const i=n.showHours!==!1,o=i?`
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">Час</span>
              <span class="print-duty-card-value"></span>
            </div>
          `:"";if(!a||ut(a)){const u=Array.from({length:r},()=>`
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
        `}const l=t.get(a.id)||{chiefs:[],conductors:[]},d=Array.isArray(l.chiefs)?l.chiefs.join(", "):"",c=Array.from({length:r},(u,p)=>{const m=Array.isArray(l.conductors)&&l.conductors[p]||"";return`
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">К-р</span>
            <span class="print-duty-card-value">${$e(m)}</span>
          </div>
        `}).join("");return`
        <article class="print-duty-card">
          <div class="print-duty-card-title">${$e(a.name||"")}</div>
          <div class="print-duty-card-note">${$e(String(a.notes||"").trim())}</div>
          ${i?`
            <div class="print-duty-card-line">
              <span class="print-duty-card-key">Час</span>
              <span class="print-duty-card-value">${$e(dl(a))}</span>
            </div>
          `:""}
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">НВ</span>
            <span class="print-duty-card-value">${$e(d)}</span>
          </div>
          ${c}
        </article>
      `}).join("")}</div>`}function Am(e,t){const r=[];for(let n=0;n<e.length;n+=t)r.push(e.slice(n,n+t));return r}function dl(e){const t=((e==null?void 0:e.start_time)||"").slice(0,5),r=((e==null?void 0:e.end_time)||"").slice(0,5);return!t&&!r?"":t&&r?`${t} - ${r}`:t||r}function In(e,t){return`<span class="${t?`schedule-cell-key-badge schedule-cell-key-badge-${t}`:"schedule-cell-key-badge"}">${$e(e)}</span>`}function ea(e,t){const r=(e==null?void 0:e.schedule_key_id)||"",n=(t==null?void 0:t.schedule_key_id)||"";if(r!==n)return String(r).localeCompare(String(n),"bg");const s=Number.isFinite(Number(e==null?void 0:e.display_order))?Number(e.display_order):Number.MAX_SAFE_INTEGER,a=Number.isFinite(Number(t==null?void 0:t.display_order))?Number(t.display_order):Number.MAX_SAFE_INTEGER;return s!==a?s-a:String((e==null?void 0:e.name)||"").localeCompare(String((t==null?void 0:t.name)||""),"bg")}function Cm(e,t){const r=!!(e!=null&&e.second_day),n=!!(t!=null&&t.second_day);if(r!==n)return r?1:-1;const s=Zi(e==null?void 0:e.start_time),a=Zi(t==null?void 0:t.start_time);return s!==a?s.localeCompare(a,"bg"):ea(e,t)}function Rm(e){const t=[],r=[];return e.forEach(a=>{if(a!=null&&a.second_day){r.push(a);return}t.push(a)}),!t.length||!r.length?e:t.length%5!==0?[...t,{__separator:!0},...r]:[...t,...r]}function ut(e){return!!(e&&e.__separator)}function Dn(e,t=""){const r=[];return t&&r.push(t),ut(e)?r.push("separator-col"):e!=null&&e.second_day&&r.push("second-day-col"),r.length?` class="${r.join(" ")}"`:""}async function Im(e){e.innerHTML=fm,il(e,"#plan-schedule-print-left-label");const t=e.querySelector("#plan-schedule-date"),r=e.querySelector("#plan-schedule-print"),n=e.querySelector("#plan-schedule-print-orientation"),s=e.querySelector("#plan-schedule-print-compact"),a=e.querySelector("#plan-schedule-print-fit-one-page"),i=Sm();t&&i?t.value=i:t&&!t.value&&(t.value=new Date().toISOString().split("T")[0]),t==null||t.addEventListener("change",async()=>{await to(e)}),r==null||r.addEventListener("click",()=>{const o=(n==null?void 0:n.value)==="portrait"?"portrait":"landscape",l=(s==null?void 0:s.checked)??!0,d=(a==null?void 0:a.checked)??!0;km(e,{orientation:o,compact:l,fitOnePage:d}),window.addEventListener("afterprint",xm,{once:!0}),window.print()}),await to(e)}async function to(e){const t=e.querySelector("#plan-schedule-date"),r=t==null?void 0:t.value,n=e.querySelector("#plan-schedule-sheet-date");if(n&&(n.textContent=r?Em(r):""),!r){Er(e,{train:[],businessTrip:[],dayOff:[]},new Map),$r(e.querySelector("#plan-schedule-absence"),[]),Ar(e,{hint:"Избери дата.",error:"",empty:""});return}const{data:s,error:a}=await S.from("planned_duties").select("employee_id, duty_id, assignment_role, employees(first_name, last_name, positions(title)), duties(id, name, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name))").eq("date",r);if(a){g(a.message,"error"),Er(e,{train:[],businessTrip:[],dayOff:[]},new Map),$r(e.querySelector("#plan-schedule-absence"),[]),Ar(e,{hint:"",error:"Грешка при зареждане на планираните записи.",empty:""});return}const{data:i,error:o}=await ol(r);if(o){g(o.message,"error"),Er(e,{train:[],businessTrip:[],dayOff:[]},new Map),$r(e.querySelector("#plan-schedule-absence"),[]),Ar(e,{hint:"",error:"Грешка при зареждане на повеските.",empty:""});return}const{data:l,error:d}=await S.from("employee_absences").select("employee_id, start_date, end_date, employees(first_name, last_name), absence_reasons(name)").lte("start_date",r).gte("end_date",r);if(d){g(d.message,"error"),Er(e,{train:[],businessTrip:[],dayOff:[]},new Map),$r(e.querySelector("#plan-schedule-absence"),[]),Ar(e,{hint:"",error:"Грешка при зареждане на отсъствията.",empty:""});return}const c=qm(l||[]),u=Lm((i||[]).map(f=>({duties:f}))),{assignmentsByDuty:p,absentAssignments:m}=Tm(s||[],c);Er(e,u,p),$r(e.querySelector("#plan-schedule-absence"),m);const h=u.train.length+u.businessTrip.length+u.dayOff.length;Ar(e,{hint:"",error:"",empty:h||m.length?"":"Няма повески за показване по избраните типове."})}const Dm=`<section class="card border-0 shadow-sm schedule-page-root">\r
  <div class="card-body p-4 p-md-5">\r
    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-2 mb-3 no-print">\r
      <h1 class="h3 mb-0">Разпределение</h1>\r
      <div class="d-flex gap-2 page-actions">\r
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
        <div class="form-check mt-2 mt-md-4 pt-0 pt-md-2">\r
          <input class="form-check-input" type="checkbox" id="schedule-print-compact" checked />\r
          <label class="form-check-label" for="schedule-print-compact">Компактен</label>\r
        </div>\r
      </div>\r
      <div class="col-md-3">\r
        <div class="form-check mt-2 mt-md-4 pt-0 pt-md-2">\r
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
\r
<div id="schedule-confirm-modal" class="d-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style="z-index: 1060;">\r
  <div class="d-flex align-items-center justify-content-center h-100 p-3">\r
    <div class="card w-100" style="max-width: 500px;">\r
      <div class="card-body p-4">\r
        <div class="d-flex justify-content-between align-items-center mb-3">\r
          <h2 class="h5 mb-0">Потвърждение</h2>\r
          <button id="schedule-confirm-modal-close" type="button" class="btn-close" aria-label="Close"></button>\r
        </div>\r
\r
        <p class="text-secondary mb-4">\r
          Сигурен ли си, че искаш да потвърдиш разпределението от разписание? Това действие ще актуализира разпределението на служителите.\r
        </p>\r
\r
        <div class="d-flex justify-content-end gap-2">\r
          <button id="schedule-confirm-modal-cancel" type="button" class="btn btn-outline-secondary">Отказ</button>\r
          <button id="schedule-confirm-modal-confirm" type="button" class="btn btn-primary">Потвърди</button>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</div>\r
`,ro=new Map;function no(e){const t=String(e||"").trim();if(!t)return"99:99:99";const r=t.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?/);if(!r)return"99:99:99";const n=String(Number(r[1])).padStart(2,"0"),s=r[2],a=r[3]||"00";return`${n}:${s}:${a}`}function Om(e){const t=(e==null?void 0:e.first_name)??"",r=(e==null?void 0:e.last_name)??"";return`${t} ${r}`.trim()}function Pm(e){var r;const t=e==null?void 0:e.positions;return Array.isArray(t)?((r=t[0])==null?void 0:r.title)??"":t&&typeof t=="object"?t.title??"":""}function ta(e){const t=String((e==null?void 0:e.assignment_role)||"").trim().toLowerCase();if(t==="chief"||t==="conductor")return t;const r=Pm(e==null?void 0:e.employees).toLowerCase();return r.includes("началник")&&r.includes("влак")?"chief":"conductor"}function jt(e){var r;const t=e==null?void 0:e.duty_types;return Array.isArray(t)?((r=t[0])==null?void 0:r.name)??"":t&&typeof t=="object"?t.name??"":""}function Qn(e){const t=e==null?void 0:e.duties;return Array.isArray(t)?t[0]||null:t&&typeof t=="object"?t:null}function Mm(){const t=new URLSearchParams(window.location.search).get("date")||"";return/^\d{4}-\d{2}-\d{2}$/.test(t)?t:""}function _e(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function cl(e){e==null||e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}function Wr(e){e==null||e.classList.add("d-none"),!!(document.querySelector("#schedule-actual-edit-modal:not(.d-none)")||document.querySelector("#schedule-confirm-modal:not(.d-none)"))||document.body.classList.remove("overflow-hidden")}function jm(e,t){const r=ro.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Wr(a);return}}};ro.set(e,n),document.addEventListener("keydown",n)}const so=96/25.4;function Nm(e,{orientation:t,compact:r,fitOnePage:n}){const s=document.documentElement,a=e.querySelector(".plan-schedule-sheet");if(s.classList.add("print-preparing"),s.classList.add("print-hide-second-day"),s.classList.toggle("print-compact",r),s.classList.toggle("print-fit-one-page",n),a&&(a.classList.toggle("print-landscape-page",t==="landscape"),a.classList.toggle("print-portrait-page",t==="portrait")),!n||!a){s.style.setProperty("--plan-print-scale","1");return}s.style.setProperty("--plan-print-scale","1");const i=a.getBoundingClientRect(),o=t==="portrait"?210:297,l=t==="portrait"?297:210,d=(o-20)*so,c=(l-20)*so,u=d/Math.max(i.width,1),p=c/Math.max(i.height,1),m=Math.min(u,p,1);s.style.setProperty("--plan-print-scale",String(Math.max(.6,m)))}function Hm(){const e=document.documentElement;e.classList.remove("print-preparing","print-compact","print-fit-one-page","print-hide-second-day"),e.style.setProperty("--plan-print-scale","1"),document.querySelectorAll(".plan-schedule-sheet").forEach(t=>{t.classList.remove("print-landscape-page","print-portrait-page")})}function Um(e,t){const r=new Map;return e.forEach(n=>{var l;if(!(n!=null&&n.duty_id)||!(n!=null&&n.employees)||!(n!=null&&n.id)||n!=null&&n.employee_id&&(t!=null&&t.has(n.employee_id)))return;const s=r.get(n.duty_id)||{chiefs:[],conductors:[]},a=Om(n.employees),i=ta(n),o={id:n.id,employeeId:n.employee_id,role:i,name:a,dutyName:((l=Qn(n))==null?void 0:l.name)||"",date:n.date||""};i==="chief"?a&&!s.chiefs.some(d=>d.id===o.id)&&s.chiefs.push(o):i==="conductor"&&a&&!s.conductors.some(d=>d.id===o.id)&&s.conductors.push(o),r.set(n.duty_id,s)}),r}function Cr(e,t,r,n){As(e.querySelector("#schedule-train"),t.train,r,n,{allowAdd:!0,allowEdit:!0,conductorRows:2,printConductorRows:3,printExtraCardRows:1,showHours:!0,separateSecondDay:!0,minPanels:2,printAsCards:!0,printHideSecondDay:!0}),As(e.querySelector("#schedule-business-trip"),t.businessTrip,r,n,{allowAdd:!0,allowEdit:!0,conductorRows:3,showHours:!1,minPanels:1,hideEmptyConductorRows:!0}),As(e.querySelector("#schedule-day-off"),t.dayOff,r,n,{allowAdd:!0,allowEdit:!0,conductorRows:3,showHours:!1,minPanels:1,hideEmptyConductorRows:!0})}function Rr(e,{hint:t,error:r,empty:n}){const s=e.querySelector("#schedule-hint"),a=e.querySelector("#schedule-error"),i=e.querySelector("#schedule-empty");s&&(s.textContent=t||"",s.classList.toggle("d-none",!t)),a&&(a.textContent=r||"",a.classList.toggle("d-none",!r)),i&&(i.textContent=n||"",i.classList.toggle("d-none",!n))}function Fm(e){const t=new Date(`${e}T00:00:00`);return Number.isNaN(t.getTime())?e:new Intl.DateTimeFormat("bg-BG",{day:"2-digit",month:"long",year:"numeric"}).format(t)}function ra(e,t){const r=(e==null?void 0:e.schedule_key_id)||"",n=(t==null?void 0:t.schedule_key_id)||"";if(r!==n)return String(r).localeCompare(String(n),"bg");const s=Number.isFinite(Number(e==null?void 0:e.display_order))?Number(e.display_order):Number.MAX_SAFE_INTEGER,a=Number.isFinite(Number(t==null?void 0:t.display_order))?Number(t.display_order):Number.MAX_SAFE_INTEGER;return s!==a?s-a:String((e==null?void 0:e.name)||"").localeCompare(String((t==null?void 0:t.name)||""),"bg")}function Bm(e,t){const r=!!(e!=null&&e.second_day),n=!!(t!=null&&t.second_day);if(r!==n)return r?1:-1;const s=no(e==null?void 0:e.start_time),a=no(t==null?void 0:t.start_time);return s!==a?s.localeCompare(a,"bg"):ra(e,t)}function As(e,t,r,n,s={}){if(!e)return;if(!t.length){e.innerHTML='<p class="text-secondary mb-0">Няма повески от този тип.</p>';return}const a=s.separateSecondDay?zm(t):t,i=Number.isInteger(s.conductorRows)&&s.conductorRows>=0?s.conductorRows:3,o=5,l=Wm(a,o),d=Number.isInteger(s.minPanels)&&s.minPanels>0?s.minPanels:1,c=Number.isInteger(s.printConductorRows)&&s.printConductorRows>0?s.printConductorRows:i;for(;l.length<d;)l.push([]);const u=l.map(h=>{const f=[...h];for(;f.length<o;)f.push(null);const w=f.map(q=>{const T=Pn(q,"text-center"),E=pt(q)?"":(q==null?void 0:q.name)??"";if(!E)return`<th scope="col"${T}></th>`;const $=String((q==null?void 0:q.notes)||"").trim(),A=$?`<div class="schedule-duty-note" title="${_e($)}">${_e($)}</div>`:"";return`<th scope="col"${T}><span class="schedule-duty-name-wrap">${On("Влак","train")}<span class="schedule-duty-name-ellipsis" title="${_e(E)}">${_e(E)}</span></span>${A}</th>`}).join(""),y=f.map(q=>{const T=Pn(q),E=q&&!pt(q)?hl(q):"";return!q||pt(q)?`<td${T}></td>`:`<td${T}>${On("Час","hours")}${_e(E)}</td>`}).join(""),v=f.map(q=>{if(!q)return"<td></td>";const T=Pn(q);if(pt(q))return`<td${T}></td>`;const E=r.get(q.id)||{chiefs:[]},$=jt(q).toLowerCase();return`<td${T} data-drop-duty-id="${q.id}" data-drop-duty-name="${_e((q==null?void 0:q.name)||"")}" data-drop-date="${n}" data-drop-role="chief" data-drop-duty-type="${_e($)}">${On("НВ","chief")}${Km(E.chiefs,q,n,s)}</td>`}).join("");let b=i;if(s.hideEmptyConductorRows){const q=f.reduce((T,E)=>{if(!E||pt(E))return T;const $=r.get(E.id)||{conductors:[]},A=Array.isArray($.conductors)?$.conductors.length:0;return Math.max(T,A)},0);b=Math.min(i,q)}const _=b>0?Array.from({length:b},(q,T)=>`
          <tr>
            ${f.map($=>{if(!$)return"<td></td>";const A=Pn($);if(pt($))return`<td${A}></td>`;const C=r.get($.id)||{conductors:[]},I=Number.isInteger(s.conductorRowOffset)&&s.conductorRowOffset>0?s.conductorRowOffset:0,R=T-I,W=R>=0&&Array.isArray(C.conductors)?C.conductors[R]:void 0,K=jt($).toLowerCase();return`<td${A} data-drop-duty-id="${$.id}" data-drop-duty-name="${_e(($==null?void 0:$.name)||"")}" data-drop-date="${n}" data-drop-role="conductor" data-drop-duty-type="${_e(K)}">${On("К-р","conductor")}${ul(W,$,n,s)}</td>`}).join("")}
          </tr>
        `).join(""):"",k=s.showHours===!1?"":`
            <tr>
              ${y}
            </tr>
          `,x=`
        <table class="table table-bordered align-middle mb-3 plan-schedule-table">
          <thead>
            <tr>
              ${w}
            </tr>
          </thead>
          <tbody>
            ${k}
            <tr>
              ${v}
            </tr>
            ${_}
          </tbody>
        </table>
      `;if(!s.printAsCards)return x;const L=ao(f,r,c,s);return`
        <div class="print-as-cards">
          ${x}
          <div class="print-only-duty-cards mb-3">${L}</div>
        </div>
      `}).join(""),p=Number.isInteger(s.printExtraCardRows)&&s.printExtraCardRows>0?s.printExtraCardRows:0,m=s.printAsCards&&p>0?Array.from({length:p},()=>`
        <div class="print-as-cards">
          <div class="print-only-duty-cards mb-3">${ao(Array.from({length:o},()=>null),new Map,c,s)}</div>
        </div>
      `).join(""):"";e.innerHTML=u+m}function ao(e,t,r,n={}){return`<div class="print-duty-cards-grid">${e.map(a=>{const i=n.printHideSecondDay&&(a!=null&&a.second_day)?null:a;if(!i||pt(i))return`
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
        `;const o=t.get(i.id)||{chiefs:[],conductors:[]},l=Array.isArray(o.chiefs)?o.chiefs.map(c=>(c==null?void 0:c.name)||"").filter(Boolean).join(", "):"",d=Array.from({length:r},(c,u)=>{var f;const p=Number.isInteger(n.conductorRowOffset)&&n.conductorRowOffset>0?n.conductorRowOffset:0,m=u-p,h=Array.isArray(o.conductors)&&m>=0&&((f=o.conductors[m])==null?void 0:f.name)||"";return`
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">К-р</span>
            <span class="print-duty-card-value">${_e(h)}</span>
          </div>
        `}).join("");return`
        <article class="print-duty-card">
          <div class="print-duty-card-title">${_e(i.name||"")}</div>
          <div class="print-duty-card-note">${_e(String(i.notes||"").trim())}</div>
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">Час</span>
            <span class="print-duty-card-value">${_e(hl(i))}</span>
          </div>
          <div class="print-duty-card-line">
            <span class="print-duty-card-key">НВ</span>
            <span class="print-duty-card-value">${_e(l)}</span>
          </div>
          ${d}
        </article>
      `}).join("")}</div>`}function Km(e,t,r,n={}){return e!=null&&e.length?e.map(s=>ul(s,t,r,n)).join("<br>"):pl(t,r,n)}function ul(e,t,r,n={}){return e!=null&&e.id?n.allowEdit!==!1?`<button type="button" class="btn btn-link p-0 text-decoration-none align-baseline" draggable="true" data-actual-edit-id="${e.id}" data-actual-drag-id="${e.id}">${_e(e.name||"")}</button>`:_e(e.name||""):pl(t,r,n)}function pl(e,t,r={}){return!(r.allowAdd!==!1)||!(e!=null&&e.id)||!t?"":`<button type="button" class="btn btn-link p-0 text-decoration-none no-print" data-actual-add-duty-id="${e.id}" data-actual-add-date="${t}" data-actual-add-duty-name="${_e(e.name||"")}">Добави</button>`}function On(e,t){return`<span class="${t?`schedule-cell-key-badge schedule-cell-key-badge-${t}`:"schedule-cell-key-badge"}">${_e(e)}</span>`}function hl(e){const t=((e==null?void 0:e.start_time)||"").slice(0,5),r=((e==null?void 0:e.end_time)||"").slice(0,5);return!t&&!r?"":t&&r?`${t} - ${r}`:t||r}function zm(e){const t=[],r=[];return e.forEach(a=>{if(a!=null&&a.second_day){r.push(a);return}t.push(a)}),!t.length||!r.length?e:t.length%5!==0?[...t,{__separator:!0},...r]:[...t,...r]}function pt(e){return!!(e&&e.__separator)}function Pn(e,t=""){const r=[];return t&&r.push(t),pt(e)?r.push("separator-col"):e!=null&&e.second_day&&r.push("second-day-col"),r.length?` class="${r.join(" ")}"`:""}function Wm(e,t){const r=[];for(let n=0;n<e.length;n+=t)r.push(e.slice(n,n+t));return r}function Vm({actualRowsById:e,supabase:t,showToast:r,getDutyFromRow:n,resolveActualDutyRole:s,openModal:a,closeModal:i,loadScheduleData:o,removeEmployeeTripAndDayOffEntries:l}){function d(y){return y==="chief"?"Началник влак":"Кондуктор"}function c(y){var _,k;const v=((_=y==null?void 0:y.employees)==null?void 0:_.first_name)??"",b=((k=y==null?void 0:y.employees)==null?void 0:k.last_name)??"";return`${v} ${b}`.trim()||"-"}function u(y,v){const b=y.querySelector("#schedule-actual-edit-employee");if(!b||!v)return"-";const _=Array.from(b.options||[]).find(k=>(k==null?void 0:k.value)===v);return String((_==null?void 0:_.textContent)||"").trim()||"-"}function p({employeeName:y,dutyName:v,date:b,role:_}){return`${y||"-"} | ${v||"-"} | ${b||"-"} | ${d(_)}`}function m(y){if(!Array.isArray(y)||!y.length)return"";const v=y.map(b=>String((b==null?void 0:b.dutyName)||(b==null?void 0:b.dutyTypeName)||"").trim()).filter(Boolean);return v.length?` Премахнати: ${v.join(", ")}.`:" Премахнати са автоматично конфликтни записи."}function h(y,v){const b=e.get(v);if(!b){r("Записът не е намерен.","warning");return}const _=n(b);y.querySelector("#schedule-actual-edit-title").textContent="Редакция на актуална повеска",y.querySelector("#schedule-actual-edit-id").value=b.id,y.querySelector("#schedule-actual-edit-duty-id").value=b.duty_id||(_==null?void 0:_.id)||"",y.querySelector("#schedule-actual-edit-date-value").value=b.date||"",y.querySelector("#schedule-actual-edit-date").value=b.date||"",y.querySelector("#schedule-actual-edit-duty").value=(_==null?void 0:_.name)||"",y.querySelector("#schedule-actual-edit-employee").value=b.employee_id||"",y.querySelector("#schedule-actual-edit-assignment-role").value=s(b),y.querySelector("#schedule-actual-edit-save").textContent="Запази",a(y.querySelector("#schedule-actual-edit-modal"))}function f(y,{dutyId:v,date:b,dutyName:_}){y.querySelector("#schedule-actual-edit-title").textContent="Нов актуален запис",y.querySelector("#schedule-actual-edit-id").value="",y.querySelector("#schedule-actual-edit-duty-id").value=v,y.querySelector("#schedule-actual-edit-date-value").value=b,y.querySelector("#schedule-actual-edit-date").value=b,y.querySelector("#schedule-actual-edit-duty").value=_||"",y.querySelector("#schedule-actual-edit-employee").value="",y.querySelector("#schedule-actual-edit-assignment-role").value="conductor",y.querySelector("#schedule-actual-edit-save").textContent="Създай",a(y.querySelector("#schedule-actual-edit-modal"))}async function w(y){var P;const v=y.querySelector("#schedule-actual-edit-id"),b=y.querySelector("#schedule-actual-edit-duty-id"),_=y.querySelector("#schedule-actual-edit-date-value"),k=y.querySelector("#schedule-actual-edit-employee"),x=y.querySelector("#schedule-actual-edit-assignment-role"),L=y.querySelector("#schedule-actual-edit-save"),q=(v==null?void 0:v.value)||"",T=(b==null?void 0:b.value)||"",E=(_==null?void 0:_.value)||"",$=(k==null?void 0:k.value)||"",A=(x==null?void 0:x.value)||"conductor";if(!$){r("Избери служител.","warning");return}if(!q&&(!T||!E)){r("Липсват дата или повеска за новия запис.","warning");return}if(!["chief","conductor"].includes(A)){r("Невалидна роля. Избери Кондуктор или Началник влак.","warning");return}const C=L.innerHTML;L.disabled=!0,L.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';let I,R=q;const W=q?e.get(q):null,K=n(W),V=W?{employeeName:c(W),dutyName:(K==null?void 0:K.name)||"",date:(W==null?void 0:W.date)||E,role:s(W)}:null;if(q)({error:I}=await t.from("actual_duties").update({employee_id:$,assignment_role:A}).eq("id",q));else{const{data:D,error:N}=await t.from("actual_duties").insert({date:E,duty_id:T,employee_id:$,assignment_role:A}).select("id").single();I=N,R=(D==null?void 0:D.id)||""}if(L.disabled=!1,L.innerHTML=C,I){if(I.code==="23505"){r("Този запис вече съществува за служителя и повеската.","warning");return}r(I.message,"error");return}const j=await l($,E,T,R);if(j!=null&&j.error){r(j.error.message,"error");return}const z=(K==null?void 0:K.name)||((P=y.querySelector("#schedule-actual-edit-duty"))==null?void 0:P.value)||"",ee={employeeName:u(y,$),dutyName:z,date:E,role:A},le=m((j==null?void 0:j.removedEntries)||[]);if(i(y.querySelector("#schedule-actual-edit-modal")),q&&V){const D=p(V),N=p(ee);r(`Промяна: ${D} → ${N}.${le}`,"success")}else{const D=p(ee);r(`Ново назначение: ${D}.${le}`,"success")}await o(y)}return{openEditActualDutyModal:h,openCreateActualDutyModal:f,saveEditedActualDuty:w}}let Xe=null;function Gm({actualRowsById:e,supabase:t,showToast:r,resolveActualDutyRole:n,getDutyFromRow:s,getDutyTypeName:a,loadScheduleData:i,removeEmployeeTripAndDayOffEntries:o}){function l(y){return y==="chief"?"Началник влак":"Кондуктор"}function d(y){var _,k;const v=((_=y==null?void 0:y.employees)==null?void 0:_.first_name)??"",b=((k=y==null?void 0:y.employees)==null?void 0:k.last_name)??"";return`${v} ${b}`.trim()||"-"}function c({employeeName:y,dutyName:v,date:b,role:_}){return`${y||"-"} | ${v||"-"} | ${b||"-"} | ${l(_)}`}function u(y){if(!Array.isArray(y)||!y.length)return"";const v=y.map(b=>String((b==null?void 0:b.dutyName)||(b==null?void 0:b.dutyTypeName)||"").trim()).filter(Boolean);return v.length?` Премахнати: ${v.join(", ")}.`:" Премахнати са автоматично конфликтни записи."}function p(y){const v=String(y||"").toLowerCase();return v.includes("на влак")?"train":v.includes("командировка")?"business-trip":v.includes("свободен ден")?"day-off":""}function m(y){y.querySelectorAll(".schedule-drop-target, .schedule-drop-target-business-trip, .schedule-drop-target-preferred, .schedule-drop-target-hover").forEach(v=>{v.classList.remove("schedule-drop-target","schedule-drop-target-business-trip","schedule-drop-target-preferred","schedule-drop-target-hover")}),Xe=null}function h(y,v){if(m(y),!v)return;const b=e.get(v),_=s(b),k=p(a(_));y.querySelectorAll("td[data-drop-duty-id]").forEach(x=>{const L=p(x.getAttribute("data-drop-duty-type")||"");x.classList.add("schedule-drop-target"),L==="business-trip"&&x.classList.add("schedule-drop-target-business-trip"),k&&L===k&&x.classList.add("schedule-drop-target-preferred")})}function f(y){const v=y.target.closest("td[data-drop-duty-id]");if(!v){Xe&&(Xe.classList.remove("schedule-drop-target-hover"),Xe=null);return}y.preventDefault(),Xe&&Xe!==v&&Xe.classList.remove("schedule-drop-target-hover"),Xe=v,Xe.classList.add("schedule-drop-target-hover"),y.dataTransfer&&(y.dataTransfer.dropEffect="move")}async function w(y,v,b,_,k,x=""){var z;const L=e.get(v);if(!L)return;const q=L.duty_id===b,T=L.date===_,E=k==="chief"||k==="conductor"?k:"",$=n(L);if(q&&T&&(!E||$===E))return;const C={duty_id:b,date:_},I=((z=s(L))==null?void 0:z.name)||"",R={employeeName:d(L),dutyName:I,date:L.date||"",role:$};E&&(C.assignment_role=E);const{error:W}=await t.from("actual_duties").update(C).eq("id",v);if(W){if(W.code==="23505"){r("Този запис вече съществува за служителя и повеската.","warning");return}r(W.message,"error");return}const K=await o(L.employee_id,_,b,v);if(K!=null&&K.error){r(K.error.message,"error");return}const V={employeeName:d(L),dutyName:x||I,date:_,role:E||$},j=u((K==null?void 0:K.removedEntries)||[]);await i(y),r(`Промяна: ${c(R)} → ${c(V)}.${j}`,"success")}return{applyDropTargetHighlights:h,clearDropTargetHighlights:m,handleDragOver:f,moveDraggedActualDuty:w}}const ht=new Map;let Xt="";function Jm(e){if(!e)return"";const t=new Date(e);return Number.isNaN(t.getTime())?"":new Intl.DateTimeFormat("bg-BG",{dateStyle:"medium",timeStyle:"short"}).format(t)}function Cs(e,t){const r=e.querySelector("#schedule-publication-status"),n=e.querySelector("#schedule-confirm-required-badge");if(!r)return;if(!!!(t!=null&&t.is_confirmed)){const l=!!t;n==null||n.classList.toggle("d-none",!l),t?r.textContent="Статус: има смяна на служител, нужно е повторно потвърждение от разписание":r.textContent="Статус: непотвърдено от разписание",r.classList.remove("text-success"),r.classList.add("text-warning");return}n==null||n.classList.add("d-none");const a=String((t==null?void 0:t.source)||"timetable").trim(),i=a==="timetable"?"разписание":a,o=Jm(t==null?void 0:t.confirmed_at);r.textContent=o?`Статус: потвърдено от ${i} (${o})`:`Статус: потвърдено от ${i}`,r.classList.remove("text-warning"),r.classList.add("text-success")}async function rr(e,t){if(!t)return Cs(e,null),null;const{data:r,error:n}=await S.from("schedule_publications").select("schedule_date, is_confirmed, source, confirmed_at").eq("schedule_date",t).maybeSingle();return n?(Cs(e,null),null):(Cs(e,r||null),r||null)}async function Qm(e,t){var i;if(!t){g("Избери дата за потвърждение.","warning");return}const{data:r}=await S.auth.getUser(),n=((i=r==null?void 0:r.user)==null?void 0:i.id)||null,s=new Date().toISOString(),{error:a}=await S.from("schedule_publications").upsert({schedule_date:t,is_confirmed:!0,source:"timetable",confirmed_at:s,confirmed_by:n,created_from:n},{onConflict:"schedule_date"});if(a){g(a.message,"error");return}await rr(e,t),g("Графикът е потвърден от разписание.","success")}function Ym(e){const t=e.querySelector("#schedule-confirm-modal");cl(t)}function Rs(e){const t=e.querySelector("#schedule-confirm-modal");(t==null?void 0:t.classList.contains("d-none"))===!1&&Wr(t)}async function Xm(e){e.innerHTML=Dm,il(e,"#schedule-print-left-label");const t=e.querySelector("#schedule-date"),r=e.querySelector("#schedule-confirm-from-timetable"),n=e.querySelector("#schedule-go-to-actual"),s=e.querySelector("#schedule-print"),a=e.querySelector("#schedule-print-orientation"),i=e.querySelector("#schedule-print-compact"),o=e.querySelector("#schedule-print-fit-one-page"),l=e.querySelector("#schedule-confirm-modal-close"),d=e.querySelector("#schedule-confirm-modal-cancel"),c=e.querySelector("#schedule-confirm-modal-confirm"),u=Mm();t&&u?t.value=u:t&&!t.value&&(t.value=new Date().toISOString().split("T")[0]),Zm(e),await ef(e),t==null||t.addEventListener("change",async()=>{await Yn(e)}),r==null||r.addEventListener("click",()=>{Ym(e)}),n==null||n.addEventListener("click",()=>{const p=(t==null?void 0:t.value)||"";if(!p){g("Избери дата, за да отвориш Реални повески.","warning");return}const m=new URLSearchParams({date:p});window.history.pushState({},"",`/actual-duties?${m.toString()}`),window.dispatchEvent(new PopStateEvent("popstate"))}),s==null||s.addEventListener("click",()=>{const p=(a==null?void 0:a.value)==="portrait"?"portrait":"landscape",m=(i==null?void 0:i.checked)??!0,h=(o==null?void 0:o.checked)??!0;Nm(e,{orientation:p,compact:m,fitOnePage:h}),window.addEventListener("afterprint",Hm,{once:!0}),window.print()}),l==null||l.addEventListener("click",()=>{Rs(e)}),d==null||d.addEventListener("click",()=>{Rs(e)}),c==null||c.addEventListener("click",async()=>{Rs(e);const p=(t==null?void 0:t.value)||"";r.disabled=!0,await Qm(e,p),r.disabled=!1}),await Yn(e)}function Zm(e){const t=e.querySelector("#schedule-actual-edit-modal"),r=e.querySelector("#schedule-actual-edit-modal-close"),n=e.querySelector("#schedule-actual-edit-cancel"),s=e.querySelector("#schedule-actual-edit-form"),a=Vm({actualRowsById:ht,supabase:S,showToast:g,getDutyFromRow:Qn,resolveActualDutyRole:ta,openModal:cl,closeModal:Wr,loadScheduleData:Yn,removeEmployeeTripAndDayOffEntries:io}),i=Gm({actualRowsById:ht,supabase:S,showToast:g,resolveActualDutyRole:ta,getDutyFromRow:Qn,getDutyTypeName:jt,loadScheduleData:Yn,removeEmployeeTripAndDayOffEntries:io});r==null||r.addEventListener("click",()=>Wr(t)),n==null||n.addEventListener("click",()=>Wr(t)),s==null||s.addEventListener("submit",async o=>{o.preventDefault(),await a.saveEditedActualDuty(e)}),e.addEventListener("click",o=>{const l=o.target.closest("button[data-actual-edit-id]");if(l){const m=l.getAttribute("data-actual-edit-id")||"";if(!m)return;a.openEditActualDutyModal(e,m);return}const d=o.target.closest("button[data-actual-add-duty-id]");if(!d)return;const c=d.getAttribute("data-actual-add-duty-id")||"",u=d.getAttribute("data-actual-add-date")||"",p=d.getAttribute("data-actual-add-duty-name")||"";!c||!u||a.openCreateActualDutyModal(e,{dutyId:c,date:u,dutyName:p})}),e.addEventListener("dragstart",o=>{const l=o.target.closest("button[data-actual-drag-id]");l&&(Xt=l.getAttribute("data-actual-drag-id")||"",Xt&&(Ir(!0),l.classList.add("opacity-50"),o.dataTransfer&&(o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/plain",Xt)),i.applyDropTargetHighlights(e,Xt)))}),e.addEventListener("dragend",o=>{const l=o.target.closest("button[data-actual-drag-id]");l==null||l.classList.remove("opacity-50"),i.clearDropTargetHighlights(e),Xt="",Ir(!1)}),e.addEventListener("dragover",o=>{i.handleDragOver(o)}),e.addEventListener("drop",async o=>{var f;const l=o.target.closest("td[data-drop-duty-id]");if(!l){i.clearDropTargetHighlights(e),Ir(!1);return}o.preventDefault();const d=l.getAttribute("data-drop-duty-id")||"",c=l.getAttribute("data-drop-duty-name")||"",u=l.getAttribute("data-drop-date")||"",p=l.getAttribute("data-drop-role")||"",h=((f=o.dataTransfer)==null?void 0:f.getData("text/plain"))||""||Xt;if(!d||!u||!h){i.clearDropTargetHighlights(e),Ir(!1);return}i.clearDropTargetHighlights(e),await i.moveDraggedActualDuty(e,h,d,u,p,c),Ir(!1)}),jm("schedule",[t])}async function ef(e){const t=e.querySelector("#schedule-actual-edit-employee"),{data:r,error:n}=await S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0});if(n){g(n.message,"error");return}const s=(r||[]).map(a=>{const i=`${a.first_name??""} ${a.last_name??""}`.trim()||"-";return`<option value="${a.id}">${_e(i)}</option>`}).join("");t&&(t.innerHTML='<option value="">Избери служител</option>'+s)}async function Yn(e){const t=e.querySelector("#schedule-date"),r=t==null?void 0:t.value,n=e.querySelector("#schedule-sheet-date");if(n&&(n.textContent=r?Fm(r):""),!r){ht.clear(),Cr(e,{train:[],businessTrip:[],dayOff:[]},new Map),Rr(e,{hint:"Избери дата.",error:"",empty:""}),await rr(e,"");return}const{data:s,error:a}=await S.from("actual_duties").select("id, date, duty_id, employee_id, assignment_role, employees(first_name, last_name, positions(title)), duties(id, name, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name))").eq("date",r);if(a){g(a.message,"error"),ht.clear(),Cr(e,{train:[],businessTrip:[],dayOff:[]},new Map),Rr(e,{hint:"",error:"Грешка при зареждане на актуалните записи.",empty:""}),await rr(e,r);return}const{data:i,error:o}=await S.from("employee_absences").select("employee_id").lte("start_date",r).gte("end_date",r);if(o){g(o.message,"error"),ht.clear(),Cr(e,{train:[],businessTrip:[],dayOff:[]},new Map),Rr(e,{hint:"",error:"Грешка при зареждане на отсъствията.",empty:""}),await rr(e,r);return}const{data:l,error:d}=await ol(r);if(d){g(d.message,"error"),ht.clear(),Cr(e,{train:[],businessTrip:[],dayOff:[]},new Map),Rr(e,{hint:"",error:"Грешка при зареждане на повеските.",empty:""}),await rr(e,r);return}const c=new Set((i||[]).map(h=>h==null?void 0:h.employee_id).filter(Boolean));ht.clear(),(s||[]).forEach(h=>{h!=null&&h.id&&ht.set(h.id,h)});const u={train:[],businessTrip:[],dayOff:[]};(l||[]).forEach(h=>{const f=jt(h).toLowerCase();if(f.includes("на влак")){u.train.push(h);return}if(f.includes("командировка")){u.businessTrip.push(h);return}f.includes("свободен ден")&&u.dayOff.push(h)}),u.train.sort(Bm),u.businessTrip.sort(ra),u.dayOff.sort(ra);const p=Um(s||[],c);Cr(e,u,p,r);const m=u.train.length+u.businessTrip.length+u.dayOff.length;Rr(e,{hint:"",error:"",empty:m?"":"Няма повески за показване по избраните типове."}),await rr(e,r)}async function io(e,t,r,n){const s={error:null,removedEntries:[]};if(!e||!t||!r)return s;const{data:a,error:i}=await S.from("duties").select("id, duty_types(name)").eq("id",r).single();if(i)return{error:i,removedEntries:[]};if(!jt(a).toLowerCase().includes("на влак"))return s;const{data:l,error:d}=await S.from("duties").select("id, duty_types(name)");if(d)return{error:d,removedEntries:[]};const c=(l||[]).filter(y=>{const v=jt(y).toLowerCase();return v.includes("командировка")||v.includes("свободен ден")}).map(y=>y.id).filter(Boolean);if(!c.length)return s;let u=S.from("actual_duties").select("id, date, duties(name, duty_types(name))").eq("employee_id",e).eq("date",t).in("duty_id",c);n&&(u=u.neq("id",n));const{data:p,error:m}=await u;if(m)return{error:m,removedEntries:[]};const h=(p||[]).map(y=>y==null?void 0:y.id).filter(Boolean);if(!h.length)return s;const{error:f}=await S.from("actual_duties").delete().in("id",h);return f?{error:f,removedEntries:[]}:{error:null,removedEntries:(p||[]).map(y=>{const v=Qn(y);return{dutyName:String((v==null?void 0:v.name)||"").trim(),dutyTypeName:String(jt(v)||"").trim(),date:String((y==null?void 0:y.date)||"").trim()}})}}function Ir(e){document.body.classList.toggle("schedule-dragging",!!e)}const tf=`<section class="card border-0 shadow-sm">\r
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
`;function Is(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const oo=new Map;function rf(e,t){const r=oo.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){gr(a);return}}};oo.set(e,n),document.addEventListener("keydown",n)}function gr(e){var t,r;e.classList.add("d-none"),(t=document.querySelector("#duty-type-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#duty-type-delete-modal"))!=null&&r.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function lo(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const nt={rows:[],searchQuery:"",actionsEnabled:!0};async function Da(e){const{data:t,error:r}=await S.from("duty_types").select("id, name").order("name",{ascending:!0});if(r){g(r.message,"error"),nt.rows=[],na(e,"Грешка при зареждане на типовете повески.");return}nt.rows=t||[],na(e)}function na(e,t){var i;const r=e.querySelector("#duty-types-table-body"),n=e.querySelector("#duty-types-empty"),s=nt.actionsEnabled!==!1;(i=e.querySelector("thead th.text-end"))==null||i.classList.toggle("d-none",!s);const a=nt.rows.filter(o=>nt.searchQuery?(o.name||"").toLowerCase().includes(nt.searchQuery):!0);if(!a.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени типове повески.";return}n.classList.add("d-none"),r.innerHTML=a.map(o=>`
        <tr>
          <td>${lo(o.name??"-")}</td>
          ${s?`
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${o.id}"
                data-name="${lo(o.name??"")}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-action="delete"
                data-id="${o.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
          `:""}
        </tr>
      `).join("")}async function nf(e){e.innerHTML=tf,nt.actionsEnabled=!await mn(),sf(e),af(e),await Da(e)}function sf(e){var t,r;nt.actionsEnabled||((t=e.querySelector("#open-create-duty-type"))==null||t.classList.add("d-none"),(r=e.querySelector("thead th.text-end"))==null||r.classList.add("d-none"))}function af(e){const t=e.querySelector("#open-create-duty-type"),r=e.querySelector("#duty-type-form"),n=e.querySelector("#duty-type-cancel-btn"),s=e.querySelector("#duty-types-table-body"),a=e.querySelector("#duty-type-modal"),i=e.querySelector("#duty-type-delete-modal"),o=e.querySelector("#duty-type-modal-close"),l=e.querySelector("#duty-type-delete-confirm"),d=e.querySelector("#duty-type-delete-cancel"),c=e.querySelector("#duty-types-search");t==null||t.addEventListener("click",()=>{Oa(e),Is(a)}),r==null||r.addEventListener("submit",async u=>{u.preventDefault(),await of(e)}),n==null||n.addEventListener("click",()=>{gr(a)}),o==null||o.addEventListener("click",()=>{gr(a)}),d==null||d.addEventListener("click",()=>{gr(i)}),c==null||c.addEventListener("input",u=>{nt.searchQuery=u.target.value.trim().toLowerCase(),na(e)}),rf("duty-types",[i,a]),l==null||l.addEventListener("click",async()=>{const u=e.querySelector("#duty-type-delete-id").value;await df(u,e)}),s==null||s.addEventListener("click",u=>{const p=u.target.closest("button[data-action]");if(!p)return;const m=p.getAttribute("data-action");if(m==="edit"){lf(e,{id:p.getAttribute("data-id"),name:p.getAttribute("data-name")}),Is(a);return}if(m==="delete"){const h=p.getAttribute("data-id");e.querySelector("#duty-type-delete-id").value=h,Is(i)}})}async function of(e){var l;const t=e.querySelector("#duty-type-id"),r=e.querySelector("#duty-type-name"),n=e.querySelector("#duty-type-save-btn"),s=r.value.trim(),a=t.value;if(!s){g("Моля, попълни наименование.","warning");return}const i=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';let o;if(a)({error:o}=await S.from("duty_types").update({name:s}).eq("id",a));else{const{data:d}=await S.auth.getUser(),c=((l=d==null?void 0:d.user)==null?void 0:l.email)??"web_app";({error:o}=await S.from("duty_types").insert({name:s,created_from:c}))}if(n.disabled=!1,n.innerHTML=i,o){if(o.code==="23505"){g("Такъв тип вече съществува.","warning");return}g(o.message,"error");return}g(a?"Типът е обновен.":"Типът е създаден.","success"),gr(e.querySelector("#duty-type-modal")),Oa(e),await Da(e)}function lf(e,t){e.querySelector("#duty-type-id").value=t.id,e.querySelector("#duty-type-name").value=t.name??"",e.querySelector("#duty-type-form-title").textContent="Редакция на тип",e.querySelector("#duty-type-save-btn").textContent="Запази"}function Oa(e){e.querySelector("#duty-type-id").value="",e.querySelector("#duty-type-name").value="",e.querySelector("#duty-type-form-title").textContent="Нов тип",e.querySelector("#duty-type-save-btn").textContent="Създай"}async function df(e,t){const r=t.querySelector("#duty-type-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{count:s,error:a}=await S.from("duties").select("id",{count:"exact",head:!0}).eq("duty_type_id",e);if(a){r.disabled=!1,r.innerHTML=n,g(a.message,"error");return}if((s||0)>0){r.disabled=!1,r.innerHTML=n,g("Типът не може да се изтрие, защото се използва от повески.","warning");return}const{error:i}=await S.from("duty_types").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,i){if(i.code==="23503"){g("Типът не може да се изтрие, защото се използва от повески.","warning");return}g(i.message,"error");return}g("Типът е изтрит.","success"),gr(t.querySelector("#duty-type-delete-modal")),Oa(t),await Da(t)}const cf=`<section class="card border-0 shadow-sm">\r
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
</div>`;function Ge(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function co(e){return e?typeof e=="string"?e.replace(".000000",""):String(e):"-"}function uf(){return new URLSearchParams(window.location.search).get("scheduleKeyId")||""}function pf(){return new URLSearchParams(window.location.search).get("scheduleKeyName")||""}function on(e){e==null||e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const uo=new Map;function hf(e,t){const r=uo.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){He(a);return}}};uo.set(e,n),document.addEventListener("keydown",n)}function He(e){var a,i,o,l;e==null||e.classList.add("d-none");const t=(a=document.querySelector("#schedule-key-duty-create-modal"))==null?void 0:a.classList.contains("d-none"),r=(i=document.querySelector("#schedule-key-duty-edit-modal"))==null?void 0:i.classList.contains("d-none"),n=(o=document.querySelector("#schedule-key-duty-delete-modal"))==null?void 0:o.classList.contains("d-none"),s=(l=document.querySelector("#schedule-key-duty-profile-modal"))==null?void 0:l.classList.contains("d-none");t&&r&&n&&s&&document.body.classList.remove("overflow-hidden")}const te={scheduleKeyId:"",scheduleKeyName:"",duties:[],draggedDutyId:null,reorderEnabled:!0,lastCreatedDutyTypeId:"",lastCreatedScheduleKeyIds:[]},po="id, name, notes, duty_type_id, schedule_key_id, start_time, end_time, second_day, break_start_time, break_end_time, break_duration_interval, duration_interval, display_order, duty_types(name), schedule_key_duties(schedule_key_id, schedule_keys(name)), duty_trains(train_id, sequence_order, trains(number))";async function yn(e){const t=te.scheduleKeyId,{data:r,error:n}=await S.from("duties").select(po).eq("schedule_key_id",t).order("display_order",{ascending:!0}).order("name",{ascending:!0});if(n){te.duties=[],ur(e,"Грешка при зареждане на повеските."),g(n.message,"error");return}const{data:s,error:a}=await S.from("schedule_key_duties").select("duty_id").eq("schedule_key_id",t);if(a){te.duties=[],ur(e,"Грешка при зареждане на повеските."),g(a.message,"error");return}const i=r||[],o=new Set(i.map(c=>c==null?void 0:c.id).filter(Boolean)),l=[...new Set((s||[]).map(c=>c==null?void 0:c.duty_id).filter(Boolean))].filter(c=>!o.has(c));let d=[];if(l.length){const{data:c,error:u}=await S.from("duties").select(po).in("id",l);if(u){te.duties=[],ur(e,"Грешка при зареждане на повеските."),g(u.message,"error");return}d=c||[]}te.duties=[...i,...d].sort((c,u)=>{const p=Number.isFinite(Number(c==null?void 0:c.display_order))?Number(c.display_order):Number.MAX_SAFE_INTEGER,m=Number.isFinite(Number(u==null?void 0:u.display_order))?Number(u.display_order):Number.MAX_SAFE_INTEGER;return p!==m?p-m:String((c==null?void 0:c.name)||"").localeCompare(String((u==null?void 0:u.name)||""),"bg")}),ur(e)}function ur(e,t){const r=e.querySelector("#schedule-key-duties-body"),n=e.querySelector("#schedule-key-duties-empty");if(!te.duties.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма повески към този Ключ-График.";return}const s=te.reorderEnabled!==!1;n.classList.add("d-none"),r.innerHTML=te.duties.map(a=>{const i=ff(a),o=yf(a),l=`<span class="badge text-bg-info" title="${Ge(o.join(", "))}">${i.length} кл-гр</span>`;return`
        <tr data-duty-id="${a.id}" draggable="${s?"true":"false"}">
          <td class="text-secondary">${s?"↕":""}</td>
          <td>
            <div class="d-flex align-items-center gap-2 flex-wrap">
              ${l}
              <span>${Ge(a.name??"-")}</span>           
            </div>
          </td>
          <td>${Ge(a.start_time??"-")}</td>
          <td>${Ge(a.end_time??"-")}</td>
          <td>${a.second_day?"Да":"Не"}</td>
          <td>${Ge(co(a.break_duration_interval))}</td>
          <td>${Ge(co(a.duration_interval))}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                data-duty-action="profile"
                data-id="${a.id}"
              >
                Профил
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-duty-action="edit"
                data-id="${a.id}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-duty-action="delete"
                data-id="${a.id}"
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}async function mf(){const e=te.duties.map((n,s)=>S.from("duties").update({display_order:s+1}).eq("id",n.id)),r=(await Promise.all(e)).find(n=>n.error);return r!=null&&r.error?(g(r.error.message,"error"),!1):(te.duties=te.duties.map((n,s)=>({...n,display_order:s+1})),!0)}function ml(e){return Array.isArray(e.schedule_key_duties)?e.schedule_key_duties:e.schedule_key_duties?[e.schedule_key_duties]:[]}function ff(e){const t=ml(e).map(n=>n==null?void 0:n.schedule_key_id).filter(Boolean),r=t.length?t:e.schedule_key_id?[e.schedule_key_id]:[];return[...new Set(r)]}function yf(e){const t=ml(e).map(r=>{var n;return(n=r==null?void 0:r.schedule_keys)==null?void 0:n.name}).filter(Boolean);return[...new Set(t)]}async function bf(e){e.innerHTML=cf,te.reorderEnabled=!await mn(),vf(e),gf(e),await wf(e),await Sf(e),await kf(e),await _f(e)}function vf(e){const t=e.querySelector("#schedule-key-duty-create-form-fields");t&&(t.innerHTML=Qs({idPrefix:"schedule-key-duty-create"}));const r=e.querySelector("#schedule-key-duty-edit-form-fields");r&&(r.innerHTML=Qs({idPrefix:"schedule-key-duty-edit"}))}function gf(e){const t=e.querySelector("#open-create-schedule-key-duty"),r=e.querySelector("#schedule-key-duty-create-modal"),n=e.querySelector("#schedule-key-duty-create-form"),s=e.querySelector("#schedule-key-duty-create-modal-close"),a=e.querySelector("#schedule-key-duty-create-cancel"),i=e.querySelector("#schedule-key-duties-body"),o=e.querySelector("#schedule-key-duty-edit-modal"),l=e.querySelector("#schedule-key-duty-delete-modal"),d=e.querySelector("#schedule-key-duty-edit-form"),c=e.querySelector("#schedule-key-duty-edit-modal-close"),u=e.querySelector("#schedule-key-duty-edit-cancel"),p=e.querySelector("#schedule-key-duty-delete-cancel"),m=e.querySelector("#schedule-key-duty-delete-confirm"),h=e.querySelector("#schedule-key-duty-profile-modal"),f=e.querySelector("#schedule-key-duty-profile-close"),w=e.querySelector("#schedule-key-duty-profile-close-secondary"),y=e.querySelector("#schedule-key-duty-profile-edit");t==null||t.addEventListener("click",()=>{Pa(e),on(r)}),s==null||s.addEventListener("click",()=>{He(r)}),a==null||a.addEventListener("click",()=>{He(r)}),n==null||n.addEventListener("submit",async v=>{v.preventDefault(),await xf(e)}),d==null||d.addEventListener("submit",async v=>{v.preventDefault(),await qf(e)}),c==null||c.addEventListener("click",()=>{He(o)}),u==null||u.addEventListener("click",()=>{He(o)}),p==null||p.addEventListener("click",()=>{He(l)}),m==null||m.addEventListener("click",async()=>{const v=e.querySelector("#schedule-key-duty-delete-id").value;await If(e,v)}),f==null||f.addEventListener("click",()=>{He(h)}),w==null||w.addEventListener("click",()=>{He(h)}),y==null||y.addEventListener("click",()=>{var b;const v=((b=h==null?void 0:h.dataset)==null?void 0:b.dutyId)||"";v&&(He(h),ho(e,v))}),hf("schedule-key-duties",[h,l,o,r]),i==null||i.addEventListener("dragstart",v=>{if(!te.reorderEnabled)return;const b=v.target.closest("tr[data-duty-id]");b&&(te.draggedDutyId=b.getAttribute("data-duty-id"),b.classList.add("table-active"))}),i==null||i.addEventListener("dragend",v=>{if(!te.reorderEnabled)return;const b=v.target.closest("tr[data-duty-id]");b&&b.classList.remove("table-active"),te.draggedDutyId=null}),i==null||i.addEventListener("dragover",v=>{te.reorderEnabled&&v.preventDefault()}),i==null||i.addEventListener("drop",async v=>{if(!te.reorderEnabled)return;v.preventDefault();const b=v.target.closest("tr[data-duty-id]"),_=te.draggedDutyId;if(!b||!_)return;const k=b.getAttribute("data-duty-id");if(!k||k===_)return;const x=te.duties.findIndex(E=>E.id===_),L=te.duties.findIndex(E=>E.id===k);if(x<0||L<0)return;const[q]=te.duties.splice(x,1);if(te.duties.splice(L,0,q),ur(e),!await mf()){await yn(e);return}g("Редът на повеските е запазен.","success")}),i==null||i.addEventListener("click",async v=>{const b=v.target.closest("button[data-duty-action]");if(!b)return;const _=b.getAttribute("data-duty-action");if(_==="profile"){const k=b.getAttribute("data-id");Lf(e,k);return}if(_==="edit"){const k=b.getAttribute("data-id");ho(e,k);return}if(_==="delete"){const k=b.getAttribute("data-id");Rf(e,k)}})}async function _f(e){if(te.scheduleKeyId=uf(),te.scheduleKeyName=pf(),!te.scheduleKeyId){ur(e,"Няма избран Ключ-График. Върни се и избери запис."),e.querySelector("#open-create-schedule-key-duty").classList.add("d-none");return}if(!te.scheduleKeyName){const{data:t,error:r}=await S.from("schedule_keys").select("name").eq("id",te.scheduleKeyId).single();r&&g(r.message,"error"),te.scheduleKeyName=(t==null?void 0:t.name)||te.scheduleKeyId}e.querySelector("#schedule-key-duties-title").textContent=te.scheduleKeyName,Pa(e),await yn(e)}async function wf(e){const t=e.querySelector("#schedule-key-duty-create-type"),r=e.querySelector("#schedule-key-duty-edit-type"),{data:n,error:s}=await S.from("duty_types").select("id, name").order("name",{ascending:!0});if(s){g(s.message,"error");return}const a=(n||[]).map(i=>`<option value="${i.id}">${Ge(i.name)}</option>`).join("");t.innerHTML='<option value="">Избери тип</option>'+a,r.innerHTML='<option value="">Избери тип</option>'+a}async function Sf(e){const t=e.querySelector("#schedule-key-duty-create-schedule-keys"),r=e.querySelector("#schedule-key-duty-edit-schedule-keys"),{data:n,error:s}=await S.from("schedule_keys").select("id, name").order("name",{ascending:!0});if(s){g(s.message,"error");return}const a=(n||[]).map(i=>`<option value="${i.id}">${Ge(i.name)}</option>`).join("");t.innerHTML=a,r.innerHTML=a}async function kf(e){const t=e.querySelector("#schedule-key-duty-create-trains"),r=e.querySelector("#schedule-key-duty-edit-trains"),{data:n,error:s}=await S.from("trains").select("id, number, origin_station, destination_station").order("number",{ascending:!0});if(s){g(s.message,"error");return}const a=(n||[]).map(i=>{const o=`${i.origin_station||"-"} - ${i.destination_station||"-"}`;return`<option value="${i.id}">${Ge(i.number||"-")} (${Ge(o)})</option>`}).join("");t&&(t.innerHTML=a),r&&(r.innerHTML=a)}async function xf(e){var W,K;const t=e.querySelector("#schedule-key-duty-create-name"),r=e.querySelector("#schedule-key-duty-create-type"),n=e.querySelector("#schedule-key-duty-create-schedule-keys"),s=st(e,"#schedule-key-duty-create-start","#schedule-key-duty-create-start-time"),a=st(e,"#schedule-key-duty-create-end","#schedule-key-duty-create-end-time"),i=e.querySelector("#schedule-key-duty-create-second-day"),o=st(e,"#schedule-key-duty-create-break-start","#schedule-key-duty-create-break-start-time"),l=st(e,"#schedule-key-duty-create-break-end","#schedule-key-duty-create-break-end-time"),d=e.querySelector("#schedule-key-duty-create-trains"),c=e.querySelector("#schedule-key-duty-create-save"),u=t.value.trim(),p=r.value||null,m=Array.from(n.selectedOptions||[]).map(V=>V.value).filter(Boolean),h=m[0]||null,f=(s==null?void 0:s.value)||"",w=(a==null?void 0:a.value)||"",y=i.checked,v=(o==null?void 0:o.value)||"00:00",b=(l==null?void 0:l.value)||"00:00",_=e.querySelector("#schedule-key-duty-create-notes").value.trim()||null,k=Array.from(d.selectedOptions||[]).map(V=>V.value).filter(Boolean);if(!te.scheduleKeyId||!u||!p||!f||!w){g("Моля, попълни всички полета за повеската.","warning");return}if(!m.length){g("Избери поне един ключ-график.","warning");return}const x=Ie(f,w);if(Ie(v,b)>x){g("Прекъсването не може да е по-голямо от продължителността на повеската.","warning");return}const q=c.innerHTML;c.disabled=!0,c.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...';const{data:T}=await S.auth.getUser(),E=((W=T==null?void 0:T.user)==null?void 0:W.id)??((K=T==null?void 0:T.user)==null?void 0:K.email)??"web_app",$=te.duties.reduce((V,j)=>Math.max(V,Number(j.display_order)||0),0),{data:A,error:C}=await S.from("duties").insert({schedule_key_id:h,duty_type_id:p,name:u,start_time:f,end_time:w,second_day:y,break_start_time:v,break_end_time:b,notes:_,created_from:E,display_order:$+1}).select("id").single(),I=C?null:await fl(A==null?void 0:A.id,m),R=C||I?null:await yl(A==null?void 0:A.id,k);if(c.disabled=!1,c.innerHTML=q,C||I||R){g((C||I||R).message,"error");return}te.lastCreatedDutyTypeId=p,te.lastCreatedScheduleKeyIds=[...m],He(e.querySelector("#schedule-key-duty-create-modal")),Pa(e),g("Повеската е добавена към Ключ-График.","success"),await yn(e)}function ho(e,t){const r=te.duties.find(o=>o.id===t);if(!r){g("Повеската не е намерена.","warning");return}e.querySelector("#schedule-key-duty-edit-id").value=r.id,e.querySelector("#schedule-key-duty-edit-name").value=r.name??"",e.querySelector("#schedule-key-duty-edit-type").value=r.duty_type_id??"";const n=e.querySelector("#schedule-key-duty-edit-schedule-keys"),s=Ef(r);Array.from(n.options).forEach(o=>{o.selected=s.includes(o.value)});const a=e.querySelector("#schedule-key-duty-edit-trains"),i=Af(r);Array.from(a.options).forEach(o=>{o.selected=i.includes(o.value)}),gt(e,(r.start_time||"").slice(0,5),"#schedule-key-duty-edit-start","#schedule-key-duty-edit-start-time"),gt(e,(r.end_time||"").slice(0,5),"#schedule-key-duty-edit-end","#schedule-key-duty-edit-end-time"),e.querySelector("#schedule-key-duty-edit-second-day").checked=!!r.second_day,gt(e,Ht(r.break_start_time),"#schedule-key-duty-edit-break-start","#schedule-key-duty-edit-break-start-time"),gt(e,Ht(r.break_end_time),"#schedule-key-duty-edit-break-end","#schedule-key-duty-edit-break-end-time"),e.querySelector("#schedule-key-duty-edit-notes").value=r.notes??"",on(e.querySelector("#schedule-key-duty-edit-modal"))}function Pa(e){var s;e.querySelector("#schedule-key-duty-create-name").value="",e.querySelector("#schedule-key-duty-create-type").value=te.lastCreatedDutyTypeId||"";const t=(s=te.lastCreatedScheduleKeyIds)!=null&&s.length?te.lastCreatedScheduleKeyIds:[te.scheduleKeyId],r=e.querySelector("#schedule-key-duty-create-schedule-keys");Array.from(r.options).forEach(a=>{a.selected=t.includes(a.value)}),gt(e,"","#schedule-key-duty-create-start","#schedule-key-duty-create-start-time"),gt(e,"","#schedule-key-duty-create-end","#schedule-key-duty-create-end-time"),e.querySelector("#schedule-key-duty-create-second-day").checked=!1,gt(e,"00:00","#schedule-key-duty-create-break-start","#schedule-key-duty-create-break-start-time"),gt(e,"00:00","#schedule-key-duty-create-break-end","#schedule-key-duty-create-break-end-time"),e.querySelector("#schedule-key-duty-create-notes").value="";const n=e.querySelector("#schedule-key-duty-create-trains");Array.from(n.options).forEach(a=>{a.selected=!1})}async function qf(e){var _,k,x,L;const t=e.querySelector("#schedule-key-duty-edit-id").value,r=e.querySelector("#schedule-key-duty-edit-name").value.trim(),n=e.querySelector("#schedule-key-duty-edit-type").value||null,s=Array.from(e.querySelector("#schedule-key-duty-edit-schedule-keys").selectedOptions||[]).map(q=>q.value).filter(Boolean),a=s[0]||null,i=((_=st(e,"#schedule-key-duty-edit-start","#schedule-key-duty-edit-start-time"))==null?void 0:_.value)||"",o=((k=st(e,"#schedule-key-duty-edit-end","#schedule-key-duty-edit-end-time"))==null?void 0:k.value)||"",l=e.querySelector("#schedule-key-duty-edit-second-day").checked,d=((x=st(e,"#schedule-key-duty-edit-break-start","#schedule-key-duty-edit-break-start-time"))==null?void 0:x.value)||"00:00",c=((L=st(e,"#schedule-key-duty-edit-break-end","#schedule-key-duty-edit-break-end-time"))==null?void 0:L.value)||"00:00",u=e.querySelector("#schedule-key-duty-edit-notes").value.trim()||null,p=Array.from(e.querySelector("#schedule-key-duty-edit-trains").selectedOptions||[]).map(q=>q.value).filter(Boolean),m=e.querySelector("#schedule-key-duty-edit-save");if(!t||!r||!n||!i||!o){g("Моля, попълни всички полета за повеската.","warning");return}if(!s.length){g("Избери поне един ключ-график.","warning");return}const h=Ie(i,o);if(Ie(d,c)>h){g("Прекъсването не може да е по-голямо от продължителността на повеската.","warning");return}const w=m.innerHTML;m.disabled=!0,m.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const{error:y}=await S.from("duties").update({name:r,duty_type_id:n,schedule_key_id:a,start_time:i,end_time:o,second_day:l,break_start_time:d,break_end_time:c,notes:u}).eq("id",t),v=y?null:await fl(t,s),b=y||v?null:await yl(t,p);if(m.disabled=!1,m.innerHTML=w,y||v||b){g((y||v||b).message,"error");return}He(e.querySelector("#schedule-key-duty-edit-modal")),g("Повеската е обновена.","success"),await yn(e)}async function fl(e,t){if(!e)return{message:"Липсва идентификатор на повеска за запис на ключ-графици."};const{error:r}=await S.from("schedule_key_duties").delete().eq("duty_id",e);if(r)return r;const n=t.map(a=>({duty_id:e,schedule_key_id:a})),{error:s}=await S.from("schedule_key_duties").insert(n);return s}async function yl(e,t){if(!e)return{message:"Липсва идентификатор на повеска за запис на влакове."};const{error:r}=await S.from("duty_trains").delete().eq("duty_id",e);if(r)return r;if(!t.length)return null;const n=t.map((a,i)=>({duty_id:e,train_id:a,sequence_order:i+1})),{error:s}=await S.from("duty_trains").insert(n);return s}function Lf(e,t){const r=te.duties.find(l=>l.id===t),n=e.querySelector("#schedule-key-duty-profile-content"),s=e.querySelector("#schedule-key-duty-profile-modal"),a=e.querySelector("#schedule-key-duty-profile-edit");if(!n||!s)return;if(!r){s.dataset.dutyId="",a&&(a.disabled=!0),n.innerHTML='<p class="text-secondary mb-0">Няма данни за тази повеска.</p>',on(s);return}s.dataset.dutyId=r.id,a&&(a.disabled=!1);const i=$f(r),o=Cf(r);n.innerHTML=Go({duty:r,scheduleKeyNames:i,trainNumbers:o,escapeHtml:Ge,intervalToTimeInput:Ht,formatInterval:Tf}),on(s)}function Tf(e){return e?String(e).replace(".000000",""):"-"}function st(e,...t){for(const r of t){const n=e.querySelector(r);if(n)return n}return null}function gt(e,t,...r){const n=st(e,...r);n&&(n.value=t)}function bl(e){return Array.isArray(e==null?void 0:e.schedule_key_duties)?e.schedule_key_duties:e!=null&&e.schedule_key_duties?[e.schedule_key_duties]:[]}function Ef(e){const t=bl(e).map(n=>n==null?void 0:n.schedule_key_id).filter(Boolean),r=t.length?t:e!=null&&e.schedule_key_id?[e.schedule_key_id]:[];return[...new Set(r)]}function $f(e){const t=bl(e).map(r=>{var n;return(n=r==null?void 0:r.schedule_keys)==null?void 0:n.name}).filter(Boolean);return[...new Set(t)]}function vl(e){return Array.isArray(e==null?void 0:e.duty_trains)?e.duty_trains:e!=null&&e.duty_trains?[e.duty_trains]:[]}function Af(e){return vl(e).map(t=>({id:t==null?void 0:t.train_id,sequenceOrder:Number.isFinite(Number(t==null?void 0:t.sequence_order))?Number(t.sequence_order):Number.MAX_SAFE_INTEGER})).filter(t=>!!t.id).sort((t,r)=>t.sequenceOrder-r.sequenceOrder).map(t=>t.id).filter((t,r,n)=>n.indexOf(t)===r)}function Cf(e){return vl(e).map(t=>{var r;return{number:(r=t==null?void 0:t.trains)==null?void 0:r.number,sequenceOrder:Number.isFinite(Number(t==null?void 0:t.sequence_order))?Number(t.sequence_order):Number.MAX_SAFE_INTEGER}}).filter(t=>!!t.number).sort((t,r)=>t.sequenceOrder-r.sequenceOrder).map(t=>t.number).filter((t,r,n)=>n.indexOf(t)===r)}function Rf(e,t){e.querySelector("#schedule-key-duty-delete-id").value=t,on(e.querySelector("#schedule-key-duty-delete-modal"))}async function If(e,t){const r=e.querySelector("#schedule-key-duty-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{error:s}=await S.from("duties").delete().eq("id",t).eq("schedule_key_id",te.scheduleKeyId);if(r.disabled=!1,r.innerHTML=n,s){g(s.message,"error");return}He(e.querySelector("#schedule-key-duty-delete-modal")),g("Повеската е изтрита.","success"),await yn(e)}const Df=`<section class="card border-0 shadow-sm">\r
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
`;function Fn(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const mo=new Map;function Of(e,t){const r=mo.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Nt(a);return}}};mo.set(e,n),document.addEventListener("keydown",n)}function Nt(e){var t,r,n;e.classList.add("d-none"),(t=document.querySelector("#train-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#train-delete-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#train-timetable-preview-modal"))!=null&&n.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function ve(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function fo(e){const t=String(e||"").trim();if(!t)return"";const r=t.match(/^(\d{1,2}:\d{2})/);return r?r[1]:t.slice(0,5)}const we={rows:[],searchQuery:"",originFilter:"",destinationFilter:""};async function Ma(e){const{data:t,error:r}=await S.from("trains").select("id, number, origin_station, destination_station, departure_time, arrival_time, timetable_url").order("number",{ascending:!0});if(r){g(r.message,"error"),we.rows=[],pr(e,"Грешка при зареждане на влаковете.");return}we.rows=t||[],pr(e)}function pr(e,t){const r=e.querySelector("#trains-table-body"),n=e.querySelector("#trains-empty");Mf(e);const s=we.rows.filter(a=>{const i=`${a.number||""} ${a.origin_station||""} ${a.destination_station||""}`.toLowerCase(),o=String(a.origin_station||"").trim().toLowerCase(),l=String(a.destination_station||"").trim().toLowerCase(),d=!we.searchQuery||i.includes(we.searchQuery),c=!we.originFilter||o===we.originFilter,u=!we.destinationFilter||l===we.destinationFilter;return d&&c&&u});if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени влакове.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>{const i=Pf(a.timetable_url),o=i.length?`<div class="d-flex flex-column gap-0">${i.map((l,d)=>{const c=l.label||`Файл ${d+1}`,u=encodeURIComponent(l.url),p=encodeURIComponent(c);return`
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <a class="text-decoration-none" href="${ve(l.url)}" target="_blank" rel="noopener noreferrer">${ve(c)}</a>
                <button
                  type="button"
                  class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
                  data-action="preview-timetable"
                  data-preview-url="${ve(u)}"
                  data-preview-label="${ve(p)}"
                  title="Преглед"
                  aria-label="Преглед"
                >
                  👁
                </button>
              </div>
            `}).join("")}</div>`:'<span class="text-secondary">-</span>';return`
        <tr>
          <td>${ve(a.number??"-")}</td>
          <td>${ve(a.origin_station??"-")}</td>
          <td>${ve(a.destination_station??"-")}</td>
          <td>${ve((a.departure_time||"").slice(0,5)||"-")}</td>
          <td>${ve((a.arrival_time||"").slice(0,5)||"-")}</td>
          <td>${o}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-action="edit"
                data-id="${a.id}"
                data-number="${ve(a.number??"")}"
                data-origin-station="${ve(a.origin_station??"")}"
                data-destination-station="${ve(a.destination_station??"")}"
                data-departure-time="${ve(a.departure_time??"")}"
                data-arrival-time="${ve(a.arrival_time??"")}"
                data-timetable-url="${ve(encodeURIComponent(a.timetable_url??""))}"
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
      `}).join("")}function Pf(e){if(Array.isArray(e))return e.map((r,n)=>Ds(r,n)).filter(r=>r.url);const t=String(e||"").trim();if(!t)return[];if(t.startsWith("["))try{const r=JSON.parse(t);if(Array.isArray(r))return r.map((n,s)=>Ds(n,s)).filter(n=>n.url)}catch{return[{url:t,label:sa(t,0)}]}return t.split(`
`).map((r,n)=>Ds(r,n)).filter(r=>r.url)}function Mf(e){const t=e.querySelector("#trains-origin-filter"),r=e.querySelector("#trains-destination-filter");if(!t||!r)return;const n=we.originFilter||"",s=we.destinationFilter||"",a=[...new Set(we.rows.map(o=>String((o==null?void 0:o.origin_station)||"").trim()).filter(Boolean))].sort((o,l)=>o.localeCompare(l,"bg")),i=[...new Set(we.rows.map(o=>String((o==null?void 0:o.destination_station)||"").trim()).filter(Boolean))].sort((o,l)=>o.localeCompare(l,"bg"));t.innerHTML=`
    <option value="">Всички</option>
    ${a.map(o=>`<option value="${ve(o.toLowerCase())}">${ve(o)}</option>`).join("")}
  `,r.innerHTML=`
    <option value="">Всички</option>
    ${i.map(o=>`<option value="${ve(o.toLowerCase())}">${ve(o)}</option>`).join("")}
  `,t.value=n,r.value=s}function Ds(e,t){if(e&&typeof e=="object"&&!Array.isArray(e)){const n=String(e.url||"").trim(),s=String(e.label||"").trim()||sa(n,t);return{url:n,label:s}}const r=String(e||"").trim();return{url:r,label:sa(r,t)}}function sa(e,t){const r=String(e||"").trim();if(!r)return`Файл ${t+1}`;try{const s=new URL(r).pathname.split("/").pop()||"",a=decodeURIComponent(s);if(a)return a}catch{}return`Файл ${t+1}`}const ln="train-timetables",Xn=5;async function jf(e){e.innerHTML=Df,Nf(e),await Ma(e)}function Nf(e){const t=e.querySelector("#open-create-train"),r=e.querySelector("#train-form"),n=e.querySelector("#train-cancel-btn"),s=e.querySelector("#trains-table-body"),a=e.querySelector("#train-modal"),i=e.querySelector("#train-delete-modal"),o=e.querySelector("#train-timetable-preview-modal"),l=e.querySelector("#train-modal-close"),d=e.querySelector("#train-delete-confirm"),c=e.querySelector("#train-delete-cancel"),u=e.querySelector("#train-timetable-preview-close"),p=e.querySelector("#trains-search"),m=e.querySelector("#trains-origin-filter"),h=e.querySelector("#trains-destination-filter"),f=e.querySelector("#trains-filter-reset"),w=e.querySelector("#train-timetable-url"),y=e.querySelector("#train-timetable-label"),v=e.querySelector("#train-timetable-file"),b=e.querySelector("#train-current-timetable-links");t==null||t.addEventListener("click",()=>{ja(e),Fn(a)}),r==null||r.addEventListener("submit",async _=>{_.preventDefault(),await Hf(e)}),n==null||n.addEventListener("click",()=>{Nt(a)}),l==null||l.addEventListener("click",()=>{Nt(a)}),c==null||c.addEventListener("click",()=>{Nt(i)}),u==null||u.addEventListener("click",()=>{Kf(e)}),p==null||p.addEventListener("input",_=>{we.searchQuery=_.target.value.trim().toLowerCase(),pr(e)}),m==null||m.addEventListener("change",_=>{we.originFilter=_.target.value||"",pr(e)}),h==null||h.addEventListener("change",_=>{we.destinationFilter=_.target.value||"",pr(e)}),f==null||f.addEventListener("click",()=>{we.searchQuery="",we.originFilter="",we.destinationFilter="",p&&(p.value=""),m&&(m.value=""),h&&(h.value=""),pr(e)}),w==null||w.addEventListener("input",()=>{}),y==null||y.addEventListener("input",()=>{}),v==null||v.addEventListener("change",()=>{var _;if((_=v.files)!=null&&_.length&&v.files.length>Xn){g(`Може да избереш до ${Xn} файла наведнъж.`,"warning"),v.value="";return}}),b==null||b.addEventListener("input",_=>{const k=_.target.closest(".train-existing-timetable-label");if(!k)return;const x=Number(k.getAttribute("data-index"));if(!Number.isInteger(x)||x<0)return;const L=e.querySelector("#train-draft-timetable-url"),q=_r((L==null?void 0:L.value)||"");q[x]&&(q[x].label=k.value,L&&(L.value=cn(q)||""))}),b==null||b.addEventListener("click",_=>{const k=_.target.closest(".train-existing-timetable-preview");if(k){const E=String(k.getAttribute("data-url")||"").trim(),$=String(k.getAttribute("data-label")||"").trim();yo(e,E,$);return}const x=_.target.closest(".train-existing-timetable-remove");if(!x)return;const L=Number(x.getAttribute("data-index"));if(!Number.isInteger(L)||L<0)return;const q=e.querySelector("#train-draft-timetable-url"),T=_r((q==null?void 0:q.value)||"");T[L]&&(T.splice(L,1),Na(e,T))}),Of("trains",[o,i,a]),d==null||d.addEventListener("click",async()=>{const _=e.querySelector("#train-delete-id").value;await Bf(_,e)}),s==null||s.addEventListener("click",_=>{const k=_.target.closest("button[data-action]");if(!k)return;const x=k.getAttribute("data-action");if(x==="edit"){Uf(e,{id:k.getAttribute("data-id"),number:k.getAttribute("data-number"),originStation:k.getAttribute("data-origin-station"),destinationStation:k.getAttribute("data-destination-station"),departureTime:k.getAttribute("data-departure-time"),arrivalTime:k.getAttribute("data-arrival-time"),timetableUrl:decodeURIComponent(k.getAttribute("data-timetable-url")||"")}),Fn(a);return}if(x==="delete"){const L=k.getAttribute("data-id");e.querySelector("#train-delete-id").value=L,Fn(i);return}if(x==="preview-timetable"){const L=decodeURIComponent(k.getAttribute("data-preview-url")||""),q=decodeURIComponent(k.getAttribute("data-preview-label")||"");yo(e,L,q)}})}async function Hf(e){var W;const t=e.querySelector("#train-id"),r=e.querySelector("#train-number"),n=e.querySelector("#train-origin-station"),s=e.querySelector("#train-destination-station"),a=e.querySelector("#train-departure-time"),i=e.querySelector("#train-arrival-time"),o=e.querySelector("#train-timetable-url"),l=e.querySelector("#train-timetable-label"),d=e.querySelector("#train-timetable-file"),c=e.querySelector("#train-existing-timetable-url"),u=e.querySelector("#train-draft-timetable-url"),p=e.querySelector("#train-save-btn"),m=r.value.trim(),h=n.value.trim(),f=s.value.trim(),w=a.value,y=i.value,v=_r(c.value),b=_r(u.value),_=o.value.trim()||"",k=l.value.trim()||"",x=Array.from((d==null?void 0:d.files)||[]),L=t.value;if(!m||!h||!f||!w||!y){g("Моля, попълни всички задължителни полета.","warning");return}if(k&&!_){g("За да зададеш име, въведи и линк.","warning");return}const q=p.innerHTML;p.disabled=!0,p.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';const T=L||crypto.randomUUID(),E=Zn(b),$=[];if(_&&E.push({url:_,label:k||wr(_,E.length)}),E.length+x.length>Xn){p.disabled=!1,p.innerHTML=q,g(`Максимум ${Xn} файла/линка за един влак.`,"warning");return}if(x.length){const K=await Ff(x,T);if(!K){p.disabled=!1,p.innerHTML=q;return}K.forEach(V=>{V!=null&&V.url&&E.push({url:V.url,label:V.label||wr(V.url,E.length)}),V!=null&&V.objectPath&&$.push(V.objectPath)})}const C=Zn(E),I={number:m,origin_station:h,destination_station:f,departure_time:w,arrival_time:y,timetable_url:cn(C)};let R;if(L)({error:R}=await S.from("trains").update(I).eq("id",L));else{const{data:K}=await S.auth.getUser(),V=((W=K==null?void 0:K.user)==null?void 0:W.email)??"web_app";({error:R}=await S.from("trains").insert({...I,id:T,created_from:V}))}if(p.disabled=!1,p.innerHTML=q,R){$.length&&await dn($),g(R.message,"error");return}if(L){const K=v.map(ee=>aa(ee.url)).filter(Boolean),V=C.map(ee=>aa(ee.url)).filter(Boolean),j=new Set(V),z=K.filter(ee=>!j.has(ee));z.length&&await dn(z)}g(L?"Влакът е обновен.":"Влакът е създаден.","success"),Nt(e.querySelector("#train-modal")),ja(e),await Ma(e)}function Uf(e,t){const r=_r(t.timetableUrl);e.querySelector("#train-id").value=t.id,e.querySelector("#train-existing-timetable-url").value=cn(r)||"",e.querySelector("#train-draft-timetable-url").value=cn(r)||"",e.querySelector("#train-number").value=t.number??"",e.querySelector("#train-origin-station").value=t.originStation??"",e.querySelector("#train-destination-station").value=t.destinationStation??"",e.querySelector("#train-departure-time").value=fo(t.departureTime),e.querySelector("#train-arrival-time").value=fo(t.arrivalTime),e.querySelector("#train-timetable-file").value="",e.querySelector("#train-timetable-url").value="",e.querySelector("#train-timetable-label").value="",Na(e,r),e.querySelector("#train-form-title").textContent="Редакция на влак",e.querySelector("#train-save-btn").textContent="Запази"}function ja(e){e.querySelector("#train-id").value="",e.querySelector("#train-existing-timetable-url").value="",e.querySelector("#train-draft-timetable-url").value="",e.querySelector("#train-number").value="",e.querySelector("#train-origin-station").value="",e.querySelector("#train-destination-station").value="",e.querySelector("#train-departure-time").value="",e.querySelector("#train-arrival-time").value="",e.querySelector("#train-timetable-file").value="",e.querySelector("#train-timetable-url").value="",e.querySelector("#train-timetable-label").value="",Na(e,[]),e.querySelector("#train-form-title").textContent="Нов влак",e.querySelector("#train-save-btn").textContent="Създай"}async function Ff(e,t){var n;if(!Array.isArray(e)||!e.length||!t)return[];const r=[];for(const s of e){const i=(((n=s.name)==null?void 0:n.split(".").pop())||"pdf").toLowerCase().replace(/[^a-z0-9]/g,"")||"pdf",o=Math.random().toString(36).slice(2,10),l=`${t}/${Date.now()}-${o}.${i}`,{error:d}=await S.storage.from(ln).upload(l,s,{upsert:!0,contentType:s.type||void 0});if(d)return r.length&&await dn(r.map(u=>u.objectPath)),g(d.message,"error"),null;const{data:c}=S.storage.from(ln).getPublicUrl(l);if(!(c!=null&&c.publicUrl))return await dn([l,...r.map(u=>u.objectPath)]),g("Файлът е качен, но не успях да генерирам публичен линк.","error"),null;r.push({url:c.publicUrl,label:s.name||"",objectPath:l})}return r}function aa(e){const t=String(e||"").trim();if(!t)return"";if(!/^https?:\/\//i.test(t)){const r=t.replace(/^\/+/,""),n=`${ln}/`;return r.startsWith(n)?r.slice(n.length):""}try{const r=new URL(t),n=`/storage/v1/object/public/${ln}/`,s=r.pathname.indexOf(n);return s===-1?"":decodeURIComponent(r.pathname.slice(s+n.length))}catch{return""}}async function dn(e){const t=Array.from(new Set((e||[]).filter(Boolean)));t.length&&await S.storage.from(ln).remove(t)}async function Bf(e,t){const r=t.querySelector("#train-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{count:s,error:a}=await S.from("duty_trains").select("duty_id",{count:"exact",head:!0}).eq("train_id",e);if(a){r.disabled=!1,r.innerHTML=n,g(a.message,"error");return}if((s||0)>0){r.disabled=!1,r.innerHTML=n,g("Влакът не може да се изтрие, защото се използва в повески.","warning");return}const{data:i,error:o}=await S.from("trains").select("timetable_url").eq("id",e).maybeSingle();if(o){r.disabled=!1,r.innerHTML=n,g(o.message,"error");return}const{error:l}=await S.from("trains").delete().eq("id",e);if(r.disabled=!1,r.innerHTML=n,l){if(l.code==="23503"){g("Влакът не може да се изтрие, защото се използва в повески.","warning");return}g(l.message,"error");return}const c=_r(i==null?void 0:i.timetable_url).map(u=>aa(u.url)).filter(Boolean);c.length&&await dn(c),g("Влакът е изтрит.","success"),Nt(t.querySelector("#train-delete-modal")),ja(t),await Ma(t)}function Na(e,t){const r=e.querySelector("#train-current-timetable-wrap"),n=e.querySelector("#train-current-timetable-links"),s=e.querySelector("#train-draft-timetable-url");if(!r||!n||!s)return;const a=Zn(t);if(s.value=cn(a)||"",!a.length){r.classList.add("d-none"),n.innerHTML="";return}r.classList.remove("d-none"),n.innerHTML=a.map((i,o)=>{const l=i.label||wr(i.url,o);return`
        <div class="border rounded p-2 w-100">
          <div class="mb-2 d-flex align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <a href="${hr(i.url)}" target="_blank" rel="noopener noreferrer">Отвори</a>
              <button
                type="button"
                class="btn btn-link btn-sm p-0 lh-1 text-decoration-none train-existing-timetable-preview"
                data-url="${hr(i.url)}"
                data-label="${hr(l)}"
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
            value="${hr(l)}"
            placeholder="Име на файла/линка"
          />
        </div>
      `}).join("")}function _r(e){if(Array.isArray(e))return e.map((r,n)=>Bn(r,n)).filter(r=>r.url);const t=String(e||"").trim();if(!t)return[];if(t.startsWith("["))try{const r=JSON.parse(t);if(Array.isArray(r))return r.map((n,s)=>Bn(n,s)).filter(n=>n.url)}catch{return[{url:t,label:wr(t,0)}]}return t.split(`
`).map((r,n)=>Bn(r,n)).filter(r=>r.url)}function Bn(e,t){if(e&&typeof e=="object"&&!Array.isArray(e)){const n=String(e.url||"").trim(),s=String(e.label||"").trim()||wr(n,t);return{url:n,label:s}}const r=String(e||"").trim();return{url:r,label:wr(r,t)}}function Zn(e){const t=new Set;return(e||[]).map((r,n)=>Bn(r,n)).filter(r=>!r.url||t.has(r.url)?!1:(t.add(r.url),!0))}function cn(e){const t=Zn(e);return t.length?JSON.stringify(t):null}function wr(e,t){const r=String(e||"").trim();if(!r)return`Файл ${t+1}`;try{const s=new URL(r).pathname.split("/").pop()||"",a=decodeURIComponent(s);if(a)return a}catch{}return`Файл ${t+1}`}function hr(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function yo(e,t,r){const n=e.querySelector("#train-timetable-preview-modal"),s=e.querySelector("#train-timetable-preview-frame"),a=e.querySelector("#train-timetable-preview-text-wrap"),i=e.querySelector("#train-timetable-preview-text"),o=e.querySelector("#train-timetable-preview-csv-wrap"),l=e.querySelector("#train-timetable-preview-csv-note"),d=e.querySelector("#train-timetable-preview-csv-head"),c=e.querySelector("#train-timetable-preview-csv-body"),u=e.querySelector("#train-timetable-preview-title"),p=e.querySelector("#train-timetable-preview-fallback"),m=e.querySelector("#train-timetable-preview-open");if(!n||!s||!a||!i||!o||!l||!d||!c||!u||!p||!m)return;const h=String(t||"").trim();if(!h){g("Липсва линк за преглед.","warning");return}const f=Gf(h),w=ia(h),y=w==="csv",v=["txt","csv","json"].includes(w);u.textContent=r?`Преглед: ${r}`:"Преглед на разписание",m.setAttribute("href",h),p.classList.add("d-none"),a.classList.add("d-none"),o.classList.add("d-none"),l.textContent="",d.innerHTML="",c.innerHTML="",i.textContent="",s.classList.remove("d-none"),s.src="about:blank",y?(o.classList.remove("d-none"),s.classList.add("d-none"),zf(h,d,c,l,p)):v?(a.classList.remove("d-none"),s.classList.add("d-none"),i.textContent="Зареждане...",Vf(h,i,p)):(s.src=f,s.onload=()=>{if(f!==h){p.classList.add("d-none");return}const b=ia(h),_=["doc","docx","xls","xlsx","ppt","pptx"].includes(b);p.classList.toggle("d-none",!_)},s.onerror=()=>{p.classList.remove("d-none")}),Fn(n)}function Kf(e){const t=e.querySelector("#train-timetable-preview-modal"),r=e.querySelector("#train-timetable-preview-frame"),n=e.querySelector("#train-timetable-preview-text-wrap"),s=e.querySelector("#train-timetable-preview-text"),a=e.querySelector("#train-timetable-preview-csv-wrap"),i=e.querySelector("#train-timetable-preview-csv-note"),o=e.querySelector("#train-timetable-preview-csv-head"),l=e.querySelector("#train-timetable-preview-csv-body"),d=e.querySelector("#train-timetable-preview-fallback"),c=e.querySelector("#train-timetable-preview-open");!t||!r||!n||!s||!a||!i||!o||!l||!d||!c||(r.src="about:blank",r.classList.remove("d-none"),n.classList.add("d-none"),a.classList.add("d-none"),s.textContent="",i.textContent="",o.innerHTML="",l.innerHTML="",c.setAttribute("href","#"),d.classList.add("d-none"),Nt(t))}async function zf(e,t,r,n,s){try{const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const i=await a.text(),o=Wf(i);if(!o.length){t.innerHTML="",r.innerHTML="",n.textContent="Файлът е празен.",s.classList.add("d-none");return}const l=200,d=o.slice(0,l),c=d[0]||[],u=d.slice(1);t.innerHTML=`
      <tr>${c.map(p=>`<th>${hr(p)}</th>`).join("")}</tr>
    `,r.innerHTML=u.map(p=>`<tr>${p.map(m=>`<td>${hr(m)}</td>`).join("")}</tr>`).join(""),o.length>l?n.textContent=`Показани са първите ${l} реда от общо ${o.length}.`:n.textContent=`Редове: ${o.length}.`,s.classList.add("d-none")}catch{t.innerHTML="",r.innerHTML="",n.textContent="",s.classList.remove("d-none")}}function Wf(e){const t=[];let r=[],n="",s=!1;for(let a=0;a<e.length;a+=1){const i=e[a],o=e[a+1];if(i==='"'){s&&o==='"'?(n+='"',a+=1):s=!s;continue}if(!s&&i===","){r.push(n),n="";continue}if(!s&&(i===`
`||i==="\r")){i==="\r"&&o===`
`&&(a+=1),r.push(n),t.push(r),r=[],n="";continue}n+=i}return(n.length||r.length)&&(r.push(n),t.push(r)),t}async function Vf(e,t,r){try{const n=await fetch(e,{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.text();t.textContent=s||"(Празен файл)",r.classList.add("d-none")}catch{t.textContent="Неуспешно зареждане на текстов преглед.",r.classList.remove("d-none")}}function Gf(e){const t=ia(e);return["doc","docx","xls","xlsx","ppt","pptx"].includes(t)?`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(e)}`:e}function ia(e){const t=String(e||"").trim();if(!t)return"";try{const n=new URL(t).pathname.split("/").pop()||"",s=n.includes(".")?n.split(".").pop():"";return String(s||"").toLowerCase()}catch{return""}}const Jf=`<section class="card border-0 shadow-sm">\r
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
`,U={profiles:[],employees:[],roleCatalog:[],availableRoles:[],roles:[],roleAuditLogs:[],currentUserId:"",currentUserProtectedAdminIds:[],permissionsRole:"admin",permissions:[]},Qf={admin:"Админ",crew_manager:"Ръководител екип",head_of_transport:"Ръководител транспорт",crew_instructor:"Инструктор екип",instructor:"Инструктор",crew:"Екип",crew_member:"Член екип",user:"Потребител"};function fe(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#39;")}function gl(e){const t=String((e==null?void 0:e.username)||"").trim(),r=String((e==null?void 0:e.id)||"").trim(),n=(e==null?void 0:e.is_active)===!1;if(t&&r)return`${t} (${r})${n?" (деактивиран)":""}`;const s=t||r||"-";return n&&s!=="-"?`${s} (деактивиран)`:s}function _l(e){const t=String((e==null?void 0:e.first_name)||"").trim(),r=String((e==null?void 0:e.last_name)||"").trim(),n=`${t} ${r}`.trim();return n?(e==null?void 0:e.is_active)===!1?`${n} (неактивен)`:n:"-"}function un(e){const t=String(e||"").trim().toLowerCase();return t?Qf[t]||e:"-"}const wl=[{value:"none",label:"без достъп"},{value:"all",label:"всички"},{value:"own",label:"собствени"},{value:"role_attached_employees",label:"към прикачени служители по роля"}],Yf=[{value:"none",label:"Не"},{value:"all",label:"Да"}],Xf=[{value:"none",label:"Не"},{value:"all",label:"Да"}];function oa(e){const t=e.querySelector("#admin-role-profile-id"),r=e.querySelector("#admin-profile-link-id"),n=e.querySelector("#admin-profile-link-employee-id"),s=(t==null?void 0:t.value)||"",a=(r==null?void 0:r.value)||"",i=(n==null?void 0:n.value)||"",o=U.profiles.map(d=>{const c=gl(d);return`<option value="${d.id}">${fe(c)}</option>`}).join("");t&&(t.innerHTML=`<option value="">Избери профил</option>${o}`,t.value=U.profiles.some(d=>d.id===s)?s:""),r&&(r.innerHTML=`<option value="">Избери профил</option>${o}`,r.value=U.profiles.some(d=>d.id===a)?a:"");const l=U.employees.map(d=>{const c=_l(d);return`<option value="${d.id}">${fe(c)}</option>`}).join("");n&&(n.innerHTML=`<option value="">Избери служител</option>${l}`,n.value=U.employees.some(d=>d.id===i)?i:"")}function la(e,t){const r=e.querySelector("#admin-roles-body"),n=e.querySelector("#admin-roles-empty");if(!r||!n)return;if(!U.roles.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма добавени роли.";return}n.classList.add("d-none");const s=U.roles.filter(a=>String((a==null?void 0:a.role)||"").trim().toLowerCase()==="admin").length;r.innerHTML=U.roles.map(a=>{const i=(a==null?void 0:a.username)||(a==null?void 0:a.user_id)||"-",o=a!=null&&a.role?Zf(a.role):"-",l=(a==null?void 0:a.granted_by_username)||(a==null?void 0:a.granted_by_user_id)||"-",d=(a==null?void 0:a.user_id)||"",c=!!(a!=null&&a.role),u=String((a==null?void 0:a.role)||"").trim().toLowerCase()==="admin",p=u&&s<=1,m=u&&d&&U.currentUserProtectedAdminIds.includes(d),h=!c||p||m,f=[c?`<span class="badge text-bg-secondary">${fe(o)}</span>`:'<span class="text-secondary">-</span>',m?'<span class="badge text-bg-info">Твой grantor lineage</span>':""].filter(Boolean).join(" "),w=p?"Не може да се премахне последният администратор.":m?"Не можеш да премахнеш админ права нагоре по grantor веригата.":"";return`
        <tr>
          <td>${fe(i)}</td>
          <td>${f}</td>
          <td>${c?fe(l):'<span class="text-secondary">-</span>'}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-admin-action="add-role"
                data-user-id="${d}"
                data-username="${fe(i)}"
              >
                Добави роля
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-admin-action="remove-role"
                data-role-id="${a.id||""}"
                ${h?"disabled":""}
                title="${w}"
              >
                Премахни
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}function da(e,t){const r=e.querySelector("#admin-role-catalog-body"),n=e.querySelector("#admin-role-catalog-empty");if(!(!r||!n)){if(!U.roleCatalog.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма налични роли.";return}n.classList.add("d-none"),r.innerHTML=U.roleCatalog.map(s=>{const a=String((s==null?void 0:s.name)||"").trim(),i=String((s==null?void 0:s.display_name_bg)||"").trim()||un(a),o=a==="admin";return`
        <tr>
          <td>${fe(a)}</td>
          <td>${fe(i)}</td>
          <td class="text-end">
            <div class="d-inline-flex gap-2">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                data-admin-action="edit-catalog-role"
                data-role-name="${fe(a)}"
                data-role-bg="${fe(i)}"
              >
                Редакция
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                data-admin-action="delete-catalog-role"
                data-role-name="${fe(a)}"
                ${o?"disabled":""}
              >
                Изтрий
              </button>
            </div>
          </td>
        </tr>
      `}).join("")}}function ca(e,t){const r=e.querySelector("#admin-profiles-body"),n=e.querySelector("#admin-profiles-empty");if(!(!r||!n)){if(!U.profiles.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма налични профили.";return}n.classList.add("d-none"),r.innerHTML=U.profiles.map(s=>{const a=gl(s),i=(s==null?void 0:s.is_active)!==!1,o=i?'<span class="badge text-bg-success">Активен</span>':'<span class="badge text-bg-secondary">Деактивиран</span>',l=s!=null&&s.employees?_l(s.employees):"-",d=!!(s!=null&&s.employee_id),c=String((s==null?void 0:s.id)||"")===String(U.currentUserId||""),u=!i||c,p=i,m=c;return`
        <tr>
          <td>${fe(a)}</td>
          <td>${o}</td>
          <td>${fe(l)}</td>
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
              ${p?"disabled":""}
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
      `}).join("")}}function ua(e,t){const r=e.querySelector("#admin-permissions-body"),n=e.querySelector("#admin-permissions-empty");if(!(!r||!n)){if(!U.permissions.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма данни за права.";return}n.classList.add("d-none"),r.innerHTML=U.permissions.map(s=>{const a=String((s==null?void 0:s.resource)||"-"),i=String((s==null?void 0:s.display_name_bg)||"").trim()||Sa(a),o=Or(s==null?void 0:s.view_screen_scope),l=Or(s==null?void 0:s.view_records_scope),d=Or(s==null?void 0:s.create_records_scope),c=Or(s==null?void 0:s.edit_records_scope),u=Or(s==null?void 0:s.delete_records_scope);return`
        <tr data-resource="${fe(a)}">
          <td>${fe(i)}</td>
          <td class="text-center">
            ${Dr("view_screen_scope",o)}
          </td>
          <td class="text-center">
            ${Dr("view_records_scope",l)}
          </td>
          <td class="text-center">
            ${Dr("create_records_scope",d)}
          </td>
          <td class="text-center">
            ${Dr("edit_records_scope",c)}
          </td>
          <td class="text-center">
            ${Dr("delete_records_scope",u)}
          </td>
        </tr>
      `}).join("")}}function pa(e,t){const r=e.querySelector("#admin-role-audit-body"),n=e.querySelector("#admin-role-audit-empty");if(!(!r||!n)){if(!U.roleAuditLogs.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма записани промени по роли.";return}n.classList.add("d-none"),r.innerHTML=U.roleAuditLogs.map(s=>{const a=String((s==null?void 0:s.action)||"").trim(),i=a==="grant"?"Добавяне":a==="revoke"?"Премахване":"Обновяване",o=(s==null?void 0:s.role_label)||"-",l=(s==null?void 0:s.actor_label)||"-",d=(s==null?void 0:s.target_label)||"-",c=ey(s==null?void 0:s.occurred_at);return`
        <tr>
          <td>${fe(c)}</td>
          <td>${fe(i)}</td>
          <td>${fe(o)}</td>
          <td>${fe(l)}</td>
          <td>${fe(d)}</td>
        </tr>
      `}).join("")}}function Dr(e,t){const n=(e==="view_screen_scope"?Yf:e==="create_records_scope"?Xf:wl).map(s=>{const a=s.value===t?"selected":"";return`<option value="${s.value}" ${a}>${fe(s.label)}</option>`}).join("");return`<select class="form-select form-select-sm" data-permission-field="${e}">${n}</select>`}function Or(e){const t=String(e||"").trim();return wl.some(r=>r.value===t)?t:"none"}function Zf(e){const t=String(e||"").trim();if(!t)return"-";const r=U.roleCatalog.find(s=>(s==null?void 0:s.name)===t);return r&&String((r==null?void 0:r.display_name_bg)||"").trim()||un(t)}function ey(e){if(!e)return"-";const t=new Date(e);return Number.isNaN(t.getTime())?"-":t.toLocaleString("bg-BG")}const ty=["admin","head_of_transport","instructor","crew","user"],bo={admin:10,crew_manager:20,head_of_transport:30,crew_instructor:40,instructor:50,crew:60,crew_member:70,user:80};let nr=null;async function ry(e){e.innerHTML=Jf;const t=e.querySelector("#admin-permissions-role");t&&(t.value=U.permissionsRole),es(e),fy(e),ny(e),await Ha(e),await bn(e,U.permissionsRole)}function ny(e){const t=e.querySelector("#admin-assign-role-modal"),r=e.querySelector("#admin-assign-role-modal-close"),n=e.querySelector("#admin-assign-role-modal-cancel"),s=e.querySelector("#admin-profile-link-modal"),a=e.querySelector("#admin-profile-link-modal-close"),i=e.querySelector("#admin-profile-link-modal-cancel"),o=e.querySelector("#open-admin-role-modal"),l=e.querySelector("#admin-role-modal"),d=e.querySelector("#admin-role-modal-form"),c=e.querySelector("#admin-role-modal-close"),u=e.querySelector("#admin-role-modal-cancel"),p=e.querySelector("#admin-role-warning-modal"),m=e.querySelector("#admin-role-warning-close"),h=e.querySelector("#admin-role-warning-cancel"),f=e.querySelector("#admin-role-warning-confirm"),w=e.querySelector("#admin-role-form"),y=e.querySelector("#admin-profile-link-form"),v=e.querySelector("#admin-profile-link-clear"),b=e.querySelector("#admin-permissions-form"),_=e.querySelector("#admin-permissions-role"),k=e.querySelector("#admin-roles-body"),x=e.querySelector("#admin-role-catalog-body"),L=e.querySelector("#admin-profiles-body");r==null||r.addEventListener("click",()=>{Pe(t)}),n==null||n.addEventListener("click",()=>{Pe(t)}),a==null||a.addEventListener("click",()=>{Pe(s)}),i==null||i.addEventListener("click",()=>{Pe(s)}),o==null||o.addEventListener("click",()=>{go(e,{mode:"create"})}),d==null||d.addEventListener("submit",async q=>{q.preventDefault(),await oy(e)}),c==null||c.addEventListener("click",()=>{Pe(l),es(e)}),u==null||u.addEventListener("click",()=>{Pe(l),es(e)}),m==null||m.addEventListener("click",()=>{Pe(p),nr=null}),h==null||h.addEventListener("click",()=>{Pe(p),nr=null}),f==null||f.addEventListener("click",async()=>{if(!nr){Pe(p);return}const q=nr;nr=null,Pe(p),await q()}),w==null||w.addEventListener("submit",async q=>{q.preventDefault(),await ly(e)}),y==null||y.addEventListener("submit",async q=>{q.preventDefault(),await cy(e)}),v==null||v.addEventListener("click",async()=>{var T;const q=((T=e.querySelector("#admin-profile-link-id"))==null?void 0:T.value)||"";if(!q){g("Избери профил за разкачане.","warning");return}mt(e,{message:"Сигурен ли си, че искаш да разкачиш профила от служителя?",confirmLabel:"Разкачи",onConfirm:()=>ha(e,q,null)})}),b==null||b.addEventListener("submit",async q=>{q.preventDefault(),await by(e)}),_==null||_.addEventListener("change",async q=>{const T=q.target.value||"admin";U.permissionsRole=T,await bn(e,T)}),k==null||k.addEventListener("click",async q=>{const T=q.target.closest('button[data-admin-action="add-role"]');if(T){const A=T.getAttribute("data-user-id")||"";if(!A)return;iy(e,A);return}const E=q.target.closest('button[data-admin-action="remove-role"]');if(!E)return;const $=E.getAttribute("data-role-id")||"";$&&mt(e,{message:"Сигурен ли си, че искаш да разкачиш тази роля от потребителя?",confirmLabel:"Разкачи",onConfirm:()=>dy(e,$)})}),x==null||x.addEventListener("click",async q=>{const T=q.target.closest('button[data-admin-action="edit-catalog-role"]');if(T){const A=T.getAttribute("data-role-name")||"",C=T.getAttribute("data-role-bg")||"";go(e,{mode:"edit",roleName:A,roleNameBg:C});return}const E=q.target.closest('button[data-admin-action="delete-catalog-role"]');if(!E)return;const $=E.getAttribute("data-role-name")||"";$&&await my(e,$)}),L==null||L.addEventListener("click",async q=>{const T=q.target.closest('button[data-admin-action="link-profile"]');if(T){const R=T.getAttribute("data-profile-id")||"";R&&ay(e,R);return}const E=q.target.closest('button[data-admin-action="unlink-profile"]');if(E){const R=E.getAttribute("data-profile-id")||"";if(!R)return;mt(e,{message:"Сигурен ли си, че искаш да разкачиш профила от служителя?",confirmLabel:"Разкачи",onConfirm:()=>ha(e,R,null)});return}const $=q.target.closest('button[data-admin-action="deactivate-profile"]');if($){const R=$.getAttribute("data-profile-id")||"";if(!R)return;if(R===U.currentUserId){g("Не можеш да деактивираш собствения си профил.","warning");return}mt(e,{message:"Сигурен ли си, че искаш да деактивираш този профил? Потребителят ще загуби достъп до системата.",confirmLabel:"Деактивирай",onConfirm:()=>vo(e,R,!1)});return}const A=q.target.closest('button[data-admin-action="restore-profile"]');if(A){const R=A.getAttribute("data-profile-id")||"";if(!R)return;mt(e,{message:"Сигурен ли си, че искаш да възстановиш този профил?",confirmLabel:"Възстанови",onConfirm:()=>vo(e,R,!0)});return}const C=q.target.closest('button[data-admin-action="hard-delete-user"]');if(!C)return;const I=C.getAttribute("data-profile-id")||"";if(I){if(I===U.currentUserId){g("Не можеш да изтриеш собствения си акаунт.","warning");return}mt(e,{message:"Сигурен ли си? Това е необратимо: ще бъдат изтрити Auth акаунтът, профилът и ролите.",confirmLabel:"Изтрий",onConfirm:()=>sy(e,I)})}})}async function sy(e,t){if(!t)return;const r=async()=>{var h,f;const{data:c,error:u}=await S.auth.refreshSession();if(!u&&((h=c==null?void 0:c.session)!=null&&h.access_token))return c.session.access_token;const{data:p,error:m}=await S.auth.getSession();return m||!((f=p==null?void 0:p.session)!=null&&f.access_token)?"":p.session.access_token};let n=await r();if(!n){g("Липсва активна сесия. Влез отново и опитай пак.","warning");return}const s="https://ujxczpaupfqaiqrcoykl.supabase.co",a="sb_publishable_EJ7wzzBh1hnKE0j_j7E1mQ_9TAJvRoO",i="admin-hard-delete-user-v2",o=async c=>fetch(`${s}/functions/v1/${i}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:a,Authorization:`Bearer ${c}`},body:JSON.stringify({userId:t,reason:"admin_panel"})});let l;try{l=await o(n)}catch{g("Неуспешна връзка към Edge функцията.","error");return}let d=null;try{d=await l.json()}catch{d=null}if(l.status===401&&(n=await r(),n))try{l=await o(n),d=null;try{d=await l.json()}catch{d=null}}catch{g("Неуспешна връзка към Edge функцията.","error");return}if(!l.ok){const c=String((d==null?void 0:d.error)||(d==null?void 0:d.message)||l.statusText||"Изтриването не беше успешно.");if(l.status===401){g("Нямаш валидна сесия за Edge функцията. Опитай logout/login.","warning");return}if(String(c).toLowerCase().includes("last admin")){g("Не може да се изтрие последният администратор.","warning");return}g(c,"error");return}if(!(d!=null&&d.ok)){g("Изтриването не беше успешно.","error");return}g("Потребителят е изтрит.","success"),await Ha(e)}function ay(e,t){const r=e.querySelector("#admin-profile-link-modal"),n=e.querySelector("#admin-profile-link-id"),s=e.querySelector("#admin-profile-link-employee-id"),a=U.profiles.find(i=>i.id===t);n&&(n.value=t),s&&(s.value=(a==null?void 0:a.employee_id)||""),us(r)}function iy(e,t){const r=e.querySelector("#admin-assign-role-modal"),n=e.querySelector("#admin-role-profile-id"),s=e.querySelector("#admin-role-value");n&&(n.value=t),s&&(s.value=""),us(r)}async function Ha(e){var p;const{data:t}=await S.auth.getUser();U.currentUserId=((p=t==null?void 0:t.user)==null?void 0:p.id)||"";const[{data:r,error:n},{data:s,error:a},{data:i,error:o},{data:l,error:d},{data:c,error:u}]=await Promise.all([S.from("user_profiles").select("id, username, is_active, employee_id, employees(id, first_name, last_name, is_active)").order("username",{ascending:!0}),S.from("employees").select("id, first_name, last_name, is_active").order("last_name",{ascending:!0}).order("first_name",{ascending:!0}),S.from("user_roles").select("id, user_id, role, granted_by_user_id").order("role",{ascending:!0}).order("created_at",{ascending:!1}),S.from("roles").select("name, display_name_bg").order("name",{ascending:!0}),S.from("user_role_audit_logs").select("id, action, role, actor_user_id, target_user_id, occurred_at").order("occurred_at",{ascending:!1}).limit(100)]);if(n||a||o||d||u){g((n==null?void 0:n.message)||(a==null?void 0:a.message)||(o==null?void 0:o.message)||(d==null?void 0:d.message)||(u==null?void 0:u.message)||"Грешка при зареждане на админ панела.","error"),U.profiles=[],U.employees=[],U.roleCatalog=[],U.availableRoles=[],U.roles=[],U.roleAuditLogs=[],U.currentUserProtectedAdminIds=[],oa(e),da(e,"Няма налични роли."),la(e,"Няма данни за роли."),pa(e,"Няма записани промени по роли."),ca(e,"Няма данни за профили.");return}U.profiles=r||[],U.employees=s||[],U.roleCatalog=l||[],U.roles=py(i||[],U.profiles),U.roleAuditLogs=kl(c||[],U.profiles),U.currentUserProtectedAdminIds=xl(U.roles),U.availableRoles=ql(l||[],i||[]),Ll(e),oa(e),da(e),la(e),pa(e),ca(e)}async function oy(e){var f,w;const t=e.querySelector("#admin-role-modal-original-name"),r=e.querySelector("#admin-role-modal-name"),n=e.querySelector("#admin-role-modal-name-bg"),s=e.querySelector("#admin-role-modal-save"),a=((f=t==null?void 0:t.value)==null?void 0:f.trim())||"",i=(r==null?void 0:r.value)||"",o=(n==null?void 0:n.value)||"",l=i.trim().toLowerCase(),d=o.trim();if(!l){g("Въведи име на роля.","warning");return}if(!d){g("Въведи име на ролята на български.","warning");return}if(!/^[a-z0-9_]+$/.test(l)){g("Ролята може да съдържа само малки латински букви, цифри и _.","warning");return}const c=(s==null?void 0:s.innerHTML)||"";s&&(s.disabled=!0,s.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Създаване...');const{data:u}=await S.auth.getUser();let p=null;if(a){const{error:y}=await S.from("roles").update({name:l,display_name_bg:d||l}).eq("name",a);p=y}else{const{error:y}=await S.from("roles").insert({name:l,display_name_bg:d||l,created_from:((w=u==null?void 0:u.user)==null?void 0:w.email)||"admin_panel"});p=y}if(p){s&&(s.disabled=!1,s.innerHTML=c),g(p.message,"error");return}const m=[...new Map(U.permissions.map(y=>[y.resource,y]).filter(([y])=>!!y)).values()];if(m.length){const y=m.map(b=>({role:l,resource:b.resource,display_name_bg:b.display_name_bg||Sa(b.resource),view_screen_scope:"none",view_records_scope:"none",create_records_scope:"none",edit_records_scope:"none",delete_records_scope:"none"})),{error:v}=await S.from("role_permissions").upsert(y,{onConflict:"role,resource"});if(v){s&&(s.disabled=!1,s.innerHTML=c),g(v.message,"error");return}}r&&(r.value=""),n&&(n.value=""),t&&(t.value=""),s&&(s.disabled=!1,s.innerHTML=c),g(a?"Ролята е обновена.":"Ролята е създадена.","success"),await Tl(e);const h=e.querySelector("#admin-permissions-role");h&&(h.value=l),U.permissionsRole=l,await bn(e,l),Pe(e.querySelector("#admin-role-modal")),es(e)}async function ly(e){var d,c,u,p;const t=((d=e.querySelector("#admin-role-profile-id"))==null?void 0:d.value)||"",r=((c=e.querySelector("#admin-role-value"))==null?void 0:c.value)||"",n=e.querySelector("#admin-role-add");if(!t||!r){g("Избери профил и роля.","warning");return}const s=(n==null?void 0:n.innerHTML)||"";n&&(n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Добавяне...');const{data:a}=await S.auth.getUser(),{error:i}=await S.from("user_roles").insert({user_id:t,role:r,granted_by_user_id:((u=a==null?void 0:a.user)==null?void 0:u.id)||null,created_from:((p=a==null?void 0:a.user)==null?void 0:p.email)||"admin_panel"});if(n&&(n.disabled=!1,n.innerHTML=s),i){g(i.message,"error");return}g("Ролята е добавена.","success"),Pe(e.querySelector("#admin-assign-role-modal"));const o=e.querySelector("#admin-role-profile-id"),l=e.querySelector("#admin-role-value");o&&(o.value=""),l&&(l.value=""),await Promise.all([Ua(e),Sl(e)])}async function dy(e,t){const{error:r}=await S.from("user_roles").delete().eq("id",t);if(r){if(String(r.message||"").toLowerCase().includes("last admin")){g("Не може да се премахне последната админ роля.","warning");return}if(String(r.message||"").toLowerCase().includes("grantor")){g("Не можеш да отнемеш админ права нагоре по grantor веригата.","warning");return}g(r.message,"error");return}g("Ролята е премахната.","success"),await Promise.all([Ua(e),Sl(e)])}async function cy(e){var n,s;const t=((n=e.querySelector("#admin-profile-link-id"))==null?void 0:n.value)||"",r=((s=e.querySelector("#admin-profile-link-employee-id"))==null?void 0:s.value)||"";if(!t||!r){g("Избери профил и служител.","warning");return}await ha(e,t,r)}async function ha(e,t,r){const n=e.querySelector("#admin-profile-link-save"),s=(n==null?void 0:n.innerHTML)||"";if(n&&(n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...'),r){const{error:l}=await S.from("user_profiles").update({employee_id:null,updated_at:new Date().toISOString()}).eq("employee_id",r).neq("id",t);if(l){n&&(n.disabled=!1,n.innerHTML=s),g(l.message,"error");return}}const{error:a}=await S.from("user_profiles").update({employee_id:r,updated_at:new Date().toISOString()}).eq("id",t);if(n&&(n.disabled=!1,n.innerHTML=s),a){g(a.message,"error");return}g(r?"Профилът е свързан със служителя.":"Профилът е разкачен от служител.","success"),Pe(e.querySelector("#admin-profile-link-modal"));const i=e.querySelector("#admin-profile-link-id"),o=e.querySelector("#admin-profile-link-employee-id");i&&(i.value=""),o&&(o.value=""),await yy(e)}async function vo(e,t,r){if(!t)return;const n=U.profiles.find(i=>String((i==null?void 0:i.id)||"")===String(t));if((n==null?void 0:n.is_active)!==!1===r){g(r?"Профилът вече е активен.":"Профилът вече е деактивиран.","warning");return}const{error:a}=await S.from("user_profiles").update({is_active:r,updated_at:new Date().toISOString()}).eq("id",t);if(a){if(String(a.message||"").toLowerCase().includes("last active admin")){g("Не може да деактивираш последния активен администратор.","warning");return}g(a.message,"error");return}g(r?"Профилът е възстановен.":"Профилът е деактивиран.","success"),await Ha(e)}async function Ua(e){const{data:t,error:r}=await S.from("user_roles").select("id, user_id, role, granted_by_user_id").order("created_at",{ascending:!1});if(r){g(r.message,"error");return}U.roles=uy(t||[],U.profiles),U.currentUserProtectedAdminIds=xl(U.roles),la(e)}async function Sl(e){const{data:t,error:r}=await S.from("user_role_audit_logs").select("id, action, role, actor_user_id, target_user_id, occurred_at").order("occurred_at",{ascending:!1}).limit(100);if(r){g(r.message,"error");return}U.roleAuditLogs=kl(t||[],U.profiles),pa(e)}function kl(e,t){const r=new Map((t||[]).map(n=>[n.id,n]));return(e||[]).map(n=>{const s=r.get(n.actor_user_id),a=r.get(n.target_user_id),i=String((n==null?void 0:n.role)||"").trim();return{...n,role_label:i?un(i):"-",actor_label:(s==null?void 0:s.username)||(n==null?void 0:n.actor_user_id)||"-",target_label:(a==null?void 0:a.username)||(n==null?void 0:n.target_user_id)||"-"}})}function xl(e){const t=String(U.currentUserId||"").trim();if(!t)return[];const r=(e||[]).filter(d=>String((d==null?void 0:d.role)||"").trim().toLowerCase()==="admin"),n=new Map(r.map(d=>[String((d==null?void 0:d.user_id)||"").trim(),String((d==null?void 0:d.granted_by_user_id)||"").trim()])),s=(e||[]).find(d=>String((d==null?void 0:d.user_id)||"").trim()===t&&String((d==null?void 0:d.role)||"").trim().toLowerCase()==="admin"),a=String((s==null?void 0:s.granted_by_user_id)||"").trim();if(!a)return[];const i=[],o=new Set([t]);let l=a;for(;l&&!o.has(l);){i.push(l),o.add(l);const d=String(n.get(l)||"").trim();if(!d||d===l)break;l=d}return i}function uy(e,t){const r=new Map((t||[]).map(n=>[n.id,n]));return(e||[]).map(n=>{var s,a;return{...n,username:((s=r.get(n.user_id))==null?void 0:s.username)||"",granted_by_username:((a=r.get(n.granted_by_user_id))==null?void 0:a.username)||""}})}function py(e,t){const r=new Map((t||[]).map(a=>[a.id,a])),n=new Map;(e||[]).forEach(a=>{n.has(a.user_id)||n.set(a.user_id,[]),n.get(a.user_id).push(a)});const s=[];return(t||[]).forEach(a=>{const i=n.get(a.id)||[];i.length>0?i.forEach(o=>{var l;s.push({...o,username:a.username,user_id:a.id,granted_by_username:((l=r.get(o.granted_by_user_id))==null?void 0:l.username)||""})}):s.push({id:null,user_id:a.id,role:null,username:a.username,granted_by_user_id:null,granted_by_username:""})}),s}function ql(e,t){const r=(e||[]).map(a=>String((a==null?void 0:a.name)||"").trim()).filter(Boolean),n=(t||[]).map(a=>String((a==null?void 0:a.role)||"").trim()).filter(Boolean);return[...new Set([...ty,...r,...n])].sort((a,i)=>{const o=String(a||"").trim().toLowerCase(),l=String(i||"").trim().toLowerCase(),d=bo[o]??999,c=bo[l]??999;return d!==c?d-c:o.localeCompare(l,"en")})}function Ll(e){const t=e.querySelector("#admin-role-value"),r=e.querySelector("#admin-permissions-role"),n=(t==null?void 0:t.value)||"",s=(r==null?void 0:r.value)||U.permissionsRole||"",a=U.availableRoles.map(i=>{const o=El(i);return`<option value="${i}">${o}</option>`}).join("");if(t&&(t.innerHTML=`<option value="">Избери роля</option>${a}`,t.value=U.availableRoles.includes(n)?n:""),r){r.innerHTML=a;const i=U.availableRoles.includes("admin")?"admin":U.availableRoles[0]||"",o=U.availableRoles.includes(s)?s:i;r.value=o,U.permissionsRole=o}}async function Tl(e){const{data:t,error:r}=await S.from("roles").select("name, display_name_bg").order("name",{ascending:!0});if(r){g(r.message,"error");return}U.roleCatalog=t||[],U.availableRoles=ql(t||[],U.roles),Ll(e),da(e)}function El(e){const t=U.roleCatalog.find(n=>(n==null?void 0:n.name)===e),r=String((t==null?void 0:t.display_name_bg)||"").trim();return r||un(e)}async function hy(e,t){if(!t)return;if(t==="admin"){g("Ролята admin не може да бъде изтрита.","warning");return}const{error:r}=await S.from("role_permissions").delete().eq("role",t);if(r){g(r.message,"error");return}const{error:n}=await S.from("roles").delete().eq("name",t);if(n){g(n.message,"error");return}if(g("Ролята е изтрита.","success"),await Tl(e),await Ua(e),U.permissionsRole===t){const s=U.availableRoles.includes("admin")?"admin":U.availableRoles[0]||"";U.permissionsRole=s,s?await bn(e,s):(U.permissions=[],ua(e,"Няма данни за права."))}}function go(e,{mode:t,roleName:r="",roleNameBg:n=""}){const s=e.querySelector("#admin-role-modal"),a=e.querySelector("#admin-role-modal-title"),i=e.querySelector("#admin-role-modal-original-name"),o=e.querySelector("#admin-role-modal-name"),l=e.querySelector("#admin-role-modal-name-bg"),d=e.querySelector("#admin-role-modal-save");i&&(i.value=t==="edit"?r:""),o&&(o.value=t==="edit"?r:""),l&&(l.value=t==="edit"?n||r:""),a&&(a.textContent=t==="edit"?"Редакция на роля":"Нова роля"),d&&(d.textContent=t==="edit"?"Запази":"Създай"),us(s)}function es(e){const t=e.querySelector("#admin-role-modal-original-name"),r=e.querySelector("#admin-role-modal-name"),n=e.querySelector("#admin-role-modal-name-bg"),s=e.querySelector("#admin-role-modal-title"),a=e.querySelector("#admin-role-modal-save");t&&(t.value=""),r&&(r.value=""),n&&(n.value=""),s&&(s.textContent="Нова роля"),a&&(a.textContent="Създай")}function mt(e,{message:t,confirmLabel:r,onConfirm:n}){const s=e.querySelector("#admin-role-warning-modal"),a=e.querySelector("#admin-role-warning-message"),i=e.querySelector("#admin-role-warning-confirm");nr=typeof n=="function"?n:null,a&&(a.textContent=t||"Сигурен ли си?"),i&&(i.textContent=r||"Потвърди"),us(s)}async function my(e,t){const{count:r,error:n}=await S.from("user_roles").select("id",{count:"exact",head:!0}).eq("role",t);if(n){g(n.message,"error");return}const s=El(t),a=Number(r||0);if(a>0){mt(e,{message:`Ролята "${s}" не може да бъде изтрита, защото е разкачена към ${a} потребител(и). Първо премахни свързаните роли от потребителите.`,confirmLabel:"Затвори",onConfirm:null});return}mt(e,{message:`Сигурен ли си, че искаш да премахнеш ролята "${s}"? Ще бъдат изтрити и всички права за тази роля.`,confirmLabel:"Премахни",onConfirm:()=>hy(e,t)})}function us(e){e&&e.classList.remove("d-none")}function Pe(e){e&&e.classList.add("d-none")}function fy(e){var a,i;const t=[...e.querySelectorAll("[data-admin-tab]")],r=[...e.querySelectorAll("[data-admin-tab-pane]")];if(!t.length||!r.length)return;const n=o=>{t.forEach(l=>{const d=l.getAttribute("data-admin-tab")===o;l.classList.toggle("active",d),l.setAttribute("aria-selected",d?"true":"false")}),r.forEach(l=>{const d=l.getAttribute("data-admin-tab-pane")===o;l.classList.toggle("active",d),l.classList.toggle("d-none",!d)})};t.forEach(o=>{o.addEventListener("click",()=>{const l=o.getAttribute("data-admin-tab")||"";l&&n(l)})});const s=((a=t.find(o=>o.classList.contains("active")))==null?void 0:a.getAttribute("data-admin-tab"))||((i=t[0])==null?void 0:i.getAttribute("data-admin-tab"))||"";s&&n(s)}async function yy(e){const{data:t,error:r}=await S.from("user_profiles").select("id, username, is_active, employee_id, employees(id, first_name, last_name, is_active)").order("username",{ascending:!0});if(r){g(r.message,"error");return}U.profiles=t||[],oa(e),ca(e)}async function bn(e,t){const r=t||"admin",{data:n,error:s}=await S.from("role_permissions").select("role, resource, display_name_bg, view_screen_scope, view_records_scope, create_records_scope, edit_records_scope, delete_records_scope").eq("role",r).order("resource",{ascending:!0});if(s){g(s.message,"error"),U.permissions=[],ua(e,"Няма данни за права.");return}U.permissions=n||[],ua(e)}async function by(e){const t=e.querySelector("#admin-permissions-save"),r=e.querySelector("#admin-permissions-role"),n=(r==null?void 0:r.value)||"admin",s=[...e.querySelectorAll("#admin-permissions-body tr[data-resource]")];if(!s.length){g("Няма редове за запис.","warning");return}const a=s.map(l=>{const d=l.getAttribute("data-resource")||"",c=U.permissions.find(p=>p.resource===d),u=p=>{var h;const m=((h=l.querySelector(`[data-permission-field="${p}"]`))==null?void 0:h.value)||"none";return p==="view_screen_scope"||p==="create_records_scope"?["none","all"].includes(m)?m:"none":["none","all","own","role_attached_employees"].includes(m)?m:"none"};return{role:n,resource:d,display_name_bg:(c==null?void 0:c.display_name_bg)||Sa(d),view_screen_scope:u("view_screen_scope"),view_records_scope:u("view_records_scope"),create_records_scope:u("create_records_scope"),edit_records_scope:u("edit_records_scope"),delete_records_scope:u("delete_records_scope"),updated_at:new Date().toISOString()}}),i=(t==null?void 0:t.innerHTML)||"";t&&(t.disabled=!0,t.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...');const{error:o}=await S.from("role_permissions").upsert(a,{onConflict:"role,resource"});if(t&&(t.disabled=!1,t.innerHTML=i),o){g(o.message,"error");return}g("Правата са записани.","success"),await bn(e,n)}const vy=`<section class="card border-0 shadow-sm">\r
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
`;function Et(e){e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const _o=new Map;function gy(e,t){const r=_o.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){Fe(a);return}}};_o.set(e,n),document.addEventListener("keydown",n)}function Fe(e){var t,r,n,s,a;e.classList.add("d-none"),(t=document.querySelector("#document-category-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#document-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#document-category-delete-modal"))!=null&&n.classList.contains("d-none"))&&((s=document.querySelector("#document-delete-modal"))!=null&&s.classList.contains("d-none"))&&((a=document.querySelector("#document-preview-modal"))!=null&&a.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Ne(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const Ae={categories:[],documents:[],searchQuery:"",categoryFilter:""};async function _y(e){const{data:t,error:r}=await S.from("document_categories").select("id, name").order("name",{ascending:!0});if(r){g(r.message,"error"),Ae.categories=[],wo(e,"Грешка при зареждане на категориите.");return}Ae.categories=t||[],wo(e),Fa(e)}async function wy(e){const{data:t,error:r}=await S.from("documents").select("id, title, document_url, storage_path, notes, category_id, document_categories(name)").order("title",{ascending:!0});if(r){g(r.message,"error"),Ae.documents=[],ts(e,"Грешка при зареждане на документите.");return}Ae.documents=t||[],ts(e)}function Fa(e){const t=e.querySelector("#documents-category-filter"),r=e.querySelector("#document-category"),n=(Ae.categories||[]).map(s=>`<option value="${s.id}">${Ne(s.name||"-")}</option>`).join("");t&&(t.innerHTML='<option value="">Всички</option>'+n,t.value=Ae.categoryFilter||""),r&&(r.innerHTML='<option value="">Избери категория</option>'+n)}function wo(e,t){const r=e.querySelector("#document-categories-table-body"),n=e.querySelector("#document-categories-empty"),s=Ae.categories||[];if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени категории.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>`
      <tr>
        <td>${Ne(a.name||"-")}</td>
        <td class="text-end">
          <div class="d-inline-flex gap-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              data-category-action="edit"
              data-id="${a.id}"
              data-name="${Ne(a.name||"")}"
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
    `).join("")}function ts(e,t){const r=e.querySelector("#documents-table-body"),n=e.querySelector("#documents-empty"),s=(Ae.documents||[]).filter(a=>{const i=!Ae.searchQuery||String((a==null?void 0:a.title)||"").toLowerCase().includes(Ae.searchQuery),o=!Ae.categoryFilter||String((a==null?void 0:a.category_id)||"")===String(Ae.categoryFilter||"");return i&&o});if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма въведени документи.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>{var i;return`
      <tr>
        <td>${Ne(a.title||"-")}</td>
        <td>${Ne(((i=a.document_categories)==null?void 0:i.name)||"-")}</td>
        <td>
          <div class="d-inline-flex gap-2 align-items-center">
            <button
              type="button"
              class="btn btn-link btn-sm p-0 lh-1 text-decoration-none"
              data-document-action="preview"
              data-title="${Ne(a.title||"")}"
              data-url="${Ne(a.document_url||"")}"
              title="Преглед"
              aria-label="Преглед"
            >
              👁
            </button>
            <a href="${Ne(a.document_url||"#")}" target="_blank" rel="noopener noreferrer">Отвори</a>
          </div>
        </td>
        <td class="text-end">
          <div class="d-inline-flex gap-2">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              data-document-action="edit"
              data-id="${a.id}"
              data-title="${Ne(a.title||"")}"
              data-category-id="${a.category_id||""}"
              data-url="${Ne(a.document_url||"")}"
              data-storage-path="${Ne(a.storage_path||"")}"
              data-notes="${Ne(a.notes||"")}"
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
    `}).join("")}const pn="documents-files";async function Sy(e){e.innerHTML=vy,ky(e),await vn(e)}async function vn(e){await _y(e),await wy(e)}function ky(e){var h,f,w,y,v,b,_,k,x;const t=e.querySelector("#open-create-document-category"),r=e.querySelector("#open-create-document"),n=e.querySelector("#document-category-modal"),s=e.querySelector("#document-modal"),a=e.querySelector("#document-category-delete-modal"),i=e.querySelector("#document-delete-modal"),o=e.querySelector("#document-preview-modal"),l=e.querySelector("#document-category-form"),d=e.querySelector("#document-form"),c=e.querySelector("#document-categories-table-body"),u=e.querySelector("#documents-table-body"),p=e.querySelector("#documents-search"),m=e.querySelector("#documents-category-filter");t==null||t.addEventListener("click",()=>{$l(e),Et(n)}),r==null||r.addEventListener("click",()=>{if(!(Ae.categories||[]).length){g("Добави първо категория.","warning");return}Al(e),Fa(e),Et(s)}),l==null||l.addEventListener("submit",async L=>{L.preventDefault(),await xy(e)}),d==null||d.addEventListener("submit",async L=>{L.preventDefault(),await qy(e)}),(h=e.querySelector("#document-category-modal-close"))==null||h.addEventListener("click",()=>Fe(n)),(f=e.querySelector("#document-category-cancel-btn"))==null||f.addEventListener("click",()=>Fe(n)),(w=e.querySelector("#document-modal-close"))==null||w.addEventListener("click",()=>Fe(s)),(y=e.querySelector("#document-cancel-btn"))==null||y.addEventListener("click",()=>Fe(s)),(v=e.querySelector("#document-category-delete-cancel"))==null||v.addEventListener("click",()=>Fe(a)),(b=e.querySelector("#document-delete-cancel"))==null||b.addEventListener("click",()=>Fe(i)),(_=e.querySelector("#document-preview-close"))==null||_.addEventListener("click",()=>Ry(e)),(k=e.querySelector("#document-category-delete-confirm"))==null||k.addEventListener("click",async()=>{const L=e.querySelector("#document-category-delete-id").value;await Ly(e,L)}),(x=e.querySelector("#document-delete-confirm"))==null||x.addEventListener("click",async()=>{const L=e.querySelector("#document-delete-id").value;await Ty(e,L)}),c==null||c.addEventListener("click",L=>{const q=L.target.closest("button[data-category-action]");if(!q)return;const T=q.getAttribute("data-category-action");if(T==="edit"){Ey(e,{id:q.getAttribute("data-id"),name:q.getAttribute("data-name")}),Et(n);return}T==="delete"&&(e.querySelector("#document-category-delete-id").value=q.getAttribute("data-id")||"",Et(a))}),u==null||u.addEventListener("click",L=>{const q=L.target.closest("button[data-document-action]");if(!q)return;const T=q.getAttribute("data-document-action");if(T==="edit"){$y(e,{id:q.getAttribute("data-id"),title:q.getAttribute("data-title"),categoryId:q.getAttribute("data-category-id"),url:q.getAttribute("data-url"),storagePath:q.getAttribute("data-storage-path"),notes:q.getAttribute("data-notes")}),Et(s);return}if(T==="delete"){e.querySelector("#document-delete-id").value=q.getAttribute("data-id")||"",Et(i);return}if(T==="preview"){const E=String(q.getAttribute("data-url")||"").trim(),$=String(q.getAttribute("data-title")||"").trim();Cy(e,E,$)}}),p==null||p.addEventListener("input",L=>{Ae.searchQuery=L.target.value.trim().toLowerCase(),ts(e)}),m==null||m.addEventListener("change",L=>{Ae.categoryFilter=L.target.value||"",ts(e)}),gy("documents-page",[o,i,a,s,n])}async function xy(e){var o,l;const t=e.querySelector("#document-category-id").value,r=e.querySelector("#document-category-name"),n=e.querySelector("#document-category-save-btn"),s=r.value.trim();if(!s){g("Попълни име на категория.","warning");return}const a=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';let i=null;if(t)({error:i}=await S.from("document_categories").update({name:s,updated_at:new Date().toISOString()}).eq("id",t));else{const{data:d}=await S.auth.getUser(),c=((o=d==null?void 0:d.user)==null?void 0:o.id)??((l=d==null?void 0:d.user)==null?void 0:l.email)??"web_app";({error:i}=await S.from("document_categories").insert({name:s,created_from:c}))}if(n.disabled=!1,n.innerHTML=a,i){if(i.code==="23505"){g("Категория с това име вече съществува.","warning");return}g(i.message,"error");return}Fe(e.querySelector("#document-category-modal")),$l(e),await vn(e),g(t?"Категорията е обновена.":"Категорията е създадена.","success")}async function qy(e){var h,f,w,y,v,b;const t=e.querySelector("#document-id").value,r=e.querySelector("#document-title").value.trim(),n=e.querySelector("#document-category").value||null,s=((h=e.querySelector("#document-current-file-link"))==null?void 0:h.getAttribute("href"))||"",a=((w=(f=e.querySelector("#document-current-file-link"))==null?void 0:f.dataset)==null?void 0:w.storagePath)||"",i=e.querySelector("#document-file"),o=((y=i==null?void 0:i.files)==null?void 0:y[0])||null,l=e.querySelector("#document-notes").value.trim()||null,d=e.querySelector("#document-save-btn");if(!r||!n){g("Попълни всички задължителни полета.","warning");return}if(!t&&!o){g("Качи файл за документа.","warning");return}const c=d.innerHTML;d.disabled=!0,d.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';let u=null,p=s,m=a;if(o){const _=await Ay(o);if(_.error){d.disabled=!1,d.innerHTML=c,g(_.error.message||"Файлът не може да се качи.","error");return}p=_.publicUrl,m=_.path}if(t)({error:u}=await S.from("documents").update({title:r,category_id:n,document_url:p,storage_path:m,notes:l,updated_at:new Date().toISOString()}).eq("id",t));else{const{data:_}=await S.auth.getUser(),k=((v=_==null?void 0:_.user)==null?void 0:v.id)??((b=_==null?void 0:_.user)==null?void 0:b.email)??"web_app";({error:u}=await S.from("documents").insert({title:r,category_id:n,document_url:p,storage_path:m,notes:l,created_from:k}))}if(d.disabled=!1,d.innerHTML=c,u){o&&m&&await S.storage.from(pn).remove([m]),g(u.message,"error");return}t&&o&&a&&a!==m&&await S.storage.from(pn).remove([a]),Fe(e.querySelector("#document-modal")),Al(e),await vn(e),g(t?"Документът е обновен.":"Документът е създаден.","success")}async function Ly(e,t){const r=e.querySelector("#document-category-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{count:s,error:a}=await S.from("documents").select("id",{count:"exact",head:!0}).eq("category_id",t);if(a){r.disabled=!1,r.innerHTML=n,g(a.message,"error");return}if((s||0)>0){r.disabled=!1,r.innerHTML=n,g("Категорията не може да се изтрие, защото съдържа документи.","warning");return}const{error:i}=await S.from("document_categories").delete().eq("id",t);if(r.disabled=!1,r.innerHTML=n,i){g(i.message,"error");return}Fe(e.querySelector("#document-category-delete-modal")),await vn(e),g("Категорията е изтрита.","success")}async function Ty(e,t){const r=e.querySelector("#document-delete-confirm"),n=r.innerHTML;r.disabled=!0,r.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';const{data:s}=await S.from("documents").select("storage_path").eq("id",t).maybeSingle(),{error:a}=await S.from("documents").delete().eq("id",t);if(r.disabled=!1,r.innerHTML=n,a){g(a.message,"error");return}s!=null&&s.storage_path&&await S.storage.from(pn).remove([s.storage_path]),Fe(e.querySelector("#document-delete-modal")),await vn(e),g("Документът е изтрит.","success")}function Ey(e,t){e.querySelector("#document-category-id").value=t.id||"",e.querySelector("#document-category-name").value=t.name||"",e.querySelector("#document-category-form-title").textContent="Редакция на категория",e.querySelector("#document-category-save-btn").textContent="Запази"}function $l(e){e.querySelector("#document-category-id").value="",e.querySelector("#document-category-name").value="",e.querySelector("#document-category-form-title").textContent="Нова категория",e.querySelector("#document-category-save-btn").textContent="Създай"}function $y(e,t){Fa(e);const r=e.querySelector("#document-file"),n=e.querySelector("#document-file-help"),s=e.querySelector("#document-current-file-wrap"),a=e.querySelector("#document-current-file-link");e.querySelector("#document-id").value=t.id||"",e.querySelector("#document-title").value=t.title||"",e.querySelector("#document-category").value=t.categoryId||"",e.querySelector("#document-notes").value=t.notes||"",r&&(r.value="",r.required=!1),n&&(n.textContent="По избор: качи нов файл, за да замениш текущия."),s&&a&&t.url&&(s.classList.remove("d-none"),a.setAttribute("href",t.url),a.dataset.storagePath=t.storagePath||""),e.querySelector("#document-form-title").textContent="Редакция на документ",e.querySelector("#document-save-btn").textContent="Запази"}function Al(e){const t=e.querySelector("#document-file"),r=e.querySelector("#document-file-help"),n=e.querySelector("#document-current-file-wrap"),s=e.querySelector("#document-current-file-link");e.querySelector("#document-id").value="",e.querySelector("#document-title").value="",e.querySelector("#document-category").value="",e.querySelector("#document-notes").value="",t&&(t.value="",t.required=!0),r&&(r.textContent="Качи файл за документа."),n&&n.classList.add("d-none"),s&&(s.setAttribute("href","#"),s.dataset.storagePath=""),e.querySelector("#document-form-title").textContent="Нов документ",e.querySelector("#document-save-btn").textContent="Създай"}async function Ay(e){var l,d;const{data:t}=await S.auth.getSession(),r=((d=(l=t==null?void 0:t.session)==null?void 0:l.user)==null?void 0:d.id)||"anonymous",n=Date.now(),s=String((e==null?void 0:e.name)||"document").replace(/[^a-zA-Z0-9._-]/g,"_"),a=`${r}/${n}_${s}`,{error:i}=await S.storage.from(pn).upload(a,e,{upsert:!1});if(i)return{error:i};const{data:o}=S.storage.from(pn).getPublicUrl(a);return{path:a,publicUrl:(o==null?void 0:o.publicUrl)||"",error:null}}function Cy(e,t,r){const n=e.querySelector("#document-preview-modal"),s=e.querySelector("#document-preview-frame"),a=e.querySelector("#document-preview-text-wrap"),i=e.querySelector("#document-preview-text"),o=e.querySelector("#document-preview-csv-wrap"),l=e.querySelector("#document-preview-csv-note"),d=e.querySelector("#document-preview-csv-head"),c=e.querySelector("#document-preview-csv-body"),u=e.querySelector("#document-preview-title"),p=e.querySelector("#document-preview-fallback"),m=e.querySelector("#document-preview-open");if(!n||!s||!a||!i||!o||!l||!d||!c||!u||!p||!m)return;const h=String(t||"").trim();if(!h){g("Липсва файл за преглед.","warning");return}const f=Py(h),w=ma(h),y=w==="csv",v=["txt","csv","json"].includes(w);u.textContent=r?`Преглед: ${r}`:"Преглед на документ",m.setAttribute("href",h),p.classList.add("d-none"),a.classList.add("d-none"),o.classList.add("d-none"),l.textContent="",d.innerHTML="",c.innerHTML="",i.textContent="",s.classList.remove("d-none"),s.src="about:blank",y?(o.classList.remove("d-none"),s.classList.add("d-none"),Iy(h,d,c,l,p)):v?(a.classList.remove("d-none"),s.classList.add("d-none"),i.textContent="Зареждане...",Oy(h,i,p)):(s.src=f,s.onload=()=>{if(f!==h){p.classList.add("d-none");return}const b=ma(h),_=["doc","docx","xls","xlsx","ppt","pptx"].includes(b);p.classList.toggle("d-none",!_)},s.onerror=()=>{p.classList.remove("d-none")}),Et(n)}function Ry(e){const t=e.querySelector("#document-preview-modal"),r=e.querySelector("#document-preview-frame"),n=e.querySelector("#document-preview-text-wrap"),s=e.querySelector("#document-preview-text"),a=e.querySelector("#document-preview-csv-wrap"),i=e.querySelector("#document-preview-csv-note"),o=e.querySelector("#document-preview-csv-head"),l=e.querySelector("#document-preview-csv-body"),d=e.querySelector("#document-preview-fallback"),c=e.querySelector("#document-preview-open");!t||!r||!n||!s||!a||!i||!o||!l||!d||!c||(r.src="about:blank",r.classList.remove("d-none"),n.classList.add("d-none"),a.classList.add("d-none"),s.textContent="",i.textContent="",o.innerHTML="",l.innerHTML="",c.setAttribute("href","#"),d.classList.add("d-none"),Fe(t))}async function Iy(e,t,r,n,s){try{const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`HTTP ${a.status}`);const i=await a.text(),o=Dy(i);if(!o.length){t.innerHTML="",r.innerHTML="",n.textContent="Файлът е празен.",s.classList.add("d-none");return}const l=200,d=o.slice(0,l),c=d[0]||[],u=d.slice(1);t.innerHTML=`
      <tr>${c.map(p=>`<th>${So(p)}</th>`).join("")}</tr>
    `,r.innerHTML=u.map(p=>`<tr>${p.map(m=>`<td>${So(m)}</td>`).join("")}</tr>`).join(""),o.length>l?n.textContent=`Показани са първите ${l} реда от общо ${o.length}.`:n.textContent=`Редове: ${o.length}.`,s.classList.add("d-none")}catch{t.innerHTML="",r.innerHTML="",n.textContent="",s.classList.remove("d-none")}}function Dy(e){const t=[];let r=[],n="",s=!1;for(let a=0;a<e.length;a+=1){const i=e[a],o=e[a+1];if(i==='"'){s&&o==='"'?(n+='"',a+=1):s=!s;continue}if(!s&&i===","){r.push(n),n="";continue}if(!s&&(i===`
`||i==="\r")){i==="\r"&&o===`
`&&(a+=1),r.push(n),t.push(r),r=[],n="";continue}n+=i}return(n.length||r.length)&&(r.push(n),t.push(r)),t}async function Oy(e,t,r){try{const n=await fetch(e,{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.text();t.textContent=s||"(Празен файл)",r.classList.add("d-none")}catch{t.textContent="Неуспешно зареждане на текстов преглед.",r.classList.remove("d-none")}}function Py(e){const t=ma(e);return["doc","docx","xls","xlsx","ppt","pptx"].includes(t)?`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(e)}`:e}function ma(e){const t=String(e||"").trim();if(!t)return"";try{const n=new URL(t).pathname.split("/").pop()||"",s=n.includes(".")?n.split(".").pop():"";return String(s||"").toLowerCase()}catch{return""}}function So(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}const My=`<section class="card border-0 shadow-sm">\r
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
`;function Ba(e){e==null||e.classList.remove("d-none"),document.body.classList.add("overflow-hidden")}const ko=new Map;function jy(e,t){const r=ko.get(e);r&&document.removeEventListener("keydown",r);const n=s=>{if(s.key==="Escape"){for(const a of t)if(a&&!a.classList.contains("d-none")){_t(a);return}}};ko.set(e,n),document.addEventListener("keydown",n)}function _t(e){var t,r,n;e==null||e.classList.add("d-none"),(t=document.querySelector("#user-profile-view-modal"))!=null&&t.classList.contains("d-none")&&((r=document.querySelector("#user-profile-edit-modal"))!=null&&r.classList.contains("d-none"))&&((n=document.querySelector("#user-profile-reset-confirm-modal"))!=null&&n.classList.contains("d-none"))&&document.body.classList.remove("overflow-hidden")}function Ur(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function fa(e){var s,a;const t=String(((s=e==null?void 0:e.employees)==null?void 0:s.first_name)||"").trim(),r=String(((a=e==null?void 0:e.employees)==null?void 0:a.last_name)||"").trim();return`${t} ${r}`.trim()||"-"}const oe={rows:[],employees:[],searchQuery:"",isAdmin:!1,currentUserId:"",resetConfirmResolver:null};function ya(e,t){const r=e.querySelector("#user-profiles-table-body"),n=e.querySelector("#user-profiles-empty"),s=(oe.rows||[]).filter(a=>{const i=[a==null?void 0:a.username,a==null?void 0:a.email,a==null?void 0:a.first_name,a==null?void 0:a.last_name,fa(a)].map(o=>String(o||"").toLowerCase()).join(" ");return!oe.searchQuery||i.includes(oe.searchQuery)});if(!s.length){r.innerHTML="",n.classList.remove("d-none"),n.textContent=t||"Няма намерени профили.";return}n.classList.add("d-none"),r.innerHTML=s.map(a=>{const i=`${String((a==null?void 0:a.first_name)||"").trim()} ${String((a==null?void 0:a.last_name)||"").trim()}`.trim()||"-",o=fa(a);return`
        <tr>
          <td>${Ur((a==null?void 0:a.username)||"-")}</td>
          <td>${Ur((a==null?void 0:a.email)||"-")}</td>
          <td>${Ur(i)}</td>
          <td>${Ur(o)}</td>
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
              ${oe.isAdmin?`
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
      `}).join("")}function Ny(e){const t=e.querySelector("#user-profile-edit-employee-id");if(!t)return;const r=(oe.employees||[]).map(n=>{const s=`${String((n==null?void 0:n.first_name)||"").trim()} ${String((n==null?void 0:n.last_name)||"").trim()}`.trim()||"-";return`<option value="${n.id}">${Ur(s)}</option>`}).join("");t.innerHTML='<option value="">Без свързан служител</option>'+r}async function Hy(e){e.innerHTML=My,Uy(e),Ky(e),await ba(e)}function Uy(e){e.querySelectorAll("button[data-toggle-password]").forEach(t=>{t.addEventListener("click",()=>{const r=t.getAttribute("data-toggle-password")||"",n=e.querySelector(`#${r}`);if(!n)return;const s=n.type==="password";n.type=s?"text":"password",t.textContent=s?"🙈":"👁";const a=r.includes("confirm"),i=a?"Покажи потвърждението на новата парола":"Покажи новата парола",o=a?"Скрий потвърждението на новата парола":"Скрий новата парола";t.setAttribute("aria-label",s?o:i)})})}function Fy(){return`${window.location.origin}/reset-password`}function Mn(e,t){const r=oe.resetConfirmResolver;r&&(oe.resetConfirmResolver=null,_t(e.querySelector("#user-profile-reset-confirm-modal")),r(!!t))}function By(e,t){const r=e.querySelector("#user-profile-reset-confirm-modal"),n=e.querySelector("#user-profile-reset-confirm-message");if(!r||!n)return Promise.resolve(!1);if(oe.resetConfirmResolver){const s=oe.resetConfirmResolver;oe.resetConfirmResolver=null,s(!1)}return n.textContent=`Да се изпрати ли линк за смяна на парола до ${t}?`,Ba(r),new Promise(s=>{oe.resetConfirmResolver=s})}function Ky(e){var i,o,l,d,c,u,p,m;const t=e.querySelector("#user-profiles-search"),r=e.querySelector("#user-profiles-table-body"),n=e.querySelector("#user-profile-view-modal"),s=e.querySelector("#user-profile-edit-modal"),a=e.querySelector("#user-profile-reset-confirm-modal");t==null||t.addEventListener("input",h=>{var f;oe.searchQuery=String(((f=h.target)==null?void 0:f.value)||"").trim().toLowerCase(),ya(e)}),r==null||r.addEventListener("click",h=>{const f=h.target.closest("button[data-user-profile-action]");if(!f)return;const w=f.getAttribute("data-user-profile-action"),y=f.getAttribute("data-id")||"";if(w==="view"){Wy(e,y);return}if(w==="edit"){Vy(e,y);return}w==="reset-password"&&zy(e,y,f)}),(i=e.querySelector("#user-profile-view-close"))==null||i.addEventListener("click",()=>_t(n)),(o=e.querySelector("#user-profile-view-close-secondary"))==null||o.addEventListener("click",()=>_t(n)),(l=e.querySelector("#user-profile-edit-close"))==null||l.addEventListener("click",()=>_t(s)),(d=e.querySelector("#user-profile-edit-cancel"))==null||d.addEventListener("click",()=>_t(s)),(c=e.querySelector("#user-profile-reset-confirm-close"))==null||c.addEventListener("click",()=>Mn(e,!1)),(u=e.querySelector("#user-profile-reset-confirm-cancel"))==null||u.addEventListener("click",()=>Mn(e,!1)),(p=e.querySelector("#user-profile-reset-confirm-accept"))==null||p.addEventListener("click",()=>Mn(e,!0)),a==null||a.addEventListener("click",h=>{h.target===a&&Mn(e,!1)}),(m=e.querySelector("#user-profile-edit-form"))==null||m.addEventListener("submit",async h=>{h.preventDefault(),await Gy(e)}),jy("user-profiles",[a,s,n])}async function zy(e,t,r){if(!oe.isAdmin){g("Нямаш права за това действие.","warning");return}const n=oe.rows.find(c=>c.id===t);if(!n){g("Профилът не е намерен.","warning");return}const s=String(n.email||"").trim();if(!s){g("Потребителят няма валиден имейл.","warning");return}const i=`${String(n.first_name||"").trim()} ${String(n.last_name||"").trim()}`.trim()||n.username||s;if(!await By(e,i))return;const l=(r==null?void 0:r.innerHTML)||"Reset парола";r&&(r.disabled=!0,r.innerHTML="Изпращане...");const{error:d}=await S.auth.resetPasswordForEmail(s,{redirectTo:Fy()});if(r&&(r.disabled=!1,r.innerHTML=l),d){g(d.message||"Линкът за смяна на парола не беше изпратен.","error");return}g("Изпратен е линк за смяна на парола към потребителя.","success")}async function ba(e){var d,c;const t=await fr(),r=((d=t==null?void 0:t.user)==null?void 0:d.id)||"";oe.currentUserId=r,oe.isAdmin=await bu();const n=e.querySelector("#user-profiles-search");n&&(n.classList.toggle("d-none",!oe.isAdmin),(c=n.previousElementSibling)==null||c.classList.toggle("d-none",!oe.isAdmin));const s=S.from("user_profiles").select("id, username, email, first_name, last_name, employee_id, employees(id, first_name, last_name)").order("username",{ascending:!0});!oe.isAdmin&&r&&s.eq("id",r);const[{data:a,error:i},{data:o,error:l}]=await Promise.all([s,oe.isAdmin?S.from("employees").select("id, first_name, last_name").order("last_name",{ascending:!0}).order("first_name",{ascending:!0}):Promise.resolve({data:[],error:null})]);if(i||l){g((i==null?void 0:i.message)||(l==null?void 0:l.message)||"Грешка при зареждане на профили.","error"),oe.rows=[],oe.employees=[],ya(e,"Няма данни за профили.");return}oe.rows=a||[],oe.employees=o||[],Ny(e),ya(e)}function Wy(e,t){const r=oe.rows.find(n=>n.id===t);if(!r){g("Профилът не е намерен.","warning");return}e.querySelector("#user-profile-view-username").textContent=r.username||"-",e.querySelector("#user-profile-view-email").textContent=r.email||"-",e.querySelector("#user-profile-view-first-name").textContent=r.first_name||"-",e.querySelector("#user-profile-view-last-name").textContent=r.last_name||"-",e.querySelector("#user-profile-view-employee").textContent=fa(r),Ba(e.querySelector("#user-profile-view-modal"))}function Vy(e,t){const r=oe.rows.find(l=>l.id===t);if(!r){g("Профилът не е намерен.","warning");return}const n=e.querySelector("#user-profile-edit-employee-wrap"),s=e.querySelector("#user-profile-password-wrap"),a=e.querySelector("#user-profile-edit-new-password"),i=e.querySelector("#user-profile-edit-confirm-password");n&&n.classList.toggle("d-none",!oe.isAdmin);const o=r.id===oe.currentUserId;s&&s.classList.toggle("d-none",!o),a&&(a.value=""),i&&(i.value=""),e.querySelector("#user-profile-edit-id").value=r.id,e.querySelector("#user-profile-edit-username").value=r.username||"",e.querySelector("#user-profile-edit-email").value=r.email||"",e.querySelector("#user-profile-edit-first-name").value=r.first_name||"",e.querySelector("#user-profile-edit-last-name").value=r.last_name||"",e.querySelector("#user-profile-edit-employee-id").value=r.employee_id||"",Ba(e.querySelector("#user-profile-edit-modal"))}async function Gy(e){var f,w,y,v,b,_,k,x;const t=(((f=e.querySelector("#user-profile-edit-id"))==null?void 0:f.value)||"").trim(),r=(((w=e.querySelector("#user-profile-edit-username"))==null?void 0:w.value)||"").trim(),n=(((y=e.querySelector("#user-profile-edit-email"))==null?void 0:y.value)||"").trim(),s=(((v=e.querySelector("#user-profile-edit-first-name"))==null?void 0:v.value)||"").trim(),a=(((b=e.querySelector("#user-profile-edit-last-name"))==null?void 0:b.value)||"").trim(),i=((_=e.querySelector("#user-profile-edit-new-password"))==null?void 0:_.value)||"",o=((k=e.querySelector("#user-profile-edit-confirm-password"))==null?void 0:k.value)||"",l=((x=e.querySelector("#user-profile-edit-employee-id"))==null?void 0:x.value)||null,d=e.querySelector("#user-profile-edit-save"),c=t===oe.currentUserId;if(!t||!r||!n||!s||!a){g("Попълни всички задължителни полета.","warning");return}if(!/^[A-Za-z0-9_]{3,30}$/.test(r)){g("Потребителското име трябва да е 3-30 символа и да съдържа само латински букви, цифри и _.","warning");return}if((i||o)&&!c){g("Можеш да сменяш паролата само на собствения си профил.","warning");return}if(c&&(i||o)){if(i.length<6){g("Новата парола трябва да е поне 6 символа.","warning");return}const L=/[\u0400-\u04FF]/;if(L.test(i)||L.test(o)){g("Паролата не трябва да съдържа кирилица.","warning");return}if(i!==o){g("Новата парола и потвърждението не съвпадат.","warning");return}}const p=(d==null?void 0:d.innerHTML)||"";d&&(d.disabled=!0,d.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...');const m={username:r,email:n,first_name:s,last_name:a,updated_at:new Date().toISOString()};oe.isAdmin&&(m.employee_id=l||null);const{error:h}=await S.from("user_profiles").update(m).eq("id",t);if(d&&(d.disabled=!1,d.innerHTML=p),h){if(h.code==="23505"){g("Потребителско име или имейл вече съществува.","warning");return}g(h.message,"error");return}if(c&&i){const{error:L}=await S.auth.updateUser({password:i});if(L){g(L.message||"Профилът е обновен, но паролата не беше сменена.","warning"),await ba(e),_t(e.querySelector("#user-profile-edit-modal"));return}}_t(e.querySelector("#user-profile-edit-modal")),await ba(e),g(c&&i?"Профилът и паролата са обновени.":"Профилът е обновен.","success")}const xo={"/":{render:tp,title:"TrainCrewHub"},"/login":{render:sp,title:"TrainCrewHub / Sign In"},"/register":{render:lp,title:"TrainCrewHub / Register"},"/forgot-password":{render:mp,title:"TrainCrewHub / Forgot Password"},"/reset-password":{render:gp,title:"TrainCrewHub / Reset Password"},"/pending-access":{render:Sp,title:"TrainCrewHub / Чака одобрение"},"/schedule-keys":{render:qp,title:"TrainCrewHub / Ключ-График",resource:"schedule_keys"},"/duties":{render:Hp,title:"TrainCrewHub / Повески",resource:"duties"},"/duty-types":{render:nf,title:"TrainCrewHub / Типове повески",resource:"duty_types"},"/trains":{render:jf,title:"TrainCrewHub / Влакове",resource:"trains"},"/employees":{render:ch,title:"TrainCrewHub / Служители",resource:"employees"},"/employee-absences":{render:gh,title:"TrainCrewHub / Отсъствия",resource:"employee_absences"},"/planned-duties":{render:Fh,title:"TrainCrewHub / Планирани повески",resource:"planned_duties"},"/actual-duties":{render:Xh,title:"TrainCrewHub / Реални повески",resource:"actual_duties"},"/plan-schedule":{render:Im,title:"TrainCrewHub / План График",screenResource:"page_plan_schedule",resource:"planned_duties"},"/schedule":{render:Xm,title:"TrainCrewHub / График",screenResource:"page_schedule",resource:"actual_duties"},"/schedule-key-duties":{render:bf,title:"TrainCrewHub / Повески към Ключ-График",resource:"duties"},"/documents":{render:Sy,title:"TrainCrewHub / Документи",resource:"documents"},"/user-profiles":{render:Hy,title:"TrainCrewHub / Потребителски профили"},"/admin":{render:ry,title:"TrainCrewHub / Админ Панел",requiresAdmin:!0}},Jy="page-content";function qo(e){return xo[e]??xo["/"]}async function Qy(e,t){var a,i,o,l;const r=new Set(["/login","/register","/forgot-password","/reset-password"]);let n=null;if(!r.has(e)){const d=await wi();if(!d.allowed)return d.reason==="inactive-profile"&&g("Профилът е деактивиран. Свържи се с администратор.","warning"),"/login";if(n=await fr(),!((a=n==null?void 0:n.user)!=null&&a.id))return"/login";if(!await zs(n.user.id))return e==="/pending-access"?e:(g("Акаунтът ти чака одобрение от администратор.","warning"),"/pending-access")}if(e==="/pending-access"){if(!((i=n==null?void 0:n.user)!=null&&i.id)){const c=await wi();if(!c.allowed)return c.reason==="inactive-profile"&&g("Профилът е деактивиран. Свържи се с администратор.","warning"),"/login";n=await fr()}return(o=n==null?void 0:n.user)!=null&&o.id?await zs(n.user.id)?"/":e:"/login"}if(!(t!=null&&t.requiresAdmin)){const d=(t==null?void 0:t.screenResource)||(t==null?void 0:t.resource)||"";return!d||await Ko(d)?e:(g("Нямаш права за достъп до този екран.","warning"),"/")}return n=n||await fr(),(l=n==null?void 0:n.user)!=null&&l.id?await wa(n.user.id)?e:(g("Нямаш права за достъп до админ панела.","warning"),"/"):"/login"}async function va(){const e=document.getElementById(Jy);wu();const t=window.location.pathname,r=qo(t),n=await Qy(t,r);n!==t&&window.history.replaceState({},"",n);const s=qo(n);document.title=s.title,await s.render(e),s.resource&&await _u(e,s.resource),window.dispatchEvent(new CustomEvent("route:changed",{detail:{pathname:n}}))}function Yy(e){const t=e.target.closest("a[data-link]");if(!t)return;e.preventDefault();const r=t.getAttribute("href");r!==window.location.pathname&&(window.history.pushState({},"",r),va())}function Xy(){zo(),window.addEventListener("popstate",va),document.addEventListener("click",Yy),va()}function Cl(){return document.getElementById("app")}function Zy(e){const t=Cl();t&&(t.innerHTML=`
		<div class="container py-5">
			<div class="alert alert-danger" role="alert">
				<h4 class="alert-heading">Грешка при зареждане</h4>
				<p class="mb-2">${e}</p>
				<hr />
				<p class="mb-0">Ако това е Netlify deploy: провери Environment variables за <code>VITE_SUPABASE_URL</code> и <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> и пусни нов deploy.</p>
			</div>
		</div>
	`)}async function eb(){const e=Cl();if(!e)throw new Error("App root element (#app) not found.");await qu(e),Xy()}function Lo(){eb().catch(e=>{const t=e instanceof Error?e.message:String(e);console.error("App bootstrap failed:",e),Zy(t)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Lo,{once:!0}):Lo();
