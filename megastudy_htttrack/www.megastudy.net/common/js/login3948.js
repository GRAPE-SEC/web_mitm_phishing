////////////////////////////////////////////////////////////////
//함수명	: check_id
//입력		: input
//출력		: 없음
//설명		: 아이디 문자제한
//사용법	: 
////////////////////////////////////////////////////////////////
function check_id(input)	{
	var err_cnt=0
	for (var i = 0; i < input.length; i++)	{
		var val = input.charAt(i);
		if (!((val >= "0" && val <= "9") || (val >= "a" && val <= "z") || (val >= "A" && val <= "Z")))
		err_cnt ++
	}
	if (err_cnt == 0 )
		return true;
	else
		return false;
}

////////////////////////////////////////////////////////////////
//함수명	: check_Pwd
//입력		: input
//출력		: 없음
//설명		: 비밀번호 문자제한
//사용법	: 
////////////////////////////////////////////////////////////////
function check_Pwd(input) {
	
    var err_cnt = 0
    for (var i = 0; i < input.length; i++) {
        var val = input.charAt(i);
        if (!((val >= "0" && val <= "9") || (val >= "a" && val <= "z") || (val >= "A" && val <= "Z") || val == "~" || val == "!" || val == "@" || val == "#" || val == "$" || val == "%" || val == "^" || val == "&" || val == "*" || val == "(" || val == ")" || val == "_" || val == "-"))
            err_cnt++
    }
    if (err_cnt == 0)
        return true;
    else
        return false;
	

	/*
	var nCharacter = 0;
	var nNumber = 0;
	var nSpecial = 0;
	var bPassWordRuleChk = false;       
	// 숫자 체크
	if (input.match(/[0-9]/) != null) {
		nNumber++;
	}
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
	*/

}

////////////////////////////////////////////////////////////////
//함수명	: idValidate
//입력		: 없음
//출력		: 없음
//설명		: 아이디 자릿수/ 문자 제한
//사용법	: 
////////////////////////////////////////////////////////////////
function idValidate()
{
	if (frmlogin.loginid.value.length < 4)
	{
		alert("아이디를 4자이상 입력하세요. ");
		frmlogin.loginid.value = "";
		frmlogin.loginid.focus();
	}
	
	if (!check_id(frmlogin.loginid.value))
	{
		alert("아이디는 영문/숫자 이외의 문자는 허용되지 않습니다. ");
		frmlogin.loginid.value = "";
		frmlogin.loginid.focus();
	}
}

////////////////////////////////////////////////////////////////
//함수명	: passValidate
//입력		: 없음
//출력		: 없음
//설명		: 비밀번호 자릿수/ 문자 제한
//사용법	: 
////////////////////////////////////////////////////////////////
function passValidate()
{
	if (frmlogin.loginpw.value.length < 4)
	{
		alert("비밀번호를 4자이상 입력하세요. ");
		frmlogin.loginpw.value = "";
		frmlogin.loginpw.focus();
	}
	
	if (!check_id(frmlogin.loginpw.value))
	{
		alert("비밀번호는 영문/숫자 이외의 문자는 허용되지 않습니다. ");
		frmlogin.loginpw.value = "";
		frmlogin.loginpw.focus();
	}
}

////////////////////////////////////////////////////////////////
//함수명	: loginok
//입력		: formName
//출력		: 없음
//설명		: 회원 로그인 밸리데이션
//사용법	: 
////////////////////////////////////////////////////////////////
function loginok(formName) {
    
	if (formName.loginid.value == "") {
		alert("아이디를 입력하세요.");
		formName.loginid.style.background="";
		formName.loginid.focus();
		return;
	}
	if (formName.loginpw.value == "") {
		alert("비밀번호를 입력하세요.");
		formName.loginpw.style.background="";
		formName.loginpw.focus();
		return;
	}
	if (formName.loginid.value.length < 4) {
		alert("아이디는 영문/숫자 4~10자 이내로 입력하세요.");
		formName.loginid.focus();
		return;
	}
	if (formName.loginpw.value.length < 8) {
		alert("비밀번호는 영문/숫자/특수문자 조합 8~20 이내로 입력하세요.");
		formName.loginpw.focus();
		return;
	}
	if (!check_id(formName.loginid.value)) {
		alert("아이디는 영문/숫자만 입력할 수 있습니다.");
		formName.loginid.focus();
		return;
	}
	if (!check_Pwd(formName.loginpw.value)) {
		alert("비밀번호는 영문/숫자/특수문자만 입력할 수 있습니다.");
		formName.loginpw.focus();
		return;
	}
	
	formName.action = https_urls + "/main/login_sql.asp";
	formName.submit();
	return;		
}

////////////////////////////////////////////////////////////////
//함수명	: popLoginOk
//입력		: formName
//출력		: 없음
//설명		: 회원 로그인 밸리데이션
//사용법	: 팝업용 로그인
////////////////////////////////////////////////////////////////
function popLoginOk(formName) {
	if (formName.loginid.value == "") {
		alert("사용하려는 ID를 먼저 입력하세요.");
		formName.loginid.focus();
		return;
	}
	if (formName.loginpw.value == "") {
		alert("비밀번호를 입력하세요.");
		formName.loginpw.focus();
		return;
	}
	if (formName.loginid.value.length < 4) {
		alert("ID를 4자리 이상으로 입력하세요.");
		formName.loginid.focus();
		return;
	}
	if (!check_id(formName.loginid.value)) {
		alert("아이디는 영문 소문자, 숫자만 사용해주세요.");
		formName.loginid.focus();
		return;
	}

	//---------------------------------------------------------------
	// --info server 없이 로그인시 사용. (주석 풀것)
	  formName.action = https_urls + "/main/login_sql.asp";
	  formName.submit();
	  return;
	//---------------------------------------------------------------

	try {
	    ret = opener.parent.Info.popLogin(formName);

	    // ret 가 0 이면 성공이다. 그외의 경우는 에러.
	    if (ret == 1) {
	        location.href = "/member/member_2011/login.asp?errcd=login";
	        return false;
	    }
	    else if (ret == 2) {
	        location.href = "/member/member_2011/login.asp?errcd=login";
	        return false;
	    }
	    else if (ret == 3) // 이미 사용중인 아이디.
	    {
	        reLogin(form);
	    }
	    else if (ret == 4) {
	        alert("\n 서버에 접속할 수 없습니다. 잠시 후 다시 접속해 주십시오!!");
	        return false;
	    }
	    else if (ret == 5) {
	        url = "/member/pop_patrol.asp?user_id=" + LoginID;
	        var aResult = new Array();
	        aResult = showModalDialog(url, "사이버 패트롤", "dialogWidth:575px;dialogHeight:475px;help:no;minimize:no;maximize:no;status:no;scroll:no;resizable:no");
	        delete aResult;
	        parent.main.location.reload();
	        return false;
	    }
	    else if (ret == 10) {
	        alert("\n 시스템에러!! 관리자에게 문의 하십시오.");
	        return false;
	    }
	    else if (ret == 0) {
	    	//alert("login OK");
	    	formName.action = https_urls + "/main/login_sql.asp";
	    	formName.submit();
	        //return true;
	    }
	    else {
	        return false;
	    }

        /**
		if (ret == false) formName.action = "";
		else {
			formName.action = https_urls + "/main/login_sql.asp";
			formName.submit();
		}
        **/
	}
	catch (e) {
		errMsg = "\n\n";
		errMsg = errMsg + "[에러1] 로그인 컨트롤이 인스톨되어 있지 않습니다.\n\n";
		errMsg = errMsg + "컨트롤을 인스톨하지 않으시면 로그인되지 않습니다.\n\n";
		errMsg = errMsg + "새로고침 또는 F5키를 누른 후 보안 경고창이 나오면\n";
		errMsg = errMsg + "[예(Y)] 버튼을 클릭하여 컨트롤을 설치해주시기 바랍니다.";
		errMsg = errMsg + "\n\n";
		errMsg = errMsg + "※ 주의\n미설치시 페이지 오류가 발생할 수 있습니다.\n\n";
		errMsg = errMsg + "로그인 컨트롤이 설치되면 메가스터디 사이트에 대한\n";
		errMsg = errMsg + "팝업설정이 '허용된 사이트'로 자동으로 등록됩니다.\n\n";
		alert(errMsg);
		self.close();
	}
}

////////////////////////////////////////////////////////////////
//함수명	: logoutok
//입력		: formName
//출력		: 없음
//설명		: 회원 로그아웃 처리
//사용법	: 
////////////////////////////////////////////////////////////////
function logoutok(formName)	
{
	try{
		parent.main.location.replace('/main/logout_sql.asp');
		parent.Info.Logout();
	}catch(e){location.replace('/main/logout_sql.asp');}
	//formName.submit();
}

////////////////////////////////////////////////////////////////
//함수명	: inputimg1
//입력		: 없음
//출력		: 없음
//설명		: 회원 로그,비밀번호 텍스트 박스 이미지 처리
//사용법	: 
////////////////////////////////////////////////////////////////
var clogin=false;
function Loginimg1() {
	if (clogin) return true;
	document.frmlogin.loginid.style.backgroundImage="";
	clogin = true;
	return true;
}
var dlogin=false;
function Loginimg2() {
	if (dlogin) return true;
	document.frmlogin.loginpw.style.backgroundImage="";
	dlogin = true;
	return true;
}


////////////////////////////////////////////////////////////////
//함수명	: fncLoginCertOk
//입력		: 없음
//출력		: 없음
//설명		: 회원 로그,비밀번호 텍스트 박스 이미지 처리-인증확인용
//사용법	: 
////////////////////////////////////////////////////////////////
function fncLoginCertOk(formName) {

    if (formName.loginid.value == "") {
        alert("사용하려는 ID를 먼저 입력하세요.");
        formName.loginid.focus();
        return;
    }
    if (formName.loginpw.value == "") {
        alert("비밀번호를 입력하세요.");
        formName.loginpw.focus();
        return;
    }
    if (formName.loginid.value.length < 4) {
        alert("ID를 4자리 이상으로 입력하세요.");
        formName.loginid.focus();
        return;
    }
    if (!check_id(formName.loginid.value)) {
        alert("아이디는 영문 소문자, 숫자만 사용해주세요.");
        formName.loginid.focus();
        return;
    }
    formName.action = https_urls + "/Member/member_2011/login_auth_sql.asp";
    formName.submit();
    return;

}