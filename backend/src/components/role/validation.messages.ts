export enum ValidationMessages {
    RoleNameRequired = 'El nombre del rol no puede estar vacío',
    RoleNameMinLength = 'El nombre del rol debe tener al menos 3 caracteres',
    RoleNameMaxLength = 'El nombre del rol no puede tener más de 50 caracteres',
    RoleNameInUse = 'El nombre del rol ya está en uso',
    DescriptionRequired = 'La descripción del rol no puede estar vacía',
    DescriptionMinLength = 'La descripción del rol debe tener al menos 10 caracteres',
    DescriptionMaxLength = 'La descripción del rol no puede tener más de 200 caracteres',
    RoleIdRequired = 'El ID del rol no puede estar vacío',
    RoleNotFound = 'El rol no existe'
}