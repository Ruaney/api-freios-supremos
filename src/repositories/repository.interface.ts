export interface Repository {
  get();
  getOne(query: any);
  save(data: any);
  update(data: any);
}