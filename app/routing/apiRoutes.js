var friendsData = require("../data/friends"),
    index = 0;

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {

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

        res.send(friendsData[index]);

        function diff() {
            var totalDiffArray = [];
            for (i = 0; i < (friendsData.length - 1); i++) {
                var diffArray = [];
                for (x = 0; x < friendsData[i].scores.length; x++) {
                    diffArray.push(Math.abs(friendsData[i].scores[x] - userScoresArray[x]));
                };
                console.log(diffArray);
                totalDiff = diffArray.reduce(add);
                function add(accumulator, a) {
                    return accumulator + a;
                };
                console.log(totalDiff);
                totalDiffArray.push(parseInt(totalDiff));
            };
            console.log(totalDiffArray);

            index = totalDiffArray.indexOf(Math.min(...totalDiffArray));
            console.log("Best friens's index: " + index);
        };
    });
};