document.addEventListener("DOMContentLoaded", () => {

    const nextBtn = document.getElementById("nextBtn");
    const instruction = document.getElementById("instruction");

    // Select elements once
    const milkA = document.querySelector('[data-name="Milk A"]');
    const cylinderEmpty = document.querySelector('.cylinder-empty');
    const cylinderMilk = document.querySelector('.cylinder-milk');
    const milkStream = document.getElementById('milkStream');

    setTimeout(() => {
        instruction.textContent = "Click on Next button to start the experiment";
    }, 2000);

    nextBtn.addEventListener("click", () => {
        const allApparatus = document.querySelectorAll(".apparatus");

        allApparatus.forEach(app => {
            app.classList.remove("focus");
            app.classList.add("no-hover");
            app.classList.add("no-tooltip");

            const name = app.dataset.name;
            if(["Milk A","Milk B","Test Tube Stand","Measuring Cylinder"].includes(name)){
                app.classList.remove("hide-apparatus"); // show
            } else {
                app.classList.add("hide-apparatus"); // hide others
            }
        });

        instruction.textContent = "Click on Milk Sample A to pour 5 ml into the cylinder";
        nextBtn.disabled = true;
    });

    // ✅ Attach Milk A click event outside Next button
    milkA.addEventListener("click", () => {
        instruction.textContent = "Pouring Milk A...";

        const milkRect = milkA.getBoundingClientRect();
        const cylinderRect = cylinderEmpty.getBoundingClientRect();

        // Position milk stream at Milk A tip
        milkStream.style.left = `${milkRect.left + milkRect.width/2 - 10}px`;
        milkStream.style.top = `${milkRect.top + milkRect.height/2}px`;
        milkStream.classList.remove("hide-apparatus");

        // Add CSS animation class for Milk A move + tilt
        milkA.classList.add("pour-animation");

        // Animate milk stream
        const streamHeight = cylinderRect.top + cylinderRect.height - (milkRect.top + milkRect.height/2);
        milkStream.style.height = `${streamHeight}px`;

        // After animation ends
        setTimeout(() => {
            milkStream.classList.add("hide-apparatus");
            milkStream.style.height = "0";

            // Swap cylinder images
            cylinderEmpty.classList.add("hide-apparatus");
            cylinderMilk.classList.remove("hide-apparatus");

            // Remove animation class so Milk A returns to original position
            milkA.classList.remove("pour-animation");

            instruction.textContent = "Milk Sample A poured into cylinder";
            milkA.style.pointerEvents = "none"; // prevent re-click
        }, 2000); // match CSS animation duration
    });

});