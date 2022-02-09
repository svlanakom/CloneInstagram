
const formSubmit = document.querySelector('.user-edit-form')

const VALIDATOR = {
    'required': (value, param) => !!(value.lenght === 0),
    'min-length': (value, param) => !!(value.lenght < param),
    'max-length': (value, param) => !!(value.length > param),
}



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


function checkInputValid($input) {
  let inputMessage = "valid";

  const $container = $input.closest(".form-group");

  if ($input.dataset.validators) {
    const validators = createInputValidators($input);
    const value = $input.value;

    validators.forEach((validator) => {
      $container.classList.remove(`error—${validator.name}`);

      if (VALIDATOR[validator.name](value, validator.param)) {
        inputMessage = `error—${validator.name} `;
      }
    });

    if (inputMessage !== 'valid') {
        $container.classlist.add(".has-error")
        $container.classlist.add(inputMessage)
     } else{
        $container.classList.remove(".has-error");
    }

  }
  return inputMessage !== 'valid'
}




function createInputValidators($input){
    const validators = []
    $input.dataset.validators.split(',').map((validator) => {
        let validatorStr = validator.trim()
         const name = validatorStr.split('(')[0];
         const param = validatorStr.split(/[()]/)[1];
         validators.push({
             name,
             param
         })
        })
      
   return validators
}

