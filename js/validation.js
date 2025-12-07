document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('checkout-form');

    if (form) {
        form.addEventListener('submit', function (event) {
            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-group').forEach(el => {
                el.classList.remove('error');
                el.classList.remove('success');
            });

            // 1. Name Validation (NotEmpty)
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'A név megadása kötelező!');
                isValid = false;
            } else {
                showSuccess(nameInput);
            }

            // 2. Email Validation (Regex)
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Adjon meg egy érvényes email címet!');
                isValid = false;
            } else {
                showSuccess(emailInput);
            }

            // 3. Address Validation (NotEmpty)
            const addressInput = document.getElementById('address');
            if (addressInput.value.trim() === '') {
                showError(addressInput, 'A cím megadása kötelező!');
                isValid = false;
            } else {
                showSuccess(addressInput);
            }

            // 4. Payment Method Validation (Radio)
            const paymentInputs = document.getElementsByName('payment');
            let paymentSelected = false;
            for (let i = 0; i < paymentInputs.length; i++) {
                if (paymentInputs[i].checked) {
                    paymentSelected = true;
                    break;
                }
            }
            if (!paymentSelected) {
                // Find container for radios
                const radioGroup = document.querySelector('.radio-group');
                const error = document.createElement('span');
                error.className = 'error-message';
                error.innerText = 'Válasszon fizetési módot!';
                radioGroup.appendChild(error);
                isValid = false;
            }

            // 5. Terms Validation (Checkbox)
            const termsInput = document.getElementById('terms');
            if (!termsInput.checked) {
                const checkboxGroup = document.querySelector('.checkbox-group');
                const error = document.createElement('span');
                error.className = 'error-message';
                error.innerText = 'El kell fogadnia a feltételeket!';
                checkboxGroup.appendChild(error);
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault(); // Stop submission
            } else {
                alert('Sikeres rendelés!');
                // Form submits naturally
            }
        });
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        const error = document.createElement('span');
        error.className = 'error-message';
        error.innerText = message;
        formGroup.appendChild(error);
    }

    function showSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.add('success');
    }
});
