export enum ValidationClientMessages {
    ClientNameRequired = 'El nombre del cliente es requerido',
    ClientNameMinLength = 'El nombre del cliente debe tener al menos 5 caracteres',
    ClientNameMaxLength = 'El nombre del cliente debe tener menos de 100 caracteres',
    ClientNameInUse = 'El nombre del cliente ya esta en uso',

    NitRequired = 'El NIT es requerido',
    NitMinLength = 'El NIT del cliente debe tener al menos 6 caracteres',
    NitMaxLength = 'El NIT del cliente debe tener menos de 20 caracteres',
    NitInUse = 'El NIT del cliente ya esta en uso',

    AddressRequired = 'La dirección del cliente es requerida',
    AddressMinLength = 'La dirección del cliente debe tener al menos 5 caracteres',
    AddressMaxLength = 'La dirección del cliente debe tener menos de 100 caracteres',
    
    PhoneRequired = 'El número de contacto del cliente es requerido',
    PhoneMinLength = 'El número de contacto del cliente debe tener al menos 10 caracteres',
    PhoneMaxLength = 'El número de contacto del cliente debe tener menos de 10 caracteres',
    
    ClientEmailMinLength = 'El correo debe ser de al menos 5 caracteres',
    ClientEmailMaxLength = 'El correo electrónico debe tener menos de 100 caracteres',
    ClientEmailRequired = 'El correo electrónico es requerido',
    ClientEmailInvalid = 'El correo electrónico no es válido',
    ClientEmailInUse = 'El correo electrónico del cliente ya esta en uso',
        
    ClientTypeIdRequired = 'El ID del tipo de cliente es requerido',
    ClientTypeNotFound = 'El ID del tipo de cliente no existe',

    ClientObservationsMaxLength = 'La observación debe tener menos de 100 caracteres',

    ClientIdRequired = 'El ID del cliente es requerido',
    ClientNotFound = 'El cliente no existe',

    UserIdRequired = 'El ID del usuario que crea es requerido',
    UserNotFound = 'El usuario que crea no existe'
}