import { useState } from "react";
import Icon from "@/components/ui/icon";

interface OrderModalProps {
  productName: string;
  onClose: () => void;
}

export default function OrderModal({ productName, onClose }: OrderModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <Icon name="X" size={20} />
        </button>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} fallback="CircleCheck" />
            </div>
            <h3 className="text-xl font-bold mb-2">Заявка принята!</h3>
            <p className="text-neutral-500 text-sm">
              Мы свяжемся с вами в течение 30 минут и уточним детали заказа.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-neutral-900 text-white px-6 py-3 text-sm uppercase tracking-widest font-bold hover:bg-neutral-700 transition-colors cursor-pointer rounded-lg w-full"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Оформить заказ</p>
            <h3 className="text-xl font-bold mb-1">{productName}</h3>
            <p className="text-sm text-neutral-500 mb-6">Оставьте контакты — мы перезвоним и оформим доставку</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-500 mb-1 block">Имя</label>
                <input
                  type="text"
                  required
                  placeholder="Иван Иванов"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-500 mb-1 block">Телефон</label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (999) 000-00-00"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-neutral-500 mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="ivan@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 bg-neutral-900 text-white py-3 text-sm uppercase tracking-widest font-bold hover:bg-neutral-700 transition-colors cursor-pointer rounded-lg disabled:opacity-50"
              >
                {status === "loading" ? "Отправляем..." : "Отправить заявку"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
