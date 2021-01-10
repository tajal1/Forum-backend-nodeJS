const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const log = console.log;

module.exports = {
    OTPSending: (email, otp) => {
        let transporter = nodemailer.createTransport({
            service:"gmail",
            // host: "smtp.mailtrap.io",
            // port: 2525,
            // secure: false,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass:process.env.PASSWORD
                // user: "de7231dadc5a11", // generated ethereal user
                // pass: "86e8bb7bb7d3f2", // generated ethereal password
            },
        });

        let info = transporter.sendMail({
            from: process.env.EMAIL_ADDRESS , // sender address
            to: `${email}`, // list of receivers
            subject: "Change password otp", // Subject line
            html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="format-detection" content="date=no"/>
    <meta name="format-detection" content="address=no"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="x-apple-disable-message-reformatting"/>
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet"/>
    <link href="css/style.css" rel="stylesheet"/>
    <title>Welcome</title>

</head>
<body class="body"
      style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#F8F8F8 !important; -webkit-text-size-adjust:none;">
<span class="mcnPreviewText"
      style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;">*|MC_PREVIEW_TEXT|*</span>

<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#F8F8F8">
    <tr>
        <td align="center" valign="top">
            <table width="550" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                <tr>
                    <td class="td container"
                        style="width:550px; min-width:550px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:0px 0px 40px 0px;">


                        <!--------------------------Header--------------------------------------------->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td class="p30-15" style="padding: 30px 0px 40px 0px; background-color: #FFFFFF;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <th class="column-top" width="145"
                                                style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td class="img m-center"
                                                            style="font-size:0pt; line-height:0pt; text-align:center;">
<!--                                                            working-->

                                                            <a href="#">
                                                                <img src="https://efrana.github.io/Tech_blogV1.2UI/img/uplogo.png" width="400" height="35"
                                                                     edit="image_1" style="max-width:250px;" border="0"
                                                                     alt=""/>
                                                            </a></td>
                                                    </tr>
                                                </table>
                                            </th>
                                            <th class="column-empty" width="1"
                                                style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!--------------------------------------- END Header ----------------------------------->

                        <!-------------------------------------------- Nav Menu------------------------------->


                        <div repeatable="Select" variant="Hero">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" valign="top"
                                        style="padding: 20px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 40px;">
                                        <h1 style="font-size: 48px; font-weight: 400; margin: 2px;">Welcome!</h1> <img
                                            src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125"
                                            height="120" style="display: block; border: 0px;">
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div repeatable="Select" variant="Hero">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="left"
                                        style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                        <p style="margin: 0;">If you forget your password then use this OTP to change your password.</p>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div repeatable="Select" variant="Hero">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a
                                                        href="" target="_blank"
                                                        style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 20px 25px; border-radius: 2px; border: 1px solid #62CF6F; display: inline-block; background-color: #62CF6F">
                                                    ${otp}</a></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div repeatable="Select" variant="Hero">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <td bgcolor="#ffffff" align="left"
                                    style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">If that doesn't work, Please resend your OTP and use it</p>
                                </td>
                            </table>
                        </div>

                        <div repeatable="Select" variant="Hero">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <td bgcolor="#ffffff" align="left"
                                    style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">https://google.com</a>
                                    </p>
                                </td>
                            </table>
                        </div>

                        <div repeatable="Select" variant="Hero">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <td bgcolor="#ffffff" align="left"
                                    style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">If you have any questions, just reply to this email—we're
                                        always happy to help out.</p>
                                </td>
                            </table>
                        </div>
                        <div repeatable="Select" variant="Hero">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <td bgcolor="#ffffff" align="left"
                                    style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Cheers,<br>BBB Team</p>
                                </td>
                            </table>
                        </div>

                        <!-------------------------- END Hero Section ------------------------->

                        <!------------------------------------------- Footer Start-------------------------->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td class="p30-15" style="padding: 50px 30px;" bgcolor="#62CF6F">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">

                                        <tr>
                                            <td class="text-footer1 pb10"
                                                style="color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;">
                                                <div edit="text_35">Need more help?</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-footer2 pb30"
                                                style="color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:30px;">
                                                <div edit="text_36">We’re here to help you out</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-footer3"
                                                style="color:#ffffff; font-family:'Roboto', Arial,sans-serif; font-size:12px; line-height:18px; text-align:center;">
                                                <div edit="text_37"><a class="link3-u" target="_blank" href="*|UNSUB|*"
                                                                       style="color:#ffffff; text-decoration:underline;">Unsubscribe</a>
                                                </div>
                                                from this mailing list.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="img" style="font-size:0pt; line-height:0pt; text-align:left;">
                                                <div edit="text_38">
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!------------------------------------------ END Footer ----------------------->


                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>



<!--<h1> Your password change code is : ${otp}</h1>-->`, // html body
        });
    }
}