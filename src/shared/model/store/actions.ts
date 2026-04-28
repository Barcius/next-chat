import useChatStore, { Message, ContextMenuData, initContextMenuData } from './store';

export const setMessages = (messages: Message[]) => {
  useChatStore.setState(() => ({ messages }));
};

export const setEditMessageId = (id: string | null) => {
  useChatStore.setState({ editMessageId: id });
};

export const setContextMenu = (data: ContextMenuData | null) => {
  useChatStore.setState({ contextMenu: data || initContextMenuData });
};

export const addMessage = (newMessage: Message) => {
  useChatStore.setState((state) => ({
    messages: [...state.messages, newMessage],
  }));
};

export const editMessage = (newMsg: Message) => {
  useChatStore.setState((state) => ({
    messages: state.messages.map((message) => (message.id === newMsg.id ? newMsg : message)),
  }));
};

export const deleteMessage = (delMsg: Message) => {
  useChatStore.setState((state) => ({
    messages: state.messages.filter((message) => message.id !== delMsg.id),
  }));
};
