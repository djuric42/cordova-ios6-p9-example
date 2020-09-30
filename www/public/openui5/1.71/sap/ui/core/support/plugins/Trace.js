/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/support/Plugin','sap/ui/core/format/DateFormat',"sap/base/Log","sap/base/security/encodeXML"],function(P,D,L,e){"use strict";var T=P.extend("sap.ui.core.support.plugins.Trace",{constructor:function(s){P.apply(this,["sapUiSupportTrace","JavaScript Trace",s]);this._aEventIds=this.runsAsToolPlugin()?[this.getId()+"Entry"]:[];if(this.runsAsToolPlugin()){this._aLogEntries=[];this._iLogLevel=L.Level.ALL;this._oDateFormat=D.getDateTimeInstance();}else{var t=this;this._oldLogLevel=L.getLevel();L.setLevel(L.Level.ALL);L.addLogListener({onLogEntry:function(o){if(t.isActive()){s.sendEvent(t.getId()+"Entry",{"entry":o});}}});}}});T.prototype.onsapUiSupportTraceEntry=function(E){l(this,E.getParameter("entry"));};T.prototype.init=function(s){P.prototype.init.apply(this,arguments);if(!this.runsAsToolPlugin()){return;}var t=this;var r=sap.ui.getCore().createRenderManager();r.write("<div class='sapUiSupportToolbar'>");r.write("<button id='"+this.getId()+"-clear' class='sapUiSupportRoundedButton'>Clear</button>");r.write("<label class='sapUiSupportLabel'>Filter:</label><input type='text' id='"+this.getId()+"-filter' class='sapUiSupportTxtFld'>");r.write("<label class='sapUiSupportLabel'>Log Level:</label><select id='"+this.getId()+"-loglevel' class='sapUiSupportTxtFld sapUiSupportSelect'>");r.write("<option value='0'>FATAL</option>");r.write("<option value='1'>ERROR</option>");r.write("<option value='2'>WARNING</option>");r.write("<option value='3'>INFO</option>");r.write("<option value='4'>DEBUG</option>");r.write("<option value='5'>TRACE</option>");r.write("<option value='6' selected=''>ALL</option>");r.write("</select>");r.write("</div><div class='sapUiSupportTraceCntnt'></div>");r.flush(this.$().get(0));r.destroy();this._fClearHandler=function(){l(t);};this._fLogLevelHandler=function(){t._iLogLevel=t.$("loglevel").val();var R=[];for(var i=0;i<t._aLogEntries.length;i++){if(a(t._filter,t._iLogLevel,t._aLogEntries[i])){R.push(g(t,t._aLogEntries[i]));}}l(t,R.join(""));};this._fFilterHandler=function(){t._filter=t.$("filter").val();t._filter=t._filter?t._filter.toLowerCase():"";var R=[];for(var i=0;i<t._aLogEntries.length;i++){if(a(t._filter,t._iLogLevel,t._aLogEntries[i])){R.push(g(t,t._aLogEntries[i]));}}l(t,R.join(""));};this.$("clear").bind("click",this._fClearHandler);this.$("filter").bind("change",this._fFilterHandler);this.$("loglevel").bind("change",this._fLogLevelHandler);};T.prototype.exit=function(s){if(this.runsAsToolPlugin()){if(this._fClearHandler){this.$("clear").unbind("click",this._fClearHandler);this._fClearHandler=null;}if(this._fFilterHandler){this.$("filter").unbind("change",this._fFilterHandler);this._fFilterHandler=null;}if(this._fLogLevelHandler){this.$("loglevel").unbind("change",this._fLogLevelHandler);this._fLogLevelHandler=null;}}else{L.setLevel(this._oldLogLevel);this._oldLogLevel=null;}P.prototype.exit.apply(this,arguments);};function l(p,E){var c=jQuery(".sapUiSupportTraceCntnt",p.$());if(!E){c.html("");p._aLogEntries=[];}else if(typeof(E)==="string"){c.html(e(E));c[0].scrollTop=c[0].scrollHeight;}else{E._levelInfo=b(E.level);if(a(p._filter,p._iLogLevel,E)){c.append(g(p,E));c[0].scrollTop=c[0].scrollHeight;}p._aLogEntries.push(E);}}function g(p,E){var c=E._levelInfo;var s=" style='color:"+c[1]+";'";var r="<div class='sapUiSupportTraceEntry'><span class='sapUiSupportTraceEntryLevel'"+s+">"+c[0]+"</span><span class='sapUiSupportTraceEntryTime'"+s+">"+p._oDateFormat.format(new Date(E.timestamp))+"</span><span class='sapUiSupportTraceEntryMessage'>"+e(E.message||"")+"</div>";return r;}function a(f,c,E){var d=E._levelInfo;if(E._levelInfo[2]<=c){if(f){var p=f.split(" ");var r=true;for(var i=0;i<p.length;i++){r=r&&E.message.toLowerCase().indexOf(p[i])>=0||d[0].toLowerCase().indexOf(p[i])>=0;}return r;}return true;}return false;}function b(i){switch(i){case L.Level.FATAL:return["FATAL","#E60000",i];case L.Level.ERROR:return["ERROR","#E60000",i];case L.Level.WARNING:return["WARNING","#FFAA00",i];case L.Level.INFO:return["INFO","#000000",i];case L.Level.DEBUG:return["DEBUG","#000000",i];case L.Level.TRACE:return["TRACE","#000000",i];}return["unknown","#000000",i];}return T;});
