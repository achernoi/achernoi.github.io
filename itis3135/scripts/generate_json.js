function getValue(el) {
    return el ? el.value.trim() : "";
}

function courcesToJsonArray(rows) { 
    const data = Array.from(rows).map((row) => {

    department = getValue(row.querySelector('input[name="course-dept[]"]'));
    number = getValue(row.querySelector('input[name="course-num[]"]'));
    courseName = getValue(row.querySelector('input[name="course-name[]"]'));
    reason = getValue(row.querySelector('input[name="course-reason[]"]'));
    return { department, number, courseName, reason };
});

    return data; // <-- this is the JSON-ready array of objects
}

function sectionsToJsonArray(rows) {        
    const data = Array.from(rows).map((row) => {
      // If you keep name="name[]" and name="url[]" as in your HTML:
      if (row.querySelector('input[name="urlname[]"]'))
        name = row.querySelector('input[name="urlname[]"]').value;
      else 
        name = "";

      if (row.querySelector('input[name="url[]"]').value)         
        url  = row.querySelector('input[name="url[]"]').value;
      else 
        url  = "";
      return { name, url };
    });

    return data; // <-- this is the JSON-ready array of objects
}

function generateJson() {

    const form = document.getElementById("intro_form");
    const websiteSections = document.querySelectorAll('[data-website]');
    const courcesSections = document.querySelectorAll('[data-course]');

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


    const jsonString = JSON.stringify(introduction, null, 4);

    const outputdiv = document.getElementById("output_result");


    outputdiv.innerHTML = 
        `
            <section>
                <h3>Generated JSON Data:</h3>
                <pre><code class="language-json">${jsonString}</code></pre>
                <div style="text-align: center; margin-top: 20px;">
                    <button type="button" id="json-back-btn">Back to Form</button>
                </div>
            </section>
        `;
    
    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }    

    form.style.display = "none";
    outputdiv.style.display = "block";
}