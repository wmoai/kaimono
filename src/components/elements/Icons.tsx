import * as React from 'react';
import styled from 'styled-components';

interface Props {
  size?: string;
}

export const Icon = styled.i.attrs(() => ({
  className: 'material-icons'
}))<Props>`
  font-weight: bold;
  font-size: ${props => props.size || '24px'};
`;

export const Check = (props: Props) => {
  return <Icon {...props}>check</Icon>;
};

export const Remove = (props: Props) => {
  return <Icon {...props}>close</Icon>;
};

export const Add = (props: Props) => {
  return <Icon {...props}>add</Icon>;
};

export const TrashCan = (props: Props) => {
  return <Icon {...props}>delete</Icon>;
};
