Meteor.publish('totalWorth', function () {

    console.log('calculate totalWorth');

    var db, bookingsHandle, totalWorth,
        now = new Date(),
        timer = new Timer(),
        subscription = this;

    db = MongoInternals.defaultRemoteCollectionDriver().mongo.db; // Meteor does not support aggregation

    db.collection('bookings').aggregate(
        _pipeline(now),
        Meteor.bindEnvironment(
            function (err, result) {

                _.each(result, function (r) {
                    totalWorth = r.totalWorth;
                    subscription.added('totalWorth', r._id, {totalWorth: r.totalWorth});
                });
            }
        ));

    bookingsHandle = Bookings.find({

        date: {$gte: now},
        status: "won"
    }).observeChanges({

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

function _pipeline(now) {
    return [
        {
            $match: {

                date: {$gte: _subtractMonths(now, 1)},
                status: "won"
            }
        },
        {
            $group: {

                _id: '$status',
                totalWorth: {$sum: "$price"}
            }
        }
    ];
}

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