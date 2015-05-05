Package.describe({
    name: "challenge:publications",
    summary: "Collection publications",
    version: "0.0.1"
});

Package.onUse(function (api) {

    api.use(['challenge:core', 'challenge:models']);

    api.addFiles(['bookings.js', 'utils/timer.js'], 'server');
});