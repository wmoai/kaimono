import styled from 'styled-components';

interface Props {
  isPurchased?: boolean;
}

export default styled.ul<Props>`
  list-style: none;
  margin: 0;
  padding: 0;
  ${props => props.isPurchased && `color: gray;`}
  & > li {
    height: 50px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #fafafa;
    }
  }
`;
