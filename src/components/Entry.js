import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {userLoginFetch} from '../redux/actions';

class Entry extends Component {




  render() {
    console.log(this.props);
    return (
      <Fragment>

      <div class="card">
        <div class="card-header">
          {this.props.title} - {this.props.created_at}
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
          </blockquote>
        </div>
      </div>




      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  allEntries: state.entriesReducer.allEntries
})

const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
