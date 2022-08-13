/*This code may be haphazardly written in the beginning, but thats okay :D*/

/*
	G E T T I N G  P A G E  E L E M E N T S 
	A S   V A R I A B L E S 
*/

let titleH1 = document.getElementById('title').childNodes[1],
	titleH3 = document.getElementById('title').childNodes[3],
	titleLogo = document.getElementById('title').childNodes[5],
	imgWrappers = Array.from(document.querySelectorAll('.imgWrapper')),
	showcaseWrapper = document.getElementById('showcaseWrapper'),
	homeMenu = document.getElementById('menu'),
	menuOptions = Array.from(document.querySelectorAll('.option')),
	CTAs = Array.from(document.querySelectorAll('div#menu div.option span')),
	exclaimer = document.getElementById('exclaimer'),
	UIElement = document.getElementById('UIEwrapper'),
	corners = document.getElementsByClassName('crnr');

let activeStates = ['', 
	'secondCorner_hovered',
	'thirdCorner_hovered',
	'fourthCorner_hovered',
	'crnr2-active', //4
	'crnr3-active', //5
	'crnr4-active'  //6
];

//split this in the future to create arrays for other image groups
let images = Array.from(document.querySelectorAll('img')).slice(0, 4);

//Elements in array written with loop instead of by hand
let headerImages = [
	"001.jpg",
	"002.jpg",
	"003.jpg",
	"004.jpg",
	"005.jpg",
	"006.jpg",
	"007.jpg",
	"008.jpg",
	"009.jpg",
	"010.jpg",
	"011.jpg",
	"012.jpg"
];
// for (let i = 1; i < 13; i++) {
// 	headerImages.push('img/header/' +i+ '.jpg');
// }
headerImages = headerImages.map(img => './resources/arrival/' +img);

//sets some default styling for elements and allows toggling
function toggleDefaults(tog) {
	if(tog) {
		imgWrappers[0].style.top = "45%";
		imgWrappers[1].style.top = "55%";
		imgWrappers[2].style.top = "45%";
		imgWrappers[3].style.top = "55%";
	} else if (!tog) {
		imgWrappers[0].style.top = "";
		imgWrappers[1].style.top = "";
		imgWrappers[2].style.top = "";
		imgWrappers[3].style.top = "";
	}
}

function toggleMobile(tog) {
	if(tog) {
		imgWrappers[0].style.left = "60%";
		imgWrappers[1].style.left = "40%";
		imgWrappers[2].style.left = "60%";
		imgWrappers[3].style.left = "40%";
	} else if (!tog) {
		imgWrappers[0].style.left = "";
		imgWrappers[1].style.left = "";
		imgWrappers[2].style.left = "";
		imgWrappers[3].style.left = "";
	}
}

function mediaQuery1024() {
	if(window.innerWidth <= 480) {
		return 480
	}
	else if(window.innerWidth > 480 && window.innerWidth < 1024) {
		return 1024
	}
	else {
		return null;
	}
}
(mediaQuery1024() == 480 || mediaQuery1024() == 1024) ? toggleDefaults(false) : toggleDefaults(true);
(mediaQuery1024() == 480 || mediaQuery1024() == 1024) ? toggleMobile(true) : toggleMobile(false);

/* 5.4.2022
	need to adjust mediaQuery where these sizes change, around 768 */
function carouselQueried(func) { //will adjust styles of carousel based on device width
	let x = func();
	// console.log(x);
		if (x == 480) {
			if(images[1].src.includes(headerImages[1])) {
				images[1].style.objectPosition = "center -100px";
			} 
			else { images[1].style = null; }

			if(images[2].src.includes(headerImages[2])) {
				images[2].style.objectPosition = "center -100px";
			} 
			else { images[2].style = null; }

			if(images[3].src.includes(headerImages[3])) {
				images[3].style.objectPosition = "center -150px";
			} 
			else { images[3].style = null; }
		};
		if ( x == 1024) {
			if(images[1].src.includes(headerImages[1])) {
				images[1].style.objectPosition = "center -200px";
			} 
			else { images[1].style = null; }
			if(images[2].src.includes(headerImages[2])) {
				images[2].style.objectPosition = "center -200px";
			} 
			else { images[2].style = null; }	
			if(images[3].src.includes(headerImages[3])) {
				images[3].style.objectPosition = "center -300px";
			} 
			else { images[3].style = null; }
		};
	}
carouselQueried(mediaQuery1024);

/*
	C a r o u s e l  
	F u n c t i o n a l i t y
*/
	
function addIntro () {
		imgWrappers[0].classList.add('loadUp_In');
		imgWrappers[1].classList.add('loadDown_In');
		imgWrappers[2].classList.add('loadUp_In');
		imgWrappers[3].classList.add('loadDown_In');
}

function removeIntro () {
		imgWrappers[0].classList.remove('loadUp_In');
		imgWrappers[1].classList.remove('loadDown_In');
		imgWrappers[2].classList.remove('loadUp_In');
		imgWrappers[3].classList.remove('loadDown_In');
}

function addOutro () {
		imgWrappers[0].classList.add('loadUp_Out');
		imgWrappers[1].classList.add('loadDown_Out');
		imgWrappers[2].classList.add('loadUp_Out');
		imgWrappers[3].classList.add('loadDown_Out');
}

function removeOutro () {
		imgWrappers[0].classList.remove('loadUp_Out');
		imgWrappers[1].classList.remove('loadDown_Out');
		imgWrappers[2].classList.remove('loadUp_Out');
		imgWrappers[3].classList.remove('loadDown_Out');
}

// function headerCarousel(toggle) {
// 	let imgcnt = 4;
// 	return runCarousel(imgcnt);
// }

	function runCarousel() {
		// let imgcnt = 4; //initial set
		if (imgWrappers[0].classList.contains('loadUp_In')) { /*Their default state*/
			toggleDefaults(false);
			toggleMobile(false);
			removeIntro();
			addOutro();
		};

		setTimeout(() => { //change images to next set during transition
			let imgcnt;

			if (images[0].src.includes('009')) {
				imgcnt = 0;
				for (let i = 0; i < images.length; i++) {
					images[i].src = headerImages[imgcnt];
					carouselQueried(mediaQuery1024);
					imgcnt++;
					// console.log(imgcnt);
				}
			} else if (images[0].src.includes('001')) {
				imgcnt = 4;
				for (let i = 0; i < images.length; i++) {
					images[i].src = headerImages[imgcnt];
					carouselQueried(mediaQuery1024);
					imgcnt++;
					// console.log(imgcnt);
				}
			} else if (images[0].src.includes('005')) {
				imgcnt = 8;
				for (let i = 0; i < images.length; i++) {
					images[i].src = headerImages[imgcnt];
					carouselQueried(mediaQuery1024);
					imgcnt++;
					// console.log(imgcnt);
				}
			}
		}, 1700)//0.2s after .load... animation sequence is complete

		setTimeout(() => {
			removeOutro();
			addIntro(); 
			(mediaQuery1024() == 480 || mediaQuery1024() == 1024) ? toggleMobile(true) : toggleMobile(false);
			(mediaQuery1024() == 480 || mediaQuery1024() == 1024) ? toggleDefaults(false) : toggleDefaults(true);
		}, 2500); //bring them back in
	}

let runTheCarousel = {
	set: function() {
		runCarousel();
	},

	repeat: function() {
		this.timeoutID = setInterval(function() {
			runCarousel();
		}.bind(this), 5000);
	},

	cease: function() {
		clearTimeout(this.timeoutID);
	}
}
 

// f u n c t i o n  t o  s w i t c h  t i t l e 
function switchTitle() {
		if (titleH1.classList.contains('switchOut') == true) {
			titleLogo.classList.remove('switchIn');
			titleLogo.classList.add('switchOut');
			setTimeout(() => {
				titleLogo.style.display = "none"; 

				setTimeout(() => {
					titleH1.style.display = "block";
					titleH3.style.display = "block";

					titleH1.classList.add('switchIn');
					titleH3.classList.add('switchIn');
				}, 300)
			}, 1100);
		}

		else if(titleH1.classList.contains('') == false || titleH1.classList.contains('switchIn')) {
			titleH1.classList.add('switchOut');
			titleH3.classList.add('switchOut');
			setTimeout(() => {
				titleH1.style.display = "none";
				titleH3.style.display = "none";
			}, 1100);

			setTimeout(() => {
				titleLogo.style.display = "block";
				titleLogo.classList.add('switchIn');
			}, 1300);
		}  
} /* 05.05.2022
	It's probably due to some sort of overload,
	yet after two runs of this function, it ceases . . . entirely?

/*
	f u n c t i o n  t o  s w i t c h  
	c a r o u s e l  t o  m e n u
*/
function carouselToMenu() {
		if (showcaseWrapper.classList.contains('switchOut')) {
			switchTitle();
			homeMenu.classList.remove('switchIn');
			homeMenu.classList.add('switchOut');

			setTimeout(() => {
				homeMenu.style.display = "none";
			}, 1100);

			setTimeout(() => {
				showcaseWrapper.style.display = "block";
				showcaseWrapper.classList.add('switchIn');
				showcaseWrapper.classList.remove('switchOut');
			}, 1300)
		}

		else if (!showcaseWrapper.classList.contains('') || showcaseWrapper.classList.contains('switchIn')) {

			showcaseWrapper.classList.add('switchOut');
			switchTitle();

			setTimeout(() => {
				showcaseWrapper.style.display = "none";
			}, 1100)

			setTimeout(() => {
				homeMenu.style.display = "block";
				homeMenu.classList.remove('switchOut');
				homeMenu.classList.add('switchIn');
			}, 1300)
			setTimeout(() => {
				CTAs.forEach(element => {
					element.style.opacity = 1;
				})
			}, 2700)
		}
}

// 02. 22. 2022 C O M M E N T  O U T  T O  S T O P  C A R O U S E L
// let runTheCarousel = setTimeout(() => {
// 	headerCarousel(true);
// }, 3500); 


/*
	10.23.2021@0015 have to define runCarousel outside of headerCarousel in order
	to use clearInterval to stop it from running
*/



/*
	U I E l e m e n t 
	F u n c t i o a l i t y
*/

// C l i c k  A n i m a t i o n 
UIElement.addEventListener('click', function() {
		let states = activeStates.slice(4);

		if(this.classList.contains('UIE_nonActive')) {

			exclaimer.style.opacity = 0;
			setTimeout(() => {
				exclaimer.style.display = 'none';
			}, 525);

			for (let i = 0; i < states.length; i++) {
				corners[1+i].classList.remove(activeStates[1+i]);
			};
			UIElement.classList.remove('UIE_nonActive');
			UIElement.classList.add('UIE_active');

			setTimeout(() => {	
				for (let i = 0; i < states.length; i++) {
					corners[1+i].setAttribute('id', states[i]);
				};
			}, 100);
			carouselToMenu();
			runTheCarousel.cease();

		} else if (this.classList.contains('UIE_active')) {

			for (let i = 0; i < states.length; i++) {
				corners[1+i].classList.add(activeStates[1+i]);
			};
			UIElement.classList.remove('UIE_active');
			UIElement.classList.add('UIE_nonActive');
			
			setTimeout(() => {	
				for (let i = 0; i < states.length; i++) {
					corners[1+i].removeAttribute('id', states[i]);
				};
			}, 100);
			carouselToMenu();
			runTheCarousel.repeat();
		}
		
		
});

















