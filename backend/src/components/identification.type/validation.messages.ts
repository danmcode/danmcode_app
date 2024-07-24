export enum ValidationMessages {
    IdentificationTypeRequired = 'El tipo de identificación no puede estar vacío',
    IdentificationTypeMinLength = 'El tipo de identificación debe tener al menos 3 caracteres',
    IdentificationTypeMaxLength = 'El tipo de identificación no puede tener más de 50 caracteres',
    IdentificationTypeInUse = 'El tipo de identificación ya está en uso',
    
    DescriptionRequired = 'La descripción del tipo de identificación no puede estar vacía',
    DescriptionMinLength = 'La descripción del tipo de identificación debe tener al menos 10 caracteres',
    DescriptionMaxLength = 'La descripción del tipo de identificación no puede tener más de 200 caracteres',
    
    IdentificationTypeIdRequired = 'El ID del tipo de identificación no puede estar vacío',
    IdentificationTypeNotFound = 'El tipo de identificación no existe'
}