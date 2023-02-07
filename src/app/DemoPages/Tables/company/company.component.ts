import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';

interface Company {
  avatar: string;
  name: string;
  company: string;
  status : string;
  dueDate : string;
  targetAchievement : number;
  companyId?: number;
}
const companies: Company[] = [
  {
    avatar:'Russia',
    name: 'Joey',
    company: 'Youtube',
    status: 'Active',
    dueDate: '31/12/2023',
    targetAchievement:50000
  },
  {
    avatar:'KK',
    name: 'Max',
    company: 'Google',
    status: 'Active',
    dueDate: '15/12/2023',
    targetAchievement:20000
  },
  {
    avatar:'Russia',
    name: 'Joey',
    company: 'Youtube',
    status: 'Active',
    dueDate: '31/12/2023',
    targetAchievement:50000
  },
  {
    avatar:'KK',
    name: 'Max',
    company: 'Google',
    status: 'Active',
    dueDate: '15/12/2023',
    targetAchievement:20000
  }
];

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.sass']
})
export class CompanyComponent implements OnInit {
  heading = 'Company Tables';
  subheading = 'Tables are the backbone of almost all web applications.';
  icon = 'pe-7s-drawer icon-gradient bg-happy-itmeo';

  constructor(private httpClient:HttpClient,private modalService: NgbModal) {this.getData();
  }

  data: any = {};
  getData(){
    this.httpClient.get('http://localhost:8080/api/company/findAll').subscribe((res: any) => {
      this.companie = res;
      console.log(res);
    });
  }
  companie = companies;


  ngOnInit() {
  }
  avatar = new FormControl("");
  name = new FormControl("");
  company = new FormControl("");
  status = new FormControl("");
  dueDate = new FormControl("");
  targetAchievement = new FormControl(0);
  companyId = new FormControl(0);

  save(){
    let company ={
      avatar: this.avatar.value,
      name: this.name.value,
      company:  this.company.value,
      status: this.status.value,
      dueDate: this.dueDate.value,
      targetAchievement: this.targetAchievement.value,
      companyId: this.companyId.value}
      this.httpClient.post('http://localhost:8080/api/company/save',company).subscribe((res: any) => {
      this.getData();
    });
  }
  delete(companyId: number){
    this.httpClient.get('http://localhost:8080/api/company/delete?companyId='+companyId).subscribe((res: any) => {
      this.getData();
    });
  }
  open(
    contents: any, 
    avatar: string,
    name:string,
    company:string,
    status: string,
    dueDate: string,
    targetAchievement: number,
    companyId: number
    ) {
    this.avatar.setValue(avatar);
    this.name.setValue(name);
    this.company.setValue(company);
    this.status.setValue(status);
    this.dueDate.setValue(dueDate);
    this.targetAchievement.setValue(targetAchievement);
    this.companyId.setValue(companyId)
    let ngbModalOptions: NgbModalOptions = {
      backdrop: false,
      keyboard: true
    };
    this.modalService.open(contents, ngbModalOptions).result.then((result) => {
      console.log(name);
    }, (reason) => {
      
    });
    console.log(companyId);
  }
  
}
