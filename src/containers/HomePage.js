import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';
import { bindActionCreators } from 'redux';
import { addName } from './../ActionCreator';

class HomePage extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {!this.props.hasNameProvided ? (
          <Form onUserName={this.props.addName} formName="User Name" />
        ) : (
          <div>
            <p className="user-greeting">{`Welcome ${this.props.name}!`} </p>
            <Form onUserName={this.props.addName} formName="File Name" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasNameProvided: state.hasNameProvided,
  name: state.name
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addName }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
