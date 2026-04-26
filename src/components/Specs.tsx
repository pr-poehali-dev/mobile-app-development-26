import Icon from "@/components/ui/icon";
import OrderModal from "@/components/OrderModal";
import { useState } from "react";

const products = [
  {
    name: "HyperX Pulsefire Haste 2",
    tag: "Проводная",
    price: "5 490 ₽",
    highlight: false,
    image: "https://cdn.poehali.dev/projects/6b52ee2b-e0b4-4ced-bbef-3e2e16b812a9/files/211ba433-dc4e-4dd0-abc6-e5c6d6986d22.jpg",
    specs: {
      dpi: "100 – 26 000",
      weight: "53 г",
      connection: "USB-A",
      battery: "—",
      buttons: "6",
      polling: "8000 Гц",
    },
  },
  {
    name: "Razer Viper V3 Pro",
    tag: "Хит продаж",
    price: "14 990 ₽",
    highlight: true,
    image: "https://cdn.poehali.dev/projects/6b52ee2b-e0b4-4ced-bbef-3e2e16b812a9/files/2f05b386-30cf-427a-be87-76a9691166e3.jpg",
    specs: {
      dpi: "100 – 35 000",
      weight: "82 г",
      connection: "Беспроводная 2.4 ГГц",
      battery: "95 часов",
      buttons: "8",
      polling: "4000 Гц",
    },
  },
  {
    name: "Logitech G502 HERO",
    tag: "Флагман",
    price: "7 990 ₽",
    highlight: false,
    image: "https://cdn.poehali.dev/projects/6b52ee2b-e0b4-4ced-bbef-3e2e16b812a9/files/360821e6-b095-4582-a1ea-9172b83b37ab.jpg",
    specs: {
      dpi: "100 – 25 600",
      weight: "121 г",
      connection: "USB-A",
      battery: "—",
      buttons: "11",
      polling: "1000 Гц",
    },
  },
];

const specLabels: { key: keyof typeof products[0]["specs"]; icon: string; label: string }[] = [
  { key: "dpi", icon: "Crosshair", label: "DPI" },
  { key: "weight", icon: "Scale", label: "Вес" },
  { key: "connection", icon: "Wifi", label: "Подключение" },
  { key: "battery", icon: "Battery", label: "Батарея" },
  { key: "buttons", icon: "MousePointer2", label: "Кнопок" },
  { key: "polling", icon: "Zap", label: "Polling rate" },
];

export default function Specs() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <section className="bg-neutral-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-xs tracking-widest text-neutral-500 mb-4">Сравнение моделей</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 leading-tight">
          Найди свою мышь
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.name}
              className={`relative rounded-2xl overflow-hidden flex flex-col ${
                product.highlight
                  ? "bg-white text-neutral-900"
                  : "bg-neutral-900 text-white border border-neutral-800"
              }`}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-3 left-3 text-xs uppercase tracking-widest px-3 py-1 rounded-full font-medium ${
                  product.highlight
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-800 text-neutral-300"
                }`}>
                  {product.tag}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                <p className={`text-3xl font-bold mb-6 ${product.highlight ? "text-neutral-900" : "text-white"}`}>
                  {product.price}
                </p>

                <div className="flex flex-col gap-4 mb-8 flex-1">
                  {specLabels.map(({ key, icon, label }) => (
                    <div
                      key={key}
                      className={`flex items-center justify-between text-sm border-b pb-3 ${
                        product.highlight ? "border-neutral-200" : "border-neutral-800"
                      }`}
                    >
                      <div className={`flex items-center gap-2 ${product.highlight ? "text-neutral-500" : "text-neutral-400"}`}>
                        <Icon name={icon} size={14} />
                        <span>{label}</span>
                      </div>
                      <span className="font-medium">{product.specs[key]}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProduct(product.name)}
                  className={`w-full py-3 text-sm uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer rounded-lg ${
                    product.highlight
                      ? "bg-neutral-900 text-white hover:bg-neutral-700"
                      : "bg-transparent border border-neutral-700 text-white hover:bg-neutral-800"
                  }`}
                >
                  Купить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <OrderModal
          productName={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
