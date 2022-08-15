let B7Validator = {
  handleSubmit:(event)=>{
    event.preventDefault();
    let send = true;

    let inputs = form.querySelectorAll('input');

    B7Validator.clearErrors();

    for(let i=0;i<inputs.length;i++) {
      let input = inputs[i];
      let check = B7Validator.checkInput(input);
      if(check !== true) {
        send = false;
        B7Validator.showError(input, check);
      }
    }
    if(send) {
      form.submit();
    }
  },
  checkInput:(input)=>{
    let rules = input.getAttribute('data-rules'); // verifica onde existe esse atributo
    if(rules!==null) { // verifica se existe a regra
      rules = rules.split('|'); // define o separador para as regras
      for(let k in rules) {
        let ruleDetails = rules[k].split('='); // define = como separador da regra para que o codigo entenda que é uma regra só
        switch(ruleDetails[0]) {
          case 'required':
            if(input.value == '') {
              return 'O preenchimento desse campo é obrigatório!'
            }
          break;
          case 'min':
            if(input.value.length < ruleDetails[1]) {
              return `O campo ${input.name} precisa ter, no mínimo, ${ruleDetails[1]} caracteres!`
            }
          break;
          case 'email':
            if(input.value !='') {
              let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if(!regex.test(input.value.toLowerCase())) {
                  return 'O e-mail digitado não é válido!';
              }
            }
          break;
        }
      }
    }
    return true;
  },
  showError:(input, error)=>{
    input.style.borderColor = '#ff0000';
    let errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error;
    input.parentElement.insertBefore(errorElement, input.ElementSibling);
  },
  clearErrors:()=>{
    let inputs = form.querySelectorAll('input');
    for(let i=0;i<inputs.length;i++) {
      inputs[i].style = '';
    }
    let errorElements = document.querySelectorAll('.error');
    for(let i=0;i<errorElements.length;i++) {
      errorElements[i].remove();
    }
  }
}

let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit);