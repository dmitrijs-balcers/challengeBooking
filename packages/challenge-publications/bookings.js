Meteor.publish('totalWorth', function () {

    console.log('calculate totalWorth');

    var db, bookingsHandle, totalWorth, observerQuery, pipeline,
        now = new Date(),
        timer = new Timer(),
        subscription = this;

    db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;

    pipeline = [
        {$match: {date: {$gte: _subtractMonths(now, 1)}, status: "won"}},
        {$group: {_id: '$status', totalWorth: {$sum: "$price"}}}
    ];

    db.collection('bookings').aggregate(
        pipeline,
        Meteor.bindEnvironment(
            function (err, result) {

                var r = result[0];
                totalWorth = r.totalWorth;
                subscription.added('totalWorth', r._id, {totalWorth: totalWorth});
            }
        ));

    observerQuery = {date: {$gte: now}, status: "won"};

    bookingsHandle = Bookings.find(observerQuery).observeChanges({

        added: function (id, fields) {
            subscription.changed('totalWorth', 'won', {totalWorth: totalWorth += fields.price})
        }
        // changed & removed does not give values to calculate deltas...
    });

    subscription.onStop(function () {
        bookingsHandle.stop();
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
            status: 'won'
        });

        console.log('addWonBooking finished in' + timer.delta());
    }
});