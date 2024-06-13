const db = require("../models");
const moment = require("moment-timezone");

const Event = db.Event;
const User = db.User;

const getEvents = async (req, res) => {
  const userId = req.query.user_id;
  const teacherId = req.query.teacher_id;
  const userTimezone = req.query.timezone;

  let eventsWithUser;

  try {
    const events = userId
      ? await Event.findAll({ where: { user_id: userId } })
      : await Event.findAll({ where: { teacher_id: teacherId } });

    if (events.length <= 0) {
      return res.status(204).send();
    }
    if (teacherId) {
      eventsWithUser = await Promise.all(
        events.map(async (event) => {
          const eventWithUser = await event.getData();
          const formatedEvent = {
            ...eventWithUser,
            start: moment.utc(event.start).tz(userTimezone).format(),
            end: moment.utc(event.end).tz(userTimezone).format(),
          };
          return formatedEvent;
        })
      );
      return res.status(200).json({ data: eventsWithUser });
    } else {
      events.map(async (event) => {
        return {
          ...event,
          start: moment.utc(event.start).tz(userTimezone).format(),
          end: moment.utc(event.end).tz(userTimezone).format(),
        };
      });
      return res.status(200).json({ data: events });
    }
  } catch (error) {
    console.error("Error in getEvents:", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération des events." });
  }
};

const addEvent = async (req, res) => {
  try {
    const {
      event_type,
      date,
      start,
      end,
      user_id,
      teacher_id,
      meeting_link,
      timezone,
    } = req.body.data;

    const userTeacher = await User.findByPk(user_id);
    if (!userTeacher) {
      return res.status(404).send("Teacher not found");
    }

    const startUTC = moment.tz(`${date}T${start}:00`, timezone).utc().format();
    const endUTC = moment.tz(`${date}T${end}:00`, timezone).utc().format();

    const data = {
      event_type,
      date,
      start: startUTC,
      end: endUTC,
      user_id,
      teacher_id,
      meeting_link,
      title: event_type === "Simulation" ? "Mise en situation" : "Conversation",
      notified: 0,
    };

    const event = await Event.create(data);
    if (event) {
      return res.status(201).send(event);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getEvents,
  addEvent,
};
