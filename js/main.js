
// JS for Navigation Section
/*
	02. 16. 2022
	JS page for managing all individual sections code
*/


// Navigation Menu, Section Traversal 
let navToggle = document.querySelector('nav#main'),
	realNavToggle = document.querySelector('nav#main div.cornerWrapper'),
	navPage = document.getElementById('navPage'),
	// navMenuItems = document.getElementsByClassName('navPageItems'),
	navMenuItems = document.querySelectorAll('div#navPage ul li'),
	navToggle_Corners = document.querySelectorAll('nav#main span.corner'),
	siteHeader = document.getElementsByTagName("header")[0];
	siteHeader_h1 = document.querySelector("header h1");


const sections = [
	document.getElementById("arrival"),
	document.getElementById("selfConcept"),
	document.getElementById("gallery"),
	document.getElementById("transmissions")
]

function invertHeaderNav(toggle) {
	if(toggle == true) {
		siteHeader_h1.style.color = "white";
		navToggle_Corners.forEach((element) => {
			element.style.borderColor = "white";
		});
		setTimeout(() => {
			navToggle.style.backgroundColor = "black";
		}, 1000)
		console.log("inverted");
	} else {
		siteHeader_h1.style.color = "black";
		navToggle_Corners.forEach((element) => {
			element.style.borderColor = "black";
		});
		navToggle.style.backgroundColor = "transparent";
		console.log("reverted");
	}
}

function toggleMenu(exclude, contrast, partial) { 

		//called with partial as true, navCorners opacity 0. Must bring back opacity after section switch

		if(navToggle.classList.contains('menu-active')) {
			navToggle.classList.remove('menu-active');
			// navToggle.style.backgroundColor = "transparent";

			switch(exclude) {
				case 0:
				navMenuItems.forEach((element, index) => {
					if(element.classList.contains('appear')) {
						element.classList.remove('appear');
					}
				})
				break;

				case 1:
				navMenuItems.forEach((element, index) => {
					if(index == exclude) {
						return;
					}
					else if(element.classList.contains('appear')) {
						element.classList.remove('appear');
					}				
				})
				break;

				case 2:
				navMenuItems.forEach((element, index) => {
					if(index == exclude) {
						return;
					}
					else if(element.classList.contains('appear')) {
						element.classList.remove('appear');
					}
				})
				break;

				case 3:
				navMenuItems.forEach((element, index) => {
					if(index == exclude) {
						return;
					}
					else if(element.classList.contains('appear')) {
						element.classList.remove('appear');
					}
				})
				break;
			}

			if (!getComputedStyle(navToggle).backgroundColor == "rgba(0, 0, 0, 0)") {
				navToggle.style.backgroundColor = "transparent";
				siteHeader.style.backgroundColor = "";
			}

			if (partial == false ) {
				setTimeout(() => {
					navPage.style.opacity = "0";
					navToggle_Corners.forEach((element) => {
						element.classList.remove('menu-active');
						// if(window.innerWidth < 1024) {
							element.style.opacity = "1";
						// }
					});
				}, 400);
				setTimeout(() => {
					navPage.style.display = "none";
					console.log(getComputedStyle(navPage).display);

					if(contrast == true) {
						if(window.innerWidth < 1024) {
							navToggle.style.backgroundColor = "black";

						}
					}
				}, 900);
			}

			 else if (partial == true) {
				setTimeout(() => {
					navToggle_Corners.forEach((element) => {
						element.classList.remove('menu-active');
						if(window.innerWidth < 1024) {
							element.style.opacity = "1";
						}
					});
				}, 400);
				setTimeout(() => {
					navToggle_Corners.forEach((element) => {
						element.style.opacity = "0";
					})
				}, 500);
				setTimeout(() => {
					navPage.style.opacity = "0";
					console.log(getComputedStyle(navPage).display);

					if(contrast === true) {
						if(window.innerWidth < 1024) {
							navToggle.style.backgroundColor = "black";
							siteHeader.style.backgroundColor = "black";
						}
					}
				}, 1100);
				setTimeout(() => {
					navPage.style.display = "none";
				}, 1800);
			} 

			else {
				setTimeout(() => {
					navPage.style.opacity = "0";
					navToggle_Corners.forEach((element) => {
						element.classList.remove('menu-active');
						if(window.innerWidth < 1024) {
							element.style.opacity = "1";
						}
					});
				}, 400);
				setTimeout(() => {
					navPage.style.display = "none";
					console.log(getComputedStyle(navPage).display);

					if(contrast == true) {
						console.log("yes");
						if(window.innerWidth < 1024) {
							navToggle.style.backgroundColor = "black";
						}
					}
				}, 900);
			}	
		} 

		else {
			navToggle.classList.add('menu-active');
			navToggle.style.backgroundColor = 'transparent';
			navPage.style.display = "block";
			navToggle_Corners.forEach((element) => {
				element.classList.add('menu-active');
				// if(window.innerWidth < 1024) {
					element.style.opacity = "0";
				// }
			});
			setTimeout(() => {
				navPage.style.opacity = 1;
			}, 100)
			setTimeout(() => {
				navMenuItems.forEach((element, index) => {
					setTimeout( function() {
						element.classList.add('appear');
					}, index * 350);
				})
			}, 900)
		}
}

function selectSection(sectionNumber) {
	let button = navMenuItems[sectionNumber].firstElementChild;
	let buttons = [];
	navMenuItems.forEach((element) => {
		buttons.push(element.firstElementChild);
	})
	// buttons = Array.from(buttons);

	if(sections[0].classList.contains("active")) { //if arrival is currently being viewed
		
		button.classList.add("active"); //this and previous line set nav menu option as 'disabled'
		sections[0].style.opacity = 0;

		setTimeout(() => {
			sections[0].classList.remove("active");
		}, 1050);
		setTimeout(() => {
			sections[sectionNumber].classList.add("active");
		}, 1300);
		setTimeout(() => {
			sections[sectionNumber].style.opacity = 1;
		}, 1500);
	} 
	
	else { //while visiting sections other than #arrival
		sections.forEach((element, index) => {
			element.classList.remove("active");
			element.style.opacity = 0;
			
			if(sectionNumber == index) {
				element.classList.add("active");
				element.style.opacity = 1;
			}
			
			if(sectionNumber === 2) {
				setTimeout(() => {	
					navMenuItems[index].classList.remove("appear");

					setTimeout(() => {
						navPage.style.opacity = "0";
						navToggle_Corners.forEach((element) => {
							element.style.opacity = "1";
						})
						
						buttons.forEach((element) => {
							element.classList.remove("active");
						});
						button.classList.add("active");
					}, 600)
				}, 1200)
			}	
			else {
			 	setTimeout(() => {	
					navMenuItems[index].classList.remove("appear");
					// invertHeaderNav(false);

					setTimeout(() => {
						navPage.style.opacity = "0";
						navToggle_Corners.forEach((element) => {
							element.style.opacity = "1";
						})

						buttons.forEach((element) => {
							element.classList.remove("active");
						});
						button.classList.add("active");
						//the nav page should be closed at this point, set button selected to active
					}, 600)
				}, 1200)
			}			
		});
	}	
}

function toggleHeaderNav() {
	let elements = [siteHeader, navToggle];

	elements.forEach((element) => {
		if(getComputedStyle(element).display == "block") {
			element.style.opacity = "0";

			setTimeout(()=> {
				element.style.display = "none";
			}, 500)
		}
		else if(getComputedStyle(element).display == "none") {
			element.style.display = "block";

			setTimeout(()=> {
				element.style.opacity = 1;
			}, 500)
		}
	})
}

/* * *
  
	F u n c t i o n  T o  B u t t o n  A s s i g n m e n t s

* * */	
realNavToggle.addEventListener('click', () => {
	toggleMenu();

	if(sections[2].classList.contains('active')) {
		navToggle_Corners.forEach((element) => {
			element.style.borderColor = "white";
		});
	}
});

// navMenuItems[0].addEventListener('click', toggleMenu);

navMenuItems.forEach((element, index) => {

	element.addEventListener('click', () => {
		let button = element.firstElementChild;

		if (button.classList.contains("active")){
			return;
		}

		//control for close button in nav menu
		else if (index === 0) {
			if(sections[2].classList.contains('active')) {
				toggleMenu(0, true, false);
				setTimeout(()=> {
					navToggle.style.backgroundColor = 'black';	
				}, 1000)
			} else {
				toggleMenu(0, false, false);
			}
			
		}
		else if (index === 2) {
			toggleMenu(index, true, true);
			setTimeout(() => {
				invertHeaderNav(true);
				selectSection(index);
			}, 125)
		} 
		else {
			toggleMenu(index, false, true);
			setTimeout(() => {
				invertHeaderNav();
				selectSection(index);
			}, 125)
		}
	})
}) 

/*
	02. 16. 2022
	On option selection, chosen option remains as
	rest recede. 
	Menu icon fades immediately after,
	then menupage fades away as selected section fades in [ DONE ]

	Edit toggleMenu function to take parameters,
	for "all", "excludeFirst", "excludeSecond", "excludeThird" [ DONE ]

	within selectSection function, 
	if section chosen is Gallery -> change header and menu Corners color [ DONE ]

	a switchSection function which takes section index and when to 
	set opacity (setTimeout number) as parameters [ DONE ]
*/

