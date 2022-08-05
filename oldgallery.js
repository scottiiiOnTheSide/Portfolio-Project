
const header = document.querySelector("header"),
	  mainMenu = document.querySelector("section#gallery div#mainMenu"),
	  mainMenuOptions = document.querySelectorAll("div#mainMenu div"), /* NodeList */
	  albums = document.querySelector("section#gallery div#albums"),
	  entryWrapper = document.getElementById('entryWrapper'),
	  nav = document.querySelector("nav#main");

const albumNav = document.querySelectorAll("section#gallery div#albums nav span"),
	  albumReturn = albumNav[0],
	  albumCurrent = albumNav[1],
	  albumNext = albumNav[3];

const imageview = document.getElementById('imageview'),
	  imagesWrapper = document.getElementById('imageSlidesWrapper'),
	  controls = document.getElementById('controlsMenu'),
	  controlsToggle = document.getElementById('controlsToggle'),
	  controls_UI = Array.from(controls.firstElementChild.children),
	  createImgSlide = (src) => {
		  	const wrapper = document.createElement('li'),
		  		  img = document.createElement('img');
		  	wrapper.classList.add('imageSlide');
		  	img.src = src;
		  	wrapper.appendChild(img);
		  	return wrapper;
	  },
	  loader = document.querySelector('section#gallery div#loader');

function extendAlbums(baseAlbum) {
	let albums = [];
	let allImages = [];
	let gallery = baseAlbum.name;
	let albumBase = {
		name: "",
		imgcnt: "",
		images: [],
	}

	for (let [key, value] of Object.entries(baseAlbum)) {

		let entry = Object.create(albumBase);
		let array = []  					  
		entry.name = key;
		entry.imgcnt = value;
		for (let i = 1; i <= value; i++) {
			array.push(`img/${gallery}/${key}/${i}.jpg`);
		}
		entry.images = array;
		
		for (let i = 0; i < array.length; i++) {
			let entries = `${array[i]}`;
			allImages.push(entries);
		}
		albums.push(entry);
	}
	let fullAlbum = {albums: albums, allImages: allImages, name: gallery};
	return fullAlbum;
}

let archAndTravel = {
	"4. 2019 Trip to Boston" : 5,
	"4. 2019 Trip to NYC" : 8,
	"12. 2019 Trip to Europe" : 8,
}; Object.defineProperty(archAndTravel, 'name', {
	enumerable: false,
	value: "Architecture and Travel",
}); 
archAndTravel = extendAlbums(archAndTravel);


let carsTechToys = {
	"8. 2019 Custom PC Build - Byakko" : 5,
	"10. 2019 Local Car Meeting" : 5,
	"11. 2019 Las Olas Auto Show" : 9,
	"Extras" : 3, 
}; Object.defineProperty(carsTechToys, 'name', {
	enumerable: false,
	value: "Cars, Tech, Toys",
});
carsTechToys = extendAlbums(carsTechToys);


let collabs = {
	"4. 19. 2021 Sky by the River" : 4,
	"4. 21. 2019 Carmen, Dumbo Park" : 9,
	"7. 09. 2019 Emillyn, Las Olas" : 5,
	"7. 31. 2019 Emillyn, Las Olas" : 6,
	"9. 08. 2019 Paii, Times Square + Brooklyn Bridge" : 9,
	"9. 24. 2019 Emillyn, Las Olas Beach" : 8,
	"10. 23. 2019 Emillyn, Las Olas Beach" : 7,
	"10. 25. 2019 Annelise, Las Olas Beach" : 4,
	"10. 28. 2019 Sky, Tennis Court" : 3,
	"11. 02. 2019 Jacq, Tennis Court" : 5,
	"11. 14. 2019 Sidney, Canal Street" : 6,
	"11. 15. 2019 Aby, DUMBO" : 7,
	"11. 16. 2019 Carmen, Canal Street" : 8,
	"12. 01. 2019 Syd, Reed Reef Beach" : 4,
	"12. 07. 2019 MusicVideoBTS": 3,
	"12. 09. 2019 Annelise" : 3,
}; Object.defineProperty(collabs, 'name', {
	enumerable: false,
	value: "Collaborations",
});
collabs = extendAlbums(collabs);


let lifeAndEvents = {
	"3. 24. 2019 Prince in the Park" : 6,
	"4. 2019 Boston Photo Journal" : 11,
	"6. 5. 2019 Noel's Prom Shoot" : 6,
	"12. 7. 2019 MusicVideoBTS" : 7,
	"5. 5. 2021 Cinco de Mayo @ Naked Taco" : 15,
}; Object.defineProperty(lifeAndEvents, 'name', {
	enumerable: false,
	value: "Life and Events",
});
lifeAndEvents = extendAlbums(lifeAndEvents);

let galleries = [collabs, lifeAndEvents, carsTechToys, archAndTravel];

//A Stateful object
let currentGalleries = {
	album: [],
	all: [],
	index: 0,
	galleryIndex: NaN,
}

// technically the class which all all album entries inherit
let albumEntry = {
	title: "",
	date: "",
	thumbnailImgs: [],
	create: function() {
		let entry = document.createElement('div'),
			date = `<h3>${this.date}</h3>`,
			title = `<h1>${this.title}</h1>`;
		entry.classList.add('entry');
		entry.innerHTML = `${date} \n ${title}`;

		let thumbnails = document.createElement('div');
		thumbnails.classList.add('thumbnails');

		this.thumbnailImgs.forEach((img) => {
			thumbnails.appendChild(img);
		})
		entry.appendChild(thumbnails);
		return entry;
	}
};

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

		// renderGallery(galleries[index]);
		renderGallery(galleriesTwo[index]);
		currentGalleries.galleryIndex = index;
		// albumCurrent.innerText = galleries[index].name;
		 albumCurrent.innerText = galleriesTwo[index].name;

		setTimeout(()=> {
			//06. 22. 2022
			//can possibly run promise here?
			//when mainMenu display is none, 
			//then displayToggle albums
			displayToggle(mainMenu);
		}, 750);
		setTimeout(()=> {
			displayToggle(albums);
		}, 1250);

	})
})

//Nav button event listeners
albumReturn.addEventListener('click', ()=> {
	if(allImages.classList.contains('return')) {
		displayToggle(allImages);
	}
	displayToggle(albums);
	allImages.firstElementChild.innerHTML = null;
	albumDivs = document.querySelectorAll("section#gallery div#albums div.entry");
	albumDivs.forEach((element)=> { element.remove() });
	setTimeout(()=> {
		displayToggle(mainMenu);
	}, 550); //keep
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
	albumDivs = document.querySelectorAll("section#gallery div#albums div.entry");
	albumDivs.forEach((element)=> { 
		element.style.opacity = 0;
		albumCurrent.style.opacity = 0;
	});
	setTimeout(()=> {
		albumDivs.forEach((element)=> { 
			element.remove();
		});
	}, 350);

	setTimeout(()=> {
		let next;
		if(currentGalleries.galleryIndex < 3) {
			next = currentGalleries.galleryIndex;
			next++;
			currentGalleries.galleryIndex = next;
			albumCurrent.innerText = galleries[next].name;
			albumCurrent.style.opacity = 1;
		}
		albumCurrent.style.opacity = 1;
	}, 400)

	setTimeout(()=> {
		renderGallery(galleries[currentGalleries.galleryIndex]);
	}, 800); //keep
})

albumCurrent.addEventListener('click', ()=> {
	let albumEntries = document.querySelectorAll("section#gallery div#albums div.entry");

	if (allImages.classList.contains('return')) {
		displayToggle(allImages);
		setTimeout(() => {
			albumEntries.forEach((element) => displayToggle(element));
		}, 550);
	}
	else {
		albumEntries.forEach((element) => displayToggle(element));
		setTimeout(() => {
			displayToggle(allImages);
		}, 550);
	} //keep
})

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


async function renderGallery(oneOfFour) { // gallery[x]
	let entries = [];
	let galleries = oneOfFour.albums;
	// currentGalleries.all = oneOfFour.allImages;

		//Make the gallery selections with their thumbnails
		galleries.forEach( async (album, index) => {
			let entry = Object.create(albumEntry);
			let title = album.name.match(/[\d\.]+|\D+/g);
			entry.title = title[title.length - 1];
			entry.date = album.name.split(/[A-Z][a-z]+/g)[0];


			let thumbnails = [];
			for(let i = 0; i < 3; i++) {
				let img = document.createElement('img');
				img.src = album.images[i];
				thumbnails.push(img);
			}
			
			entry.thumbnailImgs = thumbnails;

			entries.push(entry.create());
		})

		//for each of those gallery selections...
		entries.forEach( async (album, index) => {

			//append them to the entryWrapper already within the html dom
			entryWrapper.appendChild(album);
			album.style.display = 'block';


			//Opens imageview element with respective albums images
			album.addEventListener('click', async ()=> {

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

				currentGalleries.album = galleries[index].images; 

					currentGalleries.album.map((element, index) => {
						let slide = createImgSlide(element);
						imageSlidesWrapper.appendChild(slide);

						//imagesSlidesWrapper.appendChild(element)
						//would only need this
					})
					
					let imageSlides = Array.from(imageSlidesWrapper.children);
					imagesControls(imageSlides);
					imageSlides[0].style.display = "block";

					controls_UI[0].firstElementChild.innerHTML = 1;
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
				// })
			})
		})	
}

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
			if(window.innerWidth < 1024) {
				setTimeout(exitMenu, 100);
			}
			displayToggleNav();
			imagesWrapper.innerHTML = null;	
			currentGalleries.index = 0;		
		}, 500)
	}

controls_UI[1].addEventListener('click', () => {
	scale()
	if(window.innerWidth < 1024) {
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
	if(window.innerWidth >= 1024) {
		controls.style.display = 'block';
		controls.style.opacity = 1;
	} else if (window.innerWidth < 1024) {
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