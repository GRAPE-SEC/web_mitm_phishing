var GPlayer = "";
function isMoneyNumber4(sVal) {
		var deci_cnt = 0;
		for (i=0; i<sVal.length; i++) {
			if (sVal.substring(i, i+1) == '.' ) {
				deci_cnt = deci_cnt + 1;	//�Ҽ����ִ�������
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


// ��Ű�� ���� ���� ���� (2015-04 ������ Ȳ����)
function fnPackagebooksCheck(pkg_cd) {

    var url = "/Lecture/popup/lecture_Packagebook_select_new.asp?pkg_cd=" + pkg_cd
    window.open(url, "_popbook", "left=200,top=200,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=670,height=600");
}

// ��Ű�� ����ó�� (2015-04 ������ Ȳ����)
function fnSetEventPackageNewAll(pkg_cd, kbn) {

    var uCookie = getCookie("userid");

    if (uCookie == "") {
        uCookie = getCookie("USERID")
    }
    if (uCookie == "") {
        alert("�α����� ���� �� �ּ���.");
        popMemberInput("2");
        return;
    }

    //�кθ� ȸ���ΰ�� �޼��� ǥ��
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
        return;
    }


    //	---------	��ٱ���/�����ϱ�pkg_cd
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


// ��Ű�� ���� ����
function fnSetEventPackageBookPrice(pkg_cd, chr_cd) {
	var totbookprc	= jQuery("#bookTotalPrc_" + pkg_cd).val();	// �����ѱݾ�
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

    //��Ű�� ���� üũ�� ���� ���� �����  - �߰� 2014-10-23 Ȳ����
	if (ckbookYn == "Y" || totbookprc > 0) {
	    jQuery("#bookCalcNew_" + pkg_cd).show();
	    jQuery("#bookCalcNew2_" + pkg_cd).hide();
	}
	else {
	    jQuery("#bookCalcNew_" + pkg_cd).hide();
	    jQuery("#bookCalcNew2_" + pkg_cd).show();
	}
}

// ��Ű�� ���̱� �ݱ�
function PkgCharListView(flg, cd) {
		if (flg == "Y") {
			jQuery("#btnPkCharN_" + cd).show();
			jQuery("#btnPkCharY_" + cd).hide();
			jQuery("#PkChar_" + cd).show();

			//�߰�
			jQuery("#PkCharView_" + cd).hide();
		}

		if (flg == "N") {
			jQuery("#btnPkCharN_" + cd).hide();
			jQuery("#btnPkCharY_" + cd).show();
			jQuery("#PkChar_" + cd).hide();
			//�߰�
			jQuery("#PkCharView_" + cd).show();
		}
}

// ��Ű�� ���̱� �ݱ� -�������
function PkgCharNewListView(flg, cd) {
    if (flg == "Y") {
        jQuery("#btnPkCharNewN_" + cd).show();
        jQuery("#btnPkCharNewY_" + cd).hide();
        jQuery("#PkCharNew_" + cd).show();

        //�߰�
        //jQuery("#PkCharView_" + cd).hide();
    }

    if (flg == "N") {
        jQuery("#btnPkCharNewN_" + cd).hide();
        jQuery("#btnPkCharNewY_" + cd).show();
        jQuery("#PkCharNew_" + cd).hide();
        //�߰�
        //jQuery("#PkCharView_" + cd).show();
    }
}



// ��Ű�� ����ó��
function fnSetEventPackageAll(pkg_cd, kbn) {

    var uCookie = getCookie("userid");

        if (uCookie == "") {
            alert("�α����� ���� �� �ּ���.");
            popMemberInput("2");
            return;
        }

        //�кθ� ȸ���ΰ�� �޼��� ǥ��
        if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
            alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
            return;
        }

		//	---------	��ٱ���/�����ϱ�pkg_cd
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

// ���� ���� ����
function booksCheck(chr_cd, bookcd, chrnm) {
		var url = "/Lecture/popup/lecture_book_select_new.asp?chr_cd="+ chr_cd +"&bookcd="+ bookcd +"&chrnm="+ chrnm
		window.open(url,"_popbook","left=200,top=200,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=650,height=600");
}

function goBigZzim(item_no) {
    //�кθ� ȸ���ΰ�� �޼��� ǥ��
    var uCookie = getCookie("userid");
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
		alert("���Ͻ� ���¸� �����Ͽ� �ֽʽÿ�");
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
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
		alert("���Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
		return;
	}

	frm.action = '/cart/cart_prop_pre.asp';
	frm.submit();
}

function goCart(user_id){
	if(user_id == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
		alert("��û�Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
		return;
	}

	frm.action = '/cart/cart_main_pre.asp';
	frm.submit();
}

function goCart_Event_Cnt(my_std_cnt){
	var uCookie=getCookie("userid");

	if(uCookie == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��

	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
			// Speed �÷��� �߰� -----------------------

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
        alert("��û�Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
        return;
    }	
	

	if(!bPass){
		alert("��û�Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
		return;
}
	
	if(my_std_cnt==0){
		if (check_chr_cnt>2){
			alert("2������ ���ᰭ�� ���� ��û�� �����մϴ�.");
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
				alert("2������ ���ᰭ�� ���� ��û�� �����մϴ�.");
				return;
			}
		}
	}

}


function goDirectPay(user_id){
	if(user_id == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
        alert("��û�Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
        return;
    }	

	if(!bPass){
		alert("�����Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
		return;
	}

	frm.action = '/cart/cart_direct_pay_pre.asp';
	frm.submit();
}


function goDirectPay_Event_Cnt(my_std_cnt){
	var uCookie=getCookie("userid");

	if(uCookie == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��

	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
	        // Speed �÷��� �߰� -----------------------

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
		alert("�����Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
		return;
	}

	if(my_std_cnt==0){
		if (check_chr_cnt>2){
			alert("2������ ���ᰭ�� ���� ��û�� �����մϴ�.");
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
				alert("2������ ���ᰭ�� ���� ��û�� �����մϴ�.");
				return;
			}
		}
	}
}

function goDirectPay1(user_id){
	if(user_id == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	var frm = document.mainfrm;

	var thunderNum = 0;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        thunderNum = jQuery('input:checkbox[name="chrChk"]:checked').length;
    }	

	if(thunderNum > 0 && thunderNum < 3){
		if(confirm("2�б� �⸻��� ����ġ�� ���¸� 3~4�� ��û�Ͻø� �������� 5%�� ���� �ǰ�, \n\n5�� �̻� �Ͻø� 10%�� ���� �˴ϴ�. \n\n��û�Ͻ� ����ġ�� ���°����� 3�� �̸��̿��� ������ ���� ���Ͻʴϴ�.\n\n\n�ٷ� ���� �Ͻðڽ��ϱ�?") != 1) return;
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
		alert("�����Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
		return;
	}

	frm.action = '/cart/cart_direct_pay.asp';

	frm.submit();
}

//Free Pass��
function goCart_Free(user_id){
	if(user_id == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
		return;
	}

	var frm = document.mainfrm;
	
    var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }		

	if(!bPass){
		alert("��û�Ͻ� ���¸� �����Ͽ� �ֽʽÿ�");
		return;
	}

	window.open('','freepassPop','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=520,height=590');

	frm.action = '/Free_pass/Cart/cart_FreePass_popup.asp';
	frm.target = 'freepassPop';

	frm.submit();
}

//Free Pass��
function goCart_Free_event(user_id){
	if(user_id == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
		return;
	}

	var frm = document.mainfrm;

    var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }		
	
	if(!bPass){
		alert("��û�Ͻ� ���¸� �����Ͽ� �ֽʽÿ�");
		return;
	}

	window.open('','freepassPop','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=520,height=590');

	frm.action = '/Free_pass_event/Cart/cart_FreePass_popup.asp';
	frm.target = 'freepassPop';

	frm.submit();
}

//��1 ���չ�
function goCart_go1(user_id) {
	if(user_id == "") {
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT") {
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
		return;
	}

	var frm = document.mainfrm;

    var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }		

	if(!bPass) {
		alert("��û�Ͻ� ���¸� �����Ͽ� �ֽʽÿ�");
		return;
	}

	window.open('','Go1ClassPop','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=660,height=590');

	frm.action = '/go1_class/lecture/p_cart.asp';
	frm.target = 'Go1ClassPop';
	frm.submit();
}

//��1 ���չ� ���� ü�� ��
function goCart_G1FreeEvent(user_id){
	if(user_id == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
		return;
	}

	var frm = document.mainfrm;
	
    var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }	

	if(!bPass){
		alert("��û�Ͻ� ���¸� �����Ͽ� �ֽʽÿ�");
		return;
	}

	window.open('','G1FreeEventPop','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=660,height=590');

	frm.action = '/go1_class/lecture/p_free_cart.asp';
	frm.target = 'G1FreeEventPop';

	frm.submit();
}

// ���� ���� ��û ���������� ���� üũ �ڽ��� üũ������ ��� ������ �ϰ� �ʹٸ� �� �Լ��� �̿��Ѵ�.
function EndClose(ctrl, chrCode){
	if(chrCode == 1555 || chrCode == 1553 || chrCode == 710 ){
		if(ctrl.checked){
			alert("�����Ͻ� ���´� ���� '�⺻ ���� ��Ű��'�� �ǸŵǴ� ��Ű���� ���ԵǾ� �ֽ��ϴ�.\n\n��Ű�� ���¸� �����Ͻø� ������ ���������� ������ �� �ֽ��ϴ�. ");
		}
	}

	if(chrCode == 1223 || chrCode == 1369){
		if(ctrl.checked){
			alert("�����Ͻ� ���´� ���� 'TMX ��� ���� ���� �ϼ� - Two Packs'�� �ǸŵǴ� ��Ű���� ���ԵǾ� �ֽ��ϴ�.\n\n��Ű�� ���¸� �����Ͻø� ������ ���������� ������ �� �ֽ��ϴ�. ");
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
	if(frm.chrCode.value == "") {alert("��ǰ�ڵ带 �Է��ϼ���"); return;}

/*	var tmp;
	tmp = new String(frm.chrCode.value);
	tmp = tmp.toUpperCase();

	var charexp = new RegExp("/[A-E]\d{4}/");
	if(!charexp.test(tmp))
	{
		alert("�ڵ� ������ Ʋ���ϴ�");
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

//���� ��ñ��� üũ
function goWish_always(user_id){
	if(user_id == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	var frm = document.mainfrm;
	
    var bPass = false;

    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }		
	
	if(!bPass){
		alert("���Ͻ� ���縦 �����Ͽ� �ֽʽÿ�");
		return;
	}
	frm.act_flg.value="1";
	frm.submit();
}

function goCart_always(user_id){
	if(user_id == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
    }
	
	var frm = document.mainfrm;

    var bPass = false;

    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }	

	if(!bPass){
		alert("��û�Ͻ� ���縦 �����Ͽ� �ֽʽÿ�");
		return;
	}
	frm.act_flg.value="2";
	frm.submit();
}

function goDirectPay_always(user_id){
	
	if(user_id == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
    }

    var frm = document.mainfrm;

    var bPass = false;

    if (jQuery('input:checkbox[name="bookChk"]:checked').length > 0) {
        bPass = true;
    }		

	if(!bPass){
		alert("�����Ͻ� ���縦 �����Ͽ� �ֽʽÿ�");
		return;
	}
	frm.act_flg.value="3";
	frm.submit();
}


function goMakeReady(user_id){
  //�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
		return;
	}

	var frm = document.mainfrm;

    var bPass = false;

    if (jQuery('input:checkbox[name="chrChk"]:checked').length > 0) {
        bPass = true;
    }	

	if(!bPass){
		alert("�������� �̿��Ͻ� ���¸� �����Ͽ� �ֽʽÿ�");
		return;
	}

	frm.action = '/cart/cart_basket_make_pre.asp';

	frm.submit();
}


function goWishUnit(user_id){
  if(user_id == ""){
      alert("���� �α����� �Ͻʽÿ�");
      popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
		alert("��û�Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
		return;
	}	
	

	if(!bPass){
		alert("��û�Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
		return;
	}

	frm.action = '/cart/cart_prop_pre.asp';

	frm.submit();
}

function goCartUnit(user_id){
  if(user_id == ""){
      alert("���� �α����� �Ͻʽÿ�");
      popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
		alert("��û�Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
		return;
	}

	frm.action = '/cart/cart_main_pre.asp';

	frm.submit();
}

function goDirectPayUnit(user_id){
  if(user_id == ""){
      alert("���� �α����� �Ͻʽÿ�");
      popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
	    alert("��û�Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
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
		alert(" ������û ������ ���� ������ �ʰ��Ǿ����ϴ�. \n\n �� 5�� ���±����� ��û�� �����մϴ�.");
		return;
	}


	if(!bPass)
	{
		alert("���õ� ���°� �����ϴ�. ���¸� ������ �ּ���.");
		return;
	}

	if (confirm(" ���� ���¸� ���� ��û�� �Ŀ��� \n ������ ����ϰų� �ٸ� ���·� ������ �� �����ϴ�. \n\n ���� ���¸� ��û�Ͻðڽ��ϱ�?")) {
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
			alert("���õ� ���°� �����ϴ�. ���¸� ������ �ּ���.");
			return;
		}
	}else{
        jQuery('input:checkbox[name="chrChk"]').each(function() {
            this.checked = false; //checked ó��
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
		alert(" ������û ������ ���� ������ �ʰ��Ǿ����ϴ�. \n\n �� 5�� ���±����� ��û�� �����մϴ�.");
		return;
	}


	if(!bPass)
	{
		alert("���õ� ���°� �����ϴ�. ���¸� ������ �ּ���.");
		return;
	}

	if (confirm(" ���� ���¸� ���� ��û�� �Ŀ��� \n ������ ����ϰų� �ٸ� ���·� ������ �� �����ϴ�. \n\n ���� ���¸� ��û�Ͻðڽ��ϱ�?")) {
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
	    alert("�α����� ��û�� �ּ���.");
	    popMemberInput("2");
	}else{
		document.location.href = "/Cart/OCT/free_pass_sale.asp";
	}
}
function goPurchaseBig(){
	var uCookie = getCookie("userid");
	if (uCookie == ""){
	    alert("�α����� ��û�� �ּ���.");
	    popMemberInput("2");
	}else{
		alert("���� �� �̿��� �ּ���.");
	}
}
function goFinishBig(){
	alert("�������� �Ϸ�Ǿ����ϴ�.");
}
function goOtherBig(){
	// �̹� �����н� ���α׷� Big�ø�� ������ ȸ��
	alert("�����н� ���α׷��� Big3 �� Big4 �� �Ѱ��� �����Ͻ� �� �ֽ��ϴ�.");
}

// Big345 ���
function goBig345(user_id){

	if(user_id == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
		alert("��û�Ͻ� ���¸� �����Ͽ� �ֽʽÿ�");
		return;
	}
	**/

	/**
	if ((5-parseInt(iCnt)) < parseInt(chkCnt)){
		alert(" ������û ������ ���� ������ �ʰ��Ǿ����ϴ�. \n\n �� 5�� ���±����� ��û�� �����մϴ�.");
		return;
	}


	if(!bPass)
	{
		alert("���õ� ���°� �����ϴ�. ���¸� ������ �ּ���.");
		return;
	}

	if (confirm(" ���� ���¸� ���� ��û�� �Ŀ��� \n ������ ����ϰų� �ٸ� ���·� ������ �� �����ϴ�. \n\n ���� ���¸� ��û�Ͻðڽ��ϱ�?")) {
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

// Big345 ���
function goNonBig345(user_id){

	if(user_id == ""){
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}

	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
		return;
	}

	var frm = document.mainfrm;
	var bPass = false;
	var bSpeedChk = false;


	for (i = 0; i < jQuery('input:checkbox[name="pkgChk"]:checked').length; i++){

	    // Speed �÷��� �߰� -----------------------
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
		alert("��û�Ͻ� ���¸� �����Ͽ� �ֽʽÿ�");
		return;
	}
	**/

	/**
	if ((5-parseInt(iCnt)) < parseInt(chkCnt)){
		alert(" ������û ������ ���� ������ �ʰ��Ǿ����ϴ�. \n\n �� 5�� ���±����� ��û�� �����մϴ�.");
		return;
	}


	if(!bPass)
	{
		alert("���õ� ���°� �����ϴ�. ���¸� ������ �ּ���.");
		return;
	}

	if (confirm(" ���� ���¸� ���� ��û�� �Ŀ��� \n ������ ����ϰų� �ٸ� ���·� ������ �� �����ϴ�. \n\n ���� ���¸� ��û�Ͻðڽ��ϱ�?")) {
		frm.action = '/cart/cart_tg_pre.asp';
		frm.submit();
	}
	**/

	//var winOpt = 'dialogHeight:450px; dialogWidth:650px; leftmargin:30px; marginwidth:30px;dialogTop:'+(screen.height-(screen.availHeight/2)-300)+'px; dialogLeft:'+(screen.width-(screen.availWidth/2)-350)+'px;  center: yes; help: yes; resizable: yes; scroll: yes; status: yes;';
	//sl = window.showModalDialog("choice_goods.asp?","4",winOpt);

	if (bSpeedChk)
	    alert("Speed���´� ���������� ���� �� �����ϴ�.\n�Ϲ� �������� ��ȯ�˴ϴ�.");

	sl = window.open("","review","scrollbars=yes,width=680,height=580,status=yes");
	frm.method = "post";
	frm.target = "review";
	//frm.action = "/lecture/Lec_D/2008_jungsi/popup_list.asp";
	frm.action = "/lecture/Lec_D/20080318_pass/popup_list.asp";

	frm.submit();
	sl.focus();
	frm.target = "";
}
// ���ǵ� *********************************************************************************************************************************
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
        alert("���� �α����� �Ͻʽÿ�");
        popMemberInput("2");
        return;
    }

    //�кθ� ȸ���ΰ�� �޼��� ǥ��
    var uCookie = getCookie("userid");
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
        return;
    }

    var frm = document.mainfrm;

    if (jQuery('input:checkbox[name="chrChk"]').length == 0) {
        return;
    }        

    var bPass = false;
    
    for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {    
        try {
            // Speed �÷��� �߰� -----------------------
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
		alert("���Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
		return false;
	}
	else {

		frm.action = '/cart/cart_prop_pre.asp';
		frm.submit();
	}
}

function goCartSpeed(user_id) {
    if (user_id == "") {
        alert("���� �α����� �Ͻʽÿ�");
        popMemberInput("2");
        return;
    }

    //�кθ� ȸ���ΰ�� �޼��� ǥ��
    var uCookie = getCookie("userid");
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
            // Speed �÷��� �߰� -----------------------

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
		alert("��û�Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
		return false;
	}else {
		frm.action = '/cart/cart_main_pre.asp';
		frm.submit();
	}
}

function goCompareSpeed(user_id) {
	var cnt = 0; // üũ��

	if (user_id == "") {
	    alert("���� �α����� �Ͻʽÿ�");
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
			// Speed �÷��� �߰� -----------------------
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
		alert("���� ���ϱ�� �ּ� 1�� ~ �ִ� 3������ �����մϴ�\n�� �� ���¸� �������ּ���.");
		return;
	}

	if (cnt > 3) {
		alert("���� ���ϱ�� �ּ� 1�� ~ �ִ� 3������ �����մϴ�.");
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
        alert("���� �α����� �Ͻʽÿ�");
        popMemberInput("2");
        return;
    }

    //�кθ� ȸ���ΰ�� �޼��� ǥ��
    var uCookie = getCookie("userid");
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
		alert("�����Ͻ� ���� �Ǵ� ���縦 �����Ͽ� �ֽʽÿ�");
		return false;
	}
	else {
		frm.action = '/cart/cart_direct_pay_pre.asp';
		frm.submit();
	}
}
// *******************************************************************************************************************************************


// 2008 Big �ø��� ***************************************************************************************************************************
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
	    alert("���� �α����� �Ͻʽÿ�");
	    popMemberInput("2");
		return;
	}
	//�кθ� ȸ���ΰ�� �޼��� ǥ��
	var uCookie=getCookie("userid");
	if(uCookie.substring(uCookie.length-6)=="%5FPRT"){
		alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
		return;
	}

	var frm = document.mainfrm;

	try{
		var bPass = false;
		var bSpeedChk = false;

		for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) { 
		    // Speed �÷��� �߰� -----------------------			
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
			alert("Speed���´� ���������� ���� �� �����ϴ�.\n�Ϲ� �������� ��ȯ�˴ϴ�.");

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


//********************���¸�� �޴� ����**************************************************************

	function fncGetContextMenu(){
		var strHtml = "";
		strHtml += '<div class="table_layer_01" style="display:none;position:absolute;text-align: left;z-index:199;background:#FFFFFF;" id="LectureContextMenu">';
		strHtml += '	<ul>';
		//strHtml += '		<li><a href="javascript:fncAddWishList();">��</a></li>';
		strHtml += '		<li><a href="javascript:fncAddCartList();">��ٱ���</a></li>';
		strHtml += '		<li><a href="javascript:fncAddPayList();"><strong>�ٷΰ���</strong></a></li>';
		strHtml += '	</ul>';

		strHtml += '</div>';

		return strHtml;
	}

	var gChkType;//���� Ÿ�� ����(�Ϲ�)-speed_type1 ,speed 30% - speed_type2,speed 10%-speed_type3, ���� - bookChk
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

	//��� Layer �۾�
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
	            strContent += '	<h3>�� [1+1 ��Ű��] ���� ��û �� Ȯ���ϼ���!</h3>';
	            strContent += '	<ul>';
	            strContent += '		<li>- ���Ž 1+1 ��Ű�� �� ���´� �����ϰ� �������� ����, �����Ⱓ�� ����Ұ�.</li>';
	            strContent += '		<li>- �� ���� �Ϻ��� �ٷ� �������� ����</li>';
	            strContent += '		<li>- ������, ���ͳ� ������ü, �ſ�ī��, �ڵ���, �ް�ĳ���� ���� �����ϸ� ���ʽ�ĳ��, �̺�Ʈĳ��,<br>&nbsp;&nbsp;&nbsp;���α� ������ ������ �� �����ϴ�.</li>';
	            strContent += '		<li>- ȯ���� �����Ϸκ��� 10�� �̳��� �����ؾ� �ϸ�, ȯ�� �� �ݵ�� ���縦 �ݼ��ؾ� ��.</li>';
	            strContent += '		<li>- �� �ڼ��� ������ 1+1 ��Ű�� ���������� Ȯ���Ͻñ� �ٶ��ϴ�.</li>';
	            strContent += '	</ul>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="�ݱ�" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        if (pKbn == 2) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<h3>�� [��Ž ���̳� 1+1+1 ��Ű��] ���� ��û �� Ȯ���ϼ���!</h3>';
	            strContent += '	<ul>';
	            strContent += '		<li>- ��Ž ���̳� 1+1+1 ��Ű�� �� ���´� �����ϰ� �������� ����, �����Ⱓ�� ����Ұ�.</li>';
	            strContent += '		<li>- �� ���� �Ϻ��� �ٷ� �������� ����</li>';
	            strContent += '		<li>- ������, ���ͳ� ������ü, �ſ�ī��, �ڵ���, �ް�ĳ���� ���� �����ϸ� ���ʽ�ĳ��, �̺�Ʈĳ��,<br>&nbsp;&nbsp;&nbsp;���α� ������ ������ �� �����ϴ�.</li>';
	            strContent += '		<li>- ȯ���� �����Ϸκ��� 10�� �̳��� �����ؾ� �ϸ�, ȯ�� �� �ݵ�� ���縦 �ݼ��ؾ� ��.</li>';
	            strContent += '		<li>- �� �ڼ��� ������ ��Ž ���̳� 1+1+1 ��Ű�� ���������� Ȯ���Ͻñ� �ٶ��ϴ�.</li>';
	            strContent += '	</ul>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="�ݱ�" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        if (pKbn == 4) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<h3>�� [��� ���� ��Ű��] ���� ��û �� Ȯ���ϼ���!</h3>';
	            strContent += '	<ul>';
	            strContent += '		<li>- ��� ���� ��Ű�� �� ���´� �����ϰ� �������� �����Ͽ� �����Ⱓ ������ �Ұ��մϴ�.</li>';
	            strContent += '		<li>- ���� �����Ϻ��� �ٷ� ���� �������� �����˴ϴ�.</li>';
	            strContent += '		<li>- ������, ���ͳ� ������ü, �ſ�ī��, �ڵ���, �ް�ĳ���� ���� �����ϸ� ���ʽ�ĳ��, �̺�Ʈĳ��,<br>&nbsp;&nbsp;&nbsp;���α� ������ ������ �� �����ϴ�.</li>';
	            strContent += '		<li>- ȯ���� �����Ϸκ��� 10�� �̳��� �����ؾ� �ϸ�, ȯ�ҽ� �ݵ�� ���縦 �ݼ��ؾ� �մϴ�.</li>';
	            strContent += '		<li>- �� �ڼ��� ������ ��� ���� ��Ű�� ���������� Ȯ���Ͻñ� �ٶ��ϴ�.</li>';
	            strContent += '	</ul>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="�ݱ�" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        if (pKbn == 5) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<h3>�� [1+1 ���̳� ��Ű��] ���� ��û �� Ȯ���ϼ���!</h3>';
	            strContent += '	<ul>';
	            strContent += '		<li>- ���Ž 1+1 ���̳� ��Ű�� �� ���´� �����ϰ� �������� ����, �����Ⱓ�� ����Ұ�.</li>';
	            strContent += '		<li>- �� ���� �Ϻ��� �ٷ� �������� ����</li>';
	            strContent += '		<li>- ������, ���ͳ� ������ü, �ſ�ī��, �ڵ���, �ް�ĳ���� ���� �����ϸ� ���ʽ�ĳ��, �̺�Ʈĳ��,<br>&nbsp;&nbsp;&nbsp;���α� ������ ������ �� �����ϴ�.</li>';
	            strContent += '		<li>- ȯ���� �����Ϸκ��� 10�� �̳��� �����ؾ� �ϸ�, ȯ�� �� �ݵ�� ���縦 �ݼ��ؾ� ��.</li>';
	            strContent += '		<li>- �� �ڼ��� ������ 1+1 ���̳� ��Ű�� ���������� Ȯ���Ͻñ� �ٶ��ϴ�.</li>';
	            strContent += '	</ul>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="�ݱ�" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        if (pKbn == 6) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<h3>�� [��� Final ��Ű��] ���� ��û �� Ȯ���ϼ���!</h3>';
	            strContent += '	<ul>';
	            strContent += '		<li>- ��� Final ��Ű�� �� ���´� �����ϰ� �������� �����Ͽ� �����Ⱓ ����, �Ͻ����� �̿��� �Ұ��մϴ�.</li>';
	            strContent += '		<li>- ���� �����Ϻ��� �ٷ� ���� �������� �����˴ϴ�.</li>';
	            strContent += '		<li>- ������, ���ͳ� ������ü, �ſ�ī��, �ڵ���, �ް�ĳ���� ���� �����ϸ� ���ʽ�ĳ��, �̺�Ʈĳ��,<br>&nbsp;&nbsp;&nbsp;���α� ������ ������ �� �����ϴ�.</li>';
	            strContent += '		<li>- ȯ���� �����Ϸκ��� 10�� �̳��� �����ؾ� �ϸ�, ȯ�ҽ� �ݵ�� ���縦 �ݼ��ؾ� �մϴ�.</li>';
	            strContent += '		<li>- �� �ڼ��� ������ ��� Final ��Ű�� ���������� Ȯ���Ͻñ� �ٶ��ϴ�.</li>';
	            strContent += '	</ul>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="�ݱ�" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        if (pKbn == 7) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<h3>�� [�ܱ��� ���̳� ��Ű��] ���� ��û �� Ȯ���ϼ���!</h3>';
	            strContent += '	<ul>';
	            strContent += '		<li>- �ܱ��� ���̳� ��Ű�� �� ���´� �����ϰ� �������� �����Ͽ� �����Ⱓ ����, �Ͻ����� �̿���<br>&nbsp;&nbsp;&nbsp;�Ұ��մϴ�.</li>';
	            strContent += '		<li>- ���� �����Ϻ��� �ٷ� ���� �������� �����˴ϴ�.</li>';
	            strContent += '		<li>- ������, ���ͳ� ������ü, �ſ�ī��, �ڵ���, �ް�ĳ���� ���� �����ϸ� ���ʽ�ĳ��, �̺�Ʈĳ��,<br>&nbsp;&nbsp;&nbsp;���α� ������ ������ �� �����ϴ�.</li>';
	            strContent += '		<li>- ȯ���� �����Ϸκ��� 10�� �̳��� �����ؾ� �ϸ�, ȯ�ҽ� �ݵ�� ���縦 �ݼ��ؾ� �մϴ�.</li>';
	            strContent += '		<li>- �� �ڼ��� ������ �ܱ��� ���̳� ��Ű�� ���������� Ȯ���Ͻñ� �ٶ��ϴ�.</li>';
	            strContent += '	</ul>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="�ݱ�" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

			if (pKbn == 96) {
	            strContent += '<div class="notice_layer_inner">';
				strContent += '	<div>';
	            strContent += '	<ul>';
	            strContent += '		<li>&nbsp;</li>';
	            strContent += '	</ul>';
				strContent += '	<ul>';
				strContent += '		<li>�ݼ����� ������ �� �ִ� �ݼ����� ��ǰ����<br><font color=red>1999�� 3�� ���� ��� ȸ���� ���� ���� �մϴ�.</font></li>';
	            strContent += '	</ul>';
	            strContent += '	<ul>';
	            strContent += '		<li>&nbsp;</li>';
	            strContent += '	</ul>';
				strContent += '	<ul>';
				strContent += '		<li><a href="/lecmain/mains/2017/0614_half/main.asp"><u>�ݼ� SPPED �ڼ��� ���� ></u></a><br><br></li>';
	            strContent += '	</ul>';
	            strContent += '	</div>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="�ݱ�" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        if (pKbn == 97) {
	            strContent += '<div class="notice_layer_inner">';
	            strContent += '	<div>';
	            strContent += '	<ul>';
	            strContent += '		<li>- ���� 9��~���� 5�ñ����� ������ �� �ִ� ��������� ���� ��ǰ����<br>&nbsp;&nbsp;&nbsp;1997�� 2�� ���� ��� ȸ���� ���� �����մϴ�.</li>';
	            strContent += '	</ul>';
	            strContent += '	<ul>';
	            strContent += '		<li>- <font color=red>������� 0917 �ܰ� ���´� �������� �佺Ƽ�� ����(���� ����)�� �������� �ʽ��ϴ�.</font></li>';
	            strContent += '	</ul>';
	            strContent += '	<ul>';
	            strContent += '		<li>- <a href="/lecmain/mains/2015/0226_time/main.asp"><u>������� ���Ÿ�� 0917 �ڼ������� ></u></a><br><br></li>';
	            strContent += '	</ul>';
	            strContent += '	</div>';
	            strContent += '	<img class="btn" src="http://img.megastudy.net/lecture/common/detail_2011/bt_notice_layer_close.gif" alt="�ݱ�" style="cursor:pointer;" onClick="fncAlertCencel();" />';
	            strContent += '</div>';
	        }

	        Obj.html(strContent);

	        var targetPosition = jQuery(pTarget).offset();

	        //��ġ����
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

	//���ϱ� ��ٱ��� �Ķ���� ����
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

		//�α��� �� ������ & �ް�pass ���� Ȯ��..
		var requestUrl = "/lecmain/common/chr/lec_pass_chk_ax.asp?jsoncallback=?";

		jQuery.getJSON(requestUrl,function(data){

			jQuery.each(data,function(index,entry){
				gUid = entry["userid"];
			});
		});
	}

	//���ϱ�
	function fncAddWishList(){

		if(gUid ==""){
		    alert("�α��� �� �̿� �����մϴ�");
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

	//��ٱ���
	function fncAddCartList(){
		if(gUid ==""){
		    alert("�α��� �� �̿� �����մϴ�");
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

	//�ٷ� ����
	function fncAddPayList(){
		if(gUid ==""){
		    alert("�α��� �� �̿� �����մϴ�");
		    fncShowLogin();
			return;
		}
		goDirectPaySpeed();
	}

	//confirm Layer �۾�
	var ConfirmLayerLeft = 0;
	var ConfirmLayerTop = 0;

	function fncSetConfirmLayer(pKbn){


		//���ϱ�
		var strTitle = "�ش� ���¸� <strong>��</strong> �ϼ̽��ϴ�.";
		var strConfirmMsg = "���� '���� ����'���� �̵��Ͻðڽ��ϱ�?";
		var locationUrl = "/Mypage/cart_new/cart_wish_list.asp?mOne=pico3&mTwo=32";

		//��ٱ���
		if(pKbn == "2"){
			strTitle = "�ش� ���°� <strong>��ٱ���</strong>�� �����ϴ�.";
			strConfirmMsg = "���� '���� ��ٱ���'�� �̵��Ͻðڽ��ϱ�?";
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
		strContent += ' 			<a href="'+locationUrl+'"><img src="http://img.megastudy.net/common/board_2011/btn/b_yes.gif" alt="��" /></a> ';
		strContent += ' 			<a href="javascript:fncConfirmCencel();"><img src="http://img.megastudy.net/common/board_2011/btn/b_no.gif" alt="�ƴϿ�" /></a> ';
		strContent += ' 		</div> ';
		strContent += ' 	</div> ';

		var Obj = jQuery("#LectureConfirmLayer");
		if(Obj.length == 0) {
		//	jQuery("#list_b").append(strHtml);
			jQuery("body").eq(0).append(strHtml);
			fncSetConfirmLayer(pKbn);
			return;
		}
		//��ġ����
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

	// ������ ���̾� �۾�
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

	// ������ ���̾� �ݱ�
	function fncChrFreeMovContentClose() {
	    try { jQuery("#divFreeMoveArea").remove(); } catch (e) { }
	}



	//SUPERƯ���̶� ���̾� ���� 2015-06-09
	function fncGetSuperLayer(dcd){
	    var strHtml = "";
	    
	    strHtml += '<div class="table_layer_03" style="display:block;z-index:1000;text-align:left;"  id="LectureSuperLayer"> ';
        if(dcd == "1"){
	        strHtml += '	<h3>���� SUPERƯ���̶�?</h3> ';
	        strHtml += '	<div class="contents"  id="LectureSuperContents">���� 1��� �޼��� ���� �ʿ��� <span style="color:#0000ff;">���پ��� ����, ���� �н� �ܰ躰�� ���¸� �� �ϳ��� Ư�� ������ ����</span><br/> SUPERƯ�� �ϳ��� �����ϸ� 1��� �ϼ��� �ʿ��� �Ϻ� �н� ����!</div> ';
        } else if (dcd == "3"){
	        strHtml += '	<h3>��ȸ SUPERƯ���̶�?</h3> ';
	        strHtml += '	<div class="contents"  id="LectureSuperContents">���� 1��� �޼��� ���� �ʿ��� <span style="color:#0000ff;">������+����Ǯ��+���̳Ρ����¸� �� �ϳ��� Ư�� ������ ����</span><br/> SUPERƯ�� �ϳ��� �����ϸ� 1��� �ϼ��� �ʿ��� �Ϻ� �н� ����!</div> ';
        } else if (dcd == "4") {
            strHtml += '	<h3>���� SUPERƯ���̶�?</h3> ';
            strHtml += '	<div class="contents"  id="LectureSuperContents">���� 1��� �޼��� ���� �ʿ��� <span style="color:#0000ff;">������+����Ǯ��+���̳Ρ����¸� �� �ϳ��� Ư�� ������ ����</span><br/> SUPERƯ�� �ϳ��� �����ϸ� 1��� �ϼ��� �ʿ��� �Ϻ� �н� ����!</div> ';
        } else if (dcd == "6"){
	        strHtml += '	<h3>��2�ܱ��� SUPERƯ���̶�?</h3> ';
	        strHtml += '	<div class="contents"  id="LectureSuperContents">���� 1��� �޼��� ���� �ʿ��� <span style="color:#0000ff;">������+����Ǯ��+���̳Ρ����¸� �� �ϳ��� Ư�� ������ ����</span><br/> SUPERƯ�� �ϳ��� �����ϸ� 1��� �ϼ��� �ʿ��� �Ϻ� �н� ����!</div> ';
        } else if (dcd == "8") {
            strHtml += '	<h3>��� SUPERƯ���̶�?</h3> ';
            strHtml += '	<div class="contents"  id="LectureSuperContents">2017 ��� �հ��� ���� �ʿ��� <span style="color:#0000ff;">������+��ȭ+���̳Ρ� ���¸� �� �ϳ��� Ư�� ������ ����</span><br/> SUPERƯ�� �ϳ��� �����ϸ� ��� �հݿ� �ʿ��� �Ϻ� �н� ����!</div> ';
        } else if (dcd == "9") {
	        strHtml += '	<h3>�ѱ��� SUPERƯ���̶�?</h3> ';
	        strHtml += '	<div class="contents"  id="LectureSuperContents">���� 1��� �޼��� ���� �ʿ��� <span style="color:#0000ff;">������+����Ǯ��+���̳Ρ����¸� �� �ϳ��� Ư�� ������ ����</span><br/> SUPERƯ�� �ϳ��� �����ϸ� 1��� �ϼ��� �ʿ��� �Ϻ� �н� ����!</div> ';
        }

		strHtml += '	<span class="close_btn"><img src="http://img.megastudy.net/common/board_2011/btn/b_layer_close.gif" alt="�ݱ�" onclick="fncLecSuperContentClose();"/></span>  ';
		strHtml += '	</div>';
		return strHtml;
	}

	//���� Ư¡ ���̾� ����
	function fncGetLecDescLayer(){

	    var strHtml = "";

	    strHtml += '<div class="table_layer_03" style="display:block;z-index:1000;text-align:left;"  id="LectureDescLayer"> ';
		strHtml += '	<h3>���� �� Ư¡</h3> ';
		strHtml += '	<div class="contents"  id="LectureDescContents"></div> ';
		strHtml += '	<span class="close_btn"><img src="http://img.megastudy.net/common/board_2011/btn/b_layer_close.gif" alt="�ݱ�" onclick="fncLecDescContentClose();"/></span>  ';
		strHtml += '	</div>';
		return strHtml;
	}

	//SUPERƯ���̶� ���̾� �۾� 2015-06-09
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

	//���� Ư¡ ���̾� �۾�
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

	//���� Ư¡ ���̾� �۾� (��Ű����)
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
		//pFlg 1 : ���¸�� ��Ƽ��_��ư
		//pFlg 2 : ���¸�� ��Ƽ��_���
		//pFlg 3 : ����Ư¡ ��ư
		//pFlg 4 : ������ ��ư
		var cUrl = location.href;
		cUrl = cUrl.toLowerCase();

		var strLog = "";
		//��1 ���� �н����� �б� ������ ����
		if(cUrl.indexOf("/lec_r/2009/school_test_list.asp") > 0 || cUrl.indexOf("/lec_r/2009/su_basic_list.asp") > 0 ){
			strLog += "/��1/�����н�����"
		}

		//��2 ���� �н����� �б� ������ ����
		if(cUrl.indexOf("/lec_n/2009/school_test_list.asp") > 0 || cUrl.indexOf("/lec_n/2009/su_basic_list.asp") > 0 ){
			strLog += "/��2/�����н�����"
		}

		//��3 �н��ܰ躰 ��õ����
		if(cUrl.indexOf("/lec_s/lecture_list.asp") > 0 || cUrl.indexOf("/lec_s/2007/lecture_list_go_total.asp") > 0 ){
			strLog += "/��3/�н��ܰ躰 ��õ����"
		}

		if(strLog != ""){
			if(pFlg == "1") strLog += "/���¸�� ��Ƽ��_��ư";
			if(pFlg == "2") strLog += "/���¸�� ��Ƽ��_���";
			if(pFlg == "3") strLog += "/����Ư¡_��ư";
			if(pFlg == "4") strLog += "/������_��ư";

			try{logerClickTrace( 'EVT',strLog);
				}catch(e){}
		}
	}
//********************���¸�� �޴� ����**************************************************************

// How to Study ***************************************************************************************************************************
function fnHowToStudyMsg(t,s) {
	if (jQuery(t).is(':checked')) {
		jQuery(t).attr({ 'checked': false });
	}
	switch(s) {
		case(1031) :
			alert('Final ���� �������� �����Ͻ� �� �ֽ��ϴ�.');
		break;
		default :
		    alert('�α����� ���� �Ͻʽÿ�.');
		    popMemberInput("2");
		break;
	}
}
// ****************************************************************************************************************************************

function fncChrFpIconViewYn(idx,chr,ssCd) {
    var OpenYn = "N";   // ���¿��� : �⺻�� �����ִ� ����
    if (jQuery("#btnChrFpIcon_" + chr + idx).attr('src').indexOf("icon_new_mylec_on.gif") > -1) OpenYn = "Y"; // �����ִ� ����

    if (OpenYn == "Y") {
        jQuery("#btnChrFpIcon_" + chr + idx).attr('src', jQuery("#btnChrFpIcon_" + chr + idx).attr('src').replace("icon_new_mylec_on.gif", "icon_new_mylec.gif"));   // ��ư �̹��� �����ϼ���.
        jQuery("#dvChrFpIcon_" + chr + idx).hide(); // ���������� ��������.
    }

    if (OpenYn == "N") {
        //jQuery("#btnChrFpIcon_" + chr).attr('src', jQuery("#btnChrFpIcon_" + chr).attr('src').replace("icon_new_mylec.gif", "icon_new_mylec_on.gif"));  // ��ư �̹��� �����ϼ���.
        //jQuery("#dvChrFpIcon_" + chr).show(); // ���������� ������.
        jQuery("#dvChrFpIcon_" + chr + idx).load("/lecmain/Common/chr/divChrFpIconList_Ax.Asp?chr_cd=" + chr + "&ssCd=" + ssCd + "&idx=" + idx);    // �ش� ���������� �α��� üũ �Ŀ� ��ư, ���� ó��
    }
}

//********************�Ž¹� ���� ����ó�� �Լ�**************************************************************
function fnc_high_math_book(t,chr_cd,book_cd){
	if(chr_cd=="27532"){
		if (jQuery(t).is(':checked')) {
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("1");
		}else{
			jQuery("#high_math_"+book_cd+"_"+chr_cd).val("");
		}

		if(jQuery("#high_math_7521_"+chr_cd).val()!="" && jQuery("#high_math_8019_"+chr_cd).val()!=""){
			jQuery(t).attr({ 'checked': false });
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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
			alert("�ش� ���¿� ���Ե� ���� 2�� �� 1�Ǹ� ������ �� �ֽ��ϴ�.");
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

		//�кθ� ȸ���ΰ�� �޼��� ǥ��
		var uCookie = getCookie("userid");
		if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
			alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
			return;
		}
		var frm = document.mainfrm;
		if (frm.chrChk == undefined) return;

		var veri = frm.chrChk[0];
		var bPass = false;

		jQuery("input:checkbox[name='chrChk']").attr("checked", false);

		for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {
			try {

				// Speed �÷��� �߰� -----------------------

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
			alert("���� ��û�� ���¸� �������ּ���.");
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
				alert("�α��� �� �̿�ٶ��ϴ�.");
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="2"){
				alert("���õ� ���°� �����ϴ�.");			
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="3" || msgFlg=="-9"){
				alert("���� �� �̿�ٶ��ϴ�.");
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="4"){
				alert("������û�Ⱓ�� ����ƽ��ϴ�.");			
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="5" || msgFlg=="-2"){
				alert("��� ������ ���¼��� �ʰ� �Ǿ����ϴ�.");				
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="99"){
				alert("������ ���� �Ǵ� ���� ���(������, ARS ���� ��) �����Դϴ�.\n\n�ֹ�/���� ������ Ȯ���ϼ���.");
				PassBtndoubleSubmitFlag = false;
			}else{

				if (RegChrCnt=="0"){

					if (stdChrNmFlg=="Y" && bankChrNmFlg=="N" && noRegChrNmFlg=="N"){
						if(confirm("�������� �����Դϴ�. �� ���ǽǷ� �̵��Ͻðڽ��ϱ�?\n(�ؼ��� ���� ���¿� ���� ���, ���� ó���� ������ �� �ֽ��ϴ�. '���� ����'�� Ȯ���ϼ���.)")){
							document.location.href = "/Mypage/mp_2017/myinfo/my_std_room/main.asp?move_tab=2";
						}
						PassBtndoubleSubmitFlag = false;
					}else{
						if(regPassNm!="undefined"){
							totMsg="�����Ͻ� ���� �� " + regPassNm +"�� ���� �� �� ���� ���°� �ֽ��ϴ�.\n\n���� �� ���� ���� Ȯ�� ��, �̿��� ��Ź �帳�ϴ�\n\n";
						}else{
							totMsg="�����Ͻ� ���� �� ���� �� �� ���� ���°� �ֽ��ϴ�.\n\n���� �� ���� ���� Ȯ�� ��, �̿��� ��Ź �帳�ϴ�\n\n";
						}

						if (stdChrNmFlg=="Y"){
							totMsg=totMsg+"�� �������� ���� ��\n" + stdChrNm;
						}
						
						if (bankChrNmFlg=="Y"){
							totMsg=totMsg+"�� ���� ��� ����(������, ARS �Աݴ��) ��\n" + bankChrNm;
						}

						if (noRegChrNmFlg=="Y"){
							totMsg=totMsg+"�� ������û ��� ���� ���� ��\n" + noRegChrNm;
						}

						alert(totMsg);
						PassBtndoubleSubmitFlag = false;
					}

				}else{

					if (stdChrNmFlg=="N" && bankChrNmFlg=="N" && noRegChrNmFlg=="N"){
						totMsg="������û�� ���������� �Ϸ�Ǿ����ϴ�.\n�� ���ǽǷ� �̵��Ͻðڽ��ϱ�?"
					}else{

						if(regPassNm!="undefined"){
							totMsg="�����Ͻ� ���� �� " + regPassNm +"�� ���� �� �� ���� ���°� �ֽ��ϴ�.\n�ش� ���� ���� �� ���� ��û �Ǿ����ϴ�.\n\n�� ���ǽǷ� �̵��Ͻðڽ��ϱ�?\n\n";
						}else{
							totMsg="�����Ͻ� ���� �� ���� �� �� ���� ���°� �ֽ��ϴ�.\n�ش� ���� ���� �� ���� ��û �Ǿ����ϴ�.\n\n�� ���ǽǷ� �̵��Ͻðڽ��ϱ�?\n\n";
						}

						if(stdChrNmFlg=="Y"){
							totMsg=totMsg+"�� �������� ���� ��\n" + stdChrNm;
						}

						if(bankChrNmFlg=="Y"){
							totMsg=totMsg+"�� ���� ��� ����(������, ARS �Աݴ��) ��\n" + bankChrNm;
						}

						if(noRegChrNmFlg=="Y"){
							totMsg=totMsg+"�� ������û ��� ���� ���� ��\n" + noRegChrNm;
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
		alert("ó���� �Դϴ�.");
	}



	/*
    jQuery.post("/MyPage/mp_2017/pass/Leture_Pass_Input.Asp?req_no=" + req_no, { chrChk: chrList }).done(function (data) {
        if (data == "") {
            if (confirm("������û�� ���������� �Ϸ�Ǿ����ϴ�.\n\n�� ���ǽǷ� �̵��Ͻðڽ��ϱ�?")) {
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

    //�кθ� ȸ���ΰ�� �޼��� ǥ��
    var uCookie = getCookie("userid");
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
        return;
    }
    var frm = document.mainfrm;
    if (frm.chrChk == undefined) return;

    var veri = frm.chrChk[0];
    var bPass = false;


	jQuery("input:checkbox[name='chrChk']").attr("checked", false);

    
    for (i = 0; i < jQuery('input:checkbox[name="chrChk"]').length; i++) {
        try {

            // Speed �÷��� �߰� -----------------------

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
        alert("���� ��û�� ���¸� �������ּ���.");
        return;
    }

    
    var windowW = 450;  // â�� ���� ����
    var windowH = 370;  // â�� ���� ����
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




	
//�밭��,���������� �������
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
			if(obj){		// ���̰� ����ó�� 20190722 CHOIJH
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
				alert("�α��� �� ��û�� �ּ���.");
				fncShowLogin('2');
				return false;
			}else if(data=="2"){
				alert("��û�Ͻ� ���¸� ������ �ּ���.");
				return false;
			}else if(data=="3"){
				alert("�̹� ��û�ϼ̽��ϴ�.");
				return false;
			}else if(data=="4"){
				if (confirm('���������� ��û�Ǿ����ϴ�.\n���� �� ���ǽǷ� �̵��Ͻðڽ��ϱ�?')) {
					location.href = '/Mypage/mp_2017/myinfo/my_std_room/main.asp?move_tab=2';
				}
			}
		}
	);
}



function fncMyPassShowPopNew(chrCd,chrDtlFlg) {
    //�кθ� ȸ���ΰ�� �޼��� ǥ��
    var uCookie = getCookie("userid");
    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
        return;
    }

	if (chrDtlFlg=="Y"){	
		if(jQuery("input:checkbox[name='selStdType']:checked").length==0){
			alert("�����Ͻ� ���¸� �������ּ���.");
			return false;
		}
	}

	var frm = document.mainfrm;	
        
    var windowW = 450;  // â�� ���� ����
    var windowH = 370;  // â�� ���� ����
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

    //�кθ� ȸ���ΰ�� �޼��� ǥ��
    var uCookie = getCookie("userid");

    if (uCookie.substring(uCookie.length - 6) == "%5FPRT") {
        alert("�кθ� ȸ���� ���Ű� �Ұ����մϴ�.");
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
		alert("���� ��û�� ���¸� �������ּ���.");
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
				alert("�α��� �� �̿�ٶ��ϴ�.");
				fncShowLogin('2');
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="2"){
				alert("���õ� ���°� �����ϴ�.");			
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="3" || msgFlg=="-9"){
				alert("���� �� �̿�ٶ��ϴ�.");
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="4"){
				alert("������û�Ⱓ�� ����ƽ��ϴ�.");			
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="5" || msgFlg=="-2"){
				alert("��� ������ ���¼��� �ʰ� �Ǿ����ϴ�.");				
				PassBtndoubleSubmitFlag = false;
			}else if(msgFlg=="99"){
				alert("������ ���� �Ǵ� ���� ���(������, ARS ���� ��) �����Դϴ�.\n\n�ֹ�/���� ������ Ȯ���ϼ���.");
				PassBtndoubleSubmitFlag = false;
			}else{

				if (RegChrCnt=="0"){

					if (stdChrNmFlg=="Y" && bankChrNmFlg=="N" && noRegChrNmFlg=="N"){
						if(confirm("�������� �����Դϴ�. �� ���ǽǷ� �̵��Ͻðڽ��ϱ�?\n(�ؼ��� ���� ���¿� ���� ���, ���� ó���� ������ �� �ֽ��ϴ�. '���� ����'�� Ȯ���ϼ���.)")){
							document.location.href = "/Mypage/mp_2017/myinfo/my_std_room/main.asp?move_tab=2";
						}
						PassBtndoubleSubmitFlag = false;
					}else{

						totMsg="�����Ͻ� ���� �� " + regPassNm +"�� ���� �� �� ���� ���°� �ֽ��ϴ�.\n\n���� �� ���� ���� Ȯ�� ��, �̿��� ��Ź �帳�ϴ�\n\n";

						if (stdChrNmFlg=="Y"){
							totMsg=totMsg+"�� �������� ���� ��\n" + stdChrNm;
						}
						
						if (bankChrNmFlg=="Y"){
							totMsg=totMsg+"�� ���� ��� ����(������, ARS �Աݴ��) ��\n" + bankChrNm;
						}

						if (noRegChrNmFlg=="Y"){
							totMsg=totMsg+"�� ������û ��� ���� ���� ��\n" + noRegChrNm;
						}

						alert(totMsg);
						PassBtndoubleSubmitFlag = false;
					}

				}else{

					if (stdChrNmFlg=="N" && bankChrNmFlg=="N" && noRegChrNmFlg=="N"){
						totMsg="������û�� ���������� �Ϸ�Ǿ����ϴ�.\n�� ���ǽǷ� �̵��Ͻðڽ��ϱ�?"
					}else{

						totMsg="�����Ͻ� ���� �� " + regPassNm +"�� ���� �� �� ���� ���°� �ֽ��ϴ�.\n�ش� ���� ���� �� ���� ��û �Ǿ����ϴ�.\n\n�� ���ǽǷ� �̵��Ͻðڽ��ϱ�?\n\n";

						if(stdChrNmFlg=="Y"){
							totMsg=totMsg+"�� �������� ���� ��\n" + stdChrNm;
						}

						if(bankChrNmFlg=="Y"){
							totMsg=totMsg+"�� ���� ��� ����(������, ARS �Աݴ��) ��\n" + bankChrNm;
						}

						if(noRegChrNmFlg=="Y"){
							totMsg=totMsg+"�� ������û ��� ���� ���� ��\n" + noRegChrNm;
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
		defaultMsg="��ٱ��Ͽ� �����ϴ�.\n��ٱ��Ϸ� �̵��Ͻðڽ��ϱ�?\n\n(��� ���³� ���縦 ã���÷��� ��� ��ư�� Ŭ�����ּ���.)\n\n";
	}else{
		defaultMsg="��ٱ��Ͽ� �����ϴ�.\n�ֹ������� �̵��Ͻðڽ��ϱ�?\n\n(��� ���³� ���縦 ã���÷��� ��� ��ư�� Ŭ�����ּ���.)\n\n";
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
		alert("�����Ͻ� ���� �Ǵ� ���縦 �������ּ���.");
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
				alert("�α��� �� �̿� �����մϴ�.");
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

	var defaultMsg="�����Ͻ� ��ǰ�� ��ٱ��Ͽ� �����ϴ�.\n\n";
	

	var selStoreCd=jQuery("#mySelStoreCd").val();

	if (selStoreCd==""){
		alert("�ٷ��Ⱦ� ���� ������ ������ �ּ���.");
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
		alert("������ ��ǰ�� �������ּ���.");
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
				alert("�α��� �� �̿� �����մϴ�.");
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
		defaultMsg="��ٱ��Ͽ� �����ϴ�.\n��ٱ��Ϸ� �̵��Ͻðڽ��ϱ�?\n\n(��� ���³� ���縦 ã���÷��� ��� ��ư�� Ŭ�����ּ���.)\n\n";
	}else{
		defaultMsg="��ٱ��Ͽ� �����ϴ�.\n�ֹ������� �̵��Ͻðڽ��ϱ�?\n\n(��� ���³� ���縦 ã���÷��� ��� ��ư�� Ŭ�����ּ���.)\n\n";
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
		alert("�����Ͻ� ��Ű�� �Ǵ� ���縦 �������ּ���.");
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
				alert("�α��� �� �̿� �����մϴ�.");
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
		//��ٱ��� �н� ���� ��ư ó��
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
			case "1": alert("�α��� �� �̿� �����մϴ�.");fncShowLogin(); break;
			case "2": alert('���� �Ⱓ ������ �Ϸ�Ǿ����ϴ�.\n������ ��ONE-STOP ���� ��û�� ���������� ������ �����Ͻ� �� �־��!');
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
