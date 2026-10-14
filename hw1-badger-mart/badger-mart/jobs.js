function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO: Alert the user of the job that they applied for!
    let selected = 0; // 0 == nothing selected, 1 == job selected
    for (let job of document.getElementsByName('job')) {
        if (job.checked) {
            alert("Thank you for applying to be a " + job.value + "!");
            selected = 1;
        }
    }
    if (selected === 0) {
        alert("Please select a job!");
    }
}