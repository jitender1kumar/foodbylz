import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../Model/crud.model';
import { environment } from '../../environment/environment';

/** A role record returned by the roles API. */

@Injectable({ providedIn: 'root' })
export class RoleService {
	//private readonly endpoint = '/api/roles';
private readonly endpoint: string = environment.api+"role";
	constructor(private readonly http: HttpClient) {}

	getRoles(): Observable<Role[]> {
		return this.http.get<Role[]>(this.endpoint);
	}

	getRole(id: number | string): Observable<Role> {
		return this.http.get<Role>(`${this.endpoint}/${encodeURIComponent(String(id))}`);
	}

	createRole(role: Role): Observable<Role> {
		return this.http.post<Role>(this.endpoint, role);
	}

	updateRole(id: number | string, role: Partial<Role>): Observable<Role> {
		return this.http.put<Role>(`${this.endpoint}/${encodeURIComponent(String(id))}`, role);
	}

	deleteRole(id: number | string): Observable<void> {
		return this.http.delete<void>(`${this.endpoint}/${encodeURIComponent(String(id))}`);
	}
}
