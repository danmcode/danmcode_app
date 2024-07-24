export enum ValidationMessages {
    IdentificationTypeRequired = 'El tipo de Identificacion no puede estar vacío',
    IdentificationTypeMinLength = 'El tipo de Identificacion debe tener al menos 3 caracteres',
    IdentificationTypeMaxLength = 'El tipo de Identificacion no puede tener más de 50 caracteres',
    IdentificationTypeInUse = 'El tipo de Identificacion ya está en uso',
    
    DescriptionRequired = 'La descripción del tipo de Identificacion no puede estar vacía',
    DescriptionMinLength = 'La descripción del tipo de Identificacion debe tener al menos 10 caracteres',
    DescriptionMaxLength = 'La descripción del tipo de Identificacion no puede tener más de 200 caracteres',
    
    IdentificationTypeIdRequired = 'El ID del tipo de Identificacion no puede estar vacío',
    IdentificationTypeNotFound = 'El tipo de Identificacion no existe'
}