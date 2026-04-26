import { useState } from "react";
import { useCart } from "@/lib/cart";
import { createOrder } from "@/lib/api";
import Icon from "@/components/ui/icon";

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, clearCart, total } = useCart();
  const [step, setStep] = useState<"cart" | "form" | "success">("cart");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createOrder({
      ...form,
      items: items.map((i) => ({
        product_id: i.product.id,
        product_name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
    });
    setLoading(false);
    clearCart();
    setStep("success");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative bg-white w-full max-w-md h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="font-bold text-lg uppercase tracking-wide">
            {step === "cart" && `Корзина (${items.length})`}
            {step === "form" && "Оформление"}
            {step === "success" && "Заказ принят!"}
          </h2>
          <button onClick={() => { setOpen(false); setStep("cart"); }} className="text-neutral-400 hover:text-neutral-900 cursor-pointer transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        {step === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="text-center py-16 text-neutral-400">
                  <Icon name="ShoppingCart" size={48} />
                  <p className="mt-4">Корзина пуста</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 border-b border-neutral-100 pb-4">
                      <img src={item.product.image_url} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-tight">{item.product.name}</p>
                        <p className="text-neutral-500 text-sm mt-1">{item.product.price.toLocaleString("ru")} ₽</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-7 h-7 border border-neutral-200 rounded flex items-center justify-center text-sm cursor-pointer hover:border-neutral-900 transition-colors">−</button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-7 h-7 border border-neutral-200 rounded flex items-center justify-center text-sm cursor-pointer hover:border-neutral-900 transition-colors">+</button>
                          <button onClick={() => removeItem(item.product.id)} className="ml-auto text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
                            <Icon name="Trash2" size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="px-6 py-4 border-t border-neutral-200">
                <div className="flex justify-between mb-4">
                  <span className="text-neutral-600">Итого:</span>
                  <span className="font-bold text-xl">{total().toLocaleString("ru")} ₽</span>
                </div>
                <button onClick={() => setStep("form")} className="w-full bg-neutral-900 text-white py-3 uppercase tracking-widest text-sm font-bold hover:bg-neutral-700 transition-colors cursor-pointer rounded-lg">
                  Оформить заказ
                </button>
              </div>
            )}
          </>
        )}

        {step === "form" && (
          <form onSubmit={handleOrder} className="flex flex-col flex-1 px-6 py-4">
            <div className="flex-1 flex flex-col gap-4">
              <button type="button" onClick={() => setStep("cart")} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer w-fit">
                <Icon name="ArrowLeft" size={16} />
                Назад к корзине
              </button>
              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-500 mb-1 block">Имя *</label>
                <input required type="text" placeholder="Иван Иванов" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-500 mb-1 block">Телефон *</label>
                <input required type="tel" placeholder="+7 (999) 000-00-00" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-500 mb-1 block">Email</label>
                <input type="email" placeholder="ivan@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors" />
              </div>
              <div className="bg-neutral-50 rounded-lg p-4 text-sm">
                <p className="text-neutral-500 mb-2">Ваш заказ:</p>
                {items.map((i) => (
                  <div key={i.product.id} className="flex justify-between text-neutral-700">
                    <span>{i.product.name} × {i.quantity}</span>
                    <span>{(i.product.price * i.quantity).toLocaleString("ru")} ₽</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold mt-2 pt-2 border-t border-neutral-200">
                  <span>Итого</span>
                  <span>{total().toLocaleString("ru")} ₽</span>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="mt-4 w-full bg-neutral-900 text-white py-3 uppercase tracking-widest text-sm font-bold hover:bg-neutral-700 transition-colors cursor-pointer rounded-lg disabled:opacity-50">
              {loading ? "Отправляем..." : "Подтвердить заказ"}
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Icon name="Check" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Заказ оформлен!</h3>
            <p className="text-neutral-500 mb-8">Мы свяжемся с вами в течение 30 минут и уточним детали доставки.</p>
            <button onClick={() => { setOpen(false); setStep("cart"); }} className="bg-neutral-900 text-white px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-neutral-700 transition-colors cursor-pointer rounded-lg">
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
