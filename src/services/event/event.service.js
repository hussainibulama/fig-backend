const Events = require("./event.model");
exports.CreateEvent = async (res, data) => {
  let events;
  try {
    let dates = new Date(data.date);
    events = await Events.create({
      ...data,
      date: dates,
    });
    return {
      error: !events,
      message: !events ? "Failed to register event" : "Registration successful",
      data: !events ? null : events,
    };
  } catch (err) {
    return {
      error: true,
      message: "Error registering user",
      data: err?.response?.data || err,
    };
  }
};
exports.SearchEvent = async (data) => {
  let events;
  try {
    let dates = new Date();
    events = await Events.find({
      category: data.category,
      isVirtual: data.isVirtual,
      date: { $gte: dates },
    });

    return {
      error: !events,
      message: !events ? "fail to fetch events" : "Events fetched successfully",
      data: !events ? null : events,
    };
  } catch (err) {
    return {
      error: true,
      message: "Error registering user",
      data: err?.response?.data || err,
    };
  }
};
