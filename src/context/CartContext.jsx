import { createContext, useContext, useState } from "react";

// 1. Criação do contexto
const CartContext = createContext();

// 2. Provider - quem "fornece" o carrinho pra toda a aplicação
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Adiciona um produto ao carrinho (ou aumenta quantidade se já existir)
  function addToCart(produto) {
    setCart((prevCart) => {
      const itemExistente = prevCart.find((item) => item.id === produto.id);

      if (itemExistente) {
        // Já está no carrinho: verifica se pode aumentar
        if (itemExistente.quantidade >= produto.estoque) {
          return prevCart; // já no limite, não faz nada
        }
        return prevCart.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      // Não está no carrinho ainda: adiciona com quantidade 1
      return [...prevCart, { ...produto, quantidade: 1 }];
    });
  }

  // Aumenta quantidade de um item (respeitando o estoque)
  function increaseQuantity(id) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantidade < item.estoque
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  }

  // Diminui quantidade (mínimo 1)
  function decreaseQuantity(id) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  }

  // Remove item do carrinho
  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  // Verifica se um produto já atingiu o limite de estoque no carrinho
  function isAtMaxStock(produto) {
    const item = cart.find((i) => i.id === produto.id);
    if (!item) return false;
    return item.quantidade >= produto.estoque;
  }

  // Total geral da compra
  const total = cart.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        isAtMaxStock,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 3. Hook customizado pra facilitar o uso do contexto nos componentes
export function useCart() {
  return useContext(CartContext);
}