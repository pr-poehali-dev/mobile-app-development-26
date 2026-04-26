import Icon from "@/components/ui/icon";

const products = [
  {
    name: "ClickMaster Air",
    tag: "Беспроводная",
    price: "5 990 ₽",
    highlight: false,
    specs: {
      dpi: "100 – 26 000",
      weight: "68 г",
      connection: "Беспроводная 2.4 ГГц",
      battery: "70 часов",
      buttons: "6",
      polling: "1000 Гц",
    },
  },
  {
    name: "ClickMaster Pro",
    tag: "Хит продаж",
    price: "9 490 ₽",
    highlight: true,
    specs: {
      dpi: "100 – 36 000",
      weight: "55 г",
      connection: "Беспроводная / USB-C",
      battery: "95 часов",
      buttons: "8",
      polling: "4000 Гц",
    },
  },
  {
    name: "ClickMaster Speed",
    tag: "Проводная",
    price: "3 990 ₽",
    highlight: false,
    specs: {
      dpi: "100 – 16 000",
      weight: "49 г",
      connection: "USB-A",
      battery: "—",
      buttons: "6",
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
              className={`relative rounded-2xl p-8 flex flex-col ${
                product.highlight
                  ? "bg-white text-neutral-900"
                  : "bg-neutral-900 text-white border border-neutral-800"
              }`}
            >
              {product.highlight && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-neutral-900 text-white text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                    {product.tag}
                  </span>
                </div>
              )}
              {!product.highlight && (
                <span className={`text-xs uppercase tracking-widest mb-2 ${product.highlight ? "text-neutral-500" : "text-neutral-500"}`}>
                  {product.tag}
                </span>
              )}

              <h3 className="text-xl font-bold mb-1">{product.name}</h3>
              <p className={`text-3xl font-bold mb-8 ${product.highlight ? "text-neutral-900" : "text-white"}`}>
                {product.price}
              </p>

              <div className="flex flex-col gap-4 mb-8 flex-1">
                {specLabels.map(({ key, icon, label }) => (
                  <div key={key} className={`flex items-center justify-between text-sm border-b pb-3 ${product.highlight ? "border-neutral-200" : "border-neutral-800"}`}>
                    <div className={`flex items-center gap-2 ${product.highlight ? "text-neutral-500" : "text-neutral-400"}`}>
                      <Icon name={icon} size={14} />
                      <span>{label}</span>
                    </div>
                    <span className="font-medium">{product.specs[key]}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 text-sm uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer ${
                  product.highlight
                    ? "bg-neutral-900 text-white hover:bg-neutral-700"
                    : "bg-transparent border border-neutral-700 text-white hover:bg-neutral-800"
                }`}
              >
                Купить
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
