import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  _id: any;
  constructor(private adminservices: AdminservicesService) { }

  deleteUser(id: HTMLInputElement) {
    this._id = id.value;
    this.adminservices.deleteUser(this._id).subscribe(res => {
      console.log('Done');
      id.value = '';
    }, err => {
      console.log('Fail');
    });

  }
  ngOnInit(): void {
  }

}
