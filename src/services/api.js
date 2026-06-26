const BASE_URL = "http://localhost:3000";

// Buscar todos os produtos
export async function getProdutos() {
  const response = await fetch(`${BASE_URL}/produtos`);
  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  return response.json();
}

// Buscar um produto específico pelo ID
export async function getProdutoPorId(id) {
  const response = await fetch(`${BASE_URL}/produtos/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar produto");
  }
  return response.json();
}

// Criar um novo produto
export async function criarProduto(produto) {
  const response = await fetch(`${BASE_URL}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar produto");
  }
  return response.json();
}

// Atualizar um produto existente (usado na edição — bônus se você quiser ir além do obrigatório)
export async function atualizarProduto(id, produto) {
  const response = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!response.ok) {
    throw new Error("Erro ao atualizar produto");
  }
  return response.json();
}

// Deletar um produto
export async function deletarProduto(id) {
  const response = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Erro ao deletar produto");
  }
}