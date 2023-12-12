function execute() {
	if (validate()) {
	  parseXML();
	}
  }
  
  function validate() {
	var fileName = document.getElementById("tbFile").value.trim();
	var errMsg = "";
	var pattern = /^[a-zA-Z0-9_]+\.xml$/;
  
	if (fileName === "") {
	  errMsg += "Please enter a filename.\n";
	} else {
	  if (!fileName.match(pattern)) {
		errMsg += "Please enter a valid XML filename.\n";
	  } else if (fileName !== "nba.xml") {
		errMsg += "Please enter 'nba.xml', which is currently the only available XML file.";
	  }
	}
  
	if (errMsg !== "") {
	  alert(errMsg);
	  return false;
	}
	
	return true;
  }
  
  function parseXML() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		var xmlDoc = this.responseXML;
  
		var tableHTML = "<table id='teamTable'>";
		tableHTML += "<caption>NBA Teams</caption>";
		tableHTML += "<tr><th>Team Name</th><th>Location</th><th>Star Player</th><th>Stadium</th></tr>";
  
		var teams = xmlDoc.getElementsByTagName("Team");
		var teamNames = xmlDoc.getElementsByTagName("TeamName");
		var locations = xmlDoc.getElementsByTagName("Location");
		var starPlayers = xmlDoc.getElementsByTagName("StarPlayer");
		var stadiums = xmlDoc.getElementsByTagName("Stadium");
  
		for (var i = 0; i < teams.length; ++i) {
		  var teamName = teamNames[i].childNodes[0].nodeValue;
		  var location = locations[i].childNodes[0].nodeValue;
		  var starPlayer = starPlayers[i].childNodes[0].nodeValue;
		  var stadium = stadiums[i].childNodes[0].nodeValue;
  
		  tableHTML += "<tr><td>" + teamName + "</td><td>" + location + "</td><td>" + starPlayer + "</td><td>" + stadium + "</td></tr>";
		}
  
		tableHTML += "</table>";
		document.body.innerHTML += tableHTML;
  
		$("#teamTable, th, td").css("border", "1px solid black");
	  }
	};
	xhttp.open("GET", "nba.xml", true);
	xhttp.send();
  }
  
  function init() {
	$("#btnExecute").click(execute);
	$("#xmlForm").submit(function(event) {
	  event.preventDefault();
	  execute();
	});
  }
  
  $(document).ready(init);
  