!(function() {
  // 计时起始时间，自行修改
  var start = new Date("2020/1/26 00:31:05");
  var start2 = new Date("2025/1/1 00:00:00");

  function update() {
    var now = new Date();
    now.setTime(now.getTime() + 250);
    // 计算总天数
    var days = (now - start) / 1000 / 60 / 60 / 24;
    // 计算年数（向下取整）
    var years = Math.floor(days / 365);
    // 计算剩余天数
    var remainingDays = Math.floor(days % 365);
    var hours = (now - start) / 1000 / 60 / 60 - (24 * (years * 365 + remainingDays));
    var hnum = Math.floor(hours) / 2;
    // if (String(hnum).length === 1) {
    //   hnum = "0" + hnum;
    // }
    var minutes = (now - start) / 1000 / 60 - (24 * 60 * (years * 365 + remainingDays)) - (60 * hnum);
    var mnum = Math.floor(minutes);
    if (String(mnum).length === 1) {
        mnum = "0" + mnum;
    }
    var seconds = (now - start) / 1000 - (24 * 60 * 60 * (years * 365 + remainingDays)) - (60 * 60 * hnum) - (60 * mnum);
    var snum = Math.round(seconds);
    if (String(snum).length === 1) {
        snum = "0" + snum;
    }
    document.getElementById("timeDate").innerHTML = "小站已历经&nbsp" + years + "&nbsp个春秋&nbsp·&nbsp" + remainingDays + "&nbsp个昼夜&nbsp·";
    document.getElementById("times").innerHTML = hnum + "个时辰&nbsp" ;//+ mnum + "&nbsp分&nbsp" + snum + "&nbsp秒";
}
function update2() {
    var now = new Date();
    now.setTime(now.getTime() + 250);
    // 计算总天数
    var days = (now - start2) / 1000 / 60 / 60 / 24;
    // 计算年数（向下取整）
    var years = Math.floor(days / 365);
    // 计算剩余天数
    var remainingDays = Math.floor(days % 365);
    var hours = (now - start2) / 1000 / 60 / 60 - (24 * (years * 365 + remainingDays));
    var hnum = Math.floor(hours) / 2;
    // if (String(hnum).length === 1) {
    //   hnum = "0" + hnum;
    // }
    var minutes = (now - start2) / 1000 / 60 - (24 * 60 * (years * 365 + remainingDays)) - (60 * hnum);
    var mnum = Math.floor(minutes);
    if (String(mnum).length === 1) {
        mnum = "0" + mnum;
    }
    var seconds = (now - start2) / 1000 - (24 * 60 * 60 * (years * 365 + remainingDays)) - (60 * 60 * hnum) - (60 * mnum);
    var snum = Math.round(seconds);
    if (String(snum).length === 1) {
        snum = "0" + snum;
    }
    document.getElementById("timeDate2").innerHTML = "十年之约已履行&nbsp" + years + "&nbsp个春秋&nbsp·&nbsp" + remainingDays + "&nbsp个昼夜&nbsp·";
    document.getElementById("times2").innerHTML = hnum + "个时辰&nbsp" ;//+ mnum + "&nbsp分&nbsp" + snum + "&nbsp秒";
}

update();
setInterval(update, 1000);
update2();
setInterval(update2, 1000);
})();