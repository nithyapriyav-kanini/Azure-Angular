import { RegisterModel } from 'src/models/register.model';
import { RegisterService } from 'src/services/register.service';
import { GetFieldsService } from 'src/services/getfields.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  employee: RegisterModel;
  locations: string[] = [];
  practices: string[] = [];
  billableTypes: string[] = [];
  resourceTypes: string[] = [];
  experiences: string[] = [];
  skillsInput: string = '';
  role!: string;
  adminFields: string[] = [];
  roleStatus: string = "employee";
  formSubmitted: boolean = false;
  registrationSuccessful: boolean = false;

  constructor(
    private registerService: RegisterService, 
    private getFieldsService: GetFieldsService,
  ) {
    this.employee = new RegisterModel('', '', '', '', '', '', '', '', '', [], '');
  }
  
  ngOnInit(): void {
    this.getFieldsService.getLocations().subscribe((locations) => {
      this.locations = locations;
    });

    this.getFieldsService.getPractices().subscribe((practices) => {
      this.practices = practices;
    });

    this.getFieldsService.getBillableTypes().subscribe((billableTypes) => {
      this.billableTypes = billableTypes;
    });

    this.getFieldsService.getResourceTypes().subscribe((resourceTypes) => {
      this.resourceTypes = resourceTypes;
    });

    this.getFieldsService.getExperiences().subscribe((experiences) => {
      this.experiences = experiences;
    });

    this.roleStatus = localStorage.getItem("role") || this.roleStatus;
  }

  adminFieldChange(adminFieldValue: string) {
    console.log(adminFieldValue);
  }

  addLocation(location: string) {
    this.employee.location = location;
  }

  addPractice(practice: string) {
    this.employee.practice = practice;
  }

  addBillableType(billable: string) {
    this.employee.billable = billable;
  }

  addResourceType(resource: string) {
    this.employee.resource = resource;
  }

  addExperience(experience: string) {
    this.employee.experience = experience;
  }

  addStatus(status: string) {
    this.employee.activeStatus = status;
  }

  addRole(role: any) {
    this.employee.role = role;
  }
  

  registerCall() {
    this.formSubmitted = true;
  
    if (
      this.employee.employeeName !== "" &&
      this.employee.email !== "" &&
      this.employee.experience !== "" &&
      this.employee.location !== "" &&
      this.employee.practice !== "" &&
      this.employee.resource !== "" &&
      this.employee.billable !== "" &&
      this.employee.activeStatus !== ""
    ) {
      this.registerService.employeeRegister(this.employee).subscribe(
        (data) => {

          this.employee.skills = this.skillsInput.split('\n');
          this.employee = data as RegisterModel;
          this.registrationSuccessful = true;

          setTimeout(() => {
            this.registrationSuccessful = false;
          }, 3000);
        },
        (err) => {
          console.log(err);
        }
      );
  
      this.formSubmitted = false;
    }
  }
  
  homePage() {
    window.location.href = 'http://localhost:3000/';
  }
}
