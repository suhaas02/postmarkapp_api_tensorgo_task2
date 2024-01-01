// const postmark = require('postmark');
// import postmark from 'postmark'
// import { ServerClient } from 'postmark';
// const client = new postmark.ServerClient('c182d055-763e-494c-ac95-641bef4dd49a');

// module.exports = {
//   sendEmail: async (to, subject, htmlBody) => {

//     const email = {
//       From: '20bec055@iiitdwd.ac.in',
//       To: to,
//       Subject: subject,
//       HtmlBody: htmlBody,
//     };

//     try {
//       const data = await client.sendEmail(email);

//       if (data.Message) {
//         return {
//           ...data,
//         };
//       } else {
//         throw data;
//       }
//     } catch (err) {
//       throw err;
//     }
//   },
// };

import { ServerClient } from 'postmark';

const client = new ServerClient('c182d055-763e-494c-ac95-641bef4dd49a');

const sendEmail = async (to, subject, htmlBody) => {
  const email = {
    From: '20bec055@iiitdwd.ac.in',
    To: to,
    Subject: subject,
    HtmlBody: htmlBody,
  };

  try {
    const data = await client.sendEmail(email);

    if (data.Message) {
      return {
        ...data,
      };
    } else {
      throw data;
    }
  } catch (err) {
    throw err;
  }
}

export {
  sendEmail
};

