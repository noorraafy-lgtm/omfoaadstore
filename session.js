/**
 * جلسة الدخول - نسخة العرض التجريبي (Demo)
 * ==========================================
 * هذا تسجيل دخول تجريبي فقط لأغراض العرض: أي بريد/كلمة مرور بالشكل الصحيح
 * تُعتبر ناجحة، ولا يوجد تحقق حقيقي من حساب في قاعدة بيانات.
 *
 * عند ربط الموقع بـ PHP/MySQL لاحقاً:
 * - استبدل login() بطلب fetch إلى ملف مثل api/login.php يتحقق من المستخدم
 *   وكلمة المرور (مع تشفير bcrypt) ويرجع جلسة حقيقية (PHP session أو token).
 * - استبدل isLoggedIn()/getUser() بالتحقق من تلك الجلسة بدلاً من localStorage.
 * - احم صفحة dashboard.html من جهة السيرفر أيضاً (وليس فقط بجافاسكربت)
 *   حتى لا يستطيع أي شخص الوصول لها بتعديل الرابط مباشرة.
 */

const SESSION_KEY = 'omfouad_session_demo';

const Session = {
  login(email) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email, loggedInAt: Date.now() }));
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  isLoggedIn() {
    return !!localStorage.getItem(SESSION_KEY);
  },

  getUser() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },
};