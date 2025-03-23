var GPlayer = "";
function isMoneyNumber4(sVal) {
		var deci_cnt = 0;
		for (i=0; i<sVal.length; i++) {
			if (sVal.substring(i, i+1) == '.' ) {
				deci_cnt = deci_cnt + 1;	//소수점있는지여부
			}
		}
		if (deci_cnt > 0) {
			return true;
		}
		return false;
	}

function numOnMask2(me){
		var tmpH;


		if(!isMoneyNumber4(me)) {
			if(me.length > 3){
				var c=0;
				var myArray=new Array();
				for(var i=me.length;i>0;i=i-3){
						myArray[c++]=me.substring(i-3,i);
				}
				myArray.reverse();
				me=myArray.join(",");
			 }
			 if(tmpH){
				me=tmpH+me;
			 }
		} else {
			var e = me;
			e = e.split(".");
			var myStr = e[0];
			if(myStr.length > 3){
				var c=0;
				var myArray=new Array();
				for(var i=myStr.length;i>0;i=i-3){
						myArray[c++]=myStr.substring(i-3,i);
				}
				myArray.reverse();
				myStr=myArray.join(",");
			 }
			 if(tmpH){
				me=tmpH+myStr+"."+e[1];
			 }
			 else {
				me=myStr+"."+e[1];
			 }
		}

		return me;
}


// 패키지 복수 교재 선택 (2015-04 리뉴얼 황영순)
function fnPackagebooksCheck(pkg_cd) {

    var url = "/Lecture/popup/lecture_Packagebook_select_new.asp?pkg_cd=" + pkg_cd
    window.open(url, "_popbook", "left=200,top=200,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=670,height=600");
}

// 패키지 결재처리 (2015-04 리뉴얼 황영순)
function fnSetEventPackageNewAll(pkg_cd, kbn) {

    var uCookie = getCookie("userid");

    if (uCookie == "") {
        uCookie = getCookie("USERID")
    }
    if (uCookie == "") {
        alert("로그인을 먼저 해 주세요.");
        popMemberInput("2");
        return;
    }

    //학부모 회원인경우 메세지 표시
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("학부모 회원은 구매가 불가능합니다.");
        return;
    }


    //	---------	장바구니/결제하기pkg_cd
    jQuery("#cart_kbn").val(kbn);
    jQuery("#pkg_cd").val(pkg_cd);
    var formObj = jQuery("#mainfrm");
    var bookObj = jQuery(".pkbookChk_" + pkg_cd);


    if (jQuery("#bkcdN_" + pkg_cd).is(":checked") == true) {
        
        bookObj.each(function () {
            if (bookObj.val().length > 0) {

                tmpBookCdArray = jQuery(this).val().split("-");
                for (var k = 0; k < tmpBookCdArray.length; k++) {
                    formObj.append("<input type='hidden' name='book_cd' value='" + tmpBookCdArray[k] + "'>");
                }
            }

        });
    }


    formObj.attr({
        'method': 'post',
        'action': '/cart/cart_pkg_all.asp'
    }).submit();


}


// 패키지 교재 선택
function fnSetEventPackageBookPrice(pkg_cd, chr_cd) {
	var totbookprc	= jQuery("#bookTotalPrc_" + pkg_cd).val();	// 교재총금액
	var ckbookYn = jQuery("#bookCheckYn_" + pkg_cd).val();

	ckbookprc = jQuery("#bkprc_"+ pkg_cd +"_"+ chr_cd).val();
	ckpkgprc = jQuery("#pkg_prc_"+ pkg_cd).val();

	if (jQuery("#bkcd_"+ pkg_cd +"_"+ chr_cd).is(":checked")) {
	    totbookprc = parseInt(totbookprc, 10) + parseInt(ckbookprc, 10);
	    ckbookYn = "Y";
	}
	else {
		totbookprc = parseInt(totbookprc, 10) - parseInt(ckbookprc, 10);
	}

	if (pkg_cd == "146559"){
		totbookprc = 0;
	}

	if (pkg_cd == "171820" && chr_cd == "31688"){
		totbookprc = 0;
	}


	jQuery("#bookTotalPrc_" + pkg_cd).val(totbookprc);

	totpkgprc = parseInt(ckpkgprc) + totbookprc;

	jQuery("#bookCalcValue_"+ pkg_cd).html(numOnMask2(''+totbookprc));
	jQuery("#bookCalcPkgResult_"+ pkg_cd).html(numOnMask2(''+totpkgprc));

    //패키지 교재 체크에 따라 문구 변경용  - 추가 2014-10-23 황영순
	if (ckbookYn == "Y" || totbookprc > 0) {
	    jQuery("#bookCalcNew_" + pkg_cd).show();
	    jQuery("#bookCalcNew2_" + pkg_cd).hide();
	}
	else {
	    jQuery("#bookCalcNew_" + pkg_cd).hide();
	    jQuery("#bookCalcNew2_" + pkg_cd).show();
	}
}

// 패키지 보이기 닫기
function PkgCharListView(flg, cd) {
		if (flg == "Y") {
			jQuery("#btnPkCharN_" + cd).show();
			jQuery("#btnPkCharY_" + cd).hide();
			jQuery("#PkChar_" + cd).show();

			//추가
			jQuery("#PkCharView_" + cd).hide();
		}

		if (flg == "N") {
			jQuery("#btnPkCharN_" + cd).hide();
			jQuery("#btnPkCharY_" + cd).show();
			jQuery("#PkChar_" + cd).hide();
			//추가
			jQuery("#PkCharView_" + cd).show();
		}
}

// 패키지 보이기 닫기 -리뉴얼건
function PkgCharNewListView(flg, cd) {
    if (flg == "Y") {
        jQuery("#btnPkCharNewN_" + cd).show();
        jQuery("#btnPkCharNewY_" + cd).hide();
        jQuery("#PkCharNew_" + cd).show();

        //추가
        //jQuery("#PkCharView_" + cd).hide();
    }

    if (flg == "N") {
        jQuery("#btnPkCharNewN_" + cd).hide();
        jQuery("#btnPkCharNewY_" + cd).show();
        jQuery("#PkCharNew_" + cd).hide();
        //추가
        //jQuery("#PkCharView_" + cd).show();
    }
}



// 패키지 결재처리
function fnSetEventPackageAll(pkg_cd, kbn) {

    var uCookie = getCookie("userid");

        if (uCookie == "") {
            alert("로그인을 먼저 해 주세요.");
            popMemberInput("2");
            return;
        }

        //학부모 회원인경우 메세지 표시
        if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
            alert("학부모 회원은 구매가 불가능합니다.");
            return;
        }

		//	---------	장바구니/결제하기pkg_cd
		jQuery("#cart_kbn").val(kbn);
		jQuery("#pkg_cd").val(pkg_cd);
		var formObj = jQuery("#mainfrm");
		var bookObj = jQuery(".bkcd_" + pkg_cd);

		bookObj.each(function() {
		    if (jQuery(this).is(":checked")) {
		        tmpBookCdArray = jQuery(this).val().split("-");

		        for (var k = 0; k < tmpBookCdArray.length; k++) {
		            //alert("<input type='hidden' name='book_cd' value='" + tmpBookCdArray[k] + "'>");
		            formObj.append("<input type='hidden' name='book_cd' value='" + tmpBookCdArray[k] + "'>");
		        }
		    }
		});

		formObj.attr({
			 'method': 'post',
			 'action': '/cart/cart_pkg_all.asp'
		}).submit();

}

// 복수 교재 선택
function booksCheck(chr_cd, bookcd, chrnm) {
		var url = "/Lecture/popup/lecture_book_select_new.asp?chr_cd="+ chr_cd +"&bookcd="+ bookcd +"&chrnm="+ chrnm
		window.open(url,"_popbook","left=200,top=200,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=650,height=600");
}

function goBigZzim(item_no) {
    //학부모 회원인경우 메세지 표시
    var uCookie = getCookie("userid");
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("학부모 회원은 구매가 불가능합니다.");
        return;
    }

    var frm = document.mainfrm;
    if (frm.chrChk == undefined) return;

    var veri = frm.chrChk[0];
    var bPass = false;

    for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {
        try {

            if (jQuery('input:checkbox[name=speed_type1]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(1);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }            

            if (jQuery('input:checkbox[name=speed_type2]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(2);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type3]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(3);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type4]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(4);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (!bPass) {
                try {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);

                } catch (e) {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);
                }
            }                      
            // -----------------------------------------
        } catch (e) { }

        if (jQuery('input:checkbox[name=chrChk]').eq(i).is(':checked') == true) {
            bPass = true;
        }
    }


	if (!bPass) {
		alert("찜하실 강좌를 선택하여 주십시요");
		return;
	}

	var goUrl = "Cart_Zzim_Big_Input.Asp";
	if (item_no == 0) goUrl = "Cart_Zzim_MPass_Input.Asp";
	if (item_no < 0) goUrl = "Cart_Zzim_Double_Big_Input.Asp";
    if (item_no == 5) goUrl = "Cart_Zzim_SPass_Input.Asp";

	frm.target = "tmpAct";
	frm.action = '/MyPage/Cart_New/' + goUrl + '?z_cd=' + item_no;
	frm.submit();
}

function goWish(user_id){
	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;

	var bPass = false;

	if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
	    bPass = true;
	}


    if (jQuery('input:checkbox[name="unitChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="pkgChk"]:checked').length > 0) {
        bPass = true;
    }		
	

	if(!bPass){
		alert("찜하실 강좌 또는 교재를 선택하여 주십시요");
		return;
	}

	frm.action = '/cart/cart_prop_pre.asp';
	frm.submit();
}

function goCart(user_id){
	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;

	var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="unitChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="pkgChk"]:checked').length > 0) {
        bPass = true;
    }	

	if(!bPass){
		alert("신청하실 강좌 또는 교재를 선택하여 주십시요");
		return;
	}

	frm.action = '/cart/cart_main_pre.asp';
	frm.submit();
}

function goCart_Event_Cnt(my_std_cnt){
	var uCookie=getCookie("userid");

	if(uCookie == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시

	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;

	if (jQuery('input:checkbox[name="chrChk"]').length == 0) {
	    return;
	}
	
	var check_chr_cnt = 0;
	var bPass = false;

	for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {
        try{
			// Speed 플래그 추가 -----------------------

            if (jQuery('input:checkbox[name=speed_type1]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(1);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            } 	
            
            if (jQuery('input:checkbox[name=speed_type2]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(2);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type3]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(3);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type4]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(4);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (!bPass) {
                try {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);

                } catch (e) {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);
                }
            }                         	                         		
			// -----------------------------------------
        } catch (e) { }

        if (jQuery('input:checkbox[name=chrChk]').eq(i).is(':checked') == true) {
            check_chr_cnt = check_chr_cnt + 1;
            bPass = true;
        }	
    }


    if (jQuery('input:checkbox[name="unitChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="pkgChk"]:checked').length > 0) {
        bPass = true;
    }

    if (!bPass) {
        alert("신청하실 강좌 또는 교재를 선택하여 주십시요");
        return;
    }	
	

	if(!bPass){
		alert("신청하실 강좌 또는 교재를 선택하여 주십시요");
		return;
}
	
	if(my_std_cnt==0){
		if (check_chr_cnt>2){
			alert("2개까지 무료강좌 수강 신청이 가능합니다.");
			return;
		}else{
			frm.action = '/cart/cart_main_pre.asp';
			frm.submit();
		}
	}else{
		if(my_std_cnt==1){
			if (check_chr_cnt==1){
				frm.action = '/cart/cart_main_pre.asp';
				frm.submit();
			}else{
				alert("2개까지 무료강좌 수강 신청이 가능합니다.");
				return;
			}
		}
	}

}


function goDirectPay(user_id){
	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;

	var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }

    if (jQuery('input:checkbox[name="unitChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="pkgChk"]:checked').length > 0) {
        bPass = true;
    }

    if (!bPass) {
        alert("신청하실 강좌 또는 교재를 선택하여 주십시오");
        return;
    }	

	if(!bPass){
		alert("결제하실 강좌 또는 교재를 선택하여 주십시오");
		return;
	}

	frm.action = '/cart/cart_direct_pay_pre.asp';
	frm.submit();
}


function goDirectPay_Event_Cnt(my_std_cnt){
	var uCookie=getCookie("userid");

	if(uCookie == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시

	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;

	if (jQuery('input:checkbox[name="chrChk"]').length == 0) {
	    return;
	}


	var bPass = false;
	var check_chr_cnt=0;

	for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {
	    try {
	        // Speed 플래그 추가 -----------------------

	        if (jQuery('input:checkbox[name=speed_type1]').eq(i).is(':checked') == true) {
	            jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
	            jQuery("input:checkbox[name='speed_type']").eq(i).val(1);
	            jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
	            bPass = true;
	        }

	        if (jQuery('input:checkbox[name=speed_type2]').eq(i).is(':checked') == true) {
	            jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
	            jQuery("input:checkbox[name='speed_type']").eq(i).val(2);
	            jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
	            bPass = true;
	        }

	        if (jQuery('input:checkbox[name=speed_type3]').eq(i).is(':checked') == true) {
	            jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
	            jQuery("input:checkbox[name='speed_type']").eq(i).val(3);
	            jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
	            bPass = true;
	        }

	        if (jQuery('input:checkbox[name=speed_type4]').eq(i).is(':checked') == true) {
	            jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
	            jQuery("input:checkbox[name='speed_type']").eq(i).val(4);
	            jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
	            bPass = true;
	        }

	        if (!bPass) {
	            try {
	                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
	                jQuery("input:checkbox[name='speed_type']").eq(i).val("");
	                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);

	            } catch (e) {
	                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
	                jQuery("input:checkbox[name='speed_type']").eq(i).val("");
	                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);
	            }
	        }
	        // -----------------------------------------
	    } catch (e) { }

	    if (jQuery('input:checkbox[name=chrChk]').eq(i).is(':checked') == true) {
	        check_chr_cnt = check_chr_cnt + 1;
	        bPass = true;
	    }
	}

	if (jQuery('input:checkbox[name="unitChk"]:checked').length > 0) {
	    bPass = true;
	}   
	 
    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }
    
    if (jQuery('input:checkbox[name="pkgChk"]:checked').length > 0) {
        bPass = true;
    }	

	if(!bPass){
		alert("결제하실 강좌 또는 교재를 선택하여 주십시요");
		return;
	}

	if(my_std_cnt==0){
		if (check_chr_cnt>2){
			alert("2개까지 무료강좌 수강 신청이 가능합니다.");
			return;
		}else{
			frm.action = '/cart/cart_direct_pay.asp';
			frm.submit();
		}
	}else{
		if(my_std_cnt==1){
			if (check_chr_cnt==1){
				frm.action = '/cart/cart_direct_pay.asp';
				frm.submit();
			}else{
				alert("2개까지 무료강좌 수강 신청이 가능합니다.");
				return;
			}
		}
	}
}

function goDirectPay1(user_id){
	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	var frm = document.mainfrm;

	var thunderNum = 0;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        thunderNum = jQuery('input:checkbox[name="chrChk"]:checked').length;
    }	

	if(thunderNum > 0 && thunderNum < 3){
		if(confirm("2학기 기말고사 벼락치기 강좌를 3~4개 신청하시면 수강료의 5%가 할인 되고, \n\n5개 이상 하시면 10%가 할인 됩니다. \n\n신청하신 벼락치기 강좌갯수가 3개 미만이여서 할인을 받지 못하십니다.\n\n\n바로 결제 하시겠습니까?") != 1) return;
	}

	var bPass = false;

	if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
	    bPass = true;
	}
	
	if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
	    bPass = true;
	}

    if (jQuery('input:checkbox[name="pkgChk"]:checked').length > 0) {
        bPass = true;
    }	

	if(!bPass){
		alert("결제하실 강좌 또는 교재를 선택하여 주십시요");
		return;
	}

	frm.action = '/cart/cart_direct_pay.asp';

	frm.submit();
}

//Free Pass용
function goCart_Free(user_id){
	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;
	
    var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }		

	if(!bPass){
		alert("신청하실 강좌를 선택하여 주십시요");
		return;
	}

	window.open('','freepassPop','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=520,height=590');

	frm.action = '/Free_pass/Cart/cart_FreePass_popup.asp';
	frm.target = 'freepassPop';

	frm.submit();
}

//Free Pass용
function goCart_Free_event(user_id){
	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;

    var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }		
	
	if(!bPass){
		alert("신청하실 강좌를 선택하여 주십시요");
		return;
	}

	window.open('','freepassPop','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=520,height=590');

	frm.action = '/Free_pass_event/Cart/cart_FreePass_popup.asp';
	frm.target = 'freepassPop';

	frm.submit();
}

//고1 종합반
function goCart_go1(user_id) {
	if(user_id == "") {
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT") {
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;

    var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }		

	if(!bPass) {
		alert("신청하실 강좌를 선택하여 주십시요");
		return;
	}

	window.open('','Go1ClassPop','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=660,height=590');

	frm.action = '/go1_class/lecture/p_cart.asp';
	frm.target = 'Go1ClassPop';
	frm.submit();
}

//고1 종합반 무료 체험 용
function goCart_G1FreeEvent(user_id){
	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;
	
    var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }	

	if(!bPass){
		alert("신청하실 강좌를 선택하여 주십시요");
		return;
	}

	window.open('','G1FreeEventPop','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=660,height=590');

	frm.action = '/go1_class/lecture/p_free_cart.asp';
	frm.target = 'G1FreeEventPop';

	frm.submit();
}

// 강좌 교재 신청 페이지에서 강좌 체크 박스를 체크했을때 어떠한 엑션을 하고 싶다면 이 함수를 이용한다.
function EndClose(ctrl, chrCode){
	if(chrCode == 1555 || chrCode == 1553 || chrCode == 710 ){
		if(ctrl.checked){
			alert("선택하신 강좌는 현재 '기본 과정 패키지'로 판매되는 패키지에 포함되어 있습니다.\n\n패키지 강좌를 구매하시면 수강료 할인혜택을 받으실 수 있습니다. ");
		}
	}

	if(chrCode == 1223 || chrCode == 1369){
		if(ctrl.checked){
			alert("선택하신 강좌는 현재 'TMX 고딩 영어 기초 완성 - Two Packs'로 판매되는 패키지에 포함되어 있습니다.\n\n패키지 강좌를 구매하시면 수강료 할인혜택을 받으실 수 있습니다. ");
		}
	}
}

function viewBookDetail(chrcd, chrnm, url){
	var vbd = window.open(url + "/popup/pop_Infobook_new.asp?chr_cd=" + chrcd, '_pop', 'left=200,top=200,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=700,height=590');
	vbd.focus();
}

function fncviewBookDetail(chrcd, itemType, url){
	var vbd = window.open(url + "/popup/pop_Infobook_new.asp?chr_cd=" + chrcd+"&itemType="+itemType, '_pop', 'left=200,top=200,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=700,height=590');
	vbd.focus();
}


function msgposit_list2(){
//	if (tempY >= 350){ var YY = 0;} else { var YY= + 225 ;}
	message.style.posLeft = event.x + 15 + document.body.scrollLeft

	message.style.posTop = event.y + document.body.scrollTop
}

function msgset_list2(str,str2){
	var text

	text ='<table align="center" border="1" cellpadding="0" cellspacing="0" bgcolor="#fafad2" style="font-size:9pt; border-width:0; border-color:black; border-style:solid; word-break:break-all;">'

	text += '<tr><td align=left>'+str+'<br>'+str2+'</td></tr></table>'

	message.innerHTML=text
}

function msghide_list2(){
	message.innerHTML=''
}

function SearchChr(){
	var frm = document.SrhFrm;
	if(frm.chrCode.value == "") {alert("상품코드를 입력하세요"); return;}

/*	var tmp;
	tmp = new String(frm.chrCode.value);
	tmp = tmp.toUpperCase();

	var charexp = new RegExp("/[A-E]\d{4}/");
	if(!charexp.test(tmp))
	{
		alert("코드 형식이 틀립니다");
		return;
	}
	*/
	frm.searchType.value = "";
	frm.CDFind.value = 1;

	frm.submit();
}

function goPopTec(teccd, ctrl, newflg){
//	var frm = this.form;
	var frm = document.mainfrm;
	frm.popTeccd.value = teccd;
	frm.popDate.value = ctrl.value;
	frm.popSsflg.value = newflg;
	frm.popsrh.value = "Y";

	frm.submit();
}

function goTec(tecCD){
	var frm = document.SrhFrm;
	frm.searchType.value = "tec";
	frm.searchSub1.value = tecCD;
	frm.searchSub.value = "";

	frm.submit();
}

//교재 상시구매 체크
function goWish_always(user_id){
	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	var frm = document.mainfrm;
	
    var bPass = false;

    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }		
	
	if(!bPass){
		alert("찜하실 교재를 선택하여 주십시요");
		return;
	}
	frm.act_flg.value="1";
	frm.submit();
}

function goCart_always(user_id){
	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
    }
	
	var frm = document.mainfrm;

    var bPass = false;

    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }	

	if(!bPass){
		alert("신청하실 교재를 선택하여 주십시요");
		return;
	}
	frm.act_flg.value="2";
	frm.submit();
}

function goDirectPay_always(user_id){
	
	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
    }

    var frm = document.mainfrm;

    var bPass = false;

    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }		

	if(!bPass){
		alert("결제하실 교재를 선택하여 주십시요");
		return;
	}
	frm.act_flg.value="3";
	frm.submit();
}


function goMakeReady(user_id){
  //학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;

    var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }	

	if(!bPass){
		alert("수강권을 이용하실 강좌를 선택하여 주십시요");
		return;
	}

	frm.action = '/cart/cart_basket_make_pre.asp';

	frm.submit();
}


function goWishUnit(user_id){
  if(user_id == ""){
      alert("먼저 로그인을 하십시요");
      popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;
	
	var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="unitChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }     	

	if(!bPass){
		alert("신청하실 강좌 또는 교재를 선택하여 주십시요");
		return;
	}	
	

	if(!bPass){
		alert("신청하실 강좌 또는 교재를 선택하여 주십시요");
		return;
	}

	frm.action = '/cart/cart_prop_pre.asp';

	frm.submit();
}

function goCartUnit(user_id){
  if(user_id == ""){
      alert("먼저 로그인을 하십시요");
      popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;
	
	var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="unitChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }     	

	if(!bPass){
		alert("신청하실 강좌 또는 교재를 선택하여 주십시요");
		return;
	}

	frm.action = '/cart/cart_main_pre.asp';

	frm.submit();
}

function goDirectPayUnit(user_id){
  if(user_id == ""){
      alert("먼저 로그인을 하십시요");
      popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;
	
	var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="unitChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }

    if (!bPass){
	    alert("신청하실 강좌 또는 교재를 선택하여 주십시요");
	    return;
	}

	frm.action = '/cart/cart_direct_pay_pre.asp';

	frm.submit();
}
function goTGPackage(iCnt){
	var frm = document.mainfrm;
	var uCookie = getCookie("userid");

	var chkCnt = 0;
	
	var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
        chkCnt = jQuery('input:checkbox[name="chrChk"]:checked').length;
    }	
	
	if ((5-parseInt(iCnt)) < parseInt(chkCnt)){
		alert(" 수강신청 가능한 강좌 개수가 초과되었습니다. \n\n 총 5개 강좌까지만 신청이 가능합니다.");
		return;
	}


	if(!bPass)
	{
		alert("선택된 강좌가 없습니다. 강좌를 선택해 주세요.");
		return;
	}

	if (confirm(" 선택 강좌를 수강 신청한 후에는 \n 수강을 취소하거나 다른 강좌로 변경할 수 없습니다. \n\n 선택 강좌를 신청하시겠습니까?")) {
		frm.action = '/cart/cart_tg_pre.asp';
		frm.submit();
	}
}
function goTGPackage1(e){
	var frm = document.mainfrm;
	var uCookie = getCookie("userid");

	var chkCnt = 0;
	
    var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
        chkCnt = jQuery('input:checkbox[name="chrChk"]:checked').length;
    }	
	
	if (e == 0) {
		if(!bPass){
			alert("선택된 강좌가 없습니다. 강좌를 선택해 주세요.");
			return;
		}
	}else{
        jQuery('input:checkbox[name="chrChk"]').each(function() {
            this.checked = false; //checked 처리
        }); 		
	}

	sl = window.open("","review","scrollbars=no,width=680,height=520,status=yes");
	frm.method = "post";
	frm.target = "review";
	frm.action = "choice_goods.asp";
	frm.submit();
	sl.focus();
}
function goTGPackageBuy(){
	document.location.href = "/cash/2008_sul/free_pass_sale.asp";
}
function goBigPackage(iCnt){
	var frm = document.mainfrm;
	var uCookie = getCookie("userid");

	var chkCnt = 0;

	var bPass = false;
	
    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
        chkCnt = jQuery('input:checkbox[name="chrChk"]:checked').length;
    }	

	/**
	if ((5-parseInt(iCnt)) < parseInt(chkCnt)){
		alert(" 수강신청 가능한 강좌 개수가 초과되었습니다. \n\n 총 5개 강좌까지만 신청이 가능합니다.");
		return;
	}


	if(!bPass)
	{
		alert("선택된 강좌가 없습니다. 강좌를 선택해 주세요.");
		return;
	}

	if (confirm(" 선택 강좌를 수강 신청한 후에는 \n 수강을 취소하거나 다른 강좌로 변경할 수 없습니다. \n\n 선택 강좌를 신청하시겠습니까?")) {
		frm.action = '/cart/cart_tg_pre.asp';
		frm.submit();
	}
	**/

	//var winOpt = 'dialogHeight:450px; dialogWidth:650px; leftmargin:30px; marginwidth:30px;dialogTop:'+(screen.height-(screen.availHeight/2)-300)+'px; dialogLeft:'+(screen.width-(screen.availWidth/2)-350)+'px;  center: yes; help: yes; resizable: yes; scroll: yes; status: yes;';
	//sl = window.showModalDialog("choice_goods.asp?","4",winOpt);
	sl = window.open("","review","scrollbars=no,width=680,height=520");
	frm.method = "post";
	frm.target = "review";
	frm.action = "choice_goods.asp";
	frm.submit();
	sl.focus();
}
function goCancel(){
	var o = document.mainfrm;

	for (var i=0; i < o.chrChk.length; i++){
		o.chrChk[i].checked = false;
	}
}
function goPurchaseTG(){
	var uCookie = getCookie("userid");
	if (uCookie == ""){
	    alert("로그인후 신청해 주세요.");
	    popMemberInput("2");
	}else{
		document.location.href = "/Cart/OCT/free_pass_sale.asp";
	}
}
function goPurchaseBig(){
	var uCookie = getCookie("userid");
	if (uCookie == ""){
	    alert("로그인후 신청해 주세요.");
	    popMemberInput("2");
	}else{
		alert("결제 후 이용해 주세요.");
	}
}
function goFinishBig(){
	alert("수강시작 완료되었습니다.");
}
function goOtherBig(){
	// 이미 집중학습 프로그램 Big시리즈를 구입한 회원
	alert("집중학습 프로그램은 Big3 와 Big4 중 한개만 구매하실 수 있습니다.");
}

// Big345 담기
function goBig345(user_id){

	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;

    var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }	

	/**
	if(!bPass)
	{
		alert("신청하실 강좌를 선택하여 주십시요");
		return;
	}
	**/

	/**
	if ((5-parseInt(iCnt)) < parseInt(chkCnt)){
		alert(" 수강신청 가능한 강좌 개수가 초과되었습니다. \n\n 총 5개 강좌까지만 신청이 가능합니다.");
		return;
	}


	if(!bPass)
	{
		alert("선택된 강좌가 없습니다. 강좌를 선택해 주세요.");
		return;
	}

	if (confirm(" 선택 강좌를 수강 신청한 후에는 \n 수강을 취소하거나 다른 강좌로 변경할 수 없습니다. \n\n 선택 강좌를 신청하시겠습니까?")) {
		frm.action = '/cart/cart_tg_pre.asp';
		frm.submit();
	}
	**/

	//var winOpt = 'dialogHeight:450px; dialogWidth:650px; leftmargin:30px; marginwidth:30px;dialogTop:'+(screen.height-(screen.availHeight/2)-300)+'px; dialogLeft:'+(screen.width-(screen.availWidth/2)-350)+'px;  center: yes; help: yes; resizable: yes; scroll: yes; status: yes;';
	//sl = window.showModalDialog("choice_goods.asp?","4",winOpt);

	sl = window.open("","review","scrollbars=yes,width=680,height=580,status=yes");
	frm.method = "post";
	frm.target = "review";
	frm.action = "/lecture/Lec_S/20070808_big345/popup_list.asp";
	frm.submit();
	sl.focus();
	frm.target = "";
}

// Big345 담기
function goNonBig345(user_id){

	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;
	var bPass = false;
	var bSpeedChk = false;


	for (i = 0; i < jQuery('input:checkbox[name="pkgChk"]:checked').length; i++){

	    // Speed 플래그 추가 -----------------------
	    try {
	        if (jQuery('input:checkbox[name=speed_type1]').eq(i).is(':checked') == true) {
	            jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
	            jQuery("input:checkbox[name='speed_type']").eq(i).val(1);
	            jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
	            bPass = true;
	            bSpeedChk = true;	            
	        }

	        if (jQuery('input:checkbox[name=speed_type2]').eq(i).is(':checked') == true) {
	            jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
	            jQuery("input:checkbox[name='speed_type']").eq(i).val(2);
	            jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
	            bPass = true;
	            bSpeedChk = true;	            
	        }

	        if (jQuery('input:checkbox[name=speed_type3]').eq(i).is(':checked') == true) {
	            jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
	            jQuery("input:checkbox[name='speed_type']").eq(i).val(3);
	            jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
	            bPass = true;
	            bSpeedChk = true;	            
	        }

	        if (jQuery('input:checkbox[name=speed_type4]').eq(i).is(':checked') == true) {
	            jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
	            jQuery("input:checkbox[name='speed_type']").eq(i).val(4);
	            jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
	            bPass = true;
	            bSpeedChk = true;
	        }

	        if (!bPass) {
	            try {
	                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
	                jQuery("input:checkbox[name='speed_type']").eq(i).val("");
	                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);

	            } catch (e) {
	                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
	                jQuery("input:checkbox[name='speed_type']").eq(i).val("");
	                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);
	            }
	        }	        
	        
	    } catch (e) { }
		// -----------------------------------------

		if (jQuery('input:checkbox[name=chrChk]').eq(i).is(':checked') == true) {
		    bPass = true;
		}  			

	}

	/**
	if(!bPass)
	{
		alert("신청하실 강좌를 선택하여 주십시요");
		return;
	}
	**/

	/**
	if ((5-parseInt(iCnt)) < parseInt(chkCnt)){
		alert(" 수강신청 가능한 강좌 개수가 초과되었습니다. \n\n 총 5개 강좌까지만 신청이 가능합니다.");
		return;
	}


	if(!bPass)
	{
		alert("선택된 강좌가 없습니다. 강좌를 선택해 주세요.");
		return;
	}

	if (confirm(" 선택 강좌를 수강 신청한 후에는 \n 수강을 취소하거나 다른 강좌로 변경할 수 없습니다. \n\n 선택 강좌를 신청하시겠습니까?")) {
		frm.action = '/cart/cart_tg_pre.asp';
		frm.submit();
	}
	**/

	//var winOpt = 'dialogHeight:450px; dialogWidth:650px; leftmargin:30px; marginwidth:30px;dialogTop:'+(screen.height-(screen.availHeight/2)-300)+'px; dialogLeft:'+(screen.width-(screen.availWidth/2)-350)+'px;  center: yes; help: yes; resizable: yes; scroll: yes; status: yes;';
	//sl = window.showModalDialog("choice_goods.asp?","4",winOpt);

	if (bSpeedChk)
	    alert("Speed강좌는 수강권으로 담을 수 없습니다.\n일반 수강으로 전환됩니다.");

	sl = window.open("","review","scrollbars=yes,width=680,height=580,status=yes");
	frm.method = "post";
	frm.target = "review";
	//frm.action = "/lecture/Lec_D/2008_jungsi/popup_list.asp";
	frm.action = "/lecture/Lec_D/20080318_pass/popup_list.asp";

	frm.submit();
	sl.focus();
	frm.target = "";
}
// 스피드 *********************************************************************************************************************************
function fncChkSpeed(t) {

    var i;
    
    for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {
        if (t == "1") {
            try {
                if (jQuery('input:checkbox[name=speed_type1]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }
            

        } else if (t == "2") {            
            try {
                if (jQuery('input:checkbox[name=speed_type2]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }
            
        } else if (t == "3") {            
            try {
                if (jQuery('input:checkbox[name=speed_type3]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "4") {
            try {
                if (jQuery('input:checkbox[name=speed_type4]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "5") {
            try {
                if (jQuery('input:checkbox[name=speed_type5]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "6") {
            try {
                if (jQuery('input:checkbox[name=speed_type6]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "7") {
            try {
                if (jQuery('input:checkbox[name=speed_type7]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }
            
        } else if (t == "21") {
            try {
                if (jQuery('input:checkbox[name=speed_type21]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "22") {
            try {
                if (jQuery('input:checkbox[name=speed_type22]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "23") {
            try {
                if (jQuery('input:checkbox[name=speed_type23]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }
                
        } else if (t == "24") {
            try {
                if (jQuery('input:checkbox[name=speed_type24]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "25") {
            try {
                if (jQuery('input:checkbox[name=speed_type25]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "91") {
            try {
                if (jQuery('input:checkbox[name=speed_type91]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "92") {
            try {
                if (jQuery('input:checkbox[name=speed_type92]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "93") {
            try {
                if (jQuery('input:checkbox[name=speed_type93]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "94") {
            try {
                if (jQuery('input:checkbox[name=speed_type94]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }
            
        } else if (t == "95") {
            try {
                if (jQuery('input:checkbox[name=speed_type95]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }
            
        } else if (t == "96") {
            try {
                if (jQuery('input:checkbox[name=speed_type96]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "97") {
            try {
                if (jQuery('input:checkbox[name=speed_type97]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type98']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }

        } else if (t == "98") {
            try {
                if (jQuery('input:checkbox[name=speed_type98]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }
                
        } else if (t == "99") {
            try {
                if (jQuery('input:checkbox[name=speed_type99]').eq(i).is(':checked') == true) {
                    jQuery("input:checkbox[name='speed_type1']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type2']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type3']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type4']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type5']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type6']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type7']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type21']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type22']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type23']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type24']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type25']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type91']").eq(i).attr("checked", false);
					jQuery("input:checkbox[name='speed_type92']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type93']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type94']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type95']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type96']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type97']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type99']").eq(i).attr("checked", false);
                }
            } catch (e) { }
                
        }
    }

}

var popupOption = "";

function goWishSpeed(user_id) {
    if (user_id == "") {
        alert("먼저 로그인을 하십시요");
        popMemberInput("2");
        return;
    }

    //학부모 회원인경우 메세지 표시
    var uCookie = getCookie("userid");
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("학부모 회원은 구매가 불가능합니다.");
        return;
    }

    var frm = document.mainfrm;

    if (jQuery('input:checkbox[name="chrChk"]').length == 0) {
        return;
    }        

    var bPass = false;
    
    for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {    
        try {
            // Speed 플래그 추가 -----------------------
            if (jQuery('input:checkbox[name=speed_type1]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(1);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;              
            }

            
            if (jQuery('input:checkbox[name=speed_type2]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(2);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type3]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(3);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }            

            if (jQuery('input:checkbox[name=speed_type4]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(4);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type5]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(5);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type6]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(6);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type7]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(7);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }              

            if (jQuery('input:checkbox[name=speed_type21]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(21);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type22]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(22);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type23]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(23);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type24]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(24);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type91]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(91);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type92]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(92);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type93]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(93);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type94]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(94);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }                            

            if (jQuery('input:checkbox[name=speed_type95]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(95);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type96]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(96);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type97]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(97);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type98]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(98);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type99]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(99);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (!bPass) {
                try {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);                                        
                    
                } catch (e) {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);  
                }
            }
            // -----------------------------------------
        } catch (e) { }

        if (jQuery('input:checkbox[name=chrChk]').eq(i).is(':checked') == true) {
            bPass = true;
        }        
    }


    if (jQuery('input:checkbox[name="unitChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="pkgChk"]:checked').length > 0) {
        bPass = true;
    }	
		

	if (!bPass) {
		alert("찜하실 강좌 또는 교재를 선택하여 주십시요");
		return false;
	}
	else {

		frm.action = '/cart/cart_prop_pre.asp';
		frm.submit();
	}
}

function goCartSpeed(user_id) {
    if (user_id == "") {
        alert("먼저 로그인을 하십시요");
        popMemberInput("2");
        return;
    }

    //학부모 회원인경우 메세지 표시
    var uCookie = getCookie("userid");
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("학부모 회원은 구매가 불가능합니다.");
        return;
    }

    var frm = document.mainfrm;

	

    if (jQuery('input:checkbox[name="chrChk"]').length == 0) {
        return;
    }      
	
	jQuery("input:checkbox[name='chrChk']").attr("checked", false);



    var bPass = false;
    
    for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {


        try {
            // Speed 플래그 추가 -----------------------

            if (jQuery('input:checkbox[name=speed_type1]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(1);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;         
            }

            
            if (jQuery('input:checkbox[name=speed_type2]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(2);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type3]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(3);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }            

            if (jQuery('input:checkbox[name=speed_type4]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(4);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type5]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(5);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type6]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(6);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type7]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(7);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }              

            if (jQuery('input:checkbox[name=speed_type21]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(21);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type22]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(22);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type23]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(23);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type24]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(24);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
			}
			
			if (jQuery('input:checkbox[name=speed_type25]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(25);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type91]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(91);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type92]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(92);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type93]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(93);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }
            
            if (jQuery('input:checkbox[name=speed_type94]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(94);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }                            

            if (jQuery('input:checkbox[name=speed_type95]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(95);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type96]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(96);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type97]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(97);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type98]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(98);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type99]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(99);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (bPass == false) {
                try {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);                                        
                    
                } catch (e) {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);  
                }
            }
            // -----------------------------------------
        } catch (e) { }

        if (jQuery('input:checkbox[name=chrChk]').eq(i).is(':checked') == true) {
            bPass = true;
        }
    }


    if (jQuery('input:checkbox[name="unitChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }	


    if (jQuery('input:checkbox[name="pkgChk"]:checked').length > 0) {
        bPass = true;
    }	

	if (!bPass) {
		alert("신청하실 강좌 또는 교재를 선택하여 주십시요");
		return false;
	}else {
		frm.action = '/cart/cart_main_pre.asp';
		frm.submit();
	}
}

function goCompareSpeed(user_id) {
	var cnt = 0; // 체크수

	if (user_id == "") {
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}

	var frm = document.mainfrm;

	if (jQuery('input:checkbox[name="chrChk"]').length == 0) {
	    return;
	}

	jQuery("input:checkbox[name='chrChk']").attr("checked", false);
	
	var bPass = false;
	
    for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {		
		try {
			// Speed 플래그 추가 -----------------------
            if (jQuery('input:checkbox[name=speed_type1]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(1);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;              
            }

            
            if (jQuery('input:checkbox[name=speed_type2]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(2);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type3]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(3);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }            

            if (jQuery('input:checkbox[name=speed_type4]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(4);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type5]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(5);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type6]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(6);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type7]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(7);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }              

            if (jQuery('input:checkbox[name=speed_type21]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(21);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type22]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(22);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type23]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(23);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type24]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(24);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
			}
			
			if (jQuery('input:checkbox[name=speed_type25]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(25);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type91]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(91);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type92]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(92);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type93]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(93);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }
            
            if (jQuery('input:checkbox[name=speed_type94]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(94);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }                            

            if (jQuery('input:checkbox[name=speed_type95]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(95);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type96]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(96);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type97]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(97);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type98]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(98);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }             

            if (jQuery('input:checkbox[name=speed_type99]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(99);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (bPass == false) {
                try {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);                                        
                    
                } catch (e) {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);  
                }
            }			    

			// -----------------------------------------
		} catch (e) { }

		if (jQuery('input:checkbox[name=chrChk]').eq(i).is(':checked') == true) {
			bPass = true;
			cnt += 1;
		}
	}

	
	if (!bPass) {
		alert("강좌 비교하기는 최소 1개 ~ 최대 3개까지 가능합니다\n비교 할 강좌를 선택해주세요.");
		return;
	}

	if (cnt > 3) {
		alert("강좌 비교하기는 최소 1개 ~ 최대 3개까지 가능합니다.");
		return;
	}

	window.open('', 'comparePop', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=725,height=710');
    frm.action = '/Lecmain/popup/lecture_compare.asp';
	frm.target = 'comparePop';
	frm.submit();
	frm.target = '_self'
}

function goDirectPaySpeed(user_id) {
    if (user_id == "") {
        alert("먼저 로그인을 하십시요");
        popMemberInput("2");
        return;
    }

    //학부모 회원인경우 메세지 표시
    var uCookie = getCookie("userid");
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("학부모 회원은 구매가 불가능합니다.");
        return;
    }

    var frm = document.mainfrm;
    if (jQuery('input:checkbox[name="chrChk"]').length == 0) {
        return;
    }


	jQuery("input:checkbox[name='chrChk']").attr("checked", false);

    var bPass = false;

    for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {        
        try {
            if (jQuery('input:checkbox[name=speed_type1]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(1);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }


            if (jQuery('input:checkbox[name=speed_type2]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(2);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type3]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(3);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type4]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(4);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type5]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(5);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type6]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(6);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type7]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(7);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type21]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(21);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type22]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(22);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type23]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(23);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type24]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(24);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
			}
			
			if (jQuery('input:checkbox[name=speed_type25]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(25);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type91]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(91);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type92]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(92);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }
			
            if (jQuery('input:checkbox[name=speed_type93]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(93);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }
            
            if (jQuery('input:checkbox[name=speed_type94]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(94);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type95]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(95);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type96]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(96);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type97]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(97);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type98]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(98);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type99]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(99);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (bPass == false) {
                try {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);

                } catch (e) {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);
                }
            }
            // -----------------------------------------
        } catch (e) { }

        if (jQuery('input:checkbox[name=chrChk]').eq(i).is(':checked') == true) {
            bPass = true;
        }        
    }


    if (jQuery('input:checkbox[name="unitChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }


    if (jQuery('input:checkbox[name="pkgChk"]:checked').length > 0) {
        bPass = true;
    }		


	if (!bPass) {
		alert("결제하실 강좌 또는 교재를 선택하여 주십시요");
		return false;
	}
	else {
		frm.action = '/cart/cart_direct_pay_pre.asp';
		frm.submit();
	}
}
// *******************************************************************************************************************************************


// 2008 Big 시리즈 ***************************************************************************************************************************
function goBig2008(user_id){
	goBigPop(user_id,"/lecture/lec_s/20080708_big/popup_list.asp");
}
function goBig2008S2(user_id){
	goBigPop(user_id,"/lecture/lec_s/20080814_fb/popup_list.asp");
}
function goBigDCMatch(user_id){
	goBigPop(user_id,"/lecture/lec_s/20080825_chu/chu_goods.asp");
}
function goBigPop(user_id,mv_url){

	if(user_id == ""){
	    alert("먼저 로그인을 하십시요");
	    popMemberInput("2");
		return;
	}
	//학부모 회원인경우 메세지 표시
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("학부모 회원은 구매가 불가능합니다.");
		return;
	}

	var frm = document.mainfrm;

	try{
		var bPass = false;
		var bSpeedChk = false;

		for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) { 
		    // Speed 플래그 추가 -----------------------			
		    if (jQuery('input:checkbox[name=speed_type1]').eq(i).is(':checked') == true) {
		        jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
		        jQuery("input:checkbox[name='speed_type']").eq(i).val(1);
		        jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
		        bPass = true;
		    }

		    if (jQuery('input:checkbox[name=speed_type2]').eq(i).is(':checked') == true) {
		        jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
		        jQuery("input:checkbox[name='speed_type']").eq(i).val(2);
		        jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
		        bPass = true;
		        bSpeedChk = true;
		    }

		    if (jQuery('input:checkbox[name=speed_type3]').eq(i).is(':checked') == true) {
		        jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
		        jQuery("input:checkbox[name='speed_type']").eq(i).val(3);
		        jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
		        bPass = true;
		        bSpeedChk = true;
		    }

		    if (jQuery('input:checkbox[name=speed_type4]').eq(i).is(':checked') == true) {
		        jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
		        jQuery("input:checkbox[name='speed_type']").eq(i).val(4);
		        jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
		        bPass = true;
		        bSpeedChk = true;
		    }  

            if (!bPass) {
                try {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);

                } catch (e) {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);
                }
            }
			// -----------------------------------------
            if (jQuery('input:checkbox[name=chrChk]').eq(i).is(':checked') == true) {
                bPass = true;
            }  
		}


		if (bSpeedChk)
			alert("Speed강좌는 수강권으로 담을 수 없습니다.\n일반 수강으로 전환됩니다.");

		sl = window.open("","review","scrollbars=yes,width=680,height=580,status=yes");
		frm.method = "post";
		frm.target = "review";
		//frm.action = "/lecture/Lec_D/2008_jungsi/popup_list.asp";
		//frm.action = "/lecture/lec_s/20080708_big/popup_list.asp";
		frm.action = mv_url;

		frm.submit();
		sl.focus();
		frm.target = "";

	}catch(e){
		//sl = window.open("/lecture/lec_s/20080708_big/popup_list.asp","review","scrollbars=yes,width=680,height=580,status=yes");
		sl = window.open(mv_url,"review","scrollbars=yes,width=680,height=580,status=yes");
		sl.focus();
	}
}
function goBig2008Non(user_id){
	sl = window.open("/lecture/lec_s/20080708_big/popup_list.asp","review","scrollbars=yes,width=680,height=580,status=yes");
	sl.focus();
}
function goBig2008NonS2(user_id){
	sl = window.open("/lecture/lec_s/20080814_fb/popup_list.asp","review","scrollbars=yes,width=680,height=580,status=yes");
	sl.focus();
}
function goBigDCMatchNon(user_id){
	sl = window.open("/lecture/lec_s/20090915_chu/chu_goods.asp","review","scrollbars=yes,width=680,height=580,status=yes");
	sl.focus();
}
// *******************************************************************************************************************************************


//********************강좌목록 메뉴 시작**************************************************************

	function fncGetContextMenu(){
		var strHtml = "";
		strHtml += '<div class="table_layer_01" style="display:none;position:absolute;text-align: left;z-index:199;background:#FFFFFF;" id="LectureContextMenu">';
		strHtml += '	<ul>';
		//strHtml += '		<li><a href="javascript:fncAddWishList();">찜</a></li>';
		strHtml += '		<li><a href="javascript:fncAddCartList();">장바구니</a></li>';
		strHtml += '		<li><a href="javascript:fncAddPayList();"><strong>바로결제</strong></a></li>';
		strHtml += '	</ul>';

		strHtml += '</div>';

		return strHtml;
	}

	var gChkType;//선택 타입 강좌(일반)-speed_type1 ,speed 30% - speed_type2,speed 10%-speed_type3, 교재 - bookChk
	var gChrCd;
	var ContextMenuLeft = 0;
	var ContextMenuTop = 0;
	function fncViewContextMenu(pTarget,pCode){

		fncGetUserId();
		fncConfirmCencel();

		var targetPosition = jQuery(pTarget).offset();

		var Obj = jQuery("#LectureContextMenu");


		if (Obj.length == 0) {
			jQuery("body").eq(0).append(fncGetContextMenu());
			fncViewContextMenu(pTarget,pCode);
			return;
		}

		gChkType= pTarget.name;
		gChrCd = pCode;

		if(gChkType =="bookChk") gChrCd = pTarget.value;

		if (jQuery(pTarget).is(':checked')) {
		    if (ContextMenuLeft != 0 && ContextMenuTop != 0) {
				Obj.css({"left":targetPosition.left-jQuery(".list_b").offset().left+ContextMenuLeft,"top":targetPosition.top  + ContextMenuTop});
            } else {
                if (GPlayer == "Y") {
                    Obj.css({ "left": targetPosition.left, "top": targetPosition.top - 170 });
                }else{
                    Obj.css({ "left": targetPosition.left + 22, "top": targetPosition.top + 18 });
                }

			}
			Obj.show("fast");
		}else{
			Obj.hide("fast");
		}
	}

	//경고 Layer 작업
	function fncViewAlert(pTarget,pKbn) {

	    if (pKbn == 3) {
	        window.open('/etc/popup/popup_20111220.asp', 'NoticePop', 'width=725, height=580, scrollbars=yes');
	    } else {
	        var strHtml = "";
	        strHtml += '<div class="notice_layer" style="display:block;position:absolute;" id="LectureAlertLayer"></div>';

	        var Obj = jQuery("#LectureAlertLayer");

	        if (Obj.length == 0) {
	            if (pKbn == 96 || pKbn == 97){
	                strHtml = '<div class="docje_notice_layer" style="display:block;position:absolute;" id="LectureAlertLayer"></div>';
	                jQuery("body").eq(0).append(strHtml);
				} else {
					jQuery("#list_b").append(strHtml);
	            }
	            fncViewAlert(pTarget, pKbn);
				return;
	        }

	        var strContent = "";

	        if (pKbn == 1) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<h3>※ [1+1 패키지] 수강 신청 전 확인하세요!</h3>';
	            strContent += '	<ul>';
	            strContent += '		<li>- 사과탐 1+1 패키지 내 강좌는 시작일과 종료일이 동일, 수강기간을 연장불가.</li>';
	            strContent += '		<li>- 매 승인 일부터 바로 시작일이 설정</li>';
	            strContent += '		<li>- 무통장, 인터넷 계좌이체, 신용카드, 핸드폰, 메가캐쉬로 결제 가능하며 보너스캐쉬, 이벤트캐쉬,<br>&nbsp;&nbsp;&nbsp;할인권 등으로 구매할 수 없습니다.</li>';
	            strContent += '		<li>- 환불은 승인일로부터 10일 이내에 제기해야 하며, 환불 시 반드시 교재를 반송해야 함.</li>';
	            strContent += '		<li>- 더 자세한 내용은 1+1 패키지 페이지에서 확인하시기 바랍니다.</li>';
	            strContent += '	</ul>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="닫기" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        if (pKbn == 2) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<h3>※ [사탐 파이널 1+1+1 패키지] 수강 신청 전 확인하세요!</h3>';
	            strContent += '	<ul>';
	            strContent += '		<li>- 사탐 파이널 1+1+1 패키지 내 강좌는 시작일과 종료일이 동일, 수강기간을 연장불가.</li>';
	            strContent += '		<li>- 매 승인 일부터 바로 시작일이 설정</li>';
	            strContent += '		<li>- 무통장, 인터넷 계좌이체, 신용카드, 핸드폰, 메가캐쉬로 결제 가능하며 보너스캐쉬, 이벤트캐쉬,<br>&nbsp;&nbsp;&nbsp;할인권 등으로 구매할 수 없습니다.</li>';
	            strContent += '		<li>- 환불은 승인일로부터 10일 이내에 제기해야 하며, 환불 시 반드시 교재를 반송해야 함.</li>';
	            strContent += '		<li>- 더 자세한 내용은 사탐 파이널 1+1+1 패키지 페이지에서 확인하시기 바랍니다.</li>';
	            strContent += '	</ul>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="닫기" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        if (pKbn == 4) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<h3>※ [언어 개념 패키지] 수강 신청 전 확인하세요!</h3>';
	            strContent += '	<ul>';
	            strContent += '		<li>- 언어 개념 패키지 내 강좌는 시작일과 종료일이 동일하여 수강기간 연장이 불가합니다.</li>';
	            strContent += '		<li>- 구매 승인일부터 바로 수강 시작일이 설정됩니다.</li>';
	            strContent += '		<li>- 무통장, 인터넷 계좌이체, 신용카드, 핸드폰, 메가캐쉬로 결제 가능하며 보너스캐쉬, 이벤트캐쉬,<br>&nbsp;&nbsp;&nbsp;할인권 등으로 구매할 수 없습니다.</li>';
	            strContent += '		<li>- 환불은 승인일로부터 10일 이내에 제기해야 하며, 환불시 반드시 교재를 반송해야 합니다.</li>';
	            strContent += '		<li>- 더 자세한 내용은 언어 개념 패키지 페이지에서 확인하시기 바랍니다.</li>';
	            strContent += '	</ul>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="닫기" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        if (pKbn == 5) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<h3>※ [1+1 파이널 패키지] 수강 신청 전 확인하세요!</h3>';
	            strContent += '	<ul>';
	            strContent += '		<li>- 사과탐 1+1 파이널 패키지 내 강좌는 시작일과 종료일이 동일, 수강기간을 연장불가.</li>';
	            strContent += '		<li>- 매 승인 일부터 바로 시작일이 설정</li>';
	            strContent += '		<li>- 무통장, 인터넷 계좌이체, 신용카드, 핸드폰, 메가캐쉬로 결제 가능하며 보너스캐쉬, 이벤트캐쉬,<br>&nbsp;&nbsp;&nbsp;할인권 등으로 구매할 수 없습니다.</li>';
	            strContent += '		<li>- 환불은 승인일로부터 10일 이내에 제기해야 하며, 환불 시 반드시 교재를 반송해야 함.</li>';
	            strContent += '		<li>- 더 자세한 내용은 1+1 파이널 패키지 페이지에서 확인하시기 바랍니다.</li>';
	            strContent += '	</ul>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="닫기" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        if (pKbn == 6) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<h3>※ [언어 Final 패키지] 수강 신청 전 확인하세요!</h3>';
	            strContent += '	<ul>';
	            strContent += '		<li>- 언어 Final 패키지 내 강좌는 시작일과 종료일이 동일하여 수강기간 연장, 일시정지 이용이 불가합니다.</li>';
	            strContent += '		<li>- 구매 승인일부터 바로 수강 시작일이 설정됩니다.</li>';
	            strContent += '		<li>- 무통장, 인터넷 계좌이체, 신용카드, 핸드폰, 메가캐쉬로 결제 가능하며 보너스캐쉬, 이벤트캐쉬,<br>&nbsp;&nbsp;&nbsp;할인권 등으로 구매할 수 없습니다.</li>';
	            strContent += '		<li>- 환불은 승인일로부터 10일 이내에 제기해야 하며, 환불시 반드시 교재를 반송해야 합니다.</li>';
	            strContent += '		<li>- 더 자세한 내용은 언어 Final 패키지 페이지에서 확인하시기 바랍니다.</li>';
	            strContent += '	</ul>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="닫기" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        if (pKbn == 7) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<h3>※ [외국어 파이널 패키지] 수강 신청 전 확인하세요!</h3>';
	            strContent += '	<ul>';
	            strContent += '		<li>- 외국어 파이널 패키지 내 강좌는 시작일과 종료일이 동일하여 수강기간 연장, 일시정지 이용이<br>&nbsp;&nbsp;&nbsp;불가합니다.</li>';
	            strContent += '		<li>- 구매 승인일부터 바로 수강 시작일이 설정됩니다.</li>';
	            strContent += '		<li>- 무통장, 인터넷 계좌이체, 신용카드, 핸드폰, 메가캐쉬로 결제 가능하며 보너스캐쉬, 이벤트캐쉬,<br>&nbsp;&nbsp;&nbsp;할인권 등으로 구매할 수 없습니다.</li>';
	            strContent += '		<li>- 환불은 승인일로부터 10일 이내에 제기해야 하며, 환불시 반드시 교재를 반송해야 합니다.</li>';
	            strContent += '		<li>- 더 자세한 내용은 외국어 파이널 패키지 페이지에서 확인하시기 바랍니다.</li>';
	            strContent += '	</ul>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="닫기" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

			if (pKbn == 96) {
	            strContent += '<div class="notice_layer_inner">';
				strContent += '	<div>';
	            strContent += '	<ul>';
	            strContent += '		<li>&nbsp;</li>';
	            strContent += '	</ul>';
				strContent += '	<ul>';
				strContent += '		<li>반수생만 수강할 수 있는 반수전용 상품으로<br><font color=red>1999년 3월 이전 출생 회원만 수강 가능 합니다.</font></li>';
	            strContent += '	</ul>';
	            strContent += '	<ul>';
	            strContent += '		<li>&nbsp;</li>';
	            strContent += '	</ul>';
				strContent += '	<ul>';
				strContent += '		<li><a href="/lecmain/mains/2017/0614_half/main.asp"><u>반수 SPPED 자세히 보기 ></u></a><br><br></li>';
	            strContent += '	</ul>';
	            strContent += '	</div>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="닫기" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        if (pKbn == 97) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<div>';
	            strContent += '	<ul>';
	            strContent += '		<li>- 오전 9시~오후 5시까지만 수강할 수 있는 독학재수생 전용 상품으로<br>&nbsp;&nbsp;&nbsp;1997년 2월 이전 출생 회원만 구입 가능합니다.</li>';
	            strContent += '	</ul>';
	            strContent += '	<ul>';
	            strContent += '		<li>- <font color=red>독학재수 0917 단과 강좌는 오감충전 페스티벌 혜택(교재 지원)이 제공되지 않습니다.</font></li>';
	            strContent += '	</ul>';
	            strContent += '	<ul>';
	            strContent += '		<li>- <a href="/lecmain/mains/2015/0226_time/main.asp"><u>독학재수 골든타임 0917 자세히보기 ></u></a><br><br></li>';
	            strContent += '	</ul>';
	            strContent += '	</div>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="닫기" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        Obj.html(strContent);

	        var targetPosition = jQuery(pTarget).offset();

	        //위치조절
			if (pKbn == 97) {
	            Obj.css({ "left": targetPosition.left -380, "top": targetPosition.top + 18 });
	            Obj.show("fast");
			} else if(pKbn == 96){
	            Obj.css({ "left": targetPosition.left -220, "top": targetPosition.top + 18 });
	            Obj.show("fast");
			} else {
	            Obj.css({ "left": targetPosition.left - jQuery("#list_b").offset().left + 165, "top": targetPosition.top + 20, "z-index": 500 });
	            Obj.show("middle");
			}
		}
	}

	function fncAlertCencel() {
		var Obj = jQuery("#LectureAlertLayer");
		Obj.hide("fast");
	}

	//찜하기 장바구니 파라미터 생성
	function fncSetStrParam(){
		var strParam;
		//chrChk=21565,21567&bookChk=&cartbookdelarr=&pkgChk=&speed_type=1,1

		var ObjChrChk = jQuery('input:checkbox[name="chrChk"]');
		var ObjSpeedType1 = jQuery('input:checkbox[name="speed_type1"]');
		var ObjSpeedType2 = jQuery('input:checkbox[name="speed_type2"]');
		var ObjSpeedType3 = jQuery('input:checkbox[name="speed_type3"]');
		var ObjSpeedType4 = jQuery('input:checkbox[name="speed_type4"]');
		var ObjSpeedType5 = jQuery('input:checkbox[name="speed_type5"]');
		var ObjSpeedType6 = jQuery('input:checkbox[name="speed_type6"]');
		var ObjSpeedType7 = jQuery('input:checkbox[name="speed_type7"]');

		var ObjSpeedType21 = jQuery('input:checkbox[name="speed_type21"]');
		var ObjSpeedType22 = jQuery('input:checkbox[name="speed_type22"]');
		var ObjSpeedType23 = jQuery('input:checkbox[name="speed_type23"]');
		var ObjSpeedType24 = jQuery('input:checkbox[name="speed_type24"]');

		var ObjSpeedType91 = jQuery('input:checkbox[name="speed_type91"]');
		var ObjSpeedType92 = jQuery('input:checkbox[name="speed_type92"]');
		var ObjSpeedType93 = jQuery('input:checkbox[name="speed_type93"]');
		var ObjSpeedType94 = jQuery('input:checkbox[name="speed_type94"]');
		var ObjSpeedType95 = jQuery('input:checkbox[name="speed_type95"]');
		var ObjSpeedType96 = jQuery('input:checkbox[name="speed_type96"]');
		var ObjSpeedType97 = jQuery('input:checkbox[name="speed_type97"]');
		var ObjSpeedType98 = jQuery('input:checkbox[name="speed_type98"]');
		var ObjSpeedType99 = jQuery('input:checkbox[name="speed_type99"]');

		var ObjBookChk = jQuery('input:checkbox[name="bookChk"]');

		for (var i = 0; i < ObjChrChk.length; i++) {
			//speed_type1
			if(ObjSpeedType1[i].checked){
				strParam += "&chrChk="+ObjChrChk.eq(i).val();
				strParam += "&speed_type1="+ObjSpeedType1.eq(i).val()+"&speed_type="+ObjSpeedType1.eq(i).val();
			}

			//speed_type2
			if (ObjSpeedType2[i].checked) {
				strParam += "&chrChk="+ObjChrChk.eq(i).val();
				strParam += "&speed_type2="+ObjSpeedType2.eq(i).val()+"&speed_type="+ObjSpeedType2.eq(i).val();
			}

			//speed_type3
			if(ObjSpeedType3[i].checked){
				strParam += "&chrChk="+ObjChrChk.eq(i).val();
				strParam += "&speed_type3="+ObjSpeedType3.eq(i).val()+"&speed_type="+ObjSpeedType3.eq(i).val();
			}

    		//speed_type4
    		if (ObjSpeedType4[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type4=" + ObjSpeedType4.eq(i).val() + "&speed_type=" + ObjSpeedType4.eq(i).val();
    		}

			//speed_type5
    		if (ObjSpeedType5[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type5=" + ObjSpeedType5.eq(i).val() + "&speed_type=" + ObjSpeedType5.eq(i).val();
    		}

    		//speed_type6
    		if (ObjSpeedType6[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type6=" + ObjSpeedType6.eq(i).val() + "&speed_type=" + ObjSpeedType6.eq(i).val();
    		}

    		//speed_type7
    		if (ObjSpeedType7[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type7=" + ObjSpeedType7.eq(i).val() + "&speed_type=" + ObjSpeedType7.eq(i).val();
    		}

    		//speed_type21
    		if (ObjSpeedType21[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type21=" + ObjSpeedType21.eq(i).val() + "&speed_type=" + ObjSpeedType21.eq(i).val();
    		}

    		//speed_type22
    		if (ObjSpeedType22[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type22=" + ObjSpeedType22.eq(i).val() + "&speed_type=" + ObjSpeedType22.eq(i).val();
    		}

    		//speed_type23
    		if (ObjSpeedType23[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type23=" + ObjSpeedType23.eq(i).val() + "&speed_type=" + ObjSpeedType23.eq(i).val();
    		}

    		//speed_type24
    		if (ObjSpeedType24[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type24=" + ObjSpeedType24.eq(i).val() + "&speed_type=" + ObjSpeedType24.eq(i).val();
			}
			
			//speed_type25
    		if (ObjSpeedType24[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type24=" + ObjSpeedType25.eq(i).val() + "&speed_type=" + ObjSpeedType25.eq(i).val();
            }

            //speed_type91
            if (ObjSpeedType91[i].checked) {
              strParam += "&chrChk=" + ObjChrChk.eq(i).val();
              strParam += "&speed_type91=" + ObjSpeedType91.eq(i).val() + "&speed_type=" + ObjSpeedType91.eq(i).val();
            }

            //speed_type92
            if (ObjSpeedType92[i].checked) {
              strParam += "&chrChk=" + ObjChrChk.eq(i).val();
              strParam += "&speed_type92=" + ObjSpeedType92.eq(i).val() + "&speed_type=" + ObjSpeedType92.eq(i).val();
            }

            //speed_type93
            if (ObjSpeedType93[i].checked) {
              strParam += "&chrChk=" + ObjChrChk.eq(i).val();
              strParam += "&speed_type93=" + ObjSpeedType93.eq(i).val() + "&speed_type=" + ObjSpeedType93.eq(i).val();
            }    

            //speed_type94
            if (ObjSpeedType94[i].checked) {
              strParam += "&chrChk=" + ObjChrChk.eq(i).val();
              strParam += "&speed_type94=" + ObjSpeedType94.eq(i).val() + "&speed_type=" + ObjSpeedType94.eq(i).val();
            }    		

		    //speed_type95
    		if (ObjSpeedType95[i].checked) {
    		    strParam += "&chrChk=" + ObjChrChk.eq(i).val();
    		    strParam += "&speed_type95=" + ObjSpeedType95.eq(i).val() + "&speed_type=" + ObjSpeedType95.eq(i).val();
    		}

    		//speed_type96
    		if (ObjSpeedType96[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type96=" + ObjSpeedType96.eq(i).val() + "&speed_type=" + ObjSpeedType96.eq(i).val();
    		}

    		//speed_type97
    		if (ObjSpeedType97[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type97=" + ObjSpeedType97.eq(i).val() + "&speed_type=" + ObjSpeedType97.eq(i).val();
    		}

    		//speed_type98
    		if (ObjSpeedType98[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type98=" + ObjSpeedType98.eq(i).val() + "&speed_type=" + ObjSpeedType98.eq(i).val();
    		}

    		//speed_type99
    		if (ObjSpeedType99[i].checked) {
        		strParam += "&chrChk=" + ObjChrChk.eq(i).val();
        		strParam += "&speed_type99=" + ObjSpeedType99.eq(i).val() + "&speed_type=" + ObjSpeedType99.eq(i).val();
    		}

		}

		for(var i=0;i<ObjBookChk.length;i++){
			//bookChk
			if(ObjBookChk[i].checked){
				strParam += "&bookChk="+ObjBookChk.eq(i).val();
			}
		}


		return strParam;
	}

	var  gUid = "";

	function fncGetUserId(){

		//로그인 및 수강권 & 메가pass 여부 확인..
		var requestUrl = "/lecmain/common/chr/lec_pass_chk_ax.asp?jsoncallback=?";

		jQuery.getJSON(requestUrl,function(data){

			jQuery.each(data,function(index,entry){
				gUid = entry["userid"];
			});
		});
	}

	//찜하기
	function fncAddWishList(){

		if(gUid ==""){
		    alert("로그인 후 이용 가능합니다");
		    popMemberInput("2");
			return;
		}

		jQuery.post("/cart/cart_prop_pre.asp"
			,"cartbookdelarr="+fncSetStrParam()
			,function(){
				fncSetConfirmLayer("1");
			}
		);
	}

	//장바구니
	function fncAddCartList(){
		if(gUid ==""){
		    alert("로그인 후 이용 가능합니다");
		    fncShowLogin();
			return;
		}

		jQuery.post("/cart/cart_main_pre.asp"
			,"redirect_flg=N&cartbookdelarr="+fncSetStrParam()
			,function(){
				fncSetConfirmLayer("2");
			}
		);
	}

	//바로 결제
	function fncAddPayList(){
		if(gUid ==""){
		    alert("로그인 후 이용 가능합니다");
		    fncShowLogin();
			return;
		}
		goDirectPaySpeed();
	}

	//confirm Layer 작업
	var ConfirmLayerLeft = 0;
	var ConfirmLayerTop = 0;

	function fncSetConfirmLayer(pKbn){


		//찜하기
		var strTitle = "해당 강좌를 <strong>찜</strong> 하셨습니다.";
		var strConfirmMsg = "지금 '나의 찜목록'으로 이동하시겠습니까?";
		var locationUrl = "/Mypage/cart_new/cart_wish_list.asp?mOne=pico3&mTwo=32";

		//장바구니
		if(pKbn == "2"){
			strTitle = "해당 강좌가 <strong>장바구니</strong>에 담겼습니다.";
			strConfirmMsg = "지금 '나의 장바구니'로 이동하시겠습니까?";
			locationUrl = "/Mypage/cart_new/cart_list.asp?mOne=pico3&mTwo=31";
		}

		var strHtml = "";
		strHtml += ' <div class="table_layer_04" style="display:block;position:absolute;z-index:200;" id="LectureConfirmLayer"> ';
		strHtml += ' </div> ';

		var strContent = "";
		strContent += ' 	<h3>'+strTitle+'</h3> ';
		strContent += ' 	<div class="contents">  ';
		strContent += ' 		<p>'+strConfirmMsg+'</p> ';
		strContent += ' 		<div class="btn"> ';
		strContent += ' 			<a href="'+locationUrl+'"><img src="http://img.megastudy.net/common/board_2011/btn/b_yes.gif" alt="예" /></a> ';
		strContent += ' 			<a href="javascript:fncConfirmCencel();"><img src="http://img.megastudy.net/common/board_2011/btn/b_no.gif" alt="아니오" /></a> ';
		strContent += ' 		</div> ';
		strContent += ' 	</div> ';

		var Obj = jQuery("#LectureConfirmLayer");
		if(Obj.length == 0) {
		//	jQuery("#list_b").append(strHtml);
			jQuery("body").eq(0).append(strHtml);
			fncSetConfirmLayer(pKbn);
			return;
		}
		//위치조절
		var targetPosition = jQuery("#LectureContextMenu").offset();
		Obj.html(strContent);
		//Obj.css({"left":targetPosition.left-255,"top":targetPosition.top});

		if(ConfirmLayerLeft != 0 && ConfirmLayerTop != 0){
			Obj.css({"left":targetPosition.left+ConfirmLayerLeft,"top":targetPosition.top + ConfirmLayerTop});
		}else{
			Obj.css({"left": targetPosition.left-420, "top": targetPosition.top });
		}


		jQuery("#LectureContextMenu").hide();
		Obj.show("middle");

	}

	function fncConfirmCencel(){
		var Obj = jQuery("#LectureConfirmLayer");
		Obj.hide("middle");
	}

	// 맛보기 레이어 작업
	function fncChrFreeMovContent(pTarget, pChrCd) {
	    try { jQuery("#divFreeMoveArea").remove(); } catch (e) { }

	    var LayerTop = jQuery(pTarget).offset().top + 20;
	    var bodyWidth = parseInt(jQuery("body").css("width").replace("px", ""));
	    if (bodyWidth > 1000){
	        var layerLeft = ((bodyWidth - 673) / 2) + ((jQuery(pTarget).offset().left) / 10);
	    } else {
	        var layerLeft = ((bodyWidth - 673) / 2) + 30;
	    }

	    var requestUrl = "/lecmain/common/chr/divChrFreeMovList_Ax.Asp?chr_cd=" + pChrCd;

	    jQuery.post(requestUrl, function (data) {
	        if (data != "") {
	            var tmpHtml = "";
	            tmpHtml = "<div id='divFreeMoveArea' style='text-align: left; position: absolute; z-index: 1000; left:" + layerLeft + "px; top:" + LayerTop + "px;'>" + data + "</div>";
	            jQuery("body").append(tmpHtml);
	        }
	    });
	}

	function fncChrFreeMovPart(pTarget, pChrCd) {
	    try { jQuery("#divFreeMoveArea").remove(); } catch (e) { }

	    var LayerTop = jQuery(pTarget).offset().top + 20;
	    var layerLeft = ((parseInt(jQuery("body").css("width")) - 673) / 2) + 40;

	    var requestUrl = "/lecmain/common/chr/divChrPartMovList_Ax.Asp?chr_cd=" + pChrCd;

	    jQuery.post(requestUrl, function (data) {
	        if (data != "") {
	            var tmpHtml = "";
	            tmpHtml = "<div id='divFreeMoveArea' style='text-align: left; position: absolute; z-index: 1000; left:" + layerLeft + "px; top:" + LayerTop + "px;'>" + data + "</div>";
	            jQuery("body").append(tmpHtml);
	        }
	    });
	}

	// 맛보기 레이어 닫기
	function fncChrFreeMovContentClose() {
	    try { jQuery("#divFreeMoveArea").remove(); } catch (e) { }
	}



	//SUPER특강이란 레이어 생성 2015-06-09
	function fncGetSuperLayer(dcd){
	    var strHtml = "";
	    
	    strHtml += '<div class="table_layer_03" style="display:block;z-index:1000;text-align:left;"  id="LectureSuperLayer"> ';
        if(dcd == "1"){
	        strHtml += '	<h3>국어 SUPER특강이란?</h3> ';
	        strHtml += '	<div class="contents"  id="LectureSuperContents">수능 1등급 달성을 위해 필요한 <span style="color:#0000ff;">“다양한 주제, 여러 학습 단계별” 강좌를 단 하나로 특별 구성한 강좌</span><br/> SUPER특강 하나만 수강하면 1등급 완성에 필요한 완벽 학습 가능!</div> ';
        } else if (dcd == "3"){
	        strHtml += '	<h3>사회 SUPER특강이란?</h3> ';
	        strHtml += '	<div class="contents"  id="LectureSuperContents">수능 1등급 달성을 위해 필요한 <span style="color:#0000ff;">“개념+문제풀이+파이널”강좌를 단 하나로 특별 구성한 강좌</span><br/> SUPER특강 하나만 수강하면 1등급 완성에 필요한 완벽 학습 가능!</div> ';
        } else if (dcd == "4") {
            strHtml += '	<h3>과학 SUPER특강이란?</h3> ';
            strHtml += '	<div class="contents"  id="LectureSuperContents">수능 1등급 달성을 위해 필요한 <span style="color:#0000ff;">“개념+문제풀이+파이널”강좌를 단 하나로 특별 구성한 강좌</span><br/> SUPER특강 하나만 수강하면 1등급 완성에 필요한 완벽 학습 가능!</div> ';
        } else if (dcd == "6"){
	        strHtml += '	<h3>제2외국어 SUPER특강이란?</h3> ';
	        strHtml += '	<div class="contents"  id="LectureSuperContents">수능 1등급 달성을 위해 필요한 <span style="color:#0000ff;">“개념+문제풀이+파이널”강좌를 단 하나로 특별 구성한 강좌</span><br/> SUPER특강 하나만 수강하면 1등급 완성에 필요한 완벽 학습 가능!</div> ';
        } else if (dcd == "8") {
            strHtml += '	<h3>논술 SUPER특강이란?</h3> ';
            strHtml += '	<div class="contents"  id="LectureSuperContents">2017 논술 합격을 위해 필요한 <span style="color:#0000ff;">“개념+심화+파이널” 강좌를 단 하나로 특별 구성한 강좌</span><br/> SUPER특강 하나만 수강하면 논술 합격에 필요한 완벽 학습 가능!</div> ';
        } else if (dcd == "9") {
	        strHtml += '	<h3>한국사 SUPER특강이란?</h3> ';
	        strHtml += '	<div class="contents"  id="LectureSuperContents">수능 1등급 달성을 위해 필요한 <span style="color:#0000ff;">“개념+문제풀이+파이널”강좌를 단 하나로 특별 구성한 강좌</span><br/> SUPER특강 하나만 수강하면 1등급 완성에 필요한 완벽 학습 가능!</div> ';
        }

		strHtml += '	<span class="close_btn"><img src="http://img.megastudy.net/common/board_2011/btn/b_layer_close.gif" alt="닫기" onclick="fncLecSuperContentClose();"/></span>  ';
		strHtml += '	</div>';
		return strHtml;
	}

	//강좌 특징 레이어 생성
	function fncGetLecDescLayer(){

	    var strHtml = "";

	    strHtml += '<div class="table_layer_03" style="display:block;z-index:1000;text-align:left;"  id="LectureDescLayer"> ';
		strHtml += '	<h3>내용 및 특징</h3> ';
		strHtml += '	<div class="contents"  id="LectureDescContents"></div> ';
		strHtml += '	<span class="close_btn"><img src="http://img.megastudy.net/common/board_2011/btn/b_layer_close.gif" alt="닫기" onclick="fncLecDescContentClose();"/></span>  ';
		strHtml += '	</div>';
		return strHtml;
	}

	//SUPER특강이란 레이어 작업 2015-06-09
	function fncSuperContent(pTarget, pChrCd, dcd) {

	    var LayerTop = jQuery(pTarget).offset().top;

	    try{
	        var listLeft = parseInt(jQuery("#left_menu").css("width").replace("px", ""));
	    } catch (e) {
	        var listLeft = 220;
	    }

	    try{
	        var bodyWidth = jQuery("body").css("width").replace("px", "");
	        var pTargetWidth = jQuery(pTarget).offset().left;

	        if ((bodyWidth / 2) < (pTargetWidth - 100)) {
	            pTargetWidth = pTargetWidth - (bodyWidth / 2) + 400;
	        }
	    } catch (e) {
	        pTargetWidth = jQuery(pTarget).offset().left;
	    }



	    var layerLeft = pTargetWidth + listLeft - 128;

	    
	    var Obj = jQuery("#LectureSuperLayer");

	    if (Obj.length == 0) {
	        jQuery("body").append(fncGetSuperLayer(dcd));
	        fncSuperContent(pTarget, pChrCd, dcd);
	        return;
	    }

	    Obj.hide();

	    var requestUrl = "/lecmain/common/chr/lec_chr_dtl_ax.asp?chr_cd=" + pChrCd + "&jsoncallback=?";

	    jQuery.getJSON(requestUrl, function (data) {
	        jQuery.each(data, function (index, entry) {
	            //jQuery("#LectureSuperContents").html(unescape(entry["chr_spf"]));
	            Obj.css({ "left": layerLeft, "top": LayerTop });
	            jQuery("#megaNumOne").css({ "z-index": -1 });
	            jQuery("#megaMoreSite").css({ "z-index": -1 });
	            Obj.show("middle");
	            fncSetLectureLogger("3");
	        });
	    });

	}
	function fncLecSuperContentClose(){
		var Obj = jQuery("#LectureSuperLayer");
		Obj.hide("middle");
		jQuery("#megaNumOne").css({ "z-index": 1000 });
		jQuery("#megaMoreSite").css({ "z-index": 1000 });
	 }

	//강좌 특징 레이어 작업
	function fncLecDescContent(pTarget, pChrCd) {

	    var LayerTop = jQuery(pTarget).offset().top;

	    try{
	        var listLeft = parseInt(jQuery("#left_menu").css("width").replace("px", ""));
	    } catch (e) {
	        var listLeft = 220;
	    }

	    try{
	        var bodyWidth = jQuery("body").css("width").replace("px", "");
	        var pTargetWidth = jQuery(pTarget).offset().left;

	        if ((bodyWidth / 2) < pTargetWidth) {
	            pTargetWidth = pTargetWidth - (bodyWidth / 2) + 400;
	        }

	    } catch (e) {
	        pTargetWidth = jQuery(pTarget).offset().left;
	    }

	    var layerLeft = pTargetWidth + listLeft - 62;


	    var Obj = jQuery("#LectureDescLayer");

	    if (Obj.length == 0) {
	        jQuery("body").append(fncGetLecDescLayer());
	        fncLecDescContent(pTarget, pChrCd);
	        return;
	    }

	    Obj.hide();

	    var requestUrl = "/lecmain/common/chr/lec_chr_dtl_ax.asp?chr_cd=" + pChrCd + "&jsoncallback=?";

	    jQuery.getJSON(requestUrl, function (data) {
	        jQuery.each(data, function (index, entry) {
	            jQuery("#LectureDescContents").html(unescape(entry["chr_spf"]));
	            Obj.css({ "left": layerLeft, "top": LayerTop });
	            jQuery("#megaNumOne").css({ "z-index": -1 });
	            jQuery("#megaMoreSite").css({ "z-index": -1 });
	            Obj.show("middle");
	            fncSetLectureLogger("3");
	        });
	    });

	}

	//강좌 특징 레이어 작업 (패키지용)
	function fncLecDescContent_v2(pTarget, pChrCd) {

	    var LayerTop = jQuery(pTarget).offset().top;

	    try {
	        var listLeft = parseInt(jQuery("#left_menu").css("width").replace("px", ""))+700;
	        //alert('1');
	    } catch (e) {
	        var listLeft = 220;
	       // alert('2');
	    }


	    var layerLeft = jQuery(pTarget).offset().left + listLeft - 62;

	    var Obj = jQuery("#LectureDescLayer");

	    if (Obj.length == 0) {
	        jQuery("body").append(fncGetLecDescLayer());
	        fncLecDescContent_v2(pTarget, pChrCd);
	        return;
	    }

	    var requestUrl = "/lecmain/common/chr/lec_chr_dtl_ax.asp?chr_cd=" + pChrCd + "&jsoncallback=?";

	    jQuery.getJSON(requestUrl, function (data) {
	        jQuery.each(data, function (index, entry) {
	            jQuery("#LectureDescContents").html(unescape(entry["chr_spf"]));
	            Obj.css({ "left": listLeft, "top": LayerTop });
	            jQuery("#megaNumOne").css({ "z-index": -1 });
	            jQuery("#megaMoreSite").css({ "z-index": -1 });
	            Obj.show("middle");
	            fncSetLectureLogger("3");
	        });
	    });

	}
	
	 function fncLecDescContentClose(){
		var Obj = jQuery("#LectureDescLayer");
		Obj.hide("middle");
		jQuery("#megaNumOne").css({ "z-index": 1000 });
		jQuery("#megaMoreSite").css({ "z-index": 1000 });
	 }


	function viewPreview(chrcd){
		window.open("/lecmain/popup/lecture_chumsak_preview.asp?chr_cd=" + chrcd,'_chumsak_preview','left=200,top=200,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=420,height=300');
	}
	function viewPreviewFix(chrcd){
		window.open("/lecmain/popup/lecture_chumsak_preview_new.asp?chr_cd=" + chrcd,'_chumsak_preview','left=200,top=200,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=520,height=400');
	}

	try{
		jQuery("document").ready(function(){
			jQuery("#SectionMenuLayer01").click(function(){
				fncLecDescContentClose();
				var Obj = jQuery("#LectureContextMenu");
				Obj.hide();
			});
		});
	}catch(e){}

	function fncSetLectureLogger(pFlg){
		//pFlg 1 : 강좌목록 멀티탭_버튼
		//pFlg 2 : 강좌목록 멀티탭_사용
		//pFlg 3 : 강좌특징 버튼
		//pFlg 4 : 수강평 버튼
		var cUrl = location.href;
		cUrl = cUrl.toLowerCase();

		var strLog = "";
		//고1 연간 학습강좌 학교 시험대비 강좌
		if(cUrl.indexOf("/lec_r/2009/school_test_list.asp") > 0 || cUrl.indexOf("/lec_r/2009/su_basic_list.asp") > 0 ){
			strLog += "/고1/연간학습강좌"
		}

		//고2 연간 학습강좌 학교 시험대비 강좌
		if(cUrl.indexOf("/lec_n/2009/school_test_list.asp") > 0 || cUrl.indexOf("/lec_n/2009/su_basic_list.asp") > 0 ){
			strLog += "/고2/연간학습강좌"
		}

		//고3 학습단계별 추천강좌
		if(cUrl.indexOf("/lec_s/lecture_list.asp") > 0 || cUrl.indexOf("/lec_s/2007/lecture_list_go_total.asp") > 0 ){
			strLog += "/고3/학습단계별 추천강좌"
		}

		if(strLog != ""){
			if(pFlg == "1") strLog += "/강좌목록 멀티탭_버튼";
			if(pFlg == "2") strLog += "/강좌목록 멀티탭_사용";
			if(pFlg == "3") strLog += "/강좌특징_버튼";
			if(pFlg == "4") strLog += "/수강평_버튼";

			try{logerClickTrace( 'EVT',strLog);
				}catch(e){}
		}
	}
//********************강좌목록 메뉴 시작**************************************************************

// How to Study ***************************************************************************************************************************
function fnHowToStudyMsg(t,s) {
	if (jQuery(t).is(':checked')) {
		jQuery(t).attr({ 'checked': false });
	}
	switch(s) {
		case(1031) :
			alert('Final 강좌 수강생만 수강하실 수 있습니다.');
		break;
		default :
		    alert('로그인을 먼저 하십시요.');
		    popMemberInput("2");
		break;
	}
}
// ****************************************************************************************************************************************

function fncChrFpIconViewYn(idx,chr,ssCd) {
    var OpenYn = "N";   // 오픈여부 : 기본은 닫혀있는 상태
    if (jQuery("#btnChrFpIcon_" + chr + idx).attr('src').indexOf("icon_new_mylec_on.gif") > -1) OpenYn = "Y"; // 열려있는 상태

    if (OpenYn == "Y") {
        jQuery("#btnChrFpIcon_" + chr + idx).attr('src', jQuery("#btnChrFpIcon_" + chr + idx).attr('src').replace("icon_new_mylec_on.gif", "icon_new_mylec.gif"));   // 버튼 이미지 변경하세요.
        jQuery("#dvChrFpIcon_" + chr + idx).hide(); // 열려있으면 닫으세요.
    }

    if (OpenYn == "N") {
        //jQuery("#btnChrFpIcon_" + chr).attr('src', jQuery("#btnChrFpIcon_" + chr).attr('src').replace("icon_new_mylec.gif", "icon_new_mylec_on.gif"));  // 버튼 이미지 변경하세요.
        //jQuery("#dvChrFpIcon_" + chr).show(); // 닫혀있으면 여세요.
        jQuery("#dvChrFpIcon_" + chr + idx).load("/lecmain/Common/chr/divChrFpIconList_Ax.Asp?chr_cd=" + chr + "&ssCd=" + ssCd + "&idx=" + idx);    // 해당 페이지에서 로그인 체크 후에 버튼, 노출 처리
    }
}

//********************신승범 교재 예외처리 함수**************************************************************
function fnc_high_math_book(t,chr_cd,book_cd){
	if(chr_cd=="27532"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7521_"+chr_cd).val()!="" && jQuery("#high_math_8019_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

	if(chr_cd=="27860"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7553_"+chr_cd).val()!="" && jQuery("#high_math_8020_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

	if(chr_cd=="28008"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7763_"+chr_cd).val()!="" && jQuery("#high_math_8021_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

	if(chr_cd=="28009"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7801_"+chr_cd).val()!="" && jQuery("#high_math_8022_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

	if(chr_cd=="27533"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7522_"+chr_cd).val()!="" && jQuery("#high_math_8023_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

	if(chr_cd=="27861"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7555_"+chr_cd).val()!="" && jQuery("#high_math_8024_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

	if(chr_cd=="28010"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7557_"+chr_cd).val()!="" && jQuery("#high_math_8025_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

	if(chr_cd=="28011"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7764_"+chr_cd).val()!="" && jQuery("#high_math_8026_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}


	if(chr_cd=="28012"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7903_"+chr_cd).val()!="" && jQuery("#high_math_8160_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

	if(chr_cd=="29019"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7802_"+chr_cd).val()!="" && jQuery("#high_math_8158_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

	if(chr_cd=="29020"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7902_"+chr_cd).val()!="" && jQuery("#high_math_8159_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

	if(chr_cd=="28013"){


		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7802_"+chr_cd).val()!="" && jQuery("#high_math_8158_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

	if(chr_cd=="28014"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7902_"+chr_cd).val()!="" && jQuery("#high_math_8159_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

	if(chr_cd=="30782"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_8414_"+chr_cd).val()!="" && jQuery("#high_math_8415_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("해당 강좌에 포함된 교재 2권 중 1권만 구매할 수 있습니다.");
			return false;
		}
	}

}

function goCartPay(){
	location.href = "/Mypage/cart_new/cart_pay.asp";
}

function fncAppLayer(chr_cd) {    
    jQuery(".lec_layer_pop1").hide();
    jQuery("#app_" + chr_cd).show();
}

function fncBaekYaLayer(chr_cd) {
    jQuery(".beakya_layer").hide();
    jQuery("#beakya_" + chr_cd).show();
}
// ****************************************************************************************************************************************



// p ****************************************************************************************************************************************

function fncPassShowLayer() {
    //alert('ddd');
    jQuery('#mp_lypop').show();
}

function fncPassStdSet() {

    var checkedValue = jQuery("input[type=radio][name=sal_passreq_no]:checked").val();
    var passSalePrd = jQuery("#sale_pass_flg_" + checkedValue).val();
    var tabInit = "4";

    if (passSalePrd == "2") {
        tabInit = "2"
    }
    else if (passSalePrd == "3") {
        tabInit = "4"
    }
    else {
        tabInit = "4"
    }

    fncGoPassStd(checkedValue, tabInit);

}



var PassBtndoubleSubmitFlag = false;

function fncGoPassStd(req_no, tabInit) {
	if (PassBtndoubleSubmitFlag == false){

		PassBtndoubleSubmitFlag = true;

		//학부모 회원인경우 메세지 표시
		var uCookie = getCookie("userid");
		if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
			alert("학부모 회원은 구매가 불가능합니다.");
			return;
		}
		var frm = document.mainfrm;
		if (frm.chrChk == undefined) return;

		var veri = frm.chrChk[0];
		var bPass = false;

		jQuery("input:checkbox[name='chrChk']").attr("checked", false);

		for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {
			try {

				// Speed 플래그 추가 -----------------------

				if (jQuery('input:checkbox[name=speed_type1]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(1);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}


				if (jQuery('input:checkbox[name=speed_type2]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(2);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type3]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(3);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type4]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(4);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type5]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(5);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type6]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(6);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type7]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(7);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type21]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(21);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type22]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(22);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type23]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(23);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type24]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(24);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}
				
				if (jQuery('input:checkbox[name=speed_type25]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(25);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type91]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(91);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type92]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(92);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type93]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(93);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type94]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(94);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type95]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(95);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type96]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(96);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type97]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(97);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type98]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(98);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}

				if (jQuery('input:checkbox[name=speed_type99]').eq(i).is(':checked') == true) {
					jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
					jQuery("input:checkbox[name='speed_type']").eq(i).val(99);
					jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
					bPass = true;
				}


				if (!bPass) {
					try {
						jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
						jQuery("input:checkbox[name='speed_type']").eq(i).val("");
						jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);

					} catch (e) {
						jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
						jQuery("input:checkbox[name='speed_type']").eq(i).val("");
						jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);
					}
				}
				// -----------------------------------------
			} catch (e) { }

			if (jQuery('input:checkbox[name=chrChk]').eq(i).is(':checked') == true) {
				bPass = true;

			}
		}

		if (!bPass) {
			alert("수강 신청할 강좌를 선택해주세요.");
			PassBtndoubleSubmitFlag = false;
			return false;
		}

		var chrList =""
		jQuery('input:checkbox[name="chrChk"]').each(function () {
			if (jQuery(this).is(':checked') == true) {
				chrList = chrList + jQuery(this).val() + ",";
			}
		});

		chrList = chrList.substring(0, chrList.length - 1);

		jQuery.post("/MyPage/mp_2017/pass/Leture_Pass_Input_ax.Asp?req_no=" + req_no, { chrChk: chrList }).done(function (data) {
			jQuery("#DivPassRegResultArea").html(data);

			var msgFlg=jQuery("#msgFlg").val();
			var stdChrNmFlg=jQuery("#stdChrNmFlg").val();
			var bankChrNmFlg=jQuery("#bankChrNmFlg").val();
			var noRegChrNmFlg=jQuery("#noRegChrNmFlg").val();
			var regPassNm=jQuery("#passNm").val();
			var RegChrCnt=jQuery("#RegChrCnt").val();

			var stdChrNm=jQuery("#stdChrNm").val();
			var bankChrNm=jQuery("#bankChrNm").val();
			var noRegChrNm=jQuery("#noRegChrNm").val();

			var totMsg="";

			if(msgFlg=="1"){
				alert("로그인 후 이용바랍니다.");
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="2"){
				alert("선택된 강좌가 없습니다.");			
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="3" || msgFlg=="-9"){
				alert("구매 후 이용바랍니다.");
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="4"){
				alert("수강신청기간이 종료됐습니다.");			
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="5" || msgFlg=="-2"){
				alert("등록 가능한 강좌수가 초과 되었습니다.");				
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="99"){
				alert("수강인 강좌 또는 결제 대기(무통장, ARS 결제 등) 강좌입니다.\n\n주문/결제 정보를 확인하세요.");
				PassBtndoubleSubmitFlag = false;
			}else{

				if (RegChrCnt=="0"){

					if (stdChrNmFlg=="Y" && bankChrNmFlg=="N" && noRegChrNmFlg=="N"){
						if(confirm("수강중인 강좌입니다. 내 강의실로 이동하시겠습니까?\n(※수강 중인 강좌에 없는 경우, 숨김 처리된 강좌일 수 있습니다. '숨긴 강좌'를 확인하세요.)")){
							document.location.href = "/Mypage/mp_2017/myinfo/my_std_room/main.asp?move_tab=2";
						}
						PassBtndoubleSubmitFlag = false;
					}else{
						if(regPassNm!="undefined"){
							totMsg="선택하신 강좌 중 " + regPassNm +"로 수강 할 수 없는 강좌가 있습니다.\n\n수강 및 결제 정보 확인 후, 이용을 부탁 드립니다\n\n";
						}else{
							totMsg="선택하신 강좌 중 수강 할 수 없는 강좌가 있습니다.\n\n수강 및 결제 정보 확인 후, 이용을 부탁 드립니다\n\n";
						}

						if (stdChrNmFlg=="Y"){
							totMsg=totMsg+"※ 수강중인 강좌 ※\n" + stdChrNm;
						}
						
						if (bankChrNmFlg=="Y"){
							totMsg=totMsg+"※ 결제 대기 강좌(무통장, ARS 입금대기) ※\n" + bankChrNm;
						}

						if (noRegChrNmFlg=="Y"){
							totMsg=totMsg+"※ 수강신청 대상 제외 강좌 ※\n" + noRegChrNm;
						}

						alert(totMsg);
						PassBtndoubleSubmitFlag = false;
					}

				}else{

					if (stdChrNmFlg=="N" && bankChrNmFlg=="N" && noRegChrNmFlg=="N"){
						totMsg="수강신청이 정상적으로 완료되었습니다.\n내 강의실로 이동하시겠습니까?"
					}else{

						if(regPassNm!="undefined"){
							totMsg="선택하신 강좌 중 " + regPassNm +"로 수강 할 수 없는 강좌가 있습니다.\n해당 강좌 제외 후 수강 신청 되었습니다.\n\n내 강의실로 이동하시겠습니까?\n\n";
						}else{
							totMsg="선택하신 강좌 중 수강 할 수 없는 강좌가 있습니다.\n해당 강좌 제외 후 수강 신청 되었습니다.\n\n내 강의실로 이동하시겠습니까?\n\n";
						}

						if(stdChrNmFlg=="Y"){
							totMsg=totMsg+"※ 수강중인 강좌 ※\n" + stdChrNm;
						}

						if(bankChrNmFlg=="Y"){
							totMsg=totMsg+"※ 결제 대기 강좌(무통장, ARS 입금대기) ※\n" + bankChrNm;
						}

						if(noRegChrNmFlg=="Y"){
							totMsg=totMsg+"※ 수강신청 대상 제외 강좌 ※\n" + noRegChrNm;
						}
					}

					if (confirm(totMsg)) {						
						document.location.href = "/Mypage/mp_2017/myinfo/my_std_room/main.asp?move_tab=2";
					}
					PassBtndoubleSubmitFlag = false;
				}
			}
		});
	}else{
		alert("처리중 입니다.");
	}



	/*
    jQuery.post("/MyPage/mp_2017/pass/Leture_Pass_Input.Asp?req_no=" + req_no, { chrChk: chrList }).done(function (data) {
        if (data == "") {
            if (confirm("수강신청이 정상적으로 완료되었습니다.\n\n내 강의실로 이동하시겠습니까?")) {
                try {
                    //document.location.href = "/Mypage/mp/study/my_lecture.asp?mOne=pico1&mTwo=11&tab=" + tabInit;
                    document.location.href = "/Mypage/mp_2017/myinfo/my_std_room/main.asp?move_tab=2";
                } catch (e) { };
            }
        }
        else {
            alert(data);
        }
    });
	*/
}



function fncMyPassShowPop() {

    //학부모 회원인경우 메세지 표시
    var uCookie = getCookie("userid");
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("학부모 회원은 구매가 불가능합니다.");
        return;
    }
    var frm = document.mainfrm;
    if (frm.chrChk == undefined) return;

    var veri = frm.chrChk[0];
    var bPass = false;


	jQuery("input:checkbox[name='chrChk']").attr("checked", false);

    
    for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {
        try {

            // Speed 플래그 추가 -----------------------

            if (jQuery('input:checkbox[name=speed_type1]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(1);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }


            if (jQuery('input:checkbox[name=speed_type2]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(2);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type3]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(3);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type4]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(4);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type5]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(5);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type6]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(6);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type7]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(7);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type21]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(21);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type22]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(22);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type23]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(23);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type24]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(24);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
			}
			
			if (jQuery('input:checkbox[name=speed_type25]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(24);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type91]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(91);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type92]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(92);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type93]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(93);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type94]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(94);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type95]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(95);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type96]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(96);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type97]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(97);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type98]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(98);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }

            if (jQuery('input:checkbox[name=speed_type99]').eq(i).is(':checked') == true) {
                jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", true);
                jQuery("input:checkbox[name='speed_type']").eq(i).val(99);
                jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", true);
                bPass = true;
            }


            if (!bPass) {
                try {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);

                } catch (e) {
                    jQuery("input:checkbox[name='chrChk']").eq(i).attr("checked", false);
                    jQuery("input:checkbox[name='speed_type']").eq(i).val("");
                    jQuery("input:checkbox[name='speed_type']").eq(i).attr("checked", false);
                }
            }
            // -----------------------------------------
        } catch (e) { }

        if (jQuery('input:checkbox[name=chrChk]').eq(i).is(':checked') == true) {
            bPass = true;
        }
    }


    if (!bPass) {
        alert("수강 신청할 강좌를 선택해주세요.");
        return;
    }

    
    var windowW = 450;  // 창의 가로 길이
    var windowH = 370;  // 창의 세로 길이
    var left = Math.ceil((window.screen.width - windowW) / 2);
    var top = Math.ceil((window.screen.height - windowH) / 2);

    
    var url = "/Mypage/mp_2017/pass/pop_select.asp";
    var title = "passPop";
    var status = "left=" + left + ",top=" + top + ",toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=370";
    window.open("", title, status); 
   
    frm.target = title;                    
    frm.action = url;                    
    frm.method = "post";
    frm.submit();     


}




	
//통강좌,진수맛보기 리뉴얼용
function fncChrFreeMovie(dngTtype,pChrCd,obj){
	var movieUrl="";

	jQuery(".lyr_infobx").hide();
	jQuery(".lyr_infobx2").hide();
	jQuery(".lstedu_bookinfo .lstedu_bookinfo--lyr").html("");

	jQuery.post("/lecmain/common/chr/divChrFreeMovList_Ax.Asp",
		{
			"chrFreemovieType" : dngTtype,
			"chrCd" : pChrCd
		},
		function (data){
			jQuery("#lsteduLayer"+pChrCd).html(data);
			if(obj){		// 높이값 보정처리 20190722 CHOIJH
				var offsetTopValue = jQuery(obj).offset().top - jQuery("#lstedu_bookinfo--btn_"+pChrCd).offset().top;
				jQuery("#lsteduLayer"+pChrCd).css("top", offsetTopValue)
			}
			jQuery("#lsteduLayer"+pChrCd).show();
		}
	);
}

function fncCartLayerShow(pChrCd,passFlg,PassReq,PassCnt,obj,passSet){
	jQuery(".lyr_basket").hide();
	jQuery(".passEdtLayer").hide();
	jQuery(".lyr_infobx").hide();
	jQuery(".lyr_infobx2").hide();
	jQuery(".lstedu_bookinfo .lstedu_bookinfo--lyr").html("");
	jQuery("#cartVitaminRegResultArea").html("");
	
	var layerIndexNo=jQuery(".btn_basket").index(jQuery(obj));
	
	jQuery.post("/lecmain/common/chr/divCartLayer_Ax.Asp",
		{
			"chrCd" : pChrCd,
			"passFlg" : passFlg,
			"MyPassReq" : PassReq,
			"PassCnt" : PassCnt,
			"passSet" : passSet,
			"layerIndexNo" : layerIndexNo
		},
		function (data){			

			jQuery(".lstedu_bookinfo--lyr").eq(layerIndexNo).html(data);
			jQuery(".lstedu_bookinfo--lyr").eq(layerIndexNo).show();
		}
	);
}

function fncCartLayerShowFreeChr(pChrCd,evtEdt){

	jQuery(".lyr_infobx").hide();
	jQuery(".lyr_infobx2").hide();
	jQuery(".lstedu_bookinfo .lstedu_bookinfo--lyr").html("");
	jQuery("#cartVitaminRegResultArea").html("");

	jQuery.post("/lecmain/common/chr/divFreeChrCartLayer_Ax.Asp",
		{
			"chrCd" : pChrCd,
			"evtEdt" : evtEdt
		},
		function (data){			
			jQuery("#lsteduLayer"+pChrCd).html(data);			
			jQuery("#lsteduLayer"+pChrCd).show();			
		}
	);
}

function fncTecChrFreeCheck(fChrCd){
	jQuery.post("/teacher_v2/chr/freechr_list_check_renewal_ax.asp",
		{
			"chrCd" : fChrCd
		},
		function (data){
			if(data=="1"){
				alert("로그인 후 신청해 주세요.");
				fncShowLogin('2');
				return false;
			}else if(data=="2"){
				alert("신청하실 강좌를 선택해 주세요.");
				return false;
			}else if(data=="3"){
				alert("이미 신청하셨습니다.");
				return false;
			}else if(data=="4"){
				if (confirm('정상적으로 신청되었습니다.\n지금 내 강의실로 이동하시겠습니까?')) {
					location.href = '/Mypage/mp_2017/myinfo/my_std_room/main.asp?move_tab=2';
				}
			}
		}
	);
}



function fncMyPassShowPopNew(chrCd,chrDtlFlg) {
    //학부모 회원인경우 메세지 표시
    var uCookie = getCookie("userid");
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("학부모 회원은 구매가 불가능합니다.");
        return;
    }

	if (chrDtlFlg=="Y"){	
		if(jQuery("input:checkbox[name='selStdType']:checked").length==0){
			alert("수강하실 강좌를 선택해주세요.");
			return false;
		}
	}

	var frm = document.mainfrm;	
        
    var windowW = 450;  // 창의 가로 길이
    var windowH = 370;  // 창의 세로 길이
    var left = Math.ceil((window.screen.width - windowW) / 2);
    var top = Math.ceil((window.screen.height - windowH) / 2);
	
	jQuery("#tmpChrChkCd").remove();
    
	//jQuery("form#mainfrm").append('<input type="hidden" name="chrChk" id="tmpChrChkCd" value="'+chrCd+'" />')	
	jQuery(frm).append('<input type="hidden" name="chrChk" id="tmpChrChkCd" value="'+chrCd+'" />')	


    var url = "/Mypage/mp_2017/pass/pop_select.asp";
    var title = "passPop";
    var status = "left=" + left + ",top=" + top + ",toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=370";
    window.open("", title, status); 
   
    frm.target = title;                    
    frm.action = url;                    
    frm.method = "post";
    frm.submit();     
}


function fncGoPassStdNew(req_no, chrCd,popFlg) {

    //학부모 회원인경우 메세지 표시
    var uCookie = getCookie("userid");

    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("학부모 회원은 구매가 불가능합니다.");
        return false;
    }

	var selChrCnt=0;
	
	if (popFlg=="Y"){
		if (jQuery("input:checkbox[name='selStdType']").length > 0) {
			selChrCnt=jQuery("input:checkbox[name='selStdType']:checked").length;		
		}
	}else{
		selChrCnt=1;
	}


	if (selChrCnt==0){
		alert("수강 신청할 강좌를 선택해주세요.");
		return false;
	}


	if (PassBtndoubleSubmitFlag == false){
		PassBtndoubleSubmitFlag = true;

		jQuery.post("/MyPage/mp_2017/pass/Leture_Pass_Input_ax.Asp?req_no=" + req_no, { chrChk: chrCd }).done(function (data) {
			jQuery("#DivPassRegResultArea").html(data);

			var msgFlg=jQuery("#msgFlg").val();
			var stdChrNmFlg=jQuery("#stdChrNmFlg").val();
			var bankChrNmFlg=jQuery("#bankChrNmFlg").val();
			var noRegChrNmFlg=jQuery("#noRegChrNmFlg").val();
			var regPassNm=jQuery("#passNm").val();
			var RegChrCnt=jQuery("#RegChrCnt").val();

			var stdChrNm=jQuery("#stdChrNm").val();
			var bankChrNm=jQuery("#bankChrNm").val();
			var noRegChrNm=jQuery("#noRegChrNm").val();

			var totMsg="";

			if(msgFlg=="1"){
				alert("로그인 후 이용바랍니다.");
				fncShowLogin('2');
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="2"){
				alert("선택된 강좌가 없습니다.");			
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="3" || msgFlg=="-9"){
				alert("구매 후 이용바랍니다.");
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="4"){
				alert("수강신청기간이 종료됐습니다.");			
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="5" || msgFlg=="-2"){
				alert("등록 가능한 강좌수가 초과 되었습니다.");				
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="99"){
				alert("수강인 강좌 또는 결제 대기(무통장, ARS 결제 등) 강좌입니다.\n\n주문/결제 정보를 확인하세요.");
				PassBtndoubleSubmitFlag = false;
			}else{

				if (RegChrCnt=="0"){

					if (stdChrNmFlg=="Y" && bankChrNmFlg=="N" && noRegChrNmFlg=="N"){
						if(confirm("수강중인 강좌입니다. 내 강의실로 이동하시겠습니까?\n(※수강 중인 강좌에 없는 경우, 숨김 처리된 강좌일 수 있습니다. '숨긴 강좌'를 확인하세요.)")){
							document.location.href = "/Mypage/mp_2017/myinfo/my_std_room/main.asp?move_tab=2";
						}
						PassBtndoubleSubmitFlag = false;
					}else{

						totMsg="선택하신 강좌 중 " + regPassNm +"로 수강 할 수 없는 강좌가 있습니다.\n\n수강 및 결제 정보 확인 후, 이용을 부탁 드립니다\n\n";

						if (stdChrNmFlg=="Y"){
							totMsg=totMsg+"※ 수강중인 강좌 ※\n" + stdChrNm;
						}
						
						if (bankChrNmFlg=="Y"){
							totMsg=totMsg+"※ 결제 대기 강좌(무통장, ARS 입금대기) ※\n" + bankChrNm;
						}

						if (noRegChrNmFlg=="Y"){
							totMsg=totMsg+"※ 수강신청 대상 제외 강좌 ※\n" + noRegChrNm;
						}

						alert(totMsg);
						PassBtndoubleSubmitFlag = false;
					}

				}else{

					if (stdChrNmFlg=="N" && bankChrNmFlg=="N" && noRegChrNmFlg=="N"){
						totMsg="수강신청이 정상적으로 완료되었습니다.\n내 강의실로 이동하시겠습니까?"
					}else{

						totMsg="선택하신 강좌 중 " + regPassNm +"로 수강 할 수 없는 강좌가 있습니다.\n해당 강좌 제외 후 수강 신청 되었습니다.\n\n내 강의실로 이동하시겠습니까?\n\n";

						if(stdChrNmFlg=="Y"){
							totMsg=totMsg+"※ 수강중인 강좌 ※\n" + stdChrNm;
						}

						if(bankChrNmFlg=="Y"){
							totMsg=totMsg+"※ 결제 대기 강좌(무통장, ARS 입금대기) ※\n" + bankChrNm;
						}

						if(noRegChrNmFlg=="Y"){
							totMsg=totMsg+"※ 수강신청 대상 제외 강좌 ※\n" + noRegChrNm;
						}
					}

					if (confirm(totMsg)) {						
						document.location.href = "/Mypage/mp_2017/myinfo/my_std_room/main.asp?move_tab=2";
					}
					PassBtndoubleSubmitFlag = false;
				}
			}
		});
	}
}


function fncCheckChrType(obj){
	var indexNo=jQuery("input:checkbox[name='selStdType']").index(obj);

	if(jQuery("input:checkbox[name='selStdType']:checked").length>0){	
		jQuery("input:checkbox[name='selStdType']").prop("checked",false);
		jQuery("input:checkbox[name='selStdType']").eq(indexNo).prop("checked",true);
	}	
}


function fncGoCartType(cType,ChrCd,passFlg){	
	var selChrCnt=0;
	var selBookCnt=0;
	var selEBookCnt=0;
	var selSetBookCnt=0;

	var selStdType="";
	var sleChrCd="";
	var selBookCd="";
	var selEBookCd="";
	
	var defaultMsg="";
	
	if(cType=="1"){
		defaultMsg="장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?\n\n(계속 강좌나 교재를 찾으시려면 취소 버튼을 클릭해주세요.)\n\n";
	}else{
		defaultMsg="장바구니에 담겼습니다.\n주문결제로 이동하시겠습니까?\n\n(계속 강좌나 교재를 찾으시려면 취소 버튼을 클릭해주세요.)\n\n";
	}
	
	if (jQuery("input:checkbox[name='selStdType']").length > 0) {
		selChrCnt=jQuery("input:checkbox[name='selStdType']:checked").length;		
	}

	if (jQuery("input:checkbox[name='selBookCd']").length > 0) {
		selBookCnt=jQuery("input:checkbox[name='selBookCd']:checked").length;
	}

	if (jQuery("input:checkbox[name='selEBookCd']").length > 0) {
		selEBookCnt=jQuery("input:checkbox[name='selEBookCd']:checked").length;
	}

	if (jQuery("input:checkbox[name='selSetBookCd']").length > 0) {
		selSetBookCnt=jQuery("input:checkbox[name='selSetBookCd']:checked").length;
	}


	if (selChrCnt==0 && selBookCnt==0 && selEBookCnt==0 && selSetBookCnt==0){
		alert("결제하실 강좌 또는 교재를 선택해주세요.");
		return false;
	}

	if (jQuery("input:checkbox[name='selStdType']").length > 0) {
		jQuery("input:checkbox[name=selStdType]:checked").each(function() {
			selStdType = selStdType + jQuery(this).val();
		});
	}

	if (jQuery("input:checkbox[name='selBookCd']").length > 0) {
		jQuery("input:checkbox[name=selBookCd]:checked").each(function() {
			selBookCd = selBookCd + jQuery(this).val() + ",";			
		});
	}

	if (jQuery("input:checkbox[name='selEBookCd']").length > 0) {
		jQuery("input:checkbox[name=selEBookCd]:checked").each(function() {
			selEBookCd = selEBookCd + jQuery(this).val() + ",";			
		});
	}

	if (jQuery("input:checkbox[name='selSetBookCd']").length > 0) {
		jQuery("input:checkbox[name=selSetBookCd]:checked").each(function() {

			var selSetBookCd=jQuery(this).val()
			var arrSetBookCd=selSetBookCd.split("/");

			selBookCd = selBookCd + arrSetBookCd[0] + ",";
			selEBookCd = selEBookCd + arrSetBookCd[1] + ",";					
		});
	}

	if (selBookCd!=""){
		selBookCd = selBookCd.substr(0, selBookCd.length -1);
	}

	if (selEBookCd!=""){
		selEBookCd = selEBookCd.substr(0, selEBookCd.length -1);
	}

	if (selChrCnt>0){
		sleChrCd=ChrCd;
	}

	jQuery("#goCartBtnAare").attr('onclick', '').unbind('click');	
	jQuery("#goDirectPayBtnAare").attr('onclick', '').unbind('click');	

	jQuery.post("/Mypage/mp_2017/pay/cart/cart_item_reg_ax.asp",
		{			
			"spdType" : selStdType,
			"chrCd" : sleChrCd,
			"cartType" : cType,
			"bookCd" : selBookCd,
			"eBookCd" : selEBookCd
		},
		function (data){
			jQuery("#cartRegResultArea").html(data);

			if(jQuery("#cartRegSultMsg").val()=="1"){
				alert("로그인 후 이용 가능합니다.");
				fncShowLogin('2');
				return false;
			}else if(jQuery("#cartRegSultMsg").val()=="2"){

				defaultMsg=defaultMsg + jQuery("#cartRegSultTxt").val();
				
				if(confirm(defaultMsg)){
					if(cType=="1"){
						location.href="/Mypage/mp_2017/pay/cart/cart_list.asp";
					}else{
						location.href="/Mypage/mp_2017/pay/cart/cart_pay.asp";
					}
				}

			}else{				
				alert(jQuery("#cartRegSultTxt").val());
			}


			if (passFlg=="Y"){
				jQuery("#goCartBtnAare").attr("onClick", "fncMsgPassUse(1,"+ChrCd+");");
				jQuery("#goDirectPayBtnAare").attr("onClick", "fncMsgPassUse(2,"+ChrCd+");");
			}else{
				jQuery("#goCartBtnAare").attr("onClick", "fncGoCartType(1,"+ChrCd+",'N');");
				jQuery("#goDirectPayBtnAare").attr("onClick", "fncGoCartType(2,"+ChrCd+",'N');");
			}

		}

	);
}


function fncSelfPickUpCartType(chrCd){
	var selChrCnt=0;
	var selBookCnt=0;

	var sleChrCd="";
	var selBookCd="";

	var defaultMsg="선택하신 상품이 장바구니에 담겼습니다.\n\n";
	

	var selStoreCd=jQuery("#mySelStoreCd").val();

	if (selStoreCd==""){
		alert("바로픽업 수령 지점을 선택해 주세요.");
		return false;
	}

	if (jQuery("#selStdType"+chrCd).length > 0) {
		if (jQuery("#selStdType"+chrCd).is(":checked") == true){			
			selChrCnt=1;
		}
	}

	if (jQuery("input:checkbox[name='selBookCd"+chrCd+"']").length > 0) {
		selBookCnt=jQuery("input:checkbox[name='selBookCd"+chrCd+"']:checked").length;
	}

	if (selChrCnt==0 && selBookCnt==0){
		alert("담으실 상품을 선택해주세요.");
		return false;
	}


	if (jQuery("input:checkbox[name='selBookCd"+chrCd+"']").length > 0) {
		jQuery("input:checkbox[name=selBookCd"+chrCd+"]:checked").each(function() {
			selBookCd = selBookCd + jQuery(this).val() + ",";			
		});

		selBookCd = selBookCd.substr(0, selBookCd.length -1);
	}

	if (selChrCnt>0){
		sleChrCd=chrCd;
	}

	jQuery.post("/bookMall/event/2021/0823_baro/cart_Item_Reg_ax.asp",
		{			
			"chrCd" : sleChrCd,
			"bookCd" : selBookCd,
			"storeCd" : selStoreCd,
			"bookType" : "1"
		},
		function (data){
			jQuery("#cartRegResultArea").html(data);

			if(jQuery("#cartRegSultMsg").val()=="1"){
				alert("로그인 후 이용 가능합니다.");
				fncShowLogin();
				return false;
			}else if(jQuery("#cartRegSultMsg").val()=="2"){
				jQuery.post("/bookMall/event/2021/0823_baro/cart_List_ax.asp",
					{
						"storeCd" : selStoreCd
					},
					function(data) {
						jQuery("#cartListArea").html(data);
					}
				);

				if (jQuery("#cartRegSultTxt").val()!=""){
					defaultMsg=jQuery("#cartRegSultTxt").val();
				}

				
				jQuery("#selStdType"+chrCd).attr("checked",false);
				jQuery("input:checkbox[name=selBookCd"+chrCd+"]").attr("checked",false);

				alert(defaultMsg);

			}else{
				jQuery("#selStdType"+chrCd).attr("checked",false);
				jQuery("input:checkbox[name=selBookCd"+chrCd+"]").attr("checked",false);
				alert(jQuery("#cartRegSultTxt").val());
			}
		}
	);
}


function fncPkgCartLayerShow(pkgCd){

	jQuery(".lyr_infobx").hide();
	jQuery(".lyr_infobx2").hide();
	jQuery(".lstedu_bookinfo .lstedu_bookinfo--lyr").html("");
	jQuery("#cartVitaminRegResultArea").html("");

	jQuery.post("/lecmain/common/chr/divPkgCartLayer_Ax.Asp",
		{
			"pkgCd" : pkgCd
		},
		function (data){
			jQuery("#lsteduLayerPkg"+pkgCd).html(data);
			jQuery("#lsteduLayerPkg"+pkgCd).show();
		}
	);
}

function fncGoPkgCartType(cType,pkgCd,passFlg){
	var selPkgCnt=0;
	var selBookCnt=0;
	var selEBookCnt=0
	var selSetBookCnt=0;		


	var selBookCd="";
	var selPkgCd="";	
	var selEBookCd="";

	var defaultMsg="";
	var reSultMsgFlg="0";
	
	if(cType=="1"){
		defaultMsg="장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?\n\n(계속 강좌나 교재를 찾으시려면 취소 버튼을 클릭해주세요.)\n\n";
	}else{
		defaultMsg="장바구니에 담겼습니다.\n주문결제로 이동하시겠습니까?\n\n(계속 강좌나 교재를 찾으시려면 취소 버튼을 클릭해주세요.)\n\n";
	}
	
	if (jQuery("input:checkbox[name='selPkgCd']").length > 0) {
		selPkgCnt=jQuery("input:checkbox[name='selPkgCd']:checked").length;		
	}

	if (jQuery("input:checkbox[name='selBookCd']").length > 0) {
		selBookCnt=jQuery("input:checkbox[name='selBookCd']:checked").length;
	}

	if (jQuery("input:checkbox[name='selEBookCd']").length > 0) {
		selEBookCnt=jQuery("input:checkbox[name='selEBookCd']:checked").length;
	}

	if (jQuery("input:checkbox[name='selSetBookCd']").length > 0) {
		selSetBookCnt=jQuery("input:checkbox[name='selSetBookCd']:checked").length;
	}

	if (selPkgCnt==0 && selBookCnt==0 && selEBookCnt==0 && selSetBookCnt==0){
		alert("결제하실 패키지 또는 교재를 선택해주세요.");
		return false;
	}

	if (selPkgCnt>0){
		selPkgCd=pkgCd;	
	}

	if (jQuery("input:checkbox[name='selBookCd']").length > 0) {
		jQuery("input:checkbox[name=selBookCd]:checked").each(function() {
			selBookCd = selBookCd + jQuery(this).val() + ",";			
		});
	}

	if (jQuery("input:checkbox[name='selEBookCd']").length > 0) {
		jQuery("input:checkbox[name=selEBookCd]:checked").each(function() {
			selEBookCd = selEBookCd + jQuery(this).val() + ",";			
		});
	}


	if (jQuery("input:checkbox[name='selSetBookCd']").length > 0) {
		jQuery("input:checkbox[name=selSetBookCd]:checked").each(function() {

			var selSetBookCd=jQuery(this).val()
			var arrSetBookCd=selSetBookCd.split("/");

			selBookCd = selBookCd + arrSetBookCd[0] + ",";
			selEBookCd = selEBookCd + arrSetBookCd[1] + ",";
		});
	}

	if (selBookCd!=""){
		selBookCd = selBookCd.substr(0, selBookCd.length -1);
	}

	if (selEBookCd!=""){
		selEBookCd = selEBookCd.substr(0, selEBookCd.length -1);
	}

	jQuery("#goCartBtnAare").attr('onclick', '').unbind('click');	
	jQuery("#goDirectPayBtnAare").attr('onclick', '').unbind('click');	


	jQuery.post("/Mypage/mp_2017/pay/cart/cart_pkg_reg_ax.asp",
		{	
			"pkgCd" : selPkgCd,
			"cartType" : cType,
			"bookCd" : selBookCd,
			"eBookCd" : selEBookCd
		},
		function (data){
			jQuery("#pkgCartRegResultArea").html(data);

			if(jQuery("#PkgcartRegSultMsg").val()=="1"){
				alert("로그인 후 이용 가능합니다.");
				fncShowLogin('2');
				return false;
			}else if(jQuery("#PkgcartRegSultMsg").val()=="2"){
				
				defaultMsg=defaultMsg + jQuery("#PkgcartRegSultTxt").val() ;

				if(confirm(defaultMsg)){
					if(cType=="1"){
						location.href="/Mypage/mp_2017/pay/cart/cart_list.asp";
					}else{
						location.href="/Mypage/mp_2017/pay/cart/cart_pay.asp";
					}
				}
			}else{
				alert(jQuery("#PkgcartRegSultTxt").val());
			}


			if (passFlg=="Y"){
				jQuery("#goCartBtnAare").attr("onClick", "fncMsgPassUse(1,"+pkgCd+");");
				jQuery("#goDirectPayBtnAare").attr("onClick", "fncMsgPassUse(2,"+pkgCd+");");
			}else{
				jQuery("#goCartBtnAare").attr("onClick", "fncGoPkgCartType(1,"+pkgCd+",'N');");
				jQuery("#goDirectPayBtnAare").attr("onClick", "fncGoPkgCartType(2,"+pkgCd+",'N');");
			}

		}
	);
}

function fncChrIconInfoLayer(obj){

	jQuery(".lyr_infobx").hide();
	jQuery(".lyr_infobx2").hide();
	jQuery(".lstedu_bookinfo .lstedu_bookinfo--lyr").html("");

	var layerNum=jQuery(".lyerinfoChrBtn").index(obj);
	
	jQuery(".tb_char_option .lyr_infobx").eq(layerNum).show();
}

function fncPassIconInfoLayer(obj){

	jQuery(".lyr_infobx").hide();
	jQuery(".lyr_infobx2").hide();
	jQuery(".lstedu_bookinfo .lstedu_bookinfo--lyr").html("");
	var layerNum=jQuery(".lyerinfoPassBtn").index(obj);
	
	jQuery(".tb_char_option .lyr_infobx2").eq(layerNum).show();
}


var MegapassEdtSet = 'N';
function fncPassEdtLayer(pType,reqno,chrcd,popflg,obj,btype) {
	jQuery(".passEdtLayer").hide();
	jQuery(".lstedu_bookinfo--lyr").hide();
	if(MegapassEdtSet=='N'){
		//장바구니 패스 수강 버튼 처리
		if(btype=='bt'){
			var layerNum=obj;
		}else{
			var layerNum=jQuery(".passEdtLayerBtn").index(obj);
		}
		jQuery(".passEdtLayer").eq(layerNum).show();
	}else{
		if(pType==1){
			fncMyPassShowPopNew(chrcd,popflg);
		}else{
			fncGoPassStdNew(reqno,chrcd,popflg);
		}
	}
	
}
function fncPassEdtSet(setNum,pType,reqno,chrcd,popflg) {
	if(MegapassEdtSet=='N'){
		jQuery.post("/Mypage/mp_2017/pass/Leture_Pass_Set_ax.asp", {'setNum' : setNum}, function (data, textStatus) {
		switch (data) {
			case "1": alert("로그인 후 이용 가능합니다.");fncShowLogin(); break;
			case "2": alert('수강 기간 설정이 완료되었습니다.\n설정은 ‘ONE-STOP 수강 신청’ 페이지에서 언제든 변경하실 수 있어요!');
					  if(pType==1){
						fncMyPassShowPopNew(chrcd,popflg);
					  }else{
						fncGoPassStdNew(reqno,chrcd,popflg);
					  }
					  MegapassEdtSet='Y';
					jQuery(".passEdtLayer").hide();
			break;
			default: alert(data); break;
			}
		});	
	}else{
		if(pType==1){
			fncMyPassShowPopNew(chrcd,popflg);
		}else{
			fncGoPassStdNew(reqno,chrcd,popflg);
		}
	}
}
// p ****************************************************************************************************************************************
