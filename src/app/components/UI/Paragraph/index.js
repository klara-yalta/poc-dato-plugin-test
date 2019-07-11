import React from 'react';
import { number } from 'prop-types';

import { StyledParagraph } from './style';

const Paragraph = props => <StyledParagraph {...props} />;

StyledParagraph.propTypes = {
  margin: number
};

StyledParagraph.defaultProps = {
  margin: 0.6
};

export default Paragraph;
