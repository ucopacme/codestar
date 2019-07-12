# Helpful hints

You'll need to install npm packages listed in packages.json

```
npm install
```

# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk synth`       emits the synthesized CloudFormation template, also creates synthesized stack templates in cdk.out
 * `for i in cdk.out/*Stack.template.json; do cfn_nag_scan -i $i; done`   scan synthesized stack templates in cdk.out
 * `cdk deploy --require-approval never -t Application=demo -t ProductOwner=eric.odell@ucop.edu -t Environment=dev`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
