interface ReducerObject {
  type: string;
  payload: any;
}

interface InitStateObject {
  authToken: string;
  loading: boolean;
  updated:boolean;
  userData: { email: string; username: string ,taskList:TaskItem[]};
}

interface TaskItem {
    id:string;
    user_id:string;
    title:string,
    description:string,
    status:boolean,
    priority:string,
    due_date:number | null
}

type GlobalContextType = [
  InitStateObject,

  {
    dispatch: (data: ReducerObject) => void;
    setStore: (authToken: string) => void;
  },
];

