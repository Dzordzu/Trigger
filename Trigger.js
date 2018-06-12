/**
* @class Trigger
* @desc creates bound between trigger and target. Additionally can add the proper events to close dialog
*
* @constructor Trigger(options)
*   @desc options should be in the following form:
*     {
*       @required @prop trigger,
*       @required @prop target, // Is activated by trigger
*       @required @function toggleFunc(trigger, target), //Is called on click event. Should always take trigger and target
*       @function hideFunc(target) // Is called if "Escape" is clicked and/or when target lost its focus
*     }
*
*
*/
var Trigger = function(options) {

  /*
  * vars
  */
  var setTimeoutID;
  var events = {
    blur: function(){
      setTimeoutID = setTimeout(function(){
        (options.hideFunc)(options.target);
      }, 100);
    },
    click: function(){
      (options.toggleFunc)(options.trigger, options.target);
    },
    escape: function(event){
      if(event.code === "Escape") {
        (options.hideFunc)(options.target);
      };
    },
    focus: function(){
      clearTimeout(setTimeoutID);
    }
  };

  /*
  * Private methods
  */
  function isEmpty(obj) {
    if(obj === null || obj === undefined || obj === {}) return true;
    else return false;
  }

  function basic() {
    // Prepare options.func
    if(isEmpty(options.toggleFunc)) {
      console.log("Trigger error: No action to call");
    }

    // Run options.func
    options.trigger.addEventListener("click", events.click);
  }

  function hiddings() {
    // When it loses focus
    options.target.addEventListener("blur", events.blur, 1);
    options.target.addEventListener("focus", events.focus, 1);

    // When Escape is entered
    document.addEventListener("keydown", events.escape);
  }

  /*
  * Public methods
  */

  function constructor() {
    basic();
    if(!isEmpty(options.hideFunc)) hiddings();
  }

  this.disableHiddings = function() {
    options.target.removeEventListener("blur", events.blur, 1);
    options.target.removeEventListener("focus", events.focus, 1);
    document.removeEventListener("keydown", events.escape);
  }

  this.enableHiddings = function() {
    hiddings();
  }

  constructor();
};
