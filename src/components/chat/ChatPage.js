import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {sendMessage} from '../../actions/authActions';
import checkAuth from '../requireAuth';
import ChatForm from './ChatForm';
import toastr from 'toastr';

class ChatPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      messages: [],
      message: "",
      sending: false
    };
    this.updateMessageState = this.updateMessageState.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  updateMessageState(event) {
    return this.setState({message: event.target.value});
  }

  createMessage(event) {
    event.preventDefault();

    this.setState({sending: true, message:""});
    this.props.actions.sendMessage(this.state.message)
      .then(message => {
        toastr.success('Sent !');
        this.setState({sending: false});
      })
      .catch(error => {
        toastr.error(error.message);
        this.setState({sending: false});
      });
  }

  render() {
    return (
      <ChatForm
        onChange={this.updateMessageState}
        onSend={this.createMessage}
        sending={this.state.sending}
        message={this.state.message}
      />
    );
  }
}

ChatPage.propTypes = {
  actions: PropTypes.object.isRequired
};

ChatPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({sendMessage}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)( checkAuth(ChatPage));
