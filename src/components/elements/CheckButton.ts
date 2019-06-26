import styled from 'styled-components';
import * as COLORS from '../colors';

interface Props {
  isChecked: boolean;
}

export default styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  outline: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: ${COLORS.THEME.CLEAR};
  user-select: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  ${props =>
    props.isChecked
      ? `
    background-color: ${COLORS.THEME.MAIN};
  `
      : `
    background-color: ${COLORS.THEME.DISABLED};
  `}
  }
`;
