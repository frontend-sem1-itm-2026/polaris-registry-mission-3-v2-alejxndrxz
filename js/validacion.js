document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registration-form');
  const formMessage = document.getElementById('form-message');

  const firstName = document.getElementById('first-name');
  const lastNameP = document.getElementById('last-name-p');
  const lastNameM = document.getElementById('last-name-m');
  const phone = document.getElementById('phone');
  const birthDate = document.getElementById('birth-date');
  const semester = document.getElementById('semester');
  const career = document.getElementById('career');
  const projectInterest = document.getElementById('project-interest');
  const polarisRole = document.getElementById('polaris-role');
  const motivation = document.getElementById('motivation');
  const currentWorkplace = document.getElementById('current-workplace');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  const privacyPolicy = document.getElementById('privacyPolicy');
  const skillCheckboxes = document.querySelectorAll('.skill-checkbox');

  function setError(id, message) {
    const errorElement = document.getElementById('error-' + id);
    const inputElement = document.getElementById(id);

    if (errorElement) {
      errorElement.textContent = message;
    }

    if (inputElement) {
      inputElement.classList.add('is-invalid');
    }
  }

  function clearError(id) {
    const errorElement = document.getElementById('error-' + id);
    const inputElement = document.getElementById(id);

    if (errorElement) {
      errorElement.textContent = '';
    }

    if (inputElement) {
      inputElement.classList.remove('is-invalid');
    }
  }

  function setGeneralError(message) {
    formMessage.textContent = message;
    formMessage.classList.remove('d-none');
  }

  function clearGeneralError() {
    formMessage.textContent = '';
    formMessage.classList.add('d-none');
  }

  function validarFormulario() {
    let valido = true;

    clearGeneralError();

    const ids = [
      'first-name',
      'last-name-p',
      'last-name-m',
      'personal-email',
      'phone',
      'birth-date',
      'gender',
      'profile-pic',
      'institution',
      'student-id',
      'career',
      'semester',
      'polaris-gen',
      'admission-year',
      'project-interest',
      'polaris-role',
      'motivation',
      'current-workplace',
      'password',
      'confirm-password',
      'privacyPolicy'
    ];

    ids.forEach(function (id) {
      clearError(id);
    });

    document.getElementById('error-skills').textContent = '';

    const nombreCompleto = (
      firstName.value.trim() + ' ' +
      lastNameP.value.trim() + ' ' +
      lastNameM.value.trim()
    ).trim();

    if (nombreCompleto.length < 10) {
      setError('first-name', 'El nombre completo debe tener al menos 10 caracteres en total.');
      valido = false;
    }

    const telefonoLimpio = phone.value.trim();
    if (!/^\d{10}$/.test(telefonoLimpio)) {
      setError('phone', 'El teléfono debe contener exactamente 10 dígitos.');
      valido = false;
    }

    if (birthDate.value.trim() === '') {
      setError('birth-date', 'La fecha de nacimiento no debe quedar vacía.');
      valido = false;
    }

    const semestreValor = parseInt(semester.value, 10);
    if (isNaN(semestreValor) || semestreValor < 1 || semestreValor > 12) {
      setError('semester', 'El semestre debe estar entre 1 y 12.');
      valido = false;
    }

    if (career.value === '' || career.value === null) {
      setError('career', 'Debe seleccionar una carrera.');
      valido = false;
    }

    if (projectInterest.value === '' || projectInterest.value === null) {
      setError('project-interest', 'Debe seleccionar un proyecto de interés.');
      valido = false;
    }

    if (polarisRole.value === '' || polarisRole.value === null) {
      setError('polaris-role', 'Debe seleccionar un rol dentro de POLARIS.');
      valido = false;
    }

    let habilidadSeleccionada = false;
    skillCheckboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        habilidadSeleccionada = true;
      }
    });

    if (!habilidadSeleccionada) {
      document.getElementById('error-skills').textContent = 'Debe seleccionar al menos una habilidad.';
      valido = false;
    }

    if (motivation.value.trim().length < 20) {
      setError('motivation', 'La motivación debe tener al menos 20 caracteres.');
      valido = false;
    }

    if (currentWorkplace.value.trim() !== '' && currentWorkplace.value.trim().length < 5) {
      setError('current-workplace', 'Si captura este campo, debe tener al menos 5 caracteres.');
      valido = false;
    }

    if (password.value.length < 8) {
      setError('password', 'La contraseña debe tener al menos 8 caracteres.');
      valido = false;
    }

    if (confirmPassword.value !== password.value) {
      setError('confirm-password', 'Las contraseñas no coinciden.');
      valido = false;
    }

    if (!privacyPolicy.checked) {
      setError('privacyPolicy', 'Debe aceptar el aviso de privacidad.');
      valido = false;
    }

    if (!valido) {
      setGeneralError('El formulario tiene errores. Revise los campos marcados antes de enviarlo.');
    }

    return valido;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (validarFormulario()) {
      alert('Formulario validado correctamente. El envío fue habilitado.');
      form.submit();
    }
  });

  firstName.addEventListener('input', function () {
    clearError('first-name');
    clearGeneralError();
  });

  lastNameP.addEventListener('input', function () {
    clearError('last-name-p');
    clearGeneralError();
  });

  lastNameM.addEventListener('input', function () {
    clearError('last-name-m');
    clearGeneralError();
  });

  phone.addEventListener('input', function () {
    clearError('phone');
    clearGeneralError();
  });

  birthDate.addEventListener('change', function () {
    clearError('birth-date');
    clearGeneralError();
  });

  semester.addEventListener('input', function () {
    clearError('semester');
    clearGeneralError();
  });

  career.addEventListener('change', function () {
    clearError('career');
    clearGeneralError();
  });

  projectInterest.addEventListener('change', function () {
    clearError('project-interest');
    clearGeneralError();
  });

  polarisRole.addEventListener('change', function () {
    clearError('polaris-role');
    clearGeneralError();
  });

  motivation.addEventListener('input', function () {
    clearError('motivation');
    clearGeneralError();
  });

  currentWorkplace.addEventListener('input', function () {
    clearError('current-workplace');
    clearGeneralError();
  });

  password.addEventListener('input', function () {
    clearError('password');
    clearError('confirm-password');
    clearGeneralError();
  });

  confirmPassword.addEventListener('input', function () {
    clearError('confirm-password');
    clearGeneralError();
  });

  privacyPolicy.addEventListener('change', function () {
    clearError('privacyPolicy');
    clearGeneralError();
  });

  skillCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      document.getElementById('error-skills').textContent = '';
      clearGeneralError();
    });
  });
});