document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');

	form.addEventListener('submit', formSend);

	async function formSend(event) {
		event.preventDefault();

		let error = formValidate(form);
		let formData = new FormData(form);

		if (error === 0) {
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				let result = await response.json();
				form.reset();
				overlay.classList.remove('active');
			}
		}
	}

	function formValidate(form) {
		let error = 0;
		let formRequired = document.querySelectorAll('.required');

		for (let index = 0; index < formRequired.length; index++) {
			const input = formRequired[index];
			formRemoveError(input);

			if (input.classList.contains('email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('error');
		input.classList.add('error');
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove('error');
		input.classList.remove('error');
	}

	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});