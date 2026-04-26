import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/api";
import Icon from "@/components/ui/icon";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const MOCK_REVIEWS = [
  { name: "Артём К.", rating: 5, text: "Реально лучшая мышь, которую я держал в руках. Сенсор безупречный, рука не устаёт даже после 6 часов игры.", date: "15 апреля 2025" },
  { name: "Дмитрий В.", rating: 5, text: "Взял для CS2 — разница ощутима. Наводка резче, движения плавнее. Однозначно рекомендую.", date: "3 марта 2025" },
  { name: "Катерина М.", rating: 4, text: "Отличная мышь, но немного тяжеловата для меня. Зато кнопки мягкие и отзывчивые.", date: "20 февраля 2025" },
];

const SPEC_LABELS: Record<string, string> = {
  dpi: "Разрешение сенсора",
  weight: "Вес",
  connection: "Подключение",
  battery: "Батарея",
  buttons: "Программируемых кнопок",
  polling: "Polling rate",
  sensor: "Сенсор",
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem, setOpen: setCartOpen } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuy = () => {
    addItem(product);
    onClose();
    setCartOpen(true);
  };

  const specEntries = Object.entries(product.specs).filter(([k]) => SPEC_LABELS[k]);
  const avgRating = MOCK_REVIEWS.reduce((s, r) => s + r.rating, 0) / MOCK_REVIEWS.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm px-0 md:px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card border border-border w-full md:max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-2xl md:rounded-2xl">
        {/* Шапка */}
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border flex items-center justify-between px-6 py-4 z-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.brand}</p>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Изображение */}
          <div className="relative bg-muted flex items-center justify-center p-8 min-h-64 md:min-h-96">
            <img src={product.image_url} alt={product.name} className="max-h-72 w-full object-contain" />
            {product.price_old && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                -{Math.round((1 - product.price / product.price_old) * 100)}%
              </span>
            )}
            {/* Рейтинг */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {[1,2,3,4,5].map((s) => (
                <Icon key={s} name="Star" size={12} className={s <= Math.round(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"} />
              ))}
              <span className="text-white text-xs ml-1">{avgRating.toFixed(1)}</span>
            </div>
          </div>

          {/* Инфо */}
          <div className="p-6 flex flex-col">
            <h2 className="font-display text-2xl md:text-3xl uppercase mb-2">{product.name}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{product.description}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-neon-green">{product.price.toLocaleString("ru")} ₽</span>
              {product.price_old && (
                <span className="text-lg text-muted-foreground line-through">{product.price_old.toLocaleString("ru")} ₽</span>
              )}
            </div>

            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAdd}
                className={`flex-1 border py-3 text-sm uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer rounded-lg ${added ? "border-neon-green text-neon-green neon-border" : "border-border text-foreground hover:border-neon-green hover:text-neon-green"}`}
              >
                {added ? "✓ Добавлено" : "В корзину"}
              </button>
              <button
                onClick={handleBuy}
                className="flex-1 bg-neon-green text-black py-3 text-sm uppercase tracking-widest font-bold hover:opacity-90 transition-all duration-300 cursor-pointer rounded-lg neon-glow"
              >
                Купить
              </button>
            </div>

            {/* Характеристики */}
            <div className="border-t border-border pt-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Характеристики</p>
              <div className="grid grid-cols-2 gap-3">
                {specEntries.map(([key, val]) => (
                  <div key={key} className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">{SPEC_LABELS[key]}</p>
                    <p className="text-sm font-semibold">{String(val)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Отзывы */}
        <div className="border-t border-border px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Отзывы покупателей</p>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Icon key={s} name="Star" size={14} className={s <= Math.round(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{avgRating.toFixed(1)} из 5</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {MOCK_REVIEWS.map((review, i) => (
              <div key={i} className="bg-muted rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm">{review.name}</span>
                  <div className="flex">
                    {[1,2,3,4,5].map((s) => (
                      <Icon key={s} name="Star" size={11} className={s <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                <p className="text-xs text-muted-foreground/60 mt-3">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
