'use server';
import api from '@/src/shared/api';
import { Message } from '@/src/shared/model/store/store';
import { nanoid } from 'nanoid';

export const getMessages = async (signal: AbortSignal) => {
  const res = await api.get<Message[]>('/messages', { signal });
  return res;
};

export const sendMessage = async (text: string): Promise<Message> => {
  const newMessage: Message = {
    id: nanoid(),
    text,
    timeStamp: Date.now(),
  };
  const res = await api.post<Message>('/messages', { body: JSON.stringify(newMessage) });
  return res;
};
export const editMessage = async (id: string, text: string): Promise<Message> => {
  const editedMessage: Pick<Message, 'text'> = { text };
  const res = await api.patch<Message>(`/messages/${id}`, { body: JSON.stringify(editedMessage) });
  return res;
};
export const deleteMessage = async (id: string): Promise<Message> => {
  const res = await api.delete<Message>(`/messages/${id}`);
  // console.log({ res });
  return res;
};
