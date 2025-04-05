import { z } from 'zod'

/**
 * Schema for action buttons that can be attached to events
 */
export const actionSchema = z.object({
    url: z.string().url(),
    label: z.string(),
})

/**
 * Custom validator to check if groupBy matches a field or category
 */
function validateGroupBy(val: string | undefined, data: { fields?: Record<string, any>, category?: string }): boolean {
    if (!val) return true
    if (val === 'category' && data.category) return true
    return data.fields ? val in data.fields : false
}

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
    groupBy: z
        .string()
        .optional()
        .superRefine((val, ctx) => {
            const data = (ctx as any)._parent?.data as { fields?: Record<string, any>, category?: string }
            if (!validateGroupBy(val, data)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'groupBy must match a key in fields or be "category" if category is set',
                })
            }
        }),
    actions: z.array(actionSchema).optional(),
})

export type EventData = z.infer<typeof eventSchema>
export type ActionData = z.infer<typeof actionSchema>
