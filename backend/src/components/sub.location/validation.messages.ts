export enum ValidationMessages {
    SubLocationNameRequired = 'El nombre de la sub ubicación no puede estar vacío',
    SubLocationNameMinLength = 'El nombre de la sub ubicación debe tener al menos 3 caracteres',
    SubLocationNameMaxLength = 'El nombre de la sub ubicación no puede tener más de 50 caracteres',
    SubLocationInUse = 'El nombre de la sub ubicación ya está en uso',
    
    DescriptionRequired = 'La descripción de la sub ubicación no puede estar vacía',
    DescriptionMinLength = 'La descripción de la sub ubicación debe tener al menos 10 caracteres',
    DescriptionMaxLength = 'La descripción de la sub ubicación no puede tener más de 200 caracteres',
    
    SubLocationIdRequired = 'El ID de la sub ubicación no puede estar vacío',
    SubLocationNotFound = 'El tipo de sub ubicación no existe',

    LocationIdRequired = 'El ID de la ubicación no puede estar vacío',
    LocationNotFound = 'El tipo de ubicación no existe',

    LocationTypeIdRequired = 'El ID del tipo de ubicación es requerido',
    LocationTypeNotFound = 'El tipo de ubicación no existe',

    UserIdRequired = 'El ID del usuario es requerido',
    UserNotFound = 'El usuario no existe',
}