import { ExampleService } from './../service/example.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private fb: FormBuilder,
    private examp: ExampleService
  ) { 
    this.refreshList();
  }

  public frmExample:FormGroup = this.fb.group({
    firstname :   ['', Validators.required ],
    lastname  :   ['', Validators.required ],
    email     :   ['', [Validators.required, Validators.email]],
    password  :   ['', Validators.required ]
  });

  public frmEditExample:FormGroup = this.fb.group({
    firstname :   ['', Validators.required ],
    lastname  :   ['', Validators.required ],
    email     :   ['', [Validators.required, Validators.email]],
    key       :   ''
  });

  public database: any = [];
  public oneditfrm: boolean = false;

  public onSubmit(){
    this.examp.postSignUp(this.frmExample.value).subscribe(
      (res: any) => {
        console.log(res);
        this.refreshList();
      },
      (err: any) => {
        console.log(err);
      }
    )
    
  }

  public onDelete(key:any){
    if(confirm("ยืนยันการลบข้อมูล")){
      this.database.splice(key,1);
    }
    //console.log(key)
    
  }

  public onEdit(key,firstname,lastname,email){
    this.oneditfrm = true;
    this.frmEditExample.patchValue({
      firstname :   firstname,
      lastname  :   lastname,
      email     :   email,
      key       :   key
    });

  }

  public onUpdate(){
    this.database[this.frmEditExample.value.key].firstname    = this.frmEditExample.value.firstname;
    this.database[this.frmEditExample.value.key].lastname     = this.frmEditExample.value.lastname;
    this.database[this.frmEditExample.value.key].email        = this.frmEditExample.value.email;
    this.oneditfrm = false;
  }

  public refreshList(){
    this.examp.getExample().subscribe(
      (res: any) => {
        for(let element in res){ this.database.push(res[element]); }
        
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  public async logout(){
    await this.examp.logout();
    location.href = "/login";
  }

}
