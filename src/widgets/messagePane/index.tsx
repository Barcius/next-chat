import React, { useRef } from 'react';
import useStore, { Message } from '../../shared/model/store/store';
import ButtonedInput from '@/src/shared/ui/ButtonedInput/ButtonedInput';

const MessagePane: React.FC<{ message: Message; }> = ({ message }) => {
  const setContextMenu = useStore((state) => state.setContextMenu);
  const editMessageId = useStore((state) => state.editMessageId);
  const setEditMessageId = useStore((state) => state.setEditMessageId);
  const editMessage = useStore((state) => state.editMessage);

  const editInputRef = useRef<HTMLInputElement>(null);

  const createdAt = new Date(message.timeStamp).toLocaleString();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      messageId: message.id,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleEditMessage = (val: string) => {
      editMessage(message.id, val);
      setEditMessageId(null);
  };

  const isEditing = editMessageId === message.id;

  return (
    <div
      className="bg-blue-100 rounded-lg max-w-md p-4 mb-4 flex flex-col justify-between message-pane"
      onContextMenu={handleContextMenu}
    >
      {isEditing ? (
        <ButtonedInput
          buttonText='Save'
          defaultInputValue={message.text}
          onButtonClick={handleEditMessage}
        />
        // <div className='flex'>
        //   <input
        //     className='flex-1 mr-2 p-2'
        //     type='text'
        //     ref={editInputRef}
        //     placeholder='Type a message'
        //     defaultValue={message.text}
        //     autoFocus
        //   />
        //   <button onClick={handleEditMessage}>Save</button>
        // </div>
      ) : (
        <div>{message.text}</div>
      )}
      
      <div className="text-sm text-gray-500 mt-auto text-left">
        {createdAt}
      </div>
    </div>
  );
};

export default MessagePane;