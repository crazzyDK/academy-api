import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
// import transporter from '../config/nodeMailer.js';

export const RegisterMail = (req, res) => {
  const { email, name } = req.body;

  let config = {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass:  process.env.GMAIL_PASS,
    }
  }
  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'NoName Academy',
      link: 'https://nonametech.info',
    },
  });

  let response = {
    body: {
      name: name,
      intro: 'Thank you for registering for our courses. We are delighted to welcome you to our esteemed community of learners and professionals. Your registration has been successfully completed, and you are now a valued member of our platform. We are committed to providing you with a rich learning experience and the support you need to achieve your educational and career goals.',
      outro: 'If you have any questions or need assistance, please do not hesitate to reach out to our support team. We look forward to your active participation and wish you great success in your learning journey with us.',
    },
  }

  let mail = mailGenerator.generate(response);
  let message = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Welcome to NoName Academy',
    html: mail,
  }

  transporter.sendMail(message).then(() => {
    return res.status(201)
  })
};

export const CourseRegisterMail = (req, res) => {
  const { email, name } = req.body;

  let config = {
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass:  process.env.GMAIL_PASS,
    }
  }
  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'NoName Academy',
      link: 'https://nonametech.info',
    },
  });

  let response = {
    body: {
      name: name,
      intro: 'Our Team will be Contact you',
      outro: 'If you have any questions or need assistance, please do not hesitate to reach out to our support team. We look forward to your active participation and wish you great success in your learning journey with us.',
    },
  }

  let mail = mailGenerator.generate(response);
  let message = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Welcome to NoName Academy',
    html: mail,
  }

  transporter.sendMail(message).then(() => {
    return res.status(201)
  })
};

function Config(req, res) {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    },
    tls: {
      rejectauthorozed: false,
    }
  }
};


export const ScheduleMail = () => {

  Config();

  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
    theme: "defalut", 
    product : {
      name : "NoName Academy",
      link : "https://nonameacademy.edu"
    }
  })

  let response = {
    body :{
      intro: "Welcome",
      outro : "Thank You"
    }
  }
  let mail = mailGenerator.generate(response);
  let message = {
    from : "dk9232525@gmailcom",
    to: "mrvarandi360@gmail.com",
    subject: "Alert mail",
    html: mail
  }

  try {
    transporter.sendMail(message).then(() => {
      console.log("Mail Send Successfully!");
    })
  } catch (error) {
    return "Error: " + error.message;
  }
}