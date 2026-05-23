'use client';
import React, { useEffect, useCallback, useState } from 'react';
import useChatStore, { Message } from '../shared/model/store/store';
import MessagePane from '../widgets/messagePane/messagePane';
import ContextMenu from '../widgets/contextMenu/contextMenu';
import ButtonedInput from '../shared/ui/ButtonedInput/ButtonedInput';
import { sendMessage } from '@/src/entities/message/api/messageApi';
import handleError, { getCustomFetchError, throwOnErrorResponse } from '../shared/lib/error/error';
import { setMessages, addMessage } from '../shared/model/store/actions';
import { ContextMenuData } from '@/src/shared/model/types';

interface Props {
  initialMessages: Message[];
}

const ChatPage: React.FC<Props> = ({ initialMessages }) => {
  const messages = useChatStore((store) => store.messages);
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuData | null>(null);
  const [editedMessageId, setEditedMessageId] = useState<string | null>(null);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    const t = e.target as Element;
    if (!t.closest('.message-pane') && !t.closest('.context-menu')) {
      setContextMenu(null);
    }
  }, []);

  const handleSendMessage = async () => {
    if (isSending) return;
    const trimmed = messageText.trim();
    if (!trimmed) return;
    setIsSending(true);
    try {
      const res = await sendMessage(trimmed);
      addMessage(res);
      setMessageText('');
    } catch (e) {
      handleError(e);
      // Keep the text so user can retry
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

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
      <ButtonedInput
        buttonText="Send"
        value={messageText}
        onChange={setMessageText}
        onSubmit={handleSendMessage}
        disabled={isSending}
      />
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
