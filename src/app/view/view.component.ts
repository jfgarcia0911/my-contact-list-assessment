import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  details: UserModel;

  constructor(private userService: UserService){}
  ngOnInit(): void {
    this.details = this.userService.viewData;
  }
}
