'use client'
import React, { useState } from 'react';
import useStore from '../store/store';

const Chat: React.FC = () => {
  const messages = useStore((state) => state.messages);
  const addMessage = useStore((state) => state.addMessage);
  const editMessage = useStore((state) => state.editMessage);
  const deleteMessage = useStore((state) => state.deleteMessage);

  const [newMessage, setNewMessage] = useState('');
  const [editMessageId, setEditMessageId] = useState('');
  const [editMessageText, setEditMessageText] = useState('');

  const handleAddMessage = () => {
    if (newMessage.trim()) {
      addMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleEditMessage = (id: string) => {
    const message = messages.find((msg) => msg.id === id);
    if (message) {
      setEditMessageId(id);
      setEditMessageText(message.text);
    }
  };

  const handleSaveEdit = () => {
    if (editMessageId && editMessageText.trim()) {
      editMessage(editMessageId, editMessageText);
      setEditMessageId('');
      setEditMessageText('');
    }
  };

  const handleDeleteMessage = (id: string) => {
    deleteMessage(id);
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Type a message'
        />
        <button onClick={handleAddMessage}>Send</button>
      </div>
      {editMessageId && (
        <div>
          <input
            type='text'
            value={editMessageText}
            onChange={(e) => setEditMessageText(e.target.value)}
            placeholder='Edit message'
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditMessageId('')}>Cancel</button>
        </div>
      )}
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.text}
            <button onClick={() => handleEditMessage(message.id)}>Edit</button>
            <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
