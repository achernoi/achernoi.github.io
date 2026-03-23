function generateJson() {
    const form = document.getElementById("intro_form");

    if (!form.checkValidity()) {        
        form.reportValidity(); // Optional: report all validity issues to the user
        return;
    }

    const websiteSections = document.querySelectorAll('[data-website]');
    const courcesSections = document.querySelectorAll('[data-course]');

    /*
    const formData = new FormData(form);
    const introduction = {
        firstName: "",
        middleName: "",
        nickname: "",
        lastName: "",
        ackStatement: "",
        ackDate: "",
        mascotAdj: "",
        mascotAnimal: "",
        divider: "",
        picCaption: "",
        background: {
            personalStatement: formData.get("personalStatement"),
            personalBackground: formData.get("personalBackground"),
            professionalBackground: formData.get("personalBackground"),
            academicBackground: formData.get("academicBackground"),
            subjectBackground: formData.get("subjectBackground"),
            primaryComp: formData.get("primaryComp"),
            backupComp: formData.get("backupComp")

        },
        courses: courcesToJsonArray(courcesSections),
        extras: {
            funnyItem: formData.get("funnyItem"),
            addText: formData.get("addText"),
            quote: formData.get("quote"),
            quoteAuthor: formData.get("quoteAuthor")
        },
        websiteLinks: sectionsToJsonArray(websiteSections)
    };

    introduction.firstName = (formData.get("firstName")); //?? "").toString().trim();
    introduction.middleName = (formData.get("middleName")); //?? "").toString().trim();
    introduction.nickname = (formData.get("nickname")); //?? "").toString().trim();
    introduction.lastName = (formData.get("lastName"));// ?? "").toString().trim();
    introduction.ackStatement = (formData.get("ackStatement"));
    introduction.ackDate = (formData.get("ackDate"));
    introduction.mascotAdj = (formData.get("mascotAdj"));
    introduction.mascotAnimal = (formData.get("mascotAnimal"));
    introduction.divider = (formData.get("divider"));
    introduction.picCaption = (formData.get("picCaption"));
    introduction.background.personalStatement = (formData.get("personalStatement"));
    introduction.background.personalBackground = (formData.get("personalBackground"));
    introduction.background.professionalBackground = (formData.get("professionalBackground"));
    introduction.background.academicBackground = (formData.get("academicBackground"));
    introduction.background.subjectBackground = (formData.get("subjectBackground"));
    introduction.background.primaryComp = (formData.get("primaryComp"));
    introduction.background.backupComp = (formData.get("backupComp"));
 */

    const introduction = createJsonFromForm(form, courcesSections, websiteSections);
    const jsonString = JSON.stringify(introduction, null, 4);

    const outputdiv = document.getElementById("output_result");


    outputdiv.innerHTML = 
        `
            <section>
                <h3>Generated JSON Data:</h3>
                <pre><code class="language-json">${jsonString}</code></pre>
                <div style="text-align: center; margin-top: 20px;">
                    <button type="button" id="jsonBackToFormBtn">Back to Form</button>
                </div>
            </section>
        `;
    
    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }    

    document.getElementById("jsonBackToFormBtn").onclick = () => {
      outputdiv.style.display = "none";
      form.style.display = "block";
      pageTitle.innerText = "Introduction Form";
      //formSubtitle.style.display = "block";
    };

    form.style.display = "none";
    outputdiv.style.display = "block";
}