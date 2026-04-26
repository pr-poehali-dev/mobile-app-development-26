import { useEffect, useState } from "react";
import { fetchProducts, fetchCategories, type Product, type Category } from "@/lib/api";
import { useCart } from "@/lib/cart";
import Icon from "@/components/ui/icon";

const BRANDS = ["Razer", "Logitech", "HyperX", "SteelSeries", "Bloody"];

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceMax, setPriceMax] = useState(20000);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { addItem, setOpen } = useCart();

  const load = async () => {
    setLoading(true);
    const [prods, cats] = await Promise.all([
      fetchProducts({ category: selectedCategory || undefined, brand: selectedBrand || undefined, price_max: priceMax, search: search || undefined }),
      fetchCategories(),
    ]);
    setProducts(prods);
    setCategories(cats);
    setLoading(false);
  };

  useEffect(() => { load(); }, [selectedCategory, selectedBrand, priceMax]);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); load(); };

  const handleAddToCart = (product: Product) => {
    addItem(product);
    setOpen(true);
  };

  return (
    <section id="catalog" className="bg-neutral-50 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-xs tracking-widest text-neutral-500 mb-4">Все модели</p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 leading-tight">Каталог мышей</h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-neutral-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-neutral-900 transition-colors w-48"
            />
            <button type="submit" className="bg-neutral-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-neutral-700 transition-colors">
              <Icon name="Search" size={16} />
            </button>
          </form>
        </div>

        <div className="flex gap-8">
          {/* Фильтры — десктоп */}
          <aside className="hidden lg:flex flex-col gap-6 w-52 flex-shrink-0">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Категория</p>
              <div className="flex flex-col gap-1">
                <button onClick={() => setSelectedCategory("")} className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${!selectedCategory ? "bg-neutral-900 text-white" : "hover:bg-neutral-200 text-neutral-700"}`}>Все</button>
                {categories.map((c) => (
                  <button key={c.slug} onClick={() => setSelectedCategory(c.slug)} className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${selectedCategory === c.slug ? "bg-neutral-900 text-white" : "hover:bg-neutral-200 text-neutral-700"}`}>{c.name}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Бренд</p>
              <div className="flex flex-col gap-1">
                <button onClick={() => setSelectedBrand("")} className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${!selectedBrand ? "bg-neutral-900 text-white" : "hover:bg-neutral-200 text-neutral-700"}`}>Все</button>
                {BRANDS.map((b) => (
                  <button key={b} onClick={() => setSelectedBrand(b)} className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${selectedBrand === b ? "bg-neutral-900 text-white" : "hover:bg-neutral-200 text-neutral-700"}`}>{b}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">До {priceMax.toLocaleString("ru")} ₽</p>
              <input type="range" min={1000} max={20000} step={500} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-neutral-900" />
            </div>
          </aside>

          {/* Мобильный фильтр */}
          <div className="lg:hidden w-full mb-4">
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 text-sm border border-neutral-300 px-4 py-2 rounded-lg cursor-pointer hover:border-neutral-900 transition-colors">
              <Icon name="SlidersHorizontal" size={16} />
              Фильтры
            </button>
            {filtersOpen && (
              <div className="mt-4 p-4 bg-white rounded-xl border border-neutral-200 flex flex-wrap gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Категория</p>
                  <div className="flex flex-wrap gap-1">
                    <button onClick={() => setSelectedCategory("")} className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${!selectedCategory ? "bg-neutral-900 text-white" : "border border-neutral-300 hover:border-neutral-900"}`}>Все</button>
                    {categories.map((c) => (
                      <button key={c.slug} onClick={() => setSelectedCategory(c.slug)} className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${selectedCategory === c.slug ? "bg-neutral-900 text-white" : "border border-neutral-300 hover:border-neutral-900"}`}>{c.name}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Бренд</p>
                  <div className="flex flex-wrap gap-1">
                    <button onClick={() => setSelectedBrand("")} className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${!selectedBrand ? "bg-neutral-900 text-white" : "border border-neutral-300 hover:border-neutral-900"}`}>Все</button>
                    {BRANDS.map((b) => (
                      <button key={b} onClick={() => setSelectedBrand(b)} className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${selectedBrand === b ? "bg-neutral-900 text-white" : "border border-neutral-300 hover:border-neutral-900"}`}>{b}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Товары */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-52 bg-neutral-200" />
                    <div className="p-6">
                      <div className="h-4 bg-neutral-200 rounded mb-2 w-3/4" />
                      <div className="h-6 bg-neutral-200 rounded mb-4 w-1/2" />
                      <div className="h-10 bg-neutral-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-neutral-400">
                <Icon name="PackageSearch" size={48} />
                <p className="mt-4">Товары не найдены. Попробуйте изменить фильтры.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl overflow-hidden group flex flex-col">
                    <div className="relative h-52 overflow-hidden">
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {product.price_old && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          -{Math.round((1 - product.price / product.price_old) * 100)}%
                        </span>
                      )}
                      {!product.in_stock && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                          <span className="text-sm font-medium text-neutral-500">Нет в наличии</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs text-neutral-400 uppercase tracking-wide mb-1">{product.brand}</p>
                      <h3 className="font-bold text-neutral-900 leading-tight mb-2">{product.name}</h3>
                      <p className="text-xs text-neutral-500 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.specs.dpi && <span className="text-xs bg-neutral-100 px-2 py-1 rounded-full text-neutral-600">{product.specs.dpi} DPI</span>}
                        {product.specs.weight && <span className="text-xs bg-neutral-100 px-2 py-1 rounded-full text-neutral-600">{product.specs.weight}</span>}
                        {product.specs.connection && <span className="text-xs bg-neutral-100 px-2 py-1 rounded-full text-neutral-600">{product.specs.connection}</span>}
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold">{product.price.toLocaleString("ru")} ₽</span>
                          {product.price_old && (
                            <span className="text-sm text-neutral-400 line-through ml-2">{product.price_old.toLocaleString("ru")} ₽</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.in_stock}
                          className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <Icon name="ShoppingCart" size={14} />
                          В корзину
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
