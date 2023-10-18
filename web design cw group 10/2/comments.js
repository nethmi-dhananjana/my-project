const radioButtons = document.querySelectorAll('input[name="rate"]');
const reason = document.getElementById('reason');
const button = document.getElementById('button');
const form = document.getElementById('comments');
const errorRadio = document.getElementById('error-radio');
const errorText = document.getElementById('error-text');
const completedTask = document.getElementById('task1');
const wantedtoComplete = document.getElementById('task2');

errorRadio.style.display = 'none';
errorText.style.display = 'none';
let radioValue = '';
let reasonEmail = '';


button.addEventListener('click',function (e) {	
	
	e.preventDefault();
	if (isSubmissionValid() == true & istextValid() == true ) {		
		let email = 'Rate : '+ radioValue + ' | Review : ' + reasonEmail + ' | Completed task from : ' + completedTask.value + ' | Wanted to complete this task from : '+ wantedtoComplete.value ;
		window.open(`mailto:nilupulsuramya222@gmail.com?body=${email}`);
		window.location.href = 'Thank you.html';		

	}else if(isSubmissionValid() == false & istextValid() == true){

		errorRadio.style.display = '';		
		errorRadio.innerHTML += 'Please select a value';
		e.preventDefault();
		
	}else if(isSubmissionValid() == true & istextValid() == false){

		reason.classList.add('error-textarea')
		errorText.style.display = '';
		errorText.innerHTML += "Please fill out this field"
		e.preventDefault();
	}
	else{
		reason.classList.add('error-textarea');
		errorRadio.style.display = '';		
		errorRadio.innerHTML += 'Please select a value';
		errorText.style.display = '';
		errorText.innerHTML += "Please fill out this field"
		e.preventDefault();
	}	
});

function isSubmissionValid(){
	let isValid = false;
	for (const radioButton of radioButtons) {
		if (radioButton.checked) {
			
			isValid = true;
			radioValue = radioButton.value;
			break;
		}		
	}
		 return isValid;
	}

function istextValid(){
	let isValidText = true;

	if (reason.value == null || reason.value == "") {
			
		isValidText = false;

	}
		reasonEmail = reason.value;		
		return isValidText;
	}