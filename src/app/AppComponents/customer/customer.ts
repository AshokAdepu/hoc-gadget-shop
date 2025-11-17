import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDialogBox } from '../customer-dialog-box/customer-dialog-box';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { DialogBox } from '../../AppComponent/dialog-box/dialog-box';

@Component({
  selector: 'app-customer',
  imports: [FormsModule, NgFor],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
  constructor(private cdRef: ChangeDetectorRef) {}
  private modalService = inject(NgbModal);
  httpClient = inject(HttpClient);
  customerDetails: any;

  ngOnInit() {
    this.getCustomerDetails();
  }
  openCustomerDialog() {
    this.modalService.open(CustomerDialogBox).result.then((data) => {
      if (data.event == 'closed') {
        this.getCustomerDetails();
      }
    });
  }

  getCustomerDetails() {
    let apiUrl = 'https://localhost:7027/api/Customers';
    this.httpClient.get(apiUrl).subscribe((result) => {
      this.customerDetails = result;
      this.cdRef.detectChanges();
    });
  }

  openconfirmDialog(customerId: any){
    this.modalService.open(DialogBox).result.then((data) => {
      if (data.event == 'confirm') {
        this.deleteCustomerDetails(customerId);
      }
    });
  }

  deleteCustomerDetails(customerId: any){
    let apiUrl = 'https://localhost:7027/api/Customers?customerId='
    this.httpClient.delete(apiUrl+customerId).subscribe(data => {
      this.getCustomerDetails();
    })
  }
openEditDialogBox(customer: any){
 const modalReference = this.modalService.open(CustomerDialogBox);
 modalReference.componentInstance.customer = {
  customerId : customer.customerId,
  firstName : customer.firstName,
  lastName : customer.lastName,
  email : customer.email,
  registrationDate : customer.registrationDate,
  phone : customer.phone
 };
 modalReference.result.then(data => {
  if (data.event == 'closed') {
        this.getCustomerDetails();
      }
 })
}

}
