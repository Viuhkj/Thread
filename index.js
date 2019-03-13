function Thread() {
  var ref = null;
  var repeat = false;
  var delay = 0;
  var run = null;
  var modifiable = false;
  var errors = {
    modify: "Cannot be modified now",
    noRun: "There is no Run method",
    alreadyRunning: "Thread is already running",
    alreadyStopped: "Thread is already stopped"
  };
  this.start = function() {
    start();
    return this;
  };
  this.stop = function() {
    return stop();
  };
  this.getRepeat = function() {
    return repeat;
  };
  this.setRepeat = function(val) {
    if (!ref) repeat = val;
    else throw errors.modify;
    return this;
  };
  this.getDelay = function() {
    return delay;
  };
  this.setDelay = function(val) {
    if (!ref) delay = val;
    else throw errors.modify;
    return this;
  };
  this.getModifiable = function() {
    return modifiable;
  };
  this.setModifiable = function(val) {
    if (!ref) modifiable = val;
    else throw errors.modify;
    return this;
  };
  this.getRun = function() {
    return run;
  };
  this.setRun = function(mtd) {
    if (!ref || (ref && modifiable)) run = mtd;
    else throw errors.modify;
    return this;
  };
  function start() {
    if (run && !ref) {
      if (repeat) ref = setInterval(runMtd, delay);
      else ref = setTimeout(interval, delay);
    } else if (!run) {
      throw errors.noRun;
    } else {
      throw errors.alreadyRunning;
    }
  }
  function stop() {
    if (ref) {
      if (repeat) clearInterval(ref);
      else clearTimeout(ref);
      ref = null;
      return true;
    } else throw errors.alreadyStopped;
  }
  function interval() {
    runMtd();
    ref = null;
  }
  function runMtd() {
    run();
  }
  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }
  return sleep;
};
