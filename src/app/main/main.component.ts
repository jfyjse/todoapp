import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { TodoList } from './todo.model';
import { ApiService } from './api.service';
import { discardPeriodicTasks } from '@angular/core/testing';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private http: HttpClient, private apiservice: ApiService) {}

  ngOnInit() {
    this.getData();
  }

  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  todo: any = [];
  done: any = [];
  commonData: any;

  count = 0;

  dstatus: any;

  data_one = [
    {
      id: null,
    },
  ];

  error = {
    message: '',
  };

  getData() {
    this.apiservice.getData().subscribe(
      (res: any) => {
        console.log('res', res);
        if (res) {
          // this.todo = res.result.todoData;
          // console.log('datas',this.todo);
          this.commonData = res.result.todoData;
          this.ConvertTwoArray();
        }
      },
      (err) => {
        console.log('api error:', err);
      }
    );
  }

  ConvertTwoArray() {
    for (let i = 0; i <= this.commonData.length; i++) {
      this.todo = this.commonData.filter((data: any) => {
        return data.doneStatus == false;
      });
    }

    console.log('totdo array', this.todo);

    for (let i = 0; i <= this.commonData.length; i++) {
      this.done = this.commonData.filter((data: any) => {
        return data.doneStatus == true;
      });
    }

    // this.getData()
  }

  addbtn(data: any) {
  

    let val = data.value;
    if(val!=""){
      const datt = {
        idd: '0',
        data: val,
        order: '0',
        doneStatus: false,
      };
  
      this.apiservice.addNew(datt).subscribe(
        (res: any) => {
          if (res) {
            // this.todo.push(val);
            this.getData();
          }
        },
        (err) => {
          console.log('api error', err);
          this.error.message = err.error.message;
        }
      );
  

    }
    else{alert("null data no accepted");
    }
    // console.log(val);
   
    // return this.http.post('http://localhost:8000/addata', datt).subscribe(
    //   (o: any) => {
    //     if (o) {
    //       alert('success' + o);
    //       this.todo.push(val);
    //     }
    //   },
    //   (o: any) => {
    //     alert(o.error.message);
    //   }
    // );
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('event',event);
    
    if (event.previousContainer === event.container) {
      // console.log(event.container.data);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      ); {
        
        
      }
      // console.log(event.container.data);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        {
          this.update(event.container.data,event.currentIndex)
        }
        // this.update(event.container.data,event.currentIndex)
              

      
      // console.log(event.currentIndex);
      // console.log(event.container.data);
      
    }
  }

  update(data:any[],index:any){
  
   let ndata;
   
   for(let i=0; i<=data.length; i++)  {
     
    if(data[index]){

      ndata=data[index];

    }
    
    
  }
  console.log("new data",ndata);

  this.apiservice.update(ndata._id)
  .subscribe((res:any) => {
     if(res)  {
       this.getData();
     }
  },(err) =>  {
    console.log('api update error',err);
    
  })

  

  
}   
     

delete(id:string){
  this.apiservice.deleteItem(id)
  .subscribe((del:any)=>{
    if(del){
      this.getData()

    }
  },(err)=>{
    console.log("api del err"),err;
    
  })

}    



}