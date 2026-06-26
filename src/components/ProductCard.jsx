import { Link } from "react-router-dom";

export default function ProductCard({ produto }) {
  const esgotado = produto.estoque === 0;

  return (
    <div className="border rounded-lg shadow-sm p-4 flex flex-col bg-white hover:shadow-md transition">
      <img
        src={produto.imagem}
        alt={produto.nome}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <h2 className="text-lg font-semibold text-gray-800">{produto.nome}</h2>
      <p className="text-blue-600 font-bold text-xl mt-1">
        R$ {produto.preco.toFixed(2)}
      </p>

      {esgotado ? (
        <span className="mt-3 text-red-600 font-semibold text-sm">
          Esgotado
        </span>
      ) : (
        <span className="mt-3 text-green-600 text-sm">
          {produto.estoque} em estoque
        </span>
      )}

      <Link
        to={`/produto/${produto.id}`}
        className="mt-auto bg-blue-600 text-white text-center py-2 rounded-md mt-4 hover:bg-blue-700 transition"
      >
        Ver Detalhes
      </Link>
    </div>
  );
}