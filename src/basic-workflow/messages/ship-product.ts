import { Command } from '@node-ts/bus-messages'

export class ShipProduct extends Command {
  $name = 'fulfilment/ship-product'
  $version = 1

  constructor (
    readonly shipmentId: string
  ) {
  }
}