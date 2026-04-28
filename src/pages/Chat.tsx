'use client';
import React, { useEffect, useCallback, useState } from 'react';
import useChatStore from '../shared/model/store/store';
import MessagePane from '../widgets/messagePane/messagePane';
import ContextMenu from '../widgets/contextMenu/contextMenu';
import ButtonedInput from '../shared/ui/ButtonedInput/ButtonedInput';
import { sendMessage } from '@/src/entities/message/api/messageApi';
import handleError, { getCustomFetchError, throwOnErrorResponse } from '../shared/lib/error/error';
import { setMessages, addMessage } from '../shared/model/store/actions';

interface ContextMenuData {
  messageId: string;
  x: number;
  y: number;
}

export interface ContextMenuState {
  contextMenu: ContextMenuData;
  setContextMenu: (data: ContextMenuData | null) => void;
}

export interface EditedMessageIdState {
  editedMessageId: string | null;
  setEditedMessageId: (id: string | null) => void;
}

const ChatPage: React.FC = () => {
  const messages = useChatStore((store) => store.messages);
  const [isSending, setIsSending] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuData | null>(null);
  const [editedMessageId, setEditedMessageId] = useState<string | null>(null);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    const t = e.target as Element;
    if (!t.closest('.message-pane') && !t.closest('.context-menu')) {
      setContextMenu(null);
    }
  }, []);

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

  return (
    <>
      <div className="flex-1 h-0 overflow-y-auto mb-2">
        {messages.map((message) => (
          <MessagePane
            message={message}
            key={message.id}
            setContextMenu={setContextMenu}
            editedMessageId={editedMessageId}
            setEditedMessageId={setEditedMessageId}
          />
        ))}
      </div>
      <ButtonedInput buttonText="Send" onButtonClick={handleSendMessage} disabled={isSending} />
      {contextMenu && (
        <ContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setEditedMessageId={setEditedMessageId}
        />
      )}
    </>
  );
};

export default ChatPage;
