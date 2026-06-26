import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-gray-600 mt-2 mb-6">
        Ops! A página que você procura não existe.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}