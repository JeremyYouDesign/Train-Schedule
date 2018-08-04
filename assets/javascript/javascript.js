var tFrequency;
var firstTime;
var currentTime;
var timeConverted;

var config = {
    apiKey: "AIzaSyAtcmSD7bHcqGDNaXxvLTOuOUqqi9MF5GY",
    authDomain: "train-project-1692d.firebaseapp.com",
    databaseURL: "https://train-project-1692d.firebaseio.com",
    projectId: "train-project-1692d",
    storageBucket: "train-project-1692d.appspot.com",
    messagingSenderId: "673769382896"
};

firebase.initializeApp(config);
  
var database = firebase.database();

var addTrain = function() {
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var trainTime = $("#train-time").val().trim();
    var trainFrequency = $("#train-frequency").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val(""); 
}

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    var trainMinutes = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + trainMinutes);

    var nextTrain = moment().add(trainMinutes, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(trainMinutes),
    );
      
    $("#table-div").append(newRow);
});

$("#submit").on("click", function(event) {
    event.preventDefault();
    addTrain();
})