var vSearchADTxt = "";
var vSearchADLnk = "";
var vSearchADImg = "";
var url_main = "http://"+window.location.hostname;

//자동 완성 클래스
var KonanAKC_Quick = function () {
	this.akcInputID2 = null; 		//검색어 입력 폼 아이디
	this.akcArrowID2 = null; 		//검색어 자동완성 보이기/숨기기 이미지 아이디
	this.akcCanvasID2 = null; 		//검색어 자동완성 컨테이터 아이디
	this.akcURL = null; 			//검색어 자동완성 URL
	this.canvasPosition = null; 	//자동완성 창 position
	this.akcDomainNo = 0; 			//자동완성 도메인 번호
	this.akcExtraView = null; 		//자동완성 데이터 중 rank, tag, num 정보 보여줄 지 여부 설정
	this.hoverAction = null; 		//자동완성 리스트 hover action
	this.clickAction = null;
	var vMouseLeave = false;
	var returnLength = 0;
	var firstSearch = true;

	//자동완성 필수 컴포넌트 아이디 지정
	//inputFormID2	: 검색어 입력 폼 아이디
	//akcArrowImgID2	: 검색어 자동완성 컨테이너 보이기/숨기기 이미지 아이디
	//akcCanvasID2	: 검색어 자동완성 컨테이너 아이디
	this.setAKCComponentID = function (inputFormID2, akcArrowImgID2, akcCanvasID2) {
		this.akcInputID2 = inputFormID2;
		this.akcArrowID2 = akcArrowImgID2;
		this.akcCanvasID2 = akcCanvasID2;
	};

	//자동완성 창이 생성될 기준 위치 정보 지정
	this.setAKCCanvasPosition = function (position) {
		this.canvasPosition = position;
	};

	//자동 완성 검색에 부가 데이터 보이기
	this.setAKCExtraView = function (viewRank, viewTag, viewNum) {
		this.akcExtraView = { rank: viewRank, tag: viewTag, num: viewNum };
	}

	//자동완성 갱신 연결 정보
	this.setAKCConnectionInfo = function (akcURL, akcDomainNo) {
		this.akcURL = akcURL;
		this.akcDomainNo = akcDomainNo;
	};

	//검색어 자동완성 기능 초기화 : 이벤트 등록 및 자동완성 컨테이너 위치 조정
	//action		: 자동완성목록에서 검색어를 선택하거나 자동완성 입력 폼에서 엔터(리턴)키를 입력했을 때 수행할 함수 - 함수는 반드시 keywork, rank, tag, num 을 인자로 지정해야 한다
	//hoverAction	: 자동완성 목록 hover 시 수행할 함수, 필요 없을 경우 null -  - 함수는 반드시 keywork, rank, tag, num 을 인자로 지정해야 한다
	//on			: 자동완성 기능 활성화 여부 (true - 활성화 상태로 초기화함)
	this.init = function (action, hoverAction, on) {
		var agt = navigator.userAgent.toLowerCase();

		var canvas = jQuery("#" + this.akcCanvasID2);
		if (!canvas) {
			throw "can not find a container for akc data";
		}

		//자동 완성 리스트 hovering action
		if (hoverAction != null) {
			this.hoverAction = hoverAction;
		}

		//자동 완성 입력 폼 이벤트 등록 - 필요 없다면 주석
		if (action != null) {
			this.clickAction = action;
			this.setInputTextEventHandler(action);
			
			//2016-02-11 by 차재혁(브라우저 정보 체크)
			if (agt.indexOf("firefox") != -1) {
				try {
					var observe = new KonanObserve(jQuery("#" + this.akcInputID2));
				} catch (e) { }
			}
			/*
			if (jQuery.browser.mozilla == true) { //firefox 에서는 한글 키입력 시 keyup 이벤트가 발생하지 않으므로 별도의 input form 이벤트 처리
				try {
					var observe = new KonanObserve(jQuery("#" + this.akcInputID2));
				} catch (e) { }
			}
			*/
		}

		//자동 완성 화살표 이미지에 기본 이벤트 등록 - 필요 없다면 주석
		this.setDefaultArrowImageEventHandler();

		//자동완성 켜기/끄기 이벤트 등록 - 필요 없다면 주석
		if (typeof on == "boolean") {
			this.setDefaultOnOffFunction(on, this.akcCanvasID2);
		}

		var input2 = this.akcInputID2;
		var akcInput2 = jQuery("#" + input2);

		if (akcInput2.val() != "") {
			var url = this.akcURL;
			var canvas = this.akcCanvasID2;
			var domain = this.akcDomainNo;
			var view = this.akcExtraView;
			var update = this.updateAKC;
			var mouseA = this.hoverAction;

			update(url, akcInput2.val(), canvas, domain, view, update, mouseA);
		} else {
			firstSearch = false;
		}

		//검색 버튼 클릭시
		this.setSearchButtonEventHandler();
	};



	// 검색 버튼 클릭 이벤트 셋팅
	this.setSearchButtonEventHandler = function () {
		jQuery("#searchBtn2").bind("click", function () {
			if (jQuery("#akcKwd2").val() != ""){
				fncSearchSubmit();
			}
		});
	}

	//자동완성 켜기/끄기 이벤트 등록 : akcFoot2을 클래스로 가진 label 태그에 켜기/끄기 기능 등록함
	//on : 시작 시 상태
	this.setDefaultOnOffFunction = function (on, canvasID) {
		var url = this.akcURL;
		var input2 = this.akcInputID2;
		var canvas = this.akcCanvasID2;
		var domain = this.akcDomainNo;
		var view = this.akcExtraView;
		var update = this.updateAKC;
		var mouseA = this.hoverAction;
		var akcOnOf = jQuery("#akcFoot2 > p");

		if (on) {
			akcOnOf.removeClass("off").addClass("on");
			akcOnOf.text("자동완성 끄기"); //끄기
			updateImage("up");
		} else {
			akcOnOf.removeClass("on").addClass("off");
			akcOnOf.text("자동완성 켜기"); //켜기
			updateImage("on");
		}

		jQuery(akcOnOf).bind("click", function () {
			fncSetCanvas("onoff", url, input2, canvas, domain, view, update, mouseA);
		});
	};

	//자동 완성 화살표 이미지 클릭 이벤트
	this.setDefaultArrowImageEventHandler = function () {
		var url = this.akcURL;
		var input2 = this.akcInputID2;
		var canvas = this.akcCanvasID2;
		var domain = this.akcDomainNo;
		var view = this.akcExtraView;
		var update = this.updateAKC;
		var mouseA = this.hoverAction;

		jQuery("#" + this.akcArrowID2).bind("click", function () {
			fncSetCanvas("arrow", url, input2, canvas, domain, view, update, mouseA);
		});
	};

	//자동 완성 생성 입력 폼에 기본 이벤트 핸들러 등록 (키 입력 시 자동완성 목록을 갱신)
	//action : 자동완성을 선택하거나 자동완성 입력 폼에서 엔터(리턴)키를 입력했을 수행할 함수
	this.setInputTextEventHandler = function (action) {
		var node = jQuery("#" + this.akcInputID2);
		var akcOnOf = jQuery("#akcFoot2 > p");
		var nodeText = "";

		if (!node) { throw "call init funation first"; }

		var input2 = this.akcInputID2;
		var canvas = this.akcCanvasID2;
		var url = this.akcURL;
		var domain = this.akcDomainNo;
		var view = this.akcExtraView;
		var update = this.updateAKC;
		var mouseA = this.hoverAction;

		jQuery(node).keyup(function (event) {
			if (event.keyCode == 229 || (event.keyCode > 111 && event.keyCode < 124)) {  //F1 ~ F12
				return;
			}

			//alert("event.keyCode : " + event.keyCode);

			switch (event.keyCode) {
				case 13: //enter
					fncSearchSubmit();
					break;
				case 20: //caps lock
				case 27: //esc
				case 33: //page up
				case 34: //page down
				case 35: //end
				case 36: //home
				case 37: //left arrow
				case 39: //right arrow
				case 45: //insert
				case 224: //apple command of mozilla
				case 17: //apple command of opera
				case 91: //left window command of mozilla and ie
				case 92: //rigth windoe command of mozilla and ie
				case 219: //left window command of opera
				case 220: //right window command of opera
				case 93: //windows menu
				case 0: 	//windows menu of opera
					break;

				case 38: //up arrow
					if (!akcOnOf.hasClass("on")) { return; }

					var nodes = jQuery("#akcBody2 > ul > li");
					var nodeLen = nodes.length;
					if (nodeLen == 0) { return; }

					if (nodes.hasClass("selects")) {
						for (var i = 0; i < nodeLen; i++) {
							if (jQuery(nodes[i]).hasClass("selects")) {
								jQuery(nodes[i]).removeClass("selects");
								if (i == 0) {
									jQuery(node).val(nodeText);
									break;
								} else {
									jQuery(nodes[i - 1]).addClass("selects");
								}
								jQuery(node).val(jQuery(nodes[i - 1]).text());
								fncSetTecCd(jQuery(nodes[i - 1]).text()); 		//자동완성 우출 검색 광고 노출
								break;
							}
						}
					} else {
						nodes.eq(nodeLen - 1).addClass("selects");
						jQuery(node).val(nodes.eq(nodeLen - 1).text());
						fncSetTecCd(nodes.eq(nodeLen - 1).text()); 			//자동완성 우출 검색 광고 노출
					}
					break;

				case 40: //down arrow
					if (!akcOnOf.hasClass("on")) { return; }

					var nodes = jQuery("#akcBody2 > ul > li");
					var nodeLen = nodes.length;
					if (nodeLen == 0) { return; }

					if (nodes.hasClass("selects")) {
						for (i = 0; i < nodeLen; i++) {
							if (jQuery(nodes[i]).hasClass("selects")) {
								jQuery(nodes[i]).removeClass("selects");
								if (i == nodeLen - 1) {
									jQuery(node).val(nodeText);
									break;
								} else {
									jQuery(nodes[i + 1]).addClass("selects");
								}
								jQuery(node).val(jQuery(nodes[i + 1]).text());
								fncSetTecCd(jQuery(nodes[i + 1]).text()); 		//자동완성 우출 검색 광고 노출
								break;
							}
						}
					} else {
						nodes.eq(0).addClass("selects");
						jQuery(node).val(nodes.eq(0).text());
						fncSetTecCd(nodes.eq(0).text()); 						//자동완성 우출 검색 광고 노출
					}
					break;

				case 255:
					if (!akcOnOf.hasClass("on")) { return; }
					update(url, jQuery("#" + input2).val(), canvas, domain, view, action, mouseA);

				default:
					try {
						//if (jQuery.browser.mozilla == true || !akcOnOf.hasClass("on")) { return; }
						if (!akcOnOf.hasClass("on")) { return; }
						nodeText = jQuery(node).val();
						update(url, jQuery("#" + input2).val(), canvas, domain, view, action, mouseA);
					} catch (e) {
						alert(e);
					}
			}
		});

		//Show akcBox2
		jQuery(node).bind("keyup", function () {
			//fncSetCanvas("keyup", url, input, canvas, domain, view, update, mouseA);
		});

		jQuery(node).bind("focus", function () {
			try {
				if (vSearchADImg != "") {
					jQuery(node).css("background-image", "url()");
				} else if (vSearchADTxt != "" && jQuery(node).val() == vSearchADTxt) {
					jQuery(node).val('');
					jQuery(node).css("color", "");			// 텍스트 색깔 변경 처리
				}

				fncSetCanvas("focus", url, input2, canvas, domain, view, update, mouseA);
			} catch (e) { }
		});
	};

	this.updateAKC = function (url, seed, canvas, domain, view, clickAction, hoverAction) {
		try {
			var body = jQuery("#akcBody2");
			var input2 = this.akcInputID2;
			var flag = 2; 			//0: 첫단어, 1: 끝단어, 2: 혼합 (일단은 첫단어만 하는 것으로 고정함)

			if (!seed || seed == vSearchADTxt) {
				fncSetInputDefault();
				return;
			}

			if (seed == "sh"){ seed = "노" }

			jQuery.ajax({
				url: url,
				type: "GET",
				dataType: "json",
				data: { seed: escape(seed), flag: flag, domain: domain },
				success: function (data) {
					returnLength = data.length;
					if (returnLength == 1 && data[0].error) {
						jQuery("#akcBody2").text(data.error);
						return;
					}

					var strHtml = '';
					strHtml += '<ul class="first">';
					jQuery.each(data, function (entryIndex, entry) {
						word = unescape(entry["word"]);

						if (entryIndex == 0) {
							fncSetTecCd(word);							// 자동완성 우축 검색 광고 노출
							strHtml += '<li class="selects">';
						} else {
							strHtml += '<li>';
						}

						strHtml += '' + fncReplaceKeyword(word, seed) + '';
						strHtml += '</li>';
					});
					strHtml += '</ul>';
					body.text("");
					body.append(strHtml);

					var li = jQuery("#akcBody2 > ul > li");
					jQuery.each(li, function (i) {
						li.eq(i).mouseover(function () {
							for (j = 0; j < li.length; j++) {
								li.eq(j).removeClass("selects");
							}
							li.eq(i).addClass("selects");
						});

						li.eq(i).data("akc", data[i]);
						li.eq(i).click(function () {
							var data = jQuery(this).data("akc");
							jQuery("#akcKwd2").val(unescape(data.word));
							clickAction(unescape(data.word));
						});
					});

					if (firstSearch) {
						firstSearch = false;
					} else if (returnLength == 0) {
						fncSetInputDefault();
						fncSetCanvas("none", url, input2, canvas, domain, view, clickAction, hoverAction);
					} else {
						fncSetCanvas("result", url, input2, canvas, domain, view, clickAction, hoverAction);
					}

				},
				error: function (req, status, error) {
					//				alert(error);
				}
			});
		} catch (e) {
		}
	};

	//자동완성 레이어창 컨트롤
	function fncSetCanvas(type, url, input2, canvas, domain, view, update, mouseA) {
		//alert(canvas);

		var layer = jQuery("#" + canvas)
		var InputBox = jQuery("#" + input2)
		var akcOnOf = jQuery("#akcFoot2 > p");

		//document.title = "타입:"+type+", 결과:"+returnLength+", "+layer.hasClass("akcHide2");

//		alert(returnLength);
		
		var akcBox2_yn = jQuery("#akcBox2").css("display");
		var akcWrap_yn = jQuery(".newSearchWrap--list").css("display");

		//검색 결과가 없을 경우
		if (type == "none") {
			returnLength = 0;
			if (layer.hasClass("akcShow2")) {
				layer.removeClass("akcShow2").addClass("akcHide2");
			}
			return false;
		}

		//화살표를 눌렀을 경우 자동완성 기능이 껴저 있으면 자동완성을 켜준다
		if (type == "arrow" && akcOnOf.hasClass("off")) {
			update(url, jQuery("#" + input2).val(), canvas, domain, view, update, mouseA);

			akcOnOf.removeClass("off").addClass("on");
			akcOnOf.text("자동완성 끄기");
			setLayCookie("layDisp", "no", 30, 7);
			updateImage("up");
			return false;
		}

		if (akcOnOf.hasClass("on")) {
			if (akcWrap_yn == "block") {
				jQuery(".newSearchWrap--list").hide();
				jQuery("#akcBox2").show();
			}

			if (layer.hasClass("akcHide2")) {
				//focus가 위치하고 검색 결과가 없을 경우
				if (type != "arrow" && returnLength == 0) {
					//검색 결과가 없을 경우 레이어가 보이면 안됨
				} else {
					layer.removeClass("akcHide2").addClass("akcShow2");
					updateImage("down");
				}
			} else {
				//검색 결과가 있어 레이어가 활성화 되어 있는 상태
				if (type == "result" && returnLength != 0) {
					if (akcBox2_yn == "none") {
						return; 
					}
				}

				//자동완성 끄기 버튼을 눌렀을 경우
				if (type == "onoff" && akcOnOf.hasClass("on")) {
					akcOnOf.removeClass("on").addClass("off");
					akcOnOf.text("자동완성 켜기");
					updateImage("on");
					setLayCookie("layDisp", "yes", 30, 7);

					layer.removeClass("akcShow2").addClass("akcHide2");
				} else {
					updateImage("up");
				}
				//layer.removeClass("akcShow2").addClass("akcHide2");
			}
		}
	}


	//자동 완성 화살표 이미지 변경
	function updateImage(type) {
		try {
			var arrowID = jQuery("#akcArrow2 > img")
			var srcPath = jQuery(arrowID).attr("src").replace('_down.gif', '.gif').replace('_on.gif', '.gif');

			if (type == "down") {
				jQuery(arrowID).attr({ 'src': srcPath.replace('.gif', '_down.gif') });
			} else if (type == "on") {
				jQuery(arrowID).attr({ 'src': srcPath.replace('.gif', '_on.gif') });
			} else {
				jQuery(arrowID).attr({ 'src': srcPath });
			}
		} catch (e) {
		}
	}

	function fncSetInputDefault() {
		var body = jQuery("#akcBody2");
		body.text("");
		body.append('<ul><li class="nodata">현재 자동완성 기능을 사용하고 계십니다.</li></ul>');
	}

	//키워드 하이라이팅 처리
	function fncReplaceKeyword(word, seed) {
		if (word) {
			word = word.replace(seed, "<strong>" + seed + "</strong>");
		}
		return word;
	}

	function fncSearchSubmit() {
		var ackInput = jQuery("#akcKwd2");
		var sword = ackInput.val();
		var Hkwd = jQuery("#kwd").val();
		var cate = trim(jQuery('#tSelectbox2').val());

		if (sword == "" || ackInput.css("background-image") == "") {
			alert('검색어를 입력하셔야 합니다.');
			return;
		}

		if (sword == vSearchADTxt || ackInput.css("background-image") != "none") {
			location.href = vSearchADLnk;
		} else {
			strUrl = setActionPage(cate);
			if (sword == "sh"){ sword = "노" }
			location.href = strUrl + "&kwd=" + escape(sword) + "&preKwd=" + escape(Hkwd);
		}
	}

	function trim(str) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}	

	function setActionPage(str) {
		var actionpage = url_main+"/search/search_main.asp?cate=10";

		switch(str){
			case "강좌"			: actionpage = url_main+"/search/search_chr.asp?cate=0"; break;
			case "교재"			: actionpage = url_main+"/search/search_book.asp?cate=1"; break;
			case "온라인서점"	: actionpage = url_main+"/search/search_book2.asp?cate=2"; break;
			case "입시정보"		: actionpage = url_main+"/search/search_ipsi.asp?cate=3"; break;
			case "추천정보"		: actionpage = url_main+"/search/search_recom.asp?cate=4"; break;
			case "스마트존"		: actionpage = url_main+"/search/search_pmp.asp?cate=5"; break;
			case "서비스이용"	: actionpage = url_main+"/search/search_faq.asp?cate=6"; break;
		}
		return actionpage;
	}

	//자동완성 우출 검색 광고 노출
	function fncSetTecCd(kwd) {
		jQuery.get("/common/js/search/akc_tec.asp", { 'kwd': escape(kwd) }, function (data, textStatus) {
			var $akcBox2 = jQuery('#akcBox2');
			var $tecArea2 = jQuery('#akcTec2');
			var strContent = unescape(data);
			if (strContent != "") { $akcBox2.addClass('banner_on'); $tecArea2.empty().html(strContent); }
			else { $akcBox2.removeClass('banner_on'); $tecArea2.empty().html(''); }
		});
	}

	//마우스 커서가 input box를 밖으로 나갈 경우
	jQuery(".search_wrap").bind("mouseleave", function () {
		vMouseLeave = true;
	}).bind("mouseenter", function () {
		vMouseLeave = false;
	});

	//input box에 마우스가 위치할 경우
	jQuery(document).bind("mousedown", function () {
		try {
			if (vMouseLeave && jQuery("#akcKwd2").val() == "") {
				if (vSearchADImg != "") {
					jQuery("#akcKwd2").css("background-image", "url(" + vSearchADImg + ")");
				} else {
					jQuery("#akcKwd2").val(vSearchADTxt);
					//jQuery("#akcKwd2").css("color", "#ff0000");
				}
			}

			if (vMouseLeave && jQuery("#akcBox2").hasClass("akcShow2")) {
//				jQuery("#akcBox2").removeClass("akcShow2").addClass("akcHide2");
				updateImage("up");
			}
		} catch (e) { }
	});
};