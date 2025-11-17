import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-dialog-box',
  imports: [FormsModule],
  templateUrl: './customer-dialog-box.html',
  styleUrl: './customer-dialog-box.css',
})
export class CustomerDialogBox {
  httpClient = inject(HttpClient);
  modal = inject(NgbActiveModal);
  customerDetails = {
    customerId: '',
    firstName: '',
    lastName: '',
    registrationDate: '',
    phone: '',
    email: '',
  };
  onSubmit() {
    let apiUrl = 'https://localhost:7027/api/Customers';
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token',
        'Content-Type': 'application/json',
      }),
    };

    this.httpClient.post(apiUrl, this.customerDetails, httpOptions).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.log(e),
      complete: () => {
        alert('Customer details saved succesfully:' + JSON.stringify(this.customerDetails));
        this.modal.close({ event: 'closed' });
      },
    });
  }
}
