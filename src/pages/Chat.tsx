'use client'
import React, { useRef, useState } from 'react';
import useStore, { initContextMenuData } from '../store/store';
import MessagePane from '../widgets/messagePane';
import ContextMenu from '../widgets/contextMenu/contextMenu';

const Chat: React.FC = () => {
  const messages = useStore((state) => state.messages);
  const addMessage = useStore((state) => state.addMessage);
  const setContextMenu = useStore((state) => state.setContextMenu);
  
  const newMessageInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e: MouseEvent) => {
    const t = e.target as HTMLInputElement
    if (!t.closest('.message-pane') && !t.closest('.context-menu')) {
      setContextMenu(null);
    }
  };

  const handleAddMessage = () => {
    if (newMessageInputRef?.current) {
      const val = newMessageInputRef.current.value.trim();
      if (val) {
        addMessage(val);
        newMessageInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <div className='flex-1 h-0'>
          {messages.map((message) => (
          <MessagePane
            message={message}
            key={message.id}
          />
          ))}
      </div>
      <div className='flex'>
        <input
          className='flex-1 mr-2 p-2'
          type='text'
          ref={newMessageInputRef}
          placeholder='Type a message'
        />
        <button onClick={handleAddMessage}>Send</button>
      </div>
      <ContextMenu />
    </>
  );
};

export default Chat;

