export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-card border-t border-border">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2 relative overflow-hidden">
        <img
          src="https://cdn.poehali.dev/projects/6b52ee2b-e0b4-4ced-bbef-3e2e16b812a9/files/8430e4a8-3561-4e45-9dd0-f834d5f1294a.jpg"
          alt="Gaming mouse close-up"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-card via-transparent to-transparent lg:from-transparent lg:via-transparent lg:to-card" />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <p className="uppercase mb-4 text-xs tracking-[0.3em] text-neon-green neon-text">Технологии следующего уровня</p>
        <h2 className="font-display text-3xl lg:text-5xl mb-8 leading-tight uppercase">
          Мышь, которая<br /><span className="text-neon-green">думает</span><br />вместе с тобой
        </h2>
        <div className="flex flex-col gap-3 mb-8 text-muted-foreground text-sm">
          <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-neon-green flex-shrink-0" />Проводные и беспроводные модели</div>
          <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-neon-green flex-shrink-0" />Вес от 49 г для максимальной скорости</div>
          <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-neon-green flex-shrink-0" />RGB-подсветка с 16 млн цветов</div>
          <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-neon-purple flex-shrink-0" />Программируемые кнопки до 12 шт.</div>
        </div>
        <a href="#catalog" className="border border-neon-green text-neon-green font-display px-6 py-3 text-sm transition-all duration-300 hover:bg-neon-green hover:text-black cursor-pointer w-fit uppercase tracking-widest neon-border">
          Смотреть каталог
        </a>
      </div>
    </div>
  );
}