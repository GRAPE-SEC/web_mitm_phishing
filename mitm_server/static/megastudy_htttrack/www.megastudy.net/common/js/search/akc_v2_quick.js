var vSearchADTxt = "";
var vSearchADLnk = "";
var vSearchADImg = "";
var url_main = "http://"+window.location.hostname;

//�ڵ� �ϼ� Ŭ����
var KonanAKC_Quick = function () {
	this.akcInputID2 = null; 		//�˻��� �Է� �� ���̵�
	this.akcArrowID2 = null; 		//�˻��� �ڵ��ϼ� ���̱�/����� �̹��� ���̵�
	this.akcCanvasID2 = null; 		//�˻��� �ڵ��ϼ� �������� ���̵�
	this.akcURL = null; 			//�˻��� �ڵ��ϼ� URL
	this.canvasPosition = null; 	//�ڵ��ϼ� â position
	this.akcDomainNo = 0; 			//�ڵ��ϼ� ������ ��ȣ
	this.akcExtraView = null; 		//�ڵ��ϼ� ������ �� rank, tag, num ���� ������ �� ���� ����
	this.hoverAction = null; 		//�ڵ��ϼ� ����Ʈ hover action
	this.clickAction = null;
	var vMouseLeave = false;
	var returnLength = 0;
	var firstSearch = true;

	//�ڵ��ϼ� �ʼ� ������Ʈ ���̵� ����
	//inputFormID2	: �˻��� �Է� �� ���̵�
	//akcArrowImgID2	: �˻��� �ڵ��ϼ� �����̳� ���̱�/����� �̹��� ���̵�
	//akcCanvasID2	: �˻��� �ڵ��ϼ� �����̳� ���̵�
	this.setAKCComponentID = function (inputFormID2, akcArrowImgID2, akcCanvasID2) {
		this.akcInputID2 = inputFormID2;
		this.akcArrowID2 = akcArrowImgID2;
		this.akcCanvasID2 = akcCanvasID2;
	};

	//�ڵ��ϼ� â�� ������ ���� ��ġ ���� ����
	this.setAKCCanvasPosition = function (position) {
		this.canvasPosition = position;
	};

	//�ڵ� �ϼ� �˻��� �ΰ� ������ ���̱�
	this.setAKCExtraView = function (viewRank, viewTag, viewNum) {
		this.akcExtraView = { rank: viewRank, tag: viewTag, num: viewNum };
	}

	//�ڵ��ϼ� ���� ���� ����
	this.setAKCConnectionInfo = function (akcURL, akcDomainNo) {
		this.akcURL = akcURL;
		this.akcDomainNo = akcDomainNo;
	};

	//�˻��� �ڵ��ϼ� ��� �ʱ�ȭ : �̺�Ʈ ��� �� �ڵ��ϼ� �����̳� ��ġ ����
	//action		: �ڵ��ϼ���Ͽ��� �˻�� �����ϰų� �ڵ��ϼ� �Է� ������ ����(����)Ű�� �Է����� �� ������ �Լ� - �Լ��� �ݵ�� keywork, rank, tag, num �� ���ڷ� �����ؾ� �Ѵ�
	//hoverAction	: �ڵ��ϼ� ��� hover �� ������ �Լ�, �ʿ� ���� ��� null -  - �Լ��� �ݵ�� keywork, rank, tag, num �� ���ڷ� �����ؾ� �Ѵ�
	//on			: �ڵ��ϼ� ��� Ȱ��ȭ ���� (true - Ȱ��ȭ ���·� �ʱ�ȭ��)
	this.init = function (action, hoverAction, on) {
		var agt = navigator.userAgent.toLowerCase();

		var canvas = jQuery("#" + this.akcCanvasID2);
		if (!canvas) {
			throw "can not find a container for akc data";
		}

		//�ڵ� �ϼ� ����Ʈ hovering action
		if (hoverAction != null) {
			this.hoverAction = hoverAction;
		}

		//�ڵ� �ϼ� �Է� �� �̺�Ʈ ��� - �ʿ� ���ٸ� �ּ�
		if (action != null) {
			this.clickAction = action;
			this.setInputTextEventHandler(action);
			
			//2016-02-11 by ������(������ ���� üũ)
			if (agt.indexOf("firefox") != -1) {
				try {
					var observe = new KonanObserve(jQuery("#" + this.akcInputID2));
				} catch (e) { }
			}
			/*
			if (jQuery.browser.mozilla == true) { //firefox ������ �ѱ� Ű�Է� �� keyup �̺�Ʈ�� �߻����� �����Ƿ� ������ input form �̺�Ʈ ó��
				try {
					var observe = new KonanObserve(jQuery("#" + this.akcInputID2));
				} catch (e) { }
			}
			*/
		}

		//�ڵ� �ϼ� ȭ��ǥ �̹����� �⺻ �̺�Ʈ ��� - �ʿ� ���ٸ� �ּ�
		this.setDefaultArrowImageEventHandler();

		//�ڵ��ϼ� �ѱ�/���� �̺�Ʈ ��� - �ʿ� ���ٸ� �ּ�
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

		//�˻� ��ư Ŭ����
		this.setSearchButtonEventHandler();
	};



	// �˻� ��ư Ŭ�� �̺�Ʈ ����
	this.setSearchButtonEventHandler = function () {
		jQuery("#searchBtn2").bind("click", function () {
			if (jQuery("#akcKwd2").val() != ""){
				fncSearchSubmit();
			}
		});
	}

	//�ڵ��ϼ� �ѱ�/���� �̺�Ʈ ��� : akcFoot2�� Ŭ������ ���� label �±׿� �ѱ�/���� ��� �����
	//on : ���� �� ����
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
			akcOnOf.text("�ڵ��ϼ� ����"); //����
			updateImage("up");
		} else {
			akcOnOf.removeClass("on").addClass("off");
			akcOnOf.text("�ڵ��ϼ� �ѱ�"); //�ѱ�
			updateImage("on");
		}

		jQuery(akcOnOf).bind("click", function () {
			fncSetCanvas("onoff", url, input2, canvas, domain, view, update, mouseA);
		});
	};

	//�ڵ� �ϼ� ȭ��ǥ �̹��� Ŭ�� �̺�Ʈ
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

	//�ڵ� �ϼ� ���� �Է� ���� �⺻ �̺�Ʈ �ڵ鷯 ��� (Ű �Է� �� �ڵ��ϼ� ����� ����)
	//action : �ڵ��ϼ��� �����ϰų� �ڵ��ϼ� �Է� ������ ����(����)Ű�� �Է����� ������ �Լ�
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
								fncSetTecCd(jQuery(nodes[i - 1]).text()); 		//�ڵ��ϼ� ���� �˻� ���� ����
								break;
							}
						}
					} else {
						nodes.eq(nodeLen - 1).addClass("selects");
						jQuery(node).val(nodes.eq(nodeLen - 1).text());
						fncSetTecCd(nodes.eq(nodeLen - 1).text()); 			//�ڵ��ϼ� ���� �˻� ���� ����
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
								fncSetTecCd(jQuery(nodes[i + 1]).text()); 		//�ڵ��ϼ� ���� �˻� ���� ����
								break;
							}
						}
					} else {
						nodes.eq(0).addClass("selects");
						jQuery(node).val(nodes.eq(0).text());
						fncSetTecCd(nodes.eq(0).text()); 						//�ڵ��ϼ� ���� �˻� ���� ����
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
					jQuery(node).css("color", "");			// �ؽ�Ʈ ���� ���� ó��
				}

				fncSetCanvas("focus", url, input2, canvas, domain, view, update, mouseA);
			} catch (e) { }
		});
	};

	this.updateAKC = function (url, seed, canvas, domain, view, clickAction, hoverAction) {
		try {
			var body = jQuery("#akcBody2");
			var input2 = this.akcInputID2;
			var flag = 2; 			//0: ù�ܾ�, 1: ���ܾ�, 2: ȥ�� (�ϴ��� ù�ܾ �ϴ� ������ ������)

			if (!seed || seed == vSearchADTxt) {
				fncSetInputDefault();
				return;
			}

			if (seed == "sh"){ seed = "��" }

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
							fncSetTecCd(word);							// �ڵ��ϼ� ���� �˻� ���� ����
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

	//�ڵ��ϼ� ���̾�â ��Ʈ��
	function fncSetCanvas(type, url, input2, canvas, domain, view, update, mouseA) {
		//alert(canvas);

		var layer = jQuery("#" + canvas)
		var InputBox = jQuery("#" + input2)
		var akcOnOf = jQuery("#akcFoot2 > p");

		//document.title = "Ÿ��:"+type+", ���:"+returnLength+", "+layer.hasClass("akcHide2");

//		alert(returnLength);
		
		var akcBox2_yn = jQuery("#akcBox2").css("display");
		var akcWrap_yn = jQuery(".newSearchWrap--list").css("display");

		//�˻� ����� ���� ���
		if (type == "none") {
			returnLength = 0;
			if (layer.hasClass("akcShow2")) {
				layer.removeClass("akcShow2").addClass("akcHide2");
			}
			return false;
		}

		//ȭ��ǥ�� ������ ��� �ڵ��ϼ� ����� ���� ������ �ڵ��ϼ��� ���ش�
		if (type == "arrow" && akcOnOf.hasClass("off")) {
			update(url, jQuery("#" + input2).val(), canvas, domain, view, update, mouseA);

			akcOnOf.removeClass("off").addClass("on");
			akcOnOf.text("�ڵ��ϼ� ����");
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
				//focus�� ��ġ�ϰ� �˻� ����� ���� ���
				if (type != "arrow" && returnLength == 0) {
					//�˻� ����� ���� ��� ���̾ ���̸� �ȵ�
				} else {
					layer.removeClass("akcHide2").addClass("akcShow2");
					updateImage("down");
				}
			} else {
				//�˻� ����� �־� ���̾ Ȱ��ȭ �Ǿ� �ִ� ����
				if (type == "result" && returnLength != 0) {
					if (akcBox2_yn == "none") {
						return; 
					}
				}

				//�ڵ��ϼ� ���� ��ư�� ������ ���
				if (type == "onoff" && akcOnOf.hasClass("on")) {
					akcOnOf.removeClass("on").addClass("off");
					akcOnOf.text("�ڵ��ϼ� �ѱ�");
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


	//�ڵ� �ϼ� ȭ��ǥ �̹��� ����
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
		body.append('<ul><li class="nodata">���� �ڵ��ϼ� ����� ����ϰ� ��ʴϴ�.</li></ul>');
	}

	//Ű���� ���̶����� ó��
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
			alert('�˻�� �Է��ϼž� �մϴ�.');
			return;
		}

		if (sword == vSearchADTxt || ackInput.css("background-image") != "none") {
			location.href = vSearchADLnk;
		} else {
			strUrl = setActionPage(cate);
			if (sword == "sh"){ sword = "��" }
			location.href = strUrl + "&kwd=" + escape(sword) + "&preKwd=" + escape(Hkwd);
		}
	}

	function trim(str) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}	

	function setActionPage(str) {
		var actionpage = url_main+"/search/search_main.asp?cate=10";

		switch(str){
			case "����"			: actionpage = url_main+"/search/search_chr.asp?cate=0"; break;
			case "����"			: actionpage = url_main+"/search/search_book.asp?cate=1"; break;
			case "�¶��μ���"	: actionpage = url_main+"/search/search_book2.asp?cate=2"; break;
			case "�Խ�����"		: actionpage = url_main+"/search/search_ipsi.asp?cate=3"; break;
			case "��õ����"		: actionpage = url_main+"/search/search_recom.asp?cate=4"; break;
			case "����Ʈ��"		: actionpage = url_main+"/search/search_pmp.asp?cate=5"; break;
			case "�����̿�"	: actionpage = url_main+"/search/search_faq.asp?cate=6"; break;
		}
		return actionpage;
	}

	//�ڵ��ϼ� ���� �˻� ���� ����
	function fncSetTecCd(kwd) {
		jQuery.get("/common/js/search/akc_tec.asp", { 'kwd': escape(kwd) }, function (data, textStatus) {
			var $akcBox2 = jQuery('#akcBox2');
			var $tecArea2 = jQuery('#akcTec2');
			var strContent = unescape(data);
			if (strContent != "") { $akcBox2.addClass('banner_on'); $tecArea2.empty().html(strContent); }
			else { $akcBox2.removeClass('banner_on'); $tecArea2.empty().html(''); }
		});
	}

	//���콺 Ŀ���� input box�� ������ ���� ���
	jQuery(".search_wrap").bind("mouseleave", function () {
		vMouseLeave = true;
	}).bind("mouseenter", function () {
		vMouseLeave = false;
	});

	//input box�� ���콺�� ��ġ�� ���
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