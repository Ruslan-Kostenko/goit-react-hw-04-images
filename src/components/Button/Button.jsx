import { StyledLoadMore } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <div>
      <StyledLoadMore onClick={onClick}>Load more</StyledLoadMore>
    </div>
  );
};
