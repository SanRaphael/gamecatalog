import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.article`
  background: #1b1e33;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(124, 92, 255, 0.25);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const Thumb = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
`;

const Body = styled.div`
  padding: 12px 14px;
`;

const Title = styled.h3`
  font-size: 15px;
  margin: 0 0 6px;
`;

const Meta = styled.p`
  font-size: 13px;
  color: #9a9ab8;
  margin: 0;
`;

export default function GameCard({ game }) {
  return (
    <Card>
      <StyledLink to={`/game/${game.id}`}>
        <Thumb src={game.thumbnail} alt={game.title} loading="lazy" />
        <Body>
          <Title>{game.title}</Title>
          <Meta>
            {game.genre} · {game.platform}
          </Meta>
        </Body>
      </StyledLink>
    </Card>
  );
}