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
function validateGroupBy(
    val: string | undefined,
    data: { fields?: Record<string, any>; category?: string },
): boolean {
    if (!val) return true
    if (val === 'category' && data.category) return true
    return data.fields ? val in data.fields : false
}

/**
 * Schema for event data
 */
export const eventSchema = z
    .object({
        title: z.string().min(3),
        category: z.string().min(3).optional(),
        notify: z.boolean().optional(),
        icon: z
            .string()
            .refine(
                (val) => {
                    // Check if it's a hex color
                    const isHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val)
                    // Check if it's a URL to an image
                    const isImageUrl =
                        /\.(jpg|jpeg|png|svg)$/i.test(val) && /^https?:\/\//.test(val)
                    // Check if it's a single emoji (most emojis are 2 chars in JS)
                    const isSingleEmoji = val.length <= 2

                    return isHex || isImageUrl || isSingleEmoji
                },
                {
                    message:
                        'Icon must be either a hex color (e.g. #FF0000), an image URL (jpg/png/svg), or an emoji',
                },
            )
            .optional(),
        fields: z.record(z.string(), z.any()).optional(),
        groupBy: z.string().optional(),
        actions: z.array(actionSchema).optional(),
    })
    .superRefine((data, ctx) => {
        const testData = data as {
            fields?: Record<string, any>
            category?: string
            groupBy?: string
        }
        if (!validateGroupBy(testData.groupBy, testData)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'groupBy must match a key in fields or be "category" if category is set',
            })
        }
    })

export type EventData = z.infer<typeof eventSchema>
export type ActionData = z.infer<typeof actionSchema>
