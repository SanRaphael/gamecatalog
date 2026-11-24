import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addFavorite, loadGames } from '../features/games/gamesSlice';

const Form = styled.form`
  display: grid;
  gap: 12px;
  max-width: 420px;
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: grid;
  gap: 4px;
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #2a2e4a;
  border-radius: 8px;
  background: #1b1e33;
  color: #e8e8f0;
`;

const Button = styled.button`
  padding: 12px;
  background: #7c5cff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #6a4ce0;
  }
`;

const Error = styled.span`
  color: #ff6b6b;
  font-size: 13px;
  font-weight: 400;
`;

const Success = styled.span`
  color: #4ade80;
  font-size: 13px;
  font-weight: 400;
`;

export default function FavoriteForm() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.games);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (list.length === 0) {
      dispatch(loadGames());
    }
  }, [dispatch, list.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (title.trim().length < 2) {
      setError('Введите название игры (минимум 2 символа)');
      return;
    }

    const query = title.trim().toLowerCase();
    const found = list.find((g) => g.title.toLowerCase().includes(query));

    if (!found) {
      setError(`Игра «${title.trim()}» не найдена в каталоге`);
      return;
    }

    dispatch(addFavorite(found));
    setSuccess(`«${found.title}» добавлена в избранное`);
    setTitle('');
  };

  return (
    <Form onSubmit={handleSubmit} aria-label="Форма добавления игры в избранное">
      <Label>
        Название игры
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Например: World of Tanks"
          required
          minLength={2}
        />
      </Label>
      {error && <Error role="alert">{error}</Error>}
      {success && <Success role="status">{success}</Success>}
      <Button type="submit">Добавить в избранное</Button>
    </Form>
  );
}