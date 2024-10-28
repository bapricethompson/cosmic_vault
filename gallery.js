let artifactLst=document.querySelector("#artifactList");

const closeButton = document.getElementsByClassName("close")[0];
closeButton.onclick = function() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none"; // Hide the modal
};

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
        modal.style.display = "none"; // Hide the modal
    }
};


// creates async request to web API
fetch("https://artifacts-api.up.railway.app/artifacts").then(function (response){

    //this function is called in the future when a response becomes available

    response.json().then(function (data) {

        console.log("the data", data);

        for (let artifact of data){
            let artDiv = document.createElement("div");
            artDiv.classList.add("artifact-card");

            let textDiv=document.createElement("div");
            textDiv.classList.add("text-card");
            let newH2 = document.createElement("h2");
            newH2.textContent = artifact.artifact_name;
            textDiv.appendChild(newH2);

            if(artifact.artifact_name.toLowerCase().includes("krell")){
                artDiv.classList.add("krell");
            }
            else if(artifact.artifact_name.toLowerCase().includes("zorgon")){
                artDiv.classList.add("zorgon");
            }
            else if(artifact.artifact_name.toLowerCase().includes("xylar")){
                artDiv.classList.add("xylar");
            }

            let newP = document.createElement("p");
            newP.textContent = artifact.description;
            textDiv.appendChild(newP);

            artDiv.appendChild(textDiv);
        
            let newImg = document.createElement("img");
            newImg.src = artifact.image_url;
            artDiv.appendChild(newImg);
        
            artDiv.appendChild(textDiv);
            artifactLst.appendChild(artDiv);

            artDiv.addEventListener("click", function(){
                console.log(artifact);
                let modalBigDiv = document.querySelector("#modalBigDiv");
                const modal = document.getElementById("myModal");
                const modalTitle = document.getElementById("modalTitle");
                const modalImage = document.getElementById("modalImage");
                const modalContent = document.getElementById("modalContent");

                modalBigDiv.innerHTML = ""; 

                modalTitle.textContent = artifact.artifact_name;

                let newImg = document.createElement("img");
                newImg.src = artifact.image_url;
                modalBigDiv.appendChild(newImg);

                let detailsDiv=document.createElement("div");
                let detailsList=document.createElement("ul");
                detailsList.style.fontWeight = "bold";
                detailsList.style.listStyleType = "none";

                let newLi1=document.createElement("li");
                newLi1.textContent="Date of Discovery: " +new Date(artifact.date_of_discovery).toLocaleDateString();
                detailsList.appendChild(newLi1);

                let newLi2=document.createElement("li");
                console.log(artifact.dimensions);
                newLi2.textContent="Dimensions: " + artifact.dimensions.join("x");
                detailsList.appendChild(newLi2);

                let newLi3=document.createElement("li");
                newLi3.textContent="Estimated Value: $" + artifact.estimated_value;
                detailsList.appendChild(newLi3);

                let newLi4=document.createElement("li");
                newLi4.textContent="Material: " + artifact.material;
                detailsList.appendChild(newLi4);

                let newLi5=document.createElement("li");
                newLi5.textContent=artifact.on_display ? "Currently On Display" : "Held in Private Collection";
                detailsList.appendChild(newLi5);

                let newLi6=document.createElement("li");
                newLi6.textContent="Planet of Origin: " +artifact.planet_of_origin;
                detailsList.appendChild(newLi6);

                detailsDiv.appendChild(detailsList);
                modalBigDiv.appendChild(detailsDiv);

                modal.style.display = "block";
                
                
            });

        }
    });
});

