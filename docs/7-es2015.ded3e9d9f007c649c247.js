(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"5ZWO":function(n,l,t){"use strict";t.r(l);var o=t("8Y7J");class e{}var a=t("pMnS"),u=t("j6P5"),i=t("jzJ8"),c=t("SVse"),s=t("JX91"),r=t("vkgz"),b=t("WvC+"),p=t("faFn"),g=t("O4YN");class h{constructor(n,l,t){this.weather=n,this.locationManagement=l,this.seo=t}ngOnInit(){if(this.seo.setPageTitle("Weather App | \u041c\u043e\u0438 \u043c\u0435\u0441\u0442\u0430"),this.seo.setPageDescription(""),this.seo.setMetaRobots("noindex, nofollow"),localStorage.getItem("locations")&&(this.locationManagement.locations=JSON.parse(localStorage.getItem("locations"))),this.locationManagement.locations.length){let n="";this.locationManagement.locations.forEach((l,t,o)=>{n+=t!==o.length-1?l.id.toString()+",":l.id.toString()}),this.groupWeatherData$=this.weather.getGroupWeatherData(n).pipe(Object(s.a)({cnt:0,list:new Array(this.locationManagement.locations.length)}),Object(r.a)(n=>this.locationManagement.groupWeatherData=n))}}trackByFn(n,l){return n}}var m=o.nb({encapsulation:0,styles:[[".location[_ngcontent-%COMP%]:hover:not(.ghost){box-shadow:.3em .4em 1.4em -.4em var(--dark);-webkit-transition:box-shadow .2s ease-in;transition:box-shadow .2s ease-in}"]],data:{}});function f(n){return o.Jb(0,[(n()(),o.pb(0,0,null,null,2,null,null,null,null,null,null,null)),(n()(),o.pb(1,0,null,null,1,"p",[["class","text-center"]],null,null,null,null,null)),(n()(),o.Hb(-1,null,['\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u0443\u0441\u0442! \u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0445\u043e\u0442\u044f \u0431\u044b \u043e\u0434\u043d\u043e \u043c\u0435\u0441\u0442\u043e \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a\u043d\u043e\u043f\u043a\u0438 "+" \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u043f\u0440\u043e\u0433\u043d\u043e\u0437\u0430.']))],null,null)}function d(n){return o.Jb(0,[(n()(),o.pb(0,0,null,null,2,null,null,null,null,null,null,null)),(n()(),o.pb(1,0,null,null,1,"location-card",[["class","location col-6 col-md-4 col-lg-3 col-xl-2 mb-3"]],[[2,"mr-lg-2",null],[2,"ghost",null]],[[null,"open"],[null,"close"]],function(n,l,t){var o=!0,e=n.component;return"open"===l&&(o=!1!==e.locationManagement.getData(null==n.context.$implicit?null:n.context.$implicit.id)&&o),"close"===l&&(o=!1!==e.locationManagement.delete(null==n.context.$implicit?null:n.context.$implicit.name)&&o),o},u.c,u.b)),o.ob(2,114688,null,0,i.a,[],{location:[0,"location"],enableClosing:[1,"enableClosing"]},{close:"close",open:"open"})],function(n,l){n(l,2,0,l.context.$implicit,!0)},function(n,l){n(l,1,0,!l.context.last,!l.context.$implicit)})}function M(n){return o.Jb(0,[(n()(),o.eb(16777216,null,null,2,null,d)),o.ob(1,278528,null,0,c.l,[o.M,o.J,o.q],{ngForOf:[0,"ngForOf"],ngForTrackBy:[1,"ngForTrackBy"]},null),o.Bb(131072,c.b,[o.h]),(n()(),o.eb(0,null,null,0))],function(n,l){var t,e=l.component;n(l,1,0,null==(t=o.Ib(l,1,0,o.Ab(l,2).transform(e.groupWeatherData$)))?null:t.list,e.trackByFn)},null)}function w(n){return o.Jb(0,[(n()(),o.pb(0,0,null,null,3,"div",[["class","row justify-content-md-center pt-2"]],null,null,null,null,null)),(n()(),o.eb(16777216,null,null,1,null,f)),o.ob(2,16384,null,0,c.m,[o.M,o.J],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(n()(),o.eb(0,[["locationsTemplate",2]],null,0,null,M))],function(n,l){n(l,2,0,!l.component.locationManagement.locations.length,o.Ab(l,3))},null)}function x(n){return o.Jb(0,[(n()(),o.pb(0,0,null,null,1,"app-locations",[],null,null,null,w,m)),o.ob(1,114688,null,0,h,[b.a,p.a,g.a],null,null)],function(n,l){n(l,1,0)},null)}var v=o.lb("app-locations",h,x,{},{},[]),J=t("PCNd"),z=t("iInd");const k=()=>t.e(2).then(t.bind(null,"RWMx")).then(n=>n.LocationDetailsModuleNgFactory);class y{}t.d(l,"LocationsModuleNgFactory",function(){return F});var F=o.mb(e,[],function(n){return o.yb([o.zb(512,o.j,o.X,[[8,[a.a,v]],[3,o.j],o.v]),o.zb(4608,c.o,c.n,[o.s,[2,c.z]]),o.zb(1073742336,c.c,c.c,[]),o.zb(1073742336,J.a,J.a,[]),o.zb(1073742336,z.o,z.o,[[2,z.t],[2,z.k]]),o.zb(1073742336,y,y,[]),o.zb(1073742336,e,e,[]),o.zb(1024,z.i,function(){return[[{path:"",component:h,children:[{path:"locations/:currentLocation",loadChildren:k}]}]]},[])])})}}]);