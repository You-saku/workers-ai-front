import { z } from 'zod';

export const ChatSchema = z.object({
        'question': z.string().min(1, { message: 'Please input more than 1 character.' }),
    });
