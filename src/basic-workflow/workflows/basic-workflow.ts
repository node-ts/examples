import { BusInstance, Workflow, WorkflowMapper } from '@node-ts/bus-core'
import { BasicWorkflowState } from './basic-workflow-state'
import { ProductPurchased, PaymentProcessed, ProductShipped, ProcessPayment, ShipProduct } from '../messages'
import * as uuid from 'uuid'
import { injectable, inject } from 'inversify'
import { SHARED_SYMBOLS } from '../symbols'

@injectable()
export class BasicWorkflow extends Workflow<BasicWorkflowState> {

  constructor (
    private readonly bus: BusInstance,
    @inject(SHARED_SYMBOLS.doneCallback) private readonly done: () => void
  ) {
    super()
  }

  configureWorkflow(
    mapper: WorkflowMapper<BasicWorkflowState, any>
  ): void {
    mapper
      .withState(BasicWorkflowState)
      .startedBy(ProductPurchased, 'processPayment')
      .when(PaymentProcessed, 'shipProduct')
      .when(ProductShipped, 'complete')
  }

  async processPayment (event: ProductPurchased) {
    console.log('product purchased, processing payment', { event })
    const processPayment = new ProcessPayment(
      uuid.v4()
    )
    await this.bus.send(processPayment)
    return { 
      paymentId: processPayment.paymentId
    }
  }

  async shipProduct (event: PaymentProcessed) {
    console.log('payment processed, shipping product', { event })
    const shipProduct = new ShipProduct(
      uuid.v4()
    )
    await this.bus.send(shipProduct)
    return {
      shipmentId: shipProduct.shipmentId
    }
  }

  complete () {
    console.log('product shipped, completing workflow')
    this.done()
    return this.completeWorkflow()
  }
}