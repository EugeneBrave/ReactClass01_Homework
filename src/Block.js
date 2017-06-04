import React, { Component } from 'react';
import _ from 'lodash';

const blockStyle = {
  color: 'white',
  backgroundColor: 'blue',
  display: 'inline',
  float: 'left',
  width: '50px',
  height: '50px',
  font: 'bold 18pt arial',
  margin: '5px 5px 5px 5px',
  lineHeight: '50px',
  textAlign: 'center',
  cursor: 'pointer'
};

const blockStyle2 = {
  color: 'white',
  backgroundColor: 'red',
  display: 'inline',
  float: 'left',
  width: '50px',
  height: '50px',
  font: 'bold 18pt arial',
  margin: '5px 5px 5px 5px',
  lineHeight: '50px',
  textAlign: 'center',
  cursor: 'pointer'
};

const blockStyle3 = {
  color: 'white',
  backgroundColor: 'blue',
  display: 'inline',
  float: 'left',
  width: '110px',
  height: '50px',
  font: 'bold 18pt arial',
  margin: '5px 5px 5px 5px',
  lineHeight: '50px',
  textAlign: 'center',
  cursor: 'pointer'
};

class Block extends Component {
    render() {
        var style = parseInt(this.props.value) ? blockStyle : this.props.value == 0 ? blockStyle3 : blockStyle2;
        return (
            <div className="number" style={style} onClick={(e) => this.props.handleClick(this.props.value,e)}>{this.props.value}</div>
        )
    }
}

module.exports = Block;