

export interface Datas {
  data: DataModel[],
  getData: Function
}


export interface DataModel {
  id: string,
  title?: string,
  comment?: string,
  num?: number
}