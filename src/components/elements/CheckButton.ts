import styled from 'styled-components';

interface Props {
  isChecked: boolean;
}

export default styled.button<Props>`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1.2em;
  ${props =>
    props.isChecked
      ? `
    color: green;
  `
      : `
    color: lightgray;
  `}
  &::before {
    content: '✔';
  }
`;