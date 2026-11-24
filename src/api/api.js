const BASE = 'https://www.freetogame.com/api';

export async function fetchGames(category = '') {
  const url = category
    ? `${BASE}/games?category=${encodeURIComponent(category)}`
    : `${BASE}/games`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to load games');
  return await res.json();
}

export async function fetchGameById(id) {
  const res = await fetch(`${BASE}/game?id=${id}`);
  if (!res.ok) throw new Error('Failed to load game');
  return await res.json();
}