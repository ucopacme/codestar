import cdk = require('@aws-cdk/core');
// import apigateway = require('@aws-cdk/aws-apigateway');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');
import ecs_patterns = require('@aws-cdk/aws-ecs-patterns');
import lambda = require('@aws-cdk/aws-lambda');


export class CdkFargateDemoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create VPC
    // NOTE: Limit AZs to avoid reaching resource quotas
    const vpc = new ec2.Vpc(this, 'VPC', { maxAzs: 2 });

    // Create ECS Cluster
    const cluster = new ecs.Cluster(this, 'Cluster', { vpc });

    // create Logs
    const logging = new ecs.AwsLogDriver({
      streamPrefix: "HelloFargate",
    })

    // create task
    const taskDef = new ecs.FargateTaskDefinition(this, "HelloFargateTaskDefinition", {
      memoryLimitMiB: 512,
      cpu: 256,
    })
    
    taskDef.addContainer("AppContainer", {
      image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
      logging,
    })

    // Instantiate ECS Service with just cluster and image
    new ecs.FargateService(this, "HelloFargateService", {
      cluster,
      taskDefinition: taskDef
    });

    // Output the DNS where you can access your service
    new cdk.CfnOutput(this, 'LoadBalancerDNS', { value: fargateService.loadBalancer.loadBalancerDnsName });
  }

}
