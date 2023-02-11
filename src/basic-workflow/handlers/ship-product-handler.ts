import { BusInstance, Handler } from '@node-ts/bus-core'
import { ProductShipped, ShipProduct } from '../messages'
import { injectable } from 'inversify'

@injectable()
export class ShipProductHandler implements Handler<ShipProduct> {
  messageType = ShipProduct

  constructor (
    private readonly bus: BusInstance
  ) {
  }
  
  async handle (command: ShipProduct) {
    // ...
    await this.bus.publish(new ProductShipped(command.shipmentId))
  }
}