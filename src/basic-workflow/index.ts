import { Bus } from '@node-ts/bus-core'
import { BasicWorkflow } from './workflows'
import { ProductPurchased } from './messages'

const run = async () => {
  const bus = await Bus.configure()
    .withWorkflow(BasicWorkflow)
    .initialize()

  await bus.start()
  await bus.publish(new ProductPurchased())
}

run()