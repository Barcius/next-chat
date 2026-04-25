'use client';
import React, { useEffect, useCallback, useState } from 'react';
import useStore from '../shared/model/store/store';
import MessagePane from '../widgets/messagePane';
import ContextMenu from '../widgets/contextMenu/contextMenu';
import ButtonedInput from '../shared/ui/ButtonedInput/ButtonedInput';
import { useShallow } from 'zustand/shallow';
import { sendMessage } from '../entities/message/api/messageApi';

const ChatPage: React.FC = () => {
  const { messages, addMessage, setContextMenu } = useStore(
    useShallow((store) => ({
      messages: store.messages,
      addMessage: store.addMessage,
      setContextMenu: store.setContextMenu,
    })),
  );
  const [isSending, setIsSending] = useState(false);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      const t = e.target as Element;
      if (!t.closest('.message-pane') && !t.closest('.context-menu')) {
        setContextMenu(null);
      }
    },
    [setContextMenu],
  );

  const handleSendMessage = async (val: string) => {
    if (isSending) return;
    setIsSending(true);
    const res = await sendMessage(val);
    if (res) addMessage(res);
    setIsSending(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <>
      <div className="flex-1 h-0 overflow-y-auto mb-2">
        {messages.map((message) => (
          <MessagePane message={message} key={message.id} />
        ))}
      </div>
      <ButtonedInput buttonText="Send" onButtonClick={handleSendMessage} disabled={isSending} />
      <ContextMenu />
    </>
  );
};

export default ChatPage;
