function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  });
  return this;
}

function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(' ');
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });
  return this;
}

function hoursWorkedOnDate(dateWorked) {
  const timeIn = this.timeInEvents.find(event => event.date === dateWorked);
  const timeOut = this.timeOutEvents.find(event => event.date === dateWorked);
  const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(dateWorked) {
  const hoursWorked = hoursWorkedOnDate.call(this, dateWorked);
  const wagesEarned = hoursWorked * this.payPerHour;
  return wagesEarned;
}

function allWagesFor() {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(function (memo, date) {
    return memo + wagesEarnedOnDate.call(this, date);
  }.bind(this), 0);

  return payable;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalPayroll, employee) => {
    return totalPayroll + allWagesFor.call(employee);
  }, 0);
}

