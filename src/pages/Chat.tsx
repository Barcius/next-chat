'use client'
import React, { useEffect, useCallback } from 'react';
import useStore from '../shared/model/store/store';
import MessagePane from '../widgets/messagePane';
import ContextMenu from '../widgets/contextMenu/contextMenu';
import ButtonedInput from '../shared/ui/ButtonedInput/ButtonedInput';

const ChatPage: React.FC = () => {
  const messages = useStore((state) => state.messages);
  const addMessage = useStore((state) => state.addMessage);
  const setContextMenu = useStore((state) => state.setContextMenu);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      const t = e.target as Element;
      if (!t.closest('.message-pane') && !t.closest('.context-menu')) {
        setContextMenu(null);
      }
    },
    []
  );
  
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

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

export default ChatPage;

