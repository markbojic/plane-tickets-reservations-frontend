import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  public user: User
  public newuserForm: FormGroup

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) { 
                this.newuserForm = this.formBuilder.group({
                  username: ['', Validators.required],
                  password: ['', [Validators.required, Validators.minLength(6)]],
                  type: ['', Validators.required]
                })
  }

  ngOnInit(): void {
  }

  public get username(){
    return this.newuserForm.get('username')
  }

  public get password(){
    return this.newuserForm.get('password')
  }

  public get type(){
    return this.newuserForm.get('type')
  }

  public submitForm(credentials) {
    var isOk: boolean = true
    this.userService.fetchUsers().subscribe(users => {
      users.forEach(user => {
        if (user.username === credentials.username) {
          alert('USER WITH GIVEN USERNAME ALREADY EXISTS')
          isOk = false;
        }
      });
      if (isOk) {
        var usr = {id: 0, username: credentials.username, password: credentials.password, userType: credentials.type, bookings: null};
        this.userService.addUser(usr).subscribe()
        this.newuserForm.get('username').setValue('')
        this.newuserForm.get('password').setValue('')
        this.newuserForm.get('type').setValue('')
      }
    })
  }

}
