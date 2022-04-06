
const formSubmit = document.querySelector('.user-edit-form')

document.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const $form = e.target;

  const isFormValid = checkFormValid($form);

  if (isFormValid) {
    console.log("form is valid");
  } else {
    console.log("form is not valid");
  }
}

function checkFormValid($form) {
  let isValid = true;
  const $inputs = $form.querySelectorAll(".form-input");

  $inputs.forEach(($input) => {
     
    let isInputValid = checkInputValid($input);
    if (!isInputValid) {
      isValid = false;
    }
  });

  return isValid;
}

const VALIDATOR = {
    'required': (value, param) => !!(value.length === 0),
    'min-length': (value, param) => !!(value.length < param && value.length !== 0),
    'max-length': (value, param) => !!(value.length > param),
}




function createInputValidators($input){
  const validators = []
  $input.dataset.validators.split(', ').map((validator) => {
      let validatorStr = validator.trim()
       const name = validatorStr.split('(')[0]
       const param = validatorStr.split(/[()]/)[1];
       validators.push({
           name,
           param
       })
      })
    
 return validators
}


function checkInputValid($input) {
  let inputMessage = "valid";

  const $container = $input.closest(".form-group");

  if ($input.dataset.validators) {
    const validators = createInputValidators($input);
    const value = $input.value;

    validators.forEach((validator) => {
      $container.classList.remove(`error-${validator.name}`);

      if (VALIDATOR[validator.name](value, validator.param)) {
        
        inputMessage = `error-${validator.name}`;
       
      }
    });

    if (inputMessage !== 'valid') {
        $container.classList.add("has-error")
        $container.classList.add(inputMessage)
     } else{
        $container.classList.remove("has-error")
    }

  }
  return inputMessage !== 'valid'
}




