import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadGameById, addFavorite, removeFavorite } from '../features/games/gamesSlice';

const Wrapper = styled.article`
  max-width: 800px;
  margin: 24px auto;
  padding: 0 24px;
`;

const Back = styled(Link)`
  display: inline-block;
  margin-bottom: 16px;
  color: #7c5cff;
  text-decoration: none;
`;

const Hero = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
`;

const Meta = styled.p`
  color: #9a9ab8;
`;

const Center = styled.p`
  text-align: center;
  padding: 48px;
`;

const FavButton = styled.button`
  margin: 16px 0;
  padding: 12px 20px;
  background: #7c5cff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #6a4ce0; }
  &:disabled { background: #3a3a55; cursor: default; }
`;

export default function DetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, status, error, favorites } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(loadGameById(id));
  }, [dispatch, id]);

  if (status === 'loading') return <Center>Загрузка…</Center>;
  if (status === 'failed') return <Center role="alert">Не удалось загрузить игру: {error}</Center>;
  if (!current) return <Center>Игра не найдена</Center>;

  const isFavorite = favorites.some((g) => String(g.id) === String(current.id));

  return (
    <Wrapper>
      <Back to="/">← Назад к играм</Back>
      <h1>{current.title}</h1>
      <Hero src={current.thumbnail} alt={current.title} />
      {isFavorite ? (
        <FavButton onClick={() => dispatch(removeFavorite(current.id))}>
          ★ Убрать из избранного
        </FavButton>
      ) : (
        <FavButton onClick={() => dispatch(addFavorite(current))}>
          ☆ В избранное
        </FavButton>
      )}
      <Meta>{current.genre} · {current.platform} · {current.publisher}</Meta>
      <p>{current.short_description}</p>
      <p>{current.description}</p>
    </Wrapper>
  );
}