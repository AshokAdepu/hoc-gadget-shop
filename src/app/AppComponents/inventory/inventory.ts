import { NgFor } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBox } from '../../AppComponent/dialog-box/dialog-box';

@Component({
  selector: 'app-inventory',
  imports: [FormsModule, NgFor],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory implements OnInit {
  constructor(private cdRef: ChangeDetectorRef) {}
  private httpClient = inject(HttpClient);
  productIdToDelete: number = 0;
  private modalservice = inject(NgbModal);

  inventoryData = {
    productId: '',
    productName: '',
    availableQty: 0,
    reorderPoint: 0,
  };
  disableProductIdInput = false;
  inventoryDetails: any;

  ngOnInit() {
    this.getInventoryDetails();
  }
  getInventoryDetails() {
    let apiUrl = 'https://localhost:7027/api/Inventory';
    this.httpClient.get(apiUrl).subscribe((data) => {
      this.inventoryDetails = data;
      this.cdRef.detectChanges();
    });
    this.inventoryData = {
      productId: '',
      productName: '',
      availableQty: 0,
      reorderPoint: 0,
    };
    this.disableProductIdInput = false;
  }

  onSubmit(): void {
    let apiUrl = 'https://localhost:7027/api/Inventory';
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'my-auth-token',
        'Content-Type': 'application/json',
      }),
    };
    if (this.disableProductIdInput == true) {
      this.httpClient.put(apiUrl, this.inventoryData, httpOptions).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.log(e),
        complete: () => {
          alert('Form submitted succesfully' + JSON.stringify(this.inventoryData));
          this.getInventoryDetails();
        },
      });
    } else {
      this.httpClient.post(apiUrl, this.inventoryData, httpOptions).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.log(e),
        complete: () => {
          alert('Form submitted succesfully' + JSON.stringify(this.inventoryData));
          this.getInventoryDetails();
        },
      });
    }
  }

  openConfirmDialog(productId: number) {
    this.productIdToDelete = productId;
    this.modalservice.open(DialogBox).result.then((data) => {
      if (data.event == 'confirm') {
        this.deleteInventory();
      }
    });
  }

  deleteInventory(): void {
    let apiUrl = 'https://localhost:7027/api/Inventory?productId=' + this.productIdToDelete;
    this.httpClient.delete(apiUrl).subscribe((data) => {
      this.getInventoryDetails();
    });
  }

  populateFormForEdit(inventory: any) {
    this.inventoryData.productId = inventory.productId;
    this.inventoryData.productName = inventory.productName;
    this.inventoryData.availableQty = inventory.availableQty;
    this.inventoryData.reorderPoint = inventory.reOrderPoint;

    this.disableProductIdInput = true;
  }
}
