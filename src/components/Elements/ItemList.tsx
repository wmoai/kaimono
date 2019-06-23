import styled from 'styled-components';

interface Props {
  isPurchased?: boolean;
}

export default styled.ul<Props>`
  list-style: none;
  margin: 0;
  padding: 0;
  ${props => props.isPurchased && `color: darkgray;`}
  & > li {
    &:nth-child(odd) {
      background-color: whitesmoke;
    }
  }
`;
