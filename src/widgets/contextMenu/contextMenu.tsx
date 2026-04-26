import { deleteMessage } from '@/src/entities/message/api/messageApi';
import handleError from '@/src/shared/lib/error/error';
import useStore from '@/src/shared/model/store/store';
import React, { useState } from 'react';

const ContextMenu: React.FC = () => {
  const contextMenu = useStore((state) => state.contextMenu);
  const deleteStoreMessage = useStore((state) => state.deleteMessage);
  const setContextMenu = useStore((state) => state.setContextMenu);
  const setEditMessageId = useStore((state) => state.setEditMessageId);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!contextMenu.messageId) return null;

  const onEdit = () => {
    if (contextMenu.messageId) setEditMessageId(contextMenu.messageId);
    setContextMenu(null);
  };

  const onDelete = async () => {
    if (isDeleting) return;
    if (contextMenu.messageId) {
      setIsDeleting(true);
      try {
        const res = await deleteMessage(contextMenu.messageId);
        deleteStoreMessage(res);
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
