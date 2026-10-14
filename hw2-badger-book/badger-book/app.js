let stats;
let origStats;
fetch ("https://cs571.org/api/s24/hw2/students", {
	headers: {
		"X-CS571-ID": CS571.getBadgerId()
	}
})
.then((response) => response.json())
.then((data) => {
	stats = JSON.parse(JSON.stringify(data));
	origStats = JSON.parse(JSON.stringify(stats));
	console.log(stats);
	document.getElementById("num-results").innerText = stats.length;
})
.catch(error => console.error(error))

function buildStudents() {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	const stud = document.getElementById("students");
	stud.innerHTML = '';
	console.log(stats);
	for (let student of stats) {
		const studSect = document.createElement("p");
		const studName = document.createElement("h3");
		const studInfo = document.createElement("p");
		const studInterestIntro = document.createElement("p");
		const studInterests = document.createElement("ul");

		// name
		if (student.name) {
			studName.innerText = student.name.first + " " + student.name.last;
			studInfo.innerText = student.name.first + " ";
		}
		// fromWI
		if (student.fromWisconsin === true) {
			studInfo.innerText += "is from WI, "
		}
		if (student.fromWisconsin === false) {
			studInfo.innerText += "is not from WI, "
		}
		// num credits
		if (student.numCredits) {
			studInfo.innerText += "is taking " + student.numCredits + " credits, ";
		}
		// major
		if (student.major) {
			studInfo.innerText += "and is majoring in " + student.major;
		}
		studInterestIntro.innerText = "Their interest(s) include:"
		// interests
		if (student.interests) {
			for (let interest of student.interests) {
				const newInterest = document.createElement("li");
				newInterest.innerText = interest;
				newInterest.addEventListener("click", (e) => {
					const selectedText = e.target.innerText;
					stats = origStats;
					pressedInterest(selectedText);
				})
				studInterests.appendChild(newInterest);
			}
		}
		studSect.className = "col-xs-1 col-sm-1 col-md-2 col-lg-3 col-xl-4";
		studSect.appendChild(studName);
		studSect.appendChild(studInfo);
		studSect.appendChild(studInterestIntro);
		studSect.appendChild(studInterests);
		stud.appendChild(studSect);
	}
	stats = origStats;
}

function pressedInterest(selectedText) {
	const searchName = document.getElementById("search-name");
	const searchMajor = document.getElementById("search-major");
	const searchInterest = document.getElementById("search-interest");
	searchName.value = '';
	searchMajor.value = '';
	searchInterest.value = selectedText;
	let filtered = [];
	for (let stud of stats) {
		const interests = stud.interests;
		for (let interest of interests) {
			if (interest.toLowerCase().includes(searchInterest.value.trim().toLowerCase())) {
				filtered.push(stud);
				break;
			}
		}
	}
	stats = filtered;
	buildStudents();
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	// TODO Implement the search
	const searchName = document.getElementById("search-name");
	const searchMajor = document.getElementById("search-major");
	const searchInterest = document.getElementById("search-interest");

	// actual searching
	if (searchName.value) {
		stats = stats.filter(stud => 
			(stud.name.first + stud.name.last).toLowerCase().includes(searchName.value.trim().toLowerCase()));
	}
	console.log(stats);
	if (searchMajor.value) {
		stats = stats.filter(stud => 
			stud.major.toLowerCase().includes(searchMajor.value.trim().toLowerCase()));
	}
	let filtered = [];
	if (searchInterest.value) {
		for (let stud of stats) {
			const interests = stud.interests;
			for (let interest of interests) {
				if (interest.toLowerCase().includes(searchInterest.value.trim().toLowerCase())) {
					filtered.push(stud);
					break;
				}
			}
		}
		stats = filtered;
	}
	
	document.getElementById("num-results").innerText = stats.length;
	buildStudents();
}
document.getElementById("search-btn").addEventListener("click", handleSearch);