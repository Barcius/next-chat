'use server';
import api, { RqInitWithBody } from '@/src/shared/api';
import { MessageID } from './messageApi.types';
import { Message } from '@/src/shared/model/store/store';
import { nanoid } from 'nanoid';

export const getMessages = async () => api.get('/posts');
export const sendMessage = async (newMessage: string): Promise<Message | void> => {
  const res = await api.post<Message>('/message', { body: newMessage });
  // return res; // when real backend
  console.log({ res });
  if (res)
    return {
      id: nanoid(),
      text: newMessage,
      timeStamp: Date.now(),
    };
};
export const editMessage = async (body: RqInitWithBody, id: MessageID) =>
  api.patch(`/posts/${id}`, body);
export const deleteMessage = async (id: MessageID) => api.delete(`/posts/${id}`);
