import { Workflow, WorkflowMapper } from '@node-ts/bus-core'
import { BasicWorkflowState } from './basic-workflow-state'
import { ProductPurchased, PaymentProcessed, ProductShipped, ProcessPayment, ShipProduct } from './messages'
import * as uuid from 'uuid'

export class BasicWorkflow extends Workflow<BasicWorkflowState> {

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
    const processPayment = new ProcessPayment(
      uuid.v4()
    )
    await this.bus.send(processPayment)
    return { 
      paymentId: processPayment.paymentId
    }
  }

  async shipProduct (event: PaymentProcessed) {
    const shipProduct = new ShipProduct(
      uuid.v4()
    )
    await this.bus.send(shipProduct)
    return {
      shipmentId: shipProduct.shipmentId
    }
  }

  complete () {
    return this.completeWorkflow()
  }
}