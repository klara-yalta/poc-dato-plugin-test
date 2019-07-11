import React from 'react';
import { number, func } from 'prop-types';

import { StyledSelectorSlider, RangeInput } from './style';

const Slider = ({ ...props }) => {
  return (
    <StyledSelectorSlider>
      <RangeInput type="range" {...props} />
    </StyledSelectorSlider>
  );
};

Slider.propTypes = {
  onChange: func.isRequired,
  min: number,
  max: number,
  value: number
};

Slider.defaultProps = {
  step: 1
};

export default Slider;
