import { useEffect, useState } from "react";
import { fetchProducts, fetchCategories, type Product, type Category } from "@/lib/api";
import { useCart } from "@/lib/cart";
import Icon from "@/components/ui/icon";
import ProductModal from "@/components/ProductModal";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
    <>
    <section id="catalog" className="bg-background py-24 px-6 pt-36">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-xs tracking-widest text-neon-green mb-4 neon-text">Все модели</p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h2 className="font-display text-3xl md:text-5xl uppercase leading-tight">Каталог мышей</h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-muted border border-border rounded-lg px-4 py-2 text-sm outline-none focus:border-neon-green transition-colors w-48 text-foreground placeholder:text-muted-foreground"
            />
            <button type="submit" className="bg-neon-green text-black px-4 py-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
              <Icon name="Search" size={16} />
            </button>
          </form>
        </div>

        <div className="flex gap-8">
          {/* Фильтры — десктоп */}
          <aside className="hidden lg:flex flex-col gap-6 w-52 flex-shrink-0">
            <div>
              <p className="text-xs uppercase tracking-widest text-neon-green mb-3">Категория</p>
              <div className="flex flex-col gap-1">
                <button onClick={() => setSelectedCategory("")} className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${!selectedCategory ? "bg-neon-green text-black font-semibold" : "hover:bg-muted text-muted-foreground"}`}>Все</button>
                {categories.map((c) => (
                  <button key={c.slug} onClick={() => setSelectedCategory(c.slug)} className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${selectedCategory === c.slug ? "bg-neon-green text-black font-semibold" : "hover:bg-muted text-muted-foreground"}`}>{c.name}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neon-green mb-3">Бренд</p>
              <div className="flex flex-col gap-1">
                <button onClick={() => setSelectedBrand("")} className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${!selectedBrand ? "bg-neon-green text-black font-semibold" : "hover:bg-muted text-muted-foreground"}`}>Все</button>
                {BRANDS.map((b) => (
                  <button key={b} onClick={() => setSelectedBrand(b)} className={`text-left text-sm px-3 py-2 rounded-lg transition-colors cursor-pointer ${selectedBrand === b ? "bg-neon-green text-black font-semibold" : "hover:bg-muted text-muted-foreground"}`}>{b}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neon-green mb-3">До {priceMax.toLocaleString("ru")} ₽</p>
              <input type="range" min={1000} max={20000} step={500} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-neon-green" />
            </div>
          </aside>

          {/* Мобильный фильтр */}
          <div className="lg:hidden w-full mb-4">
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-lg cursor-pointer hover:border-neon-green transition-colors text-muted-foreground">
              <Icon name="SlidersHorizontal" size={16} />
              Фильтры
            </button>
            {filtersOpen && (
              <div className="mt-4 p-4 bg-card rounded-xl border border-border flex flex-wrap gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neon-green mb-2">Категория</p>
                  <div className="flex flex-wrap gap-1">
                    <button onClick={() => setSelectedCategory("")} className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${!selectedCategory ? "bg-neon-green text-black font-semibold" : "border border-border text-muted-foreground hover:border-neon-green"}`}>Все</button>
                    {categories.map((c) => (
                      <button key={c.slug} onClick={() => setSelectedCategory(c.slug)} className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${selectedCategory === c.slug ? "bg-neon-green text-black font-semibold" : "border border-border text-muted-foreground hover:border-neon-green"}`}>{c.name}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neon-green mb-2">Бренд</p>
                  <div className="flex flex-wrap gap-1">
                    <button onClick={() => setSelectedBrand("")} className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${!selectedBrand ? "bg-neon-green text-black font-semibold" : "border border-border text-muted-foreground hover:border-neon-green"}`}>Все</button>
                    {BRANDS.map((b) => (
                      <button key={b} onClick={() => setSelectedBrand(b)} className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${selectedBrand === b ? "bg-neon-green text-black font-semibold" : "border border-border text-muted-foreground hover:border-neon-green"}`}>{b}</button>
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
                  <div key={n} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-52 bg-muted" />
                    <div className="p-6">
                      <div className="h-4 bg-muted rounded mb-2 w-3/4" />
                      <div className="h-6 bg-muted rounded mb-4 w-1/2" />
                      <div className="h-10 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Icon name="PackageSearch" size={48} />
                <p className="mt-4">Товары не найдены. Попробуйте изменить фильтры.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="bg-card border border-border rounded-2xl overflow-hidden group flex flex-col cursor-pointer hover:border-neon-green/50 transition-all duration-300"
                  >
                    <div className="relative h-52 overflow-hidden bg-muted">
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {product.price_old && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          -{Math.round((1 - product.price / product.price_old) * 100)}%
                        </span>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-xs uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full">Подробнее</span>
                      </div>
                      {!product.in_stock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-sm font-medium text-muted-foreground">Нет в наличии</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs text-neon-green uppercase tracking-wide mb-1">{product.brand}</p>
                      <h3 className="font-display text-lg uppercase leading-tight mb-2">{product.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.specs.dpi && <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">{product.specs.dpi} DPI</span>}
                        {product.specs.weight && <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">{product.specs.weight}</span>}
                        {product.specs.connection && <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">{product.specs.connection}</span>}
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-neon-green">{product.price.toLocaleString("ru")} ₽</span>
                          {product.price_old && (
                            <span className="text-sm text-muted-foreground line-through ml-2">{product.price_old.toLocaleString("ru")} ₽</span>
                          )}
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                          disabled={!product.in_stock}
                          className="border border-neon-green text-neon-green px-4 py-2 rounded-lg text-sm font-medium hover:bg-neon-green hover:text-black transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
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
    {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
}