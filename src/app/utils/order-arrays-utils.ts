// Funciones relacionadas al ordenamiento de arreglos

// Ordenar de forma ascendente por medio de una propiedad
export function orderArrayAsc(arrayJsonData: Array<any>, ...args: string[]): void {
    const propertyKeys = [...args];
    propertyKeys.forEach(propertyKey => {
        arrayJsonData.sort((a, b) => {
            if (a[propertyKey] > b[propertyKey]) {
                return 1;
            }
            if (a[propertyKey] < b[propertyKey]) {
                return -1;
            }
            return 0;
        });
    });
}

// Ordenar de forma descendente por medio de una propiedad
export function orderArrayDesc(arrayJsonData: Array<any>, ...args: string[]): void {
    const propertyKeys = [...args];
    propertyKeys.forEach(propertyKey => {
        arrayJsonData.sort((a, b) => {
            if (a[propertyKey] > b[propertyKey]) {
                return -1;
            }
            if (a[propertyKey] < b[propertyKey]) {
                return 1;
            }
            return 0;
        });
    });
}
