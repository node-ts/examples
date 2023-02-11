import { Event } from '@node-ts/bus-messages'

export class ProductPurchased extends Event {
  $name = 'orders/product-purchased'
  $version = 1
}