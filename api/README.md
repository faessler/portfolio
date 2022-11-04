# Portfolio GCP sendMail
This repository contains the code for the sendMail Google Cloud Function.
The Google Cloud Function enables the [portfolio frontend](https://github.com/faessler/portfolio) to send a mail at the end of the chat.

## Usage
```
type sendMailType = {
  contact: string;
  history: Array<string>;
  name: string;
};

const sendMailAPI = (data: sendMailType) =>
  fetch("https://europe-west6-portfolio-252220.cloudfunctions.net/sendMail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
```
