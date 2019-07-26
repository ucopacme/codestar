import cdk = require('@aws-cdk/core');
// import apigateway = require('@aws-cdk/aws-apigateway');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');
import elbv2 = require('@aws-cdk/aws-elasticloadbalancingv2');
import ecs_patterns = require('@aws-cdk/aws-ecs-patterns');

export class CdkFargateDemoStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create VPC
    // NOTE: Limit AZs to avoid reaching resource quotas
    const vpc = new ec2.Vpc(this, 'VPC', { maxAzs: 2 });

    // Create ECS Cluster
    const cluster = new ecs.Cluster(this, 'Cluster', { vpc });

    // load balanced fargate service
    const loadBalancedFargateService = new ecs_patterns.LoadBalancedFargateService(this, 'FargateService', {
    cluster,
    memoryLimitMiB: 1024,
    cpu: 512,
    image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
    });

    // Project Id parameter
    new cdk.CfnParameter(this, 'ProjectId', {
    type: 'String',
    default: "manhatten",
    });

    // Output ALB DNS
    new cdk.CfnOutput(this, 'LoadBalancerDNS', { value: loadBalancedFargateService.loadBalancer.loadBalancerDnsName });
  }

}
