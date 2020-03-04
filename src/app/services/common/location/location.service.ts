import { Injectable } from '@angular/core';
import { AbstractOidcAuthorization } from '@services/abstract-oidc-authorization';
import { HttpClient } from '@angular/common/http';
import { OauthFacadeService } from '@services/oauth/oauth-facade.service';
import { CountryModel, DepartmentModel, LocationModel } from '@models/common/location';
import { environment } from '@env/environment';

@Injectable()
export class LocationService extends AbstractOidcAuthorization {

    constructor(http: HttpClient, oauthFacadeService: OauthFacadeService) {
        super(http, oauthFacadeService);
    }

    get countries(): Array<CountryModel> {
        return [
            {
                code: '502',
                name: 'Guatemala'
            },
            {
                code: '503',
                name: 'El Salvador'
            },
            {
                code: '504',
                name: 'Honduras'
            }
        ];
    }

    get departments(): Array<DepartmentModel> {
        return [
            {
                code: '01',
                name: 'Alta Verapaz',
                country: {
                    code: '502'
                }
            },
            {
                code: '02',
                name: 'Baja Verapaz',
                country: {
                    code: '502'
                }
            },
            {
                code: '03',
                name: 'Chimaltenango',
                country: {
                    code: '502'
                }
            },
            {
                code: '04',
                name: 'Chiquimula',
                country: {
                    code: '502'
                }
            },
            {
                code: '05',
                name: 'Petén',
                country: {
                    code: '502'
                }
            },
            {
                code: '06',
                name: 'El progreso',
                country: {
                    code: '502'
                }
            },
            {
                code: '07',
                name: 'Quiché',
                country: {
                    code: '502'
                }
            },
            {
                code: '08',
                name: 'Escuintla',
                country: {
                    code: '502'
                }
            },
            {
                code: '09',
                name: 'Guatemala',
                country: {
                    code: '502'
                }
            },
            {
                code: '10',
                name: 'Huehuetenango',
                country: {
                    code: '502'
                }
            },
            {
                code: '11',
                name: 'Izabal',
                country: {
                    code: '502'
                }
            },
            {
                code: '12',
                name: 'Jalapa',
                country: {
                    code: '502'
                }
            },
            {
                code: '13',
                name: 'Jutiapa',
                country: {
                    code: '502'
                }
            },
            {
                code: '14',
                name: 'Quetzaltenango',
                country: {
                    code: '502'
                }
            },
            {
                code: '15',
                name: 'Rethaluleu',
                country: {
                    code: '502'
                }
            },
            {
                code: '16',
                name: 'Sacátepequez',
                country: {
                    code: '502'
                }
            },
            {
                code: '17',
                name: 'San Marcos',
                country: {
                    code: '502'
                }
            },
            {
                code: '18',
                name: 'Santa Rosa',
                country: {
                    code: '502'
                }
            },
            {
                code: '19',
                name: 'Sololá',
                country: {
                    code: '502'
                }
            },
            {
                code: '20',
                name: 'Suchitepequez',
                country: {
                    code: '502'
                }
            },
            {
                code: '21',
                name: 'Totonicapán',
                country: {
                    code: '502'
                }
            },
            {
                code: '22',
                name: 'Zacapa',
                country: {
                    code: '502'
                }
            },
            {
                code: 'S-01',
                name: 'La paz',
                country: {
                    code: '503'
                }
            },
            {
                code: 'S-02',
                name: 'La libertad',
                country: {
                    code: '503'
                }
            },
            {
                code: 'S-03',
                name: 'San Vicente',
                country: {
                    code: '503'
                }
            },
            {
                code: 'H-01',
                name: 'Tegucigalpa',
                country: {
                    code: '504'
                }
            },
            {
                code: 'H-02',
                name: 'Tocoa',
                country: {
                    code: '504'
                }
            },
            {
                code: 'H-03',
                name: 'El Progreso',
                country: {
                    code: '504'
                }
            },
        ];
    }

    registerLocation(location: LocationModel): Promise<LocationModel> {
        const url = `${ environment.api.baseUrlTmsWS }location/register`;
        return this.http
            .post<LocationModel>(url, location, { headers: this.authorizationHeader })
            .toPromise();
    }

    getAllLocations(): Promise<Array<LocationModel>> {
        const url = `${ environment.api.baseUrlTmsWS }location/all`;
        return this.http
            .get<Array<LocationModel>>(url, { headers: this.authorizationHeader })
            .toPromise();
    }

}
