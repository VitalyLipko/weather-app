(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{Xrf6:function(t,e,i){"use strict";i.r(e);var n=i("R0Ic"),a=i("fXoL");const s=[Object(n.h)({height:0,visibility:"hidden"}),Object(n.e)("400ms cubic-bezier(0.4,0.0,0.2,1)",Object(n.h)({height:"*",visibility:"visible"}))],o=[Object(n.h)({height:"*",visibility:"visible"}),Object(n.e)("400ms cubic-bezier(0.4,0.0,0.2,1)",Object(n.h)({height:0,visibility:"hidden"}))];let c=(()=>{class t{constructor(t,e,i){this._el=t,this._renderer=e,this.collapsed=new a.n,this.collapses=new a.n,this.expanded=new a.n,this.expands=new a.n,this.isExpanded=!0,this.isCollapsed=!1,this.isCollapse=!0,this.isCollapsing=!1,this.isAnimated=!1,this._display="block",this._stylesLoaded=!1,this._COLLAPSE_ACTION_NAME="collapse",this._EXPAND_ACTION_NAME="expand",this._factoryCollapseAnimation=i.build(o),this._factoryExpandAnimation=i.build(s)}set display(t){this.isAnimated?(this._display=t,"none"!==t?this.show():this.hide()):this._renderer.setStyle(this._el.nativeElement,"display",t)}set collapse(t){this._player&&!this._isAnimationDone||(this.isExpanded=t,this.toggle())}get collapse(){return this.isExpanded}ngAfterViewChecked(){this._stylesLoaded=!0,this._player&&this._isAnimationDone&&(this._player.reset(),this._renderer.setStyle(this._el.nativeElement,"height","*"))}toggle(){this.isExpanded?this.hide():this.show()}hide(){this.isCollapsing=!0,this.isExpanded=!1,this.isCollapsed=!0,this.isCollapsing=!1,this.collapses.emit(this),this._isAnimationDone=!1,this.animationRun(this.isAnimated,this._COLLAPSE_ACTION_NAME)(()=>{this._isAnimationDone=!0,this.collapsed.emit(this),this._renderer.setStyle(this._el.nativeElement,"display","none")})}show(){this._renderer.setStyle(this._el.nativeElement,"display",this._display),this.isCollapsing=!0,this.isExpanded=!0,this.isCollapsed=!1,this.isCollapsing=!1,this.expands.emit(this),this._isAnimationDone=!1,this.animationRun(this.isAnimated,this._EXPAND_ACTION_NAME)(()=>{this._isAnimationDone=!0,this.expanded.emit(this)})}animationRun(t,e){if(!t||!this._stylesLoaded)return t=>t();this._renderer.setStyle(this._el.nativeElement,"overflow","hidden"),this._renderer.addClass(this._el.nativeElement,"collapse");const i=e===this._EXPAND_ACTION_NAME?this._factoryExpandAnimation:this._factoryCollapseAnimation;return this._player&&this._player.destroy(),this._player=i.create(this._el.nativeElement),this._player.play(),t=>this._player.onDone(t)}}return t.\u0275fac=function(e){return new(e||t)(a.Kb(a.l),a.Kb(a.D),a.Kb(n.b))},t.\u0275dir=a.Fb({type:t,selectors:[["","collapse",""]],hostVars:10,hostBindings:function(t,e){2&t&&(a.Ab("aria-expanded",e.isExpanded)("aria-hidden",e.isCollapsed),a.Cb("collapse",e.isCollapse)("in",e.isExpanded)("show",e.isExpanded)("collapsing",e.isCollapsing))},inputs:{isAnimated:"isAnimated",display:"display",collapse:"collapse"},outputs:{collapsed:"collapsed",collapses:"collapses",expanded:"expanded",expands:"expands"},exportAs:["bs-collapse"]}),t})(),r=(()=>{class t{static forRoot(){return{ngModule:t,providers:[]}}}return t.\u0275mod=a.Ib({type:t}),t.\u0275inj=a.Hb({factory:function(e){return new(e||t)}}),t})();var l=i("PCNd"),d=i("tyNb"),h=i("ofXK"),b=i("quSY"),f=i("eIep"),p=i("8+oX"),m=i("dJ3e"),u=i("Xn/w");let g=(()=>{class t{constructor(t,e,i){this.favoritesService=t,this.elementRef=e,this.renderer=i}ngOnInit(){this.favoritesService.enablePagination()||this.renderer.removeChild(this.elementRef.nativeElement.parentNode,this.elementRef.nativeElement)}}return t.\u0275fac=function(e){return new(e||t)(a.Kb(m.a),a.Kb(a.l),a.Kb(a.D))},t.\u0275dir=a.Fb({type:t,selectors:[["","waLocationsPaginator",""]]}),t})();var w=i("Mfq2"),v=i("XNiG"),O=i("xgIS"),y=i("l7GE"),D=i("ZUHj");class P{constructor(t){this.notifier=t}call(t,e){const i=new x(t),n=Object(D.a)(i,this.notifier);return n&&!i.seenValue?(i.add(n),e.subscribe(i)):i}}class x extends y.a{constructor(t){super(t),this.seenValue=!1}notifyNext(t,e,i,n,a){this.seenValue=!0,this.complete()}notifyComplete(){}}var C=i("by69");function z(t,e){if(1&t&&(a.Pb(0,"div",23),a.Pb(1,"span"),a.tc(2),a.ac(3,"date"),a.Ob(),a.Lb(4,"img",24),a.Pb(5,"span"),a.tc(6),a.ac(7,"number"),a.Ob(),a.Ob()),2&t){const t=e.$implicit,i=a.Zb();a.zb(2),a.uc(a.dc(3,3,1e3*t.dt,"HH:mm",i.timezoneOffset,"ru")),a.zb(2),a.ic("src","assets/ico/weather-conditions/",t.weather[0].icon,".svg",a.pc),a.zb(2),a.vc("",a.cc(7,8,t.main.temp,"1.0-0"),"\xb0")}}function _(t,e){if(1&t&&(a.Nb(0),a.tc(1),a.ac(2,"weatherParams"),a.Mb()),2&t){const t=a.Zb();a.zb(1),a.vc(" , ",a.cc(2,1,t.weatherData.wind.deg,"wind")," ")}}let M=(()=>{class t{constructor(t,e){this.zone=t,this.cdr=e,this.isCollapsed=!0,this.unsubscribe=new v.a}ngOnInit(){this.calc(),this.zone.runOutsideAngular(()=>{return Object(O.a)(window,"resize").pipe((t=this.unsubscribe,e=>e.lift(new P(t)))).subscribe(()=>this.calc());var t})}ngOnDestroy(){this.unsubscribe.next(null),this.unsubscribe.complete()}calc(){document.documentElement.clientWidth>=752&&this.isCollapsed&&(this.isCollapsed=!1,this.cdr.detectChanges())}}return t.\u0275fac=function(e){return new(e||t)(a.Kb(a.z),a.Kb(a.h))},t.\u0275cmp=a.Eb({type:t,selectors:[["wa-weather"]],inputs:{weatherData:"weatherData",timezoneOffset:"timezoneOffset",forecastDay:"forecastDay"},decls:40,vars:31,consts:[["id","main-block",1,"col-md-7","text-center"],["id","current-weather",1,"d-inline-flex","flex-row","mb-md-2"],["id","current-weather-temp"],["id","current-weather-description"],["alt","\u0418\u043a\u043e\u043d\u043a\u0430 \u043f\u043e\u0433\u043e\u0434\u044b","id","current-weather-conditions-ico",1,"d-block",3,"src"],["id","current-weather-condition",1,"text-truncate",3,"tooltip"],["id","forecast-day",1,"mb-3","mb-md-0"],["class","forecast-day-hours",4,"ngFor","ngForOf"],["id","additional-block",1,"col-md-5","d-flex","flex-column"],["type","button","aria-controls","wrapper-param",1,"btn","btn-custom","btn-block","d-md-none","mb-3","rounded-pill",3,"click"],[1,"fas","fa-chevron-down"],["id","wrapper-param",1,"d-md-block",3,"collapse","isAnimated"],["id","wind"],["src","assets/ico/parameters/wind.svg","alt","\u0418\u043a\u043e\u043d\u043a\u0430 \u0432\u0435\u0442\u0440\u0430",1,"size-ico"],[4,"ngIf"],["id","humidity"],["src","assets/ico/parameters/humidity.svg","alt","\u0418\u043a\u043e\u043d\u043a\u0430 \u0433\u0438\u0433\u0440\u043e\u043c\u0435\u0442\u0440\u0430",1,"size-ico","mr-2"],["id","pressure"],["src","assets/ico/parameters/pressure.svg","alt","\u0418\u043a\u043e\u043d\u043a\u0430 \u0431\u0430\u0440\u043e\u043c\u0435\u0442\u0440\u0430",1,"size-ico"],["id","sunrise"],["src","assets/ico/parameters/sunrise.svg","alt","\u0418\u043a\u043e\u043d\u043a\u0430 \u0432\u043e\u0441\u0445\u043e\u0434\u0430",1,"size-ico"],["id","sunset"],["src","assets/ico/parameters/sunset.svg","alt","\u0418\u043a\u043e\u043d\u043a\u0430 \u0437\u0430\u043a\u0430\u0442\u0430",1,"size-ico"],[1,"forecast-day-hours"],["alt","\u0418\u043a\u043e\u043d\u043a\u0430 \u043f\u043e\u0433\u043e\u0434\u044b",1,"d-block","forecast-day-hours-img",3,"src"]],template:function(t,e){1&t&&(a.Pb(0,"div",0),a.Pb(1,"div",1),a.Pb(2,"span",2),a.tc(3),a.ac(4,"number"),a.Ob(),a.Pb(5,"div",3),a.Lb(6,"img",4),a.Pb(7,"span",5),a.tc(8),a.Ob(),a.Ob(),a.Ob(),a.Pb(9,"div",6),a.rc(10,z,8,11,"div",7),a.Ob(),a.Ob(),a.Pb(11,"div",8),a.Pb(12,"button",9),a.Xb("click",(function(){return e.isCollapsed=!e.isCollapsed})),a.Pb(13,"div"),a.Lb(14,"i",10),a.Ob(),a.Ob(),a.Pb(15,"div",11),a.Pb(16,"div",12),a.Lb(17,"img",13),a.Pb(18,"span"),a.tc(19),a.rc(20,_,3,4,"ng-container",14),a.Ob(),a.Ob(),a.Pb(21,"div",15),a.Lb(22,"img",16),a.Pb(23,"span"),a.tc(24),a.Ob(),a.Ob(),a.Pb(25,"div",17),a.Lb(26,"img",18),a.Pb(27,"span"),a.tc(28),a.ac(29,"weatherParams"),a.Ob(),a.Ob(),a.Pb(30,"div",19),a.Lb(31,"img",20),a.Pb(32,"span"),a.tc(33),a.ac(34,"date"),a.Ob(),a.Ob(),a.Pb(35,"div",21),a.Lb(36,"img",22),a.Pb(37,"span"),a.tc(38),a.ac(39,"date"),a.Ob(),a.Ob(),a.Ob(),a.Ob()),2&t&&(a.zb(3),a.vc("",a.cc(4,15,null==e.weatherData?null:e.weatherData.main.temp,"1.0-0"),"\xb0"),a.zb(3),a.ic("src","assets/ico/weather-conditions/",null==e.weatherData?null:e.weatherData.weather[0].icon,".svg",a.pc),a.zb(1),a.gc("tooltip",null==e.weatherData?null:e.weatherData.weather[0].description),a.zb(1),a.vc(" ",null==e.weatherData?null:e.weatherData.weather[0].description," "),a.zb(2),a.gc("ngForOf",e.forecastDay),a.zb(2),a.Ab("aria-expanded",!e.isCollapsed),a.zb(1),a.gc("@expandCollapseAnimation",e.isCollapsed?"collapse":"expand"),a.zb(2),a.gc("collapse",e.isCollapsed)("isAnimated",!0),a.zb(4),a.vc("",null==e.weatherData?null:e.weatherData.wind.speed," \u043c/\u0441 "),a.zb(1),a.gc("ngIf",null==e.weatherData?null:e.weatherData.wind.deg),a.zb(4),a.vc("",null==e.weatherData?null:e.weatherData.main.humidity,"%"),a.zb(4),a.vc("",a.cc(29,18,null==e.weatherData?null:e.weatherData.main.pressure,"pressure")," \u043c\u043c.\u0440\u0442.\u0441\u0442."),a.zb(5),a.uc(a.dc(34,21,1e3*(null==e.weatherData?null:e.weatherData.sys.sunrise),"HH:mm",e.timezoneOffset,"ru")),a.zb(5),a.uc(a.dc(39,26,1e3*(null==e.weatherData?null:e.weatherData.sys.sunset),"HH:mm",e.timezoneOffset,"ru")))},directives:[w.a,h.m,c,h.n],pipes:[h.f,C.a,h.e],styles:["#current-weather-temp[_ngcontent-%COMP%]{font-size:6.2em}#current-weather-conditions-ico[_ngcontent-%COMP%]{position:relative;top:1em}#current-weather-condition[_ngcontent-%COMP%]{display:block;position:relative;top:-.5em;max-width:346px;font-size:2em}@media (max-width:576px){#current-weather-condition[_ngcontent-%COMP%]{max-width:186px}}#forecast-day[_ngcontent-%COMP%]{overflow-y:auto;overflow-x:auto;white-space:nowrap}#forecast-day[_ngcontent-%COMP%]   .forecast-day-hours[_ngcontent-%COMP%]{display:inline-block}#forecast-day[_ngcontent-%COMP%]   .forecast-day-hours-img[_ngcontent-%COMP%]{width:4em}#additional-block[_ngcontent-%COMP%]{font-size:1.5em}#additional-block[_ngcontent-%COMP%]   .size-ico[_ngcontent-%COMP%]{height:3em}#additional-block[_ngcontent-%COMP%]   #humidity[_ngcontent-%COMP%]{position:relative;left:.5em}#additional-block[_ngcontent-%COMP%]   #humidity[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{left:2.1em;height:2em}#additional-block[_ngcontent-%COMP%]   #sunrise[_ngcontent-%COMP%]{position:relative;top:-.5em}#additional-block[_ngcontent-%COMP%]   #sunset[_ngcontent-%COMP%]{position:relative;top:-1em}"],data:{animation:[p.b]},changeDetection:0}),t})();function k(t,e){if(1&t&&(a.Pb(0,"div",3),a.Pb(1,"div",4),a.Pb(2,"span"),a.tc(3),a.ac(4,"date"),a.Ob(),a.Pb(5,"div"),a.Pb(6,"span"),a.tc(7),a.ac(8,"date"),a.Ob(),a.Ob(),a.Ob(),a.Pb(9,"div",5),a.Pb(10,"span",6),a.tc(11),a.ac(12,"number"),a.Ob(),a.Pb(13,"span",7),a.tc(14),a.ac(15,"number"),a.Ob(),a.Lb(16,"img",8),a.ac(17,"date"),a.Ob(),a.Pb(18,"span",9),a.tc(19),a.Ob(),a.Ob()),2&t){const t=e.$implicit,i=e.index,n=a.Zb();a.Cb("offset-xl-1",0==i),a.zb(3),a.uc(a.dc(4,9,1e3*t.dt,"EEEEEE",n.timezoneOffset,"ru")),a.zb(4),a.uc(a.dc(8,14,1e3*t.dt,"d MMMM",n.timezoneOffset,"ru")),a.zb(4),a.vc("",a.cc(12,19,t.main.temp,"1.0-0"),"\xb0"),a.zb(3),a.vc("",a.cc(15,22,n.forecastNights[i].main.temp,"1.0-0"),"\xb0"),a.zb(2),a.ic("src","assets/ico/weather-conditions/",t.weather[0].icon,".svg",a.pc),a.hc("id",a.dc(17,25,1e3*t.dt,"EEEEEE",n.timezoneOffset,"ru")),a.zb(3),a.uc(t.weather[0].description)}}let N=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=a.Eb({type:t,selectors:[["wa-forecast"]],inputs:{forecastDays:"forecastDays",forecastNights:"forecastNights",timezoneOffset:"timezoneOffset"},decls:4,vars:1,consts:[["id","forecast-title",1,"col-12","pl-5"],[1,"ml-xl-5"],["class","col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center d-flex flex-row flex-sm-column mb-sm-3",3,"offset-xl-1",4,"ngFor","ngForOf"],[1,"col-sm-6","col-md-4","col-lg-3","col-xl-2","text-center","d-flex","flex-row","flex-sm-column","mb-sm-3"],[1,"pt-3","pt-sm-0"],[1,"ml-auto","ml-sm-0"],[1,"forecast-temp-text","mr-3"],[1,"forecast-temp-text","night"],["alt","\u0418\u043a\u043e\u043d\u043a\u0430 \u043f\u043e\u0433\u043e\u0434\u044b",1,"forecast-img",3,"src","id"],[1,"forecast-weather-describe","d-none","d-sm-block"]],template:function(t,e){1&t&&(a.Pb(0,"div",0),a.Pb(1,"span",1),a.tc(2,"\u041d\u0430 \u0431\u043b\u0438\u0436\u0430\u0439\u0448\u0438\u0435 \u0434\u043d\u0438"),a.Ob(),a.Ob(),a.rc(3,k,20,30,"div",2)),2&t&&(a.zb(3),a.gc("ngForOf",e.forecastDays))},directives:[h.m],pipes:[h.e,h.f],styles:["#forecast-title[_ngcontent-%COMP%]{font-size:2em}.forecast-temp-text[_ngcontent-%COMP%]{font-size:2.5em}.night[_ngcontent-%COMP%]{color:#b3d7ff}.forecast-img[_ngcontent-%COMP%], .forecast-weather-describe[_ngcontent-%COMP%]{position:relative;top:-.5em}"],changeDetection:0}),t})();var I=i("st2m");function S(t,e){if(1&t){const t=a.Qb();a.Pb(0,"wa-location-card",4),a.Xb("open",(function(){a.oc(t);const e=a.Zb().$implicit;return a.Zb().open.emit(e.id)})),a.Ob()}if(2&t){const t=a.Zb(),e=t.index,i=t.$implicit;a.Cb("mr-lg-2",!t.last)("offset-xl-1",1===e),a.gc("location",i)("enableClosing",!1)}}function E(t,e){if(1&t&&(a.Nb(0),a.rc(1,S,1,6,"wa-location-card",3),a.Mb()),2&t){const t=e.first;a.zb(1),a.gc("ngIf",!t)}}let A=(()=>{class t{constructor(){this.open=new a.n}ngOnInit(){}trackByItem(t,e){return t}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=a.Eb({type:t,selectors:[["wa-nearby"]],inputs:{list:"list"},outputs:{open:"open"},decls:4,vars:2,consts:[[1,"col-12","pl-5"],["id","title",1,"ml-xl-5"],[4,"ngFor","ngForOf","ngForTrackBy"],["class","location col-6 col-md-4 col-lg-3 col-xl-2 mb-3",3,"location","enableClosing","mr-lg-2","offset-xl-1","open",4,"ngIf"],[1,"location","col-6","col-md-4","col-lg-3","col-xl-2","mb-3",3,"location","enableClosing","open"]],template:function(t,e){1&t&&(a.Pb(0,"div",0),a.Pb(1,"span",1),a.tc(2,"\u041f\u043e\u0433\u043e\u0434\u0430 \u0440\u044f\u0434\u043e\u043c"),a.Ob(),a.Ob(),a.rc(3,E,2,1,"ng-container",2)),2&t&&(a.zb(3),a.gc("ngForOf",e.list)("ngForTrackBy",e.trackByItem))},directives:[h.m,h.n,I.a],styles:[".location[_ngcontent-%COMP%]:hover:not(.ghost-item){box-shadow:.3em .4em 1.4em -.4em var(--dark);-webkit-transition:box-shadow .2s ease-in;transition:box-shadow .2s ease-in}#title[_ngcontent-%COMP%]{font-size:2em}"],changeDetection:0}),t})();function L(t,e){if(1&t&&(a.Pb(0,"div",7),a.tc(1),a.ac(2,"date"),a.ac(3,"weatherParams"),a.Ob()),2&t){const t=a.Zb(2);a.zb(1),a.xc(" ",a.dc(2,3,1e3*t.pressureData[0].dt,"d MMMM",t.timezoneOffset,"ru")," \u043e\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044f ",t.changePressure," \u0430\u0442\u043c\u043e\u0441\u0444\u0435\u0440\u043d\u043e\u0433\u043e \u0434\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0434\u043e ",a.cc(3,8,t.pressureData[0].main.pressure,"pressure")," \u043c\u043c.\u0440\u0442.\u0441\u0442. ")}}function Z(t,e){if(1&t&&(a.Nb(0),a.tc(1),a.ac(2,"date"),a.ac(3,"weatherParams"),a.Lb(4,"br"),a.Mb()),2&t){const t=e.$implicit,i=a.Zb(3);a.zb(1),a.wc(" ",a.dc(2,2,1e3*t.dt,"d MMMM",i.timezoneOffset,"ru"),": ",a.cc(3,7,t.weather[0].id,"precipitation"),". ")}}function F(t,e){if(1&t&&(a.Pb(0,"div",7),a.rc(1,Z,5,10,"ng-container",8),a.Ob()),2&t){const t=a.Zb(2);a.zb(1),a.gc("ngForOf",t.precipitationData)}}function T(t,e){if(1&t&&(a.Pb(0,"div",7),a.tc(1),a.ac(2,"date"),a.ac(3,"number"),a.Ob()),2&t){const t=a.Zb(2);a.zb(1),a.xc(" ",a.dc(2,3,1e3*t.tempData[0].dt,"d MMMM",t.timezoneOffset,"ru")," \u043e\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044f ",t.changeTemp," \u0442\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u044b \u0434\u043e ",a.cc(3,8,t.tempData[0].main.temp,"1.0-0"),"\xb0 ")}}function X(t,e){if(1&t&&(a.Pb(0,"div",7),a.tc(1),a.ac(2,"date"),a.Ob()),2&t){const t=a.Zb(2);a.zb(1),a.wc(" ",a.dc(2,2,1e3*t.windData.dt,"d MMMM",t.timezoneOffset,"ru")," \u0448\u0442\u043e\u0440\u043c\u043e\u0432\u043e\u0435 \u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0435\u043d\u0438\u0435: \u043f\u043e\u0440\u044b\u0432\u044b \u0432\u0435\u0442\u0440\u0430 \u0434\u043e ",t.windData.wind.speed," \u043c/\u0441 ")}}function j(t,e){if(1&t&&(a.Nb(0),a.Pb(1,"div",5),a.rc(2,L,4,11,"div",6),a.rc(3,F,2,1,"div",6),a.rc(4,T,4,11,"div",6),a.rc(5,X,3,7,"div",6),a.Ob(),a.Mb()),2&t){const t=a.Zb();a.zb(2),a.gc("ngIf",t.pressureData),a.zb(1),a.gc("ngIf",t.precipitationData.length),a.zb(1),a.gc("ngIf",t.tempData),a.zb(1),a.gc("ngIf",t.windData)}}function K(t,e){1&t&&(a.Pb(0,"div",9),a.Lb(1,"i",10),a.Pb(2,"span",11),a.tc(3,"\u0423\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u0439 \u043d\u0435\u0442"),a.Ob(),a.Ob())}let H=(()=>{class t{constructor(){this.close=new a.n}ngOnInit(){this.pressureData&&(this.changePressure=this.changeValue(this.pressureData[1])),this.tempData&&(this.changeTemp=this.changeValue(this.tempData[1]))}changeValue(t){return t>0?"\u043f\u043e\u043d\u0438\u0436\u0435\u043d\u0438\u0435":"\u043f\u043e\u0432\u044b\u0448\u0435\u043d\u0438\u0435"}onClose(){this.close.emit(null)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=a.Eb({type:t,selectors:[["wa-notification-center"]],inputs:{timezoneOffset:"timezoneOffset",pressureData:"pressureData",precipitationData:"precipitationData",tempData:"tempData",windData:"windData",notification:"notification"},outputs:{close:"close"},decls:8,vars:2,consts:[[1,"text-center"],[4,"ngIf","ngIfElse"],["emptyTemplate",""],["id","close-btn","type","button","aria-label","Close","tooltip","\u0417\u0430\u043a\u0440\u044b\u0442\u044c",1,"close",3,"click"],["aria-hidden","true"],["id","wrapper"],["class","alert notification px-2","role","alert",4,"ngIf"],["role","alert",1,"alert","notification","px-2"],[4,"ngFor","ngForOf"],["id","empty-notification",1,"d-flex","flex-column","align-items-center"],["id","empty-notification-ico",1,"far","fa-bell-slash","mb-2"],[1,"text-dark"]],template:function(t,e){if(1&t&&(a.Pb(0,"h4",0),a.tc(1,"\u0426\u0435\u043d\u0442\u0440 \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u0439"),a.Ob(),a.rc(2,j,6,4,"ng-container",1),a.rc(3,K,4,0,"ng-template",null,2,a.sc),a.Pb(5,"button",3),a.Xb("click",(function(){return e.onClose()})),a.Pb(6,"span",4),a.tc(7,"\xd7"),a.Ob(),a.Ob()),2&t){const t=a.mc(4);a.zb(2),a.gc("ngIf",e.notification)("ngIfElse",t)}},directives:[h.n,w.a,h.m],pipes:[h.e,C.a,h.f],styles:["h4[_ngcontent-%COMP%]{color:var(--dark)}#wrapper[_ngcontent-%COMP%]{max-height:300px;overflow:auto}#wrapper[_ngcontent-%COMP%]   .notification[_ngcontent-%COMP%]{color:var(--dark);background-color:#b3d7ff}#empty-notification[_ngcontent-%COMP%]{position:relative;top:79px}#empty-notification-ico[_ngcontent-%COMP%]{font-size:5em;color:var(--dark)}#close-btn[_ngcontent-%COMP%]{position:absolute;top:0;left:325px}"],changeDetection:0}),t})();function $(t,e){if(1&t&&a.Lb(0,"div",21),2&t){const t=e.index,i=a.Zb(2);a.Cb("selected",t===i.selectedIndex)}}function B(t,e){if(1&t){const t=a.Qb();a.Pb(0,"wa-nearby",22),a.Xb("open",(function(e){return a.oc(t),a.Zb(2).openLocation(e)})),a.Ob()}if(2&t){const t=a.Zb(2);a.gc("list",t.cycleWeatherData.list)}}function R(t,e){if(1&t){const t=a.Qb();a.Pb(0,"wa-notification-center",23),a.Xb("close",(function(){return a.oc(t),a.Zb(2).onClick()})),a.Ob()}if(2&t){const t=a.Zb(2);a.gc("@openCloseAnimation",void 0)("pressureData",t.pressureData)("precipitationData",t.precipitationData)("tempData",t.tempData)("windData",t.windData)("notification",t.notification)("timezoneOffset",t.timezoneOffset)}}function V(t,e){if(1&t){const t=a.Qb();a.Nb(0),a.Pb(1,"div",3),a.Pb(2,"div",4),a.rc(3,$,1,2,"div",5),a.Ob(),a.Pb(4,"div",6),a.Pb(5,"div",7),a.Pb(6,"button",8),a.Xb("click",(function(){return a.oc(t),a.Zb().previous()})),a.Lb(7,"i",9),a.Ob(),a.tc(8),a.Pb(9,"button",10),a.Xb("click",(function(){return a.oc(t),a.Zb().onClick()})),a.Lb(10,"i",11),a.Ob(),a.Pb(11,"button",12),a.Xb("click",(function(){return a.oc(t),a.Zb().next()})),a.Lb(12,"i",13),a.Ob(),a.Ob(),a.Pb(13,"span",14),a.tc(14),a.ac(15,"date"),a.Ob(),a.Ob(),a.Lb(16,"wa-weather",15),a.Ob(),a.Lb(17,"wa-forecast",16),a.rc(18,B,1,1,"wa-nearby",17),a.Pb(19,"button",18),a.Xb("click",(function(){return a.oc(t),a.Zb().changeState()})),a.Pb(20,"div",19),a.tc(21," + "),a.Ob(),a.Ob(),a.rc(22,R,1,7,"wa-notification-center",20),a.Mb()}if(2&t){const t=a.Zb();a.zb(3),a.gc("ngForOf",t.favoritesService.favorites),a.zb(5),a.vc(" ",null==t.weatherData?null:t.weatherData.name," "),a.zb(2),a.Cb("ring",t.notification),a.zb(4),a.vc(" \u041f\u0440\u043e\u0433\u043d\u043e\u0437 \u0441\u043e\u0441\u0442\u0430\u0432\u043b\u0435\u043d: ",a.dc(15,15,1e3*(null==t.weatherData?null:t.weatherData.dt),"d MMMM, HH:mm",t.timezoneOffset,"ru")," "),a.zb(2),a.gc("weatherData",t.weatherData)("timezoneOffset",t.timezoneOffset)("forecastDay",t.forecastDay),a.zb(1),a.gc("forecastDays",t.forecastDays)("forecastNights",t.forecastNights)("timezoneOffset",t.timezoneOffset),a.zb(1),a.gc("ngIf",null==t.cycleWeatherData?null:t.cycleWeatherData.list),a.zb(1),a.gc("tooltip",t.favoritesService.isBookmark?"\u0423\u0434\u0430\u043b\u0438\u0442\u044c":"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"),a.zb(1),a.gc("@addDeleteAnimation",t.favoritesService.isBookmark?"delete":"add"),a.zb(2),a.gc("ngIf",t.isOpenedNotificationCenter)}}function W(t,e){1&t&&(a.Pb(0,"div",24),a.Pb(1,"div",25),a.Pb(2,"span",26),a.tc(3,"Loading..."),a.Ob(),a.Ob(),a.Ob())}function Q(t,e){1&t&&(a.Nb(0),a.tc(1," \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d \u0432 \u0440\u0430\u0437\u0434\u0435\u043b "),a.Mb())}function J(t,e){1&t&&a.tc(0," \u0443\u0434\u0430\u043b\u0435\u043d \u0438\u0437 \u0440\u0430\u0437\u0434\u0435\u043b\u0430 ")}function q(t,e){if(1&t){const t=a.Qb();a.Pb(0,"div",27),a.Pb(1,"span",28),a.tc(2),a.rc(3,Q,2,0,"ng-container",0),a.rc(4,J,1,0,"ng-template",null,29,a.sc),a.tc(6,' "\u041c\u043e\u0438 \u043c\u0435\u0441\u0442\u0430" '),a.Ob(),a.Pb(7,"button",30),a.Xb("click",(function(){return a.oc(t),a.Zb().closeNotify()})),a.Pb(8,"span",31),a.tc(9,"\xd7"),a.Ob(),a.Ob(),a.Ob()}if(2&t){const t=a.mc(5),e=a.Zb();a.gc("@showHideAnimation",void 0),a.zb(2),a.vc(" ",null==e.weatherData?null:e.weatherData.name," "),a.zb(1),a.gc("ngIf",e.favoritesService.isBookmark)("ngIfElse",t)}}let G=(()=>{class t{constructor(t,e,i,n,a,s){this.weather=t,this.favoritesService=e,this.seo=i,this.renderer=n,this.router=a,this.notificationCenterService=s,this.subscriptions=new b.a,this.isShown=!1,this.isOpenedNotificationCenter=!1,this.precipitationData=[],this.notification=!1}getNewData(){const t=Number(localStorage.getItem("lastId"));t?this.favoritesService.getData(t):this.router.navigate(["/search"])}ngOnInit(){this.isDataLoaded$=this.weather.isDataLoaded$,this.subscriptions.add(this.weather.weatherDataStorage$.pipe(Object(f.a)(t=>(this.closeNotify(),window.scrollTo(0,0),this.weatherData=t,this.favoritesService.isBookmark=this.favoritesService.isLocationExist(t.name),this.seo.setPageTitle("Weather App | \u041f\u0440\u043e\u0433\u043d\u043e\u0437 \u043f\u043e\u0433\u043e\u0434\u044b \u0432 "+t.name),this.seo.setPageDescription("\u041f\u0440\u043e\u0433\u043d\u043e\u0437 \u0442\u0435\u043a\u0443\u0449\u0435\u0439 \u043f\u043e\u0433\u043e\u0434\u044b, \u043f\u043e\u0447\u0430\u0441\u043e\u0432\u043e\u0439 \u0438 \u043f\u044f\u0442\u0438\u0434\u043d\u0435\u0432\u043d\u044b\u0439."),this.seo.setMetaRobots("index, follow"),localStorage.setItem("lastId",t.id.toString()),this.weather.forecastDataStorage$.pipe(Object(f.a)(t=>(this.timezoneOffset=this.weatherData.timezone>=0?"+"+(this.weatherData.timezone/3600).toString():(this.weatherData.timezone/3600).toString(),this.weather.forecastTz=this.weatherData.timezone/3600,this.forecastData=t,this.forecastDay=this.weather.getForecastDay(t.list),this.forecastDays=this.weather.getForecastDays(this.forecastData.list,this.weather.forecastTz),this.forecastNights=this.weather.getForecastNights(this.forecastData.list,this.weather.forecastTz),this.selectedIndex=this.favoritesService.favorites.findIndex(t=>t.name===this.weatherData.name),this.checkNotifications(),this.weather.cycleWeatherDataStorage$)))))).subscribe(t=>this.cycleWeatherData=t))}ngOnDestroy(){this.subscriptions&&this.subscriptions.unsubscribe(),this.timerIdNotify&&clearTimeout(this.timerIdNotify),this.isOpenedNotificationCenter&&this.renderer.removeClass(document.body,"show-notification-center")}next(){let t=this.favoritesService.favorites.findIndex(t=>t.name===this.weatherData.name);-1===t&&(t=0),this.favoritesService.getData(t!==this.favoritesService.favorites.length-1?this.favoritesService.favorites[++t].id:this.favoritesService.favorites[0].id),this.isOpenedNotificationCenter=!1,this.scrollState(this.isOpenedNotificationCenter)}previous(){let t=this.favoritesService.favorites.findIndex(t=>t.name===this.weatherData.name);-1===t&&(t=0),this.favoritesService.getData(0===t?this.favoritesService.favorites[this.favoritesService.favorites.length-1].id:this.favoritesService.favorites[--t].id),this.isOpenedNotificationCenter=!1,this.scrollState(this.isOpenedNotificationCenter)}changeState(){this.favoritesService.manage(this.weatherData),this.selectedIndex=this.favoritesService.favorites.findIndex(t=>t.name===this.weatherData.name),this.isShown=!this.isShown,this.timerIdNotify&&clearTimeout(this.timerIdNotify),this.isShown||(this.isShown=!0),this.timerIdNotify=setTimeout(()=>{this.closeNotify()},5e3)}closeNotify(){this.isShown=!1,clearTimeout(this.timerIdNotify)}onClick(){this.isOpenedNotificationCenter=!this.isOpenedNotificationCenter,this.scrollState(this.isOpenedNotificationCenter)}openLocation(t){this.isOpenedNotificationCenter=!1,this.scrollState(this.isOpenedNotificationCenter),this.favoritesService.getData(t)}scrollState(t){t?this.renderer.addClass(document.body,"show-notification-center"):this.renderer.removeClass(document.body,"show-notification-center")}checkNotifications(){this.pressureData=this.notificationCenterService.pressureNotify(this.weatherData,this.forecastDays),this.precipitationData=this.notificationCenterService.precipitationNotify(this.forecastDays),this.tempData=this.notificationCenterService.tempNotify(this.weatherData.main.temp,this.forecastDays),this.windData=this.notificationCenterService.windNotify(this.forecastDays),this.notification=!!(this.pressureData||this.precipitationData.length||this.tempData||this.windData)}}return t.\u0275fac=function(e){return new(e||t)(a.Kb(m.e),a.Kb(m.a),a.Kb(m.d),a.Kb(a.D),a.Kb(d.b),a.Kb(m.c))},t.\u0275cmp=a.Eb({type:t,selectors:[["wa-location-details"]],hostBindings:function(t,e){1&t&&a.Xb("load",(function(){return e.getNewData()}),!1,a.nc)("beforeunload",(function(){return e.ngOnDestroy()}),!1,a.nc)},decls:6,vars:5,consts:[[4,"ngIf","ngIfElse"],["loadedTemplate",""],["id","notifyMsg","class","d-flex justify-content-center align-items-center fixed-bottom py-2 px-1",4,"ngIf"],[1,"row","mb-md-5"],["waLocationsPaginator","",1,"col","d-flex","flex-row","justify-content-center","pt-2"],["class","location-pagination rounded-circle mr-1",3,"selected",4,"ngFor","ngForOf"],[1,"col-12","text-center"],["id","loc-name"],["waLocationsPaginator","","type","button","aria-label","Previous location","tooltip","\u041f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0435\u0435 \u043c\u0435\u0441\u0442\u043e",1,"btn",3,"click"],[1,"fas","fa-chevron-left"],["type","button","aria-label","Notification center","tooltip","\u0426\u0435\u043d\u0442\u0440 \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u0439",1,"btn","p-1","mr-2",3,"click"],[1,"far","fa-bell"],["waLocationsPaginator","","type","button","aria-label","Next location","tooltip","\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0435\u0435 \u043c\u0435\u0441\u0442\u043e",1,"btn",3,"click"],[1,"fas","fa-chevron-right"],[1,"d-block"],[1,"col-12","d-flex","flex-column","flex-md-row","p-0",3,"weatherData","timezoneOffset","forecastDay"],[1,"row",3,"forecastDays","forecastNights","timezoneOffset"],["class","row",3,"list","open",4,"ngIf"],["type","button","id","bookmark","aria-label","Add or delete bookmark",1,"btn","btn-custom","rounded-circle","mr-4",3,"tooltip","click"],["id","btn-label"],["id","notification-center-container","class","px-2",3,"pressureData","precipitationData","tempData","windData","notification","timezoneOffset","close",4,"ngIf"],[1,"location-pagination","rounded-circle","mr-1"],[1,"row",3,"list","open"],["id","notification-center-container",1,"px-2",3,"pressureData","precipitationData","tempData","windData","notification","timezoneOffset","close"],[1,"d-flex","justify-content-center","pt-5"],["role","status",1,"spinner-border","text-light"],[1,"sr-only"],["id","notifyMsg",1,"d-flex","justify-content-center","align-items-center","fixed-bottom","py-2","px-1"],[1,"text-center","mr-3"],["deleteTemplate",""],["type","button","aria-label","Close","tooltip","\u0421\u043a\u0440\u044b\u0442\u044c",1,"close",3,"click"],["aria-hidden","true"]],template:function(t,e){if(1&t&&(a.Pb(0,"wa-layout"),a.rc(1,V,23,20,"ng-container",0),a.ac(2,"async"),a.rc(3,W,4,0,"ng-template",null,1,a.sc),a.rc(5,q,10,4,"div",2),a.Ob()),2&t){const t=a.mc(4);a.zb(1),a.gc("ngIf",a.bc(2,3,e.isDataLoaded$))("ngIfElse",t),a.zb(4),a.gc("ngIf",e.isShown)}},directives:[u.a,h.n,g,h.m,w.a,M,N,A,H],pipes:[h.b,h.e],styles:[".location-pagination[_ngcontent-%COMP%]{height:.5em;width:.5em;background-color:var(--light)}#loc-name[_ngcontent-%COMP%]{font-size:2em}.selected[_ngcontent-%COMP%]{background-color:#b3d7ff}#bookmark[_ngcontent-%COMP%]{position:fixed;top:80%;right:0;height:50px;width:50px;box-shadow:.2em .1em .5em var(--dark)}#bookmark[_ngcontent-%COMP%]   #btn-label[_ngcontent-%COMP%]{position:relative;top:-16px;left:-2px;font-size:2.5em}#notifyMsg[_ngcontent-%COMP%]{min-height:50px;max-height:100px;background-color:var(--light);color:var(--dark)}#notification-center-container[_ngcontent-%COMP%]{position:fixed;top:120px;left:0;width:350px;height:350px;border-radius:0 19px 19px 0;background-color:var(--white);box-shadow:.2em .1em .5em var(--dark)}@-webkit-keyframes ringing{0%{-webkit-transform:rotate(20deg);transform:rotate(20deg)}50%{-webkit-transform:rotate(-20deg);transform:rotate(-20deg)}to{-webkit-transform:rotate(20deg);transform:rotate(20deg)}}@keyframes ringing{0%{-webkit-transform:rotate(20deg);transform:rotate(20deg)}50%{-webkit-transform:rotate(-20deg);transform:rotate(-20deg)}to{-webkit-transform:rotate(20deg);transform:rotate(20deg)}}.ring[_ngcontent-%COMP%]{-webkit-animation:ringing .5s ease-out infinite;animation:ringing .5s ease-out infinite}"],data:{animation:[p.a,p.e,p.d]}}),t})();const U=[{path:"",component:G,children:[{path:":currentLocation",component:G}]}];let Y=(()=>{class t{}return t.\u0275mod=a.Ib({type:t}),t.\u0275inj=a.Hb({factory:function(e){return new(e||t)},imports:[[h.c,d.e.forChild(U)],d.e]}),t})();i.d(e,"LocationDetailsModule",(function(){return tt}));let tt=(()=>{class t{}return t.\u0275mod=a.Ib({type:t}),t.\u0275inj=a.Hb({factory:function(e){return new(e||t)},imports:[[l.a,Y,r]]}),t})()}}]);