import React from 'react';
import { node, oneOf } from 'prop-types';

import { StyledFlex } from './style';

const Flex = ({ children, main, cross, wrap, direction, ...props }) => (
  <StyledFlex main={main} cross={cross} wrap={wrap} direction={direction} {...props}>
    {children}
  </StyledFlex>
);

Flex.propTypes = {
  children: node,
  main: oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly'
  ]),
  cross: oneOf(['stretch', 'flex-start', 'flex-end ', 'center', 'baseline']),
  wrap: oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  direction: oneOf(['row', 'row-reverse', 'column', 'column-reverse'])
};

export default Flex;
