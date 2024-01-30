
# MS-PAYMENT

Microservice responsible for managing payments. In this microservice, we use a clean architecture. 
In addition, we have integrated our microservice with the mercado-pago API and Jest to tests. 
Our application uses Nodejs 18.


### What I need?
With this structure, your environment will have everything you need to build a project:

Node, docker and docker-compose
Kubectl and minikube (to deploy the application to a Kubernetes cluster)
### Running the application on a local Kubernetes cluster

- `minikube start`: starts the minikube to create a Kubernetes cluster.
- `cd orders-project-clean-architecture`: to be in the project's root directory
- `minikube ip`: get the minikube IP address


Now, you need to set this <b>IP Address</b> on Kubernetes Service (service.yaml) in externalIPs field:

```
spec:
  type: LoadBalancer
  ports:
  - name: "http"
    port: 4004
    targetPort: 4004
  externalIPs:
  - your-minikube-ip
  selector:
    app: orders-project
```

Then you can deploy the application to the cluster:

- `kubectl apply -f deploy/`: apply all configuration files from the deploy folder to the created cluster.
- `kubectl port-forward <name-of-the-pod> 4004:4004`: run the application on your machine using the port 4004.
### Running the application directly on your local machine

You can use these commands to start the application:

- `docker build -t order . --no-cache`
- `docker-compose up -d --force-recreate`

Docker-compose is set to start an instance of Postgres and the entire application.

- `npm i`: install all dependencies
- ` node src/main/index.js`: run server


### Swagger
http://localhost:4004/payment/api-docs

### Project architecture

This project was built using Clean Architecture and SOLID principles.

To separate concerns, the application was built with a Clean Architecture. It is divided into Domain, Application, Infra and Main layers.

## Directory Structure:

```bash
============= APPLICATION LAYER =====================================================================
Service: 
paymentService.js // Contains application logic, acting as an intermediary layer between interfaces 
and business logic. It is responsible for coordinating operations and manipulating data as needed.


============= DOMAIN LAYER =====================================================================
paymentRepository.js //Represents the repository layer, responsible for defining interfaces that abstract 
data access. These interfaces are implemented in the infrastructure layers.

paymentUseCase.js //Contains domain-specific use cases, implementing the core business logic.

============= INFRA LAYER =====================================================================
apis
  L mercadoPagoApi.js //Implements communication with the Mercado Pago API, encapsulating 
  infrastructure details related to this specific integration.
           
http             
  L generalErrors.js //Defines general errors that can be used across various layers to ensure consistency.

============= INTERFACES LAYER =====================================================================
controllers
 L paymentController.js //Responsible for handling HTTP requests and coordinating communication 
 between application and domain layers.


swagger
  L api_doc.yaml  //API documentation using the Swagger format, providing a clear specification of 
  available endpoints.


validators
  L findProcess 
   L findPaymentSchema.js  //Defines validation schemas using Joi to ensure input data meets requirements.   
   L findPaymentValidator.js //Responsible for validating input data based on the defined schemas.              
  L paymentProcess   
   L paymentProcessSchema.js  //Defines validation schemas using Joi to ensure input data meets requirements. 
   L paymentProcessValidator.js //Responsible for validating input data based on the defined schemas.         
    
============= MAIN LAYER =====================================================================
express
  L server.js //Initializes the Express server and related configurations.
routes
  L payment.js //Defines application routes, connecting HTTP requests to the appropriate controllers.
.env                  
index.js //Main entry point, initializes and connects different parts of the application.            
```
### What we use?

#### Environment

- [Node](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

- [MercadoPago] (https://github.com/mercadopago/sdk-nodejs) This library provides developers with a simple set of bindings to help you integrate Mercado Pago API to a website and start receiving payments.
