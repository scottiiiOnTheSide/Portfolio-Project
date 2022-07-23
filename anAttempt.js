let cacheImages = async function() {

	let completionCheck = 0;
	let total = 0;
	(function () {
		gallery.forEach((element) => {
			total += element.allImages.length;
		});
		console.log(total);
	})(); //get total number of all photos dynamically

	let promise = new Promise((resolve,rej) => {
		let allGalleryImages = [];

		gallery.forEach((element, index) => {

			let complete = async (element) => {
				// let allGalleryImages = [];
				for (let i = 0; i < gallery[index].allImages.length; i++) {
					let pic = await promiseImage(gallery[index].allImages[i]);
					completionCheck++;
					allGalleryImages.push(pic);
					// console.log(allGalleryImages);	
				}
			}
			complete();
		});
		resolve(allGalleryImages);
	})
		// .then(element => {return element});

	// let promise = new Promise((resolve, reject) => {

	// 	let allGalleryImages = [];

	// 	gallery.forEach((element, index) => {

	// 		let complete = async (element) => {
	// 			for (let i = 0; gallery[index].allImages.length; i++) {

	// 				let pic = await promiseImage(gallery[index].allImages[i]);
	// 				completionCheck++;
	// 				allGalleryImages.push(pic);
	// 				// console.log(allGalleryImages);
	// 				// console.log(completionCheck);
	// 				// console.log('pic loaded');
	// 				// console.log(pic);
	// 				// console.log(allGalleryImages.length);	
	// 			}

	// 			console.log(allGalleryImages);
	// 		}
	// 		complete().then(element => {return element;console.log(element)});
	// 	})
	// 	if(allGalleryImages.length > total) {
	// 		console.log('tell me something');
	// 	}
	// })

	// promise.then(element => {
	// 	return element;
	// 	console.log(element);
	// 	sections[0].style.backgroundColor = 'blue';
	// });
}

// document.addEventListener("DOMContentLoaded", ()=> {
// 	if(!allImagesLoaded) {
// 		for (let element of corners) {
// 			element.style.opacity = 0;
// 		}

// 		// (async () => {
// 		// 	allImagesLoaded = await cacheImages();

// 		// 	for (let element of corners) {
// 		// 		element.style.opacity = 1;
// 		// 		// console.log(element);
// 		// 	}
// 		// })();

// 		// let promise = new Promise(resolve => {
// 		// 	allImagesLoaded = cacheImages();
// 		// 	resolve(allImagesLoaded);
// 		// }).then((element) => {
// 		// 	for (let element of corners) {
// 		// 		// element.style.opacity = 1;
// 		// 	}
// 		// })

// 		let promise = new Promise(resolve => {
// 			allImagesLoaded = cacheImages();
// 			resolve(allImagesLoaded);
// 		}).then(() => {
// 			console.log('its done');
// 		})

// 		// sessionStorage.setItem('allImagesLoaded_check', allImagesLoaded);
// 		//should be saving all images so long as the tab is left open
// 	} else {
		
// 	}
// })

//will redefine elements within this script, but in prep for production,
//each individual file should be exporting elements and functions to 
//central js file
// function loadImages_test1() {
// 	let completionCheck = 0;
// 	gallery[2].allImages.forEach((img, index) => {
// 		return new Promise((resolve, reject) => {
// 			let imgElement = new Image();
// 			imgElement.src = img;
// 			imgElement.onload = () => {
// 				resolve(imgElement)
// 			}
// 		}).then(img => {
// 			console.log(img)
// 			completionCheck++;
// 			console.log(completionCheck);
// 		})
// 	})
// }

async function promiseImage(img) { //because it returns image element as promise
	return new Promise((resolve, reject) => {
			let imgElement = new Image();
			imgElement.src = img;
			imgElement.onload = () => {
				resolve(imgElement)
			}
		}).then(element => {
			return element;
			console.log(element);
			section[1].style.backgroundColor = 'blue';
		})
}

// this works!
function loadImages_test2() {
	let completionCheck = 0;

	async function load() {
		for (let i = 0; i < gallery[2].allImages.length; i++) {

			let pic = await promiseImage(gallery[2].allImages[i]);
			completionCheck++;
			console.log(completionCheck);
			console.log('pic loaded');
			console.log(pic);
		}
	}
	load();	
}