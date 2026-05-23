'use server';
import { requireAuth } from '@/src/features/auth/lib/helper';
import api from '@/src/shared/api';
import { Message } from '@/src/shared/model/store/store';
import { nanoid } from 'nanoid';

export const getMessages = async () => {
  requireAuth();
  const res = await api.get<Message[]>('/messages');
  return res;
};

export const sendMessage = async (text: string): Promise<Message> => {
  requireAuth();
  const newMessage: Message = {
    id: nanoid(),
    text,
    timeStamp: Date.now(),
  };
  const res = await api.post<Message>('/messages', { body: JSON.stringify(newMessage) });
  return res;
};
export const editMessage = async (id: string, text: string): Promise<Message> => {
  requireAuth();
  const editedMessage: Pick<Message, 'text'> = { text };
  const res = await api.patch<Message>(`/messages/${id}`, { body: JSON.stringify(editedMessage) });
  return res;
};
export const deleteMessage = async (id: string): Promise<Message> => {
  requireAuth();
  const res = await api.delete<Message>(`/messages/${id}`);
  // console.log({ res });
  return res;
};
