import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { criarProduto } from "../services/api";

export default function ProductForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    imagem: "",
    estoque: "",
  });

  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);

  // Refs para cada campo, usados para focar no primeiro inválido
  const nomeRef = useRef(null);
  const descricaoRef = useRef(null);
  const precoRef = useRef(null);
  const imagemRef = useRef(null);
  const estoqueRef = useRef(null);

  const refs = {
    nome: nomeRef,
    descricao: descricaoRef,
    preco: precoRef,
    imagem: imagemRef,
    estoque: estoqueRef,
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validar() {
    const novosErros = {};

    if (!form.nome.trim()) novosErros.nome = "O nome é obrigatório.";
    if (!form.descricao.trim())
      novosErros.descricao = "A descrição é obrigatória.";
    if (!form.imagem.trim())
      novosErros.imagem = "A URL da imagem é obrigatória.";

    if (form.preco === "" || isNaN(form.preco)) {
      novosErros.preco = "Informe um preço válido.";
    } else if (Number(form.preco) < 0) {
      novosErros.preco = "O preço não pode ser negativo.";
    }

    if (form.estoque === "" || isNaN(form.estoque)) {
      novosErros.estoque = "Informe um estoque válido.";
    } else if (Number(form.estoque) < 0) {
      novosErros.estoque = "O estoque não pode ser negativo.";
    }

    return novosErros;
  }

  // Ordem dos campos, usada para saber qual focar primeiro
  const ordemCampos = ["nome", "descricao", "preco", "imagem", "estoque"];

  async function handleSubmit(e) {
    e.preventDefault();

    const novosErros = validar();
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      // Encontra o primeiro campo com erro, respeitando a ordem do formulário
      const primeiroCampoComErro = ordemCampos.find((campo) => novosErros[campo]);
      if (primeiroCampoComErro && refs[primeiroCampoComErro].current) {
        refs[primeiroCampoComErro].current.focus();
      }
      return;
    }

    setEnviando(true);
    try {
      await criarProduto({
        nome: form.nome,
        descricao: form.descricao,
        preco: Number(form.preco),
        imagem: form.imagem,
        estoque: Number(form.estoque),
      });
      navigate("/");
    } catch (error) {
      alert("Erro ao cadastrar produto. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Cadastrar Produto
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            ref={nomeRef}
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 ${
              erros.nome
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
          />
          {erros.nome && (
            <p className="text-red-600 text-sm mt-1">{erros.nome}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            ref={descricaoRef}
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            rows={3}
            className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 ${
              erros.descricao
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
          />
          {erros.descricao && (
            <p className="text-red-600 text-sm mt-1">{erros.descricao}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preço
          </label>
          <input
            ref={precoRef}
            type="number"
            step="0.01"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 ${
              erros.preco
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
          />
          {erros.preco && (
            <p className="text-red-600 text-sm mt-1">{erros.preco}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL da Imagem
          </label>
          <input
            ref={imagemRef}
            type="text"
            name="imagem"
            value={form.imagem}
            onChange={handleChange}
            placeholder="https://..."
            className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 ${
              erros.imagem
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
          />
          {erros.imagem && (
            <p className="text-red-600 text-sm mt-1">{erros.imagem}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estoque
          </label>
          <input
            ref={estoqueRef}
            type="number"
            name="estoque"
            value={form.estoque}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 outline-none focus:ring-2 ${
              erros.estoque
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
          />
          {erros.estoque && (
            <p className="text-red-600 text-sm mt-1">{erros.estoque}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition disabled:opacity-50 mt-2"
        >
          {enviando ? "Cadastrando..." : "Cadastrar Produto"}
        </button>
      </form>
    </div>
  );
}