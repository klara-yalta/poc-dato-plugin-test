import React, { Component } from 'react';
import PropTypes from 'prop-types';

import connectToDatoCms from './connectToDatoCms';
import './style.sass';

import Flex from './app/components/Layout/Flex';
import Paragraph from './app/components/UI/Paragraph';
import Slider from './app/components/UI/Slider';

@connectToDatoCms(plugin => ({
  developmentMode: plugin.parameters.global.developmentMode,
  fieldPath: plugin.fieldPath,
  fieldValue: plugin.getFieldValue(plugin.fieldPath)
}))
export default class Main extends Component {
  static propTypes = {
    fieldPath: PropTypes.string,
    fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
    plugin: PropTypes.object
  };

  onChange(value) {
    this.props.plugin.setFieldValue(this.props.fieldPath, parseInt(value));
  }

  render() {
    const { fieldValue } = this.props;
    const range = this.props.plugin.field.attributes.validators.number_range;
    const min = range ? parseInt(range.min) : null;
    const max = range ? parseInt(range.max) : null;

    return (
      <div className="container">
        <Slider
          onChange={e => this.onChange(e.target.value)}
          value={fieldValue}
          min={min}
          max={max}
          step={1}
        />
        <Flex main="space-between" cross="center">
          <Paragraph>{min}</Paragraph>
          <Paragraph>{fieldValue}</Paragraph>
          <Paragraph>{max}</Paragraph>
        </Flex>
      </div>
    );
  }
}
