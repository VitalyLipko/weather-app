function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"9ynF":function(e,t,n){"use strict";n.r(t);var i=n("PCNd"),r=n("tyNb"),o=n("ofXK"),a=n("JX91"),s=n("vkgz"),c=n("dJ3e"),l=n("fXoL"),f=n("Xn/w"),u=n("psEu"),v=n("st2m");function h(e,t){1&e&&(l.Pb(0,"div",3),l.Pb(1,"alert",4),l.Pb(2,"span",5),l.Lb(3,"i",6),l.Pb(4,"span"),l.tc(5,"\u041d\u0435\u0442 \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u043d\u044b\u0445 \u043c\u0435\u0441\u0442"),l.Ob(),l.Ob(),l.Ob(),l.Ob())}var b=function(e,t){return{"mr-lg-2":e,ghost:t}};function g(e,t){if(1&e){var n=l.Qb();l.Nb(0),l.Pb(1,"wa-location-card",9),l.Xb("open",(function(){l.oc(n);var e=t.$implicit;return l.Zb(2).favoritesService.getData(null==e?null:e.id)}))("close",(function(){l.oc(n);var e=t.$implicit;return l.Zb(2).favoritesService.delete(null==e?null:e.name)})),l.Ob(),l.Mb()}if(2&e){var i=t.$implicit,r=t.last;l.zb(1),l.gc("location",i)("enableClosing",!0)("ngClass",l.kc(3,b,!r,!i))}}function p(e,t){if(1&e&&(l.Pb(0,"div",7),l.rc(1,g,2,6,"ng-container",8),l.ac(2,"async"),l.Ob()),2&e){var n,i=l.Zb(),r=null==(n=l.bc(2,2,i.groupWeatherData$))?null:n.list;l.zb(1),l.gc("ngForOf",r)("ngForTrackBy",i.trackByFn)}}var d,m,w=[{path:"",component:(d=function(){function e(t,n,i){var r=this;_classCallCheck(this,e),this.weather=t,this.favoritesService=n,this.seo=i,this.favoritesIds="",this.favoritesService.favorites.length&&this.favoritesService.favorites.forEach((function(e,t,n){r.favoritesIds+=t!==n.length-1?e.id.toString()+",":e.id.toString()}))}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.seo.setPageTitle("Weather App | \u041c\u043e\u0438 \u043c\u0435\u0441\u0442\u0430"),this.seo.setPageDescription(""),this.seo.setMetaRobots("noindex, nofollow"),this.favoritesIds&&(this.groupWeatherData$=this.weather.getGroupWeatherData(this.favoritesIds).pipe(Object(a.a)({cnt:0,list:new Array(this.favoritesService.favorites.length)}),Object(s.a)((function(t){return e.favoritesService.groupWeatherData=t}))))}},{key:"trackByFn",value:function(e,t){var n;return e||(null===(n=t)||void 0===n?void 0:n.id)}}]),e}(),d.\u0275fac=function(e){return new(e||d)(l.Kb(c.e),l.Kb(c.a),l.Kb(c.d))},d.\u0275cmp=l.Eb({type:d,selectors:[["wa-favorites"]],decls:5,vars:2,consts:[[1,"favorites-container"],["class","alert-container row justify-content-center align-items-center",4,"ngIf","ngIfElse"],["locationsTemplate",""],[1,"alert-container","row","justify-content-center","align-items-center"],["type","info"],[1,"alert-heading"],[1,"fas","fa-exclamation-circle","mr-2"],[1,"row","justify-content-md-center","pt-2"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"location","align-items-start","col-6","col-md-4","col-lg-3","col-xl-2","mb-3",3,"location","enableClosing","ngClass","open","close"]],template:function(e,t){if(1&e&&(l.Pb(0,"wa-layout"),l.Pb(1,"div",0),l.rc(2,h,6,0,"div",1),l.rc(3,p,3,4,"ng-template",null,2,l.sc),l.Ob(),l.Ob()),2&e){var n=l.mc(4);l.zb(2),l.gc("ngIf",!t.favoritesService.favorites.length)("ngIfElse",n)}},directives:[f.a,o.n,u.a,o.m,v.a,o.l],pipes:[o.b],styles:[".favorites-container[_ngcontent-%COMP%]{min-height:calc(100vh - 152px)}.favorites-container[_ngcontent-%COMP%]   .alert-container[_ngcontent-%COMP%]{min-height:inherit}.location[_ngcontent-%COMP%]:hover:not(.ghost){box-shadow:.3em .4em 1.4em -.4em var(--dark);-webkit-transition:box-shadow .2s ease-in;transition:box-shadow .2s ease-in}"]}),d),children:[{path:"favorites/:currentLocation",loadChildren:function(){return n.e(3).then(n.bind(null,"Xrf6")).then((function(e){return e.LocationDetailsModule}))}}]}],y=((m=function e(){_classCallCheck(this,e)}).\u0275mod=l.Ib({type:m}),m.\u0275inj=l.Hb({factory:function(e){return new(e||m)},imports:[[o.c,r.e.forChild(w)],r.e]}),m);n.d(t,"FavoritesModule",(function(){return P}));var C,P=((C=function e(){_classCallCheck(this,e)}).\u0275mod=l.Ib({type:C}),C.\u0275inj=l.Hb({factory:function(e){return new(e||C)},imports:[[i.a,y]]}),C)}}]);