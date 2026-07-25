/**
 * طبقة بيانات المنتجات - نسخة العرض التجريبي (Demo)
 * ==================================================
 * تُخزَّن المنتجات حالياً في localStorage الخاص بالمتصفح، لذلك التعديلات
 * تظهر فقط عندك في نفس المتصفح، وليست ظاهرة لبقية الزوار على الإنترنت.
 *
 * عند ربط الموقع لاحقاً بـ PHP/MySQL على الاستضافة:
 * - أنشئ ملفات مثل api/products.php (GET/POST/PUT/DELETE) تتعامل مع قاعدة البيانات.
 * - غيّر فقط دوال getAll / add / update / remove بالأسفل لتستخدم fetch()
 *   بدلاً من localStorage. باقي الموقع (dashboard.js و script.js) سيبقى كما هو
 *   لأنه لا يتعامل مباشرة مع التخزين، فقط يستدعي ProductStore.
 */

const STORAGE_KEY = 'omfouad_products_demo';

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'منتج 1', price: 20000, image: 'https://via.placeholder.com/200' },
  { id: 2, name: 'منتج 2', price: 35000, image: 'https://via.placeholder.com/200' },
  { id: 3, name: 'منتج 3', price: 15000, image: 'https://via.placeholder.com/200' },
];

const ProductStore = {
  getAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this._saveAll(DEFAULT_PRODUCTS);
        return [...DEFAULT_PRODUCTS];
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('ProductStore.getAll error:', e);
      return [...DEFAULT_PRODUCTS];
    }
  },

  add(product) {
    const products = this.getAll();
    const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id: nextId,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.image || 'https://via.placeholder.com/200',
    };
    products.push(newProduct);
    this._saveAll(products);
    return newProduct;
  },

  update(id, updates) {
    const products = this.getAll();
    const idx = products.findIndex(p => p.id === Number(id));
    if (idx === -1) return null;
    products[idx] = {
      ...products[idx],
      ...updates,
      price: updates.price !== undefined ? Number(updates.price) || 0 : products[idx].price,
    };
    this._saveAll(products);
    return products[idx];
  },

  remove(id) {
    const products = this.getAll().filter(p => p.id !== Number(id));
    this._saveAll(products);
  },

  _saveAll(products) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('ProductStore.saveAll error:', e);
    }
  },
};
