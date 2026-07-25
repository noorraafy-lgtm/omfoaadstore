// ===== أداة عرض التنبيهات (Toast) بدل alert() =====
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  // إزالة التنبيه تلقائياً بعد انتهاء الأنيميشن
  setTimeout(() => toast.remove(), 3000);
}

// ===== رسالة ترحيب بعد تسجيل الدخول (تُقرأ من رابط الصفحة فقط، بدون تخزين) =====
(function welcomeAfterLogin() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('welcome') === '1') {
    showToast('تم تسجيل الدخول بنجاح، أهلاً بك 💜', 'success');
    // تنظيف الرابط حتى لا تتكرر الرسالة عند تحديث الصفحة
    const url = new URL(window.location.href);
    url.searchParams.delete('welcome');
    window.history.replaceState({}, document.title, url.pathname + url.hash);
  }
})();

// ===== قائمة الموبايل =====
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // إغلاق القائمة عند اختيار رابط (تجربة أفضل على الموبايل)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== زر الطلب يوديك للمنتجات =====
const orderBtn = document.getElementById('orderBtn');
if (orderBtn) {
  orderBtn.addEventListener('click', function () {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });
}

// ===== السلة =====
let cartCount = 0;
const cartCountEl = document.getElementById('cartCount');

function updateCartBadge() {
  if (cartCountEl) cartCountEl.textContent = cartCount;
}

const buyButtons = document.querySelectorAll('.buyBtn');
buyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    cartCount += 1;
    updateCartBadge();
    const productName = btn.dataset.name || 'المنتج';
    showToast(`تمت إضافة "${productName}" للسلة بنجاح 💜`, 'success');
  });
});

// ===== التحقق من نموذج التواصل وإرساله =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const nameInput = document.getElementById('nameInput');
  const phoneInput = document.getElementById('phoneInput');
  const messageInput = document.getElementById('messageInput');
  const submitBtn = document.getElementById('contactSubmit');

  function setError(input, errorEl, message) {
    if (message) {
      input.classList.add('invalid');
      errorEl.textContent = message;
    } else {
      input.classList.remove('invalid');
      errorEl.textContent = '';
    }
  }

  function validateContactForm() {
    let valid = true;

    if (!nameInput.value.trim()) {
      setError(nameInput, document.getElementById('nameError'), 'من فضلك أدخل الاسم');
      valid = false;
    } else {
      setError(nameInput, document.getElementById('nameError'), '');
    }

    const phoneDigits = phoneInput.value.replace(/\D/g, '');
    if (phoneDigits.length < 9) {
      setError(phoneInput, document.getElementById('phoneError'), 'رقم الواتساب غير صحيح');
      valid = false;
    } else {
      setError(phoneInput, document.getElementById('phoneError'), '');
    }

    if (!messageInput.value.trim()) {
      setError(messageInput, document.getElementById('messageError'), 'من فضلك اكتب رسالتك');
      valid = false;
    } else {
      setError(messageInput, document.getElementById('messageError'), '');
    }

    return valid;
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateContactForm()) {
      showToast('من فضلك صحّح الحقول المطلوبة', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري الإرسال...';

    // محاكاة إرسال الطلب (يمكن استبدالها بطلب فعلي إلى خادم لاحقاً)
    setTimeout(() => {
      showToast('شكراً لتواصلك معنا! سيرد عليك فريق أم فؤاد قريباً', 'success');
      this.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'إرسال';
    }, 700);
  });
}