/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.charting.axis2d.Default"]||(dojo._hasResource["dojox.charting.axis2d.Default"]=!0,dojo.provide("dojox.charting.axis2d.Default"),dojo.require("dojox.charting.axis2d.Invisible"),dojo.require("dojox.charting.scaler.linear"),dojo.require("dojox.charting.axis2d.common"),dojo.require("dojo.colors"),dojo.require("dojo.string"),dojo.require("dojox.gfx"),dojo.require("dojox.lang.functional"),dojo.require("dojox.lang.utils"),function(){var x=dojox.charting,y=dojox.lang.utils,p=dojox.gfx,
J=x.scaler.linear;dojo.declare("dojox.charting.axis2d.Default",dojox.charting.axis2d.Invisible,{defaultParams:{vertical:!1,fixUpper:"none",fixLower:"none",natural:!1,leftBottom:!0,includeZero:!1,fixed:!0,majorLabels:!0,minorTicks:!0,minorLabels:!0,microTicks:!1,rotation:0,htmlLabels:!0},optionalParams:{min:0,max:1,from:0,to:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],labelFunc:null,maxLabelSize:0,maxLabelCharCount:0,trailingSymbol:null,stroke:{},majorTick:{},minorTick:{},microTick:{},
tick:{},font:"",fontColor:"",title:"",titleGap:0,titleFont:"",titleFontColor:"",titleOrientation:""},constructor:function(g,b){this.opt=dojo.clone(this.defaultParams);y.updateWithObject(this.opt,b);y.updateWithPattern(this.opt,b,this.optionalParams)},getOffsets:function(){var g=this.scaler,b={l:0,r:0,t:0,b:0};if(!g)return b;var e=this.opt,a=0,f=x.scaler.common.getNumericLabel,k=g.major,g=g.minor,i=this.chart.theme.axis,o=e.font||i.majorTick&&i.majorTick.font||i.tick&&i.tick.font,m=e.titleFont||i.tick&&
i.tick.titleFont,i=e.titleGap==0?0:e.titleGap||i.tick&&i.tick.titleGap||15,q=this.chart.theme.getTick("major",e),r=this.chart.theme.getTick("minor",e),d=o?p.normalizedLength(p.splitFontString(o).size):0,m=m?p.normalizedLength(p.splitFontString(m).size):0,j=e.rotation%360,h=e.leftBottom,c=Math.abs(Math.cos(j*Math.PI/180)),l=Math.abs(Math.sin(j*Math.PI/180));this.trailingSymbol=e.trailingSymbol===void 0||e.trailingSymbol===null?this.trailingSymbol:e.trailingSymbol;j<0&&(j+=360);if(d){a=this.labels?
this._groupLabelWidth(this.labels,o,e.maxLabelCharCount):this._groupLabelWidth([f(k.start,k.prec,e),f(k.start+k.count*k.tick,k.prec,e),f(g.start,g.prec,e),f(g.start+g.count*g.tick,g.prec,e)],o,e.maxLabelCharCount);a=e.maxLabelSize?Math.min(e.maxLabelSize,a):a;if(this.vertical)switch(f=h?"l":"r",j){case 0:case 180:b[f]=a;b.t=b.b=d/2;break;case 90:case 270:b[f]=d;b.t=b.b=a/2;break;default:j<=45||180<j&&j<=225?(b[f]=d*l/2+a*c,b[h?"t":"b"]=d*c/2+a*l,b[h?"b":"t"]=d*c/2):j>315||180>j&&j>135?(b[f]=d*l/2+
a*c,b[h?"b":"t"]=d*c/2+a*l,b[h?"t":"b"]=d*c/2):j<90||180<j&&j<270?(b[f]=d*l+a*c,b[h?"t":"b"]=d*c+a*l):(b[f]=d*l+a*c,b[h?"b":"t"]=d*c+a*l)}else switch(f=h?"b":"t",j){case 0:case 180:b[f]=d;b.l=b.r=a/2;break;case 90:case 270:b[f]=a;b.l=b.r=d/2;break;default:45<=j&&j<=90||225<=j&&j<=270?(b[f]=d*l/2+a*c,b[h?"r":"l"]=d*c/2+a*l,b[h?"l":"r"]=d*c/2):90<=j&&j<=135||270<=j&&j<=315?(b[f]=d*l/2+a*c,b[h?"l":"r"]=d*c/2+a*l,b[h?"r":"l"]=d*c/2):j<45||180<j&&j<135?(b[f]=d*l+a*c,b[h?"r":"l"]=d*c+a*l):(b[f]=d*l+a*c,
b[h?"l":"r"]=d*c+a*l)}b[f]+=4+Math.max(q.length,r.length)+(e.title?m+i:0)}if(a)this._cachedLabelWidth=a;return b},render:function(g,b){if(!this.dirty)return this;var e=this.opt,a=this.chart.theme.axis,f=e.leftBottom,k=e.rotation%360,i,o,m=0,q,r,d,j,h,c,l=e.font||a.majorTick&&a.majorTick.font||a.tick&&a.tick.font,B=e.titleFont||a.tick&&a.tick.titleFont,y=e.fontColor||a.majorTick&&a.majorTick.fontColor||a.tick&&a.tick.fontColor||"black",K=e.titleFontColor||a.tick&&a.tick.titleFontColor||"black";q=e.titleGap==
0?0:e.titleGap||a.tick&&a.tick.titleGap||15;var m=e.titleOrientation||a.tick&&a.tick.titleOrientation||"axis",z=this.chart.theme.getTick("major",e),A=this.chart.theme.getTick("minor",e),C=this.chart.theme.getTick("micro",e),L="stroke"in e?e.stroke:a.stroke,n=l?p.normalizedLength(p.splitFontString(l).size):0;d=Math.abs(Math.cos(k*Math.PI/180));var G=Math.abs(Math.sin(k*Math.PI/180)),w=B?p.normalizedLength(p.splitFontString(B).size):0;k<0&&(k+=360);if(this.vertical){i={y:g.height-b.b};a={y:b.t};o={y:(g.height-
b.b+b.t)/2};q=n*G+(this._cachedLabelWidth||0)*d+4+Math.max(z.length,A.length)+w+q;r={x:0,y:-1};h={x:0,y:0};d={x:1,y:0};j={x:4,y:0};switch(k){case 0:c="end";h.y=n*0.4;break;case 90:c="middle";h.x=-n;break;case 180:c="start";h.y=-n*0.4;break;case 270:c="middle";break;default:k<45?(c="end",h.y=n*0.4):k<90?(c="end",h.y=n*0.4):k<135?c="start":k<225?(c="start",h.y=-n*0.4):k<270?(c="start",h.x=f?0:n*0.4):k<315?(c="end",h.x=f?0:n*0.4):(c="end",h.y=n*0.4)}if(f)i.x=a.x=b.l,m=m&&m=="away"?90:270,o.x=b.l-q+(m==
270?w:0),d.x=-1,j.x=-j.x;else switch(i.x=a.x=g.width-b.r,m=m&&m=="axis"?90:270,o.x=g.width-b.r+q-(m==270?0:w),c){case "start":c="end";break;case "end":c="start";break;case "middle":h.x+=n}}else{i={x:b.l};a={x:g.width-b.r};o={x:(g.width-b.r+b.l)/2};q=n*d+(this._cachedLabelWidth||0)*G+4+Math.max(z.length,A.length)+w+q;r={x:1,y:0};h={x:0,y:0};d={x:0,y:1};j={x:0,y:4};switch(k){case 0:c="middle";h.y=n;break;case 90:c="start";h.x=-n*0.4;break;case 180:c="middle";break;case 270:c="end";h.x=n*0.4;break;default:k<
45?(c="start",h.y=f?n:0):k<135?(c="start",h.x=-n*0.4):k<180?(c="start",h.y=f?0:-n):k<225?(c="end",h.y=f?0:-n):k<315?(c="end",h.y=f?n*0.4:0):(c="end",h.y=f?n:0)}if(f)i.y=a.y=g.height-b.b,m=m&&m=="axis"?180:0,o.y=g.height-b.b+q-(m?w:0);else switch(i.y=a.y=b.t,m=m&&m=="away"?180:0,o.y=b.t-q+(m?0:w),d.y=-1,j.y=-j.y,c){case "start":c="end";break;case "end":c="start";break;case "middle":h.y-=n}}this.cleanGroup();try{var v=this.group,D=this.scaler,E=this.ticks,H,F=J.getTransformerFromModel(this.scaler),
u=!m&&!k&&this.opt.htmlLabels&&!dojo.isIE&&!dojo.isOpera?"html":"gfx",s=d.x*z.length,t=d.y*z.length;v.createLine({x1:i.x,y1:i.y,x2:a.x,y2:a.y}).setStroke(L);if(e.title){var I=x.axis2d.common.createText[u](this.chart,v,o.x,o.y,"middle",e.title,B,K);u=="html"?this.htmlElements.push(I):I.setTransform(p.matrix.rotategAt(m,o.x,o.y))}dojo.forEach(E.major,function(b){var a=F(b.value),d=i.x+r.x*a,f=i.y+r.y*a;v.createLine({x1:d,y1:f,x2:d+s,y2:f+t}).setStroke(z);if(b.label){var g=e.maxLabelCharCount?this.getTextWithLimitCharCount(b.label,
l,e.maxLabelCharCount):{text:b.label,truncated:!1},g=e.maxLabelSize?this.getTextWithLimitLength(g.text,l,e.maxLabelSize,g.truncated):g,a=x.axis2d.common.createText[u](this.chart,v,d+s+j.x+(k?0:h.x),f+t+j.y+(k?0:h.y),c,g.text,l,y);g.truncated&&this.labelTooltip(a,this.chart,b.label,g.text,l,u);u=="html"?this.htmlElements.push(a):k&&a.setTransform([{dx:h.x,dy:h.y},p.matrix.rotategAt(k,d+s+j.x,f+t+j.y)])}},this);s=d.x*A.length;t=d.y*A.length;H=D.minMinorStep<=D.minor.tick*D.bounds.scale;dojo.forEach(E.minor,
function(b){var a=F(b.value),d=i.x+r.x*a,f=i.y+r.y*a;v.createLine({x1:d,y1:f,x2:d+s,y2:f+t}).setStroke(A);if(H&&b.label){var g=e.maxLabelCharCount?this.getTextWithLimitCharCount(b.label,l,e.maxLabelCharCount):{text:b.label,truncated:!1},g=e.maxLabelSize?this.getTextWithLimitLength(g.text,l,e.maxLabelSize,g.truncated):g,a=x.axis2d.common.createText[u](this.chart,v,d+s+j.x+(k?0:h.x),f+t+j.y+(k?0:h.y),c,g.text,l,y);g.truncated&&this.labelTooltip(a,this.chart,b.label,g.text,l,u);u=="html"?this.htmlElements.push(a):
k&&a.setTransform([{dx:h.x,dy:h.y},p.matrix.rotategAt(k,d+s+j.x,f+t+j.y)])}},this);s=d.x*C.length;t=d.y*C.length;dojo.forEach(E.micro,function(b){var a=F(b.value),b=i.x+r.x*a,a=i.y+r.y*a;v.createLine({x1:b,y1:a,x2:b+s,y2:a+t}).setStroke(C)},this)}catch(M){}this.dirty=!1;return this},labelTooltip:function(g,b,e,a,f,k){if(dijit&&dijit.Tooltip){var i={type:"rect"},o=["above","below"],a=dojox.gfx._base._getTextBox(a,{font:f}).w||0;fontHeight=f?p.normalizedLength(p.splitFontString(f).size):0;k=="html"?
(dojo.mixin(i,dojo.coords(g.firstChild,!0)),i.width=Math.ceil(a),i.height=Math.ceil(fontHeight),this._events.push({shape:dojo,handle:dojo.connect(g.firstChild,"onmouseover",this,function(){dijit.showTooltip(e,i,o)})}),this._events.push({shape:dojo,handle:dojo.connect(g.firstChild,"onmouseout",this,function(){dijit.hideTooltip(i)})})):(f=g.getShape(),b=dojo.coords(b.node,!0),i=dojo.mixin(i,{x:f.x-a/2,y:f.y}),i.x+=b.x,i.y+=b.y,i.x=Math.round(i.x),i.y=Math.round(i.y),i.width=Math.ceil(a),i.height=Math.ceil(fontHeight),
this._events.push({shape:g,handle:g.connect("onmouseenter",this,function(){dijit.showTooltip(e,i,o)})}),this._events.push({shape:g,handle:g.connect("onmouseleave",this,function(){dijit.hideTooltip(i)})}))}}})}());