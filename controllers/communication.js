import axios from "axios"
const postmarkApiKey = process.env.POSTMARK_SERVER_API_TOKEN;

const composeEmail = async (req, res) => {
  try {
    console.log(req.body);
    console.log("comose email")
    const { to, HtmlBody, Subject } = req.body;

    // Replace the following block with actual Postmark API integration
    const response = await axios.post(
      'https://api.postmarkapp.com/email',
      {
        From: '20bec055@iiitdwd.ac.in',
        To: to,
        Subject: Subject,
        HtmlBody: htmlBody,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Postmark-Server-Token': postmarkApiKey,
        },
      }
    );

    // Check for a successful response (adjust as per Postmark API documentation)
    if (response.status === 200) {
      res.json({ message: 'Email sent successfully' });
    } else {
      console.error(response.data);
      res.status(500).json({ error: 'Error sending email' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error sending email' });
  }
};

export {
  composeEmail
}
