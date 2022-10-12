import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // call the link in RestController (http://localhost:8080/employee/all)
  public getEmployees(): Observable<Employee[]> {
    let url = `${this.apiServerUrl}/employee/all`;
    return this.http.get<Employee[]>(url);
  }

  // call the link in RestController (http://localhost:8080/employee/add)
  public addEmployee(employee: Employee): Observable<Employee> {
    let url = `${this.apiServerUrl}/employee/add`;
    return this.http.post<Employee>(url, employee);
  }

  // call the link in RestController (http://localhost:8080/employee/update)
  public updateEmployee(employee: Employee): Observable<Employee> {
    let url = `${this.apiServerUrl}/employee/update`;
    return this.http.put<Employee>(url, employee);
  }

  // call the link in RestController (http://localhost:8080/employee/delete/{id})
  public deleteEmployee(employeeId: number): Observable<void> {
    let url = `${this.apiServerUrl}/employee/delete/${employeeId}`;
    return this.http.delete<void>(url);
  }
}
