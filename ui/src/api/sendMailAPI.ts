type sendMailType = {
  contact: string;
  history?: Array<string>;
  name: string;
};

const sendMailAPI = (data: sendMailType) =>
  fetch(`${process.env.REACT_APP_GCP_CLOUD_FUNCTIONS_API}/sendMail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.status === 200)
    .catch((response) => response.status === 200);

export default sendMailAPI;
