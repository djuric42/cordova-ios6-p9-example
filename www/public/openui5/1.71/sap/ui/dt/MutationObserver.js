/*
 * ! OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/dt/OverlayUtil","sap/ui/base/ManagedObject","sap/ui/dt/DOMUtil","sap/base/util/restricted/_intersection"],function(q,O,M,D,_){"use strict";var a=M.extend("sap.ui.dt.MutationObserver",{metadata:{library:"sap.ui.dt",events:{domChanged:{parameters:{type:{type:"string"},targetNodes:{type:"element[]"}}}}}});a.prototype.init=function(){this._fireDomChangeOnTransitionEnd=this._fireDomChangeOnTransitionEnd.bind(this);this._fireDomChangeOnAnimationEnd=this._fireDomChangeOnAnimationEnd.bind(this);this._fireDomChangeOnResize=this._fireDomChangeOnResize.bind(this);this._fireDomChangeOnScroll=this._fireDomChangeOnScroll.bind(this);window.addEventListener("transitionend",this._fireDomChangeOnTransitionEnd,true);window.addEventListener("animationend",this._fireDomChangeOnAnimationEnd,true);window.addEventListener("scroll",this._fireDomChangeOnScroll,true);q(window).on("resize",this._fireDomChangeOnResize);this._aIgnoredMutations=[];this._aWhiteList=[];this._startMutationObserver();};a.prototype.exit=function(){this._stopMutationObserver();window.removeEventListener("transitionend",this._fireDomChangeOnTransitionEnd,true);window.removeEventListener("animationend",this._fireDomChangeOnAnimationEnd,true);window.removeEventListener("scroll",this._fireDomChangeOnScroll,true);q(window).off("resize",this._fireDomChangeOnResize);};a.prototype.ignoreOnce=function(p){this._aIgnoredMutations.push(p);};a.prototype.addToWhiteList=function(i){this._aWhiteList.push(i);};a.prototype.removeFromWhiteList=function(i){this._aWhiteList=this._aWhiteList.filter(function(c){return c!==i;});};a.prototype._isRelevantNode=function(n){return(document.body.contains(n)&&n.getAttribute('id')!=='sap-ui-static'&&!D.contains('sap-ui-preserve',n)&&(this._aWhiteList.some(function(i){return(D.contains(i,n)||n.contains(document.getElementById(i)));})));};a.prototype._isRelevantMutation=function(m){return(this._isRelevantNode(this._getTargetNode(m))||(m.target.id==='sap-ui-static'&&_([].concat(Array.prototype.slice.call(m.addedNodes),Array.prototype.slice.call(m.removedNodes)).map(function(n){return n.id;}),this._aWhiteList).length>0));};a.prototype._getTargetNode=function(m){return(m.type==="characterData"?m.target.parentNode:m.target);};a.prototype._startMutationObserver=function(){this._oMutationObserver=new window.MutationObserver(function(m){var t=[];m.forEach(function(o){if(this._isRelevantMutation(o)){var T=this._getTargetNode(o);var i=this._aIgnoredMutations.some(function(I,b,s){if(I.target===o.target&&(!I.type||I.type===o.type)){s.splice(b,1);return true;}});if(!i){t.push(T);}}}.bind(this));if(t.length){this.fireDomChanged({type:"mutation",targetNodes:t});}}.bind(this));this._oMutationObserver.observe(window.document,{childList:true,subtree:true,attributes:true,attributeFilter:["style","class","width","height","border"],characterData:true});};a.prototype._stopMutationObserver=function(){if(this._oMutationObserver){this._oMutationObserver.disconnect();delete this._oMutationObserver;}};a.prototype._fireDomChangeOnTransitionEnd=function(){this.fireDomChanged({type:"transitionend"});};a.prototype._fireDomChangeOnAnimationEnd=function(){this.fireDomChanged({type:"animationend"});};a.prototype._fireDomChangeOnResize=function(){this.fireDomChanged({type:"resize"});};a.prototype._fireDomChangeOnScroll=function(e){var t=e.target;if(this._isRelevantNode(t)&&!O.getClosestOverlayForNode(t)&&t!==document){this.fireDomChanged({type:"scroll"});}};return a;});