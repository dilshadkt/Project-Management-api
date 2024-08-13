import { transporter } from '../config/nodemail';

export const sendOTP = (userEmail: string, otp: number) => {
  const mailOptions = {
    from: 'hmydilshadkt@gmail.com',
    to: userEmail,
    subject: 'Password Reset OTP',
    html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto;">
  <div style="text-align: center; margin-bottom: 30px;">
    <img src="https://i.ibb.co/W6yqmD3/29-Check-List.png" alt="Company Logo" style="height: 80px; width: auto;">
  </div>
  <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <h2 style="color: #FFD84E; text-align: center; font-size: 28px; margin-bottom: 20px;">Team Organic Mind</h2>
    <h3 style="color: #4CAF50; text-align: center; font-size: 24px; margin-bottom: 30px;">Password Reset OTP</h3>
    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Your One-Time Password (OTP) for password reset is:</p>
    <div style="background-color: #f9f9f9; border: 2px dashed #4CAF50; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
      <p style="font-size: 36px; font-weight: bold; color: #ff5733; letter-spacing: 5px; margin: 0;">${otp}</p>
    </div>
    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 30px;">This OTP will expire in 10 minutes. Please use it to reset your password.</p>
    <div style="text-align: center; margin-bottom: 30px;">
      <a href="#" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px; font-weight: bold;">Reset Password</a>
    </div>
    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
    <p style="font-size: 14px; color: #777; text-align: center; margin-bottom: 0;">If you didn't request this, please ignore this email or <a href="#" style="color: #4CAF50; text-decoration: none;">contact support</a> if you have any concerns.</p>
  </div>
  <div style="text-align: center; margin-top: 30px;">
    <p style="font-size: 14px; color: #777;">© 2024 Team Organic Mind. All rights reserved.</p>
    <div style="margin-top: 10px;">
      <a href="#" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
      <a href="#" style="color: #4CAF50; text-decoration: none; margin: 0 10px;">Terms of Service</a>
    </div>
  </div>
</div>
      `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
