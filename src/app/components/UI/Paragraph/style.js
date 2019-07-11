import styled from '@emotion/styled';

export const StyledParagraph = styled.p`
  margin: ${({ margin }) => margin.toString()}em 0;
  font-size: 0.8em;
  line-height: 1.4;
  text-align: left;
  text-align-last: left;

  @media (min-width: 768px) {
    font-size: 1em;
  }

  @media (min-width: 1280px) {
    font-size: 1.2em;
  }
`;
