import { create } from 'zustand';

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
  editMessage: (message: Message) => void;
  deleteMessage: (id: Message) => void;
}

const initContextMenuData: ContextMenuData = {
  messageId: null,
  x: 0,
  y: 0,
};

const useStore = create<State>((set) => ({
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
  editMessage: (newMsg) => {
    set((state) => {
      const newMessages = state.messages.map((message) =>
        message.id === newMsg.id ? newMsg : message,
      );
      return { messages: newMessages };
    });
  },
  deleteMessage: (delMsg) => {
    set((state) => {
      const newMessages = state.messages.filter((message) => message.id !== delMsg.id);
      return { messages: newMessages };
    });
  },
}));

export default useStore;
