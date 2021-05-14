export type TodoList = {
    status:boolean;
    statusCode: number;
    message:string;
    todoData:[
        {
            id:string;
            idd:number;
            data:string;
            order:number;
            doneStaus:Boolean
            _v:number;
        }
    ]

}

