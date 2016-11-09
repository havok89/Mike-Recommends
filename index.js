/**
 * App ID for the skill
 */
var APP_ID = "ENTER YOUR APP ID";
/**
 * TasteKid API key
 */
var TasteKidAPIKey = "ENTER YOUR TASTEKID API KEY";


var AlexaSkill = require('./AlexaSkill');
var paginationSize = "3";
var https = require('https');
var urlPrefix = "https://www.tastekid.com/api/similar?info=1&limit=" + paginationSize + "&k="+TasteKidAPIKey+"&";

var MikeRecommends = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
MikeRecommends.prototype = Object.create(AlexaSkill.prototype);
MikeRecommends.prototype.constructor = MikeRecommends;

MikeRecommends.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("MikeRecommends onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

MikeRecommends.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("MikeRecommends onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    getWelcomeResponse(response);
};

MikeRecommends.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("MikeRecommends onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

MikeRecommends.prototype.intentHandlers = {
    // register custom intent handlers
    "getRecommendationsIntent": function (intent, session, response) {
        getRecommendations(intent, session, response);
    },
    "getMoreInfoIntent": function (intent, session, response) {
        getMoreInfo(intent, session, response);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask for a book, show, game, band or movie recommendation based on something you like. for example: suggest a movie similar to Equilibrium.";
        var speechOutput = {
            speech: "<speak>" + speechText + "</speak>",
            type: AlexaSkill.speechOutputType.SSML
        };
        response.ask(speechOutput, speechOutput);
    },
    "AMAZON.StopIntent": function (intent, session, response) {
        var speechText = "OK, Enjoy!";
        var speechOutput = {
            speech: "<speak>" + speechText + "</speak>",
            type: AlexaSkill.speechOutputType.SSML
        };
        response.tell(speechOutput);
    },
    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechText = "OK, Enjoy!";
        var speechOutput = {
            speech: "<speak>" + speechText + "</speak>",
            type: AlexaSkill.speechOutputType.SSML
        };
        response.tell(speechOutput);
}
};

var sessionAttributes = {};


function getWelcomeResponse(response) {
    var speechText = "Welcome to Mike recommends, you can ask for a book, show, game, band or movie recommendation based on something you like. for example: suggest a movie similar to Equilibrium.";
    var repromptText = "You can ask for a book, show, game, band or movie recommendation based on something you like. for example: suggest a movie similar to Equilibrium.";
    var speechOutput = {
        speech: "<speak>" + speechText + "</speak>",
        type: AlexaSkill.speechOutputType.SSML
    };
    var repromptOutput = {
        speech: repromptText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
};
    response.ask(speechOutput, repromptOutput);
}


function getRecommendations(intent, session, response){
    var requestTitle = intent.slots.title.value;
    var requestType = intent.slots.type.value;
    session.attributes.index = paginationSize;
    session.attributes.type = requestType;
    var speechText = "How about: ";
    var repromptText = "Ask if you would like to hear more about one of the recommendations, for example: Tell me more about The Matrix."
    getJSONRecommendationsFromTasteKid(requestType,requestTitle, function (recommendations) {
        var i;
        var results = recommendations.Similar.Results;
        if (recommendations.length == 0) {
            speechText = "There is a problem connecting to Tastekid just now. Please try again later.";
            response.tell(speechText);
        } else {
            for (i = 0; i < paginationSize; i++) {
                if (i==(paginationSize-1)){
                    speechText = speechText + "or ";
                }
                speechText = speechText + results[i].Name;
                if (i<=(paginationSize-2)){
                    speechText = speechText + ", ";
                }
            }
            var speechOutput = {
                speech: "<speak>" + speechText + ". Which one would you like to know more about?</speak>",
                type: AlexaSkill.speechOutputType.SSML
            };
            var repromptOutput = {
                speech: repromptText,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    });
}

function getMoreInfo(intent, session, response){
    requestType = session.attributes.type;
    requestTitle = intent.slots.title.value;
    getJSONRecommendationsFromTasteKid(requestType,requestTitle, function (recommendations) {
        var teaser = recommendations.Similar.Info[0].wTeaser;
        if (typeof teaser !== 'undefined' && teaser !== null){
            speechText = teaser;
        } else {
            speechText = "There is a problem connecting to Tastekid at this time. Please try again later.";
        }
        var speechOutput = {
            speech: "<speak>" + speechText + "</speak>",
            type: AlexaSkill.speechOutputType.SSML
        };
        response.tell(speechOutput);
    });
}


function getJSONRecommendationsFromTasteKid(requestType,requestTitle,eventCallback){
  var url = urlPrefix + "type=" + requestType + "s&q=" + requestTitle;
  https.get(url, function(res) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            var results = JSON.parse(body);
            eventCallback(results);
        });
    }).on('error', function (e) {
        console.log("Got error: ", e);
    });
}

exports.handler = function (event, context) {
    var mikeRecommends = new MikeRecommends();
    mikeRecommends.execute(event, context);
};
