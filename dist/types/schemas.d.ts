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
export declare const eventSchema: z.ZodEffects<z.ZodObject<{
    title: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
    notify: z.ZodOptional<z.ZodBoolean>;
    icon: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    fields: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    groupBy: z.ZodOptional<z.ZodString>;
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
    category?: string | undefined;
    notify?: boolean | undefined;
    icon?: string | undefined;
    fields?: Record<string, any> | undefined;
    groupBy?: string | undefined;
    actions?: {
        url: string;
        label: string;
    }[] | undefined;
}, {
    title: string;
    category?: string | undefined;
    notify?: boolean | undefined;
    icon?: string | undefined;
    fields?: Record<string, any> | undefined;
    groupBy?: string | undefined;
    actions?: {
        url: string;
        label: string;
    }[] | undefined;
}>, {
    title: string;
    category?: string | undefined;
    notify?: boolean | undefined;
    icon?: string | undefined;
    fields?: Record<string, any> | undefined;
    groupBy?: string | undefined;
    actions?: {
        url: string;
        label: string;
    }[] | undefined;
}, {
    title: string;
    category?: string | undefined;
    notify?: boolean | undefined;
    icon?: string | undefined;
    fields?: Record<string, any> | undefined;
    groupBy?: string | undefined;
    actions?: {
        url: string;
        label: string;
    }[] | undefined;
}>;
export type EventData = z.infer<typeof eventSchema>;
export type ActionData = z.infer<typeof actionSchema>;
//# sourceMappingURL=schemas.d.ts.map