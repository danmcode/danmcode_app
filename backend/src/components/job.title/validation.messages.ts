export enum ValidationMessages {
    
    JobTitleRequired = 'El cargo no puede estar vacío',
    JobTitleMinLength = 'El cargo debe tener al menos 3 caracteres',
    JobTitleMaxLength = 'El cargo no puede tener más de 50 caracteres',
    JobTitleInUse = 'El cargo ya está en uso',
    
    DescriptionRequired = 'La descripción del cargo no puede estar vacía',
    DescriptionMinLength = 'La descripción del cargo debe tener al menos 10 caracteres',
    DescriptionMaxLength = 'La descripción del cargo no puede tener más de 200 caracteres',
    
    JobTitleIdRequired = 'El ID del cargo no puede estar vacío',
    JobTitleNotFound = 'El cargo no existe',
}