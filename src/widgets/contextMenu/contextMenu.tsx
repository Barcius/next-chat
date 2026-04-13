import useStore from '@/src/store/store';
import React from 'react';

const ContextMenu: React.FC = () => {
  const contextMenu = useStore((state) => state.contextMenu);
  const deleteMessage = useStore((state) => state.deleteMessage);
  const setContextMenu = useStore((state) => state.setContextMenu);
  const setEditMessageId = useStore((state) => state.setEditMessageId);

  if (!contextMenu.messageId) return null;

  const onEdit = () => {
    if (contextMenu.messageId) setEditMessageId(contextMenu.messageId);
    setContextMenu(null);
  };

  const onDelete = () => {
    if (contextMenu.messageId) deleteMessage(contextMenu.messageId);
    setContextMenu(null);
  };

  return (
    <div
      className="absolute bg-white border rounded shadow p-2 context-menu"
      style={{ top: contextMenu.y, left: contextMenu.x }}  
    >
      <button
        onClick={onEdit}
        className="block w-full text-left py-1 px-2 hover:bg-gray-100"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="block w-full text-left py-1 px-2 hover:bg-gray-100"
      >
        Delete
      </button>
    </div>
  );
}

export default ContextMenu;