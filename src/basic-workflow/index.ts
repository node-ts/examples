import 'reflect-metadata'

import { Bus, BusInstance, ClassConstructor, Workflow } from '@node-ts/bus-core'
import { BasicWorkflow } from './workflows'
import { ProductPurchased } from './messages'
import { ProcessPaymentHandler, ShipProductHandler } from './handlers'
import { InMemoryPersistence } from '@node-ts/bus-core/dist/workflow/persistence'
import { Container, decorate, injectable } from 'inversify'
import { SHARED_SYMBOLS } from './symbols'

const run = new Promise<void>(async resolve => {
  let bus: BusInstance

  // Register a DI container, Inversify is used here
  const container = new Container()
  decorate(injectable(), Workflow)
  container.bind(BasicWorkflow).toSelf()
  container.bind(ProcessPaymentHandler).toSelf()
  container.bind(ShipProductHandler).toSelf()
  // BusInstance is late bound, as `bus` is only assigned after initialization
  container.bind(BusInstance).toDynamicValue(() => bus)
  // This is used inside the workflow to signal it has run to completion
  container.bind(SHARED_SYMBOLS.doneCallback).toConstantValue(resolve)
  
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

  // Start the bus listening for messages
  await bus.start()

  // Push out a message that should start a new `BasicWorkflow`
  await bus.publish(new ProductPurchased())
})

run.then(() => console.log('workflow complete'))