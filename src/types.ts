export interface TTaskData {
  id: string;
  title: string;
  description: string;
  status: string;
  available: boolean;
}

export interface TTask extends TTaskData {
  createdAt: number;
}
