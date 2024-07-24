export enum ValidationMessages {
    LocationNameRequired = 'El nombre de la ubicación no puede estar vacío',
    LocationNameMinLength = 'El nombre de la ubicación debe tener al menos 3 caracteres',
    LocationNameMaxLength = 'El nombre de la ubicación no puede tener más de 50 caracteres',
    LocationInUse = 'El nombre de la ubicación ya está en uso',
    
    DescriptionRequired = 'La descripción de la ubicación no puede estar vacía',
    DescriptionMinLength = 'La descripción de la ubicación debe tener al menos 10 caracteres',
    DescriptionMaxLength = 'La descripción de la ubicación no puede tener más de 200 caracteres',
    
    LocationIdRequired = 'El ID de la ubicación no puede estar vacío',
    LocationNotFound = 'El tipo de ubicación no existe',

    ClientIdRequired = 'El ID del cliente es requerido',
    ClientNotFound = 'El cliente no existe',

    LocationTypeIdRequired = 'El ID del tipo de ubicación es requerido',
    LocationTypeNotFound = 'El tipo de ubicación no existe',

    UserIdRequired = 'El ID del usuario es requerido',
    UserNotFound = 'El usuario no existe',

}