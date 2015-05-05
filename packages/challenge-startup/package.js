Package.describe({
    name: "challenge:startup",
    version: "0.0.1"
});

Package.onUse(function (api) {

    api.use(['challenge:core', 'challenge:models']);
    api.addFiles(['server/startup.js'], 'server');
});