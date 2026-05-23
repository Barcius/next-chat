import ChatPage from '@/src/pages/Chat';
import { getMessages } from '../entities/message/api/messageApi';

export default async function MainPage() {
  const messages = await getMessages();
  return <ChatPage initialMessages={messages} />;
}
