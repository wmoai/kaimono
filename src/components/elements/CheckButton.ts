import styled from 'styled-components';

interface Props {
  isChecked: boolean;
}

export default styled.button<Props>`
  width: 36px;
  height: 36px;
  outline: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  ${props =>
    props.isChecked
      ? `
    background-color: mediumseagreen;
  `
      : `
    background-color: gainsboro;
  `}
  }
`;
