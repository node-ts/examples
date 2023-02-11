import { Event } from '@node-ts/bus-messages'

export class ProductShipped extends Event {
  $name = 'fulfilment/product-shipped'
  $version = 1
}