/*
'=======================================================================
'업 무 명 : 메가스터디-common
'모듈기능 : 메가스터디 공통 js 파일
'파 일 명 : megastudy.js
'작성일자 : 2004/11/10
'작 성 자 : 김영무
'-----------------------------------------------------------------------
'변경일자   변경자  변동내역
'=======================================================================
'
'=======================================================================
*/

// 함수이름 : mouseOver()
// 함수설명 : 메뉴 롤오버 (전 사이트에 적용)
// 입 력 값 : 객체, 속성
// 반 환 값 :
function mouseOver(obj, bool) {
    if (bool)
        obj.src = obj.src.replace("off", "on");
    else
        obj.src = obj.src.replace("on", "off");
}

// 함수이름 : change_img()
// 함수설명 : 메뉴 롤오버 (전 사이트에 적용)
// 입 력 값 : 객체, 속성
// 반 환 값 :
function change_img(obj, tmp_a, tmp_b) {
    obj.src = obj.src.replace(tmp_a, tmp_b);
}

// 함수이름 : change_img2()
// 함수설명 : 메뉴 롤오버 (전 사이트에 적용)
// 입 력 값 : 객체, 교체전, 교체후
// 반 환 값 :
function change_img2(obj, tmp_a, tmp_b) {
    obj.style.filter = "blendTrans(duration=0.3)";
    obj.filters.blendTrans.stop();
    obj.filters.blendTrans.Apply();
    obj.src = obj.src.replace(tmp_a, tmp_b);
    obj.filters.blendTrans.Play();
}

// 함수이름 : change_img3()
// 입 력 값 : 객체, 교체전, 교체후 , 교체속도 ( 0.1 ~2 )
// 입 력 값 : 객체, 속성
// 반 환 값 :
function change_img3(obj, tmp_a, tmp_b, t_speed) {
    var a = 1;
    a = t_speed;
    var c = a.toString();

    eval('obj.style.filter="blendTrans(duration=' + c + ')"');
    obj.filters.blendTrans.stop();
    obj.filters.blendTrans.Apply();
    obj.src = obj.src.replace(tmp_a, tmp_b);
    obj.filters.blendTrans.Play();
}

// 함수이름 : openWin()
// 함수설명 : 새창 열기
// 입 력 값 : url, 새창 이름, 속성
// 반 환 값 :
function openWin(theURL, winName, features) {
    window.open(theURL, winName, features);
}

// 함수이름 : check_id()
// 함수설명 : 아이디 체크
// 입 력 값 : 아이디
// 반 환 값 :
function check_id(input) {
    var err_cnt = 0
    for (var i = 0; i < input.length; i++) {
        var val = input.charAt(i);
        if (!((val >= "0" && val <= "9") || (val >= "a" && val <= "z") || (val >= "A" && val <= "Z")))
            err_cnt++
    }
    if (err_cnt == 0)
        return true;
    else
        return false;
}

function check_id_New(input) {
    var err_cnt = 0
    for (var i = 0; i < input.length; i++) {
        var val = input.charAt(i);
        if (!((val >= "0" && val <= "9") || (val >= "a" && val <= "z") || (val >= "A" && val <= "Z") || val == "-"))
            err_cnt++
    }
    if (err_cnt == 0)
        return true;
    else
        return false;
}

function check_Pwd(input) {
	/*
    var err_cnt = 0
    for (var i = 0; i < input.length; i++) {
        var val = input.charAt(i);
        if (!((val >= "0" && val <= "9") || (val >= "a" && val <= "z") || (val >= "A" && val <= "Z") || val == "!" || val == "@" || val == "$" || val == "^" || val == "&" || val == "*"))
            err_cnt++
    }
    if (err_cnt == 0)
        return true;
    else
        return false;
	*/

	var nCharacter = 0;
	var nNumber = 0;
	var nSpecial = 0;
	var bPassWordRuleChk = false;       
	// 숫자 체크
	if (input.match(/[0-9]/) != null) {
		nNumber++;
	}
	//특수 기호 체크
	// if (input.match(/[^\w\s]/) != null) {
	// 	nSpecial++;
	// }

    //특수 기호 체크
	if (input.match(/[~!@#$%^&*()_-]/) != null) {
		nSpecial++;
	}

	//영문자 체크
	if (input.match(/[a-zA-Z]/) != null) {
		nCharacter++;
	}


	//패스워드 룰 체크 
	if ((input.length >= 10) && ((nNumber + nSpecial + nCharacter) >= 2)) {
		bPassWordRuleChk = true;
	}
	else {
		if ((input.length >= 8) && ((nNumber + nSpecial + nCharacter) >= 3)) {
			bPassWordRuleChk = true;
		}
	}  

	return bPassWordRuleChk;

}

// 함수이름 : IsNumberCheck()
// 함수설명 : 숫자체크 체크
// 입 력 값 : OBJECT
// 반 환 값 :
function IsNumberCheck(obj) {
    var Chk = "0123456789"
    var j
    var k
    var expression
    expression = obj.value;
    for (k = 0; k < expression.length; k++) {
        var ch = expression.charAt(k)
        for (j = 0; j < Chk.length; j++) {
            if (ch == Chk.charAt(j))
                break;
        }
    }
    if (Chk.length == j) {
        alert('숫자만 입력 가능합니다.');
        obj.value = "";
        return false;
    }
    else {
        return true;
    }
}

function IsNumberCheck2(obj) {
    var Chk = "0123456789"
    var j
    var k
    var expression
    expression = obj.value.replace(".", ""); ;
    for (k = 0; k < expression.length; k++) {
        var ch = expression.charAt(k)
        for (j = 0; j < Chk.length; j++) {
            if (ch == Chk.charAt(j))
                break;
        }
    }
    if (Chk.length == j) {
        alert('숫자만 입력할 수 있습니다.');
        obj.value = "";
        return false;
    }
    else {
        return true;
    }
}


// 함수이름 : CheckJumim()---내국인
// 함수설명 : 주민번호 체크
// 입 력 값 : 앞자리,뒷자리
// 반 환 값 : 정확성여부
function CheckJumim(cell1, cell2) {
    var L11, L12, L13, L14, L15, L16
    var L21, L22, L23, L24, L25, L26, L27

    L11 = parseInt(cell1.substring(0, 1))
    L12 = parseInt(cell1.substring(1, 2))
    L13 = parseInt(cell1.substring(2, 3))
    L14 = parseInt(cell1.substring(3, 4))
    L15 = parseInt(cell1.substring(4, 5))
    L16 = parseInt(cell1.substring(5, 6))

    L21 = parseInt(cell2.substring(0, 1))
    L22 = parseInt(cell2.substring(1, 2))
    L23 = parseInt(cell2.substring(2, 3))
    L24 = parseInt(cell2.substring(3, 4))
    L25 = parseInt(cell2.substring(4, 5))
    L26 = parseInt(cell2.substring(5, 6))
    L27 = parseInt(cell2.substring(6, 7))

    //외국인체크
    if (L21 == 5 || L21 == 6) {

        var sum = 0;
        var odd = 0;
        var fgnno = cell1 + cell2;

        buf = new Array(13);

        for (i = 0; i < 13; i++) { buf[i] = parseInt(fgnno.charAt(i)); }

        odd = buf[7] * 10 + buf[8];

        if (odd % 2 != 0) { return false; }

        if ((buf[11] != 6) && (buf[11] != 7) && (buf[11] != 8) && (buf[11] != 9)) {
            return false;
        }

        multipliers = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];

        for (i = 0, sum = 0; i < 12; i++) { sum += (buf[i] *= multipliers[i]); }

        sum = 11 - (sum % 11);

        if (sum >= 10) { sum -= 10; }

        sum += 2;

        if (sum >= 10) { sum -= 10; }

        if (sum != buf[12]) { alert("주민등록번호가 정확하지 않습니다."); return false; }
        return true;

    } else {
        x = (L11 * 2) + (L12 * 3) + (L13 * 4) + (L14 * 5) + (L15 * 6) + (L16 * 7) + (L21 * 8) + (L22 * 9) + (L23 * 2) + (L24 * 3) + (L25 * 4) + (L26 * 5)
        y = x % 11
        z = 11 - y
        if (z == 10) z = 0;
        if (z == 11) z = 1;
        if (z == L27) {
            return true;
        } else {
            alert("주민등록번호가 정확하지 않습니다.");
            return false;
        }
    }
}
// 함수이름 : check_fgnno()---외국인
// 함수설명 : 주민번호 체크
// 입 력 값 : 앞자리,뒷자리  (13자리)
// 반 환 값 : 정확성여부
function check_fgnno(fgnno) {
    var sum = 0;
    var odd = 0;

    buf = new Array(13);

    for (i = 0; i < 13; i++) { buf[i] = parseInt(fgnno.charAt(i)); }

    odd = buf[7] * 10 + buf[8];

    if (odd % 2 != 0) { return false; }

    if ((buf[11] != 6) && (buf[11] != 7) && (buf[11] != 8) && (buf[11] != 9)) {
        return false;
    }

    multipliers = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];

    for (i = 0, sum = 0; i < 12; i++) { sum += (buf[i] *= multipliers[i]); }

    sum = 11 - (sum % 11);

    if (sum >= 10) { sum -= 10; }

    sum += 2;
    alert("aa");
    if (sum >= 10) { sum -= 10; }

    if (sum != buf[12]) { alert("주민등록번호가 정확하지 않습니다."); return false; }

    return true;
}



// 함수이름 : NextFocus(obj)
// 함수설명 : 자동포커싱
// 입 력 값 : 포커싱할 오브젝트
// 반 환 값 : 포커스이동
function NextFocus(obj) {
    var UAversion = parseFloat(navigator.appVersion);
    var UA = (navigator.appName);
    var IEua = (UA == "Microsoft Internet Explorer");
    var NSua = (UA == "Netscape");
    var isIE = false;
    var isNS = false;
    var maxlength = obj.getAttribute("maxLength");

    if (IEua && UAversion >= 4) { isIE = true; }
    else if (NSua && UAversion >= 4.08) { isNS = true; }

    if (isIE) {
        if (maxlength != null || maxlength > 0) {
            if (obj.value.length >= maxlength) {
                var isNext = false;
                var elem = document.all.tags('INPUT');
                for (var i = 0; i < elem.length; i++) {
                    if (isNext) {
                        if (elem[i].type == null || elem[i].type == "undefined" || elem[i].type == "hidden") continue;
                        try {
                            elem[i].focus();
                        }
                        catch (e) { }
                        break;
                    }
                    if (elem[i] == obj) {
                        isNext = true;
                    }
                }
            }
        }
    }
    if (isNS) {
        if (maxlength != null || maxlength > 0) {
            if (obj.value.length >= maxlength) {
                var isNext = false;
                var elem = document.getElementsByTagName("INPUT");
                for (var i = 0; i < elem.length; i++) {
                    if (isNext) {
                        if (elem[i].type == null || elem[i].type == "undefined" || elem[i].type == "hidden") continue;
                        try {
                            elem[i].focus();
                        }
                        catch (e) { }
                        break;
                    }
                    if (elem[i] == obj) {
                        isNext = true;
                    }
                }
            }
        }
    }

}

// 함수이름 : checkChar()
// 함수설명 : 사용자가 원하는 특수문자존재여부 포함되어 있으면 true를 리턴"|^;:,'\""
// 입 력 값 : 문자열,특수문자("|^;:,'\")
// 반 환 값 : 가능여부
function checkChar(sExpression, sChar) {
    var sEngNum = sChar;

    if (sExpression.length > 0) {
        for (i = 0; i < sEngNum.length; i++) {
            if (sExpression.indexOf(sEngNum.substring(i, i + 1)) >= 0)
                return true;
        }
    }

    return false;
}

// 함수이름 : checkval()
// 함수설명 : 영문, 숫자혼용만 사용가능
// 입 력 값 : 문자열
// 반 환 값 : 가능여부
function checkval(sExpression) {
    for (i = 0; i < sExpression.length; i++) {
        if (sExpression.charAt(i) >= '0' && sExpression.charAt(i) <= '9')
            continue;
        else if (sExpression.charAt(i) >= 'a' && sExpression.charAt(i) <= 'z')
            continue;
        else if (sExpression.charAt(i) >= 'A' && sExpression.charAt(i) <= 'Z')
            continue;
        else {
            return false;
        }
    }
    return true;
}

// 함수이름 : checkvalAll()
// 함수설명 : 영문, 숫자, 한글혼용만 사용가능
// 입 력 값 : 문자열
// 반 환 값 : 가능여부
function checkvalAll(sExpression) {
    for (i = 0; i < sExpression.length; i++) {
        if (sExpression.charAt(i) >= '0' && sExpression.charAt(i) <= '9')
            continue;
        else if (sExpression.charAt(i) >= 'a' && sExpression.charAt(i) <= 'z')
            continue;
        else if (sExpression.charAt(i) >= 'A' && sExpression.charAt(i) <= 'Z')
            continue;
        else if (sExpression.charCodeAt(i) > 255 || sExpression.charCodeAt(i) < 0)
            continue;
        else {
            return false;
        }
    }
    return true;
}

// 함수이름 : GetRdoVal()
// 함수설명 : 라디오 버튼의 선택된 값을 넘겨줌.
// 입 력 값 : object
// 반 환 값 : 선택된값
function GetRdoVal(oObj) {
    var j = 0;
    var sVal;
    //선택한 rdo버튼의 값을 넘겨줌.
    for (j = 0; j < oObj.length; j++) {
        if (oObj[j].checked == true) {
            sVal = oObj[j].value;
        }
    }
    return (sVal);
}

// 함수이름 : SetRdoVal()
// 함수설명 : 라디오 버튼의 선택
// 입 력 값 : object,선택값
// 반 환 값 : 선택
function SetRdoVal(oObj, val) {
    var j = 0;

    for (j = 0; j < oObj.length; j++) {
        if (oObj[j].value == val) {
            oObj[j].checked = true;
            return;
        }
    }
}

// 함수이름 : onlyNumber()
// 함수설명 : 오직 숫자만 입력되게 함
// 입 력 값 : 없음
// 반 환 값 : 없음
// 사용법 : <input type="text" onKeyPress="onlyNumber()">
function onlyNumber() {
    if (window.event.keyCode < 48 || window.event.keyCode > 57) {
        window.event.keyCode = 0;
    }
}

// 함수이름 : getCookie()
// 함수설명 : 쿠키가져오기
// 입 력 값 : 쿠키명
// 반 환 값 : 없음/쿠키값
function getCookie(name) {
    var nameOfCookie = name + "=";
    var x = 0;
    while (x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0)
            break;
    }
    return "";
}


//메인 팝업 사용시 window.open 대신 fncMainPopLoad 함수 사용!!(메인로딩 완료후 팝업 로딩되는 함수)
function fncMainPopLoad(pUrl, pId, pStatus) {
    setTimeout(function () { window.open(pUrl, pId, pStatus); }, 500);
}


//팝업쿠키 세트
function setCookie(name, value, expiredays, cookie_num) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    var eventCookie = getCookie(name);

    if (eventCookie.length == 0) {
    	eventCookie = "no/no/no/no/no/no/no/no/no/no/no/no";
    }
    var arr_pop = new Array(12), new_value;
    arr_pop = eventCookie.split("/");
    arr_pop[parseInt(cookie_num) - 1] = value;

    new_value = arr_pop[0] + "/" + arr_pop[1] + "/" + arr_pop[2] + "/" + arr_pop[3] + "/" + arr_pop[4] + "/" + arr_pop[5] + "/" + arr_pop[6] + "/" + arr_pop[7] + "/" + arr_pop[8] + "/" + arr_pop[9] + "/" + arr_pop[10] + "/" + arr_pop[11];

    document.cookie = name + "=" + escape(new_value) + ";domain=megastudy.net;path=/;expires=" + todayDate.toGMTString() + ";"
 }

 // 해당일 0시까지 만료
 function setCookie_ToDay(name, value, expiredays, cookie_num) {
 	var todayDate = new Date();
 	todayDate.setTime(todayDate.getTime() + expiredays * 24 * 60 * 60 * 1000);

 	var zHour	= todayDate.getHours() * 60 * 60 * 1000;
 	var zMin	= todayDate.getMinutes() * 60 * 1000;
 	var zSec	= todayDate.getSeconds() * 1000;
 	var zMilli	= todayDate.getMilliseconds()+1;
 	var zTotal = zHour + zMin + zSec + zMilli;

 	todayDate.setTime(todayDate.getTime() - zTotal);

 	var eventCookie = getCookie(name);
 	if (eventCookie.length == 0) {
 		eventCookie = "no/no/no/no/no/no/no/no/no/no/no/no";
 	}
 	var arr_pop = new Array(12), new_value;
 	arr_pop = eventCookie.split("/");
 	arr_pop[parseInt(cookie_num) - 1] = value;

 	new_value = arr_pop[0] + "/" + arr_pop[1] + "/" + arr_pop[2] + "/" + arr_pop[3] + "/" + arr_pop[4] + "/" + arr_pop[5] + "/" + arr_pop[6] + "/" + arr_pop[7] + "/" + arr_pop[8] + "/" + arr_pop[9] + "/" + arr_pop[10] + "/" + arr_pop[11];

 	document.cookie = name + "=" + escape(new_value) + ";domain=megastudy.net;path=/;expires=" + todayDate.toGMTString() + ";"
 }

//팝업쿠키 정보 가져오기
function fnc_getCookie(name, num) {

    var popCookie = getCookie(name);
    var arr_pop = new Array(12);

    if (popCookie.length != 0) {

        popCookie = popCookie.replace(/undefined/g, "no");
        popCookie = popCookie.replace(/=/g, "");

        arr_pop = popCookie.split("/");

        if (arr_pop[0] != "yes" && arr_pop[0] != "no") {
            arr_pop[0] = "no";
        }
        if (arr_pop[1] != "yes" && arr_pop[1] != "no") {
            arr_pop[1] = "no";
        }
        if (arr_pop[2] != "yes" && arr_pop[2] != "no") {
            arr_pop[2] = "no";
        }
        if (arr_pop[3] != "yes" && arr_pop[3] != "no") {
            arr_pop[3] = "no";
        }
        if (arr_pop[4] != "yes" && arr_pop[4] != "no") {
            arr_pop[4] = "no";
        }
        if (arr_pop[5] != "yes" && arr_pop[5] != "no") {
            arr_pop[5] = "no";
        }

        if (arr_pop[6] != "yes" && arr_pop[6] != "no") {
            arr_pop[6] = "no";
        }

        if (arr_pop[7] != "yes" && arr_pop[7] != "no") {
            arr_pop[7] = "no";
        }

        if (arr_pop[8] != "yes" && arr_pop[8] != "no") {
            arr_pop[8] = "no";
        }

        if (arr_pop[9] != "yes" && arr_pop[9] != "no") {
            arr_pop[9] = "no";
        }

        if (arr_pop[10] != "yes" && arr_pop[10] != "no") {
            arr_pop[10] = "no";
        }

        if (arr_pop[11] != "yes" && arr_pop[11] != "no") {
            arr_pop[11] = "no";
        }

        popCookie = arr_pop[0] + "/" + arr_pop[1] + "/" + arr_pop[2] + "/" + arr_pop[3] + "/" + arr_pop[4] + "/" + arr_pop[5] + "/" + arr_pop[6] + "/" + arr_pop[7] + "/" + arr_pop[8] + "/" + arr_pop[9]+ "/" + arr_pop[10]+ "/" + arr_pop[11];
        var todayDate = new Date();
        todayDate.setHours(24 + 8);

        document.cookie = name + "=" + escape(popCookie) + "; domain=megastudy.net ; path=/; expires=" + todayDate.toGMTString() + ";"

        return arr_pop[num];
    }

}



// 함수이름 : setCookie_multi(name, value, expiredays)
// 함수설명 : 쿠키가져오기
// 입 력 값 : 쿠키명
// 반 환 값 : 없음/쿠키값
function setCookie_multi(name, sval, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);

    var multiCookie, arr_Cookies, arr_sval;
    var val_1 = ""; val_2 = "";
    multiCookie = getCookie(name);
    if (multiCookie == "") multiCookie = "Chr_Poll"
    arr_Cookies = multiCookie.split("&");
    for (var i = 0; i < arr_Cookies.length; ++i) {
        if (arr_Cookies[i].indexOf(sval) >= 0) {
            arr_sval = arr_Cookies[i].split("=");
            val_1 = arr_sval[0];
            val_2 = arr_sval[1];
            break;
        }
    }
    if (val_1 == "")
        multiCookie = multiCookie + "&" + sval + "=" + value;
    else
        multiCookie = multiCookie.replace(val_1 + "=" + val_2, val_1 + "=" + value);

    document.cookie = name + "=" + escape(multiCookie) + ";domain=megastudy.net;path=/;expires=" + todayDate.toGMTString() + ";"
}

// 함수이름 : getCookie_multi()
// 함수설명 : 쿠키가져오기
// 입 력 값 : 쿠키명
// 반 환 값 : 없음/쿠키값
function getCookie_multi(name, sval) {
    var multiCookie, arr_Cookies, arr_sval;
    var nameOfCookie = name + "=";
    var x = 0;
    var y;
    while (x <= document.cookie.length) {
        y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;
            multiCookie = unescape(document.cookie.substring(y, endOfCookie));
            arr_Cookies = multiCookie.split("&");
            for (var i = 0; i < arr_Cookies.length; ++i) {
                if (arr_Cookies[i].indexOf(sval) >= 0) {
                    arr_sval = arr_Cookies[i].split("=");
                    return arr_sval[1];
                }
            }
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0)
            break;
    }
    return "";
}

// 함수이름 : funcgvadownload
// 함수설명 : GVA 강의 다운로드 창
// 입 력 값 : 경로
// 반 환 값 : 다운로드창
function funcgvadownload(folpath) {
    var SecWin = window.open("", "", "resizable=no,scrollbars=no,width=420,height=280");
    var TITLE = "<HTML><HEAD><TITLE>단원 다운로드 창</TITLE></HEAD>";
    TITLE = TITLE + "<BODY bgcolor=white text=black leftmargin=0 topmargin=0 marginwidth=0 marginheight=0 oncontextmenu='return false' ondragstart='return false' onselectstart='return false'>";
    TITLE = TITLE + "<OBJECT id=GDBDownCtrl style='LEFT: 0px; TOP: 0px' codeBase=<%=URL_main%>/include/GVADown.cab#version=1,0,0,2 classid=CLSID:efb56227-5415-45b1-be44-97b57dae20ce>";
    TITLE = TITLE + "<PARAM NAME='URL' VALUE='" + folpath + "'><PARAM NAME='DlgTitle' VALUE='메가스터디(주)'></OBJECT></BODY></HTML>";
    SecWin.document.write(TITLE);
    if (SecWin.focus)
        SecWin.focus();
}

// 함수이름 : strTrim
// 함수설명 : 빈 문자열정리
// 입 력 값 :
// 반 환 값 :
function strTrim(str) {
    //return str.replace(/(^\s*)|(\s*$)/g, "");
    //    if (!s) return false;
    //    s=s.replace(/^\s*/,'');
    //    return s.replace(/\s*$/,'');
    if (!str) return false;
    str = str.replace(/^\str*/, '');
    return str.replace(/\str*$/, '');
}

// 함수이름 : CutHanStr
// 함수설명 : 한글문자열 잘라오기
// 입 력 값 :
// 반 환 값 :
function CutHanStr(str, len) {
    var l = 0;
    for (var i = 0; i < str.length; i++) {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
        if (l > len) return str.substring(0, i) + "...";
    }
    return str;
}

// 함수이름 : CutHanStr
// 함수설명 : 한글문자열 잘라오기
// 입 력 값 :
// 반 환 값 :
function GetHanStrLen(str) {
    var l = 0;
    for (var i = 0; i < str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
    return l;
}

// 함수이름 : commaNum
// 함수설명 : 금액 표시하기
// 입 력 값 :
// 반 환 값 :
function commaNum(num) {

    if (num < 0) { num *= -1; var minus = true }
    else var minus = false

    var dotPos = (num + "").split(".")

    var dotU = dotPos[0]

    var dotD = dotPos[1]

    var commaFlag = dotU.length % 3

    if (commaFlag) {

        var out = dotU.substring(0, commaFlag)

        if (dotU.length > 3) out += ","
    }
    else var out = ""

    for (var i = commaFlag; i < dotU.length; i += 3) {

        out += dotU.substring(i, i + 3)

        if (i < dotU.length - 3) out += ","
    }

    if (minus) out = "-" + out

    if (dotD) return out + "." + dotD
    else return out
}

// s: source url
// d: flash id
// w: source width
// h: source height
// t: wmode ("" for none, transparent, opaque ...)
function mf(s, d, w, h, t) {
    return "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0\" width=" + w + " height=" + h + " id=" + d + "><param name=wmode value=" + t + " /><param name=movie value=" + s + " /><param name=quality value=high /><embed src=" +s + " quality=high wmode=" + t + " type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash\" width=" + w + " height=" + h + "></embed></object>";
}

function fnc_MegaDown(sUrl) {
    return "<OBJECT ID='downctrl' CLASSID='CLSID:2753B32A-7A6A-4971-B33E-DCB2ABF339E2' CODEBASE='http://file1.megastudy.net/FileServer/MegaDownCtrl/MegaDownCtrl_1.0.0.6.Cab#version=1,0,0,6' width=0 height=0><param name='BaseUrl' value='" + sUrl + "'></OBJECT>";
}

function fnc_megabbs_Control() {
    return "<OBJECT ID='objSetupCaller' onerror=fncChkDaulWebBoardInstall() CODEBASE='http://file1.megastudy.net/FileServer/NeoWeBoard/cabfilesV3/SetupCallerAX.cab#version=3,0,2009,5141' CLASSID='CLSID:91F1F5BA-866F-47D1-86A3-955EF0DD1717' standby='다울소프트 네오웹보드 설치중...' width=0 height=0><PARAM name='sBannerURL' value='http://file1.megastudy.net/FileServer/NeoWeBoard/NeoWeBoardAX-1-Setup-SetupBanner.bmp' /></OBJECT>";
}

// write document contents
function documentwrite(src) {
    document.write(src);
}
function tag_flash() {
    document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="200" height="90" id="tag" align="middle">');
    document.write('<param name="allowScriptAccess" value="sameDomain"/>');
    document.write('<param name="movie" value="/common/menu/tag.swf"/>');
    document.write('<param name="quality" value="high"/>');
    document.write('<param name="bgcolor" value="#ffffff"/>');
    //XML 위치
    document.write('<param name="flashvars" value="hfile=http://www.megastudy.net/common/menu/tagData.asp" />');
    //XML 위치
    document.write('<embed src="tag.swf" quality="high" bgcolor="#ffffff" width="200" height="90" name="tag" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed/>');
    document.write('</object>');
}


function playerencode(input) {
    var ttb = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var len_1 = input.length;
    var len_res = input.length % 3;
    var len_div = len_1 - len_res;
    var ra = new makeArray(4);
    var i = 0;
    var Stat = "";
    var str = "";
    while (1) {
        if (i >= len_1)
            break;

        if (i >= len_div)
            Stat = "End";
        A = eval(input.charCodeAt(i++));
        B = eval(input.charCodeAt(i++));
        C = eval(input.charCodeAt(i++));
        if (i > len_div) {
            Stat = "End";
            if (len_res >= 1)
                C = 0;
            if (len_res == 1)
                B = 0;
        }
        ra[1] = A >> 2;
        ra[2] = ((A & 3) << 4) + (B >> 4);
        ra[3] = ((B & 15) << 2) + (C >> 6);
        ra[4] = C & 63;
        if (Stat == "End" && len_res >= 1)
            ra[4] = 64;
        if (Stat == "End" && len_res == 1)
            ra[3] = 64;
        for (k = 1; k <= 4; k++)
            str = str + ttb.substr(ra[k], 1);
    }
    return str;
}

function makeArray(n) {
    this.length = n
    for (var i = 1; i <= n; i++) {
        this[i] = null;
    }
    return this
}

//플레이어////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var MegastudyPlayer
//사용자 해상도, 브라우저 버전확인
var UseWidth = window.screen.availWidth;
var UseHeight = window.screen.availHeight;

//if (navigator.appVersion.lastIndexOf('Safari') > 0) {
//    var appVersion = navigator.appVersion.substr(0, 1);
//    var osVersion = navigator.appVersion.substr(4, 28);
//} else {
//    var appPosition = navigator.appVersion.lastIndexOf('MSIE');
//    var appVersion = navigator.appVersion.substr(appPosition + 5, 1);
//    var osVersion = navigator.appVersion.substr(appPosition + 10, 14);
//}

var userBrowser = "";
var BrowserVersion = "";

if (navigator.userAgent.lastIndexOf('MSIE') > 0 || navigator.userAgent.lastIndexOf('Trident') > 0) {
    var userBrowser = "IE";

    try {

        if (!document.all) {
            BrowserVersion = "11";
        } else {
            var ieTempVer = navigator.userAgent.match(/Trident\/(\d.\d)/i)[1];

            if (ieTempVer == '7.0') {
                BrowserVersion = "11";
            } else if (ieTempVer == '6.0') {
                BrowserVersion = "10";
            } else if (ieTempVer == '5.0') {
                BrowserVersion = "9";
            } else if (ieTempVer == '4.0') {
                BrowserVersion = "8";
            }
        }


    } catch (e) {
        var appPosition = navigator.userAgent.lastIndexOf('MSIE');
        BrowserVersion = navigator.userAgent.substr(appPosition + 5, 1);
    }
} else if (navigator.userAgent.lastIndexOf('Whale') > 0) {
    var userBrowser = "Whale";
    var appPosition = navigator.userAgent.lastIndexOf('Whale');
    if (appPosition > 0) {
        BrowserVersion = navigator.userAgent.substr(appPosition + 7, 4);
    }
} else if (navigator.userAgent.lastIndexOf('Chrome') > 0) {
    var userBrowser = "Chrome";
    var appPosition = navigator.userAgent.lastIndexOf('Chrome');
    if (appPosition > 0) {
        BrowserVersion = navigator.userAgent.substr(appPosition + 7, 4);
    }
} else if (navigator.userAgent.lastIndexOf('Safari') > 0) {
    var userBrowser = "Safari";
    var appPosition = navigator.userAgent.lastIndexOf('Version');
    if (appPosition > 0) {
        BrowserVersion = navigator.userAgent.substr(appPosition + 8, 5);
    }
} else if (navigator.userAgent.lastIndexOf('Firefox') > 0) {
    var userBrowser = "Firefox";
    var appPosition = navigator.userAgent.lastIndexOf('Firefox');
    if (appPosition > 0) {
        BrowserVersion = navigator.userAgent.substr(appPosition + 8, 5);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : ebook공통처리 함수
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fncEBookView(bcd) {

	if(BrowserVersion==""){
		BrowserVersion="11";
	}

    if (isNaN(bcd)) {
        if (bcd.indexOf("-") > 0) {
            var intBookCd = bcd.substring(0, bcd.indexOf("-"));
        } else if (bcd.indexOf("_") > 0) {
            var intBookCd = bcd.substring(0, bcd.indexOf("_"));
        } else {
            var intBookCd = bcd;
        }
    } else {
        var intBookCd = bcd;
    }

    //20160711 ebook 저작툴 문제 (flash 지원 중단되어 변경)
    //if (userBrowser == "IE" && parseInt(BrowserVersion) < 9) {
    //    window.open("http://cdnmega.nefficient.co.kr/ebook/" + intBookCd + "/" + bcd + "/view.htm", "e_Book", "top=0, left=0, width=1024, height=768, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0");
	//}else{
        window.open("http://file.megastudy.net/fileServer/file_asp/sampleBook/ebook_view.asp?BookCd=" + bcd , "e_Book_View", "top=0, left=0, width=1024, height=775, toolbar=0, directories=0, status=0, menubar=0, scrollbars=no, resizable=no");
    //}

}

function isMultiTouchPoint() {
	return ( new RegExp('(Linux)', "i").test(navigator.userAgent) || new RegExp('Macintosh', "i").test(navigator.userAgent) ) && navigator.maxTouchPoints > 0;
}



//플레이어 호출함수의 파라미터
var vPlayerLnk, vPlayerParam, vPlayerOption;
var agentInstallURL = "https://v.kr.kollus.com/pc_player_install/agent?cpk=megastudyedu";
//------------------------------------------------------------------

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 플레이어 공통 실행함수 (PC/모바일 통합)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function player_div(lnk, par, opt, kbn, app) {
    var pPlayerUrl, pSetParam, pOpt, pPlayerNm;

	//pSetParam = par + "&PlayerKbn=" + kbn + "&PlayerApp=" + app + "&UseWidth=" + UseWidth + "&UseHeight=" + UseHeight + "&AppVersion=" + appVersion + "&OsVersion=" + osVersion + "&appver=" + navigator.userAgent;
    pSetParam = par + "&PlayerKbn=" + kbn + "&PlayerApp=" + app + "&UseWidth=" + UseWidth + "&UseHeight=" + UseHeight + "&PlayerLoc=" + lnk + "&userBrowser=" + userBrowser + "&BrowserVersion=" + BrowserVersion;

    if (kbn == "F" || kbn == "U") {
        if (pSetParam.indexOf("PlayerTabCtrl=") > -1) {
            if (pSetParam.indexOf("PlayerTabCtrl=OFF") == -1) {
                pSetParam = pSetParam.replace("PlayerTabCtrl=", "PlayerTabCtrl=OFF");
            }
        } else {
            pSetParam += "&PlayerTabCtrl=OFF";
        }
    }

    if (lnk == "H") {
        if (UseWidth >= 1333) {
            var eWidth = "1320";
            var eHeight = "726";
        } else {
            var eWidth = "1024";
            var eHeight = "560";
        }
    } else if (lnk == "L") {
        var eWidth = "740";
        var eHeight = "540";
    }

    if (pSetParam.indexOf("PlayerTabCtrl=OFF") > -1) {
        eWidth = eWidth - 276;
    }

    try {
        if (MegastudyPlayer == "[object]") MegastudyPlayer.close();
    } catch (e) { }

    // Check SmartLearing in-app -------------------------------------------------------
    var is_smartlearing_in_app = false;
    if (navigator.userAgent.lastIndexOf('net.megastudy.smartplay.main') > 0) {
        is_smartlearing_in_app = true;
    } else if (navigator.userAgent.lastIndexOf('com.megastudy.SmartPlay') > 0) {
        is_smartlearing_in_app = true;
	} else if (navigator.userAgent.lastIndexOf('appData') > 0) {
		is_smartlearing_in_app = true;
    }

	var dtDesktop = isMultiTouchPoint();
	if (dtDesktop == true){ pSetParam = pSetParam.replace('DNG_KBN=30', 'DNG_KBN=1');	}
    //-----------------------------------------------------------------------------------


        if ((navigator.userAgent.lastIndexOf('Android') > 0 || navigator.userAgent.lastIndexOf('iPhone') > 0 || navigator.userAgent.lastIndexOf('iPad') > 0) && navigator.maxTouchPoints > 0) {

			// Check SmartLearing in-app -------------------------------------------------------
			var is_smartlearing_in_app = false;
			if (navigator.userAgent.lastIndexOf('net.megastudy.smartplay.main') > 0) {
				is_smartlearing_in_app = true;
			} else if (navigator.userAgent.lastIndexOf('com.megastudy.SmartPlay') > 0) {
				is_smartlearing_in_app = true;
			} else if (navigator.userAgent.lastIndexOf('appData') > 0) {
				is_smartlearing_in_app = true;
			}
			//-----------------------------------------------------------------------------------

			if(is_smartlearing_in_app == true  && navigator.userAgent.lastIndexOf('Android') <= 0){ // no Android
				if (navigator.userAgent.lastIndexOf('appData') > 0) {
					pPlayerUrl = "/mobile/app_v5/player/kollus_path_get.asp";
					try {
						$.getJSON(pPlayerUrl + pSetParam, function (data) {
							var strOs = data.data.os;
							strOs = strOs.toLowerCase();
							if (data.result.code == "0000") {
								if (strOs == "sp_ios" || strOs == "ios") {
									var sTitle = data.data.title;
									if(!sTitle){sTitle="";}
									var parameters = new Array(data.data.i_path, sTitle);
									window.webkit.messageHandlers.toApp.postMessage({
										"function" : "setPlayUrl",
										"parameters": parameters
									});

								} else {
									window.MegaStudyApp.setPlayUrl(data.data.i_path);
								}
							}
						});
					} catch (e) { }

				}else{
					pPlayerUrl = "/mobile/app_v3/player/player_kollus.asp";
					try {
						$.getJSON(pPlayerUrl + pSetParam, function (data) {
							if (data.result == "0000") {
								if (data.aData[0].os == "iOS") {
									document.location = "toApp:setPlayUrl:" + data.aData[0].i_path;
								} else {
									window.MegaStudyApp.setPlayUrl(data.aData[0].i_path);
								}
							}
						});
					} catch (e) { }

					if(kbn == "F"){
						$.post("/player/kollus/common/inc/eventplaycnt.asp"+par+"&PlayerKbn="+kbn);
					}
				}
				return;
			}else{
				if (confirm("3G/4G 환경에서는 데이터 패킷요금이 발생할 수 있습니다.")) {

					if (is_smartlearing_in_app == true) {
						// SmartLearning in-app
						if (navigator.userAgent.lastIndexOf('appData') > 0) {
							pPlayerUrl = "/mobile/app_v5/player/kollus_path_get.asp";

							// <<< ################################################
							try {
								$.getJSON(pPlayerUrl + pSetParam, function (data) {
									if (data.result.code == "0000") {
										if (data.data.os == "sp_ios") {
											var sTitle = data.data.title;
											if(!sTitle){sTitle="";}
											var parameters = new Array(data.data.i_path, sTitle);

											window.webkit.messageHandlers.toApp.postMessage({
												"function" : "setPlayUrl",
												"parameters" : parameters
											});
										} else {
											var sTitle = data.data.title;
											if(sTitle){
												window.MegaStudyApp.setPlayUrl(data.data.i_path, sTitle);
											}else{
												window.MegaStudyApp.setPlayUrl(data.data.i_path);
											}
										}
									}
								});
							} catch (e) { }

						}else{
							pPlayerUrl = "/mobile/app_v3/player/player_kollus.asp";

							// <<< ################################################
							try {
								$.getJSON(pPlayerUrl + pSetParam, function (data) {
									if (data.result == "0000") {
										if ("iOS" == data.aData[0].os) {
											document.location = "toApp:setPlayUrl:" + data.aData[0].i_path;
										} else {
											window.MegaStudyApp.setPlayUrl(data.aData[0].i_path);
										}
									}
								});
							} catch (e) { }

						}
						// <<< ################################################
						return;
					} else {
							if(kbn == "F"){
								$.post("/player/kollus/common/inc/eventplaycnt.asp"+par+"&PlayerKbn="+kbn);
							}

							// mobile 
							pPlayerUrl = "/mobile/app_v3/player/player_kollus.asp";
							// <<< ################################################
							try {
								$.getJSON(pPlayerUrl + pSetParam, function (data) {
									if (data.result == "0000") {
										kollus_custom_scheme_call('path?url=' + data.aData[0].i_path);
									} else {
										alert(data.result);
									}
								});
							} catch (e) { }
							// <<< ################################################
							return;

					}
				} else {
					return;
				}
			}
        } else {
			pPlayerUrl = "https://"+window.location.host+"/Player/kollus/player.asp";
			pOpt = "width=" + eWidth + ",height=" + eHeight + ",top=0,left=0,resizable=1,status=no,scrollbars=no";

			pPlayerNm = "DNGPlayer";
			MegastudyPlayer = window.open(pPlayerUrl + pSetParam, pPlayerNm, pOpt);
			MegastudyPlayer.focus();
		}
	return;
}


function indicateDownload() {
    var nc_app_url;
    nc_app_url = NPLAYER_SETUP_URL;
    if (confirm('동영상을 재생하기 위해서 재생플레이어를 설치하여야 합니다.\n설치하시겠습니까?')) {
        window.location.href = NPLAYER_SETUP_URL;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : PC 다운로드 공통 실행함수
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fncPCDown(dng_no) {
    var pcdngpath = "";
    jQuery.post("/Player/MegaPlayer/PlayerPage/PcDown_Path_Ax.asp", { dngno: dng_no }, function (data, textStatus) {
        pcdngpath = data;
        if (pcdngpath != "" && pcdngpath != "xx") {
            var PcDowniFrm = document.createElement("iframe");
            PcDowniFrm.setAttribute("id", "ifrmDnDngPath");
            PcDowniFrm.setAttribute("src", pcdngpath);
            PcDowniFrm.setAttribute("width", "0px");
            PcDowniFrm.setAttribute("height", "0px");
            PcDowniFrm.setAttribute("scrolling", "no");
            PcDowniFrm.style.border = "0px";
            document.body.appendChild(PcDowniFrm);

            var para = "DNG_NO=" + dng_no + "&t_play=0&t_high=0&t_nomal=0&t_pmp=0&t_scrap=0&t_pc=1";
            createXMLHttpRequest();
            xmlHttp.onreadystatechange = handleStateChange;
            xmlHttp.open("GET", "/common/inc/EventDng_PlayCnt.asp?" + para, true);
            xmlHttp.send(null);
        }
    });
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 플레이어 공통 실행함수 (PC/모바일 통합 T-Zone용)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function player_div_Tzone(lnk, par, opt, kbn, app,site_nm) {

    var pPlayerUrl, pSetParam, pOpt, pPlayerNm;
    //pSetParam = par + "&PlayerKbn=" + kbn + "&PlayerApp=" + app + "&UseWidth=" + UseWidth + "&UseHeight=" + UseHeight + "&AppVersion=" + appVersion + "&OsVersion=" + osVersion + "&appver=" + navigator.userAgent;
    pSetParam = par + "&PlayerKbn=" + kbn + "&PlayerApp=" + app + "&UseWidth=" + UseWidth + "&UseHeight=" + UseHeight + "&userBrowser=" + userBrowser + "&BrowserVersion=" + BrowserVersion;

    if (lnk == "H") {
        pPlayerUrl = "http://"+site_nm+"/Player/MegaPlayer/PlayerHigh/Player.asp";
        pOpt = "width=1024,height=580,top=0,left=0,resizable=0,status=no,scrollbars=no";
    } else if (lnk == "L") {
        pPlayerUrl = "http://"+site_nm+"/Player/MegaPlayer/PlayerLow/Player.asp";
        pOpt = "width=600,height=500,top=0,left=0,resizable=0,status=no,scrollbars=no";
    } else {
        pPlayerUrl = lnk;
        pOpt = opt;
    }

    if ((navigator.userAgent.lastIndexOf('Android') > 0 || navigator.userAgent.lastIndexOf('iPhone') > 0 || navigator.userAgent.lastIndexOf('iPad') > 0) && navigator.maxTouchPoints > 0 ) {
        if(confirm("3G/4G 환경에서는 데이터 패킷요금이 발생할 수 있습니다.")){
            if (navigator.userAgent.lastIndexOf('Chrome') > 0) {
                document.location.href = pPlayerUrl + pSetParam;
            } else {
                var iMobilePlayifrm = document.getElementById("iMobilePlayifrm");
                if (iMobilePlayifrm != null) {
                    iMobilePlayifrm.parentNode.removeChild(iMobilePlayifrm);
                }
                var AquaiFrm = document.createElement("iframe");
                AquaiFrm.setAttribute("id", "iMobilePlayifrm");
                AquaiFrm.setAttribute("src", pPlayerUrl + pSetParam);
                AquaiFrm.setAttribute("width", "0px");
                AquaiFrm.setAttribute("height", "0px");
                AquaiFrm.setAttribute("scrolling", "no");
                AquaiFrm.style.border = "0px";
                document.body.appendChild(AquaiFrm);
            }
        } else {
            return;
        }
    } else {
        try {
            if (MegastudyPlayer == "[object]") MegastudyPlayer.close();
        } catch (e) { }

        pPlayerNm = "DNGPlayer";
        MegastudyPlayer = window.open(pPlayerUrl + pSetParam, pPlayerNm, pOpt);
    }
    return;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 아쿠아 플레이어 - 일반/쌩쌩
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function nplayer_mega_aqua(kbn, APP_NO, CHR_CD, LEC_CD, TEC_NM) {

    vPlayerParam = "?APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn;

    if (kbn == "10" || kbn == "50") { vPlayerLnk = "L"; } //일반 동영상 강의
    if (kbn == "20" || kbn == "60") { vPlayerLnk = "H"; } //쌩쌩플러스 동영상 강의

    player_div(vPlayerLnk, vPlayerParam, 'D', 'A', 'Y');
    return;
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 아쿠아 플레이어 - 일반/쌩쌩(T-Zone용)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function nplayer_mega_aqua_Tzone(kbn, APP_NO, CHR_CD, LEC_CD, TEC_NM,SITE_NM) {

    vPlayerParam = "?APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn;

    if (kbn == "10" || kbn == "50") { vPlayerLnk = "L"; } //일반 동영상 강의
    if (kbn == "20" || kbn == "60") { vPlayerLnk = "H"; } //쌩쌩플러스 동영상 강의

    player_div_Tzone(vPlayerLnk, vPlayerParam, 'D', 'A', 'Y',SITE_NM);
    return;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 무료강의 플레이어
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function player_mega_sim(kbn, APP_NO, CHR_CD, LEC_CD, TEC_NM) {

    vPlayerParam = "?APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn;

    //일반 동영상 맛보기(free) - 10:일반 15:선생님 동영상 인사 31~39 : 일반 맛보기 선택
    if (kbn == "10") { vPlayerLnk = "L"; }
    if (kbn == "20") { vPlayerLnk = "H"; }

    player_div(vPlayerLnk, vPlayerParam, 'D', 'L', 'Y');
    return;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : FREE 아쿠아 플레이어
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function player_free(kbn, para) {

    //고화질 탭구분용(P:OT,맛보기,F:이벤트)
    if (kbn == "20" || kbn == "72" || kbn == "90" || kbn == "80" || kbn == "91" || kbn == "82") {	//논술메인 진수관련 코드 추가 20150813 CHOIJH
        PlayerKbn = "P";
    } else if (kbn == "29") {
        PlayerKbn = "I";
    } else if (kbn == "68" || kbn == "89" || kbn == "99") {
        PlayerKbn = "D";
    } else {
        PlayerKbn = "F";
    }

    vPlayerParam = "?dng_kbn=" + kbn + "&CHR_CD=" + para;

    if (kbn == "10" || kbn == "20" || kbn == "72" || kbn == "80" || kbn == "90" || kbn == "91" || kbn == "79" || kbn == "89") { fncPreDngCnt(vPlayerParam); } //조회수 측정//진수맛보기 추가

    //일반 동영상 맛보기(free) - 10:일반 15:선생님 동영상 인사 31~39 : 일반 맛보기 선택
    if ((kbn >= "10" && kbn <= "19") || (kbn >= "31" && kbn <= "39") || kbn == "50" || kbn == "51" || kbn == "62" || kbn == "68" || kbn == "79" || kbn == "80") { vPlayerLnk = "L"; }

    //쌩쌩 플러스 동영상 맛보기 (free) - 20:쌩쌩 23:맛보기  72:OT	82:학습정보(OT2) 41~49 : 쌩쌩 맛보기 선택
    if ((kbn >= "20" && kbn <= "29") || (kbn >= "41" && kbn <= "49") || kbn == "60" || kbn == "72" || kbn == "82" || kbn == "90" || kbn == "91" || kbn == "89" || kbn == "99") { vPlayerLnk = "H"; }

    var hopt = "D"
    if (kbn == "10" || kbn == "20" || kbn == "72" || kbn == "80" || kbn == "90") { hopt = "N"; }

	player_div(vPlayerLnk, vPlayerParam, hopt, PlayerKbn, 'N');
	return;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
function fncVod_20141022(e) {
	jQuery.ajax({
		url: '/mypage/hwj_hit_20141022.asp?dd='+e,
		success: function(data) {
		}
	});
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 해설강의 플레이어 대응
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function player_exam(kbn, dngkbn, para) {

    vPlayerParam = "?dng_kbn=" + dngkbn + "&CHR_CD=" + para;

    if (kbn == "30" || kbn == "40") { vPlayerParam = vPlayerParam + "&exam_flg=2"; }

    if (kbn == "10" || kbn == "30") { vPlayerLnk = "L"; }
    if (kbn == "20" || kbn == "40") { vPlayerLnk = "H"; }

    player_div(vPlayerLnk, vPlayerParam, 'D', 'F', 'N');
    return;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 함수이름 : player_exam_2007
// 함수설명 : 플레이어 - FREE
// 입 력 값 : 구분자, 속성
// 반 환 값 :
function player_exam_2007(seq, num, stm, idx, dng_num, free_flg) {

    var dng_cul_num = 0;
    var dng_free_flg = "N";

    if (!dng_num) {
        dng_cul_num = 1;
    } else {
        dng_cul_num = dng_num;
    }

    if (!free_flg) {
        dng_free_flg = "N";
    } else {
        dng_free_flg = free_flg;
    }

    vPlayerParam = "?seq=" + seq + "&stm=" + stm + "&idx=" + idx + "&dng_num=" + dng_cul_num + "&dng_free_flg=" + dng_free_flg;

    player_div('H', vPlayerParam, 'D', 'H', 'N');
    return;
}

// 함수이름 : player_Lab_free()
// 함수설명 : 영어듣기 맛보기 강좌 플레이어 - FREE
// 입 력 값 : 구분자, 속성
// 반 환 값 :
function player_Lab_free(kbn, para) {

    vPlayerLnk = "/Player/Mega/listening/Player_Load.asp";
    vPlayerParam = "?DNG_KBN=" + kbn + "&CHR_CD=" + para;
    vPlayerOption = "width=740,height=740,top=0,left=0";

    player_div(vPlayerLnk, vPlayerParam, vPlayerOption, '', '');
    return;
}

// 함수이름 : lplayer_mega()
// 함수설명 : 듣기전용 플레이어
// 입 력 값 : 구분자, 속성
// 반 환 값 :
function lplayer_mega(kbn, APP_NO, CHR_CD, LEC_CD, TEC_NM) {

    vPlayerLnk = "/Player/Mega/listening/Player_Load.asp";
    vPlayerParam = "?APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn;
    vPlayerOption = "width=740,height=740,top=0,left=0";

    player_div(vPlayerLnk, vPlayerParam, vPlayerOption, '', '');
    return;
}

// 함수이름 : splayer_mega_freepass(),nplayer_mega_freepass() --> 통합 player_mega_freepass() 페이지 작업필요
// 함수설명 : 뉴플레이어 - 쌩쌩 프리패스 체험
// 입 력 값 : 구분자, 속성
// 반 환 값 :
function player_mega_freepass(kbn, APP_NO, CHR_CD, LEC_CD, TEC_NM) {
    vPlayerParam = "?APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn;

    if (kbn == "10" || kbn == "50") { vPlayerLnk = "L"; }
    if (kbn == "20" || kbn == "60") { vPlayerLnk = "H"; }

    player_div(vPlayerLnk, vPlayerParam, 'D', 'E', 'Y');
    return;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 아쿠아 인덱스 플레이어 - 일반/쌩쌩
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function player_index(kbn, idx) {

    vPlayerParam = "?dng_kbn=" + kbn + "&DNG_IDX=" + idx;

    //일반 동영상 맛보기(free) - 10:일반 15:선생님 동영상 인사
    if (kbn == "13" || kbn == "10") { vPlayerLnk = "L"; }
    //쌩쌩 플러스 동영상 맛보기 (free) - 20:쌩쌩 23:맛보기  72:OT
    if (kbn == "23" || kbn == "20" || kbn == "29") { vPlayerLnk = "H"; }

    player_div(vPlayerLnk, vPlayerParam, 'D', 'I', 'N');
    return;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 페이지 삽입 플레이어 호출/컨트롤
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fncPlayerPageAx(acd, ppr) {
    try {
        $(".play_area").each(function () {
            var inm = $(this).attr("inm");
            if (inm != "") {
                $(this).html("<img src=\"" + inm + "\" />");
            }
        });
    } catch (e) { }
    $("#" + acd).load("/Player/kollus/play/play_ax.asp?" + unescape(ppr));
}

function fncPagePlay(acd) {
    try {
        controller.play();
    } catch (e) {
        $("#" + acd).trigger("click");
    }
}
function fncPagePause(acd) {
    try {
        controller.pause();
    } catch (e) {
        var inm = $("#" + acd).attr("inm");
        if (inm != "") {
            $("#" + acd).html("<img src=\"" + inm + "\" />");
        }
    }
}
function fncPageMove(acd, t) {
    try {
        controller.play(t);
    } catch (e) {
        $("#" + acd).trigger("click");
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 영상다운로드
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fncVideoDownload(kbn, para) {
    //고화질 탭구분용(P:OT,맛보기,F:이벤트)
    if (kbn == "20" || kbn == "72" || kbn == "90" || kbn == "80" || kbn == "91" || kbn == "82") {	//논술메인 진수관련 코드 추가 20150813 CHOIJH
        PlayerKbn = "P";
    } else if (kbn == "29") {
        PlayerKbn = "I";
    } else if (kbn == "79" || kbn == "89" || kbn == "99") {
        PlayerKbn = "D";
    } else {
        PlayerKbn = "F";
    }

    // SmartLearning in-app
    pPlayerUrl = "/mobile/app_v3/player/player_kollus.asp";
    vPlayerParam = "?PlayerKbn=" + PlayerKbn + "&dng_kbn=" + kbn + "&CHR_CD=" + para;
    // <<< ################################################
    try {
        $.getJSON(pPlayerUrl + vPlayerParam, function (data) {
            if (data.result == "0000") {
                window.open(data.aData[0].i_path.replace("/si?", "/sr?"),'','');
            } else {
                alert(data.result);
            }
        });
    } catch (e) { }
    // <<< ################################################
    return;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//플레이어////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 이벤트 동영상 인덱스용
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fncPlayerGoIndex(frame_id, no, img_path, img_w, img_h, qm_stime) {

    if (eval(frame_id).location.href.lastIndexOf('Frame_EventAviPlay.asp') == -1) {
        eval(frame_id).location.href = "/Player/Mega/nPlayerEvent/Frame_EventAviPlay.asp?no=" + no + "&img_path=" + img_path + "&img_w=" + img_w + "&img_h=" + img_h + "&qm_stime=" + qm_stime;
    } else {
        try {
            eval(frame_id).fncAquaIndex(qm_stime);
        } catch (e) {
            eval(frame_id).location.href = eval(frame_id).location.href.replace("Frame_EventAviPlay.asp", "Frame_EventAvi.asp");
        }
    }
}

function fncPlayerGoIndex_evt(frame_id, no, img_path, img_w, img_h, qm_stime) {
    eval(frame_id).location.href = "/Player/Mega/nPlayerEvent/Frame_EventAviPlay.asp?no=" + no + "&img_path=" + img_path + "&img_w=" + img_w + "&img_h=" + img_h + "&qm_stime=" + qm_stime;
}

function fncPlayerIndexUrl(frame_id, qm_stime) {

    var IfrmUrl = eval(frame_id).location.href;
    if (IfrmUrl.lastIndexOf("Frame_EventAviPlay.asp") == -1) {
        var IfrmStr = IfrmUrl.indexOf("&START_TIME=", 1);
        if (IfrmStr > -1) {
            if (IfrmUrl.indexOf("&", IfrmStr + 1) == -1) {
                IfrmUrl = IfrmUrl.replace(IfrmUrl.substring(IfrmStr, IfrmUrl.length), "");
            } else {
                IfrmUrl = IfrmUrl.replace(IfrmUrl.substring(IfrmStr, IfrmUrl.indexOf("&", IfrmStr + 1)), "");
            }
            IfrmUrl = IfrmUrl.replace("Frame_EventAvi.asp", "Frame_EventAviPlay.asp") + "&START_TIME=" + qm_stime;
        } else {
            var IfrmStr = IfrmUrl.lastIndexOf("&qm_stime=");
            if (IfrmStr > -1) {
                if (IfrmUrl.indexOf("&", IfrmStr + 1) == -1) {
                    IfrmUrl = IfrmUrl.replace(IfrmUrl.substring(IfrmStr, IfrmUrl.length), "");
                } else {
                    IfrmUrl = IfrmUrl.replace(IfrmUrl.substring(IfrmStr, IfrmUrl.indexOf("&", IfrmStr)), "");
                }
            }
            IfrmUrl = IfrmUrl.replace("Frame_EventAvi.asp", "Frame_EventAviPlay.asp") + "&qm_stime=" + qm_stime;
        }
        eval(frame_id).location.href = IfrmUrl;
    } else {
        try {
            eval(frame_id).fncAquaIndex(qm_stime);
        } catch (e) {
            eval(frame_id).location.href = IfrmUrl.replace("Frame_EventAviPlay.asp", "Frame_EventAvi.asp");
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 이벤트 동영상 조회 수 확인
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var xmlHttp;
var blChk = false;
function createXMLHttpRequest() {
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
}
function handleStateChange() {
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            // OK Message...
            blChk = true;
        }
    }
}
function fncEventDngCnt(no, t_play, t_high, t_nomal, t_pmp, t_scrap) {
    var para = "DNG_NO=" + no + "&t_play=" + t_play + "&t_high=" + t_high + "&t_nomal=" + t_nomal + "&t_pmp=" + t_pmp + "&t_scrap=" + t_scrap;
    createXMLHttpRequest();
    xmlHttp.onreadystatechange = handleStateChange;
    xmlHttp.open("GET", "/common/inc/EventDng_PlayCnt.asp?" + para, true);
    xmlHttp.send(null);
}
function fncPreDngCnt(para) {
    createXMLHttpRequest();
    xmlHttp.onreadystatechange = handleStateChange;
    xmlHttp.open("GET", "/common/inc/PreDng_PlayCnt.asp" + para, true);
    xmlHttp.send(null);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수설명 : 메가스터디 사용하는 범용 Ajax 호출
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function msAjax(o) {
    o = { type: o.type || "POST", url: o.url || "", info: o.info || null, timeout: o.timeout || 10000, onLoading: o.onLoading || function () { }, onComplete: o.onComplete || function () { }, onError: o.onError || function () { }, onSuccess: o.onSuccess || function () { }, onTimeOut: o.onTimeOut || function () { }, data: o.data || "" };
    o.onLoading();
    if (typeof XMLHttpRequest == "undefined") { XMLHttpRequest = function () { return new ActiveXObject(navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP"); } }
    var xml = new XMLHttpRequest();
    xml.open(o.type, o.url, true);
    if (o.type == "POST") xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    var tOut = o.timeout; var reqDone = false;
    setTimeout(function () { reqDone = true; }, tOut);
    xml.onreadystatechange = function () { if (xml.readyState == 4 && !reqDone) { if (hSuc(xml)) { o.onSuccess(hData(xml, o.type)); } else { o.onError(); } o.onComplete(); xml = null; } else { o.onTimeOut(); } };
    xml.send(o.info);
    function hSuc(r) { try { return !r.status && location.protocol == "file:" || (r.status >= 200 && r.status < 300) || r.status == 304 || navigator.userAgent.indexOf("Safari") >= 0 && typeof r.status == "undefined"; } catch (e) { } return false; }
    function hData(r, type) { var ct = r.getResponseHeader("content-type"); var data = !type && ct && ct.indexOf("xml") >= 0; data = type == "xml" || data ? r.responseXML : r.responseText; if (type == "script") eval.call(window, data); return data; }
}
function msLoading(e) { document.getElementById(e).innerHTML = "<table border='0' align='left' width='100%' height='100%'><tr><td align='center' valign='middle'><img src='http://img.megastudy.net/common/indicator_white.gif' border='0'></td></tr></table>"; }
function msAxList(u, d) {
    msAjax({ url: u, type: "GET", onSuccess: function (rss) { document.getElementById(d).innerHTML = rss; } });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수이름 : OpenImage_n()
// 함수설명 : 이미지 사이즈에 맞게 팝업 띄우기 --> focus 문제로 레이어로 띄우도록 변경(20101203)
// 입 력 값 : Image Url, popup width, popup height
// 반 환 값 :
function OpenImage_n(s, w, h) {

    CommonMsLayerHidden();

    if (document.getElementById("ZoomImageView") == null) {
        var parent = null;
        parent = document.getElementsByTagName("body")[0];

        var div = document.createElement('div');
        div.id = "ZoomImageView"
        div.style.zIndex = 11;

        div.style.position = "absolute";
        div.style.visibility = "visible";
        parent.appendChild(div);
    } else {
        document.getElementById("ZoomImageView").style.visibility = "visible";
    }

    var div = document.getElementById("ZoomImageView");
    div.innerHTML = "<a href='#_blank' onclick='CommonMsLayerHidden()'><img src='" + s + "' width='" + w + "' height='" + h + "' onclick='CommonMsLayerHidden()' style='border:3px solid #999999; ridge white;' ></a>";

    // 20110711 - 가운데 정렬 후 깨지는 경우가 있어서 수정
    //    if (document.body.scrollLeft != 0) {
    imgLeft = (document.body.clientWidth - w) / 2;
    //    } else {
    //      imgLeft = (1024 - w) / 2;
    //    }

    if (document.body.scrollTop != 0) {

        if (h > 500) {
            imgTop = document.body.scrollTop;
        } else {
            imgTop = document.body.scrollTop + event.clientY - (h / 2);
        }
    } else {

        imgTop = event.clientY - (h / 2);
    }

    div.style.posTop = imgTop;
    div.style.posLeft = imgLeft;

}

// 함수이름 : OpenImage_n_all(), 표준
// 함수설명 : 이미지 사이즈에 맞게 팝업 띄우기 --> focus 문제로 레이어로 띄우도록 변경(20101203)
// 입 력 값 : Image Url, popup width, popup height
// 반 환 값 :
function OpenImage_n_all(s, w, h) {

    CommonMsLayerHidden();

    if (document.getElementById("ZoomImageView") == null) {
        var parent = null;
        parent = document.getElementsByTagName("body")[0];

        var div = document.createElement('div');
        div.id = "ZoomImageView"
        div.style.zIndex = 100000;

        div.style.position = "absolute";
        div.style.visibility = "visible";
        parent.appendChild(div);
    } else {
        document.getElementById("ZoomImageView").style.visibility = "visible";
    }

    var div = document.getElementById("ZoomImageView");
    div.innerHTML = "<a href='#_blank' onclick='CommonMsLayerHidden()'><img src='" + s + "' width='" + w + "' height='" + h + "' onclick='CommonMsLayerHidden()' style='border:3px solid #999999; ridge white;' ></a>";

    // 20110711 - 가운데 정렬 후 깨지는 경우가 있어서 수정
    //    if (document.body.scrollLeft != 0) {
    imgLeft = (document.documentElement.clientWidth - w) / 2;
    //    } else {
    //      imgLeft = (1024 - w) / 2;
    //    }

    if (document.documentElement.scrollTop != 0) {

        if (h > 500) {
            imgTop = document.documentElement.scrollTop;
        } else {
            imgTop = document.documentElement.scrollTop + event.clientY - (h / 2);
        }
    } else {

        imgTop = event.clientY - (h / 2);
    }

    div.style.posTop = imgTop;
    div.style.posLeft = imgLeft;

}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수이름 : CommonMsLayerHidden()
// 함수설명 : 열려있는 레이어 닫기 공통적용
function CommonMsLayerHidden() {
    var d = document.getElementsByTagName("div");
    for (var i = 0; i < d.length; i++) {
        if (d[i].style.visibility == "visible") {
            if (d[i].id != "STATICMENU") {
                document.getElementById(d[i].id).innerHTML = "";
                document.getElementById(d[i].id).style.visibility = "hidden";
            }
        }
    }
}
function OpenImage_n_ifm(s, w, h, evc) {

    CommonMsLayerHidden_ifrm();

    if (document.getElementById("ZoomImageView") == null) {
        var parent = null;
        parent = document.getElementsByTagName("body")[0];

        var div = document.createElement('div');
        div.id = "ZoomImageView"
        div.style.zIndex = 11;

        div.style.position = "absolute";
        div.style.visibility = "visible";
        parent.appendChild(div);
    } else {
        document.getElementById("ZoomImageView").style.visibility = "visible";
    }

    var div = document.getElementById("ZoomImageView");

    div.innerHTML = "<a href='#_blank' onclick='CommonMsLayerHidden_ifrm()'><img src='" + s + "' width='" + w + "' height='" + h + "' onclick='CommonMsLayerHidden_ifrm()' style='border:3px solid #999999; ridge white;' ></a>";

    // 20110711 - 가운데 정렬 후 깨지는 경우가 있어서 수정
    //    if (document.body.scrollLeft != 0) {
    imgLeft = (document.body.clientWidth - w) / 2;
    //    } else {
    //      imgLeft = (1024 - w) / 2;
    //    }

    if (document.body.scrollTop != 0) {
        if (h > 800) {
            imgTop = document.body.scrollTop;
        } else {
            imgTop = document.body.scrollTop + evc - (h / 2);
        }
    } else {
        imgTop = evc - (h / 2);
    }

    div.style.posTop = imgTop;
    div.style.posLeft = imgLeft;

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 함수이름 : CommonMsLayerHidden_ifrm()
// 함수설명 : 열려있는 레이어 닫기 공통적용
function CommonMsLayerHidden_ifrm() {
    var d = document.getElementsByTagName("div");
    for (var i = 0; i < d.length; i++) {
        if (d[i].style.visibility == "visible") {
            if (d[i].id != "STATICMENU") {
                document.getElementById(d[i].id).innerHTML = "";
                document.getElementById(d[i].id).style.visibility = "hidden";
            }
        }
    }
}

// 함수이름 : CloseImage_n()
// 함수설명 : 열려있는 팝업창 닫기
// 입 력 값 : 없음
// 반 환 값 : 없음
function CloseImage_n() {
    try {
        if (win != null) win.close();
    } catch (e) {
        return;
    }
}


//iframe Resize함수
function resizeFrame(that) {
    //that.style.height = that.contentWindow.document.body.scrollHeight + that.contentWindow.document.body.offsetHeight - that.contentWindow.document.body.clientHeight;
    that.style.height = that.contentWindow.document.body.scrollHeight + that.contentWindow.document.body.offsetHeight - that.contentWindow.document.body.clientHeight + 'px';
}

// 강좌 개강 알리미 팝업
function Chr_Alarm_Pop(Chr_Cd) {

    //새창의 크기
    cw = 700;
    ch = 500;

    //스크린의 크기
    sw = screen.availWidth;
    sh = screen.availHeight;

    //열 창의 포지션
    px = (sw - cw) / 2;
    py = (sh - ch) / 5;

    //창을 여는부분
    window.open("/Mypage/mp_2017/notice/pop_allim.asp?chrcd=" + Chr_Cd + "&flg=C", "Chr_Alarm_Pop", 'left=' + px + ', top=' + py + ', width=' + cw + ', height=' + ch + ', toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no');
}

// 교재 알리미 팝업
function Book_Alarm_Pop(Book_Cd, Chr_Cd) {
	
    //새창의 크기
    cw = 700;
    ch = 500;

    //스크린의 크기
    sw = screen.availWidth;
    sh = screen.availHeight;

    //열 창의 포지션
    px = (sw - cw) / 2;
    py = (sh - ch) / 5;

    //창을 여는부분
    window.open("/Mypage/mp_2017/notice/pop_allim.asp?bookcd=" + Book_Cd + "&chrcd=" + Chr_Cd + "&flg=B", "Book_Alarm_Pop", 'left=' + px + ', top=' + py + ', width=' + cw + ', height=' + ch + ', toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no');
}

// ebook 알리미 팝업
function eBook_Alarm_Pop(Book_Cd, Chr_Cd) {
	
    //새창의 크기
    cw = 700;
    ch = 500;

    //스크린의 크기
    sw = screen.availWidth;
    sh = screen.availHeight;

    //열 창의 포지션
    px = (sw - cw) / 2;
    py = (sh - ch) / 5;

    //창을 여는부분
    window.open("/Mypage/mp_2017/notice/pop_allim.asp?bookcd=" + Book_Cd + "&chrcd=" + Chr_Cd + "&flg=E", "Book_Alarm_Pop", 'left=' + px + ', top=' + py + ', width=' + cw + ', height=' + ch + ', toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no');
}



//png 파일 투명화
var pngtmpcnt = 0;
function fncSetPng24(obj) {
    if (pngtmpcnt == 0) {
        obj.width = obj.height = 1;
        obj.className = obj.className.replace(/\bpng24\b/i, '');
        obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + obj.src + "',sizingMethod='image');"
        obj.src = '';
        pngtmpcnt++;

        return '';
    }
}


// 함수이름 : d_imgRollover()
// 함수설명 : 마우스오버 이벤트
// 입 력 값 : id, image format
// 반 환 값 : 없음
function d_imgRollover(id, format) {
    if (!document.getElementsByTagName) return;
    var vformat = "." + format;
    var item = document.getElementById(id).getElementsByTagName('*');

    var regexp = eval("/_on" + vformat + "$/");

    for (var i = 0; i < item.length; i++) {

        if (regexp.test(item[i].src))
            item[i].className = "this";

        if (item[i].className == 'use_event') {
            var src = item[i].getAttribute('src');

            item[i].onmouseover = function () {
                var img = this.src.split(vformat);
                this.src = img[0] + '_on' + vformat;
            }

            item[i].onmouseout = function () {
                var img = this.src.split('_on' + vformat);
                this.src = img[0] + vformat;
            }
        }
    }
}


// 함수이름 : popMemberInput()
// 함수설명 : 회원유입팝업
// 입 력 값 : 구분자
// 반 환 값 : 없음
function popMemberInput(zflg) {
    var dns, arrDns, str;
    dns = document.location.href; //<-- 현재 URL 얻어온다
    arrDns = dns.split("//"); //<-- // 구분자로 짤라와서
    str = arrDns[1].substring(0, arrDns[1].indexOf("/")); //<-- 뒤에부터 다음 / 까지 가져온다    
   
    //var callUrl = "http://" + str + "/member/member_2011/goMemInput.Asp?zflg=" + zflg;
    if (arrDns[0].substring(0, 5) == "https") {
        var callUrl = "https://" + str + "/member/member_new/goMemInput.Asp?zflg=" + zflg;
    } else {
        var callUrl = "http://" + str + "/member/member_new/goMemInput.Asp?zflg=" + zflg;
    }        

    //var ckWinUp = window.open(callUrl, 'popMemInput', 'width=716,height=710,scrollbars=1');
    //if (ckWinUp == null) {
    //    alert("차단된 팝업을 허용해 주십시요");
    //    return;
    //}
    location.href=callUrl;
}

// 함수이름 : popMemberEdit()
// 함수설명 : 회원수정팝업
// 입 력 값 : 구분자
// 반 환 값 : 없음
function popMemberEdit(zflg) {
    var dns, arrDns, str;
    dns = document.location.href; //<-- 현재 URL 얻어온다
    arrDns = dns.split("//"); //<-- // 구분자로 짤라와서
    str = arrDns[1].substring(0, arrDns[1].indexOf("/")); //<-- 뒤에부터 다음 / 까지 가져온다

//    var callUrl = "/member/member_2011/goMemEdit.Asp?zflg=" + zflg;
    var callUrl = "https://" + str + "/mypage/mp_2017/member/goMemEdit.Asp?zflg=" + zflg;
    var ckWinUp = window.open(callUrl, 'popMemEdit', 'width=758,height=680,scrollbars=1');
    if (ckWinUp == null) {
        alert("차단된 팝업을 허용해 주십시요");
        return;
    }
}

// 함수이름 : popChrRecom()
// 함수설명 : 수강평 팝업
// 입 력 값 : 구분자
// 반 환 값 : 없음
// 작 성 자 : J : 2012-06-14
function popChrRecom() {
    window.open('/teacher_v2/ChrReview/pop_review.asp', 'ChrRecomPop', 'width=827, height=750, scrollbars=yes');
}


// 함수이름 : fncSitelink(snsUrl,dngNo,dngKbn)
// 함수설명 : 동영상 공유하기 URL 복사
// 입 력 값 : 단축주소
// 반 환 값 : 없음
// 작 성 자 : 차재혁 : 2013-05-07
function fncSitelink(snsUrl,dngNo,dngKbn) {
	msAjax({
		url:'/Player/MegaPlayer/PlayerCommon/PlayerGetVodUrl.asp?no='+dngNo+'&dng_kbn='+dngKbn,
		type: "GET",
		onSuccess: function (rss) {}
	});

	var IE=(document.all)?true:false;
	if (IE) {
		window.clipboardData.setData("Text",snsUrl);
		alert('동영상 URL이 복사되었습니다.\n친구들과 공유 할 블로그, 카페에 Ctrl+V로 붙여 넣기 하세요. ^^\n복사한 곳에서 영상 URL 클릭시 새 창으로 영상을 감상하실 수 있습니다..');
	} else {
		temp = prompt("아래 동영상 URL 복사 후 친구들과 공유 할 블로그, 카페에 Ctrl+V로 붙여 넣기 하세요. ^^\n복사한 곳에서 영상 URL 클릭시 새 창으로 영상을 감상하실 수 있습니다.", snsUrl);
	}
	jQuery('.close').parent().css('display','none');
	return;
}

// 함수이름 : fncEmbedlink(dngNo,dngKbn,keyNote)
// 함수설명 : 동영상 공유하기 HTML 소스 복사
// 입 력 값 : 동영상번호,구분,키노트-텍스트
// 반 환 값 : 없음
// 작 성 자 : 차재혁 : 2013-05-07
// 특이사항 : 크롬 및 IE11에서 EMBED 태그 동작 안하므로, VIDEO태그 안에 EMBED태그 삽입. HTML5 브라우저에선 VIDEO 태그 실행. 그 이하 브라우저에선 EMBED 태그 실행.
function fncEmbedlink(dngNo,dngKbn,keyNote) {
	msAjax({
		url:'/Player/MegaPlayer/PlayerCommon/PlayerGetVodUrl.asp?no='+dngNo+'&dng_kbn='+dngKbn,
		type: "GET",
		onSuccess: function (rss) {
			var dValue = "<video controls=\"\" preload=\"\" style=\"width:760px;height:480px;\"><embed src=\""+rss+"\" width='760' height='480'></embed><source src=\""+rss+"\"></video><br/>"+keyNote;

			var IE=(document.all)?true:false;
			if (IE) {
				window.clipboardData.setData("Text",dValue);
				alert('동영상 HTML 소스 코드가 복사되었습니다.\n친구들과 공유 할 블로그, 카페에서 ‘HTML’을 선택하시고, Ctrl+V로 붙여 넣기 하세요. ^^\n복사한 곳에서 영상을 감상하실 수 있습니다.');
			} else {
				temp = prompt("아래 HTML 소스 코드 복사 후 친구들과 공유 할 블로그, 카페에서 ‘HTML’을 선택하시고, Ctrl+V로 붙여 넣기 하세요. ^^\n복사한 곳에서 영상을 감상하실 수 있습니다.", dValue);
			}
			jQuery('.close').parent().css('display','none');
			return;
		}
	});
}

// 함수이름 : fncShareVieolink(shareKey,strTitle)
// 함수설명 : 동영상 공유하기 HTML 소스 복사
// 입 력 값 : 오픈공유코드, 제목
// 반 환 값 : 없음
// 작 성 자 : 최진혁 : 2018-03-16
// 특이사항 : 공유링크
function fncShareVieolink(shareKey,strTitle) {
	var dValue = "<iframe width=\"760\" height=\"480\" src=\"http://v.kr.kollus.com/"+shareKey+"?title="+strTitle+"\" frameborder=\"0\" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>";
	var IE=(document.all)?true:false;
	if (IE) {
		window.clipboardData.setData("Text",dValue);
		alert('동영상 HTML 소스 코드가 복사되었습니다.\n친구들과 공유 할 블로그, 카페에서 ‘HTML’을 선택하시고, Ctrl+V로 붙여 넣기 하세요. ^^\n복사한 곳에서 영상을 감상하실 수 있습니다.');
	} else {
		temp = prompt("아래 HTML 소스 코드 복사 후 친구들과 공유 할 블로그, 카페에서 ‘HTML’을 선택하시고, Ctrl+V로 붙여 넣기 하세요. ^^\n복사한 곳에서 영상을 감상하실 수 있습니다.", dValue);
	}
	jQuery('.close').parent().css('display','none');
	return;
}


// 함수이름 : fncToTwitter(snsURL,snsTitle,dngNo,dngKbn)
// 함수설명 : 트위터 퍼가기
// 입 력 값 : 단축주소,제목
// 반 환 값 : 없음
// 작 성 자 : 차재혁 : 2013-05-07
function fncToTwitter(snsURL,snsTitle,dngNo,dngKbn) {
	msAjax({
		url:'/Player/MegaPlayer/PlayerCommon/PlayerGetVodUrl.asp?no='+dngNo+'&dng_kbn='+dngKbn,
		type: "GET",
		onSuccess: function (rss) {}
	});

	var toLink;
	toLink = 'https://twitter.com/intent/tweet?original_referer='+snsURL+'&text='+encodeURIComponent('[메가스터디] ') + encodeURIComponent(snsTitle) + ' ' + snsURL;

	window.open(toLink);
}

// 함수이름 : fncNtvCastPop(tv_no)
// 함수설명 : 티비캐스트 팝업창
// 입 력 값 : 티비캐스트 이벤트코드
// 반 환 값 : 없음
// 작 성 자 : 고건 : 2014-03-10
function fncNtvCastPop(tv_no) {
    window.open('/Player/tvCast/pop_vod.asp?TV_CAST_NO=' + tv_no, 'ncast_pop', 'width=540 height=410 scrollbars=no');
}

// 함수이름 : fncToMe2Day(snsURL,snsTitle,dngNo,dngKbn)
// 함수설명 : 미투데이 퍼가기
// 입 력 값 : 단축주소,제목
// 반 환 값 : 없음
// 작 성 자 : 차재혁 : 2013-05-07
function fncToMe2Day(snsURL,snsTitle,dngNo,dngKbn) {
	msAjax({
		url:'/Player/MegaPlayer/PlayerCommon/PlayerGetVodUrl.asp?no='+dngNo+'&dng_kbn='+dngKbn,
		type: "GET",
		onSuccess: function (rss) {}
	});

	var toLink;
	toLink = 'http://me2day.net/posts/new?new_post[body]=';
	toLink = toLink + encodeURIComponent('[메가스터디] ') + encodeURIComponent(snsTitle) + ' ' + snsURL;
	window.open(toLink);
}

// 함수이름 : fncToFacebook(snsURL,snsTitle,snsKeyNote,dngNo,dngKbn)
// 함수설명 : 페이스북 퍼가기
// 입 력 값 : 단축주소,제목,키노트-텍스트
// 반 환 값 : 없음
// 작 성 자 : 차재혁 : 2013-05-07
function fncToFacebook(snsURL,snsTitle,snsKeyNote,dngNo,dngKbn) {
	msAjax({
		url:'/Player/MegaPlayer/PlayerCommon/PlayerGetVodUrl.asp?no='+dngNo+'&dng_kbn='+dngKbn,
		type: "GET",
		onSuccess: function (rss) {}
	});

	var toLink;

	snsTitle = encodeURIComponent(snsTitle);
	snsSummary = encodeURIComponent(snsKeyNote);
	snsURL = encodeURIComponent(snsURL);
	//snsThumbnail = encodeURIComponent("http://img.megastudy.net/teacher_v2/main/t_pic2007/t_mega.gif");

	//모바일 & PC 여부 검사
	if (navigator.userAgent.lastIndexOf('Android') > 0 || navigator.userAgent.lastIndexOf('iPhone') > 0 || navigator.userAgent.lastIndexOf('iPad') > 0) {
		toLink = "http://m.facebook.com/sharer.php?u=" + snsURL;
	} else {
		toLink = "http://www.facebook.com/sharer.php?s=100&s1=123&p[title]=" + snsTitle + "&p[summary]=" + snsSummary + "&p[url]=" + snsURL;
	}
		window.open(toLink);
}

// 함수이름 : fncToFacebook2(snsURL)
// 함수설명 : 페이스북 퍼가기
// 입 력 값 : 단축주소,제목,키노트-텍스트
// 반 환 값 : 없음
// 작 성 자 : 차재혁 : 2013-05-07
//          : 차재혁 : 2014-11-04
function fncToFacebook2(snsURL,snsTitle,snsKeyNote,dngNo,dngKbn) {

	var toLink;

	snsURL = encodeURIComponent(snsURL);

	toLink = "http://www.facebook.com/sharer.php?u=" + snsURL;
	window.open(toLink);
}

// 인스타그램 쓰레드, 차재혁(2024-04-12)
function fncToThreads(strTitle, snsURL) {
	var toLink;

	toLink = 'https://threads.net/intent/post?text=';
	toLink = toLink + encodeURIComponent(strTitle) + ' ' + snsURL;
	window.open(toLink);
}

// 함수이름 : fncLazyLoadingDataGB(dNm, fnc) , fncCheckVisibleGB( elm, eval ) 
// 함수설명 : Lazy Loading 구현
// 입 력 값 : 영역 ID, 호출함수
// 반 환 값 : 없음
// 작 성 자 : nin2 : 2021-01-22
var isVisibleGB = [];
function fncLazyLoadingDataGB(dNm, fnc){
    if (fncCheckVisibleGB($('#'+dNm))&&!isVisibleGB[dNm]) {
        eval(fnc);
        isVisibleGB[dNm]=true;
    }
}
function fncCheckVisibleGB( elm, eval ) {
    eval = eval || "object visible";
    var viewportHeight = $(window).height(), // Viewport Height
        scrolltop = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();   
    
    if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
    if (eval == "above") return ((y < (viewportHeight + scrolltop)));
}


//Poc 공통 변수
var NTPT_PGEXTRA = "";

// 이벤트 클릭 확인용 20160321 CHOIJH
function fncEventClickCnt(evt_nm) {
	createXMLHttpRequest();
	xmlHttp.onreadystatechange = handleStateChange;
	xmlHttp.open("GET", "/common/inc/eventClickCnt.asp?evt_nm=" + evt_nm, true);
	xmlHttp.send(null);
}

// 라이브 클릭 확인용 20160831 CHOIJH
function fncLiveLogCnt(evtno, kbn, mobyn) {
	createXMLHttpRequest();
	xmlHttp.onreadystatechange = handleStateChange;
	xmlHttp.open("GET", "/common/inc/LivePlayClick.asp?evt_no="+evtno+"&kbn="+kbn+"&mob_yn="+mobyn, true);
	xmlHttp.send(null);
}

// 다운로드 URL Iframe 생성
function downloadURL(url) {
	if( $('#idown').length ){
		$('#idown').attr('src',url);
	}else{
		$('<iframe>', { id:'idown', src:url }).hide().appendTo('body');
	}
}

function kollus_custom_scheme_call(scheme_param) {
	var AppLoader = tui.AppLoader;
	var loader = new AppLoader();
	var osName = new UAParser().getResult().os.name;

		loader.exec({
			ios: {
				scheme: 'kollus://' + scheme_param,
				url: "https://itunes.apple.com/app/id760006888"
			},
			android: {
				intentURI: 'kollus://' + scheme_param
			},
			timerSet: {
				ios: 4000,
				android: 4000
			},
			etcCallback: function() {
				if (osName !== 'iOS' && osName !== 'Android') {
						alert('모바일 단말에서 실행하셔야 합니다.');
					}
				},
			notFoundCallback: function() {
				if (osName == 'iOS') {
					alert('KollusPlayer 앱을 설치하기 위해 앱스토어로 이동합니다.');
					window.location.href = 'https://itunes.apple.com/app/id760006888';
				}
				else if(osName =='Android'){
					alert('KollusPlayer 앱을 설치하기 위해 플레이스토어로 이동합니다.');
					window.location.href = 'market://details?id=com.kollus.media';
				}
			}
		});
}


