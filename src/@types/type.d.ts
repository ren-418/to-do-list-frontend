interface ReducerObject {
  type: string;
  payload: any;
}

interface InitStateObject {
  authToken: string;
  loading: boolean;
  userData: { email: string; fullName: string };
}

type GlobalContextType = [
  InitStateObject,

  {
    dispatch: (data: ReducerObject) => void;
    setStore: (authToken: string) => void;
  },
];
