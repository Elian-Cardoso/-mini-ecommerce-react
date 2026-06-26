import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cart } = useCart();
  const totalItens = cart.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <header className="bg-gray-900 text-white px-4 py-3 sticky top-0 z-10 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-bold hover:text-gray-300">
          🛒 Mini E-commerce
        </Link>

        <nav className="flex gap-4 items-center">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/cadastro" className="hover:text-gray-300">
            Cadastrar
          </Link>
          <Link to="/carrinho" className="relative hover:text-gray-300">
            Carrinho
            {totalItens > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItens}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}