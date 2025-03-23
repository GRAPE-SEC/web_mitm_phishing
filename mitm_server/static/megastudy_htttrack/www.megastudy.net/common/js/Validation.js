// 아이디 체크
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

//숫자 체크
 function IsNumberCheck(obj)
{
	var Chk = "0123456789"
	var j
	var k
	var expression
	expression = obj.value;
		
	for(k=0 ; k < expression.length ; k++)
	{
		var ch = expression.charAt(k)
		
		for (j=0 ; j < Chk.length ; j++)
		{
			if (ch == Chk.charAt(j))
				break;
		}
	}
					
	if (Chk.length == j)
	{
		alert('숫자만 입력할 수 있습니다.');
		obj.value="";
		return false;
	}
	else			
	{
		return true;
	}
}

//	기  능 : 영문, 숫자혼용만 사용가능
function checkval(sExpression)	
{		
	for (i = 0; i < sExpression.length; i++) 
	{
		if (sExpression.charAt(i) >= '0' && sExpression.charAt(i) <= '9')
			continue;
		else if (sExpression.charAt(i) >= 'a' && sExpression.charAt(i) <= 'z')
			continue;
		else if (sExpression.charAt(i) >= 'A' && sExpression.charAt(i) <= 'Z')
			continue;
		else 
		{
			return false;
		}
	}
	return true ;
}

//	기  능 : 영문, 숫자, 한글혼용만 사용가능
function checkvalAll(sExpression)	
{		
	for (i = 0; i < sExpression.length; i++) 
	{
		if (sExpression.charAt(i) >= '0' && sExpression.charAt(i) <= '9')
			continue;
		else if (sExpression.charAt(i) >= 'a' && sExpression.charAt(i) <= 'z')
			continue;
		else if (sExpression.charAt(i) >= 'A' && sExpression.charAt(i) <= 'Z')
			continue;
		else if (sExpression.charCodeAt(i) > 255 || sExpression.charCodeAt(i) < 0)
			continue;
		else 
		{
			return false;
		}
	}
	return true ;
}


//	기  능 : 사용자가 원하는 특수문자존재여부 포함되어 있으면 true를 리턴"|^;:,'\""
function checkChar(sExpression, sChar)
{
	var sEngNum = sChar; 
	
	if (sExpression.length > 0)
	{
		for (i = 0; i < sEngNum.length; i++)
		{
			if(sExpression.indexOf(sEngNum.substring(i, i+1)) >= 0)
				return true ;
		}
	}
	
	return false ;
}
