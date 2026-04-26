import { useState } from "react";
import { useCart } from "@/lib/cart";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const { items, setOpen } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border ${className ?? ""}`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="font-display text-xl uppercase tracking-widest text-neon-green neon-text">
            ClickMaster
          </div>

          {/* Десктоп-навигация */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#catalog" className="text-muted-foreground hover:text-neon-green transition-colors duration-300 uppercase text-sm tracking-wide">Каталог</a>
            <a href="#catalog" className="text-muted-foreground hover:text-neon-green transition-colors duration-300 uppercase text-sm tracking-wide">Бренды</a>
            <a href="#catalog" className="text-muted-foreground hover:text-neon-green transition-colors duration-300 uppercase text-sm tracking-wide">Акции</a>
            <button
              onClick={() => setOpen(true)}
              className="relative text-muted-foreground hover:text-neon-green transition-colors duration-300 cursor-pointer ml-2"
            >
              <Icon name="ShoppingCart" size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-neon-green text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </nav>

          {/* Мобильные кнопки */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setOpen(true)} className="relative text-muted-foreground hover:text-neon-green transition-colors cursor-pointer">
              <Icon name="ShoppingCart" size={20} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-neon-green text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-muted-foreground hover:text-neon-green transition-colors cursor-pointer">
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col pt-20 bg-background/95 backdrop-blur-lg md:hidden">
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            <a onClick={() => setMenuOpen(false)} href="#catalog" className="font-display text-4xl uppercase tracking-widest text-foreground hover:text-neon-green transition-colors">Каталог</a>
            <a onClick={() => setMenuOpen(false)} href="#catalog" className="font-display text-4xl uppercase tracking-widest text-foreground hover:text-neon-green transition-colors">Бренды</a>
            <a onClick={() => setMenuOpen(false)} href="#catalog" className="font-display text-4xl uppercase tracking-widest text-foreground hover:text-neon-green transition-colors">Акции</a>
            <button
              onClick={() => { setMenuOpen(false); setOpen(true); }}
              className="mt-4 border border-neon-green text-neon-green font-display uppercase tracking-widest px-8 py-3 hover:bg-neon-green hover:text-black transition-all duration-300 cursor-pointer neon-border"
            >
              Корзина {count > 0 && `(${count})`}
            </button>
          </nav>
          <div className="text-center pb-10 text-muted-foreground text-xs uppercase tracking-widest">© {new Date().getFullYear()} ClickMaster</div>
        </div>
      )}
    </>
  );
}
