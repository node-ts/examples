import { Bus } from '@node-ts/bus-core'
import { BasicWorkflow } from './basic-workflow'

export const app = {
  run: async () => {
    const bus = await Bus.configure()
      .withWorkflow(BasicWorkflow)
      .initialize()

      
  }
}