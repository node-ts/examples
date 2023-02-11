import { BusInstance, Handler } from '@node-ts/bus-core'
import { PaymentProcessed, ProcessPayment } from '../messages'
import { injectable } from 'inversify'

@injectable()
export class ProcessPaymentHandler implements Handler<ProcessPayment> {
  messageType = ProcessPayment

  constructor (
    private readonly bus: BusInstance
  ) {
  }
  
  async handle (command: ProcessPayment) {
    // ...
    await this.bus.publish(new PaymentProcessed(command.paymentId))
  }
}