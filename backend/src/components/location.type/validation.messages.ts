export enum ValidationMessages {
    LocationTypeRequired = 'El tipo de ubicación no puede estar vacío',
    LocationTypeMinLength = 'El tipo de ubicación debe tener al menos 3 caracteres',
    LocationTypeMaxLength = 'El tipo de ubicación no puede tener más de 50 caracteres',
    LocationTypeInUse = 'El tipo de ubicación ya está en uso',
    
    DescriptionRequired = 'La descripción del tipo de ubicación no puede estar vacía',
    DescriptionMinLength = 'La descripción del tipo de ubicación debe tener al menos 10 caracteres',
    DescriptionMaxLength = 'La descripción del tipo de ubicación no puede tener más de 200 caracteres',
    
    LocationTypeIdRequired = 'El ID del tipo de ubicación no puede estar vacío',
    LocationTypeNotFound = 'El tipo de ubicación no existe'
}