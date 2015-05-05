//Bookings.insert({
//    price: 12.123,
//    date: Date.now(),
//    status: 'won'
//});

Meteor.defer(function () {

    for (var i = 0; i < 1000; i++) {
        Bookings.insert({
            price: Math.floor((Math.random() * 1000) + 100),
            date: Date.now(),
            status: 'won'
        });
    }
});