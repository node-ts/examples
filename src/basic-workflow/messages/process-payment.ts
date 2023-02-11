import { Command } from '@node-ts/bus-messages'

export class ProcessPayment extends Command {
  $name = 'accounts/process-payment'
  $version = 1

  constructor (
    readonly paymentId: string
  ) {
    super()
  }
}