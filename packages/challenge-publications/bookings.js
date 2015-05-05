var WON = 'won';

Meteor.publish('totalWorth', function () {

    console.log('calculate totalWorth');

    var db, bookingsHandle, totalWorth, observerQuery, pipeline,
        now = new Date(),
        timer = new Timer(),
        subscription = this;

    db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;

    pipeline = [
        {$match: {date: {$gte: _subtractMonths(now, 1)}, status: WON}},
        {$group: {_id: '$status', totalWorth: {$sum: "$price"}}}
    ];

    db.collection('bookings').aggregate(
        pipeline,
        Meteor.bindEnvironment(
            function (err, result) {
                totalWorth = result[0] ? result[0].totalWorth : 0;
                subscription.added('totalWorth', WON, {totalWorth: totalWorth});
            }
        ));

    observerQuery = {date: {$gte: now}, status: WON};

    bookingsHandle = Bookings.find(observerQuery).observeChanges({

        added: function (id, fields) {
            subscription.changed('totalWorth', WON, {totalWorth: totalWorth += fields.price})
        }
        // changed & removed does not give values to calculate deltas...
    });

    subscription.onStop(function () {
        bookingsHandle.stop()
    });
    subscription.ready();

    console.log('totalWorth finished in ' + timer.delta());
});

function _subtractMonths(date, months) {

    var now = new Date(date.getTime());

    now.setMonth(now.getMonth() - months);
    return now;
}

Meteor.methods({
    addWonBooking: function addWonBooking(price) {

        var timer = new Timer();
        check(price, Number);

        console.log('addWonBooking');

        Bookings.insert({

            price: price,
            date: Date.now(),
            status: WON
        });

        console.log('addWonBooking finished in' + timer.delta());
    }
});