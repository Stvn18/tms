export interface LocationModel {
    _id?: string;
    country: CountryModel;
    department: DepartmentModel;
    zone: number;
    avenue: number;
    street: string;
    comments?: string;
}

export interface CountryModel {
    _id?: string;
    code: string;
    name: string;
}

export interface DepartmentModel {
    _id?: string;
    code: string;
    name: string;
    country: CountryModel;
}
