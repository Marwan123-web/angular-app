import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  _id: any;
  response: any;
  error: any;
  constructor(private adminservices: AdminservicesService) { }

  deleteUser(id: HTMLInputElement) {
    this._id = id.value;
    let response = document.getElementById('response');
    let error = document.getElementById('error');
    this.adminservices.deleteUser(this._id).subscribe(res => {
      this.response = res;
      if (error.classList.contains('d-block')) {
        error.classList.replace('d-block', 'd-none');
      }
      response.classList.replace('d-none', 'd-block');
      response.innerHTML = this.response.msg;
      id.value = '';
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
