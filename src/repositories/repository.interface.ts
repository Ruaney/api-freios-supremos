export interface Repository {
  get(query);
  getOne(query: any);
  save(data: any);
  update(id: string, data: any);
  delete(id: string);
}