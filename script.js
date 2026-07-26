// =========================================================
// SkillPath Nigeria - Core JavaScript (PART 1)
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    // --- Mobile Navigation Menu ---
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            navLinks.classList.toggle("active");
        });
    }

    // --- Quiz Data ---
    const questions = [
        {
            question: "What type of activities do you enjoy most?",
            options: [
                "Building things and solving problems",
                "Creating videos, graphics, or other content",
                "Working with computers and technology",
                "Understanding data and finding patterns"
            ]
        },
        {
            question: "What would you enjoy doing in your free time?",
            options: [
                "Writing code or building a website",
                "Editing videos or creating social media content",
                "Learning about cybersecurity and online safety",
                "Exploring data and discovering useful information"
            ]
        },
        {
            question: "Which type of problem would you enjoy solving?",
            options: [
                "Building a useful app or website",
                "Creating something visually attractive",
                "Protecting people and systems from online threats",
                "Finding patterns in numbers and information"
            ]
        },
        {
            question: "Which activity sounds most interesting to you?",
            options: [
                "Creating an AI-powered application",
                "Designing a user-friendly app or website",
                "Analysing data to make better decisions",
                "Creating engaging videos and digital content"
            ]
        },
        {
            question: "How do you prefer to express your creativity?",
            options: [
                "Through code and technology",
                "Through design, colours, and user experiences",
                "Through videos, storytelling, and social media",
                "Through new ideas and innovative solutions"
            ]
        },
        {
            question: "Which statement describes you best?",
            options: [
                "I enjoy logical thinking and solving difficult problems",
                "I enjoy being creative and making things look good",
                "I enjoy learning how technology works",
                "I enjoy communicating ideas and connecting with people"
            ]
        },
        {
            question: "What would you like to learn most?",
            options: [
                "Programming and software development",
                "Artificial Intelligence and Machine Learning",
                "Cybersecurity and ethical hacking",
                "Content creation and digital media"
            ]
        },
        {
            question: "What is your main goal for learning digital skills?",
            options: [
                "Build software and become a developer",
                "Work with AI, data, and emerging technologies",
                "Protect systems and become a cybersecurity professional",
                "Create content and build a digital career"
            ]
        }
    ];

    // --- Quiz State & Elements ---
    let currentQuestionIndex = 0;
    const selectedAnswers = [];

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const questionNumberElement = document.getElementById("questionNumber");
    const progressFillElement = document.getElementById("progressFill");
    const nextButton = document.getElementById("nextBtn");
    const backButton = document.getElementById("backBtn");

    // Render Question
    function displayQuestion() {
        if (!questionElement || !optionsElement) return;

        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        if (questionNumberElement) {
            questionNumberElement.textContent = `Question ${currentQuestionIndex + 1}`;
        }

        if (progressFillElement) {
            const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
            progressFillElement.style.width = `${progress}%`;
        }

        optionsElement.innerHTML = "";

        currentQuestion.options.forEach((optionText, optionIndex) => {
            const optionButton = document.createElement("button");
            optionButton.className = "option";
            optionButton.type = "button";
            optionButton.innerHTML = `<span>${optionText}</span>`;

            if (selectedAnswers[currentQuestionIndex] === optionIndex) {
                optionButton.classList.add("selected");
                optionButton.setAttribute("aria-selected", "true");
            }

            optionButton.addEventListener("click", () => selectAnswer(optionIndex, optionButton));
            optionsElement.appendChild(optionButton);
        });

        updateNavigationButtons();
    }

    function selectAnswer(optionIndex, selectedButton) {
        selectedAnswers[currentQuestionIndex] = optionIndex;
        const allOptions = optionsElement.querySelectorAll(".option");

        allOptions.forEach(opt => {
            opt.classList.remove("selected");
            opt.removeAttribute("aria-selected");
        });

        selectedButton.classList.add("selected");
        selectedButton.setAttribute("aria-selected", "true");
    }

    function updateNavigationButtons() {
        if (backButton) {
            backButton.disabled = currentQuestionIndex === 0;
            backButton.style.opacity = currentQuestionIndex === 0 ? "0.5" : "1";
        }
        if (nextButton) {
            nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "See My Results →" : "Next";
        }
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            if (selectedAnswers[currentQuestionIndex] === undefined) {
                alert("Please select an answer before continuing.");
                return;
            }
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
            } else {
                showQuizResults(selectedAnswers);
            }
        });
    }

    if (backButton) {
        backButton.addEventListener("click", () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                displayQuestion();
            }
        });
    }

    if (questionElement && optionsElement) {
        displayQuestion();
    }
});

// =========================================================
// SkillPath Nigeria - Scoring Engine & Database (PART 2)
// =========================================================

function showQuizResults(selectedAnswers) {
    const careerScores = {
        "Software Development": 0,
        "AI & Machine Learning": 0,
        "Cybersecurity": 0,
        "Data Analysis": 0,
        "UI/UX Design": 0,
        "Content Creation": 0,
        "Digital Marketing": 0
    };

    selectedAnswers.forEach((answerIndex, questionIndex) => {
        if (questionIndex === 0) {
            if (answerIndex === 0) careerScores["Software Development"] += 3;
            if (answerIndex === 1) careerScores["Content Creation"] += 3;
            if (answerIndex === 2) { careerScores["Cybersecurity"] += 2; careerScores["Software Development"] += 2; }
            if (answerIndex === 3) careerScores["Data Analysis"] += 3;
        }
        if (questionIndex === 1) {
            if (answerIndex === 0) careerScores["Software Development"] += 3;
            if (answerIndex === 1) { careerScores["Content Creation"] += 3; careerScores["Digital Marketing"] += 2; }
            if (answerIndex === 2) careerScores["Cybersecurity"] += 3;
            if (answerIndex === 3) careerScores["Data Analysis"] += 3;
        }
        if (questionIndex === 2) {
            if (answerIndex === 0) careerScores["Software Development"] += 3;
            if (answerIndex === 1) careerScores["UI/UX Design"] += 3;
            if (answerIndex === 2) careerScores["Cybersecurity"] += 3;
            if (answerIndex === 3) careerScores["Data Analysis"] += 3;
        }
        if (questionIndex === 3) {
            if (answerIndex === 0) careerScores["AI & Machine Learning"] += 3;
            if (answerIndex === 1) careerScores["UI/UX Design"] += 3;
            if (answerIndex === 2) { careerScores["Data Analysis"] += 3; careerScores["AI & Machine Learning"] += 2; }
            if (answerIndex === 3) careerScores["Content Creation"] += 3;
        }
        if (questionIndex === 4) {
            if (answerIndex === 0) { careerScores["Software Development"] += 2; careerScores["AI & Machine Learning"] += 2; }
            if (answerIndex === 1) careerScores["UI/UX Design"] += 3;
            if (answerIndex === 2) { careerScores["Content Creation"] += 3; careerScores["Digital Marketing"] += 2; }
            if (answerIndex === 3) careerScores["AI & Machine Learning"] += 3;
        }
        if (questionIndex === 5) {
            if (answerIndex === 0) { careerScores["Software Development"] += 3; careerScores["Data Analysis"] += 1; }
            if (answerIndex === 1) careerScores["UI/UX Design"] += 3;
            if (answerIndex === 2) careerScores["Cybersecurity"] += 3;
            if (answerIndex === 3) { careerScores["Content Creation"] += 2; careerScores["Digital Marketing"] += 2; }
        }
        if (questionIndex === 6) {
            if (answerIndex === 0) careerScores["Software Development"] += 3;
            if (answerIndex === 1) careerScores["AI & Machine Learning"] += 3;
            if (answerIndex === 2) careerScores["Cybersecurity"] += 3;
            if (answerIndex === 3) careerScores["Content Creation"] += 3;
        }
        if (questionIndex === 7) {
            if (answerIndex === 0) careerScores["Software Development"] += 3;
            if (answerIndex === 1) careerScores["AI & Machine Learning"] += 3;
            if (answerIndex === 2) careerScores["Cybersecurity"] += 3;
            if (answerIndex === 3) careerScores["Content Creation"] += 3;
        }
    });

    const sortedCareers = Object.entries(careerScores).sort((a, b) => b[1] - a[1]);
    const topCareer = sortedCareers[0][0];
    const highestScore = sortedCareers[0][1];
    const maxPossibleScore = 24;
    const matchPercentage = Math.min(Math.round((highestScore / maxPossibleScore) * 100), 100);

    const otherCareerMatches = sortedCareers.slice(1, 4).map(career => ({
        career: career[0],
        score: career[1],
        percentage: Math.min(Math.round((career[1] / maxPossibleScore) * 100), 100)
    }));

    const quizResult = {
        career: topCareer,
        score: highestScore,
        percentage: matchPercentage,
        otherCareers: otherCareerMatches
    };

    localStorage.setItem("skillPathQuizResult", JSON.stringify(quizResult));
    window.location.href = "results.html";
}

// Database of Careers with Dynamic Skill Icons
const careerData = {
    "Software Development": {
        description: "Software Development involves building websites, mobile applications, and digital systems that solve real-world problems.",
        reason: "Your answers show that you enjoy problem-solving, technology, logical thinking, and building practical tools.",
        skills: [
            { name: "HTML & CSS", icon: "🌐" },
            { name: "JavaScript", icon: "⚡" },
            { name: "Git & GitHub", icon: "🐙" },
            { name: "Frontend Development", icon: "💻" },
            { name: "Backend Development", icon: "⚙️" }
        ],
        roadmap: [
            "Learn fundamentals of HTML, CSS, and modern web design.",
            "Master JavaScript core concepts and DOM manipulation.",
            "Understand version control with Git & GitHub.",
            "Choose a framework (like React or Node.js) and build real projects."
        ]
    },
    "AI & Machine Learning": {
        description: "Artificial Intelligence & Machine Learning focus on creating intelligent systems that learn patterns from data.",
        reason: "Your answers reflect high curiosity about intelligent tools, logic, and futuristic tech solutions.",
        skills: [
            { name: "Python Programming", icon: "🐍" },
            { name: "Mathematics & Statistics", icon: "📐" },
            { name: "Data Analysis", icon: "📊" },
            { name: "Machine Learning Frameworks", icon: "🤖" }
        ],
        roadmap: [
            "Learn Python programming from scratch.",
            "Understand foundational statistics and linear algebra.",
            "Practice data manipulation with Pandas & NumPy.",
            "Build beginner Machine Learning models using Scikit-Learn."
        ]
    },
    "Cybersecurity": {
        description: "Cybersecurity is the discipline of protecting networks, systems, and data from digital threats and unauthorized access.",
        reason: "Your answers indicate interest in digital safety, system security, and technical problem-solving.",
        skills: [
            { name: "Networking Basics", icon: "📡" },
            { name: "Linux Administration", icon: "🐧" },
            { name: "Ethical Hacking", icon: "🛡️" },
            { name: "Security Compliance", icon: "🔒" }
        ],
        roadmap: [
            "Learn networking protocols (TCP/IP, DNS, HTTP).",
            "Get comfortable with the Linux terminal.",
            "Study foundational cybersecurity frameworks.",
            "Practice practical security in lab environments."
        ]
    },
    "Data Analysis": {
        description: "Data Analysis turns raw data into actionable insights to guide smart business decisions.",
        reason: "Your responses show a strong affinity for numbers, patterns, and logical problem-solving.",
        skills: [
            { name: "Microsoft Excel", icon: "📊" },
            { name: "SQL Databases", icon: "🗄️" },
            { name: "Data Visualization (PowerBI)", icon: "📈" },
            { name: "Python for Data", icon: "🐍" }
        ],
        roadmap: [
            "Master advanced Excel and spreadsheet functions.",
            "Learn SQL to query databases.",
            "Build interactive dashboards using PowerBI or Tableau.",
            "Analyze real-world datasets to solve problems."
        ]
    },
    "UI/UX Design": {
        description: "UI/UX Design creates digital product interfaces that are user-friendly, clear, and visually appealing.",
        reason: "Your answers demonstrate creativity, visual thinking, and empathy for user experiences.",
        skills: [
            { name: "User Research", icon: "🔍" },
            { name: "Wireframing", icon: "📐" },
            { name: "Figma Design", icon: "🎨" },
            { name: "Interactive Prototyping", icon: "📱" }
        ],
        roadmap: [
            "Understand core design principles and color theory.",
            "Master Figma for wireframing and interface design.",
            "Conduct user research and usability testing.",
            "Design full app prototypes for your portfolio."
        ]
    },
    "Content Creation": {
        description: "Content Creation involves producing digital media such as video, graphics, and articles to engage online audiences.",
        reason: "Your answers highlight your creativity, storytelling skills, and desire to express ideas visually.",
        skills: [
            { name: "Video Editing", icon: "🎬" },
            { name: "Graphic Design", icon: "🖼️" },
            { name: "Digital Storytelling", icon: "📝" },
            { name: "AI Content Tools", icon: "✨" }
        ],
        roadmap: [
            "Define your niche and target audience.",
            "Learn graphic design basics (Pixellab/Canva/Photoshop).",
            "Master video editing software and scripting.",
            "Publish consistently and build a digital portfolio."
        ]
    },
    "Digital Marketing": {
        description: "Digital Marketing focuses on leveraging online platforms to market products, grow brands, and reach audiences.",
        reason: "Your answers show a passion for communication, online trends, and connecting with people.",
        skills: [
            { name: "Social Media Strategy", icon: "📱" },
            { name: "SEO Optimization", icon: "🚀" },
            { name: "Content Marketing", icon: "✍️" },
            { name: "Digital Analytics", icon: "📈" }
        ],
        roadmap: [
            "Understand audience psychology and digital platforms.",
            "Learn Search Engine Optimization (SEO) fundamentals.",
            "Create effective content and email marketing campaigns.",
            "Track and optimize performance using web analytics."
        ]
    }
};

// =========================================================
// SkillPath Nigeria - Results Renderer (PART 3)
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    const savedResultData = localStorage.getItem("skillPathQuizResult");

    const careerNameElement = document.getElementById("topCareer");
    const careerPercentageElement = document.getElementById("matchPercentage");
    const careerDescriptionElement = document.getElementById("careerDescription");
    const careerReasonElement = document.getElementById("careerReason");
    const otherCareerMatchesElement = document.getElementById("otherCareerMatches");
    const careerSkillsElement = document.getElementById("careerSkills");
    const careerRoadmapElement = document.getElementById("careerRoadmap");

    if (savedResultData && careerNameElement && careerPercentageElement) {
        const result = JSON.parse(savedResultData);
        const career = careerData[result.career];

        // Populate Top Result
        careerNameElement.textContent = result.career;
        careerPercentageElement.textContent = `${result.percentage}%`;

        if (career) {
            if (careerDescriptionElement) careerDescriptionElement.textContent = career.description;
            if (careerReasonElement) careerReasonElement.textContent = career.reason;

            // Render Skills Grid with Unique Icons
            if (careerSkillsElement && career.skills) {
                careerSkillsElement.innerHTML = "";
                career.skills.forEach(skillObj => {
                    const skillCard = document.createElement("div");
                    skillCard.className = "skill-item";
                    
                    // Support both object syntax {name, icon} and string syntax
                    const name = typeof skillObj === 'object' ? skillObj.name : skillObj;
                    const icon = typeof skillObj === 'object' ? skillObj.icon : "⭐";

                    skillCard.innerHTML = `
                        <h3>${icon} ${name}</h3>
                        <p>Essential skill needed for growth in ${result.career}.</p>
                    `;
                    careerSkillsElement.appendChild(skillCard);
                });
            }

            // Render Learning Roadmap
            if (careerRoadmapElement && career.roadmap) {
                careerRoadmapElement.innerHTML = "";
                career.roadmap.forEach((stepText, index) => {
                    const stepItem = document.createElement("div");
                    stepItem.className = "roadmap-step";
                    stepItem.innerHTML = `
                        <span>${String(index + 1).padStart(2, "0")}</span>
                        <div>
                            <h3>Step ${index + 1}</h3>
                            <p>${stepText}</p>
                        </div>
                    `;
                    careerRoadmapElement.appendChild(stepItem);
                });
            }

            // Render Other Matches
            if (otherCareerMatchesElement && result.otherCareers) {
                otherCareerMatchesElement.innerHTML = "";
                result.otherCareers.forEach(other => {
                    const card = document.createElement("div");
                    card.className = "other-career-card";
                    card.innerHTML = `
                        <h3>${other.career}</h3>
                        <p><strong>${other.percentage}% Match</strong></p>
                    `;
                    otherCareerMatchesElement.appendChild(card);
                });
            }
        }
    }
});