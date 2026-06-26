import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    isAtMaxStock,
    total,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Carrinho</h1>
        <p className="text-gray-500 mb-6">Seu carrinho está vazio.</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Carrinho</h1>

      <div className="flex flex-col gap-4">
        {cart.map((item) => {
          const atingiuMaximo = isAtMaxStock(item);

          return (
            <div
              key={item.id}
              className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shadow-sm"
            >
              <div className="flex-1">
                <h2 className="font-semibold text-gray-800">{item.nome}</h2>
                <p className="text-sm text-gray-500">
                  Preço unitário: R$ {item.preco.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Estoque máximo: {item.estoque}
                </p>
                {atingiuMaximo && (
                  <p className="text-orange-600 text-sm font-medium mt-1">
                    Estoque máximo atingido
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  disabled={item.quantidade <= 1}
                  className="w-8 h-8 rounded-md bg-gray-200 text-gray-700 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">
                  {item.quantidade}
                </span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  disabled={atingiuMaximo}
                  className="w-8 h-8 rounded-md bg-gray-200 text-gray-700 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <div className="text-right min-w-[100px]">
                <p className="font-bold text-gray-800">
                  R$ {(item.preco * item.quantidade).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-sm hover:underline mt-1"
                >
                  Remover
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between items-center border-t pt-4">
        <span className="text-lg font-semibold text-gray-800">
          Total geral:
        </span>
        <span className="text-2xl font-bold text-blue-600">
          R$ {total.toFixed(2)}
        </span>
      </div>

      <Link
        to="/"
        className="mt-6 inline-block text-blue-600 hover:underline"
      >
        ← Continuar comprando
      </Link>
    </div>
  );
}