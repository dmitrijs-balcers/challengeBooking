Package.describe({
    name: "challenge:core",
    summary: "Challenge core",
    version: "0.0.1"
});

Package.onUse(function (api) {

    api.imply([
        'meteor-platform',
        'aldeed:collection2@2.3.3'
    ]);
});