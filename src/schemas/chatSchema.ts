import { z } from 'zod';

export const ChatSchema = z.string().min(1, { message: 'Please input more than 1 character.' });
