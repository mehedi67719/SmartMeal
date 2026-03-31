export interface Member {
  id: string;
  name: string;
  totalMeals: number;
  totalDeposit: number;
  cost: number;
  due: number;
  status: 'due' | 'paid' | 'extra';
}