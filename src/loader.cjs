// WebPack / swc opportunistically caches resolutions so we have to
// register a custom loader that gives back the source instead.

module.exports = function (source) {
  this.callback(null, source);
};
