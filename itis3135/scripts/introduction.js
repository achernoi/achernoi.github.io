function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function getValueByPath(obj, path) {
    return path.split(".").reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);
}

function renderVars(template, data) {
    // raw {{{key}}} (trusted only)
    template = template.replace(/\{\{\{\s*([.\w-]+)\s*\}\}\}/g, (_, key) => {
        const v = getValueByPath(data, key);
        return v == null ? "" : String(v);
    });

    // escaped {{key}}
    template = template.replace(/\{\{\s*([.\w-]+)\s*\}\}/g, (_, key) => {
        const v = getValueByPath(data, key);
        return v == null ? "" : escapeHtml(v);
    });

    return template;
}

// Repeats blocks like:
// {{#links}} ... {{/links}}
// Uses data.links (array). Adds {{index}} automatically.
function renderRepeats(template, data) {
    alert("renderRepeats");
    return template.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (_, arrayName, block) => {
        alert(arrayName);
        const arr = data[arrayName];
        alert(arr);
        if (!Array.isArray(arr) || arr.length === 0) return "";

    return arr.map((item, i) => {
        const ctx = (item && typeof item === "object")
            ? { ...data, ...item, index: i }
            : { ...data, value: item, index: i };

    return renderVars(block, ctx);
    }).join("");
    });
}

    function renderTemplate(template, data) {
      // Do repeats first, then simple variables      
      const withRepeats = renderRepeats(template, data);
      return renderVars(withRepeats, data);
    }

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("intro_form");
    const outputdiv = document.getElementById("output_result");

    const clearBtn = document.getElementById("clearButton");
    if (clearBtn) {
        clearBtn.onclick = (e) => {
        e.preventDefault();
        form.querySelectorAll("input, textarea").forEach((input) => {
            if (!["submit", "reset", "button", "hidden"].includes(input.type)) {
            input.value = "";
            }
        });
        /*
        const courses = document.querySelectorAll(".course-entry");
        courses.forEach((c, index) => {
            if (index > 0) c.remove();
            else c.querySelectorAll("input").forEach((i) => (i.value = ""));
        });
        const links = document.querySelectorAll(".link-entry");
        links.forEach((l, index) => {
            if (index > 0) l.remove();
            else l.querySelectorAll("input").forEach((i) => (i.value = ""));
        });
        */
        };
    }

    form.onsubmit = (e) => {
        e.preventDefault();

        headerTitle = "Introduction Page";
        const introductionData = {
            background: {
                personalStatement: " I just transferred to UNC Charlotte from CPCC and I am a junior studying computer science with a concentration in Web/Mobile Development and Software Engineering.",
                personalBackground: " I am 21 years old and I love photography, painting, and traveling",
                professionalBackground: " I have been working in retail for a few years.",
                academicBackground: " I just transferred to UNC Charlotte this semester after completing my associate degree from CPCC. I am a junior studying computer science with a concentration in Web/Mobile Development and Software Engineering.",
                subjectBackground: " I have limited experience in web development but I have experience in programming using Java.",
                primaryComp: " The laptop I use for school is a Macbook Pro 13-inch M1.",
                backupComp: " I have a Windows PC computer at home I can use as a backup."
            },
            courses: [
               {
                    courseName: "11 Computer Science Program, Identity, Career:",
                    reason: "11 Required course."
                }
            ]
        };
        

        const htmlTemplate = `
                <h2>Introduction</h2>
                <figure>
                    <img src="itis3135/images/myimage.png" alt="My introduction image." height="400" width="300">
                    <figcaption><em>One of my favorite beach spots in California.</em></figcaption>
                </figure>
                <p>{{background.personalStatement}}</p>
                <h3>Background</h3>
                <ul>
                    <li><strong>Personal Background:</strong>{{background.personalBackground}}</li>
                    <li><b>Professional Background:</b>{{background.professionalBackground}}</li>
                    <li><b>Academic Background:</b>{{background.academicBackground}}
                    </li>
                    <li><b>Background in this Subject:</b>{{background.subjectBackground}}</li>
                    <li><b>Primary Work Computer:</b>{{background.primaryComp}}</li>
                    <li><b>Backup Work Computer & Location Plan:</b>{{background.backupComp}}</li>
                    <li><b>Courses I'm Taking and Why:</b>
                        <ol>
                        {{#courses}}
                        <li><strong>{{courseName}}</strong>{{reason}}</li>
                        {{/cources}}

                        <li><b>ITSC 2600 - Computer Science Program, Identity, Career:</b> Required course.</li>
                        <li><b>ITIS 3130 - Introduction to Human-Centered Computing:</b> I thought this would be an interesting course.</li>
                        <li><b>ITIS 3135 - Front-End Web Application Development:</b> Useful course.</li>
                        <li><b>ITSC 3688 - Computers and Their Impact on Society:</b> Required course.</li>
                        <li><b>ITCS 3112 - Design Implementation of Object-Oriented Systems:</b> I thought this course would be useful and it is a required course.</li>
                        </ol>
                    </li>
                </ul> 
                <blockquote>“Life is short, the world is wide, and I want to make some memories” -Donna Sheridan,<cite> Mamma Mia</cite></blockquote> 
        `;

        outputdiv.innerHTML = renderTemplate(htmlTemplate, introductionData);
        form.style.display = "none";
        outputdiv.style.display = "block";
    };

    // Delete course (uses event delegation so it works for future sections too)
    const coursesEl = document.getElementById('courses');       
    coursesEl.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('[data-coursedelete]');
      if (!deleteBtn) return;
    
      const section = deleteBtn.closest('[data-course]');
      if (!section) return;

      section.remove();
    });

    // Add website link action
    const addCourseBtn = document.getElementById('addCourseBtn'); 
    addCourseBtn.addEventListener('click', () => {
        const section = document.createElement('div');
        //section.className = 'section-row';
        section.setAttribute('data-course', '');

        section.innerHTML = `
            <div data-course>
                <input type="text" class="course-dept" name="course-dept[]" required>
                <input type="text" class="course-num" name="course-num[]" required>
                <input type="text" class="course-name" name="course-name[]" required>
                <input type="text" class="course-reason" name="course-reason[]" required>
                <button type="button" class="delete-course" data-coursedelete>Delete</button>
            </div>    
        `;

      coursesEl.appendChild(section);      
    });

    // Delete action (uses event delegation so it works for future sections too)
    const websitesEl = document.getElementById('websites');       
    websitesEl.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('[data-websitedelete]');
      if (!deleteBtn) return;
    
      const section = deleteBtn.closest('[data-website]');
      if (!section) return;

      section.remove();
    });

    // Add website link action
    const addBtn = document.getElementById('addWebsiteLinkBtn'); 
    addBtn.addEventListener('click', () => {
        const section = document.createElement('div');
        //section.className = 'section-row';
        section.setAttribute('data-website', '');

        section.innerHTML = `
            <div data-website>
                <label>Website Name:
                    <input type="text" class="website-name" name="urlname[]" required>
                </label>
                <label>URL:
                    <input type="url" class="link-url" name="url[]" required>
                </label>
                <button type="button" class="delete-link" data-websitedelete>Delete</button>
            </div>`;

      websitesEl.appendChild(section);      
    });
});
