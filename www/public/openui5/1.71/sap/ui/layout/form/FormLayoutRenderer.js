/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/library','sap/ui/core/theming/Parameters','sap/ui/layout/library','sap/ui/layout/form/Form'],function(c,t,l,F){"use strict";var T=c.TitleLevel;var B=l.BackgroundDesign;var a={};a.render=function(r,L){var b=r;var f=L.getParent();if(f&&f instanceof F){this.renderForm(b,L,f);}};a.renderForm=function(r,L,f){var o=f.getToolbar();r.write("<div");r.writeControlData(L);r.addClass(this.getMainClass());if(o){r.addClass("sapUiFormToolbar");}this.addBackgroundClass(r,L);r.writeClasses();r.write(">");var s;if(!o){s=t.get('sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormTitleSize');}this.renderHeader(r,o,f.getTitle(),undefined,false,s,f.getId());this.renderContainers(r,L,f);r.write("</div>");};a.getMainClass=function(){return"sapUiFormLayout";};a.addBackgroundClass=function(r,L){var b=L.getBackgroundDesign();if(b!=B.Transparent){r.addClass("sapUiFormBackgr"+b);}};a.renderContainers=function(r,L,f){var C=f.getVisibleFormContainers();for(var i=0,b=C.length;i<b;i++){var o=C[i];this.renderContainer(r,L,o);}};a.renderContainer=function(r,L,C){var e=C.getExpandable();var o=C.getToolbar();var b=C.getTitle();r.write("<section");r.writeElementData(C);r.addClass("sapUiFormContainer");if(o){r.addClass("sapUiFormContainerToolbar");}else if(b){r.addClass("sapUiFormContainerTitle");}if(C.getTooltip_AsString()){r.writeAttributeEscaped('title',C.getTooltip_AsString());}r.writeClasses();this.writeAccessibilityStateContainer(r,C);r.write(">");this.renderHeader(r,o,b,C._oExpandButton,e,T.H4,C.getId());if(e){r.write("<div id='"+C.getId()+"-content'");if(!C.getExpanded()){r.addStyle("display","none");r.writeStyles();}r.write(">");}var E=C.getVisibleFormElements();for(var j=0,d=E.length;j<d;j++){var f=E[j];this.renderElement(r,L,f);}if(e){r.write("</div>");}r.write("</section>");};a.renderElement=function(r,L,e){var o=e.getLabelControl();r.write("<div");r.writeElementData(e);r.addClass("sapUiFormElement");if(o){r.addClass("sapUiFormElementLbl");}r.writeClasses();r.write(">");if(o){r.renderControl(o);}var f=e.getFields();if(f&&f.length>0){for(var k=0,b=f.length;k<b;k++){var d=f[k];r.renderControl(d);}}r.write("</div>");};a.renderTitle=function(r,o,e,E,L,C){if(o){var s=t.get('sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormSubTitleSize');if(L){s=L;}if(typeof o!=="string"&&o.getLevel()!=T.Auto){s=o.getLevel();}r.write("<"+s+" ");r.addClass("sapUiFormTitle");r.addClass("sapUiFormTitle"+s);if(typeof o!=="string"){r.writeElementData(o);if(o.getTooltip_AsString()){r.writeAttributeEscaped('title',o.getTooltip_AsString());}if(o.getEmphasized()){r.addClass("sapUiFormTitleEmph");}}else{r.writeAttribute("id",C+"--title");}r.writeClasses();r.write(">");if(E&&e){r.renderControl(e);}if(typeof o==="string"){r.writeEscaped(o,true);}else{var i=o.getIcon();if(i){var b=[];var A={"title":null};A["id"]=o.getId()+"-ico";r.writeIcon(i,b,A);}r.writeEscaped(o.getText(),true);}r.write("</"+s+">");}};a.renderHeader=function(r,o,b,e,E,L,C){if(o){r.renderControl(o);}else{this.renderTitle(r,b,e,E,L,C);}};a.writeAccessibilityStateContainer=function(r,C){var A={};var o=C.getTitle();var b=C.getToolbar();if(b){if(!C.getAriaLabelledBy()||C.getAriaLabelledBy().length==0){A["labelledby"]={value:b.getId(),append:true};}}else if(o){var i="";if(typeof o=="string"){i=C.getId()+"--title";}else{i=o.getId();}A["labelledby"]={value:i,append:true};}if(A["labelledby"]||C.getAriaLabelledBy().length>0){A["role"]="form";}r.writeAccessibilityState(C,A);};return a;},true);
