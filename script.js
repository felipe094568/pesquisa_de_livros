async function pesquisarLivro() {
  const termo = document.getElementById('psqlivro').value.trim();
  const resultados = document.getElementById('resultado');
  resultados.innerHTML = '';

  if (!termo) {
    resultados.textContent = 'Digite o nome do livro.';
    return;
  }

  const loader = document.createElement('p');
  loader.textContent = 'Buscando...';
  resultados.appendChild(loader);

  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(termo)}`);
    const dados = await res.json();

    resultados.innerHTML = '';
    if (!dados.docs || dados.docs.length === 0) {
      resultados.textContent = 'Nenhum livro encontrado.';
      return;
    }

    dados.docs.slice(0, 12).forEach(livro => {
      const item = document.createElement('div');
      item.className = 'livro';

      const titulo = document.createElement('strong');
      titulo.textContent = livro.title || 'Título desconhecido';
      item.appendChild(titulo);

      const autor = document.createElement('div');
      autor.textContent = 'Autor: ' + (livro.author_name ? livro.author_name[0] : 'Autor desconhecido');
      item.appendChild(autor);

      if (livro.cover_i) {
        const img = document.createElement('img');
        img.src = `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`;
        img.alt = livro.title || 'Capa do livro';
        img.style.maxWidth = '80px';
        item.appendChild(img);
      }

      resultados.appendChild(item);
    });
  } catch (erro) {
    resultados.textContent = 'Erro ao buscar livros. Verifique sua conexão.';
    console.error('Erro ao buscar livros:', erro);
  }
}