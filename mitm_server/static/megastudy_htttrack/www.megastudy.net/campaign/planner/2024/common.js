function scroll_menu()
{
  var $doc           = $(document);
  var position       = 0;
  var top = $doc.scrollTop(); //현재 스크롤바 위치
  var screenSize     = 0;        // 화면크기
  var halfScreenSize = 0;    // 화면의 반

  /*사용자 설정 값 시작*/
  var speed          = 500;     // 따라다닐 속도 : "slow", "normal", or "fast" or numeric(단위:msec)
  var easing         = 'swing'; // 따라다니는 방법 기본 두가지 linear, swing
  var $layer         = $('#lnb'); // 레이어 셀렉팅
  var layerTopOffset = 46;   // 레이어 높이 상한선, 단위:px
  $layer.css('z-index', 10);   // 레이어 z-인덱스
  /*사용자 설정 값 끝*/

  // 스크롤 바를 내린 상태에서 리프레시 했을 경우를 위해
  if (top > 0 )
    $doc.scrollTop(layerTopOffset+top);
  else
    $doc.scrollTop(0);

  // 최초 레이어가 있을 자리 세팅
  $layer.css('top',layerTopOffset);

  //스크롤이벤트가 발생하면
  $(window).scroll(function(){
    yPosition = $doc.scrollTop()+layerTopOffset;
    $layer.animate({"top":yPosition }, {duration:speed, easing:easing, queue:false});
  });	
}

function tabmenu()
{
	$('#tabmenu img').each(function(e){
	
		$(this).click(function() {
			
			var r = e+1;
			var t = (r == 2) ? 1:2;
			var menu = $('#tabmenu img');

			if($('#con0'+r).css("display")  == "block") return false;
			for(var i=1 ; i <= $('#tabmenu img').length ;i++)
			{
				if(i == r){
					$('#con0'+i).css({display:'block'});
					menu[i-1].src = menu[i-1].src.replace(".png","_on.png");
				}else{
					$('#con0'+i).css({display:'none'});
					menu[i-1].src = menu[i-1].src.replace("_on.png",".png");
				}
			}

		});	
	
	})
}

//애니메이션 스크립트 시작 
var AniNum = 1;
var playFlg = true; 
var subTid = null;
var ClickFlg = false;
$(document).ready(function(){
	playFlg = false;
	fncPlay(AniNum);

	//좌우 버튼
	$(".prev").click(function(){
		fncPrev();
	}).hover(function(){
		var imgSrc = $(this).attr("src");
		$(this).attr("src",imgSrc.replace(".gif","_on.gif"));
	},function(){
		var imgSrc = $(this).attr("src");
		$(this).attr("src",imgSrc.replace("_on.gif",".gif"));
	});

	$(".next").click(function(){
		fncNext();
	}).hover(function(){
		var imgSrc = $(this).attr("src");
		$(this).attr("src",imgSrc.replace(".gif","_on.gif"));
	},function(){
		var imgSrc = $(this).attr("src");
		$(this).attr("src",imgSrc.replace("_on.gif",".gif"));
	});
	
	$(".SubPrevBtn").hover(function(){
		var imgSrc = $(this).attr("src");		
		$(this).attr("src",imgSrc.replace(".png","_on.png"));
	},function(){
		var imgSrc = $(this).attr("src");
		$(this).attr("src",imgSrc.replace("_on.png",".png"));
	});

	$(".SubNextBtn").hover(function(){
		var imgSrc = $(this).attr("src");		
		$(this).attr("src",imgSrc.replace(".png","_on.png"));
	},function(){
		var imgSrc = $(this).attr("src");
		$(this).attr("src",imgSrc.replace("_on.png",".png"));
	});
	
	//left메뉴 롤오버 추가
	$("#lnb").find("a").each(function(idx){
		var intMenuNum = idx + 1;
		var replaceUrl = "";

		if(MenuNum != intMenuNum){
			$(this).hover(function(){
				$(this).addClass("on");
			},function(){			
				$(this).removeClass("on");
			});
		}else{
			$(this).addClass("on");
		}
		
		$(this).click(function(){
			MenuNum = intMenuNum;
			fncClickLeftMenu();
		});
	});
	
	//아이프레임 높이 조정
	$("#iFrameContents").load(function(){
		fncSetFrameHeight();
	});
	fncSetFrameHeight();
});

//레프트 메뉴 클릭 이벤트
function fncClickLeftMenu(){
	if(MenuNum == 7) return;

	$("body").removeClass("scholar_bg");
	$("body").removeClass("event_bg");

	if(MenuNum == 1){
		replaceUrl = "iframe_scholar.asp";
		$("body").addClass("scholar_bg"); 
	}
	if(MenuNum == 2) replaceUrl = "iframe_main.asp";
	if(MenuNum == 3) replaceUrl = "iframe_sub02.asp";
	if(MenuNum == 4) replaceUrl = "iframe_sub03.asp";
	if(MenuNum == 5) replaceUrl = "iframe_sub04.asp";
	if(MenuNum == 6) {
		replaceUrl = "iframe_event.asp";
		$("body").addClass("event_bg");
	}		
	
	ClickFlg = true;
	$("#iFrameContents").attr("src",replaceUrl);			
	fncSetLeftMenu();
}

function fncSetFrameHeight(){
	$("#iFrameContents").removeAttr("height");
	 var iFrameHeight = $("#iFrameContents").contents().find("#container").outerHeight() ;
	 $("#iFrameContents").attr("height",iFrameHeight+"px");
	 if(ClickFlg) location.href = "#iFrameName";
}

//레프트 메뉴 세팅..
function fncSetLeftMenu(){
	$("#lnb").find("a").each(function(idx){
		$(this).unbind("hover");
		if(MenuNum != idx+1){
			$(this).removeClass("on");			
			$(this).hover(function(){
				$(this).addClass("on");
			},function(){			
				$(this).removeClass("on");
			});
		}else{
			$(this).hover(function(){
				$(this).addClass("on");
			},function(){			
				$(this).addClass("on");
			});
		}
	}); 
}

//좌우 움직임 설정
function fncNext(){
	if(playFlg) return;

	if(AniNum < 6){
		AniNum++;
		$(".next").show();
	}else{
		//처음일때... 화살표 삭제..
		$(".next").hide();
	}

	fncPlay(AniNum);
}

function fncPrev(){
	if(playFlg) return;
	if(AniNum >1) {
		AniNum--;
		$(".prev").show();
	}else{
		//처음일때... 화살표 삭제..
		$(".prev").hide();
	}
	fncPlay(AniNum);
}

//실행 함수 설정.
function fncPlay(pVal){
	if(playFlg) return;

	AniNum = pVal;
	fncAniInit();
	fncPaging();

	if(pVal == 1) Obj01();
	if(pVal == 2) Obj02();
	if(pVal == 3) Obj03();
	if(pVal == 4) Obj04();
	if(pVal == 5) Obj05();
	if(pVal == 6) Obj06();
}

//애니 메이션 초기화
function fncAniInit(){
	playFlg = true;

	if(AniNum == 1) {
		$(".prev").hide();
	}else{
		$(".prev").show();
		$(".next").show();
	}

	if(AniNum == 6) {
		$(".next").hide();
		$(".prev").hide();
	}

	fncDivHide("vi02");
	fncDivHide("vi03");
	fncDivHide("vi04");
	fncDivHide("vi05");
	fncDivHide("vi06");
	fncDivHide("vi07");
	fncDivHide("vi0702");
	fncDivHide("vi08");
	$(".paging").show();

	fncSubAniStart();
}

function fncDivHide(pTarget){
	$("#"+pTarget).find("span").each(function(){
		$(this).hide();
	});
}

//페이징 표현
function fncPaging(){
	try{

		$(".paging").find("img").each(function(idx){
			var imgSrc = $(this).attr("src");
			if(imgSrc != "undefinded") $(this).attr("src",imgSrc.replace("_on.gif",".gif") );

			$(this).unbind("click");

			$(this).click(function(){
				fncPlay(idx+1);
			});
		});

		var imgSrc = $(".paging").find("img").eq(AniNum-1).attr("src");	
		$(".paging").find("img").eq(AniNum-1).attr("src",imgSrc.replace(".gif","_on.gif") );
	}catch(e){}
}

//자동 페이지 전환 시작...
var tid = "";

function fncNextStart(pVal){
	clearTimeout(tid);
	playFlg = false;

	tid = setTimeout(function(){
		fncPlay(pVal);
	},2000);
}

function Obj01(){
	$("#vi02_01").css({width:"1px"}).delay(600).animate({owidth:"307px"},400);
	$("#vi02_02").css({width:"1px"}).delay(500).animate({width:"297px"},500);
	$("#vi02_03").css({height:"1px"}).animate({height:"292px"},500);
	$("#vi02_04").css({height:"1px"}).delay(1000).animate({height:"489px"},700,function(){
		fncNextStart(2);
	});
}


function Obj02(){
	$("#vi03_04").css({height:"1px"}).animate({height:"268px"},700);
	$("#vi03_01").css({height:"1px",top:"200px"}).delay(700).animate({height:"41px",top:"210px"},300);
	$("#vi03_02").css({height:"1px",top:"255px"}).delay(1050).animate({height:"46px",top:"265px"},300);
	$("#vi03_05").css({height:"1px"}).delay(1200).animate({height:"489px"},700);
	$("#vi03_03").css({height:"80px"}).delay(2500).animate({height:"158px"},500,function(){
		fncNextStart(3);
	});
}

function Obj03(){
	$("#vi04_03").css({height:"1px"}).animate({height:"158px"},500);
	$("#vi04_01").css({width:"1px",left:"49px"}).delay(400).animate({width:"215px",left:"79px"},700);
	$("#vi04_02").css({width:"1px",left:"43px"}).delay(800).animate({width:"329px",left:"73px"},700);
	$("#vi04_05").css({height:"1px"}).delay(3000).animate({height:"489px"},700,function(){
		fncNextStart(4);
	});
	$("#vi04_04").css({height:"1px"}).delay(2000).animate({height:"95px"},450);
}

function Obj04(){
	$("#vi05_01").clearQueue().css({top:"149px",width:"1px",height:"1px"}).animate({top:"195px",width:"276px",height:"276px",easing:"linear"},700);
	$("#vi05_02").clearQueue().removeClass("none").delay(500).css({top:"210px",width:"1px",height:"1px"}).animate({top:"264px",width:"276px",height:"276px",easing:"linear"},700);
	$("#vi05_03").clearQueue().removeClass("none").delay(1000).css({top:"116px",width:"1px",height:"1px"}).animate({top:"162px",width:"276px",height:"276px",easing:"linear"},700);
	$("#vi05_05").clearQueue().delay(2000).css({height:"1px"}).animate({height:"489px"},500);
	$("#vi05_04").clearQueue().delay(3000).css({height:"1px"}).animate({height:"73px"},500);

	$("#vi05_05,#vi05_04,#vi05_01,#vi05_02,#vi05_03").delay(2850).queue(function(){
		$(this).css("display","none");
	});
	$("#vi05_06").delay(3500).animate({opacity:1,height:"460px"},50).delay(2000).fadeTo(500,0.31);

	$("#vi05_07").css({height:"1px"}).delay(5800).animate({height:"343px"},500);
	$("#vi05_08").css({height:"1px"}).delay(5800).animate({height:"343px"},500);
	$("#vi05_09").css({width:"1px"}).delay(5800).animate({width:"397px"},500);
	$("#vi05_10").delay(9400).css({width:"190px",height:"1px"}).animate({width:"190px",height:"190px",easing:"linear"},400);
	$("#vi05_12").delay(10200).css({width:"190px",height:"1px"}).animate({width:"190px",height:"190px",easing:"linear"},400);
	$("#vi05_11").delay(11000).css({width:"190px",height:"1px"}).animate({width:"190px",height:"190px",easing:"linear"},400);
	$("#vi05_13").delay(12900).css({width:"1px",height:"1px"}).animate({width:"513px",height:"405px",easing:"linear"},500,function(){
		fncNextStart(5);
		//$("#vi05_01,#vi05_02,#vi05_03,#vi05_04,#vi05_05").delay(3100);
	});
}

function Obj05(){
	$("#vi06_03").fadeIn(700);
	$("#vi06_01").css({width:"5px",right:"530px"}).delay(600).animate({width:"126px",right:"532px"},300);
	$("#vi06_02").css({width:"1px",left:"381px"}).delay(900).animate({width:"282px",left:"361px"},500,function(){
		setTimeout(function(){fncNextStart(6)},3000);
	});
}

function Obj06(){

	$("#vi07_01").css({width:"1px",left:"58px"}).animate({width:"429px",left:"108px"},500);
	$("#vi07_02").delay(600).fadeIn(200);
	$("#vi07_06").delay(1000).fadeIn(700);

	$("#vi07_07").delay(2500).css({height:"1px"}).animate({height:"245px"},400,function(){
		clearTimeout(tid);
		playFlg = false;
	});

	//목표달성 장학생
	$("#vi07_03").unbind("click");
	$("#vi07_03").css({left:"56px"}).delay(1900).animate({width:"184px",left:"105px"},300).click(function(){
		if(playFlg) return false;
		fncAniInit();
		$(".paging").hide();
		Obj06_02();
	});

	//메가스터디 팀플
	$("#vi07_04").unbind("click");
	$("#vi07_04").css({left:"250px"}).delay(1900).animate({width:"184px",left:"300px"},300).click(function(){
		if(playFlg) return false;
		fncAniInit();
		c_count = 1;
		$(".paging").hide();
		Obj07();
	});
	$("#vi07_05").fadeIn(700);

	//재학생 연합반
	$("#vi07_08").click(function(){
		//$("#vi07 span").css({display:"none"});
		//$("#vi07").css({display:"none",zIndex:"1"});
		if(playFlg) return false;
		fncAniInit();
		$(".paging").hide();
		Obj06_05();
		return false;
	});

	//단과반
	$("#vi07_09").click(function(){
		//$("#vi07 span").css({display:"none"});
		//$("#vi07").css({display:"none",zIndex:"1"});
		if(playFlg) return false;
		fncAniInit();
		$(".paging").hide();
		Obj06_06();
		return false;
	});

	//중등부
	$("#vi07_10").click(function(){
		//$("#vi07 span").css({display:"none"});
		//$("#vi07").css({display:"none",zIndex:"1"});
		if(playFlg) return false;
		fncAniInit();
		$(".paging").hide();
		Obj06_07();
		return false;
	});
}

//<!-- 재학생 연합반 -->
function Obj06_05(){

	$("#vi08_12").css({width:"1px",left:"58px"}).animate({width:"429px",left:"108px"},500);
	$("#vi08_11").delay(600).fadeIn(200);
	$("#vi08_13").css({top:"129px",left:"40px"}).delay(600).animate({width:"740px",top:"159px",left:"70px"},300);
	$("#vi08_14").css({left:"800px"}).delay(900).animate({width:"29px",left:"810px"},300,function(){
		playFlg = false;
	}).click(function(){
		/*
		$("#vi08 span").css({display:"none"});
		$("#vi08").css({display:"none",zIndex:"1"});
		$("#vi06").css({display:"block"});
		*/
		fncPlay(6);

	})
	$("#vi08_5").css({top:"129px",left:"40px"}).delay(600).animate({width:"740px",top:"159px",left:"70px"},300);

	$("#prev").unbind("click");
	$("#prev").delay(900).fadeOut(200).click(function(){
		Obj06_03("vi08_5","vi08_6","prev","next");
	});

	$("#next").unbind("click");
	$("#next").delay(900).fadeIn(200).click(function(){
		Obj06_03("vi08_6","vi08_5","next","prev");
	});
	
	clearTimeout(subTid);

	subTid = setTimeout(function(){		
		Obj06_03("vi08_6","vi08_5","next","prev");
		fncSubAniEnd();
	},3000);
}
//단과반
function Obj06_06(){

	$("#vi08_12").css({width:"1px",left:"58px"}).animate({width:"429px",left:"108px"},500);
	$("#vi08_11").delay(600).fadeIn(200);
	$("#vi08_13").css({top:"129px",left:"40px"}).delay(600).animate({width:"740px",top:"159px",left:"70px"},300);
	$("#vi08_14").css({left:"800px"}).delay(900).animate({width:"29px",left:"810px"},300,function(){
		playFlg = false;
	}).click(function(){
		/*
		$("#vi08 span").css({display:"none"});
		$("#vi08").css({display:"none",zIndex:"1"});
		$("#vi06").css({display:"block"});
		*/
		fncPlay(6);

	})
	$("#vi08_7").css({top:"129px",left:"40px"}).delay(600).animate({width:"740px",top:"159px",left:"70px"},300);

	$("#prev").unbind("click");
	$("#prev").click(function(){
		Obj06_03("vi08_7","vi08_8","prev","next");
	});

	$("#next").unbind("click");
	$("#next").delay(900).fadeIn(200).click(function(){
		Obj06_03("vi08_8","vi08_7","next","prev");
	});

	clearTimeout(subTid);

	subTid = setTimeout(function(){
		Obj06_03("vi08_8","vi08_7","next","prev");
		fncSubAniEnd();
	},3000);
}

//중등부
function Obj06_07(){

	$("#vi08_12").css({width:"1px",left:"58px"}).animate({width:"429px",left:"108px"},500);
	$("#vi08_11").delay(600).fadeIn(200);
	$("#vi08_13").css({top:"129px",left:"40px"}).delay(600).animate({width:"740px",top:"159px",left:"70px"},300);
	$("#vi08_14").css({left:"800px"}).delay(900).animate({width:"29px",left:"810px"},300,function(){
		playFlg = false;
	}).click(function(){
		/*
		$("#vi08 span").css({display:"none"});
		$("#vi08").css({display:"none",zIndex:"1"});
		$("#vi06").css({display:"block"});
		*/
		fncPlay(6);

	})
	$("#vi08_9").css({top:"129px",left:"40px"}).delay(600).animate({width:"740px",top:"159px",left:"70px"},300);

	$("#prev").unbind("click");
	$("#prev").click(function(){
		Obj06_03("vi08_9","vi08_10","prev","next");
	});
	$("#next").unbind("click");
	$("#next").delay(900).fadeIn(200).click(function(){
		Obj06_03("vi08_10","vi08_9","next","prev");
	});
	
	clearTimeout(subTid);
	subTid = setTimeout(function(){
		Obj06_03("vi08_10","vi08_9","next","prev");
		fncSubAniEnd();
	},3000);
}

//목표달성 장학생
function Obj06_02(){
	$("#vi0702_01").css({width:"1px",left:"58px"}).animate({width:"429px",left:"108px"},500);
	$("#vi0702_08").fadeIn(200);
	$("#vi0702_02").delay(600).css({width:"736px",height:"408px"}).animate({width:"746px",height:"418px"},500)
	$("#vi0702_03").css({left:"800px"}).delay(900).animate({width:"29px",left:"810px"},300);
	$("#vi0702_04").css({top:"129px",left:"40px"}).delay(900).animate({width:"740px",top:"159px",left:"70px"},300);
	
	$("#vi0702_09").delay(500).css({width:"396px",height:"413px",top:"109px"}).animate({width:"396px",height:"413px",top:"159px"},460);
	$("#vi0702_10").delay(700).css({width:"396px",height:"413px",top:"109px"}).animate({width:"396px",height:"413px",top:"159px"},450);
	$("#vi0702_11").delay(900).css({width:"396px",height:"413px",top:"109px"}).animate({width:"396px",height:"413px",top:"159px"},440);
	$("#vi0702_12").delay(1100).css({width:"396px",height:"413px",top:"109px"}).animate({width:"396px",height:"413px",top:"159px"},430);
	$("#vi0702_13").delay(1200).css({width:"396px",height:"413px",top:"109px"}).animate({width:"396px",height:"413px",top:"159px"},420);
	$("#vi0702_14").delay(1700).css({width:"396px",height:"413px",top:"139px"}).animate({width:"396px",height:"413px",top:"159px"},410,function(){
		playFlg = false;
	});

	$("#vi0702_07").unbind("click");
	$("#vi0702_07").delay(900).fadeIn(200).click(function(){
		if(playFlg) return false;
		Obj06_03("vi0702_05","vi0702_04","vi0702_07","vi0702_06");
		$("#vi0702_09,#vi0702_10,#vi0702_11,#vi0702_12,#vi0702_13,#vi0702_14").css('display','none');
	});

	$("#vi0702_06").unbind("click");
	$("#vi0702_06").delay(900).fadeIn(200).fadeOut(100).click(function(){
		if(playFlg) return false;
		Obj06_03("vi0702_04","vi0702_05","vi0702_06","vi0702_07");
		$("#vi0702_09,#vi0702_10,#vi0702_11,#vi0702_12,#vi0702_13,#vi0702_14").css('display','block');
	});

	$("#vi0702_03").click(function(){
		if(playFlg) return false;
		clearTimeout(subTid);
		fncPlay(6);
	});

	clearTimeout(subTid);
	subTid = setTimeout(function(){
		Obj06_03("vi0702_05","vi0702_04","vi0702_07","vi0702_06");
		$("#vi0702_09,#vi0702_10,#vi0702_11,#vi0702_12,#vi0702_13,#vi0702_14").css('display','none');
		fncSubAniEnd();
	},4610);
}

function Obj06_04(t01,t02){
	$("#"+t02+" span").css({display:"none"});
	$("#"+t01).css({display:"block",zIndex:"100"});
	$("#"+t02).css({display:"none",zIndex:"1"});
}

function Obj06_03(obj1,obj2,obj3,obj4){
	$("#"+obj1).css({top:"129px",left:"40px"}).animate({width:"740px",top:"159px",left:"70px"},300,function() {$(this).show() });
	$("#"+obj2).css({top:"159px",left:"70px"}).animate({width:"740px",top:"129px",left:"40px"},300,function() {$(this).hide() });
	$("#"+obj3).fadeOut(300);
	$("#"+obj4).fadeIn(300);
}

//메가스터디 팀플
function Obj07(t01,t02){

	$("#vi08_12").css({width:"1px",left:"58px"}).animate({width:"429px",left:"108px"},500);
	$("#vi08_11").delay(600).fadeIn(200);
	$("#vi08_13").css({top:"129px",left:"40px"}).delay(600).animate({width:"740px",top:"159px",left:"70px"},300);
	$("#vi08_14").css({left:"800px"}).delay(900).animate({width:"29px",left:"810px"},300);

	$("#vi08_1").css({top:"129px",left:"40px"}).delay(900).animate({width:"740px",top:"159px",left:"70px"},300,function(){
		playFlg = false;
	});


	$("#prev").hide();
	$("#prev").unbind("click");
	$("#prev").delay(900).click(function(){
		if(playFlg) return false;
		clearTimeout(subTid);
		obj07_02_prev();
	});

	$("#next").unbind("click");
	$("#next").delay(900).fadeIn(200).click(function(){
		if(playFlg) return false;
		clearTimeout(subTid);
		obj07_02_next();
	});

	$("#vi08_14").click(function(){
		if(playFlg) return false;
		clearTimeout(subTid);
		fncPlay(6);
	});
	
	clearTimeout(subTid);
	subTid = setTimeout(function(){
		obj07_02_next_auto();
	},6000);
}

var c_count = 1;

function obj07_02_prev(){
	var hiddenCnt = c_count;
	c_count--;

	clearTimeout(subTid);

	if(c_count == 1) $("#prev").hide();

	if(c_count == 0){
		c_count = 1;
		return false;
	}
	
	$("#next").show();

	fncObj8Init();
	$("#vi08_"+c_count).css({top:"129px",left:"40px"}).animate({width:"740px",top:"159px",left:"70px"},300);
	$("#vi08_"+c_count).fadeIn(300);
	$("#vi08_"+hiddenCnt).css({top:"159px",left:"70px"}).animate({width:"740px",top:"129px",left:"40px"},300);
	$("#vi08_"+hiddenCnt).fadeOut(300);
}

function obj07_02_next_auto(){
	clearTimeout(subTid);
	if(c_count < 4) {
		obj07_02_next();		
		subTid = setTimeout(function(){
			obj07_02_next_auto();
		},6000);
	}
}

function obj07_02_next(){
	var hiddenCnt = c_count;
	c_count++;

	if(c_count == 4){
		$("#next").hide();
		fncSubAniEnd();
	}
	else  $("#next").show();
	if(c_count > 4) {
		c_count = 4;		
		return false;
	}

	$("#prev").show();

	fncObj8Init();
	$("#vi08_"+c_count).css({top:"129px",left:"40px"}).animate({width:"740px",top:"159px",left:"70px"},300);
	$("#vi08_"+c_count).fadeIn(300);
	$("#vi08_"+hiddenCnt).css({top:"159px",left:"70px"}).animate({width:"740px",top:"129px",left:"40px"},300);
	$("#vi08_"+hiddenCnt).fadeOut(300);
}

function fncObj8Init(){
	if(c_count != 1) $("#vi08_1").hide();
	if(c_count != 2) $("#vi08_2").hide();
	if(c_count != 3) $("#vi08_3").hide();
	if(c_count != 4) $("#vi08_4").hide();
}

function fncSubAniStart(){
	$(".MainBtn").each(function(){
		$(this).attr("src",$(this).attr("src").replace("vi_top07_09_end.gif","vi_top07_09.gif") );
	});
}

function fncSubAniEnd(){
	$(".MainBtn").each(function(){
		$(this).attr("src",$(this).attr("src").replace("vi_top07_09.gif","vi_top07_09_end.gif") );
	});
}