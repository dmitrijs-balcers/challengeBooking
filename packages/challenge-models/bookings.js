Bookings = new Meteor.Collection("bookings");

var Schemas = {};

Schemas.Bookings = new SimpleSchema({
    price: {
        type: Number,
        label: "The £ value of the booking",
        decimal: true
    },
    date: {
        type: Date,
        label: "The time the booking was confirmed"
    },
    status: {
        type: String,
        label: "The current status of the booking.",
        allowedValues: ["won", "pending", "lost", "void"]
    }
});

Bookings.attachSchema(Schemas.Bookings);