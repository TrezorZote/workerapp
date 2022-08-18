import { HttpClient, HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../worker";
import Swal from 'sweetalert2';


@Injectable({providedIn: 'root'})

export class WorkerServiceImplementation{

 private apiServiceUrl=environment.apiBaseUrl;
 constructor( private http: HttpClient){
 }
 
    public getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>( `${this.apiServiceUrl}/worker/all`);
  } 
    public createProduct(formData:FormData){
    return this.http.post( `${this.apiServiceUrl}/worker/create`,formData).subscribe((response:any)=>{ 
      console.log(response);
      Swal.fire({
        position: 'top-start',
        title: 'Product Posted Successfully',
        text: 'You can now refresh the page',
        icon: 'success',
        showCancelButton: false,
    });
    this.getAllProducts();
   }, (error: HttpErrorResponse)=>{
    console.log(error);
    if (error.status==200) {
      Swal.fire({
        position: 'top-start',
        title: 'Product Posted Successfully',
        text: 'You can now refresh the page',
        icon: 'success',
        showCancelButton: false,
    });
    this.getAllProducts();
    }
    else{ 
       Swal.fire({
        position: 'top-start',
        title: 'Failed to create Product',
        text: 'verify your infos and try again',
        icon: 'error',
        showCancelButton: false,
    });
    this.getAllProducts();
  }  
  });
    
   }

    
        public deleteProduct( id: number): Observable<void>{
         return   this.http.delete<void>( `${this.apiServiceUrl}/worker/delete/${id}`);
         }

         public getProduct( id: number): Observable<Product>{
            return this.http.get<Product>( `${this.apiServiceUrl}/worker/find/${id}`);
          }  


        
}
