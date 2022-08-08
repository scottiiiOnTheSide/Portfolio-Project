
const path = require('path');
const fs = require('fs');
const imagesFolder = path.resolve(__dirname, './img');	

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
	            		let result = first.replace('/Users/Jelique/Creative/Web Dev Space/Porfolio Project/', '..');
	            		aSection.allImages.push(result);
	            	}
	            })
	        } else {
	        	let first = dir + '/' + element;
	            let result = first.replace('/Users/Jelique/Creative/Web Dev Space/Porfolio Project/', '..');
	            aSection.allImages.push(result);
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
  						let result = '../img' + '/' + gallery + '/' + albumName + '/' + 'thumbnails/' + element;
  						albumset.thumbnails.push(result);
  					})
  				} else {
  					let result = '../img' + '/' + gallery + '/' + albumName + '/' + element;
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
// let [one, two, three, four] = gallery;
// console.log(gallery);
console.log(gallery);
fs.writeFileSync('./albumTwo.js', JSON.stringify(gallery), 'utf-8');


