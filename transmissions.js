
const optionsWrapper = document.getElementById('optionsWrapper'),
	  options = Array.from(document.getElementsByClassName('opt')),
	  socials = document.getElementById('socials'),
	  formWrapper = document.getElementById('emailScotty'),
	  emailScotty = document.getElementById('emailScotty').firstElementChild;
	  inputs = Array.from(emailScotty.firstElementChild.children);


let closeWrapper = () => {
		setTimeout(() => {
			optionsWrapper.style.width = "222px";
			optionsWrapper.style.height = '225px';

			options.forEach(element => {
				element.style.opacity = 0;
				setTimeout(() => {
					element.style.display = 'none';
				}, 310)
			})
		}, 500)
	},
	openWrapper_socials = () => {
		optionsWrapper.style.transform = "translate(-50%, -50%) scale(0.3)";
		socials.style.transform = 'translate(-50%, -50%) scale(0.5)'

		setTimeout(() => {
			if(window.innerWidth < 440) {
				optionsWrapper.style.width = "301%";
			} else {
				optionsWrapper.style.width = "167%";
			}

			
		}, 600)
		setTimeout(() => {
			socials.style.display = "block";
		}, 610)
		setTimeout(() => {
			socials.style.opacity = 1;
			socials.style.transform = 'translate(-50%, -50%) scale(1)'
		}, 725)
	};


options[1].addEventListener('click', ()=> {
	closeWrapper();
	setTimeout(()=>{
		openWrapper_socials()
	}, 1500);
})

//when all inputs are filled, submit button appears
emailScotty.addEventListener('change', () =>{
	let fullName = inputs[0].value,
		emailAddr = inputs[1].value,
		subject = inputs[2].value,
		content = inputs[3].value;

	if(fullName !== '' && emailAddr !== '' && subject !== '' && content !== '') {

	} else {

	}
})

// optionsWrapper.style.transform = "translate(-50%, -50%) scale(0.3)";
// optionsWrapper.style.width = "301%" max440
// optionsWrapper.style.width = "167%" min441