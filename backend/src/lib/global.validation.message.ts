export enum GlobalValidationMessages {
        
    DescriptionRequired = 'La descripción del cargo no puede estar vacía',
    DescriptionMinLength = 'La descripción del cargo debe tener al menos 10 caracteres',
    DescriptionMaxLength = 'La descripción del cargo no puede tener más de 200 caracteres',
    
    JobTitleIdRequired = 'El ID del cargo no puede estar vacío',
    JobTitleNotFound = 'El cargo no existe',

    ClientIdRequired = 'El ID del cliente no puede estar vacío',
    ClientNotFound = 'El cliente no existe',

    UserIdRequired = 'El ID del usuario no puede estar vacío',
    UserNotFound = 'El usuario no existe'

}