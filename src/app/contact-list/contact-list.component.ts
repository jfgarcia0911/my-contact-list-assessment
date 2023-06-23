import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';
import {ToastrService} from 'ngx-toastr'
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contactList = [];
  updateDetails: UserModel;
  getId;
  constructor(private userService: UserService, private notifyService: NotificationService) {}

  ngOnInit(): void {
    this.userService.getContactLists().subscribe((data) => {
      this.contactList.push(...data);
    });
    this.userService.getContactDetails().subscribe((data) => {
      this.contactList.push(...data);
    });
  }

  onViewButton(contacDetails: UserModel) {
    this.userService.getViewDetails(contacDetails);
  }

  onUpdateButton(contacDetails: UserModel, id) {
    this.updateDetails = contacDetails;
    this.getId = id;
  }

  onDeleteButton(id: number) {
    const removeTargetId = this.contactList.filter((data) => {
      return data.id !== id;
    });
    this.contactList = removeTargetId;
    this.userService.deleteContactDetails(id);
    this.notifyService.showSuccess('Delete Succesfull', 'Good Job');
  }

  receiveFormData(event: UserModel) {
    this.contactList.push(event);
  }

  updateUserArr(e: UserModel) {
    let index = this.contactList.indexOf(this.updateDetails);
    this.contactList[index] = e;
    this.userService.updateContactDetails(this.getId, e);
    console.log(e);
    console.log(index);

  }
}
