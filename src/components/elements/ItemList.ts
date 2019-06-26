import styled from 'styled-components';
import * as COLORS from '../colors';

interface Props {
  isPurchased?: boolean;
}

export default styled.ul<Props>`
  list-style: none;
  margin: 0;
  padding: 0;
  & > li {
    height: 50px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    &:hover {
      background-color: ${COLORS.PALETTE.SMOKE};
    }
  }
  ${props =>
    props.isPurchased &&
    `
    color: gray;
    background-color: ${COLORS.PALETTE.SMOKE};
    & > li {
      &:hover {
        background-color: ${COLORS.PALETTE.SILVER};
      }
    }
  `}
`;
