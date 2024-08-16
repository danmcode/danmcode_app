export enum ValidationMessages {

    BrandRequired = 'La marca del vehículo no puede estar vacío',
    BrandMinLength = 'La marca del vehículo debe tener al menos 3 caracteres',
    BrandMaxLength = 'La marca del vehículo no puede tener más de 50 caracteres',
    BrandInUse = 'La marca del vehículo ya existe',

    LicensePlateRequired = 'La placa del vehículo no puede estar vacío',
    LicensePlateMinLength = 'La placa del vehículo debe tener al menos 6 caracteres',
    LicensePlateMaxLength = 'La placa del vehículo no puede tener más de 6 caracteres',
    LicensePlateInUse = 'La placa del vehículo ya existe',

    ColorMinLength = 'El color del vehículo debe tener al menos 6 caracteres',
    ColorMaxLength = 'El color del vehículo no puede tener más de 6 caracteres',
    
    ClientTypeIdRequired = 'El ID del tipo de cliente no puede estar vacío',
    ClientTypeNotFound = 'La marca del vehículo no existe'
}