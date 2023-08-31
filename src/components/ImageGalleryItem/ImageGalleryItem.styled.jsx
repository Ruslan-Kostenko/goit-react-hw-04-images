import styled from 'styled-components';

export const GalleryListImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;

  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;
