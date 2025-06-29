function criarCard(c) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-titulo', c.titulo.toLowerCase());
  card.setAttribute('data-categoria', c.categoria);
  card.innerHTML = `
    <img src="${c.img}" alt="${c.titulo}" loading="lazy">
    <h3>${c.titulo}</h3>
    <p>${c.sinopse}</p>
    <div class="buttons">
      <button onclick="curtir(this)">👍</button>
      <button onclick="descurtir(this)">👎</button>
    </div>
  `;
  const status = localStorage.getItem(c.titulo);
  if (status) updateButtons(card, status);
  if (status === 'like') adicionarFavorito(card.cloneNode(true), c.titulo);
  return card;
}

function carregarConteudos() {
  fetch('conteudos.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('carousel-container');
      container.innerHTML = '';
      data.forEach(c => container.appendChild(criarCard(c)));
    });
}

function curtir(btn) {
  const card = btn.closest('.card');
  const titulo = card.querySelector('h3').innerText;
  localStorage.setItem(titulo, 'like');
  updateButtons(card, 'like');
  adicionarFavorito(card.cloneNode(true), titulo);
}

function descurtir(btn) {
  const card = btn.closest('.card');
  const titulo = card.querySelector('h3').innerText;
  localStorage.setItem(titulo, 'dislike');
  updateButtons(card, 'dislike');
}

function updateButtons(card, action) {
  const btns = card.querySelectorAll('button');
  btns.forEach(btn => btn.classList.remove('active', 'like', 'dislike'));
  if (action === 'like') btns[0].classList.add('active', 'like');
  if (action === 'dislike') btns[1].classList.add('active', 'dislike');
}

function adicionarFavorito(card, titulo) {
  const container = document.getElementById('favoritosContainer');
  if (!document.getElementById('fav-' + titulo)) {
    card.id = 'fav-' + titulo;
    container.appendChild(card);
  }
}

function alternarTema() {
  document.body.classList.toggle('light');
}

function filtrarConteudo() {
  const busca = document.getElementById('searchInput').value.toLowerCase();
  const filtro = document.getElementById('categoryFilter').value;
  document.querySelectorAll('.carousel-container .card').forEach(card => {
    const titulo = card.getAttribute('data-titulo');
    const categoria = card.getAttribute('data-categoria');
    const mostra = titulo.includes(busca) && (filtro === '' || categoria === filtro);
    card.style.display = mostra ? 'block' : 'none';
  });
}

function scrollCarousel(id, direction) {
  const container = document.getElementById(id);
  container.scrollLeft += direction * 300;
}

function enviarMensagem() {
  alert('Mensagem enviada com sucesso!');
}

window.onload = carregarConteudos;
