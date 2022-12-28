import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Product } from '../../models/Product';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  public products:Product[]=[];
  public editProduct:Product | undefined;
  public deleteProduct:Product | undefined;
  currentUser: any;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  ShowUserBoard = false;
  showModeratorBoard = false;
  username: string | undefined;


  constructor(private productService:ProductService, private tokenStorageService: TokenStorageService) { }
  
  ngOnInit(): void {
    this.getProducts();
    this.currentUser = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.ShowUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }
  }
  public getProducts():void{
    this.productService.getProducts().subscribe({
      next:(Response:Product[])=>{
       this.products=Response;
      },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    },
  });
  }
  public onOpenModal(mode:String, product?:Product):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addProductModal');
    } else if(mode==='delete'){
      this.deleteProduct=product;
      button.setAttribute('data-target','#deleteProductModal');
    } else if (mode==='edit'){
      this.editProduct=product;
      button.setAttribute('data-target','#editProductModal');
    }
    container?.appendChild(button);
    button.click();
    }

    public onAddProduct(addForm:NgForm):void{
      document.getElementById('add-product-form')?.click();
      this.productService.addProduct(addForm.value).subscribe({
        next:(response:Product) =>{
          console.log(response);
          this.getProducts();
          addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
  
  public onUpdateProduct(product:Product){
    this.editProduct=product;
    document.getElementById('add-product-form')?.click();
    this.productService.updateProduct(product).subscribe({
      next: ( response: Product) =>{
        console.log(response);
        this.getProducts();
       },
       error:(error:HttpErrorResponse)=>{
         alert(error.message);
       }
    })
  }

  public onDeleteProduct(idPro: number):void{
    this.productService.deleteProduct(idPro).subscribe({
    next: (response:void)=>{
        console.log(response);
        this.getProducts();
       },
       error:(error:HttpErrorResponse)=>{
      alert(error.message);
       }
     })
  }
}
