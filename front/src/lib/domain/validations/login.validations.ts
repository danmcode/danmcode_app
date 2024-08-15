import { z } from 'zod';

export const loginValidations = z.object({
    username: z.string().min(3, {
        message: "El nombre de usuario deberia tener almenos 3 caracteres"
    }).max(20, {
        message: 'El nombre de usuario deberia ser de máximo 20 caracteres'
    }),

    password: z.string().min(6, {
        message: "La contraseña debe tener almenos 6 caracteres de largo"
    }),

})