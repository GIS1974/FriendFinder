// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends"),
    index = 0;

// var userDataArray = require("../data/friends");


// var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    // *******************************************************************************
    app.get("/api/friends/:name", function (req, res) {
        for (var i = 0; i < friendsData.length; i++) {
            if (friendsData[i].name === req.params.name) {
                res.json(friendsData[i]);
            }
        }
    });

    // app.post("/api/user/clear", function () {
    //     friendsData.pop;
    // });
    // *
    // *******************************************************************************

    //   app.get("/api/waitlist", function(req, res) {
    //     res.json(waitListData);
    //   });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware

        // friendsData[friendsData.length - 1].name = "";
        // friendsData.pop;

        friendsData.push(req.body);

        //  Create an array containing user's scores
        var userScoresArray = friendsData[friendsData.length - 1].scores;

        // *******************************************************************************
        function userScoresArrayInt() {
            var tempArray = [];
            for (i = 0; i < userScoresArray.length; i++) {
                tempArray.push(parseInt(userScoresArray[i]));
            }
            return tempArray;
        }
        console.log("User scores: [" + userScoresArrayInt() + "]");
        // *******************************************************************************

        diff();

        // Create a loop through the friendData array except the last which represents user's data
        // this loop needed to calculate total difference between each friend's scores and user's scores

        res.send(friendsData[index]);

        function diff() {
            var totalDiffArray = [];
            for (i = 0; i < (friendsData.length - 1); i++) {
                // Loop through each friendsData[i].scores array
                var diffArray = [];
                for (x = 0; x < friendsData[i].scores.length; x++) {
                    diffArray.push(Math.abs(friendsData[i].scores[x] - userScoresArray[x]));
                };
                console.log(diffArray);
                // Sum of array
                totalDiff = diffArray.reduce(add);
                function add(accumulator, a) {
                    return accumulator + a;
                };
                console.log(totalDiff);
                totalDiffArray.push(parseInt(totalDiff));
            };
            console.log(totalDiffArray);

            index = totalDiffArray.indexOf(Math.min(...totalDiffArray));
            // console.log("Min value: " + Math.min(totalDiffArray));
            console.log("Best friens's index: " + index);
        };
        // friendsData.pop; //??????????????????????????????????
    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    //   app.post("/api/clear", function(req, res) {
    //     // Empty out the arrays of data
    //     tableData.length = [];
    //     waitListData.length = [];

    //     res.json({ ok: true });
    //   });
};