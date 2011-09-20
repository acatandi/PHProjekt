/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojox.xmpp.sasl"])dojo._hasResource["dojox.xmpp.sasl"]=!0,dojo.provide("dojox.xmpp.sasl"),dojo.require("dojox.xmpp.util"),dojo.require("dojo.AdapterRegistry"),dojo.require("dojox.encoding.digests.MD5"),dojox.xmpp.sasl.saslNS="urn:ietf:params:xml:ns:xmpp-sasl",dojo.declare("dojox.xmpp.sasl._Base",null,{mechanism:null,closeAuthTag:!0,constructor:function(a){this.session=a;this.startAuth()},startAuth:function(){var a=new dojox.string.Builder(dojox.xmpp.util.createElement("auth",
{xmlns:dojox.xmpp.sasl.saslNS,mechanism:this.mechanism},this.closeAuthTag));this.appendToAuth(a);this.session.dispatchPacket(a.toString())},appendToAuth:function(){},onChallenge:function(a){if(this.first_challenge)this.onSecondChallenge(a);else this.first_challenge=!0,this.onFirstChallenge(a)},onFirstChallenge:function(){},onSecondChallenge:function(){},onSuccess:function(){this.session.sendRestart()}}),dojo.declare("dojox.xmpp.sasl.SunWebClientAuth",dojox.xmpp.sasl._Base,{mechanism:"SUN-COMMS-CLIENT-PROXY-AUTH"}),
dojo.declare("dojox.xmpp.sasl.Plain",dojox.xmpp.sasl._Base,{mechanism:"PLAIN",closeAuthTag:!1,appendToAuth:function(a){var b=this.session.jid,c=this.session.jid.indexOf("@");c!=-1&&(b=this.session.jid.substring(0,c));b=this.session.jid+"\000"+b+"\000"+this.session.password;b=dojox.xmpp.util.Base64.encode(b);a.append(b);a.append("</auth>");delete this.session.password}}),dojo.declare("dojox.xmpp.sasl.DigestMD5",dojox.xmpp.sasl._Base,{mechanism:"DIGEST-MD5",onFirstChallenge:function(a){var b=dojox.encoding.digests,
c=dojox.encoding.digests.outputTypes,f=function(a){return b.MD5(a,c.Hex)},d={realm:"",nonce:"",qop:"auth",maxbuf:65536};dojox.xmpp.util.Base64.decode(a.firstChild.nodeValue).replace(/([a-z]+)=([^,]+)/g,function(a,b,c){c=c.replace(/^"(.+)"$/,"$1");d[b]=c});var g="";switch(d.qop){case "auth-int":case "auth-conf":g=":00000000000000000000000000000000";case "auth":break;default:return!1}var a=b.MD5(Math.random()*1234567890,c.Hex),j="xmpp/"+this.session.domain,h=this.session.jid,e=this.session.jid.indexOf("@");
e!=-1&&(h=this.session.jid.substring(0,e));var h=dojox.xmpp.util.encodeJid(h),i=new dojox.string.Builder;i.append(b.MD5(h+":"+d.realm+":"+this.session.password,c.String),":",d.nonce+":"+a);delete this.session.password;var g=":"+j+g,k="AUTHENTICATE"+g,e=new dojox.string.Builder;e.append(f(i.toString()),":",d.nonce,":00000001:",a,":",d.qop,":");i=new dojox.string.Builder;i.append('username="',h,'",','realm="',d.realm,'",',"nonce=",d.nonce,",",'cnonce="',a,'",','nc="00000001",qop="',d.qop,'",digest-uri="',
j,'",','response="',f(e.toString()+f(k)),'",charset="utf-8"');a=new dojox.string.Builder(dojox.xmpp.util.createElement("response",{xmlns:dojox.xmpp.xmpp.SASL_NS},!1));a.append(dojox.xmpp.util.Base64.encode(i.toString()));a.append("</response>");this.rspauth=f(e.toString()+f(g));this.session.dispatchPacket(a.toString())},onSecondChallenge:function(a){this.rspauth==dojox.xmpp.util.Base64.decode(a.firstChild.nodeValue).substring(8)&&this.session.dispatchPacket((new dojox.string.Builder(dojox.xmpp.util.createElement("response",
{xmlns:dojox.xmpp.xmpp.SASL_NS},!0))).toString())}}),dojox.xmpp.sasl.registry=new dojo.AdapterRegistry,dojox.xmpp.sasl.registry.register("SUN-COMMS-CLIENT-PROXY-AUTH",function(a){return a=="SUN-COMMS-CLIENT-PROXY-AUTH"},function(a,b){return new dojox.xmpp.sasl.SunWebClientAuth(b)}),dojox.xmpp.sasl.registry.register("DIGEST-MD5",function(a){return a=="DIGEST-MD5"},function(a,b){return new dojox.xmpp.sasl.DigestMD5(b)}),dojox.xmpp.sasl.registry.register("PLAIN",function(a){return a=="PLAIN"},function(a,
b){return new dojox.xmpp.sasl.Plain(b)});