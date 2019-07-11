import styled from '@emotion/styled';
import Colors from '../../../constants/Colors';

export const StyledSlider = styled.div`
  display: flex;
  justify-content: center;
`;
export const StyledSelectorSlider = styled.div`
  align-items: center;
  color: ${({ color }) => color || 'black'};
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 20px;
  padding: 20px 0;
  width: 100%;
  &:not(:last-child) {
    margin-right: 0px;
  }
`;

export const RangeInput = styled.input`
  -webkit-appearance: none;
  height: 25px;
  width: 100%;
  margin: 20px 0;
  background-color: transparent;
  :focus {
    outline: none;
  }
  ::-webkit-slider-runnable-track {
    background-color: ${Colors['54575a'] + '70'};
    height: 2px;
  }
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: ${Colors['70c8dc']};
    border-radius: 25px;
    height: 25px;
    margin-top: -11px;
    width: 25px;
  }
`;
