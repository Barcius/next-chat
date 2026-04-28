import { create } from 'zustand';

export interface Message {
  id: string;
  text: string;
  timeStamp: number;
}

export interface State {
  messages: Message[];
}

const useChatStore = create<State>(() => ({
  messages: [],
}));

export default useChatStore;
