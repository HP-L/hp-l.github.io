!(function() {
  // 计时起始时间，自行修改
  var start = new Date("2021/11/07 00:31:05");

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
      var hnum = Math.floor(hours);
      if (String(hnum).length === 1) {
          hnum = "0" + hnum;
      }
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
      document.getElementById("timeDate").innerHTML = "本站安全运行&nbsp" + years + "年 " + remainingDays + "天";
      document.getElementById("times").innerHTML = hnum + "&nbsp小时&nbsp" + mnum + "&nbsp分&nbsp" + snum + "&nbsp秒";
  }

  update();
  setInterval(update, 1000);
})();