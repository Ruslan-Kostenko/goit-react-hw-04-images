import { BiSearchAlt } from 'react-icons/bi';
import {
  StyledInput,
  StyledSearchBtn,
  StyledSearchForm,
  StyledSearchbar,
} from './Searchbar.styled';

export const Searchbar = ({ changeQuery }) => {
  return (
    <StyledSearchbar className="searchbar">
      <StyledSearchForm
        className="form"
        onSubmit={evt => {
          evt.preventDefault();
          changeQuery(evt.target.elements.query.value);
          evt.target.reset();
        }}
      >
        <StyledSearchBtn type="submit" className="button">
          <span>
            <BiSearchAlt size={20} />
          </span>
        </StyledSearchBtn>

        <StyledInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
      </StyledSearchForm>
    </StyledSearchbar>
  );
};
