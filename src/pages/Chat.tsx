'use client'
import React, { useRef, useState } from 'react';
import useStore from '../shared/model/store/store';
import MessagePane from '../widgets/messagePane';
import ContextMenu from '../widgets/contextMenu/contextMenu';
import ButtonedInput from '../shared/ui/ButtonedInput/ButtonedInput';

const Chat: React.FC = () => {
  const messages = useStore((state) => state.messages);
  const addMessage = useStore((state) => state.addMessage);
  const setContextMenu = useStore((state) => state.setContextMenu);
  
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
      <ButtonedInput
        buttonText='Send'
        onButtonClick={addMessage}
      />
      <ContextMenu />
    </>
  );
};

export default Chat;

