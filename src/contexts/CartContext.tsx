import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

//config do carrinho

interface CartItem {
  id: string;
  nome: string;
  imagem_url: string;
  precoUnit: number;
  quantidade: number;
  tamanho: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (id: string, tamanho: string) => void;
  decreaseQuantity: (id: string, tamanho: string) => void;
  removeFromCart: (id: string, tamanho: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("@devwear:cart-1.0.0");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("@devwear:cart-1.0.0", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const found = prev.find(
        (p) => p.id === item.id && p.tamanho === item.tamanho
      );
      if (found) {
        return prev.map((p) =>
          p.id === item.id && p.tamanho === item.tamanho
            ? { ...p, quantidade: p.quantidade + item.quantidade }
            : p
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const increaseQuantity = (id: string, tamanho: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.tamanho === tamanho
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string, tamanho: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.tamanho === tamanho && item.quantidade > 1
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const removeFromCart = (id: string, tamanho: string) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id || item.tamanho !== tamanho)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve estar dentro do CartProvider");
  return context;
};
