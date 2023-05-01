const nmsHist = "https://aitp-tpia.videotron.com/prodfsi/webNms/getTPIAHistoriqueAjax.html";
const nmsDiag =
    "https://aitp-tpia.videotron.com/prodfsi/webNms/dashboardTPIAQuery.jsf";

document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("my-form");
    document.getElementById("search-form").addEventListener("submit", function (e) {
        // Prevent the form from submitting
        e.preventDefault();

        // Get the input value and trim it
        let inputValue = document.getElementById("search-input").value.trim();

        // Update the input value
        document.getElementById("search-input").value = inputValue;

        // Submit the form
        this.submit();
    });

    document.getElementById("hist").addEventListener("click", function () {
        // Create the hidden input tags
        let inputValue = document.createElement("input");
        inputValue.type = "hidden";
        inputValue.name = "inputValue";
        inputValue.value = document.getElementById("mac-input").value;

        let nbOfDays = document.createElement("input");
        nbOfDays.type = "hidden";
        nbOfDays.name = "nbOfDays";
        nbOfDays.value = document.getElementById("number-days")?.value ?? 5;
	if(!nbOfDays.value || nbOfDays.value < 1) nbOfDays.value = 5;
        let inputType = document.createElement("input");
        inputType.type = "hidden";
        inputType.name = "inputType";
        inputType.value = "Mac";

        let startDateInput = document.createElement("input");
        startDateInput.type = "hidden";
        startDateInput.name = "startDate";
        startDateInput.value = "";

        let endDateInput = document.createElement("input");
        endDateInput.type = "hidden";
        endDateInput.name = "endDate";
        endDateInput.value = "";

        let hiddenItemsInput = document.createElement("input");
        hiddenItemsInput.type = "hidden";
        hiddenItemsInput.name = "hiddenItemsAsString";
        hiddenItemsInput.value = "";

        let chosenItemsAsString = document.createElement("input");
        hiddenItemsInput.type = "hidden";
        hiddenItemsInput.name = "chosenItemsAsString";
        hiddenItemsInput.value =
            "CmIp|CmCorr_rate|FlapInsert_rate|FlapInsert_delta|FlapMiss_rate|FlapPowerAdj|FlapTotal|CmLostSync_delta|Nbreset_rate|CmGrade|DocsPrimaryChannel|CmRx|CmRx_delta|UbrRx|RegTime|UbrName|CmSn|CmSn_delta|CmStatus|CmTx|CmTx_delta|UsCorr_rate|UsSn|UsUnCorr_rate|UsUnerror_rate|CmUncorr_rate|CmUnerror_rate|CmUptime";

        // Append the hidden input tags to the form
        // let form = document.getElementById("my-form");
        form.appendChild(inputValue);
        form.appendChild(inputType);
        form.appendChild(nbOfDays);
        form.appendChild(startDateInput);
        form.appendChild(endDateInput);
        form.appendChild(hiddenItemsInput);
        form.appendChild(chosenItemsAsString);
        // document.body.appendChild(form);
        form.action = nmsHist;
        form.submit();
    });

    document.getElementById("diag").addEventListener("click", function () {
        let hiddenItemsInput = document.createElement("input");
        hiddenItemsInput.type = "hidden";
        hiddenItemsInput.name = "mainForm";
        hiddenItemsInput.value = "mainForm";

        let macInput = document.createElement("input");
        macInput.type = "hidden";
        macInput.name = "mainForm:inputValueId";
        macInput.value = document.getElementById("mac-input").value;

        let javax = document.createElement("input");
        javax.type = "hidden";
        javax.name = "javax.faces.ViewState";
        javax.value = "stateless";

//mainForm:submitButtonId: Soumettre
        let smtr = document.createElement("input");
        smtr.type = "hidden";
        smtr.name = "mainForm:submitButtonId";
        smtr.value = "Soumettre";

        form = document.getElementById("my-form");
        form.appendChild(hiddenItemsInput);
        form.appendChild(macInput);
        form.appendChild(javax);
	form.appendChild(smtr);

        // Update the form's action URL
        form.action = nmsDiag;
        // Submit the form
        form.submit();
    });
});
