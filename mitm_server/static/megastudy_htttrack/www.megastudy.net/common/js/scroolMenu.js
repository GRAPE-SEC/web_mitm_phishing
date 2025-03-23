/*
'=======================================================================
'�� �� �� : �ް����͵�-common
'����� : �ް����͵� ��ũ�� �޴� js ����
'�� �� �� : scroolMenu.js
'�ۼ����� : 2004/11/10
'�� �� �� : �迵��
'-----------------------------------------------------------------------
'��������   ������  ��������
'=======================================================================
'
'=======================================================================
*/

var stmnLEFT = 868; // ��ũ�Ѹ޴��� ���� ��ġ. �ʿ� ���� ��� ����
var stmnGAP1 = 228 // ������ ����κ��� ���� (�̺��� ���δ� �ö��� ����) : �˻��� ���� 111 (41����)
//var stmnGAP2 = 10; // ��ũ�ѽ� ������ ��ܰ� �ణ ���. �ʿ������ 0���� ����
var stmnGAP2 =  10; // ��ũ�ѽ� ������ ��ܰ� �ణ ���. �ʿ������ 0���� ����
var stmnBASE = 200; // ��ũ�Ѹ޴� �ʱ� ������ġ (�ƹ����Գ� �ص� ����� ������ stmnGAP1�� �ణ ���̸� �ִ°� ���� ����)
var stmnActivateSpeed = 100; // �������� �����ϴ� �ӵ� (���ڰ� Ŭ���� �ʰ� �˾�����)
var stmnScrollSpeed = 10; // ��ũ�ѵǴ� �ӵ� (Ŭ���� �ʰ� ������)

var stmnTimer;

// ��ũ�� �޴��� ��ġ ����
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

// �޴� ON/OFF �ϱ�
function ToggleAnimate()
{
		if (ANIMATE.checked) {	// �̵��ϱ� ��ư�� üũ�Ǿ��ٸ�
		        RefreshStaticMenu(); // �޴���ġ�� �ٽ� ����
                scrCookie("ANIMATE", "true", 1, 1); // �̵��� ON ���¶�� ��Ű�� ����
				document.getElementById("STATICMENU").style.position = "absolute";
       }
        else {	// �ƴ϶��... (�̵��ϱ� ��ư�� üũ�Ǿ� ���� ������)
                clearTimeout(stmnTimer); // �̵��� Ÿ�̸� ����
                STATICMENU.style.top = stmnGAP1; // �޴��� ��ġ�� ������� �ű��.
                scrCookie("ANIMATE", "false", 1, 1); // �̵��� ON ���¶�� ��Ű�� ����
        }
}

// �޴� �ʱ�ȭ
function InitializeStaticMenu()
{
	try{
			if (RedCookie("ANIMATE", 1) == "true") {	// �̵� on ���¶��
					ANIMATE.checked = true; // üũǥ�ø� �ϰ�
					STATICMENU.style.top = Math.max(document.documentElement.scrollTop,document.body.scrollTop) + stmnBASE; // �⺻��ġ�� �̵��Ѵ�.
					RefreshStaticMenu(); // ��ũ��Ʈ ����
			}
			else {	// �̵����°� off ���¶��
					ANIMATE.checked = false; // üũǥ�ø� �����
					STATICMENU.style.top = Math.max(document.documentElement.scrollTop,document.body.scrollTop) + stmnGAP1; // �� ���� �鷯 �ٴ´�.
			}

			//STATICMENU.style.left = stmnLEFT; // �޴� ���� ��ġ �ʱ�ȭ. �ʿ���� ��� ����

	}catch(e){}
}


// ��Ű �б�
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

//��Ű ��Ʈ
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

// ��ũ�� �޴��� ��ġ ����
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

// �޴� ON/OFF �ϱ�
function ToggleAnimate1()
{
        if (ANIMATE1.checked) {		// �̵��ϱ� ��ư�� üũ�Ǿ��ٸ�
                RefreshStaticMenu(); // �޴���ġ�� �ٽ� ����
                scrCookie("ANIMATE", "true", 1, 2); // �̵��� ON ���¶�� ��Ű�� ����
        }
        else {	// �ƴ϶��... (�̵��ϱ� ��ư�� üũ�Ǿ� ���� ������)
                clearTimeout(stmnTimer); // �̵��� Ÿ�̸� ����
                STATICMENU.style.top = stmnGAP1; // �޴��� ��ġ�� ������� �ű��.
                scrCookie("ANIMATE", "false", 1, 2); // �̵��� ON ���¶�� ��Ű�� ����
        }
}

// �޴� �ʱ�ȭ
function InitializeStaticMenu1() {

   // alert('dd');
try{
        if (RedCookie("ANIMATE", 1) == "true") {	// �̵� on ���¶��
                ANIMATE1.checked = true; // üũǥ�ø� �ϰ�
                STATICMENU.style.top = document.body.scrollTop + stmnBASE; // �⺻��ġ�� �̵��Ѵ�.
                RefreshStaticMenu(); // ��ũ��Ʈ ����
        }
        else {	// �̵����°� off ���¶��
                ANIMATE1.checked = false; // üũǥ�ø� �����
                STATICMENU.style.top = document.body.scrollTop + stmnGAP1; // �� ���� �鷯 �ٴ´�.
        }

        //STATICMENU.style.left = stmnLEFT; // �޴� ���� ��ġ �ʱ�ȭ. �ʿ���� ��� ����

}catch(e){}
}
