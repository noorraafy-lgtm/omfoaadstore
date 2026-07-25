// ===== أداة عرض التنبيهات (نفس منطق الصفحة الرئيسية) =====
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const loginSubmit = document.getElementById('loginSubmit');
const loginSpinner = document.getElementById('loginSpinner');
const togglePass = document.getElementById('togglePass');

// ===== إظهار/إخفاء كلمة المرور =====
if (togglePass) {
  togglePass.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePass.textContent = isPassword ? '🙈' : '👁';
  });
}

function setFieldError(input, errorEl, message) {
  if (message) {
    input.classList.add('invalid');
    errorEl.textContent = message;
  } else {
    input.classList.remove('invalid');
    errorEl.textContent = '';
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validateLoginForm() {
  let valid = true;

  if (!isValidEmail(emailInput.value)) {
    setFieldError(emailInput, emailError, 'من فضلك أدخل بريد إلكتروني صحيح');
    valid = false;
  } else {
    setFieldError(emailInput, emailError, '');
  }

  if (passwordInput.value.length < 6) {
    setFieldError(passwordInput, passwordError, 'كلمة المرور يجب ألا تقل عن 6 أحرف');
    valid = false;
  } else {
    setFieldError(passwordInput, passwordError, '');
  }

  return valid;
}

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateLoginForm()) {
      showToast('من فضلك صحّح الحقول المطلوبة', 'error');
      return;
    }

    const enteredEmail = emailInput.value.trim();
    const enteredPassword = passwordInput.value;

    if (enteredEmail !== 'aida@gmail.com' || enteredPassword !== '12345678') {
      showToast('البريد الإلكتروني أو كلمة المرور غير صحيحة', 'error');
      return;
    }

    // حالة التحميل
    loginSubmit.disabled = true;
    loginSpinner.hidden = false;

    // محاكاة طلب تسجيل الدخول لخادم (يجب استبدال هذا الجزء بطلب fetch
    // حقيقي إلى الـ Backend عند ربط الموقع بقاعدة بيانات وتفعيل الجلسات)
    setTimeout(() => {
      loginSubmit.disabled = false;
      loginSpinner.hidden = true;

      Session.login(enteredEmail);
      window.location.href = 'dashboard.html?welcome=1';
    }, 900);
  });
}
