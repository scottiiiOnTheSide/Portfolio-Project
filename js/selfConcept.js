

/**
	Declare all elements as variables
**/

class Content {
	constructor(element) {
		this.content = element;
		this.textWrapper = element.firstElementChild;
		this.exit = element.childNodes[3];
		this.stuff = this.textWrapper.children;
	}

	get text() {	// use as content.text
		let text = Array.from(this.stuff);
		return text.slice(0, -1); // returns array minus last element
	};

	launchContent(otherElement) {
		this.side.classList.add("active");
		otherElement.classList.add("nonActive");
		selfConcept_splash.style.opacity = "0"

		setTimeout(() => {
			otherElement.style.display = "none"
			this.content.style.display = "block";
		}, 550)
		setTimeout(() => {
			this.content.style.opacity = "1";
		}, 750)
	}

	closeContent(otherElement) {
		this.side.classList.remove("active");
		this.content.style.opacity = "0";

		setTimeout(() => {
			this.content.style.display = "none";
			otherElement.style.display = "block"
		}, 550)
		setTimeout(() => {
			otherElement.classList.remove("nonActive");
			selfConcept_splash.style.opacity = "1";
		}, 750)
	}

	toggleText() {
		let element = this.stuff[0];
		let height = element.offsetHeight;

		if(!element.classList.contains("shift")) {
			element.classList.add("shift");
			this.stuff[1].style.opacity = 1;
			element.style.marginTop = "-"+ (height + 30) +"px";
		} else {
			element.classList.remove("shift");
			element.style.marginTop = "0";
			this.stuff[1].style.opacity = 0;
		}
		
	}
}

const 	thePhotographer = new Content(document.querySelector("section#selfConcept div#thePhotographer")),
	  	theDeveloper = new Content(document.querySelector("section#selfConcept div#theWebDev"));
		thePhotographer.side = document.querySelector("section#selfConcept div.leftside");
		theDeveloper.side = document.querySelector("section#selfConcept div.rightside");
let 	selfConcept_splash = document.querySelector("section#selfConcept p#splash");

/**
 	Setting Methods to Elements
**/

//Open the Photographer Side
thePhotographer.side.addEventListener("click", (e) => {		//e refers to event itself. e.target refers to element
	if(!e.target.classList.contains("active") ) { 		
		thePhotographer.launchContent(theDeveloper.side);
	}
});

	//Close the Photographer Side
	thePhotographer.exit.addEventListener("click", () => {
		thePhotographer.closeContent(theDeveloper.side);
	})

	//Toggle Text
	thePhotographer.textWrapper.addEventListener("click", ()=> {
		thePhotographer.toggleText();
	});

//Open the Developer Side
theDeveloper.side.addEventListener("click", (e) => {
	if(!e.target.classList.contains("active")) {
		theDeveloper.launchContent(thePhotographer.side);
	}
});
	
	//Close the Developer Side
	theDeveloper.exit.addEventListener("click", (e) => {
		theDeveloper.closeContent(thePhotographer.side);
	});

	//Toggle Text
	theDeveloper.textWrapper.addEventListener("click", ()=> {
		theDeveloper.toggleText();
	});

/**
	Next objective,
	write functions to allow: 
	* side.onclick -> side expands (class) and content appears (class) DONE 2.6.2022
	* exit.onclick -> reverts above DONE 2.6.2022
	* text.onscroll ->switchs between p elements within the wrapper DONE 2.8.2022
	
	can most likely write some (parts) of these functions within the class,
	set the event handlers outside of it
**/




