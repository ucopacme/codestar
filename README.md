# codestar cli bootstrap

# bootstrap a codestar template from a toolchain and source
Create an init file with cli

```
aws codestar create-project --generate-cli-skeleton |jq .
{
  "name": "",
  "id": "",
  "description": "",
  "clientRequestToken": "",
  "sourceCode": [
    {
      "source": {
        "s3": {
          "bucketName": "",
          "bucketKey": ""
        }
      },
      "destination": {
        "codeCommit": {
          "name": ""
        },
        "gitHub": {
          "name": "",
          "description": "",
          "type": "",
          "owner": "",
          "privateRepository": true,
          "issuesEnabled": true,
          "token": ""
        }
      }
    }
  ],
  "toolchain": {
    "source": {
      "s3": {
        "bucketName": "",
        "bucketKey": ""
      }
    },
    "roleArn": "",
    "stackParameters": {
      "KeyName": ""
    }
  },
  "tags": {
    "KeyName": ""
  }
}
```

Modify init template to suit your needs (note that you'll chose github or codecommit for
the sourcecode. You may remove other paramaters as needed eg
clientRequestToken):

```
cat /tmp/init-template.json

{
  "name": "YoFargate",
  "id": "yofargate",
  "description": "Make Applications Great Again",
  "sourceCode": [
    {
      "source": {
        "s3": {
          "bucketName": "yourcodestarsourcebucket",
          "bucketKey": "templates/codestar/src/HelloFargate.zip"
        }
      },
      "destination": {
        "codeCommit": {
          "name": "yofargate"
        }
      }
    }
  ],
  "toolchain": {
    "source": {
      "s3": {
        "bucketName": "yourcodestarsourcebucket",
        "bucketKey": "templates/codestar/toolchain.json"
      }
    },
    "roleArn": "yourcodestarservicerolearn",
    "stackParameters": {
      "ProjectId": "yofargate"
    }
  },
  "tags": {
    "Application": "yofargate"
  }
}

Create your new codestar project 
```
aws codestar create-project --cli-input-json file:///tmp/init-template.json
```

```

# test or modify the toolchain of existing codestar project
modify toolchain cft template and then updating the toolchain stack with cli:

```
aws cloudformation deploy --stack-name codestar-toolchain-test --template-file toolchain.json --parameter-overrides ProjectId=shalomfargate --tags Application=shalomfargate ProductOwner=eric.odell@ucop.edu Environment=Test Source=`git remote -v |grep fetch | awk '{print $2}'` --capabilities CAPABILITY_NAMED_IAM
```

# toolchain and source

Must be stored in s3 so make an s3 available to your accounts.
upload toolchain.json (diff names if you want diff toolchains) and a source
object, cf [cli tutorial](https://docs.aws.amazon.com/codestar/latest/userguide/cli-tutorial.html)
