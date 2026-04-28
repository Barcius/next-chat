import React, { useRef, useState } from 'react';
import useChatStore, { Message } from '../../shared/model/store/store';
import ButtonedInput from '@/src/shared/ui/ButtonedInput/ButtonedInput';
import { editMessage } from '@/src/entities/message/api/messageApi';
import {
  setContextMenu,
  setEditMessageId,
  editMessage as storeEditMessage,
} from '../../shared/model/store/actions';
import handleError from '@/src/shared/lib/error/error';
import { dateToFullString, dateToHHMM } from '@/src/shared/ui/date';

const MessagePane: React.FC<{ message: Message }> = ({ message }) => {
  const editMessageId = useChatStore((state) => state.editMessageId);
  const [isSending, setIsSending] = useState(false);

  const createdAt = new Date(message.timeStamp);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      messageId: message.id,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleEditMessage = async (val: string) => {
    if (isSending) return false;
    setIsSending(true);
    let success = true;
    try {
      const res = await editMessage(message.id, val);
      storeEditMessage(res);
      setEditMessageId(null);
    } catch (e) {
      handleError(e);
      success = false;
    }
    setIsSending(false);
    return success;
  };

  const isEditing = editMessageId === message.id;

  return (
    <div
      className="bg-blue-100 rounded-lg max-w-md p-4 mb-4 flex flex-col justify-between message-pane"
      onContextMenu={handleContextMenu}
    >
      {isEditing ? (
        <ButtonedInput
          buttonText="Save"
          defaultInputValue={message.text}
          onButtonClick={handleEditMessage}
          disabled={isSending}
        />
      ) : (
        <div>{message.text}</div>
      )}

      <div className="text-sm text-gray-500 self-end w-min" title={dateToFullString(createdAt)}>
        {dateToHHMM(createdAt)}
      </div>
    </div>
  );
};

export default MessagePane;
