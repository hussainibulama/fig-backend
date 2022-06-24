const Events = require("./event.model");
exports.CreateEvent = async (req, res, data) => {
  let events;
  try {
    let dates = new Date(req.body.date);
    events = await Events.create({
      ...req.body,
      file: req.file.location,
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
