import { WorkflowState } from '@node-ts/bus-core'

export class BasicWorkflowState extends WorkflowState {
  $name = 'BasicWorkflowState'

  paymentId: string | undefined
  shipmentId: string | undefined
}