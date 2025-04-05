import { z } from 'zod'

/**
 * Schema for action buttons that can be attached to events
 */
export const actionSchema = z.object({
    url: z.string().url(),
    label: z.string(),
})

/**
 * Schema for event data
 */
export const eventSchema = z.object({
    title: z.string().min(3),
    category: z.string().min(3).optional(),
    date: z
        .date()
        .optional()
        .default(() => new Date()),
    notify: z.boolean().optional(),
    fields: z.record(z.string(), z.any()).optional(),
    groupBy: z.string().optional(),
    actions: z.array(actionSchema).optional(),
})

export type EventData = z.infer<typeof eventSchema>
export type ActionData = z.infer<typeof actionSchema>
