import useStore, { Message } from './store';

export const setMessages = (messages: Message[]) => {
  useStore.setState(() => ({ messages }));
};
