import cdk = require("@aws-cdk/core");
import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import ecsPatterns = require("@aws-cdk/aws-ecs-patterns");

export class CdkDCLStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "DCLVpc");

    const cluster = new ecs.Cluster(this, "DCLCluster", {
      vpc: vpc
    });

    // Create a load-balanced Fargate service and make it public
    new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      "DCLFargateService",
      {
        cluster: cluster,
        cpu: 256,
        desiredCount: 1,
        taskImageOptions: {
          // image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample")
          image: ecs.ContainerImage.fromAsset(__dirname + "/../../image")
        },
        memoryLimitMiB: 512,
        publicLoadBalancer: true // Default is false
      }
    );
  }
}
