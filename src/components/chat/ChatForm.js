import React from 'react';
import TextInput from '../common/TextInput';

const ChatForm = ({message, onSend, onChange, sending}) => {
  return (
    <form>
      <h1>Chat</h1>

      <TextInput
        name="message"
        label="Message"
        onChange={onChange}
        value={message}
      />

      <input
        type="submit"
        disabled={sending}
        value="Send message"
        className="btn btn-primary"
        onClick={onSend}/>
    </form>
  );
};

ChatForm.propTypes = {
  onSend: React.PropTypes.func.isRequired,
  sending: React.PropTypes.bool,
  message: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default ChatForm;
