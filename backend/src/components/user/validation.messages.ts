export enum ValidationUserMessages {
    IdentificationRequired = 'La identificación es requerida',
    IdentificationMinLength = 'La identificación del usuario debe tener al menos 6 caracteres',
    IdentificationMaxLength = 'La identificación del usuario debe tener menos de 12 caracteres',
    
    NameRequired = 'El nombre del usuario es requerido',
    NameMinLength = 'El nombre del usuario debe tener al menos 5 caracteres',
    NameMaxLength = 'El nombre del usuario debe tener menos de 50 caracteres',
    
    LastNameRequired = 'El apellido del usuario es requerido',
    LastNameMinLength = 'El apellido del usuario debe tener al menos 5 caracteres',
    LastNameMaxLength = 'El apellido del usuario debe tener menos de 50 caracteres',
    
    UsernameRequired = 'El nombre de usuario es requerido',
    UsernameMinLength = 'El nombre de usuario debe tener al menos 3 caracteres',
    UsernameMaxLength = 'El nombre de usuario debe tener menos de 30 caracteres',
    
    EmailRequired = 'El correo electrónico es requerido',
    EmailInvalid = 'El correo electrónico no es válido',
    
    PasswordRequired = 'La contraseña es requerida',
    PasswordMinLength = 'La contraseña debe tener al menos 8 caracteres',
    
    RoleIdRequired = 'El ID del rol es requerido',
    RoleNotFound = 'El rol no existe',
    
    UserIdRequired = 'El ID del usuario es requerido',
    UserNotFound = 'El usuario no existe'
}