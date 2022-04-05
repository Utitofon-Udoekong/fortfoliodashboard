var array = (function (r) {
  "use strict";
  var e = function (r, e) {
      void 0 === e && (e = "");
      for (var t = [], n = Number(e), o = new Set(), u = 0, i = r; u < i.length; u++) {
          var a = i[u];
          if ("object" == typeof a && null !== a && "string" == typeof e && "" !== e && !1 === Array.isArray(a)) o.has(a[e]) || (t.push(a), o.add(a));
          else if (Array.isArray(a) && !1 === isNaN(n) && Number(a.length) > Number(e)) {
              var f = Number(e);
              o.has(a[f]) || (t.push(a), o.add(a));
          } else o.has(a) || (t.push(a), o.add(a));
      }
      return t;
  };
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */ function t(
      r,
      e,
      t
  ) {
      if (t || 2 === arguments.length) for (var n, o = 0, u = e.length; o < u; o++) (!n && o in e) || (n || (n = Array.prototype.slice.call(e, 0, o)), (n[o] = e[o]));
      return r.concat(n || Array.prototype.slice.call(e));
  }
  return (
      (r.filter = function (r, e) {
          for (
              var t = Array.from(r),
                  n = (function (r) {
                      for (var e = [], t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
                      for (var n = {}, o = new Set(e), u = 0, i = Object.keys(r); u < i.length; u++) {
                          var a = i[u];
                          o.has(r[a]) || (n[a] = r[a]);
                      }
                      return n;
                  })(e, "", 0),
                  o = function (r) {
                      var e = t.filter(function (e) {
                          if ((r in e)) {
                              if (!1 === isNaN(e[r]) && Number(e[r]) === Number(n[r])) return !0;
                              if ("string" == typeof e[r] && e[r].toLowerCase().includes(n[r].toLowerCase())) return !0;
                          }
                          return !1;
                      });
                      t = e;
                  },
                  u = 0,
                  i = Object.keys(n);
              u < i.length;
              u++
          ) {
              o(i[u]);
          }
          return t;
      }),
      (r.pageInfo = function (r, e, t) {
          void 0 === e && (e = 1), void 0 === t && (t = 10);
          var n = Array.from(r),
              o = Number(t) * Number(e) - (Number(t) - 1),
              u = Number(t) * Number(e);
          return { from: n.length >= 1 ? o : 0, start: n.length >= 1 ? o : 0, to: u <= n.length ? u : n.length, end: u <= n.length ? u : n.length, of: n.length, length: n.length };
      }),
      (r.pages = function (r, e) {
          void 0 === e && (e = 10);
          var t = Array.from(r),
              n = Number(t.length) / Number(e);
          return Math.ceil(n);
      }),
      (r.paginate = function (r, e, t) {
          void 0 === e && (e = 1), void 0 === t && (t = 10);
          var n = Array.from(r),
              o = Number(t) * Number(e) - (Number(t) - 1),
              u = Number(t) * Number(e);
          return n.slice(o - 1, u <= n.length ? u : n.length);
      }),
      (r.pagination = function (r, e, t) {
          void 0 === e && (e = 1), void 0 === t && (t = 0);
          var n = [],
              o = Number(r) < Number(e) ? Number(r) : Number(e),
              u = Number(e) < 1 ? 1 : Number(e),
              i = o + Number(t),
              a = u - Number(t);
          if (0 === Number(t)) for (var f = 1; f <= Number(r); f++) n.push(String(f));
          else {
              if (u > 1) for (f = a; f < u; f++) n.push(String(f));
              for (f = o; f <= i; f++) n.push(String(f));
          }
          var s = n
              .filter(function (r) {
                  return Number(r) > 0;
              })
              .filter(function (e) {
                  return Number(e) <= Number(r);
              });
          return i < Number(r) && 0 !== Number(t) && s.push("..."), a > 1 && 0 !== Number(t) && s.unshift("..."), s;
      }),
      (r.search = function (r) {
          for (var n = [], o = 1; o < arguments.length; o++) n[o - 1] = arguments[o];
          for (
              var u = [],
                  i = function (n) {
                      var o = Array.from(r).filter(function (r) {
                          if (!1 === isNaN(r) && Number(r) === Number(n)) return !0;
                          if ("string" == typeof r && r.toLowerCase().includes(n.toLowerCase())) return !0;
                          if ("object" == typeof r && null !== r)
                              for (var e = 0, t = Object.keys(r); e < t.length; e++) {
                                  var o = t[e];
                                  if (!1 === isNaN(r[o]) && Number(r[o]) === Number(n)) return !0;
                                  if ("string" == typeof r[o] && r[o].toLowerCase().includes(n.toLowerCase())) return !0;
                              }
                          return !1;
                      });
                      u = e(t(t([], u, !0), o, !0));
                  },
                  a = 0,
                  f = n;
              a < f.length;
              a++
          ) {
              var s = f[a];
              i(s);
          }
          return u;
      }),
      (r.searchBy = function (r, n, o) {
          for (
              var u = [],
                  i = function (n) {
                      var i = Array.from(r).filter(function (r) {
                          for (var e = 0, t = Array.from(o); e < t.length; e++) {
                              var u = t[e];
                              if ((u in r)) {
                                  if (!1 === isNaN(r[u]) && Number(r[u]) === Number(n)) return !0;
                                  if ("string" == typeof r[u] && -1 !== r[u].toLowerCase().indexOf(n.toLowerCase())) return !0;
                              }
                          }
                          return !1;
                      });
                      u = e(t(t([], u, !0), i, !0));
                  },
                  a = 0,
                  f = n;
              a < f.length;
              a++
          ) {
              i(f[a]);
          }
          return u;
      }),
      (r.sort = function (r, e) {
          void 0 === e && (e = "asc");
          var t = Array.from(r);
          return (
              "asc" === e
                  ? t.sort(function (r, e) {
                        if (!1 === isNaN(r) && !1 === isNaN(e)) return Number(r) - Number(e);
                        if ("string" == typeof r && "string" == typeof e) {
                            var t = r.toLowerCase(),
                                n = e.toLowerCase(),
                                o = 0;
                            return t < n ? (o = -1) : t > n && (o = 1), o;
                        }
                    })
                  : "desc" === e &&
                    t.sort(function (r, e) {
                        if (!1 === isNaN(r) && !1 === isNaN(e)) return Number(e) - Number(r);
                        if ("string" == typeof r && "string" == typeof e) {
                            var t = r.toLowerCase(),
                                n = e.toLowerCase(),
                                o = 0;
                            return n < t ? (o = -1) : n > t && (o = 1), o;
                        }
                    }),
              t
          );
      }),
      (r.sortBy = function (r, e, t) {
          void 0 === t && (t = "asc");
          var n = Array.from(r);
          return (
              "asc" === t
                  ? n.sort(function (r, t) {
                        if (e in r && e in t) {
                            if (!1 === isNaN(r[e]) && !1 === isNaN(t[e])) return Number(r[e]) - Number(t[e]);
                            if ("string" == typeof r[e] && "string" == typeof t[e]) {
                                var n = r[e].toLowerCase(),
                                    o = t[e].toLowerCase(),
                                    u = 0;
                                return n < o ? (u = -1) : n > o && (u = 1), u;
                            }
                        }
                    })
                  : "desc" === t &&
                    n.sort(function (r, t) {
                        if (e in r && e in t) {
                            if (!1 === isNaN(r[e]) && !1 === isNaN(t[e])) return Number(t[e]) - Number(r[e]);
                            if ("string" == typeof r[e] && "string" == typeof t[e]) {
                                var n = r[e].toLowerCase(),
                                    o = t[e].toLowerCase(),
                                    u = 0;
                                return o < n ? (u = -1) : o > n && (u = 1), u;
                            }
                        }
                    }),
              n
          );
      }),
      (r.sortWith = function (r, e) {
          var t = Array.from(r);
          return (
              t.sort(function (r, t) {
                  return -1 === Math.sign(e(r, t)) ? -1 : 1;
              }),
              t
          );
      }),
      (r.uniq = e),
      Object.defineProperty(r, "__esModule", { value: !0 }),
      r
  );
})({});
