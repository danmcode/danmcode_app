export enum GlobalValidationMessages {

    InvalidId = 'No es un ID vallido',
        
    DescriptionRequired = 'La descripción no puede estar vacía',
    DescriptionMinLength = 'La descripción debe tener al menos 10 caracteres',
    DescriptionMaxLength = 'La descripción no puede tener más de 200 caracteres',
    
    JobTitleIdRequired = 'El ID del cargo no puede estar vacío',
    JobTitleNotFound = 'El cargo no existe',

    SubLocationIdRequired = 'El ID de la sub ubicación es requerido',
    SubLocationNotFound = 'La sub ubicación no existe',
    
    ResidentTypeIdRequired = 'El ID del tipo de residente es requerido',
    ResidentTypeNotFound = 'El tipo de residente no existe',

    ClientIdRequired = 'El ID del cliente no puede estar vacío',
    ClientNotFound = 'El cliente no existe',

    UserIdRequired = 'El ID del usuario no puede estar vacío',
    UserNotFound = 'El usuario no existe',

    UserIdCreatedRequired = 'El ID del usuario que esta creando no puede estar vacío',
    UserCreatedNotFound = 'El usuario que esta creando no existe',

    UserIdUpdatedRequired = 'El ID del usuario que esta actualizando no puede estar vacío',
    UserUpdatedNotFound = 'El usuario que esta actualizando no existe',

    ContactTypeIdRequired = 'El ID del tipo de contacto es requerido',
    ContactTypeNotFound = 'El tipo de contacto no existe',

    ContactIdRequired = 'El ID del del contacto es requerido',
    ContactNotFound = 'El contacto no existe',
    
    ARLIdRequired = 'El ID de la ARL no puede estar vacío',
    ARLNotFound = 'La ARL no existe'
}