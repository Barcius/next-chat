'use client';
import React, { useEffect, useCallback, useState } from 'react';
import useStore from '../shared/model/store/store';
import MessagePane from '../widgets/messagePane/messagePane';
import ContextMenu from '../widgets/contextMenu/contextMenu';
import ButtonedInput from '../shared/ui/ButtonedInput/ButtonedInput';
import { useShallow } from 'zustand/shallow';
import { sendMessage } from '@/src/entities/message/api/messageApi';
import handleError, { getCustomFetchError, throwOnErrorResponse } from '../shared/lib/error/error';
import { setMessages } from '../shared/model/store/actions';
import { dateToFullString, dateToHHMM } from '../shared/ui/date';

const ChatPage: React.FC = () => {
  const {
    messages,
    storeMessage: addMessage,
    setContextMenu,
  } = useStore(
    useShallow((store) => ({
      messages: store.messages,
      storeMessage: store.addMessage,
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
    if (isSending) return false;
    setIsSending(true);
    let success = true;
    try {
      const res = await sendMessage(val);
      addMessage(res);
    } catch (e) {
      handleError(e);
      success = false;
    }
    setIsSending(false);
    return success;
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch('/api/messages', { signal: controller.signal });
        throwOnErrorResponse(res);
        setMessages(await res.json());
      } catch (e) {
        handleError(getCustomFetchError(e));
      }
    })();
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!messages.length) return;
    const res = { hhmm: {}, full: {} } as any;
    messages.forEach((m) => {
      const date = new Date(m.timeStamp);
      res.hhmm[m.timeStamp] = dateToHHMM(date);
      res.full[m.timeStamp] = dateToFullString(date);
    });
    console.log(res);
  }, [messages]);

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
