"use strict";(self.webpackChunkmap_component_react_app=self.webpackChunkmap_component_react_app||[]).push([[18],{2018:(e,n,o)=>{o.r(n);var t=o(2491),r=o.n(t),a=o(7673),i=o.n(a),c=o(3379),s=o.n(c),l=o(7795),m=o.n(l),u=o(569),d=o.n(u),f=o(3565),p=o.n(f),w=o(9216),g=o.n(w),v=o(4589),Z=o.n(v),b=o(8285),L={};L.styleTagTransform=Z(),L.setAttributes=p(),L.insert=d().bind(null,"head"),L.domAPI=m(),L.insertStyleElement=g(),s()(b.Z,L),b.Z&&b.Z.locals&&b.Z.locals;var _=o(8280),E=o(649),h=o(2914),R=o(3876),y=o(668),k=o(7354),O=o(3218),T=o(161),x=o(767),A=o(1219),I=o(8185),S=o(6898),C=o(2300),z=(o(6626),window&&window.__env),G={TEST:z.TEST,OL_LAYER_URL:z.OL_LAYER_URL,GOOGLE_CLIENT_ID:z.GOOGLE_CLIENT_ID};Object.freeze(G);var N=void 0,P=JSON.parse(localStorage.getItem("user-token"));(0,C.eL)();var q=new S.Z({strokeStyle:new x.Z({color:"rgba(255,120,0,0.9)",width:2,lineDash:[.5,4]}),showLabels:!0,wrapX:!0}),D=new k.Z({format:new O.Z,loader:function(e,n,o,t,r){D.removeLoadedExtent(e);var a=G.OL_LAYER_URL+"?bbox="+e.join(","),i=new XMLHttpRequest;i.open("GET",a),i.setRequestHeader("Authorization","Bearer "+P.access_token);var c=function(){D.removeLoadedExtent(e),r()};i.onerror=c,i.onload=function(){if(200===i.status){var e=D.getFormat().readFeatures(i.responseText);D.addFeatures(e),t(e)}else c()},i.send()},strategy:T.VW,overlaps:!1}),F=new R.Z({source:D,style:new A.ZP({fill:new I.Z({color:"rgba(255,255,255,0.2)"}),stroke:new x.Z({color:"rgba(0,0,255,0.3)"})}),maxZoom:14,minZoom:8});const H=function(e){var n=e.mapIsReadyCallback,o=(0,t.useRef)(null),a=function(e){new E.Z({target:document.querySelectorAll([".map-container"])[0],eventListeners:{moveend:function(e){N.$emit("moveend",e)},click:function(e){N.$emit("click",e)},pointermove:function(e){N.$emit("pointermove",e)}},layers:[new h.Z({source:new y.Z}),q,F],view:new _.ZP({zoom:10,maxZoom:14,minZoom:8,center:[e.coords.longitude,e.coords.latitude],constrainResolution:!0})})};return(0,t.useEffect)((function(){navigator.geolocation.getCurrentPosition((function(e){a(e)}),(function(e){console.warn("ERROR(".concat(e.code,"): ").concat(e.message)),a({coords:{latitude:51.505,longitude:-.09}})}),{enableHighAccuracy:!1,timeout:5e3,maximumAge:0}),n("my map")}),[n]),r().createElement("div",{className:"map-container",ref:o})};i().render(r().createElement(H,null),document.getElementById("root"))},8285:(e,n,o)=>{o.d(n,{Z:()=>a});var t=o(3645),r=o.n(t)()((function(e){return e[1]}));r.push([e.id,'*{margin:0;padding:0;box-sizing:border-box;font-size:1rem;font-family:"Roboto",sans-serif}body{background-color:#f5f5f5}.map-wrapper{height:100vh;width:100vw}.map-container{height:100%;width:100%}',""]);const a=r}}]);