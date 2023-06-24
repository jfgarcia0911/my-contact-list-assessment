import { Component, OnInit, Output, EventEmitter, Input,OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { NotificationService } from 'src/app/service/notification.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnChanges {
  userForm: FormGroup;
  @Input() userDetails: UserModel;
  @Output() contactListData = new EventEmitter<UserModel>();
  @Output() submitForm = new EventEmitter<UserModel>();
  @Input()addButton: boolean = true;
  @Input()updateButton: boolean;
  @Input()formStatus: boolean;

  constructor(private userService: UserService, private notifyService: NotificationService) {}
  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
    })
  }

  ngOnChanges() {
   if(this.userDetails){
    this.userForm.patchValue({
      name: this.userDetails.name,
      username: this.userDetails.username,
      email: this.userDetails.email,
      phone: this.userDetails.phone
    })
    this.formStatus = true;
    this.updateButton = true;
    this.addButton = false;
   }
  }

  onSubmit() {
    this.contactListData.emit(this.userForm.value);
    this.userService.postContactDetails(this.userForm.value);
    this.userForm.reset();
    this.formStatus = false;
    this.addButton = true;
    this.updateButton = false;
    this.notifyService.showSuccess('Added Successfully!');
  }
  onUpdateButton(){
    this.submitForm.emit(this.userForm.value);
    this.userForm.reset();
    this.formStatus = false;
    this.addButton = true;
    this.notifyService.showSuccess('Updated Successfully');
  }

  showForm(){
    this.formStatus = true;
    this.addButton = false;
    this.updateButton = false;
  }
  cancelForm(){
    this.formStatus = false;
    this.addButton = true;
    this.updateButton = false;
    this.userForm.reset();
  }

}
