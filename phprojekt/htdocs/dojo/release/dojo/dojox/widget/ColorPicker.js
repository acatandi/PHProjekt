/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.widget.ColorPicker"]||(dojo._hasResource["dojox.widget.ColorPicker"]=!0,dojo.provide("dojox.widget.ColorPicker"),dojo.experimental("dojox.widget.ColorPicker"),dojo.requireLocalization("dojox.widget","ColorPicker",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"),dojo.requireLocalization("dojo.cldr","number",null,"ROOT,ar,ca,cs,da,de,el,en,en-au,en-gb,es,fi,fr,fr-ch,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-hant,zh-hk"),
dojo.require("dijit.form._FormWidget"),dojo.require("dojo.dnd.move"),dojo.require("dojo.fx"),dojo.require("dojox.color"),dojo.require("dojo.i18n"),function(b){dojo.declare("dojox.widget.ColorPicker",dijit.form._FormWidget,{showRgb:!0,showHsv:!0,showHex:!0,webSafe:!0,animatePoint:!0,slideDuration:250,liveUpdate:!1,PICKER_HUE_H:150,PICKER_SAT_VAL_H:150,PICKER_SAT_VAL_W:150,PICKER_HUE_SELECTOR_H:8,PICKER_SAT_SELECTOR_H:10,PICKER_SAT_SELECTOR_W:10,value:"#ffffff",_underlay:b.moduleUrl("dojox.widget",
"ColorPicker/images/underlay.png"),_hueUnderlay:b.moduleUrl("dojox.widget","ColorPicker/images/hue.png"),_pickerPointer:b.moduleUrl("dojox.widget","ColorPicker/images/pickerPointer.png"),_huePickerPointer:b.moduleUrl("dojox.widget","ColorPicker/images/hueHandle.png"),_huePickerPointerAlly:b.moduleUrl("dojox.widget","ColorPicker/images/hueHandleA11y.png"),templateString:dojo.cache("dojox.widget","ColorPicker/ColorPicker.html",'<table class="dojoxColorPicker" dojoAttachEvent="onkeypress: _handleKey" cellpadding="0" cellspacing="0">\n\t<tr>\n\t\t<td valign="top" class="dojoxColorPickerRightPad">\n\t\t\t<div class="dojoxColorPickerBox">\n\t\t\t\t<\!-- Forcing ABS in style attr due to dojo DND issue with not picking it up form the class. --\>\n\t\t\t\t<img role="status" title="${saturationPickerTitle}" alt="${saturationPickerTitle}" class="dojoxColorPickerPoint" src="${_pickerPointer}" tabIndex="0" dojoAttachPoint="cursorNode" style="position: absolute; top: 0px; left: 0px;">\n\t\t\t\t<img role="presentation" alt="" dojoAttachPoint="colorUnderlay" dojoAttachEvent="onclick: _setPoint, onmousedown: _stopDrag" class="dojoxColorPickerUnderlay" src="${_underlay}" ondragstart="return false">\n\t\t\t</div>\n\t\t</td>\n\t\t<td valign="top" class="dojoxColorPickerRightPad">\n\t\t\t<div class="dojoxHuePicker">\n\t\t\t\t<\!-- Forcing ABS in style attr due to dojo DND issue with not picking it up form the class. --\>\n\t\t\t\t<img role="status" dojoAttachPoint="hueCursorNode" tabIndex="0" class="dojoxHuePickerPoint" title="${huePickerTitle}" alt="${huePickerTitle}" src="${_huePickerPointer}" style="position: absolute; top: 0px; left: 0px;">\n\t\t\t\t<div class="dojoxHuePickerUnderlay" dojoAttachPoint="hueNode">\n\t\t\t\t    <img role="presentation" alt="" dojoAttachEvent="onclick: _setHuePoint, onmousedown: _stopDrag" src="${_hueUnderlay}">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</td>\n\t\t<td valign="top">\n\t\t\t<table cellpadding="0" cellspacing="0">\n\t\t\t\t<tr>\n\t\t\t\t\t<td valign="top" class="dojoxColorPickerPreviewContainer">\n\t\t\t\t\t\t<table cellpadding="0" cellspacing="0">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td valign="top" class="dojoxColorPickerRightPad">\n\t\t\t\t\t\t\t\t\t<div dojoAttachPoint="previewNode" class="dojoxColorPickerPreview"></div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t<td valign="top">\n\t\t\t\t\t\t\t\t\t<div dojoAttachPoint="safePreviewNode" class="dojoxColorPickerWebSafePreview"></div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr>\n\t\t\t\t\t<td valign="bottom">\n\t\t\t\t\t\t<table class="dojoxColorPickerOptional" cellpadding="0" cellspacing="0">\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<div class="dijitInline dojoxColorPickerRgb" dojoAttachPoint="rgbNode">\n\t\t\t\t\t\t\t\t\t\t<table cellpadding="1" cellspacing="1">\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for="${_uId}_r">${redLabel}</label></td><td><input id="${_uId}_r" dojoAttachPoint="Rval" size="1" dojoAttachEvent="onchange: _colorInputChange"></td></tr>\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for="${_uId}_g">${greenLabel}</label></td><td><input id="${_uId}_g" dojoAttachPoint="Gval" size="1" dojoAttachEvent="onchange: _colorInputChange"></td></tr>\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for="${_uId}_b">${blueLabel}</label></td><td><input id="${_uId}_b" dojoAttachPoint="Bval" size="1" dojoAttachEvent="onchange: _colorInputChange"></td></tr>\n\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<div class="dijitInline dojoxColorPickerHsv" dojoAttachPoint="hsvNode">\n\t\t\t\t\t\t\t\t\t\t<table cellpadding="1" cellspacing="1">\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for="${_uId}_h">${hueLabel}</label></td><td><input id="${_uId}_h" dojoAttachPoint="Hval"size="1" dojoAttachEvent="onchange: _colorInputChange"> ${degLabel}</td></tr>\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for="${_uId}_s">${saturationLabel}</label></td><td><input id="${_uId}_s" dojoAttachPoint="Sval" size="1" dojoAttachEvent="onchange: _colorInputChange"> ${percentSign}</td></tr>\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for="${_uId}_v">${valueLabel}</label></td><td><input id="${_uId}_v" dojoAttachPoint="Vval" size="1" dojoAttachEvent="onchange: _colorInputChange"> ${percentSign}</td></tr>\n\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\t\t\t\t<div class="dojoxColorPickerHex" dojoAttachPoint="hexNode" aria-live="polite">\t\n\t\t\t\t\t\t\t\t\t\t<label for="${_uId}_hex">&nbsp;${hexLabel}&nbsp;</label><input id="${_uId}_hex" dojoAttachPoint="hexCode, focusNode, valueNode" size="6" class="dojoxColorPickerHexCode" dojoAttachEvent="onchange: _colorInputChange">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t</table>\n\t\t</td>\n\t</tr>\n</table>\n\n'),
postMixInProperties:function(){if(dojo.hasClass(dojo.body(),"dijit_a11y"))this._huePickerPointer=this._huePickerPointerAlly;this._uId=dijit.getUniqueId(this.id);dojo.mixin(this,dojo.i18n.getLocalization("dojox.widget","ColorPicker"));dojo.mixin(this,dojo.i18n.getLocalization("dojo.cldr","number"));this.inherited(arguments)},postCreate:function(){this.inherited(arguments);if(b.isIE<7)this.colorUnderlay.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this._underlay+"', sizingMethod='scale')",
this.colorUnderlay.src=this._blankGif.toString();if(!this.showRgb)this.rgbNode.style.visibility="hidden";if(!this.showHsv)this.hsvNode.style.visibility="hidden";if(!this.showHex)this.hexNode.style.visibility="hidden";if(!this.webSafe)this.safePreviewNode.style.visibility="hidden"},startup:function(){if(!this._started)this._started=!0,this.set("value",this.value),this._mover=new b.dnd.move.boxConstrainedMoveable(this.cursorNode,{box:{t:-(this.PICKER_SAT_SELECTOR_H/2),l:-(this.PICKER_SAT_SELECTOR_W/
2),w:this.PICKER_SAT_VAL_W,h:this.PICKER_SAT_VAL_H}}),this._hueMover=new b.dnd.move.boxConstrainedMoveable(this.hueCursorNode,{box:{t:-(this.PICKER_HUE_SELECTOR_H/2),l:0,w:0,h:this.PICKER_HUE_H}}),this._subs=[],this._subs.push(b.subscribe("/dnd/move/stop",b.hitch(this,"_clearTimer"))),this._subs.push(b.subscribe("/dnd/move/start",b.hitch(this,"_setTimer"))),this._keyListeners=[],this._connects.push(dijit.typematic.addKeyListener(this.hueCursorNode,{charOrCode:dojo.keys.UP_ARROW,shiftKey:!1,metaKey:!1,
ctrlKey:!1,altKey:!1},this,dojo.hitch(this,this._updateHueCursorNode),25,25)),this._connects.push(dijit.typematic.addKeyListener(this.hueCursorNode,{charOrCode:dojo.keys.DOWN_ARROW,shiftKey:!1,metaKey:!1,ctrlKey:!1,altKey:!1},this,dojo.hitch(this,this._updateHueCursorNode),25,25)),this._connects.push(dijit.typematic.addKeyListener(this.cursorNode,{charOrCode:dojo.keys.UP_ARROW,shiftKey:!1,metaKey:!1,ctrlKey:!1,altKey:!1},this,dojo.hitch(this,this._updateCursorNode),25,25)),this._connects.push(dijit.typematic.addKeyListener(this.cursorNode,
{charOrCode:dojo.keys.DOWN_ARROW,shiftKey:!1,metaKey:!1,ctrlKey:!1,altKey:!1},this,dojo.hitch(this,this._updateCursorNode),25,25)),this._connects.push(dijit.typematic.addKeyListener(this.cursorNode,{charOrCode:dojo.keys.LEFT_ARROW,shiftKey:!1,metaKey:!1,ctrlKey:!1,altKey:!1},this,dojo.hitch(this,this._updateCursorNode),25,25)),this._connects.push(dijit.typematic.addKeyListener(this.cursorNode,{charOrCode:dojo.keys.RIGHT_ARROW,shiftKey:!1,metaKey:!1,ctrlKey:!1,altKey:!1},this,dojo.hitch(this,this._updateCursorNode),
25,25))},_setValueAttr:function(a){this._started&&this.setColor(a,!0)},setColor:function(a,d){var c=dojox.color.fromString(a);this._updatePickerLocations(c);this._updateColorInputs(c);this._updateValue(c,d)},_setTimer:function(a){dijit.focus(a.node);b.setSelectable(this.domNode,!1);this._timer=setInterval(b.hitch(this,"_updateColor"),45)},_clearTimer:function(){clearInterval(this._timer);this._timer=null;this.onChange(this.value);b.setSelectable(this.domNode,!0)},_setHue:function(a){b.style(this.colorUnderlay,
"backgroundColor",dojox.color.fromHsv(a,100,100).toHex())},_updateHueCursorNode:function(a,d,c){if(a!==-1){a=dojo.style(this.hueCursorNode,"top");d=this.PICKER_HUE_SELECTOR_H/2;a+=d;var b=!1;c.charOrCode==dojo.keys.UP_ARROW?a>0&&(a-=1,b=!0):c.charOrCode==dojo.keys.DOWN_ARROW&&a<this.PICKER_HUE_H&&(a+=1,b=!0);a-=d;b&&dojo.style(this.hueCursorNode,"top",a+"px")}else this._updateColor(!0)},_updateCursorNode:function(a,d,c){var d=this.PICKER_SAT_SELECTOR_H/2,b=this.PICKER_SAT_SELECTOR_W/2;if(a!==-1){var a=
dojo.style(this.cursorNode,"top"),e=dojo.style(this.cursorNode,"left");a+=d;e+=b;var f=!1;c.charOrCode==dojo.keys.UP_ARROW?a>0&&(a-=1,f=!0):c.charOrCode==dojo.keys.DOWN_ARROW?a<this.PICKER_SAT_VAL_H&&(a+=1,f=!0):c.charOrCode==dojo.keys.LEFT_ARROW?e>0&&(e-=1,f=!0):c.charOrCode==dojo.keys.RIGHT_ARROW&&e<this.PICKER_SAT_VAL_W&&(e+=1,f=!0);f&&(a-=d,e-=b,dojo.style(this.cursorNode,"top",a+"px"),dojo.style(this.cursorNode,"left",e+"px"))}else this._updateColor(!0)},_updateColor:function(){var a=this.PICKER_HUE_SELECTOR_H/
2,d=this.PICKER_SAT_SELECTOR_H/2,c=this.PICKER_SAT_SELECTOR_W/2,a=b.style(this.hueCursorNode,"top")+a,d=b.style(this.cursorNode,"top")+d,c=b.style(this.cursorNode,"left")+c,a=Math.round(360-a/this.PICKER_HUE_H*360),c=dojox.color.fromHsv(a,c/this.PICKER_SAT_VAL_W*100,100-d/this.PICKER_SAT_VAL_H*100);this._updateColorInputs(c);this._updateValue(c,!0);a!=this._hue&&this._setHue(a)},_colorInputChange:function(a){var b,c=!1;switch(a.target){case this.hexCode:b=dojox.color.fromString(a.target.value);c=
!0;break;case this.Rval:case this.Gval:case this.Bval:b=dojox.color.fromArray([this.Rval.value,this.Gval.value,this.Bval.value]);c=!0;break;case this.Hval:case this.Sval:case this.Vval:b=dojox.color.fromHsv(this.Hval.value,this.Sval.value,this.Vval.value),c=!0}c&&(this._updatePickerLocations(b),this._updateColorInputs(b),this._updateValue(b,!0))},_updateValue:function(a,b){var c=a.toHex();this.value=this.valueNode.value=c;if(b&&(!this._timer||this.liveUpdate))this.onChange(c)},_updatePickerLocations:function(a){var d=
this.PICKER_HUE_SELECTOR_H/2,c=this.PICKER_SAT_SELECTOR_H/2,g=this.PICKER_SAT_SELECTOR_W/2,a=a.toHsv(),d=Math.round(this.PICKER_HUE_H-a.h/360*this.PICKER_HUE_H)-d,g=Math.round(a.s/100*this.PICKER_SAT_VAL_W)-g,c=Math.round(this.PICKER_SAT_VAL_H-a.v/100*this.PICKER_SAT_VAL_H)-c;this.animatePoint?(b.fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:d,left:0}).play(),b.fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:c,left:g}).play()):(b.style(this.hueCursorNode,"top",
d+"px"),b.style(this.cursorNode,{left:g+"px",top:c+"px"}));a.h!=this._hue&&this._setHue(a.h)},_updateColorInputs:function(a){var b=a.toHex();if(this.showRgb)this.Rval.value=a.r,this.Gval.value=a.g,this.Bval.value=a.b;if(this.showHsv)a=a.toHsv(),this.Hval.value=Math.round(a.h),this.Sval.value=Math.round(a.s),this.Vval.value=Math.round(a.v);if(this.showHex)this.hexCode.value=b;this.previewNode.style.backgroundColor=b;if(this.webSafe)this.safePreviewNode.style.backgroundColor=b},_setHuePoint:function(a){a=
a.layerY-this.PICKER_HUE_SELECTOR_H/2;this.animatePoint?b.fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:a,left:0,onEnd:b.hitch(this,function(){this._updateColor(!0);dijit.focus(this.hueCursorNode)})}).play():(b.style(this.hueCursorNode,"top",a+"px"),this._updateColor(!1))},_setPoint:function(a){var d=a.layerY-this.PICKER_SAT_SELECTOR_H/2,c=a.layerX-this.PICKER_SAT_SELECTOR_W/2;a&&dijit.focus(a.target);this.animatePoint?b.fx.slideTo({node:this.cursorNode,duration:this.slideDuration,
top:d,left:c,onEnd:b.hitch(this,function(){this._updateColor(!0);dijit.focus(this.cursorNode)})}).play():(b.style(this.cursorNode,{left:c+"px",top:d+"px"}),this._updateColor(!1))},_handleKey:function(){},focus:function(){this._focused||dijit.focus(this.focusNode)},_stopDrag:function(a){dojo.stopEvent(a)},destroy:function(){this.inherited(arguments);dojo.forEach(this._subs,function(a){dojo.unsubscribe(a)});delete this._subs}})}(dojo));