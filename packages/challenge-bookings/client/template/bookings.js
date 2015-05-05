TotalWorth = new Mongo.Collection('totalWorth');

Template.bookings.onCreated(function () {
    Meteor.subscribe("totalWorth");
});

Template.bookings.helpers({
    foo: function () {
        return TotalWorth.findOne({_id: 'won'});
    }
});

Template.bookings.events({
    'click #addBooking': function (e, t) {
        console.log('click #addBooking');
        Meteor.call('addWonBooking', Number(t.find('#price').value));
    }
});