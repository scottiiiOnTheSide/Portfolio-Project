
let header = document.querySelector("header");
let mainMenu = document.querySelector("section#gallery div#mainMenu");
let mainMenuOptions = document.querySelectorAll("div#mainMenu div"); /* NodeList */
let albums = document.querySelector("section#gallery section#albums");
let albumNav = document.querySelectorAll("section#gallery section#albums nav span"),
	albumReturn = albumNav[0],
	albumCurrent = albumNav[1],
	albumNext = albumNav[3];
let viewAlbum = document.querySelector("section#gallery div#viewAlbum"),
	viewAlbum_UI = document.querySelectorAll("section#gallery div#viewAlbum nav span"),
	viewAlbum_Previous = viewAlbum_UI[0],
	viewAlbum_Next = viewAlbum_UI[1],
	viewAlbum_Counter = document.getElementById("counterWrapper"),
	/* Since this will be empty by default, elements have to be created to fill.
	*/
	viewAlbum_CounterCurrent = document.querySelector("section#gallery div#viewAlbum div#counterWrapper span.current"),
	viewAlbum_CurrentIdentifier = document.querySelector("section#gallery div#viewAlbum div#counterWrapper span.current span#identifier"),
	viewAlbum_img = document.querySelector("section#gallery div#viewAlbum img"),
	allImages = document.querySelector("section#albums div#allImages");
	//use allImages.firstElementChild to get inside wrapper
let viewAll = document.querySelector("section#gallery div#viewAll"),
	viewAll_UI = document.querySelectorAll("section#gallery div#viewAll nav span"),
	viewAll_Previous = viewAll_UI[0],
	viewAll_Next = viewAll_UI[1],
	viewAll_Current = viewAll_UI[2],
	viewAll_Total = viewAll_UI[4],
	viewAll_img = document.querySelector("section#gallery div#viewAll img");
let modal = document.getElementById('modal'),
	modalPrompt = document.querySelector('section#gallery span#info'),
	modalReturn = document.querySelector('div#modal span#return'),
	modalViewAll = document.querySelector('div#modal span#viewAll'),
	modalClose = document.querySelector('div#modal span#close');

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

let gallery = [collabs, lifeAndEvents, carsTechToys, archAndTravel];

let currentGalleries = {
	album: [],
	all: [],
	index: 0,
	galleryIndex: NaN,
}



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
let createAlbum = albumEntry.create;
createAblum = createAlbum.bind(albumEntry);

modalPrompt.addEventListener('click', ()=> {
	displayToggle(modal);
})

modalReturn.addEventListener('click', ()=> {
	if (viewAlbum.classList.contains('return')) {
		viewAlbum.style.display = "none";
		albums.style.display = "block";
		albums.classList.remove("remove");
		albums.classList.add("return");
		displayToggle(header);
	}
	if (viewAll.classList.contains('return')) {
		displayToggle(viewAll);
		displayToggle(allImages);
		let albumEntries = document.querySelectorAll("section#gallery section#albums div.entry");
		albumEntries.forEach((element) => displayToggle(element));

		setTimeout(() => {
			displayToggle(header);
			displayToggle(albums);
		}, 550);
	}
	//gallery resets...
	viewAlbum_Counter.innerHTML = null;
	fancyCounter.entries = [];
	currentGalleries.index = 0;
	displayToggle(modal);
	displayToggle(modalPrompt);
})

modalClose.addEventListener('click', ()=> {
	displayToggle(modal);
})

modalViewAll.addEventListener('click', ()=> {
	if(allImages.classList.contains('return')) {
		displayToggle(viewAll);
		displayToggle(modalPrompt);
		displayToggle(header);
		displayToggle(albums);
		setTimeout(()=> {
			displayToggle(modal);
		}, 550)
	}
	else if(viewAlbum.classList.contains('return')) {
		let albumEntries = document.querySelectorAll("section#gallery section#albums div.entry");
		albumEntries.forEach((element) => displayToggle(element));
		displayToggle(viewAlbum);
		displayToggle(modalPrompt);
		displayToggle(header);
		displayToggle(albums);
		displayToggle(allImages);

		setTimeout(() => {
			displayToggle(modal);
		}, 550)
	}
})

albumReturn.addEventListener('click', ()=> {
	if(allImages.classList.contains('return')) {
		displayToggle(allImages);
	}
	displayToggle(albums);
	allImages.firstElementChild.innerHTML = null;
	albumDivs = document.querySelectorAll("section#gallery section#albums div.entry");
	albumDivs.forEach((element)=> { element.remove() });
	setTimeout(()=> {
		displayToggle(mainMenu);
	}, 550);
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
	albumDivs = document.querySelectorAll("section#gallery section#albums div.entry");
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
			albumCurrent.innerText = gallery[next].name;
			albumCurrent.style.opacity = 1;
		}
		albumCurrent.style.opacity = 1;
	}, 400)

	setTimeout(()=> {
		renderGallery(gallery[currentGalleries.galleryIndex]);
	}, 500);
})

albumCurrent.addEventListener('click', ()=> {
	let albumEntries = document.querySelectorAll("section#gallery section#albums div.entry");

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
	}
})

/*
	B A S E  F U N C T I O N S
*/


/* elements take 0.5s to transition, 
due to CSS animations duration */
function displayToggle(element) {
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

// currentGalleries.album = gallery[0].albums[0].images; //for development purposes

function cycleForward(gallery, image) {
	if (currentGalleries.index == gallery.length - 1) {
		return null;
	}
	else if(currentGalleries.index < gallery.length) {
		if(viewAlbum.style.display == "block") {
			fancyCounter.forward(currentGalleries.index);
		}
		currentGalleries.index++;
		if(image.classList.contains("return")) {
			image.classList.remove("return");
		}
		image.classList.add("remove");
		setTimeout(()=> {
			image.src = gallery[currentGalleries.index];
		}, 150);
		setTimeout(()=> {
			image.classList.remove("remove");
			image.classList.add("return");
		}, 275);
	}
}; 
	viewAlbum_Next.addEventListener('click', ()=> {
		cycleForward(currentGalleries.album, viewAlbum_img);
	});
	viewAll_Next.addEventListener('click', ()=> {
	cycleForward(currentGalleries.all, viewAll_img);

		//for changing viewAll counter
		let next = parseInt(viewAll_Current.innerText);
		next++;
		if (next < currentGalleries.all.length + 1) {
			viewAll_Current.style.opacity = '0';
			setTimeout(() => {
				viewAll_Current.innerText = next;
			}, 175);
			setTimeout(() => {
				viewAll_Current.style.opacity = '1';
			}, 300);
		}
	});


function cycleBackward(gallery, image) {
	if (currentGalleries.index == 0) {
		return null;
	}
	else if(currentGalleries.index <= gallery.length || !currentGalleries.index == 0) {
		if(viewAlbum.style.display == "block") {
			fancyCounter.backward(currentGalleries.index);
		}
		currentGalleries.index--;
		if(image.classList.contains("return")) {
			image.classList.remove("return");
		}
		image.classList.add("remove");

		setTimeout(()=> {
			image.src = gallery[currentGalleries.index];
		}, 175);
		setTimeout(()=> {
			image.classList.remove("remove");
			image.classList.add("return");
		}, 225);
	}
}; 
	viewAlbum_Previous.addEventListener('click', ()=> {
		cycleBackward(currentGalleries.album, viewAlbum_img);
	});
	viewAll_Previous.addEventListener('click', ()=> {
	cycleBackward(currentGalleries.all, viewAll_img);

		//for changing viewAll counter
		let next = parseInt(viewAll_Current.innerText);
		next--;
		if (!next == 0) {
			viewAll_Current.style.opacity = '0';
			setTimeout(() => {
				viewAll_Current.innerText = next;
			}, 175)
			setTimeout(() => {
				viewAll_Current.style.opacity = '1';
			}, 300);
		}	
	});


let fancyCounter = {
	entries: [],

	entry: function(amount) {
		let parentSpan = document.createElement('span');
		let childSpan = `<span class="identifier"></span>`;
		let width = (100 / amount).toFixed(2);
		parentSpan.innerHTML = childSpan;
		parentSpan.style.width = `calc(${width}% - 1px)`;
		return parentSpan;
	},

	create: function(amount) { //currentGalleries.album.length
		for (let i = 0; i < amount; i++) {
			this.entries.push(this.entry(amount));
		}

		this.entries.forEach((element) => {
			viewAlbum_Counter.appendChild(element);
		});

		this.entries[0].classList.add('current');
	},

	forward: function(index) { //currentGalleries.index
		this.entries[index].classList.remove('current');
		setTimeout(() => {
			index++;
			this.entries[index].classList.add('current');
		}, 175)
	},

	backward: function(index) { //currentGalleries.index
		this.entries[index].classList.remove('current');
		setTimeout(() => {
			index--;
			this.entries[index].classList.add('current');
		}, 175)
	}
}

function renderGallery(oneOfFour) { // gallery[x]
	let entries = [];
	let galleries = oneOfFour.albums;
	currentGalleries.all = oneOfFour.allImages;


	galleries.forEach((album, index) => {
		let entry = Object.create(albumEntry);
		let title = album.name.match(/[\d\.]+|\D+/g);
		let thumbnails = [];
		entry.title = title[title.length - 1];
		entry.date = album.name.split(/[A-Z][a-z]+/g)[0];

		for(let i = 0; i < 3; i++) {
			let img = document.createElement('img');
			img.src = album.images[i];
			thumbnails.push(img);
		}
		
		entry.thumbnailImgs = thumbnails;

		entries.push(entry.create());

		setTimeout(() => {
			let imagesInThumbail = document.querySelectorAll("section#albums div.entry div.thumbnails img");
			let thumbail = document.querySelectorAll("section#albums div.entry div.thumbnails img");
			let currententries = document.querySelectorAll("section#albums div.entry");
			let supposedWidth = imagesInThumbail[0].offsetWidth + imagesInThumbail[1].offsetWidth + imagesInThumbail[0].offsetWidth;
			if (supposedWidth > 450) {
				thumbnail.forEach((element) => {
					element.style.top = "-30px"
					element.style.left = "50%"
				})
				currententries.forEach((element) => {
					element.style.marginTop = "15rem";
				})
			}
		}, 200);
	})

	entries.forEach((album, index) => {
		albums.appendChild(album);

		album.addEventListener('click', ()=> {
			if (viewAlbum.classList.contains('remove')) {
				viewAlbum.classList.remove('remove');
			}
			else if (viewAlbum.classList.contains('return')) {
				viewAlbum.classList.remove('return');
			}
			displayToggle(albums);
			displayToggle(header);
			currentGalleries.album = galleries[index].images;
			viewAlbum_img.src = currentGalleries.album[0];

			//probably where I need to add code for fancyCounter
			fancyCounter.create(galleries[index].images.length);

			setTimeout(() => {
				displayToggle(viewAlbum);
				displayToggle(modalPrompt);
			}, 550);
		})
	});

	//specifically editting the style of the first .entry
	let albumEntries = document.querySelectorAll("section#gallery section#albums div.entry");
	albumEntries[0].style.marginTop = "11em";


	currentGalleries.all.forEach((element, index) => {
		let image = document.createElement('img');
		image.src = element;
		allImages.firstElementChild.appendChild(image);

		image.addEventListener('click', ()=> {
			currentGalleries.index = index;
			viewAll_img.src = element;
			viewAll_Current.innerText = index + 1;
			viewAll_Total.innerText = currentGalleries.all.length;
			displayToggle(albums);
			displayToggle(header);
			setTimeout(()=> {
				displayToggle(modalPrompt);
				displayToggle(viewAll);
			}, 550);
		})
	});
};

mainMenuOptions.forEach((element, index) => {
	element.addEventListener('click', ()=> {
		renderGallery(gallery[index]);
		currentGalleries.galleryIndex = index;
		displayToggle(mainMenu);
		setTimeout(()=> {
			displayToggle(albums);
		}, 550);
		albumCurrent.innerText = gallery[index].name;
	})
})



