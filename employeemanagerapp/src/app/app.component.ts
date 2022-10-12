import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'emp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees() {
    this.employeeService.getEmployees().subscribe(
      (empList: Employee[]) => {
        this.employees = empList;
        console.log(this.employees);
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onAddEmloyee(empForm: NgForm) {
     this.employeeService.addEmployee(empForm.value).subscribe(
      (emp: Employee) => {
        console.log(emp);
        this.getEmployees();
        empForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        empForm.reset();
      }
      );

      const closeButton = document.getElementById('add-employee-form');
      closeButton.click();
  }


  public onUpdateEmloyee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe(
      (emp: Employee) => {
        console.log(emp);
        this.getEmployees();
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onDeleteEmloyee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string) {
    console.log(key);
    const results: Employee[] = [];
    
    this.employees.forEach((emp)=> {
      if (emp.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || emp.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || emp.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || emp.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(emp);
      }
    });
   
    this.employees = results;
   
    if (results.length === 0 || !key) {
      this.getEmployees();
    }

  }

  public onOpenModal(employee: Employee, operation: string) {
    // create a button for add, edit, and delete functions 
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    
    if (operation === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (operation === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (operation === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }


    const container = document.getElementById('main-container');
    // add this button into main element
    container.appendChild(button);
    button.click();
  }


}
