var date = $('.recordingdate').text();
console.log(date);
var month = $('.recordingMonth').text().substring(0,9);
console.log(month);
var time = month.replace(' ',date+' ')
console.log(time)
// 将品种选择改成下拉框