import { useState, useEffect } from "react";
import { getProdutos } from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const dados = await getProdutos();
        setProdutos(dados);
      } catch (error) {
        setErro("Não foi possível carregar os produtos. Verifique se o JSON Server está rodando.");
      } finally {
        setLoading(false);
      }
    }

    carregarProdutos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Nossos Produtos</h1>

      {loading && <p className="text-gray-500">Carregando produtos...</p>}
      {erro && <p className="text-red-600">{erro}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
}