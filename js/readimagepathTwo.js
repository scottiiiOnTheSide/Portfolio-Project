
const path = require('path');
const fs = require('fs');
const imagesFolder = path.resolve(__dirname, '../img');	

function createGallery(mainFolder) {

	let sections = []

	let galleries = fs.readdirSync(mainFolder);

	galleries.forEach(gallery => {

		let aSection = {
			name: gallery,
			albums: [],
			allImages: [],
		}


		let dir = mainFolder + '/' + gallery;
		console.log(dir);


		var allOfThem = fs.readdirSync(dir);
	    allOfThem.forEach(element => {

	    	var name = dir + '/' + element;

	        if (fs.statSync(name).isDirectory()){
	        	let dir = mainFolder + '/' + gallery + '/' + element;
	            var dePics = fs.readdirSync(dir);
	            dePics.forEach(element => {
	            	if(element.match('thumbnails')) {
	            		return;
	            	}
	            	else {
	            		let first = dir + '/' + element;
	            		// let result = first.replace('/Users/Jelique/Creative/Web Dev Space/Porfolio Project/', '../');
	            		// aSection.allImages.push(result);
	            		aSection.allImages.push(first);
	            	}
	            })
	        } else {
	        	let first = dir + '/' + element;
	            // let result = first.replace('/Users/Jelique/Creative/Web Dev Space/Porfolio Project/', '../');
	            // aSection.allImages.push(result);
	            aSection.allImages.push(first);
	        }
	    })
	        


		let albumNames = mainFolder + '/' + gallery;
		let albums = fs.readdirSync(albumNames);
		// console.log(albums);
		albums.forEach(albumee => {

			let albumName = albumee;
			let dir = mainFolder + '/' + gallery + '/' + albumName;

			let albumset = {
				name: albumName,
				images: [],
				thumbnails: [],
			}

			let images = fs.readdirSync(dir);
			images.forEach(element => {
  				if(element == 'thumbnails') {
  					let dir = mainFolder + '/' + gallery + '/' + albumName + '/' + element;
  					let thmbnls = fs.readdirSync(dir);
  					thmbnls.forEach(element => {
  						let result = dir + '/' + element;
  						// result = result.replace('/Users/Jelique/Creative/Web Dev Space/Porfolio Project/', '../');
  						albumset.thumbnails.push(result);
  					})
  				} else {
  					let result = dir + '/' + element;
  					// result = result.replace('/Users/Jelique/Creative/Web Dev Space/Porfolio Project/', '../');
  					albumset.images.push(result);
  				}
			});

			aSection.albums.push(albumset);
		})

		sections.push(aSection);
	});
	return sections;
}


let gallery = createGallery(imagesFolder);
// // console.log(gallery[0].albums);
let [one, two, three, four] = gallery;
gallery = [three, four, two, one];

// console.log(gallery);
console.log(gallery);
fs.writeFileSync('./albumBlee.js', JSON.stringify(gallery), 'utf-8');


