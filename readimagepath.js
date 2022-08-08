/*
	08. 07. 2022
	A script to create an object containing the names of all
	albums and paths to their images
*/

const path = require('path');
const fs = require('fs');
const imagesFolder = path.resolve(__dirname, './img');	

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
        	let result = name.replace('/Users/Jelique/Creative/Web Dev Space/Porfolio Project/', '');
            files_.push(result);
        }
    }
    return files_;
}

console.log(getFiles(imagesFolder));

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
