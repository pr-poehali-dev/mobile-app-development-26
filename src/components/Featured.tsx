export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/6b52ee2b-e0b4-4ced-bbef-3e2e16b812a9/files/8430e4a8-3561-4e45-9dd0-f834d5f1294a.jpg"
          alt="Gaming mouse close-up"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Технологии следующего уровня</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Оптический сенсор до 36 000 DPI, беспроводное подключение с задержкой 1 мс, эргономичный корпус под ладонь любого размера — мышь, которая думает вместе с тобой.
        </p>
        <div className="flex flex-col gap-3 mb-8 text-neutral-700 text-sm">
          <div>— Проводные и беспроводные модели</div>
          <div>— Вес от 49 г для максимальной скорости</div>
          <div>— RGB-подсветка с 16 млн цветов</div>
          <div>— Программируемые кнопки до 8 шт.</div>
        </div>
        <button className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide">
          Смотреть каталог
        </button>
      </div>
    </div>
  );
}