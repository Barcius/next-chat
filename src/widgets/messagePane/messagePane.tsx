import React, { useState } from 'react';
import { Message } from '../../shared/model/store/store';
import ButtonedInput from '@/src/shared/ui/ButtonedInput/ButtonedInput';
import { editMessage } from '@/src/entities/message/api/messageApi';
import { editMessage as storeEditedMessage } from '../../shared/model/store/actions';
import handleError from '@/src/shared/lib/error/error';
import { dateToFullString, dateToHHMM } from '@/src/shared/ui/date';
import { ContextMenuState, EditedMessageIdState } from '@/src/pages/Chat';

interface Props extends Pick<ContextMenuState, 'setContextMenu'>, EditedMessageIdState {
  message: Message;
}

const MessagePane: React.FC<Props> = ({
  message,
  setContextMenu,
  editedMessageId,
  setEditedMessageId,
}) => {
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
      storeEditedMessage(res);
      setEditedMessageId(null);
    } catch (e) {
      handleError(e);
      success = false;
    }
    setIsSending(false);
    return success;
  };

  const isEditing = editedMessageId === message.id;

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
