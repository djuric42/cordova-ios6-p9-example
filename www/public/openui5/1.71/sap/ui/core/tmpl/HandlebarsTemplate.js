/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Core','./Template','./TemplateControl','sap/ui/thirdparty/handlebars','sap/ui/base/ManagedObject','sap/base/util/ObjectPath',"sap/base/security/encodeXML","sap/ui/thirdparty/jquery","sap/base/util/isEmptyObject"],function(C,T,a,H,M,O,e,q,b){"use strict";var c=T.extend("sap.ui.core.tmpl.HandlebarsTemplate",{constructor:function(i,s){T.apply(this,arguments);}});T.registerType("text/x-handlebars-template","sap.ui.core.tmpl.HandlebarsTemplate");function d(h){for(var k in h){h[k]=h[k].replace("&gt;",">").replace("&lt;","<").replace("&quot;","\"").replace("&amp;","&");}}function f(p,P){var r=/^((\w+)>)?(.*)/,g=r.exec(p),s=g[2],h=r.exec(P),i=h[2];var g=r.exec(p);if(P&&s==i){return P+g[3];}else{return p;}}c.RENDER_HELPERS=(function(){var E=H.helpers["each"],w=H.helpers["with"],I=H.helpers["if"],u=H.helpers["unless"],r=sap.ui.getCore().createRenderManager();r.renderControl=function(o){this.writeControlData(o);this.writeClasses(o);this.writeStyles(o);};var h={"each":function(g,o){o=o||g;if(!o.hash.path){return E.apply(this,arguments);}else{d(o.hash);var R=o.data.renderManager,i=o.data.rootControl,p=o.data.path,P=o.data.parentControl,s=f(o.hash.path,p),j=i.bindList(s),k=[],l;if(o.data){l=H.createFrame(o.data);}if(j){for(var K in j){if(l){l.renderManager=R;l.rootControl=i;l.path=s+"/"+K+"/";l.parentControl=P;}k.push(o.fn({},{data:l}));}}if(!P){return new H.SafeString(k.join(""));}}},"with":function(g,o){o=o||g;if(!o.hash.path){return w.apply(this,arguments);}},"if":function(g,o){o=o||g;if(!o.hash.path){return I.apply(this,arguments);}else{d(o.hash);var R=o.data.rootControl,p=o.data.path,P=f(o.hash.path,p);if(P){var v=R.bindProp(P);if(v){return o.fn(this);}else{return o.inverse(this);}}}},"unless":function(g,o){o=o||g;if(!o.hash.path){return u.apply(this,arguments);}else{d(o.hash);var R=o.data.rootControl,p=o.data.path,P=f(o.hash.path,p);if(P){var v=R.bindProp(P);if(!v){return o.fn(this);}else{return o.inverse(this);}}}},"text":function(g,o){o=o||g;d(o.hash);var R=o.data.rootControl,p=o.data.path,P=f(o.hash.path,p);if(P){var v=R.bindProp(P);return v&&new H.SafeString(e(v));}else{throw new Error("The expression \"text\" requires the option \"path\"!");}},"element":function(g,o){o=o||g;d(o.hash);var R=o.data.renderManager,i=o.data.rootControl,j=i.createDOMElement(o.hash,o.data.path),p=o.data.parentElement;if(o.fn){o.fn({},{data:{renderManager:R,rootControl:i,parentElement:j}});}if(p){p.addElement(j);return;}return new H.SafeString(R.getHTML(j));},"control":function(g,o){o=o||g;d(o.hash);var R=o.data.renderManager,j=o.data.control;if(j){return new H.SafeString(R.getHTML(j));}var k=o.data.rootControl,p=o.data.path,P=o.data.children,t=o.hash["sap-ui-type"],m=O.get(t||""),n=m&&m.getMetadata(),D=o.hash["sap-ui-default-aggregation"]||n&&n.getDefaultAggregationName(),v=o.data.view;if(!m){throw new Error("Control of type "+t+" cannot be found.");}var s={};if(o.fn){o.fn({},{data:{rootControl:k,path:p,children:s,defaultAggregation:D,view:v}});}var S=q.extend({},o.hash),x;for(var K in S){if(K==="sap-ui-class"&&typeof S[K]==="string"){x=S["sap-ui-class"]&&S["sap-ui-class"].split(" ");delete S[K];}else if(s[K]){delete S[K];}}var N=k.createControl(S,o.data.path,!!P,v);if(x&&x.length>0){x.forEach(N.addStyleClass.bind(N));}if(!b(s)){S=o.hash;var A=n.getAllAggregations();for(var y in s){var z=s[y];for(var i=0,l=z.length;i<l;i++){var B=z[i],F=A[y],G=F&&F.multiple;if(typeof S[y]==="string"){var J=M.bindingParser(S[y],v&&v.getController());J.template=B;N.bindAggregation(y,J);}else{if(G){N.addAggregation(y,B);}else{N.setAggregation(y,B);}}}}}if(P){var y=o.hash["sap-ui-aggregation"]||o.data.defaultAggregation;P[y]=P[y]||[];P[y].push(N);return;}return new H.SafeString(R.getHTML(N));},"property":function(g,o){o=o||g;d(o.hash);var R=o.data.rootControl,m=R.getMetadata(),p=o.hash.name,G=m.getProperty(p)._sGetter;return R[G]();},"aggregation":function(g,o){o=o||g;d(o.hash);if(o.data.children){var A=o.hash.name;if(o.fn){var D=q.extend({},o.data,{defaultAggregation:A});o.fn({},{data:D});}}else{var R=o.data.renderManager,j=o.data.rootControl,m=j.getMetadata(),A=o.hash.name,G=m.getAggregation(A)._sGetter,k=[];var n=j[G]();if(n){for(var i=0,l=n.length;i<l;i++){if(o.fn){k.push(o.fn({},{data:{renderManager:R,rootControl:j,control:n[i]}}));}else{k.push(R.getHTML(n[i]));}}}return new H.SafeString(k.join(""));}},"event":function(g,o){o=o||g;},"controlData":function(g,o){o=o||g;var R=o.data.rootControl;return new H.SafeString(r.getHTML(R));}};return h;}());c.prototype.createMetadata=function(){var t=this.getContent(),g=this._fnTemplate=this._fnTemplate||H.compile(t);var m={},j=a.getMetadata().getAllSettings(),p=a.getMetadata().getAllPrivateAggregations();var h={"property":function(i,o){o=o||i;d(o.hash);var n=o.hash.name;if(n&&n!=="id"&&!j[n]){m.properties=m.properties||{};m.properties[n]=q.extend({},{type:"string"},o.hash);}else{throw new Error("The property name \""+n+"\" is reserved.");}},"aggregation":function(i,o){o=o||i;d(o.hash);var n=o.hash.name;if(n&&!j[n]&&!p[n]){o.hash.multiple=o.hash.multiple=="true";m.aggregations=m.aggregations||{};m.aggregations[n]=q.extend({},o.hash);}else{throw new Error("The aggregation name \""+n+"\" is reserved.");}},"event":function(i,o){o=o||i;},"controlData":function(i,o){o=o||i;m._hasControlData=true;}};["each","if","unless","with"].forEach(function(v){h[v]=function(){};});g({},{helpers:h});return m;};c.prototype.createRenderer=function(v){var t=this.getContent(),g=this._fnTemplate=this._fnTemplate||H.compile(t);var r=function(h,o){var s=g(o.getContext()||{},{data:{renderManager:h,rootControl:o,view:v},helpers:c.RENDER_HELPERS});h.write(s);};return r;};return c;});