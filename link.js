const crmLink =
    "http://10.40.99.8:8080/Transat-CRM/Client/";

document.addEventListener("DOMContentLoaded", function () {
    function openTab(url) {
        window.open(url, "_blank");
    }

    // Define variables for the input elements
    const customerServiceInput = document.getElementById(
        "customer-service-id"
    );
    const radiusIdInput =
        document.getElementById("radius-id");
    const bellIdInput = document.getElementById("bell-id");
    const vlIdInput = document.getElementById("vl-id");
    const mapsIdInput = document.getElementById("maps-id");

    // Define variables for the buttons
    const logoImage = document.getElementById("logo");
    const customerServiceBtn = document.getElementById(
        "customer-service-btn"
    );
    const customerInterBtn = document.getElementById(
        "customer-intervention-btn"
    );
    const radiusIdBtn =
        document.getElementById("radius-id-btn");
    const bellIdBtn =
        document.getElementById("bell-id-btn");
    const vlIdBtn = document.getElementById("vl-id-btn");
    const mapsIdBtn =
        document.getElementById("maps-id-btn");
    const interventionsBtn = document.getElementById(
        "interventions-btn"
    );
    const tasksBtn = document.getElementById("tasks-btn");
    const nmsBtn = document.getElementById("nms-btn");

    /////////////////
    let lastInterventionLink = "";
    // Handle event
    chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
            const response = request.parsed;
            if (response) {
                if (response.show != "1")
                    customerServiceInput.value =
                        response.show;
                mapsIdInput.value = response.zip ?? "";
                vlIdInput.value = response.vl ?? "";
                bellIdInput.value = response.trt ?? "";
                radiusIdInput.value = response.t1 ?? "";
                lastInterventionLink =
                    response.lastInterventionLink;
            }
            // else customerServiceInput.value = request.url;
        }
    );

    // Add click event listeners to the buttons
    customerServiceBtn.addEventListener(
        "click",
        function () {
            const customerId = customerServiceInput.value;
            const url =
                "http://10.40.99.8:8080/Transat-CRM/Client/show-" +
                customerId +
                "-client";

            if (customerId) {
                openTab(url);
            }
        }
    );

    customerInterBtn.addEventListener("click", function () {
        //Open last intervention
        if (lastInterventionLink)
            openTab(lastInterventionLink);
    });

    logoImage.addEventListener("click", function () {
        const url = "https://transattelecom.ca/internet";
        openTab(url);
    });

    radiusIdBtn.addEventListener("click", function () {
        const radiusId = radiusIdInput.value;
        const url =
            "http://10.10.10.30/radiusmanager/admin.php?cont=edit_user&username=" +
            radiusId +
            "@transattelecom.ca";
        if (radiusId) openTab(url);
    });

    bellIdBtn.addEventListener("click", function () {
        const bellId = bellIdInput.value;
        const url =
            "https://hots.businessportal.bell.ca/portal/wholesale/gas.nsf/AdminAllOrdersCOE/" +
            bellId +
            "?OpenDocument";
        if (bellId) openTab(url);
    });

    vlIdBtn.addEventListener("click", function () {
        const vlId = vlIdInput.value;
        const url =
            "https://extranet.videotron.com/services/secur/extranet/tpia/Usage.do?lang=FRENCH&compteInternet=" +
            vlId;
        if (vlId) openTab(url);
    });

    mapsIdBtn.addEventListener("click", function () {
        const mapsId = mapsIdInput.value;
        const formattedMapsId = mapsId.split(" ").join("+");
        const url =
            "https://www.google.com/maps/dir/8057+Rue+Saint-Hubert,+Montreal,+QC,+Canada/" +
            formattedMapsId +
            "+canada";
        if (mapsId) openTab(url);
    });

    interventionsBtn.addEventListener("click", function () {
        const url =
            "http://10.40.99.8:8080/Transat-CRM/Client/listFichInterStatusUser-0";
        openTab(url);
    });

    tasksBtn.addEventListener("click", function () {
        const url =
            "http://10.40.99.8:8080/Transat-CRM/Client/taskcritiques";
        openTab(url);
    });

    nmsBtn.addEventListener("click", function () {
        const url =
            "https://aitp-tpia.videotron.com/prodfsi/tpias/";
        openTab(url);
    });

    scrapeIt();
});

async function scrapeIt() {
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
        // lastFocusedWindow: true,
    });
    const url = tab.url;
    if (url.match(crmLink)) {
        document.getElementById(
            "customer-service-id"
        ).value =
            url.match(/show\-(\d+)\-client/)?.[1] ?? "";

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: scrapeDataFromCRM,
        });
    }
}

function scrapeDataFromCRM() {
    const bellRegex = /TRT-\d+-\d{2}/;
    const vlRegex = /[Vv][Ll][A-Za-z]+/;
    const t1Regex =
        /Code Radius :<\/strong><\/td>[.\s]+<td>([a-zA-Z\d]+)</;
    const mapRegex = /[A-Za-z]\d[A-Za-z]\s*\d[A-Za-z]\d/;
    const lastInterventionRegex = /updateintervention-\d+/;
    const linkStart =
        "http://10.40.99.8:8080/Transat-CRM/Client/";
    // const showIdIntervRegex = /value\"(\d+)\">/;

    const html = document.body.innerHTML;
    const showId = html.match(/value=\"(\d+)\">/)[1];

    const parsed = {
        show: showId,
        trt: html.match(bellRegex),
        vl: html.match(vlRegex),
        t1: html.match(t1Regex)?.[1],
        zip: html.match(mapRegex),
        lastInterventionLink:
            linkStart + html.match(lastInterventionRegex),
    };

    // Emit event
    chrome.runtime.sendMessage({ parsed });
}
