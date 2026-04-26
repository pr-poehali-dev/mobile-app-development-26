import { useCart } from "@/lib/cart";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const { items, setOpen } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-white text-sm uppercase tracking-wide font-bold">ClickMaster</div>
        <nav className="flex items-center gap-8">
          <a
            href="#catalog"
            className="text-white hover:text-neutral-400 transition-colors duration-300 uppercase text-sm"
          >
            Каталог
          </a>
          <button
            onClick={() => setOpen(true)}
            className="relative text-white hover:text-neutral-400 transition-colors duration-300 cursor-pointer"
          >
            <Icon name="ShoppingCart" size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-neutral-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
