"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventSchema = exports.actionSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for action buttons that can be attached to events
 */
exports.actionSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    label: zod_1.z.string(),
});
/**
 * Custom validator to check if groupBy matches a field or category
 */
function validateGroupBy(val, data) {
    if (!val)
        return true;
    if (val === 'category' && data.category)
        return true;
    return data.fields ? val in data.fields : false;
}
/**
 * Schema for event data
 */
exports.eventSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    category: zod_1.z.string().min(3).optional(),
    date: zod_1.z
        .date()
        .optional()
        .default(() => new Date()),
    notify: zod_1.z.boolean().optional(),
    fields: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
    groupBy: zod_1.z
        .string()
        .optional()
        .superRefine((val, ctx) => {
        const data = ctx._parent?.data;
        if (!validateGroupBy(val, data)) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'groupBy must match a key in fields or be "category" if category is set',
            });
        }
    }),
    actions: zod_1.z.array(exports.actionSchema).optional(),
});
