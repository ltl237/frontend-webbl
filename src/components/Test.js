import React, { Component } from 'react';
import TestModal from './TestModal'

class Test extends Component {

  render() {
    return (
      <div>
      <div data-toggle="modal" data-target="#exampleModalCenter" >click me</div>


        <TestModal/>



      </div>
    );
  }

}

export default Test;
