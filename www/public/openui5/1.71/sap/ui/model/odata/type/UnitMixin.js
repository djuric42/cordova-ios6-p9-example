/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/ParseException","sap/ui/model/ValidateException"],function(P,V){"use strict";var c=new Map(),r=/\.(\d+)$/,a=/\.$/,b=/0+$/;function g(k,p){return sap.ui.getCore().getLibraryResourceBundle().getText(k,p);}function d(){return this;}function v(e){if(this.mCustomUnits===undefined){throw new V("Cannot validate value without customizing");}}return function(p,B,f){function e(i,t){var F,j=this;if(this.mCustomUnits===undefined&&i&&i[2]!==undefined){if(i[2]===null){this.mCustomUnits=null;}else{this.mCustomUnits=c.get(i[2]);if(!this.mCustomUnits){this.mCustomUnits={};Object.keys(i[2]).forEach(function(k){j.mCustomUnits[k]=j.getCustomUnitForKey(i[2],k);});c.set(i[2],this.mCustomUnits);}F={};F[f]=this.mCustomUnits;B.prototype.setFormatOptions.call(this,Object.assign(F,this.oFormatOptions));}}if(!i||i[0]===undefined||i[1]===undefined||this.mCustomUnits===undefined&&i[2]===undefined){return null;}return B.prototype.formatValue.call(this,i.slice(0,2),t);}function h(i,s,C){var D,F,m,u,j;if(this.mCustomUnits===undefined){throw new P("Cannot parse value without customizing");}j=B.prototype.parseValue.apply(this,arguments);u=j[1]||C[1];if(j[0].includes(".")){j[0]=j[0].replace(b,"").replace(a,"");}if(u&&this.mCustomUnits){m=r.exec(j[0]);F=m?m[1].length:0;D=this.mCustomUnits[u].decimals;if(F>D){throw new P(D?g("EnterNumberFraction",[D]):g("EnterInt"));}}if(!this.bParseAsString){j[0]=Number(j[0]);}return j;}function U(F,C){if(F&&F[f]){throw new Error("Format option "+f+" is not supported");}if(C){throw new Error("Constraints not supported");}if(arguments.length>2){throw new Error("Only the parameter oFormatOptions is supported");}this.bParseAsString=!F||!("parseAsString"in F)||F.parseAsString;F=Object.assign({unitOptional:true,emptyString:0},F,{parseAsString:true});B.call(this,F,C);this.mCustomUnits=undefined;this.bParseWithValues=true;this.setConstraints=function(){throw new Error("Constraints not supported");};this.setFormatOptions=function(){throw new Error("Format options are immutable");};}p._applyUnitMixin=U;p.formatValue=e;p.getInterface=d;p.parseValue=h;p.validateValue=v;};},false);
