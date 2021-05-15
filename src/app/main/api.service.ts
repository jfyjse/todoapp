import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { TodoList } from './todo.model';
import { Observable } from 'rxjs';


@Injectable
({
  providedIn:'root'
})

export class ApiService { 

    constructor(private http: HttpClient) {}

     url = "http://localhost:8000";

    getData():Observable<TodoList>   {
     
        return this.http.get<TodoList>(this.url + '/getdata')
    }

    addNew(data:any)    {
     console.log('datt',data);
     return this.http.post(this.url + '/addata',data)
    }

 update(id:string){
   console.log(id);
   
   return this.http.get(this.url+`/update/${id}`)
 }

 deleteItem(id:string){
   return this.http.delete(this.url+`/delete/${id}`)
 }

}