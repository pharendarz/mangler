export class RelapseItem {
  constructor(public relapseId: number, public date: string, public reason: string, private poolRef: number = 59 ) {}
}
