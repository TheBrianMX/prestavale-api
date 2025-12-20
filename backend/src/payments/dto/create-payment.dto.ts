export class CreatePaymentDto {
  voucherId: number;
  amount: number;
  overpayment?: 'CREDIT' | 'IGNORE';
}
