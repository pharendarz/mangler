export class CounterModel {
  constructor(
    public name: string,
    public date: number,
    public lastRelapse: number,
    public relapseExist: boolean,
    public relapseCounter: number
  ) {}
}
