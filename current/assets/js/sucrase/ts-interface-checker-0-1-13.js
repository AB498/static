/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/ts-interface-checker@0.1.13/dist/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},e={},r="undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},n=[],i=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,u=!1;function a(){u=!0;for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",e=0;e<64;++e)n[e]=t[e],i[t.charCodeAt(e)]=e;i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63}function f(t,e,r){for(var i,o,u=[],a=e;a<r;a+=3)i=(t[a]<<16)+(t[a+1]<<8)+t[a+2],u.push(n[(o=i)>>18&63]+n[o>>12&63]+n[o>>6&63]+n[63&o]);return u.join("")}function s(t){var e;u||a();for(var r=t.length,i=r%3,o="",s=[],c=16383,h=0,p=r-i;h<p;h+=c)s.push(f(t,h,h+c>p?p:h+c));return 1===i?(e=t[r-1],o+=n[e>>2],o+=n[e<<4&63],o+="=="):2===i&&(e=(t[r-2]<<8)+t[r-1],o+=n[e>>10],o+=n[e>>4&63],o+=n[e<<2&63],o+="="),s.push(o),s.join("")}function c(t,e,r,n,i){var o,u,a=8*i-n-1,f=(1<<a)-1,s=f>>1,c=-7,h=r?i-1:0,p=r?-1:1,l=t[e+h];for(h+=p,o=l&(1<<-c)-1,l>>=-c,c+=a;c>0;o=256*o+t[e+h],h+=p,c-=8);for(u=o&(1<<-c)-1,o>>=-c,c+=n;c>0;u=256*u+t[e+h],h+=p,c-=8);if(0===o)o=1-s;else{if(o===f)return u?NaN:1/0*(l?-1:1);u+=Math.pow(2,n),o-=s}return(l?-1:1)*u*Math.pow(2,o-n)}function h(t,e,r,n,i,o){var u,a,f,s=8*o-i-1,c=(1<<s)-1,h=c>>1,p=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,l=n?0:o-1,y=n?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,u=c):(u=Math.floor(Math.log(e)/Math.LN2),e*(f=Math.pow(2,-u))<1&&(u--,f*=2),(e+=u+h>=1?p/f:p*Math.pow(2,1-h))*f>=2&&(u++,f/=2),u+h>=c?(a=0,u=c):u+h>=1?(a=(e*f-1)*Math.pow(2,i),u+=h):(a=e*Math.pow(2,h-1)*Math.pow(2,i),u=0));i>=8;t[r+l]=255&a,l+=y,a/=256,i-=8);for(u=u<<i|a,s+=i;s>0;t[r+l]=255&u,l+=y,u/=256,s-=8);t[r+l-y]|=128*g}var p={}.toString,l=Array.isArray||function(t){return"[object Array]"==p.call(t)};function y(){return v.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function g(t,e){if(y()<e)throw new RangeError("Invalid typed array length");return v.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e)).__proto__=v.prototype:(null===t&&(t=new v(e)),t.length=e),t}function v(t,e,r){if(!(v.TYPED_ARRAY_SUPPORT||this instanceof v))return new v(t,e,r);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return w(this,t)}return m(this,t,e,r)}function m(t,e,r,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?function(t,e,r,n){if(e.byteLength,r<0||e.byteLength<r)throw new RangeError("'offset' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");e=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n);v.TYPED_ARRAY_SUPPORT?(t=e).__proto__=v.prototype:t=b(t,e);return t}(t,e,r,n):"string"==typeof e?function(t,e,r){"string"==typeof r&&""!==r||(r="utf8");if(!v.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');var n=0|E(e,r);t=g(t,n);var i=t.write(e,r);i!==n&&(t=t.slice(0,i));return t}(t,e,r):function(t,e){if(_(e)){var r=0|T(e.length);return 0===(t=g(t,r)).length||e.copy(t,0,0,r),t}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||(n=e.length)!=n?g(t,0):b(t,e);if("Buffer"===e.type&&l(e.data))return b(t,e.data)}var n;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}function d(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function w(t,e){if(d(e),t=g(t,e<0?0:0|T(e)),!v.TYPED_ARRAY_SUPPORT)for(var r=0;r<e;++r)t[r]=0;return t}function b(t,e){var r=e.length<0?0:0|T(e.length);t=g(t,r);for(var n=0;n<r;n+=1)t[n]=255&e[n];return t}function T(t){if(t>=y())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+y().toString(16)+" bytes");return 0|t}function _(t){return!(null==t||!t._isBuffer)}function E(t,e){if(_(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var r=t.length;if(0===r)return 0;for(var n=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return Q(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return W(t).length;default:if(n)return Q(t).length;e=(""+e).toLowerCase(),n=!0}}function P(t,e,r){var n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return N(this,e,r);case"utf8":case"utf-8":return x(this,e,r);case"ascii":return M(this,e,r);case"latin1":case"binary":return Y(this,e,r);case"base64":return I(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return D(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function A(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function R(t,e,r,n,i){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof e&&(e=v.from(e,n)),_(e))return 0===e.length?-1:O(t,e,r,n,i);if("number"==typeof e)return e&=255,v.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):O(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function O(t,e,r,n,i){var o,u=1,a=t.length,f=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;u=2,a/=2,f/=2,r/=2}function s(t,e){return 1===u?t[e]:t.readUInt16BE(e*u)}if(i){var c=-1;for(o=r;o<a;o++)if(s(t,o)===s(e,-1===c?0:o-c)){if(-1===c&&(c=o),o-c+1===f)return c*u}else-1!==c&&(o-=o-c),c=-1}else for(r+f>a&&(r=a-f),o=r;o>=0;o--){for(var h=!0,p=0;p<f;p++)if(s(t,o+p)!==s(e,p)){h=!1;break}if(h)return o}return-1}function C(t,e,r,n){r=Number(r)||0;var i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;var o=e.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var u=0;u<n;++u){var a=parseInt(e.substr(2*u,2),16);if(isNaN(a))return u;t[r+u]=a}return u}function U(t,e,r,n){return X(Q(e,t.length-r),t,r,n)}function k(t,e,r,n){return X(function(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function S(t,e,r,n){return k(t,e,r,n)}function j(t,e,r,n){return X(W(e),t,r,n)}function B(t,e,r,n){return X(function(t,e){for(var r,n,i,o=[],u=0;u<t.length&&!((e-=2)<0);++u)n=(r=t.charCodeAt(u))>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function I(t,e,r){return 0===e&&r===t.length?s(t):s(t.slice(e,r))}function x(t,e,r){r=Math.min(t.length,r);for(var n=[],i=e;i<r;){var o,u,a,f,s=t[i],c=null,h=s>239?4:s>223?3:s>191?2:1;if(i+h<=r)switch(h){case 1:s<128&&(c=s);break;case 2:128==(192&(o=t[i+1]))&&(f=(31&s)<<6|63&o)>127&&(c=f);break;case 3:o=t[i+1],u=t[i+2],128==(192&o)&&128==(192&u)&&(f=(15&s)<<12|(63&o)<<6|63&u)>2047&&(f<55296||f>57343)&&(c=f);break;case 4:o=t[i+1],u=t[i+2],a=t[i+3],128==(192&o)&&128==(192&u)&&128==(192&a)&&(f=(15&s)<<18|(63&o)<<12|(63&u)<<6|63&a)>65535&&f<1114112&&(c=f)}null===c?(c=65533,h=1):c>65535&&(c-=65536,n.push(c>>>10&1023|55296),c=56320|1023&c),n.push(c),i+=h}return function(t){var e=t.length;if(e<=L)return String.fromCharCode.apply(String,t);var r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=L));return r}(n)}v.TYPED_ARRAY_SUPPORT=void 0===r.TYPED_ARRAY_SUPPORT||r.TYPED_ARRAY_SUPPORT,y(),v.poolSize=8192,v._augment=function(t){return t.__proto__=v.prototype,t},v.from=function(t,e,r){return m(null,t,e,r)},v.TYPED_ARRAY_SUPPORT&&(v.prototype.__proto__=Uint8Array.prototype,v.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&v[Symbol.species]),v.alloc=function(t,e,r){return function(t,e,r,n){return d(e),e<=0?g(t,e):void 0!==r?"string"==typeof n?g(t,e).fill(r,n):g(t,e).fill(r):g(t,e)}(null,t,e,r)},v.allocUnsafe=function(t){return w(null,t)},v.allocUnsafeSlow=function(t){return w(null,t)},v.isBuffer=function(t){return null!=t&&(!!t._isBuffer||$(t)||function(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&$(t.slice(0,0))}(t))},v.compare=function(t,e){if(!_(t)||!_(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var r=t.length,n=e.length,i=0,o=Math.min(r,n);i<o;++i)if(t[i]!==e[i]){r=t[i],n=e[i];break}return r<n?-1:n<r?1:0},v.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},v.concat=function(t,e){if(!l(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return v.alloc(0);var r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;var n=v.allocUnsafe(e),i=0;for(r=0;r<t.length;++r){var o=t[r];if(!_(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(n,i),i+=o.length}return n},v.byteLength=E,v.prototype._isBuffer=!0,v.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)A(this,e,e+1);return this},v.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)A(this,e,e+3),A(this,e+1,e+2);return this},v.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)A(this,e,e+7),A(this,e+1,e+6),A(this,e+2,e+5),A(this,e+3,e+4);return this},v.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?x(this,0,t):P.apply(this,arguments)},v.prototype.equals=function(t){if(!_(t))throw new TypeError("Argument must be a Buffer");return this===t||0===v.compare(this,t)},v.prototype.inspect=function(){var t="";return this.length>0&&(t=this.toString("hex",0,50).match(/.{2}/g).join(" "),this.length>50&&(t+=" ... ")),"<Buffer "+t+">"},v.prototype.compare=function(t,e,r,n,i){if(!_(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),e<0||r>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&e>=r)return 0;if(n>=i)return-1;if(e>=r)return 1;if(this===t)return 0;for(var o=(i>>>=0)-(n>>>=0),u=(r>>>=0)-(e>>>=0),a=Math.min(o,u),f=this.slice(n,i),s=t.slice(e,r),c=0;c<a;++c)if(f[c]!==s[c]){o=f[c],u=s[c];break}return o<u?-1:u<o?1:0},v.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},v.prototype.indexOf=function(t,e,r){return R(this,t,e,r,!0)},v.prototype.lastIndexOf=function(t,e,r){return R(this,t,e,r,!1)},v.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e|=0,isFinite(r)?(r|=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var i=this.length-e;if((void 0===r||r>i)&&(r=i),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return C(this,t,e,r);case"utf8":case"utf-8":return U(this,t,e,r);case"ascii":return k(this,t,e,r);case"latin1":case"binary":return S(this,t,e,r);case"base64":return j(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return B(this,t,e,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},v.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var L=4096;function M(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function Y(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function N(t,e,r){var n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);for(var i="",o=e;o<r;++o)i+=K(t[o]);return i}function D(t,e,r){for(var n=t.slice(e,r),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function F(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function V(t,e,r,n,i,o){if(!_(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function z(t,e,r,n){e<0&&(e=65535+e+1);for(var i=0,o=Math.min(t.length-r,2);i<o;++i)t[r+i]=(e&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function J(t,e,r,n){e<0&&(e=4294967295+e+1);for(var i=0,o=Math.min(t.length-r,4);i<o;++i)t[r+i]=e>>>8*(n?i:3-i)&255}function q(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function Z(t,e,r,n,i){return i||q(t,0,r,4),h(t,e,r,n,23,4),r+4}function G(t,e,r,n,i){return i||q(t,0,r,8),h(t,e,r,n,52,8),r+8}v.prototype.slice=function(t,e){var r,n=this.length;if((t=~~t)<0?(t+=n)<0&&(t=0):t>n&&(t=n),(e=void 0===e?n:~~e)<0?(e+=n)<0&&(e=0):e>n&&(e=n),e<t&&(e=t),v.TYPED_ARRAY_SUPPORT)(r=this.subarray(t,e)).__proto__=v.prototype;else{var i=e-t;r=new v(i,void 0);for(var o=0;o<i;++o)r[o]=this[o+t]}return r},v.prototype.readUIntLE=function(t,e,r){t|=0,e|=0,r||F(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n},v.prototype.readUIntBE=function(t,e,r){t|=0,e|=0,r||F(t,e,this.length);for(var n=this[t+--e],i=1;e>0&&(i*=256);)n+=this[t+--e]*i;return n},v.prototype.readUInt8=function(t,e){return e||F(t,1,this.length),this[t]},v.prototype.readUInt16LE=function(t,e){return e||F(t,2,this.length),this[t]|this[t+1]<<8},v.prototype.readUInt16BE=function(t,e){return e||F(t,2,this.length),this[t]<<8|this[t+1]},v.prototype.readUInt32LE=function(t,e){return e||F(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},v.prototype.readUInt32BE=function(t,e){return e||F(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},v.prototype.readIntLE=function(t,e,r){t|=0,e|=0,r||F(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*e)),n},v.prototype.readIntBE=function(t,e,r){t|=0,e|=0,r||F(t,e,this.length);for(var n=e,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*e)),o},v.prototype.readInt8=function(t,e){return e||F(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},v.prototype.readInt16LE=function(t,e){e||F(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},v.prototype.readInt16BE=function(t,e){e||F(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},v.prototype.readInt32LE=function(t,e){return e||F(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},v.prototype.readInt32BE=function(t,e){return e||F(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},v.prototype.readFloatLE=function(t,e){return e||F(t,4,this.length),c(this,t,!0,23,4)},v.prototype.readFloatBE=function(t,e){return e||F(t,4,this.length),c(this,t,!1,23,4)},v.prototype.readDoubleLE=function(t,e){return e||F(t,8,this.length),c(this,t,!0,52,8)},v.prototype.readDoubleBE=function(t,e){return e||F(t,8,this.length),c(this,t,!1,52,8)},v.prototype.writeUIntLE=function(t,e,r,n){(t=+t,e|=0,r|=0,n)||V(this,t,e,r,Math.pow(2,8*r)-1,0);var i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},v.prototype.writeUIntBE=function(t,e,r,n){(t=+t,e|=0,r|=0,n)||V(this,t,e,r,Math.pow(2,8*r)-1,0);var i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},v.prototype.writeUInt8=function(t,e,r){return t=+t,e|=0,r||V(this,t,e,1,255,0),v.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},v.prototype.writeUInt16LE=function(t,e,r){return t=+t,e|=0,r||V(this,t,e,2,65535,0),v.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):z(this,t,e,!0),e+2},v.prototype.writeUInt16BE=function(t,e,r){return t=+t,e|=0,r||V(this,t,e,2,65535,0),v.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):z(this,t,e,!1),e+2},v.prototype.writeUInt32LE=function(t,e,r){return t=+t,e|=0,r||V(this,t,e,4,4294967295,0),v.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):J(this,t,e,!0),e+4},v.prototype.writeUInt32BE=function(t,e,r){return t=+t,e|=0,r||V(this,t,e,4,4294967295,0),v.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):J(this,t,e,!1),e+4},v.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e|=0,!n){var i=Math.pow(2,8*r-1);V(this,t,e,r,i-1,-i)}var o=0,u=1,a=0;for(this[e]=255&t;++o<r&&(u*=256);)t<0&&0===a&&0!==this[e+o-1]&&(a=1),this[e+o]=(t/u>>0)-a&255;return e+r},v.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e|=0,!n){var i=Math.pow(2,8*r-1);V(this,t,e,r,i-1,-i)}var o=r-1,u=1,a=0;for(this[e+o]=255&t;--o>=0&&(u*=256);)t<0&&0===a&&0!==this[e+o+1]&&(a=1),this[e+o]=(t/u>>0)-a&255;return e+r},v.prototype.writeInt8=function(t,e,r){return t=+t,e|=0,r||V(this,t,e,1,127,-128),v.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},v.prototype.writeInt16LE=function(t,e,r){return t=+t,e|=0,r||V(this,t,e,2,32767,-32768),v.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):z(this,t,e,!0),e+2},v.prototype.writeInt16BE=function(t,e,r){return t=+t,e|=0,r||V(this,t,e,2,32767,-32768),v.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):z(this,t,e,!1),e+2},v.prototype.writeInt32LE=function(t,e,r){return t=+t,e|=0,r||V(this,t,e,4,2147483647,-2147483648),v.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):J(this,t,e,!0),e+4},v.prototype.writeInt32BE=function(t,e,r){return t=+t,e|=0,r||V(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),v.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):J(this,t,e,!1),e+4},v.prototype.writeFloatLE=function(t,e,r){return Z(this,t,e,!0,r)},v.prototype.writeFloatBE=function(t,e,r){return Z(this,t,e,!1,r)},v.prototype.writeDoubleLE=function(t,e,r){return G(this,t,e,!0,r)},v.prototype.writeDoubleBE=function(t,e,r){return G(this,t,e,!1,r)},v.prototype.copy=function(t,e,r,n){if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var i,o=n-r;if(this===t&&r<e&&e<n)for(i=o-1;i>=0;--i)t[i+e]=this[i+r];else if(o<1e3||!v.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)t[i+e]=this[i+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+o),e);return o},v.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===t.length){var i=t.charCodeAt(0);i<256&&(t=i)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!v.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;var o;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(o=e;o<r;++o)this[o]=t;else{var u=_(t)?t:Q(new v(t,n).toString()),a=u.length;for(o=0;o<r-e;++o)this[o+e]=u[o%a]}return this};var H=/[^+\/0-9A-Za-z-_]/g;function K(t){return t<16?"0"+t.toString(16):t.toString(16)}function Q(t,e){var r;e=e||1/0;for(var n=t.length,i=null,o=[],u=0;u<n;++u){if((r=t.charCodeAt(u))>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(u+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function W(t){return function(t){var e,r,n,f,s,c;u||a();var h=t.length;if(h%4>0)throw new Error("Invalid string. Length must be a multiple of 4");s="="===t[h-2]?2:"="===t[h-1]?1:0,c=new o(3*h/4-s),n=s>0?h-4:h;var p=0;for(e=0,r=0;e<n;e+=4,r+=3)f=i[t.charCodeAt(e)]<<18|i[t.charCodeAt(e+1)]<<12|i[t.charCodeAt(e+2)]<<6|i[t.charCodeAt(e+3)],c[p++]=f>>16&255,c[p++]=f>>8&255,c[p++]=255&f;return 2===s?(f=i[t.charCodeAt(e)]<<2|i[t.charCodeAt(e+1)]>>4,c[p++]=255&f):1===s&&(f=i[t.charCodeAt(e)]<<10|i[t.charCodeAt(e+1)]<<4|i[t.charCodeAt(e+2)]>>2,c[p++]=f>>8&255,c[p++]=255&f),c}(function(t){if((t=function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}(t).replace(H,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function X(t,e,r,n){for(var i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}function $(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}var tt,et={},rt={},nt=t&&t.__extends||(tt=function(t,e){return tt=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])},tt(t,e)},function(t,e){function r(){this.constructor=t}tt(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(rt,"__esModule",{value:!0}),rt.DetailContext=rt.NoopContext=rt.VError=void 0;var it=function(t){function e(r,n){var i=t.call(this,n)||this;return i.path=r,Object.setPrototypeOf(i,e.prototype),i}return nt(e,t),e}(Error);rt.VError=it;var ot=function(){function t(){}return t.prototype.fail=function(t,e,r){return!1},t.prototype.unionResolver=function(){return this},t.prototype.createContext=function(){return this},t.prototype.resolveUnion=function(t){},t}();rt.NoopContext=ot;var ut=function(){function t(){this._propNames=[""],this._messages=[null],this._score=0}return t.prototype.fail=function(t,e,r){return this._propNames.push(t),this._messages.push(e),this._score+=r,!1},t.prototype.unionResolver=function(){return new at},t.prototype.resolveUnion=function(t){for(var e,r,n=null,i=0,o=t.contexts;i<o.length;i++){var u=o[i];(!n||u._score>=n._score)&&(n=u)}n&&n._score>0&&((e=this._propNames).push.apply(e,n._propNames),(r=this._messages).push.apply(r,n._messages))},t.prototype.getError=function(t){for(var e=[],r=this._propNames.length-1;r>=0;r--){var n=this._propNames[r];t+="number"==typeof n?"["+n+"]":n?"."+n:"";var i=this._messages[r];i&&e.push(t+" "+i)}return new it(t,e.join("; "))},t.prototype.getErrorDetail=function(t){for(var e=[],r=this._propNames.length-1;r>=0;r--){var n=this._propNames[r];t+="number"==typeof n?"["+n+"]":n?"."+n:"";var i=this._messages[r];i&&e.push({path:t,message:i})}var o=null;for(r=e.length-1;r>=0;r--)o&&(e[r].nested=[o]),o=e[r];return o},t}();rt.DetailContext=ut;var at=function(){function t(){this.contexts=[]}return t.prototype.createContext=function(){var t=new ut;return this.contexts.push(t),t},t}();!function(e){var r=t&&t.__extends||function(){var t=function(e,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])},t(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(e,"__esModule",{value:!0}),e.basicTypes=e.BasicType=e.TParamList=e.TParam=e.param=e.TFunc=e.func=e.TProp=e.TOptional=e.opt=e.TIface=e.iface=e.TEnumLiteral=e.enumlit=e.TEnumType=e.enumtype=e.TIntersection=e.intersection=e.TUnion=e.union=e.TTuple=e.tuple=e.TArray=e.array=e.TLiteral=e.lit=e.TName=e.name=e.TType=void 0;var n=rt,i=function(){};function o(t){return"string"==typeof t?a(t):t}function u(t,e){var r=t[e];if(!r)throw new Error("Unknown type "+e);return r}function a(t){return new f(t)}e.TType=i,e.name=a;var f=function(t){function e(e){var r=t.call(this)||this;return r.name=e,r._failMsg="is not a "+e,r}return r(e,t),e.prototype.getChecker=function(t,r,n){var i=this,o=u(t,this.name),a=o.getChecker(t,r,n);return o instanceof P||o instanceof e?a:function(t,e){return!!a(t,e)||e.fail(null,i._failMsg,0)}},e}(i);e.TName=f,e.lit=function(t){return new s(t)};var s=function(t){function e(e){var r=t.call(this)||this;return r.value=e,r.name=JSON.stringify(e),r._failMsg="is not "+r.name,r}return r(e,t),e.prototype.getChecker=function(t,e){var r=this;return function(t,e){return t===r.value||e.fail(null,r._failMsg,-1)}},e}(i);e.TLiteral=s,e.array=function(t){return new c(o(t))};var c=function(t){function e(e){var r=t.call(this)||this;return r.ttype=e,r}return r(e,t),e.prototype.getChecker=function(t,e){var r=this.ttype.getChecker(t,e);return function(t,e){if(!Array.isArray(t))return e.fail(null,"is not an array",0);for(var n=0;n<t.length;n++){if(!r(t[n],e))return e.fail(n,null,1)}return!0}},e}(i);e.TArray=c,e.tuple=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return new h(t.map((function(t){return o(t)})))};var h=function(t){function e(e){var r=t.call(this)||this;return r.ttypes=e,r}return r(e,t),e.prototype.getChecker=function(t,e){var r=this.ttypes.map((function(r){return r.getChecker(t,e)})),n=function(t,e){if(!Array.isArray(t))return e.fail(null,"is not an array",0);for(var n=0;n<r.length;n++){if(!r[n](t[n],e))return e.fail(n,null,1)}return!0};return e?function(t,e){return!!n(t,e)&&(t.length<=r.length||e.fail(r.length,"is extraneous",2))}:n},e}(i);e.TTuple=h,e.union=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return new p(t.map((function(t){return o(t)})))};var p=function(t){function e(e){var r=t.call(this)||this;r.ttypes=e;var n=e.map((function(t){return t instanceof f||t instanceof s?t.name:null})).filter((function(t){return t})),i=e.length-n.length;return n.length?(i>0&&n.push(i+" more"),r._failMsg="is none of "+n.join(", ")):r._failMsg="is none of "+i+" types",r}return r(e,t),e.prototype.getChecker=function(t,e){var r=this,n=this.ttypes.map((function(r){return r.getChecker(t,e)}));return function(t,e){for(var i=e.unionResolver(),o=0;o<n.length;o++){if(n[o](t,i.createContext()))return!0}return e.resolveUnion(i),e.fail(null,r._failMsg,0)}},e}(i);e.TUnion=p,e.intersection=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return new l(t.map((function(t){return o(t)})))};var l=function(t){function e(e){var r=t.call(this)||this;return r.ttypes=e,r}return r(e,t),e.prototype.getChecker=function(t,e){var r=new Set,n=this.ttypes.map((function(n){return n.getChecker(t,e,r)}));return function(t,e){return!!n.every((function(r){return r(t,e)}))||e.fail(null,null,0)}},e}(i);e.TIntersection=l,e.enumtype=function(t){return new y(t)};var y=function(t){function e(e){var r=t.call(this)||this;return r.members=e,r.validValues=new Set,r._failMsg="is not a valid enum value",r.validValues=new Set(Object.keys(e).map((function(t){return e[t]}))),r}return r(e,t),e.prototype.getChecker=function(t,e){var r=this;return function(t,e){return!!r.validValues.has(t)||e.fail(null,r._failMsg,0)}},e}(i);e.TEnumType=y,e.enumlit=function(t,e){return new g(t,e)};var g=function(t){function e(e,r){var n=t.call(this)||this;return n.enumName=e,n.prop=r,n._failMsg="is not "+e+"."+r,n}return r(e,t),e.prototype.getChecker=function(t,e){var r=this,n=u(t,this.enumName);if(!(n instanceof y))throw new Error("Type "+this.enumName+" used in enumlit is not an enum type");var i=n.members[this.prop];if(!n.members.hasOwnProperty(this.prop))throw new Error("Unknown value "+this.enumName+"."+this.prop+" used in enumlit");return function(t,e){return t===i||e.fail(null,r._failMsg,-1)}},e}(i);function m(t){return Object.keys(t).map((function(e){return function(t,e){return e instanceof w?new b(t,e.ttype,!0):new b(t,o(e),!1)}(e,t[e])}))}e.TEnumLiteral=g,e.iface=function(t,e){return new d(t,m(e))};var d=function(t){function e(e,r){var n=t.call(this)||this;return n.bases=e,n.props=r,n.propSet=new Set(r.map((function(t){return t.name}))),n}return r(e,t),e.prototype.getChecker=function(t,e,r){var i=this,o=this.bases.map((function(r){return u(t,r).getChecker(t,e)})),a=this.props.map((function(r){return r.ttype.getChecker(t,e)})),f=new n.NoopContext,s=this.props.map((function(t,e){return!t.isOpt&&!a[e](void 0,f)})),c=function(t,e){if("object"!=typeof t||null===t)return e.fail(null,"is not an object",0);for(var r=0;r<o.length;r++)if(!o[r](t,e))return!1;for(r=0;r<a.length;r++){var n=i.props[r].name,u=t[n];if(void 0===u){if(s[r])return e.fail(n,"is missing",1)}else if(!a[r](u,e))return e.fail(n,null,1)}return!0};if(!e)return c;var h=this.propSet;return r&&(this.propSet.forEach((function(t){return r.add(t)})),h=r),function(t,e){if(!c(t,e))return!1;for(var r in t)if(!h.has(r))return e.fail(r,"is extraneous",2);return!0}},e}(i);e.TIface=d,e.opt=function(t){return new w(o(t))};var w=function(t){function e(e){var r=t.call(this)||this;return r.ttype=e,r}return r(e,t),e.prototype.getChecker=function(t,e){var r=this.ttype.getChecker(t,e);return function(t,e){return void 0===t||r(t,e)}},e}(i);e.TOptional=w;var b=function(t,e,r){this.name=t,this.ttype=e,this.isOpt=r};e.TProp=b,e.func=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return new T(new E(e),o(t))};var T=function(t){function e(e,r){var n=t.call(this)||this;return n.paramList=e,n.result=r,n}return r(e,t),e.prototype.getChecker=function(t,e){return function(t,e){return"function"==typeof t||e.fail(null,"is not a function",0)}},e}(i);e.TFunc=T,e.param=function(t,e,r){return new _(t,o(e),Boolean(r))};var _=function(t,e,r){this.name=t,this.ttype=e,this.isOpt=r};e.TParam=_;var E=function(t){function e(e){var r=t.call(this)||this;return r.params=e,r}return r(e,t),e.prototype.getChecker=function(t,e){var r=this,i=this.params.map((function(r){return r.ttype.getChecker(t,e)})),o=new n.NoopContext,u=this.params.map((function(t,e){return!t.isOpt&&!i[e](void 0,o)})),a=function(t,e){if(!Array.isArray(t))return e.fail(null,"is not an array",0);for(var n=0;n<i.length;n++){var o=r.params[n];if(void 0===t[n]){if(u[n])return e.fail(o.name,"is missing",1)}else if(!i[n](t[n],e))return e.fail(o.name,null,1)}return!0};return e?function(t,e){return!!a(t,e)&&(t.length<=i.length||e.fail(i.length,"is extraneous",2))}:a},e}(i);e.TParamList=E;var P=function(t){function e(e,r){var n=t.call(this)||this;return n.validator=e,n.message=r,n}return r(e,t),e.prototype.getChecker=function(t,e){var r=this;return function(t,e){return!!r.validator(t)||e.fail(null,r.message,0)}},e}(i);e.BasicType=P,e.basicTypes={any:new P((function(t){return!0}),"is invalid"),number:new P((function(t){return"number"==typeof t}),"is not a number"),object:new P((function(t){return"object"==typeof t&&t}),"is not an object"),boolean:new P((function(t){return"boolean"==typeof t}),"is not a boolean"),string:new P((function(t){return"string"==typeof t}),"is not a string"),symbol:new P((function(t){return"symbol"==typeof t}),"is not a symbol"),void:new P((function(t){return null==t}),"is not void"),undefined:new P((function(t){return void 0===t}),"is not undefined"),null:new P((function(t){return null===t}),"is not null"),never:new P((function(t){return!1}),"is unexpected"),Date:new P(R("[object Date]"),"is not a Date"),RegExp:new P(R("[object RegExp]"),"is not a RegExp")};var A=Object.prototype.toString;function R(t){return function(e){return"object"==typeof e&&e&&A.call(e)===t}}void 0!==v&&(e.basicTypes.Buffer=new P((function(t){return v.isBuffer(t)}),"is not a Buffer"));for(var O=function(t){e.basicTypes[t.name]=new P((function(e){return e instanceof t}),"is not a "+t.name)},C=0,U=[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,ArrayBuffer];C<U.length;C++){O(U[C])}}(et),function(e){var r=t&&t.__spreadArrays||function(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var n=Array(t),i=0;for(e=0;e<r;e++)for(var o=arguments[e],u=0,a=o.length;u<a;u++,i++)n[i]=o[u];return n};Object.defineProperty(e,"__esModule",{value:!0}),e.Checker=e.createCheckers=void 0;var n=et,i=rt,o=et;Object.defineProperty(e,"TArray",{enumerable:!0,get:function(){return o.TArray}}),Object.defineProperty(e,"TEnumType",{enumerable:!0,get:function(){return o.TEnumType}}),Object.defineProperty(e,"TEnumLiteral",{enumerable:!0,get:function(){return o.TEnumLiteral}}),Object.defineProperty(e,"TFunc",{enumerable:!0,get:function(){return o.TFunc}}),Object.defineProperty(e,"TIface",{enumerable:!0,get:function(){return o.TIface}}),Object.defineProperty(e,"TLiteral",{enumerable:!0,get:function(){return o.TLiteral}}),Object.defineProperty(e,"TName",{enumerable:!0,get:function(){return o.TName}}),Object.defineProperty(e,"TOptional",{enumerable:!0,get:function(){return o.TOptional}}),Object.defineProperty(e,"TParam",{enumerable:!0,get:function(){return o.TParam}}),Object.defineProperty(e,"TParamList",{enumerable:!0,get:function(){return o.TParamList}}),Object.defineProperty(e,"TProp",{enumerable:!0,get:function(){return o.TProp}}),Object.defineProperty(e,"TTuple",{enumerable:!0,get:function(){return o.TTuple}}),Object.defineProperty(e,"TType",{enumerable:!0,get:function(){return o.TType}}),Object.defineProperty(e,"TUnion",{enumerable:!0,get:function(){return o.TUnion}}),Object.defineProperty(e,"TIntersection",{enumerable:!0,get:function(){return o.TIntersection}}),Object.defineProperty(e,"array",{enumerable:!0,get:function(){return o.array}}),Object.defineProperty(e,"enumlit",{enumerable:!0,get:function(){return o.enumlit}}),Object.defineProperty(e,"enumtype",{enumerable:!0,get:function(){return o.enumtype}}),Object.defineProperty(e,"func",{enumerable:!0,get:function(){return o.func}}),Object.defineProperty(e,"iface",{enumerable:!0,get:function(){return o.iface}}),Object.defineProperty(e,"lit",{enumerable:!0,get:function(){return o.lit}}),Object.defineProperty(e,"name",{enumerable:!0,get:function(){return o.name}}),Object.defineProperty(e,"opt",{enumerable:!0,get:function(){return o.opt}}),Object.defineProperty(e,"param",{enumerable:!0,get:function(){return o.param}}),Object.defineProperty(e,"tuple",{enumerable:!0,get:function(){return o.tuple}}),Object.defineProperty(e,"union",{enumerable:!0,get:function(){return o.union}}),Object.defineProperty(e,"intersection",{enumerable:!0,get:function(){return o.intersection}}),Object.defineProperty(e,"BasicType",{enumerable:!0,get:function(){return o.BasicType}});var u=rt;Object.defineProperty(e,"VError",{enumerable:!0,get:function(){return u.VError}}),e.createCheckers=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var i=Object.assign.apply(Object,r([{},n.basicTypes],t)),o={},u=0,f=t;u<f.length;u++)for(var s=f[u],c=0,h=Object.keys(s);c<h.length;c++){var p=h[c];o[p]=new a(i,s[p])}return o};var a=function(){function t(t,e,r){if(void 0===r&&(r="value"),this.suite=t,this.ttype=e,this._path=r,this.props=new Map,e instanceof n.TIface)for(var i=0,o=e.props;i<o.length;i++){var u=o[i];this.props.set(u.name,u.ttype)}this.checkerPlain=this.ttype.getChecker(t,!1),this.checkerStrict=this.ttype.getChecker(t,!0)}return t.prototype.setReportedPath=function(t){this._path=t},t.prototype.check=function(t){return this._doCheck(this.checkerPlain,t)},t.prototype.test=function(t){return this.checkerPlain(t,new i.NoopContext)},t.prototype.validate=function(t){return this._doValidate(this.checkerPlain,t)},t.prototype.strictCheck=function(t){return this._doCheck(this.checkerStrict,t)},t.prototype.strictTest=function(t){return this.checkerStrict(t,new i.NoopContext)},t.prototype.strictValidate=function(t){return this._doValidate(this.checkerStrict,t)},t.prototype.getProp=function(e){var r=this.props.get(e);if(!r)throw new Error("Type has no property "+e);return new t(this.suite,r,this._path+"."+e)},t.prototype.methodArgs=function(e){var r=this._getMethod(e);return new t(this.suite,r.paramList)},t.prototype.methodResult=function(e){var r=this._getMethod(e);return new t(this.suite,r.result)},t.prototype.getArgs=function(){if(!(this.ttype instanceof n.TFunc))throw new Error("getArgs() applied to non-function");return new t(this.suite,this.ttype.paramList)},t.prototype.getResult=function(){if(!(this.ttype instanceof n.TFunc))throw new Error("getResult() applied to non-function");return new t(this.suite,this.ttype.result)},t.prototype.getType=function(){return this.ttype},t.prototype._doCheck=function(t,e){if(!t(e,new i.NoopContext)){var r=new i.DetailContext;throw t(e,r),r.getError(this._path)}},t.prototype._doValidate=function(t,e){if(t(e,new i.NoopContext))return null;var r=new i.DetailContext;return t(e,r),r.getErrorDetail(this._path)},t.prototype._getMethod=function(t){var e=this.props.get(t);if(!e)throw new Error("Type has no property "+t);if(!(e instanceof n.TFunc))throw new Error("Property "+t+" is not a method");return e},t}();e.Checker=a}(e);var ft=e.BasicType,st=e.Checker,ct=e.TArray,ht=e.TEnumLiteral,pt=e.TEnumType,lt=e.TFunc,yt=e.TIface,gt=e.TIntersection,vt=e.TLiteral,mt=e.TName,dt=e.TOptional,wt=e.TParam,bt=e.TParamList,Tt=e.TProp,_t=e.TTuple,Et=e.TType,Pt=e.TUnion,At=e.VError,Rt=e.__esModule,Ot=e.array,Ct=e.createCheckers,Ut=e.enumlit,kt=e.enumtype,St=e.func,jt=e.iface,Bt=e.intersection,It=e.lit,xt=e.name,Lt=e.opt,Mt=e.param,Yt=e.tuple,Nt=e.union;export{ft as BasicType,st as Checker,ct as TArray,ht as TEnumLiteral,pt as TEnumType,lt as TFunc,yt as TIface,gt as TIntersection,vt as TLiteral,mt as TName,dt as TOptional,wt as TParam,bt as TParamList,Tt as TProp,_t as TTuple,Et as TType,Pt as TUnion,At as VError,Rt as __esModule,Ot as array,Ct as createCheckers,e as default,Ut as enumlit,kt as enumtype,St as func,jt as iface,Bt as intersection,It as lit,xt as name,Lt as opt,Mt as param,Yt as tuple,Nt as union};
