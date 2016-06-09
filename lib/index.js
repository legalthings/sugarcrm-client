"use strict";

/* SugarCRM REST API module in node.js */

var request = require('request');

var SugarCRMClient = function(initArray) {

  this.apiURL = initArray.apiURL;
  this.user =  initArray.login;
  this.passwd = initArray.passwd;
  this.sessionID = "";
};


/* Show Config Info */
SugarCRMClient.prototype.configInfo = function() {
  return {
    apiURL: this.apiURL,
    login : this.user,
    passwd : this.passwd
  }
}


/* get a session ID */
SugarCRMClient.prototype.login = function() {
  var subargs = {
    user_auth: {
      "user_name" : this.user,
      "password"  : this.passwd,
      encryption:'PLAIN'
    },
    application: "SugarCRM RestAPI Example"
  }

  var subargsInString = JSON.stringify(subargs);

  var data = {
    method: "login",
    input_type: "JSON",
    response_type: "JSON",
    rest_data: subargsInString
  };

  var thiz = this;
  return new Promise(function(resolve, reject){
    request.post(thiz.apiURL, { form: data }, function(e,r,body){
      if (e) {
        return reject(e);
      }
      thiz.sessionID = JSON.parse(body).id;
      resolve(thiz.sessionID);
    });
  })
}

/* pure POST call function */
SugarCRMClient.prototype.call = function(method, parameters) {
  var data = {
    method: method,
    input_type: "JSON",
    response_type: "JSON",
    rest_data: JSON.stringify(parameters)
  };

  var thiz = this;
  return new Promise(function(resolve, reject){
    request.post(thiz.apiURL, { form: data }, function(e,r,body){

      if (e) {
        return reject(e);
      }

      try {
        var res = JSON.parse(body);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  });
}

module.exports = SugarCRMClient;