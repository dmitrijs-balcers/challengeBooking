Package.describe({
    name: "challenge:models",
    summary: "Collection models",
    version: "0.0.1"
});

Package.onUse(function (api) {

    api.use(['challenge:core']);

    api.addFiles(['bookings.js']);

    api.export('Bookings')
});