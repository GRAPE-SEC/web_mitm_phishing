/*
'=======================================================================
'�� �� �� : �ް����͵�-common
'����� : �ް����͵� ���� js ����
'�� �� �� : megastudy.js
'�ۼ����� : 2004/11/10
'�� �� �� : �迵��
'-----------------------------------------------------------------------
'��������   ������  ��������
'=======================================================================
'
'=======================================================================
*/

// �Լ��̸� : mouseOver()
// �Լ����� : �޴� �ѿ��� (�� ����Ʈ�� ����)
// �� �� �� : ��ü, �Ӽ�
// �� ȯ �� :
function mouseOver(obj, bool) {
    if (bool)
        obj.src = obj.src.replace("off", "on");
    else
        obj.src = obj.src.replace("on", "off");
}

// �Լ��̸� : change_img()
// �Լ����� : �޴� �ѿ��� (�� ����Ʈ�� ����)
// �� �� �� : ��ü, �Ӽ�
// �� ȯ �� :
function change_img(obj, tmp_a, tmp_b) {
    obj.src = obj.src.replace(tmp_a, tmp_b);
}

// �Լ��̸� : change_img2()
// �Լ����� : �޴� �ѿ��� (�� ����Ʈ�� ����)
// �� �� �� : ��ü, ��ü��, ��ü��
// �� ȯ �� :
function change_img2(obj, tmp_a, tmp_b) {
    obj.style.filter = "blendTrans(duration=0.3)";
    obj.filters.blendTrans.stop();
    obj.filters.blendTrans.Apply();
    obj.src = obj.src.replace(tmp_a, tmp_b);
    obj.filters.blendTrans.Play();
}

// �Լ��̸� : change_img3()
// �� �� �� : ��ü, ��ü��, ��ü�� , ��ü�ӵ� ( 0.1 ~2 )
// �� �� �� : ��ü, �Ӽ�
// �� ȯ �� :
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

// �Լ��̸� : openWin()
// �Լ����� : ��â ����
// �� �� �� : url, ��â �̸�, �Ӽ�
// �� ȯ �� :
function openWin(theURL, winName, features) {
    window.open(theURL, winName, features);
}

// �Լ��̸� : check_id()
// �Լ����� : ���̵� üũ
// �� �� �� : ���̵�
// �� ȯ �� :
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
	// ���� üũ
	if (input.match(/[0-9]/) != null) {
		nNumber++;
	}
	//Ư�� ��ȣ üũ
	// if (input.match(/[^\w\s]/) != null) {
	// 	nSpecial++;
	// }

    //Ư�� ��ȣ üũ
	if (input.match(/[~!@#$%^&*()_-]/) != null) {
		nSpecial++;
	}

	//������ üũ
	if (input.match(/[a-zA-Z]/) != null) {
		nCharacter++;
	}


	//�н����� �� üũ 
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

// �Լ��̸� : IsNumberCheck()
// �Լ����� : ����üũ üũ
// �� �� �� : OBJECT
// �� ȯ �� :
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
        alert('���ڸ� �Է� �����մϴ�.');
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
        alert('���ڸ� �Է��� �� �ֽ��ϴ�.');
        obj.value = "";
        return false;
    }
    else {
        return true;
    }
}


// �Լ��̸� : CheckJumim()---������
// �Լ����� : �ֹι�ȣ üũ
// �� �� �� : ���ڸ�,���ڸ�
// �� ȯ �� : ��Ȯ������
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

    //�ܱ���üũ
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

        if (sum != buf[12]) { alert("�ֹε�Ϲ�ȣ�� ��Ȯ���� �ʽ��ϴ�."); return false; }
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
            alert("�ֹε�Ϲ�ȣ�� ��Ȯ���� �ʽ��ϴ�.");
            return false;
        }
    }
}
// �Լ��̸� : check_fgnno()---�ܱ���
// �Լ����� : �ֹι�ȣ üũ
// �� �� �� : ���ڸ�,���ڸ�  (13�ڸ�)
// �� ȯ �� : ��Ȯ������
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

    if (sum != buf[12]) { alert("�ֹε�Ϲ�ȣ�� ��Ȯ���� �ʽ��ϴ�."); return false; }

    return true;
}



// �Լ��̸� : NextFocus(obj)
// �Լ����� : �ڵ���Ŀ��
// �� �� �� : ��Ŀ���� ������Ʈ
// �� ȯ �� : ��Ŀ���̵�
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

// �Լ��̸� : checkChar()
// �Լ����� : ����ڰ� ���ϴ� Ư���������翩�� ���ԵǾ� ������ true�� ����"|^;:,'\""
// �� �� �� : ���ڿ�,Ư������("|^;:,'\")
// �� ȯ �� : ���ɿ���
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

// �Լ��̸� : checkval()
// �Լ����� : ����, ����ȥ�븸 ��밡��
// �� �� �� : ���ڿ�
// �� ȯ �� : ���ɿ���
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

// �Լ��̸� : checkvalAll()
// �Լ����� : ����, ����, �ѱ�ȥ�븸 ��밡��
// �� �� �� : ���ڿ�
// �� ȯ �� : ���ɿ���
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

// �Լ��̸� : GetRdoVal()
// �Լ����� : ���� ��ư�� ���õ� ���� �Ѱ���.
// �� �� �� : object
// �� ȯ �� : ���õȰ�
function GetRdoVal(oObj) {
    var j = 0;
    var sVal;
    //������ rdo��ư�� ���� �Ѱ���.
    for (j = 0; j < oObj.length; j++) {
        if (oObj[j].checked == true) {
            sVal = oObj[j].value;
        }
    }
    return (sVal);
}

// �Լ��̸� : SetRdoVal()
// �Լ����� : ���� ��ư�� ����
// �� �� �� : object,���ð�
// �� ȯ �� : ����
function SetRdoVal(oObj, val) {
    var j = 0;

    for (j = 0; j < oObj.length; j++) {
        if (oObj[j].value == val) {
            oObj[j].checked = true;
            return;
        }
    }
}

// �Լ��̸� : onlyNumber()
// �Լ����� : ���� ���ڸ� �Էµǰ� ��
// �� �� �� : ����
// �� ȯ �� : ����
// ���� : <input type="text" onKeyPress="onlyNumber()">
function onlyNumber() {
    if (window.event.keyCode < 48 || window.event.keyCode > 57) {
        window.event.keyCode = 0;
    }
}

// �Լ��̸� : getCookie()
// �Լ����� : ��Ű��������
// �� �� �� : ��Ű��
// �� ȯ �� : ����/��Ű��
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


//���� �˾� ���� window.open ��� fncMainPopLoad �Լ� ���!!(���ηε� �Ϸ��� �˾� �ε��Ǵ� �Լ�)
function fncMainPopLoad(pUrl, pId, pStatus) {
    setTimeout(function () { window.open(pUrl, pId, pStatus); }, 500);
}


//�˾���Ű ��Ʈ
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

 // �ش��� 0�ñ��� ����
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

//�˾���Ű ���� ��������
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



// �Լ��̸� : setCookie_multi(name, value, expiredays)
// �Լ����� : ��Ű��������
// �� �� �� : ��Ű��
// �� ȯ �� : ����/��Ű��
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

// �Լ��̸� : getCookie_multi()
// �Լ����� : ��Ű��������
// �� �� �� : ��Ű��
// �� ȯ �� : ����/��Ű��
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

// �Լ��̸� : funcgvadownload
// �Լ����� : GVA ���� �ٿ�ε� â
// �� �� �� : ���
// �� ȯ �� : �ٿ�ε�â
function funcgvadownload(folpath) {
    var SecWin = window.open("", "", "resizable=no,scrollbars=no,width=420,height=280");
    var TITLE = "<HTML><HEAD><TITLE>�ܿ� �ٿ�ε� â</TITLE></HEAD>";
    TITLE = TITLE + "<BODY bgcolor=white text=black leftmargin=0 topmargin=0 marginwidth=0 marginheight=0 oncontextmenu='return false' ondragstart='return false' onselectstart='return false'>";
    TITLE = TITLE + "<OBJECT id=GDBDownCtrl style='LEFT: 0px; TOP: 0px' codeBase=<%=URL_main%>/include/GVADown.cab#version=1,0,0,2 classid=CLSID:efb56227-5415-45b1-be44-97b57dae20ce>";
    TITLE = TITLE + "<PARAM NAME='URL' VALUE='" + folpath + "'><PARAM NAME='DlgTitle' VALUE='�ް����͵�(��)'></OBJECT></BODY></HTML>";
    SecWin.document.write(TITLE);
    if (SecWin.focus)
        SecWin.focus();
}

// �Լ��̸� : strTrim
// �Լ����� : �� ���ڿ�����
// �� �� �� :
// �� ȯ �� :
function strTrim(str) {
    //return str.replace(/(^\s*)|(\s*$)/g, "");
    //    if (!s) return false;
    //    s=s.replace(/^\s*/,'');
    //    return s.replace(/\s*$/,'');
    if (!str) return false;
    str = str.replace(/^\str*/, '');
    return str.replace(/\str*$/, '');
}

// �Լ��̸� : CutHanStr
// �Լ����� : �ѱ۹��ڿ� �߶����
// �� �� �� :
// �� ȯ �� :
function CutHanStr(str, len) {
    var l = 0;
    for (var i = 0; i < str.length; i++) {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
        if (l > len) return str.substring(0, i) + "...";
    }
    return str;
}

// �Լ��̸� : CutHanStr
// �Լ����� : �ѱ۹��ڿ� �߶����
// �� �� �� :
// �� ȯ �� :
function GetHanStrLen(str) {
    var l = 0;
    for (var i = 0; i < str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
    return l;
}

// �Լ��̸� : commaNum
// �Լ����� : �ݾ� ǥ���ϱ�
// �� �� �� :
// �� ȯ �� :
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
    return "<OBJECT ID='objSetupCaller' onerror=fncChkDaulWebBoardInstall() CODEBASE='http://file1.megastudy.net/FileServer/NeoWeBoard/cabfilesV3/SetupCallerAX.cab#version=3,0,2009,5141' CLASSID='CLSID:91F1F5BA-866F-47D1-86A3-955EF0DD1717' standby='�ٿ����Ʈ �׿������� ��ġ��...' width=0 height=0><PARAM name='sBannerURL' value='http://file1.megastudy.net/FileServer/NeoWeBoard/NeoWeBoardAX-1-Setup-SetupBanner.bmp' /></OBJECT>";
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
    //XML ��ġ
    document.write('<param name="flashvars" value="hfile=http://www.megastudy.net/common/menu/tagData.asp" />');
    //XML ��ġ
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

//�÷��̾�////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var MegastudyPlayer
//����� �ػ�, ������ ����Ȯ��
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
// �Լ����� : ebook����ó�� �Լ�
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

    //20160711 ebook ������ ���� (flash ���� �ߴܵǾ� ����)
    //if (userBrowser == "IE" && parseInt(BrowserVersion) < 9) {
    //    window.open("http://cdnmega.nefficient.co.kr/ebook/" + intBookCd + "/" + bcd + "/view.htm", "e_Book", "top=0, left=0, width=1024, height=768, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0");
	//}else{
        window.open("http://file.megastudy.net/fileServer/file_asp/sampleBook/ebook_view.asp?BookCd=" + bcd , "e_Book_View", "top=0, left=0, width=1024, height=775, toolbar=0, directories=0, status=0, menubar=0, scrollbars=no, resizable=no");
    //}

}

function isMultiTouchPoint() {
	return ( new RegExp('(Linux)', "i").test(navigator.userAgent) || new RegExp('Macintosh', "i").test(navigator.userAgent) ) && navigator.maxTouchPoints > 0;
}



//�÷��̾� ȣ���Լ��� �Ķ����
var vPlayerLnk, vPlayerParam, vPlayerOption;
var agentInstallURL = "https://v.kr.kollus.com/pc_player_install/agent?cpk=megastudyedu";
//------------------------------------------------------------------

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// �Լ����� : �÷��̾� ���� �����Լ� (PC/����� ����)
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
				if (confirm("3G/4G ȯ�濡���� ������ ��Ŷ����� �߻��� �� �ֽ��ϴ�.")) {

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
    if (confirm('�������� ����ϱ� ���ؼ� ����÷��̾ ��ġ�Ͽ��� �մϴ�.\n��ġ�Ͻðڽ��ϱ�?')) {
        window.location.href = NPLAYER_SETUP_URL;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// �Լ����� : PC �ٿ�ε� ���� �����Լ�
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
// �Լ����� : �÷��̾� ���� �����Լ� (PC/����� ���� T-Zone��)
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
        if(confirm("3G/4G ȯ�濡���� ������ ��Ŷ����� �߻��� �� �ֽ��ϴ�.")){
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
// �Լ����� : ����� �÷��̾� - �Ϲ�/�߽�
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function nplayer_mega_aqua(kbn, APP_NO, CHR_CD, LEC_CD, TEC_NM) {

    vPlayerParam = "?APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn;

    if (kbn == "10" || kbn == "50") { vPlayerLnk = "L"; } //�Ϲ� ������ ����
    if (kbn == "20" || kbn == "60") { vPlayerLnk = "H"; } //�߽��÷��� ������ ����

    player_div(vPlayerLnk, vPlayerParam, 'D', 'A', 'Y');
    return;
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// �Լ����� : ����� �÷��̾� - �Ϲ�/�߽�(T-Zone��)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function nplayer_mega_aqua_Tzone(kbn, APP_NO, CHR_CD, LEC_CD, TEC_NM,SITE_NM) {

    vPlayerParam = "?APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn;

    if (kbn == "10" || kbn == "50") { vPlayerLnk = "L"; } //�Ϲ� ������ ����
    if (kbn == "20" || kbn == "60") { vPlayerLnk = "H"; } //�߽��÷��� ������ ����

    player_div_Tzone(vPlayerLnk, vPlayerParam, 'D', 'A', 'Y',SITE_NM);
    return;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// �Լ����� : ���ᰭ�� �÷��̾�
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function player_mega_sim(kbn, APP_NO, CHR_CD, LEC_CD, TEC_NM) {

    vPlayerParam = "?APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn;

    //�Ϲ� ������ ������(free) - 10:�Ϲ� 15:������ ������ �λ� 31~39 : �Ϲ� ������ ����
    if (kbn == "10") { vPlayerLnk = "L"; }
    if (kbn == "20") { vPlayerLnk = "H"; }

    player_div(vPlayerLnk, vPlayerParam, 'D', 'L', 'Y');
    return;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// �Լ����� : FREE ����� �÷��̾�
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function player_free(kbn, para) {

    //��ȭ�� �Ǳ��п�(P:OT,������,F:�̺�Ʈ)
    if (kbn == "20" || kbn == "72" || kbn == "90" || kbn == "80" || kbn == "91" || kbn == "82") {	//������� �������� �ڵ� �߰� 20150813 CHOIJH
        PlayerKbn = "P";
    } else if (kbn == "29") {
        PlayerKbn = "I";
    } else if (kbn == "68" || kbn == "89" || kbn == "99") {
        PlayerKbn = "D";
    } else {
        PlayerKbn = "F";
    }

    vPlayerParam = "?dng_kbn=" + kbn + "&CHR_CD=" + para;

    if (kbn == "10" || kbn == "20" || kbn == "72" || kbn == "80" || kbn == "90" || kbn == "91" || kbn == "79" || kbn == "89") { fncPreDngCnt(vPlayerParam); } //��ȸ�� ����//���������� �߰�

    //�Ϲ� ������ ������(free) - 10:�Ϲ� 15:������ ������ �λ� 31~39 : �Ϲ� ������ ����
    if ((kbn >= "10" && kbn <= "19") || (kbn >= "31" && kbn <= "39") || kbn == "50" || kbn == "51" || kbn == "62" || kbn == "68" || kbn == "79" || kbn == "80") { vPlayerLnk = "L"; }

    //�߽� �÷��� ������ ������ (free) - 20:�߽� 23:������  72:OT	82:�н�����(OT2) 41~49 : �߽� ������ ����
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
// �Լ����� : �ؼ����� �÷��̾� ����
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


// �Լ��̸� : player_exam_2007
// �Լ����� : �÷��̾� - FREE
// �� �� �� : ������, �Ӽ�
// �� ȯ �� :
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

// �Լ��̸� : player_Lab_free()
// �Լ����� : ������ ������ ���� �÷��̾� - FREE
// �� �� �� : ������, �Ӽ�
// �� ȯ �� :
function player_Lab_free(kbn, para) {

    vPlayerLnk = "/Player/Mega/listening/Player_Load.asp";
    vPlayerParam = "?DNG_KBN=" + kbn + "&CHR_CD=" + para;
    vPlayerOption = "width=740,height=740,top=0,left=0";

    player_div(vPlayerLnk, vPlayerParam, vPlayerOption, '', '');
    return;
}

// �Լ��̸� : lplayer_mega()
// �Լ����� : ������� �÷��̾�
// �� �� �� : ������, �Ӽ�
// �� ȯ �� :
function lplayer_mega(kbn, APP_NO, CHR_CD, LEC_CD, TEC_NM) {

    vPlayerLnk = "/Player/Mega/listening/Player_Load.asp";
    vPlayerParam = "?APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn;
    vPlayerOption = "width=740,height=740,top=0,left=0";

    player_div(vPlayerLnk, vPlayerParam, vPlayerOption, '', '');
    return;
}

// �Լ��̸� : splayer_mega_freepass(),nplayer_mega_freepass() --> ���� player_mega_freepass() ������ �۾��ʿ�
// �Լ����� : ���÷��̾� - �߽� �����н� ü��
// �� �� �� : ������, �Ӽ�
// �� ȯ �� :
function player_mega_freepass(kbn, APP_NO, CHR_CD, LEC_CD, TEC_NM) {
    vPlayerParam = "?APP_NO=" + APP_NO + "&CHR_CD=" + CHR_CD + "&LEC_CD=" + LEC_CD + "&TEC_NM=" + TEC_NM + "&kbn=" + kbn;

    if (kbn == "10" || kbn == "50") { vPlayerLnk = "L"; }
    if (kbn == "20" || kbn == "60") { vPlayerLnk = "H"; }

    player_div(vPlayerLnk, vPlayerParam, 'D', 'E', 'Y');
    return;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// �Լ����� : ����� �ε��� �÷��̾� - �Ϲ�/�߽�
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function player_index(kbn, idx) {

    vPlayerParam = "?dng_kbn=" + kbn + "&DNG_IDX=" + idx;

    //�Ϲ� ������ ������(free) - 10:�Ϲ� 15:������ ������ �λ�
    if (kbn == "13" || kbn == "10") { vPlayerLnk = "L"; }
    //�߽� �÷��� ������ ������ (free) - 20:�߽� 23:������  72:OT
    if (kbn == "23" || kbn == "20" || kbn == "29") { vPlayerLnk = "H"; }

    player_div(vPlayerLnk, vPlayerParam, 'D', 'I', 'N');
    return;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// �Լ����� : ������ ���� �÷��̾� ȣ��/��Ʈ��
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
// �Լ����� : ����ٿ�ε�
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function fncVideoDownload(kbn, para) {
    //��ȭ�� �Ǳ��п�(P:OT,������,F:�̺�Ʈ)
    if (kbn == "20" || kbn == "72" || kbn == "90" || kbn == "80" || kbn == "91" || kbn == "82") {	//������� �������� �ڵ� �߰� 20150813 CHOIJH
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
//�÷��̾�////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// �Լ����� : �̺�Ʈ ������ �ε�����
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
// �Լ����� : �̺�Ʈ ������ ��ȸ �� Ȯ��
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
// �Լ����� : �ް����͵� ����ϴ� ���� Ajax ȣ��
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
// �Լ��̸� : OpenImage_n()
// �Լ����� : �̹��� ����� �°� �˾� ���� --> focus ������ ���̾�� ��쵵�� ����(20101203)
// �� �� �� : Image Url, popup width, popup height
// �� ȯ �� :
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

    // 20110711 - ��� ���� �� ������ ��찡 �־ ����
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

// �Լ��̸� : OpenImage_n_all(), ǥ��
// �Լ����� : �̹��� ����� �°� �˾� ���� --> focus ������ ���̾�� ��쵵�� ����(20101203)
// �� �� �� : Image Url, popup width, popup height
// �� ȯ �� :
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

    // 20110711 - ��� ���� �� ������ ��찡 �־ ����
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
// �Լ��̸� : CommonMsLayerHidden()
// �Լ����� : �����ִ� ���̾� �ݱ� ��������
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

    // 20110711 - ��� ���� �� ������ ��찡 �־ ����
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
// �Լ��̸� : CommonMsLayerHidden_ifrm()
// �Լ����� : �����ִ� ���̾� �ݱ� ��������
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

// �Լ��̸� : CloseImage_n()
// �Լ����� : �����ִ� �˾�â �ݱ�
// �� �� �� : ����
// �� ȯ �� : ����
function CloseImage_n() {
    try {
        if (win != null) win.close();
    } catch (e) {
        return;
    }
}


//iframe Resize�Լ�
function resizeFrame(that) {
    //that.style.height = that.contentWindow.document.body.scrollHeight + that.contentWindow.document.body.offsetHeight - that.contentWindow.document.body.clientHeight;
    that.style.height = that.contentWindow.document.body.scrollHeight + that.contentWindow.document.body.offsetHeight - that.contentWindow.document.body.clientHeight + 'px';
}

// ���� ���� �˸��� �˾�
function Chr_Alarm_Pop(Chr_Cd) {

    //��â�� ũ��
    cw = 700;
    ch = 500;

    //��ũ���� ũ��
    sw = screen.availWidth;
    sh = screen.availHeight;

    //�� â�� ������
    px = (sw - cw) / 2;
    py = (sh - ch) / 5;

    //â�� ���ºκ�
    window.open("/Mypage/mp_2017/notice/pop_allim.asp?chrcd=" + Chr_Cd + "&flg=C", "Chr_Alarm_Pop", 'left=' + px + ', top=' + py + ', width=' + cw + ', height=' + ch + ', toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no');
}

// ���� �˸��� �˾�
function Book_Alarm_Pop(Book_Cd, Chr_Cd) {
	
    //��â�� ũ��
    cw = 700;
    ch = 500;

    //��ũ���� ũ��
    sw = screen.availWidth;
    sh = screen.availHeight;

    //�� â�� ������
    px = (sw - cw) / 2;
    py = (sh - ch) / 5;

    //â�� ���ºκ�
    window.open("/Mypage/mp_2017/notice/pop_allim.asp?bookcd=" + Book_Cd + "&chrcd=" + Chr_Cd + "&flg=B", "Book_Alarm_Pop", 'left=' + px + ', top=' + py + ', width=' + cw + ', height=' + ch + ', toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no');
}

// ebook �˸��� �˾�
function eBook_Alarm_Pop(Book_Cd, Chr_Cd) {
	
    //��â�� ũ��
    cw = 700;
    ch = 500;

    //��ũ���� ũ��
    sw = screen.availWidth;
    sh = screen.availHeight;

    //�� â�� ������
    px = (sw - cw) / 2;
    py = (sh - ch) / 5;

    //â�� ���ºκ�
    window.open("/Mypage/mp_2017/notice/pop_allim.asp?bookcd=" + Book_Cd + "&chrcd=" + Chr_Cd + "&flg=E", "Book_Alarm_Pop", 'left=' + px + ', top=' + py + ', width=' + cw + ', height=' + ch + ', toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no');
}



//png ���� ����ȭ
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


// �Լ��̸� : d_imgRollover()
// �Լ����� : ���콺���� �̺�Ʈ
// �� �� �� : id, image format
// �� ȯ �� : ����
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


// �Լ��̸� : popMemberInput()
// �Լ����� : ȸ�������˾�
// �� �� �� : ������
// �� ȯ �� : ����
function popMemberInput(zflg) {
    var dns, arrDns, str;
    dns = document.location.href; //<-- ���� URL ���´�
    arrDns = dns.split("//"); //<-- // �����ڷ� ©��ͼ�
    str = arrDns[1].substring(0, arrDns[1].indexOf("/")); //<-- �ڿ����� ���� / ���� �����´�    
   
    //var callUrl = "http://" + str + "/member/member_2011/goMemInput.Asp?zflg=" + zflg;
    if (arrDns[0].substring(0, 5) == "https") {
        var callUrl = "https://" + str + "/member/member_new/goMemInput.Asp?zflg=" + zflg;
    } else {
        var callUrl = "http://" + str + "/member/member_new/goMemInput.Asp?zflg=" + zflg;
    }        

    //var ckWinUp = window.open(callUrl, 'popMemInput', 'width=716,height=710,scrollbars=1');
    //if (ckWinUp == null) {
    //    alert("���ܵ� �˾��� ����� �ֽʽÿ�");
    //    return;
    //}
    location.href=callUrl;
}

// �Լ��̸� : popMemberEdit()
// �Լ����� : ȸ�������˾�
// �� �� �� : ������
// �� ȯ �� : ����
function popMemberEdit(zflg) {
    var dns, arrDns, str;
    dns = document.location.href; //<-- ���� URL ���´�
    arrDns = dns.split("//"); //<-- // �����ڷ� ©��ͼ�
    str = arrDns[1].substring(0, arrDns[1].indexOf("/")); //<-- �ڿ����� ���� / ���� �����´�

//    var callUrl = "/member/member_2011/goMemEdit.Asp?zflg=" + zflg;
    var callUrl = "https://" + str + "/mypage/mp_2017/member/goMemEdit.Asp?zflg=" + zflg;
    var ckWinUp = window.open(callUrl, 'popMemEdit', 'width=758,height=680,scrollbars=1');
    if (ckWinUp == null) {
        alert("���ܵ� �˾��� ����� �ֽʽÿ�");
        return;
    }
}

// �Լ��̸� : popChrRecom()
// �Լ����� : ������ �˾�
// �� �� �� : ������
// �� ȯ �� : ����
// �� �� �� : J : 2012-06-14
function popChrRecom() {
    window.open('/teacher_v2/ChrReview/pop_review.asp', 'ChrRecomPop', 'width=827, height=750, scrollbars=yes');
}


// �Լ��̸� : fncSitelink(snsUrl,dngNo,dngKbn)
// �Լ����� : ������ �����ϱ� URL ����
// �� �� �� : �����ּ�
// �� ȯ �� : ����
// �� �� �� : ������ : 2013-05-07
function fncSitelink(snsUrl,dngNo,dngKbn) {
	msAjax({
		url:'/Player/MegaPlayer/PlayerCommon/PlayerGetVodUrl.asp?no='+dngNo+'&dng_kbn='+dngKbn,
		type: "GET",
		onSuccess: function (rss) {}
	});

	var IE=(document.all)?true:false;
	if (IE) {
		window.clipboardData.setData("Text",snsUrl);
		alert('������ URL�� ����Ǿ����ϴ�.\nģ����� ���� �� ��α�, ī�信 Ctrl+V�� �ٿ� �ֱ� �ϼ���. ^^\n������ ������ ���� URL Ŭ���� �� â���� ������ �����Ͻ� �� �ֽ��ϴ�..');
	} else {
		temp = prompt("�Ʒ� ������ URL ���� �� ģ����� ���� �� ��α�, ī�信 Ctrl+V�� �ٿ� �ֱ� �ϼ���. ^^\n������ ������ ���� URL Ŭ���� �� â���� ������ �����Ͻ� �� �ֽ��ϴ�.", snsUrl);
	}
	jQuery('.close').parent().css('display','none');
	return;
}

// �Լ��̸� : fncEmbedlink(dngNo,dngKbn,keyNote)
// �Լ����� : ������ �����ϱ� HTML �ҽ� ����
// �� �� �� : �������ȣ,����,Ű��Ʈ-�ؽ�Ʈ
// �� ȯ �� : ����
// �� �� �� : ������ : 2013-05-07
// Ư�̻��� : ũ�� �� IE11���� EMBED �±� ���� ���ϹǷ�, VIDEO�±� �ȿ� EMBED�±� ����. HTML5 ���������� VIDEO �±� ����. �� ���� ���������� EMBED �±� ����.
function fncEmbedlink(dngNo,dngKbn,keyNote) {
	msAjax({
		url:'/Player/MegaPlayer/PlayerCommon/PlayerGetVodUrl.asp?no='+dngNo+'&dng_kbn='+dngKbn,
		type: "GET",
		onSuccess: function (rss) {
			var dValue = "<video controls=\"\" preload=\"\" style=\"width:760px;height:480px;\"><embed src=\""+rss+"\" width='760' height='480'></embed><source src=\""+rss+"\"></video><br/>"+keyNote;

			var IE=(document.all)?true:false;
			if (IE) {
				window.clipboardData.setData("Text",dValue);
				alert('������ HTML �ҽ� �ڵ尡 ����Ǿ����ϴ�.\nģ����� ���� �� ��α�, ī�信�� ��HTML���� �����Ͻð�, Ctrl+V�� �ٿ� �ֱ� �ϼ���. ^^\n������ ������ ������ �����Ͻ� �� �ֽ��ϴ�.');
			} else {
				temp = prompt("�Ʒ� HTML �ҽ� �ڵ� ���� �� ģ����� ���� �� ��α�, ī�信�� ��HTML���� �����Ͻð�, Ctrl+V�� �ٿ� �ֱ� �ϼ���. ^^\n������ ������ ������ �����Ͻ� �� �ֽ��ϴ�.", dValue);
			}
			jQuery('.close').parent().css('display','none');
			return;
		}
	});
}

// �Լ��̸� : fncShareVieolink(shareKey,strTitle)
// �Լ����� : ������ �����ϱ� HTML �ҽ� ����
// �� �� �� : ���°����ڵ�, ����
// �� ȯ �� : ����
// �� �� �� : ������ : 2018-03-16
// Ư�̻��� : ������ũ
function fncShareVieolink(shareKey,strTitle) {
	var dValue = "<iframe width=\"760\" height=\"480\" src=\"http://v.kr.kollus.com/"+shareKey+"?title="+strTitle+"\" frameborder=\"0\" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>";
	var IE=(document.all)?true:false;
	if (IE) {
		window.clipboardData.setData("Text",dValue);
		alert('������ HTML �ҽ� �ڵ尡 ����Ǿ����ϴ�.\nģ����� ���� �� ��α�, ī�信�� ��HTML���� �����Ͻð�, Ctrl+V�� �ٿ� �ֱ� �ϼ���. ^^\n������ ������ ������ �����Ͻ� �� �ֽ��ϴ�.');
	} else {
		temp = prompt("�Ʒ� HTML �ҽ� �ڵ� ���� �� ģ����� ���� �� ��α�, ī�信�� ��HTML���� �����Ͻð�, Ctrl+V�� �ٿ� �ֱ� �ϼ���. ^^\n������ ������ ������ �����Ͻ� �� �ֽ��ϴ�.", dValue);
	}
	jQuery('.close').parent().css('display','none');
	return;
}


// �Լ��̸� : fncToTwitter(snsURL,snsTitle,dngNo,dngKbn)
// �Լ����� : Ʈ���� �۰���
// �� �� �� : �����ּ�,����
// �� ȯ �� : ����
// �� �� �� : ������ : 2013-05-07
function fncToTwitter(snsURL,snsTitle,dngNo,dngKbn) {
	msAjax({
		url:'/Player/MegaPlayer/PlayerCommon/PlayerGetVodUrl.asp?no='+dngNo+'&dng_kbn='+dngKbn,
		type: "GET",
		onSuccess: function (rss) {}
	});

	var toLink;
	toLink = 'https://twitter.com/intent/tweet?original_referer='+snsURL+'&text='+encodeURIComponent('[�ް����͵�] ') + encodeURIComponent(snsTitle) + ' ' + snsURL;

	window.open(toLink);
}

// �Լ��̸� : fncNtvCastPop(tv_no)
// �Լ����� : Ƽ��ĳ��Ʈ �˾�â
// �� �� �� : Ƽ��ĳ��Ʈ �̺�Ʈ�ڵ�
// �� ȯ �� : ����
// �� �� �� : ��� : 2014-03-10
function fncNtvCastPop(tv_no) {
    window.open('/Player/tvCast/pop_vod.asp?TV_CAST_NO=' + tv_no, 'ncast_pop', 'width=540 height=410 scrollbars=no');
}

// �Լ��̸� : fncToMe2Day(snsURL,snsTitle,dngNo,dngKbn)
// �Լ����� : �������� �۰���
// �� �� �� : �����ּ�,����
// �� ȯ �� : ����
// �� �� �� : ������ : 2013-05-07
function fncToMe2Day(snsURL,snsTitle,dngNo,dngKbn) {
	msAjax({
		url:'/Player/MegaPlayer/PlayerCommon/PlayerGetVodUrl.asp?no='+dngNo+'&dng_kbn='+dngKbn,
		type: "GET",
		onSuccess: function (rss) {}
	});

	var toLink;
	toLink = 'http://me2day.net/posts/new?new_post[body]=';
	toLink = toLink + encodeURIComponent('[�ް����͵�] ') + encodeURIComponent(snsTitle) + ' ' + snsURL;
	window.open(toLink);
}

// �Լ��̸� : fncToFacebook(snsURL,snsTitle,snsKeyNote,dngNo,dngKbn)
// �Լ����� : ���̽��� �۰���
// �� �� �� : �����ּ�,����,Ű��Ʈ-�ؽ�Ʈ
// �� ȯ �� : ����
// �� �� �� : ������ : 2013-05-07
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

	//����� & PC ���� �˻�
	if (navigator.userAgent.lastIndexOf('Android') > 0 || navigator.userAgent.lastIndexOf('iPhone') > 0 || navigator.userAgent.lastIndexOf('iPad') > 0) {
		toLink = "http://m.facebook.com/sharer.php?u=" + snsURL;
	} else {
		toLink = "http://www.facebook.com/sharer.php?s=100&s1=123&p[title]=" + snsTitle + "&p[summary]=" + snsSummary + "&p[url]=" + snsURL;
	}
		window.open(toLink);
}

// �Լ��̸� : fncToFacebook2(snsURL)
// �Լ����� : ���̽��� �۰���
// �� �� �� : �����ּ�,����,Ű��Ʈ-�ؽ�Ʈ
// �� ȯ �� : ����
// �� �� �� : ������ : 2013-05-07
//          : ������ : 2014-11-04
function fncToFacebook2(snsURL,snsTitle,snsKeyNote,dngNo,dngKbn) {

	var toLink;

	snsURL = encodeURIComponent(snsURL);

	toLink = "http://www.facebook.com/sharer.php?u=" + snsURL;
	window.open(toLink);
}

// �ν�Ÿ�׷� ������, ������(2024-04-12)
function fncToThreads(strTitle, snsURL) {
	var toLink;

	toLink = 'https://threads.net/intent/post?text=';
	toLink = toLink + encodeURIComponent(strTitle) + ' ' + snsURL;
	window.open(toLink);
}

// �Լ��̸� : fncLazyLoadingDataGB(dNm, fnc) , fncCheckVisibleGB( elm, eval ) 
// �Լ����� : Lazy Loading ����
// �� �� �� : ���� ID, ȣ���Լ�
// �� ȯ �� : ����
// �� �� �� : nin2 : 2021-01-22
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


//Poc ���� ����
var NTPT_PGEXTRA = "";

// �̺�Ʈ Ŭ�� Ȯ�ο� 20160321 CHOIJH
function fncEventClickCnt(evt_nm) {
	createXMLHttpRequest();
	xmlHttp.onreadystatechange = handleStateChange;
	xmlHttp.open("GET", "/common/inc/eventClickCnt.asp?evt_nm=" + evt_nm, true);
	xmlHttp.send(null);
}

// ���̺� Ŭ�� Ȯ�ο� 20160831 CHOIJH
function fncLiveLogCnt(evtno, kbn, mobyn) {
	createXMLHttpRequest();
	xmlHttp.onreadystatechange = handleStateChange;
	xmlHttp.open("GET", "/common/inc/LivePlayClick.asp?evt_no="+evtno+"&kbn="+kbn+"&mob_yn="+mobyn, true);
	xmlHttp.send(null);
}

// �ٿ�ε� URL Iframe ����
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
						alert('����� �ܸ����� �����ϼž� �մϴ�.');
					}
				},
			notFoundCallback: function() {
				if (osName == 'iOS') {
					alert('KollusPlayer ���� ��ġ�ϱ� ���� �۽����� �̵��մϴ�.');
					window.location.href = 'https://itunes.apple.com/app/id760006888';
				}
				else if(osName =='Android'){
					alert('KollusPlayer ���� ��ġ�ϱ� ���� �÷��̽����� �̵��մϴ�.');
					window.location.href = 'market://details?id=com.kollus.media';
				}
			}
		});
}


