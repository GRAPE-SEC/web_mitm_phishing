/*
'=======================================================================
'업 무 명 : 메가스터디-common
'모듈기능 : 메가스터디 스크롤 메뉴 js 파일
'파 일 명 : scroolMenu.js
'작성일자 : 2004/11/10
'작 성 자 : 김영무
'-----------------------------------------------------------------------
'변경일자   변경자  변동내역
'=======================================================================
'
'=======================================================================
*/

var stmnLEFT = 868; // 스크롤메뉴의 좌측 위치. 필요 없을 경우 삭제
var stmnGAP1 = 228 // 페이지 헤더부분의 여백 (이보다 위로는 올라가지 않음) : 검색바 이전 111 (41증가)
//var stmnGAP2 = 10; // 스크롤시 브라우저 상단과 약간 띄움. 필요없으면 0으로 세팅
var stmnGAP2 =  10; // 스크롤시 브라우저 상단과 약간 띄움. 필요없으면 0으로 세팅
var stmnBASE = 200; // 스크롤메뉴 초기 시작위치 (아무렇게나 해도 상관은 없지만 stmnGAP1과 약간 차이를 주는게 보기 좋음)
var stmnActivateSpeed = 100; // 움직임을 감지하는 속도 (숫자가 클수록 늦게 알아차림)
var stmnScrollSpeed = 10; // 스크롤되는 속도 (클수록 늦게 움직임)

var stmnTimer;

// 스크롤 메뉴의 위치 갱신
function RefreshStaticMenu()
{	 
	//try{
        var stmnStartPoint, stmnEndPoint, stmnRefreshTimer;
		
        stmnStartPoint = parseInt(STATICMENU.style.top, 10);
        stmnEndPoint = Math.max(document.documentElement.scrollTop,document.body.scrollTop) + stmnGAP2;
        if (stmnEndPoint < stmnGAP1) stmnEndPoint = stmnGAP1;
        stmnRefreshTimer = stmnActivateSpeed;

        if ( stmnStartPoint != stmnEndPoint ) {
                stmnScrollAmount = Math.ceil( Math.abs( stmnEndPoint - stmnStartPoint ) / 15 );
                STATICMENU.style.top = parseInt(STATICMENU.style.top, 10) + ((stmnEndPoint < stmnStartPoint) ? -stmnScrollAmount : stmnScrollAmount);
                stmnRefreshTimer = stmnScrollSpeed;
        }

        stmnTimer = setTimeout ("RefreshStaticMenu();", stmnRefreshTimer);
	//}catch(e){}
}

// 메뉴 ON/OFF 하기
function ToggleAnimate()
{
		if (ANIMATE.checked) {	// 이동하기 버튼이 체크되었다면
		        RefreshStaticMenu(); // 메뉴위치를 다시 조정
                scrCookie("ANIMATE", "true", 1, 1); // 이동이 ON 상태라고 쿠키를 설정
				document.getElementById("STATICMENU").style.position = "absolute";
       }
        else {	// 아니라면... (이동하기 버튼이 체크되어 있지 않으면)
                clearTimeout(stmnTimer); // 이동용 타이머 해제
                STATICMENU.style.top = stmnGAP1; // 메뉴의 위치를 상단으로 옮긴다.
                scrCookie("ANIMATE", "false", 1, 1); // 이동이 ON 상태라고 쿠키를 설정
        }
}

// 메뉴 초기화
function InitializeStaticMenu()
{
	try{
			if (RedCookie("ANIMATE", 1) == "true") {	// 이동 on 상태라면
					ANIMATE.checked = true; // 체크표시를 하고
					STATICMENU.style.top = Math.max(document.documentElement.scrollTop,document.body.scrollTop) + stmnBASE; // 기본위치로 이동한다.
					RefreshStaticMenu(); // 스크립트 가동
			}
			else {	// 이동상태가 off 상태라면
					ANIMATE.checked = false; // 체크표시를 지우고
					STATICMENU.style.top = Math.max(document.documentElement.scrollTop,document.body.scrollTop) + stmnGAP1; // 맨 위에 들러 붙는다.
			}

			//STATICMENU.style.left = stmnLEFT; // 메뉴 왼쪽 위치 초기화. 필요없을 경우 삭제

	}catch(e){}
}


// 쿠키 읽기
function RedCookie(name, cookie_num)
{
	var eventCookie=getCookie("ANIMATE");
    if(eventCookie.length==0){
    	eventCookie="false/true";
    }    
    var arr_pop=new Array(1),new_value;
    arr_pop=eventCookie.split("/");
    return unescape(arr_pop[parseInt(cookie_num)-1]);
}

//쿠키 세트
function scrCookie( name, value, expiredays, cookie_num )
{ 
    var todayDate = new Date(); 
    todayDate.setDate( todayDate.getDate() + expiredays );
	var eventCookie=getCookie("ANIMATE");
    if(eventCookie.length==0){
    	eventCookie="false/true";
    }    
    var arr_pop=new Array(1),new_value;
    arr_pop=eventCookie.split("/");
    arr_pop[parseInt(cookie_num)-1]=value;   
   
    new_value=arr_pop[0]+"/"+arr_pop[1];  
    document.cookie = name + "=" + escape( new_value ) + "; domain=megastudy.net ; path=/; expires=" + todayDate.toGMTString() + ";" 
} 

// 스크롤 메뉴의 위치 갱신
/*
function RefreshStaticMenu()
{
try{
        var stmnStartPoint, stmnEndPoint, stmnRefreshTimer;

        stmnStartPoint = parseInt(STATICMENU.style.top, 10);
        stmnEndPoint = document.body.scrollTop + stmnGAP2;
        if (stmnEndPoint < stmnGAP1) stmnEndPoint = stmnGAP1;

        stmnRefreshTimer = stmnActivateSpeed;

        if ( stmnStartPoint != stmnEndPoint ) {
                stmnScrollAmount = Math.ceil( Math.abs( stmnEndPoint - stmnStartPoint ) / 15 );
                STATICMENU.style.top = parseInt(STATICMENU.style.top, 10) + ( ( stmnEndPoint<stmnStartPoint ) ? -stmnScrollAmount : stmnScrollAmount );
                stmnRefreshTimer = stmnScrollSpeed;
        }

        stmnTimer = setTimeout ("RefreshStaticMenu();", stmnRefreshTimer);
}catch(e){}
}
*/

// 메뉴 ON/OFF 하기
function ToggleAnimate1()
{
        if (ANIMATE1.checked) {		// 이동하기 버튼이 체크되었다면
                RefreshStaticMenu(); // 메뉴위치를 다시 조정
                scrCookie("ANIMATE", "true", 1, 2); // 이동이 ON 상태라고 쿠키를 설정
        }
        else {	// 아니라면... (이동하기 버튼이 체크되어 있지 않으면)
                clearTimeout(stmnTimer); // 이동용 타이머 해제
                STATICMENU.style.top = stmnGAP1; // 메뉴의 위치를 상단으로 옮긴다.
                scrCookie("ANIMATE", "false", 1, 2); // 이동이 ON 상태라고 쿠키를 설정
        }
}

// 메뉴 초기화
function InitializeStaticMenu1() {

   // alert('dd');
try{
        if (RedCookie("ANIMATE", 1) == "true") {	// 이동 on 상태라면
                ANIMATE1.checked = true; // 체크표시를 하고
                STATICMENU.style.top = document.body.scrollTop + stmnBASE; // 기본위치로 이동한다.
                RefreshStaticMenu(); // 스크립트 가동
        }
        else {	// 이동상태가 off 상태라면
                ANIMATE1.checked = false; // 체크표시를 지우고
                STATICMENU.style.top = document.body.scrollTop + stmnGAP1; // 맨 위에 들러 붙는다.
        }

        //STATICMENU.style.left = stmnLEFT; // 메뉴 왼쪽 위치 초기화. 필요없을 경우 삭제

}catch(e){}
}
