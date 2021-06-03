function Validation(options) {
      
      function validate(inputElement, rule) {
            const errorElement = inputElement.parentElement.querySelector(options.error);
            var errorMessage = rule.test(inputElement.value);
            if (errorMessage) {
                  errorElement.innerText = errorMessage;
                  inputElement.parentElement.classList.add('invalid');
            } else {
                  errorElement.innerText = '';
                  inputElement.parentElement.classList.remove('invalid');
            }
      }

      const formElement = document.querySelector(options.form);
      if (formElement) {
            options.rules.forEach((rule) => {
                  var inputElement = formElement.querySelector(rule.selector);
                  if (inputElement) {
                        inputElement.onblur = () => {
                              validate(inputElement, rule);
                        };
                        inputElement.oninput = () => {
                              const errorElement = inputElement.parentElement.querySelector(options.error);
                              errorElement.innerText = '';
                              inputElement.parentElement.classList.remove('invalid');
                        }
                  }
            })
      };
}

Validation.isRequired = function (selector, message) {
      return {
            selector: selector,
            test: function (value) {
                  return value.trim() ? undefined : message  || 'Vui lòng nhập trường này'
            }
      }
};

Validation.isEmail = function (selector, message) {
      return {
            selector: selector,
            test: function (value) {
                  var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                  return regex.test(value) ? undefined : 'Trường này phải là email'
            }
      }
};

Validation.minLength = function (selector, min, message) {
      return {
            selector: selector,
            test: function (value) {
                  return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
            }
      }
};

Validation.isConfirmed = function (selector, getConfirmValue, message) {
      return {
            selector: selector,
            test: function (value) {
                  return value === getConfirmValue() ? undefined : message  || `Giá trị vừa nhập không chính xác`
            }
      }
}