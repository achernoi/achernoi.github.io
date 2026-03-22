function generateHtml() {
    const form = document.getElementById("intro_form");
    const outputdiv = document.getElementById("output_result");
   
    const escapeHtml = (text) => {
        return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const htmlString = 
        `<!DOCTYPE html>
        <html lang="en">
        <body>
            <header>
                <h1>Sasha </h1>
            </header>
            <main>
            </main>
        </body>
        </html>`;

    outputdiv.innerHTML = `
        <section>
            <h3>Generated HTML Code:</h3>
            <pre><code class="language-html">${escapeHtml(htmlString)}</code></pre>
            <div style="text-align: center; margin-top: 20px;">
                <button type="button" id="html-back-btn">Back to Form</button>
            </div>
        </section>
    `;

    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }    

    form.style.display = "none";
    outputdiv.style.display = "block";
}