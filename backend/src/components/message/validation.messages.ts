export enum ValidationMessages {
    ClientTypeRequired = 'El tipo de cliente no puede estar vacío',
    ClientTypeMinLength = 'El tipo de cliente debe tener al menos 3 caracteres',
    ClientTypeMaxLength = 'El tipo de cliente no puede tener más de 50 caracteres',
    ClientTypeInUse = 'El tipo de cliente ya está en uso',
    
    DescriptionRequired = 'La descripción del tipo de cliente no puede estar vacía',
    DescriptionMinLength = 'La descripción del tipo de cliente debe tener al menos 10 caracteres',
    DescriptionMaxLength = 'La descripción del tipo de cliente no puede tener más de 200 caracteres',
    
    ClientTypeIdRequired = 'El ID del tipo de cliente no puede estar vacío',
    ClientTypeNotFound = 'El tipo de cliente no existe'
}