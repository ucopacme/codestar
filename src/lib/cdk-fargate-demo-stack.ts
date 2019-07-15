import cdk = require('@aws-cdk/core');
// import apigateway = require('@aws-cdk/aws-apigateway');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');
import elbv2 = require('@aws-cdk/aws-elasticloadbalancingv2');


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
    const service = new ecs.FargateService(this, "HelloFargateService", {
      cluster,
      taskDefinition: taskDef
    });

    // Application Load Balancer
    const alb = new elbv2.ApplicationLoadBalancer(this, 'ALB', { vpc, internetFacing: true });
    const listener = alb.addListener('Listener', { port: 80 });
    const target = listener.addTargets('ECS', {
    port: 80,
    targets: [service]
    });

    // Output ALB DNS
    new cdk.CfnOutput(this, 'LoadBalancerDNS', { value: alb.loadBalancerDnsName });
  }

}
