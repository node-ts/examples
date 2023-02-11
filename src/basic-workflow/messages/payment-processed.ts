import { Event } from '@node-ts/bus-messages'

export class PaymentProcessed extends Event {
  $name = 'accounts/payment-processed'
  $version = 1

  constructor (
    readonly paymentId: string
  ) {
    super()
  }
}