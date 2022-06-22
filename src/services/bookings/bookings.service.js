const Bookings = require("./bookings.model");
const amqp = require("amqplib");
const axios = require("axios");

exports.BookEvent = async (data) => {
  let bookings;
  try {
    bookings = await Bookings.create({
      ...data,
    });
    return {
      error: !bookings,
      message: !bookings
        ? "Failed to register event"
        : "Registration successful",
      data: !bookings ? null : bookings,
    };
  } catch (err) {
    return {
      error: true,
      message: "Error registering user",
      data: err?.response?.data || err,
    };
  }
};
exports.UserEvents = async (data) => {
  let bookings;
  try {
    bookings = await Bookings.find({
      user_id: data,
    });

    return {
      error: !bookings,
      message: !bookings
        ? "fail to fetch events"
        : "Events fetched successfully",
      data: !bookings ? null : bookings,
    };
  } catch (err) {
    return {
      error: true,
      message: "Error registering user",
      data: err?.response?.data || err,
    };
  }
};
