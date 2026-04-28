import { deleteMessage } from '@/src/entities/message/api/messageApi';
import handleError from '@/src/shared/lib/error/error';
import { deleteMessage as storeDeleteMessage } from '@/src/shared/model/store/actions';
import React, { useState } from 'react';
import { ContextMenuState, EditedMessageIdState } from '@/src/pages/Chat';

interface Props extends ContextMenuState, Pick<EditedMessageIdState, 'setEditedMessageId'> {}

const ContextMenu: React.FC<Props> = ({ contextMenu, setContextMenu, setEditedMessageId }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const onEdit = () => {
    if (contextMenu.messageId) setEditedMessageId(contextMenu.messageId);
    setContextMenu(null);
  };

  const onDelete = async () => {
    if (isDeleting) return;
    if (contextMenu.messageId) {
      setIsDeleting(true);
      try {
        const res = await deleteMessage(contextMenu.messageId);
        storeDeleteMessage(res);
        setContextMenu(null);
      } catch (e) {
        handleError(e);
      }
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="absolute bg-white border rounded shadow p-2 context-menu"
      style={{ top: contextMenu.y, left: contextMenu.x }}
    >
      <button onClick={onEdit} className="block w-full text-left py-1 px-2 hover:bg-gray-100">
        Edit
      </button>
      <button
        onClick={onDelete}
        className="block w-full text-left py-1 px-2 hover:bg-gray-100"
        disabled={isDeleting}
      >
        Delete
      </button>
    </div>
  );
};

export default ContextMenu;
