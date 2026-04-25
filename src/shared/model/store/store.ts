import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  text: string;
  timeStamp: number;
}

export interface ContextMenuData {
  messageId: string | null;
  x: number;
  y: number;
}

export interface State {
  messages: Message[];
  contextMenu: ContextMenuData;
  editMessageId: string | null;
  setEditMessageId: (id: string | null) => void;
  setContextMenu: (data: ContextMenuData | null) => void;
  addMessage: (msg: Message) => void;
  editMessage: (id: string, text: string) => void;
  deleteMessage: (id: string) => void;
}

const initContextMenuData: ContextMenuData = {
  messageId: null,
  x: 0,
  y: 0,
};

const useStore = create<State>()(
  persist(
    (set) => ({
      messages: [],
      contextMenu: initContextMenuData,
      editMessageId: null,
      setEditMessageId: (id) => {
        set({ editMessageId: id });
      },
      setContextMenu: (data) => {
        set({ contextMenu: data || initContextMenuData });
      },
      addMessage: (newMessage) => {
        set((state) => {
          const newMessages = [...state.messages, newMessage];
          return { messages: newMessages };
        });
      },
      editMessage: (id, text) => {
        set((state) => {
          const newMessages = state.messages.map((message) =>
            message.id === id ? { ...message, text } : message,
          );
          return { messages: newMessages };
        });
      },
      deleteMessage: (id) => {
        set((state) => {
          const newMessages = state.messages.filter((message) => message.id !== id);
          return { messages: newMessages };
        });
      },
    }),
    {
      name: 'next-chat',
      partialize: ({ messages }) => ({ messages }),
    },
  ),
);

export default useStore;
