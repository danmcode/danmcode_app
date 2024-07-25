export enum ValidationMessages {
    ContactTypeRequired = 'El tipo de contacto no puede estar vacío',
    ContactTypeMinLength = 'El tipo de contacto debe tener al menos 3 caracteres',
    ContactTypeMaxLength = 'El tipo de contacto no puede tener más de 50 caracteres',
    ContactTypeInUse = 'El tipo de contacto ya está en uso',
    
    DescriptionRequired = 'La descripción del tipo de contacto no puede estar vacía',
    DescriptionMinLength = 'La descripción del tipo de contacto debe tener al menos 10 caracteres',
    DescriptionMaxLength = 'La descripción del tipo de contacto no puede tener más de 200 caracteres',
    
    ContactTypeIdRequired = 'El ID del tipo de contacto no puede estar vacío',
    ContactTypeNotFound = 'El tipo de contacto no existe',

    UserIdRequired = 'El ID del usuario es requerido',
    UserNotFound = 'El usuario no existe',
}