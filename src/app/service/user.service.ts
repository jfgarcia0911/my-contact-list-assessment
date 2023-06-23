import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserModel } from '../model/user.model';
import {map} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  viewData: UserModel;
  constructor(private http: HttpClient) { }

  getViewDetails(details){
    this.viewData = details;
    console.log(this.viewData);

  }

  getContactLists() {
    return this.http
      .get<UserModel[]>('https://jsonplaceholder.typicode.com/users');
  }

  postContactDetails(details){
    this.http.post('https://fir-84844-default-rtdb.firebaseio.com/contact-list.json', details).subscribe(res =>{
      console.log(res);

    })
  }

  getContactDetails(){
    return this.http.get<UserModel[]>('https://fir-84844-default-rtdb.firebaseio.com/contact-list.json').pipe(map(res => {
      const arr = [];
      for(let key in res){
        arr.push({...res[key], id: key})
      }
      return arr;
    }))
  }

  deleteContactDetails(id){
    return this.http.delete('https://fir-84844-default-rtdb.firebaseio.com/contact-list/'+id+'.json').subscribe();
  }

  updateContactDetails(id, details){
    return this.http.put('https://fir-84844-default-rtdb.firebaseio.com/contact-list/'+id+'.json', details).subscribe();
  }
}
