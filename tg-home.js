/* ChatLine – Telegram-style home screen + push notifications (injected into index.html at build time) */
(function(){
'use strict';
/* ---- folder tabs: [filter, label]. filters: all | groups | personal | channels ---- */
/* set to true to bring back the Telegram-style home screen */
var HOME_UI=false;
var TABS=[['all','All'],['groups','Groups'],['personal','WORK'],['channels','Bots']];

var CSS=[
'#list{background:#fff!important;color:#000!important;direction:ltr;font-family:-apple-system,"SF Pro Text","SF Pro Display",Roboto,"Segoe UI",Arial,sans-serif;-webkit-tap-highlight-color:transparent}',
'#list>.wall,#list>.lhead,#list>.fbar,.mystory{display:none!important}',
'#tgtop{flex:none;position:relative;z-index:3;background:#fff;padding:calc(max(env(safe-area-inset-top,0px),24px) + 8px) 0 0}',
'.tgh{display:flex;align-items:center;justify-content:space-between;height:41px;padding:0 15px}',
'.tgp{height:41px;border-radius:21px;background:#f2f2f4;box-shadow:0 1px 6px rgba(0,0,0,.09);display:flex;align-items:center;color:#000;font-size:17px;font-weight:500;border:0}',
'.tgp.l{padding:0 11px;min-width:52px;justify-content:center}',
'.tgp.r{padding:0 11px;gap:11px}',
'.tgp.r button{width:26px;height:26px;display:grid;place-items:center;color:#111;padding:0}',
'.tgt{font-size:17px;font-weight:600;display:flex;align-items:center;gap:5px;color:#000}',
'.tgt svg{width:17px;height:17px;fill:#0a84ff}',
'#tgst{display:flex;overflow-x:auto;padding:14px 0 0 8px;scrollbar-width:none}#tgst::-webkit-scrollbar{display:none}',
'.tgs{flex:none;width:72px;display:flex;flex-direction:column;align-items:center;background:none;border:0;color:#1c1c1e;padding:0}',
'.tgs .a{position:relative;width:58px;height:58px}',
'.tgs .rg{width:58px;height:58px;border-radius:50%;padding:2.5px;background:linear-gradient(140deg,#30d158,#2f9bff)}',
'.tgs .in{width:100%;height:100%;border-radius:50%;background:#fff;padding:2px;box-sizing:border-box}',
'.tgs .pic{display:block;width:100%;height:100%;border-radius:50%;overflow:hidden}',
'.tgs .pic svg,.tgs .pic img{width:100%;height:100%;object-fit:cover;display:block}',
'.tgs .a.me .pic{width:58px;height:58px}',
'.tgs .pl{position:absolute;right:-1px;bottom:-1px;width:20px;height:20px;border-radius:50%;background:#0a84ff;border:2px solid #fff;display:grid;place-items:center}',
'.tgs .pl svg{width:11px;height:11px;stroke:#fff;stroke-width:3;fill:none;stroke-linecap:round}',
'.tgs .on{position:absolute;right:2px;bottom:2px;width:13px;height:13px;border-radius:50%;background:#34c759;border:2.5px solid #fff}',
'.tgs span.n{margin-top:7px;font-size:12px;line-height:14px;max-width:68px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'#tgtabs{margin:12px 16px 0;height:38px;border-radius:19px;background:#efeff1;display:flex;align-items:center;justify-content:space-between;padding:0 2px}',
'#tgtabs button{height:34px;border-radius:17px;padding:0 14px;font-size:16px;font-weight:500;color:#1c1c1e;display:flex;align-items:center;gap:6px;border:0;background:none}',
'#tgtabs button.on{background:rgba(0,0,0,.07)}',
'.tgb{min-width:20px;height:20px;border-radius:10px;background:#b3b3b8;color:#fff;font-size:13px;font-weight:600;display:grid;place-items:center;padding:0 6px}',
'.tgb.bl{background:#0a84ff}.tgb.rd{background:#ff3b30}',
'.tgw{font:900 21px/1 "Arial Black",Impact,Arial,sans-serif;letter-spacing:2.5px;background:linear-gradient(#3a96ff,#0a55d4);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}',
'#tgsq{display:none;margin:10px 16px 0}#tgsq.on{display:block}',
'#tgsq input{width:100%;height:38px;border-radius:19px;border:0;background:#efeff1;padding:0 16px;font-size:16px;color:#000;outline:0;box-sizing:border-box}',
'#list .lscroll{flex:1;overflow-y:auto;padding:8px 0 120px!important;margin:0!important;background:#fff!important}',
'#list #convs{padding:0!important;gap:0!important;display:block!important}',
'#list .conv{display:flex!important;align-items:center;gap:0!important;width:100%;height:75px;padding:0 16px 0 15px!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;color:#000!important;text-align:left!important;position:relative;overflow:visible!important;animation:none!important;transform:none!important;background-color:transparent!important;background-image:linear-gradient(#e2e2e5,#e2e2e5)!important;background-repeat:no-repeat!important;background-size:100% .5px!important;background-position:0 100%!important}',
'#list .conv::before,#list .conv::after{display:none!important}',
'#list .conv.pn{background-color:#f5f5f7!important}',
'#list .conv .av{width:59px;height:59px;flex:none;position:relative;margin:0 10px 0 0!important}',
'#list .conv .av .pic{width:100%;height:100%;border-radius:50%;overflow:hidden}',
'#list .conv .av .pic svg,#list .conv .av .pic img{width:100%;height:100%;object-fit:cover;display:block}',
'#list .conv .av .dot{position:absolute;right:0;bottom:0;width:15px;height:15px;border-radius:50%;background:#34c759!important;border:2.5px solid #fff!important;box-shadow:none!important}',
'#list .conv .mid{flex:1;min-width:0;height:100%;display:flex;flex-direction:column;justify-content:center;gap:3px}',
'#list .conv .top{display:flex;justify-content:space-between;align-items:center}',
'#list .conv .nm{font-size:17px!important;font-weight:600!important;color:#000!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:5px;text-shadow:none!important}',
'#list .conv .nm svg{display:none!important}#list .conv .nm .tgm svg{display:inline!important}',
'.tgm{display:inline-flex;color:#8e8e93}.tgm svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
'#list .conv .tm{font-size:15px!important;color:#8e8e93!important;flex:none;margin-left:8px;text-shadow:none!important}',
'#list .conv .r2{display:flex;align-items:center;justify-content:space-between;gap:8px}',
'#list .conv .pv{font-size:16px!important;color:#8e8e93!important;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1;min-width:0;text-shadow:none!important}',
'#list .conv .ltyp{color:#0a84ff!important}',
'#list .conv .bd{min-width:20px;height:20px;border-radius:10px;background:#0a84ff!important;color:#fff!important;font-size:13px!important;font-weight:600;padding:0 6px;display:grid;place-items:center;flex:none;box-shadow:none!important}',
'#list .conv.mt .bd{background:#b3b3b8!important}',
'.tgpin{display:inline-flex;color:#a1a1a6;flex:none}.tgpin svg{width:18px;height:18px;fill:currentColor}',
'.tgbw{position:absolute;left:23px;right:23px;bottom:calc(max(env(safe-area-inset-bottom,0px),8px) + 14px);display:flex;gap:9px;z-index:8}',
'#list.editing .tgbw,#list.in-new .tgbw{display:none}',
'.tgbar,.tgsr{height:60px;border-radius:30px;background:rgba(250,250,252,.88);-webkit-backdrop-filter:blur(20px) saturate(1.6);backdrop-filter:blur(20px) saturate(1.6);box-shadow:0 2px 14px rgba(0,0,0,.14),0 0 0 .5px rgba(0,0,0,.06)}',
'.tgbar{flex:1;display:flex;align-items:center;justify-content:space-around;padding:0 5px}',
'.tgsr{width:61px;flex:none;display:grid;place-items:center;color:#3c3c43;border:0}',
'.tgsr svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round}',
'.tgtb{position:relative;height:50px;min-width:64px;border-radius:25px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;font-size:11px;font-weight:500;color:#3c3c43;border:0;background:none;padding:0 4px}',
'.tgtb svg{width:27px;height:27px}',
'.tgtb.on{background:rgba(0,0,0,.06);color:#0a84ff}',
'.tgtb .tgb{position:absolute;top:0;right:8px;min-width:18px;height:18px;font-size:12px;padding:0 5px;border:0}',
'#tgpg{position:absolute;inset:0;z-index:7;background:#fff;display:none;flex-direction:column;padding-top:calc(max(env(safe-area-inset-top,0px),24px) + 8px)}',
'#tgpg.on{display:flex}',
'#tgpg .ph{display:flex;align-items:center;justify-content:space-between;height:41px;padding:0 15px;flex:none}',
'#tgpg .ph b{font-size:17px;font-weight:600}',
'#tgpg .ph .sp{width:52px}',
'#tgpg .pb{flex:1;overflow-y:auto;padding:10px 0 120px}',
'.tgr1{display:flex;align-items:center;height:64px;padding:0 16px;gap:12px;width:100%;border:0;background:none;text-align:left;color:#000}',
'.tgr1 .pic{width:46px;height:46px;border-radius:50%;overflow:hidden;flex:none}.tgr1 .pic svg,.tgr1 .pic img{width:100%;height:100%;object-fit:cover}',
'.tgr1 b{display:block;font-size:17px;font-weight:600}.tgr1 small{color:#8e8e93;font-size:14px}',
'.tgem{padding:40px 24px;text-align:center;color:#8e8e93;font-size:16px}',
'#tgmd{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.4);display:none;align-items:center;justify-content:center;direction:ltr}',
'#tgmd.on{display:flex}#tgmd .bx{width:min(86%,340px);background:#fff;border-radius:18px;padding:18px;display:flex;flex-direction:column;gap:10px;color:#000;font-family:-apple-system,Roboto,Arial,sans-serif}',
'#tgmd h3{margin:0 0 4px;font-size:17px;text-align:center}',
'#tgmd input{height:42px;border-radius:12px;border:0;background:#f0f0f2;padding:0 12px;font-size:16px;color:#000;outline:0}',
'#tgmd .er{color:#ff3b30;font-size:13px;min-height:16px}',
'#tgmd .bt{display:flex;gap:10px}#tgmd .bt button{flex:1;height:42px;border-radius:12px;border:0;font-size:16px;font-weight:600;background:#f0f0f2;color:#000}#tgmd .bt .ok{background:#0a84ff;color:#fff}'
].join('\n');

var I={
 star:'<svg viewBox="0 0 24 24"><path d="M12 2.6l2.8 6 6.5.8-4.8 4.5 1.3 6.5L12 17.2 6.2 20.4l1.3-6.5L2.7 9.4l6.5-.8z"/></svg>',
 plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 7.5v9M7.5 12h9"/></svg>',
 pen:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5"/><path d="M17.5 3.5a2.1 2.1 0 013 3L12 15l-4 1 1-4z"/></svg>',
 plus2:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
 con:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10.5"/><circle cx="12" cy="9.5" r="3.6" fill="#fff"/><path d="M5.6 18.4c1.2-3 3.6-4.4 6.4-4.4s5.2 1.4 6.4 4.4A10 10 0 0112 22a10 10 0 01-6.4-3.6z" fill="#fff"/></svg>',
 cal:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 3h3l1.4 4.6-2 1.5a12 12 0 006 6l1.5-2 4.6 1.4v3a2.6 2.6 0 01-2.7 2.5C10.2 19.6 4.4 13.8 4 5.7A2.6 2.6 0 016.6 3z"/></svg>',
 chat:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5c-5.2 0-9.5 3.7-9.5 8.3 0 2.4 1.2 4.6 3.1 6.1-.2 1.2-.8 2.3-1.8 3.2 2 .1 3.7-.6 5-1.6.9.3 1.9.4 3.2.4 5.2 0 9.5-3.7 9.5-8.3S17.2 2.5 12 2.500z"/></svg>',
 set:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5l1.6 2.4 2.8-.6.9 2.7 2.7.9-.6 2.8L21.8 12l-2.4 1.6.6 2.8-2.7.9-.9 2.7-2.8-.6L12 21.5l-1.6-2.4-2.8.6-.9-2.7-2.7-.9.6-2.8L2.2 12l2.4-1.6-.6-2.8 2.7-.9.9-2.7 2.8.6z"/></svg>',
 sr:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
 pin:'<svg viewBox="0 0 24 24"><path d="M14.5 3l6.5 6.5-2 1-3 3 .5 4-1.5 1.5-4-4L5 20.5 3.5 19l5-5.5-4-4L6 8l4 .5 3-3z"/></svg>',
 mute:'<svg viewBox="0 0 24 24"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M22 9l-6 6M16 9l6 6"/></svg>'
};
var $=function(i){return document.getElementById(i)};
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function fa(){try{return I18N.lang==='fa'}catch(_){return false}}
function T(e,f){return fa()?f:e}
function convs(){try{return typeof CONVS!=='undefined'?CONVS:[]}catch(_){return[]}}
var FD='all',pageKind='';

function build(){
 var list=$('list'),ls=$('lscroll');if(!list||!ls||$('tgtop'))return false;
 var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
 var top=el('div','', '<div class="tgh"><button class="tgp l" id="tged">Edit</button><div class="tgt">Chats '+I.star+'</div><div class="tgp r"><button id="tgadd" aria-label="Add story">'+I.plus+'</button><button id="tgnew" aria-label="New message">'+I.pen+'</button></div></div><div id="tgst"></div><div id="tgtabs"></div><div id="tgsq"><input id="tgqi" type="search" placeholder="Search" autocomplete="off"></div>');
 top.id='tgtop';list.insertBefore(top,ls);
 var bw=el('div','tgbw','<div class="tgbar"></div><button class="tgsr" id="tgsr" aria-label="Search">'+I.sr+'</button>');
 var bar=bw.firstChild,tabs=[['con','Contacts'],['cal','Calls'],['chat','Chats'],['set','Settings']];
 tabs.forEach(function(t){var b=el('button','tgtb'+(t[0]==='chat'?' on':''),I[t[0]]+'<span>'+t[1]+'</span>'+(t[0]==='chat'?'<i class="tgb rd" id="tgun" hidden></i>':''));b.dataset.k=t[0];bar.appendChild(b)});
 list.appendChild(bw);
 var pg=el('div','','<div class="ph"><div class="sp"></div><b id="tgpt"></b><div id="tgpr" class="sp"></div></div><div class="pb" id="tgpb"></div>');pg.id='tgpg';list.appendChild(pg);
 var md=el('div','','<div class="bx"><h3 id="tgmt"></h3><input id="tgm_p" type="tel" inputmode="tel"><input id="tgm_f"><input id="tgm_l"><div class="er" id="tgme"></div><div class="bt"><button id="tgm_c"></button><button class="ok" id="tgm_s"></button></div></div>');md.id='tgmd';document.body.appendChild(md);

 $('tged').onclick=function(){var b=$('editb');b&&b.click();setTimeout(function(){$('tged').textContent=list.classList.contains('editing')?'Done':'Edit'},50)};
 $('tgadd').onclick=addStory;
 $('tgnew').onclick=function(){try{openNew()}catch(_){list.classList.add('in-new')}};
 $('tgsr').onclick=function(){var s=$('tgsq');s.classList.toggle('on');if(s.classList.contains('on'))$('tgqi').focus();else{$('tgqi').value='';setQ('')}};
 $('tgqi').oninput=function(){setQ(this.value)};
 bar.onclick=function(e){var b=e.target.closest('.tgtb');if(!b)return;go(b.dataset.k)};
 buildTabs();return true}

function setQ(v){var q=$('q');if(q){q.value=v;q.dispatchEvent(new Event('input',{bubbles:true}))}}
function addStory(){var b=document.querySelector('.mystory');b&&b.click()}

function buildTabs(){var box=$('tgtabs');box.innerHTML='';
 TABS.forEach(function(t){var b=el('button',t[0]===FD?'on':'');b.dataset.f=t[0];
  b.innerHTML=(t[1]==='WORK'?'<span class="tgw">WORK</span>':'<span>'+t[1]+'</span>')+(t[0]!=='all'?'<i class="tgb" data-c="'+t[0]+'" hidden></i>':'');
  b.onclick=function(){FD=t[0];var f=document.querySelector('.fbar button[data-f="'+t[0]+'"]');f&&f.click();[].forEach.call(box.children,function(x){x.classList.toggle('on',x===b)})};
  box.appendChild(b)});counts()}

function counts(){
 var L=convs(),tot=0,by={groups:0,personal:0,channels:0};
 L.forEach(function(c){if(!c.unread)return;if(!c.muted)tot+=c.unread;var k=c.channel?'channels':c.group?'groups':'personal';by[k]++});
 [].forEach.call(document.querySelectorAll('#tgtabs .tgb'),function(b){var n=by[b.dataset.c]||0;b.hidden=!n;b.textContent=n;b.classList.toggle('bl',b.dataset.c==='personal')});
 var u=$('tgun');if(u){u.hidden=!tot;u.textContent=tot>99?'99+':tot}}

function stories(){var box=$('tgst');if(!box)return;box.innerHTML='';
 var pf=$('profb'),me=el('button','tgs','<div class="a me"><span class="pic">'+(pf?pf.innerHTML:'')+'</span><span class="pl">'+I.plus2+'</span></div><span class="n">My Story</span>');
 me.onclick=addStory;box.appendChild(me);
 var old=$('stories');if(!old)return;
 [].slice.call(old.children,1).forEach(function(o){
  var pic=o.querySelector('.pic'),lab=o.querySelector('span:last-child'),dot=o.querySelector('.dot');
  var b=el('button','tgs','<div class="a"><div class="rg"><div class="in"><span class="pic">'+(pic?pic.innerHTML:'')+'</span></div></div>'+(dot?'<i class="on"></i>':'')+'</div><span class="n"></span>');
  b.querySelector('.n').textContent=lab?lab.textContent:'';b.onclick=function(){o.click()};box.appendChild(b)})}

function deco(){var box=$('convs');if(!box)return;var L=convs();
 [].forEach.call(box.querySelectorAll('.conv'),function(b){
  var c=null;for(var i=0;i<L.length;i++){if(String(L[i].id)===b.dataset.id){c=L[i];break}}
  if(!c)return;
  b.classList.toggle('pn',!!c.pinned);b.classList.toggle('mt',!!c.muted);
  var nm=b.querySelector('.nm'),r2=b.querySelector('.r2');
  if(nm&&c.muted&&!nm.querySelector('.tgm'))nm.appendChild(el('span','tgm',I.mute));
  if(r2&&c.pinned&&!c.unread&&!r2.querySelector('.tgpin'))r2.appendChild(el('span','tgpin',I.pin))});
 counts()}

function showPage(k){var pg=$('tgpg'),b=$('tgpb'),r=$('tgpr');pageKind=k;pg.classList.add('on');r.innerHTML='';
 if(k==='con'){$('tgpt').textContent='Contacts';
  var a=el('button','tgp',I.plus);a.style.cssText='width:41px;justify-content:center;margin-left:auto;padding:0';a.onclick=openAdd;r.appendChild(a);r.style.width='auto';
  b.innerHTML='<div class="tgem">…</div>';loadContacts()}
 else{$('tgpt').textContent='Calls';r.style.width='';b.innerHTML='<div class="tgem">'+T('No recent calls.','تماسی در اخیر نیست.')+'</div>'}}
function hidePage(){var pg=$('tgpg');if(pg)pg.classList.remove('on');pageKind=''}
function loadContacts(){var b=$('tgpb');
 CLA.call('contacts',{}).then(function(r){if(pageKind!=='con')return;
  if(!r||!r.ok||!r.users||!r.users.length){b.innerHTML='<div class="tgem">'+(r&&r.ok?T('No contacts yet. Tap + to add one.','هنوز مخاطبی ندارید. با + اضافه کنید.'):T('Cannot reach the server.','اتصال به سرور برقرار نشد.'))+'</div>';return}
  b.innerHTML='';r.users.forEach(function(u){var av=window.__avOf?window.__avOf(u):'';
   var row=el('button','tgr1','<span class="pic">'+av+'</span><span><b></b><small></small></span>');
   row.querySelector('b').textContent=u.name||'';row.querySelector('small').textContent=u.username?'@'+u.username:(u.phone?'+'+u.phone:'');
   row.onclick=function(){hidePage();setTab('chat');try{startChat(u.name,av)}catch(_){}};b.appendChild(row)})}).catch(function(){})}
function openAdd(){var m=$('tgmd');$('tgmt').textContent=T('New Contact','مخاطب جدید');
 $('tgm_p').placeholder=T('Phone number','شمارهٔ تلفن');$('tgm_f').placeholder=T('First name','نام');$('tgm_l').placeholder=T('Last name','نام خانوادگی');
 $('tgm_p').value=$('tgm_f').value=$('tgm_l').value='';$('tgme').textContent='';
 $('tgm_c').textContent=T('Cancel','انصراف');$('tgm_s').textContent=T('Add','افزودن');m.classList.add('on');
 $('tgm_c').onclick=function(){m.classList.remove('on')};
 $('tgm_s').onclick=function(){var p=$('tgm_p').value.replace(/\D/g,'');if(p.length<7){$('tgme').textContent=T('Enter a valid phone number.','شمارهٔ تلفن معتبر وارد کنید.');return}
  CLA.call('contact_add',{phone:p,first:$('tgm_f').value.trim(),last:$('tgm_l').value.trim()}).then(function(r){
   if(r&&r.ok){m.classList.remove('on');loadContacts()}
   else $('tgme').textContent=(r&&r.error==='not_found')?T('This number is not registered yet.','این شماره هنوز در برنامه ثبت‌نام نکرده است.'):((r&&r.message)||T('Failed.','ناموفق بود.'))})}}
function setTab(k){[].forEach.call(document.querySelectorAll('.tgtb'),function(b){b.classList.toggle('on',b.dataset.k===k)})}
function go(k){
 if(k==='set'){var g=document.querySelector('.cbtn[aria-label="Settings"]');g&&g.click();return}
 setTab(k);if(k==='chat')hidePage();else showPage(k)}

/* ---------------- push notifications (FCM via @capacitor/push-notifications) ---------------- */
function push(){
 var C=window.Capacitor;if(!C||!C.Plugins||!C.Plugins.PushNotifications||!(C.isNativePlatform&&C.isNativePlatform()))return;
 var P=C.Plugins.PushNotifications,done='',busy=false;
 try{P.createChannel({id:'messages',name:'Messages',description:'New messages',importance:5,visibility:0,vibration:true,sound:'default'})}catch(_){}
 P.addListener('registration',function(t){try{localStorage.setItem('cl_push',t.value)}catch(_){}reg(t.value)});
 P.addListener('registrationError',function(e){console.log('push error',JSON.stringify(e))});
 P.addListener('pushNotificationActionPerformed',function(a){try{var d=(a.notification&&a.notification.data)||{},L=convs();
  for(var i=0;i<L.length;i++){if(String(L[i].cid)===String(d.conv_id)){openChat(L[i]);break}}}catch(_){}});
 function reg(tok){if(!tok||!window.CLA||!CLA.active())return;var k=CLA.active().id+':'+tok;if(done===k)return;
  CLA.call('push_register',{token:tok,platform:'android'}).then(function(r){if(r&&r.ok)done=k})}
 function init(){if(busy||!window.CLA||!CLA.active())return;busy=true;
  P.checkPermissions().then(function(p){return p.receive==='granted'?p:P.requestPermissions()}).then(function(p){
   if(p.receive!=='granted'){busy=false;return}
   var t='';try{t=localStorage.getItem('cl_push')||''}catch(_){}
   if(t)reg(t);P.register();busy=false}).catch(function(){busy=false})}
 setInterval(function(){if(window.CLA&&CLA.active()){init();var t='';try{t=localStorage.getItem('cl_push')||''}catch(_){}if(t)reg(t)}},4000);
 try{var lo=CLA.logoutActive;CLA.logoutActive=function(){var t='';try{t=localStorage.getItem('cl_push')||''}catch(_){}
  var p=t?CLA.call('push_unregister',{token:t},{timeout:3000,noauth:false}).catch(function(){}):Promise.resolve();
  done='';return p.then(function(){return lo.call(CLA)})}}catch(_){}}

function boot(){
 if(!HOME_UI){push();return}
 if(!build()){setTimeout(boot,150);return}
 stories();
 try{new MutationObserver(function(){stories()}).observe($('stories'),{childList:true})}catch(_){}
 var box=$('convs'),obs=new MutationObserver(function(){obs.disconnect();try{deco()}catch(_){}obs.observe(box,{childList:true})});
 obs.observe(box,{childList:true});deco();
 var pf=$('profb');if(pf)try{new MutationObserver(stories).observe(pf,{childList:true})}catch(_){}
 setInterval(counts,1500);
 push()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
