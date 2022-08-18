
const header = document.querySelector("header"),
	  mainMenu = document.querySelector("section#gallery div#mainMenu"),
	  mainMenuOptions = document.querySelectorAll("div#mainMenu div"), /* NodeList */
	  albums = document.querySelector("section#gallery div#albums"),
	  entryWrapper = document.getElementById('entryWrapper'),
	  nav = document.querySelector("nav#main"),
	  allImages = document.getElementById("allImages");
	  allImages_wrapper = document.querySelector("div#allImages div#wrapper");

const albumNav = document.querySelectorAll("section#gallery div#albums nav span"),
	  albumReturn = albumNav[0],
	  albumCurrent = albumNav[1],
	  albumNext = albumNav[3];

const imageview = document.getElementById('imageview'),
	  imagesWrapper = document.getElementById('imageSlidesWrapper'),
	  controls = document.getElementById('controlsMenu'),
	  controlsToggle = document.getElementById('controlsToggle'),
	  controls_UI = Array.from(controls.firstElementChild.children),
	  createImgSlide = (img) => {
		  	const wrapper = document.createElement('li');
		  	wrapper.classList.add('imageSlide');
		  	wrapper.appendChild(img);
		  	return wrapper;
	  },
	  loader = document.querySelector('section#gallery div#loader');

function displayToggle(element) {
	/* elements take 0.5s to transition, 
	due to CSS animations duration */

	if (element.classList.contains('remove')) {
		element.classList.remove('remove');
		element.style.display = "block";
		element.classList.add('return');
	} 
	else if (element.classList.contains('return')){
		element.classList.remove('return');
		element.classList.add('remove');
		setTimeout(()=> {
			element.style.display = "none";
		}, 500);
	}
	else if (element.style.display == "block") {
		element.classList.add('remove');
		setTimeout(()=> {
			element.style.display = "none";
		}, 500);
	}
	else if (element.style.display == "") {
		element.classList.add('remove');
		setTimeout(()=> {
			element.style.display = "none";
		}, 500);
	}
	else {
		element.style.display = "block";
		element.classList.add('return');
	}
}

function displayToggleNav() {
	if(nav.attributes.active) {
		nav.style.opacity = 0;
		setTimeout(() => {
			nav.style.display = 'none';
			nav.attributes.active = false;
		}, 1050)
	} else {
		nav.style.display = 'block';
		nav.attributes.active = true;
		setTimeout(() => {
			nav.style.opacity = 1;
		}, 100)	
	}
}

// Function for first menu in Gallery section
mainMenuOptions.forEach((element, index) => {
	element.addEventListener('click', ()=> {

		setTimeout(()=> {
			displayToggle(mainMenu);
			entryWrapper.style = null;
		}, 750);

		currentGalleries.galleryIndex = index;
		albumCurrent.innerText = galleriesTwo[index].name;

		renderGallery(galleriesTwo[index])
		.then(() => {

			setTimeout(()=> {
				displayToggle(albums);
			}, 1000);
		})	
	})
})

//Nav button event listeners
albumReturn.addEventListener('click', ()=> {
	if(allOpen == true) {
		displayToggle(allImages)
		setTimeout(() => {
			allImages.style.display = 'none';
			displayToggle(albums);
		}, 325)

		allOpen = false;

		allImages.firstElementChild.innerHTML = null;
		entryWrapper.innerHTML = null;
		setTimeout(()=> {
			displayToggle(mainMenu);
		}, 550);
	} else {
		entryWrapper.style.opacity = 0;

		setTimeout(()=> {
			displayToggle(albums)
			entryWrapper.innerHTML = null;
			entryWrapper.style = null; //needs to work
		}, 325); //keep
		setTimeout(()=> {
			displayToggle(mainMenu);
		}, 850); //keep
	}
})

albumNext.addEventListener('click', ()=> {
	//code for if allImages is open 

	if (currentGalleries.galleryIndex == 3) {
		return null;
	}
	if (allImages.classList.contains('return')) {
		displayToggle(allImages);
	}

	allImages.firstElementChild.innerHTML = null;
	entryWrapper.innerHTML = null;

	

	setTimeout(()=> {
		let next;
		if(currentGalleries.galleryIndex < 3) {
			next = currentGalleries.galleryIndex;
			next++;
			currentGalleries.galleryIndex = next;
			albumCurrent.innerText = galleriesTwo[next].name;
			albumCurrent.style.opacity = 1;
		}
		albumCurrent.style.opacity = 1;

		setTimeout(()=> {
			renderGallery(galleriesTwo[next]);
		}, 400); 
	}, 400)	
})

albumNav[1].addEventListener('click', async () => {

	if(allOpen == false) {

		entryWrapper.style.opacity = 0;
		setTimeout(() => {
			entryWrapper.style.display = 'none';
			// allImages.style.display = 'block';
		}, 100)
		setTimeout(() => {
			loader.style.display = 'block';
			setTimeout(() => {
				loader.style.opacity = 0.3;
			}, 100)	
		}, 200)

		let theImages = await preloadImages_all(currentGalleries.all);

		theImages.forEach((img, index) => {

			img.addEventListener('click', ()=> {
				openAlbum(theImages, index);
				controls_UI[0].firstElementChild.innerHTML = index;
			})

			allImages_wrapper.appendChild(img);
		})

		setTimeout(() => {
			loader.style.opacity = 0;
			displayToggle(allImages)
			setTimeout(() => {
				loader.style.display = null;
			}, 100)
		}, 325)

		allOpen = true;

	} else {

		allImages.style.opacity = 0;
		setTimeout(() => {
			// allImages.style.display = 'none';
			displayToggle(allImages)
			entryWrapper.style.display = 'block';
		}, 325)
		setTimeout(() => {
			entryWrapper.style.opacity = 1;
		}, 525)

		allOpen = false;
	}
})

let allOpen = false;
//A Stateful object
let currentGalleries = {
	album: [],
	all: [],
	index: 0,
	galleryIndex: NaN,
	previouslyOpen: [],
}

const preloadImages = (src) => new Promise((resolve,reject) => {
	const img = new Image();
	img.onload = () => {
		resolve(img);
	} 
	img.onerror = reject;
	img.src = src;
})

const preloadImages_all = async (sources) => {
	return Promise.all(sources.map(preloadImages))
}

let albumentry = (albumobject, thumbnailImages) => {

	let title = albumobject.name.match(/[\d\.]+|\D+/g),
		date = albumobject.name.split(/[A-Z][a-z]+/g)[0]
		title = title[title.length - 1];
		
	let entry = document.createElement('div');
		date = `<h3>${date}</h3>`;
		title = `<h1>${title}</h1>`;
	entry.innerHTML = `${date} \n ${title}`;
	entry.classList.add('entry');

	let thumbnails = document.createElement('div');
		thumbnails.classList.add('thumbnails');
	thumbnailImages.forEach((element) => {
		thumbnails.appendChild(element);
	})
	entry.appendChild(thumbnails);

	entry.dataset.images = JSON.stringify(albumobject.images);

	return entry;
}

let openAlbum = async (album, index) => {

	//albumList, siteHeader and nav all get removed immediately on click
	displayToggle(albums);
	displayToggle(header);
	displayToggleNav();
	loader.style.display = 'block';

	setTimeout(() => {
		loader.style.opacity = 0.25;
	}, 200)

	// creates array with image elements
	// console.log(galleries[index].images);
	// currentGalleries.album = await preloadImages_all(galleries[index].images) //galleries[0].album[0]
	// nothing should happen until these are finished loading

	currentGalleries.album = await preloadImages_all(album);

	currentGalleries.album.map((element, index) => {
		let slide = createImgSlide(element);
		imageSlidesWrapper.appendChild(slide);

		//imagesSlidesWrapper.appendChild(element)
		//would only need this
	})
					
	let imageSlides = Array.from(imageSlidesWrapper.children);
	imagesControls(imageSlides);
	if(index == null) {
		imageSlides[0].style.display = "block";
		controls_UI[0].firstElementChild.innerHTML = 1;
	} else {
		imageSlides[index].style.display = "block";
		let place = ++index;
		controls_UI[0].firstElementChild.innerHTML = place;
	}
	
	controls_UI[0].lastElementChild.innerText = currentGalleries.album.length;

					//
	setTimeout(() => {
		//remove loader here
		loader.style.opacity = 0;
		setTimeout(() => {
			loader.style.display = 'none';
			imageview.style.display = 'flex';
			imageview.attributes.active = true;
			setTimeout(() => {
				imageview.style.opacity = '1';
				loader.style.display = null;
			}, 100)
		}, 325)
	}, 1000)
}

async function renderGallery(oneOfFour) { // gallery[x]
	let entries = [];
	let galleries = oneOfFour.albums;
	currentGalleries.all = oneOfFour.allImages;

	return new Promise((resolve, reject) => {
		//Make the gallery selections with their thumbnails
		galleries.forEach( async (album, index) => {
		
			let thumbnails = [];
			for(let i = 0; i < 3; i++) {
				album.thumbnails[i]
				thumbnails.push(album.thumbnails[i]);
			}
			thumbnails = await preloadImages_all(thumbnails);

			console.log(thumbnails);
			
			let albumElement = albumentry(album, thumbnails);

			albumElement.addEventListener('click', ()=> {
				openAlbum(JSON.parse(albumElement.dataset.images));
			})

			entries.push(albumElement);
			entryWrapper.appendChild(albumElement);
			albumElement.style.display = 'block';

			console.log(entries.length)

			
				if(entries.length == galleries.length) {

					let allThumbnails = Array.from(document.getElementsByClassName('thumbnails'));
					allThumbnails.forEach(element => {
						element.oncontextmenu = (e) => {
							e.preventDefault();
							e.stopPropagation();
							return false;
						}

						let imgs = Array.from(element.children);
						imgs.forEach(element => {
							element.oncontextmenu = (e) => {
								e.preventDefault();
								e.stopPropagation();
								return false;
							};
						})
					})

					resolve()
				} else {
					return;
				}
			})
	})
		
}



/*
	08. 06. 2022
	Need to create functionality for allImages
*/

//State Variables for Image Slider Function

imageview.oncontextmenu = (event) => {
	event.preventDefault();
	event.stopPropagation();
	return false;
}

function imagesControls(imagesArray){

	let isDragging = false,
	startPos = 0,
	currentTranslate = 0,
	prevTranslate = 0,
	animationID = 0,
	currentIndex = 0,
	getPositionX = (event) => {
		return event.type.includes('mouse') 
			? event.pageX 
			: event.touches[0].clientX;
	},
	getPositionY = (event) => {
		return event.type.includes('mouse') 
			? event.pageY 
			: event.touches[0].clientY;
	},
	setSliderPosition = (axis) => {
		if(axis == 'x') {
			imagesArray[currentIndex].style.transform = `translateX(${currentTranslate}px)`	
		}
		else if (axis == 'y') {
			imagesArray[currentIndex].style.transform = `translateY(${currentTranslate}px)`
		}
		
	},
	animationX = (element) => {
		if(isDragging) {
				setSliderPosition('x');
				requestAnimationFrame(animationX);
			}
	},
	animationY = (element) => {
		if(isDragging) {
			setSliderPosition('y');
			requestAnimationFrame(animationY);
		}
	},
	setPositionByIndexY = () => {
		currentTranslate = currentIndex * -window.innerHeight;
		prevTranslate = currentTranslate;
		setSliderPosition('y');
	},
	setPositionByIndexX = () => {
		currentTranslate = currentIndex * -window.innerWidth;
		prevTranslate = currentTranslate;
		setSliderPosition('x');
	};

	imagesArray.forEach((element, index, array) => {
		const image = element.firstElementChild;
		image.addEventListener('dragstart', (e) => {e.preventDefault() });

			//touch events
			element.addEventListener('touchstart', touchStart(index, element))
			element.addEventListener('touchend', touchEnd(index))
			element.addEventListener('touchmove', touchMove)


			//mouse events
			element.addEventListener('mousedown', touchStart(index, element))
			element.addEventListener('mouseup', touchEnd(index))
			element.addEventListener('mouseleave', touchEnd(index))
			element.addEventListener('mousemove', touchMove)
	});

	function touchStart(index) {
		return function(event) {

			//should prevent top of screen from being pulled down 
			event.stopPropagation()

			currentIndex = index;
			if(window.innerWidth >= 1024) {
				startPos = getPositionX(event);
				console.log('X read')
			} else {
				startPos = getPositionY(event);
				console.log('Y read')
			}

			
			isDragging = true;

			if(window.innerWidth >= 1024) {
				animationID = requestAnimationFrame(animationX);	
			} else {
				animationID = requestAnimationFrame(animationY);
			}
			imagesWrapper.classList.add('grabbing');
		}
	}

	function touchMove(event) {

		//should prevent top of screen from being pulled down 
		event.stopPropagation()

		if(isDragging) {
			if(window.innerWidth >= 1024) { 
				var currentPosition = getPositionX(event);
			} else {
				var currentPosition = getPositionY(event);
			}
			currentTranslate = prevTranslate + currentPosition - startPos;
		}
	}

	function touchEnd(index) {
		return function(event) {
			if(isDragging == true) {
				isDragging = false;
		    	cancelAnimationFrame(animationID)
		    	let scroll = initiateScroll(currentGalleries.album.length);

				const movedBy = currentTranslate - prevTranslate;
				//for mobile
				if(movedBy < -100 && currentIndex < imagesArray.length - 1) {
					currentIndex += 1;
					let place = currentIndex + 1;
					console.log(place);

					scroll.moveDown(place);
					
					controls_UI[0].firstElementChild.style.opacity = 0;		
					setTimeout(()=> {
						controls_UI[0].firstElementChild.innerHTML = place;
					}, 350)
					setTimeout(()=> {
						controls_UI[0].firstElementChild.style.opacity = 1;
					}, 400)
				}
				if(movedBy > 100 && currentIndex > 0) {
					currentIndex -= 1;
					let place = currentIndex + 1;
					console.log(place);

					scroll.moveBack(place)

					controls_UI[0].firstElementChild.style.opacity = 0;		
					setTimeout(()=> {
						controls_UI[0].firstElementChild.innerHTML = place;
					}, 350)
					setTimeout(()=> {
						controls_UI[0].firstElementChild.style.opacity = 1;
					}, 400)
				}

				imagesArray[index].style.opacity = 0;
				imagesArray[currentIndex].style.opacity = 0;
				imagesArray[currentIndex].style.transform = 'scale(0.85)'
				setTimeout(() => {
					imagesArray[index].style.display = 'none';

				}, 350);
				setTimeout(()=> {	
					imagesArray[currentIndex].style.display = 'block';
				}, 375)
				setTimeout(()=> {
					imagesArray[currentIndex].style.transform = 'scale(1)'	
					imagesArray[currentIndex].style.opacity = 1;
				}, 400)

				//prevent image disappeareance if it is last
				// didn't need to add further implementation :D 
				
			}
		imagesWrapper.classList.remove('grabbing');
		currentTranslate = 0;
		}
	}
}



// psuedocode for functions needed 

//  -adjust code for opening imageView

//  -change current image count every time image adjust

//  -scale in image, use imageSlidesWrapper
	//make it a toggle

//  -rotate function, rotate the scrollview and images wrapper,
//   

//  - exit function, ofc.

//  close menu after every button press, only while on mobile.
//  may have to add Previous and Next buttons for desktop as well.

//  maybe add touch controls from Traversy media as next thing,
//  so we can merge this branch with main

let scale = () => {
	//should imageSlidesWrapper just be imageSlides ?
		if(getComputedStyle(imagesWrapper).transform == 'matrix(1, 0, 0, 1, 0, 0)') {
			imageSlidesWrapper.style.transform = 'scale(1.25)'
			if(window.innerWidth >= 1024 && window.innerHeight <= 768) {
				imageSlidesWrapper.style.marginRight = '9%'
			}
		} else {
			imageSlidesWrapper.style.transform = 'scale(1)'
			if(window.innerWidth >= 1024 && window.innerHeight <= 768) {
				imageSlidesWrapper.style.marginRight = '4%'
			}
		}
	},
	openMenu = () => {
		controls.style.display = 'block';
		// controls.style.zIndex = 10;
		controlsToggle.classList.add('active');
		setTimeout(() => {
			controls.style.opacity = 1;
		}, 100)
	},
	exitMenu = () => {
		controls.style.opacity = 0;
		// controls.style.zIndex = 5;
		controlsToggle.classList.remove('active');
		setTimeout(() => {
			controls.style.display = 'none';
			scrollIndex.style.top = '0px';
		}, 325)	
	},
	exitViewer = () => {
		imageview.style.opacity = '0';
		let scroll = initiateScroll();
		scroll.restart();
		setTimeout(() => {
			imageview.style.display = 'none';
			imageview.attributes.active = false;
		}, 350);
		setTimeout(() => {
			displayToggle(header);
			displayToggle(albums);
			if(window.innerWidth < 1023) {
				setTimeout(exitMenu, 100);
			}
			displayToggleNav();
			imagesWrapper.innerHTML = null;	
			currentGalleries.index = 0;		
		}, 500)
	}

controls_UI[1].addEventListener('click', () => {
	scale()
	if(window.innerWidth < 1023) {
		setTimeout(exitMenu, 100);
	}
});
controls_UI[2].addEventListener('click', exitViewer);

controlsToggle.addEventListener('click', ()=> {
	if(controls.style.display == 'block') {
		exitMenu();
	} else {
		 openMenu();
	}
});


window.onresize = () => {
	// let size = [window.innerWidth, window.innerHeight];
	// if(imageview.classList.contains('active')) {
	// 	window.resizeTo(size[0], size[1]);
	// 	console.log('yep');
	// }	
	if(window.innerWidth >= 1023) {
		controls.style.display = 'block';
		controls.style.opacity = 1;
	} else if (window.innerWidth < 1023) {
		controls.style.display = 'none';
		controls.style.opacity = 0;
	}
}

// 06. 21. 2022
// Psuedo code for the scroll line
// every time imageView opens, divide length of current album 
// by height of scroll Line.
// on next image or prev image, move scroll Point by x amount
// (the result)
// use the requestAnimationFrame process used for the sliders 
// as well

const scrollWrapper = document.getElementById('scrollWrapper'),
	  scrollLine = document.getElementById('scrollLine'),
	  scrollIndex = document.getElementById('scrollIndexWrapper'),
	  scrollLength = getComputedStyle(scrollLine).height,
	  indexSize = getComputedStyle(scrollIndex).height;

	  // moveIndexDown = () => {
	  // 	scrollIndex.style.top = `{$divisor}px`;
	  // }

	  // moveIndexUp = () => {
	  // 	scrollIndex.style.top = `-{$divisor}px`;	
	  // }

let initiateScroll = (albumLength) => {
	let count = 1;
	const scrollLength = Math.floor(parseFloat(getComputedStyle(scrollLine).height)),
	  	  indexSize = parseFloat(getComputedStyle(scrollIndex).height),
	  	  amountOfMoves = Math.floor(scrollLength / (albumLength - 1)),
	  	  divisor = Math.floor(scrollLength / amountOfMoves),
	  	  moveAmount = Math.floor(scrollLength / divisor),
	  	  moveIndexDown = (index) => {
	  	  		let count = index - 1;
	  	  		let moveDown = count * moveAmount;
	  	  		console.log(count);
	  	  		scrollIndex.style.top = `${moveDown}px`;	
	  	  		count++;
	  	  },
	  	  moveIndexBack = (index) => {
	  	  	// let count = index - 1;
	  	  	let current = index * moveAmount;
	  	  	let moveBack = current - moveAmount;
	  	  	console.log(count);
	  		scrollIndex.style.top = `${moveBack}px`;
	  		count--;	
	  	  },
	  	  animateDown = (scrollIndex) => {
	  	  	moveIndexDown();
			// requestAnimationFrame(animateDown);	
	  	  },
	  	  animateBack = (scrollIndex) => {
	  	  	moveIndexBack();
			// requestAnimationFrame(animateBack);
	  	  }
	  	  

	let animationID = 0,
		moveDown = (index) => {
			// animationID = requestAnimationFrame(animateDown);
			moveIndexDown(index);
			console.log(amountOfMoves);
			console.log(scrollLength)
			// setTimeout(()=> {
			// 	cancelAnimationFrame(animationID);
			// }, 100)

		}
		moveBack = (index) => {
			// animationID = requestAnimationFrame(animateBack);
			moveIndexBack(index);
			console.log('moveback');
			// setTimeout(()=> {
			// 	cancelAnimationFrame(animationID);
			// }, 100)
		}
		restart = () => {
			scrollIndex.style.top = `0px`;
		}

		return {
			moveDown: moveDown,
			moveBack: moveBack,
			restart: restart
		}
}