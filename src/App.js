import React, { Component } from 'react';
import _ from 'lodash';
import Block from './Block';

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
        var numBlock = _.chunk(_.map(_.reverse(_.range(10)), (i) => {
            return <Block value={i} handleClick={this.numberClick} source={this.state}/>
        }),3);
        return (
            <div>
                <div style={{font:'24pt arial', textDecoration: 'underline'}}>Hello, Calculator.</div>
                <div style={{font:'bold 20pt arial', margin:'5px 5px 5px 5px', padding:'5px 5px 5px 5px', border:'2px #000 solid', width:'220px'}}>{this.state.preTotal + ' ' + this.state.symbal + ' ' + this.state.value + ' = '}
                    <span style={{color:'white', backgroundColor:'green',padding:'2px 2px 2px 2px'}}>{this.state.total}</span>
                </div>
                <div style={{width: '180px', float:'left'}}>
                {_.map(numBlock,(b1) => {
                    return ( 
                    <div style={{height:'60px'}}>
                    {_.map(b1,(b2) => {
                        return b2;
                    })}
                    </div>)
                })}
                </div>
                <div style={{width: '70px', height:'200px', float:'left'}}>
                    <Block value="-" handleClick={this.symbalClick} source={this.state}/>
                    <Block value="+" handleClick={this.symbalClick} source={this.state}/>
                </div>

            </div>
        )
    }
}


module.exports = App;