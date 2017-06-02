import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 0, symbal: '+', total:+0, preTotal: +0};
        this.numberClick = this.numberClick.bind(this);
        this.symbalClick = this.symbalClick.bind(this);
    }

    numberClick(v) {
        this.setState({
            value:v, 
            preTotal: this.state.total, 
            total: this.state.symbal == '+' ? parseInt(this.state.total) + parseInt(v) : parseInt(this.state.total) - parseInt(v)});
    }
    
    symbalClick(s) {
        this.setState({
            symbal:s, 
            preTotal: this.state.total,
            total: s == '+' ? parseInt(this.state.total) + parseInt(this.state.value) : parseInt(this.state.total) - parseInt(this.state.value)});
    }

    render() {
        return (
            <div>
                <div style={{font:'24pt arial', textDecoration: 'underline'}}>Hello, Calculator.</div>
                <div style={{height:'60px'}}>
                    <Block value="1" handleClick={this.numberClick} source={this.state}/>
                    <Block value="2" handleClick={this.numberClick} source={this.state}/>
                    <Block value="3" handleClick={this.numberClick} source={this.state}/>
                </div>
                <div style={{height:'60px'}}>
                    <Block value="+" handleClick={this.symbalClick} source={this.state}/>
                    <Block value="-" handleClick={this.symbalClick} source={this.state}/>
                </div>
                <div style={{font:'bold 20pt arial'}}>{this.state.preTotal + ' ' + this.state.symbal + ' ' + this.state.value + ' = '}
                    <span style={{color:'white', backgroundColor:'green',padding:'2px 2px 2px 2px'}}>{this.state.total}</span>
                </div>
            </div>
        )
    }
}

var blockStyle = {
  color: 'white',
  backgroundColor: 'blue',
  display: 'inline',
  float: 'left',
  width: '50px',
  height: '50px',
  font: 'bold 18pt arial',
  marginRight: '10px',
  lineHeight: '50px',
  textAlign: 'center',
  cursor: 'pointer'
};

class Block extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this.props);
        this.setState({value:this.props.value});
    }

    render() {
        return (
            <div className="number" style={blockStyle} onClick={(e) => this.props.handleClick(this.props.value,e)}>{this.props.value}</div>
        )
    }
}
module.exports = App;