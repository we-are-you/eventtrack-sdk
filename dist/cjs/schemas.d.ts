import { z } from 'zod';
/**
 * Schema for action buttons that can be attached to events
 */
export declare const actionSchema: z.ZodObject<{
    url: z.ZodString;
    label: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    label: string;
}, {
    url: string;
    label: string;
}>;
/**
 * Schema for event data
 */
export declare const eventSchema: z.ZodObject<{
    title: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
    date: z.ZodDefault<z.ZodOptional<z.ZodDate>>;
    notify: z.ZodOptional<z.ZodBoolean>;
    fields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    groupBy: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    actions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        label: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
        label: string;
    }, {
        url: string;
        label: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    title: string;
    date: Date;
    category?: string | undefined;
    notify?: boolean | undefined;
    fields?: Record<string, any> | undefined;
    groupBy?: string | undefined;
    actions?: {
        url: string;
        label: string;
    }[] | undefined;
}, {
    title: string;
    category?: string | undefined;
    date?: Date | undefined;
    notify?: boolean | undefined;
    fields?: Record<string, any> | undefined;
    groupBy?: string | undefined;
    actions?: {
        url: string;
        label: string;
    }[] | undefined;
}>;
export type EventData = z.infer<typeof eventSchema>;
export type ActionData = z.infer<typeof actionSchema>;
