import React, { useState, useEffect } from 'react';


export default function App() {
  // Usando o hook useState ele define um valor inicial
  // Para as variaveis abaixo, do operador destructuring
  // No caso repositories vai iniciar como uma lista vazia
  const [repositories, setRepositories ] = useState([]);

  // Vai executar um efeito quando a variavel passada como segundo parametro mudar
  // exemplo useEffect(() => { função }, variavel a mudar)
  // caso essa variavel mude, o efeito sera aplicado
  useEffect(async () => {
    // Chamada API
    const response = await fetch('https://api.github.com/users/Paulo-Tonelotti/repos')
    // Transformar a resposta da API em json
    const data = await response.json();

    // Vai sobrescrever o estado inicial de repositorios com a resposta da API
    setRepositories(data);

  }, []);

  // Vai executar um efeito quando a variavel passada como segundo parametro mudar
  // exemplo useEffect(() => { função }, variavel a mudar)
  // caso essa variavel mude, o efeito sera aplicad
  useEffect(() => {
    const  filtered = repositories.filter(repo => repo.favorite);
    // Alterando o titulo da pagina
    document.title = `Você tem (${filtered.length}) favoritos`
  }, [repositories])
  // Esta ouvindo, listening a alteraçao do repositories

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      // Usando o ! na frente de repo.favorite, é um sinal de negacao
      // Se o favorito estiver marcado vai para desmarcado e assim vice versa
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    });

    setRepositories(newRepositories);
  }

  return(
    <ul>
      {repositories.map(repo => 
      <li key={repo.id}>
        {repo.name} 
        {repo.favorite && <span> (Favorito) </span>}
        <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
        </li>)}
    </ul>
  );
}
