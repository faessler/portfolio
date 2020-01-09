$(function() {
	// ======================== //
	// JUMP TO BOTTOM FOR START
	// ======================== //
	$('html, body').scrollTop( $(document).height() );



	// ======================== //
	// SCROLL MAGIC
	// ======================== //
	// INIT CONTROLLER
	var controller = new ScrollMagic.Controller();

	// SCENES
	// // Scene 8 to scene 7
	// var scene = new ScrollMagic.Scene({
	// 	triggerElement: ".section--8",
	// 	duration: "50%",
	// 	offset: window.innerHeight / 2,
	// 	triggerHook: 0
	// })
	// .setTween(".rocket", {top: "50%", left: "-25%", scale: 1})
	// .addTo(controller);

	// Scene 7 to scene 6
	var scene = new ScrollMagic.Scene({
		triggerElement: ".section--7",
		duration: "50%",
		offset: window.innerHeight / 2,
		triggerHook: 0
	})
	.setTween(".rocket", {top: "50%", left: "15%", scale: .8})
	.addTo(controller);

	// Scene 6 to scene 5
	var scene = new ScrollMagic.Scene({
		triggerElement: ".section--6",
		duration: "50%",
		offset: window.innerHeight / 2,
		triggerHook: 0
	})
	.setTween(".rocket", {top: "50%", left: "-25%", scale: 1})
	.addTo(controller);

	// Scene 5 to scene 4
	var scene = new ScrollMagic.Scene({
		triggerElement: ".section--5",
		duration: "50%",
		offset: window.innerHeight / 2,
		triggerHook: 0
	})
	.setTween(".rocket", {top: "50%", left: "70%", scale: 1})
	.addTo(controller);

	// Scene 4 to scene 3
	var scene = new ScrollMagic.Scene({
		triggerElement: ".section--4",
		duration: "50%",
		offset: window.innerHeight / 2,
		triggerHook: 0
	})
	.setTween(".rocket", {top: "50%", left: "50%", scale: .7})
	.addTo(controller);

	// Scene 3 to scene 2
	var scene = new ScrollMagic.Scene({
		triggerElement: ".section--3",
		duration: "50%",
		offset: window.innerHeight / 2,
		triggerHook: 0
	})
	.setTween(".rocket", {top: "50%", left: "25%", scale: 1})
	.addTo(controller);


	// CLOUDS
	var scene = new ScrollMagic.Scene({
		triggerElement: ".section--2",
		offset: window.innerHeight / 4,
		triggerHook: 0
	})
    .on("enter", function () {
        // $('.section__clouds').removeClass('section__clouds--show');
    })
    .on("leave", function () {
        $('.section__clouds').addClass('section__clouds--show');
    })
	.addTo(controller);

	// ROCKET IMAGE
	var scene = new ScrollMagic.Scene({
		triggerElement: ".section--2",
		offset: window.innerHeight / 4,
		duration: "50%",
		triggerHook: 0.5
	})
    .on("enter", function () {
		$('.rocket__image').addClass('rocket__image--show');
    })
    .on("leave", function () {
		$('.rocket__image').removeClass('rocket__image--show');
    })
	.addTo(controller);



	// SPACE SHIP
	var scene = new ScrollMagic.Scene({
		triggerElement: ".section--2",
		duration: "50%",
		offset: window.innerHeight / 4,
		triggerHook: 0
	})
	.setTween(".rocket", {top: "100%", left: "50%", scale: .5})
	.addTo(controller);

	// MOUNTAINS
	var mountainTween = new TimelineLite();
	mountainTween.add([
        // TweenLite.fromTo('.section__mountains__layer--1', 1, {bottom: '-50%'}, {bottom: '0'}),
        // TweenLite.fromTo('.section__mountains__layer--2', 1, {bottom: '-40%'}, {bottom: '0'}),
		// TweenLite.fromTo('.section__mountains__layer--3', 1, {bottom: '-30%'}, {bottom: '0'}),
        // TweenLite.fromTo('.section__mountains__layer--4', 1, {bottom: '-30%'}, {bottom: '0'}),
		// TweenLite.fromTo('.section__mountains__layer--5', 1, {bottom: '0%'}, {bottom: '0'}),
		// TweenLite.fromTo('.section__mountains__layer--6', 1, {bottom: '5%'}, {bottom: '0'})

    ]);

	var scene = new ScrollMagic.Scene({
		triggerElement: ".section--2",
		duration: "50%",
		offset: window.innerHeight / 2,
		triggerHook: 0
	})
	.setTween(mountainTween)
	.addTo(controller);



	// ======================== //
	// SECTION 7 - SLIDER
	// ======================== //
	$(".section__wrap__references__slider").lightSlider({
        item: 1,
        autoWidth: false,
        slideMove: 1,
        slideMargin: 10,

        useCSS: true,
        cssEasing: 'ease',
        easing: 'linear',

        controls: true,
        prevHtml: '<img src="img/section7/angle.svg" alt="<">',
        nextHtml: '<img src="img/section7/angle.svg" alt=">">',

        rtl:false,
        adaptiveHeight:false,

        pager: true,
        gallery: false,
        currentPagerPosition: 'middle',

        responsive : [],
    });
	$(".lSAction").appendTo(".lSSlideOuter");



	// ======================== //
	// PAGE LOADER
	// ======================== //
	$(window).load(function(){
		$('.pageloading').fadeOut('slow',function(){
			$(this).remove();
		});
	});
});
