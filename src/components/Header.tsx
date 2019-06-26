import * as React from 'react';
import styled from 'styled-components';
import * as COLORS from './colors';
import ContentContainer from './elements/ContentsContainer';
import { Link } from 'react-router-dom';

export default function() {
  return (
    <Bar>
      <ContentContainer>
        <Logo to="/">カウモノ</Logo>
      </ContentContainer>
    </Bar>
  );
}

const Bar = styled.header`
  left: 0;
  right: 0;
  background-color: ${COLORS.THEME.MAIN_LIGHT};
`;

const Logo = styled(Link)`
  display: table-cell;
  height: 40px;
  padding: 0 15px;
  vertical-align: middle;
  text-decoration: none;
  color: ${COLORS.THEME.CLEAR};
  font-weight: bold;
  font-family: 'arial black';
  background-color: ${COLORS.THEME.MAIN};
`;
