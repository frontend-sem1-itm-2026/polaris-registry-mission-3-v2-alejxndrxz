document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const generalErrorContainer = document.getElementById('form-message');
  const skillCheckboxes = document.querySelectorAll('.skill-checkbox');
  const skillsContainer = document.getElementById('skills-container');
  const currentRoleGroup = document.getElementById('current-role-group');

  const API_URL = 'https://polaris.free.beeceptor.com/members';

  const setFieldError = (fieldId, message) => {
    const errorSpan = document.getElementById(`error-${fieldId}`);
    const input = document.getElementById(fieldId);

    if (errorSpan) errorSpan.textContent = message;

    if (input) {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }

    if (fieldId === 'current-role' && currentRoleGroup) {
      currentRoleGroup.classList.remove('is-valid');
      currentRoleGroup.classList.add('is-invalid');
    }
  };

  const setFieldValid = (fieldId) => {
    const errorSpan = document.getElementById(`error-${fieldId}`);
    const input = document.getElementById(fieldId);

    if (errorSpan) errorSpan.textContent = '';

    if (input) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    }

    if (fieldId === 'current-role' && currentRoleGroup) {
      currentRoleGroup.classList.remove('is-invalid');
      currentRoleGroup.classList.add('is-valid');
    }
  };

  const clearFieldState = (fieldId) => {
    const errorSpan = document.getElementById(`error-${fieldId}`);
    const input = document.getElementById(fieldId);

    if (errorSpan) errorSpan.textContent = '';

    if (input) {
      input.classList.remove('is-invalid', 'is-valid');
    }

    if (fieldId === 'current-role' && currentRoleGroup) {
      currentRoleGroup.classList.remove('is-invalid', 'is-valid');
    }
  };

  const setGeneralError = (message, type = 'danger') => {
    generalErrorContainer.textContent = message;
    generalErrorContainer.classList.remove('d-none', 'alert-danger', 'alert-success');
    generalErrorContainer.classList.add(`alert-${type}`);
  };

  const clearGeneralError = () => {
    generalErrorContainer.textContent = '';
    generalErrorContainer.classList.add('d-none');
    generalErrorContainer.classList.remove('alert-danger', 'alert-success');
  };

  const allFields = [
    'first-name', 'last-name-p', 'last-name-m', 'personal-email', 'phone',
    'birth-date', 'gender', 'profile-pic', 'institution', 'student-id',
    'career', 'semester', 'polaris-gen', 'admission-year', 'project-interest',
    'polaris-role', 'motivation', 'current-workplace', 'password',
    'confirm-password', 'privacyPolicy', 'current-role'
  ];

  const clearAllErrors = () => {
    allFields.forEach(fieldId => clearFieldState(fieldId));

    const skillsError = document.getElementById('error-skills');
    if (skillsError) skillsError.textContent = '';

    if (skillsContainer) {
      skillsContainer.classList.remove('border', 'border-danger', 'border-success', 'rounded', 'p-2');
    }

    clearGeneralError();
  };

  const scrollToFirstError = () => {
    const firstInvalid = document.querySelector('.is-invalid');

    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });

      if (firstInvalid.id === 'current-role-group') {
        const firstRadio = firstInvalid.querySelector('input[type="radio"]');
        if (firstRadio) firstRadio.focus({ preventScroll: true });
      } else {
        firstInvalid.focus({ preventScroll: true });
      }
    }
  };

  const validateSkills = () => {
    const anyChecked = Array.from(skillCheckboxes).some(cb => cb.checked);
    const skillsError = document.getElementById('error-skills');

    if (!anyChecked) {
      if (skillsError) skillsError.textContent = 'Debe seleccionar al menos una habilidad.';
      if (skillsContainer) {
        skillsContainer.classList.remove('border-success');
        skillsContainer.classList.add('border', 'border-danger', 'rounded', 'p-2');
      }
      return false;
    }

    if (skillsError) skillsError.textContent = '';
    if (skillsContainer) {
      skillsContainer.classList.remove('border-danger');
      skillsContainer.classList.add('border', 'border-success', 'rounded', 'p-2');
    }

    return true;
  };

  const validationRules = [
    {
      id: 'first-name',
      validate: () => {
        const firstName = document.getElementById('first-name').value.trim();
        const lastNameP = document.getElementById('last-name-p').value.trim();
        const lastNameM = document.getElementById('last-name-m').value.trim();
        const fullName = `${firstName} ${lastNameP} ${lastNameM}`.trim();
        return fullName.length >= 10;
      },
      message: 'El nombre debe tener más de 10 caracteres.'
    },
    {
      id: 'phone',
      validate: (input) => /^\d{10}$/.test(input.value.trim()),
      message: 'El teléfono debe contener exactamente 10 dígitos numéricos.'
    },
    {
      id: 'birth-date',
      validate: (input) => input.value.trim() !== '',
      message: 'La fecha de nacimiento es obligatoria.'
    },
    {
      id: 'semester',
      validate: (input) => {
        const val = parseInt(input.value, 10);
        return !isNaN(val) && val >= 1 && val <= 12;
      },
      message: 'El semestre debe estar entre 1 y 12.'
    },
    {
      id: 'career',
      validate: (input) => input.value !== '' && input.value !== null,
      message: 'Debe seleccionar una carrera.'
    },
    {
      id: 'project-interest',
      validate: (input) => input.value !== '' && input.value !== null,
      message: 'Debe seleccionar un proyecto de interés.'
    },
    {
      id: 'polaris-role',
      validate: (input) => input.value !== '' && input.value !== null,
      message: 'Debe seleccionar un rol dentro de POLARIS.'
    },
    {
      id: 'motivation',
      validate: (input) => input.value.trim().length >= 20,
      message: 'La motivación debe tener al menos 20 caracteres.'
    },
    {
      id: 'current-workplace',
      validate: (input) => {
        const value = input.value.trim();
        return value === '' || value.length >= 5;
      },
      message: 'Si captura este campo, debe tener al menos 5 caracteres.'
    },
    {
      id: 'password',
      validate: (input) => input.value.length >= 8,
      message: 'La contraseña debe tener al menos 8 caracteres.'
    },
    {
      id: 'confirm-password',
      validate: (input) => {
        const password = document.getElementById('password').value;
        return input.value === password;
      },
      message: 'Las contraseñas no coinciden.'
    },
    {
      id: 'privacyPolicy',
      validate: (input) => input.checked,
      message: 'Debe aceptar el aviso de privacidad.'
    },
    {
      id: 'personal-email',
      validate: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim()),
      message: 'Ingrese un correo electrónico válido.'
    },
    {
      id: 'gender',
      validate: (input) => input.value !== '' && input.value !== null,
      message: 'Debe seleccionar un género.'
    },
    {
      id: 'profile-pic',
      validate: (input) => input.files && input.files.length > 0,
      message: 'Debe subir una fotografía de perfil.'
    },
    {
      id: 'institution',
      validate: (input) => input.value.trim() !== '',
      message: 'La institución educativa es obligatoria.'
    },
    {
      id: 'student-id',
      validate: (input) => /^\d{8,9}$/.test(input.value.trim()),
      message: 'El número de control debe tener 8 o 9 dígitos numéricos.'
    },
    {
      id: 'polaris-gen',
      validate: (input) => input.value.trim() !== '',
      message: 'La generación POLARIS es obligatoria.'
    },
    {
      id: 'admission-year',
      validate: (input) => {
        const year = parseInt(input.value, 10);
        return !isNaN(year) && year >= 2020 && year <= 2030;
      },
      message: 'El año de ingreso debe estar entre 2020 y 2030.'
    },
    {
      id: 'current-role',
      validate: () => {
        const radios = document.querySelectorAll('input[name="current-role"]');
        let selected = false;
        radios.forEach(radio => {
          if (radio.checked) selected = true;
        });
        return selected;
      },
      message: 'Debe seleccionar un rol actual.'
    }
  ];

  const validateSingleField = (rule) => {
    let isValid;

    if (rule.id === 'current-role') {
      isValid = rule.validate();
    } else {
      const input = document.getElementById(rule.id);
      if (!input) return false;
      isValid = rule.validate(input);
    }

    if (isValid) {
      setFieldValid(rule.id);
    } else {
      setFieldError(rule.id, rule.message);
    }

    return isValid;
  };

  const validateForm = () => {
    clearAllErrors();
    let isValid = true;

    for (const rule of validationRules) {
      if (!validateSingleField(rule)) {
        isValid = false;
      }
    }

    if (!validateSkills()) isValid = false;

    if (!isValid) {
      setGeneralError('El formulario tiene errores. Revise los campos marcados antes de enviarlo.', 'danger');
      scrollToFirstError();
    }

    return isValid;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHTML = submitButton ? submitButton.innerHTML : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = 'Enviando...';
    }

    const data = {
      firstName: document.getElementById('first-name').value.trim(),
      lastNameP: document.getElementById('last-name-p').value.trim(),
      lastNameM: document.getElementById('last-name-m').value.trim(),
      personalEmail: document.getElementById('personal-email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      birthDate: document.getElementById('birth-date').value,
      gender: document.getElementById('gender').value,

      institution: document.getElementById('institution').value.trim(),
      studentId: document.getElementById('student-id').value.trim(),
      career: document.getElementById('career').value,
      semester: document.getElementById('semester').value,

      polarisGen: document.getElementById('polaris-gen').value.trim(),
      admissionYear: document.getElementById('admission-year').value,
      projectInterest: document.getElementById('project-interest').value,
      polarisRole: document.getElementById('polaris-role').value,
      motivation: document.getElementById('motivation').value.trim(),

      skills: [...document.querySelectorAll('.skill-checkbox:checked')].map(cb => cb.value),

      currentWorkplace: document.getElementById('current-workplace').value.trim(),
      currentRole: document.querySelector('input[name="current-role"]:checked')?.value || '',
      continueCollaborating: document.getElementById('continue-collaborating')?.checked || false,

      password: document.getElementById('password').value,
      privacyPolicy: document.getElementById('privacyPolicy').checked,

      // Solo manda el nombre del archivo, no la imagen real
      profilePicName: document.getElementById('profile-pic').files[0]?.name || ''
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Respuesta de Beeceptor:', responseText);

      setGeneralError('Formulario enviado correctamente a la API.', 'success');
      form.reset();

      allFields.forEach(fieldId => clearFieldState(fieldId));

      const skillsError = document.getElementById('error-skills');
      if (skillsError) skillsError.textContent = '';

      if (skillsContainer) {
        skillsContainer.classList.remove('border', 'border-danger', 'border-success', 'rounded', 'p-2');
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      setGeneralError('No se pudo enviar el formulario a la API.', 'danger');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
      }
    }
  });

  validationRules.forEach(rule => {
    if (rule.id === 'current-role') return;

    const input = document.getElementById(rule.id);
    if (!input) return;

    const eventType =
      (input.type === 'checkbox' || input.type === 'select-one' || input.type === 'file')
        ? 'change'
        : 'input';

    input.addEventListener(eventType, () => {
      validateSingleField(rule);
      clearGeneralError();
    });
  });

  const firstName = document.getElementById('first-name');
  const lastNameP = document.getElementById('last-name-p');
  const lastNameM = document.getElementById('last-name-m');
  const fullNameRule = validationRules.find(r => r.id === 'first-name');

  if (fullNameRule && firstName && lastNameP && lastNameM) {
    const revalidateFullName = () => {
      validateSingleField(fullNameRule);
      clearGeneralError();
    };

    firstName.addEventListener('input', revalidateFullName);
    lastNameP.addEventListener('input', revalidateFullName);
    lastNameM.addEventListener('input', revalidateFullName);
  }

  const passwordInput = document.getElementById('password');
  const confirmInput = document.getElementById('confirm-password');
  const confirmRule = validationRules.find(r => r.id === 'confirm-password');

  if (confirmRule && passwordInput && confirmInput) {
    const revalidateConfirm = () => {
      validateSingleField(confirmRule);
      clearGeneralError();
    };

    passwordInput.addEventListener('input', revalidateConfirm);
    confirmInput.addEventListener('input', revalidateConfirm);
  }

  const birthDate = document.getElementById('birth-date');
  if (birthDate) {
    birthDate.addEventListener('change', () => {
      const rule = validationRules.find(r => r.id === 'birth-date');
      if (rule) validateSingleField(rule);
      clearGeneralError();
    });
  }

  skillCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      validateSkills();
      clearGeneralError();
    });
  });

  const roleRadios = document.querySelectorAll('input[name="current-role"]');
  const roleRule = validationRules.find(r => r.id === 'current-role');

  if (roleRule) {
    roleRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        validateSingleField(roleRule);
        clearGeneralError();
      });
    });
  }

  const profilePic = document.getElementById('profile-pic');
  if (profilePic) {
    profilePic.addEventListener('change', () => {
      const rule = validationRules.find(r => r.id === 'profile-pic');
      if (rule) validateSingleField(rule);
      clearGeneralError();
    });
  }

  clearAllErrors();
});