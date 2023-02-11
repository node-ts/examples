# @node-ts/examples BasicWorkflow

This folder contains a sample implementation for using a workflow with a DI container. 

The use case behind this is a simple order fulfilment process, where a product is ordered, its payment processed, and then finally shipped before completing the workflow.

The handlers are all implemented locally, however these could just as easily live in separate microservices each with their own queue and set of responsibilities. 

By employing a workflow for this process, each step can be broken down into its own unit-of-work (ie: processing the payment, shipping the product). Since these are queue driven, they are naturally fault tolerant. For instance, an outage in our 3rd party payment gateway would stop payments from being processed. When the outage concludes the payment service will automatically retry to process queued payments through to success, before proceeding to the next step in the workflow. 
