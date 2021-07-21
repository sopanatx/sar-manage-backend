import * as ejs from 'ejs';
import * as nodemailer from 'nodemailer';
import * as moment from 'moment';

const sendMail = async (
  type: string,
  email: string,
  fullname: string,
): Promise<any> => {
  const Time = moment()
    .locale('th') //Set Time Format Language To Thai
    .format('llll');

  let htmlData: string;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    if (type === 'resetPassword') {
    } else if (type === 'verifyEmail') {
    } else if (type == 'updateAccountByAdmin') {
      htmlData = await ejs.renderFile('./src/shared/template.ejs', {
        url_link: ``,
        request_time: Time,
        name: fullname,
        subheader: 'แจ้งเตือนการแก้ไขบัญชีโดยผู้ดูแลระบบ', // subheader text in email.
        mailHeader: 'แจ้งเตือนการแก้ไขบัญชีโดยผู้ดูแลระบบ',
        mailText1:
          'อีเมลฉบับนี้เป็นอีเมลแจ้งเตือนการแก้ไขบัญชีของท่านโดยผู้ดูแลระบบ',
        remark:
          'หากท่านไม่ได้ดำเนินการดังกล่าว โปรดติดต่อผู้ดูแล หรือ ทำการเปลี่ยนรหัสผ่าน',
        buttonText: '',
        mailText2: '',
      });
    } else if (type == 'login') {
      htmlData = await ejs.renderFile('./src/shared/template.ejs', {
        url_link: ``,
        request_time: Time,
        name: fullname,
        subheader: 'แจ้งเตือนการเข้าสู่ระบบ SAR ITPSRU', // subheader text in email.
        mailHeader: 'แจ้งเตือนการเข้าสู่ระบบ SAR ITPSRU',
        mailText1: 'อีเมลฉบับนี้เป็นอีเมลแจ้งเตือนการเข้าสู่ระบบของท่าน',
        remark: 'หากท่านไม่ได้ดำเนินการดังกล่าวทำการเปลี่ยนรหัสผ่านทันที',
        buttonText: '',
        mailText2: '',
      });
    } else if (type == 'UpdateAccount') {
      htmlData = await ejs.renderFile('./src/shared/template.ejs', {
        url_link: ``,
        request_time: Time,
        name: fullname,
        subheader: 'แจ้งเตือนการแก้ไขบัญชีของท่าน', // subheader text in email.
        mailHeader: 'แจ้งเตือนการแก้ไขบัญชีของท่าน',
        mailText1: 'อีเมลฉบับนี้เป็นอีเมลแจ้งเตือนการแก้ไขบัญชีของท่าน',
        remark:
          'หากท่านไม่ได้ดำเนินการดังกล่าว โปรดติดต่อผู้ดูแล หรือ ทำการเปลี่ยนรหัสผ่าน',
        buttonText: '',
        mailText2: '',
      });
    }
    const replacements = {
      updateAccountByAdmin: {
        link: '',
        subject: '[SAR-ITPSRU] แจ้งเตือนการปรับปรุงข้อมูลบัญชีของท่าน',
        text: 'แจ้งเตือนการปรับปรุงข้อมูลบัญชีของท่าน',
      },
      login: {
        link: '',
        subject: '[SAR-ITPSRU] แจ้งเตือนการเข้าสู่ระบบ SAR ITPSRU',
        text: 'แจ้งเตือนการเข้าสู่ระบบ SAR ITPSRU',
      },
      UpdateAccount: {
        link: '',
        subject: '[SAR-ITPSRU] แจ้งเตือนการปรับปรุงข้อมูลบัญชีของท่าน',
        text: 'แจ้งเตือนการปรับปรุงข้อมูลบัญชีของท่าน',
      },
    };

    const msg = {
      to: email, // Change to your recipient
      from: 'no-reply@itpsru.in.th', // Change to your verified sender
      subject: replacements[type].subject, // Subject line    ,
      text: replacements[type].text, // plaintext body,
      html: htmlData,
    };

    await transporter.sendMail(msg);
  } catch (error) {
    console.log(error);
  }
};
export default sendMail;
