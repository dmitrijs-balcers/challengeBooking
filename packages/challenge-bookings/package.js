Package.describe({
    name: "challenge:bookings",
    summary: "Bookings template",
    version: "0.0.1"
});

Package.onUse(function (api) {

    api.use([
        'challenge:core',
        'challenge:models',
        'simple:reactive-method'
    ]);

    api.addFiles(['client/template/bookings.html', 'client/template/bookings.js'], 'client');
});