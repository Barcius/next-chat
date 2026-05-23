import z from 'zod';
import { authSchema } from './validators';

export interface ContextMenuData {
  messageId: string;
  x: number;
  y: number;
}

export interface ContextMenuState {
  contextMenu: ContextMenuData;
  setContextMenu: (data: ContextMenuData | null) => void;
}

export interface EditedMessageIdState {
  editedMessageId: string | null;
  setEditedMessageId: (id: string | null) => void;
}

export type AuthFields = z.infer<typeof authSchema>;
