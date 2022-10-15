function Validator(options) {
    // hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElrment = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.text(inputElement.value);
        if(errorMessage) {
            errorElrment.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }else{
            errorElrment.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }
    // Lấy element của form validate
    var formElement = document.querySelector(options.form);
    if(formElement) {
        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement) { 
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElrment = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElrment.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
 }

// định nghi rules
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        text: function(value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này!!!'
        }
    };
}

Validator.isEmail = function(selector, message) {
      return {
        selector: selector,
        text: function(value) {
            // Email hợp lệ
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là Email!!!';
        }
    };
}

Validator.isPassword = function(selector, min, message) {
      return {
        selector: selector,
        text: function(value) {
            // password hợp lệ: 1 chữ cái viết hoa and ít nhất 12 ký tự
            var regex = /^(?=.*\d)(?=.*[A-Z])/;
            return regex.test(value) && value.length >= min ? undefined : message || `Ít nhất một số và một chữ cái viết hoa tồn tại trong mật khẩu và độ dài tối thiểu ${min} ký tự!!!`;
        }
    };
}
Validator.isConfirmed = function(selector, getConfirValue, message) {
      return {
        selector: selector,
        text: function(value) {
            return value === getConfirValue() ? undefined : message || 'Giá trị nhập vào không chính xác!!!'
        }
    };

}