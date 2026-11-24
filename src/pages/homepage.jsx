import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadGames, setCategory } from '../features/games/gamesSlice';
import GameCard from '../components/GameCard';

const Filters = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 24px 24px 0;
`;

const FilterBtn = styled.button`
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid #2a2e4a;
  background: ${(p) => (p.$active ? '#7c5cff' : '#1b1e33')};
  color: ${(p) => (p.$active ? '#fff' : '#b8b8cc')};
  cursor: pointer;
  font-size: 14px;
  &:hover {
    border-color: #7c5cff;
  }
`;

const Grid = styled.section`
  display: grid;
  gap: 16px;
  padding: 24px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`;

const Center = styled.p`
  text-align: center;
  padding: 48px;
  color: #9a9ab8;
`;

const CATEGORIES = [
  { value: '', label: 'Все' },
  { value: 'shooter', label: 'Шутер' },
  { value: 'mmorpg', label: 'MMORPG' },
  { value: 'strategy', label: 'Стратегия' },
  { value: 'racing', label: 'Гонки' },
  { value: 'sports', label: 'Спорт' },
  { value: 'fighting', label: 'Файтинг' },
  { value: 'action', label: 'Экшен' },
  { value: 'survival', label: 'Выживание' },
  { value: 'moba', label: 'MOBA' },
  { value: 'rpg', label: 'RPG' },
];

export default function HomePage() {
  const dispatch = useDispatch();
  const { list, status, error, activeCategory } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(loadGames(activeCategory));
  }, [dispatch, activeCategory]);

  const onSelect = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <>
      <Filters aria-label="Фильтр по жанрам">
        {CATEGORIES.map((c) => (
          <FilterBtn
            key={c.value}
            $active={activeCategory === c.value}
            onClick={() => onSelect(c.value)}
          >
            {c.label}
          </FilterBtn>
        ))}
      </Filters>

      {status === 'loading' && <Center>Загрузка игр…</Center>}
      {status === 'failed' && (
        <Center role="alert">
          Не удалось загрузить: {error}. <br />
          <button onClick={() => dispatch(loadGames(activeCategory))}>Повторить</button>
        </Center>
      )}
      {status === 'succeeded' && (
        <Grid aria-label="Список игр">
          {list.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </Grid>
      )}
    </>
  );
}