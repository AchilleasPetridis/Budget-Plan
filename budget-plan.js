const mainContainer = document.getElementById("main-container");
const planFooter = document.querySelector(".plan-footer");

const remainingBudget = document.getElementById("remaining-budget");
const totalExpenses = document.getElementById("total-expenses");

//Οτιδήποτα γίνεται στην αρχική σελίδα, ώστε να μην χαθεί μετά την επιλογή πλάνου και κα επέξταση την αλλαγή του .main-container
function initializeHomePage() {

    // Κουμπιά επιλογής πλάνου
    const yearlyPlanBtn = document.getElementById("yearly-plan-btn");
    const monthlyPlanBtn = document.getElementById("monthly-plan-btn");
    const chooseDaysBtn = document.getElementById("choose-days-btn");

    // Modals κάθε πλάνου
    const yearModal = document.getElementById("year-modal");
    const monthModal = document.getElementById("month-modal");
    const dayModal = document.getElementById("day-modal");

    //Κουμπί κλεισίματος modal
    const closeModalBtns = document.querySelectorAll(".close-modal-btn");

    //Inputs για τα Budget του  χρήστη
    const startingAmountInputs =
        document.querySelectorAll(".starting-amount");

    const startingAmountYear =
        document.getElementById("starting-amount-year");

    const startingAmountMonth =
        document.getElementById("starting-amount-month");

    const startingAmountDay =
        document.getElementById("starting-amount-day");

    //Inputs για τις ημερομηνίες του χρήστη
    const startingDateYear = 
        document.getElementById("starting-year");

    const startingDateMonth = 
        document.getElementById("starting-month");

    const startingDateDay = 
        document.getElementById("starting-day");

    //Κουμπιά συνέχειας αφού ο χρήστης εισάγει το Budget του
    const conYearBtn =
        document.getElementById("continue-year-btn");

    const conMonthBtn =
        document.getElementById("continue-month-btn");

    const conDayBtn =
        document.getElementById("continue-day-btn");

    const modals = [yearModal, monthModal, dayModal];



    //Εκτέλεση λειτουργιών κουμπιών πλάνου και εμφάνιση του εκάστοτε modal
    yearlyPlanBtn.addEventListener("click", () => {
        yearModal.showModal();
        startingAmountYear.focus();
    });

    monthlyPlanBtn.addEventListener("click", () => {
        monthModal.showModal();
        startingAmountMonth.focus();

    });

    chooseDaysBtn.addEventListener("click", () => {

        //Προσθήκη περιορισμού για την επιλογή ημερομηνίας μετά την τρέχουσα ημερομηνία
        const currentDate = new Date().toISOString().split("T")[0];

        startingDateDay.min = currentDate;
        
        dayModal.showModal();
        startingAmountDay.focus();

    });


    //Εκτέλεση κλεισίματος modal πατώντας το κουμπί
    closeModalBtns.forEach((button, index) => {
        button.addEventListener("click", () => {
            modals[index].close();
        });
    });

    //Αλλαγή πλάτους Input ανάλογα με τον αριθμό χαρακτήρων που εισάγει ο χρήστης
    startingAmountInputs.forEach(input => {
        input.addEventListener("input", () => {
            const minWidth = 8;
            const width = Math.max(
                minWidth,
                input.value.length + 4
            );
            input.style.width = `${width}ch`;
        });
    });


    //Εκτέλεση λειτουργιών κουμπιών συνέχειας των modal και εμφάνιση του εκάστοτε πλάνου
    conYearBtn.addEventListener("click", () => {
        const currentValue =
            validateBudget(startingAmountYear);
        const currentDateValue = 
            validateDateYear(startingDateYear);

        if (currentValue === null || currentDateValue === null) {
            return;
        }

        showChosenPlan("Ετήσιο Πλάνο", currentValue, "year");
    });

    conMonthBtn.addEventListener("click", () => {
        const currentValue =
            validateBudget(startingAmountMonth);
        const currentDateValue = 
            validateDateMonth(startingDateMonth);

        if (currentValue === null || currentDateValue === null) {
            return;
        }

        showChosenPlan("Μηνιαίο Πλάνο", currentValue, "month");
    });

    conDayBtn.addEventListener("click", () => {
        const currentValue =
            validateBudget(startingAmountDay);

        const currentDateValue =
            validateDateDay(startingDateDay);

        if (currentValue === null || currentDateValue === null) {
            return;
        }

        showChosenPlan("Ημερήσιο Πλάνο", currentValue, "day");
    });
}

//Αρχικοποίηση της αρχικής σελίδας και κρυφών modal
initializeHomePage();



//Εμφάνιση αρχικής σελίδας
function showHomePage() {
    mainContainer.classList.remove("chosen-plan-container");
    planFooter.hidden = true;

    mainContainer.innerHTML = `
        <h2>Φτιάξε το δικό σου πλάνο εύκολα και γρήγορα</h2>

            <form id="budget-form">
                

                
                    <p>Επίλεξε το πλάνο σου</p>

                    <div class="home-page-container">
                        <section class="plan">
                            <p>Επιλέγοντας αυτό το πλάνο διαλέγετε το έτος όπου επιθυμείτε να ξεκινήσετε</p>
                            <dialog class="modal" id="year-modal">
                                <button type="button" id="close-year-modal" class="close-modal-btn">X</button>
                                <div class="budget-input-group">
                                    <label for="starting-year">
                                        Το έτος που επιθυμώ να ξεκινήσω είναι
                                    </label>

                                    <input 
                                        type="number"
                                        name="starting-year"
                                        id="starting-year"
                                        class="starting-year"
                                        placeholder = "π.χ. 2026"
                                        required
                                    >

                                    <span></span>

                                    <label for="starting-amount-year">
                                        Το χρηματικό μου budget είναι
                                    </label>

                                    <input
                                        type="number"
                                        name="budget-amount"
                                        id="starting-amount-year"
                                        class="starting-amount"
                                        required
                                    >
                                    <span class="currency-symbol" aria-hidden="true">€</span>
                                </div>
                                <button type="button" id="continue-year-btn" class="continue-btn">Συνέχεια</button>
                            </dialog>
                            <button type="button" id="yearly-plan-btn" class="year choose-plan">
                                Ετήσιο Πλάνο
                            </button>
                        </section>
                        
                        <section class="plan">
                            <p>Επιλέγοντας αυτό το πλάνο διαλέγετε τον μήνα όπου επιθυμείτε να ξεκινήσετε</p>
                            <dialog class="modal" id="month-modal">
                                <button type="button" id="close-month-modal" class="close-modal-btn">X</button>
                                <div class="budget-input-group">
                                    <label for="starting-month">
                                        Ο μήνας που επιθυμώ να ξεκινήσω είναι
                                    </label>

                                    <input 
                                        type="number"
                                        name="starting-month"
                                        id="starting-month"
                                        class="starting-month"
                                        placeholder = "π.χ. 6"
                                        required
                                    >

                                    <span></span>

                                    <label for="starting-amount-month">
                                        Το χρηματικό μου budget είναι
                                    </label>

                                    <input
                                        type="number"
                                        name="budget-amount"
                                        id="starting-amount-month"
                                        class="starting-amount"
                                        required
                                    >
                                    <span class="currency-symbol" aria-hidden="true">€</span>
                                </div>
                                <button type="button" id="continue-month-btn" class="continue-btn">Συνέχεια</button>
                            </dialog>
                            <button type="button" id="monthly-plan-btn" class="month choose-plan">
                                Μηνιαίο Πλάνο
                            </button>
                        </section>
                        
                        <section class="plan">
                            <p>Επιλέγοντας αυτό το πλάνο διαλέγετε την ημερομηνία που επιθειμείτε να ξεκινήσετε
                                <br>
                                <span>Μπορείτε να επιλέξετε και την τελική ημερομηνία</span>
                            </p>
                            <dialog class="modal" id="day-modal">
                                <button type="button" id="close-day-modal" class="close-modal-btn">X</button>
                                <div class="budget-input-group">
                                    <label for="starting-day">
                                        Η ημερομηνία που επιθυμώ να ξεκινήσω είναι
                                    </label>

                                    <input 
                                        type="date"
                                        name="starting-day"
                                        id="starting-day"
                                        class="starting-day"
                                        required
                                    >

                                    <span></span>

                                    <label for="starting-amount-day">
                                        Το χρηματικό μου budget είναι
                                    </label>

                                    <input
                                        type="number"
                                        name="budget-amount"
                                        id="starting-amount-day"
                                        class="starting-amount"
                                        required
                                    >
                                    <span class="currency-symbol" aria-hidden="true">€</span>
                                </div>
                                <button type="button" id="continue-day-btn" class="continue-btn">Συνέχεια</button>
                            </dialog>
                            <button type="button" id="choose-days-btn" class="days choose-plan">
                                Επιλογή Ημερών
                            </button>
                        </section>
                        
                    </div>
                
            </form>
    `;
    initializeHomePage();
}


// Δημιουργία συνάρτησης ώστε να λαμβάνουμε κάθε value από κάθε Input
function updateBudgetSummary(currentValue) {
    const amountInputs = document.querySelectorAll(".product-amount");

    let total = 0;

    amountInputs.forEach(input => {
        total += Number(input.value) || 0;
    });

    const remaining = currentValue - total;
    totalExpenses.textContent = total.toFixed(2);
    remainingBudget.textContent = remaining.toFixed(2);
    if (remaining < 0) {
        remainingBudget.style.color = "red";
    } else {
        remainingBudget.style.color = "var(--input-color)"
    }
}


//Ρυθμίσεις για αποθήκευση στοιχείων στο localStorage
function saveProducts(planType, currentValue) {
    const productLines = document.querySelectorAll(".product-line");

    const products = [];

    productLines.forEach(line => {
        const date = line.querySelector(".product-date").value;
        const name = line.querySelector(".product-name").value;
        const amount = line.querySelector(".product-amount").value;

        if (date && name && amount) {
            products.push({
            date: date,
            name: name,
            amount: amount
        });
        }
    })
    const planData = {
        budget: currentValue,
        products: products
    };

    localStorage.setItem(planType, JSON.stringify(planData));
    
}

function loadProducts(planType) {
    const savedData = localStorage.getItem(planType);

    if (!savedData) {
        return null;
    }

    const planData = JSON.parse(savedData);

    const productsBoughtSection =
        document.querySelector(".products-bought");

    if (!productsBoughtSection) {
        return planData;
    }

    const productsHeader =
        productsBoughtSection.querySelector(".products-header");

    // Καθαρίζουμε τις υπάρχουσες γραμμές
    productsBoughtSection.innerHTML = "";

    // Ξαναβάζουμε το header
    if (productsHeader) {
        productsBoughtSection.appendChild(productsHeader);
    }

    // Δημιουργούμε τις αποθηκευμένες γραμμές
    planData.products.forEach(product => {
        const newProductLine = document.createElement("div");

        newProductLine.classList.add("product-line");

        newProductLine.innerHTML = `
            <input type="date" class="product-date">
            <input type="text" class="product-name">
            <input type="number" class="product-amount">
            <button type="button" class="remove-product-line">
                <i class="fa fa-minus"></i>
            </button>
        `;

        newProductLine.querySelector(".product-date").value =
            product.date;

        newProductLine.querySelector(".product-name").value =
            product.name;

        newProductLine.querySelector(".product-amount").value =
            product.amount;

        productsBoughtSection.appendChild(newProductLine);
    });

    return planData;
}


//Εμφάνιση επιλεγμένου πλάνου
function showChosenPlan(planTitle, currentValue, planType) {
    mainContainer.classList.add("chosen-plan-container");
    planFooter.hidden = false;

    mainContainer.innerHTML = `
        <form id="chosen-plan">
                <div id="current-plan-header">
                <button type="button" id="back-btn" class="back">
                        <i class="fa fa-arrow-left"></i>
                    </button>
                    <h2 id="plan-title">${planTitle}</h2>
                </div>
                <div class="year-container">
                    <p class="current-budget">
                        Αρχικό Budget: 
                        <span id="current-budget">${currentValue} €</span>
                    </p>
                    <section class="products-bought">
                        <div class="products-header">
                            <span></span>
                            <span class="product-title">Ημερομηνία</span>
                            <span class="product-title">Προϊόν / Υπηρεσία</span>
                            <span class="product-title">Κόστος</span>
                            <button
                                type="button"
                                class="remove-product-line placeholder-button"
                                aria-hidden="true"
                                tabindex="-1"
                            >
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <div class="product-line">
                            
                            <input type="date" class="product-date">
                            <input type="text" class="product-name">
                            <input type="number" class="product-amount">
                            <button
                                type="button"
                                class="remove-product-line placeholder-button"
                                aria-hidden="true"
                                tabindex="-1"
                            >
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                    </section>
                    <button type="button" id="add-product-line" class="add">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </form>
    `;

    function updateProductNumbers() {
        const productLines = document.querySelectorAll(".product-line");

        productLines.forEach((line, index) => {
            let number = line.querySelector(".product-number");
            if (!number) {
                number = document.createElement("span");
                number.classList.add("product-number");
                line.prepend(number);
            }
            number.textContent = `${index + 1}.`;
        });
    }

    const savedPlan = loadProducts(planType);

    if (savedPlan && savedPlan.budget !== undefined) {
        currentValue = Number(savedPlan.budget);
        document.getElementById("current-budget").textContent = `${currentValue} €`;
    }
    
    updateProductNumbers();
    updateBudgetSummary(currentValue);

    updateProductNumbers();
    
    const productsBoughtSection = document.querySelector(".products-bought");
    productsBoughtSection.addEventListener("input", (event) => {
    if (
        event.target.classList.contains("product-date") ||
        event.target.classList.contains("product-name") ||
        event.target.classList.contains("product-amount")
    ) {
        saveProducts(planType, currentValue);
    }

    if (event.target.classList.contains("product-amount")) {
        updateBudgetSummary(currentValue);
    }
});


productsBoughtSection.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".remove-product-line");

    if (!removeButton) {
        return;
    }

    // Αγνοούμε το κουμπί του header
    if (removeButton.classList.contains("placeholder-button")) {
        return;
    }

    const productLine = removeButton.closest(".product-line");

    if (!productLine) {
        return;
    }

    productLine.remove();

    updateProductNumbers();

    saveProducts(planType, currentValue);

    updateBudgetSummary(currentValue);
});


const backBtn = document.getElementById("back-btn");

backBtn.addEventListener("click", showHomePage);


const addProductLineBtn = document.getElementById("add-product-line");

addProductLineBtn.addEventListener("click", () => {

    const newProductLine = document.createElement("div");

    newProductLine.classList.add("product-line");

    newProductLine.innerHTML = `
        <input type="date" class="product-date">
        <input type="text" class="product-name">
        <input type="number" class="product-amount">
        <button type="button" class="remove-product-line">
            <i class="fa fa-minus"></i>
        </button>
    `;

    productsBoughtSection.appendChild(newProductLine);

    updateProductNumbers();
});
}


// Έλεγχος εγκυρότητας budget

function validateBudget(input) {
    const amountValue = input.value.trim();

    if (amountValue === "") {
        alert("Τοποθετήστε το Budget σας");
        return null;
    }

    const startingValue = Number(amountValue);

    if (!Number.isFinite(startingValue)) {
        alert("Το Budget πρέπει να είναι έγκυρος αριθμός");
        return null;
    }

    if (startingValue <= 0) {
        alert("Το ποσό πρέπει να είναι μεγαλύτερο από 0");
        return null;
    }

    return startingValue;
}

//Έλεγχος εγκυρότητας ημερομηνιών

function validateDateYear(input) {
    const dateValue = input.value.trim();

    if (dateValue === "") {
        alert("Τοποθετήστε την ημερομηνία που επιθυμείτε να ξεκινήσετε");
        return null;
    }

    const startingYear = Number(dateValue);

    const currentYear = new Date().getFullYear();

    if (!Number.isFinite(startingYear)) {
        alert("Το έτος πρέπει να είναι έγκυρο");
        return null;
    }

    if (!Number.isInteger(startingYear)) {
        alert("Το έτος πρέπει να είναι ακέραιος αριθμός");
        return null;
    }

    if (startingYear < currentYear) {
        alert("Το έτος πρέπει να είναι μεγαλύτερο ή ίσο με το τρέχον έτος");
        return null;
    }

    return startingYear;
}


function validateDateMonth(input) {
    const dateValue = input.value.trim();

    if (dateValue === "") {
        alert("Τοποθετήστε τον μήνα που επιθυμείτε να ξεκινήσετε (1-12)");
        return null;
    }

    const startingMonth = Number(dateValue);

    if (!Number.isFinite(startingMonth)) {
        alert("Πληκτρολογήστε έναν έγκυρο αριθμό (1-12)");
        return null;
    }

    if (!Number.isInteger(startingMonth)) {
        alert("Πληκτρολογήστε έναν έγκυρο ακέραιο αριθμό (1-12)");
        return null;
    }

    if (startingMonth < 1 || startingMonth > 12) {
        alert("Ο μήνας πρέπει να είναι μεταξύ 1 και 12");
        return null;
    }

    return startingMonth;
}


function validateDateDay(input) {
    const dateValue = input.value.trim();

    if (dateValue === "") {
        alert("Τοποθετήστε την ημερομηνία που επιθυμείτε να ξεκινήσετε");
        return null;
    }

    const currentDate = new Date().toISOString().split("T")[0];

    if (dateValue < currentDate) {
        alert("Η ημερομηνία πρέπει να είναι μεγαλύτερη ή ίση με τη σημερινή");
        return null;
    }

    return dateValue;
}



