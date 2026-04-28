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
}

export const initContextMenuData: ContextMenuData = {
  messageId: null,
  x: 0,
  y: 0,
};

const useChatStore = create<State>(() => ({
  messages: [],
  contextMenu: initContextMenuData,
  editMessageId: null,
}));

export default useChatStore;
