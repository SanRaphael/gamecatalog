import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { removeFavorite } from '../features/games/gamesSlice';
import FavoriteForm from '../components/favoriteform';

const Wrapper = styled.section`
  max-width: 800px;
  margin: 24px auto;
  padding: 0 24px;
`;

const Grid = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`;

const Card = styled.li`
  background: #1b1e33;
  border-radius: 12px;
  overflow: hidden;
`;

const Thumb = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
`;

const Body = styled.div`
  padding: 10px 12px;
`;

const TitleLink = styled(Link)`
  color: #e8e8f0;
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
`;

const RemoveBtn = styled.button`
  margin-top: 8px;
  padding: 6px 10px;
  background: transparent;
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  &:hover { background: #ff6b6b; color: #fff; }
`;

const ToggleBtn = styled.button`
  margin-top: 24px;
  padding: 10px 16px;
  background: #1b1e33;
  border: 1px solid #2a2e4a;
  color: #b8b8cc;
  border-radius: 8px;
  cursor: pointer;
  &:hover { border-color: #7c5cff; color: #fff; }
`;

export default function FavoritesPage() {
  const favorites = useSelector((state) => state.games.favorites);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  return (
    <Wrapper>
      <h1>Избранное</h1>

      {favorites.length === 0 ? (
        <p>Пока ничего не сохранено. Открой игру и нажми «В избранное».</p>
      ) : (
        <Grid>
          {favorites.map((game) => (
            <Card key={game.id}>
              <Link to={`/game/${game.id}`}>
                <Thumb src={game.thumbnail} alt={game.title} loading="lazy" />
              </Link>
              <Body>
                <TitleLink to={`/game/${game.id}`}>{game.title}</TitleLink>
                <div>
                  <RemoveBtn onClick={() => dispatch(removeFavorite(game.id))}>
                    Убрать
                  </RemoveBtn>
                </div>
              </Body>
            </Card>
          ))}
        </Grid>
      )}

      <ToggleBtn onClick={() => setShowForm(!showForm)}>
        {showForm ? '− Скрыть форму' : '+ Добавить свою игру'}
      </ToggleBtn>

      {showForm && (
        <div style={{ marginTop: 16 }}>
          <FavoriteForm />
        </div>
      )}
    </Wrapper>
  );
}