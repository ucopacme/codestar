import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');

export class BaseAppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    // Project Id parameter
    new cdk.CfnParameter(this, 'ProjectId', {
    type: 'String',
    default: "manhatten",
    });


        // Logging bucket
    const LogBucket = new s3.Bucket(this, 'Logs', {
      encryption: s3.BucketEncryption.KMS_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    });

    let cfnLogBucket = LogBucket.node.findChild('Resource') as s3.CfnBucket
    cfnLogBucket.addPropertyOverride("AccessControl", "LogDeliveryWrite")

    // Data bucket
    const DataBucket = new s3.Bucket(this, 'Data', {
      encryption: s3.BucketEncryption.KMS_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    });

    let cfnDataBucket = DataBucket.node.defaultChild as s3.CfnBucket;
    cfnDataBucket.addPropertyOverride('LoggingConfiguration.DestinationBucketName', LogBucket.bucketName);

    new cdk.CfnOutput(this, 'LogBucket', { value: LogBucket });

  }

}
