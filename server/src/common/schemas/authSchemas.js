'use strict';
import * as zod from 'zod';

const nameSchema = zod
    .string()
    .regex(/^[A-ZА-Я][a-zа-я]{3,128}$/)
    .trim();

const signUpSchema = zod.object({
    name: nameSchema,
    surname: nameSchema,
    birthday: zod.string().min(new Date('1900-01-01'), { error: 'Too old!' }).max(new Date(), { error: 'Too young!' }),
    gender: zod.enum(['male', 'female', 'other']),
    login: zod.string().trim().min(3).max(32),
    email: zod.email().trim(),
    password: zod.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/),
});

const signInSchema = zod.object({
    login: zod.string().trim(),
    email: zod.email().trim(),
    password: yup.string().trim(),
});

export { signUpSchema, signInSchema };
