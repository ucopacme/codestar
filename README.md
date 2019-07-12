# codestar cli bootstrap

# deploy with cli

```
aws cloudformation deploy --stack-name codestar-toolchain-test --template-file toolchain.json --parameter-overrides ProjectId=shalomfargate --tags Application=shalomfargate ProductOwner=eric.odell@ucop.edu Environment=Test Source=`git remote -v |grep fetch | awk '{print $2}'` --capabilities CAPABILITY_NAMED_IAM
```
