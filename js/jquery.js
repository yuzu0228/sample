$(function(){
	/*========================
		news slide appearance
	===========================*/
	$(window).on('load', function(){
		$('.swiper-container-wrapper').animate({right: 0},1000, 'swing');
		
	});

	/*==========================
		 fixed slideshow
	================================*/
	setElm = $('.fullSlideShow');
	fadeSpeed = 1000;
	switchDelay = 5000;
	easing = 'linear';
	sideNavi = 'on'; // 'on' or 'off'
	sideHide = 'hide'; // 'hide' or 'show'
	naviOpc = 0.5;
	pnOpacity = 0.5;

	ua = navigator.userAgent;

	$(window).load(function(){
		setElm.each(function(){
			var targetObj = $(this),
			findUl = targetObj.find('ul'),
			findLi = findUl.find('li'),
			findLiCount = findLi.length,
			findLiFirst = findUl.find('li:first');

			findLi.each(function(i){
				$(this).attr('class','viewList' + (i + 1).toString());
			});

			findLi.css({display:'block',opacity:'0',zIndex:'99'});
			findLiFirst.addClass('mainActive').css({zIndex:'100'}).stop().animate({opacity:'1'},fadeSpeed);

			if(findLiCount > 1){
				// ページネーションSET
				var pagination = $('<div class="pagiNation"></div>');
				targetObj.append(pagination);

				findLi.each(function(i){
					pagination.append('<a href="javascript:void(0);" class="pn'+(i+1)+'"></a>');
				});

				var pnPoint = pagination.children('a'),
				pnFirst = pagination.children('a:first'),
				pnLast = pagination.children('a:last'),
				pnCount = pagination.children('a').length;
				
				pnFirst.addClass('pnActive');

				if(ua.search(/iPhone/) != -1 || ua.search(/iPad/) != -1 || ua.search(/iPod/) != -1 || ua.search(/Android/) != -1){
					pnPoint.css({opacity:(pnOpacity)});
				} else {
					pnPoint.css({opacity:(pnOpacity)}).hover(function(){
						$(this).stop().animate({opacity:'1'},300);
					}, function(){
						$(this).stop().animate({opacity:(pnOpacity)},300);
					});
				}

				pnPoint.click(function(){
					clearInterval(setAutoTimer);
					var setNum = pnPoint.index(this),
					showCont = setNum+1;
					findUl.find('.viewList' + (showCont)).siblings().removeClass('mainActive').stop().animate({opacity:'0'},fadeSpeed,function(){$(this).css({zIndex:'99'});});
					findUl.find('.viewList' + (showCont)).addClass('mainActive').stop().animate({opacity:'1'},fadeSpeed,function(){$(this).css({zIndex:'100'});});
					pnPoint.removeClass('pnActive');
					$(this).addClass('pnActive');
					fadeTimer();
				});


				// ボタン移動動作
				function switchNext(){
					var setActive = pagination.find('.pnActive');
					setActive.each(function(){
						var pnLengh = pnPoint.length,
						pnIndex = pnPoint.index(this),
						pnCount = pnIndex+1;

						if(pnLengh == pnCount){
							pnFirst.click();
						} else {
							$(this).next('a').click();
						}
					});
				}
				function switchPrev(){
					var setActive = pagination.find('.pnActive');
					setActive.each(function(){
						var pnLengh = pnPoint.length,
						pnIndex = pnPoint.index(this),
						pnCount = pnIndex+1;

						if(1 == pnCount){
							pnLast.click();
						} else {
							$(this).prev('a').click();
						}
					});
				}

				function fadeTimer(){
					setAutoTimer = setInterval(function(){
						switchNext();
					},switchDelay);
				}
				fadeTimer();

				// サイドナビボタン（有り無し）
				if(sideNavi == 'on'){
					targetObj.append('<a href="javascript:void(0);" class="btnPrev"></a><a href="javascript:void(0);" class="btnNext"></a>');
					var btnPrev = targetObj.find('.btnPrev'),btnNext = targetObj.find('.btnNext'),btnPrevNext = targetObj.find('.btnPrev,.btnNext');

					if(ua.search(/iPhone/) != -1 || ua.search(/iPad/) != -1 || ua.search(/iPod/) != -1 || ua.search(/Android/) != -1){
						btnPrevNext.css({opacity:naviOpc});
					} else {
						btnPrevNext.css({opacity:naviOpc}).hover(function(){
							$(this).stop().animate({opacity:'1'},200);
						},function(){
							$(this).stop().animate({opacity:naviOpc},200);
						});
					}

					if(sideHide == 'hide'){
						if(ua.search(/iPhone/) != -1 || ua.search(/iPad/) != -1 || ua.search(/iPod/) != -1 || ua.search(/Android/) != -1){
							btnPrevNext.css({visibility:'visible'});
						} else {
							btnPrevNext.css({visibility:'hidden'});
							targetObj.hover(function(){
								btnPrevNext.css({visibility:'visible'});
							},function(){
								btnPrevNext.css({visibility:'hidden'});
							});
						}
					}

					btnPrev.click(function(){switchPrev();});
					btnNext.click(function(){switchNext();});
				}
			}

			// メイン画像をベースにエリアの幅と高さを設定
			var setLiImg = findLi.find('img'),
			baseWidth = setLiImg.width(),
			baseHeight = setLiImg.height(),
			selfWH = baseWidth / baseHeight;

			// フルスクリーン（レスポンシブ）動作メイン
			function setArea(){
				var wdWidth = $(window).width(),
				wdHeight = $(window).height(),
				rwdHeight = wdWidth / selfWH;

				if(rwdHeight < $(window).height()){
					rwdHeight = $(window).height();
					wdWidth = rwdHeight * selfWH;
				}
				targetObj.css({height:wdHeight});
				findUl.css({marginTop:-rwdHeight/2,marginLeft:-wdWidth/2,width:wdWidth,height:rwdHeight});
				findLi.css({height:rwdHeight});
			}
			$(window).resize(function(){setArea();}).resize();

			$('body').css({visibility:'visible'});
		});
	});

	/*=============================
	header pulldownmenu
	=================================*/
	$('#pullDownMenu ul.sub').hide();
                $('ul.menu li').hover(function(){
                    $('>ul:not(:animated)', this).slideDown('fast')
                }, function(){
                    $('>ul', this).slideUp('fast');
				});
				
				

	/*=======================================
	width of sub menu in header
	==========================================*/ 
	$('#pullDownMenu ul.menu li ul.sub > li').each(function(){
		$(this).css({
			width: $(this).text().length + 'em'
		});
	});

	/*===========================================
			stickey header
	===============================================*/
	$('header').each(function(){

        var $window = $(window), 
			$header = $(this), 
			headerOffsetTop = 560;
			

        $window.on('scroll', function(){
            if($window.scrollTop() > headerOffsetTop ) {　//scrollTop()ﾒｿｯﾄﾞはスクロール量を調べる
				$header.addClass('sticky');
				$('main').css({marginTop: 80 + 'px'})
				
				$header.find('img.usual-img').fadeOut();
				$header.find('img.sticky-img').show();

            }else {
				$header.removeClass('sticky');
				$('main').css({marginTop: 0 + 'px'})

				$header.find('img.usual-img').fadeIn();
				$header.find('img.sticky-img').hide();
				
            }
        });

        $window.trigger('scroll');
    });

	/*=========================================
			video
	==============================================*/

	var $windowWidth = $(window).width();
	
	$(window).resize(function(){
	if($windowWidth > 750 ) {

	$('.video').mouseover(function(){
		$(this).find('img:not(:animated)').fadeOut();
		$(this).find('video').get(0).currentTime = $(this).get(0).initialTime || 0;
		$(this).find('video:not(:animated)').get(0).play();
	}).mouseout(function(){
		$(this).find('video:not(:animated)').get(0).pause();
		$(this).find('img:not(:animated)').fadeIn();
	});

} else {
	$(this).find('video').off();
	$('.video').eq(0).find('img').attr('src', 'image/bg_domain_sp.jpg');
	$('.video').eq(1).find('img').attr('src', 'image/bg_team_sp.jpg');
	$('.video').eq(2).find('img').attr('src', 'image/bg_service_sp.jpg');
	$('.video').eq(3).find('img').attr('src', 'image/bg_company_sp.jpg');
	$('video').find('img').css({
		width: 100 + 'vw',
		height: 'auto'
	});
}

});

	
/*==============================================
				After nav mouseovering, main section turn white
=====================================================*/

	$('#pullDownMenu ul.menu').mouseover(function(){
		$('main').prepend('<div class="color-cavering" style="transition: 0.5s"></div>');
		$('main .color-cavering').css({
			position: 'absolute',
			top: 55 + 'px',
			left: 0,
			width: 100 + '%',
			height: 100 + '%',
			zIndex: 2000,
			backgroundColor: 'white',
			opacity: 0.8,
			transition: 0.5 + 's'
		})
	}).mouseout(function(){
		$('main .color-cavering').remove();
	});

	/*===============================================
					changing backgroundImage on mouseover
	=======================================================*/


	$(window).resize(function(){
	if( $(window).width() > 750 ) {
	
	$('.border-box-container').mouseover(function(){
		$('.work, .place-name, .description, .date-place, .text-large-in-main h2, .search-section-box-first p, .search-section-box-first i').css({color: 'white'});
		$('.work-container-widhout-backgroundImage-cover').css({backgroundColor: 'black'});
		$('.search-section-box-first').addClass('active');
		$('.search-section-box-small .search-section-box-small-text, .search-section-box-small .search-section-box-small-text.upper').addClass('active');
		$('.continue.in-work, .continue.in-work p').addClass('active');
		$('.backgroundImage-cover').css({
			display: 'block',
			background: 'url(' + $(this).attr('href') + ') no-repeat',
			backgroundSize: 'cover',
    		backgroundPosition: 'top left',
    		backgroundAttachment: 'fixed',
		}).mouseout(function(){
			$('.work, .place-name, .description, .date-place, .text-large-in-main h2, .search-section-box-first p').css({color: ''});
			$('.work-container-widhout-backgroundImage-cover').css({backgroundColor: 'white'});
			$('.search-section-box-first').removeClass('active');
			$('.search-section-box-small .search-section-box-small-text, .search-section-box-small .search-section-box-small-text.upper').removeClass('active');
			$('.continue.in-work, .continue.in-work p').removeClass('active');
			$('.backgroundImage-cover').css({
				display: 'none',
				background: 'none'
		});
	});
})

	}else {
		$('.border-box-container').mouseover(function(){
		$('.work, .place-name, .description, .date-place, .text-large-in-main h2, .search-section-box-first p, .search-section-box-first i').off();
		$('.work-container-widhout-backgroundImage-cover').off();
		$('.search-section-box-first').off();
		$('.search-section-box-small .search-section-box-small-text, .search-section-box-small .search-section-box-small-text.upper').off();
		$('.continue.in-work, .continue.in-work p').off();
		$('.backgroundImage-cover').off();
		});
	};
});

/*==========================================
vertical-bar in work section
==========================================*/
	
	$('.search-section-box-menu').css({display: 'none'});

		$('.search-section-box-small .click-space').on('click', function(){
			$(this).find('>.search-section-box-menu').toggleClass('open');

			if($(this).find('>ul.search-section-box-menu').hasClass('open')) {
				$(this).find('>ul.search-section-box-menu').css({display: 'block'});
				$(this).find('.plus-btn p').text('－').css({display: 'inline'});
				$(this).find('.plus-btn').prepend('<span class="close-text">close</span>');
				$(this).find('.plus-btn').find('.close-text').css({
					position: 'absolute',
					top: 45 + '%',
					right: 20 + '%',
					fontSize: 14 + 'px',
					color: '#58C7EE'
				});
				$('.work-select-section').css({pointerEvents: 'none',opacity: 0.1});
			} else {
				$(this).find('>ul.search-section-box-menu').css({display: 'none'});
				$(this).find('.plus-btn p').text('+');
				$(this).find('.plus-btn span').remove();
				$('.work-select-section').css({pointerEvents: 'auto',opacity: 1});
			}

			
		});

	$('.sub-sub-menu-container').hide();
	$('.search-section-box .s-sub-sub-menu-container').hide();
	
	$('.side-bar-nav2 .r-sub-menu .plus-btn').on('click', function(){
		$(this).parent().find('.sub-sub-menu-container').slideToggle();
	});

	$('.search-section-box .sub-menu .s-plus-btn').on('click', function(){
		$(this).parent().find('>.s-sub-sub-menu-container').slideToggle();

	});

/*==================================
smooth-scroll
=====================================*/
$('.smooth-scroll-btn').each(function(){
	var el = scrollableElement('html', 'body'); 
	//ブラウザによってscrolltopの検出がhtmlとbodyに分かれるのでacrolltopが利用できる要素を検出する関数を以下で定義する

	$(this).on('click', function(event){
		event.preventDefault();
		$(el).animate({scrollTop: 0}, 250); 
	});
});

function scrollableElement() {
	var i, len, el, $el, scrollable;
	for (i=0, len=arguments.length; i<len; i++) {
		el =arguments[i],
		$el =$(el);
		if($el.scrollTop() > 0) {
			return el;
		} else {
			$el.scrollTop(1);
			scrollable = $el.scrollTop() > 0;
			$el.scrollTop(0);
			if(scrollable) {
				return el;
			}
		}
	}
	return [];
}

/*----------------------------
sidebar-1
---------------------------------*/

	var $sideBarNav1 = $('.side-bar-nav1')

	$('.nav-btn').on('click', function(){
		$sideBarNav1.addClass('open');

		if($sideBarNav1.hasClass('open') ) {
			$sideBarNav1.find('.late-appear').delay(500).each(function(i){
				$(this).delay(100 * i).stop().animate({opacity:1}, 1500);
			});
		}else {
			$sideBarNav1.find('.late-appear').css({opacity: '0'});
		}
	});
	$('.close-btn1').on('click', function(){
		$sideBarNav1.removeClass('open');
		/*$sideBarNav1.find('.late-appear').css({opacity: '0'});*/
	});


	$('.side-bar-nav1 .late-appear').on('click', function(){
		
		$(this).find('.sub-menu-container').fadeToggle();
		
	});

	/*=============================
	slidebar 2
	=================================*/
	var $sideBarNav2 = $('.side-bar-nav2')

	$('div').on('click','.search-section-box-first .continue-btn p', function(){
		$sideBarNav2.addClass('open2');

		if($sideBarNav2.hasClass('open2') ) {
			$sideBarNav2.find('.late-appear2').delay(500).each(function(i){
				$(this).delay(100 * i).stop().animate({opacity:1}, 1500);
			});
		}else {
			$('.side-bar-nav2 .late-appear2').css({opacity: '0'});
		}
	});
	$sideBarNav2.on('click', '.close-btn2', function(){
		$sideBarNav2.removeClass('open2');

	});

	$('.side-bar-nav2 .late-appear2 .title').on('click', function(){
		var $submenuContainer = $(this).parent();

		$(this).parent().find('.sub-menu-container').fadeToggle();

		$submenuContainer.toggleClass('open');
		if($submenuContainer.hasClass('open') ) {
			$submenuContainer.find('.plus-btn.top p').text('―');
			$submenuContainer.find('.plus-btn.top p').prepend('<span class="close-text">close</span>');
			$submenuContainer.find('.plus-btn.top p').css({fontSize: 20 + 'px'});
			$submenuContainer.find('.plus-btn.top p>.close-text').css({fontSize: 16 + 'px', marginRight: 5 + 'px'});

		} else {
			$submenuContainer.find('.plus-btn.top p').text('+');
			$submenuContainer.find('.plus-btn.top p').css({fontSize: 30 + 'px'});
		}
		
	});

	

	/*=====================================
	under 750px, adding plus btn
	========================================*/
	if($windowWidth < 750 ) {
		$('.search-section-box-first').append('<span class="continue-btn"><p>+</p></span>');
	} else {
		$('.search-section-box-first span.continue-btn').remove();
	};

	/*=======================================================-
	750px-320pxまでwork内の画像の大きさ、workのheightを変える
	700,600,500,400,300をブレイクポイントとする
	work-select-sectionのheight 750=2800px,600=2600px,500=2350px,400=2150px,325=1950px
	8段あるから、画像(border-box-innerの背景画像で計画)は…
	750=350px,600=325px,500=294px,400=269px,325=244pxで画像のheight設定
	===============================================================*/
	$(window).on('load resize', function(){
		var $imageArray = ["image/1701875251.jpg","image/2486143797.jpg", "image/1361598008.jpg", "image/0399149739.jpg", "image/2498549230.jpg", "image/1887317361.jpg", "image/2484996005.jpg", "image/0112347449.jpg", "image/0160759537.jpg", "image/0089469647.jpg", "image/4140089575.jpg", "image/1984102086.jpg", "image/0800772408.jpg", "image/4189350064.jpg", "image/3249309083.jpg", "image/1075737975.jpg"]

		if( $windowWidth < 750 ) {
			$('.border-box-inner').each(function(index){
				$(this).css({
				background: 'url(' + $imageArray[index] + ') no-repeat',
				backgroundSize: 'cover',
				objectFit: 'cover'
			});
		});
		} 
	});

	
});