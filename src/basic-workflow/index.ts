import 'reflect-metadata'

import { Bus, BusInstance, ClassConstructor, Workflow } from '@node-ts/bus-core'
import { BasicWorkflow } from './workflows'
import { ProductPurchased } from './messages'
import { ProcessPaymentHandler, ShipProductHandler } from './handlers'
import { InMemoryPersistence } from '@node-ts/bus-core/dist/workflow/persistence'
import { Container, decorate, injectable } from 'inversify'

const run = async () => {

  let bus: BusInstance

  const container = new Container()
  decorate(injectable(), Workflow)
  container.bind(BasicWorkflow).toSelf()
  container.bind(ProcessPaymentHandler).toSelf()
  container.bind(ShipProductHandler).toSelf()

  container.bind(BusInstance).toDynamicValue(() => bus)
  
  bus = await Bus.configure()
    .withWorkflow(BasicWorkflow)
    .withHandler(ProcessPaymentHandler)
    .withHandler(ShipProductHandler)
    .withPersistence(new InMemoryPersistence())
    .withContainer({
      get <T>(type: ClassConstructor<T>) {
        return container.get<T>(type)
      }
    })
    .initialize()

  await bus.start()
  console.log('publishing event')
  await bus.publish(new ProductPurchased())
}

run()