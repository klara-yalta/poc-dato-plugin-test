import styled from '@emotion/styled';

export const StyledFlex = styled.div`
  display: flex;
  justify-content: ${({ main }) => main};
  align-items: ${({ cross }) => cross};
  flex-wrap: ${({ wrap }) => wrap};
  flex-direction: ${({ direction }) => direction};
  width: 100%;
`;
