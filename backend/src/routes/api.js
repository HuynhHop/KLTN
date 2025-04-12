const express = require("express");
const multer = require("multer");

const userController = require("../controllers/userController");
const roleController = require("../controllers/roleController");
const { verifyAccessToken, isAdmin } = require("../middleware/jwt");
const chatHistory = require("../controllers/ChatHistoryController.js");
const AIController = require("../controllers/AIController");
const paymentController = require("../controllers/paymentController.js");
const supportRequestController = require("../controllers/supportRequestController.js");
const notificationController = require("../controllers/notificationController.js");
const orderController = require("../controllers/orderController");
const hotelController = require("../controllers/hotelController");
const flightController = require("../controllers/flightController");
const voucherController = require("../controllers/voucherController");
const BlogController = require("../controllers/BlogController");
const historyController = require("../controllers/historyController");
const bookingController = require("../controllers/bookingController");
const tourController = require("../controllers/tourController");

const upload = multer({ dest: "uploads/" });
const { imageUpload } = require("../config/cloudinary");

const router = express.Router();

router.post(
  "/hotels/create",
  imageUpload.array("images", 15),
  hotelController.createHotel
);
router.get("/hotels/", hotelController.getAllHotel);
router.get("/hotels/:id", hotelController.getHotelById);
router.get("/hotels/province/:province", hotelController.getHotelsByProvince);
router.get("/hotels/district/:district", hotelController.getHotelsByDistrict);
router.put(
  "/hotels/:id",
  imageUpload.array("images", 15),
  hotelController.updateHotel
);
router.delete("/hotels/:id", hotelController.deleteHotel);

router.get("/orders", orderController.getAllOrder);
router.get("/orders/user/:userId", orderController.getByUser);
router.put("/orders/:id/status", orderController.updateStatusOrder);

router.post("/flights/create", flightController.createFlight);
router.put("/flights/:id", flightController.updateFlight);
router.delete("/flights/:id", flightController.deleteFlight);

router.post("/vouchers", voucherController.createVoucher);
router.get("/vouchers/apply", voucherController.applyVoucher);

router.post("/blogs/create", BlogController.create);
router.put("/blogs/:id", BlogController.update);
router.delete("/blogs/:id", BlogController.delete);
router.post("/blogs/:id/comment", BlogController.comment);
router.get("/blogs/:id/comments", BlogController.getComments);

router.post("tours/create", tourController.createTour);
router.get("tours/", tourController.getAllTour);
router.get("tours/:id", tourController.getOneTour);
router.put("tours/:id", tourController.updateTour);
router.delete("tours/:id", tourController.deleteTour);

router.post("booking/create", bookingController.createBooking);
router.get("booking/", bookingController.getAllBookings);
router.put("booking/:id/status", bookingController.updateStatus);

router.get("history/:userId", historyController.getHistoryByUser);

// API User
router.put("/user/update-password", userController.updatePassword);
router.get("/user/count", userController.countUsers);
router.get(
  "/user/getUserToken",
  verifyAccessToken,
  userController.getUserFromToken
);
router.post("/user/forgotPassword", userController.forgotPassword);
router.get("/user/editProfileSendOTP", userController.editProfileSendOTP);
router.post("/user/sendOTP", userController.sendOTP);
router.get("/user/resetPassword/:resetToken", userController.getResetToken);
router.get("/user/:id", userController.getById);
router.get("/user/", [verifyAccessToken, isAdmin], userController.getAll);
router.get("/user/staffs", userController.getAllStaff);
router.get("/user/customers", userController.getAllCustomer);

router.post("/user/current", verifyAccessToken, userController.current);
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.post("/user/loginGoogle", userController.loginWithGoogle);
router.post("/user/loginFacebook", userController.loginWithFacebook);
router.post("/user/createAccount", userController.createAccRole);

router.put("/user/refreshAccessToken", userController.refreshAccessToken);
router.post("/user/resetPassword", userController.resetPassword);
router.put(
  "/user/:uid",
  verifyAccessToken,
  isAdmin,
  userController.updateByAdmin
);
router.put("/user/", verifyAccessToken, userController.update);

router.delete(
  "/user/:id/force",
  [verifyAccessToken, isAdmin],
  userController.forceDelete
);
router.delete("/user/:id", [verifyAccessToken, isAdmin], userController.delete);

router.patch("/user/:id/restore", userController.restore);

// API Role
router.get("/role/:id", roleController.getById);
router.get("/role/", roleController.getAll);
router.post("/role/store", [verifyAccessToken, isAdmin], roleController.store);
router.put("/role/:id", [verifyAccessToken, isAdmin], roleController.update);
router.delete(
  "/role/:id/force",
  [verifyAccessToken, isAdmin],
  roleController.forceDelete
);
router.delete("/role/:id", [verifyAccessToken, isAdmin], roleController.delete);
router.patch(
  "/role/:id/restore",
  [verifyAccessToken, isAdmin],
  roleController.restore
);

// API ChatAI
router.post("/ai/chat", AIController.ChatAI);
// API ChatHistory
router.post(
  "/chathistory/save/:userId",
  verifyAccessToken,
  chatHistory.saveMessage
); // Lưu tin nhắn
router.get(
  "/chathistory/:userId",
  verifyAccessToken,
  chatHistory.getChatHistory
); // Lấy lịch sử trò chuyện
router.delete(
  "/chathistory/:userId",
  verifyAccessToken,
  chatHistory.deleteChatHistory
); // Xóa toàn bộ lịch sử trò chuyện

// API Payment
router.get("/payment/vnpay_return", paymentController.vnpayIpn);
router.get("/payment/vnpay_ipn", paymentController.vnpayIpn);

router.post("/payment/create_payment_url", paymentController.createPaymentUrl);
router.post("/payment/querydr", paymentController.queryTransaction);
router.post("/payment/refund", paymentController.refundTransaction);

// API Support Request
router.get("/supportrequest/", supportRequestController.getAllSupportRequests);
router.get(
  "/supportrequest/:id",
  supportRequestController.getSupportRequestById
);
router.post(
  "/supportrequest/create",
  supportRequestController.createSupportRequest
);
router.put(
  "/supportrequest/:id",
  supportRequestController.updateSupportRequest
);
router.delete(
  "/supportrequest/:id",
  supportRequestController.deleteSupportRequest
);

// API Notification
router.get("/", notificationController.getAllNotifications);
router.get("/:id", notificationController.getNotificationById);
router.post("/create", notificationController.createNotification);
router.put("/:id", notificationController.updateNotification);
router.delete("/:id", notificationController.deleteNotification);

module.exports = router; //export default
