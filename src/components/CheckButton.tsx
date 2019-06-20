import styled from 'styled-components';

interface Props {
  isChecked: boolean;
}

export default styled.button<Props>`
  outline: none;
  border: none;
  background-color: white;
  font-size: 1.2em;
  ${props =>
    props.isChecked
      ? `
    color: green;
  `
      : `
    color: gainsboro;
  `}
  &::before {
    content: '✔';
  }
`;
