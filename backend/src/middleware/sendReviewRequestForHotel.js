const cron = require("node-cron");
const Order = require("../models/Order");
const sendMail = require("../util/sendMail");

const sendReviewRequestForHotel = () => {
  // Chạy cron mỗi ngày lúc 00:00
  cron.schedule("0 0 * * *", async () => {
    console.log("Running review request job for hotel...");

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Ngày mai

    try {
      // Tìm các order liên quan đến khách sạn có ngày đặt là ngày mai
      const orders = await Order.find({
        serviceType: "Hotel", // Chỉ lấy các order liên quan đến khách sạn
        bookingDate: {
          $gte: new Date(tomorrow.setHours(0, 0, 0, 0)), // Bắt đầu ngày mai
          $lt: new Date(tomorrow.setHours(23, 59, 59, 999)), // Kết thúc ngày mai
        },
      });

      for (const order of orders) {
        const reviewLink =
          "http://localhost:3000/hotelInfo?id=${order.serviceId";
        const email = order.contactInfo?.email || order.guestInfo?.email;

        if (email) {
          const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Đánh giá dịch vụ</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  color: #333;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 5px;
                  background-color: #f9f9f9;
                }
                .header {
                  background-color: #4caf50;
                  color: #fff;
                  padding: 10px;
                  text-align: center;
                  border-radius: 5px 5px 0 0;
                }
                .content {
                  padding: 20px;
                }
                .footer {
                  padding: 10px;
                  text-align: center;
                  font-size: 12px;
                  color: #666;
                }
                .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin-top: 20px;
                  background-color: #4caf50;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                }
                .button:hover {
                  background-color: #45a049;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Yêu cầu đánh giá dịch vụ</h2>
                </div>
                <div class="content">
                  <p>Chào bạn,</p>
                  <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Chúng tôi rất mong nhận được đánh giá của bạn để cải thiện chất lượng dịch vụ.</p>
                  <p>Vui lòng nhấn vào nút bên dưới để đánh giá:</p>
                  <a href="${reviewLink}" class="button">Đánh giá ngay</a>
                  <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
                </div>
                <div class="footer">
                  Trân trọng,<br>
                  Đội ngũ hỗ trợ của Mytour
                </div>
              </div>
            </body>
            </html>
          `;

          // Gửi email
          await sendMail.sendMail({
            email,
            subject: "Yêu cầu đánh giá dịch vụ",
            html,
          });
        }
      }

      console.log("Review request job for hotel completed!");
    } catch (error) {
      console.error(
        "Error during review request job for hotel:",
        error.message
      );
    }
  });
};

module.exports = sendReviewRequestForHotel;
