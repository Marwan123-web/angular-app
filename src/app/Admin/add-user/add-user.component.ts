import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  response: any;
  error: any;
  dataOfJoin: any;
  // id, name, email, password
  constructor(private adminservices: AdminservicesService) { }
  selectChangeHandler(event: any) {
    //update the ui
    this.role = event.target.value;
  }
  addUser(id: HTMLInputElement, name: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement) {
    this._id = id.value, this.name = name.value, this.email = email.value, this.password = password.value;
    let response = document.getElementById('response');
    let error = document.getElementById('error');
    this.dataOfJoin = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
    this.adminservices.addUser(this._id, this.name, this.email, this.password, this.role,this.dataOfJoin).subscribe(res => {
      this.response = res;
      if (error.classList.contains('d-block')) {
        error.classList.replace('d-block', 'd-none');
      }
      response.classList.replace('d-none', 'd-block');
      response.innerHTML = this.response.msg;

      id.value = "";
      name.value = "";
      email.value = "";
      password.value = "";
    }, err => {
      this.error = err.error;
      if (response.classList.contains('d-block')) {
        response.classList.replace('d-block', 'd-none');
      }
      error.classList.replace('d-none', 'd-block');
      error.innerHTML = this.error.msg;
    }
    );

  }

  ngOnInit(): void {

  }

}
