import create from 'zustand';

interface Message {
  id: string;
  text: string;
}

interface State {
  messages: Message[];
  addMessage: (text: string) => void;
  editMessage: (id: string, text: string) => void;
  deleteMessage: (id: string) => void;
}

const useStore = create<State>((set) => ({
  messages: JSON.parse(localStorage.getItem('messages')) || [],
  addMessage: (text) => {
    const newMessage = { id: Date.now().toString(), text };
    set((state) => {
      const newMessages = [...state.messages, newMessage];
      localStorage.setItem('messages', JSON.stringify(newMessages));
      return { messages: newMessages };
    });
  },
  editMessage: (id, text) => {
    set((state) => {
      const newMessages = state.messages.map((message) =>
        message.id === id ? { ...message, text } : message
      );
      localStorage.setItem('messages', JSON.stringify(newMessages));
      return { messages: newMessages };
    });
  },
  deleteMessage: (id) => {
    set((state) => {
      const newMessages = state.messages.filter((message) => message.id !== id);
      localStorage.setItem('messages', JSON.stringify(newMessages));
      return { messages: newMessages };
    });
  },
}));

export default useStore;

