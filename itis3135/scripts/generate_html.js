function generateHtml(event) {
    const form = document.getElementById("intro_form");

    if (!form.checkValidity()) {        
        form.reportValidity(); // Optional: report all validity issues to the user
        return;
    }
    
    const outputdiv = document.getElementById("output_result");
    const websiteSections = document.querySelectorAll('[data-website]');
    const courcesSections = document.querySelectorAll('[data-course]');
    const introductionData = createJsonFromForm(form, courcesSections, websiteSections);
   

    const escapeHtml = (text) => {
        return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const htmlString = renderTemplate(htmlTemplate, introductionData);
    /*
        `<!DOCTYPE html>
        <html lang="en">
        <body>
            <header>
                <h1>Sasha </h1>
            </header>
            <main>
                ${renderTemplate(htmlTemplate, introductionData)}
            </main>
        </body>
        </html>`;
    */   


                
    outputdiv.innerHTML = `
        <section>
            <h3>Generated HTML Code:</h3>
            <pre><code class="language-html">${escapeHtml(htmlString)}</code></pre>
            <div style="text-align: center; margin-top: 20px;">
                <button type="button" id="htmlBackToFormBtn">Back to Form</button>
            </div>
        </section>
    `;

    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }    

    document.getElementById("htmlBackToFormBtn").onclick = () => {
      outputdiv.style.display = "none";
      form.style.display = "block";
      //pageTitle.innerText = "Introduction Form";
      //formSubtitle.style.display = "block";
    };

    form.style.display = "none";
    outputdiv.style.display = "block";
}