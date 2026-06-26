import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProdutoPorId, deletarProduto } from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isAtMaxStock, cart } = useCart();

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarProduto() {
      try {
        const dados = await getProdutoPorId(id);
        setProduto(dados);
      } catch (error) {
        setErro("Produto não encontrado.");
      } finally {
        setLoading(false);
      }
    }

    carregarProduto();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-gray-500">Carregando produto...</p>;
  }

  if (erro || !produto) {
    return (
      <div className="p-6">
        <p className="text-red-600 mb-4">{erro}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  const esgotado = produto.estoque === 0;
  const atingiuMaximo = isAtMaxStock(produto);
  const itemNoCarrinho = cart.find((item) => item.id === produto.id);

  function handleAddToCart() {
    addToCart(produto);
  }

  async function handleDelete() {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (!confirmar) return;

    try {
      await deletarProduto(produto.id);
      navigate("/");
    } catch (error) {
      alert("Erro ao excluir produto.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="text-blue-600 mb-4 inline-block hover:underline"
      >
        ← Voltar para a Home
      </button>

      <div className="bg-white border rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full md:w-1/2 h-64 object-cover rounded-md"
        />

        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">{produto.nome}</h1>
          <p className="text-gray-600 mt-2">{produto.descricao}</p>
          <p className="text-blue-600 font-bold text-2xl mt-4">
            R$ {produto.preco.toFixed(2)}
          </p>

          <p className="text-sm mt-2 text-gray-500">
            Estoque disponível: {produto.estoque}
          </p>

          {itemNoCarrinho && (
            <p className="text-sm mt-1 text-gray-500">
              Já no carrinho: {itemNoCarrinho.quantidade}
            </p>
          )}

          {esgotado && (
            <p className="text-red-600 font-semibold mt-3">
              Produto esgotado
            </p>
          )}

          {!esgotado && atingiuMaximo && (
            <p className="text-orange-600 font-semibold mt-3">
              Estoque máximo atingido
            </p>
          )}

          <button
            onClick={handleAddToCart}
            disabled={esgotado || atingiuMaximo}
            className={`mt-6 py-3 rounded-md font-medium transition ${
              esgotado || atingiuMaximo
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Adicionar ao Carrinho
          </button>

          <button
            onClick={handleDelete}
            className="mt-3 py-2 rounded-md font-medium border border-red-500 text-red-600 hover:bg-red-50 transition"
          >
            Excluir Produto
          </button>
        </div>
      </div>
    </div>
  );
}