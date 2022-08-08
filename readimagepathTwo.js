
const path = require('path');
const fs = require('fs');
const imagesFolder = path.resolve(__dirname, './img');	

/*
read img folder,
get folder name. create object, with key:name, value: folder name
object will also have key: albums, value: []

for each folder within main folder, (the album)
create object with 
  key: name, value: folder name 
  &
  key: images, value: []
  &
  key: thumbnails, value: []
  get the name of the directory contents
    if file is .jpg, it gets pushed into the images array
    if file is the thumbnails folder,
    get the files within it and add them to the thumbnails array
*/

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



